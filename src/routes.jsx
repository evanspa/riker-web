import "babel-polyfill"
import React from "react"
import { Route, IndexRoute } from "react-router"
import App from "./containers/app.jsx"
import HomePage from "./containers/home-page.jsx"
import BuildVersionPage from "./containers/build-version-page.jsx"
import TermsOfServicePage from "./containers/tos-page.jsx"
import TermsOfServiceBareNavPage from "./containers/tos-bare-nav-page.jsx"
import SecurityPage from "./containers/security-page.jsx"
import SecurityBareNavPage from "./containers/security-bare-nav-page.jsx"
import PrivacyPolicyPage from "./containers/privacy-page.jsx"
import PrivacyPolicyBareNavPage from "./containers/privacy-bare-nav-page.jsx"
import TourPage from "./containers/tour-page.jsx"
import PricingPage from "./containers/pricing-page.jsx"
import FaqPage from "./containers/faq-page.jsx"
import FaqBareNavPage from "./containers/faq-bare-nav-page.jsx"
import GeneralInfoPage from "./containers/general-info-page.jsx"
import AuthHomePage from "./containers/authenticated-home-page.jsx"
import UnauthenticatedHomePage from "./containers/unauthenticated-home-page.jsx"
import UserAccountPage from "./containers/user-account-page.jsx"
import UserAccountEditPage from "./containers/user-account-edit-page.jsx"
import SelectCardioTypePage from "./containers/select-cardio-type-page.jsx"
import SelectBodySegmentPage from "./containers/select-body-segment-page.jsx"
import SelectMuscleGroupPage from "./containers/select-muscle-group-page.jsx"
import SelectMovementPage from "./containers/select-movement-page.jsx"
import SelectMovementOptionPage from "./containers/select-movement-option-page.jsx"
import SelectBmlTypePage from "./containers/select-bml-type-page.jsx"
import EnterRepsPage from "./containers/enter-reps-page.jsx"
import SetsPage from "./containers/sets-page.jsx"
import SetDetailPage from "./containers/set-detail-page.jsx"
import SetEditPage from "./containers/set-edit-page.jsx"
import SetsImportSynchronizePage from "./containers/sets-import-synchronize-page.jsx"
import SetsImportPage from "./containers/sets-import-page.jsx"
import MovementInfoPage from "./containers/movement-info-page.jsx"

import ChartConfigPage from "./containers/chart-config-page.jsx"

import ChartsWltcPage from "./containers/charts-wltc-page.jsx"
import ChartsAvgWltcPage from "./containers/charts-avg-wltc-page.jsx"
import ChartsWldpcPage from "./containers/charts-wldpc-page.jsx"
import ChartsWldtcPage from "./containers/charts-wldtc-page.jsx"

import ChartsRepsPreviewPage from "./containers/charts-reps-preview-page.jsx"
import ChartsRtcPage from "./containers/charts-rtc-page.jsx"
import ChartsAvgRtcPage from "./containers/charts-avg-rtc-page.jsx"
import ChartsRdpcPage from "./containers/charts-rdpc-page.jsx"
import ChartsRdtcPage from "./containers/charts-rdtc-page.jsx"

import ChartsTbsPreviewPage from "./containers/charts-rest-time-preview-page.jsx"
import ChartsTbstcPage from "./containers/charts-tbstc-page.jsx"
import ChartsAvgTbstcPage from "./containers/charts-avg-tbstc-page.jsx"
import ChartsTbsdpcPage from "./containers/charts-tbsdpc-page.jsx"
import ChartsTbsdtcPage from "./containers/charts-tbsdtc-page.jsx"

import ChartsBodyPage from "./containers/charts-body-page.jsx"

import BodyJournalLogsPage from "./containers/body-journal-logs-page.jsx"
import BodyJournalLogAddPage from "./containers/body-journal-log-add-page.jsx"
import BodyJournalLogDetailPage from "./containers/body-journal-log-detail-page.jsx"
import BodyJournalLogEditPage from "./containers/body-journal-log-edit-page.jsx"
import BmlsImportSynchronizePage from "./containers/bmls-import-synchronize-page.jsx"
import BodyJournalLogsImportPage from "./containers/body-journal-logs-import-page.jsx"
import EnterBmlPage from "./containers/enter-bml-page.jsx"

import WorkoutsPage from "./containers/workouts-page.jsx"

import LoggedOutPage from "./containers/logged-out-page.jsx"
import NotFoundPage from "./containers/not-found-page.jsx"
import LoginPage from "./containers/login-page.jsx"
import SupportPage from "./containers/support-page.jsx"
import ForgotPasswordPage from "./containers/forgot-password-page.jsx"
import PasswordResetEmailSentPage from "./containers/password-reset-email-sent-page.jsx"
import ResetPasswordPage from "./containers/reset-password-page.jsx"
import ResetPasswordSuccessPage from "./containers/reset-password-success-page.jsx"
import RedirectPage from "./containers/redirect-page.jsx"
import SignUpPage from "./containers/sign-up-page.jsx"

import AuthenticatedEnrollSynchronizePage from "./containers/authenticated-enroll-synchronize-page.jsx"
import AuthenticatedEnrollPaymentPage from "./containers/authenticated-enroll-payment-page.jsx"
import AuthenticatedEnrollCompletePage from "./containers/authenticated-enroll-complete-page.jsx"

import UpdatePaymentMethodSynchronizePage from "./containers/update-payment-method-synchronize-page.jsx"
import UpdatePaymentMethodPaymentPage from "./containers/update-payment-method-payment-page.jsx"
import UpdatePaymentMethodCompletePage from "./containers/update-payment-method-complete-page.jsx"

import CancelSubscriptionSynchronizePage from "./containers/cancel-subscription-synchronize-page.jsx"
import CancelSubscriptionExitInterviewPage from "./containers/cancel-subscription-exit-interview-page.jsx"
import CancelSubscriptionCompletePage from "./containers/cancel-subscription-complete-page.jsx"

import SettingsPage from "./containers/settings-page.jsx"
import SettingsEditPage from "./containers/settings-edit-page.jsx"
import RecordsPage from "./containers/records-page.jsx"
import AccountCreatedPage from "./containers/account-created-page.jsx"
import AccountVerifiedPage from "./containers/account-verified-page.jsx"
import AccountVerificationErrorPage from "./containers/account-verification-error-page.jsx"
import PasswordResetPrepareErrorPage from "./containers/password-reset-prepare-error-page.jsx"
import _ from "lodash"
import * as urls from "./urls"

export default function createRoutes(store, isServer) {

    function requiresAuthentication(nextState, replace) {
        const state = store.getState()
        if (!isServer && _.isEmpty(state.authToken.value)) {
            replace({
                pathname: urls.LOGIN_URI,
                state: { nextPathname: nextState.location.pathname }
            })
        } else if (isServer) {
            // when on the server, the 'replace' function does a redirect...so in riker-server.js, the
            // 'redirectLocation' parameter will be true
            let pathName
            if (nextState.location.search.length > 0) {
                pathName = urls.REDIRECT_URI + nextState.location.search + "&nextPathname=" + nextState.location.pathname
            } else {
                pathName = urls.REDIRECT_URI + "?nextPathname=" + nextState.location.pathname
            }
            replace({
                pathname: pathName,
                state: { nextPathname: nextState.location.pathname }
            })
        }
        return true;
    }

    function interstitialAuthCheck(nextState, replace) {
        const state = store.getState()
        if (isServer && !_.isEmpty(state.authToken.value)) {
            replace({
                pathname: urls.REDIRECT_URI + "?nextPathname=" + nextState.location.pathname,
                state: { nextPathname: nextState.location.pathname }
            })
        }
    }

    return (
        <Route path={urls.ROOT_URI} component={App}>
            <IndexRoute                                         component={HomePage}              onEnter={interstitialAuthCheck} />
            <Route path={urls.HOME_URI}                         component={HomePage}              onEnter={interstitialAuthCheck} />
            <Route path={urls.RECORDS_URI}                      component={RecordsPage}           onEnter={requiresAuthentication} />
            <Route path={urls.ACCOUNT_URI}                      component={UserAccountPage}       onEnter={requiresAuthentication} />
            <Route path={urls.EDIT_ACCOUNT_URI}                 component={UserAccountEditPage}   onEnter={requiresAuthentication} />

            <Route path={urls.SELECT_CARDIO_TYPE_URI}           component={SelectCardioTypePage}  onEnter={requiresAuthentication} />
            <Route path={urls.SELECT_BODY_SEGMENT_URI}          component={SelectBodySegmentPage} onEnter={requiresAuthentication} />
            <Route path={urls.SELECT_MUSCLE_GROUP_URI}          component={SelectMuscleGroupPage} onEnter={requiresAuthentication} />
            <Route path={urls.SELECT_MOVEMENT_URI}              component={SelectMovementPage}    onEnter={requiresAuthentication} />
            <Route path={urls.SELECT_MOVEMENT_OPTION_URI}       component={SelectMovementOptionPage} onEnter={requiresAuthentication} />
            <Route path={urls.SELECT_BML_TYPE_URI}              component={SelectBmlTypePage}     onEnter={requiresAuthentication} />

            <Route path={urls.CHART_CONFIG_URI}                 component={ChartConfigPage}       onEnter={requiresAuthentication} />

            <Route path={urls.CHARTS_WLDPC_URI}                 component={ChartsWldpcPage}        onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_WLTC_URI}                  component={ChartsWltcPage}        onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_AVG_WLTC_URI}              component={ChartsAvgWltcPage}     onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_WLDTC_URI}                 component={ChartsWldtcPage}       onEnter={requiresAuthentication} />

            <Route path={urls.CHARTS_REPS_PREVIEW_URI}          component={ChartsRepsPreviewPage}  onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_RDPC_URI}                  component={ChartsRdpcPage}         onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_RTC_URI}                   component={ChartsRtcPage}          onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_AVG_RTC_URI}               component={ChartsAvgRtcPage}       onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_RDTC_URI}                  component={ChartsRdtcPage}         onEnter={requiresAuthentication} />

            <Route path={urls.CHARTS_TBS_PREVIEW_URI}           component={ChartsTbsPreviewPage}   onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_TBSDPC_URI}                component={ChartsTbsdpcPage}       onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_TBSTC_URI}                 component={ChartsTbstcPage}        onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_AVG_TBSTC_URI}             component={ChartsAvgTbstcPage}     onEnter={requiresAuthentication} />
            <Route path={urls.CHARTS_TBSDTC_URI}                component={ChartsTbsdtcPage}       onEnter={requiresAuthentication} />

            <Route path={urls.CHARTS_BODY_URI}                  component={ChartsBodyPage}         onEnter={requiresAuthentication} />

            <Route path={urls.ENTER_REPS_URI}                   component={EnterRepsPage}         onEnter={requiresAuthentication} />
            <Route path={urls.SETS_URI}                         component={SetsPage}              onEnter={requiresAuthentication} />
            <Route path={urls.setDetailTemplateUrl()}           component={SetDetailPage}         onEnter={requiresAuthentication} />
            <Route path={urls.setEditTemplateUrl()}             component={SetEditPage}           onEnter={requiresAuthentication} />
            <Route path={urls.SETS_IMPORT_SYNCHRONIZE_URI}      component={SetsImportSynchronizePage} onEnter={requiresAuthentication} />
            <Route path={urls.SETS_IMPORT_URI}                  component={SetsImportPage}        onEnter={requiresAuthentication} />
            <Route path={urls.MOVEMENT_INFO_URI}                component={MovementInfoPage}      onEnter={requiresAuthentication} />

            <Route path={urls.WORKOUTS_URI}                     component={WorkoutsPage}          onEnter={requiresAuthentication} />

            <Route path={urls.SETTINGS_URI}                     component={SettingsPage}          onEnter={requiresAuthentication} />
            <Route path={urls.settingsEditTemplateUrl()}        component={SettingsEditPage}      onEnter={requiresAuthentication} />

            <Route path={urls.BODY_JOURNAL_LOGS_URI}            component={BodyJournalLogsPage}   onEnter={requiresAuthentication} />
            <Route path={urls.ADD_BODY_JOURNAL_LOG_URI}         component={BodyJournalLogAddPage} onEnter={requiresAuthentication} />
            <Route path={urls.bodyJournalLogDetailTemplateUrl()} component={BodyJournalLogDetailPage} onEnter={requiresAuthentication} />
            <Route path={urls.bodyJournalLogEditTemplateUrl()}   component={BodyJournalLogEditPage}   onEnter={requiresAuthentication} />
            <Route path={urls.BODY_JOURNAL_LOGS_IMPORT_SYNCHRONIZE_URI} component={BmlsImportSynchronizePage} onEnter={requiresAuthentication} />
            <Route path={urls.BODY_JOURNAL_LOGS_IMPORT_URI}     component={BodyJournalLogsImportPage} onEnter={requiresAuthentication} />
            <Route path={urls.ENTER_BML_URI}                    component={EnterBmlPage}          onEnter={requiresAuthentication} />

            <Route path={urls.GENERAL_INFO_URI}                 component={GeneralInfoPage}       onEnter={requiresAuthentication} />
            <Route path={urls.WELCOME_URI}                      component={UnauthenticatedHomePage} />
            <Route path={urls.TOUR_URI}                         component={TourPage} />
            <Route path={urls.PRICING_URI}                      component={PricingPage} />
            <Route path={urls.FAQ_URI}                          component={FaqPage} />
            <Route path={urls.FAQ_BARE_NAV_URI}                 component={FaqBareNavPage} />
            <Route path={urls.TOS_URI}                          component={TermsOfServicePage} />
            <Route path={urls.TOS_BARE_NAV_URI}                 component={TermsOfServiceBareNavPage} />
            <Route path={urls.PRIVACY_URI}                      component={PrivacyPolicyPage} />
            <Route path={urls.PRIVACY_BARE_NAV_URI}             component={PrivacyPolicyBareNavPage} />
            <Route path={urls.SECURITY_URI}                     component={SecurityPage} />
            <Route path={urls.SECURITY_BARE_NAV_URI}            component={SecurityBareNavPage} />
            <Route path={urls.BUILD_VERSION_URI}                component={BuildVersionPage} />
            <Route path={urls.SUPPORT_URI}                      component={SupportPage} />
            <Route path={urls.SIGNUP_URI}                       component={SignUpPage} />
            <Route path={urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI} component={AuthenticatedEnrollSynchronizePage} onEnter={requiresAuthentication} />
            <Route path={urls.AUTHENTICATED_ENROLL_PAYMENT_URI}     component={AuthenticatedEnrollPaymentPage} onEnter={requiresAuthentication} />
            <Route path={urls.AUTHENTICATED_ENROLL_COMPLETE_URI} component={AuthenticatedEnrollCompletePage} onEnter={requiresAuthentication} />
            <Route path={urls.UPDATE_PAYMENT_METHOD_SYNCHRONIZE_URI} component={UpdatePaymentMethodSynchronizePage} onEnter={requiresAuthentication} />
            <Route path={urls.UPDATE_PAYMENT_METHOD_PAYMENT_URI} component={UpdatePaymentMethodPaymentPage} onEnter={requiresAuthentication} />
            <Route path={urls.UPDATE_PAYMENT_METHOD_COMPLETE_URI} component={UpdatePaymentMethodCompletePage} onEnter={requiresAuthentication} />
            <Route path={urls.CANCEL_SUBSCRIPTION_SYNCHRONIZE_URI} component={CancelSubscriptionSynchronizePage} onEnter={requiresAuthentication} />
            <Route path={urls.CANCEL_SUBSCRIPTION_EXIT_INTERVIEW_URI} component={CancelSubscriptionExitInterviewPage} onEnter={requiresAuthentication} />
            <Route path={urls.CANCEL_SUBSCRIPTION_COMPLETE_URI} component={CancelSubscriptionCompletePage} />
            <Route path={urls.ACCOUNT_CREATED_URI}              component={AccountCreatedPage}    onEnter={requiresAuthentication} />
            <Route path={urls.ACCOUNT_VERIFICATION_SUCCESS_URI} component={AccountVerifiedPage} />
            <Route path={urls.ACCOUNT_VERIFICATION_ERROR_URI}   component={AccountVerificationErrorPage} />
            <Route path={urls.LOGIN_URI}                        component={LoginPage} />
            <Route path={urls.FORGOT_PASSWORD_URI}              component={ForgotPasswordPage} />
            <Route path={urls.PASSWORD_RESET_EMAIL_SENT_URI}    component={PasswordResetEmailSentPage} />
            <Route path={urls.PASSWORD_RESET_URI}               component={ResetPasswordPage} />
            <Route path={urls.PASSWORD_RESET_SUCCESS_URI}       component={ResetPasswordSuccessPage} />
            <Route path={urls.LOGGED_OUT_URI}                   component={LoggedOutPage} />
            <Route path={urls.PASSWORD_RESET_PREPARE_ERROR_URI} component={PasswordResetPrepareErrorPage} />
            <Route path={urls.PASSWORD_RESET_PREPARE_ERROR_WITH_MASK_URI} component={PasswordResetPrepareErrorPage} />
            <Route path={urls.REDIRECT_URI}                     component={RedirectPage} />
            <Route path="*"                                     component={HomePage} />
        </Route>
    )
}
