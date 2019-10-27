import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import SettingsForm from "../components/settings-form.jsx"
import { toastr } from 'react-redux-toastr'
import { attemptSaveSettings,
         attemptDownloadChangelog,
         bannerRemindLater,
         maintenanceAck,
         clearErrors,
         changelogCountsViewed } from "../actions/action-creators"
import { toSettingsFormModel } from "../utils"
import EntityEditDetailPage from "../components/entity-edit-detail-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import { destroy } from "redux-form"
import { SETTINGS_FORM } from "../forms"
import * as utils from "../utils"
import * as urls from "../urls"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import { conflictDetectedUserAck } from "../actions/api-utils"
import ReactGA from "react-ga"

class SettingsEditPage extends React.Component {
    render() {
        momentLocalizer(moment)
        const {
            cancelSettingsEdit,
            handleSubmit,
            api,
            becameUnauthenticated,
            userAcknowledgedNotFound,
            destroyMovementForm,
            settings,
            doGoBack,
            changelogCounts,
            dismissChangelogReport,
            isConflict,
            conflictAckFn,
            downloadChangelogFn
        } = this.props
        const { responseStatus, requestInProgress, rErrorMask } = api
        const entityFormFn = () => {
            return (<SettingsForm
                        cancelSettingsEdit={cancelSettingsEdit}
                        onSubmit={() => { handleSubmit(settings.payload["usersettings/id"])}}
                        responseStatus={responseStatus}
                        requestInProgress={requestInProgress}
                        accountStatuses={this.props.accountStatuses}
                        navigateTo={this.props.navigateTo}
                        clearErrors={this.props.clearErrors}
                        settings={settings}
                        initialValues={toSettingsFormModel(settings.payload)}
                        editMode={true}
                        rErrorMask={rErrorMask} />)
        }
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your Profile and Settings, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(settings.payload["usersettings/id"])} />
        return (<EntityEditDetailPage
                    doGoBack={doGoBack}
                    entity={settings}
                    entityGoneModalTitle="Account deactivated on other device"
                    entityGoneModalContent="It appears your Riker account has been deactivated."
                    userAcknowledgedNotFound={userAcknowledgedNotFound}
                    editMode={true}
                    entityType="profile and settings"
                    maintenanceAckFn={this.props.maintenanceAckFn}
                    entitiesUri={urls.SETTINGS_URI}
                    reauthenticateModal={reauthenticateModal}
                    entityFormFn={entityFormFn}
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={dismissChangelogReport}
                    isConflict={isConflict}
                    conflictAckFn={conflictAckFn}
                    conflictMessagePrefix="Your Profile and Settings"
                    conflictMessageSuffix="your Profile and Settings"
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
        settings: state.serverSnapshot._embedded.usersettings[ownProps.params.settingsId],
        becameUnauthenticated: state.becameUnauthenticated,
        changelogCounts: state.changelogCounts,
        isConflict: state.api.isConflict,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelSettingsEdit: (settingsId) => {
            toastr.clean()
            dispatch(destroy(SETTINGS_FORM))
            dispatch(push(urls.SETTINGS_URI))
        },
        handleSubmit: (settingsId) => {
            toastr.clean()
            ReactGA.event({
                category: utils.GA_EVENT_CATEGORY_USER,
                action: "save settings"
            })
            dispatch(attemptSaveSettings(settingsId));
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: (settingsId) => {
            dispatch(push(urls.SETTINGS_URI))
        },
        doGoBack: () => dispatch(goBack()),
        dismissChangelogReport: () => { dispatch(changelogCountsViewed()) },
        conflictAckFn: () => dispatch(conflictDetectedUserAck()),
        downloadChangelogFn: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from settings edit page")
            dispatch(attemptDownloadChangelog(null))
        },
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditPage)
