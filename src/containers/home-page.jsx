import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import _ from "lodash"
import AuthHomePage from "./authenticated-home-page.jsx"
import UnauthHomePage from "./unauthenticated-home-page.jsx"

class HomePage extends React.Component {
    render() {
        const {
            authToken,
            userUri
        } = this.props

        // if the authToken is empty but userUri is NOT empty, that means the
        // user WAS logged in, but became unauthenticated some how; and so,
        // we want to keep them on the AuthHomePage (and let the
        // ReauthenticateModal do its thing)

        if (_.isEmpty(authToken) && _.isEmpty(userUri)) {
            return <UnauthHomePage />
        } else {
            return <AuthHomePage />
        }
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
HomePage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        authToken: state.authToken.value,
        userUri: state.userUri.value
    }
}

export default connect(mapStateToProps)(HomePage)
