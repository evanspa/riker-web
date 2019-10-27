import React from "react"
import { Button, Row, Col, Label } from "react-bootstrap"
import { reduxForm } from "redux-form"
import { RikerTextFormGroup, RikerFormGroup } from "./form-input.jsx"
import { cannotBeEmptyValidator, mustBeEmailValidator } from "../utils"
import * as errFlags from "../error-flags"
import { toastr } from 'react-redux-toastr'
import Tappable from "react-tappable"
import * as utils from "../utils"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "email")
    mustBeEmailValidator(values, errors, "email")
    cannotBeEmptyValidator(values, errors, "password")
    return errors
}

class SignUpForm extends React.Component {

    componentWillUnmount() {
        toastr.clean()
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        const { fields: {name, email, password},
                requestInProgress,
                rErrorMask,
                handleSubmit } = this.props
        return (
            <div>
                { (() => {
                      if (rErrorMask != null) {
                          if (rErrorMask & errFlags.SAVE_USER_EMAIL_AlREADY_REGISTERED) {
                              return (
                                  <h4 style={{marginTop: 20}}><Label bsStyle="danger">An account with that email already exists.</Label></h4>
                              )
                          }
                      }
                      return ""

                })()
                }
                <form onSubmit={handleSubmit}>
                    <RikerFormGroup
                        label="Email"
                        type="email"
                        autoComplete="username"
                        field={email} />
                    <RikerFormGroup
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        field={password} />
                    <Tappable
                        style={{marginTop: 10}}
                        type="submit"
                        component="Button"
                        className="btn btn-lg btn-primary"
                        disabled={requestInProgress}>Start {utils.FREE_TRIAL_PERIOD_IN_DAYS}-day Free Trial</Tappable>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "signup",
    fields: ["name", "email", "password"],
    validate
})(SignUpForm)
