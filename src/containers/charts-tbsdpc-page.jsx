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
import * as tbsCharts from "../components/tbs-charts.jsx"
import ChartsListPage from "../components/charts-list-page.jsx"
import Tappable from "react-tappable"
import { Image } from "react-bootstrap"
import * as urls from "../urls"

const logPrefix = "tbsdpc"
const fetchMode = chartUtils.FETCH_MODE_TIME_BETWEEN_SETS_DIST

class ChartsTbsdpcPage extends React.Component {

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
        const chartGlobalStrengthConfig = this.props.allChartConfig[chartUtils.CHART_ID_GLOBAL_REST_TIME]
        const commonTopMargin = chartComps.commonChartTopMargin(utils.screenWidth())
        return (
            <ChartsListPage
                title="Rest Time Pie Charts"
                previewPageUrl={urls.CHARTS_TBS_PREVIEW_URI}
                previewPageName="Rest Time"
                breadcrumbName="All Rest Time Distribution Pie Charts"
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
                <tbsCharts.TbspcPieChartsHeadingPanel
                    marginTop={utils.THIN_MARGIN_TOP}
                    enableMoreChartsLink={false}
                    showInfo={this.state.showChartHeadingModal}
                    showInfoFn={() => this.setState({showChartHeadingModal: true})}
                    closeInfoFn={() => this.setState({showChartHeadingModal: false})} />
                <chartComps.MgMvJumpToButtonsPanel />
                <tbsCharts.TbspcBodySegmentsPieChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                {/* muscle group details */}
                <tbsCharts.TbspcMuscleGroupDetailsDivider marginTop={commonTopMargin} />
                <tbsCharts.TbspcMuscleGroupsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcUpperBodyMuscleGroupsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcShouldersPieChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <tbsCharts.TbspcChestPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcBackPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcTricepsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcAbsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcLowerBodyMuscleGroupsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* movement variants */}
                <tbsCharts.TbspcMovementVariantDetailsDivider marginTop={commonTopMargin} />
                <tbsCharts.TbspcMovementVariantsPieChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <tbsCharts.TbspcUpperBodyMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcShouldersMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcChestMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcBackMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcBicepsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcTricepsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcForearmsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcAbsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcLowerBodyMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcQuadsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcHamsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcCalfsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <tbsCharts.TbspcGlutesMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartsTbsdpcPage)
