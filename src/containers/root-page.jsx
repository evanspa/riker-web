import "intl"
import "intl/locale-data/jsonp/en.js"
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect, Provider } from "react-redux"
import { Router, applyRouterMiddleware } from "react-router"
import {IntlProvider} from 'react-intl'
import createRoutes from "../routes.jsx"
import ReduxToastr from 'react-redux-toastr'
import ReactGA from "react-ga"
import { useScroll } from "react-router-scroll"

function logPageView() {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}

class RootPage extends Component {

    render() {
        const { store, history } = this.props
        return (
            <Provider store={store}>
                <IntlProvider locale="en">
                    <div>
                        <Router history={history}
                                render={applyRouterMiddleware(useScroll())}
                                routes={createRoutes(store, false)}
                                onUpdate={logPageView} />
                        <ReduxToastr position="top-left" />
                    </div>
                </IntlProvider>
            </Provider>
        )
    }
}

RootPage.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RootPage)
