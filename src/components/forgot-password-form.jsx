import React from "react"
import { Label, Button, Row, Col } from "react-bootstrap"
import { reduxForm } from "redux-form"
import { RikerTextFormGroup } from "./form-input.jsx"
import { cannotBeEmptyValidator, mustBeEmailValidator } from "../utils"
import ErrorMessages from "./error-messages.jsx"
import * as errFlags from "../error-flags"
import * as utils from "../utils"
import { toastr } from 'react-redux-toastr'
import Tappable from "react-tappable"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "email")
    mustBeEmailValidator(values, errors, "email")
    return errors
}

class ForgotPasswordForm extends React.Component {

    componentWillUnmount() {
        toastr.clean()
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        const {
            fields: { email },
            responseStatus,
            requestInProgress,
            handleSubmit,
            rErrorMask,
        } = this.props
        const errors = [
            { flag: errFlags.PWD_RESET_UNKNOWN_EMAIL,
              message: "Unknown email address." },
            { flag: errFlags.PWD_RESET_UNVERIFIED_ACCOUNT,
              message: "Unverified account." },
            { flag: errFlags.PWD_RESET_TRIAL_AND_GRACE_EXPIRED,
              message: "Trial account expired.  Please contact " + utils.SUPPORT_EMAIL}
        ]
        return (
            <div>
                <ErrorMessages
                    errorMask={rErrorMask}
                    errors={errors}
                    marginTop={20}/>
                <form onSubmit={handleSubmit}>
                    <RikerTextFormGroup
                        label="Email"
                        type="email"
                        field={email} />
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Tappable
                            style={{marginTop: 10}}
                            type="submit"
                            component="Button"
                            className="btn btn-lg btn-primary"
                            disabled={requestInProgress}>Submit</Tappable>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "forgotpassword",
    fields: ["email"],
    validate
})(ForgotPasswordForm)
