import React from "react"
import { Modal, Label, Image, Breadcrumb, Well, Col, Panel, Button } from "react-bootstrap"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import { toastr } from 'react-redux-toastr'
import _ from "lodash"
import * as utils from "../utils"
import * as urls from "../urls"
import * as strs from "../strings"
import * as gvs from "../grid-vals"
import NavbarBanner from "../components/navbar-banner.jsx"
import Dropzone from "react-dropzone"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import ReactGA from "react-ga"
import NotAllowedModal from "./not-allowed-modal.jsx"

export default class EntitiesImportPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { fileAdded: false,
                       fileToImport: null,
                       maxAllowedExceeded: false,
                       maxAllowedExceededAck: false }
    }

    render() {
        return (
            <div>
                <RikerHelmet title={this.props.pageTitle} />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <ChangelogResultsModal
                    changelogCounts={this.props.changelogCounts}
                    dismissChangelogReport={this.props.dismissChangelogReport} />
                <NotAllowedModal
                    responseStatus={this.props.responseStatus}
                    navigateTo={this.props.navigateTo}
                    clearErrors={this.props.clearErrors} />
                <Modal
                    show={this.props.fileImportSuccess}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/green-checkmark-30x30.svg" style={{marginRight: 8}} />
                                <div>Import Successful</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.successMessage}</p>
                        <p>Lets go ahead and synchronize your account.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable
                            className="btn btn-default"
                            onTap={() => {
                                    this.props.fileImportSuccessUserAckFn()
                                    this.props.downloadChangelog()
                                }}>{strs.refresh_userdata_lbl}</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.props.fileImportError && this.props.responseStatus != 403 && this.props.responseStatus != 413}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/red-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Import Failed</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>There was a problem attempting to import your CSV file.  There is probably something wrong with your CSV file.  Double check the following:</p>
                        <ul>
                            <li>You've uploaded a CSV file containing <strong>{this.props.entityType}</strong> data.</li>
                            <li>You haven't made any changes to the CSV file after you exported it.</li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable
                            className="btn btn-default"
                            onTap={() => {
                                    this.props.fileImportErrorUserAckFn()
                                }}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.props.fileImportError && this.props.responseStatus == 413}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/red-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Import Failed</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>There was a problem attempting to import your CSV file.  Your import file is too big.</p>
                        <p>Contact <a target="_blank" href={"mailto:" + utils.SUPPORT_EMAIL}>{utils.SUPPORT_EMAIL}</a> and we'll help you out.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable
                            className="btn btn-default"
                            onTap={() => {
                                    this.props.fileImportErrorUserAckFn()
                                }}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.maxAllowedExceeded && !this.state.maxAllowedExceededAck}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/red-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Import Not Allowed</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{"We are unable to import your CSV file because you've exceeded the amount of " + this.props.entityType + " data you're allowed to import."}</p>
                        <p>Please contact <a target="_blank" href={"mailto:" + utils.SUPPORT_EMAIL}>{utils.SUPPORT_EMAIL}</a> and we'll try to help you out.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable
                            className="btn btn-default"
                            onTap={() => this.setState({maxAllowedExceededAck: true})}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h3 className="page-heading">{this.props.pageHeading}</h3>
                    <Well>
                        {(() => {
                             if (this.state.fileAdded) {
                                 return (
                                     <div>
                                         <div style={{display: "flex"}}>
                                             <strong>File to import: </strong>  <Label style={{marginLeft: 5, display: "flex", alignItems: "center"}} bsStyle="primary">{this.state.fileToImport.name}</Label>
                                         </div>
                                         <hr />
                                         <Dropzone
                                             onDrop={files => {
                                                     ReactGA.event({
                                                         category: utils.GA_EVENT_CATEGORY_USER,
                                                         action: "csv import file selected",
                                                         label: this.props.entityType
                                                     })
                                                     this.setState({fileAdded: true, fileToImport: files[0]})
                                                 }}
                                             multiple={false}>
                                             <div style={{padding: 15}}>{this.props.dragFileMessage}</div>
                                         </Dropzone>
                                         <hr />
                                         <div>
                                             <Tappable className="btn btn-default"
                                                       style={{marginRight: 5}}
                                                       onTap={() => {
                                                               ReactGA.event({
                                                                   category: utils.GA_EVENT_CATEGORY_USER,
                                                                   action: "csv import canceled",
                                                                   label: this.props.entityType
                                                               })
                                                               this.props.doGoBack()
                                                           }}>Cancel</Tappable>
                                             <Tappable className="btn btn-lg btn-primary"
                                                       onTap={() => {
                                                               if (this.props.importedEntityCount >= this.props.maxAllowed) {
                                                                   this.setState({maxAllowedExceeded: true, maxAllowedExceededAck: false})
                                                               } else {
                                                                   this.props.uploadFn(this.state.fileToImport)
                                                               }
                                                           }}>Upload</Tappable>
                                         </div>
                                     </div>
                                 )
                             } else {
                                 return (
                                     <div>
                                         <Dropzone
                                             onDrop={files => {
                                                     ReactGA.event({
                                                         category: utils.GA_EVENT_CATEGORY_USER,
                                                         action: "csv import file selected",
                                                         label: this.props.entityType
                                                     })
                                                     this.setState({fileAdded: true, fileToImport: files[0]})
                                                 }}
                                             multiple={false}>
                                             <div style={{padding: 15}}>{this.props.dragFileMessage}</div>
                                         </Dropzone>
                                         <hr />
                                         <div>
                                             <Tappable className="btn btn-default"
                                                       style={{marginRight: 5}}
                                                       onTap={() => {
                                                               ReactGA.event({
                                                                   category: utils.GA_EVENT_CATEGORY_USER,
                                                                   action: "csv import canceled",
                                                                   label: this.props.entityType
                                                               })
                                                               this.props.doGoBack()
                                                           }}>Cancel</Tappable>
                                             <Tappable className="btn btn-default"
                                                       disabled={true}
                                                       onTap={() => {}}>Upload</Tappable>
                                         </div>
                                     </div>
                                 )
                             }
                        })()
                        }
                    </Well>
                </Col>
            </div>
        )
    }
}
