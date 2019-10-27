import React from "react"
import { connect } from 'react-redux'
import { replace, push, goBack } from 'react-router-redux'
import BodyJournalLogForm from "../components/body-journal-log-form.jsx"
import { toastr } from 'react-redux-toastr'
import { attemptSaveBodyJournalLog,
         attemptDownloadChangelog,
         bannerRemindLater,
         maintenanceAck,
         clearErrors,
         changelogCountsViewed } from "../actions/action-creators"
import { toBodyJournalLogFormModel } from "../utils"
import EntityEditDetailPage from "../components/entity-edit-detail-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import { destroy } from "redux-form"
import { BODY_JOURNAL_LOG_FORM } from "../forms"
import * as utils from "../utils"
import * as urls from "../urls"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import { conflictDetectedUserAck } from "../actions/api-utils"
import ReactGA from "react-ga"

class BodyJournalLogEditPage extends React.Component {
    render() {
        momentLocalizer(moment)
        const {
            bodyJournalLog,
            displayBodyWeightUnits,
            hideBodyWeightUnits,
            displaySizeUnits,
            hideSizeUnits,
            cancelBodyJournalLogEdit,
            handleSubmit,
            api,
            becameUnauthenticated,
            userAcknowledgedNotFound,
            destroyMovementForm,
            doGoBack,
            changelogCounts,
            dismissChangelogReport,
            isConflict,
            conflictAckFn,
            downloadChangelogFn
        } = this.props
        const {
            requestInProgress,
            responseStatus,
            rErrorMask
        } = api
        const entityFormFn = () => <BodyJournalLogForm
                                       displayBodyWeightUnits={displayBodyWeightUnits}
                                       hideBodyWeightUnits={hideBodyWeightUnits}
                                       displaySizeUnits={displaySizeUnits}
                                       hideSizeUnits={hideSizeUnits}
                                       cancelBodyJournalLogEdit={cancelBodyJournalLogEdit}
                                       userAcknowledgedNotFound={userAcknowledgedNotFound}
                                       onSubmit={() => { handleSubmit(bodyJournalLog.payload["bodyjournallog/id"])}}
                                       requestInProgress={requestInProgress}
                                       responseStatus={responseStatus}
                                       navigateTo={this.props.navigateTo}
                                       clearErrors={this.props.clearErrors}
                                       accountStatuses={this.props.accountStatuses}
                                       bodyJournalLog={bodyJournalLog}
                                       initialValues={toBodyJournalLogFormModel(bodyJournalLog.payload)}
                                       editMode={true}
                                       rErrorMask={rErrorMask} />
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your body measurement log, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(bodyJournalLog.payload["bodyjournallog/id"])} />
        return (<EntityEditDetailPage
                    responseStatus={responseStatus}
                    doGoBack={doGoBack}
                    entity={bodyJournalLog}
                    entityGoneModalTitle="Deleted on other device"
                    entityGoneModalContent="It appears this log record was deleted from another device."
                    userAcknowledgedNotFound={userAcknowledgedNotFound}
                    editMode={true}
                    entityType="body measurement log"
                    maintenanceAckFn={this.props.maintenanceAckFn}
                    entitiesUri={urls.BODY_JOURNAL_LOGS_URI}
                    reauthenticateModal={reauthenticateModal}
                    breadcrumbParentUri={urls.BODY_JOURNAL_LOGS_URI}
                    breadcrumbParentLabel="Body Measurement Logs"
                    breadcrumbActiveLabelFn={bodyJournalLog => bodyJournalLog.payload["bodyjournallog/body-weight"]}
                    entityFormFn={entityFormFn}
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
        api: state.api,
        bodyJournalLog: state.serverSnapshot._embedded["body-journal-logs"][ownProps.params.bodyJournalLogId],
        becameUnauthenticated: state.becameUnauthenticated,
        changelogCounts: state.changelogCounts,
        isConflict: state.api.isConflict,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        displayBodyWeightUnits: () => {
            dispatch({type: "redux-form/CHANGE", field: "displayWeightUnitsPicker", value: true, touch: false, form: BODY_JOURNAL_LOG_FORM})
        },
        hideBodyWeightUnits: () => {
            dispatch({type: "redux-form/CHANGE", field: "displayWeightUnitsPicker", value: false, touch: false, form: BODY_JOURNAL_LOG_FORM})
        },
        displaySizeUnits: () => {
            dispatch({type: "redux-form/CHANGE", field: "displaySizeUnitsPicker", value: true, touch: false, form: BODY_JOURNAL_LOG_FORM})
            window.scrollTo(0, document.body.scrollHeight) // so that the units picker is visible
        },
        hideSizeUnits: () => {
            dispatch({type: "redux-form/CHANGE", field: "displaySizeUnitsPicker", value: false, touch: false, form: BODY_JOURNAL_LOG_FORM})
        },
        cancelBodyJournalLogEdit: (bodyJournalLogId) => {
            toastr.clean()
            dispatch(destroy(BODY_JOURNAL_LOG_FORM))
            dispatch(push(urls.bodyJournalLogDetailUrl(bodyJournalLogId)))
        },
        handleSubmit: (bodyJournalLogId) => {
            toastr.clean()
            dispatch(attemptSaveBodyJournalLog(bodyJournalLogId));
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
            utils.trackEventSynchronizedAccount("from body measurement log edit page")
            dispatch(attemptDownloadChangelog(null))
        },
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyJournalLogEditPage)
