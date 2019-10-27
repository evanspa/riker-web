import React from "react"
import RikerHelmet from "../components/riker-helmet.jsx"
import { Col } from "react-bootstrap"
import RikerNavBar from "../components/riker-navbar.jsx"
import * as gvs from "../grid-vals"

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <div>
                <RikerHelmet title="Not Found" />
                <RikerNavBar />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h4>Page not found.</h4>
                </Col>
            </div>
        );
    }
}
