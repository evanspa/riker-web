import React from "react"
import { PanelGroup, FormGroup, FormControl, ControlLabel, Modal, Image, Button, Row, Col, Panel, Well } from "react-bootstrap"
import { Link } from "react-router"
import { reduxForm } from "redux-form"
import { RikerTextFormGroup, RikerCheckboxFormGroup } from "./form-input.jsx"
import { cannotBeEmptyValidator,
         mustBeNumberValidator,
         mustBeEmailValidator } from "../utils"
import _ from "lodash"
import * as errFlags from "../error-flags"
import * as strs from "../strings"
import * as urls from "../urls"
import * as utils from "../utils"
import { USER_ACCOUNT_FORM } from "../forms"
import ActionsArray from "./actions-array.jsx"
import PostTrialChoices from "../components/post-trial-choices.jsx"
import RikerAccountBenefits from "../components/riker-account-benefits.jsx"
import ErrorMessages from "./error-messages.jsx"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import pluralize from "pluralize"
import StripeCheckout from 'react-stripe-checkout'
import NotAllowedModal from "./not-allowed-modal.jsx"

const validate = (values, props) => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "email")
    mustBeEmailValidator(values, errors, "email")
    const password = values.password
    const confirmPassword = values.confirmPassword
    if (password != null && !_.isEmpty(_.trim(password))) {
        if (confirmPassword != null && !_.isEmpty(_.trim(confirmPassword))) {
            if (!_.isEqual(password, confirmPassword)) {
                errors.confirmPassword = "Passwords do not match."
            }
        } else {
            errors.confirmPassword = "Cannot be empty."
        }
    } else if (props.userHasPassword && (confirmPassword != null && !_.isEmpty(_.trim(confirmPassword)))) {
        errors.password = "Cannot be empty."
    }
    if (_.isEmpty(errors)) {
        if (props.userHasPassword && ((values.password != null && values.password.length > 0) || values.email != values.origEmail)) {
            cannotBeEmptyValidator(values, errors, "currentPassword")
        }
    }
    return errors
}

class UserAccountForm extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { showCurrentPasswordPromptForEmailOrPwdUpdate: false }
    }

    componentWillReceiveProps(nextProps) {
        const {
            editMode,
            userAccountSubmitFailed,
            fields: { currentPassword }
        } = nextProps
        if (editMode &&
            this.props.userHasPassword &&
            userAccountSubmitFailed && // indicates the user tried to do a submit
            currentPassword.error != null &&
            currentPassword.error.length > 0) {
            if (this.props.userHasPassword) {
                this.setState({showCurrentPasswordPromptForEmailOrPwdUpdate: true})
            } else {
                this.props.handleSubmit()
            }
        }
    }

    componentWillUnmount() {
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    componentDidMount() {
        window.fbAsyncInit = function() {
            FB.init({
                appId            : process.env.FACEBOOK_APP_ID,
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.1'
            });
        }.bind(this);

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    render() {
        // https://github.com/erikras/redux-form/issues/190
        const {
            fields: {
                name,
                email,
                currentPassword,
                password,
                confirmPassword
            },
            clearErrors,
            api,
            downloadChangelog,
            changelogCounts,
            dismissChangelogReport,
            authToken,
            logout,
            logoutAllOther,
            logoutUri,
            logoutAllOtherUri,
            becameUnauthenticated,
            userId,
            userEmail,
            userHasPassword,
            userVerifiedAt,
            userNextInvoiceAt,
            userNextInvoiceAmount,
            userLastInvoiceAt,
            userLastInvoiceAmount,
            userCurrentCardLast4,
            userCurrentCardBrand,
            userCurrentCardExpMonth,
            userCurrentCardExpYear,
            userLatestStripeTokenId,
            markUserAccountForEdit,
            cancelUserAccountEdit,
            resendVerificationEmail,
            handleSubmit,
            requestInProgress,
            responseStatus,
            editMode,
            rErrorMask,
            indicateAccountVerificationEmailSent,
            accountVerificationEmailSentUserAck,
            userAccountSubmitFailed,
            userAccountSubmitFailedResetFn,
            userAccountFormResetCurrentPasswordFn,
            navigateTo,
            paymentTokenReceived,
            paymentTokenSaved,
            paymentTokenSavedUserAck,
            cancelSubscription,
            subscriptionCancelled,
            subscriptionCancelFailed,
            subscriptionCancelledUserAck,
            subscriptionCancelFailedUserAck,
            accountStatuses,
            containerUrl
        } = this.props
        const actionArray = (
            <ActionsArray
                entityType="user account"
                alwaysEnabled={true}
                editMode={editMode}
                downloadChangelogFn={downloadChangelog}
                containerUrl={this.props.containerUrl}
                entityId={userId}
                cancelEntityEdit={cancelUserAccountEdit}
                accountStatuses={accountStatuses}
                requestInProgress={requestInProgress}
                markEntityForEdit={markUserAccountForEdit} />
            )
        const errors = [
            { flag: errFlags.SAVE_USER_EMAIL_AlREADY_REGISTERED,
              message: "This email is already in use by another account." },
            { flag: errFlags.SAVE_USER_CURRENT_PASSWORD_INCORRECT,
              message: "Your current password you entered is incorrect." }
        ]
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
            informedOfMaintenanceAtMoment, // not used in this component
            maintenanceStartsAtMoment, // not used in this component
            maintenanceDuration, // not used in this component
            maintenanceEndsAtMoment, // not used in this component
            maintenanceAckAtMoment, // not used in this component
            hasPaidIapAccount,
            validateAppStoreReceiptAt
        ] = accountStatuses
        const hasLapsedPaidAccount = finalFailedPaymentAttemptOccurredAt != null
        const hasCancelledPaidAccount = userPaidEnrollmentCancelledAt != null
        const now = moment()
        let accountTypePanel
        if (!hasPaidAccount && hasTrialAccount && isTrialPeriodExpired) {
            accountTypePanel = (
                <Panel bsStyle="danger">
                    <Panel.Heading>
                        <Panel.Title>{<span><span className="exclamation-point-danger">!</span> <span style={{fontSize: "1.25em"}}>TRIAL EXPIRED</span></span>}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <p>Your {utils.FREE_TRIAL_PERIOD_IN_DAYS}-day trial has expired.</p>
                        <p>You have 2 options for continuing with Riker:</p>
                        <PostTrialChoices
                            containerUrl={containerUrl}
                            enrollUrl={urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI} />
                        <p style={{fontSize: ".9em", marginBottom: 0, marginTop: 10}}>
                            <Tappable className="btn btn-success" onTap={() => navigateTo(urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI)}>
                                Enroll Now
                            </Tappable>
                        </p>
                    </Panel.Body>
                </Panel>
            )
        } else if (!hasPaidAccount && hasTrialAccount && isTrialPeriodAlmostExpired) {
            const numDaysLeftInTrial = Math.abs(now.diff(userTrialEndsAtMoment, 'days'))
            accountTypePanel = (
                <Panel bsStyle="warning">
                    <Panel.Heading>
                        <Panel.Title>{<span><span className="exclamation-point-danger">!</span> <span style={{fontSize: "1.25em"}}>Trial Almost Expired</span></span>}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <p>Your {utils.FREE_TRIAL_PERIOD_IN_DAYS}-day trial expires in <strong>{numDaysLeftInTrial} {pluralize("day", numDaysLeftInTrial)}</strong>.</p>
                        <p>After the trial period, you'll have 2 choices for continuing with Riker:</p>
                        <PostTrialChoices
                            containerUrl={containerUrl}
                            enrollUrl={urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI} />
                        <p style={{fontSize: ".9em", marginBottom: 0, marginTop: 10}}>
                            <Tappable className="btn btn-success" onTap={() => navigateTo(urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI)}>
                                Enroll Now
                            </Tappable>
                        </p>
                    </Panel.Body>
                </Panel>
            )
        } else if (hasPaidAccount && isPaymentPastDue && !hasLapsedPaidAccount && !hasCancelledPaidAccount) {
            accountTypePanel = (
                <div>
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
                            <p>Your payment method has been saved successfully.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default" onTap={paymentTokenSavedUserAck}>Close</Tappable>
                        </Modal.Footer>
                    </Modal>
                    <Panel bsStyle="danger">
                        <Panel.Heading>
                            <Panel.Title>{<span><span className="exclamation-point-danger">!</span> <span style={{fontSize: "1.25em"}}>PAYMENT PAST DUE</span></span>}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <p>Your last automatic subscription payment-attempt failed.</p>
                            <p>Please update your payment information as soon as possible to prevent cancellation of your account.</p>
                            <PanelGroup style={{marginTop: 10, marginBottom: 5}} accordion id="payment-information">
                                <Panel eventKey="0">
                                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "why-failed-payment")} />
                                    <Panel.Heading>
                                        <Panel.Title>Why did my payment fail?</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        <p>This could be due to a change in your card number or your card expiring, cancellation of your credit card, or the bank not recognizing the payment and taking action to prevent it.</p>
                                    </Panel.Body>
                                </Panel>
                                <Panel eventKey="1">
                                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "payment-information")} />
                                    <Panel.Heading>
                                        <Panel.Title>My Payment Information</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        <div className="payment-info">
                                            <div className="payment-info">
                                                <p>Your payment of <strong>${(userLastInvoiceAmount / 100.0).toFixed(2)}</strong> was made on <strong>{utils.formatDate(moment, userLastInvoiceAt)}</strong></p>
                                                <p>Your next payment will automatically occur on <strong>{utils.formatDate(moment, userNextInvoiceAt)}</strong></p>
                                                <p>Payment method: <strong>{userCurrentCardBrand + " ****" + userCurrentCardLast4 + ",  expiration: " + (userCurrentCardExpMonth < 10 ? "0" + userCurrentCardExpMonth : userCurrentCardExpMonth) + "/" + userCurrentCardExpYear}</strong></p>
                                            </div>
                                        </div>
                                        <div style={{marginTop: 20}}>
                                            <Tappable
                                                disabled={requestInProgress}
                                                onTap={() => navigateTo(urls.UPDATE_PAYMENT_METHOD_SYNCHRONIZE_URI)}
                                                className="btn btn-primary">Update Payment Method</Tappable>
                                        </div>
                                        <PanelGroup style={{marginTop: 10, marginBottom: 5}} accordion id="cancel-subscription">
                                            <Panel style={{marginTop: 10}} bsStyle="danger" eventKey="1">
                                                <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "cancel-subscription-info")} />
                                                <Panel.Heading>
                                                    <Panel.Title toggle>Cancel Subscription</Panel.Title>
                                                </Panel.Heading>
                                                <Panel.Body collapsible>
                                                    <p className="cancellation-info">You're free to cancel your Riker subscription at anytime.  If you cancel your subscription, you will be refunded a pro-rated amount.</p>
                                                    <Tappable className="btn btn-danger"
                                                              disabled={requestInProgress}
                                                              onTap={() => {
                                                                      if (!requestInProgress) {
                                                                          cancelSubscription()
                                                                      }
                                                              }}>Cancel Subscription</Tappable>
                                                </Panel.Body>
                                            </Panel>
                                        </PanelGroup>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Panel.Body>
                    </Panel>
                </div>
            )
        } else if (hasPaidIapAccount && !hasLapsedPaidAccount && !hasCancelledPaidAccount) {
            accountTypePanel = (
                <div>
                    <Panel bsStyle="success">
                        <Panel.Heading>
                            <Panel.Title>Riker Subscription</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <p>Your Riker account is in good standing.</p>
                            <PanelGroup style={{marginTop: 10, marginBottom: 5}} accordion id="payment-info">
                                <Panel eventKey="1">
                                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "payment-information")} />
                                    <Panel.Heading>
                                        <Panel.Title toggle>My Payment Information</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <div className="payment-info">
                                            You enrolled in a Riker subscription from the Riker iPhone or iPad app.  You can manage your Riker subscription from your Apple iTunes account.
                                        </div>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Panel.Body>
                    </Panel>
                </div>
            )
        } else if (hasPaidAccount && !hasLapsedPaidAccount && !hasCancelledPaidAccount) {
            accountTypePanel = (
                <div>
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
                            <p>Your payment method has been saved successfully.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default" onTap={paymentTokenSavedUserAck}>Close</Tappable>
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
                    <Panel bsStyle="success">
                        <Panel.Heading>
                            <Panel.Title>Riker Subscription</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <p>Your Riker account is in good standing.</p>
                            <PanelGroup style={{marginTop: 10, marginBottom: 5}} accordion id="payment-information">
                                <Panel eventKey="1">
                                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "payment-information")} />
                                    <Panel.Heading>
                                        <Panel.Title toggle>My Payment Information</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <div className="payment-info">
                                            <p>Your payment of <strong>${(userLastInvoiceAmount / 100.0).toFixed(2)}</strong> was made on <strong>{utils.formatDate(moment, userLastInvoiceAt)}</strong></p>
                                            <p>Your next payment will automatically occur on <strong>{utils.formatDate(moment, userNextInvoiceAt)}</strong></p>
                                            <p>Payment method: <strong>{userCurrentCardBrand + " ****" + userCurrentCardLast4 + ",  expiration: " + (userCurrentCardExpMonth < 10 ? "0" + userCurrentCardExpMonth : userCurrentCardExpMonth) + "/" + userCurrentCardExpYear}</strong></p>
                                        </div>
                                        <div style={{marginTop: 20}}>
                                            <Tappable
                                                disabled={requestInProgress}
                                                onTap={() => navigateTo(urls.UPDATE_PAYMENT_METHOD_SYNCHRONIZE_URI)}
                                                className="btn btn-primary">Update Payment Method</Tappable>
                                        </div>
                                        <PanelGroup style={{marginTop: 10, marginBottom: 5}} accordion id="cancel-subscription">
                                            <Panel style={{marginTop: 10}} bsStyle="danger" eventKey="1">
                                                <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "cancel-subscription-info")} />
                                                <Panel.Heading>
                                                    <Panel.Title toggle>Cancel Subscription</Panel.Title>
                                                </Panel.Heading>
                                                <Panel.Body collapsible>
                                                    <p className="cancellation-info">You're free to cancel your Riker subscription at anytime.  If you cancel your subscription, you will be refunded a pro-rated amount.</p>
                                                    <Tappable className="btn btn-danger"
                                                              disabled={requestInProgress}
                                                              onTap={() => {
                                                                      if (!requestInProgress) {
                                                                          cancelSubscription()
                                                                      }
                                                              }}>Cancel Subscription</Tappable>
                                                </Panel.Body>
                                            </Panel>
                                        </PanelGroup>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                        </Panel.Body>
                    </Panel>
                </div>
            )
        } else if (hasLapsedPaidAccount) {
            accountTypePanel = (
                <div>
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
                            <p>Your payment method has been saved successfully and your account has been re-activated.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default" onTap={paymentTokenSavedUserAck}>Close</Tappable>
                        </Modal.Footer>
                    </Modal>
                    <Panel bsStyle="danger">
                        <Panel.Heading>
                            <Panel.Title>{<span><span className="exclamation-point-danger">!</span> <span style={{fontSize: "1.25em"}}>PAYMENT PAST DUE - ACCOUNT CLOSED</span></span>}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <p>Your last (and final) automatic subscription payment-attempt failed.</p>
                            <p>Please update your payment information to re-activate your account.</p>
                            <PanelGroup style={{marginTop: 10, marginBottom: 5}} accordion id="why-payment-failed">
                                <Panel eventKey="0">
                                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "why-failed-payment")} />
                                    <Panel.Heading>
                                        <Panel.Title toggle>Why did my payment fail?</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <p>This could be due to a change in your card number or your card expiring, cancellation of your credit card, or the bank not recognizing the payment and taking action to prevent it.</p>
                                    </Panel.Body>
                                </Panel>
                                <Panel eventKey="1">
                                    <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "payment-information")} />
                                    <Panel.Heading>
                                        <Panel.Title toggle>My Payment Information</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <div className="payment-info">
                                            <div className="payment-info">
                                                <p>Your last payment of <strong>${(userLastInvoiceAmount / 100).toFixed(2)}</strong> was made on <strong>{utils.formatDate(moment, userLastInvoiceAt)}</strong></p>
                                                <p>Your lapsed payment was due on <strong>{utils.formatDate(moment, userNextInvoiceAt)}</strong></p>
                                                <p>Payment method: <strong>{userCurrentCardBrand + " ****" + userCurrentCardLast4 + ",  expiration: " + (userCurrentCardExpMonth < 10 ? "0" + userCurrentCardExpMonth : userCurrentCardExpMonth) + "/" + userCurrentCardExpYear}</strong></p>
                                            </div>
                                        </div>
                                    </Panel.Body>
                                </Panel>
                            </PanelGroup>
                            <div style={{marginTop: 15}}>
                                <Tappable
                                    disabled={requestInProgress}
                                    onTap={() => navigateTo(urls.UPDATE_PAYMENT_METHOD_SYNCHRONIZE_URI)}
                                    className="btn btn-primary">Update Payment Method</Tappable>
                            </div>
                        </Panel.Body>
                    </Panel>
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
            accountTypePanel = (
                <Panel bsStyle="danger" header={<span><span className="exclamation-point-danger">!</span> <span style={{fontSize: "1.25em"}}>ACCOUNT CLOSED</span></span>}>
                    {title}
                    <p>You have 2 options for continuing with Riker:</p>
                    <PostTrialChoices
                        reenroll={true}
                        containerUrl={containerUrl}
                        enrollUrl={urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI} />
                    <p style={{fontSize: ".9em", marginBottom: 0, marginTop: 10}}>
                        <Tappable className="btn btn-success" onTap={() => navigateTo(urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI)}>
                            Re-enroll Now
                        </Tappable>
                    </p>
                </Panel>
            )
        } else {
            let numDaysLeftInTrial = Math.abs(now.diff(userTrialEndsAtMoment, 'days'))
            if (numDaysLeftInTrial > 90) { // due to quirkiness of datetime calcs
                numDaysLeftInTrial = 90
            }
            accountTypePanel = (
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <Panel.Title>Trial Account</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <p>Your {utils.FREE_TRIAL_PERIOD_IN_DAYS}-day trial expires in <strong>{numDaysLeftInTrial} {pluralize("day", numDaysLeftInTrial)}</strong>.</p>
                        <PanelGroup style={{marginTop: 5, marginBottom: 5}} accordion id="after-trial">
                            <Panel style={{marginTop: 5}} eventKey="2">
                                <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "post-trial-choices")} />
                                <Panel.Heading>
                                    <Panel.Title toggle>{"What happens after the " + utils.FREE_TRIAL_PERIOD_IN_DAYS + "-day trial?"}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    After the {utils.FREE_TRIAL_PERIOD_IN_DAYS}-day trial, you'll have 2 choices for continuing with Riker:
                                    <PostTrialChoices
                                        containeprUrl={containerUrl}
                                        enrollUrl={urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI} />
                                </Panel.Body>
                            </Panel>
                            <Panel eventKey="1">
                                <Panel.Collapse onEntered={utils.makeTrackModalViewFn(containerUrl, "account-benefits")} />
                                <Panel.Heading>
                                    <Panel.Title toggle>Benefits of having a Riker subscription</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <RikerAccountBenefits containerUrl={containerUrl} />
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                        <p style={{fontSize: ".9em", marginBottom: 0, marginTop: 10}}>
                            <Tappable className="btn btn-success" onTap={() => navigateTo(urls.AUTHENTICATED_ENROLL_SYNCHRONIZE_URI)}>
                                Enroll Now
                            </Tappable>
                        </p>
                    </Panel.Body>
                </Panel>
            )
        }
        return (
            <div>
                <ErrorMessages errorMask={rErrorMask} errors={errors} />
                <ChangelogResultsModal
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={dismissChangelogReport} />
                <NotAllowedModal
                    responseStatus={responseStatus}
                    navigateTo={navigateTo}
                    clearErrors={clearErrors}
                    onAccountPage={!editMode}
                    onAccountEditPage={editMode} />
                <Modal
                    show={subscriptionCancelled}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <p>You're Riker subscription has been cancelled.</p>
                        {(() => {
                             if (!isTrialPeriodExpired) {
                                 return (
                                     <div>
                                         <p>FYI, it would appear that you still have time left on your original trial period.</p>
                                         <p>That means you can continue using your Riker account.</p>
                                     </div>
                                 )
                             }
                             return null
                        })()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={subscriptionCancelledUserAck}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={indicateAccountVerificationEmailSent}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                            <div>Verificaton email sent to you at <strong>{email.value}</strong>.</div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => accountVerificationEmailSentUserAck()}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <form onSubmit={handleSubmit}>
                    <Modal
                        show={this.state.showCurrentPasswordPromptForEmailOrPwdUpdate}
                        dialogClassName="riker-modal-dialog">
                        <Modal.Body>
                            <p>To change your email or your password, please enter your current account password:</p>
                            <RikerTextFormGroup
                                suppressErrors={true}
                                type="password"
                                autoComplete="current-password"
                                field={currentPassword} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Tappable
                                className="btn btn-default"
                                onTap={() => {
                                        userAccountSubmitFailedResetFn()
                                        userAccountFormResetCurrentPasswordFn()
                                        this.setState({showCurrentPasswordPromptForEmailOrPwdUpdate: false})
                                }}>Cancel</Tappable>
                            <Tappable
                                className="btn btn-default"
                                disabled={currentPassword.value.length == 0}
                                onTap={() => {
                                        if (currentPassword.value.length > 0) {
                                            handleSubmit()
                                            userAccountFormResetCurrentPasswordFn()
                                            this.setState({showCurrentPasswordPromptForEmailOrPwdUpdate: false})
                                        }
                                }}>Submit</Tappable>
                        </Modal.Footer>
                    </Modal>
                    { actionArray }
                    <Row><Col xs={12}><hr /></Col></Row>
                    {(() => {
                         if (!editMode) {
                             if (userVerifiedAt != null) {
                                 return (<RikerTextFormGroup label="E-mail" type="email" field={email} disabled={!editMode} />)
                             } else {
                                 return (
                                     <div>
                                         <FormGroup bsSize="lg" style={{marginBottom: 1}}>
                                             <div>
                                                 <ControlLabel type="email">E-mail</ControlLabel>
                                                 <FormControl
                                                     type="email"
                                                     value={email.value}
                                                     onChange={email.onChange}
                                                     name={email.name}
                                                     disabled={true}
                                                     autoFocus={false} />
                                             </div>
                                         </FormGroup>
                                         <div style={{display: "flex", alignItems: "center", marginLeft: 3, marginBottom: 10}}>
                                             <Image src="/images/yellow-exclamation-18x18.svg" />
                                             <div className="email-unverified-panel">E-mail address not verified.  <Tappable component="a" onTap={resendVerificationEmail}>Click here</Tappable> to re-send verification email.</div>
                                         </div>
                                     </div>
                                 )
                             }
                         } else {
                             return (
                                 <RikerTextFormGroup label="E-mail" type="email" field={email} disabled={!editMode} />
                             )
                         }
                    })()}
                    {(() => {
                         if (editMode) {
                             return (
                                 <div>
                                     <Panel style={{marginBottom: 1}}>
                                         <Panel.Heading>
                                             <Panel.Title>Change Password</Panel.Title>
                                         </Panel.Heading>
                                         <Panel.Body>
                                             <RikerTextFormGroup
                                                 label="New password"
                                                 autoComplete="new-password"
                                                 type="password"
                                                 field={password} />
                                             <RikerTextFormGroup
                                                 label="Confirm new password"
                                                 autoComplete="new-password"
                                                 type="password"
                                                 field={confirmPassword} />
                                         </Panel.Body>
                                     </Panel>
                                     <div style={{display: "flex", alignItems: "center", marginLeft: 3, marginBottom: 10}}>
                                         <Image src="/images/blue-info-18x18.svg" style={{marginRight: 3}} />
                                         <div className="dont-change-pwd-panel">If you don't want to change your password, leave these fields blank.</div>
                                     </div>
                                 </div>
                             )
                         } else {
                             return (
                                 <div>
                                     <RikerTextFormGroup
                                         label="Password"
                                         defaultValue="**********************"
                                         field={password}
                                         disabled={true} />
                                     <div style={{ marginTop: 15 }}>
                                         <label type="text" className="control-label">Account Status</label>
                                         {accountTypePanel}
                                     </div>
                                     <Well>
                                         <p>Using a public computer?  Be sure to log out when you're done using Riker.</p>
                                         <Tappable className="btn btn-danger"
                                                   onTap={() => {
                                                           if (!requestInProgress) {
                                                               window.FB.getLoginStatus(function (response) {
                                                                   console.log("inside fb status - 0")
                                                                   if (response && response.status === 'connected') {
                                                                       console.log("inside fb status - 1")
                                                                       window.FB.logout();
                                                                   }
                                                               });
                                                               logout(logoutUri, authToken)
                                                           }
                                                   }}
                                                   disabled={requestInProgress}>Log out</Tappable>
                                     </Well>
                                     <Well>
                                         <p>Lost your phone?  Left yourself logged in on a public computer?  Need a way to log out everywhere except your current browser window?</p>
                                         <p>We got your covered.</p>
                                         <Tappable className="btn btn-warning"
                                                   onTap={() => { if (!requestInProgress) { logoutAllOther(logoutAllOtherUri, authToken) }}}
                                                   disabled={requestInProgress}>Log out all other sessions</Tappable>
                                     </Well>
                                 </div>
                             )
                         }
                    })()
                    }
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: USER_ACCOUNT_FORM,
    fields: ["name", "origEmail", "email", "currentPassword", "password", "confirmPassword"],
    destroyOnUnmount: false,
    validate
})(UserAccountForm)
