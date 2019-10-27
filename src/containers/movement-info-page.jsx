import React from "react"
import PropTypes from "prop-types"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router"
import { push } from 'react-router-redux'
import { ButtonToolbar,
         Well,
         Button,
         DropdownButton,
         MenuItem,
         Breadcrumb,
         Panel,
         Col,
         ListGroup,
         ListGroupItem } from "react-bootstrap"
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import { destroy } from "redux-form"
import * as forms from "../forms"
import * as strs from "../strings"
import numeral from "numeral"
import * as gvs from "../grid-vals"
import { movementVariantSelected,
         movementSelected,
         bannerRemindLater,
         maintenanceAck } from "../actions/action-creators"
import NavbarBanner from "../components/navbar-banner.jsx"
import moment from "moment"
import Tappable from "react-tappable"

class MovementInfoPage extends React.Component {
    render() {
        const {
            movement,
            enableStartSetButtons,
            allMuscles,
            allMuscleGroups,
            allMuscleAliases,
            movementVariants,
            movementVariantsSortFn,
            handleSelectMovementFn,
            startSetFn,
            navigateTo
        } = this.props
        const movementName = movement.payload["movement/canonical-name"]
        const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
        const secondaryMuscleIds = movement.payload["movement/secondary-muscle-ids"]
        const theFollowingLabel = (prefix, entityType, ids) => (
            <div>The following {ids.length > 1 ? "are" : "is"} the <strong>{entityType}{ids.length > 1 ? "s" : ""}</strong> {prefix} the {movementName} movement:</div>
        )
        const muscleComp = (prefix, entityType, muscleIds) => {
            if (muscleIds.length > 0) {
                return (
                    <div>
                        {theFollowingLabel(prefix, entityType, muscleIds)}
                        {(() => {
                             let musclePanels = []
                             for (let i = 0; i < muscleIds.length; i++) {
                                 const muscle = allMuscles[muscleIds[i]]
                                 const muscleGroup = allMuscleGroups[muscle.payload["muscle/muscle-group-id"]]
                                 const aliasIds = muscle.payload["muscle/alias-ids"]
                                 let marginTop;
                                 let marginBottom;
                                 if (i == 0) {
                                     marginTop = 15
                                 }
                                 if (i + 1 < muscleIds.length) {
                                     marginBottom = 8
                                 }
                                 let aliasesStr = "";
                                 if (aliasIds != null) {
                                     for (let j = 0; j < aliasIds.length; j++) {
                                         let muscleAlias = allMuscleAliases[aliasIds[j]]
                                         aliasesStr += muscleAlias.payload["musclealias/alias"]
                                         if (j + 1 < aliasIds.length) {
                                             aliasesStr += ", "
                                         }
                                     }
                                 }
                                 let aliasDiv = null
                                 if (aliasIds != null && aliasIds.length > 0) {
                                     aliasDiv = (
                                         <div>
                                             {"Alias" + (aliasIds.length > 1 ? "es: " : ": ")}<strong>{aliasesStr}</strong>
                                         </div>
                                     )
                                 }
                                 musclePanels.push(
                                     <Panel
                                         style={{marginTop: marginTop, marginBottom: marginBottom}}
                                         key={i}>
                                         <Panel.Body>
                                             <h3 style={{marginTop: 2}}>{muscle.payload["muscle/canonical-name"]}</h3>
                                             <div style={{marginBottom: 0, paddingBottom: 0}}>
                                                 <div>Muscle group: <strong>{muscleGroup.payload["musclegroup/name"]}</strong></div>
                                                 {aliasDiv}
                                             </div>
                                         </Panel.Body>
                                     </Panel>
                                 )
                             }
                             return musclePanels
                        })()
                        }
                    </div>
                )
            }
            return null
        }
        return (
            <div>
                <RikerHelmet title="Movement Info" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h2 className="page-heading">{movementName}</h2>
                    {(() => {
                         if (enableStartSetButtons) {
                             return (
                                 <Tappable style={{marginBottom: 15}}
                                           className="btn btn-primary"
                                           onTap={() => {
                                                   if (movementVariants.length == 0) {
                                                       startSetFn(movement, null)
                                                   } else {
                                                       handleSelectMovementFn(movement)
                                                   }
                                               }}>
                                     Start Set
                                 </Tappable>
                             )
                         }
                     })()
                    }
                    {(() => {
                         let weightPercentage = movement.payload["movement/percentage-of-body-weight"]
                         if (!weightPercentage) {
                             weightPercentage = 1.0
                         }
                         if (movement.payload["movement/is-body-lift"]) {
                             return (
                                 <div style={{marginBottom: 15}}>
                                     <span>{_.capitalize(movementName) + " is a body-lift movement that Riker estimates to use "}<strong>{weightPercentage * 100 + "%"}</strong> of your body weight.</span>
                                 </div>
                             )
                         } else if (movementVariants.length > 0) {
                             for (let i = 0; i < movementVariants.length; i++) {
                                 const movementVariant = movementVariants[i]
                                 if (movementVariant.payload["movementvariant/id"] == utils.BODY_MOVEMENT_VARIANT_ID) {
                                     return (
                                         <div style={{marginBottom: 15}}>
                                             <span>{_.capitalize(movementName) + " has a body-lift variant.  When using this variant, Riker estimates that "}<strong>{weightPercentage * 100 + "%"}</strong> your body weight is used.</span>
                                         </div>
                                     )
                                 }
                             }
                         }
                     })()
                    }
                    {(() => {
                         const aliases = movement.payload["movement/aliases"]
                         if (aliases != null && aliases.length > 0) {
                             let aliasStrings = []
                             aliasStrings.push(<span key="0">{_.capitalize(movementName) + " is also known by the following name" + (aliases.count > 1 ? "s: " : ": ")}</span>)
                             for (let i = 0; i < aliases.length; i++) {
                                 aliasStrings.push(<span key={"a" + i}><strong>{aliases[i]}</strong></span>)
                                 if (i + 2 < aliases.length) {
                                     aliasStrings.push(<span key={"c" + i}>, </span>)
                                 } else if (i + 1 < aliases.length) {
                                     aliasStrings.push(<span key={"and" + i}> and </span>)
                                 }
                             }
                             aliasStrings.push(<span key={"period"}>.</span>)
                             return (
                                 <div style={{marginBottom: 15}}>
                                     {aliasStrings}
                                 </div>
                             )
                         }
                     })()
                    }
                    {muscleComp("hit by", "primary muscle", primaryMuscleIds)}
                    {muscleComp("hit by", "secondary muscle", secondaryMuscleIds)}
                    {(() => {
                         if (movementVariants.length > 0) {
                             let variantPanels = []
                             for (let i = 0; i < movementVariants.length; i++) {
                                 const movementVariant = movementVariants[i]
                                 let marginTop;
                                 let marginBottom;
                                 if (i == 0) {
                                     marginTop = 15
                                 }
                                 if (i + 1 < movementVariants.length) {
                                     marginBottom = 8
                                 }
                                 variantPanels.push(
                                     <Panel
                                         style={{marginTop: marginTop, marginBottom: marginBottom}}
                                         key={i}>
                                         <div>
                                             <span style={{fontSize: "1.2em", verticalAlign: "middle", marginTop: 0, marginBottom: 0, marginRight: 15}}>{movementVariant.payload["movementvariant/name"]}</span>
                                             {(() => {
                                                  if (enableStartSetButtons) {
                                                      return (
                                                          <Tappable
                                                              style={{float: "right", marginRight: 30}}
                                                              className="btn btn-primary"
                                                              onTap={() => startSetFn(movement, movementVariant)}>
                                                              Start Set
                                                          </Tappable>
                                                      )
                                                  }
                                              })()
                                             }
                                         </div>
                                     </Panel>
                                 )
                             }
                             return (
                                 <div>
                                     {theFollowingLabel("available for", "variant", movementVariants)}
                                     {variantPanels}
                                 </div>
                             )
                         }
                         return null
                     })()
                    }
                    <div style={{marginTop: 15}}>
                        <span>Spot something wrong?&nbsp;&nbsp;Drop us a line at: <a href={"mailto:" + utils.SUPPORT_EMAIL}>{utils.SUPPORT_EMAIL}</a>.</span>
                    </div>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
MovementInfoPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const movement = state.serverSnapshot._embedded["movements"][ownProps.location.query.movementId]
    const enableStartSetButtons = ownProps.location.query.enableStartSetButtons == 'true'
    return {
        movement: movement,
        enableStartSetButtons: enableStartSetButtons,
        allMuscles: state.serverSnapshot._embedded["muscles"],
        allMuscleGroups: state.serverSnapshot._embedded["muscle-groups"],
        allMuscleAliases: state.serverSnapshot._embedded["muscle-aliases"],
        movementVariants: utils.movementVariantItems(movement, _.values(state.serverSnapshot._embedded["movement-variants"])),
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        requestInProgress: state.api.requestInProgress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        navigateTo: url => { dispatch(push(url)) },
        movementVariantsSortFn: utils.makeAscendPaylaodComparator("movementvariant/name", null, null),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck()),
        startSetFn: (movement, movementVariant) => {
            dispatch(movementSelected(movement.payload["movement/id"]))
            dispatch(movementVariantSelected(movementVariant != null ? movementVariant.payload["movementvariant/id"] : null))
            dispatch(push(urls.ENTER_REPS_URI))
        },
        handleSelectMovementFn: movement => {
            dispatch(movementSelected(movement.payload["movement/id"]))
            dispatch(push(urls.SELECT_MOVEMENT_OPTION_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovementInfoPage)
