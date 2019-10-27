import * as actionTypes from "../actions/action-types"
import * as forms from "../forms"
import * as utils from "../utils"
import * as chartUtils from "../chart-utils"
import * as entkeys from "../entity-keys"
import _ from "lodash"
import { reducer as formReducer } from "redux-form"
import * as mtparts from "../media-type-parts"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import { bmlTypesMaker } from "../actions/action-creators"

const REDUX_FORM_CHANGE_ACTION_TYPE = "redux-form/CHANGE"
const REDUX_FORM_SUBMIT_FAILED_ACTION_TYPE = "redux-form/SUBMIT_FAILED"

export const initialServerSnapshotState = {
    _links: {},
    _embedded: {}
}

export const userAccountSubmitFailedReducer = (state = false, action) => {
    switch (action.type) {
    case REDUX_FORM_SUBMIT_FAILED_ACTION_TYPE:
        return true
    case REDUX_FORM_CHANGE_ACTION_TYPE:
        return false
    }
    return state
}

const formWithFieldValue = (formName, field, value) => {
    let form = {}
    form[formName] = {}
    form[formName][field] = {
        value: value
    }
    return form
}

const formWithTransformedFieldValue = (state, action, fieldNames, conversionFn, toValueFn) => {
    let newState = formReducer(state, action)
    for (let i = 0; i < fieldNames.length; i++) {
        newState = _.merge(newState,
                           formWithFieldValue(action.form,
                                              fieldNames[i],
                                              state[action.form][fieldNames[i]].value != null ? _.round(conversionFn(state[action.form][fieldNames[i]].value,
                                                                                                                     toValueFn(state[action.form][action.field].value),
                                                                                                                     toValueFn(action.value)), 1) : null))
    }
    return newState
}

const isWeightType = val => (val == utils.LBS.display) || (val == utils.KG.display)

export const rikerFormReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.LOGOUT_REQUEST_DONE:
        return {}
    case REDUX_FORM_CHANGE_ACTION_TYPE:
        switch (action.form) {
        case forms.NEW_SET_FORM:
        case forms.SET_FORM:
            switch (action.field) {
            case "uom":
                return formWithTransformedFieldValue(state, action, ["weight"], utils.weightValue, utils.toWeightUnitsValue)
            }
        case forms.BODY_JOURNAL_LOG_FORM:
            switch (action.field) {
            case "sizeUom":
                return formWithTransformedFieldValue(state, action, ["armSize", "chestSize", "calfSize", "neckSize", "waistSize", "thighSize", "forearmSize"], utils.lengthValue, utils.toLengthUnitsValue)
            case "bodyWeightUom":
                return formWithTransformedFieldValue(state, action, ["bodyWeight"], utils.weightValue, utils.toWeightUnitsValue)
            }
        case forms.NEW_BML_FORM:
            switch (action.field) {
            case "uom":
                return formWithTransformedFieldValue(state,
                                                     action,
                                                     ["inputValue"],
                                                     isWeightType(action.value) ? utils.weightValue : utils.lengthValue,
                                                     isWeightType(action.value) ? utils.toWeightUnitsValue : utils.toLengthUnitsValue)
            }
        }
    }
    return formReducer(state, action)
}

export const initialApiState = {
    responseStatus: null,
    rErrorMask: null,
    requestInProgress: false
}

export const changelogCountsReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.SERVER_CHANGELOG_COUNTS_COMPUTED:
        return Object.assign({}, state, action.changeCounts)
    case actionTypes.SERVER_CHANGELOG_COUNTS_VIEWED:
        return {}
    }
    return state
}

export const apiReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.RESPONSE_STATUS_RECEIVED:
        return Object.assign({}, state, { responseStatus: action.responseStatus,
                                          rErrorMask: action.rErrorMask })
    case actionTypes.LOGOUT_REQUEST_DONE:
        return initialApiState
    case actionTypes.API_REQUEST_INITIATED:
        return Object.assign({}, state, {requestInProgress: true})
    case actionTypes.API_REQUEST_DONE:
        return Object.assign({}, state, {requestInProgress: false})
    case actionTypes.BECAME_UNAUTHENTICATED:
        return Object.assign({}, state, { responseStatus: null })
    case actionTypes.CANCEL_RECORD_EDIT:
        return Object.assign({}, state, { rErrorMask: null })
    case actionTypes.CLEAR_ERRORS:
        return Object.assign({}, state, { rErrorMask: null, responseStatus: null, isConflict: false, fileImportError: false })
    case actionTypes.CONFLICT_DETECTED:
        return Object.assign({}, state, {isConflict: true})
    case actionTypes.CONFLICT_DETECTED_USER_ACK:
        return Object.assign({}, state, {isConflict: false})
    case actionTypes.FILE_IMPORT_SUCCESS:
        return Object.assign({}, state, {fileImportSuccess: true})
    case actionTypes.FILE_IMPORT_SUCCESS_USER_ACK:
        return Object.assign({}, state, {fileImportSuccess: false})
    case actionTypes.FILE_IMPORT_ERROR:
        return Object.assign({}, state, {fileImportError: true})
    case actionTypes.FILE_IMPORT_ERROR_USER_ACK:
        return Object.assign({}, state, {fileImportError: false})
    case actionTypes.ACCOUNT_VERIFICATION_EMAIL_SENT:
        return Object.assign({}, state, {indicateAccountVerificationEmailSent: true})
    case actionTypes.ACCOUNT_VERIFICATION_EMAIL_SENT_USER_ACK:
        return Object.assign({}, state, {indicateAccountVerificationEmailSent: false})
    case actionTypes.SUBSCRIPTION_CANCELLED:
        return Object.assign({}, state, {subscriptionCancelled: true})
    case actionTypes.SUBSCRIPTION_CANCELLED_USER_ACK:
        return Object.assign({}, state, {subscriptionCancelled: false})
    case actionTypes.SUBSCRIPTION_CANCELLED_ERROR:
        return Object.assign({}, state, {subscriptionCancelFailed: true})
    case actionTypes.SUBSCRIPTION_CANCELLED_ERROR_USER_ACK:
        return Object.assign({}, state, {subscriptionCancelFailed: false})
    case actionTypes.PAYMENT_TOKEN_SAVED:
        return Object.assign({}, state, {paymentTokenSaved: true, paymentToken: null})
    case actionTypes.PAYMENT_TOKEN_SAVED_USER_ACK:
        return Object.assign({}, state, {paymentTokenSaved: false})
    case actionTypes.PAYMENT_TOKEN_SAVE_ERROR:
        return Object.assign({}, state, {paymentTokenSaveError: true, paymentToken: action.paymentToken})
    case actionTypes.PAYMENT_TOKEN_RECEIVED:
        return Object.assign({}, state, {paymentToken: action.paymentToken})
    case actionTypes.PAYMENT_TOKEN_SAVE_ERROR_USER_ACK:
        return Object.assign({}, state, {paymentTokenSaveError: false})
    }
    return state
}

const initialAllChartConfigState = () => {
    const initialState = {}
    // global charts
    initialState[chartUtils.CHART_ID_GLOBAL_BODY]  = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_GLOBAL_BODY)
    initialState[chartUtils.CHART_ID_GLOBAL_STRENGTH]  = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_GLOBAL_STRENGTH)
    initialState[chartUtils.CHART_ID_GLOBAL_REPS]  = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_GLOBAL_REPS)
    initialState[chartUtils.CHART_ID_GLOBAL_REST_TIME]  = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_GLOBAL_REST_TIME)

    // body charts
    initialState[chartUtils.CHART_ID_BODY_WEIGHT]  = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_BODY_WEIGHT,  "Body Weight",  null, "#5D3F6B", false, false)
    initialState[chartUtils.CHART_ID_ARM_SIZE]     = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_ARM_SIZE,     "Arm Size",     null, "#003071", false, false)
    initialState[chartUtils.CHART_ID_CHEST_SIZE]   = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_CHEST_SIZE,   "Chest Size",   null, "#CD7537", false, false)
    initialState[chartUtils.CHART_ID_CALF_SIZE]    = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_CALF_SIZE,    "Calf Size",    null, "#A07817", false, false)
    initialState[chartUtils.CHART_ID_THIGH_SIZE]   = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_THIGH_SIZE,   "Thigh Size",   null, "#2ECB70", false, false)
    initialState[chartUtils.CHART_ID_FOREARM_SIZE] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_FOREARM_SIZE, "Forearm Size", null, "#F12513", false, false)
    initialState[chartUtils.CHART_ID_WAIST_SIZE]   = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WAIST_SIZE,   "Waist Size",   null, "#8E43AD", false, false)
    initialState[chartUtils.CHART_ID_NECK_SIZE]    = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_NECK_SIZE,    "Neck Size",    null, "#2C3D4F", false, false)

    const mov = s => s + " - Movement Variants"

    // strength charts - aggregate weight lifted timeline charts
    let name = "Total Weight Lifted"
    initialState[chartUtils.CHART_ID_WLTC_ALL] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_ALL, name, null, null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_BODY_SEGMENTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_BODY_SEGMENTS, name, "Body Segments", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MUSCLE_GROUPS, name, "All Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_SHOULDERS, name, "Shoulders", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_CHEST, name, "Chest", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_BACK, name, "Back", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_BICEPS, name, "Biceps", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_TRICEPS, name, "Triceps", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_FOREARMS, name, "Forearms", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_ABS, name, "Abs", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_QUADS, name, "Quadriceps", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_HAMS, name, "Hamstrings", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_CALFS, name, "Calfs", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_GLUTES, name, "Glutes", null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOVEMENT_VARIANTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_UPPER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_SHOULDERS, name, mov("Shoulders"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_CHEST, name, mov("Chest"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_BACK, name, mov("Back"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_BICEPS, name, mov("Biceps"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_TRICEPS, name, mov("Triceps"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_FOREARMS, name, mov("Forearms"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_ABS, name, mov("Abs"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_LOWER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_QUADS, name, mov("Quadriceps"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_HAMS, name, mov("Hamstrings"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_CALFS, name, mov("Calfs"), null, false, true)
    initialState[chartUtils.CHART_ID_WLTC_MOV_VAR_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLTC_MOV_VAR_GLUTES, name, mov("Glutes"), null, false, true)

    // strength charts - average weight lifted timeline charts
    name = "Average Weight Lifted per Set"
    initialState[chartUtils.CHART_ID_AVG_WLTC_ALL] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_ALL, name, null, null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_BODY_SEGMENTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_BODY_SEGMENTS, name, "Body Segments", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MUSCLE_GROUPS, name, "All Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_SHOULDERS, name, "Shoulders", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_CHEST, name, "Chest", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_BACK, name, "Back", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_BICEPS, name, "Biceps", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_TRICEPS, name, "Triceps", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_FOREARMS, name, "Forearms", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_ABS, name, "Abs", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_QUADS, name, "Quadriceps", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_HAMS, name, "Hamstrings", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_CALFS, name, "Calfs", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_GLUTES, name, "Glutes", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOVEMENT_VARIANTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_UPPER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_SHOULDERS, name, mov("Shoulders"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_CHEST, name, mov("Chest"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_BACK, name, mov("Back"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_BICEPS, name, mov("Biceps"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_TRICEPS, name, mov("Triceps"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_FOREARMS, name, mov("Forearms"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_ABS, name, mov("Abs"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_LOWER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_QUADS, name, mov("Quadriceps"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_HAMS, name, mov("Hamstrings"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_CALFS, name, mov("Calfs"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_GLUTES, name, mov("Glutes"), null, false, true)

    // strength charts - weight lifted distribution pie charts
    name = "Weight Lifted Distribution"
    initialState[chartUtils.CHART_ID_WLDPC_BODY_SEGMENTS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_BODY_SEGMENTS, name, "Body Segments")
    initialState[chartUtils.CHART_ID_WLDPC_MUSCLE_GROUPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MUSCLE_GROUPS, name, "All Muscle Groups")
    initialState[chartUtils.CHART_ID_WLDPC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups")
    initialState[chartUtils.CHART_ID_WLDPC_SHOULDERS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_SHOULDERS, name, "Shoulders")
    initialState[chartUtils.CHART_ID_WLDPC_CHEST] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_CHEST, name, "Chest")
    initialState[chartUtils.CHART_ID_WLDPC_BACK] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_BACK, name, "Back")
    initialState[chartUtils.CHART_ID_WLDPC_TRICEPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_TRICEPS, name, "Triceps")
    initialState[chartUtils.CHART_ID_WLDPC_ABS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_ABS, name, "Abs")
    initialState[chartUtils.CHART_ID_WLDPC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups")
    initialState[chartUtils.CHART_ID_WLDPC_MOVEMENT_VARIANTS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_UPPER_BODY] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_SHOULDERS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_SHOULDERS, name, mov("Shoulders"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_CHEST] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_CHEST, name, mov("Chest"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_BACK] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_BACK, name, mov("Back"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_BICEPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_BICEPS, name, mov("Biceps"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_TRICEPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_TRICEPS, name, mov("Triceps"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_FOREARMS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_FOREARMS, name, mov("Forearms"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_ABS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_ABS, name, mov("Abs"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_LOWER_BODY] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_QUADS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_QUADS, name, mov("Quadriceps"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_HAMS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_HAMS, name, mov("Hamstrings"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_CALFS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_CALFS, name, mov("Calfs"))
    initialState[chartUtils.CHART_ID_WLDPC_MOV_VAR_GLUTES] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_WLDPC_MOV_VAR_GLUTES, name, mov("Glutes"))

    // strength charts - distribution weight lifted timeline charts
    name = "Weight Lifted Distribution"
    initialState[chartUtils.CHART_ID_WLDTC_BODY_SEGMENTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_BODY_SEGMENTS, name, "Body Segments", null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MUSCLE_GROUPS, name, "All Muscle Groups", null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups", null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_SHOULDERS, name, "Shoulders", null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_CHEST, name, "Chest", null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_BACK, name, "Back", null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_TRICEPS, name, "Triceps", null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_ABS, name, "Abs", null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups", null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOVEMENT_VARIANTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_UPPER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_SHOULDERS, name, mov("Shoulders"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_CHEST, name, mov("Chest"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_BACK, name, mov("Back"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_BICEPS, name, mov("Biceps"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_TRICEPS, name, mov("Triceps"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_FOREARMS, name, mov("Forearms"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_ABS, name, mov("Abs"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_LOWER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_QUADS, name, mov("Quadriceps"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_HAMS, name, mov("Hamstrings"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_CALFS, name, mov("Calfs"), null, true, false)
    initialState[chartUtils.CHART_ID_WLDTC_MOV_VAR_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_WLDTC_MOV_VAR_GLUTES, name, mov("Glutes"), null, true, false)

    // strength charts - aggregate reps timeline charts
    name = "Total Reps"
    initialState[chartUtils.CHART_ID_RTC_ALL] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_ALL, name, null, null, false, true)
    initialState[chartUtils.CHART_ID_RTC_BODY_SEGMENTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_BODY_SEGMENTS, name, "Body Segments", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MUSCLE_GROUPS, name, "All Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_SHOULDERS, name, "Shoulders", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_CHEST, name, "Chest", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_BACK, name, "Back", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_BICEPS, name, "Biceps", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_TRICEPS, name, "Triceps", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_FOREARMS, name, "Forearms", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_ABS, name, "Abs", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_QUADS, name, "Quadriceps", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_HAMS, name, "Hamstrings", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_CALFS, name, "Calfs", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_GLUTES, name, "Glutes", null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOVEMENT_VARIANTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_UPPER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_SHOULDERS, name, mov("Shoulders"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_CHEST, name, mov("Chest"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_BACK, name, mov("Back"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_BICEPS, name, mov("Biceps"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_TRICEPS, name, mov("Triceps"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_FOREARMS, name, mov("Forearms"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_ABS, name, mov("Abs"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_LOWER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_QUADS, name, mov("Quadriceps"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_HAMS, name, mov("Hamstrings"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_CALFS, name, mov("Calfs"), null, false, true)
    initialState[chartUtils.CHART_ID_RTC_MOV_VAR_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RTC_MOV_VAR_GLUTES, name, mov("Glutes"), null, false, true)

    // strength charts - average reps timeline charts
    name = "Average Reps per Set"
    initialState[chartUtils.CHART_ID_AVG_RTC_ALL] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_ALL, name, null, null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_BODY_SEGMENTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_BODY_SEGMENTS, name, "Body Segments", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MUSCLE_GROUPS, name, "All Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_SHOULDERS, name, "Shoulders", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_CHEST, name, "Chest", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_BACK, name, "Back", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_BICEPS, name, "Biceps", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_TRICEPS, name, "Triceps", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_FOREARMS, name, "Forearms", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_ABS, name, "Abs", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_QUADS, name, "Quadriceps", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_HAMS, name, "Hamstrings", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_CALFS, name, "Calfs", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_GLUTES, name, "Glutes", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOVEMENT_VARIANTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_UPPER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_SHOULDERS, name, mov("Shoulders"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_CHEST, name, mov("Chest"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_BACK, name, mov("Back"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_BICEPS, name, mov("Biceps"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_TRICEPS, name, mov("Triceps"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_FOREARMS, name, mov("Forearms"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_ABS, name, mov("Abs"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_LOWER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_QUADS, name, mov("Quadriceps"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_HAMS, name, mov("Hamstrings"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_CALFS, name, mov("Calfs"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_RTC_MOV_VAR_GLUTES, name, mov("Glutes"), null, false, true)

    // strength charts - reps pie charts
    name = "Reps Distribution"
    initialState[chartUtils.CHART_ID_RDPC_BODY_SEGMENTS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_BODY_SEGMENTS, name, "Body Segments")
    initialState[chartUtils.CHART_ID_RDPC_MUSCLE_GROUPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MUSCLE_GROUPS, name, "All Muscle Groups")
    initialState[chartUtils.CHART_ID_RDPC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups")
    initialState[chartUtils.CHART_ID_RDPC_SHOULDERS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_SHOULDERS, name, "Shoulders")
    initialState[chartUtils.CHART_ID_RDPC_CHEST] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_CHEST, name, "Chest")
    initialState[chartUtils.CHART_ID_RDPC_BACK] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_BACK, name, "Back")
    initialState[chartUtils.CHART_ID_RDPC_TRICEPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_TRICEPS, name, "Triceps")
    initialState[chartUtils.CHART_ID_RDPC_ABS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_ABS, name, "Abs")
    initialState[chartUtils.CHART_ID_RDPC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups")
    initialState[chartUtils.CHART_ID_RDPC_MOVEMENT_VARIANTS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_UPPER_BODY] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_SHOULDERS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_SHOULDERS, name, mov("Shoulders"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_CHEST] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_CHEST, name, mov("Chest"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_BACK] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_BACK, name, mov("Back"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_BICEPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_BICEPS, name, mov("Biceps"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_TRICEPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_TRICEPS, name, mov("Triceps"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_FOREARMS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_FOREARMS, name, mov("Forearms"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_ABS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_ABS, name, mov("Abs"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_LOWER_BODY] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_QUADS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_QUADS, name, mov("Quadriceps"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_HAMS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_HAMS, name, mov("Hamstrings"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_CALFS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_CALFS, name, mov("Calfs"))
    initialState[chartUtils.CHART_ID_RDPC_MOV_VAR_GLUTES] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_RDPC_MOV_VAR_GLUTES, name, mov("Glutes"))

    // strength charts - distribution reps timeline charts
    name = "Reps Distribution"
    initialState[chartUtils.CHART_ID_RDTC_BODY_SEGMENTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_BODY_SEGMENTS, name, "Body Segments", null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MUSCLE_GROUPS, name, "All Muscle Groups", null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups", null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_SHOULDERS, name, "Shoulders", null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_CHEST, name, "Chest", null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_BACK, name, "Back", null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_TRICEPS, name, "Triceps", null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_ABS, name, "Abs", null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups", null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOVEMENT_VARIANTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_UPPER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_SHOULDERS, name, mov("Shoulders"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_CHEST, name, mov("Chest"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_BACK, name, mov("Back"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_BICEPS, name, mov("Biceps"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_TRICEPS, name, mov("Triceps"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_FOREARMS, name, mov("Forearms"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_ABS, name, mov("Abs"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_LOWER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_QUADS, name, mov("Quadriceps"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_HAMS, name, mov("Hamstrings"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_CALFS, name, mov("Calfs"), null, true, false)
    initialState[chartUtils.CHART_ID_RDTC_MOV_VAR_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_RDTC_MOV_VAR_GLUTES, name, mov("Glutes"), null, true, false)

    // strength charts - aggregate time between sets timeline charts
    name = "Total Rest Time Between Sets"
    initialState[chartUtils.CHART_ID_TBSTC_ALL] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_ALL, name, null, null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_BODY_SEGMENTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_BODY_SEGMENTS, name, "Body Segments", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MUSCLE_GROUPS, name, "All Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_SHOULDERS, name, "Shoulders", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_CHEST, name, "Chest", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_BACK, name, "Back", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_BICEPS, name, "Biceps", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_TRICEPS, name, "Triceps", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_FOREARMS, name, "Forearms", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_ABS, name, "Abs", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_QUADS, name, "Quadriceps", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_HAMS, name, "Hamstrings", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_CALFS, name, "Calfs", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_GLUTES, name, "Glutes", null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOVEMENT_VARIANTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_UPPER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_SHOULDERS, name, mov("Shoulders"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_CHEST, name, mov("Chest"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_BACK, name, mov("Back"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_BICEPS, name, mov("Biceps"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_TRICEPS, name, mov("Triceps"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_FOREARMS, name, mov("Forearms"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_ABS, name, mov("Abs"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_LOWER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_QUADS, name, mov("Quadriceps"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_HAMS, name, mov("Hamstrings"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_CALFS, name, mov("Calfs"), null, false, true)
    initialState[chartUtils.CHART_ID_TBSTC_MOV_VAR_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSTC_MOV_VAR_GLUTES, name, mov("Glutes"), null, false, true)

    // strength charts - average rest time between sets timeline charts
    name = "Average Rest Time per Set"
    initialState[chartUtils.CHART_ID_AVG_TBSTC_ALL] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_ALL, name, null, null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_BODY_SEGMENTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_BODY_SEGMENTS, name, "Body Segments", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MUSCLE_GROUPS, name, "All Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_SHOULDERS, name, "Shoulders", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_CHEST, name, "Chest", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_BACK, name, "Back", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_BICEPS, name, "Biceps", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_TRICEPS, name, "Triceps", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_FOREARMS, name, "Forearms", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_ABS, name, "Abs", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_QUADS, name, "Quadriceps", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_HAMS, name, "Hamstrings", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_CALFS, name, "Calfs", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_GLUTES, name, "Glutes", null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOVEMENT_VARIANTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_UPPER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_SHOULDERS, name, mov("Shoulders"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_CHEST, name, mov("Chest"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_BACK, name, mov("Back"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_BICEPS, name, mov("Biceps"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_TRICEPS, name, mov("Triceps"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_FOREARMS, name, mov("Forearms"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_ABS, name, mov("Abs"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_LOWER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_QUADS, name, mov("Quadriceps"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_HAMS, name, mov("Hamstrings"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_CALFS, name, mov("Calfs"), null, false, true)
    initialState[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_GLUTES, name, mov("Glutes"), null, false, true)

    // strength charts - time between sets pie charts
    name = "Rest Time Distribution"
    initialState[chartUtils.CHART_ID_TBSDPC_BODY_SEGMENTS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_BODY_SEGMENTS, name, "Body Segments")
    initialState[chartUtils.CHART_ID_TBSDPC_MUSCLE_GROUPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MUSCLE_GROUPS, name, "All Muscle Groups")
    initialState[chartUtils.CHART_ID_TBSDPC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups")
    initialState[chartUtils.CHART_ID_TBSDPC_SHOULDERS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_SHOULDERS, name, "Shoulders")
    initialState[chartUtils.CHART_ID_TBSDPC_CHEST] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_CHEST, name, "Chest")
    initialState[chartUtils.CHART_ID_TBSDPC_BACK] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_BACK, name, "Back")
    initialState[chartUtils.CHART_ID_TBSDPC_TRICEPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_TRICEPS, name, "Triceps")
    initialState[chartUtils.CHART_ID_TBSDPC_ABS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_ABS, name, "Abs")
    initialState[chartUtils.CHART_ID_TBSDPC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups")
    initialState[chartUtils.CHART_ID_TBSDPC_MOVEMENT_VARIANTS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_UPPER_BODY] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_SHOULDERS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_SHOULDERS, name, mov("Shoulders"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_CHEST] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_CHEST, name, mov("Chest"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_BACK] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_BACK, name, mov("Back"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_BICEPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_BICEPS, name, mov("Biceps"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_TRICEPS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_TRICEPS, name, mov("Triceps"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_FOREARMS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_FOREARMS, name, mov("Forearms"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_ABS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_ABS, name, mov("Abs"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_LOWER_BODY] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_QUADS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_QUADS, name, mov("Quadriceps"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_HAMS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_HAMS, name, mov("Hamstrings"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_CALFS] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_CALFS, name, mov("Calfs"))
    initialState[chartUtils.CHART_ID_TBSDPC_MOV_VAR_GLUTES] = chartUtils.makePieChartConfigState(chartUtils.CHART_ID_TBSDPC_MOV_VAR_GLUTES, name, mov("Glutes"))

    // strength charts - distribution time between sets timeline charts
    name = "Rest Time Distribution"
    initialState[chartUtils.CHART_ID_TBSDTC_BODY_SEGMENTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_BODY_SEGMENTS, name, "Body Segments", null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MUSCLE_GROUPS, name, "All Muscle Groups", null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_UPPER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_UPPER_BODY_MUSCLE_GROUPS, name, "Upper Body Muscle Groups", null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_SHOULDERS, name, "Shoulders", null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_CHEST, name, "Chest", null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_BACK, name, "Back", null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_TRICEPS, name, "Triceps", null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_ABS, name, "Abs", null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_LOWER_BODY_MUSCLE_GROUPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_LOWER_BODY_MUSCLE_GROUPS, name, "Lower Body Muscle Groups", null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOVEMENT_VARIANTS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOVEMENT_VARIANTS, name, mov("All Muscle Groups"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_UPPER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_UPPER_BODY, name, mov("Upper Body"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_SHOULDERS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_SHOULDERS, name, mov("Shoulders"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_CHEST] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_CHEST, name, mov("Chest"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_BACK] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_BACK, name, mov("Back"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_BICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_BICEPS, name, mov("Biceps"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_TRICEPS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_TRICEPS, name, mov("Triceps"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_FOREARMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_FOREARMS, name, mov("Forearms"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_ABS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_ABS, name, mov("Abs"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_LOWER_BODY] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_LOWER_BODY, name, mov("Lower Body"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_QUADS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_QUADS, name, mov("Quadriceps"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_HAMS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_HAMS, name, mov("Hamstrings"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_CALFS] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_CALFS, name, mov("Calfs"), null, true, false)
    initialState[chartUtils.CHART_ID_TBSDTC_MOV_VAR_GLUTES] = chartUtils.makeTimelineChartConfigState(chartUtils.CHART_ID_TBSDTC_MOV_VAR_GLUTES, name, mov("Glutes"), null, true, false)

    return initialState
}

const overwriteChartConfigIfHasProp = (allChartConfig, chartId, newChartConfig, propName) => {
    if (newChartConfig.hasOwnProperty(propName)) {
        _.set(allChartConfig, chartId + "." + propName, newChartConfig[propName])
    }
}

const makeAllChartsDoer = chartIds => fn => {
    for (let i = 0; i < chartIds.length; i++) {
        fn(chartIds[i])
    }
}

const doOnAllBodyChartIds = makeAllChartsDoer(chartUtils.ALL_BODY_CHART_IDS)
const doOnAllStrengthChartIds = makeAllChartsDoer(chartUtils.ALL_STRENGTH_CHART_IDS)
const doOnAllRepChartIds = makeAllChartsDoer(chartUtils.ALL_REPS_CHART_IDS)
const doOnAllRestTimeChartIds = makeAllChartsDoer(chartUtils.ALL_REST_TIME_CHART_IDS)

const overwriteChartConfig = (allChartConfig, chartId, newChartConfig) => {
    overwriteChartConfigIfHasProp(allChartConfig, chartId, newChartConfig, "startDate")
    overwriteChartConfigIfHasProp(allChartConfig, chartId, newChartConfig, "endDate")
    overwriteChartConfigIfHasProp(allChartConfig, chartId, newChartConfig, "aggregateBy")
    overwriteChartConfigIfHasProp(allChartConfig, chartId, newChartConfig, "suppressPieSliceLabels")
    overwriteChartConfigIfHasProp(allChartConfig, chartId, newChartConfig, "boundedEndDate")
    overwriteChartConfigIfHasProp(allChartConfig, chartId, newChartConfig, "animate")
    overwriteChartConfigIfHasProp(allChartConfig, chartId, newChartConfig, "manuallyConfigured")
}

export const allChartConfigReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.LOGOUT_REQUEST_DONE:
        return {}
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
        return Object.assign({}, state, initialAllChartConfigState())
    case actionTypes.ALL_CHART_CONFIG_RECEIVED:
        return Object.assign(Object.assign({}, state), action.allChartConfig)
    case actionTypes.RECEIVE_GLOBAL_CHART_CONFIG: {
        let chartIdsCollection = null
        if (action.chartId == chartUtils.CHART_ID_GLOBAL_BODY) {
            chartIdsCollection = chartUtils.ALL_BODY_CHART_IDS
        } else if (action.chartId == chartUtils.CHART_ID_GLOBAL_STRENGTH) {
            chartIdsCollection = chartUtils.ALL_STRENGTH_CHART_IDS
        } else if (action.chartId == chartUtils.CHART_ID_GLOBAL_REPS) {
            chartIdsCollection = chartUtils.ALL_REPS_CHART_IDS
        } else if (action.chartId == chartUtils.CHART_ID_GLOBAL_REST_TIME) {
            chartIdsCollection = chartUtils.ALL_REST_TIME_CHART_IDS
        }
        if (chartIdsCollection != null) {
            let newGlobalConfigData = action.chartConfig[action.chartId]
            let newState = Object.assign({}, state)
            makeAllChartsDoer(chartIdsCollection)(chartId => overwriteChartConfig(newState, chartId, newGlobalConfigData))
            return newState
        }
        return state
    }
    case actionTypes.RECEIVE_CHART_CONFIG:
        return _.merge(Object.assign({}, state), action.chartConfig)
    case actionTypes.ALL_CHARTS_DISABLE_ANIMATION: {
        let newState = Object.assign({}, state)
        const doFn = chartId => _.set(newState, chartId + ".animate", false)
        doOnAllBodyChartIds(doFn)
        doOnAllStrengthChartIds(doFn)
        doOnAllRepChartIds(doFn)
        doOnAllRestTimeChartIds(doFn)
        return newState
    }
    }
    return state
}

export const chartCacheReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.ADD_TO_CHART_CACHE:
        const cacheEntry = {}
        cacheEntry[action.cacheKey] = action.value
        return Object.assign({}, state, cacheEntry)
    case actionTypes.CHART_CACHE_RECEIVED:
        return _.isEmpty(action.chartCache) ? state : action.chartCache
    // cache clearing action types
    case actionTypes.SERVER_BODY_JOURNAL_LOG_RECEIVED:
    case actionTypes.SERVER_BODY_JOURNAL_LOG_DELETED_ACK_RECEIVED:
    case actionTypes.SERVER_SET_RECEIVED:
    case actionTypes.SERVER_SET_DELETED_ACK_RECEIVED:
    case actionTypes.SERVER_SETTINGS_RECEIVED:
    case actionTypes.SERVER_CHANGELOG_RECEIVED:
    case actionTypes.FILE_IMPORT_SUCCESS:
    case actionTypes.LOGOUT_REQUEST_DONE:
        return {}
    }
    return state
}

export const redisplayBannerAfterReducer = (state = null, action) => {
    switch (action.type) {
    case actionTypes.LOGOUT_REQUEST_DONE:
        return { value: null }
    case actionTypes.BANNER_REMIND_LATER:
        return { value: action.redisplayBannerAfter }
    }
    return state
}

export const newMovementsAddedAtAckAtReducer = (state = null, action) => {
    switch (action.type) {
    case actionTypes.LOGOUT_REQUEST_DONE:
        return { value: null }
    case actionTypes.SERVER_CHANGELOG_COUNTS_VIEWED:
    case actionTypes.LOGIN_SUCCESS:
        return { value: moment().valueOf() }
    case actionTypes.NEW_MOVEMENTS_ADDED_ACK_VALUE:
        return { value: action.newMovementsAddedAtAckAt }
    }
    return state
}

export const bodyLiftWtExplanationAckAtReducer = (state = null, action) => {
    switch (action.type) {
    case actionTypes.LOGOUT_REQUEST_DONE:
        return { value: null }
    case actionTypes.BODY_LIFT_WT_EXPLANATION_ACK:
        return { value: moment().valueOf() }
    case actionTypes.BODY_LIFT_WT_EXPLANATION_ACK_VALUE:
        return { value: action.bodyLiftWtExplanationAckAt }
    }
    return state
}

export const maintenanceAckAtReducer = (state = null, action) => {
    switch (action.type) {
    case actionTypes.LOGOUT_REQUEST_DONE:
        return { value: null }
    case actionTypes.MAINTENANCE_ACK:
        return { value: moment().valueOf() }
    case actionTypes.MAINTENANCE_ACK_VALUE:
        return { value: action.maintenanceAckAt }
    }
    return state
}

export const mostRecentUpdatedAtReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.LOGOUT_REQUEST_DONE:
        return { value: null }
    case actionTypes.SERVER_SNAPSHOT_RECEIVED:
        const serverSnapshot = action.serverSnapshot
        if (serverSnapshot != null) {
            const mostRecentUpdatedAt = utils.mostRecentUpdatedAt(serverSnapshot["user/updated-at"],
                                                                  [[_.values(serverSnapshot._embedded[entkeys.originationDevices]), "originationdevice/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.bodySegments]),     "bodysegment/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.muscleGroups]),     "musclegroup/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.muscles]),          "muscle/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.muscleAliases]),    "musclealias/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.movements]),        "movement/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.movementAliases]),  "movementalias/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.movementVariants]), "movementvariant/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.cardioTypes]),      "cardiotype/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.walkingPaces]),     "walkingpace/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.usersettings]),     "usersettings/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.sets]),             "set/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.supersets]),        "superset/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.cardioLogs]),       "cardiolog/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.sorenessLogs]),     "sorenesslog/updated-at"],
                                                                   [_.values(serverSnapshot._embedded[entkeys.bodyJournalLogs]),  "bodyjournallog/updated-at"]])
            if (mostRecentUpdatedAt != null) {
                return { value: mostRecentUpdatedAt }
            }
        }
    case actionTypes.SERVER_CHANGELOG_RECEIVED:
        if (action.serverChangelog != null) {
            return { value: action.serverChangelog["changelog/updated-at"] }
        }
    }
    return state
}


export const currentCycleReducer = (state = {}, action) => {
    momentLocalizer(moment)
    switch (action.type) {
    case actionTypes.CURRENT_CYCLE_RECEIVED:
        if (action.currentCycle != null) {
            return action.currentCycle
        }
        return state
    case actionTypes.NEW_SET_SAVED_SUCCESSFULLY:
        return processNewlySavedSet(state, action.serverSet, action.selectedMovementVariantId)
    case actionTypes.LOGOUT_REQUEST_DONE:
        return {}
    case actionTypes.SERVER_SET_DELETED_ACK_RECEIVED:
    case actionTypes.SERVER_SET_NOT_FOUND:
        return removeSetFromCycle(state, action.serverSetId)
    case actionTypes.SERVER_SET_RECEIVED:
        return removeSetFromCycleIfMovementOrVariantChanged(state, action.serverSet)
    }
    return state
}

function removeSetFromCycleIfMovementOrVariantChanged(cycle, serverSet) {
    let newCycle = _.cloneDeep(cycle)
    _.remove(newCycle.sets, set => (set["set/id"] == serverSet["set/id"]) &&
             ((cycle.movementId != serverSet["set/movement-id"]) ||
              (cycle.movementVariantId != serverSet["set/movement-variant-id"])))
    return newCycle
}

function removeSetFromCycle(cycle, serverSetId) {
    let newCycle = _.cloneDeep(cycle)
    _.remove(newCycle.sets, set => set["set/id"] == serverSetId)
    return newCycle
}

function processNewlySavedSet(state, set, newMovementVariantId) {
    const newMovementId = set["set/movement-id"]
    const newState = {movementId: newMovementId, movementVariantId: newMovementVariantId}
    if (state == null ||
        state.movementId != newMovementId ||
        state.movementVariantId != newMovementVariantId) {
        newState.sets = [set]
    } else {
        let newSets = _.cloneDeep(state.sets)
        if (newSets.length > 0) {
            if (!moment(newSets[newSets.length - 1]["set/logged-at"]).isAfter(
                moment().subtract(utils.LAST_CYCLE_SET_TOO_OLD.val,
                                  utils.LAST_CYCLE_SET_TOO_OLD.units))) {
                newSets = []
            }
        }
        newSets.push(set)
        newState.sets = newSets
    }
    return newState
}

export const selectionContextReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.BODY_SEGMENT_SELECTED:
        return Object.assign({}, state, {selectedBodySegmentId: action.bodySegmentId})
    case actionTypes.MUSCLE_GROUP_SELECTED:
        return Object.assign({}, state, {selectedMuscleGroupId: action.mgId})
    case actionTypes.MOVEMENT_SELECTED:
        return Object.assign({}, state, {selectedMovementId: action.movementId})
    case actionTypes.MOVEMENT_VARIANT_SELECTED:
        return Object.assign({}, state, {selectedMovementVariantId: action.movementVariantId})
    case actionTypes.BML_TYPE_SELECTED:
        return Object.assign({}, state, {selectedBmlTypeId: action.bmlTypeId})
    }
    return state
}

export const serverSnapshotReducer = (state = {}, action) => {
    let newState = null
    switch (action.type) {
    case actionTypes.SERVER_SNAPSHOT_RECEIVED:
        newState = _.isEmpty(action.serverSnapshot) ? state : action.serverSnapshot
        return newState
    case actionTypes.LOGOUT_REQUEST_DONE:
        newState = initialServerSnapshotState
        return newState
    case actionTypes.SERVER_CHANGELOG_RECEIVED:
        newState = processChangelog(state, action.serverChangelog)
        return newState
    case actionTypes.SERVER_USER_RECEIVED:
        newState = Object.assign(Object.assign({}, state), action.serverUser)
        return newState
    case actionTypes.SERVER_PLAN_RECEIVED:
        newState = Object.assign(Object.assign({}, state), action.serverPlan)
        return newState
    case actionTypes.SERVER_SETTINGS_RECEIVED:
        newState = _.set(Object.assign({}, state), "_embedded.usersettings[" + action.serverSettings["usersettings/id"] + "].payload", action.serverSettings)
        updateIndirectUserProps(newState, action.serverSettings)
        return newState
    case actionTypes.SERVER_SET_RECEIVED:
        newState = _.set(Object.assign({}, state), "_embedded.sets[" + action.serverSet["set/id"] + "].payload", action.serverSet)
        updateIndirectUserProps(newState, action.serverSet)
        return newState
    case actionTypes.SERVER_SET_LOCATION_RECEIVED:
        newState = _.set(Object.assign({}, state), "_embedded.sets[" + action.serverSetId + "].location", action.serverSetLocation)
        return newState
    case actionTypes.SERVER_SET_MEDIATYPE_RECEIVED:
        newState = _.set(Object.assign({}, state), "_embedded.sets[" + action.serverSetId + "].media-type", action.serverSetMediaType)
        return newState
    case actionTypes.SERVER_SET_DELETED_ACK_RECEIVED:
    case actionTypes.SERVER_SET_NOT_FOUND:
        newState = removeEntity(state, "sets", action.serverSetId)
        return newState
    case actionTypes.SERVER_BODY_JOURNAL_LOG_RECEIVED:
        newState = _.set(Object.assign({}, state), "_embedded[body-journal-logs][" + action.serverBodyJournalLog["bodyjournallog/id"] + "].payload", action.serverBodyJournalLog)
        updateIndirectUserProps(newState, action.serverBodyJournalLog)
        return newState
    case actionTypes.SERVER_BODY_JOURNAL_LOG_LOCATION_RECEIVED:
        newState = _.set(Object.assign({}, state), "_embedded[body-journal-logs][" + action.serverBodyJournalLogId + "].location", action.serverBodyJournalLogLocation)
        return newState
    case actionTypes.SERVER_BODY_JOURNAL_LOG_MEDIATYPE_RECEIVED:
        newState = _.set(Object.assign({}, state), "_embedded[body-journal-logs][" + action.serverBodyJournalLogId + "].media-type", action.serverBodyJournalLogMediaType)
        return newState
    case actionTypes.SERVER_BODY_JOURNAL_LOG_DELETED_ACK_RECEIVED:
    case actionTypes.SERVER_BODY_JOURNAL_LOG_NOT_FOUND:
        newState = removeEntity(state, "body-journal-logs", action.serverBodyJournalLogId)
        return newState
    }
    return state
}

function updateIndirectUserProps(newState, actionPayload) {
    updateIndirectUserProp(newState, actionPayload, "user/is-payment-past-due")
    updateIndirectUserProp(newState, actionPayload, "user/verified-at")
    updateIndirectUserProp(newState, actionPayload, "user/new-movements-added-at")
    updateIndirectUserProp(newState, actionPayload, "user/maintenance-starts-at")
    updateIndirectUserProp(newState, actionPayload, "user/informed-of-maintenance-at")
    updateIndirectUserProp(newState, actionPayload, "user/maintenance-duration")
    updateIndirectUserProp(newState, actionPayload, "user/current-plan-price")
}

function updateIndirectUserProp(newState, actionPayload, userKey) {
    if (_.has(actionPayload, userKey)) {
        newState[userKey] = actionPayload[userKey]
    }
}

function processChangelogEntity(newState, location, mediaType, entityPayload, mtPart, deletedAtKey, entitiesKey, entityIdKey) {
    const changelogEntityMtPart = mediaType.match(utils.mediaTypePartRegex)[1]
    if (changelogEntityMtPart == mtPart) {
        if (entityPayload[deletedAtKey] != null) {
            _.unset(newState, ["_embedded", entitiesKey, _.toString(entityPayload[entityIdKey])])
        } else {
            _.set(newState, ["_embedded", entitiesKey, _.toString(entityPayload[entityIdKey]), "location"], location)
            _.set(newState, ["_embedded", entitiesKey, _.toString(entityPayload[entityIdKey]), "media-type"], mediaType)
            _.set(newState, ["_embedded", entitiesKey, _.toString(entityPayload[entityIdKey]), "payload"], entityPayload)
        }
    }
}

function processChangelog(state, changelog) {
    let newState = _.cloneDeep(state)
    const changedEntities = changelog._embedded
    for (let i = 0; i < changedEntities.length; i++) {
        const location = changedEntities[i]["location"]
        const mediaType = changedEntities[i]["media-type"]
        const entityPayload = changedEntities[i]["payload"]
        const changelogEntityMtPart = mediaType.match(utils.mediaTypePartRegex)[1]
        if (changelogEntityMtPart == mtparts.USER_MT_PART) {
            _.assign(newState, entityPayload)
        }
        const doProcessChangelogEntity = (mtPart, keyPrefix, entitiesKey) => {
            processChangelogEntity(newState,
                                   location,
                                   mediaType,
                                   entityPayload,
                                   mtPart,
                                   keyPrefix + "/deleted-at",
                                   entitiesKey,
                                   keyPrefix + "/id")
        }
        // user data
        doProcessChangelogEntity(mtparts.USER_SETTINGS_MT_PART,    "usersettings",   "usersettings")
        doProcessChangelogEntity(mtparts.SET_MT_PART,              "set",            "sets")
        doProcessChangelogEntity(mtparts.SUPERSET_MT_PART,         "superset",       "supersets")
        doProcessChangelogEntity(mtparts.CARDIO_SESSION_MT_PART,   "cardiosession",  "cardio-logs")
        doProcessChangelogEntity(mtparts.BODY_JOURNAL_LOG_MT_PART, "bodyjournallog", "body-journal-logs")
        doProcessChangelogEntity(mtparts.SORENESS_LOG_MT_PART,     "soreness",       "soreness-logs")
        // ref data
        doProcessChangelogEntity(mtparts.ORIGINATION_DEVICE_MT_PART, "originationdevice", "origination-devices")
        doProcessChangelogEntity(mtparts.BODY_SEGMENT_MT_PART,     "bodysegment",     "body-segments")
        doProcessChangelogEntity(mtparts.MUSCLE_GROUP_MT_PART,     "musclegroup",     "muscle-groups")
        doProcessChangelogEntity(mtparts.MUSCLE_MT_PART,           "muscle",          "muscles")
        doProcessChangelogEntity(mtparts.MUSCLE_ALIAS_MT_PART,     "musclealias",     "muscle-aliases")
        doProcessChangelogEntity(mtparts.MOVEMENT_MT_PART,         "movement",        "movements")
        doProcessChangelogEntity(mtparts.MOVEMENT_ALIAS_MT_PART,   "movementalias",   "movement-aliases")
        doProcessChangelogEntity(mtparts.MOVEMENT_VARIANT_MT_PART, "movementvariant", "movement-variants")
        doProcessChangelogEntity(mtparts.CARDIO_TYPE_MT_PART,      "cardiotype",      "cardio-types")
        doProcessChangelogEntity(mtparts.WALKING_PACE_MT_PART,     "walkingpace",     "walking-paces")
    }
    return newState
}

function removeDependents(newState, childrenKey, parentIdKey, parentId) {
    let children = newState._embedded[childrenKey]
    let childrenIds = _.keys(children)
    for (let i = 0; i < childrenIds.length; i++) {
        if (children[childrenIds[i]].payload[parentIdKey] == parentId) {
            _.unset(children, childrenIds[i])
        }
    }
}

function removeEntity(state, entitiesKey, entityId) {
    return removeEntry(state, ["_embedded", entitiesKey, _.toString(entityId)])
}

function removeEntry(state, path) {
    let newState = _.cloneDeep(state)
    _.unset(newState, path)
    return newState
}

export const authTokenReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.AUTH_TOKEN_RECEIVED:
        return _.isEmpty(action.authToken) ? state : { value: action.authToken }
    case actionTypes.LOGOUT_REQUEST_DONE:
    case actionTypes.BECAME_UNAUTHENTICATED:
        return { value: null }
    }
    return state;
}
