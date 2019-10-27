import React from "react"
import { connect } from 'react-redux'
import { Breadcrumb, Row, Col, Panel } from "react-bootstrap"
import { Link } from "react-router"
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBarBare from "../components/riker-navbar-bare.jsx"
import ForgotPasswordForm from "../components/forgot-password-form.jsx"
import { attemptSendPasswordResetEmail,
         clearErrors } from "../actions/action-creators"
import { toastr } from 'react-redux-toastr'
import * as gvs from "../grid-vals"
import * as utils from "../utils"
import * as urls from "../urls"

class ForgotPasswordPage extends React.Component {

    render() {
        const {
            handleSubmit,
            api,
            clearErrors
        } = this.props
        const { requestInProgress, responseStatus, rErrorMask } = api
        return (
            <div>
                <RikerHelmet
                    title="Reset your Riker account password"
                    description="Forgot your Riker account password?  Enter your email and Riker can send you a link to reset your password." />
                <RikerNavBarBare />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Reset Your Riker Password</h1>
                    <div style={{marginBottom: 25}} className="lead">Submit your email address, and we'll send you a link to reset your password.</div>
                    <ForgotPasswordForm
                        onSubmit={handleSubmit}
                        requestInProgress={requestInProgress}
                        responseStatus={responseStatus}
                        clearErrors={clearErrors}
                        rErrorMask={rErrorMask} />
                    <hr />
                    <div style={{fontSize: 16}}>Having trouble?&nbsp;&nbsp;Drop us a line at: <a href={"mailto:" + utils.SUPPORT_EMAIL}>{utils.SUPPORT_EMAIL}</a></div>
                    <p style={{paddingTop: 10}}><Link to={urls.LOGIN_URI}>Log in.</Link></p>
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: () => {
            toastr.clean()
            dispatch(attemptSendPasswordResetEmail())
        },
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage)
