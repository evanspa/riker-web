import express from "express"
import cookieParser from "cookie-parser"
import React from "react"
import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { renderToString } from "react-dom/server"
import { match, RouterContext } from "react-router"
import rootReducer from "./reducers/index"
import thunk from 'redux-thunk'
import Helmet from "react-helmet"
import { initialState } from "./store/configure-store"
import createRoutes from "./routes.jsx"
import { IntlProvider } from 'react-intl'
import ReduxToastr from 'react-redux-toastr'
import _ from "lodash"
import { R_AUTH_TOKEN_HEADER } from "./actions/api-utils"

const PORT_NUMBER = 3004

const app = express()
app.use(cookieParser())
app.set("views", "./dist/server")
app.set("view engine", "ejs")
app.get("*", (req, res) => {
    const store = compose(
        applyMiddleware(thunk, routerMiddleware(browserHistory))
    )(createStore)(
        rootReducer,
        initialState(req.cookies[R_AUTH_TOKEN_HEADER])
    )
    const routes = createRoutes(store, true)
    match({ routes, location: req.url }, (err, redirectLocation, props) => {
        if (err) {
            // something went badly wrong, so 500 with a message
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            // we matched a ReactRouter redirect, so redirect from the server
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (props) {
            const initialView = (
                <Provider store={store}>
                    <IntlProvider locale="en">
                        <div>
                            <RouterContext {...props} />
                            <ReduxToastr position="top-left" />
                        </div>
                    </IntlProvider>
                </Provider>
            )
            const renderedAppBody = renderToString(initialView)
            let head = Helmet.rewind()

            // render `index.ejs`, but pass in the markup we want it to display
            res.render("index", { appBody: renderedAppBody,
                                  headTitle: head.title,
                                  headMeta: head.meta })
        } else {
            // no route match, so 404. In a real app you might render a custom
            // 404 view here
            res.sendStatus(404)
        }
    })
})

app.listen(PORT_NUMBER, "localhost", function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log("Listening at http://localhost:" + PORT_NUMBER)
})
