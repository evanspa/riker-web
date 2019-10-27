import React from "react"
import PropTypes from "prop-types"
import ReactDOM from "react-dom"
import RikerHelmet from "../components/riker-helmet.jsx"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Image, Col, Well, PanelGroup, Panel } from "react-bootstrap"
import * as gvs from "../grid-vals"
import * as utils from "../utils"
import * as urls from "../urls"
import RikerNavBar from "../components/riker-navbar.jsx"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import RikerAccountBenefits from "../components/riker-account-benefits.jsx"
import PostTrialChoices from "../components/post-trial-choices.jsx"
import Tappable from "react-tappable"

class PricingPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { screenWidth: 0 }
    }

    componentDidMount() {
        this.setState({ screenWidth: utils.screenWidth() })
    }

    render() {
        const { navigateTo } = this.props
        const screenWidth = this.state.screenWidth
        return (
            <div>
                <RikerHelmet
                    title="Riker Pricing"
                    description="A Riker paid subscription account is very affordable with a simple pricing plan." />
                <RikerNavBar />
                <Col lg={6} lgOffset={3}
                     md={8} mdOffset={2}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Pricing</h1>
                    <Well>
                        The cost of a Riker account is <strong>${utils.COST_IN_USD} per year</strong>.
                    </Well>
                    <Well>
                        <p>Try out a Riker account <strong>free for {utils.FREE_TRIAL_PERIOD_IN_DAYS} days.</strong></p>
                        <PanelGroup style={{marginTop: 10, marginBottom: 5}} accordion id="riker-account-benefits">
                            <Panel eventKey="1">
                                <Panel.Collapse onEntered={utils.makeTrackModalViewFn(urls.PRICING_URI, "account-benefits")} />
                                <Panel.Heading>
                                    <Panel.Title toggle>Benefits of a Riker account</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <RikerAccountBenefits containerUrl={urls.PRICING_URI} />
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                        <PanelGroup style={{marginTop: 15}} accordion id="what-happens-after-trial">
                            <Panel style={{marginTop: 8}} eventKey="2">
                                <Panel.Collapse onEntered={utils.makeTrackModalViewFn(urls.PRICING_URI, "post-trial-choices")} />
                                <Panel.Heading>
                                    <Panel.Title toggle>{"What happens after the " + utils.FREE_TRIAL_PERIOD_IN_DAYS + "-day trial?"}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    After the {utils.FREE_TRIAL_PERIOD_IN_DAYS}-day trial, you'll have 2 choices for continuing with Riker:
                                    <PostTrialChoices containerUrl={urls.PRICING_URI} />
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                        <Tappable
                            style={{marginTop: 10}}
                            className="btn btn-lg btn-primary"
                            onTap={() => navigateTo(urls.SIGNUP_URI)}>Trial Account Sign-up</Tappable>
                    </Well>
                </Col>
            </div>
        )
    }
}

PricingPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: url => dispatch(push(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingPage)
