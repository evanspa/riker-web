import React from "react"
import { Well, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

export default class PasswordResetEmailSentPage extends React.Component {
    render() {
        return (
            <div>
                <RikerHelmet title="Password Reset Email Sent" />
                <RikerNavBar />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Password Reset Email Sent</h1>
                    <Well>
                        You will receive an email shortly from Riker containing a link you can use to reset your password.
                    </Well>
                </Col>
            </div>
        );
    }
}
