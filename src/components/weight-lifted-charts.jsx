import React from "react"
import { Link } from "react-router"
import * as urls from "../urls"
import * as utils from "../utils"
import { Image, Modal } from "react-bootstrap"
import StrengthChart from "./strength-chart.jsx"
import * as chartUtils from "../chart-utils"
import { InfoModal,
         MetricHeadingPanel,
         HeadingPanel,
         ChartSection,
         MARGIN_BETWEEN_HELP_PARAGRAPHS } from "./chart-components.jsx"

////////////////////////////////////////////////////////////////////////////////
// Metric: Weight Lifted
////////////////////////////////////////////////////////////////////////////////
export const WeightLiftedMetricHeadingPanel = ({showInfo, showInfoFn, closeInfoFn, marginTop, children}) => (
    <div>
        <InfoModal
            show={showInfo}
            title="Weight Lifted"
            closeOnTapFn={closeInfoFn}
            content={(
                    <div>
                        <div>The <strong>Weight Lifted</strong> metric is the total amount of weight lifted for a set.  It is the number of reps multiplied by the weight used.</div>
                        <div style={{marginTop: 10}}>For example, if you bench pressed 135 lbs for 10 reps, the <strong>weight lifted</strong> = 1,350 lbs.</div>
                        <div style={{marginTop: 10}}>Riker uses this metric as an objective, quantitative measure associated with your strength.  Several charts are provided for this metric.</div>
                    </div>
            )} />
        <MetricHeadingPanel bgColor="#3379B7" title="Weight Lifted" onTapFn={showInfoFn} marginTop={marginTop}>
            {children}
        </MetricHeadingPanel>
    </div>
)

////////////////////////////////////////////////////////////////////////////////
// Weight Lifted - Total Timeline heading and charts
////////////////////////////////////////////////////////////////////////////////
export const WltcTimelineChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        bgColor="#98BBDB"
        id={id}
        title="Total Weight Lifted"
        infoContent={(
                <div>
                    <div>These timeline charts illustrate your <strong>strength over time</strong>.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>As you get stronger and are able to lift more weight, you should see the lines trending upwards over time.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>Each point on a line represents the total, aggregate weight lifted for that point in time.  If you have a filter set to aggregate by week, month, etc., points represent the <strong>aggregate weight lifted</strong> over the selected time period.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>For example, if your quadriceps lifted a grand total of 10,000 lbs over a contiguous 5-day period, and you have a filter set to aggregate <strong>by week</strong>, then the data point will display at 10,000 lbs.</div>
                </div>
        )}
        showInfo={showInfo}
        navigateTo={navigateTo}
        marginTop={marginTop}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_WLTC_URI : null}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn} />
)

export const WltcWeightTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_ALL]}
        dataSourceFn={chartData => chartData.weightTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates the sum total of all your weight lifted, for <strong>all movements</strong>, over time.</div>)}
        colors={chartUtils.singleValueColor}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcBodySegmentsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.weightByBodySegmentTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>all movements</strong>, distributes between your upper and lower body, over time.</div>)}
        colors={chartUtils.bodySegmentColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL}
        title="Total Weight Lifted by Muscle Group"
        content={(<div>The following charts detail <strong>your total weight lifted</strong> across the individual muscles of your muscle groups, over time.</div>)}
        {...props} />
)

export const WltcMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightByMuscleGroupTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>all movements</strong>, distributes across all your major muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcUpperBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightByUpperBodySegmentTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit upper body muscles</strong>, distributes across all your upper body muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcShouldersTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_SHOULDERS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByShoulderMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles, over time.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcChestTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_CHEST]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByChestMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles, over time.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcBackTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_BACK]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByBackMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the back</strong>, distributes across your individual back muscles, over time.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcBicepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_BICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByBicepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the biceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.BICEPS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcTricepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_TRICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByTricepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles, over time.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcForearmsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_FOREARMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByForearmsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the forearms</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.FOREARMS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcAbsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_ABS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByAbsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the abs</strong>, distributes across your individual abdominial muscles, over time.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcLowerBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightByLowerBodySegmentTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit lower body muscles</strong>, distributes across all your lower body muscle groups, over time.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcQuadsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_QUADS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByQuadsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the quadriceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.QUADRICEPS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcHamsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_HAMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByHamsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the hamstrings</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.HAMSTRINGS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcCalfsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_CALFS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByCalfsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the calfs</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.CALVES_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcGlutesTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_GLUTES]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByGlutesMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the glutes</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.GLUTES_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Total Weight Lifted by Movement Variant"
        content={(<div>The following timeline charts detail <strong>your total weight lifted</strong> across the different movement variants, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcMovementVariantsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOVEMENT_VARIANTS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.weightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>all movements</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcUpperBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_UPPER_BODY]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.upperBodyWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcShouldersMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_SHOULDERS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.shoulderWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcChestMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_CHEST]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.chestWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the chest</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcBackMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_BACK]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.backWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the back</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcBicepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_BICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.bicepsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcTricepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_TRICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.tricepsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcForearmsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_FOREARMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.forearmsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcAbsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_ABS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.absWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the abs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcLowerBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_LOWER_BODY]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.lowerBodyWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcQuadsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_QUADS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.quadsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcHamsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_HAMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.hamsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the hamstrings</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcCalfsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_CALFS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.calfsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the calfs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const WltcGlutesMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLTC_MOV_VAR_GLUTES]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.glutesWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the glutes</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

////////////////////////////////////////////////////////////////////////////////
// Weight Lifted - Average Total Timeline heading and charts
////////////////////////////////////////////////////////////////////////////////
export const AvgWltcTimelineChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#98BBDB"
        title="Weight Lifted per Set"
        infoContent={(
                <div>
                    <div>These timeline charts illustrate your <strong>strength per set over time</strong>.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>As you get stronger and are able to lift more weight, you should see the lines trending upwards over time.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>
                        <span>Each point on a line represents the average weight lifted per set for that point in time.  For example, if you did 3 sets of curls:</span>
                        <ol>
                            <li>10 reps of 95 lbs, </li>
                            <li>8 reps of 90 lbs and</li>
                            <li>8 reps of 80 lbs</li>
                        </ol>
                        <span>your total weight lifted would be: 2,310 lbs.  Your average per set would be: 770 lbs.</span>
                    </div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>If you have a filter set to aggregate by week, month, etc., points represent the <strong>average weight lifted per set</strong> over the selected time period.</div>
                </div>
        )}
        showInfo={showInfo}
        navigateTo={navigateTo}
        marginTop={marginTop}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_AVG_WLTC_URI : null}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn} />
)

export const AvgWltcWeightTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_ALL]}
        dataSourceFn={chartData => chartData.weightTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates the per-set average of all your weight lifted, for <strong>all movements</strong>, over time.</div>)}
        colors={chartUtils.singleValueColor}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcBodySegmentsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.weightByBodySegmentTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>all movements</strong>, distributes between your upper and lower body, over time.</div>)}
        colors={chartUtils.bodySegmentColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL}
        title="Average Weight Lifted per Set by Muscle Group"
        content={(<div>The following timeline charts detail <strong>your weight lifted per-set average</strong> across the individual muscles of your muscle groups, over time.</div>)}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightByMuscleGroupTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>all movements</strong>, distributes across all your major muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcUpperBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightByUpperBodySegmentTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit upper body muscles</strong>, distributes across all your upper body muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcShouldersTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_SHOULDERS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByShoulderMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles, over time.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcChestTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_CHEST]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByChestMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles, over time.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcBackTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_BACK]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByBackMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the back</strong>, distributes across your individual back muscles, over time.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcBicepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_BICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByBicepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the biceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.BICEPS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcTricepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_TRICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByTricepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles, over time.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcForearmsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_FOREARMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByForearmsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the forearms</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.FOREARMS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcAbsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_ABS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByAbsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the abs</strong>, distributes across your individual abdominial muscles, over time.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcLowerBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightByLowerBodySegmentTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit lower body muscles</strong>, distributes across all your lower body muscle groups, over time.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcQuadsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_QUADS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByQuadsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the quadriceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.QUADRICEPS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcHamsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_HAMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByHamsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the hamstrings</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.HAMSTRINGS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcCalfsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_CALFS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByCalfsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the calfs</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.CALVES_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcGlutesTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_GLUTES]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByGlutesMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the glutes</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.GLUTES_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Average Weight Lifted per Set by Movement Variant"
        content={(<div>The following timeline charts detail <strong>your weight lifted per-set average</strong> across the different movement variants, over time.</div>)}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcMovementVariantsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOVEMENT_VARIANTS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.weightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>all movements</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcUpperBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_UPPER_BODY]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.upperBodyWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcShouldersMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_SHOULDERS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.shoulderWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcChestMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_CHEST]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.chestWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the chest</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcBackMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_BACK]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.backWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the back</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcBicepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_BICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.bicepsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcTricepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_TRICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.tricepsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcForearmsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_FOREARMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.forearmsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcAbsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_ABS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.absWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the abs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcLowerBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_LOWER_BODY]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.lowerBodyWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcQuadsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_QUADS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.quadsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcHamsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_HAMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.hamsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcCalfsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_CALFS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.calfsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

export const AvgWltcGlutesMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_WLTC_MOV_VAR_GLUTES]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.glutesWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your weight lifted, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props} />
)

////////////////////////////////////////////////////////////////////////////////
// Weight Lifted - Distribution Pie charts
////////////////////////////////////////////////////////////////////////////////
export const WlpcPieChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#98BBDB"
        title="Distribution"
        infoContent={(
                <div>
                    <div>These pie charts show <strong>where your strength is distributed</strong>.  There are charts to show how your strength is distributed across your muscle groups and movement variants.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>They are helpful for shedding light on areas of your strength training that you may neglect or overwork.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>For example, if you don't do enough lower body training, that would show in the <strong>Total Weight Lifted - Body Segments</strong> pie chart.  The lower body slice would be disproportionately smaller than the upper body slice.</div>
                </div>
        )}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_WLDPC_URI : null}
        showInfo={showInfo}
        navigateTo={navigateTo}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn}
        marginTop={marginTop} />
)

export const WlpcBodySegmentsPieChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.weightLiftedByBodySegment}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>all movements</strong>, distributes between your upper and lower body.</div>)}
        colors={chartUtils.bodySegmentColors}
        {...props} />
)

export const WlpcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL_DIST}
        title=" Weight Lifted Distribution by Muscle Group"
        content={(<div>The following pie charts detail <strong>how your total weight lifted distributes</strong> across the individual muscles of the main muscle groups.</div>)}
        {...props} />
)

export const WlpcMuscleGroupsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightLiftedByMuscleGroup}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>all movements</strong>, distributes across all your major muscle groups.</div>)}
        colors={chartUtils.muscleGroupColors}
        {...props} />
)

export const WlpcUpperBodyMuscleGroupsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightLiftedByUpperBodySegment}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>upper body movements</strong>, distributes across all your upper body muscle groups.</div>)}
        colors={chartUtils.muscleGroupColors}
        {...props} />
)

export const WlpcShouldersPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_SHOULDERS]}
        dataSourceFn={chartData => chartData.weightLiftedByShoulderMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        {...props} />
)

export const WlpcChestPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_CHEST]}
        dataSourceFn={chartData => chartData.weightLiftedByChestMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        {...props} />
)

export const WlpcBackPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_BACK]}
        dataSourceFn={chartData => chartData.weightLiftedByBackMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the back</strong>, distributes across your individual back muscles.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        {...props} />
)

export const WlpcTricepsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_TRICEPS]}
        dataSourceFn={chartData => chartData.weightLiftedByTricepsMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        {...props} />
)

export const WlpcAbsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_ABS]}
        dataSourceFn={chartData => chartData.weightLiftedByAbsMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the abs</strong>, distributes across your individual abdominal muscles.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        {...props} />
)

export const WlpcLowerBodyMuscleGroupsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightLiftedByLowerBodySegment}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>lower body movements</strong>, distributes across all your lower body muscle groups.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        {...props} />
)

export const WlpcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Weight Lifted Distribution by Movement Variant"
        content={(<div>The following pie charts detail <strong>how your total weight lifted distributes</strong> across the different movement variants.</div>)}
        {...props} />
)

export const WlpcMovementVariantsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOVEMENT_VARIANTS]}
        dataSourceFn={chartData => chartData.weightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>all movements</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcUpperBodyMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_UPPER_BODY]}
        dataSourceFn={chartData => chartData.upperBodyWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcShouldersMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_SHOULDERS]}
        dataSourceFn={chartData => chartData.shoulderWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcChestMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_CHEST]}
        dataSourceFn={chartData => chartData.chestWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the chest</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcBackMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_BACK]}
        dataSourceFn={chartData => chartData.backWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the back</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcBicepsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_BICEPS]}
        dataSourceFn={chartData => chartData.bicepsWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcTricepsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_TRICEPS]}
        dataSourceFn={chartData => chartData.tricepsWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcForearmsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_FOREARMS]}
        dataSourceFn={chartData => chartData.forearmsWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcAbsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_ABS]}
        dataSourceFn={chartData => chartData.absWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the abs</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcLowerBodyMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_LOWER_BODY]}
        dataSourceFn={chartData => chartData.lowerBodyWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcQuadsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_QUADS]}
        dataSourceFn={chartData => chartData.quadsWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcHamsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_HAMS]}
        dataSourceFn={chartData => chartData.hamsWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the hams</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcCalfsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_CALFS]}
        dataSourceFn={chartData => chartData.calfsWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the calfs</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const WlpcGlutesMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDPC_MOV_VAR_GLUTES]}
        dataSourceFn={chartData => chartData.glutesWeightLiftedByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your weight lifted, for <strong>movements that hit the glutes</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

////////////////////////////////////////////////////////////////////////////////
// Weight Lifted - Distribution Timeline heading and charts
////////////////////////////////////////////////////////////////////////////////
export const WldtcTimelineChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#98BBDB"
        title="Distribution / Time"
        infoContent={(
                <div>
                    <div>These timeline charts illustrate <strong>where your strength is distributed over time</strong>.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>For example, if over time you begin to neglect lower body training, you will see the lower body line trend downwards over time, and the upper body line trend upwards.</div>
                </div>
        )}
        showInfo={showInfo}
        navigateTo={navigateTo}
        marginTop={marginTop}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_WLDTC_URI : null}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn} />
)

export const WldtcBodySegmentsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.weightByBodySegmentTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>all movements</strong>, distributes between your upper and lower body, over time.</div>)}
        colors={chartUtils.bodySegmentColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props}
        logging={false} />
)

export const WldtcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL_DIST}
        title="Weight Lifted Distribution by Muscle Group"
        content={(<div>The following timeline charts detail <strong>how your total weight lifted distributes</strong> across the individual muscles of your muscle groups, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightByMuscleGroupTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>all movements</strong>, distributes across all your major muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcUpperBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightByUpperBodySegmentTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit upper body muscles</strong>, distributes across all your upper body muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcShouldersTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_SHOULDERS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.weightByShoulderMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles, over time.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcChestTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_CHEST]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.weightByChestMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles, over time.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcBackTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_BACK]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.weightByBackMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the back</strong>, distributes across your individual back muscles, over time.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcTricepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_TRICEPS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.weightByTricepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles, over time.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcAbsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_ABS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.weightByAbsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the abs</strong>, distributes across your individual abdominial muscles, over time.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcLowerBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.weightByLowerBodySegmentTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit lower body muscles</strong>, distributes across all your lower body muscle groups, over time.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Weight Lifted Distribution by Movement Variant"
        content={(<div>The following timeline charts detail <strong>how your total weight lifted distributes</strong> across the different movement variants, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcMovementVariantsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOVEMENT_VARIANTS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.weightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>all movements</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcUpperBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_UPPER_BODY]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.upperBodyWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcShouldersMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_SHOULDERS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.shoulderWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcChestMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_CHEST]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.chestWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the chest</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcBackMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_BACK]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.backWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the back</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcBicepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_BICEPS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.bicepsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcTricepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_TRICEPS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.tricepsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcForearmsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_FOREARMS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.forearmsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcAbsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_ABS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.absWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit the abs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcLowerBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_LOWER_BODY]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.lowerBodyWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your weight lifted, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcQuadsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_QUADS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.quadsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your weight lifted, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcHamsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_HAMS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.hamsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your weight lifted, for <strong>movements that hit the hamstrings</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcCalfsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_CALFS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.calfsWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your weight lifted, for <strong>movements that hit the calfs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const WldtcGlutesMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_WLDTC_MOV_VAR_GLUTES]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.glutesWeightByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your weight lifted, for <strong>movements that hit the glutes</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)
