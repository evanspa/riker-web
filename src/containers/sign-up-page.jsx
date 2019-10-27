import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { attemptSignUp, clearErrors } from "../actions/action-creators"
import RikerHelmet from "../components/riker-helmet.jsx"
import { PanelGroup, ListGroup, ListGroupItem, Well, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import SignUpForm from "../components/sign-up-form.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import PostTrialChoices from "../components/post-trial-choices.jsx"
import RikerAccountBenefits from "../components/riker-account-benefits.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import ReactGA from "react-ga"

class SignUpPage extends React.Component {
    render() {
        const {
            handleSubmit,
            responseStatus,
            requestInProgress,
            clearErrors,
            rErrorMask
        } = this.props
        var nextSuccessPathname = urls.ROOT_URI
        return (
            <div>
                <RikerHelmet
                    title="Sign up for a Riker trial account"
                    description="Sign up for a Riker trial account and enjoy the benefits of having your data available on all your devices." />
                <RikerNavBar />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Riker Sign Up</h1>
                    <Well>
                        <SignUpForm
                            onSubmit={() => handleSubmit()}
                            requestInProgress={requestInProgress}
                            clearErrors={clearErrors}
                            rErrorMask={rErrorMask} />
                        <hr />
                        <p style={{paddingBottom: 10}}>Already have an account?  <Link to={urls.LOGIN_URI}>Log in.</Link></p>
                        <p>Having trouble?&nbsp;&nbsp;Drop us a line at: <a href={"mailto:" + utils.SUPPORT_EMAIL}>{utils.SUPPORT_EMAIL}</a></p>
                    </Well>
                    <Well>
                        <div>A Riker account is <strong>free for {utils.FREE_TRIAL_PERIOD_IN_DAYS} days.</strong></div>
                        <PanelGroup style={{marginTop: 10, marginBottom: 5}} accordion id="riker-benefits">
                            <Panel eventKey="1">
                                <Panel.Collapse onEntered={utils.makeTrackModalViewFn(urls.SIGNUP_URI, "account-benefits")} />
                                <Panel.Heading>
                                    <Panel.Title toggle>Benefits of a Riker account</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <RikerAccountBenefits containerUrl={urls.SIGNUP_URI} />
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                    </Well>
                    <Well>
                        <PanelGroup style={{marginTop: 10, marginBottom: 5}} accordion id="what-happens-after-trial">
                            <Panel style={{marginTop: 8}} eventKey="2">
                                <Panel.Collapse onEntered={utils.makeTrackModalViewFn(urls.SIGNUP_URI, "post-trial-choices")} />
                                <Panel.Heading>
                                    <Panel.Title toggle>{"What happens after the " + utils.FREE_TRIAL_PERIOD_IN_DAYS + "-day trial?"}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    After the {utils.FREE_TRIAL_PERIOD_IN_DAYS}-day trial, you'll have 2 choices for continuing with Riker:
                                    <PostTrialChoices containerUrl={urls.SIGNUP_URI} />
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                    </Well>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return state.api
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit: () => dispatch(attemptSignUp()),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
