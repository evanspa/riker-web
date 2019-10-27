import React from "react"
import { Link } from "react-router"
import * as urls from "../urls"
import { Well,
         Modal,
         Panel,
         ControlLabel,
         Image,
         Checkbox,
         FormGroup,
         FormControl,
         HelpBlock,
         Label,
         Button,
         Row,
         Col } from "react-bootstrap"
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
import NotAllowedModal from "./not-allowed-modal.jsx"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "inputValue")
    mustBePositiveNumberValidator(values, errors, "inputValue")
    cannotBeEmptyValidator(values, errors, "loggedAt")
    mustBeDateValidator(values, errors, "loggedAt")
    return errors
}

class EnterBmlForm extends React.Component {

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
                inputValue,
                uom,
                displayUnitsPicker,
                loggedAt
            },
            selectedBmlType,
            navigateTo,
            userSettings,
            requestInProgress,
            handleSubmit,
            changeUnitsClickedFn,
            hideUnitsClickedFn,
            responseStatus,
            clearErrors
        } = this.props
        const areInputValueErrors = !this.props.disabled && inputValue != null && inputValue.touched && (inputValue.error != null) && (inputValue.error.length > 0);
        const inputValueFormGroupOpts = {} // http://stackoverflow.com/a/29103727/1034895
        if (areInputValueErrors) {
            inputValueFormGroupOpts['validationState'] = "error"
        }
        const saveBmlButton = (<Tappable style={{marginTop: 0}} component="Button" type="submit" className="btn btn-lg btn-success" disabled={requestInProgress}>Save Body Log</Tappable>)
        return (
            <div>
                <NotAllowedModal
                    responseStatus={responseStatus}
                    navigateTo={navigateTo}
                    clearErrors={clearErrors} />
                <form onSubmit={handleSubmit}>
                    <div>
                        {saveBmlButton}
                        <Tappable style={{paddingLeft: 5, paddingRight: 5, float: "right", marginTop: 28}}
                                  className="btn btn-xs btn-default"
                                  onTap={displayUnitsPicker.value ? hideUnitsClickedFn : changeUnitsClickedFn}>
                            {displayUnitsPicker.value ? "hide units" : "change units"}
                        </Tappable>
                    </div>
                    <Well style={{marginTop: 10, paddingBottom: 0, marginBottom: 12}}>
                        <FormGroup bsSize="lg" {...inputValueFormGroupOpts}>
                            <input
                                placeholder={selectedBmlType.payload["name"] + " - " + uom.value}
                                className="form-control set-input-text incDecInput"
                                type="number"
                                value={inputValue.value}
                                onChange={inputValue.onChange}
                                name={inputValue.name}
                                disabled={this.props.disabled}
                                pattern="\d*" />
                            <HelpBlock>{areInputValueErrors ? inputValue.error : ""}</HelpBlock>
                        </FormGroup>
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
                                             data={selectedBmlType.payload["uomOptions"]}
                                             disabled={false}
                                             autoFocus={false} />
                                         <em className="formGroupHelpText">{selectedBmlType.payload["uomTypeName"] + " unit default can be set in your "}<strong>Profile and Settings</strong></em>
                                     </FormGroup>
                                 )
                             }
                             return null
                         })()
                        }
                <div>
                    <RikerDateFormGroup
                        style={{marginTop: 15}}
                        label="Log date"
                        field={loggedAt}
                        disabled={false} />
                </div>
                    </Well>
                    {saveBmlButton}
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: forms.NEW_BML_FORM,
    fields: ["originationDeviceId", "inputValue", "uom", "displayUnitsPicker", "loggedAt"],
    validate
})(EnterBmlForm)
