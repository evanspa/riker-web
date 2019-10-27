import React from "react"
import { Well, Button, Modal, Image } from "react-bootstrap"
import * as utils from "../utils"
import _ from "lodash"
import Tappable from "react-tappable"

export default class ButtonSelection extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = { showHelpTextModal: false, helpTitle: null, helpText: null }
    }

    render() {
        const {
            entities,
            entitiesSortFn,
            entityIdKey,
            entityDisplayKey,
            entityHelpTextKey,
            handleButtonClickFn,
            colorizeLast
        } = this.props
        return (
            <Well>
                <Modal
                    show={this.state.showHelpTextModal}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                <div>{this.state.helpTitle}</div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body><p>{this.state.helpText}</p></Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => this.setState({ showHelpTextModal: false })}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                {(() => {
                     let entitiesArray
                     if (_.isArray(entities)) {
                         entitiesArray = entities
                     } else {
                         entitiesArray = _.values(entities)
                     }
                     if (entitiesSortFn != null) {
                         entitiesArray.sort(entitiesSortFn)
                     }
                     let rows = []
                     let areAnyHelpText = false
                     if (entityHelpTextKey != null) {
                         for (let i = 0; i < entitiesArray.length; i++) {
                             if (entitiesArray[i].payload[entityHelpTextKey] != null) {
                                 areAnyHelpText = true
                                 break
                             }
                         }
                     }
                     for (let i = 0; i < entitiesArray.length; i++) {
                        let topMargin = 20
                        if (i == 0) {
                            topMargin = 0
                        }
                        const isLast = (i + 1) == entitiesArray.length
                        const entity = entitiesArray[i]
                        const entityPayload = entity.payload
                        const entityId = entityPayload[entityIdKey]
                        let entityHelpText = null
                        if (entityHelpTextKey != null) {
                            entityHelpText = entityPayload[entityHelpTextKey]
                        }
                        rows.push(
                            <div key={entityId} style={{marginTop: topMargin, textAlign: "center"}}>
                                {(() => {
                                     if (entityHelpText != null) {
                                         return (
                                             <div style={{display: "flex", alignItems: "center", width: "50%", margin: "0 auto"}}>
                                                 <Tappable className="select-btn btn btn-lg btn-primary" onTap={() => handleButtonClickFn(entity)}>
                                                     {entityPayload[entityDisplayKey]}
                                                 </Tappable>
                                                 <Tappable component="div"
                                                           className="question-mark"
                                                           onTap={() => this.setState({showHelpTextModal: true,
                                                                                       helpTitle: entityPayload[entityDisplayKey],
                                                                                       helpText: entityHelpText})}>i</Tappable>
                                             </div>
                                         )
                                     } else {
                                         if (areAnyHelpText) {
                                             return (
                                                 <div style={{display: "flex", alignItems: "center", width: "50%", margin: "0 auto"}}>
                                                     <Tappable
                                                         className="select-btn btn btn-lg btn-primary"
                                                         onTap={() => handleButtonClickFn(entity)}>
                                                         {entityPayload[entityDisplayKey]}
                                                     </Tappable>
                                                     <div style={{visibility: "hidden"}}className="question-mark">i</div>
                                                 </div>
                                             )
                                         } else {
                                             return (
                                                 <Tappable
                                                     className="select-btn btn btn-lg btn-primary"
                                                     style={isLast && colorizeLast ? {backgroundColor: utils.RIKERAPP_BLACK_HEX} : {}}
                                                     onTap={() => handleButtonClickFn(entity)}>
                                                     {entityPayload[entityDisplayKey]}
                                                 </Tappable>
                                             )
                                         }
                                     }
                                })()
                                }
                            </div>
                        )
                    }
                    return rows;
                })()
                }
            </Well>
        )
    }
}
