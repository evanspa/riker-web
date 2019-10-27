import React from "react"
import { Link } from "react-router"
import { PanelGroup, Panel } from "react-bootstrap"
import * as utils from "../utils"
import * as urls from "../urls"

export default class PostTrialChoices extends React.Component {
    render() {
        const { containerUrl, reenroll } = this.props
        return (
            <PanelGroup style={{marginTop: 5, marginBottom: 5}} accordion id="post-trial-choices">
                <Panel
                    bsStyle="default"
                    eventKey="0">
                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "post-trial-choice-enroll-in-subscription")} />
                    <Panel.Heading>
                        <Panel.Title toggle>{reenroll ? "1. Re-enroll in a subscription" : "1. Enroll in a subscription"}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        {(() => {
                             if (this.props.enrollUrl != null) {
                                 return (
                                     <p>
                                         <Link to={this.props.enrollUrl}>{reenroll ? "Re-enroll in a Riker subscription" : "Enroll in a Riker subscription"}</Link> {reenroll ? " and enjoy the benefits of having a Riker account." : " and continue to enjoy the benefits of having a Riker account."}
                                     </p>
                                 )
                             } else {
                                 return (
                                     <p>{reenroll ? "Re-enroll in a Riker subscription and enjoy the benefits of having a Riker account." : "Enroll in a Riker subscription and continue to enjoy the benefits of having a Riker account."}</p>
                                 )
                             }
                        })()
                        }
                        <p>The cost is <strong>${utils.COST_IN_USD} per year</strong>.</p>
                    </Panel.Body>
                </Panel>
                <Panel
                    bsStyle="default"
                    eventKey="1">
                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "post-trial-choice-anonymous-in-app")} />
                    <Panel.Heading>
                        <Panel.Title toggle>2. Just use the app</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <p>100% of Riker's features are available in the phone and tablet apps, and those apps store all of your data locally to the device.  If you're comfortable with all of your Riker data being stored on your device, then this may be a viable option for you (and is completely free since the Riker apps are free).</p>
                        <p>Riker's export / import functionality can be used to manually backup your data, or transfer it to another device.</p>
                    </Panel.Body>
                </Panel>
            </PanelGroup>
        )
    }
}
