import React from "react"
import { Link } from "react-router"
import { Image, Modal } from "react-bootstrap"
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import _ from "lodash"
import * as utils from "../utils"
import * as chartUtils from "../chart-utils"
import * as urls from "../urls"
import Tappable from "react-tappable"
import moment from "moment"
import numeral from "numeral"
import { ChartSection } from "./chart-components.jsx"
var Promise = require('es6-promise').Promise;
import Loading from "../components/loading.jsx"

export default class StrengthChart extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            showAboutChartModal: false,
            parentDataProcessing: this.props.parentDataProcessing,
            processing: true,
            timeSeriesDataEntries: null,
            chartStrengthData: null,
            setsArrayAscending: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const processingStateDidChange = (this.state.parentDataProcessing != nextState.parentDataProcessing) ||
                                         (this.state.processing != nextState.processing)
        const returnVal = processingStateDidChange ||
                          (this.state.showAboutChartModal != nextState.showAboutChartModal)
        if (this.props.logging) {
            console.log("inside strengthChart.shouldComponentUpdate, parentDataProcessing:  [" + this.state.parentDataProcessing + "], nextState.parentDataProcessing: [ " + nextState.parentDataProcessing + "], processing: [" + this.state.processing + "], nextState.processing: [" + nextState.processing + "].  Processing state did change: [" + processingStateDidChange + "]. Returning: [" + returnVal + "]")
        }
        return returnVal
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.logging) {
            console.log("inside strengthChart.componentWillReceiveProps, nextProps.parentDataProcessing: " + nextProps.parentDataProcessing + "]")
        }
        if (this.state.parentDataProcessing != nextProps.parentDataProcessing) {
            this.setState({ parentDataProcessing: nextProps.parentDataProcessing, processing: true })
        }
    }

    reprocess(delay) {
        if (this.props.logging) {
            console.log("inside strengthChart.reprocess(" + delay + ")")
        }
        setTimeout(() => {
            const chartDataLoadPromise = new Promise((resolve, reject) => {
                let {
                    bodySegmentsArray,
                    bodySegments,
                    muscleGroupsArray,
                    muscleGroups,
                    musclesArray,
                    muscles,
                    movementsArray,
                    movements,
                    movementVariantsArray,
                    movementVariants,
                    chartConfig,
                    dataSourceFn,
                    logging,
                    fetchMode,
                    chartCache,
                    calculateAverages,
                    calculateDistributions,
                    localCache,
                    userSettings,
                    addToChartCacheFn,
                    allSetsArrayAscending,
                    chartStrengthData
                } = this.props
                const isAllSetsEmpty = allSetsArrayAscending == null || allSetsArrayAscending.length == 0
                let timeSeriesDataEntries = null
                let setsArrayAscending = null
                if (!isAllSetsEmpty) {
                    let defaultSetsArrayAscending = allSetsArrayAscending
                    let chartConfigManuallyConfigured = chartConfig.manuallyConfigured
                    setsArrayAscending = defaultSetsArrayAscending
                    let firstSetLoggedAtInclusiveMoment = moment(setsArrayAscending[0].payload["set/logged-at"]).startOf('day')
                    let firstSetLoggedAtInclusive = firstSetLoggedAtInclusiveMoment.valueOf()
                    let lastSetLoggedAtInclusiveMoment = moment(_.last(setsArrayAscending).payload["set/logged-at"]).startOf('day').add(1, 'days')
                    let lastSetLoggedAtInclusive = lastSetLoggedAtInclusiveMoment.valueOf()
                    if (chartConfig.manuallyConfigured && chartConfig.startDate != null) {
                        setsArrayAscending = utils.filterByDateRange(setsArrayAscending, "set/logged-at", chartConfig.startDate, chartConfig.boundedEndDate ? chartConfig.endDate : null)
                        firstSetLoggedAtInclusive = moment(setsArrayAscending[0].payload["set/logged-at"]).startOf('day').valueOf()
                        lastSetLoggedAtInclusive = moment(_.last(setsArrayAscending).payload["set/logged-at"]).startOf('day').add(1, 'days').valueOf()
                        chartStrengthData = chartUtils.cachingMakeChartStrengthData(setsArrayAscending,
                                                                                    userSettings,
                                                                                    bodySegmentsArray,
                                                                                    bodySegments,
                                                                                    muscleGroupsArray,
                                                                                    muscleGroups,
                                                                                    musclesArray,
                                                                                    muscles,
                                                                                    movementsArray,
                                                                                    movements,
                                                                                    movementVariantsArray,
                                                                                    movementVariants,
                                                                                    fetchMode,
                                                                                    firstSetLoggedAtInclusive,
                                                                                    lastSetLoggedAtInclusive,
                                                                                    chartCache,
                                                                                    localCache,
                                                                                    logging)
                        if (chartStrengthData.cacheMeta != null && chartStrengthData.cacheMeta.cacheMiss) {
                            const cacheKey = chartStrengthData.cacheMeta.cacheKey
                            delete chartStrengthData.cacheMeta
                            addToChartCacheFn(cacheKey, chartStrengthData)
                        }
                    }
                    if (chartConfig.isTimelineChart) {
                        let aggregateBy = chartConfig.aggregateBy
                        if (!aggregateBy) {
                            const daysFrom = lastSetLoggedAtInclusiveMoment.diff(firstSetLoggedAtInclusiveMoment, 'days')
                            aggregateBy = chartUtils.defaultAggregateBy(daysFrom)
                        }
                        timeSeriesDataEntries = chartUtils.cachingNormalize(aggregateBy,
                                                                            firstSetLoggedAtInclusive,
                                                                            lastSetLoggedAtInclusive,
                                                                            dataSourceFn(chartStrengthData),
                                                                            chartConfig.id,
                                                                            chartCache,
                                                                            localCache,
                                                                            calculateAverages,
                                                                            calculateDistributions,
                                                                            logging)
                        if (timeSeriesDataEntries.cacheMeta != null &&
                            timeSeriesDataEntries.cacheMeta.cacheMiss) {
                            const cacheKey = timeSeriesDataEntries.cacheMeta.cacheKey
                            delete timeSeriesDataEntries.cacheMeta
                            addToChartCacheFn(cacheKey, timeSeriesDataEntries)
                        }
                    }
                    if (chartConfig.animate) {
                        setTimeout(() => {
                            if (this.props.disableChartAnimationFn) {
                                this.props.disableChartAnimationFn(chartConfig.id)
                            }
                        }, 2000)
                    }
                }
                setTimeout(() => {
                    resolve({ processing: false,
                              timeSeriesDataEntries: timeSeriesDataEntries,
                              chartStrengthData: chartStrengthData,
                              setsArrayAscending: setsArrayAscending })
                }, 50)
            })
            chartDataLoadPromise.then(newState => {
                this.setState(newState)
            })
        }, delay)
    }

    componentDidMount() {
        const { parentDataProcessing, processing } = this.state
        if (this.props.logging) {
            console.log("inside strengthChart.componentDidMount, parentDataProcessing: [" + parentDataProcessing + "], processing: [" + processing + "]")
        }
        if (!parentDataProcessing) {
            this.reprocess(50)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const prevParentDataProcessing = prevState.parentDataProcessing
        const { parentDataProcessing } = this.state
        if (this.props.logging) {
            console.log("inside strengthChart.componentDidUpdate, prevParentDataProcessing: [" + prevParentDataProcessing + "], parentDataProcessing: [" + parentDataProcessing + "]")
        }
        if (prevParentDataProcessing && !parentDataProcessing) {
            this.reprocess(0)
        }
    }

    render() {
        if (this.props.logging) {
            console.log("inside strengthChart.render, parentDataProcessing: [" +  this.state.parentDataProcessing + "], processing: [" + this.state.processing + "]")
        }
        let marginTop = this.props.marginTop
        let marginBottom = this.props.marginBottom
        if (!marginBottom) {
            marginBottom = 0
        }
        const chartConfig = this.props.chartConfig
        const isLongTitle = chartConfig.subName != null
        const screenWidth = utils.screenWidth()
        const processing = this.state.parentDataProcessing || this.state.processing
        let fontSize
        let titleFontSize
        let subTitleFontSize
        if (screenWidth > 1023) { // ipad pro and larger
            fontSize = "110%"
            titleFontSize = "125%"
            subTitleFontSize = "110%"
        } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
            fontSize = "100%"
            titleFontSize = "115%"
            subTitleFontSize = "100%"
        } else if (screenWidth > 411) { // iphone 6 plus
            fontSize = "90%"
            titleFontSize = "110%"
            subTitleFontSize = "95%"
        } else if (screenWidth > 374) { // iphone 6
            fontSize = "85%"
            titleFontSize = "100%"
            subTitleFontSize = "85%"
        } else { // iphone 5 and similar
            fontSize = "80%"
            titleFontSize = "90%"
            subTitleFontSize = "75%"
        }
        const makeChartTitleDiv = (adjust = 0) => {
            let margin
            if (screenWidth > 1023) { // ipad pro and larger
                margin = 8
            } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                margin = 7
            } else if (screenWidth > 411) { // iphone 6 plus
                margin = 6
            } else if (screenWidth > 374) { // iphone 6
                margin = 5 + adjust
            } else { // iphone 5 and similar
                margin = 5
            }
            return (
                <div style={{marginTop: margin,
                             marginBottom: chartConfig.isPercentage ? (margin + 20) : (margin + adjust)}}>
                    <div style={{fontSize: titleFontSize,
                                 textAlign: "center",
                                 color: utils.RIKERAPP_LIGHTER_BLACK_HEX,
                                 marginLeft: margin,
                                 marginRight: margin}}>
                        <span><strong>{chartConfig.name}</strong></span>
                    </div>
                    {(() => {
                         if (chartConfig.subName) {
                             return (
                                 <div style={{fontSize: subTitleFontSize,
                                              textAlign: "center",
                                              color: utils.RIKERAPP_LIGHTER_BLACK_HEX,
                                              marginTop: 3}}>
                                     <span><strong>{chartConfig.subName}</strong></span>
                                 </div>
                             )
                         }
                     })()
                    }
                </div>
            )
        }
        const preRenderChartComponentHeight = () => {
            let chartComponentHeight
            if (chartConfig.isTimelineChart) { // line chart
                if (screenWidth > 1023) { // ipad pro and larger
                    chartComponentHeight = 528
                    if (isLongTitle) {
                        chartComponentHeight += 30
                    }
                } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                    chartComponentHeight = 525
                    if (isLongTitle) {
                        chartComponentHeight += 30
                    }
                } else if (screenWidth > 411) { // iphone 6 plus
                    chartComponentHeight = 510
                    if (isLongTitle) {
                        chartComponentHeight += 25
                    }
                } else if (screenWidth > 374) { // iphone 6
                    chartComponentHeight = isLongTitle ? 515 : 530
                } else { // iphone 5 and similar
                    chartComponentHeight = isLongTitle ? 502 : 530
                }
                if (chartConfig.isPercentage || !chartConfig.isUom) {
                    // because we don't have the y-axis units label
                    if (screenWidth >= 1024) { // ipad pro and larger
                        chartComponentHeight -= 20
                        if (chartConfig.isPercentage) {
                            // I think the extra margin of the y-axis labels are causing the cartesian grid to be computed
                            // as a bit taller, so need to increase a bit the component height
                            chartComponentHeight += 10
                        }
                    } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                        chartComponentHeight -= 20
                        if (chartConfig.isPercentage) {
                            // I think the extra margin of the y-axis labels are causing the cartesian grid to be computed
                            // as a bit taller, so need to increase a bit the component height
                            chartComponentHeight += 10
                        }
                    } else if (screenWidth > 411) { // iphone 6 plus
                        chartComponentHeight -= 15
                        if (chartConfig.isPercentage) {
                            // I think the extra margin of the y-axis labels are causing the cartesian grid to be computed
                            // as a bit taller, so need to increase a bit the component height
                            chartComponentHeight += 10
                        }
                    } else if (screenWidth > 374) { // iphone 6
                        chartComponentHeight -= 15
                        if (chartConfig.isPercentage) {
                            // I think the extra margin of the y-axis labels are causing the cartesian grid to be computed
                            // as a bit taller, so need to increase a bit the component height
                            chartComponentHeight += 5
                        }
                    } else { // iphone 5 and similar
                        chartComponentHeight -= 15
                        if (chartConfig.isPercentage) {
                            // I think the extra margin of the y-axis labels are causing the cartesian grid to be computed
                            // as a bit taller, so need to increase a bit the component height
                            chartComponentHeight += 5
                        }
                    }
                }
            } else { // pie chart
                if (screenWidth > 1023) { // ipad pro and larger
                    chartComponentHeight = 515
                    if (isLongTitle) {
                        chartComponentHeight += 30
                    }
                } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                    chartComponentHeight = 510
                    if (isLongTitle) {
                        chartComponentHeight += 30
                    }
                } else if (screenWidth > 411) { // iphone 6 plus
                    chartComponentHeight = 460
                    if (isLongTitle) {
                        chartComponentHeight += 22
                    }
                } else if (screenWidth > 374) { // iphone 6
                    chartComponentHeight = 435
                    if (isLongTitle) {
                        chartComponentHeight += 20
                    }
                } else { // iphone 5 and similar
                    chartComponentHeight = 385
                    if (isLongTitle) {
                        chartComponentHeight += 15
                    }
                }
            }
            return chartComponentHeight
        }
        const makeUpButton = () => {
            if (this.props.jumpUpElementId != null) {
                const jumpToId = id => {
                    const top = document.getElementById(id).offsetTop
                    window.scrollTo(0, top)
                }
                return (
                    <Tappable
                        className="btn btn-riker btn-jumpTo-lite"
                        style={{marginLeft: 15, marginTop: 2, marginBottom: 2}}
                        onTap={() => jumpToId(this.props.jumpUpElementId)}>up</Tappable>
                )
            }
            return null
        }
        const makeTopButton = () => {
            return (
                <Tappable
                    className="btn btn-riker btn-jumpTo-lite"
                    style={{marginLeft: 12, marginTop: 2, marginBottom: 2}}
                    onTap={() => window.scrollTo(0, 0)}>top</Tappable>
            )
        }
        if (processing) {
            let noDataFontSize
            let height
            if (screenWidth > 1023) { // ipad pro and larger
                noDataFontSize = "150%"
                height = 405
            } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                noDataFontSize = "135%"
                height = 400
            } else if (screenWidth > 411) { // iphone 6 plus
                noDataFontSize = "130%"
                height = 385
            } else if (screenWidth > 374) { // iphone 6
                noDataFontSize = "120%"
                height = 375
            } else { // iphone 5 and similar
                noDataFontSize = "110%"
                height = 350
            }
            return (
                <div
                    className="card"
                    id={this.props.id}
                    style={{marginTop: marginTop,
                            marginBottom: marginBottom,
                            backgroundColor: "#F6F6F6"}}>
                    <div style={{paddingTop: 10, height: preRenderChartComponentHeight()}}>
                        <div style={{textAlign: "right", marginRight: 10}}>
                            <Tappable
                                component="div"
                                style={{marginRight: 15, backgroundColor: "#9EA3A8", color: "#F6F6F6"}}
                                className="question-mark question-mark-light"
                                onTap={() => {}}>i</Tappable>
                            <Tappable component="div"
                                      style={{marginTop: 10, display: "inline-block"}}
                                      onTap={() => {}}>
                                <Image src={chartConfig.manuallyConfigured ? "/images/riker-blue-settings.svg" : "/images/riker-semi-black-settings.svg"} />
                            </Tappable>
                            { makeUpButton() }
                            { makeTopButton() }
                        </div>
                        { makeChartTitleDiv() }
                        <div style={{height: height, display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Loading scale={0.3} />
                        </div>
                    </div>
                </div>
            )
        } else {
            const {
                uomDisplay,
                bodySegmentsArray,
                bodySegments,
                muscleGroupsArray,
                muscleGroups,
                musclesArray,
                muscles,
                movementsArray,
                movements,
                movementVariantsArray,
                movementVariants,
                navigateToChartConfigFn,
                allSetsArrayAscending,
                logging,
                dataSourceFn,
                aboutChartDiv,
                colors,
                dataKey,
                maxDataKey,
                fetchMode
            } = this.props
            if (logging) {
                console.log("inside strengthChart.render, this.props.allSetsArrayAscending: " + JSON.stringify(allSetsArrayAscending))
            }
            const isAnimationActive = chartConfig.animate
            const yaxisLabelMaker = chartUtils.makeYaxisLabelMaker(uomDisplay)
            const isAllSetsEmpty = allSetsArrayAscending == null || allSetsArrayAscending.length == 0
            let defaultSetsArrayAscending = allSetsArrayAscending
            const RADIAN = Math.PI / 180;
            const PIE_CHART_OUTER_RADIUS = "65%"
            return (
                <div className="card"
                     id={this.props.id}
                     style={{marginTop: marginTop, marginBottom: marginBottom, backgroundColor: "#F6F6F6"}}>
                    <Modal
                        show={this.state.showAboutChartModal}
                        dialogClassName="riker-modal-dialog">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-sm">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                    <div>{chartConfig.name}</div>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{aboutChartDiv}</Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default" onTap={() => this.setState({ showAboutChartModal: false })}>Close</Tappable>
                        </Modal.Footer>
                    </Modal>
                    {(() => {
                         const capitalizedChartName = chartConfig.name.toTitleCase()
                         const lowercaseChartName = _.lowerCase(chartConfig.name)
                         const chartConfigManuallyConfigured = chartConfig.manuallyConfigured
                         const setsArrayAscending = this.state.setsArrayAscending
                         const chartStrengthData = this.state.chartStrengthData
                         const makeChartHelpAndConfigBtnsDiv = hasChartData => (
                             <div style={{textAlign: "right", marginRight: 10}}>
                                 <Tappable
                                     component="div"
                                     style={{marginRight: 15, backgroundColor: "#9EA3A8", color: "#F6F6F6"}}
                                     className="question-mark question-mark-light"
                                     onTap={() => {
                                             this.setState({ showAboutChartModal: true,
                                                             aboutChartContent: aboutChartDiv,
                                                             aboutChartName: chartConfig.name })
                                     }}>i</Tappable>
                                 {(() => {
                                      if (hasChartData) {
                                          return (
                                              <Tappable component="a"
                                                        onTap={() => {
                                                                navigateToChartConfigFn(allSetsArrayAscending, chartConfig, setsArrayAscending, false)
                                                        }}>
                                                  <Image src={chartConfigManuallyConfigured ? "/images/riker-blue-settings.svg" : "/images/riker-semi-black-settings.svg"} />
                                              </Tappable>
                                          )
                                      }
                                 })()
                                 }
                                 { makeUpButton() }
                                 { makeTopButton() }
                             </div>
                         )
                         const makeLegendSpacer = () => (
                             <div style={{height: 20}}>&nbsp;</div>
                         )
                         let noDataFontSize
                         let height
                         if (screenWidth > 1023) { // ipad pro and larger
                             noDataFontSize = "150%"
                             height = 410
                         } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                             noDataFontSize = "135%"
                             height = 410
                         } else if (screenWidth > 411) { // iphone 6 plus
                             noDataFontSize = "130%"
                             height = 400
                         } else if (screenWidth > 374) { // iphone 6
                             noDataFontSize = "120%"
                             height = 390
                         } else { // iphone 5 and similar
                             noDataFontSize = "110%"
                             height = 380
                         }
                         const makeNoDataCard = () => (
                             <div style={{display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          marginTop: 25,
                                          marginBottom: 20}}>
                                 <div style={{height: height,
                                              width: "85%",
                                              borderRadius: 10,
                                              backgroundColor: "#E3E5EC",
                                              display: "flex",
                                              textAlign: "center",
                                              alignItems: "center",
                                              justifyContent: "center"}}>
                                     <div>
                                         <div style={{display: "flex",
                                                      alignItems: "center",
                                                      justifyContent: "center"}}>
                                             <Image src="/images/no-chart-data-graphic.svg" />
                                         </div>
                                         <div style={{textAlign: "center",
                                                      color: "#9799A0",
                                                      marginTop: 30,
                                                      fontSize: noDataFontSize}}>No data to chart yet.</div>
                                     </div>
                                 </div>
                             </div>
                         )
                         const makeNoPieDataSlide = () => (
                             <div style={{paddingTop: 10, textAlign: "center"}}>
                                 { makeChartHelpAndConfigBtnsDiv(!isAllSetsEmpty) }
                                 { makeChartTitleDiv() }
                                 { makeNoDataCard() }
                                 { makeLegendSpacer() }
                             </div>
                         )
                         const makeNoTimelineDataSlide = () => (
                             <div style={{paddingTop: 10, height: preRenderChartComponentHeight(), textAlign: "center"}}>
                                 { makeChartHelpAndConfigBtnsDiv(!isAllSetsEmpty) }
                                 { makeChartTitleDiv() }
                                 { makeNoDataCard() }
                             </div>
                         )
                         let chartComponent
                         if (setsArrayAscending != null && setsArrayAscending.length > 0) {
                             if (chartConfig.isTimelineChart) { // line chart
                                 const timeSeriesDataEntries = this.state.timeSeriesDataEntries
                                 let maxValue = null
                                 if (chartConfig.isUom) {
                                     maxValue = timeSeriesDataEntries[maxDataKey]
                                 }
                                 const chartData = chartUtils.lineChartifyData(timeSeriesDataEntries, dataKey, true)
                                 if (logging) {
                                     console.log("timeSeriesDataEntries: " + JSON.stringify(timeSeriesDataEntries))
                                     console.log("chartData: " + JSON.stringify(chartData))
                                 }
                                 let hasChartData = chartData.length > 0
                                 if (hasChartData) {
                                     if (maxValue != null && maxValue == 0) {
                                         hasChartData = false
                                     }
                                 }
                                 if (hasChartData) {
                                     const entityIds = {}
                                     for (let j = 0; j < chartData.length; j++) {
                                         const entityIdsArray = chartData[j].entityIds
                                         for (let n = 0; n < entityIdsArray.length; n++) {
                                             entityIds[chartData[j].entityIds[n]] = entityIdsArray[n]
                                         }
                                     }
                                     const entityIdsArray = _.values(entityIds)
                                     const yaxisDomain = {}
                                     if (chartConfig.isPercentage) {
                                         yaxisDomain.domain = [0, 1]
                                     } else {
                                         yaxisDomain.domain = ["auto", "auto"]
                                     }
                                     let chartComponentHeight
                                     let legendBottom
                                     let chartContainerHeight
                                     if (screenWidth > 1023) { // ipad pro and larger
                                         chartContainerHeight = 405
                                         if (entityIdsArray.length > 8) { // legend wraps to 2 lines
                                             chartComponentHeight = 535
                                             legendBottom = -25
                                         } else {
                                             chartComponentHeight = 528
                                             legendBottom = -20
                                         }
                                         if (isLongTitle) {
                                             chartComponentHeight += 30
                                         }
                                     } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                                         chartContainerHeight = 405
                                         if (entityIdsArray.length > 6) {
                                             chartComponentHeight = 525
                                             legendBottom = -20
                                         } else {
                                             chartComponentHeight = 525
                                             legendBottom = -20
                                         }
                                         if (isLongTitle) {
                                             chartComponentHeight += 30
                                         }
                                     } else if (screenWidth > 411) { // iphone 6 plus
                                         chartContainerHeight = 405
                                         if (entityIdsArray.length > 5) {
                                             chartComponentHeight = 515
                                             legendBottom = isLongTitle ? -15 : -20
                                         } else {
                                             chartComponentHeight = 510
                                             legendBottom = isLongTitle ? -10 : -15
                                         }
                                         if (isLongTitle) {
                                             chartComponentHeight += 25
                                             if (!chartConfig.isUom) {
                                                 legendBottom -= 5
                                             }
                                         }
                                     } else if (screenWidth > 374) { // iphone 6
                                         chartContainerHeight = 385
                                         if (entityIdsArray.length > 8) { // legend wraps to 3 lines
                                             chartComponentHeight = isLongTitle ? 510 : 490
                                             legendBottom = isLongTitle ? -10 : -13
                                         } else if (entityIdsArray.length > 5) { // legend wraps to 2 lines
                                             chartComponentHeight = isLongTitle ? 515 : 530
                                             legendBottom = isLongTitle ? -10 : -13
                                         } else {
                                             chartComponentHeight = isLongTitle ? 510 : 490
                                             legendBottom = isLongTitle ? -10 : -10
                                             if (!chartConfig.isUom && !isLongTitle) {
                                                 chartComponentHeight -= 5
                                             }
                                         }
                                     } else { // iphone 5 and similar
                                         chartContainerHeight = 385
                                         if (entityIdsArray.length > 8) { // legend wraps to 3 lines
                                             chartComponentHeight = isLongTitle ? 505 : 530
                                             legendBottom = isLongTitle ? -10 : -13
                                         } else if (entityIdsArray.length > 4) { // legend wraps to 2 lines
                                             chartComponentHeight = isLongTitle ? 502 : 530
                                             legendBottom = isLongTitle ? -10 : -13
                                         } else {
                                             chartComponentHeight = isLongTitle ? 505 : 485
                                             legendBottom = isLongTitle ? -10 : -10
                                         }
                                     }
                                     if (chartConfig.isPercentage || !chartConfig.isUom) {
                                         // because we don't have the y-axis units label
                                         if (screenWidth >= 1024) { // ipad pro and larger
                                             chartComponentHeight -= 20
                                             legendBottom += 25
                                             if (chartConfig.isPercentage) {
                                                 // I think the extra margin of the y-axis labels are causing the cartesian grid to be computed
                                                 // as a bit taller, so need to increase a bit the component height
                                                 chartComponentHeight += 10
                                             }
                                         } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                                             chartComponentHeight -= 20
                                             legendBottom += 25
                                             if (chartConfig.isPercentage) {
                                                 // I think the extra margin of the y-axis labels are causing the cartesian grid to be computed
                                                 // as a bit taller, so need to increase a bit the component height
                                                 chartComponentHeight += 10
                                             }
                                         } else if (screenWidth > 411) { // iphone 6 plus
                                             chartComponentHeight -= 15
                                             legendBottom += 25
                                             if (chartConfig.isPercentage) {
                                                 // I think the extra margin of the y-axis labels are causing the cartesian grid to be computed
                                                 // as a bit taller, so need to increase a bit the component height
                                                 chartComponentHeight += 10
                                             }
                                         } else if (screenWidth > 374) { // iphone 6
                                             chartComponentHeight -= 15
                                             legendBottom += 20
                                             if (chartConfig.isPercentage) {
                                                 // I think the extra margin of the y-axis labels are causing the cartesian grid to be computed
                                                 // as a bit taller, so need to increase a bit the component height
                                                 chartComponentHeight += 5
                                             }
                                         } else { // iphone 5 and similar
                                             chartComponentHeight -= 15
                                             legendBottom += 20
                                             if (chartConfig.isPercentage) {
                                                 // I think the extra margin of the y-axis labels are causing the cartesian grid to be computed
                                                 // as a bit taller, so need to increase a bit the component height
                                                 chartComponentHeight += 5
                                             }
                                         }
                                     }
                                     let chartMarginLeft = chartConfig.isPercentage ? -5 : -20
                                     if (chartConfig.isPercentage) {
                                         if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                                             // no adjustment needed
                                         } else if (screenWidth > 411) { // iphone 6 plus
                                             chartMarginLeft -= 5
                                         } else if (screenWidth > 374) { // iphone 6
                                             chartMarginLeft -= 10
                                         } else { // iphone 5 and similar
                                             chartMarginLeft -= 15
                                         }
                                     }
                                     chartComponent = (
                                         <div style={{paddingTop: 10, textAlign: "center", height: chartComponentHeight}}>
                                             { makeChartHelpAndConfigBtnsDiv(hasChartData) }
                                             { makeChartTitleDiv() }
                                             <div style={{marginTop: 15}}>
                                                 {(() => {
                                                      if (chartConfig.isUom) {
                                                          return (
                                                              <span style={{float: "left", marginLeft: 40, verticalAlign: "bottom"}}>
                                                                  <span style={{fontSize: fontSize, color: utils.RIKERAPP_LIGHTER_BLACK_HEX}}>{yaxisLabelMaker(maxValue)}</span>
                                                              </span>
                                                          )
                                                      }
                                                 })()
                                                 }
                                                 <ResponsiveContainer width="100%" height={chartContainerHeight}>
                                                     <LineChart data={chartData}
                                                                margin={{left: chartMarginLeft,
                                                                         right: 20,
                                                                         bottom: 10}}>
                                                         <XAxis dataKey="dateUnixTime"
                                                                tickFormatter={dateUnixTime => moment(dateUnixTime).format("D MMM")}
                                                                orientation="bottom" />
                                                         <YAxis padding={{top: 30}}
                                                                tickFormatter={chartConfig.isPercentage ? value => value * 100 + "%" : chartConfig.isUom ? value => _.round(chartUtils.yaxisWeightValueScalingFactor(maxValue) * value, 1) : value => _.round(value, 1)}
                                                                {...yaxisDomain} />
                                                         <CartesianGrid strokeDasharray="3 3" />
                                                         <Tooltip
                                                             labelFormatter={dateUnixTime => moment(dateUnixTime).format("ddd, MMM Do YYYY")}
                                                             formatter={val => chartConfig.isPercentage ? _.round((val ? val : 0) * 100, 2) + "%" : numeral(val).format("0,0.0") + " " + uomDisplay} />
                                                         <Legend wrapperStyle={{left: 3, bottom: legendBottom, fontSize: fontSize}} />
                                                         {(() => {
                                                              const lines = []
                                                              const avgByPeriodContainer = timeSeriesDataEntries.avgByPeriodContainer
                                                              entityIdsArray.sort((id1, id2) => avgByPeriodContainer[id1].name.localeCompare(avgByPeriodContainer[id2].name))
                                                              for (let j = 0; j < entityIdsArray.length; j++) {
                                                                  const entityId = entityIdsArray[j]
                                                                  const entityTimeSeriesArray = avgByPeriodContainer[entityId].avgByGroupTimeSeries
                                                                  const filteredEntityTimeSeriesArray = _.filter(entityTimeSeriesArray, timeSeriesDataObject => timeSeriesDataObject[dataKey] > 0)
                                                                  const dotConfig = chartUtils.dotConfig(filteredEntityTimeSeriesArray.length, colors[entityId])
                                                                  if (logging) {
                                                                      //console.log("dotConfig for entityId: " + entityId + ": " + JSON.stringify(dotConfig))
                                                                  }
                                                                  lines.push(
                                                                      <Line
                                                                          key={j}
                                                                          type="monotone"
                                                                          connectNulls={true}
                                                                          isAnimationActive={isAnimationActive}
                                                                          dot={dotConfig}
                                                                          dataKey={entityId}
                                                                          name={avgByPeriodContainer[entityId].name}
                                                                          stroke={colors[entityId]}
                                                                          activeDot={{r: 8}} />
                                                                  )
                                                              }
                                                              return lines
                                                         })()
                                                         }
                                                     </LineChart>
                                                 </ResponsiveContainer>
                                             </div>
                                         </div>
                                     )
                                 } else {
                                     chartComponent = makeNoTimelineDataSlide()
                                 }
                             } else { // pie chart
                                 const chartData = dataSourceFn(chartStrengthData)
                                 const chartDataArray = _.values(chartData)
                                 //console.log("chartDataArray: " + JSON.stringify(chartDataArray))
                                 const noDataNames = []
                                 chartDataArray.sort((o1, o2) => o1.name.localeCompare(o2.name))
                                 for (let i = 0; i < chartDataArray.length; i++) {
                                     if (chartDataArray[i].aggregateValue == 0) {
                                         noDataNames.push(chartDataArray[i].name)
                                     }
                                 }
                                 _.remove(chartDataArray, obj => obj.aggregateValue == 0)
                                 const hasChartData = chartDataArray.length > 0
                                 if (hasChartData) {
                                     const labelComponent = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                         const radius = innerRadius + (outerRadius - innerRadius) * 1.175;
                                         const x = cx + radius * Math.cos(-midAngle * RADIAN)
                                         const y = cy + radius * Math.sin(-midAngle * RADIAN)
                                         if (percent > 0) {
                                             return (
                                                 <text x={x}
                                                       y={y}
                                                       fill="black"
                                                       fontSize={12}
                                                       textAnchor={x > cx ? 'start' : 'end'}
                                                       dominantBaseline="middle">{chartDataArray[index].name + " - " + (percent * 100).toFixed(0) + "%"}</text>
                                             )
                                         }
                                     }
                                     let pieChartComponentHeight
                                     let pieChartContainerHeight
                                     let pieLegendBottom
                                     let pieNoDataLabelsLeft
                                     let pieNoDataLabelsBottom
                                     let pieNoDataLabelsFontSize
                                     let pieSliceLabelComponent = null
                                     if (screenWidth > 1023) { // ipad pro and larger
                                         pieSliceLabelComponent = labelComponent
                                         pieChartContainerHeight = 400
                                         pieNoDataLabelsLeft = 5
                                         pieNoDataLabelsBottom = 5
                                         pieNoDataLabelsFontSize = "85%"
                                         if (chartDataArray.length > 6) {
                                             pieChartComponentHeight = 535
                                             pieLegendBottom = -30
                                         } else {
                                             pieChartComponentHeight = 515
                                             pieLegendBottom = -10
                                         }
                                         if (noDataNames.length > 0) { // just one line
                                             pieChartComponentHeight += 15
                                         }
                                         if (isLongTitle) {
                                             pieChartComponentHeight += 30
                                         }
                                     } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                                         pieSliceLabelComponent = labelComponent
                                         pieChartContainerHeight = 400
                                         pieNoDataLabelsLeft = 5
                                         pieNoDataLabelsBottom = 5
                                         pieNoDataLabelsFontSize = "85%"
                                         if (chartDataArray.length > 6) {
                                             pieChartComponentHeight = 530
                                             pieLegendBottom = -30
                                         } else {
                                             pieChartComponentHeight = 510
                                             pieLegendBottom = -10
                                         }
                                         if (noDataNames.length > 0) { // just one line
                                             pieChartComponentHeight += 15
                                         }
                                         if (isLongTitle) {
                                             pieChartComponentHeight += 30
                                         }
                                     } else if (screenWidth > 411) { // iphone 6 plus
                                         pieChartContainerHeight = 350
                                         pieNoDataLabelsLeft = 5
                                         pieNoDataLabelsBottom = 5
                                         pieNoDataLabelsFontSize = "80%"
                                         if (chartDataArray.length > 8) {
                                             pieChartComponentHeight = 475
                                             pieLegendBottom = -30
                                         } else if (chartDataArray.length > 6) {
                                             pieChartComponentHeight = 460
                                             pieLegendBottom = -15
                                         } else {
                                             pieChartComponentHeight = 430
                                             pieLegendBottom = 15
                                         }
                                         if (noDataNames.length > 4) { // wraps to second line
                                             pieChartComponentHeight += 30
                                         } else if (noDataNames.length > 0) { // just one line
                                             pieChartComponentHeight += 15
                                         }
                                         if (isLongTitle) {
                                             pieChartComponentHeight += 22
                                         }
                                     } else if (screenWidth > 374) { // iphone 6
                                         pieChartContainerHeight = 350
                                         pieNoDataLabelsLeft = 5
                                         pieNoDataLabelsBottom = 5
                                         pieNoDataLabelsFontSize = "70%"
                                         if (chartDataArray.length > 8) {
                                             pieChartComponentHeight = 455
                                             pieLegendBottom = -15
                                         } else if (chartDataArray.length > 6) {
                                             pieChartComponentHeight = 435
                                             pieLegendBottom = 5
                                         } else {
                                             pieChartComponentHeight = 420
                                             pieLegendBottom = 20
                                         }
                                         if (noDataNames.length > 4) { // wraps to second line
                                             pieChartComponentHeight += 30
                                         } else if (noDataNames.length > 0) { // just one line
                                             pieChartComponentHeight += 15
                                         }
                                         if (isLongTitle) {
                                             pieChartComponentHeight += 20
                                         }
                                     } else { // iphone 5 and similar
                                         pieChartContainerHeight = 315
                                         pieNoDataLabelsLeft = 5
                                         pieNoDataLabelsBottom = 5
                                         pieNoDataLabelsFontSize = "70%"
                                         if (chartDataArray.length > 8) {
                                             pieChartComponentHeight = 405
                                             pieLegendBottom = -5
                                         } else if (chartDataArray.length > 4) {
                                             pieChartComponentHeight = 385
                                             pieLegendBottom = 15
                                         } else {
                                             pieChartComponentHeight = 370
                                             pieLegendBottom = 30
                                         }
                                         if (noDataNames.length > 2) { // wraps to second line
                                             pieChartComponentHeight += 30
                                         } else if (noDataNames.length > 0) { // just one line
                                             pieChartComponentHeight += 15
                                         }
                                         if (isLongTitle) {
                                             pieChartComponentHeight += 15
                                         }
                                     }
                                     chartComponent = (
                                         <div
                                             id={chartConfig.id}
                                             style={{position: "relative",
                                                     paddingTop: 10,
                                                     textAlign: "center",
                                                     height: pieChartComponentHeight}}>
                                             { makeChartHelpAndConfigBtnsDiv(hasChartData) }
                                             { makeChartTitleDiv(screenWidth <= 374 ? -5 : 0) }
                                             <ResponsiveContainer width="100%" height={pieChartContainerHeight}>
                                                 <PieChart>
                                                     <Pie
                                                         outerRadius={PIE_CHART_OUTER_RADIUS}
                                                         isAnimationActive={isAnimationActive}
                                                         data={chartDataArray}
                                                         label={pieSliceLabelComponent != null && !chartConfig.suppressPieSliceLabels ? pieSliceLabelComponent : null}
                                                         nameKey="name"
                                                         dataKey="aggregateValue">
                                                         { chartDataArray.map((entry, index) => <Cell key={index} fill={colors[entry.entityKey]} />) }
                                                     </Pie>
                                                     <Legend wrapperStyle={{left: 3, fontSize: fontSize, bottom: pieLegendBottom}} />
                                                 </PieChart>
                                             </ResponsiveContainer>
                                             {(() => {
                                                  if (noDataNames.length > 0) {
                                                      let noDataNamesStr = ""
                                                      for (let i = 0; i < noDataNames.length; i++) {
                                                          noDataNamesStr += noDataNames[i]
                                                          if (i + 2 < noDataNames.length) {
                                                              noDataNamesStr += ", "
                                                          } else if (i + 1 < noDataNames.length) {
                                                              noDataNamesStr += " and "
                                                          }
                                                      }
                                                      return (
                                                          <div
                                                              id={chartConfig.id + "-nodatalabel"}
                                                              style={{fontSize: pieNoDataLabelsFontSize,
                                                                      textAlign: "left",
                                                                      position: "absolute",
                                                                      left: pieNoDataLabelsLeft,
                                                                      bottom: pieNoDataLabelsBottom}}>
                                                              {"* " + _.upperFirst(noDataNamesStr) + (noDataNames.length > 1 ? " have " : " has ") + " no data yet."}
                                                          </div>
                                                      )
                                                  } else {
                                                      return makeLegendSpacer()
                                                  }
                                             })()
                                             }
                                         </div>
                                     )
                                 } else { // no data
                                     chartComponent = makeNoPieDataSlide()
                                 }
                             }
                         } else { // no data
                             chartComponent = chartConfig.isTimelineChart ? makeNoTimelineDataSlide() : makeNoPieDataSlide()
                         }
                         return chartComponent
                    })()
                    }
                </div>
            )
        }
    }
}
