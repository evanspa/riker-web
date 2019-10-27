import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { goBack, replace, push } from 'react-router-redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { paymentTokenReceived,
         attemptSaveNewPaymentToken,
         paymentTokenSavedUserAck,
         maintenanceAck,
         changelogCountsViewed,
         bannerRemindLater,
         paymentTokenSaveErrorUserAck } from "../actions/action-creators"
import RikerHelmet from "../components/riker-helmet.jsx"
import { Image, Modal, PanelGroup, Well, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import SignUpForm from "../components/sign-up-form.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import StripeCheckoutEnroll from '../components/stripe-checkout-enroll.jsx'
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import NavbarBanner from "../components/navbar-banner.jsx"

class AuthenticatedEnrollPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            priceDiffUserHasAcked: false
        }
    }

    render() {
        const {
            doGoBack,
            navigateTo,
            userPaidEnrollmentEstablishedAt,
            userPaidEnrollmentCancelledAt,
            downloadChangelogFn,
            responseStatus,
            requestInProgress,
            userEmail,
            userVerifiedAt,
            rErrorMask,
            paymentTokenReceived,
            paymentTokenSaved,
            paymentTokenSaveError,
            paymentTokenSavedUserAck,
            paymentTokenSaveErrorUserAck,
            paymentToken,
            attemptSaveNewPaymentToken,
            changelogCounts,
            dismissChangelogReport,
            becameUnauthenticated,
            backToEnrollSynchronizePage,
            currentPlanPrice
        } = this.props
        return (
            <div>
                <RikerHelmet title="Payment" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    suppressBanner={true}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <ReauthenticateModal
                    showModal={becameUnauthenticated}
                    message="We need you to re-authenticate."
                    operationOnLightLoginSuccess={downloadChangelogFn} />
                {/* In case someone was able to manually get their browser to this page manually. */}
                <Modal
                    show={userVerifiedAt == null}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/yellow-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Account Not Verified</div>
                            </div>
                        </Modal.Title>
                        <Modal.Body>
                            <p>Oops.  Your account is not verified.  Need to take you back one step.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default" onTap={backToEnrollSynchronizePage}>Okay</Tappable>
                        </Modal.Footer>
                    </Modal.Header>
                </Modal>
                <Modal
                    show={paymentTokenSaveError}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/red-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Error</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>We're sorry, but there was a problem completing your enrollment.</p>
                        <p><strong>Your card has NOT been charged</strong>.</p>
                        <p>Please try again.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={paymentTokenSaveErrorUserAck}>Okay</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={paymentTokenSaved}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/green-checkmark-30x30.svg" style={{marginRight: 8}} />
                                <div>Enrollment Complete</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your Riker subscription has been created successfully.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => {
                                paymentTokenSavedUserAck(userPaidEnrollmentEstablishedAt != null && userPaidEnrollmentCancelledAt == null)
                        }}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={process.env.RIKER_SUBSCRIPTION_IN_CENTS != currentPlanPrice && !this.state.priceDiffUserHasAcked}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/yellow-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Recent Price Change</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>FYI, Riker's subscription price has recently changed.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => {
                                this.setState({priceDiffUserHasAcked: true});
                        }}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Riker Subscription Enrollment</h1>
                    <div className="breadcrumb" style={{fontSize: 12, marginBottom: 15}}>
                        <span className="signup-step">Synchronize Account&nbsp;&#8594;&nbsp;</span><strong>Enter Payment Info</strong><span className="signup-step">&nbsp;&#8594;&nbsp;Finished</span>
                    </div>
                    <p style={{marginTop: 25}}>The cost of a Riker subscription is <strong>${(currentPlanPrice / 100.0).toFixed(2)} per year</strong>.</p>
                    <PanelGroup style={{marginTop: 20, marginBottom: 25}} accordion id="is-payment-secure">
                        <Panel eventKey="0">
                            <Panel.Heading>
                                <Panel.Title>Is My Payment Information Secure?</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <p>Absolutely!</p>
                                <p>Riker uses <a target="_blank" href="https://stripe.com/customers">Stripe</a> to securely handle and process your payment information.</p>
                                <p>Your credit card number is stored by Stripe, an industry leading payments processor.</p>
                                <p>Stripe is certified to <strong>PCI Service Provider Level 1</strong>, the <strong>most stringent level of certification.</strong></p>
                            </Panel.Body>
                        </Panel>
                        <Panel style={{marginTop: 10}} eventKey="1">
                            <Panel.Heading>
                                <Panel.Title>Will I Get a Receipt?</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <p>Yes.</p>
                                <p>You will receive an email receipt for your payment from Stripe, Riker's payment processor.</p>
                            </Panel.Body>
                        </Panel>
                    </PanelGroup>
                    <hr />
                    <div style={{marginTop: 15}}>
                        <Tappable onTap={() => { if (!requestInProgress) { doGoBack() }}}
                                  className="btn btn-sm btn-default"
                                  disabled={requestInProgress}>Cancel</Tappable>
                    </div>
                    <div style={{marginTop: 10}}>
                        <StripeCheckoutEnroll
                            userEmail={userEmail}
                            disabled={requestInProgress}
                            currentPlanPrice={currentPlanPrice}
                            paymentTokenReceivedFn={paymentTokenReceived}
                            buttonLabel="Enter Payment Information" />
                        <p style={{fontSize: ".8em", fontStyle: "italic"}}>This will bring you to Stripe's payment form.</p>
                    </div>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
AuthenticatedEnrollPage.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        responseStatus: state.api.responseStatus,
        requestInProgress: state.api.requestInProgress,
        rErrorMask: state.api.rErrorMask,
        userEmail: state.serverSnapshot["user/email"],
        userVerifiedAt: state.serverSnapshot["user/verified-at"],
        userPaidEnrollmentEstablishedAt: state.serverSnapshot["user/paid-enrollment-established-at"],
        userPaidEnrollmentCancelledAt: state.serverSnapshot["user/paid-enrollment-cancelled-at"],
        currentPlanPrice: state.serverSnapshot["user/current-plan-price"],
        paymentTokenSaved: state.api.paymentTokenSaved,
        paymentTokenSaveError: state.api.paymentTokenSaveError,
        paymentToken: state.api.paymentToken,
        changelogCounts: state.changelogCounts,
        becameUnauthenticated: state.becameUnauthenticated,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doGoBack: () => dispatch(goBack()),
        navigateTo: url => dispatch(push(url)),
        backToEnrollSynchronizePage: () => dispatch(replace(urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI)),
        paymentTokenReceived: token => {
            dispatch(attemptSaveNewPaymentToken(token, "Completing enrollment..."))
        },
        paymentTokenSavedUserAck: transitionToCompletePage => {
            toastr.clean()
            dispatch(paymentTokenSavedUserAck())
            if (transitionToCompletePage) {
                dispatch(replace(urls.AUTHENTICATED_ENROLL_COMPLETE_URI))
            }
        },
        paymentTokenSaveErrorUserAck: () => dispatch(paymentTokenSaveErrorUserAck()),
        attemptSaveNewPaymentToken: paymentToken => dispatch(attemptSaveNewPaymentToken(paymentToken)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedEnrollPage)
