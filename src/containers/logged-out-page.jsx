import React from "react"
import { Link } from "react-router"
import { Well, Breadcrumb, Col, Panel } from "react-bootstrap"
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBarBare from "../components/riker-navbar-bare.jsx"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

export default class LoggedOutPage extends React.Component {
     render() {
        return (
            <div>
                <RikerHelmet title="Logged Out of Riker" />
                <RikerNavBarBare />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">You've been logged out of Riker.</h1>
                    <Well>
                        <p><Link to={urls.LOGIN_URI + "?showSocialLogin=true"}>Log back in.</Link></p>
                        <p><Link to={urls.ROOT_URI}>Riker Home.</Link></p>
                    </Well>
                </Col>
            </div>
        );
     }
}
