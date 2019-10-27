import React from "react"
import { Label, Button, Row, Col } from "react-bootstrap"
import { reduxForm } from "redux-form"
import { RikerTextFormGroup, RikerFormGroup } from "./form-input.jsx"
import ErrorMessages from "./error-messages.jsx"
import { toastr } from 'react-redux-toastr'
import * as utils from "../utils"
import _ from "lodash"
import Tappable from "react-tappable"

const validate = values => {
    const errors = {}
    utils.cannotBeEmptyValidator(values, errors, "password")
    utils.cannotBeEmptyValidator(values, errors, "confirmPassword")

    // only check they match if there are no other errors associated
    // with either of them
    if (_.isEmpty(errors.password) && _.isEmpty(errors.confirmPassword)) {
        if (values.password != values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match."
        }
    }
    return errors
}

class ResetPasswordForm extends React.Component {

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
                password,
                confirmPassword
            },
            location,
            rErrorMask,
            responseStatus,
            requestInProgress,
            handleSubmit
        } = this.props
        return (
            <div>
                <div style={{marginTop: 20}}>
                    <ErrorMessages errorMask={rErrorMask} errors={utils.PWD_RESET_ERRORS} />
                </div>
                <form onSubmit={handleSubmit}>
                    <RikerTextFormGroup
                        label="New password"
                        type="password"
                        field={password} />
                    <RikerFormGroup
                        label="Confirm password"
                        type="password"
                        field={confirmPassword} />
                    <Tappable style={{marginTop: 10}} type="submit" component="Button" className="btn btn-lg btn-primary" disabled={requestInProgress}>Submit</Tappable>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "resetpassword",
    fields: ["password", "confirmPassword"],
    validate
})(ResetPasswordForm)
