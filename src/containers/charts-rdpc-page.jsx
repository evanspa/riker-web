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
import ChartsListPage from "../components/charts-list-page.jsx"
import * as urls from "../urls"
import Tappable from "react-tappable"
import { Image } from "react-bootstrap"

const logPrefix = "rdpc"
const fetchMode = chartUtils.FETCH_MODE_REPS_DIST

class ChartsRdpcPage extends React.Component {

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
                title="Reps Pie Charts"
                previewPageUrl={urls.CHARTS_REPS_PREVIEW_URI}
                previewPageName="Reps"
                breadcrumbName="All Reps Distribution Pie Charts"
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
                <repsCharts.RpcPieChartsHeadingPanel
                    marginTop={utils.THIN_MARGIN_TOP}
                    enableMoreChartsLink={false}
                    showInfo={this.state.showChartHeadingModal}
                    showInfoFn={() => this.setState({showChartHeadingModal: true})}
                    closeInfoFn={() => this.setState({showChartHeadingModal: false})} />
                <chartComps.MgMvJumpToButtonsPanel />
                <repsCharts.RpcBodySegmentsPieChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                {/* muscle group details */}
                <repsCharts.RpcMuscleGroupDetailsDivider marginTop={commonTopMargin} />
                <repsCharts.RpcMuscleGroupsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcUpperBodyMuscleGroupsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcShouldersPieChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <repsCharts.RpcChestPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcBackPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcTricepsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcAbsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcLowerBodyMuscleGroupsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* movement variants */}
                <repsCharts.RpcMovementVariantDetailsDivider marginTop={commonTopMargin} />
                <repsCharts.RpcMovementVariantsPieChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <repsCharts.RpcUpperBodyMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcShouldersMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcChestMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcBackMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcBicepsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcTricepsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcForearmsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcAbsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcLowerBodyMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcQuadsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcHamsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcCalfsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <repsCharts.RpcGlutesMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartsRdpcPage)
