import React from "react"
import { Label, Button, Row, Col } from "react-bootstrap"
import { reduxForm } from "redux-form"
import { RikerTextFormGroup, RikerFormGroup } from "./form-input.jsx"
import { cannotBeEmptyValidator, mustBeEmailValidator } from "../utils"
import { toastr } from 'react-redux-toastr'
import _ from "lodash"
import Tappable from "react-tappable"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "usernameOrEmail")
    mustBeEmailValidator(values, errors, "usernameOrEmail")
    cannotBeEmptyValidator(values, errors, "password")
    return errors
}

class LogInForm extends React.Component {

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
                usernameOrEmail,
                password
            },
            location,
            responseStatus,
            requestInProgress,
            handleSubmit
        } = this.props
        var serverErrorMessage = null
        if (!_.isNull(responseStatus) && responseStatus === 401) {
            serverErrorMessage = <h4 style={{marginTop: 20}}><Label bsStyle="danger">Login failed.  Try again.</Label></h4>
        }
        return (
            <div>
                { (!_.isNull(serverErrorMessage)) ? serverErrorMessage : "" }
                <form onSubmit={handleSubmit}>
                    <RikerTextFormGroup
                        label="Email"
                        type="email"
                        field={usernameOrEmail}
                        autoComplete="username" />
                    <RikerFormGroup
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        field={password} />
                    <Tappable style={{marginTop: 10}} type="submit" component="Button" className="btn btn-lg btn-primary" disabled={requestInProgress}>Log In</Tappable>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "login",
    fields: ["usernameOrEmail", "password"],
    validate
})(LogInForm)
