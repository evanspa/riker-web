import React from "react"
import ReactDOM from "react-dom"
import RikerHelmet from "../components/riker-helmet.jsx"
import { Image, Col } from "react-bootstrap"
import * as gvs from "../grid-vals"
import * as utils from "../utils"
import RikerNavBar from "../components/riker-navbar.jsx"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

export default class TourPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { screenWidth: 0 }
    }

    componentDidMount() {
        this.setState({ screenWidth: utils.screenWidth() })
    }

    render() {
        const Featurette = props => (
            <Col
                xs={gvs.XS}
                xsOffset={gvs.XS_OFFSET}
                style={{backgroundColor: utils.RIKERAPP_BLACK_HEX, marginTop: 2}}>
                <Col lg={6} lgOffset={3}
                     md={8} mdOffset={2}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    {props.children}
                </Col>
            </Col>
        )
        const screenWidth = this.state.screenWidth
        return (
            <div>
                <RikerHelmet
                    title="Tour of Riker's features"
                    description="Take a brief tour of Riker's features.  Screenshots are provided of the Riker iPhone app, Apple Watch app and web app." />
                <RikerNavBar />
                <Col lg={6} lgOffset={3}
                     md={8} mdOffset={2}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Tour of Riker</h1>
                    <h2 className="page-heading">Entering Sets</h2>
                    <p>To enter a set, first drill down into the movement and variant (barbell, dumbbell, smith machine, etc).  Or you can search for your movement.</p>
                    <Tabs>
                        <TabList>
                            <Tab><span>iPhone</span></Tab>
                            <Tab><span>Apple Watch</span></Tab>
                            <Tab><span>Web</span></Tab>
                        </TabList>
                        <TabPanel>
                            <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("enter-reps-screenshot-iphone", screenWidth)} responsive />
                        </TabPanel>
                        <TabPanel>
                            <Col>
                                <Image style={{display: "inline", marginRight: 35, marginBottom: 15}} src={utils.respImage("enter-reps-screenshot-watch-1", screenWidth)} responsive />
                                <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("enter-reps-screenshot-watch-2", screenWidth)} responsive />
                            </Col>
                        </TabPanel>
                        <TabPanel>
                            <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("enter-reps-screenshot-web", screenWidth)} responsive />
                            <div><em>Access to Riker from the web requires an account.</em></div>
                        </TabPanel>
                    </Tabs>
                    <h2 className="page-heading" style={{marginTop: 15}}>Body Logs</h2>
                    <p>You can also track an array of body measurements.</p>
                    <Tabs>
                        <TabList>
                            <Tab><span>iPhone</span></Tab>
                            <Tab><span>Apple Watch</span></Tab>
                            <Tab><span>Web</span></Tab>
                        </TabList>
                        <TabPanel>
                            <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("what-to-measure-screenshot-iphone", screenWidth)} responsive />
                            <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("enter-arm-size-screenshot-iphone", screenWidth)} responsive />
                        </TabPanel>
                        <TabPanel>
                            <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("what-to-measure-screenshot-watch", screenWidth)} responsive />
                            <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("enter-arm-size-screenshot-watch", screenWidth)} responsive />
                        </TabPanel>
                        <TabPanel>
                            <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("what-to-measure-screenshot-web", screenWidth)} responsive />
                            <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("enter-arm-size-screenshot-web", screenWidth)} responsive />
                        </TabPanel>
                    </Tabs>
                    <h2 className="page-heading" style={{marginTop: 15}}>Charts</h2>
                    <p>Plenty of charts to visualize your progress.  Line and pie charts are provided to visual Riker's 3 primary metrics: <strong>weight lifted</strong>, <strong>number of reps</strong> and <strong>your rest time spent between sets</strong>.</p>
                    <Tabs>
                        <TabList>
                            <Tab><span>iPhone</span></Tab>
                            <Tab><span>Web</span></Tab>
                        </TabList>
                        <TabPanel>
                            <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("line-chart-screenshot-iphone", screenWidth)} responsive />
                            <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("pie-chart-screenshot-iphone", screenWidth)} responsive />
                        </TabPanel>
                        <TabPanel>
                            <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("line-chart-screenshot-web", screenWidth)} responsive />
                            <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("pie-chart-screenshot-web", screenWidth)} responsive />
                        </TabPanel>
                    </Tabs>
                    <h2 className="page-heading" style={{marginTop: 15}}>Offline Mode</h2>
                    <p>If you have a Riker trial account, or paid account subscription, Riker will sync your sets and body logs to the Riker servers as you create them.</p>
                    <p>Riker's <strong>Offline Mode</strong> is great when you have a slow internet connection, but still want to save new sets and body logs fast - especially when you're in the gym working out.</p>
                    <p>Later, when you have a good internet connection, you can bulk-upload all of your locally saved sets and body logs to your account.</p>
                    <Tabs>
                        <TabList>
                            <Tab><span>iPhone</span></Tab>
                        </TabList>
                        <TabPanel>
                            <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("offline-mode-screenshot-1-iphone", screenWidth)} responsive />
                            <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("offline-mode-screenshot-2-iphone", screenWidth)} responsive />
                        </TabPanel>
                    </Tabs>
                    <h2 className="page-heading" style={{marginTop: 15}}>Apple Watch Untether Mode</h2>
                    <p>The Riker Watch app works even when your iPhone is out of range of your Watch.</p>
                    <p>With Riker's <strong>Untether Mode</strong> enabled, any sets or body logs you create will be saved locally to your Watch only.</p>
                    <p>Later, when your iPhone is in range of your Watch, you can bulk-sync all of your saved sets and body logs to your iPhone.</p>
                    <Tabs>
                        <TabList>
                            <Tab><span>Apple Watch</span></Tab>
                        </TabList>
                        <TabPanel>
                            <div>
                                <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("untether-mode-screenshot-watch", screenWidth)} responsive />
                                <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("untether-mode-saved-locally-screenshot-watch", screenWidth)} responsive />
                                <div><em>Untether Mode can be configured in the Settings screen of Riker's Watch app.  When enabled, all saves will be done on the Watch, instantly.</em></div>
                            </div>
                            <div style={{marginTop: 20}}>
                                <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("untether-mode-home-screenshot-watch", screenWidth)} responsive />
                                <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("untether-mode-synced-screenshot-watch", screenWidth)} responsive />
                                <div><em>From the Riker Watch app home screen, any locally saved sets and body logs can later be bulk-synced to your iPhone.</em></div>
                            </div>
                        </TabPanel>
                    </Tabs>
                    <h2 className="page-heading" style={{marginTop: 20}}>Export</h2>
                    <p>You can export your set and body log data at any time to CSV files.</p>
                    <p>You can also import Riker CSV files..</p>
                    <Tabs>
                        <TabList>
                            <Tab><span>iPhone</span></Tab>
                            <Tab><span>Web</span></Tab>
                        </TabList>
                        <TabPanel>
                            <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("export-screenshot-iphone", screenWidth)} responsive />
                        </TabPanel>
                        <TabPanel>
                            <Image style={{display: "inline", marginRight: 25, marginBottom: 15}} src={utils.respImage("export-screenshot-web", screenWidth)} responsive />
                        </TabPanel>
                    </Tabs>
                </Col>
            </div>
        )
    }
}
