import React from "react"
import { Modal, Button } from "react-bootstrap"
import Tappable from "react-tappable"

export default class ConfirmModal extends React.Component {
    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-sm" dialogClassName="riker-modal-dialog">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.content}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Tappable
                        className="btn btn-default"
                        onTap={this.props.onHide}
                        style={{paddingRight: 10, marginBottom: 15}}>{this.props.noCancelButtonTitle}</Tappable>
                    <Tappable
                        className={"btn btn-" + this.props.yesDoItButtonStyle}
                        onTap={this.props.yesDoIt}
                        style={{marginBottom: 15}}>{this.props.yesDoItButtonTitle}</Tappable>
                </Modal.Footer>
            </Modal>
        )
    }
}
