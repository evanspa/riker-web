import React from "react"
import { Label, Image, FormGroup, Checkbox, Well, ControlLabel, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router"
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
import { BODY_JOURNAL_LOG_FORM } from "../forms"
import ActionsArray from "./actions-array.jsx"
import ErrorMessages from "./error-messages.jsx"
import Tappable from "react-tappable"
import NotAllowedModal from "./not-allowed-modal.jsx"

const validate = (values, props) => {
    const errors = {}
    mustBePositiveNumberValidator(values, errors, "bodyWeight")
    mustBePositiveNumberValidator(values, errors, "armSize")
    mustBePositiveNumberValidator(values, errors, "chestSize")
    mustBePositiveNumberValidator(values, errors, "calfSize")
    mustBePositiveNumberValidator(values, errors, "thighSize")
    mustBePositiveNumberValidator(values, errors, "neckSize")
    mustBePositiveNumberValidator(values, errors, "forearmSize")
    mustBePositiveNumberValidator(values, errors, "waistSize")
    if (!values["bodyWeight"] &&
        !values["armSize"] &&
        !values["chestSize"] &&
        !values["calfSize"] &&
        !values["waistSize"] &&
        !values["forearmSize"] &&
        !values["thighSize"] &&
        !values["neckSize"]) {
        errors["formLevel"] = "At least one field needs a value."
    }
    cannotBeEmptyValidator(values, errors, "loggedAt")
    mustBeDateValidator(values, errors, "loggedAt")
    return errors
}

class BodyJournalLogForm extends React.Component {

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
                bodyWeight,
                bodyWeightUom,
                displayWeightUnitsPicker,
                armSize,
                chestSize,
                calfSize,
                neckSize,
                forearmSize,
                waistSize,
                thighSize,
                sizeUom,
                displaySizeUnitsPicker,
                loggedAt,
                formLevel
            },
            bodyJournalLog,
            markBodyJournalLogForEdit,
            cancelBodyJournalLogEdit,
            downloadBodyJournalLog,
            deleteBodyJournalLog,
            handleSubmit,
            displayBodyWeightUnits,
            hideBodyWeightUnits,
            displaySizeUnits,
            hideSizeUnits,
            requestInProgress,
            responseStatus,
            editMode,
            rErrorMask,
            deleteConfirmMessage,
            originationDevices,
            navigateTo,
            clearErrors
        } = this.props
        let bodyJournalLogId = null
        if (bodyJournalLog != null) { // if 'Add', bodyJournalLog will be null
            bodyJournalLogId = bodyJournalLog.payload["bodyjournallog/id"]
        }
        const sizeHelpText = sizeUom.value == utils.INCHES.display ? "in inches" : "in centimeters"
        const actionArray = <ActionsArray
                                entityType="body measurement log"
                                msgIfDisabled="account closed - 'Edit / Delete' disabled"
                                editMode={editMode}
                                entityId={bodyJournalLogId}
                                cancelEntityEdit={cancelBodyJournalLogEdit}
                                requestInProgress={requestInProgress}
                                accountStatuses={this.props.accountStatuses}
                                markEntityForEdit={markBodyJournalLogForEdit}
                                cancelEntityAdd={cancelBodyJournalLogEdit}
                                deleteEntity={bodyJournalLogId => { deleteBodyJournalLog(bodyJournalLogId) }}
                                deleteEntityConfirmMessage={deleteConfirmMessage} />
        const errors = []
        return (
        <div>
            <NotAllowedModal
                responseStatus={responseStatus}
                navigateTo={navigateTo}
                clearErrors={clearErrors} />
            <ErrorMessages errorMask={rErrorMask} errors={errors} />
            {(() => {
                 const isFormLevelError = !this.props.disabled && formLevel != null && formLevel.touched && (formLevel.error != null) && (formLevel.error.length > 0);
                 if (isFormLevelError) {
                     return (<h4 style={{marginTop: 20, marginBottom: 20}}><Label bsStyle="danger">{formLevel.error}</Label></h4>)
                 }
                 return null
             })()
            }
            <form onSubmit={handleSubmit}>
                { actionArray }
                <Row><Col xs={12}><hr /></Col></Row>
                <RikerDateFormGroup
                    label="Log date"
                    field={loggedAt}
                    disabled={!editMode} />
                <Well>
                    <RikerIntegerFormGroup
                        label={"Body Weight - " + bodyWeightUom.value}
                        adjacentButton={displayWeightUnitsPicker.value ?
                                        {label: "hide units", onClick: hideBodyWeightUnits} :
                                        {label: "change units", onClick: displayBodyWeightUnits}}
                        helpText={bodyWeightUom.value == utils.LBS.display ? "in pounds" : "in kilograms"}
                        field={bodyWeight}
                        disabled={!editMode} />
                    {(() => {
                         if (displayWeightUnitsPicker.value) {
                             return (<RikerSelectListFormGroup
                                         adjacentButton={{label: "hide", onClick: hideBodyWeightUnits}}
                                         helpText={<span>Weight unit default can be set in your <Link style={{fontSize: "1.0em"}} className="formGroupHelpText" to={urls.SETTINGS_URI}>Profile and Settings</Link></span>}
                                         label="Body Weight Units"
                                         field={bodyWeightUom}
                                         data={utils.WEIGHT_UNITS}
                                         disabled={!editMode} />)
                         }
                         return null
                     })()
                    }
                </Well>
                <Well>
                    <Tappable
                        className="btn btn-xs btn-default"
                        style={{paddingLeft: 5, paddingRight: 5, float: "right"}}
                        disabled={!editMode}
                        onTap={displaySizeUnitsPicker.value ? hideSizeUnits : displaySizeUnits}>{displaySizeUnitsPicker.value ? "hide units" : "change units"}</Tappable>
                    <RikerNumberFormGroup
                        label={"Arm Size - " + sizeUom.value}
                        helpText={sizeHelpText}
                        field={armSize}
                        disabled={!editMode} />
                    <RikerNumberFormGroup
                        label={"Chest Size - " + sizeUom.value}
                        helpText={sizeHelpText}
                        field={chestSize}
                        disabled={!editMode} />
                    <RikerNumberFormGroup
                        label={"Calf Size - " + sizeUom.value}
                        helpText={sizeHelpText}
                        field={calfSize}
                        disabled={!editMode} />
                    <RikerNumberFormGroup
                        label={"Thigh Size - " + sizeUom.value}
                        helpText={sizeHelpText}
                        field={thighSize}
                        disabled={!editMode} />
                    <RikerNumberFormGroup
                        label={"Forearm Size - " + sizeUom.value}
                        helpText={sizeHelpText}
                        field={forearmSize}
                        disabled={!editMode} />
                    <RikerNumberFormGroup
                        label={"Waist Size - " + sizeUom.value}
                        helpText={sizeHelpText}
                        field={waistSize}
                        disabled={!editMode} />
                    <RikerNumberFormGroup
                        label={"Neck Size - " + sizeUom.value}
                        helpText={sizeHelpText}
                        field={neckSize}
                        disabled={!editMode} />

                    {(() => {
                         if (displaySizeUnitsPicker.value) {
                             return (<RikerSelectListFormGroup
                                         adjacentButton={{label: "hide", onClick: hideSizeUnits}}
                                         helpText={<span>Size unit default can be set in your <Link style={{fontSize: "1.0em"}} to={urls.SETTINGS_URI}>Profile and Settings</Link></span>}
                                         label="Size Units"
                                         field={sizeUom}
                                         data={utils.LENGTH_UNITS}
                                         disabled={!editMode} />)
                         }
                         return null
                     })()
                    }
                </Well>
                {(() => {
                     if (!editMode) {
                         return (
                             <OriginationDevice originationDeviceId={bodyJournalLog.payload["bodyjournallog/origination-device-id"]}
                                                originationDevices={originationDevices} />
                         )
                     }
                 })()
                }
                {(() => {
                     if (!editMode && bodyJournalLog.payload["bodyjournallog/imported-at"] != null) {
                         return (
                             <div>
                                 <Row><Col xs={12}><hr style={{ marginTop: 5, marginBottom: 15}}/></Col></Row>
                                 <ImportedAt importedAt={bodyJournalLog.payload["bodyjournallog/imported-at"]} />
                             </div>
                         )
                     }
                 })()
                }
                <Row><Col xs={12}><hr style={{ marginTop: 5, marginBottom: 15}}/></Col></Row>
                { actionArray }
            </form>
        </div>
        )
    }
}

export default reduxForm({
    form: BODY_JOURNAL_LOG_FORM,
    fields: ["originationDeviceId", "bodyWeight", "bodyWeightUom", "displayWeightUnitsPicker", "armSize", "chestSize", "calfSize", "thighSize", "waistSize", "neckSize", "forearmSize", "sizeUom", "displaySizeUnitsPicker", "loggedAt", "formLevel"],
    destroyOnUnmount: false,
    validate
})(BodyJournalLogForm)
