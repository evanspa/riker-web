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
import * as weightLiftedCharts from "../components/weight-lifted-charts.jsx"
import ChartsListPage from "../components/charts-list-page.jsx"
import Tappable from "react-tappable"
import { Image } from "react-bootstrap"

const logPrefix = "wldtc"
const fetchMode = chartUtils.FETCH_MODE_WEIGHT_LIFTED_LINE

class ChartsWldtcPage extends React.Component {

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
                title="Weight Lifted Distribution Timeline Charts"
                breadcrumbName="All Weight Lifted Distribution Timeline Charts"
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
                <weightLiftedCharts.WldtcTimelineChartsHeadingPanel
                    enableMoreChartsLink={false}
                    marginTop={utils.THIN_MARGIN_TOP}
                    showInfo={this.state.showChartHeadingModal}
                    showInfoFn={() => this.setState({showChartHeadingModal: true})}
                    closeInfoFn={() => this.setState({showChartHeadingModal: false})} />
                <chartComps.MgMvJumpToButtonsPanel />
                <weightLiftedCharts.WldtcBodySegmentsTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                {/* muscle group details */}
                <weightLiftedCharts.WldtcMuscleGroupDetailsDivider marginTop={commonTopMargin} />
                <weightLiftedCharts.WldtcMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcUpperBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcShouldersTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcChestTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcBackTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcTricepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcAbsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcLowerBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* movement variants */}
                <weightLiftedCharts.WldtcMovementVariantDetailsDivider marginTop={commonTopMargin} />
                <weightLiftedCharts.WldtcMovementVariantsTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcUpperBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcShouldersMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcChestMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcBackMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcBicepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcTricepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcForearmsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcAbsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcLowerBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcQuadsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcHamsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcCalfsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WldtcGlutesMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartsWldtcPage)
