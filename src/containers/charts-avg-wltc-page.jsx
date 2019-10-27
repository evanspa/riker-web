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
import * as weightLiftedCharts from "../components/weight-lifted-charts.jsx"
import Tappable from "react-tappable"
import ChartsListPage from "../components/charts-list-page.jsx"
import { Image } from "react-bootstrap"

const logPrefix = "avg-wltc"
const fetchMode = chartUtils.FETCH_MODE_WEIGHT_LIFTED_LINE

class ChartsAvgWltcPage extends React.Component {

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
        const chartGlobalStrengthConfig = this.props.allChartConfig[chartUtils.CHART_ID_GLOBAL_STRENGTH]
        const commonTopMargin = chartComps.commonChartTopMargin(utils.screenWidth())
        return (
            <ChartsListPage
                title="Average Weight Lifted per Set Timeline Charts"
                breadcrumbName="All Average Weight Lifted per Set Timeline Charts"
                {...this.props}>
                <chartComps.NoChartsToConfigureModal
                    show={this.state.showNoChartsToConfigureModal}
                    closeOnTapFn={() => this.setState({ showNoChartsToConfigureModal: false })} />
                <weightLiftedCharts.WeightLiftedMetricHeadingPanel
                    showInfo={this.state.showMetricHeadingModal}
                    showInfoFn={() => this.setState({showMetricHeadingModal: true})}
                    closeInfoFn={() => this.setState({showMetricHeadingModal: false})}>
                    <Tappable component="a"
                              onTap={() => {
                                      if (this.state.numSets > 0) {
                                          this.props.navigateToStrengthChartConfigFn("Weight Lifted")(this.state.setsArrayAscending, chartGlobalStrengthConfig, this.state.setsArrayAscending, true)
                                      } else if (this.state.numSets == 0) {
                                          this.setState({showNoChartsToConfigureModal: true})
                                      }
                              }}>
                        <Image src="/images/riker-white-settings.svg" />
                    </Tappable>
                </weightLiftedCharts.WeightLiftedMetricHeadingPanel>
                <weightLiftedCharts.AvgWltcTimelineChartsHeadingPanel
                    enableMoreChartsLink={false}
                    marginTop={utils.THIN_MARGIN_TOP}
                    showInfo={this.state.showChartHeadingModal}
                    showInfoFn={() => this.setState({showChartHeadingModal: true})}
                    closeInfoFn={() => this.setState({showChartHeadingModal: false})} />
                <chartComps.MgMvJumpToButtonsPanel />
                <weightLiftedCharts.AvgWltcWeightTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcBodySegmentsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* muscle group details */}
                <weightLiftedCharts.AvgWltcMuscleGroupDetailsDivider marginTop={commonTopMargin} />
                <weightLiftedCharts.AvgWltcMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcUpperBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcShouldersTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcChestTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcBackTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcBicepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcTricepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcForearmsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcAbsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcLowerBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcQuadsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcHamsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcCalfsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcGlutesTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* movement variants */}
                <weightLiftedCharts.AvgWltcMovementVariantDetailsDivider marginTop={commonTopMargin} />
                <weightLiftedCharts.AvgWltcMovementVariantsTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcUpperBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcShouldersMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcChestMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcBackMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcBicepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcTricepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcForearmsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcAbsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcLowerBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcQuadsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcHamsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcCalfsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.AvgWltcGlutesMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartsAvgWltcPage)
