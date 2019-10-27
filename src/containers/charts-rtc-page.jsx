import React from "react"
import { push } from "react-router-redux"
import { connect } from 'react-redux'
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
import ChartsListPage from "../components/charts-list-page.jsx"
import * as urls from "../urls"
import Tappable from "react-tappable"
import { Image } from "react-bootstrap"

const logPrefix = "rtc"
const fetchMode = chartUtils.FETCH_MODE_REPS_LINE

class ChartsRtcPage extends React.Component {

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
            <ChartsListPage title="Reps Timeline Charts"
                            previewPageUrl={urls.CHARTS_REPS_PREVIEW_URI}
                            previewPageName="Reps"
                            breadcrumbName="All Total Reps Timeline Charts"
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
                <repsCharts.RtcTimelineChartsHeadingPanel
                    enableMoreChartsLink={false}
                    marginTop={utils.THIN_MARGIN_TOP}
                    showInfo={this.state.showChartHeadingModal}
                    showInfoFn={() => this.setState({showChartHeadingModal: true})}
                    closeInfoFn={() => this.setState({showChartHeadingModal: false})} />
                <chartComps.MgMvJumpToButtonsPanel />
                <repsCharts.RtcRepsTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <repsCharts.RtcBodySegmentsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* muscle group details */}
                <repsCharts.RtcMuscleGroupDetailsDivider marginTop={commonTopMargin} />
                <repsCharts.RtcMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcUpperBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcShouldersTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <repsCharts.RtcChestTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcBackTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcBicepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcTricepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcForearmsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcAbsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcLowerBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcQuadsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcHamsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcCalfsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcGlutesTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* movement variants */}
                <repsCharts.RtcMovementVariantDetailsDivider marginTop={commonTopMargin} />
                <repsCharts.RtcMovementVariantsTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <repsCharts.RtcUpperBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcShouldersMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcChestMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcBackMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcBicepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcTricepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcForearmsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcAbsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcLowerBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcQuadsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcHamsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcCalfsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RtcGlutesMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartsRtcPage)
