import React from "react"
import PropTypes from "prop-types"
import { push } from 'react-router-redux'
import { Image, Modal, Breadcrumb, Well, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx";
import RikerNavBar from "../components/riker-navbar.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import Records from "../components/records.jsx"
import { destroy } from "redux-form"
import { toastr } from 'react-redux-toastr'
import _ from "lodash"
import * as forms from "../forms"
import * as strs from "../strings"
import * as urls from "../urls"
import * as utils from "../utils"
import AddRecordButton from "../components/add-record-button.jsx"
import * as gvs from "../grid-vals"
import { attemptDownloadChangelog,
         changelogCountsViewed,
         maintenanceAck,
         bannerRemindLater } from "../actions/action-creators"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import NavbarBanner from "../components/navbar-banner.jsx"

class RecordsPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { showRefreshAllRecordsModal: false }
    }

    render() {
        const {
            api,
            onItemSelect,
            setCount,
            sorenessLogsCount,
            bodyJournalLogsCount,
            cardioLogsCount,
            handleAddSet,
            handleAddSorenessLog,
            handleAddBodyJournalLog,
            changelogCounts,
            downloadChangelog,
            dismissChangelogReport,
            becameUnauthenticated
        } = this.props
        return (
            <div>
                <RikerHelmet title="Records" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <ReauthenticateModal
                    showModal={becameUnauthenticated}
                    message="To synchronize your account, we need you to re-authenticate."
                    operationOnLightLoginSuccess={downloadChangelog} />
                <Modal
                    show={this.state.showRefreshAllRecordsModal}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                <div>{strs.refresh_userdata_lbl}</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body><p>{strs.refresh_userdata_explanation_pp1}</p></Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => this.setState({ showRefreshAllRecordsModal: false })}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <ChangelogResultsModal
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={dismissChangelogReport} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h3 className="page-heading">Data Records</h3>
                    <div style={{marginBottom: 10}}>From here you can drill into all of your Riker data records.</div>
                    <Well>
                        <Records
                            onItemSelect={onItemSelect}
                            setCount={setCount}
                            cardioLogsCount={cardioLogsCount}
                            sorenessLogsCount={sorenessLogsCount}
                            bodyJournalLogsCount={bodyJournalLogsCount} />
                    </Well>
                    <div style={{marginTop: 5, display: "flex", alignItems: "center"}}>
                        <Tappable className="btn btn-default"
                                  component="div"
                                  onTap={() => {
                                          if (!api.requestInProgress) {
                                              downloadChangelog()
                                          }
                                      }}
                                  disabled={api.requestInProgress}>{strs.refresh_userdata_lbl}</Tappable>
                        <Tappable component="div"
                                  className="question-mark"
                                  onTap={() => {
                                          utils.trackAboutSynchronizeAccountModalViewed(urls.RECORDS_URI)
                                          this.setState({showRefreshAllRecordsModal: true})
                                      }}>i</Tappable>
                    </div>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
RecordsPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        api: state.api,
        changelogCounts: state.changelogCounts,
        setCount: _.size(state.serverSnapshot._embedded.sets),
        sorenessLogsCount: _.size(state.serverSnapshot._embedded["soreness-logs"]),
        cardioLogsCount: _.size(state.serverSnapshot._embedded["cardio-logs"]),
        bodyJournalLogsCount: _.size(state.serverSnapshot._embedded["body-journal-logs"]),
        becameUnauthenticated: state.becameUnauthenticated,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onItemSelect: uri => dispatch(push(uri)),
        downloadChangelog: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from records page")
            dispatch(attemptDownloadChangelog(null))
        },
        dismissChangelogReport: () => dispatch(changelogCountsViewed()),
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPage)
