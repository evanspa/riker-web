import React from "react"
import { Button, Image, Col, Row, Modal } from "react-bootstrap"
import PostTrialChoices from "./post-trial-choices.jsx"
import Tappable from "react-tappable"
import * as urls from "../urls"
import * as utils from "../utils"
import moment from "moment"

export default class NavbarBanner extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { showTrialExpiredAboutModal: false,
                       showPaymentPastDueAboutModal: false,
                       showPaymentLapsedAboutModal: false,
                       showAccountCancelledAboutModal: false,
                       showUpcomingMaintenanceAboutModal: false,
                       showMaintenanceAboutModal: false }
    }

    render() {
        let banners = []
        const {
            accountStatuses,
            navigateTo,
            redisplayBannerAfter,
            remindMeLaterFn,
            maintenanceAckFn
        } = this.props
        const [
            hasTrialAccount,
            isTrialPeriodAlmostExpired,
            isTrialPeriodExpired,
            hasPaidAccount,
            isPaymentPastDue,
            userTrialEndsAt,
            userTrialEndsAtMoment,
            userPaidEnrollmentEstablishedAt,
            userPaidEnrollmentCancelledAt,
            finalFailedPaymentAttemptOccurredAt,
            informedOfMaintenanceAtMoment,
            maintenanceStartsAtMoment,
            maintenanceDuration,
            maintenanceEndsAtMoment,
            maintenanceAckAtMoment,
            hasPaidIapAccount,
            validateAppStoreReceiptAt
        ] = accountStatuses
        let suppressBanner = false
        if (this.props.suppressBanner != null) {
            suppressBanner = this.props.suppressBanner
        }
        const now = moment()
        const displayUpcomingMaintenanceBanner = utils.displayUpcomingMaintenanceBanner(accountStatuses)
        const hasLapsedPaidAccount = finalFailedPaymentAttemptOccurredAt != null
        const hasCancelledPaidAccount = userPaidEnrollmentCancelledAt != null
        if (!suppressBanner) {
            let onAccountPage = false
            if (this.props.onAccountPage != null) {
                onAccountPage = this.props.onAccountPage
            }
            let displayBanner = redisplayBannerAfter == null
            if (!displayBanner) {
                displayBanner = moment(redisplayBannerAfter).isBefore(moment())
            }
            if (!hasPaidAccount && !hasCancelledPaidAccount && hasTrialAccount && isTrialPeriodExpired && displayBanner) {
                banners.push(
                    <div key={0}>
                        <Modal
                            show={this.state.showTrialExpiredAboutModal}
                            dialogClassName="riker-modal-dialog">
                            <Modal.Header>
                                <Modal.Title id="contained-modal-title-sm">
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Image src="/images/red-exclamation-18x18.svg" style={{marginRight: 8}} />
                                        <div>Trial Period Expired</div>
                                    </div>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Your {utils.FREE_TRIAL_PERIOD_IN_DAYS}-day trial has expired.</p>
                                <p>Enroll in a subscription to continue enjoying the benefits of a Riker account.</p>
                                {(() => {
                                     if (!onAccountPage) {
                                         return (<p>Head over to your <strong>My Account</strong> page to understand your options.</p>)
                                     }
                                })()
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                {(() => {
                                     if (!onAccountPage) {
                                         return (
                                             <Tappable className="btn btn-default"
                                                       onTap={() => {
                                                               this.setState({ showTrialExpiredAboutModal: false })
                                                               navigateTo(urls.ACCOUNT_URI)
                                                             }}>My Account</Tappable>
                                         )
                                     }
                                 })()
                                }
                                <Tappable className="btn btn-default" onTap={() => this.setState({ showTrialExpiredAboutModal: false })}>Close</Tappable>
                            </Modal.Footer>
                        </Modal>
                        <Col
                            xs={12}
                            className="base-banner trial-expired-banner">
                            <Image src="/images/red-exclamation-18x18.svg"
                                   style={{marginRight: 8, paddingBottom: 3}} />
                            <span style={{marginRight: 10}}>
                                <a href="#"
                                   style={{color: "#a94442",
                                           textDecoration: "underline"}}
                                   onClick={(e) => {
                                           e.preventDefault()
                                           this.setState({showTrialExpiredAboutModal: true})
                                       }}>Account Closed - Trial Period Expired</a>
                            </span>
                            <Tappable className="btn btn-xs btn-default"
                                      component="div"
                                      onTap={() => navigateTo(urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI)}
                                      style={{marginRight: 10, marginBottom: 1}}>Enroll in Subscription</Tappable>
                        </Col>
                    </div>
                )
            } else if (!hasPaidAccount && !hasCancelledPaidAccount && hasTrialAccount && isTrialPeriodAlmostExpired && displayBanner) {
                banners.push(
                    <Col key={1} xs={12} className="base-banner trial-almost-expired-banner">
                        <Image src="/images/red-exclamation-18x18.svg"
                               style={{marginRight: 8, paddingBottom: 3}} />
                        <span style={{marginRight: 8}}>Trial Period Almost Expired</span>
                        <Tappable className="btn btn-xs btn-default"
                                  component="div"
                                  onTap={() => navigateTo(urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI)}
                                  style={{marginRight: 5, marginBottom: 1}}>Enroll in Subscription</Tappable>
                        <Tappable className="btn btn-xs btn-default"
                                  component="div"
                                  onTap={remindMeLaterFn}
                                  style={{marginBottom: 1}}>Remind Me Later</Tappable>
                    </Col>
                )
            } else if (hasPaidAccount && isPaymentPastDue && !hasLapsedPaidAccount && !hasCancelledPaidAccount && displayBanner) {
                banners.push(
                    <div key={2}>
                        <Modal
                            show={this.state.showPaymentPastDueAboutModal}
                            dialogClassName="riker-modal-dialog">
                            <Modal.Header>
                                <Modal.Title id="contained-modal-title-sm">
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Image src="/images/red-exclamation-18x18.svg" style={{marginRight: 8}} />
                                        <div>Payment Past Due</div>
                                    </div>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Your last automatic subscription payment-attempt failed.</p>
                                <p>Please update your payment information as soon as possible to prevent cancellation of your account.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Tappable className="btn btn-default"
                                          onTap={() => {
                                                  this.setState({ showPaymentPastDueAboutModal: false })
                                                  navigateTo(urls.UPDATE_PAYMENT_METHOD_SYNCHRONIZE_URI)
                                              }}>Update Payment Info</Tappable>
                                <Tappable className="btn btn-default" onTap={() => this.setState({ showPaymentPastDueAboutModal: false })}>Close</Tappable>
                            </Modal.Footer>
                        </Modal>
                        <Col xs={12} className="base-banner trial-expired-banner">
                            <Image src="/images/red-exclamation-18x18.svg"
                                   style={{marginRight: 8, paddingBottom: 3}} />
                            <span style={{marginRight: 8}}>
                                <a href="#"
                                   style={{color: "#a94442", textDecoration: "underline"}}
                                   onClick={(e) => {
                                           e.preventDefault()
                                           this.setState({showPaymentPastDueAboutModal: true})
                                       }}>Payment Past Due</a>
                            </span>
                            {(() => {
                                 if (!onAccountPage) {
                                     return (
                                         <Tappable className="btn btn-xs btn-default"
                                                   style={{marginRight: 5, marginBottom: 1}}
                                                   onTap={() => navigateTo(urls.ACCOUNT_URI)}>My Account</Tappable>
                                     )
                                 }
                             })()
                            }
                            <Tappable className="btn btn-xs btn-default"
                                      component="div"
                                      onTap={remindMeLaterFn}
                                      style={{marginBottom: 1}}>Remind Me Later</Tappable>
                        </Col>
                    </div>
                )
            } else if (hasLapsedPaidAccount && displayBanner) {
                banners.push(
                    <div key={3}>
                        <Modal
                            show={this.state.showPaymentLapsedAboutModal}
                            dialogClassName="riker-modal-dialog">
                            <Modal.Header>
                                <Modal.Title id="contained-modal-title-sm">
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Image src="/images/red-exclamation-18x18.svg" style={{marginRight: 8}} />
                                        <div>Account Closed - Payment Lapsed</div>
                                    </div>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Your last automatic subscription payment-attempt failed.</p>
                                <p>No more payment attempts will be made and your account is now closed.  If you wish to re-activate your subscription account, update your payment information.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Tappable className="btn btn-default"
                                          onTap={() => {
                                                  this.setState({ showPaymentLapsedAboutModal: false })
                                                  navigateTo(urls.UPDATE_PAYMENT_METHOD_SYNCHRONIZE_URI)
                                              }}>Update Payment Info</Tappable>
                                <Tappable className="btn btn-default" onTap={() => this.setState({ showPaymentLapsedAboutModal: false })}>Close</Tappable>
                            </Modal.Footer>
                        </Modal>
                        <Col xs={12} className="base-banner trial-expired-banner">
                            <Image src="/images/red-exclamation-18x18.svg"
                                   style={{marginRight: 8, paddingBottom: 3}} />
                            <span style={{marginRight: 8}}>
                                <a href="#"
                                   style={{color: "#a94442", textDecoration: "underline"}}
                                   onClick={(e) => {
                                           e.preventDefault()
                                           this.setState({showPaymentLapsedAboutModal: true})
                                       }}>Payment Lapsed</a>
                            </span>
                            {(() => {
                                 if (!onAccountPage) {
                                     return (
                                         <Tappable className="btn btn-xs btn-default"
                                                   style={{marginRight: 5, marginBottom: 1}}
                                                   onTap={() => navigateTo(urls.ACCOUNT_URI)}>My Account</Tappable>
                                     )
                                 }
                             })()
                            }
                        </Col>
                    </div>
                )
            } else if (hasCancelledPaidAccount) {
                let title
                if (validateAppStoreReceiptAt != null) {
                    title = (
                        <p>Your account is currently closed.  It was cancelled from your Apple iTunes account.</p>
                    )
                } else {
                    title = (
                        <p>Your account is currently closed.  You cancelled it on: <strong>{ moment(userPaidEnrollmentCancelledAt).format(utils.DATE_DISPLAY_FORMAT) }</strong></p>
                    )
                }
                banners.push(
                    <div key={4}>
                        <Modal
                            show={this.state.showAccountCancelledAboutModal}
                            dialogClassName="riker-modal-dialog">
                            <Modal.Header>
                                <Modal.Title id="contained-modal-title-sm">
                                    <div style={{display: "flex", alignItems: "center"}}>
                                        <Image src="/images/red-exclamation-18x18.svg" style={{marginRight: 8}} />
                                        <div>Account Closed</div>
                                    </div>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {title}
                                <p>You're able to re-enroll at any time.</p>
                                {(() => {
                                     if (!onAccountPage) {
                                         return (<p>Head over to your <strong>My Account</strong> page to understand your options.</p>)
                                     }
                                 })()
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                {(() => {
                                     if (!onAccountPage) {
                                         return (
                                             <Tappable className="btn btn-default"
                                                       onTap={() => {
                                                               this.setState({ showAccountCancelledAboutModal: false })
                                                               navigateTo(urls.ACCOUNT_URI)
                                                           }}>My Account</Tappable>
                                         )
                                     }
                                 })()
                                }
                                <Tappable className="btn btn-default" onTap={() => this.setState({ showAccountCancelledAboutModal: false })}>Close</Tappable>
                            </Modal.Footer>
                        </Modal>
                        <Col xs={12} className="base-banner trial-expired-banner">
                            <Image src="/images/red-exclamation-18x18.svg"
                                   style={{marginRight: 8, paddingBottom: 3}} />
                            <span style={{marginRight: 8}}>
                                <a href="#"
                                   style={{color: "#a94442", textDecoration: "underline"}}
                                   onClick={(e) => {
                                           e.preventDefault()
                                           this.setState({showAccountCancelledAboutModal: true})
                                       }}>Account Closed</a>
                            </span>
                            {(() => {
                                 if (!onAccountPage) {
                                     return (
                                         <Tappable className="btn btn-xs btn-default"
                                                   style={{marginRight: 5, marginBottom: 1}}
                                                   onTap={() => navigateTo(urls.ACCOUNT_URI)}>My Account</Tappable>
                                     )
                                 }
                             })()
                            }
                        </Col>
                    </div>
                )
            }
        }
        if (displayUpcomingMaintenanceBanner) {
            banners.push(
                <Col key={3} xs={12} className="base-banner upcoming-maintenance-banner">
                    <Modal
                        show={this.state.showUpcomingMaintenanceAboutModal}
                        dialogClassName="riker-modal-dialog">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-sm">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                    <div>Maintenance Outages</div>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Periodically, the Riker servers need maintenance performed.  During these outages the Riker servers are unavailable to receive your real-time data updates.</p>
                            <p><strong>This is not a problem if you're using the Riker app on your phone or tablet</strong>.  The apps are designed to overcome maintenance outages and lack of internet connectivity.  You can save your sets on your app, and bulk upload them after the outage.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default" onTap={() => this.setState({ showUpcomingMaintenanceAboutModal: false })}>Close</Tappable>
                        </Modal.Footer>
                    </Modal>
                    <div style={{marginRight: 5, marginBottom: 5, color: "white"}}>
                        <Image src="/images/yellow-exclamation-18x18.svg"
                               style={{marginRight: 5, paddingBottom: 3}} />
                        Upcoming Maintenance
                        <div style={{fontSize: 11}}>Scheduled for: <strong>{maintenanceStartsAtMoment.format(utils.DATETIME_DISPLAY_FORMAT)}</strong>.</div>
                        <div style={{fontSize: 11}}>Estimated duration: <strong>{maintenanceDuration} min</strong>.</div>
                    </div>
                    <Tappable component="div"
                              style={{marginRight: 5, marginBottom: 1}}
                              className="btn btn-xs btn-default"
                              onTap={() => this.setState({showUpcomingMaintenanceAboutModal: true})}>About</Tappable>
                    {(() => {
                         if (maintenanceAckAtMoment == null || maintenanceAckAtMoment.isBefore(informedOfMaintenanceAtMoment)) {
                             return (
                                 <Tappable className="btn btn-xs btn-default"
                                           component="div"
                                           onTap={maintenanceAckFn}
                                           style={{marginBottom: 1}}>Okay, got it</Tappable>
                             )
                         }
                    })()
                    }
                </Col>
            )
        } else if (utils.displayMaintenanceNowBanner(accountStatuses)) {
            banners.push(
                <Col key={3} xs={12} className="base-banner maintenance-now-banner">
                    <Modal
                        show={this.state.showMaintenanceAboutModal}
                        dialogClassName="riker-modal-dialog">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-sm">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                    <div>Maintenance Outage</div>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>The Riker servers are currently undergoing maintenance.  At this time you may not be able to sync new sets or body logs.</p>
                            <p>FYI, the <strong>Riker mobile and tablet apps are designed to overcome maintenance outages and lack of internet connectivity</strong>.  Sets and body logs can be saved locally to your device, and bulk-synced to your account later on.</p>
                            <p>If you haven't already, give the Riker apps a try!</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default" onTap={() => this.setState({ showMaintenanceAboutModal: false })}>Close</Tappable>
                        </Modal.Footer>
                    </Modal>
                    <div style={{marginRight: 5, marginBottom: 5, color: "white"}}>
                        <Image src="/images/yellow-exclamation-18x18.svg"
                               style={{marginRight: 5, paddingBottom: 3}} />
                        Maintenance Outage
                        <div style={{fontSize: 11}}>Estimated duration: <strong>{maintenanceDuration} min</strong>.</div>
                    </div>
                    <Tappable component="div"
                              style={{marginRight: 5, marginBottom: 1}}
                              className="btn btn-xs btn-default"
                              onTap={() => this.setState({showMaintenanceAboutModal: true})}>What's this?</Tappable>
                </Col>
            )
        }
        if (banners.length > 0) {
            return <Row style={{marginBottom: 12}}><Col xs={12}>{banners}</Col></Row>
        }
        return null
    }
}
