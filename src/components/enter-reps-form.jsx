import React from "react"
import { Link } from "react-router"
import * as urls from "../urls"
import { Well, Modal, Panel, ControlLabel, Image, Checkbox, FormGroup, FormControl, HelpBlock, Label, Button, Row, Col } from "react-bootstrap"
import * as strs from "../strings"
import { reduxForm } from "redux-form"
import { RikerTextFormGroup,
         RikerFormGroup,
         RikerDateFormGroup,
         RikerDateTimeFormGroup,
         RikerSelectListFormGroup } from "./form-input.jsx"
import { cannotBeEmptyValidator,
         mustBePositiveNumberValidator,
         mustBeDateValidator } from "../utils"
import { toastr } from 'react-redux-toastr'
import SelectList from "react-widgets/lib/SelectList"
import _ from "lodash"
import * as forms from "../forms"
import * as utils from "../utils"
import Tappable from "react-tappable"
import ReactGA from "react-ga"
import NotAllowedModal from "./not-allowed-modal.jsx"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "weight")
    mustBePositiveNumberValidator(values, errors, "weight")
    cannotBeEmptyValidator(values, errors, "reps")
    mustBePositiveNumberValidator(values, errors, "reps")
    if (!values["isRealTime"]) {
        cannotBeEmptyValidator(values, errors, "loggedAt")
        mustBeDateValidator(values, errors, "loggedAt")
    }
    return errors
}

class EnterRepsForm extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { showRtModal: false,
                       showNegativesModal: false,
                       showFailureModal: false,
                       showIgnoreTimeModal: false,
                       showBodyLiftDefaultValue: false,
                       showBodyLiftWtExplanation: true }
    }

    componentWillUnmount() {
        toastr.clean()
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        const {
            fields: {
                weight,
                uom,
                displayUnitsPicker,
                displayMoreOptions,
                reps,
                negatives,
                toFailure,
                isRealTime,
                ignoreTime,
                loggedAt,
                movementId,
                movementVariantId
            },
            navigateTo,
            userSettings,
            selectedBodySegment,
            selectedMuscleGroup,
            selectedMovement,
            nearestBodyMeasurement,
            requestInProgress,
            handleSubmit,
            repIncrementFn,
            repDecrementFn,
            weightIncrementFn,
            weightDecrementFn,
            changeUnitsClickedFn,
            hideUnitsClickedFn,
            moreButtonClickedFn,
            lessButtonClickedFn,
            currentCycle,
            responseStatus,
            bodyLiftWtExplanationAckAt,
            bodyLiftWtExplanationAckFn,
            clearErrors
        } = this.props
        const areWeightErrors = !this.props.disabled && weight != null && weight.touched && (weight.error != null) && (weight.error.length > 0);
        const areRepsErrors = !this.props.disabled && reps != null && reps.touched && (reps.error != null) && (reps.error.length > 0);
        const weightFormGroupOpts = {} // http://stackoverflow.com/a/29103727/1034895
        if (areWeightErrors) {
            weightFormGroupOpts['validationState'] = "error"
        }
        const repsFormGroupOpts = {} // http://stackoverflow.com/a/29103727/1034895
        if (areRepsErrors) {
            repsFormGroupOpts['validationState'] = "error"
        }
        const saveSetButton = (<Tappable style={{marginTop: 0}} component="Button" type="submit" className="btn btn-lg btn-success" disabled={requestInProgress}>Save Set</Tappable>)
        const isBodyLift = selectedMovement.payload["movement/is-body-lift"] || movementVariantId.value == utils.BODY_MOVEMENT_VARIANT_ID
        let weightPercentage = 1.0;
        if (selectedMovement.payload["movement/percentage-of-body-weight"] != null) {
            weightPercentage = selectedMovement.payload["movement/percentage-of-body-weight"]
        }
        let commonMargin
        let fontSize
        const screenWidth = utils.screenWidth()
        if (screenWidth > 1023) { // ipad pro and larger
            commonMargin = 15
            fontSize = "100%"
        } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
            commonMargin = 15
            fontSize = "100%"
        } else if (screenWidth > 411) { // iphone 6 plus
            commonMargin = 14
            fontSize = "98%"
        } else if (screenWidth > 374) { // iphone 6
            commonMargin = 11
            fontSize = "95%"
        } else { // iphone 5 and similar
            commonMargin = 8
            fontSize = "90%"
        }
        return (
            <div>
                <NotAllowedModal
                    responseStatus={responseStatus}
                    navigateTo={navigateTo}
                    clearErrors={clearErrors} />
                <Modal
                    show={isBodyLift && bodyLiftWtExplanationAckAt == null && this.state.showBodyLiftWtExplanation}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                <div>Body weight movement</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <span>The selected movement, </span>
                            <span>{(() => (<strong>{selectedMovement.payload["movement/canonical-name"]}</strong>))()}</span>
                            <span>, is a body-lift movement Riker esimates to use </span>
                            <span>{(() => (<strong>{weightPercentage * 100}</strong>))()}</span>
                            <span>% of your body weight.</span>
                        </p>
                        {(() => {
                             if (nearestBodyMeasurement != null) {
                                 return (
                                     <p>
                                         <span>Based on your most recent body measurement log, your body weight is </span>
                                         <span>{(() => (<strong>{nearestBodyMeasurement.payload["bodyjournallog/body-weight"]} {utils.toWeightUnitsDisplay(nearestBodyMeasurement.payload["bodyjournallog/body-weight-uom"])}</strong>))()}.  Therefore we've defaulted the weight field to </span>
                                         <span>{(() => (<strong>{weight.value} {uom.value}</strong>))()}.</span>
                                     </p>
                                 )
                             } else {
                                 return (
                                     <p>
                                         <span>Keep this in mind when entering the weight value.</span>
                                     </p>
                                 )
                             }
                         })()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default"
                                  style={{marginRight: 10, marginBottom: 10}}
                                  onTap={() => this.setState({ showBodyLiftWtExplanation: false })}>Okay</Tappable>
                        <Tappable className="btn btn-default"
                                  style={{marginRight: 10, marginBottom: 10}}
                                  onTap={bodyLiftWtExplanationAckFn}>Okay.  Don't show me this again.</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showBodyLiftDefaultValue}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <p>{strs.body_lift_default_value_explanation_pp1}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => this.setState({ showBodyLiftDefaultValue: false })}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showRtModal}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <p>{strs.real_time_explanation_pp1}</p>
                        <p>{strs.real_time_explanation_pp2}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => this.setState({ showRtModal: false })}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showIgnoreTimeModal}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <p>{strs.ignore_time_explanation_pp1}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => this.setState({ showIgnoreTimeModal: false })}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showNegativesModal}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <p>{strs.negatives_explanation_pp1}</p>
                        <p>{strs.negatives_explanation_pp2}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => this.setState({ showNegativesModal: false })}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showFailureModal}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <utils.toFailureModalContent />
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => this.setState({ showFailureModal: false })}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <form onSubmit={handleSubmit}>
                    <div>
                        {saveSetButton}
                        <Tappable style={{paddingLeft: 5, paddingRight: 5, float: "right", marginTop: commonMargin * 2}}
                                  className="btn btn-xs btn-default"
                                  onTap={displayUnitsPicker.value ? hideUnitsClickedFn : changeUnitsClickedFn}>
                            {displayUnitsPicker.value ? "hide units" : "change units"}
                        </Tappable>
                    </div>
                    <Well style={{marginTop: commonMargin,
                                  padding: commonMargin,
                                  marginBottom: commonMargin}}>
                        {(() => {
                             if (isBodyLift) {
                                 return (
                                     <FormGroup bsSize="lg" {...weightFormGroupOpts}>
                                         <input
                                             placeholder={"Weight - " + uom.value}
                                             className="form-control set-input-text incDecInput"
                                             type="number"
                                             value={weight.value}
                                             onChange={weight.onChange}
                                             name={weight.name}
                                             disabled={this.props.disabled}
                                             pattern="\d*" />
                                         <HelpBlock>{areWeightErrors ? weight.error : ""}</HelpBlock>
                                         {(() => {
                                              return (
                                                  <em className="formGroupHelpText">
                                                      <span>This movement, </span>
                                                      <span>{(() => (<strong>{selectedMovement.payload["movement/canonical-name"]}</strong>))()}</span>
                                                      <span>, uses about </span>
                                                      <span>{(() => (<strong>{weightPercentage * 100}</strong>))()}</span>
                                                      <span>% of your body weight.  Keep that in mind when entering the weight value.</span>
                                                  </em>
                                              )
                                          })()
                                         }
                                     </FormGroup>
                                 )
                             } else {
                                 const weightIncDecAmount = userSettings.payload["usersettings/weight-inc-dec-amount"]
                                 return (
                                     <FormGroup bsSize="lg" {...weightFormGroupOpts} style={{marginBottom: 0}}>
                                         <div style={{display: "flex", alignItems: "center"}}>
                                             <Tappable
                                                 className="incDecButton"
                                                 style={{marginRight: commonMargin,
                                                         paddingLeft: 5,
                                                         paddingRight: 5,
                                                         fontSize: fontSize,
                                                         whiteSpace: "nowrap"}}
                                                 onTap={weightDecrementFn}>- {weightIncDecAmount} {uom.value}</Tappable>
                                             <input
                                                 style={{marginRight: commonMargin}}
                                                 placeholder="Weight"
                                                 className="form-control incDecInput"
                                                 type="number"
                                                 value={weight.value}
                                                 onChange={weight.onChange}
                                                 name={weight.name}
                                                 disabled={this.props.disabled}
                                                 pattern="\d*" />
                                             <Tappable
                                                 className="incDecButton"
                                                 style={{paddingLeft: 5,
                                                         paddingRight: 5,
                                                         fontSize: fontSize,
                                                         whiteSpace: "nowrap"}}
                                                 onTap={weightIncrementFn}>+ {weightIncDecAmount} {uom.value}</Tappable>
                                         </div>
                                         <HelpBlock>{areWeightErrors ? weight.error : ""}</HelpBlock>
                                     </FormGroup>)
                             }
                         })()
                        }
                        {(() => {
                             if (displayUnitsPicker.value) {
                                 return (
                                     <FormGroup bsSize="lg">
                                         <ControlLabel>Units
                                             <Tappable className="btn btn-xs btn-default" style={{marginLeft: 10, marginBottom: 3, paddingLeft: 15, paddingRight: 15}} onTap={hideUnitsClickedFn}>hide</Tappable>
                                         </ControlLabel>
                                         <SelectList
                                             value={uom.value}
                                             onChange={uom.onChange}
                                             name={uom.name}
                                             data={utils.WEIGHT_UNITS}
                                             disabled={false}
                                             autoFocus={false} />
                                         <em className="formGroupHelpText">Weight unit default can be set in your <strong>Profile and Settings</strong></em>
                                     </FormGroup>
                                 )
                             }
                             return null
                         })()
                        }
                        <FormGroup bsSize="lg" {...repsFormGroupOpts} style={{marginTop: commonMargin, marginBottom: 0}}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Tappable
                                    className="incDecButton"
                                    style={{marginRight: commonMargin,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            fontSize: fontSize,
                                            whiteSpace: "nowrap"}}
                                    onTap={repDecrementFn}>- 1</Tappable>
                                <input
                                    style={{marginRight: commonMargin}}
                                    placeholder="Reps"
                                    className="form-control incDecInput"
                                    type="number"
                                    value={reps.value}
                                    onChange={reps.onChange}
                                    name={reps.name}
                                    disabled={this.props.disabled}
                                    pattern="\d*" />
                                <Tappable
                                    className="incDecButton"
                                    style={{paddingLeft: 5,
                                            paddingRight: 5,
                                            fontSize: fontSize,
                                            whiteSpace: "nowrap"}}
                                    onTap={repIncrementFn}>+ 1</Tappable>
                            </div>
                            <HelpBlock>{areRepsErrors ? reps.error : ""}</HelpBlock>
                        </FormGroup>
                        <FormGroup bsSize="lg" style={{display: "flex", alignItems: "center", marginTop: commonMargin * 2, marginBottom: 0}}>
                            <input
                                type="checkbox"
                                checked={toFailure.value}
                                onChange={toFailure.onChange}
                                name={toFailure.name}
                                disabled={this.props.disabled} />
                            <ControlLabel type="text" style={{marginLeft: 10, marginBottom: 0}}>To Failure</ControlLabel>
                            <Tappable component="div" className="question-mark" onTap={() => this.setState({showFailureModal: true})}>i</Tappable>
                        </FormGroup>
                        {(() => {
                             if (displayMoreOptions.value) {
                                 return (
                                     <div>
                                         <hr style={{height: 2, backgroundColor: "#CCC"}} />
                                         <FormGroup bsSize="lg" style={{marginTop: commonMargin, display: "flex", alignItems: "center"}}>
                                             <input
                                                 type="checkbox"
                                                 checked={negatives.value}
                                                 onChange={negatives.onChange}
                                                 name={negatives.name}
                                                 disabled={this.props.disabled} />
                                             <ControlLabel type="text" style={{marginLeft: 10, marginBottom: 0}}>Negatives</ControlLabel>
                                             <Tappable component="div" className="question-mark" onTap={() => this.setState({showNegativesModal: true})}>i</Tappable>
                                         </FormGroup>
                                         <FormGroup bsSize="lg" style={{marginTop: commonMargin, display: "flex", alignItems: "center", marginBottom: 0}}>
                                             <input
                                                 type="checkbox"
                                                 checked={isRealTime.value}
                                                 onChange={isRealTime.onChange}
                                                 name={isRealTime.name}
                                                 disabled={this.props.disabled} />
                                             <ControlLabel type="text" style={{marginLeft: 10, marginBottom: 0}}>{strs.real_time_lbl}</ControlLabel>
                                             <Tappable component="div" className="question-mark" onTap={() => this.setState({showRtModal: true})}>i</Tappable>
                                         </FormGroup>
                                         {(() => {
                                              if (!isRealTime.value) {
                                                  const loggedAtDateTimeFormGroup = (<RikerDateTimeFormGroup
                                                                                         style={{marginTop: commonMargin}}
                                                                                         label="Log date"
                                                                                         field={loggedAt}
                                                                                         disabled={false} />)
                                                  const loggedAtDateFormGroup = (<RikerDateFormGroup
                                                                                     style={{marginTop: commonMargin}}
                                                                                     label="Log date"
                                                                                     field={loggedAt}
                                                                                     disabled={false} />)
                                                  const loggedAFormGroup = ignoreTime.value ? loggedAtDateFormGroup : loggedAtDateTimeFormGroup
                                                  return (
                                                      <div>
                                                          {loggedAFormGroup}
                                                          <FormGroup bsSize="lg" style={{display: "flex", alignItems: "center", marginTop: commonMargin, marginBottom: 0}}>
                                                              <input
                                                                  type="checkbox"
                                                                  checked={ignoreTime.value}
                                                                  onChange={ignoreTime.onChange}
                                                                  name={ignoreTime.name}
                                                                  disabled={this.props.disabled} />
                                                              <ControlLabel type="text" style={{marginLeft: 10, marginBottom: 0}}>{strs.ignore_time_lbl}</ControlLabel>
                                                              <Tappable component="div" className="question-mark" onTap={() => this.setState({showIgnoreTimeModal: true})}>i</Tappable>
                                                          </FormGroup>
                                                      </div>
                                                  )
                                              } else {
                                                  return null
                                              }
                                          })()
                                         }
                                     </div>
                                 )
                             }
                             return null
                         })()
                        }
                        <Tappable style={{marginTop: commonMargin * 2}}
                                  className="btn btn-sm btn-riker"
                                  onTap={displayMoreOptions.value ? lessButtonClickedFn : moreButtonClickedFn}>
                            {displayMoreOptions.value ? "less" : "more"}
                        </Tappable>
                    </Well>
                    {saveSetButton}
                    {(() => {
                         if (selectedMuscleGroup && selectedBodySegment) {
                             return (
                                 <div>
                                     <hr />
                                     <div style={{marginTop: 10}}>
                                         <Tappable  style={{marginBottom: 10, marginRight: 10}} className="btn btn-default" onTap={() => navigateTo(urls.SELECT_MOVEMENT_URI)}>Change movement</Tappable>
                                         <Tappable style={{marginBottom: 10, marginRight: 10}} className="btn btn-default" onTap={() => navigateTo(urls.SELECT_MUSCLE_GROUP_URI)}>Change muscle group</Tappable>
                                         <Tappable style={{marginBottom: 10, marginRight: 10}} className="btn btn-default" onTap={() => navigateTo(urls.SELECT_BODY_SEGMENT_URI)}>Change body segment</Tappable>
                                     </div>
                                 </div>
                             )
                         }
                     })()
                    }
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: forms.NEW_SET_FORM,
    fields: ["originationDeviceId", "movementId", "movementVariantId", "weight", "uom", "displayUnitsPicker", "displayMoreOptions", "reps", "negatives", "toFailure", "isRealTime", "ignoreTime", "loggedAt"],
    validate
})(EnterRepsForm)
