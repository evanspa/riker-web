import React from "react"
import { Link } from "react-router"
import { PanelGroup, Panel } from "react-bootstrap"
import * as urls from "../urls"
import * as utils from "../utils"

export default class TosContent extends React.Component {
    render() {
        const {
            containerUrl
        } = this.props
        const commonTopMargin = 15
        const listItemFontSize = "95%"
        const listItemTopMargin = 8
        let eventKey = 0
        return (
            <div>
                <h3 className="page-heading">Frequently Asked Questions</h3>
                <PanelGroup accordion id="faq-content">
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-what-is-riker")} />
                        <Panel.Heading>
                            <Panel.Title toggle>What is Riker?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>Riker is an application for tracking your reps while strength training.&nbsp;&nbsp;Several charts are provided to visualize the change in your strength and other metrics.</p>
                            <p>Riker also allows you to track several body measurements, including body weight, arm size, chest size and more.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-tracking")} />
                        <Panel.Heading>
                            <Panel.Title toggle>What can I track with Riker?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>Riker currently tracks 3 primary metrics:</p>
                            <ol>
                                <li><strong>Weight lifted</strong>.</li>
                                <li><strong>Reps</strong>.</li>
                                <li><strong>Rest Time Between Sets</strong>.</li>
                            </ol>
                            <p>Riker provides several line and pie charts for each of these 3 metrics.</p>
                            <p>Riker also allows you to track several body measurements, including body weight, arm size, chest size and more.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-how-different")} />
                        <Panel.Heading>
                            <Panel.Title toggle>How is Riker different than other workout trackers?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>Simplicity.&nbsp;&nbsp;Riker simply allows you to start tracking your sets.&nbsp;&nbsp;You do not have to create a <i>routine</i> or <i>workout</i> in Riker.&nbsp;&nbsp;Riker does not assume HOW you organize your workouts.&nbsp;&nbsp;Instead, you just start using it to record your sets and body measurements.</p>
                            <p>Riker does not attempt to be an all-in-one fitness tracker.&nbsp;&nbsp;Riker focuses on tracking your strength, and relevant body measurements.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-only-for-advanced")} />
                        <Panel.Heading>
                            <Panel.Title toggle>Is Riker only for advanced lifters?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>Absolutely not.&nbsp;&nbsp;Riker can be used by anyone - both beginners and long-time lifters alike, to track their strength.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-cost-anything")} />
                        <Panel.Heading>
                            <Panel.Title toggle>Does Riker cost anything?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>The Riker iPhone and iPad app is free to download from the App Store.&nbsp;&nbsp;If you would like your Riker data to be syncable to all your devices and stored on Riker's servers, you can create a Riker account subscription.</p>
                            <p>The cost is <strong>${utils.COST_IN_USD} per year</strong>.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-account-from-other-devices")} />
                        <Panel.Heading>
                            <Panel.Title toggle>If I purchase an account subscription inside the iPhone or iPad app, can I access my account from other devices?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>Yes.&nbsp;&nbsp;If you create an account subscription from the iPhone or iPad app, you can log in from any device, and you can access the Riker web application.&nbsp;&nbsp;If you create an account subscription from the Riker web application, you will be able to login and access your account from the iPhone and iPad app.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-data-after-trial-expires")} />
                        <Panel.Heading>
                            <Panel.Title toggle>I created a free trial account.&nbsp;&nbsp;What happens to my data if I decide NOT to create a paid account subscription when the trial account expires?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>If you only use the Riker web application, you'll want to export your Riker data to CSV files.&nbsp;&nbsp;You can then install the Riker mobile app, and import your CSV data files.&nbsp;&nbsp;You can use the Riker mobile app just fine without having to log into an account.</p>
                            <p>If you are currently using the Riker mobile app, you can simply log out of your account.&nbsp;&nbsp;In the app, you'll be given the option to keep your data on your device.&nbsp;&nbsp;You can then continue to use the Riker app as normal.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-why-use-app")} />
                        <Panel.Heading>
                            <Panel.Title toggle>The Riker web app works great.&nbsp;&nbsp;Why should I use the Riker mobile app?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>While the Riker web app works great, there are several reasons to favor using the Riker apps.&nbsp;&nbsp;They are:</p>
                            <ul style={{marginTop: 10}}>
                                <li style={{fontSize: listItemFontSize, marginTop: listItemTopMargin}}><strong>The Riker app has an offline mode.</strong>&nbsp;&nbsp;When enabled, all saves (sets, body logs) are done locally in the app and are instantaneous  (no attempt is made to upload them to the Riker servers).&nbsp;&nbsp;Later, you can bulk upload your saves when it’s convenient.&nbsp;&nbsp;This is a great feature if you have a slow internet connection or no connection at all while you’re working out.&nbsp;&nbsp;Offline mode is only available in the mobile app.</li>
                                <li style={{fontSize: listItemFontSize, marginTop: listItemTopMargin}}><strong>Watch integration.</strong>&nbsp;&nbsp;Integration with Apple Watch requires that you have the Riker mobile app installed.</li>
                                <li style={{fontSize: listItemFontSize, marginTop: listItemTopMargin}}><strong>Continue using Riker in free mode beyond the Trial period.</strong>&nbsp;&nbsp;If you created a free trial account and after the trial period you decide to not create a paid account subscription, your only option to continue using Riker is with the mobile app.&nbsp;&nbsp;The website requires a login associated with a paid subscription.&nbsp;&nbsp;To switch over to using the mobile app, you can export your data from the website and import it into the mobile app.&nbsp;&nbsp;At this point you can use the mobile app in anonymous mode.</li>
                            </ul>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-offline-mode")} />
                        <Panel.Heading>
                            <Panel.Title toggle>My gym has poor Wifi.  Does the Riker app have an offline mode?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>Yes.  The Riker app has an <strong>Offline Mode</strong>.  When enabled, sets and body logs will be saved to your device locally.  Later, if you have a Riker account, you can bulk-sync your data to the Riker servers.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-watch-untether-mode")} />
                        <Panel.Heading>
                            <Panel.Title toggle>Will the Riker Watch app work when my iPhone is unreachable?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>Yes.  The Riker Watch app has an <strong>Untether Mode</strong>.  When enabled, sets and body logs will be saved to the Watch.  Later, you can bulk-sync your data to your iPhone.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-has-csv-export")} />
                        <Panel.Heading>
                            <Panel.Title toggle>Can I export my data to a CSV file?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>Yes.&nbsp;&nbsp;You can export your sets and body measurement logs to CSV files that you can import into a tool like Microsoft Excel.&nbsp;&nbsp;The export function is available in both the iPhone and iPad app, as well as the Riker web application.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-digitize-paper-journals")} />
                        <Panel.Heading>
                            <Panel.Title toggle>I have paper journals and spreadsheets of past workouts.&nbsp;&nbsp;How can I get them into Riker?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>When logging a set or body measurement log in Riker, you have the option to manually specify the date and time of the log.&nbsp;&nbsp;You can use this to manually input past workouts.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-have-ads")} />
                        <Panel.Heading>
                            <Panel.Title toggle>Does Riker have ads?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>No.&nbsp;&nbsp;The Riker phone and tablet apps do not have ads, and the Riker web application also does not have ads.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-ipad")} />
                        <Panel.Heading>
                            <Panel.Title toggle>Does Riker work on iPad?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>Yes.&nbsp;&nbsp;The Riker app is designed to work and look great on both iPhone and iPad.</p>
                        </Panel.Body>
                    </Panel>
                    <Panel style={{marginTop: commonTopMargin}} eventKey={eventKey++}>
                        <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "faq-apple-health-sync")} />
                        <Panel.Heading>
                            <Panel.Title toggle>Does the Riker iPhone app sync with Apple's Health app?</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <p>Yes.&nbsp;&nbsp;Riker will sync your recorded sets as <span style={{fontStyle: "italic"}}>workouts</span> to Apple's Health app.&nbsp;&nbsp;Riker will also sync your body weight logs.</p>
                        </Panel.Body>
                    </Panel>
                </PanelGroup>
            </div>
        )
    }
}
