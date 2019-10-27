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
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx";
import RikerNavBar from "../components/riker-navbar.jsx"
import Records from "../components/records.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import { destroy } from "redux-form"
import * as forms from "../forms"
import * as strs from "../strings"
import numeral from "numeral"
import AddRecordButton from "../components/add-record-button.jsx"
import ButtonSelection from "../components/button-selection.jsx"
import * as gvs from "../grid-vals"
import { muscleGroupSelected,
         bannerRemindLater,
         changelogCountsViewed,
         makeOnMovementSuggestionSelectedFn,
         maintenanceAck,
         attemptDownloadChangelog } from "../actions/action-creators"
import { toastr } from 'react-redux-toastr'
import ReactGA from "react-ga"
import NavbarBanner from "../components/navbar-banner.jsx"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import NewMovementsAddedModal from "../components/new-movements-added-modal.jsx"
import Autosuggest from "react-autosuggest"

class SelectMuscleGroupPage extends React.Component {

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
            muscleGroups,
            selectedBodySegment,
            bodySegments,
            muscleGroupsSortFn,
            handleSelectMgFn,
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
                <RikerHelmet title="Select Muscle Group" />
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
                                    action: "search movements from muscle groups"
                                })
                                onMovementSuggestionSelectedFn(suggestion, movementVariants)
                            }}
                        inputProps={movementSearchInputProps} />
                    <Breadcrumb style={{marginTop: 20}}>
                        <Breadcrumb.Item href="#" onClick={() => navigateTo(urls.HOME_URI)}>{strs.repsTopLevelBreadcrumbLabel}</Breadcrumb.Item>
                        <LinkContainer to={{pathname: urls.SELECT_BODY_SEGMENT_URI}}>
                            <Breadcrumb.Item>
                                {selectedBodySegment.payload["bodysegment/name"]}
                            </Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item active>
                            Select Muscle Group
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <h3 className="page-heading">Select muscle group</h3>
                    <NewMovementsAddedModal
                        newMovementsAddedAt={this.props.newMovementsAddedAt}
                        newMovementsAddedAtAckAt={this.props.newMovementsAddedAtAckAt}
                        downloadChangelog={this.props.downloadChangelog}
                        requestInProgress={this.props.requestInProgress} />
                    <ButtonSelection
                        entities={muscleGroups}
                        entityIdKey="musclegroup/id"
                        entityDisplayKey="musclegroup/name"
                        entitiesSortFn={muscleGroupsSortFn}
                        handleButtonClickFn={handleSelectMgFn} />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
SelectMuscleGroupPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        selectedBodySegment: state.serverSnapshot._embedded["body-segments"][state.selectionContext.selectedBodySegmentId],
        muscleGroups: utils.childrenEntities(state,
                                             "selectedBodySegmentId",
                                             "muscle-groups",
                                             "musclegroup/body-segment-id"),
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
        muscleGroupsSortFn: utils.makeAscendPaylaodComparator("musclegroup/name", null, null),
        handleSelectMgFn: (mg) => {
            dispatch(muscleGroupSelected(mg.payload["musclegroup/id"]))
            dispatch(push(urls.SELECT_MOVEMENT_URI))
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectMuscleGroupPage)
