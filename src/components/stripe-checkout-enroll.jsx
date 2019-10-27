import React from "react"
import StripeCheckout from 'react-stripe-checkout'
import Tappable from "react-tappable"

export default class StripeCheckoutEnroll extends React.Component {
    render() {
        const {
            paymentTokenReceivedFn,
            userEmail,
            buttonLabel,
            currentPlanPrice,
            disabled
        } = this.props
        let buttonClassName = this.props.buttonClassName
        if (buttonClassName == null) {
            buttonClassName = "btn btn-lg btn-success"
        }
        return (
            <StripeCheckout
                name="Riker"
                image="https://www.rikerapp.com/images/logo-128x128.png"
                description="Riker Subscription Enrollment"
                ComponentClass="div"
                amount={currentPlanPrice}
                allowRememberMe={false}
                token={paymentTokenReceivedFn}
                stripeKey={process.env.STRIPE_KEY}
                email={userEmail}
                billingAddress={true}
                zipCode={true}>
                <Tappable component="button"
                          disabled={disabled}
                          className={buttonClassName}>{buttonLabel}</Tappable>
            </StripeCheckout>
        )
    }
}
