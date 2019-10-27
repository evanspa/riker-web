import React from "react"
import PropTypes from "prop-types"
import { Breadcrumb, Well, Col, Panel, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { push } from "react-router-redux"
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import _ from "lodash"
import * as utils from "../utils"
import * as urls from "../urls"
import * as gvs from "../grid-vals"
import { bannerRemindLater, maintenanceAck } from "../actions/action-creators"
import NavbarBanner from "../components/navbar-banner.jsx"

class SupportPage extends React.Component {
    render() {
        return (
            <div>
                <RikerHelmet
                    title="Riker Support"
                    description="Having a problem and need some help?  Drop us a line via our support email address." />
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
                    <h3 className="page-heading">Support</h3>
                    <Well>
                        <div>Have a question or need some help?  Drop us a line at: <a href={"mailto:" + utils.SUPPORT_EMAIL}>{utils.SUPPORT_EMAIL}</a></div>
                    </Well>
                </Col>
            </div>
        );
    }
}

SupportPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportPage)
