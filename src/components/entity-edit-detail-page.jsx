import React from "react"
import { Breadcrumb, Row, Col } from "react-bootstrap"
import SmallModal from "./small-modal.jsx"
import { Link } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import _ from "lodash"
import RikerHelmet from "./riker-helmet.jsx"
import RikerNavBar from "./riker-navbar.jsx"
import * as gvs from "../grid-vals"
import * as urls from "../urls"
import * as utils from "../utils"
import ChangelogResultsModal from "./changelog-results-modal.jsx"
import ConflictModal from "./conflict-modal.jsx"
import NavbarBanner from "./navbar-banner.jsx"

export default class EntityDetailPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showEntityGoneModal: false,
            entityGoneModalTitle: props.entityGoneModalTitle,
            entityGoneModalContent: props.entityGoneModalContent
        }
    }

    componentWillReceiveProps(nextProps) {
        const { entity } = nextProps
        if (entity == null) {
            this.setState({showEntityGoneModal: true})
        }
    }

    render() {
        const {
            entity,
            entityType,
            entitiesUri,
            reauthenticateModal,
            entityFormFn,
            editMode,
            suppressBreadcrumbs,
            breadcrumbParentUri,
            breadcrumbParentLabel,
            breadcrumbActiveLabelFn,
            userAcknowledgedNotFound,
            doGoBack,
            changelogCounts,
            dismissChangelogReport,
            isConflict,
            conflictAckFn,
            conflictMessagePrefix,
            conflictMessageSuffix,
            downloadChangelogFn,
            responseStatus,
            redisplayBannerAfter,
            remindMeLaterFn,
            accountStatuses,
            navigateTo
        } = this.props
        if (entity == null && !this.state.showEntityGoneModal) {
            // user got here because of deep history stack, and previously
            // got the 'gone' model, but found themselves here through 'back'
            // button presses
            doGoBack()
            return null
        }
        const capitalizedEntityType = entityType.toTitleCase()
        let pageTitle
        let heading
        if (editMode) {
            pageTitle = "Edit " + capitalizedEntityType
            heading = pageTitle
        } else {
            pageTitle = capitalizedEntityType + " Details"
            heading = capitalizedEntityType + " Details"
        }
        const breadcrumbsFn = () => (
            <Breadcrumb>
                {
                    (() => {
                        if (breadcrumbParentUri != null) {
                            return (
                                [
                                    <LinkContainer key={0} to={{pathname: urls.RECORDS_URI}}>
                                        <Breadcrumb.Item>
                                            Records
                                        </Breadcrumb.Item>
                                    </LinkContainer>,
                                    <LinkContainer key={1} to={{pathname: breadcrumbParentUri}}>
                                        <Breadcrumb.Item>
                                            { breadcrumbParentLabel }
                                        </Breadcrumb.Item>
                                    </LinkContainer>
                                ]
                            )
                        } else {
                            return ""
                        }
                    })()
                }
                <Breadcrumb.Item active>{breadcrumbActiveLabelFn(entity)}</Breadcrumb.Item>
            </Breadcrumb>
        )
        return (
            <div>
                <RikerHelmet title={pageTitle} />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(accountStatuses, redisplayBannerAfter)} />
                <NavbarBanner
                    onAccountPage={this.props.navbarBannerOnAccountPage}
                    navigateTo={navigateTo}
                    remindMeLaterFn={remindMeLaterFn}
                    redisplayBannerAfter={redisplayBannerAfter}
                    accountStatuses={accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                {reauthenticateModal}
                <ChangelogResultsModal
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={dismissChangelogReport} />
                <ConflictModal isConflict={isConflict}
                               conflictAckFn={conflictAckFn}
                               downloadChangelogFn={downloadChangelogFn}
                               deleteAttempt={!editMode}
                               messagePrefix={conflictMessagePrefix}
                               messageSuffix={conflictMessageSuffix} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    { (() => {
                          if (entity != null && breadcrumbActiveLabelFn != null) {
                              return breadcrumbsFn()
                          }
                          return null
                    })()
                    }
                    <h3 className="page-heading">{heading}</h3>
                    <SmallModal
                        show={this.state.showEntityGoneModal}
                        buttonTitle="Okay"
                        imageName={editMode ? "yellow-exclamation-30x30.svg" : "blue-info-30x30.svg"}
                        onHide={() => {
                                this.setState({ showEntityGoneModal: false })
                                userAcknowledgedNotFound()
                            }}
                        title={this.state.entityGoneModalTitle}
                        content={this.state.entityGoneModalContent} />
                    {(() => {
                         if (entity != null) {
                             return entityFormFn()
                         }
                         return null
                     })()
                    }
                </Col>
            </div>
        )
    }
}
