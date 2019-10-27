import React from "react"
import PropTypes from "prop-types"
import { Modal, Image, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import { attemptDownloadChangelog,
         changelogCountsViewed,
         bannerRemindLater,
         maintenanceAck } from "../actions/action-creators"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import * as strs from "../strings"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import { toastr } from 'react-redux-toastr'
import NavbarBanner from "../components/navbar-banner.jsx"

class AccountVerifiedPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { showRefreshAllRecordsModal: false, continueWithEnrollment: false}
    }

    render() {
        const {
            api,
            authToken,
            changelogCounts,
            downloadChangelog,
            dismissChangelogReport
        } = this.props
        return (
            <div>
                <RikerHelmet title="Account Verified" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <ChangelogResultsModal
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={() => dismissChangelogReport(this.state.continueWithEnrollment)}
                    dismissChangelogReportButtonLabel={this.state.continueWithEnrollment ? "Continue to payment information" : "Close"} />
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
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Riker Account Verified</h1>
                    <Panel bsStyle="success">
                        <Panel.Heading>
                            <Panel.Title>{<h4>Account Verified Successfully</h4>}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <div>Your account has been verified, thank you.</div>
                            <div style={{paddingTop: 15}}>
                                {
                                    (() => {
                                        if (!_.isEmpty(authToken)) {
                                            return (
                                                <div>
                                                    <div style={{marginTop: 5, marginBottom: 20, display: "flex", alignItems: "center"}}>
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
                                                                          utils.trackAboutSynchronizeAccountModalViewed(urls.ACCOUNT_VERIFICATION_SUCCESS_URI)
                                                                          this.setState({showRefreshAllRecordsModal: true})
                                                                  }}>i</Tappable>
                                                    </div>
                                                    <Link to={urls.ROOT_URI}>Your Riker Home.</Link>
                                                </div>
                                            )
                                        } else {
                                            return (<p><Link to={urls.LOGIN_URI}>Log in to your Riker account.</Link></p>)
                                        }
                                    })()
                                }
                            </div>
                        </Panel.Body>
                    </Panel>
                    {(() => {
                         if (!_.isEmpty(authToken)) {
                             return (
                                 <Panel bsStyle="default">
                                     <Panel.Heading>
                                         <Panel.Title>{<h4>In the process of enrolling in a subscription?</h4>}</Panel.Title>
                                     </Panel.Heading>
                                     <Panel.Body>
                                         <div>
                                             <Tappable className="btn btn-primary"
                                                       component="div"
                                                       onTap={() => {
                                                               if (!api.requestInProgress) {
                                                                   this.setState({continueWithEnrollment: true})
                                                                   downloadChangelog()
                                                               }
                                                       }}
                                                       disabled={api.requestInProgress}>Synchronize your account and continue</Tappable>
                                         </div>
                                     </Panel.Body>
                                 </Panel>
                             )
                         }
                    })()
                    }
                </Col>
            </div>
        );
    }
}

AccountVerifiedPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        authToken: state.authToken.value,
        changelogCounts: state.changelogCounts,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        downloadChangelog: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from account verified page")
            dispatch(attemptDownloadChangelog(null))
        },
        dismissChangelogReport: (transitionToCompletePage) => {
            dispatch(changelogCountsViewed())
            if (transitionToCompletePage) {
                dispatch(push(urls.AUTHENTICATED_ENROLL_PAYMENT_URI))
            }
        },
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerifiedPage)
