////////////////////////////////////////////////////////////////////////////////
// Common
////////////////////////////////////////////////////////////////////////////////
export const ROOT_URI                                   = "/"
export const HOME_URI                                   = "/" //"/h" // I can't remember why I made this?
export const LOADING_URI                                = "/loading"
export const SUPPORT_URI                                = "/support"
export const RECORDS_URI                                = "/records"
export const WELCOME_URI                                = "/welcome"
export const REDIRECT_URI                               = "/redirect"
export const BUILD_VERSION_URI                          = "/buildVersion"
export const TOS_URI                                    = "/tos"
export const TOS_BARE_NAV_URI                           = "/tosBareNav"
export const TOUR_URI                                   = "/tour"
export const FAQ_URI                                    = "/faq"
export const FAQ_BARE_NAV_URI                           = "/faqBareNav"
export const PRIVACY_URI                                = "/privacy"
export const PRIVACY_BARE_NAV_URI                       = "/privacyBareNav"
export const SECURITY_URI                               = "/security"
export const SECURITY_BARE_NAV_URI                      = "/securityBareNav"
export const GENERAL_INFO_URI                           = "/generalInfo"
export const PRICING_URI                                = "/pricing"

////////////////////////////////////////////////////////////////////////////////
// Chart related
////////////////////////////////////////////////////////////////////////////////
export const CHART_CONFIG_URI                           = "/chartConfig"
// weight lifted
export const CHARTS_WLTC_URI                            = "/chartsWltc"
export const CHARTS_AVG_WLTC_URI                        = "/chartsAvgWltc"
export const CHARTS_WLDPC_URI                           = "/chartsWldpc"
export const CHARTS_WLDTC_URI                           = "/chartsWldtc"
// reps
export const CHARTS_REPS_PREVIEW_URI                   = "/chartsRepsPreview"
export const CHARTS_RTC_URI                            = "/chartsRtc"
export const CHARTS_AVG_RTC_URI                        = "/chartsAvgRtc"
export const CHARTS_RDPC_URI                           = "/chartsRdpc"
export const CHARTS_RDTC_URI                           = "/chartsRdtc"
// time between sets
export const CHARTS_TBS_PREVIEW_URI                    = "/chartsTbsPreview"
export const CHARTS_TBSTC_URI                          = "/chartsTbstc"
export const CHARTS_AVG_TBSTC_URI                      = "/chartsAvgTbstc"
export const CHARTS_TBSDPC_URI                         = "/chartsTbsdpc"
export const CHARTS_TBSDTC_URI                         = "/chartsTbsdtc"
// body measurements
export const CHARTS_BODY_URI                           = "/chartsBody"

////////////////////////////////////////////////////////////////////////////////
// User related
////////////////////////////////////////////////////////////////////////////////
export const PASSWORD_RESET_URI                         = "/users/:email/password-reset/:resetToken"
export const PASSWORD_RESET_PREPARE_ERROR_URI           = "/passwordResetPrepareError"
export const PASSWORD_RESET_PREPARE_ERROR_WITH_MASK_URI = PASSWORD_RESET_PREPARE_ERROR_URI + "/:rErrorMask"
export const PASSWORD_RESET_SUCCESS_URI                 = "/passwordResetSuccess"
export const ACCOUNT_DELETED_URI                        = "/accountDeleted"
export const LOGGED_OUT_URI                             = "/loggedOut"
export const ACCOUNT_CREATED_URI                        = "/accountCreated"
export const LOGIN_URI                                  = "/login"
export const SIGNUP_URI                                 = "/signup"
export const AUTHENTICATED_ENROLL_SYNCHRONIZE_URI       = "/authenticatedEnrollSynchronize"
export const AUTHENTICATED_ENROLL_PAYMENT_URI           = "/authenticatedEnrollPayment"
export const AUTHENTICATED_ENROLL_COMPLETE_URI          = "/authenticatedEnrollComplete"
export const UPDATE_PAYMENT_METHOD_SYNCHRONIZE_URI      = "/updatePaymentMethodSynchronize"
export const UPDATE_PAYMENT_METHOD_PAYMENT_URI          = "/updatePaymentMethodPayment"
export const UPDATE_PAYMENT_METHOD_COMPLETE_URI         = "/updatePaymentMethodComplete"
export const CANCEL_SUBSCRIPTION_SYNCHRONIZE_URI        = "/cancelSubscriptionSynchronize"
export const CANCEL_SUBSCRIPTION_EXIT_INTERVIEW_URI     = "/cancelSubscriptionExitInterview"
export const CANCEL_SUBSCRIPTION_COMPLETE_URI           = "/cancelSubscriptionComplete"
export const ACCOUNT_VERIFICATION_SUCCESS_URI           = "/verificationSuccess"
export const ACCOUNT_VERIFICATION_ERROR_URI             = "/verificationError"
export const FORGOT_PASSWORD_URI                        = "/forgot-password"
export const PASSWORD_RESET_EMAIL_SENT_URI              = "/password-reset-email-sent"
export const ACCOUNT_URI                                = "/account"
export const EDIT_ACCOUNT_URI                           = ACCOUNT_URI + "/edit"

////////////////////////////////////////////////////////////////////////////////
// Cardio Session related
////////////////////////////////////////////////////////////////////////////////
export const SELECT_CARDIO_TYPE_URI = "/selectCardioType"

////////////////////////////////////////////////////////////////////////////////
// Soreness Log related
////////////////////////////////////////////////////////////////////////////////
export const SORENESS_LOGS_URI = "/sorenessLogs"

////////////////////////////////////////////////////////////////////////////////
// Settings related
////////////////////////////////////////////////////////////////////////////////
export const SETTINGS_URI = "/settings"
export const settingsDetailUrl = settingsId => SETTINGS_URI + "/" + settingsId
export const settingsDetailTemplateUrl = () => settingsDetailUrl(":settingsId")
export const settingsEditTemplateUrl = () => settingsDetailTemplateUrl() + "/edit"
export const settingsEditUrl = settingsId => settingsDetailUrl(settingsId) + "/edit"

////////////////////////////////////////////////////////////////////////////////
// Body Measurement related
////////////////////////////////////////////////////////////////////////////////
export const BODY_JOURNAL_LOGS_URI = "/bodyJournalLogs"
export const ADD_BODY_JOURNAL_LOG_URI = "/addBodyJournalLog"
export const bodyJournalLogDetailUrl = bodyJournalLogId => BODY_JOURNAL_LOGS_URI + "/" + bodyJournalLogId
export const bodyJournalLogDetailTemplateUrl = () => bodyJournalLogDetailUrl(":bodyJournalLogId")
export const bodyJournalLogEditTemplateUrl = () => bodyJournalLogDetailTemplateUrl() + "/edit"
export const bodyJournalLogEditUrl = bodyJournalLogId => bodyJournalLogDetailUrl(bodyJournalLogId) + "/edit"
export const BODY_JOURNAL_LOGS_IMPORT_SYNCHRONIZE_URI = "/bodyJournalLogsImportSynchronize"
export const BODY_JOURNAL_LOGS_IMPORT_URI = "/bodyJournalLogsImport"
export const SELECT_BML_TYPE_URI = "/selectBmlType"
export const ENTER_BML_URI = "/enterBml"

////////////////////////////////////////////////////////////////////////////////
// Set related
////////////////////////////////////////////////////////////////////////////////
export const SELECT_BODY_SEGMENT_URI = "/selectBodySegment"
export const SELECT_MUSCLE_GROUP_URI = "/selectMuscleGroup"
export const SELECT_MOVEMENT_URI = "/selectMovement"
export const SELECT_MOVEMENT_OPTION_URI = "/selectMovementOption"
export const SETS_URI = "/sets"
export const ENTER_REPS_URI = "/enterReps"
export const setDetailUrl = setId => SETS_URI + "/" + setId
export const setDetailTemplateUrl = () => setDetailUrl(":setId")
export const setEditTemplateUrl = () => setDetailTemplateUrl() + "/edit"
export const setEditUrl = setId => setDetailUrl(setId) + "/edit"
export const SETS_IMPORT_SYNCHRONIZE_URI = "/setsImportSynchronize"
export const SETS_IMPORT_URI = "/setsImport"
export const MOVEMENT_INFO_URI = "/movementInfo"

////////////////////////////////////////////////////////////////////////////////
// Workouts related
////////////////////////////////////////////////////////////////////////////////
export const WORKOUTS_URI = "/workouts"
