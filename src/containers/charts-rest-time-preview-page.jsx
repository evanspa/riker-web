import React from "react"
import { push } from "react-router-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Image, Col, Breadcrumb } from "react-bootstrap"
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import _ from "lodash"
import * as utils from "../utils"
import * as chartUtils from "../chart-utils"
import * as gvs from "../grid-vals"
import * as urls from "../urls"
import { maintenanceAck,
         setChartDateRange,
         makeOnMovementSuggestionSelectedFn,
         addToChartCache,
         disableChartAnimation,
         bannerRemindLater } from "../actions/action-creators"
import Tappable from "react-tappable"
import NavbarBanner from "../components/navbar-banner.jsx"
import ReactGA from "react-ga"
import * as chartComps from "../components/chart-components.jsx"
import Autosuggest from "react-autosuggest"
import * as tbsCharts from "../components/tbs-charts.jsx"

class ChartsTbsPreviewPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = chartUtils.initialChartsPreviewPageState()
    }

    reprocess(delay) {
        setTimeout(() => {
            const dataLoadingPromise = chartUtils.makeChartsPreviewPageDataLoadingPromise(this.props,
                                                                                          chartUtils.FETCH_MODE_TIME_BETWEEN_SETS_CROSS_SECTION,
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
            navigateTo,
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
        if (processing) {
            strengthChartCommonProps = { parentDataProcessing: true, allChartConfig: allChartConfig, muscleColors: {} }
        } else {
            strengthChartCommonProps.navigateToChartConfigFn = navigateToStrengthChartConfigFn
            strengthChartCommonProps.addToChartCacheFn = addToChartCacheFn
            strengthChartCommonProps.parentDataProcessing = false
        }
        const chartGlobalStrengthConfig = allChartConfig[chartUtils.CHART_ID_GLOBAL_REST_TIME]
        const commonTopMargin = chartComps.commonChartTopMargin(utils.screenWidth())
        const colHorizontalPadding = utils.chartScreenHorizontalColPadding()
        return (
            <div>
                <RikerHelmet title="Rest Time" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(accountStatuses, redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={navigateTo}
                    remindMeLaterFn={remindMeLaterFn}
                    redisplayBannerAfter={redisplayBannerAfter}
                    accountStatuses={accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <chartComps.NoChartsToConfigureModal
                    show={this.state.showNoChartsToConfigureModal}
                    closeOnTapFn={() => this.setState({ showNoChartsToConfigureModal: false })} />
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
                                    action: "search movements from tbs preview"
                                })
                                onMovementSuggestionSelectedFn(suggestion, movementVariants)
                        }}
                        inputProps={movementSearchInputProps} />
                    <Breadcrumb>
                        <Breadcrumb.Item href="#" onClick={() => navigateTo(urls.HOME_URI)}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Time Between Sets</Breadcrumb.Item>
                    </Breadcrumb>
                    <tbsCharts.TimeBetweenSetsMetricHeadingPanel
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
                    </tbsCharts.TimeBetweenSetsMetricHeadingPanel>
                    <chartComps.JumpToButtonsPanel
                        totalId="tbstc-total"
                        avgId="tbstc-avg"
                        distId="tbspc-dist"
                        distTimeId="tbsdtc-dist-time" />
                    <tbsCharts.TbstcTimelineChartsHeadingPanel
                                id="tbstc-total"
                                enableMoreChartsLink={true}
                                navigateTo={navigateTo}
                                marginTop={2}
                                showInfo={this.state.showTcModal}
                                showInfoFn={() => this.setState({showTcModal: true})}
                                closeInfoFn={() => this.setState({ showTcModal: false })} />
                    <tbsCharts.TbstcMuscleGroupsTimeSeriesChart marginTop={7} {...strengthChartCommonProps} jumpUpElementId={null} />
                    <tbsCharts.AvgTbstcTimelineChartsHeadingPanel
                                id="tbstc-avg"
                                enableMoreChartsLink={true}
                                navigateTo={navigateTo}
                                marginTop={commonTopMargin}
                                showInfo={this.state.showAvgTcModal}
                                showInfoFn={() => this.setState({showAvgTcModal: true})}
                                closeInfoFn={() => this.setState({ showAvgTcModal: false })} />
                    <tbsCharts.AvgTbstcMuscleGroupsTimeSeriesChart marginTop={7} {...strengthChartCommonProps} jumpUpElementId={null} />
                    <tbsCharts.TbspcPieChartsHeadingPanel
                                id="tbspc-dist"
                                enableMoreChartsLink={true}
                                marginTop={commonTopMargin}
                                navigateTo={navigateTo}
                                showInfo={this.state.showPcModal}
                                showInfoFn={() => this.setState({showPcModal: true})}
                                closeInfoFn={() => this.setState({ showPcModal: false })} />
                    <tbsCharts.TbspcMuscleGroupsPieChart marginTop={7} {...strengthChartCommonProps} jumpUpElementId={null} />
                    <tbsCharts.TbsdtcTimelineChartsHeadingPanel
                                id="tbsdtc-dist-time"
                                enableMoreChartsLink={true}
                                navigateTo={navigateTo}
                                marginTop={commonTopMargin}
                                showInfo={this.state.showDtcModal}
                                showInfoFn={() => this.setState({showDtcModal: true})}
                                closeInfoFn={() => this.setState({ showDtcModal: false })} />
                    <tbsCharts.TbsdtcMuscleGroupsTimeSeriesChart marginTop={7} {...strengthChartCommonProps} jumpUpElementId={null} />
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => chartUtils.strengthChartsPreviewPageStateToProps(state, chartUtils.CHART_ID_GLOBAL_REST_TIME)

const mapDispatchToProps = (dispatch, ownProps) => chartUtils.strengthChartsPreviewPageDispatchToProps("Rest Time",
                                                                                                       dispatch,
                                                                                                       push,
                                                                                                       setChartDateRange,
                                                                                                       disableChartAnimation,
                                                                                                       bannerRemindLater,
                                                                                                       maintenanceAck,
                                                                                                       makeOnMovementSuggestionSelectedFn,
                                                                                                       addToChartCache)

export default connect(mapStateToProps, mapDispatchToProps)(ChartsTbsPreviewPage)
