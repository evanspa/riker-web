import React from "react"
import { Modal, Image } from "react-bootstrap"
import _ from "lodash"
import Tappable from "react-tappable"
import * as utils from "../utils"
import * as strs from "../strings"

export default class ConflictModal  extends React.Component {
    render() {
        const {
            isConflict,
            conflictAckFn,
            downloadChangelogFn,
            deleteAttempt,
        } = this.props
        let messagePrefix = this.props.messagePrefix
        if (messagePrefix == null) {
            messagePrefix = "This record"
        }
        let messageSuffix = this.props.messageSuffix
        if (messageSuffix == null) {
            messageSuffix = "this record"
        }
        return (
            <Modal
                show={isConflict}
                dialogClassName="riker-modal-dialog">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-sm">
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image src="/images/yellow-exclamation-30x30.svg" style={{marginRight: 8}} />
                            <div>Conflict Detected</div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{messagePrefix + " has been updated on another device since you last logged in or synchronized your account."}</p>
                    {(() => {
                         if (deleteAttempt) {
                             return (
                                 <p>{"You need to synchronize your account before you can delete " + messageSuffix + "."}</p>
                             )
                         } else {
                             return (
                                 <p>{"You need to synchronize your account before you can save " + messageSuffix + "."}</p>
                             )
                         }
                    })()
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Tappable className="btn btn-default" onTap={conflictAckFn}>Cancel</Tappable>
                    <Tappable className="btn btn-primary"
                              onTap={() => {
                                      conflictAckFn()
                                      downloadChangelogFn()
                                  }}>Synchronize</Tappable>
                </Modal.Footer>
            </Modal>
        )
    }
}
