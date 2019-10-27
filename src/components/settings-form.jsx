import React from "react"
import { Button, Row, Col, Panel, Well } from "react-bootstrap"
import { reduxForm } from "redux-form"
import { RikerTextFormGroup,
         RikerDateFormGroup,
         RikerIntegerFormGroup,
         RikerSelectListFormGroup,
         RikerCheckboxFormGroup } from "./form-input.jsx"
import { cannotBeEmptyValidator,
         mustBePositiveNumberValidator,
         mustBeNumberValidator } from "../utils"
import _ from "lodash"
import { SETTINGS_FORM } from "../forms"
import * as errFlags from "../error-flags"
import * as utils from "../utils"
import ActionsArray from "./actions-array.jsx"
import ErrorMessages from "./error-messages.jsx"
import NotAllowedModal from "./not-allowed-modal.jsx"

const validate = values => {
    const errors = {}
    //cannotBeEmptyValidator(values, errors, "weightIncDecAmount")
    //mustBePositiveNumberValidator(values, errors, "weightIncDecAmount")
    return errors
}

class SettingsForm extends React.Component {

    componentWillUnmount() {
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        const {
            fields: {
                weightUom,
                sizeUom,
                distanceUom,
                weightIncDecAmount
            },
            settings,
            userVerifiedAt,
            markSettingsForEdit,
            cancelSettingsEdit,
            handleSubmit,
            requestInProgress,
            responseStatus,
            navigateTo,
            clearErrors,
            editMode,
            rErrorMask
        } = this.props
        const settingsId = settings.payload["usersettings/id"]
        const actionArray = <ActionsArray
                                entityType="user settings"
                                msgIfDisabled="account closed - 'Edit' disabled"
                                editMode={editMode}
                                entityId={settingsId}
                                accountStatuses={this.props.accountStatuses}
                                cancelEntityEdit={cancelSettingsEdit}
                                requestInProgress={requestInProgress}
                                markEntityForEdit={markSettingsForEdit} />
        const errors = []
        return (
        <div>
            <NotAllowedModal
                  responseStatus={responseStatus}
                  navigateTo={navigateTo}
                  clearErrors={clearErrors} />
            <ErrorMessages errorMask={rErrorMask} errors={errors} />
            <form onSubmit={handleSubmit}>
                { actionArray }
                <Row><Col xs={12}><hr /></Col></Row>
                <RikerIntegerFormGroup
                    label="Weight adjustment amount"
                    field={weightIncDecAmount}
                    disabled={!editMode}
                    helpText="The amount to increase or decrease the weight by when recording sets." />
                <RikerSelectListFormGroup
                    label="Default weight units"
                    field={weightUom}
                    data={utils.WEIGHT_UNITS}
                    disabled={!editMode}
                    helpText="Default units used when logging reps or your body weight." />
                <RikerSelectListFormGroup
                    label="Default body part size units"
                    field={sizeUom}
                    data={utils.LENGTH_UNITS}
                    disabled={!editMode}
                    helpText="Default units used when logging your arm size, chest size, etc." />
                <Row><Col xs={12}><hr style={{ marginTop: 5, marginBottom: 15}}/></Col></Row>
                { actionArray }
            </form>
        </div>
        )
    }
}

export default reduxForm({
    form: SETTINGS_FORM,
    fields: ["weightUom", "sizeUom", "distanceUom", "weightIncDecAmount"],
    destroyOnUnmount: false,
    validate
})(SettingsForm)
