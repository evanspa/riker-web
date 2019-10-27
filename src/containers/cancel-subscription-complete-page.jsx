import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import { Image, Modal, PanelGroup, Well, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import RikerNavBar from "../components/riker-navbar.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import Tappable from "react-tappable"

class CancelSubscriptionCompletePage extends React.Component {

    render() {
        const {
            navigateTo
        } = this.props
        return (
            <div>
                <RikerHelmet title="Subscripton Cancelled" />
                <RikerNavBar />
                 <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Cancel Subscription</h1>
                    <div className="breadcrumb" style={{fontSize: 12, marginBottom: 15}}>
                        <span className="signup-step">Synchronize Account&nbsp;&#8594;&nbsp;Cancel Subscription</span>&nbsp;&#8594;&nbsp;<strong>Finished</strong>
                    </div>
                    <div style={{marginTop: 25}}>
                        {(() => {
                             return (
                                 <div>
                                     <p style={{marginBottom: 15}}>Your subscription has been cancelled, and you have been logged out.</p>
                                     <p style={{marginBottom: 20}}>Your refund will process in <strong>5-10 business days</strong>.</p>
                                     <Tappable className="btn btn-primary" onTap={() => navigateTo(urls.HOME_URI)}>Home</Tappable>
                                 </div>
                             )
                         })()
                        }
                    </div>
                </Col>
            </div>
        );
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
CancelSubscriptionCompletePage.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: url => dispatch(push(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelSubscriptionCompletePage)
