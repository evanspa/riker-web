import React from "react"
import { Modal, Image, Button } from "react-bootstrap";
import Tappable from "react-tappable"

export default class SmallModal extends React.Component {
    render() {
        const {
            show,
            onHide
        } = this.props
        return (
            <Modal show={show}
                   onHide={onHide}
                   aria-labelledby="contained-modal-title-sm"
                   dialogClassName="riker-modal-dialog">
                {(() => {
                     if (this.props.title != null) {
                         return (
                             <Modal.Header closeButton>
                                 <Modal.Title id="contained-modal-title-sm">
                                     <div style={{display: "flex", alignItems: "center"}}>
                                         <Image src={"/images/" + this.props.imageName} style={{marginRight: 8}} />
                                         <div>{this.props.title}</div>
                                     </div>
                                 </Modal.Title>
                             </Modal.Header>
                         )
                     }
                 })()
                }
                <Modal.Body>
                    <p>{this.props.content}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Tappable className="btn btn-default" onTap={this.props.onHide}>{this.props.buttonTitle}</Tappable>
                </Modal.Footer>
            </Modal>
        )
    }
}
