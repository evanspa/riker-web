import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import { Col, Row } from "react-bootstrap"
import * as gvs from "../grid-vals"
import RikerNavBar from "../components/riker-navbar.jsx"
import Tappable from "react-tappable"
import * as urls from "../urls"
import * as utils from "../utils"
import { bannerRemindLater, maintenanceAck } from "../actions/action-creators"
import NavbarBanner from "../components/navbar-banner.jsx"
import SecurityContent from "../components/security-content.jsx"

class SecurityPage extends React.Component {
    render() {
        const { navigateTo } = this.props
        return (
            <div>
                <RikerHelmet
                    title="Riker Security Policy"
                    description="Riker's security policy." />
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
                    <SecurityContent
                        privacyUri={urls.PRIVACY_URI}
                        enableLinks={true}
                    />
                </Col>
            </div>
        )
    }
}

SecurityPage.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SecurityPage)
