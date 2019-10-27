import React from "react"
import PropTypes from "prop-types"
import { push, goBack } from "react-router-redux"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import * as apiUtils from "../actions/api-utils"
import Tappable from "react-tappable"
import NavbarBanner from "../components/navbar-banner.jsx"
import { maintenanceAck,
         bannerRemindLater } from "../actions/action-creators"
import * as strs from "../strings"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import { Link } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { connect } from "react-redux"
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import { Col } from "react-bootstrap"
import _ from "lodash"
import Loading from "../components/loading.jsx"

class WorkoutsPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            processing: true, workoutsTuple: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.processing != nextState.processing
    }

    componentDidMount() {
        setTimeout(() => {
            const workoutsLoadingPromise = new Promise((resolve, reject) => {
                const {
                    doGoBack,
                    sets,
                    bmls,
                    userSettings,
                    allMovements,
                    allMuscleGroups,
                    allMuscles
                } = this.props
                const setsArray = _.values(sets)
                setsArray.sort((s1, s2) => s2.payload["set/logged-at"] - s1.payload["set/logged-at"]) // make descending
                const workoutsTuple = utils.workoutsTupleForDescendingSets(setsArray,
                                                                           userSettings,
                                                                           allMovements,
                                                                           allMuscleGroups,
                                                                           allMuscles,
                                                                           _.values(bmls))
                setTimeout(() => {
                    resolve({ processing: false, workoutsTuple: workoutsTuple })
                }, 50)
            })
            workoutsLoadingPromise.then(newState => {
                this.setState(newState)
            })
        }, 50)
    }

    render() {
        momentLocalizer(moment)
        return (
            <div>
                <RikerHelmet title="Workouts" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h3 className="page-heading">Your Workouts</h3>
                    <div>
                        {(() => {
                             if (this.state.processing) {
                                 return (
                                     <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                         <Loading scale={0.3} />
                                     </div>
                                 )
                             } else {
                                 const workouts = this.state.workoutsTuple[0]
                                 const numWorkouts = workouts.length
                                 if (numWorkouts > 0) {
                                     const screenWidth = utils.screenWidth()
                                     let marginRight = 60
                                     let marginTop = 15
                                     let marginTopMedium = 8
                                     let marginTopSmall = 6
                                     let padding = 15
                                     let paddingBottom = 30
                                     let regularFont = "initial"
                                     let largerFont = "larger"
                                     if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                                         // use above defaults
                                     } else if (screenWidth > 411) { // iphone 6 plus
                                         marginTop = 12
                                         marginTopMedium = 7
                                         marginTopSmall = 6
                                         padding = 12
                                         paddingBottom = 15
                                         marginRight = 45
                                         regularFont = "smaller"
                                         largerFont = "large"
                                     } else if (screenWidth > 374) { // iphone 6
                                         marginTop = 10
                                         marginTopMedium = 7
                                         marginTopSmall = 5
                                         padding = 10
                                         paddingBottom = 15
                                         marginRight = 40
                                         regularFont = "smaller"
                                         largerFont = "initial"
                                     } else { // iphone 5 and similar
                                         marginTop = 8
                                         marginTopMedium = 6
                                         marginTopSmall = 4
                                         padding = 8
                                         paddingBottom = 12
                                         marginRight = 38
                                         regularFont = "small"
                                         largerFont = "small"
                                     }
                                     const workoutCards = []
                                     for (let i = 0; i < numWorkouts; i++) {
                                         const workout = workouts[i]
                                         const workoutStartDateMoment = moment(workout.startDate)
                                         const durationMinutes = workout.durationSeconds / 60
                                         //console.log("workout.caloriesBurned: " + workout.caloriesBurned)
                                         workoutCards.push(
                                             <div className="card"
                                                  key={i}
                                                  style={{backgroundColor: "white",
                                                          marginTop: marginTop,
                                                          paddingTop: padding,
                                                          paddingLeft: padding,
                                                          paddingRight: padding,
                                                          paddingBottom: paddingBottom,
                                                          display: "flex",
                                                          flexDirection: "row"}}>
                                                 <div style={{marginLeft: marginTop, marginTop: marginTop, marginRight: marginRight}}>
                                                     <p style={{marginBottom: 0, fontWeight: "bold", fontSize: largerFont}}>{workoutStartDateMoment.fromNow()}</p>
                                                     <p style={{marginBottom: 0, marginTop: marginTopMedium, fontSize: regularFont}}>{workoutStartDateMoment.format(utils.DATE_DISPLAY_FORMAT)}</p>
                                                     <p style={{marginBottom: 0, marginTop: marginTopSmall, fontSize: regularFont}}>{durationMinutes.toFixed(1)} {durationMinutes == 1.0 ? "minute" : "minutes"}</p>
                                                     <p style={{marginBottom: 0, marginTop: marginTopSmall, fontSize: regularFont}}>{workout.caloriesBurned.toFixed(1)} kcal</p>
                                                 </div>
                                                 <div style={{marginLeft: marginTop, marginTop: marginTop}}>
                                                     {(() => {
                                                          const impactedMuscleGroupTuples = workout.impactedMuscleGroupTuples
                                                          const impactedMuscleGroupDivs = []
                                                          for (let j = 0; j < impactedMuscleGroupTuples.length; j++) {
                                                              const impactedMuscleGroupTuple = impactedMuscleGroupTuples[j]
                                                              const muscleGroupPercentageOfTotal = impactedMuscleGroupTuple[1]
                                                              const muscleGroupName = impactedMuscleGroupTuple[2]
                                                              const style = { fontSize: regularFont, marginBottom: 0, marginTop: marginTopMedium }
                                                              if (j == 0) {
                                                                  style.marginTop = 0
                                                                  style.fontWeight = "bold"
                                                                  style.fontSize = largerFont
                                                              }
                                                              impactedMuscleGroupDivs.push(
                                                                  <p key={j} style={style}>
                                                                      {muscleGroupName + " - " + (muscleGroupPercentageOfTotal * 100).toFixed(0) + "%"}
                                                                  </p>
                                                              )
                                                          }
                                                          return impactedMuscleGroupDivs
                                                     })()
                                                     }

                                                 </div>
                                             </div>
                                         )
                                     }
                                     return (<div>{workoutCards}</div>)
                                 } else {
                                     return (<div>No workouts yet.</div>)
                                 }
                             }
                        })()
                        }
                    </div>
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
WorkoutsPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        sets: state.serverSnapshot._embedded.sets,
        bmls: state.serverSnapshot._embedded["body-journal-logs"],
        userSettings: utils.userSettings(state),
        allMovements: state.serverSnapshot._embedded["movements"],
        allMuscleGroups: state.serverSnapshot._embedded["muscle-groups"],
        allMuscles: state.serverSnapshot._embedded["muscles"],
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const isGlobalConfig = ownProps.location.query.isGlobalConfig === "true"
    return {
        doGoBack: () => dispatch(goBack()),
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutsPage)
