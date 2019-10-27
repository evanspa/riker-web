import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import BodyJournalLogForm from "../components/body-journal-log-form.jsx"
import { markBodyJournalLogForEdit,
         attemptDeleteBodyJournalLog,
         maintenanceAck,
         bannerRemindLater,
         clearErrors } from "../actions/action-creators"
import EntityEditDetailPage from "../components/entity-edit-detail-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import { toastr } from 'react-redux-toastr'
import { toBodyJournalLogFormModel } from "../utils"
import _ from "lodash"
import * as utils from "../utils"
import * as urls from "../urls"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import { attemptDownloadChangelog,
         changelogCountsViewed } from "../actions/action-creators"
import { conflictDetectedUserAck } from "../actions/api-utils"
import ReactGA from "react-ga"

class BodyJournalLogDetailPage extends React.Component {
    render() {
        momentLocalizer(moment)
        const {
            originationDevices,
            markBodyJournalLogForEdit,
            downloadBodyJournalLog,
            clearErrors,
            deleteBodyJournalLog,
            becameUnauthenticated,
            userAcknowledgedNotFound,
            deleteConfirmMessage,
            bodyJournalLog,
            doGoBack,
            changelogCounts,
            responseStatus,
            dismissChangelogReport,
            isConflict,
            conflictAckFn,
            downloadChangelogFn
        } = this.props
        const bodyJournalLogFormFn = () => (<BodyJournalLogForm
                                                markBodyJournalLogForEdit={markBodyJournalLogForEdit}
                                                deleteBodyJournalLog={deleteBodyJournalLog}
                                                bodyJournalLog={bodyJournalLog}
                                                originationDevices={originationDevices}
                                                initialValues={toBodyJournalLogFormModel(bodyJournalLog.payload)}
                                                deleteConfirmMessage={deleteConfirmMessage}
                                                accountStatuses={this.props.accountStatuses}
                                                editMode={false}
                                                responseStatus={responseStatus}
                                                navigateTo={this.props.navigateTo}
                                                clearErrors={clearErrors} />)
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To delete your body measurement log, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(bodyJournalLog.payload["bodyjournallog/id"])} />
        return (<EntityEditDetailPage
                    doGoBack={doGoBack}
                    entity={bodyJournalLog}
                    entityGoneModalTitle="Deleted on other device"
                    entityGoneModalContent="It appears this log record was already deleted from another device."
                    userAcknowledgedNotFound={userAcknowledgedNotFound}
                    editMode={false}
                    maintenanceAckFn={this.props.maintenanceAckFn}
                    entityType="body measurement log"
                    entitiesUri={urls.BODY_JOURNAL_LOGS_URI}
                    reauthenticateModal={reauthenticateModal}
                    breadcrumbParentUri={urls.BODY_JOURNAL_LOGS_URI}
                    breadcrumbParentLabel="Body Measurement Logs"
                    breadcrumbActiveLabelFn={bodyJournalLog => bodyJournalLog.payload["bodyjournallog/body-weight"]}
                    entityFormFn={bodyJournalLogFormFn}
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={dismissChangelogReport}
                    isConflict={isConflict}
                    conflictAckFn={conflictAckFn}
                    conflictMessagePrefix="This body measurement log"
                    conflictMessageSuffix="this log"
                    downloadChangelogFn={downloadChangelogFn}
                    navigateTo={this.props.navigateTo}
                    accountStatuses={this.props.accountStatuses}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    remindMeLaterFn={this.props.remindMeLaterFn} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        bodyJournalLog: state.serverSnapshot._embedded["body-journal-logs"][ownProps.params.bodyJournalLogId],
        originationDevices: state.serverSnapshot._embedded["origination-devices"],
        becameUnauthenticated: state.becameUnauthenticated,
        deleteConfirmMessage: "Are you sure you want to delete this body measurement log?",
        changelogCounts: state.changelogCounts,
        isConflict: state.api.isConflict,
        responseStatus: state.api.responseStatus,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        markBodyJournalLogForEdit: (bodyJournalLogId) => {
            toastr.clean()
            dispatch(markBodyJournalLogForEdit(bodyJournalLogId))
            dispatch(push(urls.bodyJournalLogEditUrl(bodyJournalLogId)))
        },
        deleteBodyJournalLog: (bodyJournalLogId) => {
            toastr.clean()
            ReactGA.event({
                category: utils.GA_EVENT_CATEGORY_USER,
                action: "delete body measurement log"
            })
            dispatch(attemptDeleteBodyJournalLog(bodyJournalLogId))
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: () => {
            // dispatching 'goBack' is not needed because the render() function
            // of EntityEditDetailPage will call doGoBack if the entity passed
            // to it is null
        },
        doGoBack: () => dispatch(goBack()),
        dismissChangelogReport: () => { dispatch(changelogCountsViewed()) },
        conflictAckFn: () => dispatch(conflictDetectedUserAck()),
        downloadChangelogFn: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from body measurement log detail page")
            dispatch(attemptDownloadChangelog(null))
        },
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyJournalLogDetailPage)
