import React from "react"
import fetch from 'isomorphic-fetch'
import { toastr } from 'react-redux-toastr'
import { actions as toastrActions } from 'react-redux-toastr'
import { push, replace, goBack } from 'react-router-redux'
import { destroy } from "redux-form"
import * as actionTypes from "./action-types"
import * as utils from "../utils"
import _ from "lodash"
import moment from "moment"
import ReactGA from "react-ga"

export const R_AUTH_TOKEN_HEADER              = "r-auth-token"
export const R_ERR_MASK_HEADER                = "r-error-mask"
export const R_ESTABLISH_SESSION_HEADER       = "r-establish-session"
export const R_DESIRED_EMBEDDED_FORMAT_HEADER = "r-desired-embedded-format"
export const R_IF_MODIFIED_SINCE_HEADER       = "r-if-modified-since"
export const R_IF_UNMODIFIED_SINCE_HEADER     = "r-if-unmodified-since"
export const R_ID_KEYED_EMBEDDED_FORMAT       = "id-keyed"

const initForFetch = (headers, payload, method) => {
    let init = {}
    init.method = method
    init.headers = headers
    init.credentials = "same-origin"
    if (payload != null) {
        init.body = JSON.stringify(payload)
    }
    return init
}

export const postInitForFetch   = (headers, payload) => initForFetch(headers, payload, "POST")
export const putInitForFetch    = (headers, payload) => initForFetch(headers, payload, "PUT")
export const getInitForFetch    = (headers)          => initForFetch(headers, null,    "GET")
export const deleteInitForFetch = (headers)          => initForFetch(headers, null,    "DELETE")

export const conflictDetected = () => ({ type: actionTypes.CONFLICT_DETECTED })
export const conflictDetectedUserAck = () => ({ type: actionTypes.CONFLICT_DETECTED_USER_ACK })

export const toastrMaintenanceOutage = () => toastr.warning("Maintenance Outage", "Riker is currently undergoing maintenance.  Try again later.")

export function receiveResponseStatus(responseStatus, rErrorMask = null) {
    let action = { type: actionTypes.RESPONSE_STATUS_RECEIVED,
                   responseStatus: responseStatus }
    if (!_.isEmpty(rErrorMask)) {
        action.rErrorMask = _.toNumber(rErrorMask)
    }
    return action
}

export function becameUnauthenticated() {
    ReactGA.set({userId: null})
    return { type: actionTypes.BECAME_UNAUTHENTICATED }
}

export function apiRequestDone() {
    return { type: actionTypes.API_REQUEST_DONE }
}

export const appendContentType = (headers, contentType) => {
    headers.append("Content-Type", contentType)
}

export const appendCommonHeaders = (headers, mediaType) => {
    headers.append("Accept-Language", "en-US")
    if (mediaType != null) {
        headers.append("Accept", mediaType)
    }
}

export const appendAuthenticatedCommonHeaders = (headers, mediaType, authToken) => {
    appendCommonHeaders(headers, mediaType)
    headers.append("Authorization", "r-auth r-token=\"" + authToken + "\"")
}

function entitySavingMessage(entityType) {
    return "Saving " + entityType + "..."
}

function entityDeletingMessage(entityType) {
    return "Deleting " + entityType + "..."
}

function entitySavedMessage(entityType) {
    return _.capitalize(entityType) + " saved"
}

function entityDeletedMessage(entityType) {
    return _.capitalize(entityType) + " deleted"
}

function entitySaveFailedMessage(entityType) {
    return _.capitalize(entityType) + " save failed"
}

function entityDeleteFailedMessage(entityType) {
    return _.capitalize(entityType) + " delete failed"
}

export function checkBecameUnauthenticated(response, dispatch) {
    if (response.status == 401) {
        dispatch(becameUnauthenticated())
        return true
    }
    return false
}

const TOASTR_TIMEOUT_ALREADY_HAVE_LATEST = 3500
const TOASTR_TIMEOUT_CONFLICT            = 3500
const TOASTR_TIMEOUT_LATEST_DOWNLOADED   = 3500
const TOASTR_TIMEOUT_ERROR               = 2500
const TOASTR_TIMEOUT_SUCCESS             = 2000

export function toastConfigCheckmark(timeOut) {
    return { icon: "icon-check-1", timeOut: timeOut }
}

export function toastConfigAlreadyHaveLatest() {
    return toastConfigCheckmark(TOASTR_TIMEOUT_ALREADY_HAVE_LATEST)
}

export function toastConfigConflict() {
    return { timeOut: TOASTR_TIMEOUT_CONFLICT }
}

export function toastConfigLatestDownloaded() {
    return toastConfigCheckmark(TOASTR_TIMEOUT_LATEST_DOWNLOADED)
}

export function toastConfigError() {
    return { timeOut: TOASTR_TIMEOUT_ERROR }
}

export function toastConfigSuccess() {
    return toastConfigCheckmark(TOASTR_TIMEOUT_SUCCESS)
}

export function toastConfigWorkingOnIt() {
    return { transitionIn: "fadeIn",
             transitionOut: "fadeOut",
             timeOut: 0 }
}

export function apiRequestInitiated() {
    return { type: actionTypes.API_REQUEST_INITIATED }
}

export const logApiTiming = (startMoment, endMoment, variable) => {
    ReactGA.timing({
        category: "Riker API",
        variable: variable,
        value: endMoment.diff(startMoment)
    })
}

export const makeAttemptFileImport = (fileImportUriFn, entityType) => csvData => {
    return (dispatch, getState) => {
        toastr.info("Importing...", toastConfigWorkingOnIt())
        dispatch(apiRequestInitiated())
        const state = getState()
        const headers = new Headers()
        appendContentType(headers, "text/csv")
        appendAuthenticatedCommonHeaders(headers, null, state.authToken.value)
        let init = {}
        init.method = "POST"
        init.headers = headers
        init.body = csvData
        const startMoment = moment()
        return fetch(fileImportUriFn(state), init)
            .then(response => {
                logApiTiming(startMoment, moment(), entityType + " file import")
                toastr.clean()
                dispatch(apiRequestDone())
                dispatch(receiveResponseStatus(response.status, response.headers.get(R_ERR_MASK_HEADER)))
                if (response.status == 503) {
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "csv not imported - maintenance window",
                        label: entityType
                    })
                    toastrMaintenanceOutage()
                } else if (!checkBecameUnauthenticated(response, dispatch)) {
                    if (response.status == 204) {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "csv import successful",
                            label: entityType
                        })
                        dispatch({ type: actionTypes.FILE_IMPORT_SUCCESS })
                    } else if (!response.ok) {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "csv import failed - server error",
                            label: entityType
                        })
                        dispatch({ type: actionTypes.FILE_IMPORT_ERROR })
                    }
                }
            })
            .catch(error => {
                toastr.clean()
                dispatch(apiRequestDone())
                ReactGA.event({
                    category: utils.GA_EVENT_CATEGORY_USER,
                    action: "csv import failed - error caught",
                    label: entityType
                })
                dispatch({ type: actionTypes.FILE_IMPORT_ERROR })
            })
    }
}


export function makeAttemptSaveNewEntity(
    entityType,
    entityContentType,
    entityMediaType,
    getEntitiesUriFn,
    entityRequestPayloadFn,
    entityFormName,
    entityIdKeyName,
    receiveServerEntityLocationFn,
    receiveServerEntityMediaTypeFn,
    receiveServerEntityFn,
    addlSuccessDispatchFn = null,
    addlSuccessFn = null) {
    return (nextPathname, goBackOnSuccess, destroyFormOnSuccess) => {
        return (dispatch, getState) => {
            toastr.info(entitySavingMessage(entityType), toastConfigWorkingOnIt())
            dispatch(apiRequestInitiated())
            const state = getState()
            const headers = new Headers()
            appendContentType(headers, entityContentType)
            appendAuthenticatedCommonHeaders(headers, entityMediaType, state.authToken.value)
            const entitiesUri = getEntitiesUriFn(state)
            const requestPayload = entityRequestPayloadFn(state.form[entityFormName], state)
            const startMoment = moment()
            return fetch(entitiesUri, postInitForFetch(headers, requestPayload))
                .then(response => {
                    logApiTiming(startMoment, moment(), "attempt save new " + entityType)
                    toastr.clean()
                    dispatch(apiRequestDone())
                    dispatch(receiveResponseStatus(response.status, response.headers.get(R_ERR_MASK_HEADER)))
                    if (response.status == 503) {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "new entity not saved - maintenance window",
                            label: entityType
                        })
                        toastrMaintenanceOutage()
                    } else if (!checkBecameUnauthenticated(response, dispatch)) {
                        if (response.status == 201) {
                            const location = response.headers.get("location")
                            return response.json().then(json => {
                                const entityId = json[entityIdKeyName]
                                dispatch(receiveServerEntityLocationFn(entityId, location))
                                dispatch(receiveServerEntityMediaTypeFn(entityId, response.headers.get("content-type")))
                                dispatch(receiveServerEntityFn(json))
                                if (addlSuccessDispatchFn != null) {
                                    dispatch(addlSuccessDispatchFn(json, state))
                                }
                                if (nextPathname != null) {
                                    dispatch(push(nextPathname))
                                } else {
                                    if (goBackOnSuccess) {
                                        dispatch(goBack())
                                    }
                                }
                                if (destroyFormOnSuccess) {
                                    dispatch(destroy(entityFormName))
                                }
                                ReactGA.event({
                                    category: utils.GA_EVENT_CATEGORY_USER,
                                    action: "new entity saved successfully",
                                    label: entityType
                                })
                                toastr.success(entitySavedMessage(entityType), toastConfigSuccess())
                            })
                        } else if (!response.ok) {
                            ReactGA.event({
                                category: utils.GA_EVENT_CATEGORY_USER,
                                action: "new entity save failed - server error",
                                label: entityType
                            })
                            toastr.error(entitySaveFailedMessage(entityType), toastConfigError())
                        }
                    }
                })
                .catch(error => {
                    toastr.clean()
                    dispatch(apiRequestDone())
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "new entity save failed - error caught",
                        label: entityType
                    })
                    toastr.error(entitySaveFailedMessage(entityType), toastConfigError())
                })
          }
    }
}

export function makeAttemptSaveEntityFn(entityType,
                                        entityContentType,
                                        entityMediaType,
                                        getEntityUpdatedAtFn,
                                        getEntityUriFn,
                                        entityRequestPayloadFn,
                                        entityFormName,
                                        attemptDownloadChangelogFn,
                                        receiveServerEntityFn,
                                        entityIdNotFoundFn,
                                        customSuccessActionPred = null,
                                        customSuccessActionFn = null) {
    return (entityId) => {
        return (dispatch, getState) => {
            toastr.info(entitySavingMessage(entityType), toastConfigWorkingOnIt())
            dispatch(apiRequestInitiated())
            const state = getState()
            const headers = new Headers()
            appendContentType(headers, entityContentType)
            appendAuthenticatedCommonHeaders(headers, entityMediaType, state.authToken.value)
            headers.append(R_IF_UNMODIFIED_SINCE_HEADER, getEntityUpdatedAtFn(state, entityId))
            const entityUri = getEntityUriFn(state, entityId)
            const requestPayload = entityRequestPayloadFn(state.form[entityFormName], state)
            const startMoment = moment()
            return fetch(entityUri, putInitForFetch(headers, requestPayload))
                .then(response => {
                    logApiTiming(startMoment, moment(), "attempt save " + entityType)
                    toastr.clean()
                    dispatch(apiRequestDone())
                    dispatch(receiveResponseStatus(response.status, response.headers.get(R_ERR_MASK_HEADER)))
                    if (response.status == 503) {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "entity not saved - maintenance window",
                            label: entityType
                        })
                        toastrMaintenanceOutage()
                    } else if (!checkBecameUnauthenticated(response, dispatch)) {
                        if (response.status == 409) {
                            ReactGA.event({
                                category: utils.GA_EVENT_CATEGORY_USER,
                                action: "entity not saved - conflict",
                                label: entityType
                            })
                            dispatch(conflictDetected())
                        } else if (response.status == 200) {
                            return response.json().then(json => {
                                dispatch(receiveServerEntityFn(json))
                                dispatch(goBack())
                                dispatch(destroy(entityFormName))
                                toastr.success(entitySavedMessage(entityType), toastConfigSuccess())
                                ReactGA.event({
                                    category: utils.GA_EVENT_CATEGORY_USER,
                                    action: "entity saved successfully",
                                    label: entityType
                                })
                                if (customSuccessActionFn != null) {
                                    if (customSuccessActionPred != null) {
                                        if (customSuccessActionPred(requestPayload)) {
                                            dispatch(customSuccessActionFn())
                                        }
                                    }
                                }
                            })
                        } else if (response.status == 404) {
                            // entity removed from other device
                            ReactGA.event({
                                category: utils.GA_EVENT_CATEGORY_USER,
                                action: "entity not saved - gone",
                                label: entityType
                            })
                            dispatch(entityIdNotFoundFn(entityId))
                        } else if (!response.ok) {
                            ReactGA.event({
                                category: utils.GA_EVENT_CATEGORY_USER,
                                action: "entity save failed - server error",
                                label: entityType
                            })
                            toastr.error(entitySaveFailedMessage(entityType), toastConfigError())
                        }
                    }
                })
                .catch(error => {
                    toastr.clean()
                    dispatch(apiRequestDone())
                    toastr.error(entitySaveFailedMessage(entityType), toastConfigError())
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "entity save failed - error caught",
                        label: entityType
                    })
                })
        }
    }
}

export function makeAttemptDeleteEntityFn(entityType,
                                          entityMediaType,
                                          getEntityUpdatedAtFn,
                                          getEntityUriFn,
                                          attemptDownloadChangelogFn,
                                          entityDetailUrlFn,
                                          receiveServerEntityDeletedAckFn,
                                          entityIdNotFoundFn) {
    return (entityId) => {
        return (dispatch, getState) => {
            toastr.info(entityDeletingMessage(entityType), toastConfigWorkingOnIt())
            dispatch(apiRequestInitiated())
            const state = getState()
            const headers = new Headers()
            appendAuthenticatedCommonHeaders(headers, entityMediaType, state.authToken.value)
            headers.append(R_IF_UNMODIFIED_SINCE_HEADER, getEntityUpdatedAtFn(state, entityId))
            const entityUri = getEntityUriFn(state, entityId)
            const startMoment = moment()
            return fetch(entityUri, deleteInitForFetch(headers))
                .then(response => {
                    logApiTiming(startMoment, moment(), "attempt delete " + entityType)
                    toastr.clean()
                    dispatch(apiRequestDone())
                    dispatch(receiveResponseStatus(response.status, response.headers.get(R_ERR_MASK_HEADER)))
                    if (response.status == 503) {
                        ReactGA.event({
                            category: utils.GA_EVENT_CATEGORY_USER,
                            action: "entity not deleted - maintenance window",
                            label: entityType
                        })
                        toastrMaintenanceOutage()
                    } else if (!checkBecameUnauthenticated(response, dispatch)) {
                        if (response.status == 409) {
                            ReactGA.event({
                                category: utils.GA_EVENT_CATEGORY_USER,
                                action: "entity not deleted - conflict",
                                label: entityType
                            })
                            dispatch(conflictDetected())
                        } else if (response.status == 204) {
                            dispatch(receiveServerEntityDeletedAckFn(entityId))
                            dispatch(goBack())
                            ReactGA.event({
                                category: utils.GA_EVENT_CATEGORY_USER,
                                action: "entity deleted successfully",
                                label: entityType
                            })
                            toastr.success(entityDeletedMessage(entityType), toastConfigSuccess())
                        } else if (response.status == 404) {
                            // entity removed from other device
                            dispatch(entityIdNotFoundFn(entityId))
                            ReactGA.event({
                                category: utils.GA_EVENT_CATEGORY_USER,
                                action: "entity not deleted - gone",
                                label: entityType
                            })
                        } else if (!response.ok) {
                            ReactGA.event({
                                category: utils.GA_EVENT_CATEGORY_USER,
                                action: "entity delete failed - server error",
                                label: entityType
                            })
                            toastr.error(entityDeleteFailedMessage(entityType), toastConfigError())
                        }
                    }
                })
                .catch(error => {
                    toastr.clean()
                    dispatch(apiRequestDone())
                    toastr.error(entityDeleteFailedMessage(entityType), toastConfigError())
                    ReactGA.event({
                        category: utils.GA_EVENT_CATEGORY_USER,
                        action: "entity delete failed - error caught",
                        label: entityType
                    })
                })
        }
    }
}
