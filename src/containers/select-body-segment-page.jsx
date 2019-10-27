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
         ListGroupItem } from "react-bootstrap"
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import Records from "../components/records.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as strs from "../strings"
import { destroy } from "redux-form"
import * as forms from "../forms"
import numeral from "numeral"
import AddRecordButton from "../components/add-record-button.jsx"
import * as gvs from "../grid-vals"
import ButtonSelection from "../components/button-selection.jsx"
import { bodySegmentSelected,
         bannerRemindLater,
         changelogCountsViewed,
         attemptDownloadChangelog,
         makeOnMovementSuggestionSelectedFn,
         maintenanceAck } from "../actions/action-creators"
import NavbarBanner from "../components/navbar-banner.jsx"
import moment from "moment"
import Tappable from "react-tappable"
import ReactGA from "react-ga"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import NewMovementsAddedModal from "../components/new-movements-added-modal.jsx"
import Autosuggest from "react-autosuggest"

class SelectBodySegmentPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            movementSuggestions: [],
            movementSearchText: ""
        }
    }

    movementSearchOnChange = (event, { newValue, method }) => {
        this.setState({movementSearchText: newValue})
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            movementSuggestions: utils.computeMovementSuggestions(value, this.props.movementsArray)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({ movementSuggestions: [] })
    }

    render() {
        const {
            bodySegments,
            bodySegmentsSortFn,
            handleSelectBodySegmentFn,
            navigateTo,
            onMovementSuggestionSelectedFn,
            movementVariants
        } = this.props
        const { movementSearchText, movementSuggestions } = this.state
        const movementSearchInputProps = {
            placeholder: "search all movements",
            value: movementSearchText,
            onChange: this.movementSearchOnChange
        }
        return (
            <div>
                <RikerHelmet title="Select Body Segment" />
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
                    <Autosuggest
                        suggestions={movementSuggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={movement => movement.payload["movement/canonical-name"]}
                        renderSuggestion={(movement, {query}) => utils.renderMovementAsSuggestion(movement)}
                        onSuggestionSelected={(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
                                ReactGA.event({
                                    category: utils.GA_EVENT_CATEGORY_USER,
                                    action: "search movements from body segments"
                                })
                                onMovementSuggestionSelectedFn(suggestion, movementVariants)
                            }}
                        inputProps={movementSearchInputProps} />
                    <Breadcrumb style={{marginTop: 20}}>
                        <Breadcrumb.Item href="#" onClick={() => navigateTo(urls.HOME_URI)}>{strs.repsTopLevelBreadcrumbLabel}</Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Select Body Segment
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <h3 className="page-heading">Select body segment</h3>
                    <NewMovementsAddedModal
                        newMovementsAddedAt={this.props.newMovementsAddedAt}
                        newMovementsAddedAtAckAt={this.props.newMovementsAddedAtAckAt}
                        downloadChangelog={this.props.downloadChangelog}
                        requestInProgress={this.props.requestInProgress} />
                    <ButtonSelection
                        entities={bodySegments}
                        entityIdKey="bodysegment/id"
                        entityDisplayKey="bodysegment/name"
                        entitiesSortFn={bodySegmentsSortFn}
                        handleButtonClickFn={handleSelectBodySegmentFn} />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
SelectBodySegmentPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        bodySegments: state.serverSnapshot._embedded["body-segments"],
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        changelogCounts: state.changelogCounts,
        newMovementsAddedAt: state.serverSnapshot["user/new-movements-added-at"],
        newMovementsAddedAtAckAt: state.newMovementsAddedAtAckAt.value,
        requestInProgress: state.api.requestInProgress,
        movementsArray: _.values(state.serverSnapshot._embedded["movements"]),
        movementVariants: state.serverSnapshot._embedded["movement-variants"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bodySegmentsSortFn: utils.makeDescendPaylaodComparator("bodysegment/name", null, null),
        handleSelectBodySegmentFn: (bodySegment) => {
            dispatch(bodySegmentSelected(bodySegment.payload["bodysegment/id"]))
            dispatch(push(urls.SELECT_MUSCLE_GROUP_URI))
        },
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        downloadChangelog: () => {
            toastr.clean()
            dispatch(attemptDownloadChangelog(null))
        },
        dismissChangelogReport: () => dispatch(changelogCountsViewed()),
        maintenanceAckFn: () => dispatch(maintenanceAck()),
        onMovementSuggestionSelectedFn: makeOnMovementSuggestionSelectedFn(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectBodySegmentPage)
