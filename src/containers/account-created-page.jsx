import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { Image, Well, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import NavbarBanner from "../components/navbar-banner.jsx"
import moment from "moment"
import Tappable from "react-tappable"
import { bannerRemindLater, maintenanceAck } from "../actions/action-creators"

class AccountCreatedPage extends React.Component {
    render() {
        const {
            userEmail
        } = this.props
        return (
            <div>
                <RikerHelmet title="Riker Account Created" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Riker Account Created</h1>
                    <Well>
                        <div style={{display: "flex", alignItems: "center"}}>
                            {/* <Image src="/images/blue-info-30x30.svg" style={{marginRight: 15}} /> */}
                            <div>Your Riker account has been created successfully!  A welcome email has been sent to you at <strong>{userEmail}</strong>.  Please click the link in your welcome email to verify your account.</div>
                        </div>
                    </Well>
                    <Well>
                        <div style={{display: "flex", alignItems: "center"}}>
                            {/* <Image src="/images/blue-info-30x30.svg" style={{marginRight: 15}} /> */}
                            <div>
                                <p>Your {utils.FREE_TRIAL_PERIOD_IN_DAYS}-day free trial has begun.  After the trial period, you can enroll in an annual subscription (<strong>${utils.COST_IN_USD} per year</strong>), or you can simply choose to use Riker on one of the phone or tablet apps anonymously.  <Link to="#">Learn more about this option</Link>.</p>
                                <p>You can enroll at anytime from the <Link to={urls.ACCOUNT_URI}>My Account</Link> page.</p>
                            </div>
                        </div>
                    </Well>
                    <Well>
                        {/* <p>Your {utils.FREE_TRIAL_PERIOD_IN_DAYS}-day free trial has begun.  After the trial period, you can enroll in an annual subscription (<strong>$11 per year</strong>), or you can simply choose to use Riker on one of the available native apps anonymously (lacks device sync <Link to="#">and other benefits</Link>).</p>
                        <p>A welcome email has been sent to you at <strong>{userEmail}</strong>.  Please click the link in your welcome email to verify your account.</p> */}
                        <p>Take a moment and <Link style={{marginTop: 5}} to={urls.SETTINGS_URI} role="primary">complete your profile.</Link></p>
                        <div style={{marginTop: 25}}>
                            <Link className="btn btn-lg btn-primary" to={urls.ROOT_URI} role="primary">Home</Link>
                        </div>
                    </Well>
                </Col>
            </div>
        );
    }
}

AccountCreatedPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userEmail: state.serverSnapshot["user/email"],
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        navigateTo: url => dispatch(push(url)),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreatedPage)
