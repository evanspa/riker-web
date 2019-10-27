import { createStore, applyMiddleware, compose } from "redux"
import { LOCATION_CHANGE, routerMiddleware } from "react-router-redux"
import * as actionTypes from "../actions/action-types"
import thunk from "redux-thunk"
import rootReducer from "../reducers/index"
import { initialServerSnapshotState,
         initialApiState } from "../reducers/reducers"
import { persistStore } from "redux-persist"
import logger from "redux-logger"

// called by configureStore function below (which is only called client-side), and is called
// from riker-server.js where authToken is sourced from the r-auth-token cookie.
export const initialState = authToken => {
    // scalar values that are intended to be persisted must be wrapped as
    // an object (because redux-persist assumes persisted-keys are objects, because
    // it insert some of its own, private config-data).
    return {
        authToken: { value: authToken },
        userUri: { value: null },
        api: initialApiState,
        serverSnapshot: initialServerSnapshotState,
        selectionContext: {},
        currentCycle: {},
        chartCache: {},
        allChartConfig: {},
        mostRecentUpdatedAt: { value: null },
        becameUnauthenticated: false,
        passwordPromptedAndSuccessForDangerousActionAt: { value: null },
        expandedMuscleGroupId: null,
        newMovementsAddedAtAckAt: { value: null },
        maintenanceAckAt: { value: null },
        bodyLiftWtExplanationAckAt: { value: null },
        changelogCounts: {},
        userAccountSubmitFailed: false,
        redisplayBannerAfter: { value: null }
    }
}

// This function only gets called client-side (from client-render.js).  The above function,
// initialState, gets called from this function, as well as from riker-server.js
export default function configureStore(history) {
    const store = compose(
        applyMiddleware(thunk, routerMiddleware(history), logger),
        //applyMiddleware(thunk, routerMiddleware(history)),
        //typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )(createStore)(
        rootReducer,
        initialState(null)
    )
    const persistor = persistStore(store)
    return [store, persistor]
}
