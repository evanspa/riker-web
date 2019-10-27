import React from "react"
import PropTypes from "prop-types"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router"
import { push } from "react-router-redux"
import { ButtonToolbar,
         Well,
         Button,
         DropdownButton,
         MenuItem,
         Breadcrumb,
         Panel,
         Col,
         ListGroup,
         ListGroupItem } from "react-bootstrap"
import { connect } from "react-redux"
import { toastr } from "react-redux-toastr"
import RikerHelmet from "../components/riker-helmet.jsx"
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
import { movementVariantSelected,
         bannerRemindLater,
         changelogCountsViewed,
         maintenanceAck,
         makeOnMovementSuggestionSelectedFn,
         attemptDownloadChangelog } from "../actions/action-creators"
import NavbarBanner from "../components/navbar-banner.jsx"
import moment from "moment"
import ReactGA from "react-ga"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import NewMovementsAddedModal from "../components/new-movements-added-modal.jsx"
import Autosuggest from "react-autosuggest"

class SelectMovementOptionPage extends React.Component {

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
            selectedBodySegment,
            selectedMuscleGroup,
            selectedMovement,
            handleSelectMovementVariantFn,
            movementVariants,
            movementVariantsSortFn,
            navigateTo,
            onMovementSuggestionSelectedFn
        } = this.props
        const { movementSearchText, movementSuggestions } = this.state
        const movementSearchInputProps = {
            placeholder: "search all movements",
            value: movementSearchText,
            onChange: this.movementSearchOnChange
        }
        const breadcrumbs = (
            <Breadcrumb style={{marginTop: 20}}>
                <Breadcrumb.Item href="#" onClick={() => navigateTo(urls.HOME_URI)}>{strs.repsTopLevelBreadcrumbLabel}</Breadcrumb.Item>
                {(() => {
                     const links = []
                     if (selectedBodySegment) {
                         links.push(
                             <LinkContainer key={0} to={{pathname: urls.SELECT_BODY_SEGMENT_URI}}>
                                 <Breadcrumb.Item>{selectedBodySegment.payload["bodysegment/name"]}</Breadcrumb.Item>
                             </LinkContainer>
                         )
                     }
                     if (selectedMuscleGroup) {
                         links.push(
                             <LinkContainer key={1} to={{pathname: urls.SELECT_MUSCLE_GROUP_URI}}>
                                 <Breadcrumb.Item>{selectedMuscleGroup.payload["musclegroup/name"]}</Breadcrumb.Item>
                             </LinkContainer>
                         )
                     }
                     links.push(
                         <LinkContainer key={2} to={{pathname: urls.SELECT_MOVEMENT_URI}}>
                             <Breadcrumb.Item>{selectedMovement.payload["movement/canonical-name"]}</Breadcrumb.Item>
                         </LinkContainer>
                     )
                     return links
                 })()
                }
                <Breadcrumb.Item active>
                    Select Variant
                </Breadcrumb.Item>
            </Breadcrumb>
        )
        return (
            <div>
                <RikerHelmet title="Select Movement Variant" />
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
                                    action: "search movements from variants"
                                })
                                onMovementSuggestionSelectedFn(suggestion, movementVariants)
                            }}
                        inputProps={movementSearchInputProps} />
                    { breadcrumbs }
                    <h3 className="page-heading">Select movement variant</h3>
                    <NewMovementsAddedModal
                        newMovementsAddedAt={this.props.newMovementsAddedAt}
                        newMovementsAddedAtAckAt={this.props.newMovementsAddedAtAckAt}
                        downloadChangelog={this.props.downloadChangelog}
                        requestInProgress={this.props.requestInProgress} />
                    <ButtonSelection
                        entities={movementVariants}
                        entityIdKey="movementvariant/id"
                        entityDisplayKey="movementvariant/name"
                        entitiesSortFn={movementVariantsSortFn}
                        handleButtonClickFn={handleSelectMovementVariantFn} />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
SelectMovementOptionPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const selectedMovement = state.serverSnapshot._embedded["movements"][state.selectionContext.selectedMovementId]
    return {
        selectedBodySegment: state.serverSnapshot._embedded["body-segments"][state.selectionContext.selectedBodySegmentId],
        selectedMuscleGroup: state.serverSnapshot._embedded["muscle-groups"][state.selectionContext.selectedMuscleGroupId],
        selectedMovement: selectedMovement,
        movementVariants: utils.movementVariantItems(selectedMovement, _.values(state.serverSnapshot._embedded["movement-variants"])),
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        changelogCounts: state.changelogCounts,
        newMovementsAddedAt: state.serverSnapshot["user/new-movements-added-at"],
        newMovementsAddedAtAckAt: state.newMovementsAddedAtAckAt.value,
        requestInProgress: state.api.requestInProgress,
        movementsArray: _.values(state.serverSnapshot._embedded["movements"])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: url => { dispatch(push(url)) },
        movementVariantsSortFn: utils.makeAscendPaylaodComparator("movementvariant/name", null, null),
        handleSelectMovementVariantFn: (movementVariant) => {
            dispatch(movementVariantSelected(movementVariant.payload["movementvariant/id"]))
            dispatch(push(urls.ENTER_REPS_URI))
        },
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectMovementOptionPage)
