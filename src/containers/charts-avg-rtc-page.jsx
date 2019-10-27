import React from "react"
import { push } from "react-router-redux"
import { connect } from "react-redux"
import * as utils from "../utils"
import * as chartUtils from "../chart-utils"
import { maintenanceAck,
         setChartDateRange,
         bannerRemindLater,
         addToChartCache,
         disableChartAnimation,
         makeOnMovementSuggestionSelectedFn } from "../actions/action-creators"
import ReactGA from "react-ga"
import * as chartComps from "../components/chart-components.jsx"
import * as repsCharts from "../components/reps-charts.jsx"
import Tappable from "react-tappable"
import * as urls from "../urls"
import ChartsListPage from "../components/charts-list-page.jsx"
import { Image } from "react-bootstrap"

const logPrefix = "avg-rtc"
const fetchMode = chartUtils.FETCH_MODE_REPS_LINE

class ChartsAvgRtcPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = chartUtils.chartsList_makeInitialState()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return chartUtils.chartsList_handleShouldComponentUpdate(this.props, this.state, nextProps, nextState, logPrefix)
    }

    componentDidMount() {
        const dataLoadingPromise =
            chartUtils.chartsList_makeComponentDidMountPromise(this.props, this.state, fetchMode, logPrefix)
        dataLoadingPromise.then(newState => {
            this.setState(newState)
        })
    }

    render() {
        const strengthChartCommonProps = chartUtils.chartsList_renderVariables(this.props, this.state, logPrefix)
        strengthChartCommonProps.navigateToChartConfigFn = this.props.navigateToStrengthChartConfigFn(null) // param only used for global chart config
        const chartGlobalStrengthConfig = this.props.allChartConfig[chartUtils.CHART_ID_GLOBAL_REPS]
        const commonTopMargin = chartComps.commonChartTopMargin(utils.screenWidth())
        return (
            <ChartsListPage
                title="Average Reps per Set Timeline Charts"
                previewPageUrl={urls.CHARTS_REPS_PREVIEW_URI}
                previewPageName="Reps"
                breadcrumbName="All Average Reps per Set Timeline Charts"
                {...this.props}>
                <chartComps.NoChartsToConfigureModal
                    show={this.state.showNoChartsToConfigureModal}
                    closeOnTapFn={() => this.setState({ showNoChartsToConfigureModal: false })} />
                <repsCharts.RepsMetricHeadingPanel
                    showInfo={this.state.showMetricHeadingModal}
                    showInfoFn={() => this.setState({showMetricHeadingModal: true})}
                    closeInfoFn={() => this.setState({showMetricHeadingModal: false})}>
                    <Tappable component="a"
                              onTap={() => {
                                      if (this.state.numSets > 0) {
                                          this.props.navigateToStrengthChartConfigFn("Reps")(this.state.setsArrayAscending, chartGlobalStrengthConfig, this.state.setsArrayAscending, true)
                                      } else if (this.state.numSets == 0) {
                                          this.setState({showNoChartsToConfigureModal: true})
                                      }
                              }}>
                        <Image src="/images/riker-white-settings.svg" />
                    </Tappable>
                </repsCharts.RepsMetricHeadingPanel>
                <repsCharts.AvgRtcTimelineChartsHeadingPanel
                    enableMoreChartsLink={false}
                    marginTop={utils.THIN_MARGIN_TOP}
                    showInfo={this.state.showChartHeadingModal}
                    showInfoFn={() => this.setState({showChartHeadingModal: true})}
                    closeInfoFn={() => this.setState({showChartHeadingModal: false})} />
                <chartComps.MgMvJumpToButtonsPanel />
                <repsCharts.AvgRtcRepsTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcBodySegmentsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* muscle group details */}
                <repsCharts.AvgRtcMuscleGroupDetailsDivider marginTop={commonTopMargin} />
                <repsCharts.AvgRtcMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcUpperBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcShouldersTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcChestTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcBackTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcBicepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcTricepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcForearmsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcAbsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcLowerBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcQuadsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcHamsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcCalfsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcGlutesTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* movement variants */}
                <repsCharts.AvgRtcMovementVariantDetailsDivider marginTop={commonTopMargin} />
                <repsCharts.AvgRtcMovementVariantsTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcUpperBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcShouldersMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcChestMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcBackMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcBicepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcTricepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcForearmsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcAbsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcLowerBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcQuadsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcHamsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcCalfsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.AvgRtcGlutesMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
            </ChartsListPage>
        )
    }
}

const mapStateToProps = (state, ownProps) => chartUtils.strengthChartsListPageStateToProps(state)
const mapDispatchToProps = (dispatch, ownProps) => chartUtils.strengthChartsListPageDispatchToProps(dispatch,
                                                                                                    push,
                                                                                                    setChartDateRange,
                                                                                                    bannerRemindLater,
                                                                                                    maintenanceAck,
                                                                                                    addToChartCache,
                                                                                                    disableChartAnimation,
                                                                                                    makeOnMovementSuggestionSelectedFn)
export default connect(mapStateToProps, mapDispatchToProps)(ChartsAvgRtcPage)
