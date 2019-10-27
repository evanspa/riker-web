import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import UserAccountForm from "../components/user-account-form.jsx"
import { markUserForEdit,
         logout,
         logoutAllOther,
         attemptDownloadChangelog,
         maintenanceAck,
         changelogCountsViewed,
         clearErrors,
         userAccountFormResetCurrentPassword,
         subscriptionCancelledUserAck,
         subscriptionCancelFailedUserAck,
         attemptSaveNewPaymentToken,
         paymentTokenSavedUserAck,
         accountVerificationEmailSentUserAck,
         attemptResendVerificationEmail,
         bannerRemindLater } from "../actions/action-creators"
import EntityEditDetailPage from "../components/entity-edit-detail-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import { toastr } from 'react-redux-toastr'
import { toUserFormModel } from "../utils"
import * as urls from "../urls"
import * as utils from "../utils"
import _ from "lodash"

class UserAccountPage extends React.Component {
    render() {
        const {
            api,
            authToken,
            logout,
            logoutAllOther,
            logoutUri,
            logoutAllOtherUri,
            userId,
            markUserAccountForEdit,
            resendVerificationEmail,
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
            indicateAccountVerificationEmailSent,
            accountVerificationEmailSentUserAck,
            userHasPassword,
            userNextInvoiceAt,
            userNextInvoiceAmount,
            userLastInvoiceAt,
            userLastInvoiceAmount,
            userCurrentCardLast4,
            userCurrentCardBrand,
            userCurrentCardExpMonth,
            userCurrentCardExpYear,
            userLatestStripeTokenId,
            userTrialEndsAt,
            userPaidEnrollmentEstablishedAt,
            navigateTo,
            paymentTokenReceived,
            paymentTokenSaved,
            paymentTokenSavedUserAck,
            userEmail,
            cancelSubscription,
            userAccountFormResetCurrentPasswordFn,
            subscriptionCancelled,
            subscriptionCancelFailed,
            subscriptionCancelledUserAck,
            subscriptionCancelFailedUserAck,
            accountStatuses,
            redisplayBannerAfter,
            remindMeLaterFn
        } = this.props
        const { requestInProgress, rErrorMask } = api
        let userPayload = null
        if (userId != null) {
            userPayload = {}
            userPayload["user/id"] = userId
            userPayload["user/name"] = this.props.userName
            userPayload["user/email"] = userEmail
            userPayload["user/verified-at"] = this.props.userVerifiedAt
        }
        const entityFormFn = () => <UserAccountForm
                                       api={api}
                                       requestInProgress={requestInProgress}
                                       containerUrl={urls.ACCOUNT_URI}
                                       rErrorMask={rErrorMask}
                                       subscriptionCancelled={subscriptionCancelled}
                                       subscriptionCancelFailed={subscriptionCancelFailed}
                                       subscriptionCancelledUserAck={subscriptionCancelledUserAck}
                                       subscriptionCancelFailedUserAck={subscriptionCancelFailedUserAck}
                                       userAccountFormResetCurrentPasswordFn={userAccountFormResetCurrentPasswordFn}
                                       cancelSubscription={cancelSubscription}
                                       downloadChangelog={downloadChangelogFn}
                                       changelogCounts={changelogCounts}
                                       dismissChangelogReport={dismissChangelogReport}
                                       authToken={authToken}
                                       logout={logout}
                                       logoutAllOther={logoutAllOther}
                                       logoutUri={logoutUri}
                                       logoutAllOtherUri={logoutAllOtherUri}
                                       navigateTo={navigateTo}
                                       paymentTokenReceived={paymentTokenReceived}
                                       paymentTokenSaved={paymentTokenSaved}
                                       paymentTokenSavedUserAck={paymentTokenSavedUserAck}
                                       becameUnauthenticated={becameUnauthenticated}
                                       requestInProgress={api.requestInProgress}
                                       userVerifiedAt={userPayload['user/verified-at']}
                                       userEmail={userEmail}
                                       userHasPassword={userHasPassword}
                                       userNextInvoiceAt={userNextInvoiceAt}
                                       userNextInvoiceAmount={userNextInvoiceAmount}
                                       userLastInvoiceAt={userLastInvoiceAt}
                                       userLastInvoiceAmount={userLastInvoiceAmount}
                                       userCurrentCardLast4={userCurrentCardLast4}
                                       userLatestStripeTokenId={userLatestStripeTokenId}
                                       userCurrentCardBrand={userCurrentCardBrand}
                                       userCurrentCardExpMonth={userCurrentCardExpMonth}
                                       userCurrentCardExpYear={userCurrentCardExpYear}
                                       userTrialEndsAt={userTrialEndsAt}
                                       userPaidEnrollmentEstablishedAt={userPaidEnrollmentEstablishedAt}
                                       markUserAccountForEdit={markUserAccountForEdit}
                                       resendVerificationEmail={resendVerificationEmail}
                                       userAcknowledgedNotFound={userAcknowledgedNotFound}
                                       userIdNotFound={userIdNotFound}
                                       clearErrors={clearErrors}
                                       userId={userId}
                                       initialValues={toUserFormModel(userPayload)}
                                       indicateAccountVerificationEmailSent={indicateAccountVerificationEmailSent}
                                       accountVerificationEmailSentUserAck={accountVerificationEmailSentUserAck}
                                       accountStatuses={accountStatuses}
                                       editMode={false} />
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="Oops.  We need you to re-authenticate."
                                        operationOnLightLoginSuccess={downloadChangelogFn} />
        return (<EntityEditDetailPage
                    doGoBack={doGoBack}
                    entity={userPayload}
                    entityGoneModalTitle="Account deactivated on other device"
                    entityGoneModalContent="It appears your Riker account has been deactivated."
                    userAcknowledgedNotFound={userAcknowledgedNotFound}
                    reauthenticateModal={reauthenticateModal}
                    editMode={false}
                    goBackLinkText="&#8592; back"
                    entityType="my account"
                    entityFormFn={entityFormFn}
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={dismissChangelogReport}
                    maintenanceAckFn={this.props.maintenanceAckFn}
                    isConflict={isConflict}
                    conflictAckFn={conflictAckFn}
                    navigateTo={navigateTo}
                    accountStatuses={accountStatuses}
                    redisplayBannerAfter={redisplayBannerAfter}
                    remindMeLaterFn={remindMeLaterFn}
                    navbarBannerOnAccountPage={true}
                    downloadChangelogFn={downloadChangelogFn} />)
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
UserAccountPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const logoutLink = state.serverSnapshot._links.logout
    let logoutUri = ""
    if (!_.isEmpty(logoutLink)) {
        logoutUri = logoutLink.href
    }
    const logoutAllOtherLink = state.serverSnapshot._links["logout-all-other"]
    let logoutAllOtherUri = ""
    if (!_.isEmpty(logoutAllOtherLink)) {
        logoutAllOtherUri = logoutAllOtherLink.href
    }
    return {
        authToken: state.authToken.value,
        api: state.api,
        logoutUri: logoutUri,
        logoutAllOtherUri: logoutAllOtherUri,
        userId:                          state.serverSnapshot["user/id"],
        userName:                        state.serverSnapshot["user/name"],
        userEmail:                       state.serverSnapshot["user/email"],
        userHasPassword:                 state.serverSnapshot["user/has-password"],
        userNextInvoiceAt:               state.serverSnapshot["user/next-invoice-at"],
        userNextInvoiceAmount:           state.serverSnapshot["user/next-invoice-amount"],
        userLastInvoiceAt:               state.serverSnapshot["user/last-invoice-at"],
        userLastInvoiceAmount:           state.serverSnapshot["user/last-invoice-amount"],
        userCurrentCardLast4:            state.serverSnapshot["user/current-card-last4"],
        userCurrentCardBrand:            state.serverSnapshot["user/current-card-brand"],
        userCurrentCardExpMonth:         state.serverSnapshot["user/current-card-exp-month"],
        userCurrentCardExpYear:          state.serverSnapshot["user/current-card-exp-year"],
        userLatestStripeTokenId:         state.serverSnapshot["user/latest-stripe-token-id"],
        userTrialEndsAt:                 state.serverSnapshot["user/trial-ends-at"],
        userPaidEnrollmentEstablishedAt: state.serverSnapshot["user/paid-enrollment-established-at"],
        userVerifiedAt:                  state.serverSnapshot["user/verified-at"],
        becameUnauthenticated: state.becameUnauthenticated,
        userIdNotFound: state.api.userIdNotFound,
        changelogCounts: state.changelogCounts,
        isConflict: state.api.isConflict,
        indicateAccountVerificationEmailSent: state.api.indicateAccountVerificationEmailSent,
        paymentTokenSaved: state.api.paymentTokenSaved,
        paymentTokenSaveError: state.api.paymentTokenSaveError,
        subscriptionCancelled: state.api.subscriptionCancelled,
        subscriptionCancelFailed: state.api.subscriptionCancelFailed,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (logoutUri, authToken) => {
            dispatch(logout(logoutUri, authToken))
        },
        logoutAllOther: (logoutAllOtherUri, authToken) => {
            dispatch(logoutAllOther(logoutAllOtherUri, authToken))
        },
        markUserAccountForEdit: () => {
            toastr.clean()
            dispatch(markUserForEdit())
            dispatch(push(urls.EDIT_ACCOUNT_URI))
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: () => {
            dispatch(push(urls.ACCOUNT_DELETED_URI))
        },
        resendVerificationEmail: () => dispatch(attemptResendVerificationEmail()),
        accountVerificationEmailSentUserAck: () => dispatch(accountVerificationEmailSentUserAck()),
        doGoBack: () => dispatch(goBack()),
        dismissChangelogReport: () => { dispatch(changelogCountsViewed()) },
        conflictAckFn: () => dispatch(conflictDetectedUserAck()),
        downloadChangelogFn: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from user account page")
            dispatch(attemptDownloadChangelog(null))
        },
        navigateTo: url => dispatch(push(url)),
        paymentTokenReceived: token => {
            dispatch(attemptSaveNewPaymentToken(token, "Completing payment method update..."))
        },
        paymentTokenSavedUserAck: () => {
            toastr.clean()
            dispatch(paymentTokenSavedUserAck())
        },
        userAccountFormResetCurrentPasswordFn: () => dispatch(userAccountFormResetCurrentPassword()),
        cancelSubscription: () => {
            toastr.clean()
            dispatch(push(urls.CANCEL_SUBSCRIPTION_SYNCHRONIZE_URI))
        },
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountPage)
