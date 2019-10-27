import React from "react"
import { replace, push, goBack } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import * as actionTypes from "./action-types"
import { toastr } from 'react-redux-toastr'
import { actions as toastrActions } from 'react-redux-toastr'
import * as utils from "../utils"
import * as apiUtils from "./api-utils"
import * as urls from "../urls"
import * as forms from "../forms"
import * as entkeys from "../entity-keys"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import * as mtparts from "../media-type-parts"
import _ from "lodash"
import ReactGA from "react-ga"

////////////////////////////////////////////////////////////////////////////////
// Common definitions
////////////////////////////////////////////////////////////////////////////////
let urlPrefix
if (utils.isProduction()) {
    urlPrefix = "https://www.rikerapp.com"
} else {
    urlPrefix = "https://dev.rikerapp.com"
}

export const cancelRecordEdit = () => ({ type: actionTypes.CANCEL_RECORD_EDIT })
export const clearErrors = () => ({ type: actionTypes.CLEAR_ERRORS })
export const signUpSuccess = () => ({ type: actionTypes.SIGN_UP_SUCCESS })
export const loginSuccess = () => ({ type: actionTypes.LOGIN_SUCCESS })
export const receiveServerSnapshot = serverSnapshot => ({ type: actionTypes.SERVER_SNAPSHOT_RECEIVED, serverSnapshot })
export const becameReauthenticated = () => ({ type: actionTypes.BECAME_REAUTHENTICATED })
export const receiveAuthenticationToken = authToken => ({ type: actionTypes.AUTH_TOKEN_RECEIVED, authToken })
export const indicateAccountVerificationEmailSent = () => ({ type: actionTypes.ACCOUNT_VERIFICATION_EMAIL_SENT })
export const accountVerificationEmailSentUserAck = () => ({ type: actionTypes.ACCOUNT_VERIFICATION_EMAIL_SENT_USER_ACK })
const makeMediaType = entityName => "application/vnd.riker." + entityName + "-v0.0.1+json"
const makeContentType = (mediaType, charset) => mediaType + ";charset=" + charset
const charset = "UTF-8"

export const bannerRemindAfterDate = redisplayBannerAfter => ({ type: actionTypes.BANNER_REMIND_LATER, redisplayBannerAfter })

export const bannerRemindLater = () => {
    ReactGA.event({
        category: utils.GA_EVENT_CATEGORY_USER,
        action: "banner remind later"
    })
    return bannerRemindAfterDate(moment().add(1, 'day').valueOf())
}

export const bodyLiftWtExplanationAckAtValue = bodyLiftWtExplanationAckAt => ({ type: actionTypes.BODY_LIFT_WT_EXPLANATION_ACK_VALUE, bodyLiftWtExplanationAckAt })
export const bodyLiftWtExplanationAck = () => ({ type: actionTypes.BODY_LIFT_WT_EXPLANATION_ACK })

export const maintenanceAckValue = maintenanceAckAt => ({ type: actionTypes.MAINTENANCE_ACK_VALUE, maintenanceAckAt })
export const maintenanceAck = () => ({ type: actionTypes.MAINTENANCE_ACK })

export const muscleGroupExpanded = muscleGroupId => ({ type: actionTypes.MUSCLE_GROUP_EXPANDED, muscleGroupId })

////////////////////////////////////////////////////////////////////////////////
// Chart Cache related
////////////////////////////////////////////////////////////////////////////////
export const addToChartCache = (cacheKey, value)  => {
    return { type: actionTypes.ADD_TO_CHART_CACHE,
             cacheKey: cacheKey,
             value: value }
}
export const receiveChartCache = chartCache => ({ type: actionTypes.CHART_CACHE_RECEIVED, chartCache })

////////////////////////////////////////////////////////////////////////////////
// Movement Suggestion related
////////////////////////////////////////////////////////////////////////////////
export const makeOnMovementSuggestionSelectedFn = dispatch => (movement, movementVariants) => {
    dispatch(bodySegmentSelected(null))
    dispatch(muscleGroupSelected(null))
    dispatch(movementSelected(movement.payload["movement/id"]))
    const variantsForMovement = utils.movementVariantItems(movement, _.values(movementVariants))
    if (variantsForMovement.length > 1) {
        dispatch(push(urls.SELECT_MOVEMENT_OPTION_URI))
    } else if (variantsForMovement.length > 0) {
        dispatch(movementVariantSelected(variantsForMovement[0].payload["movementvariant/id"]))
        dispatch(push(urls.ENTER_REPS_URI))
    } else {
        dispatch(movementVariantSelected(null)) // e.g., movement is a body-lift
        dispatch(push(urls.ENTER_REPS_URI))
    }
}

////////////////////////////////////////////////////////////////////////////////
// Chart config related
////////////////////////////////////////////////////////////////////////////////
export const receiveAllChartConfig = allChartConfig => ({ type: actionTypes.ALL_CHART_CONFIG_RECEIVED, allChartConfig })

const chartAnimation = (chartId, enable, isGlobalConfig) => {
    const chartConfig = {}
    chartConfig[chartId] = {
        id: chartId,
        animate: enable
    }
    return { type: isGlobalConfig ? actionTypes.RECEIVE_GLOBAL_CHART_CONFIG : actionTypes.RECEIVE_CHART_CONFIG, chartConfig, chartId }
}

export const disableChartAnimation = (chartId, isGlobalConfig = false) => {
    return chartAnimation(chartId, false, isGlobalConfig)
}

export const enableChartAnimation = (chartId, isGlobalConfig = false) => {
    return chartAnimation(chartId, true, isGlobalConfig)
}

export const setChartDateRange = (chartId, rangeStartDate, rangeEndDate) => {
    const chartConfig = {}
    chartConfig[chartId] = {
        id: chartId,
        startDate: rangeStartDate,
        endDate: rangeEndDate
    }
    return { type: actionTypes.RECEIVE_CHART_CONFIG, chartConfig, chartId }
}

export const allChartsDisableAnimation = () => ({ type: actionTypes.ALL_CHARTS_DISABLE_ANIMATION })

const setManuallyConfiguredChartConfig = (chartId, isManuallyConfigured, isGlobalConfig) => {
    const chartConfig = {}
    chartConfig[chartId] = {
        id: chartId,
        manuallyConfigured: isManuallyConfigured
    }
    return { type: isGlobalConfig ? actionTypes.RECEIVE_GLOBAL_CHART_CONFIG : actionTypes.RECEIVE_CHART_CONFIG, chartConfig, chartId }
}

export const manuallyConfiguredChartConfig = (chartId, isGlobalConfig) => setManuallyConfiguredChartConfig(chartId, true, isGlobalConfig)

export const notManuallyConfiguredChartConfig = (chartId, isGlobalConfig) => setManuallyConfiguredChartConfig(chartId, false, isGlobalConfig)

export const submitChartConfig = (chartId, isGlobalConfig) => {
    return (dispatch, getState) => {
        const state = getState()
        const chartConfigForm = state.form[forms.CHART_CONFIG_FORM]
        const chartConfig = {}
        chartConfig[chartId] = {
            id: chartId,
            startDate: moment(chartConfigForm["rangeStartDate"].value, utils.DATE_DISPLAY_FORMAT).valueOf(),
            endDate: moment(chartConfigForm["rangeEndDate"].value, utils.DATE_DISPLAY_FORMAT).valueOf(),
            boundedEndDate: chartConfigForm["boundedEndDate"].value,
            aggregateBy: chartConfigForm["aggregateBy"].value,
            suppressPieSliceLabels: chartConfigForm["suppressPieSliceLabels"].value
        }
        dispatch(goBack())
        dispatch({ type: isGlobalConfig ? actionTypes.RECEIVE_GLOBAL_CHART_CONFIG : actionTypes.RECEIVE_CHART_CONFIG, chartConfig, chartId })
        dispatch(enableChartAnimation(chartId, isGlobalConfig))
        dispatch(manuallyConfiguredChartConfig(chartId, isGlobalConfig))
        toastr.success("Chart config applied.", apiUtils.toastConfigSuccess())
    }
}

export const clearChartConfig = (chartId, isGlobalConfig, aggregateBy) => {
    const chartConfig = {}
    chartConfig[chartId] = {
        id: chartId,
        startDate: null,
        endDate: null,
        aggregateBy: aggregateBy,
        manuallyConfigured: false,
        boundedEndDate: false,
        animate: true,
        suppressPieSliceLabels: false
    }
    return { type: isGlobalConfig ? actionTypes.RECEIVE_GLOBAL_CHART_CONFIG : actionTypes.RECEIVE_CHART_CONFIG, chartConfig, chartId }
}

////////////////////////////////////////////////////////////////////////////////
// Cardio session related
////////////////////////////////////////////////////////////////////////////////
export const cardioTypeSelected = cardioTypeId => ({ type: actionTypes.CARDIO_TYPE_SELECTED, cardioTypeId })

////////////////////////////////////////////////////////////////////////////////
// Changelog related
////////////////////////////////////////////////////////////////////////////////
const changelogMediaType = makeMediaType(mtparts.CHANGELOG_MT_PART)
const getChangelogUri = (state, NOT_USED) => state.serverSnapshot._links.changelog.href
const getRefDataChangelogUri = (state, NOT_USED) => state.serverSnapshot._links.refdatachangelog.href
const getChangelogUpdatedAt = state => state.mostRecentUpdatedAt.value

const countChangesForChangelogEntity = (changelogEntityMediaType,
                                        changelogEntityPayload,
                                        mtpart,
                                        currentServerSnapshot,
                                        entitiesKey,
                                        entityIdKey,
                                        entityDeletedAtKey,
                                        entityUpdatedAtKey) => {
                                            let changeCounts = {deleted: 0, updated: 0, added: 0}
                                            const changelogEntityMtPart = changelogEntityMediaType.match(utils.mediaTypePartRegex)[1]
                                            if (changelogEntityMtPart == mtpart) {
                                                const matchingEntity = currentServerSnapshot._embedded[entitiesKey][changelogEntityPayload[entityIdKey]]
                                                if (matchingEntity != null) {
                                                    if (changelogEntityPayload[entityDeletedAtKey] != null) {
                                                        _.update(changeCounts, "deleted", currentCount => currentCount + 1)
                                                    } else if (changelogEntityPayload[entityUpdatedAtKey] != matchingEntity.payload[entityUpdatedAtKey]) {
                                                        _.update(changeCounts, "updated", currentCount => currentCount + 1)
                                                    } else {
                                                        // the changelog entity downloaded was due to edits made to it in the user's browser
                                                    }
                                                } else {
                                                    if (changelogEntityPayload[entityDeletedAtKey] != null) {
                                                        // the entity was created and deleted before it was ever downloaded to the user's browser
                                                    } else {
                                                        _.update(changeCounts, "added", currentCount => currentCount + 1)
                                                    }
                                                }
                                            }
                                            return changeCounts
}

const changeCountsFromChangelog = (currentServerSnapshot, changelog) => {
    const zeroCounts = () => ({ deleted: 0, updated: 0, added: 0 })
    const changeCounts = {
        deleted: 0, // overall deleted count
        updated: 0, // overall updated count
        added:   0  // overall added count
    }
    changeCounts[entkeys.originationDevices] = zeroCounts()
    changeCounts[entkeys.bodySegments]     = zeroCounts()
    changeCounts[entkeys.muscleGroups]     = zeroCounts()
    changeCounts[entkeys.muscles]          = zeroCounts()
    changeCounts[entkeys.muscleAliases]    = zeroCounts()
    changeCounts[entkeys.movements]        = zeroCounts()
    changeCounts[entkeys.movementAliases]  = zeroCounts()
    changeCounts[entkeys.movementVariants] = zeroCounts()
    changeCounts[entkeys.cardioTypes]      = zeroCounts()
    changeCounts[entkeys.walkingPaces]     = zeroCounts()
    changeCounts[entkeys.usersettings]     = zeroCounts()
    changeCounts[entkeys.sets]             = zeroCounts()
    changeCounts[entkeys.supersets]        = zeroCounts()
    changeCounts[entkeys.cardioLogs]       = zeroCounts()
    changeCounts[entkeys.bodyJournalLogs]  = zeroCounts()
    changeCounts[entkeys.sorenessLogs]     = zeroCounts()
    const changedEntities = changelog._embedded
    for (let i = 0; i < changedEntities.length; i++) {
        const changelogEntityMediaType = changedEntities[i]["media-type"]
        const changelogEntityPayload = changedEntities[i]["payload"]
        const changelogEntityMtPart = changelogEntityMediaType.match(utils.mediaTypePartRegex)[1]
        if (changelogEntityMtPart == mtparts.USER_MT_PART) {
            if (changelogEntityPayload["user/updated-at"] != currentServerSnapshot["user/updated-at"]) {
                let userChangeCounts = {deleted: 0, updated: 0, added: 0}
                _.update(userChangeCounts, "updated", currentCount => currentCount + 1)
                changeCounts["user"] = userChangeCounts
            }
        }
        const doCountChangesForChangelogEntity = (mtpart, keyPrefix, entitiesKey) => {
            const entityChangeCounts = countChangesForChangelogEntity(changelogEntityMediaType,
                                                                      changelogEntityPayload,
                                                                      mtpart,
                                                                      currentServerSnapshot,
                                                                      entitiesKey,
                                                                      keyPrefix + "/id",
                                                                      keyPrefix + "/deleted-at",
                                                                      keyPrefix + "/updated-at")
            // update overall counts
            _.update(changeCounts, "added",   currentCount => currentCount + entityChangeCounts["added"])
            _.update(changeCounts, "updated", currentCount => currentCount + entityChangeCounts["updated"])
            _.update(changeCounts, "deleted", currentCount => currentCount + entityChangeCounts["deleted"])
            // update individual counts
            _.update(changeCounts[entitiesKey], "added",   currentCount => currentCount + entityChangeCounts["added"])
            _.update(changeCounts[entitiesKey], "updated", currentCount => currentCount + entityChangeCounts["updated"])
            _.update(changeCounts[entitiesKey], "deleted", currentCount => currentCount + entityChangeCounts["deleted"])
        }
        // ref data
        doCountChangesForChangelogEntity(mtparts.ORIGINATION_DEVICE_MT_PART, "originationdevice", entkeys.originationDevices)
        doCountChangesForChangelogEntity(mtparts.BODY_SEGMENT_MT_PART,     "bodysegment",     entkeys.bodySegments)
        doCountChangesForChangelogEntity(mtparts.MUSCLE_GROUP_MT_PART,     "musclegroup",     entkeys.muscleGroups)
        doCountChangesForChangelogEntity(mtparts.MUSCLE_MT_PART,           "muscle",          entkeys.muscles)
        doCountChangesForChangelogEntity(mtparts.MUSCLE_ALIAS_MT_PART,     "musclealias",     entkeys.muscleAliases)
        doCountChangesForChangelogEntity(mtparts.MOVEMENT_MT_PART,         "movement",        entkeys.movements)
        doCountChangesForChangelogEntity(mtparts.MOVEMENT_ALIAS_MT_PART,   "movementalias",   entkeys.movementAliases)
        doCountChangesForChangelogEntity(mtparts.MOVEMENT_VARIANT_MT_PART, "movementvariant", entkeys.movementVariants)
        doCountChangesForChangelogEntity(mtparts.CARDIO_TYPE_MT_PART,      "cardiotype",      entkeys.cardioTypes)
        doCountChangesForChangelogEntity(mtparts.WALKING_PACE_MT_PART,     "walkingpace",     entkeys.walkingPaces)
        // user data
        doCountChangesForChangelogEntity(mtparts.USER_SETTINGS_MT_PART,    "usersettings",   entkeys.usersettings)
        doCountChangesForChangelogEntity(mtparts.SET_MT_PART,              "set",            entkeys.sets)
        doCountChangesForChangelogEntity(mtparts.SUPERSET_MT_PART,         "superset",       entkeys.supersets)
        doCountChangesForChangelogEntity(mtparts.CARDIO_SESSION_MT_PART,   "cardiosession",  entkeys.cardioLogs)
        doCountChangesForChangelogEntity(mtparts.BODY_JOURNAL_LOG_MT_PART, "bodyjournallog", entkeys.bodyJournalLogs)
        doCountChangesForChangelogEntity(mtparts.SORENESS_LOG_MT_PART,     "soreness",       entkeys.sorenessLogs)
    }
    return changeCounts
}

export const receiveServerChangelog = serverChangelog => ({ type: actionTypes.SERVER_CHANGELOG_RECEIVED, serverChangelog })

export const attemptDownloadChangelog = refreshUri => {
    return (dispatch, getState) => {
        toastr.info("Synchronizing...", apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        apiUtils.appendAuthenticatedCommonHeaders(headers, changelogMediaType, state.authToken.value)
        headers.append(apiUtils.R_IF_MODIFIED_SINCE_HEADER, getChangelogUpdatedAt(state))
        const entityUri = getChangelogUri(state)
        const editsDownloadedHandler = changeCounts => {
            dispatch({type: actionTypes.SERVER_CHANGELOG_COUNTS_COMPUTED, changeCounts})
        }
        const alreadyHaveLatestHandler = () => {
            editsDownloadedHandler({added: 0, updated: 0, deleted: 0})
        }
        const errorHandler = () => {
            toastr.error("There was a problem attempting to synchronize your account.  Try again later.", apiUtils.toastConfigError())
        }
        const startMoment = moment()
        return fetch(entityUri, apiUtils.getInitForFetch(headers))
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "download changelog")
                dispatch(toastrActions.clean())
                dispatch(apiUtils.apiRequestDone())
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    apiUtils.toastrMaintenanceOutage()
                } else if (!apiUtils.checkBecameUnauthenticated(response, dispatch)) {
                    if (response.status == 304) {
                        alreadyHaveLatestHandler()
                    } else if (response.status == 200) {
                        return response.json().then(json => {
                            const changeCounts = changeCountsFromChangelog(state.serverSnapshot, json)
                            editsDownloadedHandler(changeCounts)
                            dispatch(receiveServerChangelog(json))
                            if (refreshUri != null) {
                                dispatch(push(refreshUri))
                            }
                        })
                    } else if (!response.ok) {
                        errorHandler()
                    }
                }
            })
            .catch(error => {
                dispatch(apiUtils.apiRequestDone())
                dispatch(toastrActions.clean())
                errorHandler()
            })
      }
}

export const changelogCountsViewed = () => ({ type: actionTypes.SERVER_CHANGELOG_COUNTS_VIEWED })

////////////////////////////////////////////////////////////////////////////////
// Plan related
////////////////////////////////////////////////////////////////////////////////
const planMediaType = makeMediaType(mtparts.PLAN_MT_PART)
const getPlanUri = (state, NOT_USED) => state.serverSnapshot._links.plan.href

export const receiveServerPlan = serverPlan => ({ type: actionTypes.SERVER_PLAN_RECEIVED, serverPlan })

export const attemptDownloadPlan = (replacementUri) => {
    return (dispatch, getState) => {
        toastr.info("Getting latest plan info...", apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        apiUtils.appendCommonHeaders(headers, planMediaType)
        const entityUri = getPlanUri(state)
        const errorHandler = () => {
            toastr.error("There was a problem attempting to download the latest plan information.  Please try again later.", apiUtils.toastConfigError())
        }
        const startMoment = moment()
        return fetch(entityUri, apiUtils.getInitForFetch(headers))
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "download plan")
                dispatch(toastrActions.clean())
                dispatch(apiUtils.apiRequestDone())
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    apiUtils.toastrMaintenanceOutage()
                } else if (response.status == 200) {
                    return response.json().then(json => {
                        dispatch(receiveServerPlan(json))
                        if (replacementUri != null) {
                            dispatch(replace(replacementUri))
                        }
                    })
                } else if (!response.ok) {
                    errorHandler()
                }
            })
            .catch(error => {
                dispatch(apiUtils.apiRequestDone())
                dispatch(toastrActions.clean())
                errorHandler()
            })
      }
}

////////////////////////////////////////////////////////////////////////////////
// Settings related
////////////////////////////////////////////////////////////////////////////////
const settingsMediaType = makeMediaType(mtparts.USER_SETTINGS_MT_PART)
const settingsContentType = makeContentType(settingsMediaType, charset)
const getSettingsUri = (state, settingsId) => state.serverSnapshot._embedded.usersettings[settingsId].location
const getSettingsUpdatedAt = (state, settingsId) => state.serverSnapshot._embedded.usersettings[settingsId].payload["usersettings/updated-at"]
export const receiveServerSettings = serverSettings => ({ type: actionTypes.SERVER_SETTINGS_RECEIVED, serverSettings })
export const serverSettingsNotFound = serverSettingsId => ({ type: actionTypes.SERVER_SETTINGS_NOT_FOUND, serverSettingsId: serverSettingsId })
export const markSettingsForEdit = settingsId => ({ type: actionTypes.MARK_SETTINGS_FOR_EDIT, settingsId })

const settingsRequestPayload = (form, state) => {
    let payload = {}
    utils.formToModelIfNotNull(form, "weightUom", payload, "usersettings/weight-uom", null, utils.toWeightUnitsValue)
    utils.formToModelIfNotNull(form, "sizeUom", payload, "usersettings/size-uom", null, utils.toLengthUnitsValue)
    utils.formToModelIfNotNull(form, "distanceUom", payload, "usersettings/distance-uom", null, utils.toDistanceUnitsValue)
    utils.formToModelIfNotNull(form, "weightIncDecAmount", payload, "usersettings/weight-inc-dec-amount")
    return payload
}

export const attemptSaveSettings = apiUtils.makeAttemptSaveEntityFn(
    "profile and settings",
    settingsContentType,
    settingsMediaType,
    getSettingsUpdatedAt,
    getSettingsUri,
    settingsRequestPayload,
    forms.SETTINGS_FORM,
    attemptDownloadChangelog,
    receiveServerSettings,
    serverSettingsNotFound)

////////////////////////////////////////////////////////////////////////////////
// File import related
////////////////////////////////////////////////////////////////////////////////
const getSetsFileImportUri = state => state.serverSnapshot._links.setsfileimport.href
const getBodyJournalLogsFileImportUri = state => state.serverSnapshot._links.bodyjournallogsfileimport.href
export const fileImportSuccessUserAck = () => ({ type: actionTypes.FILE_IMPORT_SUCCESS_USER_ACK })
export const fileImportErrorUserAck = () => ({ type: actionTypes.FILE_IMPORT_ERROR_USER_ACK })

export const attemptSetsFileImport = apiUtils.makeAttemptFileImport(getSetsFileImportUri, "sets")
export const attemptBodyJournalLogsFileImport = apiUtils.makeAttemptFileImport(getBodyJournalLogsFileImportUri, "body measurement logs")

////////////////////////////////////////////////////////////////////////////////
// User account related
////////////////////////////////////////////////////////////////////////////////
const LIGHT_LOGIN_URI            = urlPrefix + "/riker/d/light-login"
const LOGIN_URI                  = urlPrefix + "/riker/d/login"
const SIGNUP_URI                 = urlPrefix + "/riker/d/users"
const CONTINUE_WITH_FACEBOOK_URI = urlPrefix + "/riker/d/zNPlCGdOaLK_ZEH3Da6MYWm_x-dd-SrnDR02HorO/continue-with-facebook"
const SEND_PWD_RESET_EMAIL_URI   = urlPrefix + "/riker/d/send-password-reset-email"
const PASSWORD_RESET_URI         = urlPrefix + "/riker/d/password-reset"
const userMediaType = makeMediaType(mtparts.USER_MT_PART)
const userContentType = makeContentType(userMediaType, charset)
const resendVerificationEmailUri = userUri => userUri + "/send-verification-email"
const getUserAccountUri = (state, userId) => state.userUri.value
const getUserAccountUpdatedAt = (state, userId) => state.serverSnapshot["user/updated-at"]
export const receiveUserUri = userUri => ({ type: actionTypes.USER_URI_RECEIVED, userUri })
export const logoutRequestInitiated = () => ({ type: actionTypes.LOGOUT_REQUEST_INITIATED })
export const logoutRequestDone = () => ({ type: actionTypes.LOGOUT_REQUEST_DONE })
export const markUserForEdit = () => ({ type: actionTypes.MARK_USER_FOR_EDIT })
export const passwordResetEmailSent = () => ({ type: actionTypes.PASSWORD_RESET_EMAIL_SENT })
export const presentedLightLoginForm = () => ({ type: actionTypes.PRESENTED_LIGHT_LOGIN_FORM })
export const receiveServerUser = serverUser => ({ type: actionTypes.SERVER_USER_RECEIVED, serverUser })
export const passwordPromptedAndSuccessForDangerousAction = () => ({ type: actionTypes.PASSWORD_PROMPTED_AND_SUCCESS_FOR_DANGEROUS_ACTION })
export const receivePasswordPromptedAndSuccessForDangerousActionValue = passwordPromptedAndSuccessForDangerousActionAt => ({ type: actionTypes.PASSWORD_PROMPTED_AND_SUCCESS_FOR_DANGEROUS_ACTION_VALUE_RECEIVED, passwordPromptedAndSuccessForDangerousActionAt })
export const serverUserNotFound = userId => ({ type: actionTypes.SERVER_USER_NOT_FOUND })
export const userAccountSubmitFailedReset = () => ({ type: actionTypes.USER_ACCOUNT_SUBMIT_FAILED_RESET })
export const userAccountFormResetCurrentPassword = () => ({ type: "redux-form/CHANGE",
                                                            field: "currentPassword",
                                                            value: "",
                                                            touch: false,
                                                            form: forms.USER_ACCOUNT_FORM})
export const subscriptionCancelled = () => ({ type: actionTypes.SUBSCRIPTION_CANCELLED })
export const subscriptionCancelledUserAck = () => ({ type: actionTypes.SUBSCRIPTION_CANCELLED_USER_ACK })
export const subscriptionCancelFailed = () => ({ type: actionTypes.SUBSCRIPTION_CANCELLED_ERROR })
export const subscriptionCancelFailedUserAck = () => ({ type: actionTypes.SUBSCRIPTION_CANCELLED_ERROR_USER_ACK })

const userRequestPayload = (form, state) => {
    let payload = {}
    utils.formToModelIfNotNull(form, "name", payload, "user/name")
    utils.formToModelIfNotNull(form, "email", payload, "user/email")
    utils.formToModelIfNotNull(form, "currentPassword", payload, "user/current-password")
    if (form.password.value != null && form.password.value.length > 0) {
        payload["user/password"] = form.password.value
    }
    return payload
}

const userRequestPayloadForCancelSubscription = (form, state) => {
    let payload = {}
    payload["user/current-password"] = form.currentPassword.value
    payload["user/cancel-subscription"] = true
    return payload
}

export const logout = (logoutUri, authToken) => {
    return (dispatch) => {
        toastr.info('Processing logout...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendAuthenticatedCommonHeaders(headers, userMediaType, authToken)
        ReactGA.set({userId: null})
        const startMoment = moment()
        return fetch(logoutUri, apiUtils.postInitForFetch(headers, {}))
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "logout")
                dispatch(apiUtils.apiRequestDone())
                dispatch(logoutRequestDone())
                dispatch(push(urls.LOGGED_OUT_URI))
                toastr.clean()
            })
            .catch(error => {
                // because we're not going to 'gracefully' handle this from a user-perspective...because the user can't
                // really do anything about it, and, because we'll still be deleting from localStorage the authentication
                // token, we're pretty much good
                dispatch(apiUtils.apiRequestDone())
                dispatch(logoutRequestDone())
                ReactGA.event({
                    category: utils.GA_EVENT_CATEGORY_USER,
                    action: "logout - error caught"
                })
                dispatch(push(urls.LOGGED_OUT_URI))
                toastr.clean()
            })
    }
}

export const logoutAllOther = (logoutAllOtherUri, authToken) => {
    return (dispatch) => {
        toastr.info('Logging out your other sessions...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendAuthenticatedCommonHeaders(headers, userMediaType, authToken)
        const startMoment = moment()
        return fetch(logoutAllOtherUri, apiUtils.postInitForFetch(headers, {}))
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "logout all other")
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
                if (response.status == 503) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "logout all other prevented - maintenance window"
                    })
                    apiUtils.toastrMaintenanceOutage()
                } else if (!apiUtils.checkBecameUnauthenticated(response, dispatch)) {
                    if (response.ok) {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "logout all other success"
                        })
                        dispatch(receiveAuthenticationToken(response.headers.get(apiUtils.R_AUTH_TOKEN_HEADER)))
                        toastr.success("Your other sessions have been logged out.", apiUtils.toastConfigSuccess())
                    } else {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "logout all other failed"
                        })
                        toastr.error("There was a problem logging out your other sessions.  Try again later.", apiUtils.toastConfigError())
                    }
                }
            })
            .catch(error => {
                ReactGA.event({
                    category: utils.GA_EVENT_CATEGORY_USER,
                    action: "logout all other failed - error caught"
                })
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
            })
    }
}

export const attemptSignUp = () => {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Creating account...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendCommonHeaders(headers, userMediaType)
        headers.append(apiUtils.R_ESTABLISH_SESSION_HEADER, "true")
        headers.append(apiUtils.R_DESIRED_EMBEDDED_FORMAT_HEADER, apiUtils.R_ID_KEYED_EMBEDDED_FORMAT)
        const requestPayload = {
            "user/name": state.form.signup.name.value,
            "user/email": _.trim(state.form.signup.email.value),
            "user/password": state.form.signup.password.value
        };
        const startMoment = moment()
        return fetch(SIGNUP_URI, apiUtils.postInitForFetch(headers, requestPayload))
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "create account")
                dispatch(toastrActions.clean())
                dispatch(apiUtils.apiRequestDone())
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "account sign up prevented - maintenance window"
                    })
                    apiUtils.toastrMaintenanceOutage()
                } else if (response.status == 201) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "account sign up successful"
                    })
                    dispatch(receiveAuthenticationToken(response.headers.get(apiUtils.R_AUTH_TOKEN_HEADER)))
                    dispatch(receiveUserUri(response.headers.get("Location")))
                    return response.json().then(json => {
                        ReactGA.set({userId: json["user/id"]})
                        dispatch(signUpSuccess())
                        dispatch(receiveServerSnapshot(json))
                        dispatch(toastrActions.clean())
                        dispatch(push(urls.ACCOUNT_CREATED_URI))
                        toastr.success("Account created successfully", apiUtils.toastConfigSuccess())
                    })
                } else if (!response.ok) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "account sign up failed - server error"
                    })
                    toastr.error("We're sorry, but there was a problem prepping your account.  Please try again later.", apiUtils.toastConfigError())
                }
            })
            .catch(error => {
                ReactGA.event({
                    category: utils.GA_EVENT_CATEGORY_USER,
                    action: "account sign up failed - error caught"
                })
                dispatch(toastrActions.clean())
                dispatch(apiUtils.apiRequestDone())
                toastr.error("We're sorry, but there was a problem prepping your account.  Please try again later.", apiUtils.toastConfigError())
            })
    }
}

export const attemptResendVerificationEmail = () => {
    return (dispatch, getState) => {
        toastr.info("Sending verification email...", apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendAuthenticatedCommonHeaders(headers, userMediaType, state.authToken.value)
        let init = {}
        init.method = "POST"
        init.headers = headers
        init.body = JSON.stringify({})
        const startMoment = moment()
        return fetch(resendVerificationEmailUri(state.userUri.value), init)
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "resend verification email")
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "did not re-send verification email - maintenance window"
                    })
                    apiUtils.toastrMaintenanceOutage()
                } else if (!apiUtils.checkBecameUnauthenticated(response, dispatch)) {
                    if (response.status == 204) {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "re-send verification email successful"
                        })
                        dispatch(indicateAccountVerificationEmailSent())
                    } else if (!response.ok) {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "re-send verification email failed - server error"
                        })
                        toastr.error("Oops.  There was a problem.  Try this again a bit later.", apiUtils.toastConfigError())
                    }
                }
            })
            .catch(error => {
                ReactGA.event({
                    category: utils.GA_EVENT_CATEGORY_USER,
                    action: "re-send verification email failed - error caught"
                })
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
                toastr.error("Oops.  There was a problem.  Try this again a bit later.", apiUtils.toastConfigError())
            })
    }
}

export const attemptResetPassword = (email, resetToken) => {
    return (dispatch, getState) => {
        toastr.info("Resetting your password...", apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendCommonHeaders(headers, userMediaType)
        let init = {}
        init.method = "POST"
        init.headers = headers
        let requestPayload = { email: email }
        requestPayload["password-reset-token"] = resetToken
        requestPayload["new-password"] = state.form.resetpassword.password.value
        init.body = JSON.stringify(requestPayload)
        const startMoment = moment()
        return fetch(PASSWORD_RESET_URI, init)
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "reset password")
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "password not reset - maintenance window"
                    })
                    apiUtils.toastrMaintenanceOutage()
                } else if (response.status == 204) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "password reset successful"
                    })
                    dispatch(push(urls.PASSWORD_RESET_SUCCESS_URI))
                    toastr.success("Password reset successful!", apiUtils.toastConfigSuccess())
                } else if (!response.ok) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "password reset failed - server error"
                    })
                    toastr.error("Oops.  There was a problem.  Try this again a bit later.", apiUtils.toastConfigError())
                }
            })
            .catch(error => {
                ReactGA.event({
                    category: utils.GA_EVENT_CATEGORY_USER,
                    action: "password reset failed - error caught"
                })
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
                toastr.error("Oops.  There was a problem.  Try this again a bit later.", apiUtils.toastConfigError())
            })
    }
}

export const attemptContinueWithFacebook = (facebookResponse, contUri) => {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Setting up...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendCommonHeaders(headers, userMediaType)
        headers.append(apiUtils.R_DESIRED_EMBEDDED_FORMAT_HEADER, apiUtils.R_ID_KEYED_EMBEDDED_FORMAT)
        const requestPayload = {
            "user/facebook-user-id": facebookResponse.id,
            "user/email": facebookResponse.email
        }
        const startMoment = moment()
        return fetch(CONTINUE_WITH_FACEBOOK_URI, apiUtils.postInitForFetch(headers, requestPayload))
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "continue-with-facebook")
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "continue-with-fb - maintenance window"
                    })
                    apiUtils.toastrMaintenanceOutage()
                } else if (!response.ok) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "continue-with-fb failed - server error"
                    })
                    toastr.clean()
                    toastr.error("Server error.  Please try again.", toastConfigError())
                } else {
                    if (response.status == 200) {
                        return response.json().then(json => {
                            ReactGA.event({
                                category: utils.GA_EVENT_CATEGORY_USER,
                                action: "login successful"
                            })
                            ReactGA.set({userId: json["user/id"]})
                            dispatch(loginSuccess())
                            dispatch(receiveServerSnapshot(json))
                            // the last things we do are to dispatch the auth token and user uri, because
                            // these are the 2 things check to determine how to render the home page (which
                            // the user is currently on).  Before the authenticated home page can render, we need
                            // to make sure everything else has been dispatched (like server snapshot, login-success,
                            // etc).
                            dispatch(receiveAuthenticationToken(response.headers.get(apiUtils.R_AUTH_TOKEN_HEADER)))
                            dispatch(receiveUserUri(response.headers.get("Location")))
                            toastr.clean()
                            toastr.success("Welcome Back", "You are now logged in.", apiUtils.toastConfigSuccess())
                            if (contUri != null) {
                                dispatch(push(contUri))
                            }
                        })
                    } else if (response.status == 201) {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "account sign up successful"
                        })
                        dispatch(receiveAuthenticationToken(response.headers.get(apiUtils.R_AUTH_TOKEN_HEADER)))
                        dispatch(receiveUserUri(response.headers.get("Location")))
                        return response.json().then(json => {
                            ReactGA.set({userId: json["user/id"]})
                            dispatch(signUpSuccess())
                            dispatch(receiveServerSnapshot(json))
                            dispatch(toastrActions.clean())
                            dispatch(push(urls.ACCOUNT_CREATED_URI))
                            toastr.success("Account created successfully", apiUtils.toastConfigSuccess())
                        })
                    }
                }
            })
            .catch(error => {
                ReactGA.event({
                    category: utils.GA_EVENT_CATEGORY_USER,
                    action: "continue-with-fb failed - error caught"
                })
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
                toastr.error("Server error.  Please try again.", apiUtils.toastConfigError())
            })
    }
}

export const attemptLogin = nextSuccessPathname => {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Logging you in...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendCommonHeaders(headers, userMediaType)
        headers.append(apiUtils.R_DESIRED_EMBEDDED_FORMAT_HEADER, apiUtils.R_ID_KEYED_EMBEDDED_FORMAT)
        const requestPayload = {
            "user/username-or-email": _.trim(state.form.login.usernameOrEmail.value),
            "user/password": state.form.login.password.value
        }
        const startMoment = moment()
        return fetch(LOGIN_URI, apiUtils.postInitForFetch(headers, requestPayload))
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "login")
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
                dispatch(receiveAuthenticationToken(response.headers.get(apiUtils.R_AUTH_TOKEN_HEADER)))
                dispatch(receiveUserUri(response.headers.get("Location")))
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "login prevented - maintenance window"
                    })
                    apiUtils.toastrMaintenanceOutage()
                } else if (response.status == 401) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "login failed - invalid email or password"
                    })
                    toastr.clean()
                    toastr.error("Login failed.", apiUtils.toastConfigError())
                } else if (!response.ok) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "login failed - server error"
                    })
                    toastr.clean()
                    toastr.error("Server error.  Please try again.", toastConfigError())
                } else {
                    return response.json().then(json => {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "login successful"
                        })
                        ReactGA.set({userId: json["user/id"]})
                        dispatch(loginSuccess())
                        dispatch(receiveServerSnapshot(json))
                        dispatch(push(nextSuccessPathname))
                        toastr.clean()
                        toastr.success("Welcome Back", "You are now logged in.", apiUtils.toastConfigSuccess())
                    })
                }
            })
            .catch(error => {
                ReactGA.event({
                    category: utils.GA_EVENT_CATEGORY_USER,
                    action: "login failed - error caught"
                })
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
                toastr.error("Server error.  Please try again.", apiUtils.toastConfigError())
            })
    }
}

export const attemptLightLogin = operationOnSuccess => {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Re-authenticating...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendCommonHeaders(headers, userMediaType)
        headers.append(apiUtils.R_DESIRED_EMBEDDED_FORMAT_HEADER, apiUtils.R_ID_KEYED_EMBEDDED_FORMAT)
        const requestPayload = {
            "user/username-or-email": _.trim(state.form.login.usernameOrEmail.value),
            "user/password": state.form.login.password.value
        };
        const startMoment = moment()
        return fetch(LIGHT_LOGIN_URI, apiUtils.postInitForFetch(headers, requestPayload))
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "light login")
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
                dispatch(receiveAuthenticationToken(response.headers.get(apiUtils.R_AUTH_TOKEN_HEADER)))
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "light login prevented - maintenance window"
                    })
                    apiUtils.toastrMaintenanceOutage()
                } else if (response.status == 204) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "light login successful"
                    })
                    dispatch(becameReauthenticated())
                    if (operationOnSuccess != null) {
                        operationOnSuccess() // this will presumably come with its own toasts, so we won't bother with the 'You've been re-auth'd' toast
                    } else {
                        toastr.success("Success", "You've been re-authenticated.", apiUtils.toastConfigSuccess())
                    }
                } else if (response.status == 401) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "light login failed - invalid email or password"
                    })
                    toastr.error("Login failed.", apiUtils.toastConfigError())
                } else if (!response.ok) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "light login failed - server error"
                    })
                    toastr.error("Server error.  Please try again.", apiUtils.toastConfigError())
                }
            })
            .catch(error => {
                ReactGA.event({
                    category: utils.GA_EVENT_CATEGORY_USER,
                    action: "light login failed - error caught"
                })
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
            })
    }
}

export const attemptSendPasswordResetEmail = () => {
    return (dispatch, getState) => {
        const state = getState()
        toastr.info('Please wait...', apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendCommonHeaders(headers, userMediaType)
        const requestPayload = {
            "user/email": _.trim(state.form.forgotpassword.email.value)
        };
        const startMoment = moment()
        return fetch(SEND_PWD_RESET_EMAIL_URI, apiUtils.postInitForFetch(headers, requestPayload))
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "send password reset link")
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "send password reset email prevented - maintenance window"
                    })
                    apiUtils.toastrMaintenanceOutage()
                } else if (response.status == 422) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "send password reset email failed - user error",
                        label: "probably unknown email entered"
                    })
                    toastr.error("There was a problem sending you the password reset email.", apiUtils.toastConfigError())
                } else if (response.status == 204) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "send password reset email successful"
                    })
                    dispatch(passwordResetEmailSent())
                    dispatch(push(urls.PASSWORD_RESET_EMAIL_SENT_URI))
                    toastr.success("Password reset email sent", apiUtils.toastConfigSuccess())
                } else if (!response.ok) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "send password reset email failed - server error"
                    })
                    toastr.error("There was a problem sending you the password reset email.", apiUtils.toastConfigError())
                }
            })
            .catch(error => {
                ReactGA.event({
                    category: utils.GA_EVENT_CATEGORY_USER,
                    action: "send password reset email failed - error caught"
                })
                dispatch(apiUtils.apiRequestDone())
                toastr.clean()
                toastr.error("There was a problem sending you the password reset email.", apiUtils.toastConfigError())
            })
    }
}

export const attemptSaveUserAccount = apiUtils.makeAttemptSaveEntityFn(
    "user account",
    userContentType,
    userMediaType,
    getUserAccountUpdatedAt,
    getUserAccountUri,
    userRequestPayload,
    forms.USER_ACCOUNT_FORM,
    attemptDownloadChangelog,
    receiveServerUser,
    serverUserNotFound,
    userRequestPayload => userRequestPayload["user/current-password"] != null,
    passwordPromptedAndSuccessForDangerousAction)

export const attemptCancelSubscription = (userId, currentPassword, cancelReason) => {
    return (dispatch, getState) => {
        toastr.info("Cancelling subscription...", apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        apiUtils.appendContentType(headers, userContentType)
        apiUtils.appendAuthenticatedCommonHeaders(headers, userMediaType, state.authToken.value)
        headers.append(apiUtils.R_IF_UNMODIFIED_SINCE_HEADER, getUserAccountUpdatedAt(state, userId))
        const entityUri = getUserAccountUri(state, userId)
        let requestPayload = {}
        requestPayload["user/current-password"] = currentPassword
        requestPayload["user/cancel-subscription"] = true
        requestPayload["user/paid-enrollment-cancelled-reason"] = cancelReason
        const startMoment = moment()
        return fetch(entityUri, apiUtils.putInitForFetch(headers, requestPayload))
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "cancel subscription")
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    apiUtils.toastrMaintenanceOutage()
                } else if (!apiUtils.checkBecameUnauthenticated(response, dispatch)) {
                    if (response.status == 409) {
                        dispatch(apiUtils.conflictDetected())
                    } else if (response.status == 200) {
                        return response.json().then(json => {
                            dispatch(receiveServerUser(json))
                            dispatch(subscriptionCancelled())
                        })
                    } else if (response.status == 404) {
                        dispatch(apiUtils.entityIdNotFoundFn(userId)) // entity removed from other device
                    } else if (!response.ok) {
                        dispatch(subscriptionCancelFailed())
                    }
                }
            })
            .catch(error => {
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
                dispatch(subscriptionCancelFailed())
            })
        }
}

////////////////////////////////////////////////////////////////////////////////
// Stripe Payment Token related
////////////////////////////////////////////////////////////////////////////////
export const indicatePaymentTokenSaved = () => ({ type: actionTypes.PAYMENT_TOKEN_SAVED })
export const paymentTokenSavedUserAck = () => ({ type: actionTypes.PAYMENT_TOKEN_SAVED_USER_ACK })
export const indicatePaymentTokenSaveError = paymentToken => ({ type: actionTypes.PAYMENT_TOKEN_SAVE_ERROR, paymentToken })
export const receivePaymentToken = paymentToken => ({ type: actionTypes.PAYMENT_TOKEN_RECEIVED, paymentToken })
export const paymentTokenSaveErrorUserAck = () => ({ type: actionTypes.PAYMENT_TOKEN_SAVE_ERROR_USER_ACK })
const paymentTokenMediaType = makeMediaType(mtparts.STRIPE_TOKEN_MT_PART)
const paymentTokenContentType = makeContentType(paymentTokenMediaType, charset)
const getPaymentTokensUri = state => state.serverSnapshot._links.stripetokens.href

export const attemptSaveNewPaymentToken = (paymentToken, workingOnItToastrText) => {
    return (dispatch, getState) => {
        toastr.info(workingOnItToastrText, apiUtils.toastConfigWorkingOnIt())
        dispatch(apiUtils.apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        apiUtils.appendContentType(headers, paymentTokenContentType)
        apiUtils.appendAuthenticatedCommonHeaders(headers, paymentTokenMediaType, state.authToken.value)
        let init = {}
        init.method = "POST"
        init.headers = headers
        init.body = JSON.stringify(paymentToken)
        const startMoment = moment()
        return fetch(getPaymentTokensUri(state), init)
            .then(response => {
                apiUtils.logApiTiming(startMoment, moment(), "save new payment token")
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
                dispatch(apiUtils.receiveResponseStatus(response.status, response.headers.get(apiUtils.R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    apiUtils.toastrMaintenanceOutage()
                } else if (!apiUtils.checkBecameUnauthenticated(response, dispatch)) {
                    if (response.status == 200) {
                        dispatch(indicatePaymentTokenSaved())
                        return response.json().then(json => {
                            dispatch(receiveServerUser(json))
                        })
                    } else if (!response.ok) {
                        dispatch(indicatePaymentTokenSaveError(paymentToken))
                    }
                }
            })
            .catch(error => {
                toastr.clean()
                dispatch(apiUtils.apiRequestDone())
                dispatch(indicatePaymentTokenSaveError())
            })
    }
}

////////////////////////////////////////////////////////////////////////////////
// Body measurement log related
////////////////////////////////////////////////////////////////////////////////
const bodyJournalLogMediaType = makeMediaType(mtparts.BODY_JOURNAL_LOG_MT_PART)
const bodyJournalLogContentType = makeContentType(bodyJournalLogMediaType, charset)
const getBodyJournalLogsUri = state => state.serverSnapshot._links.bodyjournallogs.href
const getBodyJournalLogUpdatedAt = (state, bodyJournalLogId) => state.serverSnapshot._embedded["body-journal-logs"][bodyJournalLogId].payload["bodyjournallog/updated-at"]
const getBodyJournalLogUri = (state, bodyJournalLogId) => state.serverSnapshot._embedded["body-journal-logs"][bodyJournalLogId].location
export const receiveServerBodyJournalLogDeletedAck = serverBodyJournalLogId => ({ type: actionTypes.SERVER_BODY_JOURNAL_LOG_DELETED_ACK_RECEIVED, serverBodyJournalLogId })
export const receiveServerBodyJournalLog = serverBodyJournalLog => ({ type: actionTypes.SERVER_BODY_JOURNAL_LOG_RECEIVED, serverBodyJournalLog })
export const newBodyJournalLogSavedSuccessfully = (serverBodyJournalLog, state) =>
    ({ type: actionTypes.NEW_BODY_JOURNAL_LOG_SAVED_SUCCESSFULLY, serverBodyJournalLog, selectedMovementVariantId: state.selectionContext.selectedMovementVariantId })
export const receiveServerBodyJournalLogLocation = (serverBodyJournalLogId, serverBodyJournalLogLocation) =>
    ({ type: actionTypes.SERVER_BODY_JOURNAL_LOG_LOCATION_RECEIVED, serverBodyJournalLogId: serverBodyJournalLogId, serverBodyJournalLogLocation: serverBodyJournalLogLocation })
export const receiveServerBodyJournalLogMediaType = (serverBodyJournalLogId, serverBodyJournalLogMediaType) =>
    ({ type: actionTypes.SERVER_BODY_JOURNAL_LOG_MEDIATYPE_RECEIVED, serverBodyJournalLogId: serverBodyJournalLogId, serverBodyJournalLogMediaType: serverBodyJournalLogMediaType })
export const serverBodyJournalLogNotFound = serverBodyJournalLogId => ({ type: actionTypes.SERVER_BODY_JOURNAL_LOG_NOT_FOUND, serverBodyJournalLogId: serverBodyJournalLogId })
export const markBodyJournalLogForEdit = bodyJournalLogId => ({ type: actionTypes.MARK_BODY_JOURNAL_LOG_FOR_EDIT, bodyJournalLogId })
export const bmlTypeSelected = bmlTypeId => ({ type: actionTypes.BML_TYPE_SELECTED, bmlTypeId })

export const bmlRequestPayloadMaker = modelBinder => (form, state) => {
    let payload = {}
    utils.formToModelIfNotNull(form, "originationDeviceId", payload, "bodyjournallog/origination-device-id", null, _.toNumber)
    utils.formToModelIfNotNull(form, "loggedAt", payload, "bodyjournallog/logged-at", null, loggedAtStr => utils.toUnixEpoch(moment, loggedAtStr))
    modelBinder(form, payload)
    return payload
}

const bodyJournalLogRequestPayload = bmlRequestPayloadMaker(
    (form, requestPayload) => {
        utils.formToModelIfNotNull(form, "bodyWeight", requestPayload, "bodyjournallog/body-weight", null, _.toNumber)
        utils.formToModelIfNotNull(form, "bodyWeightUom", requestPayload, "bodyjournallog/body-weight-uom", null, utils.toWeightUnitsValue)
        utils.formToModelIfNotNull(form, "armSize", requestPayload, "bodyjournallog/arm-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, "calfSize", requestPayload, "bodyjournallog/calf-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, "neckSize", requestPayload, "bodyjournallog/neck-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, "forearmSize", requestPayload, "bodyjournallog/forearm-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, "waistSize", requestPayload, "bodyjournallog/waist-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, "thighSize", requestPayload, "bodyjournallog/thigh-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, "chestSize", requestPayload, "bodyjournallog/chest-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, "sizeUom", requestPayload, "bodyjournallog/size-uom", null, utils.toLengthUnitsValue)
    }
)

export const attemptDeleteBodyJournalLog = apiUtils.makeAttemptDeleteEntityFn(
    "body measurement log",
    bodyJournalLogMediaType,
    getBodyJournalLogUpdatedAt,
    getBodyJournalLogUri,
    attemptDownloadChangelog,
    urls.bodyJournalLogDetailUrl,
    receiveServerBodyJournalLogDeletedAck,
    serverBodyJournalLogNotFound)

export const saveNewBmlAttemptMaker = requestPayloadFn => apiUtils.makeAttemptSaveNewEntity(
    "body measurement log",
    bodyJournalLogContentType,
    bodyJournalLogMediaType,
    getBodyJournalLogsUri,
    requestPayloadFn,
    forms.NEW_BML_FORM,
    "bodyjournallog/id",
    receiveServerBodyJournalLogLocation,
    receiveServerBodyJournalLogMediaType,
    receiveServerBodyJournalLog
)

export const attemptSaveNewBodyJournalLog = apiUtils.makeAttemptSaveNewEntity(
    "body measurement log",
    bodyJournalLogContentType,
    bodyJournalLogMediaType,
    getBodyJournalLogsUri,
    bodyJournalLogRequestPayload,
    forms.BODY_JOURNAL_LOG_FORM,
    "bodyjournallog/id",
    receiveServerBodyJournalLogLocation,
    receiveServerBodyJournalLogMediaType,
    receiveServerBodyJournalLog)

export const attemptSaveBodyJournalLog = apiUtils.makeAttemptSaveEntityFn(
    "body measurement log",
    bodyJournalLogContentType,
    bodyJournalLogMediaType,
    getBodyJournalLogUpdatedAt,
    getBodyJournalLogUri,
    bodyJournalLogRequestPayload,
    forms.BODY_JOURNAL_LOG_FORM,
    attemptDownloadChangelog,
    receiveServerBodyJournalLog,
    serverBodyJournalLogNotFound)

export const BML_TYPE_BODY_WEIGHT = 0
export const BML_TYPE_ARMS        = 1
export const BML_TYPE_CHEST       = 2
export const BML_TYPE_CALVES      = 3
export const BML_TYPE_THIGHS      = 4
export const BML_TYPE_FOREARMS    = 5
export const BML_TYPE_WAIST       = 6
export const BML_TYPE_NECK        = 7
export const BML_TYPE_SEVERAL     = 8

const addBodyType = (bmlTypes, id, name, uomDisplay, toValueFn, toUnitsValueFn, uomOptions, uomTypeName, requestPayloadFn, gaActionPostfix, uri) => {
    bmlTypes[id] = {
        "payload": {
            "id": id,
            "name": name,
            "uomDisplay": uomDisplay,
            "toValueFn": toValueFn,
            "toUnitsValueFn": toUnitsValueFn,
            "uomOptions": uomOptions,
            "uomTypeName": uomTypeName,
            "requestPayloadFn": requestPayloadFn,
            "gaActionPostfix": gaActionPostfix,
            "uri": uri
        }
    }
}

export const bmlTypesMaker = userSettings => {
    const settingsWeightUom = userSettings.payload["usersettings/weight-uom"]
    const settingsSizeUom = userSettings.payload["usersettings/size-uom"]
    const uomDisplayWeight = utils.toWeightUnitsDisplay(settingsWeightUom)
    const uomDisplayLength = utils.toLengthUnitsDisplay(settingsSizeUom)
    const bmlTypesObj = {}
    const formTextInputName = "inputValue"
    const formRadioInputName = "uom"
    const enterBmlUri = urls.ENTER_BML_URI
    addBodyType(bmlTypesObj, BML_TYPE_BODY_WEIGHT, "Body Weight", uomDisplayWeight, utils.weightValue, utils.toWeightUnitsValue, utils.WEIGHT_UNITS, "Weight", bmlRequestPayloadMaker((form, requestPayload) => {
        utils.formToModelIfNotNull(form, formTextInputName, requestPayload, "bodyjournallog/body-weight", null, _.toNumber)
        utils.formToModelIfNotNull(form, formRadioInputName, requestPayload, "bodyjournallog/body-weight-uom", null, utils.toWeightUnitsValue)
        requestPayload["bodyjournallog/size-uom"] = settingsSizeUom
    }), "body weight log", enterBmlUri)
    addBodyType(bmlTypesObj, BML_TYPE_ARMS,        "Arms",        uomDisplayLength, utils.lengthValue, utils.toLengthUnitsValue, utils.LENGTH_UNITS, "Size", bmlRequestPayloadMaker((form, requestPayload) => {
        utils.formToModelIfNotNull(form, formTextInputName, requestPayload, "bodyjournallog/arm-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, formRadioInputName, requestPayload, "bodyjournallog/size-uom", null, utils.toLengthUnitsValue)
        requestPayload["bodyjournallog/body-weight-uom"] = settingsWeightUom
    }), "arm size log", enterBmlUri)
    addBodyType(bmlTypesObj, BML_TYPE_CHEST,       "Chest",       uomDisplayLength, utils.lengthValue, utils.toLengthUnitsValue, utils.LENGTH_UNITS, "Size", bmlRequestPayloadMaker((form, requestPayload) => {
        utils.formToModelIfNotNull(form, formTextInputName, requestPayload, "bodyjournallog/chest-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, formRadioInputName, requestPayload, "bodyjournallog/size-uom", null, utils.toLengthUnitsValue)
        requestPayload["bodyjournallog/body-weight-uom"] = settingsWeightUom
    }), "chest size log", enterBmlUri)
    addBodyType(bmlTypesObj, BML_TYPE_CALVES,      "Calves",      uomDisplayLength, utils.lengthValue, utils.toLengthUnitsValue, utils.LENGTH_UNITS, "Size", bmlRequestPayloadMaker((form, requestPayload) => {
        utils.formToModelIfNotNull(form, formTextInputName, requestPayload, "bodyjournallog/calf-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, formRadioInputName, requestPayload, "bodyjournallog/size-uom", null, utils.toLengthUnitsValue)
        requestPayload["bodyjournallog/body-weight-uom"] = settingsWeightUom
    }), "calf size log", enterBmlUri)
    addBodyType(bmlTypesObj, BML_TYPE_THIGHS,      "Thighs",      uomDisplayLength, utils.lengthValue, utils.toLengthUnitsValue, utils.LENGTH_UNITS, "Size", bmlRequestPayloadMaker((form, requestPayload) => {
        utils.formToModelIfNotNull(form, formTextInputName, requestPayload, "bodyjournallog/thigh-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, formRadioInputName, requestPayload, "bodyjournallog/size-uom", null, utils.toLengthUnitsValue)
        requestPayload["bodyjournallog/body-weight-uom"] = settingsWeightUom
    }), "thigh size log", enterBmlUri)
    addBodyType(bmlTypesObj, BML_TYPE_FOREARMS,    "Forearms",    uomDisplayLength, utils.lengthValue, utils.toLengthUnitsValue, utils.LENGTH_UNITS, "Size", bmlRequestPayloadMaker((form, requestPayload) => {
        utils.formToModelIfNotNull(form, formTextInputName, requestPayload, "bodyjournallog/forearm-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, formRadioInputName, requestPayload, "bodyjournallog/size-uom", null, utils.toLengthUnitsValue)
        requestPayload["bodyjournallog/body-weight-uom"] = settingsWeightUom
    }), "forearm size log", enterBmlUri)
    addBodyType(bmlTypesObj, BML_TYPE_WAIST,       "Waist",       uomDisplayLength, utils.lengthValue, utils.toLengthUnitsValue, utils.LENGTH_UNITS, "Size", bmlRequestPayloadMaker((form, requestPayload) => {
        utils.formToModelIfNotNull(form, formTextInputName, requestPayload, "bodyjournallog/waist-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, formRadioInputName, requestPayload, "bodyjournallog/size-uom", null, utils.toLengthUnitsValue)
        requestPayload["bodyjournallog/body-weight-uom"] = settingsWeightUom
    }), "waist size log", enterBmlUri)
    addBodyType(bmlTypesObj, BML_TYPE_NECK,        "Neck",        uomDisplayLength, utils.lengthValue, utils.toLengthUnitsValue, utils.LENGTH_UNITS, "Size", bmlRequestPayloadMaker((form, requestPayload) => {
        utils.formToModelIfNotNull(form, formTextInputName, requestPayload, "bodyjournallog/neck-size", null, _.toNumber)
        utils.formToModelIfNotNull(form, formRadioInputName, requestPayload, "bodyjournallog/size-uom", null, utils.toLengthUnitsValue)
        requestPayload["bodyjournallog/body-weight-uom"] = settingsWeightUom
    }), "neck size log", enterBmlUri)
    addBodyType(bmlTypesObj, BML_TYPE_SEVERAL,     "I want to log several", null, null, null, null, null, null, null, urls.ADD_BODY_JOURNAL_LOG_URI + "?nextPathname=" + urls.HOME_URI)
    return bmlTypesObj
}

////////////////////////////////////////////////////////////////////////////////
// Set related
////////////////////////////////////////////////////////////////////////////////
const setMediaType = makeMediaType(mtparts.SET_MT_PART)
const setContentType = makeContentType(setMediaType, charset)
const getSetsUri = state => state.serverSnapshot._links.sets.href
const getSetUpdatedAt = (state, setId) => state.serverSnapshot._embedded.sets[setId].payload["set/updated-at"]
const getSetUri = (state, setId) => state.serverSnapshot._embedded.sets[setId].location
export const receiveServerSetDeletedAck = serverSetId => ({ type: actionTypes.SERVER_SET_DELETED_ACK_RECEIVED, serverSetId })
export const receiveServerSet = serverSet => ({ type: actionTypes.SERVER_SET_RECEIVED, serverSet })
export const receiveCurrentCycle = currentCycle => ({ type: actionTypes.CURRENT_CYCLE_RECEIVED, currentCycle })
export const newSetSavedSuccessfully = (serverSet, state) =>
    ({ type: actionTypes.NEW_SET_SAVED_SUCCESSFULLY, serverSet, selectedMovementVariantId: state.selectionContext.selectedMovementVariantId })
export const receiveServerSetLocation = (serverSetId, serverSetLocation) =>
    ({ type: actionTypes.SERVER_SET_LOCATION_RECEIVED, serverSetId: serverSetId, serverSetLocation: serverSetLocation })
export const receiveServerSetMediaType = (serverSetId, serverSetMediaType) =>
    ({ type: actionTypes.SERVER_SET_MEDIATYPE_RECEIVED, serverSetId: serverSetId, serverSetMediaType: serverSetMediaType })
export const serverSetNotFound = serverSetId => ({ type: actionTypes.SERVER_SET_NOT_FOUND, serverSetId: serverSetId })
export const markSetForEdit = setId => ({ type: actionTypes.MARK_SET_FOR_EDIT, setId })
export const bodySegmentSelected = bodySegmentId => ({ type: actionTypes.BODY_SEGMENT_SELECTED, bodySegmentId })
export const muscleGroupSelected = mgId => ({ type: actionTypes.MUSCLE_GROUP_SELECTED, mgId })
export const movementSelected = movementId => ({ type: actionTypes.MOVEMENT_SELECTED, movementId })
export const movementVariantSelected = movementVariantId => ({ type: actionTypes.MOVEMENT_VARIANT_SELECTED, movementVariantId })

const setRequestPayload = (form, state) => {
    let payload = {}
    utils.formToModelIfNotNull(form, "originationDeviceId", payload, "set/origination-device-id", null, _.toNumber)
    utils.formToModelIfNotNull(form, "movementId",        payload, "set/movement-id",         "movement/id",        null)
    utils.formToModelIfNotNull(form, "movementVariantId", payload, "set/movement-variant-id", "movementvariant/id", null)
    utils.formToModelIfNotNull(form, "reps",              payload, "set/num-reps",            null,                 _.toNumber)
    utils.formToModelIfNotNull(form, "weight",            payload, "set/weight",              null,                 _.toNumber)
    utils.formToModelIfNotNull(form, "uom",               payload, "set/weight-uom",          null,                 utils.toWeightUnitsValue)
    if (form["isRealTime"] != null && form["isRealTime"].value) {
        payload["set/ignore-time"] = false
        payload["set/logged-at"] = moment().valueOf()
    } else {
        let dateFormat = utils.DATETIME_DISPLAY_FORMAT
        if (form["ignoreTime"].value) {
            dateFormat = utils.DATE_DISPLAY_FORMAT
        }
        utils.formToModelIfNotNull(form, "loggedAt", payload, "set/logged-at", null, loggedAtStr => moment(loggedAtStr, dateFormat).valueOf())
        utils.formToModelIfNotNull(form, "ignoreTime", payload, "set/ignore-time")
    }
    utils.formToModelIfNotNull(form, "toFailure", payload, "set/to-failure")
    utils.formToModelIfNotNull(form, "negatives", payload, "set/negatives")
    return payload
}

export const attemptDeleteSet = apiUtils.makeAttemptDeleteEntityFn(
    "set",
    setMediaType,
    getSetUpdatedAt,
    getSetUri,
    attemptDownloadChangelog,
    urls.setDetailUrl,
    receiveServerSetDeletedAck,
    serverSetNotFound)

export const attemptSaveNewSet = apiUtils.makeAttemptSaveNewEntity(
    "set",
    setContentType,
    setMediaType,
    getSetsUri,
    setRequestPayload,
    forms.NEW_SET_FORM,
    "set/id",
    receiveServerSetLocation,
    receiveServerSetMediaType,
    receiveServerSet,
    newSetSavedSuccessfully)

export const attemptSaveSet = apiUtils.makeAttemptSaveEntityFn(
    "set",
    setContentType,
    setMediaType,
    getSetUpdatedAt,
    getSetUri,
    setRequestPayload,
    forms.SET_FORM,
    attemptDownloadChangelog,
    receiveServerSet,
    serverSetNotFound)
