import React from "react"
import ReactDOM from "react-dom"
import RikerHelmet from "../components/riker-helmet.jsx"
import { PanelGroup, Col, Panel } from "react-bootstrap"
import * as gvs from "../grid-vals"
import RikerNavBar from "../components/riker-navbar.jsx"
import * as urls from "../urls"
import * as utils from "../utils"
import FaqContent from "../components/faq-content.jsx"

export default class FaqPage extends React.Component {
    render() {
        return (
            <div>
                <RikerHelmet
                    title="Riker FAQ"
                    description="Frequently asked questions about Riker." />
                <RikerNavBar />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <FaqContent containerUrl={urls.FAQ_URI} />
                </Col>
            </div>
        )
    }
}
