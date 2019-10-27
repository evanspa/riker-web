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
import { bannerRemindLater,
         maintenanceAck } from "../actions/action-creators"
import NavbarBanner from "../components/navbar-banner.jsx"

class UpdatePaymentMethodCompletePage extends React.Component {

    render() {
        const {
            navigateTo
        } = this.props
        return (
            <div>
                <RikerHelmet title="Payment Update Successful" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    suppressBanner={true}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Update Payment Method</h1>
                    <div className="breadcrumb" style={{fontSize: 12, marginBottom: 15}}>
                        <span className="signup-step">Synchronize Account&nbsp;&#8594;&nbsp;Update Payment Method</span>&nbsp;&#8594;&nbsp;<strong>Finished</strong>
                    </div>
                    <p>Your payment method has been updated.</p>
                    <div style={{marginTop: 25}}>
                        <Tappable style={{marginRight: 10}} className="btn btn-primary" onTap={() => navigateTo(urls.ACCOUNT_URI)}>My Account</Tappable>
                        <Tappable className="btn btn-primary" onTap={() => navigateTo(urls.HOME_URI)}>Home</Tappable>
                    </div>
                </Col>
            </div>
        );
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
UpdatePaymentMethodCompletePage.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePaymentMethodCompletePage)
