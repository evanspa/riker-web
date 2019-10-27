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
import * as tbsCharts from "../components/tbs-charts.jsx"
import ChartsListPage from "../components/charts-list-page.jsx"
import Tappable from "react-tappable"
import { Image } from "react-bootstrap"
import * as urls from "../urls"

const logPrefix = "tbstc"
const fetchMode = chartUtils.FETCH_MODE_TIME_BETWEEN_SETS_LINE

class ChartsAvgTbstcPage extends React.Component {

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
        const chartGlobalStrengthConfig = this.props.allChartConfig[chartUtils.CHART_ID_GLOBAL_REST]
        const commonTopMargin = chartComps.commonChartTopMargin(utils.screenWidth())
        return (
            <ChartsListPage
                title="Average Rest Time Timeline Charts"
                previewPageUrl={urls.CHARTS_TBS_PREVIEW_URI}
                previewPageName="Rest Time"
                breadcrumbName="All Average Rest Time Timeline Charts"
                {...this.props}>
                <chartComps.NoChartsToConfigureModal
                    show={this.state.showNoChartsToConfigureModal}
                    closeOnTapFn={() => this.setState({ showNoChartsToConfigureModal: false })} />
                <tbsCharts.TimeBetweenSetsMetricHeadingPanel
                    showInfo={this.state.showMetricHeadingModal}
                    showInfoFn={() => this.setState({showMetricHeadingModal: true})}
                    closeInfoFn={() => this.setState({showMetricHeadingModal: false})}>
                    <Tappable component="a"
                              onTap={() => {
                                      if (this.state.numSets > 0) {
                                          this.props.navigateToStrengthChartConfigFn("Rest Time")(this.state.setsArrayAscending, chartGlobalStrengthConfig, this.state.setsArrayAscending, true)
                                      } else if (this.state.numSets == 0) {
                                          this.setState({showNoChartsToConfigureModal: true})
                                      }
                              }}>
                        <Image src="/images/riker-white-settings.svg" />
                    </Tappable>
                </tbsCharts.TimeBetweenSetsMetricHeadingPanel>
                <tbsCharts.AvgTbstcTimelineChartsHeadingPanel
                    enableMoreChartsLink={false}
                    marginTop={utils.THIN_MARGIN_TOP}
                    showInfo={this.state.showChartHeadingModal}
                    showInfoFn={() => this.setState({showChartHeadingModal: true})}
                    closeInfoFn={() => this.setState({showChartHeadingModal: false})} />
                <chartComps.MgMvJumpToButtonsPanel />
                <tbsCharts.AvgTbstcTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} logging={false} />
                <tbsCharts.AvgTbstcBodySegmentsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* muscle group details */}
                <tbsCharts.AvgTbstcMuscleGroupDetailsDivider marginTop={commonTopMargin} />
                <tbsCharts.AvgTbstcMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcUpperBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcShouldersTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcChestTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcBackTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcBicepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcTricepsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcForearmsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcAbsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcLowerBodyMuscleGroupsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcQuadsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcHamsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcCalfsTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcGlutesTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* movement variants */}
                <tbsCharts.AvgTbstcMovementVariantDetailsDivider marginTop={commonTopMargin} />
                <tbsCharts.AvgTbstcMovementVariantsTimeSeriesChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcUpperBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcShouldersMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcChestMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcBackMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcBicepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcTricepsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcForearmsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcAbsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcLowerBodyMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcQuadsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcHamsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcCalfsMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.AvgTbstcGlutesMovVarTimeSeriesChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartsAvgTbstcPage)
