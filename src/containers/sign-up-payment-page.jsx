import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { attemptSignUp, clearErrors } from "../actions/action-creators"
import RikerHelmet from "../components/riker-helmet.jsx"
import { Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import SignUpForm from "../components/sign-up-form.jsx"
import RikerNavBarBare from "../components/riker-navbar-bare.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"
import StripeCheckout from 'react-stripe-checkout'
import Tappable from "react-tappable"

class SignUpPaymentPage extends React.Component {

    onToken = (token) => {
        console.log("token: " + JSON.stringify(token))
    }

    render() {
        const {
            handleSubmit,
            responseStatus,
            requestInProgress,
            clearErrors,
            userEmail,
            rErrorMask
        } = this.props
        var nextSuccessPathname = urls.ROOT_URI
        return (
            <div>
                <RikerHelmet title="Payment" />
                <RikerNavBarBare />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Riker Sign Up</h1>
                    <div className="breadcrumb" style={{fontSize: 12, marginBottom: 15}}>
                        <span className="signup-step">create account&nbsp;&#8594;&nbsp;</span><strong>payment method</strong><span className="signup-step">&nbsp;&#8594;&nbsp;confirm</span>
                    </div>
                    <StripeCheckout
                        name="Riker"
                        description="Riker Sign Up"
                        ComponentClass="div"
                        amount={process.env.RIKER_SUBSCRIPTION_IN_CENTS}
                        allowRememberMe={false}
                        token={this.onToken}
                        stripeKey={process.env.STRIPE_KEY}
                        email={userEmail}
                        billingAddress={true}
                        zipCode={true}>
                        <Tappable component="button" className="btn btn-lg btn-success">Enter Payment Information</Tappable>
                    </StripeCheckout>
                </Col>
            </div>
        );
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
SignUpPaymentPage.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        responseStatus: state.api.responseStatus,
        requestInProgress: state.api.requestInProgress,
        rErrorMask: state.api.rErrorMask,
        userEmail: state.serverSnapshot["user/email"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: () => { dispatch(attemptSignUp()) },
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPaymentPage)
