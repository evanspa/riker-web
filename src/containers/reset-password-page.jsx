import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import RikerHelmet from "../components/riker-helmet.jsx"
import { Breadcrumb, Col, Panel, Label } from "react-bootstrap"
import ResetPasswordForm from "../components/reset-password-form.jsx"
import { connect } from 'react-redux'
import { attemptResetPassword, clearErrors } from "../actions/action-creators"
import RikerNavBarBare from "../components/riker-navbar-bare.jsx"
import { makeLoginHandler } from "../utils"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

class ResetPasswordPage extends React.Component {
    render() {
        const {
            location,
            handleSubmit,
            api,
            clearErrors
        } = this.props
        const { responseStatus, requestInProgress, rErrorMask } = api
        const { email, resetToken } = this.props.params
        return (
            <div>
                <RikerHelmet title="Password Reset" />
                <RikerNavBarBare />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Password Reset</h1>
                    <ResetPasswordForm
                        onSubmit={() => handleSubmit(email, resetToken) }
                        requestInProgress={requestInProgress}
                        clearErrors={clearErrors}
                        rErrorMask={rErrorMask}
                        responseStatus={responseStatus} />
                    <hr />
                    <p style={{fontSize: 20}}>Not working? <Link to={urls.FORGOT_PASSWORD_URI}>Click here to get a new password-reset link.</Link></p>
                </Col>
            </div>
        );
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
ResetPasswordPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: (email, resetToken) => {
            dispatch(attemptResetPassword(email, resetToken))
        },
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)
