import React from "react"
import { Link } from "react-router"
import { push } from "react-router-redux"
import { ButtonToolbar,
         Button,
         Well,
         Image,
         DropdownButton,
         MenuItem,
         Modal,
         Breadcrumb,
         Panel,
         Col,
         ListGroup,
         ListGroupItem } from "react-bootstrap"
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import Records from "../components/records.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as chartUtils from "../chart-utils"
import * as strs from "../strings"
import * as entkeys from "../entity-keys"
import numeral from "numeral"
import * as gvs from "../grid-vals"
import { toastr } from "react-redux-toastr"
import { attemptDownloadChangelog,
         changelogCountsViewed,
         maintenanceAck,
         setChartDateRange,
         makeOnMovementSuggestionSelectedFn,
         addToChartCache,
         disableChartAnimation,
         bannerRemindLater } from "../actions/action-creators"
import Tappable from "react-tappable"
import pluralize from "pluralize"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import NavbarBanner from "../components/navbar-banner.jsx"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import ReactGA from "react-ga"
import * as chartComps from "../components/chart-components.jsx"
import * as weightLiftedCharts from "../components/weight-lifted-charts.jsx"
import Autosuggest from "react-autosuggest"
var Promise = require('es6-promise').Promise

class AuthenticatedHomePage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = chartUtils.initialChartsPreviewPageState()
        this.state.requestInProgress = false
    }

    reprocess(delay) {
        setTimeout(() => {
            const dataLoadingPromise = chartUtils.makeChartsPreviewPageDataLoadingPromise(this.props,
                                                                                          chartUtils.FETCH_MODE_WEIGHT_LIFTED_CROSS_SECTION,
                                                                                          this.state.localCache)
            dataLoadingPromise.then(newState => {
                this.setState(newState)
            })
        }, delay);
    }

    componentDidMount() {
        this.reprocess(0)
    }

    componentDidUpdate(prevProps, prevState) {
        const { processing } = this.state
        if (processing) {
            this.reprocess(0)
        }
    }

    movementSearchOnChange = (event, { newValue, method }) => {
        this.setState({ movementSearchText: newValue })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            movementSuggestions: utils.computeMovementSuggestions(value, this.props.movementsArray)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({ movementSuggestions: [] })
    }

    render() {
        const {
            api,
            navigateTo,
            changelogCounts,
            downloadChangelog,
            dismissChangelogReport,
            becameUnauthenticated,
            accountStatuses,
            redisplayBannerAfter,
            remindMeLaterFn,
            allChartConfig,
            navigateToStrengthChartConfigFn,
            onMovementSuggestionSelectedFn,
            addToChartCacheFn,
            movementVariants
        } = this.props
        let {
            movementSearchText,
            movementSuggestions,
            strengthChartCommonProps,
            processing
        } = this.state
        const movementSearchInputProps = {
            placeholder: "search all movements",
            value: movementSearchText,
            onChange: this.movementSearchOnChange
        }
        let weightUomDisplayUppercase = null
        let sizeUomDisplayUppercase = null
        if (processing) {
            strengthChartCommonProps = { parentDataProcessing: true, allChartConfig: allChartConfig, muscleColors: {} }
        } else {
            strengthChartCommonProps.navigateToChartConfigFn = navigateToStrengthChartConfigFn
            strengthChartCommonProps.addToChartCacheFn = addToChartCacheFn
            strengthChartCommonProps.parentDataProcessing = false
        }
        const chartGlobalStrengthConfig = allChartConfig[chartUtils.CHART_ID_GLOBAL_STRENGTH]
        const commonTopMargin = chartComps.commonChartTopMargin(utils.screenWidth())
        const colHorizontalPadding = utils.chartScreenHorizontalColPadding()
        return (
            <div>
                <RikerHelmet title="Riker - Track your strength" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(accountStatuses, redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={navigateTo}
                    remindMeLaterFn={remindMeLaterFn}
                    redisplayBannerAfter={redisplayBannerAfter}
                    accountStatuses={accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <ReauthenticateModal
                    showModal={becameUnauthenticated}
                    message="To synchronize your account, we need you to re-authenticate."
                    operationOnLightLoginSuccess={downloadChangelog} />
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
                <chartComps.NoChartsToConfigureModal
                    show={this.state.showNoChartsToConfigureModal}
                    closeOnTapFn={() => this.setState({ showNoChartsToConfigureModal: false })} />
                <ChangelogResultsModal
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={() => {
                            dismissChangelogReport()
                            this.setState({ processing: true,
                                            requestInProgress: false,
                                            numSets: -1,
                                            setsArrayAscending: null,
                                            strengthChartCommonProps: null,
                                            localCache: {} })
                    }} />
                <Col lg={6} lgOffset={3}
                     md={8} mdOffset={2}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}
                     style={{paddingLeft: colHorizontalPadding, paddingRight: colHorizontalPadding}}>
                    <Autosuggest
                        suggestions={movementSuggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={movement => movement.payload["movement/canonical-name"]}
                        renderSuggestion={(movement, {query}) => utils.renderMovementAsSuggestion(movement)}
                        onSuggestionSelected={(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
                                ReactGA.event({
                                    category: utils.GA_EVENT_CATEGORY_USER,
                                    action: "search movements from home"
                                })
                                onMovementSuggestionSelectedFn(suggestion, movementVariants)
                        }}
                        inputProps={movementSearchInputProps} />
                    <div style={{textAlign: "center"}}>
                        <div style={{display: "inline-block", marginRight: 10}}>
                            <Tappable
                                className="btn btn-lger btn-primary"
                                onTap={() => navigateTo(urls.SELECT_BODY_SEGMENT_URI)}>New Set</Tappable>
                        </div>
                        <div style={{display: "inline-block", marginRight: 10, marginTop: 10}}>
                            <Tappable
                                className="btn btn-lger btn-primary"
                                onTap={() => navigateTo(urls.SELECT_BML_TYPE_URI)}>New Body Log</Tappable>
                        </div>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <div style={{display: "inline-block", alignItems: "center", marginRight: 10, marginTop: 10}}>
                            <Tappable className="btn btn-default btn-smaller"
                                      component="div"
                                      onTap={() => {
                                              if (!this.state.requestInProgress) {
                                                  this.setState( { requestInProgress: true } )
                                                  downloadChangelog()
                                              }
                                      }}
                                      disabled={this.state.requestInProgress}>{strs.refresh_userdata_lbl}</Tappable>
                            <Tappable component="div"
                                      className="question-mark"
                                      onTap={() => {
                                              utils.trackAboutSynchronizeAccountModalViewed("") // because home is "/"
                                              this.setState({showRefreshAllRecordsModal: true})
                                      }}>i</Tappable>
                        </div>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <div style={{display: "inline-block", marginRight: 10, marginTop: 10}}>
                            <Tappable
                                className="btn btn-riker btn-smaller"
                                style={{backgroundColor: "#7EB09F"}}
                                onTap={() => navigateTo(urls.CHARTS_REPS_PREVIEW_URI)}>Reps</Tappable>
                        </div>
                        <div style={{display: "inline-block", marginRight: 10, marginTop: 10}}>
                            <Tappable
                                className="btn btn-riker btn-smaller"
                                style={{backgroundColor: "#CE9399" }}
                                onTap={() => navigateTo(urls.CHARTS_TBS_PREVIEW_URI)}>Rest Time</Tappable>
                        </div>
                        <div style={{display: "inline-block", marginRight: 10, marginTop: 10}}>
                            <Tappable
                                className="btn btn-riker btn-smaller"
                                onTap={() => navigateTo(urls.CHARTS_BODY_URI)}>Your Body</Tappable>
                        </div>
                        <div style={{display: "inline-block", marginRight: 10, marginTop: 10}}>
                            <Tappable
                                className="btn btn-riker btn-smaller"
                                onTap={() => navigateTo(urls.WORKOUTS_URI)}>Workouts</Tappable>
                        </div>
                    </div>
                    {/*
                        ////////////////////////////////////////////////////////////////////////////////////////////////////
                        // Metric: Weight Lifted
                        ////////////////////////////////////////////////////////////////////////////////////////////////////*/}
                    <weightLiftedCharts.WeightLiftedMetricHeadingPanel
                        marginTop={10}
                        showInfo={this.state.showHeadingPanelHelpTextModal}
                        showInfoFn={() => this.setState({showHeadingPanelHelpTextModal: true})}
                        closeInfoFn={() => this.setState({ showHeadingPanelHelpTextModal: false })}>
                        <Tappable component="a"
                                  onTap={() => {
                                          if (this.state.numSets > 0) {
                                              navigateToStrengthChartConfigFn(this.state.setsArrayAscending, chartGlobalStrengthConfig, this.state.setsArrayAscending, true)
                                          } else if (this.state.numSets == 0) {
                                              this.setState({showNoChartsToConfigureModal: true})
                                          }
                                  }}>
                            <Image src="/images/riker-white-settings.svg" />
                        </Tappable>
                    </weightLiftedCharts.WeightLiftedMetricHeadingPanel>
                    <chartComps.JumpToButtonsPanel
                        totalId="wltc-total"
                        avgId="wltc-avg"
                        distId="wlpc-dist"
                        distTimeId="wldtc-dist-time" />
                    <weightLiftedCharts.WltcTimelineChartsHeadingPanel
                        id="wltc-total"
                        enableMoreChartsLink={true}
                        navigateTo={navigateTo}
                        marginTop={utils.THIN_MARGIN_TOP}
                        showInfo={this.state.showTcModal}
                        showInfoFn={() => this.setState({showTcModal: true})}
                        closeInfoFn={() => this.setState({ showTcModal: false })}>

                    </weightLiftedCharts.WltcTimelineChartsHeadingPanel>
                    <weightLiftedCharts.WltcMuscleGroupsTimeSeriesChart marginTop={7} {...strengthChartCommonProps} logging={false} jumpUpElementId={null} />
                    <weightLiftedCharts.AvgWltcTimelineChartsHeadingPanel
                        id="wltc-avg"
                        enableMoreChartsLink={true}
                        navigateTo={navigateTo}
                        marginTop={commonTopMargin}
                        showInfo={this.state.showAvgTcModal}
                        showInfoFn={() => this.setState({showAvgTcModal: true})}
                        closeInfoFn={() => this.setState({ showAvgTcModal: false })} />
                    <weightLiftedCharts.AvgWltcMuscleGroupsTimeSeriesChart marginTop={7} {...strengthChartCommonProps} jumpUpElementId={null} />
                    <weightLiftedCharts.WlpcPieChartsHeadingPanel
                        id="wlpc-dist"
                        marginTop={commonTopMargin}
                        navigateTo={navigateTo}
                        enableMoreChartsLink={true}
                        showInfo={this.state.showPcModal}
                        showInfoFn={() => this.setState({showPcModal: true})}
                        closeInfoFn={() => this.setState({ showPcModal: false })} />
                    <weightLiftedCharts.WlpcMuscleGroupsPieChart marginTop={7} {...strengthChartCommonProps} logging={false} jumpUpElementId={null} />
                    <weightLiftedCharts.WldtcTimelineChartsHeadingPanel
                        id="wldtc-dist-time"
                        enableMoreChartsLink={true}
                        marginTop={commonTopMargin}
                        navigateTo={navigateTo}
                        showInfo={this.state.showDtcModal}
                        showInfoFn={() => this.setState({showDtcModal: true})}
                        closeInfoFn={() => this.setState({ showDtcModal: false })} />
                    <weightLiftedCharts.WldtcMuscleGroupsTimeSeriesChart marginTop={7} {...strengthChartCommonProps} jumpUpElementId={null} />
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const allChartConfig = state.allChartConfig
    const settings = utils.userSettings(state)
    const sets = state.serverSnapshot._embedded["sets"]
    const bodySegments = state.serverSnapshot._embedded["body-segments"]
    const muscleGroups = state.serverSnapshot._embedded["muscle-groups"]
    const muscles = state.serverSnapshot._embedded["muscles"]
    const movements = state.serverSnapshot._embedded["movements"]
    const movementsArray = _.values(movements)
    const movementVariants = state.serverSnapshot._embedded["movement-variants"]
    const chartCache = state.chartCache
    return {
        api: state.api,
        allChartConfig: allChartConfig,
        settings: settings,
        sets: sets,
        bodySegments: bodySegments,
        muscleGroups: muscleGroups,
        muscles: muscles,
        movements: movements,
        movementsArray: movementsArray,
        movementVariants: movementVariants,
        chartCache: chartCache,
        changelogCounts: state.changelogCounts,
        becameUnauthenticated: state.becameUnauthenticated,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: url => dispatch(push(url)),
        navigateToStrengthChartConfigFn: chartUtils.makeNavigateToChartConfigFn("set", "set", "Weight Lifted", "set", dispatch, setChartDateRange, push),
        disableChartAnimationFn: chartId => dispatch(disableChartAnimation(chartId)),
        downloadChangelog: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from home page")
            dispatch(attemptDownloadChangelog(null))
        },
        dismissChangelogReport: () => dispatch(changelogCountsViewed()),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck()),
        onMovementSuggestionSelectedFn: makeOnMovementSuggestionSelectedFn(dispatch),
        addToChartCacheFn: (cacheKey, strengthData) => dispatch(addToChartCache(cacheKey, strengthData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedHomePage)
