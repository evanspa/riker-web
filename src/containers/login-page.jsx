import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import RikerHelmet from "../components/riker-helmet.jsx"
import { Breadcrumb, Col, Panel, Label, Well } from "react-bootstrap"
import LoginForm from "../components/login-form.jsx"
import { connect } from 'react-redux'
import { attemptLogin, clearErrors, attemptContinueWithFacebook } from "../actions/action-creators"
import RikerNavBar from "../components/riker-navbar.jsx"
import { makeLoginHandler } from "../utils"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import FacebookLogin from "react-facebook-login"

class LogInPage extends React.Component {
    render() {
        const {
            location,
            handleSubmit,
            responseStatus,
            requestInProgress,
            clearErrors,
            showSocialLogin
        } = this.props
        return (
            <div>
            <RikerHelmet
            title="Log into your Riker account"
            description="Log into your Riker trial account or paid subscription account." />
            <RikerNavBar />
            <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
            md={gvs.MD} mdOffset={gvs.MD_OFFSET}
            sm={gvs.SM} smOffset={gvs.SM_OFFSET}
            xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
            <h1 className="page-heading">Log in to Riker</h1>
            {(() => {
                if (showSocialLogin != null && showSocialLogin) {
                    return (
                        <div>
                            <Well>
                                <FacebookLogin
                                    appId={process.env.FACEBOOK_APP_ID}
                                    textButton="Continue with Facebook"
                                    cssClass="facebook-btn btn btn-lg unauth-home-btn"
                                    tag="button"
                                    fields="id,email"
                                    scope="public_profile"
                                    autoLoad={false}
                                    disableMobileRedirect={true}
                                    callback={response => {
                                            if (_.has(response, "id")) {
                                                this.props.handleFacebookResponse(response)
                                            }
                                    }}
                                />
                            </Well>
                            <div style={{ marginLeft: 5, marginBottom: 15}}>--- or ---</div>
                        </div>
                    )
                }
                return null
                })()}
                <Well>
                    <LoginForm
                        onSubmit={ makeLoginHandler(location, handleSubmit) }
                        requestInProgress={requestInProgress}
                        clearErrors={clearErrors}
                        responseStatus={responseStatus} />
                    <hr />
                    <p style={{paddingBottom: 10}}>Don't have an account?  <Link to={urls.SIGNUP_URI}>Start your free trial.</Link></p>
                    <p style={{paddingBottom: 10}}>Forgot your pasword? <Link to={urls.FORGOT_PASSWORD_URI}>Reset it.</Link></p>
                    <p>Having trouble?&nbsp;&nbsp;Drop us a line at: <a href={"mailto:" + utils.SUPPORT_EMAIL}>{utils.SUPPORT_EMAIL}</a></p>
                </Well>
                </Col>
            </div>
        );
            }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
LogInPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        location: state.api.location,
        responseStatus: state.api.responseStatus,
        requestInProgress: state.api.requestInProgress,
        showSocialLogin: ownProps.location.query.showSocialLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: nextSuccessPathname => dispatch(attemptLogin(nextSuccessPathname)),
        clearErrors: () => dispatch(clearErrors()),
        handleFacebookResponse: facebookResponse => dispatch(attemptContinueWithFacebook(facebookResponse, urls.HOME_URI))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage)
