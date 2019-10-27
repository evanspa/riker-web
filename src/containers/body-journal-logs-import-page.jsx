import React from "react"
import PropTypes from "prop-types"
import { Modal, Label, Image, Breadcrumb, Well, Col, Panel, Button } from "react-bootstrap"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import { toastr } from 'react-redux-toastr'
import _ from "lodash"
import * as utils from "../utils"
import * as urls from "../urls"
import * as strs from "../strings"
import * as gvs from "../grid-vals"
import { bannerRemindLater,
         maintenanceAck,
         attemptDownloadChangelog,
         clearErrors,
         changelogCountsViewed,
         attemptBodyJournalLogsFileImport,
         fileImportErrorUserAck,
         fileImportSuccessUserAck } from "../actions/action-creators"
import NavbarBanner from "../components/navbar-banner.jsx"
import Dropzone from "react-dropzone"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import EntitiesImportPage from "../components/entities-import-page.jsx"

class BodyJournalLogsImportPage extends React.Component {

    render() {
        return (
            <EntitiesImportPage
                pageTitle="Body Measurement Logs Import"
                successMessage="Your body measurement logs have been imported successfully."
                entityType="body measurement logs"
                pageHeading="Body Measurement Logs Import"
                dragFileMessage="Drag your body measurement logs CSV file here, or click to select file to upload."
                accountStatuses={this.props.accountStatuses}
                redisplayBannerAfter={this.props.redisplayBannerAfter}
                fileImportSuccess={this.props.fileImportSuccess}
                fileImportError={this.props.fileImportError}
                changelogCounts={this.props.changelogCounts}
                navigateTo={this.props.navigateTo}
                remindMeLaterFn={this.props.remindMeLaterFn}
                maintenanceAckFn={this.props.maintenanceAckFn}
                doGoBack={this.props.doGoBack}
                uploadFn={this.props.uploadFn}
                fileImportSuccessUserAckFn={this.props.fileImportSuccessUserAckFn}
                fileImportErrorUserAckFn={this.props.fileImportErrorUserAckFn}
                downloadChangelog={this.props.downloadChangelog}
                clearErrors={this.props.clearErrors}
                maxAllowed={this.props.maxAllowed}
                importedEntityCount={this.props.importedBmlCount}
                responseStatus={this.props.api.responseStatus}
                dismissChangelogReport={this.props.dismissChangelogReport} />
        )
    }
}

BodyJournalLogsImportPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        fileImportSuccess: state.api.fileImportSuccess,
        fileImportError: state.api.fileImportError,
        changelogCounts: state.changelogCounts,
        maxAllowed: state.serverSnapshot["user/max-allowed-bml-import"],
        importedBmlCount: utils.numImportedBmls(state.serverSnapshot._embedded["body-journal-logs"])
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearErrors: () => dispatch(clearErrors()),
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck()),
        doGoBack: () => dispatch(goBack()),
        uploadFn: fileToImport => {
            const reader = new FileReader()
            reader.onload = e => {
                dispatch(attemptBodyJournalLogsFileImport(e.currentTarget.result))
            }
            reader.readAsText(fileToImport)
        },
        fileImportSuccessUserAckFn: () => dispatch(fileImportSuccessUserAck()),
        fileImportErrorUserAckFn: () => dispatch(fileImportErrorUserAck()),
        downloadChangelog: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from body measurement logs import page")
            dispatch(attemptDownloadChangelog(null))
        },
        dismissChangelogReport: () => {
            dispatch(changelogCountsViewed())
            dispatch(push(urls.BODY_JOURNAL_LOGS_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyJournalLogsImportPage)
