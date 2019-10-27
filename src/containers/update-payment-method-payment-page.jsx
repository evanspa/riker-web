import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { replace, push, goBack } from 'react-router-redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { attemptSaveNewPaymentToken,
         paymentTokenSavedUserAck,
         bannerRemindLater,
         maintenanceAck,
         attemptDownloadChangelog,
         paymentTokenSaveErrorUserAck,
         changelogCountsViewed } from "../actions/action-creators"
import RikerHelmet from "../components/riker-helmet.jsx"
import { Image, Modal, PanelGroup, Well, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import SignUpForm from "../components/sign-up-form.jsx";
import RikerNavBar from "../components/riker-navbar.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import StripeCheckoutEnroll from '../components/stripe-checkout-enroll.jsx'
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import StripeCheckout from 'react-stripe-checkout'
import NavbarBanner from "../components/navbar-banner.jsx"

class UpdatePaymentMethodPaymentPage extends React.Component {

    render() {
        const {
            doGoBack,
            navigateTo,
            userPaidEnrollmentEstablishedAt,
            userPaidEnrollmentCancelledAt,
            userLatestStripeTokenId,
            downloadChangelogFn,
            responseStatus,
            paymentTokenReceived,
            paymentTokenSaved,
            paymentTokenSavedUserAck,
            paymentTokenSaveError,
            paymentTokenSaveErrorUserAck,
            requestInProgress,
            userEmail,
            rErrorMask,
            changelogCounts,
            dismissChangelogReport,
            becameUnauthenticated
        } = this.props
        const enrolled = userPaidEnrollmentEstablishedAt != null && userPaidEnrollmentCancelledAt == null
        return (
            <div>
                <RikerHelmet title="Update Payment Method" />
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
                <ChangelogResultsModal
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={dismissChangelogReport} />
                <Modal
                    show={!enrolled && _.isEmpty(changelogCounts)}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/yellow-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Not Enrolled</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You currently do not have an active Riker subscription.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => navigateTo(urls.ACCOUNT_URI)}>Go to My Account</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={paymentTokenSaveError}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/yellow-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Error</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>We apologize for the inconvenience, but there was an error attempting to update your payment method.</p>
                        <p>Please try it again a little later.</p>
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
                                <div>Payment Method Updated</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your payment method has been updated successfully.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => {
                                paymentTokenSavedUserAck(enrolled)
                            }}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Update Payment Method</h1>
                    <div className="breadcrumb" style={{fontSize: 12, marginBottom: 15}}>
                        <span className="signup-step">Synchronize Account&nbsp;&#8594;&nbsp;</span><strong>Update Payment Method</strong><span className="signup-step">&nbsp;&#8594;&nbsp;Finished</span>
                    </div>
                    <p style={{marginTop: 25}}>Click the button below to update your payment method.</p>
                    <hr />
                    <div style={{marginTop: 15}}>
                        <Tappable onTap={() => { if (!requestInProgress) { doGoBack() }}}
                                  className="btn btn-sm btn-default"
                                  disabled={requestInProgress}>Cancel</Tappable>
                    </div>
                    <div style={{marginTop: 10}}>
                        <StripeCheckout
                            disabled={requestInProgress}
                            name="Riker"
                            image="https://www.rikerapp.com/images/logo-128x128.png"
                            description="Update Card Details"
                            ComponentClass="div"
                            allowRememberMe={false}
                            token={token => {
                                    // for some reason, this callback will get called sometimes
                                    // if user closes/cancel's the stripe checkout form (if they previously, in the same session, enrolled in Riker)...the resulting
                                    // token is the same token as previous stripe form interaction, so this check is done
                                    if (userLatestStripeTokenId != token.id) {
                                        paymentTokenReceived(token)
                                    }
                                }}
                            stripeKey={process.env.STRIPE_KEY}
                            email={userEmail}
                            billingAddress={true}
                            zipCode={true}>
                            <Tappable
                                disabled={requestInProgress}
                                className="btn btn-lg btn-success">Update Payment Method</Tappable>
                        </StripeCheckout>
                        <p style={{fontSize: ".8em", fontStyle: "italic"}}>This will bring you to Stripe's payment update form.</p>
                    </div>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
UpdatePaymentMethodPaymentPage.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        responseStatus: state.api.responseStatus,
        requestInProgress: state.api.requestInProgress,
        rErrorMask: state.api.rErrorMask,
        userEmail: state.serverSnapshot["user/email"],
        userLatestStripeTokenId: state.serverSnapshot["user/latest-stripe-token-id"],
        userPaidEnrollmentEstablishedAt: state.serverSnapshot["user/paid-enrollment-established-at"],
        userPaidEnrollmentCancelledAt: state.serverSnapshot["user/paid-enrollment-cancelled-at"],
        changelogCounts: state.changelogCounts,
        becameUnauthenticated: state.becameUnauthenticated,
        paymentTokenSaved: state.api.paymentTokenSaved,
        paymentTokenSaveError: state.api.paymentTokenSaveError,
        paymentToken: state.api.paymentToken,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doGoBack: () => dispatch(goBack()),
        navigateTo: url => dispatch(push(url)),
        dismissChangelogReport: () => dispatch(changelogCountsViewed()),
        downloadChangelogFn: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from update payment method payment page")
            dispatch(attemptDownloadChangelog(null))
        },
        paymentTokenReceived: token => {
            dispatch(attemptSaveNewPaymentToken(token, "Completing payment method update..."))
        },
        paymentTokenSavedUserAck: (transitionToCompletePage) => {
            toastr.clean()
            dispatch(paymentTokenSavedUserAck())
            if (transitionToCompletePage) {
                dispatch(replace(urls.UPDATE_PAYMENT_METHOD_COMPLETE_URI))
            }
        },
        paymentTokenSaveErrorUserAck: () => dispatch(paymentTokenSaveErrorUserAck()),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePaymentMethodPaymentPage)
