import { combineReducers } from "redux"
import {reducer as toastrReducer} from "react-redux-toastr"
import { persistCombineReducers } from "redux-persist"
import { hardSet } from "redux-persist/lib/stateReconciler/hardSet"
import localForage from "localforage"
import {
    rikerFormReducer,
    authTokenReducer,
    apiReducer,
    allChartConfigReducer,
    serverSnapshotReducer,
    mostRecentUpdatedAtReducer,
    selectionContextReducer,
    currentCycleReducer,
    chartCacheReducer,
    changelogCountsReducer,
    bodyLiftWtExplanationAckAtReducer,
    maintenanceAckAtReducer,
    newMovementsAddedAtAckAtReducer,
    userAccountSubmitFailedReducer,
    redisplayBannerAfterReducer
} from "./reducers"
import * as actionTypes from "../actions/action-types"
import { reducer as formReducer } from "redux-form"
import _ from "lodash"
import moment from "moment"

const userUriReducer = (state = {}, action) => {
    switch (action.type) {
    case actionTypes.USER_URI_RECEIVED:
        return _.isEmpty(action.userUri) ? state : { value: action.userUri }
    case actionTypes.LOGOUT_REQUEST_DONE:
        return { value: null }
    }
    return state
}

const becameUnauthenticatedReducer = (state = false, action) => {
    switch (action.type) {
    case actionTypes.BECAME_UNAUTHENTICATED:
        return true
    case actionTypes.BECAME_REAUTHENTICATED:
    case actionTypes.LOGOUT_REQUEST_DONE:
        return false
    }
    return state
}

const passwordPromptedAndSuccessForDangerousActionAtReducer = (state = null, action) => {
    switch (action.type) {
    case actionTypes.PASSWORD_PROMPTED_AND_SUCCESS_FOR_DANGEROUS_ACTION:
        return { value: moment().valueOf() }
    case actionTypes.PASSWORD_PROMPTED_AND_SUCCESS_FOR_DANGEROUS_ACTION_VALUE_RECEIVED:
        return { value: action.passwordPromptedAndSuccessForDangerousActionAt == null ? state : action.passwordPromptedAndSuccessForDangerousActionAt }
    case actionTypes.LOGOUT_REQUEST_DONE:
        return { value: null }
    }
    return state
}

const expandedMuscleGroupReducer = (state = null, action) => {
    switch (action.type) {
    case actionTypes.MUSCLE_GROUP_EXPANDED:
        return action.muscleGroupId
    }
    return state
}

const persistConfig = {
    storage: localForage,
    key: "primary",
    blacklist: ['toastr',
                'becameUnauthenticated',
                'changelogCounts',
                'userAccountSubmitFailed',
                'expandedMuscleGroupId',
                'userAccountSubmitFailed']
}

export const rootReducer = persistCombineReducers(persistConfig, {
    toastr: toastrReducer,
    authToken: authTokenReducer,
    userUri: userUriReducer,
    becameUnauthenticated: becameUnauthenticatedReducer,
    passwordPromptedAndSuccessForDangerousActionAt: passwordPromptedAndSuccessForDangerousActionAtReducer,
    api: apiReducer,
    chartCache: chartCacheReducer,
    allChartConfig: allChartConfigReducer,
    expandedMuscleGroupId: expandedMuscleGroupReducer,
    serverSnapshot: serverSnapshotReducer,
    form: rikerFormReducer,
    mostRecentUpdatedAt: mostRecentUpdatedAtReducer,
    newMovementsAddedAtAckAt: newMovementsAddedAtAckAtReducer,
    maintenanceAckAt: maintenanceAckAtReducer,
    bodyLiftWtExplanationAckAt: bodyLiftWtExplanationAckAtReducer,
    selectionContext: selectionContextReducer,
    currentCycle: currentCycleReducer,
    changelogCounts: changelogCountsReducer,
    userAccountSubmitFailed: userAccountSubmitFailedReducer,
    redisplayBannerAfter: redisplayBannerAfterReducer
})

export default rootReducer
