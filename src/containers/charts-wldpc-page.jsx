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
import ChartsListPage from "../components/charts-list-page.jsx"
import Tappable from "react-tappable"
import { Image } from "react-bootstrap"

const logPrefix = "wldpc"
const fetchMode = chartUtils.FETCH_MODE_WEIGHT_LIFTED_DIST

class ChartsWldpcPage extends React.Component {

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
                title="Weight Lifted Pie Charts"
                breadcrumbName="All Weight Lifted Distribution Pie Charts"
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
                <weightLiftedCharts.WlpcPieChartsHeadingPanel
                    marginTop={utils.THIN_MARGIN_TOP}
                    enableMoreChartsLink={false}
                    showInfo={this.state.showChartHeadingModal}
                    showInfoFn={() => this.setState({showChartHeadingModal: true})}
                    closeInfoFn={() => this.setState({showChartHeadingModal: false})} />
                <chartComps.MgMvJumpToButtonsPanel />
                <weightLiftedCharts.WlpcBodySegmentsPieChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                {/* muscle group details */}
                <weightLiftedCharts.WlpcMuscleGroupDetailsDivider marginTop={commonTopMargin} />
                <weightLiftedCharts.WlpcMuscleGroupsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcUpperBodyMuscleGroupsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcShouldersPieChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcChestPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcBackPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcTricepsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcAbsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcLowerBodyMuscleGroupsPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                {/* movement variants */}
                <weightLiftedCharts.WlpcMovementVariantDetailsDivider marginTop={commonTopMargin} />
                <weightLiftedCharts.WlpcMovementVariantsPieChart marginTop={chartComps.TOP_CHART_TOP_MARGIN} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcUpperBodyMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcShouldersMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcChestMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcBackMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcBicepsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcTricepsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcForearmsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcAbsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcLowerBodyMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcQuadsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcHamsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcCalfsMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
                <weightLiftedCharts.WlpcGlutesMovVarPieChart marginTop={commonTopMargin} {...strengthChartCommonProps} />
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
export default connect(mapStateToProps, mapDispatchToProps)(ChartsWldpcPage)
