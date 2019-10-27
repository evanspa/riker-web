import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { replace, push, goBack } from 'react-router-redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { attemptCancelSubscription,
         clearErrors,
         logoutRequestDone,
         subscriptionCancelledUserAck,
         subscriptionCancelFailedUserAck,
         bannerRemindLater,
         maintenanceAck,
         attemptDownloadChangelog,
         changelogCountsViewed } from "../actions/action-creators"
import RikerHelmet from "../components/riker-helmet.jsx"
import { Image, FormControl, Modal, PanelGroup, Well, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import Multiselect from 'react-widgets/lib/Multiselect'
import SignUpForm from "../components/sign-up-form.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import ErrorMessages from "../components/error-messages.jsx"
import * as errFlags from "../error-flags"
import _ from "lodash"
import moment from "moment"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import pluralize from "pluralize"
import NavbarBanner from "../components/navbar-banner.jsx"
import DownloadButton from "../components/download-button.jsx"
import ReactGA from "react-ga"

class CancelSubscriptionExitInterviewPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {showCurrentPasswordPromptForSubscriptionCancellation: false,
                      currentPassword: "",
                      cancelReason: null,
                      didDownloadChangelog: false}
    }

    componentWillUnmount() {
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        const {
            doGoBack,
            navigateTo,
            userPaidEnrollmentEstablishedAt,
            userLatestStripeTokenId,
            downloadChangelogFn,
            responseStatus,
            cancelSubscription,
            subscriptionCancelled,
            subscriptionCancelFailed,
            subscriptionCancelledUserAck,
            subscriptionCancelFailedUserAck,
            requestInProgress,
            userId,
            userEmail,
            userLastInvoiceAt,
            userLastInvoiceAmount,
            rErrorMask,
            changelogCounts,
            dismissChangelogReport,
            becameUnauthenticated
        } = this.props
        const errors = [
            { flag: errFlags.SAVE_USER_CURRENT_PASSWORD_INCORRECT,
              message: "Your current password you entered is incorrect." }
        ]
        const enrolled = userPaidEnrollmentEstablishedAt != null
        return (
            <div>
                <RikerHelmet title="Cancel Subscription" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <ReauthenticateModal
                    showModal={becameUnauthenticated}
                    message="We need you to re-authenticate."
                    operationOnLightLoginSuccess={downloadChangelogFn} />
                <ChangelogResultsModal
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={() => {
                            this.setState({didDownloadChangelog: true})
                            dismissChangelogReport()
                        }}
                    dismissChangelogReportButtonLabel={!enrolled ? "Close" : "Continue to update payment method"}/>
                <Modal
                    show={!enrolled && _.isEmpty(changelogCounts) && this.state.didDownloadChangelog}
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
                    show={subscriptionCancelFailed}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <p>There was a problem attempting to cancel your subscription:</p>
                        <ErrorMessages errorMask={rErrorMask} errors={errors} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable
                            className="btn btn-default"
                            onTap={subscriptionCancelFailedUserAck}>Okay</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={subscriptionCancelled}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                            <div>Your Riker subscription has been cancelled.</div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => subscriptionCancelledUserAck()}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showCurrentPasswordPromptForSubscriptionCancellation}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <p>Please enter your current account password:</p>
                        <div className="form-group form-group-lg">
                            <input type="password"
                                   className="form-control"
                                   value={this.state.currentPassword}
                                   onChange={event => this.setState({currentPassword: event.target.value})} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable
                            className="btn btn-default"
                            onTap={() => {
                                    this.setState({showCurrentPasswordPromptForSubscriptionCancellation: false})
                                }}>Cancel</Tappable>
                        <Tappable
                            className="btn btn-default"
                            disabled={this.state.currentPassword.length == 0}
                            onTap={() => {
                                    if (this.state.currentPassword.length > 0) {
                                        cancelSubscription(userId, this.state.currentPassword, this.state.cancelReason)
                                        this.setState({showCurrentPasswordPromptForSubscriptionCancellation: false,
                                                       currentPassword: ""})
                                    }
                                }}>Submit</Tappable>
                    </Modal.Footer>
                </Modal>
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Cancel Subscription</h1>
                    <div className="breadcrumb" style={{fontSize: 12, marginBottom: 15}}>
                        <span className="signup-step">Synchronize Account&nbsp;&#8594;&nbsp;</span><strong>Cancel Subscription</strong><span className="signup-step">&nbsp;&#8594;&nbsp;Finished</span>
                    </div>
                    <div style={{marginTop: 25}}>
                        We're sorry to be losing you as a customer.  So we can make Riker better, please let us know why you're cancelling:
                        <div style={{marginTop: 10}} className="form-group form-group-lg">
                            <FormControl
                                type="text"
                                onChange={event => this.setState({cancelReason: event.target.value})} />
                        </div>
                    </div>
                    <div>
                        <Well>
                            <div style={{display: "flex", alignItems: "center", fontSize: ".9em"}}>
                                <Image src="/images/yellow-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Once cancelled, your account data may be purged from our servers at anytime.  It is recommended that you export your data.</div>
                            </div>
                            <DownloadButton
                                className="btn btn-default"
                                downloadTitle="Export Sets"
                                style={{marginTop: 10, marginRight: 10}}
                                genFile={() => {
                                        ReactGA.event({
                                            category: utils.GA_EVENT_CATEGORY_USER,
                                            action: "csv export",
                                            label: "sets"
                                        })
                                        const fileName = "riker-sets-" + moment().format("YYYY-MM-DD") + ".csv"
                                        return {
                                            mime: "text/csv",
                                            filename: fileName,
                                            contents: utils.toCsv(utils.setCsvFields(this.props.movements,
                                                                                     this.props.movementVariants,
                                                                                     this.props.originationDevices),
                                                                  this.props.sets,
                                                                  (o1, o2) => o2.payload["set/logged-at"] - o1.payload["set/logged-at"])
                                        }
                                    }} />
                            <DownloadButton
                                className="btn btn-default"
                                downloadTitle="Export Body Measurement Logs"
                                style={{marginTop: 10}}
                                genFile={() => {
                                        ReactGA.event({
                                            category: utils.GA_EVENT_CATEGORY_USER,
                                            action: "csv export",
                                            label: "body measurement logs"
                                        })
                                        const fileName = "riker-body-measurement-logs-" + moment().format("YYYY-MM-DD") + ".csv"
                                        return {
                                            mime: "text/csv",
                                            filename: fileName,
                                            contents: utils.toCsv(utils.bodyJournalLogCsvFields(this.props.originationDevices),
                                                                  this.props.bodyJournalLogs,
                                                                  (o1, o2) => o2.payload["bodyjournallog/logged-at"] - o1.payload["bodyjournallog/logged-at"])
                                        }
                                    }} />
                            <div style={{fontSize: ".75em", marginTop: 10, fontStyle: "italic"}}>
                                If you decide later to re-enroll, or if you want to use Riker anonymously from one of the phone or tablet apps, you can import your data files.
                            </div>
                        </Well>
                        {(() => {
                             const userLastInvoiceAmountDollarsTwoPlaces = (userLastInvoiceAmount / 100).toFixed(2)
                             const userLastInvoiceAmountDollarsTwoPlacesPerDay = _.round((userLastInvoiceAmount / 365) / 100, 2).toFixed(2)
                             const userLastInvoiceAtMoment = moment(userLastInvoiceAt)
                             const now = moment()
                             const daysSinceLastInvoice = now.diff(userLastInvoiceAtMoment, 'days')
                             const refundAmountDollarsTwoPlaces = _.round((userLastInvoiceAmount - ((userLastInvoiceAmount / 365) * daysSinceLastInvoice)) / 100, 2).toFixed(2)
                             const dayPluralized = pluralize("day", daysSinceLastInvoice)
                             return (
                                 <Well style={{marginTop: 10}}>
                                     <p>It has been <strong>{daysSinceLastInvoice} {dayPluralized}</strong> since your last subscription payment of <strong>${userLastInvoiceAmountDollarsTwoPlaces}</strong>.</p>
                                     <p>As of this moment, you will be refunded <strong>{365 - daysSinceLastInvoice} days</strong> worth of your last payment.</p>
                                     <p>Estimated refund amount: <strong>${refundAmountDollarsTwoPlaces}</strong>.</p>
                                     <div style={{fontSize: ".75em", fontStyle: "italic"}}>Cost per day = {userLastInvoiceAmountDollarsTwoPlaces} / 365 days in a year = ${userLastInvoiceAmountDollarsTwoPlacesPerDay}.</div>
                                     <div style={{fontSize: ".75em", fontStyle: "italic"}}>Estimated refund amount = {userLastInvoiceAmountDollarsTwoPlaces} - {userLastInvoiceAmountDollarsTwoPlacesPerDay} * {daysSinceLastInvoice} {dayPluralized} used = ${refundAmountDollarsTwoPlaces}.</div>
                                     <div style={{fontSize: ".75em", fontStyle: "italic"}}>Refunds typically take <strong>5-10 business days</strong> to process.</div>
                                 </Well>
                             )
                        })()
                        }
                    </div>
                    <hr />
                    <div style={{marginTop: 15}}>
                        <Tappable onTap={() => { if (!requestInProgress) { doGoBack() }}}
                                  className="btn btn-sm btn-default"
                                  disabled={requestInProgress}>Cancel</Tappable>
                    </div>
                    <div style={{marginTop: 10}}>
                        <Tappable className="btn btn-lg btn-danger"
                                  disabled={requestInProgress}
                                  onTap={() => {
                                          if (!requestInProgress) {
                                              this.setState({showCurrentPasswordPromptForSubscriptionCancellation: true})
                                          }
                                      }}>Cancel Subscription</Tappable>
                        <p style={{fontSize: ".8em", fontStyle: "italic"}}>You will be prompted for your account password.</p>
                    </div>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
CancelSubscriptionExitInterviewPage.contextTypes = {
    router: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        responseStatus: state.api.responseStatus,
        requestInProgress: state.api.requestInProgress,
        rErrorMask: state.api.rErrorMask,
        userEmail: state.serverSnapshot["user/email"],
        userId: state.serverSnapshot["user/id"],
        userPaidEnrollmentEstablishedAt: state.serverSnapshot["user/paid-enrollment-established-at"],
        userLastInvoiceAt: state.serverSnapshot["user/last-invoice-at"],
        userLastInvoiceAmount: state.serverSnapshot["user/last-invoice-amount"],
        userTrialEndsAt: state.serverSnapshot["user/trial-ends-at"],
        changelogCounts: state.changelogCounts,
        becameUnauthenticated: state.becameUnauthenticated,
        subscriptionCancelled: state.api.subscriptionCancelled,
        subscriptionCancelFailed: state.api.subscriptionCancelFailed,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        originationDevices: state.serverSnapshot._embedded["origination-devices"],
        movements: state.serverSnapshot._embedded.movements,
        movementVariants: state.serverSnapshot._embedded["movement-variants"],
        sets: state.serverSnapshot._embedded.sets,
        bodyJournalLogs: state.serverSnapshot._embedded["body-journal-logs"]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearErrors: () => dispatch(clearErrors()),
        doGoBack: () => dispatch(goBack()),
        navigateTo: url => dispatch(push(url)),
        dismissChangelogReport: () => dispatch(changelogCountsViewed()),
        downloadChangelogFn: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from subscription cancellation exit interview page")
            dispatch(attemptDownloadChangelog(null))
        },
        cancelSubscription: (userId, currentPassword, cancelReason) => {
            toastr.clean()
            dispatch(attemptCancelSubscription(userId, currentPassword, cancelReason))
        },
        subscriptionCancelledUserAck: () => {
            dispatch(subscriptionCancelledUserAck())
            dispatch(replace(urls.CANCEL_SUBSCRIPTION_COMPLETE_URI))
            dispatch(logoutRequestDone())
        },
        subscriptionCancelFailedUserAck: () => dispatch(subscriptionCancelFailedUserAck()),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelSubscriptionExitInterviewPage)
