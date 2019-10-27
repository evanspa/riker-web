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
         PanelGroup,
         Panel,
         Col,
         ListGroup,
         ListGroupItem } from "react-bootstrap";
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import RikerHelmet from "../components/riker-helmet.jsx";
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
         bannerRemindLater,
         muscleGroupExpanded,
         maintenanceAck } from "../actions/action-creators"
import NavbarBanner from "../components/navbar-banner.jsx"
import moment from "moment"
import Tappable from "react-tappable"

class GeneralInfoPage extends React.Component {

    render() {
        const {
            allMovements,
            allMuscles,
            allMuscleGroups,
            expandedMuscleGroupId,
            setExpandedMuscleGroupId,
            navigateTo
        } = this.props
        return (
            <div>
                <RikerHelmet title="General Info" />
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
                    <h2 className="page-heading">General Info</h2>
                    <div>
                        From here you can learn how Riker calculates how your workouts impact the various muscles of your body, as well as dive into the details of how Riker maps the muscles hit by the available movements.
                    </div>
                    <PanelGroup style={{marginTop: 20}} accordion id="how-riker-calculates">
                        <Panel style={{marginTop: 5}} eventKey="1">
                            <Panel.Collapse onEntered={utils.makeTrackModalViewFn(urls.GENERAL_INFO_URI, "how-distributes-to-muscles")} />
                            <Panel.Heading>
                                <Panel.Title toggle>{<span style={{fontSize: "105%"}}>How does Riker distribute the weight lifted, or the reps performed, of a set to the impacted muscles?</span>}</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <div>Every movement in Riker hits a set of muscles.  There are <strong>primary muscles</strong> hit and <strong>secondary muscles</strong> hit.</div>
                                <div style={{marginTop: 10}}>For example, the primary muscles hit with <strong>bench press</strong> are:  the upper and lower chest muscles.  The secondary muscles hit are: the three heads of the tricep muscle group.</div>
                                <div style={{marginTop: 10}}>Riker distributes <strong>80%</strong> of the total weight lifted and reps of a set to the primary muscles hit, and distributes the remaining <strong>20%</strong> to the secondary muscles hit.</div>
                                <div style={{marginTop: 10}}>If there are multiple primary muscles and multiple secondary muscles hit, the assigned weight and reps are distributed across them evenly.</div>
                                <div style={{marginTop: 10}}>So if you do a set of <strong>10 reps of 135 lbs</strong> on bench press, the total weight lifted is: <strong>1,350 lbs</strong>.  80% of that weight (<strong>1,080 lbs</strong>) and 80% of the reps (<strong>8 reps</strong>) are assigned to the primary muscles; the upper and lower chest.  Since there are 2 primary muscles hit, they are each assigned <strong>540 lbs and 4 reps</strong>.  The secondary muscles hit are assigned 20% of the total weight lifted and reps (<strong>270 lbs and 2 reps</strong>).  Since there are 3 secondary muscles hit (medial, lateral and long heads of the tricep), they are each assigned <strong>90 lbs and 0.67 reps</strong>.</div>
                            </Panel.Body>
                        </Panel>
                    </PanelGroup>
                    <div style={{marginTop: 20}}>Riker supports the following movements (organized by muscle group):</div>
                    <PanelGroup style={{marginTop: 10}} defaultActiveKey={expandedMuscleGroupId} accordion id="riker-movements">
                        {(() => {
                             const allMovementsArray = _.values(allMovements)
                             const muscleGroupMovements = {}
                             for (let i = 0; i < allMovementsArray.length; i++) {
                                 const movement = allMovementsArray[i]
                                 const movementId = movement.payload["movement/id"]
                                 const primaryMuscleIds = movement.payload["movement/primary-muscle-ids"]
                                 for (let j = 0; j < primaryMuscleIds.length; j++) {
                                     const muscleId = primaryMuscleIds[j]
                                     const muscleGroup = allMuscleGroups[allMuscles[muscleId].payload["muscle/muscle-group-id"]]
                                     const muscleGroupId = muscleGroup.payload["musclegroup/id"]
                                     let muscleGroupMovementIds = muscleGroupMovements[muscleGroupId]
                                     if (!muscleGroupMovementIds) {
                                         muscleGroupMovementIds = {}
                                         muscleGroupMovements[muscleGroupId] = muscleGroupMovementIds
                                     }
                                     muscleGroupMovementIds[movementId] = movementId
                                 }
                             }
                             const allMuscleGroupsArray = _.values(allMuscleGroups)
                             allMuscleGroupsArray.sort(utils.makeAscendPaylaodComparator("musclegroup/name", null, null))
                             let muscleGroupPanels = []
                             for (let i = 0; i < allMuscleGroupsArray.length; i++) {
                                 const muscleGroup = allMuscleGroupsArray[i]
                                 const muscleGroupId = muscleGroup.payload["musclegroup/id"]
                                 const movementIds = muscleGroupMovements[muscleGroupId]
                                 let movementPanels = []
                                 const movementIdsArray = _.values(movementIds)
                                 const movements = []
                                 for (let j = 0; j < movementIdsArray.length; j++) {
                                     movements.push(allMovements[movementIdsArray[j]])
                                 }
                                 movements.sort(utils.makeAscendPaylaodComparator("movement/canonical-name", null, null, _.lowerCase))
                                 for (let j = 0; j < movements.length; j++) {
                                     const movement = movements[j]
                                     movementPanels.push(
                                         <Panel
                                             key={"movement_" + i + "_" + j}
                                             eventKey={i + j}>
                                             <Panel.Body>
                                                 <div>
                                                     <Link to={urls.MOVEMENT_INFO_URI + "?movementId=" + movement.payload["movement/id"] + "&enableStartSetButtons=true"}>{movement.payload["movement/canonical-name"]}</Link>
                                                 </div>
                                             </Panel.Body>
                                         </Panel>
                                     )
                                 }
                                 muscleGroupPanels.push(
                                     <Panel key={muscleGroupId} eventKey={muscleGroupId}>
                                         <Panel.Collapse onEntered={() => setExpandedMuscleGroupId(muscleGroupId)}
                                                         onExited={() => setExpandedMuscleGroupId(null)} />
                                         <Panel.Heading>
                                             <Panel.Title toggle>{<span style={{fontSize: "105%"}}>{allMuscleGroupsArray[i].payload["musclegroup/name"]}</span>}</Panel.Title>
                                         </Panel.Heading>
                                         <Panel.Body collapsible>
                                             {movementPanels}
                                         </Panel.Body>
                                     </Panel>
                                 )
                             }
                             return muscleGroupPanels
                        })()
                        }
                    </PanelGroup>
                    <div style={{marginTop: 15}}>
                        <span>Spot something wrong?  Can't find your movement?  Drop us a line at: <a href={"mailto:" + utils.SUPPORT_EMAIL}>{utils.SUPPORT_EMAIL}</a>.</span>
                    </div>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
GeneralInfoPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        expandedMuscleGroupId: state.expandedMuscleGroupId,
        allMovements: state.serverSnapshot._embedded["movements"],
        allMuscles: state.serverSnapshot._embedded["muscles"],
        allMuscleGroups: state.serverSnapshot._embedded["muscle-groups"],
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        requestInProgress: state.api.requestInProgress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setExpandedMuscleGroupId: mgId => dispatch(muscleGroupExpanded(mgId)),
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfoPage)
