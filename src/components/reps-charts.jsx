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
// Metric: Reps
////////////////////////////////////////////////////////////////////////////////
export const RepsMetricHeadingPanel = ({showInfo, showInfoFn, closeInfoFn, marginTop, children}) => (
    <div>
        <InfoModal
            show={showInfo}
            title="Reps"
            closeOnTapFn={closeInfoFn}
            content={(
                    <div>
                        <div>The <strong>Reps</strong> metric is simply the number of reps done for a set (regardless of the weight used).</div>
                        <div style={{marginTop: 10}}>Several charts are provided for this metric.</div>
                    </div>
            )} />
        <MetricHeadingPanel bgColor="#006342" title="Reps" onTapFn={showInfoFn} marginTop={marginTop}>
            {children}
        </MetricHeadingPanel>
    </div>
)

////////////////////////////////////////////////////////////////////////////////
// Reps - Aggregate Timeline heading and charts
////////////////////////////////////////////////////////////////////////////////
export const RtcTimelineChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#7EB09F"
        title="Total Reps"
        infoContent={(
                <div>
                    <div>If you're a beginner, as you get stronger and your <strong>stamina increases</strong>, you should see the lines trending upwards over time.  Or, if you normally prefer doing high-rep sets, but decide to change to start doing heavier weight with less reps, you should see the lines trending downwards over time.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>Each point on a line represents the sum total rep count for that point in time.  If you have a filter set to aggregate by week, month, etc., points represent the <strong>aggregate rep count</strong> over the selected time period.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>For example, if your shoulders did a grand total of 175 reps over a contiguous 3-day period, and you have a filter set to aggregate <strong>by week</strong>, then the data point will display at 175 reps.</div>
                </div>
        )}
        showInfo={showInfo}
        navigateTo={navigateTo}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_RTC_URI : null}
        marginTop={marginTop}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn} />
)

export const RtcRepsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_ALL]}
        dataSourceFn={chartData => chartData.repsTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates the sum total of all your reps, for <strong>all movements</strong>, over time.</div>)}
        colors={chartUtils.singleValueColor}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcBodySegmentsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.repsByBodySegmentTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>all movements</strong>, distributes between your upper and lower body, over time.</div>)}
        colors={chartUtils.bodySegmentColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL}
        title="Total Reps by Muscle Group Details"
        content={(<div>The following timeline charts detail <strong>your total rep count</strong> across the individual muscles of your muscle groups, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const RtcMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.repsByMuscleGroupTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>all movements</strong>, distributes across all your major muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcUpperBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.repsByUpperBodySegmentTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit upper body muscles</strong>, distributes across all your upper body muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcShouldersTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_SHOULDERS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByShoulderMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles, over time.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcChestTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_CHEST]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByChestMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles, over time.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcBackTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_BACK]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByBackMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the back</strong>, distributes across your individual back muscles, over time.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcBicepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_BICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByBicepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the biceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.BICEPS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcTricepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_TRICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByTricepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles, over time.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcForearmsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_FOREARMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByForearmsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the forearms</strong>, distributes across your individual tricep muscles, over time.</div>)}
        colors={props.muscleColors[utils.FOREARMS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcAbsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_ABS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByAbsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the abs</strong>, distributes across your individual abdominial muscles, over time.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcLowerBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.repsByLowerBodySegmentTimeSeries}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit lower body muscles</strong>, distributes across all your lower body muscle groups, over time.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcQuadsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_QUADS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByQuadsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the quadriceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.QUADRICEPS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcHamsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_HAMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByHamsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the hamstrings</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.HAMSTRINGS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcCalfsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_CALFS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByCalfsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the calfs</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.CALVES_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcGlutesTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_GLUTES]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByGlutesMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the glutes</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.GLUTES_MG_ID]}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Total Reps by Movement Variant"
        content={(<div>The following timeline charts detail <strong>your total rep count</strong> across the different movement variants, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={false}
        {...props} />
)

export const RtcMovementVariantsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOVEMENT_VARIANTS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.repsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>all movements</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcUpperBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_UPPER_BODY]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.upperBodyRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcShouldersMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_SHOULDERS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.shoulderRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcChestMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_CHEST]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.chestRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the chest</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcBackMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_BACK]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.backRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the back</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)


export const RtcBicepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_BICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.bicepsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcTricepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_TRICEPS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.tricepsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcForearmsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_FOREARMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.forearmsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcAbsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_ABS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.absRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the abs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcLowerBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_LOWER_BODY]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.lowerBodyRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcQuadsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_QUADS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.quadsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcHamsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_HAMS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.hamsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the hamstrings</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcCalfsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_CALFS]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.calfsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the calfs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const RtcGlutesMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RTC_MOV_VAR_GLUTES]}
        dataKey="aggregateSummedValue"
        maxDataKey="maxAggregateSummedValue"
        dataSourceFn={chartData => chartData.glutesRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the glutes</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

////////////////////////////////////////////////////////////////////////////////
// Reps - Average Aggregate Timeline heading and charts
////////////////////////////////////////////////////////////////////////////////
export const AvgRtcTimelineChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#7EB09F"
        title="Average Reps per Set"
        infoContent={(
                <div>
                    <div>These timeline charts illustrate your <strong>average rep count over time</strong>.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>If you're a beginner, as you get stronger and your <strong>stamina increases</strong>, you should see the lines trending upwards over time.  Or, if you normally prefer doing high-rep sets, but decide to change to start doing heavier weight with less reps, you should see the lines trending downwards over time.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>Each point on a line represents the sum total rep count for that point in time.  If you have a filter set to aggregate by week, month, etc., points represent the <strong>average rep count</strong> over the selected time period.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>
                        <span>Each point on a line represents the average rep count per set for that point in time.  For example, if you did 3 sets of calf raises</span>
                        <ol>
                            <li>10 reps of 295 lbs</li>
                            <li>8 reps of 275 lbs</li>
                            <li>8 reps of 265 lbs</li>
                        </ol>
                        <span>your total rep count would be: 26.  Your average per set would be: 8.7.</span>
                    </div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>If you have a filter set to aggregate by week, month, etc., points represent the <strong>average rep count per set</strong> over the selected time period.</div>
                </div>
        )}
        showInfo={showInfo}
        navigateTo={navigateTo}
        marginTop={marginTop}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_AVG_RTC_URI : null}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn} />
)

export const AvgRtcRepsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_ALL]}
        dataSourceFn={chartData => chartData.repsTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates the per-set average of all your reps, for <strong>all movements</strong>, over time.</div>)}
        colors={chartUtils.singleValueColor}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcBodySegmentsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.repsByBodySegmentTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>all movements</strong>, distributes between your upper and lower body, over time.</div>)}
        colors={chartUtils.bodySegmentColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL}
        title="Average Reps per Set by Muscle Group"
        content={(<div>The following timneline charts detail <strong>your rep count per-set average</strong> across the individual muscles of your muscle groups, over time.</div>)}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.repsByMuscleGroupTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>all movements</strong>, distributes across all your major muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcUpperBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.repsByUpperBodySegmentTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit upper body muscles</strong>, distributes across all your upper body muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcShouldersTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_SHOULDERS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByShoulderMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles, over time.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcChestTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_CHEST]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByChestMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles, over time.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcBackTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_BACK]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByBackMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the back</strong>, distributes across your individual back muscles, over time.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcBicepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_BICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByBicepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the biceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.BICEPS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcTricepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_TRICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByTricepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles, over time.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcForearmsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_FOREARMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByForearmsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the forearms</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.FOREARMS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcAbsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_ABS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByAbsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the abs</strong>, distributes across your individual abdominial muscles, over time.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcLowerBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.repsByLowerBodySegmentTimeSeries}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit lower body muscles</strong>, distributes across all your lower body muscle groups, over time.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcQuadsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_QUADS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByQuadsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the quadriceps</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.QUADRICEPS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcHamsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_HAMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByHamsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the hamstrings</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.HAMSTRINGS_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcCalfsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_CALFS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByCalfsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the calfs</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.CALVES_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcGlutesTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_GLUTES]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByGlutesMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the glutes</strong>, evolves over time.</div>)}
        colors={props.muscleColors[utils.GLUTES_MG_ID]}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Average Reps per Set by Movement Variant"
        content={(<div>The following timeline charts detail <strong>your rep count per-set average</strong> across the different movement variants, over time.</div>)}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcMovementVariantsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOVEMENT_VARIANTS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.repsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>all movements</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcUpperBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_UPPER_BODY]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.upperBodyRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcShouldersMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_SHOULDERS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.shoulderRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcChestMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_CHEST]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.chestRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the chest</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcBackMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_BACK]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.backRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the back</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcBicepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_BICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.bicepsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcTricepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_TRICEPS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.tricepsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcForearmsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_FOREARMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.forearmsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcAbsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_ABS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.absRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the abs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcLowerBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_LOWER_BODY]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.lowerBodyRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcQuadsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_QUADS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.quadsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcHamsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_HAMS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.hamsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcCalfsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_CALFS]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.calfsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

export const AvgRtcGlutesMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_AVG_RTC_MOV_VAR_GLUTES]}
        dataKey="avgAggregateValue"
        maxDataKey="maxAvgAggregateValue"
        dataSourceFn={chartData => chartData.glutesRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the per-set average of all your reps, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={true}
        calculateDistributions={false}
        {...props}
        uomDisplay="" />
)

////////////////////////////////////////////////////////////////////////////////
// Reps - Distribution Pie charts
////////////////////////////////////////////////////////////////////////////////
export const RpcPieChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#7EB09F"
        title="Distribution"
        infoContent={(
                <div>
                    <div>These pie charts enable you to make comparisons with the <strong>Reps</strong> metric across time periods.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>They are helpful for spotting training inconsistencies.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>For example, if you tend to do very high rep sets for your shoulder movements, but then do very low-rep movements for all your chest movements, that would show in the <strong>Total Reps - Muscle Groups</strong> pie chart.  The shoulders slice would be disproportionately larger than the chest slice.</div>
                </div>
        )}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_RDPC_URI : null}
        marginTop={marginTop}
        navigateTo={navigateTo}
        showInfo={showInfo}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn} />
)

export const RpcBodySegmentsPieChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.totalRepsByBodySegment}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>all movements</strong>, distributes between your upper and lower body.</div>)}
        colors={chartUtils.bodySegmentColors}
        {...props} />
)

export const RpcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL_DIST}
        title="Total Reps by Muscle Group Details"
        content={(<div>The following pie charts detail <strong>how your total rep count distributes</strong> across the individual muscles of the main muscle groups.</div>)}
        {...props} />
)

export const RpcMuscleGroupsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.totalRepsByMuscleGroup}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>all movements</strong>, distributes across all your major muscle groups.</div>)}
        colors={chartUtils.muscleGroupColors}
        {...props} />
)

export const RpcUpperBodyMuscleGroupsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.totalRepsByUpperBodySegment}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>upper body movements</strong>, distributes across all your upper body muscle groups.</div>)}
        colors={chartUtils.muscleGroupColors}
        {...props} />
)

export const RpcLowerBodyMuscleGroupsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.totalRepsByLowerBodySegment}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>lower body movements</strong>, distributes across all your lower body muscle groups.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        {...props} />
)

export const RpcShouldersPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_SHOULDERS]}
        dataSourceFn={chartData => chartData.totalRepsByShoulderMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        {...props} />
)

export const RpcChestPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_CHEST]}
        dataSourceFn={chartData => chartData.totalRepsByChestMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        {...props} />
)

export const RpcBackPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_BACK]}
        dataSourceFn={chartData => chartData.totalRepsByBackMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the back</strong>, distributes across your individual back muscles.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        {...props} />
)

export const RpcTricepsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_TRICEPS]}
        dataSourceFn={chartData => chartData.totalRepsByTricepsMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        {...props} />
)

export const RpcAbsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_ABS]}
        dataSourceFn={chartData => chartData.totalRepsByAbsMg}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the abs</strong>, distributes across your individual abdominal muscles.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        {...props} />
)

export const RpcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Total Reps by Movement Variant"
        content={(<div>The following pie charts detail <strong>how your total rep count distributes</strong> across the different movement variants.</div>)}
        {...props} />
)

export const RpcMovementVariantsPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOVEMENT_VARIANTS]}
        dataSourceFn={chartData => chartData.totalRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>all movements</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcUpperBodyMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_UPPER_BODY]}
        dataSourceFn={chartData => chartData.totalUpperBodyRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcShouldersMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_SHOULDERS]}
        dataSourceFn={chartData => chartData.totalShoulderRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcChestMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_CHEST]}
        dataSourceFn={chartData => chartData.totalChestRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the chest</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcBackMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_BACK]}
        dataSourceFn={chartData => chartData.totalBackRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the back</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcBicepsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_BICEPS]}
        dataSourceFn={chartData => chartData.totalBicepsRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcTricepsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_TRICEPS]}
        dataSourceFn={chartData => chartData.totalTricepsRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcForearmsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_FOREARMS]}
        dataSourceFn={chartData => chartData.totalForearmsRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcAbsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_ABS]}
        dataSourceFn={chartData => chartData.totalAbsRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the abs</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcLowerBodyMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_LOWER_BODY]}
        dataSourceFn={chartData => chartData.totalLowerBodyRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcQuadsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_QUADS]}
        dataSourceFn={chartData => chartData.totalQuadsRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcHamsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_HAMS]}
        dataSourceFn={chartData => chartData.totalHamsRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the hams</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcCalfsMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_CALFS]}
        dataSourceFn={chartData => chartData.totalCalfsRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the calfs</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

export const RpcGlutesMovVarPieChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDPC_MOV_VAR_GLUTES]}
        dataSourceFn={chartData => chartData.totalGlutesRepsByMovementVariant}
        aboutChartDiv={(<div>This chart illustrates how the sum total of all your reps, for <strong>movements that hit the glutes</strong>, distributes across the different movement variants.</div>)}
        colors={chartUtils.movementVariantColors}
        {...props} />
)

////////////////////////////////////////////////////////////////////////////////
// Reps - Distribution Timeline heading and charts
////////////////////////////////////////////////////////////////////////////////
export const RdtcTimelineChartsHeadingPanel = ({id, showInfo, showInfoFn, closeInfoFn, enableMoreChartsLink, navigateTo, marginTop}) => (
    <HeadingPanel
        id={id}
        bgColor="#7EB09F"
        title="Distribution / Time"
        infoContent={(
                <div>
                    <div>These timeline distribution charts illustrate <strong>where your reps are distributed over time</strong>.</div>
                    <div style={{marginTop: MARGIN_BETWEEN_HELP_PARAGRAPHS}}>If over time you change your workout style in terms of the number of reps that you typically do, the plot lines will trend accordingly.  They will trend upwards if you increase your rep count over time; downwards if you decrease your rep count over time.</div>
                </div>
        )}
        showInfo={showInfo}
        marginTop={marginTop}
        navigateTo={navigateTo}
        moreChartsUri={enableMoreChartsLink ? urls.CHARTS_RDTC_URI : null}
        showInfoFn={showInfoFn}
        closeInfoFn={closeInfoFn} />
)

export const RdtcBodySegmentsTimeSeriesChart = props => (
    <StrengthChart
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_BODY_SEGMENTS]}
        dataSourceFn={chartData => chartData.repsByBodySegmentTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>all movements</strong>, distributes between your upper and lower body, over time.</div>)}
        colors={chartUtils.bodySegmentColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props}
        logging={false} />
)

export const RdtcMuscleGroupDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MG_SECTION}
        jumps={utils.ELEMENT_IDS_MG_ALL_DIST}
        title="Reps Distribution by Muscle Group"
        content={(<div>The following timeline charts detail <strong>how your total rep count distributes</strong> across the individual muscles of your muscle groups, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.repsByMuscleGroupTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>all movements</strong>, distributes across all your major muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcUpperBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_UPPER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.repsByUpperBodySegmentTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit upper body muscles</strong>, distributes across all your upper body muscle groups, over time.</div>)}
        colors={chartUtils.muscleGroupColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcShouldersTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_SHOULDERS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.repsByShoulderMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the shoulders</strong>, distributes across your individual shoulder muscles, over time.</div>)}
        colors={props.muscleColors[utils.SHOULDER_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcChestTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_CHEST]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.repsByChestMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the chest</strong>, distributes across your individual chest muscles, over time.</div>)}
        colors={props.muscleColors[utils.CHEST_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcBackTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_BACK]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.repsByBackMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the back</strong>, distributes across your individual back muscles, over time.</div>)}
        colors={props.muscleColors[utils.BACK_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcTricepsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_TRICEPS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.repsByTricepsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the triceps</strong>, distributes across your individual tricep muscles, over time.</div>)}
        colors={props.muscleColors[utils.TRICEP_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcAbsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_ABS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.repsByAbsMgTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the abs</strong>, distributes across your individual abdominial muscles, over time.</div>)}
        colors={props.muscleColors[utils.ABS_MG_ID]}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcLowerBodyMuscleGroupsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MG_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MG_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_LOWER_BODY_MUSCLE_GROUPS]}
        dataSourceFn={chartData => chartData.repsByLowerBodySegmentTimeSeries}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit lower body muscles</strong>, distributes across all your lower body muscle groups, over time.</div>)}
        colors={chartUtils.lowerBodyMuscleGroupColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcMovementVariantDetailsDivider = props => (
    <ChartSection
        id={utils.ELEMENT_ID_MV_SECTION}
        jumps={utils.ELEMENT_IDS_MV_ALL}
        title="Reps Distribution by Movement Variant"
        content={(<div>The following timeline charts detail <strong>how your total rep count distributes</strong> across the different movement variants, over time.</div>)}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcMovementVariantsTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ALL[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOVEMENT_VARIANTS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.repsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>all movements</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcUpperBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_UPPER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_UPPER_BODY]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.upperBodyRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit upper body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcShouldersMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_SHOULDERS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_SHOULDERS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.shoulderRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the shoulders</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcChestMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CHEST[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_CHEST]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.chestRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the chest</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcBackMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BACK[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_BACK]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.backRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the back</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcBicepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_BICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_BICEPS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.bicepsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the biceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcTricepsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_TRICEPS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_TRICEPS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.tricepsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the triceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcForearmsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_FOREARMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_FOREARMS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.forearmsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the forearms</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcAbsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_ABS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_ABS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.absRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit the abs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcLowerBodyMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_LOWER_BODY[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_LOWER_BODY]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.lowerBodyRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of all your reps, for <strong>movements that hit lower body muscles</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcQuadsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_QUADS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_QUADS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.quadsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your reps, for <strong>movements that hit the quadriceps</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcHamsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_HAMS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_HAMS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.hamsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your reps, for <strong>movements that hit the hamstrings</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcCalfsMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_CALFS[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_CALFS]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.calfsRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your reps, for <strong>movements that hit the calfs</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)

export const RdtcGlutesMovVarTimeSeriesChart = props => (
    <StrengthChart
        id={utils.ELEMENT_ID_MV_GLUTES[0]}
        jumpUpElementId={utils.ELEMENT_ID_MV_SECTION}
        chartConfig={props.allChartConfig[chartUtils.CHART_ID_RDTC_MOV_VAR_GLUTES]}
        dataKey="distribution"
        maxDataKey="maxDistribution"
        dataSourceFn={chartData => chartData.glutesRepsByMovementVariantTimeSeries}
        aboutChartDiv={(<div>This chart illustrates how the percentage of of all your reps, for <strong>movements that hit the glutes</strong>, distributes across the different movement variants, over time.</div>)}
        colors={chartUtils.movementVariantColors}
        calculateAverages={false}
        calculateDistributions={true}
        {...props} />
)
