import React from "react"
import { Link } from "react-router"
import { PanelGroup, Panel } from "react-bootstrap"
import * as utils from "../utils"
import * as urls from "../urls"

export default class RikerAccountBenefits extends React.Component {
    render() {
        const { containerUrl } = this.props
        return (
            <PanelGroup style={{marginTop: 5, marginBottom: 5}} accordion id="riker-account-benefits">
                <Panel eventKey="0">
                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "account-benefit-safe-storage")} />
                    <Panel.Heading>
                        <Panel.Title toggle>Safe storage of your data</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <p>With a Riker account, your data is safely and securely stored on our servers, making it accessible to all your devices.</p>
                    </Panel.Body>
                </Panel>
                <Panel eventKey="1">
                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "account-benefit-syncable")} />
                    <Panel.Heading>
                        <Panel.Title toggle>Syncable to all your devices</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <p>With a Riker account, your data is stored on our servers where it is <strong>accessible and syncable</strong> to all your devices, including:</p>
                        <ul style={{marginTop: 10}}>
                            <li>iPhones and iPads</li>
                            <li>Android phones and tablets</li>
                            <li>Kindle Fire</li>
                            <li>Web</li>
                        </ul>
                    </Panel.Body>
                </Panel>
                <Panel eventKey="2">
                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "account-benefit-web-access")} />
                    <Panel.Heading>
                        <Panel.Title toggle>Web access</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <p>With a Riker account, your data is stored on our servers where it is accessible to all your devices.</p>
                        <p>When interacting with Riker through a web browser, you're <strong>directly accessing your Riker data on our servers.</strong></p>
                    </Panel.Body>
                </Panel>
            </PanelGroup>
        )
    }
}
