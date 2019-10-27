import React from "react"
import CreateReactClass from "create-react-class"
import { FormGroup, Checkbox, ControlLabel, Modal, Button, Row, Col } from "react-bootstrap"
import { reduxForm } from "redux-form"
import * as strs from "../strings"
import OriginationDevice from "./origination-device.jsx"
import ImportedAt from "./imported-at.jsx"
import { RikerTextFormGroup,
         RikerDateFormGroup,
         RikerDateTimeFormGroup,
         RikerCheckboxFormGroup,
         RikerSelectListFormGroup,
         RikerIntegerFormGroup,
         RikerDropdownFormGroup,
         RikerNumberFormGroup } from "./form-input.jsx"
import { cannotBeEmptyValidator,
         mustBePositiveNumberValidator,
         cannotBeUnselectedValidator,
         mustBeNumberValidator,
         mustBeDateValidator } from "../utils"
import _ from "lodash"
import * as errFlags from "../error-flags"
import * as urls from "../urls"
import * as utils from "../utils"
import { SET_FORM } from "../forms"
import ActionsArray from "./actions-array.jsx"
import ErrorMessages from "./error-messages.jsx"
import Tappable from "react-tappable"
import NotAllowedModal from "./not-allowed-modal.jsx"

const validate = (values, props) => {
    const errors = {}
    const movements = props.movements
    cannotBeUnselectedValidator(values, errors, "movementId", "Select a movement.")
    if (errors["movementId"] == null) {
        const movementVariants = props.movementVariants
        let movementIdVal
        if (_.isNumber(values.movementId)) {
            movementIdVal = values.movementId
        } else {
            movementIdVal = values.movementId["movement/id"]
        }
        const variantItems = utils.movementVariantItems(movements[movementIdVal], _.values(movementVariants))
        if (variantItems.length > 0) {
            if (!cannotBeUnselectedValidator(values, errors, "movementVariantId", "Select a variant.")) {
                // values["movementVariantId"] is not null...but we need to make sure it's in the list of
                // variantItems
                let currentMovementVariantIdVal
                if (_.isNumber(values.movementVariantId)) {
                    currentMovementVariantIdVal = values.movementVariantId
                } else {
                    currentMovementVariantIdVal = values.movementVariantId["movementvariant/id"]
                }
                let found = false
                for (let i = 0; i < variantItems.length && !found; i++) {
                    found = variantItems[i].payload["movementvariant/id"] == currentMovementVariantIdVal
                }
                if (!found) {
                    errors["movementVariantId"] = "Select a variant."
                }
            }
        }
    }
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

class SetForm extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { showNegativesModal: false, showFailureModal: false, showRtModal: false }
    }

    componentWillUnmount() {
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        // https://github.com/erikras/redux-form/issues/190
        const {
            fields: {
                movementId,
                movementVariantId,
                weight,
                uom,
                reps,
                negatives,
                toFailure,
                ignoreTime,
                loggedAt
            },
            navigateTo,
            clearErrors,
            allMuscleGroups,
            allMuscles,
            movements,
            movementVariants,
            set,
            markSetForEdit,
            cancelSetEdit,
            downloadSet,
            deleteSet,
            handleSubmit,
            requestInProgress,
            responseStatus,
            editMode,
            rErrorMask,
            deleteConfirmMessage,
            originationDevices
        } = this.props
        const setId = set.payload["set/id"]
        const movementDropdownValues = utils.toDropdownValues(movements,
                                                              "movement/id",
                                                              "movement/canonical-name",
                                                              "movement/primary-muscle-ids")
        let modalClose = () => this.setState({ showModal: false })
        const actionArray = <ActionsArray
                                entityType="set"
                                msgIfDisabled="account closed - 'Edit / Delete' disabled"
                                editMode={editMode}
                                entityId={setId}
                                accountStatuses={this.props.accountStatuses}
                                cancelEntityEdit={cancelSetEdit}
                                requestInProgress={requestInProgress}
                                markEntityForEdit={markSetForEdit}
                                cancelEntityAdd={cancelSetEdit}
                                downloadEntity={downloadSet}
                                deleteEntity={setId => { deleteSet(setId) }}
                                deleteEntityConfirmMessage={deleteConfirmMessage} />
        const errors = []
        const GroupByMuscleGroup = CreateReactClass({
            render() {
                return (
                    <span>{allMuscleGroups[this.props.item].payload["musclegroup/name"]}</span>
                )
            }
        })
        let movementIdVal
        if (_.isNumber(movementId.value)) {
            movementIdVal = movementId.value
        } else {
            movementIdVal = movementId.value["movement/id"]
            if (!movementIdVal) {
                movementIdVal = movementId.initialValue
            }
        }
        return (
        <div>
            <NotAllowedModal
                responseStatus={responseStatus}
                navigateTo={navigateTo}
                clearErrors={clearErrors} />
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
                show={this.state.showFailureModal}
                dialogClassName="riker-modal-dialog">
                <Modal.Body>
                    <utils.toFailureModalContent />
                </Modal.Body>
                <Modal.Footer>
                    <Tappable className="btn btn-default" onTap={() => this.setState({ showFailureModal: false })}>Close</Tappable>
                </Modal.Footer>
            </Modal>
            <ErrorMessages errorMask={rErrorMask} errors={errors} />
            <form onSubmit={handleSubmit}>
                { actionArray }
                <Row><Col xs={12}><hr /></Col></Row>
                <RikerDropdownFormGroup
                    label="Movement"
                    field={movementId}
                    disabled={!editMode}
                    valueField="movement/id"
                    textField="movement/canonical-name"
                    data={movementDropdownValues}
                    groupBy={movement => {
                            return allMuscles[movement["movement/primary-muscle-ids"][0]].payload["muscle/muscle-group-id"]}
                    }
                    groupComponent={GroupByMuscleGroup} />
                {(() => {
                     const variantItems = utils.movementVariantItems(movements[movementIdVal], _.values(movementVariants))
                     if (variantItems.length > 0) {
                         return (
                             <RikerDropdownFormGroup
                                 label="Variant"
                                 field={movementVariantId}
                                 disabled={!editMode}
                                 valueField="movementvariant/id"
                                 textField="movementvariant/name"
                                 data={utils.toDropdownValues(variantItems, "movementvariant/id", "movementvariant/name")} />
                         )
                     }
                     return null
                })()
                }
                {(() => {
                     if (ignoreTime.value) {
                         return (<RikerDateFormGroup
                                     label="Log date"
                                     field={loggedAt}
                                     disabled={!editMode} />)
                     } else {
                         return (<RikerDateTimeFormGroup
                                     label="Log date"
                                     field={loggedAt}
                                     disabled={!editMode} />)
                     }
                })()
                }
                <FormGroup bsSize="lg" style={{marginTop: 15, display: "flex", alignItems: "center"}}>
                    <input
                        type="checkbox"
                        checked={ignoreTime.value}
                        onChange={ignoreTime.onChange}
                        name={ignoreTime.name}
                        disabled={!editMode} />
                    <ControlLabel type="text" style={{marginLeft: 10, marginBottom: 0}}>{strs.ignore_time_lbl}</ControlLabel>
                    <Tappable component="div" className="question-mark" onTap={() => this.setState({showIgnoreTimeModal: true})}>i</Tappable>
                </FormGroup>
                <RikerIntegerFormGroup
                    label={"Weight - " + uom.value}
                    field={weight}
                    helpText={uom.value == utils.LBS.display ? "in pounds" : "in kilograms"}
                    disabled={!editMode} />
                <RikerSelectListFormGroup
                    label="Units"
                    field={uom}
                    data={utils.WEIGHT_UNITS}
                    disabled={!editMode} />
                <RikerIntegerFormGroup
                    label="Reps"
                    field={reps}
                    disabled={!editMode} />
                <FormGroup bsSize="lg" style={{marginTop: 15, display: "flex", alignItems: "center"}}>
                    <input
                        type="checkbox"
                        checked={toFailure.value}
                        onChange={toFailure.onChange}
                        name={toFailure.name}
                        disabled={!editMode} />
                    <ControlLabel type="text" style={{marginLeft: 10, marginBottom: 0}}>To Failure</ControlLabel>
                    <Tappable component="div" className="question-mark" onTap={() => this.setState({showFailureModal: true})}>i</Tappable>
                </FormGroup>
                <FormGroup bsSize="lg" style={{marginTop: 15, display: "flex", alignItems: "center"}}>
                    <input
                        type="checkbox"
                        checked={negatives.value}
                        onChange={negatives.onChange}
                        name={negatives.name}
                        disabled={!editMode} />
                    <ControlLabel type="text" style={{marginLeft: 10, marginBottom: 0}}>Negatives</ControlLabel>
                    <Tappable component="div" className="question-mark" onTap={() => this.setState({showNegativesModal: true})}>i</Tappable>
                </FormGroup>
                <Row><Col xs={12}><hr style={{ marginTop: 5, marginBottom: 15}}/></Col></Row>
                {(() => {
                     if (!editMode) {
                         return (
                             <OriginationDevice originationDeviceId={set.payload["set/origination-device-id"]}
                                                originationDevices={originationDevices} />
                         )
                     }
                })()
                }
                {(() => {
                     if (!editMode && set.payload["set/imported-at"] != null) {
                         return (
                             <div>
                                 <div>
                                     <Row><Col xs={12}><hr style={{ marginTop: 5, marginBottom: 15}}/></Col></Row>
                                     <ImportedAt importedAt={set.payload["set/imported-at"]} />
                                 </div>
                                 <Row><Col xs={12}><hr style={{ marginTop: 5, marginBottom: 15}}/></Col></Row>
                             </div>
                         )
                     }
                })()
                }
                { actionArray }
            </form>
        </div>
        )
    }
}

export default reduxForm({
    form: SET_FORM,
    fields: ["originationDeviceId", "movementId", "movementVariantId", "weight", "uom", "reps", "negatives", "toFailure", "ignoreTime", "loggedAt"],
    destroyOnUnmount: false,
    validate
})(SetForm)
