import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import { Modal, Image, Jumbotron, Col, Row } from "react-bootstrap"
import * as utils from "../utils"
import RikerNavBar from "../components/riker-navbar.jsx"
import * as urls from "../urls"
import * as gvs from "../grid-vals"
import Tappable from "react-tappable"
import FacebookLogin from "react-facebook-login"
import { attemptContinueWithFacebook } from "../actions/action-creators"
import _ from "lodash"

class UnauthenticatedHomePage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            screenWidth: 0,
            showDontWantAccountModal: false
        }
    }

    componentDidMount() {
        this.setState({
            screenWidth: utils.screenWidth()
        })
    }

    render() {
        const { navigateTo } = this.props
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
                <Modal
                    show={this.state.showDontWantAccountModal}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                <div>Don't want to create an account just yet?  No problem.</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Download the free Riker app from the App Store and start using it.</p>
                        <p>You don't need an account to use the Riker app, and you still get all the features.</p>
                        <p style={{textDecoration: "italic"}}>(and there are no annoying ads in Riker)</p>
                        <p>
                            <a href={"https://itunes.apple.com/us/app/riker/id" + process.env.APPLE_ID + "?mt=8"} style={{marginRight: 0}}>
                                <Image style={{marginTop: 10}} src="/images/Download_on_the_App_Store_Badge_US-UK_135x40.svg" />
                            </a>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default"
                                  style={{marginRight: 10, marginBottom: 10}}
                                  onTap={() => this.setState({ showDontWantAccountModal: false })}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <RikerHelmet
                    title="Riker - Track your strength"
                    description="Track your reps while strength training, and get plenty of charts to visualize your progress." />
                <Col xs={gvs.XS}
                     xsOffset={gvs.XS_OFFSET}
                     className="home-img-section">
                    <Col lg={6} lgOffset={3}
                         md={8} mdOffset={2}
                         sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                         xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                        <div className="logo-container">
                            <div className="dumbbell-icon" />
                        </div>
                        <div style={{textAlign: "center", marginBottom: 0}}>
                            <div className="homeTitle" style={{verticalAlign: "middle"}}>Riker</div>
                        </div>
                        <div style={{textAlign: "center", marginBottom: 30}}>
                            <span className="homePrimaryCaption">Track your strength.</span>
                        </div>
                        <div style={{textAlign: "center", marginBottom: 30}}>
                            <div style={{marginTop:15}}>
                                <FacebookLogin
                                    appId={process.env.FACEBOOK_APP_ID}
                                    textButton="Continue with Facebook"
                                    cssClass="facebook-btn btn btn-lg unauth-home-btn"
                                    tag="button"
                                    fields="id,email"
                                    scope="public_profile"
                                    autoLoad={false}
                                    disableMobileRedirect={true}
                                    callback={response => {
                                            if (_.has(response, "id")) {
                                                this.props.handleFacebookResponse(response)
                                            }
                                    }}
                                />
                            </div>
                            <div style={{marginTop: 15}}>
                                <Tappable
                                    className="btn btn-lg unauth-home-btn"
                                    style={{backgroundColor: "#66ACEA", color: "#fff"}}
                                    onTap={() => navigateTo(urls.SIGNUP_URI)}>
                                    Sign up with email
                                </Tappable>
                            </div>
                            <Tappable
                                style={{fontSize: "x-small",
                                        color: "white",
                                        textDecoration: "underline",
                                        marginTop: 3}}
                                onTap={() => this.setState({ showDontWantAccountModal: true })}>
                                Don't want to create an account?
                            </Tappable>
                            <div className="riker-centered-div"
                                 style={{width: utils.respVal(this.state.screenWidth, 285, 285, 250, 250, 245),
                                         backgroundColor: "white",
                                         height: 3,
                                         marginTop: 15,
                                         marginBottom: 15}} />
                            <div style={{marginTop: 15}}>
                                <Tappable
                                    className="btn btn-lg unauth-home-btn"
                                    style={{backgroundColor: "#66ACEA", color: "#fff"}}
                                    onTap={() => navigateTo(urls.LOGIN_URI)}>
                                    Log in with email
                                </Tappable>
                            </div>
                            <div style={{fontSize: "x-small",
                                         color: "white",
                                         marginLeft: 50,
                                         marginRight:50,
                                         marginTop: 3}}>
                                Already have a Riker account using email and password?  Log in here.
                            </div>
                            <p style={{textAlign: "center", marginTop: 10}}>
                                {/* <a href="#" style={{marginRight: 10}}>
                                    <Image style={{marginTop: 10}} src="/images/google-play-badge.png" />
                                    </a> */}
                                <a href={"https://itunes.apple.com/us/app/riker/id" + process.env.APPLE_ID + "?mt=8"} style={{marginRight: 0}}>
                                    <Image style={{marginTop: 10}} src="/images/Download_on_the_App_Store_Badge_US-UK_135x40.svg" />
                                </a>
                            </p>
                            <div>
                                <div style={{fontSize: "x-small", color: "white", marginTop: 1}}>Free app.</div>
                                <div style={{fontSize: "x-small", color: "white", marginTop: 1}}>iPhone, iPad, Watch.</div>
                                <div style={{fontSize: "x-small", color: "white", marginTop: 1}}>No ads.</div>
                                <div style={{fontSize: "x-small", color: "white", marginTop: 1}}>No sign-up required.</div>
                            </div>
                        </div>
                    </Col>
                </Col>
                <Featurette>
                    <div className="row featurette" style={{marginTop: 20, marginBottom: 20}}>
                        <Col>
                            <p className="lead" style={{color: "#FFF"}}>
                                Riker is an app for tracking your reps in the gym and tracking your body measurements.
                            </p>
                            <p className="lead" style={{color: "#FFF"}}>
                                Riker is <strong>simple</strong>.  An easy-to-use interface and makes no assumptions about how you structure your workouts.
                            </p>
                        </Col>
                        <Col>
                            <Image style={{display: "inline", marginRight: 15, marginBottom: 15}} src={utils.respImage("enter-reps-screenshot-iphone", screenWidth)} responsive />
                            <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("enter-arm-size-screenshot-iphone", screenWidth)} responsive />
                        </Col>
                    </div>
                </Featurette>
                <Featurette>
                    <div className="row featurette" style={{marginTop: 5, marginBottom: 20}}>
                        <Col>
                            <h2 className="featurette-heading" style={{color: "#FFF"}}>From your watch.</h2>
                            <p className="lead" style={{color: "#FFF"}}>Track your reps from the convenience of your Apple Watch.</p>
                        </Col>
                        <Col>
                            <Image style={{display: "inline", marginRight: 15, marginBottom: 15}} src={utils.respImage("enter-reps-screenshot-watch-1", screenWidth)} responsive />
                            <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("enter-reps-screenshot-watch-2", screenWidth)} responsive />
                        </Col>
                    </div>
                </Featurette>
                <Featurette>
                    <div className="row featurette" style={{marginTop: 5, marginBottom: 20}}>
                        <Col>
                            <h2 className="featurette-heading" style={{color: "#FFF"}}>Your progress, visualized.</h2>
                            <p className="lead" style={{color: "#FFF"}}>Riker provides plenty of charts and visuals to give you a clear picture of your progress.</p>
                        </Col>
                        <Col>
                            <Image style={{display: "inline", marginRight: 15, marginBottom: 15}} src={utils.respImage("line-chart-screenshot-iphone", screenWidth)} responsive />
                            <Image style={{display: "inline", marginBottom: 15}} src={utils.respImage("pie-chart-screenshot-iphone", screenWidth)} responsive />
                        </Col>
                    </div>
                </Featurette>
                <Featurette>
                    <div className="row featurette" style={{marginTop: 5, marginBottom: 20}}>
                        <h2 className="featurette-heading" style={{color: "#FFF"}}>No sign-up necessary.</h2>
                        <p className="lead" style={{color: "#FFF"}}>There is no obligation to sign-up for a Riker account.  To get started, download the free Riker app on the App Store and just start using it.</p>
                    </div>
                </Featurette>
                <Featurette>
                    <div className="row featurette" style={{marginTop: 20, marginBottom: 20}}>
                        <p className="lead" style={{color: "#FFF"}}>Riker stays in sync across all your Apple devices, and the Riker web-based app.&nbsp;&nbsp;<em>Android coming soon</em></p>
                        {/* <p className="lead" style={{color: "#FFF"}}>Riker stays in sync across all your devices.  There are fast and easy to use apps for the web, Android phones and tablets, Android Wear, iPhone, iPad and Apple Watch and Kindle Fire.</p> */}
                        <p style={{textAlign: "center"}}>
                            {/* <a href="#" style={{marginRight: 10}}>
                                <Image style={{marginTop: 10}} src="/images/google-play-badge.png" />
                                </a> */}
                            <a href={"https://itunes.apple.com/us/app/riker/id" + process.env.APPLE_ID + "?mt=8"} style={{marginRight: 0}}>
                                <Image style={{marginTop: 10}} src="/images/Download_on_the_App_Store_Badge_US-UK_135x40.svg" />
                            </a>
                        </p>
                    </div>
                </Featurette>
            </div>
        )
    }
}

UnauthenticatedHomePage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        navigateTo: url => dispatch(push(url)),
        handleFacebookResponse: facebookResponse => dispatch(attemptContinueWithFacebook(facebookResponse, null)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnauthenticatedHomePage)
