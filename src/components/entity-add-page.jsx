import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Breadcrumb, Col } from "react-bootstrap"
import RikerHelmet from "./riker-helmet.jsx"
import RikerNavBar from "./riker-navbar.jsx"
import * as gvs from "../grid-vals"
import * as urls from "../urls"
import * as utils from "../utils"
import NavbarBanner from "./navbar-banner.jsx"

export default class EntityAddPage extends React.Component {
    render() {
        const {
            entityType,
            entityForm,
            reauthenticateModal,
            breadcrumbParentUri,
            breadcrumbParentLabel,
            breadcrumbActiveLabel
        } = this.props
        const titleCasedEntityType = entityType.toTitleCase()
        return (
            <div>
                <RikerHelmet title={"Add " + titleCasedEntityType} />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                {reauthenticateModal}
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Breadcrumb>
                        <LinkContainer to={{pathname: urls.RECORDS_URI}}>
                            <Breadcrumb.Item>
                                Records
                            </Breadcrumb.Item>
                        </LinkContainer>
                        <LinkContainer to={{pathname: breadcrumbParentUri}}>
                            <Breadcrumb.Item>
                                { breadcrumbParentLabel }
                            </Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item active>
                            {breadcrumbActiveLabel}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <h4 style={{paddingBottom: 5}}>{"Add " + titleCasedEntityType}</h4>
                    {entityForm}
                </Col>
            </div>
        )
    }
}
