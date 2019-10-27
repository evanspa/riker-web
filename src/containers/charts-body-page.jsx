import React from "react"
import { push } from "react-router-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Image, Col, Breadcrumb } from "react-bootstrap"
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import _ from "lodash"
import * as utils from "../utils"
import * as chartUtils from "../chart-utils"
import * as gvs from "../grid-vals"
import * as urls from "../urls"
import { maintenanceAck,
         setChartDateRange,
         makeOnMovementSuggestionSelectedFn,
         addToChartCache,
         disableChartAnimation,
         bannerRemindLater } from "../actions/action-creators"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import Tappable from "react-tappable"
import NavbarBanner from "../components/navbar-banner.jsx"
import ReactGA from "react-ga"
import * as chartComps from "../components/chart-components.jsx"
import Autosuggest from "react-autosuggest"
import BmlLineChart from "../components/bml-line-chart.jsx"

class ChartsBodyPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            numBmls: -1,
            bmlsArrayAscending: null,
            showNoChartsToConfigureModal: false,
            movementSuggestions: [],
            movementSearchText: "",
            processing: true,
            bodyChartCommonProps: null,
            localCache: {}
        }
    }

    reprocess(delay) {
        setTimeout(() => {
            const dataLoadingPromise = new Promise((resolve, reject) => {
                const {
                    addToChartCacheFn,
                    allChartConfig,
                    bmls,
                    settings,
                    disableChartAnimationFn,
                    chartCache
                } = this.props
                const bmlsArray = _.values(bmls)
                let bmlsArrayAscending = null
                let firstBmlLoggedAtInclusive = null
                let lastBmlLoggedAtInclusive = null
                if (bmlsArray.length > 0) {
                    bmlsArrayAscending = bmlsArray.sort(utils.makeAscendPaylaodComparator("bodyjournallog/logged-at", null, null))
                    firstBmlLoggedAtInclusive = moment(bmlsArrayAscending[0].payload["bodyjournallog/logged-at"]).startOf('day').valueOf()
                    lastBmlLoggedAtInclusive = moment(_.last(bmlsArrayAscending).payload["bodyjournallog/logged-at"]).startOf('day').add(1, 'days').valueOf()
                }
                const bodyChartCommonProps = chartUtils.bodyChartCommonProps({settings,
                                                                              bmls,
                                                                              bmlsArray,
                                                                              bmlsArrayAscending,
                                                                              allChartConfig,
                                                                              onOrAfterLoggedAt: firstBmlLoggedAtInclusive,
                                                                              onOrBeforeLoggedAt: lastBmlLoggedAtInclusive,
                                                                              logging: false,
                                                                              disableChartAnimationFn,
                                                                              chartCache,
                                                                              localCache: this.state.localCache})
                if (bodyChartCommonProps.chartBodyData != null &&
                    bodyChartCommonProps.chartBodyData.cacheMeta != null &&
                    bodyChartCommonProps.chartBodyData.cacheMeta.cacheMiss) {
                    const cacheKey = bodyChartCommonProps.chartBodyData.cacheMeta.cacheKey
                    delete bodyChartCommonProps.chartBodyData.cacheMeta
                    addToChartCacheFn(cacheKey, bodyChartCommonProps.chartBodyData)
                }
                setTimeout(() => {
                    resolve({ processing: false,
                              numBmls: bmlsArray.length,
                              bmlsArrayAscending: bmlsArrayAscending,
                              bodyChartCommonProps: bodyChartCommonProps,
                              localCache: this.state.localCache })
                }, 50)
            })
            dataLoadingPromise.then(newState => {
                this.setState(newState)
            })
        }, delay);
    }

    componentDidMount() {
        this.reprocess(0)
    }

    componentDidUpdate(prevProps, prevState) {
        const { processing } = this.state
        if (processing) {
            this.reprocess(0)
        }
    }

    movementSearchOnChange = (event, { newValue, method }) => {
        this.setState({ movementSearchText: newValue })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            movementSuggestions: utils.computeMovementSuggestions(value, this.props.movementsArray)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({ movementSuggestions: [] })
    }

    render() {
        const {
            navigateTo,
            accountStatuses,
            redisplayBannerAfter,
            remindMeLaterFn,
            allChartConfig,
            navigateToBodyChartConfigFn,
            onMovementSuggestionSelectedFn,
            addToChartCacheFn
        } = this.props
        let {
            movementSearchText,
            movementSuggestions,
            bodyChartCommonProps,
            processing
        } = this.state
        const movementSearchInputProps = {
            placeholder: "search all movements",
            value: movementSearchText,
            onChange: this.movementSearchOnChange
        }
        let weightUomDisplayUppercase = null
        let sizeUomDisplayUppercase = null
        if (processing) {
            bodyChartCommonProps = { parentDataProcessing: true, allChartConfig: allChartConfig }
        } else {
            weightUomDisplayUppercase = bodyChartCommonProps.weightUomDisplayUppercase
            sizeUomDisplayUppercase = bodyChartCommonProps.sizeUomDisplayUppercase
            bodyChartCommonProps.navigateToChartConfigFn = navigateToBodyChartConfigFn
            bodyChartCommonProps.addToChartCacheFn = addToChartCacheFn
            bodyChartCommonProps.parentDataProcessing = false
        }
        const chartGlobalBodyConfig = allChartConfig[chartUtils.CHART_ID_GLOBAL_BODY]
        const commonTopMargin = chartComps.commonChartTopMargin(utils.screenWidth())
        const jumpToId = id => {
            const top = document.getElementById(id).offsetTop
            window.scrollTo(0, top)
        }
        const jumpButton = (id, title, marginLeft = 0, marginRight = 0) => {
            return (
                <div style={{display: "inline-block",
                             marginLeft: marginLeft,
                             marginRight: marginRight,
                             marginTop: 10}}>
                    <Tappable
                        className="btn btn-riker btn-jumpTo"
                        onTap={() => jumpToId(id)}>{title}</Tappable>
                </div>
            )
        }
        return (
            <div>
                <RikerHelmet title="Your Body" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(accountStatuses, redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={navigateTo}
                    remindMeLaterFn={remindMeLaterFn}
                    redisplayBannerAfter={redisplayBannerAfter}
                    accountStatuses={accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <chartComps.NoChartsToConfigureModal
                    show={this.state.showNoChartsToConfigureModal}
                    closeOnTapFn={() => this.setState({ showNoChartsToConfigureModal: false })} />
                <Col lg={6} lgOffset={3}
                     md={8} mdOffset={2}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Autosuggest
                        suggestions={movementSuggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={movement => movement.payload["movement/canonical-name"]}
                        renderSuggestion={(movement, {query}) => utils.renderMovementAsSuggestion(movement)}
                        onSuggestionSelected={(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
                                ReactGA.event({
                                    category: utils.GA_EVENT_CATEGORY_USER,
                                    action: "search movements from body charts"
                                })
                                onMovementSuggestionSelectedFn(suggestion, this.props.movementVariants)
                        }}
                        inputProps={movementSearchInputProps} />
                    <Breadcrumb>
                        <Breadcrumb.Item href="#" onClick={() => navigateTo(urls.HOME_URI)}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Your Body</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="metricHeadingPanel"
                         style={{backgroundColor: utils.RIKERAPP_LIGHTER_BLACK_HEX, textAlign: "center" }}>
                        <span><strong>Your Body</strong></span>
                        <Tappable component="a"
                                  style={{marginLeft: 15}}
                                  onTap={() => {
                                          if (this.state.numBmls > 0) {
                                              navigateToBodyChartConfigFn(this.state.bmlsArrayAscending, chartGlobalBodyConfig, this.state.bmlsArrayAscending, true)
                                          } else if (this.state.numBmls == 0) {
                                              this.setState({showNoChartsToConfigureModal: true})
                                          }
                                  }}>
                            <Image src="/images/riker-white-settings.svg" />
                        </Tappable>
                    </div>
                    <div style={{backgroundColor: "#59636C", textAlign: "center", marginTop: utils.THIN_MARGIN_TOP}}>
                        <div style={{paddingBottom: 10}}>
                            { jumpButton("id-body-weight", "body weight", 10, 0) }
                            { jumpButton("id-arms", "arms", 10) }
                            { jumpButton("id-chest", "chest", 10) }
                            { jumpButton("id-calfs", "calfs", 10) }
                            { jumpButton("id-thighs", "thighs", 10) }
                            { jumpButton("id-forearms", "forearms", 10) }
                            { jumpButton("id-waist", "waist", 10) }
                            { jumpButton("id-neck", "neck", 10, 10) }
                        </div>
                    </div>
                    <BmlLineChart
                        chartTitle="Body Weight Timeline"
                        marginTop={0}
                        id="id-body-weight"
                        uomDisplay={weightUomDisplayUppercase}
                        chartId={chartUtils.CHART_ID_BODY_WEIGHT}
                        chartConfig={allChartConfig[chartUtils.CHART_ID_BODY_WEIGHT]}
                        dataSourceFn={chartBodyData => chartBodyData.bodyWeightDataSource}
                        headingPanelColor="#AE9EB3"
                        calculateAverages={true}
                        calculateDistributions={false}
                        {...bodyChartCommonProps}
                        logging={false} />
                    <BmlLineChart
                        chartTitle="Arm Size Timeline"
                        id="id-arms"
                        marginTop={25}
                        uomDisplay={sizeUomDisplayUppercase}
                        chartId={chartUtils.CHART_ID_ARM_SIZE}
                        chartConfig={allChartConfig[chartUtils.CHART_ID_ARM_SIZE]}
                        dataSourceFn={chartBodyData => chartBodyData.armSizeDataSource}
                        headingPanelColor="#7F97B7"
                        calculateAverages={true}
                        calculateDistributions={false}
                        {...bodyChartCommonProps}
                        logging={false} />
                    <BmlLineChart
                        chartTitle="Chest Size Timeline"
                        id="id-chest"
                        marginTop={25}
                        uomDisplay={sizeUomDisplayUppercase}
                        chartId={chartUtils.CHART_ID_CHEST_SIZE}
                        chartConfig={allChartConfig[chartUtils.CHART_ID_CHEST_SIZE]}
                        dataSourceFn={chartBodyData => chartBodyData.chestSizeDataSource}
                        headingPanelColor="#E4B490"
                        calculateAverages={true}
                        calculateDistributions={false}
                        {...bodyChartCommonProps}
                        logging={false} />
                    <BmlLineChart
                        chartTitle="Calf Size Timeline"
                        id="id-calfs"
                        marginTop={25}
                        uomDisplay={sizeUomDisplayUppercase}
                        chartId={chartUtils.CHART_ID_CALF_SIZE}
                        chartConfig={allChartConfig[chartUtils.CHART_ID_CALF_SIZE]}
                        dataSourceFn={chartBodyData => chartBodyData.calfSizeDataSource}
                        headingPanelColor="#CFBB8B"
                        calculateAverages={true}
                        calculateDistributions={false}
                        {...bodyChartCommonProps}
                        logging={false} />
                    <BmlLineChart
                        chartTitle="Thigh Size Timeline"
                        id="id-thighs"
                        marginTop={25}
                        uomDisplay={sizeUomDisplayUppercase}
                        chartId={chartUtils.CHART_ID_THIGH_SIZE}
                        chartConfig={allChartConfig[chartUtils.CHART_ID_THIGH_SIZE]}
                        dataSourceFn={chartBodyData => chartBodyData.thighSizeDataSource}
                        headingPanelColor="#96E4B7"
                        calculateAverages={true}
                        calculateDistributions={false}
                        {...bodyChartCommonProps}
                        logging={false} />
                    <BmlLineChart
                        chartTitle="Forearm Size Timeline"
                        id="id-forearms"
                        marginTop={25}
                        uomDisplay={sizeUomDisplayUppercase}
                        chartId={chartUtils.CHART_ID_FOREARM_SIZE}
                        chartConfig={allChartConfig[chartUtils.CHART_ID_FOREARM_SIZE]}
                        dataSourceFn={chartBodyData => chartBodyData.forearmSizeDataSource}
                        headingPanelColor="#F79188"
                        calculateAverages={true}
                        calculateDistributions={false}
                        {...bodyChartCommonProps}
                        logging={false} />
                    <BmlLineChart
                        chartTitle="Waist Size Timeline"
                        id="id-waist"
                        marginTop={25}
                        uomDisplay={sizeUomDisplayUppercase}
                        chartId={chartUtils.CHART_ID_WAIST_SIZE}
                        chartConfig={allChartConfig[chartUtils.CHART_ID_WAIST_SIZE]}
                        dataSourceFn={chartBodyData => chartBodyData.waistSizeDataSource}
                        headingPanelColor="#C5A0D6"
                        calculateAverages={true}
                        calculateDistributions={false}
                        {...bodyChartCommonProps}
                        logging={false} />
                    <BmlLineChart
                        chartTitle="Neck Size Timeline"
                        id="id-neck"
                        marginTop={25}
                        uomDisplay={sizeUomDisplayUppercase}
                        chartId={chartUtils.CHART_ID_NECK_SIZE}
                        chartConfig={allChartConfig[chartUtils.CHART_ID_NECK_SIZE]}
                        dataSourceFn={chartBodyData => chartBodyData.neckSizeDataSource}
                        headingPanelColor="#949DA7"
                        calculateAverages={true}
                        calculateDistributions={false}
                        {...bodyChartCommonProps}
                        logging={false} />
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const allChartConfig = state.allChartConfig
    const settings = utils.userSettings(state)
    const chartCache = state.chartCache
    const bmls = state.serverSnapshot._embedded["body-journal-logs"]
    const movements = state.serverSnapshot._embedded["movements"]
    const movementsArray = _.values(movements)
    const movementVariants = state.serverSnapshot._embedded["movement-variants"]
    return {
        api: state.api,
        allChartConfig: allChartConfig,
        settings: settings,
        chartCache: chartCache,
        bmls: bmls,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        movementsArray: movementsArray,
        movementVariants: movementVariants
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: url => dispatch(push(url)),
        navigateToBodyChartConfigFn: chartUtils.makeNavigateToChartConfigFn("bodyjournallog", "body", "Body Measurement", "body log", dispatch, setChartDateRange, push),
        disableChartAnimationFn: chartId => dispatch(disableChartAnimation(chartId)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck()),
        onMovementSuggestionSelectedFn: makeOnMovementSuggestionSelectedFn(dispatch),
        addToChartCacheFn: (cacheKey, strengthData) => dispatch(addToChartCache(cacheKey, strengthData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartsBodyPage)
