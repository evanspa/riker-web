import React from "react"
import { render } from "react-dom"
import { browserHistory, hashHistory } from "react-router"
import configureStore from "./store/configure-store"
import RootPage from "./containers/root-page.jsx"
import * as utils from "./utils"
import ReactGA from "react-ga"
import { PersistGate } from "redux-persist/lib/integration/react"
import Loading from "./components/loading.jsx"
import * as acs from "./actions/action-creators"

let history
if (process.env.USE_HASH_HISTORY === 'true') {
    history = hashHistory
} else {
    history = browserHistory
}

const [store, persistor] = configureStore(history)

let prevLocation = {};
history.listenBefore(location => {
    const pathChanged = prevLocation.pathname !== location.pathname
    const hashChanged = prevLocation.hash !== location.hash
    if (pathChanged || hashChanged) {
        window.scrollTo(0, 0)
    }
    prevLocation = location
})

ReactGA.initialize(process.env.GA_TRACKING_ID, {
    debug: !utils.isProduction()
})

let height
const screenWidth = utils.screenWidth()
if (screenWidth > 1023) { // ipad pro and larger
    height = 405
} else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
    height = 400
} else if (screenWidth > 411) { // iphone 6 plus
    height = 385
} else if (screenWidth > 374) { // iphone 6
    height = 375
} else { // iphone 5 and similar
    height = 350
}

render(
    <PersistGate
        persistor={persistor}
        loading={
            <div style={{height: height, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Loading scale={0.3} />
            </div>
        }>
        <RootPage store={store} history={history} />
    </PersistGate>,
    document.getElementById("app")
)
