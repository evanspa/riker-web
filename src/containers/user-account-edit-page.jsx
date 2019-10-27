import React from "react"
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import UserAccountForm from "../components/user-account-form.jsx"
import { attemptSaveUserAccount,
         attemptDownloadChangelog,
         changelogCountsViewed,
         maintenanceAck,
         userAccountSubmitFailedReset,
         userAccountFormResetCurrentPassword,
         bannerRemindLater,
         clearErrors } from "../actions/action-creators"
import { toUserFormModel } from "../utils"
import EntityEditDetailPage from "../components/entity-edit-detail-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import { destroy } from "redux-form"
import { USER_ACCOUNT_FORM } from "../forms"
import * as urls from "../urls"
import * as utils from "../utils"
import { toastr } from 'react-redux-toastr'
import { conflictDetectedUserAck } from "../actions/api-utils"

class UserAccountEditPage extends React.Component {
    render() {
        const {
            userId,
            cancelUserAccountEdit,
            handleSubmit,
            api,
            clearErrors,
            userAcknowledgedNotFound,
            userIdNotFound,
            becameUnauthenticated,
            doGoBack,
            changelogCounts,
            dismissChangelogReport,
            isConflict,
            conflictAckFn,
            downloadChangelogFn,
            userAccountSubmitFailed,
            userAccountSubmitFailedResetFn,
            userAccountFormResetCurrentPasswordFn,
            accountStatuses
        } = this.props
        const { responseStatus, requestInProgress, rErrorMask } = api
        let userPayload = null
        if (userId != null) {
            userPayload = {}
            userPayload["user/id"] = userId
            userPayload["user/name"] = this.props.userName
            userPayload["user/email"] = this.props.userEmail
        }
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your user account info, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit()} />
        const entityFormFn = () => <UserAccountForm
                                       responseStatus={responseStatus}
                                       containerUrl={urls.EDIT_ACCOUNT_URI}
                                       downloadChangelog={downloadChangelogFn}
                                       changelogCounts={changelogCounts}
                                       dismissChangelogReport={dismissChangelogReport}
                                       cancelUserAccountEdit={cancelUserAccountEdit}
                                       onSubmit={handleSubmit}
                                       userAccountSubmitFailed={userAccountSubmitFailed}
                                       userAccountSubmitFailedResetFn={userAccountSubmitFailedResetFn}
                                       userAccountFormResetCurrentPasswordFn={userAccountFormResetCurrentPasswordFn}
                                       requestInProgress={requestInProgress}
                                       userEmail={this.props.userEmail}
                                       userHasPassword={this.props.userHasPassword}
                                       userIdNotFound={userIdNotFound}
                                       clearErrors={clearErrors}
                                       userId={userId}
                                       initialValues={toUserFormModel(userPayload)}
                                       editMode={true}
                                       accountStatuses={accountStatuses}
                                       rErrorMask={rErrorMask} />
        return (<EntityEditDetailPage
                    doGoBack={doGoBack}
                    entity={userPayload}
                    entityGoneModalTitle="Account deactivated on other device"
                    entityGoneModalContent="It appears your Riker account has been deactivated."
                    userAcknowledgedNotFound={userAcknowledgedNotFound}
                    editMode={true}
                    maintenanceAckFn={this.props.maintenanceAckFn}
                    entityType="my account"
                    reauthenticateModal={reauthenticateModal}
                    entityFormFn={entityFormFn}
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={dismissChangelogReport}
                    isConflict={isConflict}
                    conflictAckFn={conflictAckFn}
                    conflictMessagePrefix="My account information"
                    conflictMessageSuffix="my account"
                    navigateTo={this.props.navigateTo}
                    accountStatuses={accountStatuses}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    navbarBannerOnAccountPage={true}
                    downloadChangelogFn={downloadChangelogFn} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    let submitFailed = false
    if (state.form.userAccountEdit != null) {
        submitFailed = state.form.userAccountEdit["_submitFailed"]
    }
    return {
        userAccountSubmitFailed: state.userAccountSubmitFailed,
        api: state.api,
        userId: state.serverSnapshot["user/id"],
        userName: state.serverSnapshot["user/name"],
        userEmail: state.serverSnapshot["user/email"],
        userHasPassword: state.serverSnapshot["user/has-password"],
        becameUnauthenticated: state.becameUnauthenticated,
        userIdNotFound: state.api.userIdNotFound,
        changelogCounts: state.changelogCounts,
        isConflict: state.api.isConflict,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelUserAccountEdit: () => {
            toastr.clean()
            dispatch(destroy(USER_ACCOUNT_FORM))
            dispatch(push(urls.ACCOUNT_URI))
        },
        handleSubmit: () => {
            toastr.clean()
            dispatch(attemptSaveUserAccount())
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: () => {
            dispatch(push(urls.ACCOUNT_DELETED_URI))
        },
        doGoBack: () => dispatch(goBack()),
        dismissChangelogReport: () => { dispatch(changelogCountsViewed()) },
        conflictAckFn: () => dispatch(conflictDetectedUserAck()),
        downloadChangelogFn: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from user account edit page")
            dispatch(attemptDownloadChangelog(null))
        },
        userAccountSubmitFailedResetFn: () => dispatch(userAccountSubmitFailedReset()),
        userAccountFormResetCurrentPasswordFn: () => dispatch(userAccountFormResetCurrentPassword()),
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountEditPage)
