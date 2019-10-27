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
// Metric: Time Between Sets
////////////////////////////////////////////////////////////////////////////////
export const TimeBetweenSetsMetricHeadingPanel = ({showInfo, showInfoFn, closeInfoFn, marginTop, children}) => (
    <div>
        <InfoModal
            show={showInfo}
            title="Rest Time"
            closeOnTapFn={closeInfoFn}
            content={(
                    <div>
                        <div>The <strong>Rest Time</strong> metric is the amount of rest time spent between sets of the same movement and variant.</div>
                        <div style={{marginTop: 10}}>For example, if you do 3 sets of machine shoulder press, this metric captures your rest time between sets 1 and 2, and sets 2 and 3.</div>
                        <div style={{marginTop: 10}}>Time spent between sets when switching to a new movement or variant is not counted.</div>
                    </div>
            )} />
        <MetricHeadingPanel bgColor="#3379B7" title="Rest Time" onTapFn={showInfoFn} marginTop={marginTop}>
            {children}
        </MetricHeadingPanel>
    </div>
)

////////////////////////////////////////////////////////////////////////////////
// Time Between Sets - Total Timeline heading and charts
////////////////////////////////////////////////////////////////////////////////
export const TbstcTimelineChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#CE9399"
        title="Total Rest Time"
        infoContent={(
                <div>
                    <div>The aggregate timeline charts illustrate your <strong>rest time spent between sets over time</strong>.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>Each point on a line represents the total time spent between sets for that point in time.  If you have a filter set to aggregate by week, month, etc., points represent the <strong>aggregate time spent between sets</strong> over the selected time period.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>For example, if you spent a grand total of 20 minutes resting between sets of deadlifts over a contiguous 3-day period, and you have a filter set to aggregate <strong>by week</strong>, then the data point will display at 20 minutes.</div>
                </div>
        )}
        showInfo={showInfo}
        navigateTo={navigateTo}
        marginTop={marginTop}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_TBSTC_URI : null}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn} />
)

export const TbstcTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_ALL]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates the sum total of all your rest time spent between sets, for <strong>all movements</strong>, over time.</div>)}
        colors={chartUtils.singleValueColor}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcBodySegmentsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByBodySegmentTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>all movements</strong>, distributes between your upper and lower body, over time.</div>)}
        colors={chartUtils.bodySegmentColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL}
        title="Total Rest Time by Muscle Group"
        content={(<div>The following charts detail <strong>your total rest time between sets</strong> across the individual muscles of your muscle groups, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByMuscleGroupTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>all movements</strong>, distributes across all your major muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcUpperBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByUpperBodySegmentTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit upper body muscles</strong>, distributes across all your upper body muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcShouldersTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_SHOULDERS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByShoulderMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles, over time.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcChestTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_CHEST]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByChestMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles, over time.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcBackTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_BACK]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByBackMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the back</strong>, distributes across your individual back muscles, over time.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcBicepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_BICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByBicepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the biceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.BICEPS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcTricepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_TRICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByTricepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles, over time.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcForearmsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_FOREARMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByForearmsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the forearms</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.FOREARMS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcAbsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_ABS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByAbsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the abs</strong>, distributes across your individual abdominial muscles, over time.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcLowerBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByLowerBodySegmentTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit lower body muscles</strong>, distributes across all your lower body muscle groups, over time.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcQuadsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_QUADS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByQuadsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the quadriceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.QUADRICEPS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcHamsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_HAMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByHamsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the hamstrings</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.HAMSTRINGS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcCalfsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_CALFS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByCalfsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the calfs</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.CALVES_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcGlutesTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_GLUTES]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByGlutesMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the glutes</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.GLUTES_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Total Rest Time by Movement Variant"
        content={(<div>The following timeline charts detail <strong>your total rest time between sets</strong> across the different movement variants, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcMovementVariantsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOVEMENT_VARIANTS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>all movements</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcUpperBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_UPPER_BODY]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.upperBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcShouldersMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_SHOULDERS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.shoulderTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcChestMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_CHEST]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.chestTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the chest</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcBackMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_BACK]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.backTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the back</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcBicepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_BICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.bicepsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcTricepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_TRICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.tricepsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcForearmsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_FOREARMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.forearmsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcAbsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_ABS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.absTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the abs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcLowerBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_LOWER_BODY]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.lowerBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcQuadsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_QUADS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.quadsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcHamsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_HAMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.hamsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the hamstrings</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcCalfsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_CALFS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.calfsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the calfs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const TbstcGlutesMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSTC_MOV_VAR_GLUTES]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.glutesTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time spent between sets, for <strong>movements that hit the glutes</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

////////////////////////////////////////////////////////////////////////////////
// Time Between Sets - Average Total Timeline heading and charts
////////////////////////////////////////////////////////////////////////////////
export const AvgTbstcTimelineChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#CE9399"
        title="Average per Set"
        infoContent={(
                <div>
                    <div>These timeline charts illustrate your <strong>average rest time spent between sets over time.</strong></div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>If you change your workout style over time in terms of how long of a rest you take between sets, the data lines will trend accordingly.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>Each point on a line represents the average time between sets for that point in time.  If you have a filter set to aggregate by week, month, etc., points represent the <strong>average time spent between sets</strong> over the selected time period.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>Each point on a line represents the average time spent between sets for that point in time.  For example, if you did 3 sets of Arnold presses, and between sets (1) and (2) you rested for 45 seconds, and between sets (2) and (3) you rested for 54 seconds, your total time between sets would be: 99 seconds.  Your average per set would be: 49.5 seconds.\n\nIf you have a filter set to aggregate by week, month, etc., points represent the <strong>average time spent between sets</strong> over the selected time period.</div>
                </div>
        )}
        showInfo={showInfo}
        marginTop={marginTop}
        navigateTo={navigateTo}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_AVG_TBSTC_URI : null}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn} />
)

export const AvgTbstcTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_ALL]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates the per-set average of all your rest time, for <strong>all movements</strong>, over time.</div>)}
        colors={chartUtils.singleValueColor}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcBodySegmentsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByBodySegmentTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>all movements</strong>, distributes between your upper and lower body, over time.</div>)}
        colors={chartUtils.bodySegmentColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL}
        title="Average Rest Time per Set by Muscle Group"
        content={(<div>The following timeline charts detail <strong>your rest time per-set average</strong> across the individual muscles of your muscle groups, over time.</div>)}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByMuscleGroupTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>all movements</strong>, distributes across all your major muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcUpperBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByUpperBodySegmentTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit upper body muscles</strong>, distributes across all your upper body muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcShouldersTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_SHOULDERS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByShoulderMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles, over time.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcChestTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_CHEST]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByChestMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles, over time.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcBackTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_BACK]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByBackMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the back</strong>, distributes across your individual back muscles, over time.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcBicepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_BICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByBicepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the biceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.BICEPS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcTricepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_TRICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByTricepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles, over time.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcForearmsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_FOREARMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByForearmsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the forearms</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.FOREARMS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcAbsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_ABS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByAbsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the abs</strong>, distributes across your individual abdominial muscles, over time.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcLowerBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByLowerBodySegmentTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit lower body muscles</strong>, distributes across all your lower body muscle groups, over time.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcQuadsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_QUADS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByQuadsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the quadriceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.QUADRICEPS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcHamsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_HAMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByHamsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the hamstrings</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.HAMSTRINGS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcCalfsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_CALFS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByCalfsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the calfs</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.CALVES_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcGlutesTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_GLUTES]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByGlutesMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the glutes</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.GLUTES_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Average Rest Time per Set by Movement Variant"
        content={(<div>The following timeline charts detail <strong>your rest time per-set average</strong> across the different movement variants, over time.</div>)}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcMovementVariantsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOVEMENT_VARIANTS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>all movements</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcUpperBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_UPPER_BODY]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.upperBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcShouldersMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_SHOULDERS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.shoulderTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcChestMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_CHEST]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.chestTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the chest</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcBackMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_BACK]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.backTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the back</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcBicepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_BICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.bicepsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcTricepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_TRICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.tricepsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcForearmsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_FOREARMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.forearmsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcAbsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_ABS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.absTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the abs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcLowerBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_LOWER_BODY]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.lowerBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcQuadsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_QUADS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.quadsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcHamsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_HAMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.hamsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcCalfsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_CALFS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.calfsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

export const AvgTbstcGlutesMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_TBSTC_MOV_VAR_GLUTES]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.glutesTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your rest time, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="seconds" />
)

////////////////////////////////////////////////////////////////////////////////
// Time Between Sets - Distribution Pie charts
////////////////////////////////////////////////////////////////////////////////
export const TbspcPieChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#CE9399"
        title="Distribution"
        infoContent={(
                <div>
                    <div>These pie charts show <strong>how your time spent between sets is distributed</strong>.  There are charts to show how your time between sets are distributed across your muscle groups and movement variants.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>They are helpful for spotting training inconsistencies.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>For example, if you tend to take long rest periods between chest movement sets, but then have very short rest periods between back movement sets, that would show in the <strong>Total Time Spent Between Sets - Upper Body Muscle Groups</strong> pie chart.  The chest slice would be disproportionately larger than the back slice.</div>
                </div>
        )}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_TBSDPC_URI : null}
        showInfo={showInfo}
        navigateTo={navigateTo}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn}
        marginTop={marginTop} />
)

export const TbspcBodySegmentsPieChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.totalTimeBetweenSetsSameMovByBodySegment}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>all movements</strong>, distributes between your upper and lower body.</div>)}
        colors={chartUtils.bodySegmentColors}
        {...props} />
)

export const TbspcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL_DIST}
        title=" Rest Time Distribution by Muscle Group"
        content={(<div>The following pie charts detail <strong>how your total rest time distributes</strong> across the individual muscles of the main muscle groups.</div>)}
        {...props} />
)

export const TbspcMuscleGroupsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.totalTimeBetweenSetsSameMovByMuscleGroup}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>all movements</strong>, distributes across all your major muscle groups.</div>)}
        colors={chartUtils.muscleGroupColors}
        {...props} />
)

export const TbspcUpperBodyMuscleGroupsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.totalTimeBetweenSetsSameMovByUpperBodySegment}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>upper body movements</strong>, distributes across all your upper body muscle groups.</div>)}
        colors={chartUtils.muscleGroupColors}
        {...props} />
)

export const TbspcShouldersPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_SHOULDERS]}
        dataSourceFn={chartData => chartData.totalTimeBetweenSetsSameMovByShoulderMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        {...props} />
)

export const TbspcChestPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_CHEST]}
        dataSourceFn={chartData => chartData.totalTimeBetweenSetsSameMovByChestMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        {...props} />
)

export const TbspcBackPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_BACK]}
        dataSourceFn={chartData => chartData.totalTimeBetweenSetsSameMovByBackMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the back</strong>, distributes across your individual back muscles.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        {...props} />
)

export const TbspcTricepsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_TRICEPS]}
        dataSourceFn={chartData => chartData.totalTimeBetweenSetsSameMovByTricepsMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        {...props} />
)

export const TbspcAbsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_ABS]}
        dataSourceFn={chartData => chartData.totalTimeBetweenSetsSameMovByAbsMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the abs</strong>, distributes across your individual abdominal muscles.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        {...props} />
)

export const TbspcLowerBodyMuscleGroupsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.totalTimeBetweenSetsSameMovByLowerBodySegment}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>lower body movements</strong>, distributes across all your lower body muscle groups.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        {...props} />
)

export const TbspcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Rest Time Distribution by Movement Variant"
        content={(<div>The following pie charts detail <strong>how your total rest time distributes</strong> across the different movement variants.</div>)}
        {...props} />
)

export const TbspcMovementVariantsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOVEMENT_VARIANTS]}
        dataSourceFn={chartData => chartData.totalTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>all movements</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcUpperBodyMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_UPPER_BODY]}
        dataSourceFn={chartData => chartData.totalUpperBodyTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcShouldersMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_SHOULDERS]}
        dataSourceFn={chartData => chartData.totalShoulderTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcChestMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_CHEST]}
        dataSourceFn={chartData => chartData.totalChestTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the chest</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcBackMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_BACK]}
        dataSourceFn={chartData => chartData.totalBackTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the back</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcBicepsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_BICEPS]}
        dataSourceFn={chartData => chartData.totalBicepsTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcTricepsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_TRICEPS]}
        dataSourceFn={chartData => chartData.totalTricepsTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcForearmsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_FOREARMS]}
        dataSourceFn={chartData => chartData.totalForearmsTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcAbsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_ABS]}
        dataSourceFn={chartData => chartData.totalAbsTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the abs</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcLowerBodyMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_LOWER_BODY]}
        dataSourceFn={chartData => chartData.totalLowerBodyTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcQuadsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_QUADS]}
        dataSourceFn={chartData => chartData.totalQuadsTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcHamsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_HAMS]}
        dataSourceFn={chartData => chartData.totalHamsTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the hams</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcCalfsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_CALFS]}
        dataSourceFn={chartData => chartData.totalCalfsTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the calfs</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const TbspcGlutesMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDPC_MOV_VAR_GLUTES]}
        dataSourceFn={chartData => chartData.totalGlutesTimeBetweenSetsSameMovByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your rest time between sets, for <strong>movements that hit the glutes</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

////////////////////////////////////////////////////////////////////////////////
// Time Between Sets - Distribution Timeline heading and charts
////////////////////////////////////////////////////////////////////////////////
export const TbsdtcTimelineChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#CE9399"
        title="Distribution / Time"
        infoContent={(
                <div>
                    <div>These timeline charts illustrate <strong>how your time spent between sets is distributed over time</strong>.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>For example, if over time you increase your rest time between sets for upper body training, or shorten your rest time for lower body training, you will see the upper body line trend upwards over time, and the upper body line trend downwards.</div>
                </div>
        )}
        showInfo={showInfo}
        navigateTo={navigateTo}
        marginTop={marginTop}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_TBSDTC_URI : null}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn} />
)

export const TbsdtcBodySegmentsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByBodySegmentTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>all movements</strong>, distributes between your upper and lower body, over time.</div>)}
        colors={chartUtils.bodySegmentColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props}
        logging={false} />
)

export const TbsdtcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL_DIST}
        title="Rest Time Distribution by Muscle Group"
        content={(<div>The following timeline charts detail <strong>how your total rest time distributes</strong> across the individual muscles of your muscle groups, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByMuscleGroupTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>all movements</strong>, distributes across all your major muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcUpperBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByUpperBodySegmentTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit upper body muscles</strong>, distributes across all your upper body muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcShouldersTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_SHOULDERS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByShoulderMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles, over time.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcChestTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_CHEST]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByChestMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles, over time.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcBackTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_BACK]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByBackMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the back</strong>, distributes across your individual back muscles, over time.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcTricepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_TRICEPS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByTricepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles, over time.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcAbsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_ABS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByAbsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the abs</strong>, distributes across your individual abdominial muscles, over time.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcLowerBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByLowerBodySegmentTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit lower body muscles</strong>, distributes across all your lower body muscle groups, over time.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Rest Time Distribution by Movement Variant"
        content={(<div>The following timeline charts detail <strong>how your total rest time distributes</strong> across the different movement variants, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcMovementVariantsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOVEMENT_VARIANTS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.timeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>all movements</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcUpperBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_UPPER_BODY]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.upperBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcShouldersMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_SHOULDERS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.shoulderTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcChestMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_CHEST]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.chestTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the chest</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcBackMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_BACK]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.backTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the back</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcBicepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_BICEPS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.bicepsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcTricepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_TRICEPS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.tricepsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcForearmsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_FOREARMS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.forearmsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcAbsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_ABS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.absTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit the abs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcLowerBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_LOWER_BODY]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.lowerBodyTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your rest time, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcQuadsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_QUADS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.quadsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your rest time, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcHamsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_HAMS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.hamsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your rest time, for <strong>movements that hit the hamstrings</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcCalfsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_CALFS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.calfsTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your rest time, for <strong>movements that hit the calfs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const TbsdtcGlutesMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_TBSDTC_MOV_VAR_GLUTES]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.glutesTimeBetweenSetsSameMovByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your rest time, for <strong>movements that hit the glutes</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)
