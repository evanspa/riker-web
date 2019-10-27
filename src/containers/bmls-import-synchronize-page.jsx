import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { replace, push, goBack } from "react-router-redux"
import { connect } from "react-redux"
import { toastr } from "react-redux-toastr"
import { attemptDownloadChangelog,
         bannerRemindLater,
         maintenanceAck,
         changelogCountsViewed } from "../actions/action-creators"
import RikerHelmet from "../components/riker-helmet.jsx";
import { Image, Modal, PanelGroup, Well, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import SignUpForm from "../components/sign-up-form.jsx";
import RikerNavBar from "../components/riker-navbar.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import NavbarBanner from "../components/navbar-banner.jsx"

class BmlsImportSynchronizePage extends React.Component {

    render() {
        const {
            doGoBack,
            navigateTo,
            downloadChangelogFn,
            responseStatus,
            requestInProgress,
            rErrorMask,
            changelogCounts,
            dismissChangelogReport,
            becameUnauthenticated
        } = this.props
        return (
            <div>
                <RikerHelmet title="Synchronize Account" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    suppressBanner={false}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <ReauthenticateModal
                    showModal={becameUnauthenticated}
                    message="We need you to re-authenticate."
                    operationOnLightLoginSuccess={downloadChangelogFn} />
                <ChangelogResultsModal
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={dismissChangelogReport}
                    dismissChangelogReportButtonLabel={"Continue to import"} />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Body Measurement Log Import</h1>
                    <div className="breadcrumb" style={{fontSize: 12, marginBottom: 15}}>
                        <strong>Synchronize Account</strong><span className="signup-step">&nbsp;&#8594;&nbsp;Body Measurement Log Import</span>
                    </div>
                    <p style={{marginTop: 25}}>To begin, lets go ahead and synchronize your account.</p>
                    <hr />
                    <div style={{marginTop: 15}}>
                        <Tappable onTap={() => { if (!requestInProgress) { doGoBack() }}}
                                  className="btn btn-sm btn-default"
                                  disabled={requestInProgress}>Cancel</Tappable>
                    </div>
                    <div style={{marginTop: 10}}>
                        <Tappable onTap={() => {
                                if (!requestInProgress) {
                                    downloadChangelogFn()
                                }}}
                                  component="button"
                                  disabled={requestInProgress}
                                  className="btn btn-lg btn-primary">Synchronize Your Account</Tappable>
                    </div>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
BmlsImportSynchronizePage.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        responseStatus: state.api.responseStatus,
        requestInProgress: state.api.requestInProgress,
        rErrorMask: state.api.rErrorMask,
        changelogCounts: state.changelogCounts,
        becameUnauthenticated: state.becameUnauthenticated,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doGoBack: () => dispatch(goBack()),
        navigateTo: url => dispatch(push(url)),
        dismissChangelogReport: () => {
            dispatch(changelogCountsViewed())
            dispatch(replace(urls.BODY_JOURNAL_LOGS_IMPORT_URI))
        },
        downloadChangelogFn: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from body measurement log import sync page")
            dispatch(attemptDownloadChangelog(null))
        },
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BmlsImportSynchronizePage)
