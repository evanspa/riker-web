import React from "react"
import { Modal, Image, Button } from "react-bootstrap";
import ConfirmModal from "./confirm-modal.jsx"
import SmallModal from "./small-modal.jsx"
import { toastr } from 'react-redux-toastr'
import Tappable from "react-tappable"
import * as strs from "../strings"
import * as utils from "../utils"
import ReactGA from "react-ga"

export default class ActionsArray extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showRefreshAllRecordsModal: false,
            showConfirmModal: false,
            showEntityGoneModal: false
        };
    }

    render() {
        const {
            entityType,
            entityId,
            editMode,
            cancelEntityEdit,
            requestInProgress,
            markEntityForEdit,
            cancelEntityAdd,
            downloadChangelogFn,
            deleteEntity,
            deleteEntityConfirmMessage,
            accountStatuses
        } = this.props
        let cancelButton = null
        let saveButton = null
        let editButton = null
        let deleteButton = null
        let synchronizeAccountButton = null
        let actions = []
        const editAllowed = utils.editOperationAllowed(accountStatuses)
        let alwaysEnabled = false
        if (this.props.alwaysEnabled != null) {
            alwaysEnabled = this.props.alwaysEnabled
        }
        if (entityId != null) {
            if (editMode) {
                cancelButton = (<Tappable key="cancelButton"
                                          className="btn btn-default"
                                          style={{marginBottom: 0, marginTop: 3, marginRight: 10}}
                                          onTap={() => {
                                                  if (!requestInProgress) {
                                                      ReactGA.event({
                                                          category: utils.GA_EVENT_CATEGORY_USER,
                                                          action: "cancel save entity",
                                                          label: entityType
                                                      })
                                                      cancelEntityEdit(entityId)
                                                  }
                                              }}
                                          disabled={requestInProgress}>Cancel</Tappable>)
                saveButton = (<Tappable key="saveButton"
                                        component="Button"
                                        type="submit"
                                        style={{fontSize: 16, marginBottom: 0, marginTop: 3, paddingTop: 10, paddingBottom: 10, paddingRight: 25, paddingLeft: 25}}
                                        className="btn btn-success"
                                        disabled={requestInProgress}>Save</Tappable>)
                actions.push(cancelButton)
                actions.push(saveButton)
            } else {
                editButton = (<Tappable key="editButton"
                                        className="btn btn-primary"
                                        style={{marginBottom: 0, marginTop: 3, marginRight: 5}}
                                        onTap={() => { if ((editAllowed || alwaysEnabled) && !requestInProgress) { markEntityForEdit(entityId)}} }
                                        disabled={(!editAllowed && !alwaysEnabled) || requestInProgress}>Edit</Tappable>)
                actions.push(editButton)
                if (downloadChangelogFn != null) {
                    synchronizeAccountButton = (
                        <div key="synchronizeAccountButton"
                             style={{display: "flex", alignItems: "center", marginTop: 5}}>
                            <Tappable className="btn btn-default"
                                      style={{marginBottom: 0, marginTop: 3, marginRight: 6}}
                                      onTap={() => { if (!requestInProgress) { downloadChangelogFn() }}}
                                      disabled={requestInProgress}>Synchronize Your Account</Tappable>
                            <Tappable component="div"
                                      className="question-mark"
                                      style={{marginTop: 3, marginLeft: 0}}
                                      onTap={() => {
                                              utils.trackAboutSynchronizeAccountModalViewed(this.props.containerUrl)
                                              this.setState({showRefreshAllRecordsModal: true})
                                          }}>i</Tappable>
                        </div>
                    )
                    actions.push(synchronizeAccountButton)
                }
                if (deleteEntity != null) {
                    deleteButton = (<Tappable key="deleteButton"
                                              className="btn btn-danger"
                                              style={{marginBottom: 0, marginLeft: 5, marginTop: 3}}
                                              disabled={(!editAllowed && !alwaysEnabled) || requestInProgress}
                                              onTap={() => { if ((editAllowed || alwaysEnabled) && !requestInProgress) { toastr.clean(); this.setState({showConfirmModal: true}) }}}>Delete</Tappable>)
                    actions.push(deleteButton)
                }
            }
        } else {
            cancelButton = (<Tappable key="cancelButton"
                                      className="btn btn-default"
                                      style={{marginBottom: 0, marginTop: 3, marginRight: 10}}
                                      onTap={() => {
                                              if (!requestInProgress) {
                                                  ReactGA.event({
                                                      category: utils.GA_EVENT_CATEGORY_USER,
                                                      action: "cancel add entity",
                                                      label: entityType
                                                  })
                                                  cancelEntityAdd()
                                              }
                                          }}
                                      disabled={requestInProgress}>Cancel</Tappable>)
            saveButton = (<Tappable key="saveButton"
                                    component="Button"
                                    type="submit"
                                    style={{fontSize: 16, marginBottom: 0, marginTop: 3, paddingTop: 10, paddingBottom: 10, paddingRight: 25, paddingLeft: 25}}
                                    className="btn btn-success"
                                    disabled={requestInProgress}>Save</Tappable>)
            actions.push(cancelButton)
            actions.push(saveButton)
        }
        return (
                <div>
                    <ConfirmModal
                        show={this.state.showConfirmModal}
                        onHide={() => this.setState({ showConfirmModal: false })}
                        noCancelButtonTitle="Cancel"
                        yesDoItButtonStyle="danger"
                        yesDoItButtonTitle="Yes, delete it"
                        yesDoIt={() => {
                                this.setState({ showConfirmModal: false })
                                deleteEntity(entityId)
                            }}
                        title="You sure?"
                        content={deleteEntityConfirmMessage} />
                    <Modal
                        show={this.state.showRefreshAllRecordsModal}
                        dialogClassName="riker-modal-dialog">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-sm">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                    <div>{strs.refresh_userdata_lbl}</div>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body><p>{strs.refresh_userdata_explanation_pp1}</p></Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default" onTap={() => this.setState({ showRefreshAllRecordsModal: false })}>Close</Tappable>
                        </Modal.Footer>
                    </Modal>
                    {actions}
                    {(() => {
                         if (!editMode && (!editAllowed && !alwaysEnabled)) {
                             return (<div style={{fontSize: ".75em", fontStyle: "italic", marginTop: 5}}>{this.props.msgIfDisabled}</div>)
                         }
                    })()}
                </div>
        )
    }
}
