import React from "react"
import { Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBarBare from "../components/riker-navbar-bare.jsx"
import _ from "lodash"
import * as errFlags from "../error-flags"
import ErrorMessages from "../components/error-messages.jsx"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"

export default class PasswordResetPrepareErrorPage extends React.Component {
    render() {
        const { rErrorMask } = this.props.params
        return (
            <div>
                <RikerHelmet title="Password Reset Error" />
                <RikerNavBarBare />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Password Reset Error</h1>
                    <div>
                        <p style={{fontSize: 20}}>There was a problem attempting to reset your password.</p>
                    </div>
                    {(() => {
                         if (rErrorMask != null) {
                             return (
                                 <div style={{marginTop: 15}}>
                                     <div style={{marginBottom: 5}}>Error message(s) from the server:</div>
                                     <ErrorMessages errorMask={rErrorMask} errors={utils.PWD_RESET_ERRORS} />
                                 </div>
                             )
                         }
                     })()
                    }
                    <div style={{marginTop: 15}}>
                        <p style={{fontSize: 20}}><Link to={urls.FORGOT_PASSWORD_URI}>Get a new password reset link.</Link></p>
                    </div>
                </Col>
            </div>
        );
    }
}
