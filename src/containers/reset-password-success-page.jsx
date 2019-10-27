import React from "react"
import { Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBarBare from "../components/riker-navbar-bare.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

export default class ResetPasswordSuccessPage extends React.Component {
    render() {
        return (
            <div>
                <RikerHelmet title="Password Reset Successful" />
                <RikerNavBarBare />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Password Reset Successful</h1>
                    <div>
                        <p>Your password has been reset.</p>
                        <p><Link to={urls.LOGIN_URI}>Log In</Link>.</p>
                    </div>
                </Col>
            </div>
        );
    }
}
