import React from "react"
import PropTypes from "prop-types"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router"
import { push } from 'react-router-redux'
import { ButtonToolbar,
         Button,
         DropdownButton,
         MenuItem,
         Breadcrumb,
         Panel,
         Col,
         ListGroup,
         ListGroupItem } from "react-bootstrap";
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx";
import RikerNavBar from "../components/riker-navbar.jsx"
import Records from "../components/records.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as strs from "../strings"
import { destroy } from "redux-form"
import * as forms from "../forms"
import numeral from "numeral"
import * as gvs from "../grid-vals"
import ButtonSelection from "../components/button-selection.jsx"
import { bmlTypeSelected,
         bannerRemindLater,
         changelogCountsViewed,
         attemptDownloadChangelog,
         bmlTypesMaker,
         maintenanceAck } from "../actions/action-creators"
import NavbarBanner from "../components/navbar-banner.jsx"
import moment from "moment"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import NewMovementsAddedModal from "../components/new-movements-added-modal.jsx"

class SelectBmlTypePage extends React.Component {
    render() {
        const {
            bmlTypes,
            bmlTypesSortFn,
            handleSelectBmlTypeFn,
            navigateTo
        } = this.props
        return (
            <div>
                <RikerHelmet title="Select body part" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <ChangelogResultsModal
                    changelogCounts={this.props.changelogCounts}
                    dismissChangelogReport={this.props.dismissChangelogReport} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#" onClick={() => navigateTo(urls.HOME_URI)}>body log</Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Select Body Part
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <h3 className="page-heading">What to measure?</h3>
                    <NewMovementsAddedModal
                        newMovementsAddedAt={this.props.newMovementsAddedAt}
                        newMovementsAddedAtAckAt={this.props.newMovementsAddedAtAckAt}
                        downloadChangelog={this.props.downloadChangelog}
                        requestInProgress={this.props.requestInProgress} />
                    <ButtonSelection
                        entities={bmlTypes}
                        entityIdKey="id"
                        entityDisplayKey="name"
                        entitiesSortFn={bmlTypesSortFn}
                        handleButtonClickFn={handleSelectBmlTypeFn}
                        colorizeLast={true} />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
SelectBmlTypePage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const userSettings = utils.userSettings(state)
    return {
        bmlTypes: bmlTypesMaker(userSettings),
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        changelogCounts: state.changelogCounts,
        newMovementsAddedAt: state.serverSnapshot["user/new-movements-added-at"],
        newMovementsAddedAtAckAt: state.newMovementsAddedAtAckAt.value,
        requestInProgress: state.api.requestInProgress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bmlTypesSortFn: utils.makeAscendPaylaodComparator("id", null, null),
        handleSelectBmlTypeFn: bmlType => {
            dispatch(bmlTypeSelected(bmlType.payload["id"]))
            dispatch(push(bmlType.payload["uri"]))
        },
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        downloadChangelog: () => {
            toastr.clean()
            dispatch(attemptDownloadChangelog(null))
        },
        dismissChangelogReport: () => dispatch(changelogCountsViewed()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectBmlTypePage)
