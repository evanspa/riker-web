import React from "react"
import * as utils from "../utils"
import * as urls from "../urls"
import { Modal, Image } from "react-bootstrap"
import Tappable from "react-tappable"

export default class NotAllowedModal extends React.Component {
    render() {
        const {
            responseStatus,
            navigateTo,
            clearErrors
        } = this.props
        let onAccountPage = false
        if (this.props.onAccountPage != null) {
            onAccountPage = this.props.onAccountPage
        }
        let onAccountEditPage = false
        if (this.props.onAccountEditPage != null) {
            onAccountEditPage = this.props.onAccountEditPage
        }
        return (
            <Modal
                show={responseStatus == 403}
                dialogClassName="riker-modal-dialog">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-sm">
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image src="/images/red-exclamation-18x18.svg" style={{marginRight: 8}} />
                            <div>Not Permitted</div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The operation was not permitted.</p>
                    <p>This is usually due to an expired trial account, closed account subscription or an un-verified email address (a verified email address is required for importing CSV files).</p>
                    {(() => {
                         if (onAccountPage) {
                             return (
                                 <p>If this is the case, see down below for your options for continuing with Riker or verifying your account.</p>
                             )
                         } else if (onAccountEditPage) {
                             return (
                                 <p>If this is the case, go back to your <strong>My Account</strong> view and checkout your options for continuing with Riker or verifying your email address.</p>
                             )
                         } else {
                             return (
                                 <p>If this is the case, head over to your <strong>My Account</strong> page and checkout your options for continuing with Riker or verifying your email address.</p>
                             )
                         }
                    })()
                    }
                </Modal.Body>
                <Modal.Footer>
                    {(() => {
                         if (!onAccountPage && !onAccountEditPage) {
                             return (
                                 <Tappable className="btn btn-default"
                                           style={{marginRight: 5, marginBottom: 1}}
                                           onTap={() => navigateTo(urls.ACCOUNT_URI)}>My Account</Tappable>
                             )
                         }
                    })()
                    }
                    <Tappable className="btn btn-default"
                              style={{marginBottom: 1}}
                              onTap={() => clearErrors()}>Close</Tappable>
                </Modal.Footer>
            </Modal>
        )
    }
}
