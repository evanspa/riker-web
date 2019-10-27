import React from "react"
import { push } from "react-router-redux"
import { connect } from "react-redux"
import _ from "lodash"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
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

const logPrefix = "wltc"
const fetchMode = chartUtils.FETCH_MODE_WEIGHT_LIFTED_LINE

class ChartsWltcPage extends React.Component {

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
                title="Weight Lifted Timeline Charts"
                breadcrumbName="All Weight Lifted Timeline Charts"
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
                <weightLiftedCharts.WltcTimelineChartsHeadingPanel
                    enableMoreChartsLink={false}
                    marginTop={utils.THIN_MARGIN_TOP}
                    showInfo={this.state.showChartHeadingModal}
                    showInfoFn={() => this.setState({showChartHeadingModal: true})}
                    closeInfoFn={() => this.setState({showChartHeadingModal: false})} />
                <chartComps.MgMvJumpToButtonsPanel />
                <weightLiftedCharts.WltcWeightTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} logging={false} />
                <weightLiftedCharts.WltcBodySegmentsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* muscle group details */}
                <weightLiftedCharts.WltcMuscleGroupDetailsDivider marginTop={commonTopMargin} />
                <weightLiftedCharts.WltcMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcUpperBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcShouldersTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcChestTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcBackTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcBicepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcTricepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcForearmsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcAbsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcLowerBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcQuadsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcHamsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcCalfsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcGlutesTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* movement variants */}
                <weightLiftedCharts.WltcMovementVariantDetailsDivider marginTop={commonTopMargin} />
                <weightLiftedCharts.WltcMovementVariantsTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcUpperBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcShouldersMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcChestMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcBackMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcBicepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcTricepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcForearmsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcAbsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcLowerBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcQuadsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcHamsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcCalfsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WltcGlutesMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartsWltcPage)
