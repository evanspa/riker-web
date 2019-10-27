import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { replace, push, goBack } from 'react-router-redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { attemptResendVerificationEmail,
         accountVerificationEmailSentUserAck,
         attemptDownloadChangelog,
         bannerRemindLater,
         maintenanceAck,
         attemptDownloadPlan,
         changelogCountsViewed } from "../actions/action-creators"
import RikerHelmet from "../components/riker-helmet.jsx";
import { Image, Modal, PanelGroup, Well, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import SignUpForm from "../components/sign-up-form.jsx";
import RikerNavBar from "../components/riker-navbar.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import NavbarBanner from "../components/navbar-banner.jsx"

class AuthenticatedEnrollSynchronizePage extends React.Component {

    constructor(props, context) {
        super(props, context)
        const { userVerifiedAt } = this.props
        this.state = { wasUserUnverified:  userVerifiedAt == null,
                       showEmailVerificationNeeded: true }
    }

    render() {
        const {
            doGoBack,
            navigateTo,
            userPaidEnrollmentEstablishedAt,
            userPaidEnrollmentCancelledAt,
            resendVerificationEmail,
            accountVerificationEmailSentUserAck,
            indicateAccountVerificationEmailSent,
            downloadChangelogFn,
            responseStatus,
            requestInProgress,
            userEmail,
            userVerifiedAt,
            rErrorMask,
            changelogCounts,
            dismissChangelogReport,
            becameUnauthenticated
        } = this.props
        const alreadyEnrolled = userPaidEnrollmentEstablishedAt != null && userPaidEnrollmentCancelledAt == null
        return (
            <div>
                <RikerHelmet title="Synchronize Account" />
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
                    dismissChangelogReport={() => {
                            dismissChangelogReport(!this.state.wasUserUnverified && userVerifiedAt != null && !alreadyEnrolled)
                        }}
                    alreadySynchronizedMessage={userVerifiedAt == null ? "Your email is still not verified." : null}
                    alreadySynchronizedImage={userVerifiedAt == null ? "blue-info-30x30.svg" : null}
                    dismissChangelogReportButtonLabel={userVerifiedAt == null || this.state.wasUserUnverified || alreadyEnrolled ? "Close" : "Continue to payment information"} />
                <Modal
                    show={this.state.wasUserUnverified && userVerifiedAt != null && _.isEmpty(changelogCounts)}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/green-checkmark-30x30.svg" style={{marginRight: 8}} />
                                <div>Email Address Verified</div>
                            </div>
                        </Modal.Title>
                        <Modal.Body>
                            <p>Thank you, your email address is verified.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default"
                                      onTap={() => {
                                              navigateTo(urls.AUTHENTICATED_ENROLL_PAYMENT_URI)
                                          }}>Continue to payment information</Tappable>
                        </Modal.Footer>
                    </Modal.Header>
                </Modal>
                <Modal
                    show={alreadyEnrolled && _.isEmpty(changelogCounts)}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                <div>Already Enrolled!</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Looks like you already have a Riker subscription.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => navigateTo(urls.ACCOUNT_URI)}>Go to My Account</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={indicateAccountVerificationEmailSent}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                            <div>Verificaton email sent to you at <strong>{userEmail}</strong>.</div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => accountVerificationEmailSentUserAck()}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={userVerifiedAt == null && this.state.showEmailVerificationNeeded}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/yellow-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Email address not verified</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your email address, <strong>{userEmail}</strong>, has not been verified.</p>
                        <p>In order to enroll in a Riker subscription, we need you to verify your email address by clicking the link in your welcome email.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <div><Tappable className="btn btn-sm btn-default" onTap={() => this.setState({showEmailVerificationNeeded: false})}>Close</Tappable></div>
                        <div><Tappable style={{marginTop: 10}} className="btn btn-sm btn-default" onTap={resendVerificationEmail}>Re-send Verification Email</Tappable></div>
                        <div>
                            <Tappable style={{marginTop: 10}} className="btn btn-lg btn-primary" onTap={downloadChangelogFn}>Synchronize Your Account</Tappable>
                        </div>
                        <div style={{fontSize: ".85em", marginTop: 5}}>Verified now?  Synchronize your account.</div>
                    </Modal.Footer>
                </Modal>
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Riker Subscription Enrollment</h1>
                    <div className="breadcrumb" style={{fontSize: 12, marginBottom: 15}}>
                        <strong>Synchronize Account</strong><span className="signup-step">&nbsp;&#8594;&nbsp;Enter Payment Info&nbsp;&#8594;&nbsp;Finished</span>
                    </div>
                    <p style={{marginTop: 25}}>To begin, lets go ahead and synchronize your account.</p>
                    <hr />
                    <div style={{marginTop: 15}}>
                        <Tappable onTap={() => { if (!requestInProgress) { doGoBack() }}}
                                  className="btn btn-sm btn-default"
                                  disabled={requestInProgress}>Cancel</Tappable>
                    </div>
                    <div style={{marginTop: 10}}>
                        <Tappable onTap={() => {
                                if (!requestInProgress) {
                                    if (userVerifiedAt == null) {
                                        this.setState({showEmailVerificationNeeded: true})
                                    } else {
                                        downloadChangelogFn()
                                    }
                                }}}
                                  component="button"
                                  disabled={requestInProgress}
                                  className="btn btn-lg btn-primary">Synchronize Your Account</Tappable>
                    </div>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
AuthenticatedEnrollSynchronizePage.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        responseStatus: state.api.responseStatus,
        requestInProgress: state.api.requestInProgress,
        rErrorMask: state.api.rErrorMask,
        userEmail: state.serverSnapshot["user/email"],
        userVerifiedAt: state.serverSnapshot["user/verified-at"],
        userPaidEnrollmentEstablishedAt: state.serverSnapshot["user/paid-enrollment-established-at"],
        userPaidEnrollmentCancelledAt: state.serverSnapshot["user/paid-enrollment-cancelled-at"],
        changelogCounts: state.changelogCounts,
        indicateAccountVerificationEmailSent: state.api.indicateAccountVerificationEmailSent,
        becameUnauthenticated: state.becameUnauthenticated,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doGoBack: () => dispatch(goBack()),
        navigateTo: url => dispatch(push(url)),
        dismissChangelogReport: (transitionToCompletePage) => {
            dispatch(changelogCountsViewed())
            if (transitionToCompletePage) {
                dispatch(attemptDownloadPlan(urls.AUTHENTICATED_ENROLL_PAYMENT_URI))
            }
        },
        resendVerificationEmail: () => dispatch(attemptResendVerificationEmail()),
        accountVerificationEmailSentUserAck: () => dispatch(accountVerificationEmailSentUserAck()),
        downloadChangelogFn: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from enrollment sync account page")
            dispatch(attemptDownloadChangelog(null))
        },
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedEnrollSynchronizePage)
