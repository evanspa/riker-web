import React from "react"
import { push } from 'react-router-redux'
import { Image, Modal, Breadcrumb, Row, Col, Tabs } from "react-bootstrap"
import { Link } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { connect } from 'react-redux'
import RikerHelmet from "./riker-helmet.jsx"
import RikerNavBar from "./riker-navbar.jsx"
import EntityList from "./entity-list.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import NavbarBanner from "./navbar-banner.jsx"
import Tappable from "react-tappable"
import DownloadButton from "./download-button.jsx"
import moment from "moment"
import ReactGA from "react-ga"

export default class EntitiesPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { showAboutExportDialog: false, showNoRecordsToExportModal: false }
    }

    render() {
        const {
            containerUrl,
            entityType,
            entityIdKey,
            entities,
            fields,
            entityRowOnClick,
            entitiesSortFn,
            handleAddEntity,
            entityLinkToFn,
            goBackFn,
            breadcrumbActiveLabel
        } = this.props
        const capitalizedEntityType = entityType.toTitleCase()
        const editAllowed = utils.editOperationAllowed(this.props.accountStatuses)
        const isAccountVerified = this.props.verifiedAt != null
        return (
            <div>
                <RikerHelmet title={"Your " + capitalizedEntityType + "s"} />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <Modal
                    show={this.state.showNoRecordsToExportModal}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/yellow-exclamation-30x30.svg" style={{marginRight: 8}} />
                                <div>Export</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{"There are no " + entityType + " records to export." }</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default"
                                  onTap={() => this.setState({showNoRecordsToExportModal: false})}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showAboutExportDialog}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                <div>Export</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{"Exports your " + entityType + " records to a CSV file, suitable for importing into Excel."}</p>
                        <p>Riker CSV export files can also be imported; this is useful if you decide to not create a Riker subscription, and use the apps anonymously, and you need to move your data from one device to another.</p>
                        <p>Your account must be <strong>verified</strong> in order to import CSV files.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default"
                                  onTap={() => this.setState({showAboutExportDialog: false})}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Breadcrumb>
                        <LinkContainer to={{pathname: urls.RECORDS_URI}}>
                            <Breadcrumb.Item>
                                Records
                            </Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item active>
                            {breadcrumbActiveLabel}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <h3 className="page-heading">{"Your " + capitalizedEntityType + "s"}</h3>
                    <div className="pull-right" style={{display: "flex", alignItems: "center"}}>
                        {(() => {
                             if (_.keys(entities).length > 0) {
                                 return (
                                     <div style={{marginBottom: 10}}>
                                         <Tappable
                                             style={{marginRight: 5}}
                                             className="btn btn-sm btn-default"
                                             disabled={!editAllowed || !isAccountVerified}
                                             onTap={() => { if (editAllowed && isAccountVerified) this.props.navigateTo(this.props.entitiesImportUrl)} }>Import</Tappable>
                                         <DownloadButton
                                             className="btn btn-sm btn-default"
                                             downloadTitle="Export"
                                             style={{marginRight: 0}}
                                             genFile={() => {
                                                     ReactGA.event({
                                                         category: utils.GA_EVENT_CATEGORY_USER,
                                                         action: "csv export",
                                                         label: entityType + "s"
                                                     })
                                                     const fileName = "riker-" + this.props.csvExportFileNamePart + "s-" + moment().format("YYYY-MM-DD") + ".csv"
                                                     return {
                                                         mime: "text/csv",
                                                         filename: fileName,
                                                         contents: utils.toCsv(this.props.csvFields, entities, entitiesSortFn)
                                                     }
                                             }} />
                                         <Tappable component="span"
                                                   className="question-mark"
                                                   onTap={() => {
                                                           ReactGA.modalview(containerUrl + "/about-csv-export")
                                                           this.setState({showAboutExportDialog: true})
                                                   }}>i</Tappable>
                                         {(() => {
                                              if (!editAllowed) {
                                                  return (<div style={{fontSize: ".75em", fontStyle: "italic", marginTop: 5}}>account closed - 'Import' disabled</div>)
                                              }
                                              if (!isAccountVerified) {
                                                  return (<div style={{fontSize: ".75em", fontStyle: "italic", marginTop: 5}}>account not verified - 'Import' disabled</div>)
                                              }
                                         })()}
                                     </div>
                                 )
                             } else {
                                 return (
                                     <div style={{marginBottom: 10}}>
                                         <Tappable
                                             style={{marginRight: 5}}
                                             className="btn btn-sm btn-default"
                                             disabled={!editAllowed || !isAccountVerified}
                                             onTap={() => { if (editAllowed && isAccountVerified) this.props.navigateTo(this.props.entitiesImportUrl)} }>Import</Tappable>
                                         <Tappable
                                             style={{marginRight: 0}}
                                             className="btn btn-sm btn-default"
                                             onTap={() => this.setState({showNoRecordsToExportModal: true})}>Export</Tappable>
                                         <Tappable className="question-mark"
                                                   component="span"
                                                   onTap={() => {
                                                           ReactGA.modalview(containerUrl + "/about-csv-export")
                                                           this.setState({showAboutExportDialog: true})
                                                   }}>i</Tappable>
                                         {(() => {
                                              if (!editAllowed) {
                                                  return (<div style={{fontSize: ".75em", fontStyle: "italic", marginTop: 5}}>account closed - 'Import' disabled</div>)
                                              }
                                              if (!isAccountVerified) {
                                                  return (<div style={{fontSize: ".75em", fontStyle: "italic", marginTop: 5}}>account not verified - 'Import' disabled</div>)
                                              }
                                         })()}
                                     </div>
                                 )
                             }
                        })()
                        }
                    </div>
                    <EntityList
                        entityType={entityType}
                        entities={entities}
                        navigateTo={this.props.navigateTo}
                        fields={fields}
                        accountStatuses={this.props.accountStatuses}
                        handleAddEntity={handleAddEntity}
                        entityRowOnClick={entityRowOnClick}
                        entityIdKey={entityIdKey}
                        entitiesSortFn={entitiesSortFn}
                        entityLinkToFn={entityLinkToFn}
                    />
                </Col>
            </div>
        )
    }
}
