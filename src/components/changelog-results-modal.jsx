import React from "react"
import { Modal, Image } from "react-bootstrap";
import _ from "lodash"
import Tappable from "react-tappable"
import * as utils from "../utils"
import * as strs from "../strings"
import * as entkeys from "../entity-keys"
import pluralize from "pluralize"

export default class ChangelogResultsModal  extends React.Component {
    render() {
        const {
            changelogCounts,
            dismissChangelogReport
        } = this.props
        let {
            alreadySynchronizedMessage,
            alreadySynchronizedImage,
            dismissChangelogReportButtonLabel
        } = this.props
        if (dismissChangelogReportButtonLabel == null) {
            dismissChangelogReportButtonLabel = "Close"
        }
        if (alreadySynchronizedMessage == null) {
            alreadySynchronizedMessage = "Your account is already synchronized."
        }
        if (alreadySynchronizedImage == null) {
            alreadySynchronizedImage = "green-checkmark-30x30.svg"
        }
        return (
            <Modal
                show={!_.isEmpty(changelogCounts)}
                dialogClassName="riker-modal-dialog">
                <Modal.Body>
                    {(() => {
                         let sections = []
                         let key = 0
                         const addItems = (items, countsKey, entityName) => {
                             if (changelogCounts[countsKey] != null && changelogCounts[countsKey].added > 0) {
                                 items.push(<li key={key}>{utils.numberWithCommas(changelogCounts[countsKey].added) + " " + pluralize(entityName, changelogCounts[countsKey].added)} added</li>)
                                 key++
                             }
                             if (changelogCounts[countsKey] != null && changelogCounts[countsKey].updated > 0) {
                                 items.push(<li key={key}>{utils.numberWithCommas(changelogCounts[countsKey].updated) + " " + pluralize(entityName, changelogCounts[countsKey].updated)} updated</li>)
                                 key++
                             }
                             if (changelogCounts[countsKey] != null && changelogCounts[countsKey].deleted > 0) {
                                 items.push(<li key={key}>{utils.numberWithCommas(changelogCounts[countsKey].deleted) + " " + pluralize(entityName, changelogCounts[countsKey].deleted)} deleted</li>)
                                 key++
                             }
                         }
                         const addInsertItems = (items, countsKey, entityName) => {
                             if (changelogCounts[countsKey] != null && changelogCounts[countsKey].added > 0) {
                                 items.push(<li key={key}>{utils.numberWithCommas(changelogCounts[countsKey].added) + " " + pluralize(entityName, changelogCounts[countsKey].added)} added</li>)
                                 key++
                             }
                         }
                         let anyUserDataChanges
                         if (utils.hasEdits(changelogCounts[entkeys.usersettings]) ||
                             utils.hasEdits(changelogCounts[entkeys.user]) ||
                             utils.hasEdits(changelogCounts[entkeys.sets]) ||
                             utils.hasEdits(changelogCounts[entkeys.supersets]) ||
                             utils.hasEdits(changelogCounts[entkeys.cardioLogs]) ||
                             utils.hasEdits(changelogCounts[entkeys.bodyJournalLogs]) ||
                             utils.hasEdits(changelogCounts[entkeys.sorenessLogs])) {
                             anyUserDataChanges = true
                             let items = []
                             addItems(items, entkeys.sets, "set")
                             addItems(items, entkeys.bodyJournalLogs, "body measurement log")
                             if (changelogCounts.usersettings != null && changelogCounts.usersettings.updated > 0) {
                                 items.push(<li key={key}>Profile and Settings updated</li>)
                                 key++
                             }
                             if (changelogCounts.user != null && changelogCounts.user.updated > 0) {
                                 items.push(<li key={key}>My Account updated</li>)
                                 key++
                             }
                             sections.push(
                                 <div key={"userdata_0"}>
                                     <div style={{display: "flex", alignItems: "center"}}>
                                         <Image src="/images/green-checkmark-30x30.svg" style={{marginRight: 8}} />
                                         <div>Your account is now synchronized.  Here's what synced:</div>
                                     </div>
                                     <ul style={{marginTop: 8}}>{items}</ul>
                                 </div>
                             )
                         } else {
                             anyUserDataChanges = false
                             sections.push(
                                 <div key={"userdata_1"} style={{display: "flex", alignItems: "center"}}>
                                     <Image src={"/images/" + alreadySynchronizedImage} style={{marginRight: 8}} />
                                     <div>{alreadySynchronizedMessage}</div>
                                 </div>
                             )
                         }
                         // Newly ADDED movements are noteworthy and get their own info section (but not updated movements)
                         let anyMovementsAddedChanges = false
                         if (utils.hasInserts(changelogCounts[entkeys.movements])) {
                             anyMovementsAddedChanges = true
                             let items = []
                             addInsertItems(items, entkeys.movements, "movement")
                             sections.push(
                                 <div key={"movementdata_0"}>
                                     <hr />
                                     {(() => {
                                          if (anyUserDataChanges) {
                                              return (
                                                  <div style={{display: "flex", alignItems: "center"}}>
                                                      <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                                      <div>{"In addition to synchronizing your account, there was some new Riker movements downloaded" + (anyUserDataChanges ? " as well" : "") + ".  Here's what:"}</div>
                                                  </div>
                                              )
                                          } else {
                                              return (
                                                  <div style={{display: "flex", alignItems: "center"}}>
                                                      <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                                      <div>{"There was some Riker movements downloaded" + (anyUserDataChanges ? " as well" : "")  + ".  Here's what:"}</div>
                                                  </div>
                                              )
                                          }
                                      })()
                                     }
                                     <ul style={{marginTop: 8}}>{items}</ul>
                                 </div>
                             )
                         }
                         // we'll consider updated movements like 'internal data updates' only
                         let anyReferenceDataChanges = false
                         if (utils.hasUpdates(changelogCounts[entkeys.movements]) ||
                             utils.hasEdits(changelogCounts[entkeys.originationDevices]) ||
                             utils.hasEdits(changelogCounts[entkeys.bodySegments]) ||
                             utils.hasEdits(changelogCounts[entkeys.muscleGroups]) ||
                             utils.hasEdits(changelogCounts[entkeys.muscles]) ||
                             utils.hasEdits(changelogCounts[entkeys.muscleAliases]) ||
                             utils.hasEdits(changelogCounts[entkeys.movementAliases]) ||
                             utils.hasEdits(changelogCounts[entkeys.movementVariants]) ||
                             utils.hasEdits(changelogCounts[entkeys.cardioTypes]) ||
                             utils.hasEdits(changelogCounts[entkeys.walkingPaces])) {
                             anyReferenceDataChanges = true
                             let items = []
                             addItems(items, entkeys.originationDevices, "origination device type")
                             addItems(items, entkeys.bodySegments,     "body segment")
                             addItems(items, entkeys.muscleGroups,     "muscle group")
                             addItems(items, entkeys.muscles,          "muscle")
                             addItems(items, entkeys.muscleAliases,    "muscle alias")
                             addItems(items, entkeys.movementAliases,  "movement alias")
                             addItems(items, entkeys.movementVariants, "movement variant")
                             addItems(items, entkeys.cardioTypes,      "cardio type")
                             addItems(items, entkeys.walkingPaces,     "walking pace")
                             let message;
                             if (anyUserDataChanges) {
                                 if (anyMovementsAddedChanges) {
                                     message = "And finally, there were some internal Riker updates downloaded."
                                 } else {
                                     message = "There were some internal Riker updates downloaded as well."
                                 }
                             } else if (anyMovementsAddedChanges) {
                                 message = "There were some internal Riker updates downloaded as well."
                             } else {
                                 message = "There were some internal Riker updates downloaded."
                             }
                             sections.push(
                                 <div key={"refdata_0"}>
                                     <hr />
                                     <div style={{display: "flex", alignItems: "center"}}>
                                         <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                         <div>{message}</div>
                                     </div>
                                 </div>
                             )
                         }
                         return sections
                     })()
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Tappable className="btn btn-default" onTap={() => dismissChangelogReport()}>{dismissChangelogReportButtonLabel}</Tappable>
                </Modal.Footer>
            </Modal>
        )
    }
}
