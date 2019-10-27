import React from "react"
import PropTypes from "prop-types"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router"
import { push } from 'react-router-redux'
import { Button, Breadcrumb, Col } from "react-bootstrap"
import { connect } from 'react-redux'
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import EnterRepsForm from "../components/enter-reps-form.jsx"
import Records from "../components/records.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as strs from "../strings"
import { destroy } from "redux-form"
import * as forms from "../forms"
import { toastr } from 'react-redux-toastr'
import numeral from "numeral"
import AddRecordButton from "../components/add-record-button.jsx"
import ButtonSelection from "../components/button-selection.jsx"
import * as gvs from "../grid-vals"
import { clearErrors,
         attemptSaveNewSet,
         bodyLiftWtExplanationAck,
         bannerRemindLater,
         maintenanceAck } from "../actions/action-creators"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import NavbarBanner from "../components/navbar-banner.jsx"
import ReactGA from "react-ga"

class EnterRepsPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            hideNavBar: false
        }
    }

    render() {
        const {
            navigateTo,
            selectedBodySegment,
            selectedMuscleGroup,
            selectedMovement,
            selectedMovementVariant,
            currentRepCount,
            currentWeight,
            movements,
            movementsSortFn,
            handleSelectMovementFn,
            responseStatus,
            requestInProgress,
            repIncrementFn,
            repDecrementFn,
            weightIncrementFn,
            weightDecrementFn,
            currentCycle,
            handleSubmit,
            becameUnauthenticated,
            changeUnitsClickedFn,
            hideUnitsClickedFn,
            moreButtonClickedFn,
            lessButtonClickedFn,
            userSettings,
            setOnClick,
            nearestBodyMeasurement,
            bodyLiftWtExplanationAckAt,
            bodyLiftWtExplanationAckFn,
            clearErrors
        } = this.props
        const weightIncDecAmount = userSettings.payload["usersettings/weight-inc-dec-amount"]
        momentLocalizer(moment)
        let weightVal = null
        if (selectedMovement.payload["movement/is-body-lift"] || (selectedMovementVariant != null && selectedMovementVariant.payload["movementvariant/id"] == utils.BODY_MOVEMENT_VARIANT_ID)) {
            if (nearestBodyMeasurement != null) {
                let multiplier = 1.0
                if (selectedMovement.payload["movement/percentage-of-body-weight"] != null) {
                    multiplier = selectedMovement.payload["movement/percentage-of-body-weight"]
                }
                weightVal = _.round(utils.weightValue(nearestBodyMeasurement.payload["bodyjournallog/body-weight"],
                                                      nearestBodyMeasurement.payload["bodyjournallog/body-weight-uom"],
                                                      userSettings.payload["usersettings/weight-uom"]) * multiplier);
            }
        }
        return (
            <div>
                <RikerHelmet title="Enter Reps" />
                {(() => {
                     if (this.state.hideNavBar) {
                         return (
                             <Col xs={12} className="showNavBarLink">
                                 <NavbarBanner
                                     navigateTo={navigateTo}
                                     remindMeLaterFn={this.props.remindMeLaterFn}
                                     redisplayBannerAfter={this.props.redisplayBannerAfter}
                                     accountStatuses={this.props.accountStatuses}
                                     maintenanceAckFn={this.props.maintenanceAckFn} />
                                 <a className="pull-right" href="#" onClick={(e) => {e.preventDefault(); this.setState({hideNavBar: false});}}>[ show Riker navigation bar ]</a>
                             </Col>
                         )
                     } else {
                         return (
                             <div>
                                 <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                                 <NavbarBanner
                                     navigateTo={navigateTo}
                                     remindMeLaterFn={this.props.remindMeLaterFn}
                                     redisplayBannerAfter={this.props.redisplayBannerAfter}
                                     accountStatuses={this.props.accountStatuses}
                                     maintenanceAckFn={this.props.maintenanceAckFn} />
                                 {/* <div className="showNavBarLink"><a href="#"
                                     onClick={(e) => {e.preventDefault(); this.setState({hideNavBar: true});}}>[ hide navigation bar ]</a></div> */}
                             </div>
                         )
                     }
                     return null
                })()
                }
                <ReauthenticateModal
                    showModal={becameUnauthenticated}
                    message="To save your set, we need you to re-authenticate."
                    operationOnLightLoginSuccess={() => handleSubmit()} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Breadcrumb>
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
                             if (selectedMovementVariant != null) {
                                 links.push(
                                     <LinkContainer key={3} to={{pathname: urls.SELECT_MOVEMENT_OPTION_URI}}>
                                         <Breadcrumb.Item>{selectedMovementVariant.payload["movementvariant/name"]}</Breadcrumb.Item>
                                     </LinkContainer>
                                 )
                             }
                             return links
                        })()
                        }
                        <Breadcrumb.Item active>Reps</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4><Link to={urls.MOVEMENT_INFO_URI + "?movementId=" + selectedMovement.payload["movement/id"]}>{selectedMovement.payload["movement/canonical-name"] + (selectedMovementVariant != null ? " - " + (selectedMovementVariant.payload["movementvariant/name"]) : "")}</Link></h4>
                    <div style={{marginBottom: 15}}>
                        <span style={{textAlign: "middle"}}>sets:</span>
                        {
                            (() => {
                                let setNumCircles = []
                                if (currentCycle != null &&
                                    !_.isEmpty(currentCycle) &&
                                    currentCycle.movementId == selectedMovement.payload["movement/id"] &&
                                    (currentCycle.movementVariantId == null || currentCycle.movementVariantId == selectedMovementVariant.payload["movementvariant/id"]) &&
                                    currentCycle.sets.length > 0 &&
                                    moment(currentCycle.sets[currentCycle.sets.length - 1]["set/logged-at"]).isAfter(
                                        moment().subtract(utils.LAST_CYCLE_SET_TOO_OLD.val,
                                                          utils.LAST_CYCLE_SET_TOO_OLD.units))) {
                                    for (let i = 0; i < currentCycle.sets.length; i++) {
                                        setNumCircles.push(
                                            <div key={i} onClick={() => setOnClick(currentCycle.sets[i]["set/id"])} unselectable="on" className="set-num-circle clickable-set-num-circle">
                                                <span>{i + 1}</span>
                                            </div>
                                        )
                                    }
                                    setNumCircles.push(<span style={{marginLeft: 10}}>next: </span>)
                                    setNumCircles.push(<div key={currentCycle.sets.length} style={{marginLeft: 5}} className="set-num-circle current-set-num-circle"><span><strong>{currentCycle.sets.length + 1}</strong></span></div>)
                                } else {
                                    setNumCircles.push(<span style={{marginLeft: 10}}>--</span>)
                                    setNumCircles.push(<span style={{marginLeft: 10}}>next: </span>)
                                    setNumCircles.push(<div key={0} style={{marginLeft: 5}} className="set-num-circle current-set-num-circle"><span><strong>1</strong></span></div>)
                                }
                                return setNumCircles
                            })()
                        }
                    </div>
                    <EnterRepsForm
                        navigateTo={navigateTo}
                        currentCycle={currentCycle}
                        onSubmit={handleSubmit}
                        clearErrors={clearErrors}
                        selectedBodySegment={selectedBodySegment}
                        selectedMuscleGroup={selectedMuscleGroup}
                        selectedMovement={selectedMovement}
                        nearestBodyMeasurement={nearestBodyMeasurement}
                        initialValues={{isRealTime: true,
                                        originationDeviceId: utils.ORIG_DEVICE_ID_WEB,
                                        movementId: selectedMovement.payload["movement/id"],
                                        movementVariantId: selectedMovementVariant != null ? selectedMovementVariant.payload["movementvariant/id"] : null,
                                        uom: utils.toWeightUnitsDisplay(userSettings.payload["usersettings/weight-uom"]),
                                        weight: weightVal,
                                        displayUnitsPicker: false,
                                        displayMoreOptions: false,
                                        negatives: false,
                                        ignoreTime: false,
                                        toFailure: false}}
                        userSettings={userSettings}
                        changeUnitsClickedFn={changeUnitsClickedFn}
                        hideUnitsClickedFn={hideUnitsClickedFn}
                        moreButtonClickedFn={moreButtonClickedFn}
                        lessButtonClickedFn={lessButtonClickedFn}
                        bodyLiftWtExplanationAckAt={bodyLiftWtExplanationAckAt}
                        bodyLiftWtExplanationAckFn={bodyLiftWtExplanationAckFn}
                        repIncrementFn={() => repIncrementFn(1, currentRepCount)}
                        repDecrementFn={() => repDecrementFn(1, currentRepCount)}
                        weightIncrementFn={() => weightIncrementFn(weightIncDecAmount, currentWeight)}
                        weightDecrementFn={() => weightDecrementFn(weightIncDecAmount, currentWeight)}
                        requestInProgress={requestInProgress}
                        responseStatus={responseStatus} />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
EnterRepsPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    let currentRepCount = 0;
    let currentWeight = 0;
    if (state.form[forms.NEW_SET_FORM] != null) {
        if (state.form[forms.NEW_SET_FORM].reps != null) {
            currentRepCount = state.form[forms.NEW_SET_FORM].reps.value
        }
        if (state.form[forms.NEW_SET_FORM].weight != null) {
            currentWeight = state.form[forms.NEW_SET_FORM].weight.value
        }
    }
    const bmls = state.serverSnapshot._embedded["body-journal-logs"]
    const nearestBodyMeasurement = utils.nearestBmlWithNonNilBodyWeight(_.values(bmls), moment().valueOf())
    return {
        selectedBodySegment: state.serverSnapshot._embedded["body-segments"][state.selectionContext.selectedBodySegmentId],
        selectedMuscleGroup: state.serverSnapshot._embedded["muscle-groups"][state.selectionContext.selectedMuscleGroupId],
        selectedMovement: state.serverSnapshot._embedded["movements"][state.selectionContext.selectedMovementId],
        selectedMovementVariant: state.selectionContext.selectedMovementVariantId != null ? state.serverSnapshot._embedded["movement-variants"][state.selectionContext.selectedMovementVariantId] : null,
        currentRepCount: currentRepCount,
        currentWeight: currentWeight,
        currentCycle: state.currentCycle,
        responseStatus: state.api.responseStatus,
        requestInProgress: state.api.requestInProgress,
        becameUnauthenticated: state.becameUnauthenticated,
        userSettings: utils.userSettings(state),
        nearestBodyMeasurement: nearestBodyMeasurement,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        bodyLiftWtExplanationAckAt: state.bodyLiftWtExplanationAckAt.value
    }
}

const mapDispatchToProps = dispatch => {
    const makeIncFn = field => (amt, currentRepCount) => {
        ReactGA.event({
            category: utils.GA_EVENT_CATEGORY_USER,
            action: "increment " + field
        })
        let newValue
        if (currentRepCount == null || isNaN(currentRepCount)) {
            newValue = amt
        } else {
            newValue = currentRepCount + amt
        }
        dispatch({type: "redux-form/CHANGE", field: field, value: newValue, touch: false, form: forms.NEW_SET_FORM})
    }
    const makeDecFn = field => (amt, currentRepCount) => {
        ReactGA.event({
            category: utils.GA_EVENT_CATEGORY_USER,
            action: "decrement " + field
        })
        if (currentRepCount > 0) {
            let newValue = currentRepCount - amt
            if (newValue < 0) {
                newValue = 0
            }
            dispatch({type: "redux-form/CHANGE", field: field, value: newValue, touch: false, form: forms.NEW_SET_FORM})
        }
    }
    return {
        navigateTo: url => dispatch(push(url)),
        repIncrementFn: makeIncFn("reps"),
        repDecrementFn: makeDecFn("reps"),
        weightIncrementFn: makeIncFn("weight"),
        weightDecrementFn: makeDecFn("weight"),
        handleSubmit: () => {
            toastr.clean()
            ReactGA.event({
                category: utils.GA_EVENT_CATEGORY_USER,
                action: "save new set"
            })
            dispatch(attemptSaveNewSet(null, false, false))
        },
        clearErrors: () => dispatch(clearErrors()),
        changeUnitsClickedFn: () => {
            ReactGA.event({
                category: utils.GA_EVENT_CATEGORY_USER,
                action: "enter reps - change units clicked"
            })
            dispatch({type: "redux-form/CHANGE", field: "displayUnitsPicker", value: true, touch: false, form: forms.NEW_SET_FORM})
        },
        hideUnitsClickedFn: () => dispatch({type: "redux-form/CHANGE", field: "displayUnitsPicker", value: false, touch: false, form: forms.NEW_SET_FORM}),
        moreButtonClickedFn: () => {
            ReactGA.event({
                category: utils.GA_EVENT_CATEGORY_USER,
                action: "enter reps - more clicked"
            })
            dispatch({type: "redux-form/CHANGE", field: "displayMoreOptions", value: true, touch: false, form: forms.NEW_SET_FORM})
        },
        lessButtonClickedFn: () => dispatch({type: "redux-form/CHANGE", field: "displayMoreOptions", value: false, touch: false, form: forms.NEW_SET_FORM}),
        setOnClick: (setId) => {
            dispatch(destroy(forms.SET_FORM))
            dispatch(push(urls.setDetailUrl(setId)))
        },
        bodyLiftWtExplanationAckFn: () => dispatch(bodyLiftWtExplanationAck()),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterRepsPage)
