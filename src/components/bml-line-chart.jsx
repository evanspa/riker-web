import React from "react"
import { Link } from "react-router"
import { Image,
         Modal } from "react-bootstrap"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import _ from "lodash"
import * as utils from "../utils"
import * as chartUtils from "../chart-utils"
import * as urls from "../urls"
import Tappable from "react-tappable"
import numeral from "numeral"
import moment from "moment"
var Promise = require('es6-promise').Promise;
import Loading from "../components/loading.jsx"

export default class BmlLineChart extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            showHeadingPanelHelpTextModal: false,
            parentDataProcessing: this.props.parentDataProcessing,
            processing: true,
            showAboutLineChartModal: false,
            bmlsArrayAscending: null,
            chartData: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const processingStateDidChange = (this.state.parentDataProcessing != nextState.parentDataProcessing) ||
                                         (this.state.processing != nextState.processing)
        const returnVal = processingStateDidChange ||
                          (this.state.showHeadingPanelHelpTextModal != nextState.showHeadingPanelHelpTextModal) ||
                          (this.state.showAboutLineChartModal != nextState.showAboutLineChartModal)
        if (this.props.logging) {
            console.log("inside bodyChart.shouldComponentUpdate, parentDataProcessing:  [" + this.state.parentDataProcessing + "], nextState.parentDataProcessing: [ " + nextState.parentDataProcessing + "], processing: [" + this.state.processing + "], nextState.processing: [" + nextState.processing + "].  Processing state did change: [" + processingStateDidChange + "]. Returning: [" + returnVal + "]")
        }
        return returnVal
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.logging) {
            console.log("inside bodyChart.componentWillReceiveProps, nextProps.parentDataProcessing: " + nextProps.parentDataProcessing)
        }
        if (this.state.parentDataProcessing != nextProps.parentDataProcessing) {
            this.setState({ parentDataProcessing: nextProps.parentDataProcessing })
        }
    }

    reprocess(delay) {
        setTimeout(() => {
            const chartDataLoadPromise = new Promise((resolve, reject) => {
                let {
                    chartTitle,
                    marginTop,
                    uomDisplay,
                    chartId,
                    chartConfig,
                    userSettings,
                    dataSourceFn,
                    dataKey,
                    headingPanelColor,
                    navigateToChartConfigFn,
                    bmlsArrayAscending,
                    chartCache,
                    localCache,
                    addToChartCacheFn,
                    chartBodyData,
                    calculateAverages,
                    calculateDistributions,
                    logging
                } = this.props
                const isAllBmlsEmpty = bmlsArrayAscending == null || bmlsArrayAscending.length == 0
                let chartData = null
                if (!isAllBmlsEmpty) {
                    let firstBmlLoggedAtInclusiveMoment = moment(bmlsArrayAscending[0].payload["bodyjournallog/logged-at"]).startOf('day')
                    let firstBmlLoggedAtInclusive = firstBmlLoggedAtInclusiveMoment.valueOf()
                    let lastBmlLoggedAtInclusiveMoment = moment(_.last(bmlsArrayAscending).payload["bodyjournallog/logged-at"]).startOf('day').add(1, 'days')
                    let lastBmlLoggedAtInclusive = lastBmlLoggedAtInclusiveMoment.valueOf()
                    if (chartConfig.manuallyConfigured && chartConfig.startDate != null) {
                        bmlsArrayAscending = utils.filterByDateRange(bmlsArrayAscending, "bodyjournallog/logged-at", chartConfig.startDate, chartConfig.boundedEndDate ? chartConfig.endDate : null)
                        firstBmlLoggedAtInclusiveMoment = moment(bmlsArrayAscending[0].payload["bodyjournallog/logged-at"]).startOf('day')
                        firstBmlLoggedAtInclusive = firstBmlLoggedAtInclusiveMoment.valueOf()
                        lastBmlLoggedAtInclusiveMoment = moment(_.last(bmlsArrayAscending).payload["bodyjournallog/logged-at"]).startOf('day').add(1, 'days')
                        lastBmlLoggedAtInclusive = lastBmlLoggedAtInclusiveMoment.valueOf()
                        chartBodyData = chartUtils.cachingChartBodyData(bmlsArrayAscending,
                                                                        userSettings,
                                                                        firstBmlLoggedAtInclusive,
                                                                        lastBmlLoggedAtInclusive,
                                                                        chartCache,
                                                                        localCache,
                                                                        logging)
                        if (chartBodyData.cacheMeta != null &&
                            chartBodyData.cacheMeta.cacheMiss) {
                            const cacheKey = chartBodyData.cacheMeta.cacheKey
                            delete chartBodyData.cacheMeta
                            addToChartCacheFn(cacheKey, chartBodyData)
                        }
                    }
                    let timeSeriesDataEntries = null
                    let aggregateBy = chartConfig.aggregateBy
                    if (!aggregateBy) {
                        const daysFrom = lastBmlLoggedAtInclusiveMoment.diff(firstBmlLoggedAtInclusiveMoment, 'days')
                        aggregateBy = chartUtils.defaultAggregateBy(daysFrom)
                    }
                    if (bmlsArrayAscending != null && bmlsArrayAscending.length > 0) {
                        timeSeriesDataEntries = chartUtils.cachingNormalize(aggregateBy, // aka group-size-in-days
                                                                            firstBmlLoggedAtInclusive,
                                                                            lastBmlLoggedAtInclusive,
                                                                            dataSourceFn(chartBodyData),
                                                                            chartConfig.id,
                                                                            chartCache,
                                                                            localCache,
                                                                            calculateAverages,
                                                                            calculateDistributions,
                                                                            logging)
                        chartData = chartUtils.lineChartifyData(timeSeriesDataEntries, dataKey, true) // e.g., "avgValue"
                        if (timeSeriesDataEntries.cacheMeta != null && timeSeriesDataEntries.cacheMeta.cacheMiss) {
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
                              bmlsArrayAscending: bmlsArrayAscending,
                              chartData: chartData })
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
            console.log("inside bodyChart.componentDidMount, parentDataProcessing: [" + parentDataProcessing + "], processing: [" + processing + "]")
        }
        if (!parentDataProcessing) {
            this.reprocess(50)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const prevParentDataProcessing = prevState.parentDataProcessing
        const { parentDataProcessing } = this.state
        if (this.props.logging) {
            console.log("inside bodyChart.componentDidUpdate, prevParentDataProcessing: [" + prevParentDataProcessing + "], parentDataProcessing: [" + parentDataProcessing + "]")
        }
        if (prevParentDataProcessing && !parentDataProcessing) {
            this.reprocess(0)
        }
    }

    render() {
        if (this.props.logging) {
            console.log("inside bodyChart.render, parentDataProcessing: [" +  this.state.parentDataProcessing + "], processing: [" + this.state.processing + "]")
        }
        const cardPanelStyle = { marginTop: 8,
                                 paddingTop: 2,
                                 backgroundColor: "#F6F6F6",
                                 display: "flex",
                                 flexDirection: "column",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 marginBottom: 20 }
        const chartConfig = this.props.chartConfig
        const chartTitle = this.props.chartTitle
        const headingPanelColor = this.props.headingPanelColor
        const processing = this.state.parentDataProcessing || this.state.processing
        const makeTopButton = () => {
            return (
                <Tappable
                    className="btn btn-riker btn-jumpTo-lite"
                    style={{marginLeft: 12, marginTop: 2, marginBottom: 2}}
                    onTap={() => window.scrollTo(0, 0)}>top</Tappable>
            )
        }
        if (processing) {
            return (
                <div>
                    <div className="chartTypeHeadingPanel"
                         style={{marginTop: 5, backgroundColor: headingPanelColor, textAlign: "center"}}
                         id={this.props.id}>
                        <span>{chartTitle}</span>
                        <Tappable
                            component="div"
                            className="question-mark question-mark-light"
                            onTap={() => {
                                    this.setState({showHeadingPanelHelpTextModal: true})
                            }}>i</Tappable>
                    </div>
                    <div style={cardPanelStyle} className="card">
                        <div style={{marginRight: 20, width: "100%"}}>
                            <div style={{float: "right", marginTop: 5, marginBottom: 20}}>
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
                            </div>
                        </div>
                        <div style={{height: 390, display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <div style={{marginBottom: 40}}><Loading scale={0.3} /></div>
                        </div>
                    </div>
                </div>
            )
        } else {
            const {
                marginTop,
                uomDisplay,
                chartId,
                userSettings,
                dataKey,
                navigateToChartConfigFn,
                logging
            } = this.props
            const screenWidth = utils.screenWidth()
            const chartData = this.state.chartData
            const bmlsArrayAscending = this.state.bmlsArrayAscending
            const uomDisplayLowercase = _.lowerCase(uomDisplay)
            const hasChartData = chartData != null && chartData.length > 0
            const capitalizedChartName = chartConfig.name.toTitleCase()
            const lowercaseChartName = _.lowerCase(chartConfig.name)
            const isAllBmlsEmpty = bmlsArrayAscending == null || bmlsArrayAscending.length == 0
            let chartConfigManuallyConfigured = chartConfig.manuallyConfigured
            return (
                <div style={{marginTop: marginTop}}>
                    <Modal
                        show={this.state.showHeadingPanelHelpTextModal}
                        dialogClassName="riker-modal-dialog">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-sm">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                    <div>{capitalizedChartName + " Timeline"}</div>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body><p>{"The " + lowercaseChartName + " timeline chart illustrates your "}<strong>{lowercaseChartName + " over time"}</strong>.</p></Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default" onTap={() => this.setState({ showHeadingPanelHelpTextModal: false })}>Close</Tappable>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        show={this.state.showAboutLineChartModal}
                        dialogClassName="riker-modal-dialog">
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-sm">
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                                    <div>{capitalizedChartName + " Timeline"}</div>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body><p>This chart illustrates your <strong>{lowercaseChartName}</strong> over time.</p></Modal.Body>
                        <Modal.Footer>
                            <Tappable className="btn btn-default" onTap={() => this.setState({ showAboutLineChartModal: false })}>Close</Tappable>
                        </Modal.Footer>
                    </Modal>
                    <div className="chartTypeHeadingPanel"
                         style={{marginTop: 5, backgroundColor: headingPanelColor, textAlign: "center"}}
                         id={this.props.id}>
                        <span>{chartTitle}</span>
                        <Tappable
                            component="div"
                            className="question-mark question-mark-light"
                            onTap={() => {
                                    this.setState({showHeadingPanelHelpTextModal: true})
                            }}>i</Tappable>
                    </div>
                    <div style={cardPanelStyle} className="card">
                        <div style={{width: "100%", marginRight: 20}}>
                            <div style={{float: "right", marginTop: 5, marginBottom: 20}}>
                                <Tappable
                                    component="div"
                                    style={{marginRight: 15, backgroundColor: "#9EA3A8", color: "#F6F6F6", width: 23, height: 23, fontSize: 16}}
                                    className="question-mark question-mark-light"
                                    onTap={() => {
                                            this.setState({showAboutLineChartModal: true})
                                    }}>i</Tappable>
                                {(() => {
                                     if (!isAllBmlsEmpty) {
                                         return (
                                             <Tappable component="a"
                                                       onTap={() => {
                                                               navigateToChartConfigFn(bmlsArrayAscending, chartConfig, bmlsArrayAscending, false)
                                                       }}>
                                                 <Image src={chartConfigManuallyConfigured ? "/images/riker-blue-settings.svg" : "/images/riker-semi-black-settings.svg"} />
                                             </Tappable>
                                         )
                                     }
                                })()
                                }
                                { makeTopButton() }
                            </div>
                        </div>
                        {(() => {
                             if (hasChartData) {
                                 let chartComponentHeight = 435
                                 let legendBottom = -5
                                 let chartMarginLeft
                                 let chartMarginRight
                                 let fontSize
                                 if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                                     chartMarginLeft = 5
                                     chartMarginRight = 10
                                     fontSize = "105%"
                                 } else if (screenWidth > 411) { // iphone 6 plus
                                     chartMarginLeft = 0
                                     chartMarginRight = 5
                                     fontSize = "90%"
                                 } else if (screenWidth > 374) { // iphone 6
                                     chartMarginLeft = -5
                                     chartMarginRight = 5
                                     fontSize = "85%"
                                 } else { // iphone 5 and similar
                                     chartMarginLeft = -7
                                     chartMarginRight = 2
                                     fontSize = "75%"
                                 }
                                 if (logging) {
                                     console.log("chartData: " + JSON.stringify(chartData))
                                 }
                                 return (
                                     <div style={{width: "95%", paddingTop: 10, textAlign: "center", height: chartComponentHeight}}>
                                         <ResponsiveContainer width="100%" height={405}>
                                             <LineChart data={chartData}
                                                        margin={{left: chartMarginLeft,
                                                                 right: chartMarginRight,
                                                                 bottom: 10}}>
                                                 <XAxis dataKey="dateUnixTime"
                                                        tickFormatter={dateUnixTime => moment(dateUnixTime).format("D MMM")}
                                                        orientation="bottom" />
                                                 <YAxis padding={{top: 20}}
                                                        domain={["auto", "auto"]}
                                                        tickFormatter={value => value + " " + uomDisplayLowercase} />
                                                 <CartesianGrid strokeDasharray="3 3" />
                                                 <Tooltip labelFormatter={dateUnixTime => moment(dateUnixTime).format("dddd, MMMM Do YYYY")}
                                                          formatter={val => numeral(val).format("0,0.0") + " "}/>
                                                 <Legend wrapperStyle={{left: 3, bottom: legendBottom, fontSize: fontSize}} />
                                                 <Line type="monotone"
                                                       isAnimationActive={chartConfig.animate}
                                                       dot={chartUtils.dotConfig(chartData.length, chartConfig.stroke)}
                                                       unit={uomDisplay}
                                                       dataKey={chartUtils.ENTITY_KEY_FOR_SINGLE_VALUE_CONTAINER}
                                                       name={chartConfig.name}
                                                       stroke={chartConfig.stroke}
                                                       activeDot={{r: 8}} />
                                             </LineChart>
                                         </ResponsiveContainer>
                                     </div>
                                 )
                             } else {
                                 let noDataFontSize
                                 if (screenWidth > 1023) { // ipad pro and larger
                                     noDataFontSize = "150%"
                                 } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
                                     noDataFontSize = "135%"
                                 } else if (screenWidth > 411) { // iphone 6 plus
                                     noDataFontSize = "130%"
                                 } else if (screenWidth > 374) { // iphone 6
                                     noDataFontSize = "120%"
                                 } else { // iphone 5 and similar
                                     noDataFontSize = "95%"
                                 }
                                 return (
                                     <div style={{height: 390,
                                                  width: "85%",
                                                  borderRadius: 10,
                                                  backgroundColor: "#E3E5EC",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  marginBottom: 20}}>
                                         <div style={{}}>
                                             <div style={{display: "flex",
                                                          alignItems: "center",
                                                          justifyContent: "center"}}>
                                                 <Image src="/images/no-chart-data-graphic.svg" />
                                             </div>
                                             <div style={{marginTop: 15,
                                                          textAlign: "center",
                                                          color: "#9799A0",
                                                          marginTop: 30,
                                                          fontSize: noDataFontSize}}>No data to chart yet.</div>
                                         </div>
                                     </div>
                                 )
                             }
                        })()
                        }
                    </div>
                </div>
            )
        }
    }
}
