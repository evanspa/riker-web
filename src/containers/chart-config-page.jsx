import React from "react"
import PropTypes from "prop-types"
import { push, goBack } from "react-router-redux"
import { Col } from "react-bootstrap"
import { Link } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { connect } from "react-redux"
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import { destroy } from "redux-form"
import { toastr } from 'react-redux-toastr'
import _ from "lodash"
import * as forms from "../forms"
import * as strs from "../strings"
import * as urls from "../urls"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import { maintenanceAck,
         clearErrors,
         clearChartConfig,
         disableChartAnimation,
         submitChartConfig,
         bannerRemindLater } from "../actions/action-creators"
import * as apiUtils from "../actions/api-utils"
import Tappable from "react-tappable"
import NavbarBanner from "../components/navbar-banner.jsx"
import ChartConfigForm from "../components/chart-config-form.jsx"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import * as chartUtils from "../chart-utils"

class ChartConfigPage extends React.Component {

    render() {
        const {
            chartConfig,
            isGlobalConfig,
            firstLoggedAt,
            mostRecentLoggedAt,
            handleSubmit,
            doGoBack,
            pageHeading,
            clearConfig,
            entityType,
            chartCategory,
            entityName,
            clearErrors
        } = this.props
        momentLocalizer(moment)
        const initialFormValues = {}
        if (chartConfig.startDate) {
            initialFormValues.rangeStartDate = utils.formatDate(moment, chartConfig.startDate)
        } else {
            initialFormValues.rangeStartDate = utils.formatDate(moment, firstLoggedAt)
        }
        if (chartConfig.endDate) {
            initialFormValues.rangeEndDate = utils.formatDate(moment, chartConfig.endDate)
        } else {
            initialFormValues.rangeEndDate = utils.formatDate(moment, mostRecentLoggedAt)
        }
        initialFormValues.boundedEndDate = chartConfig.boundedEndDate ? chartConfig.boundedEndDate : false
        let aggregateBy = chartConfig.aggregateBy
        const daysFrom = moment(mostRecentLoggedAt).diff(moment(firstLoggedAt), 'days')
        if (!aggregateBy) {
            aggregateBy = chartUtils.defaultAggregateBy(daysFrom)
        }
        initialFormValues.aggregateBy = aggregateBy
        initialFormValues.suppressPieSliceLabels = chartConfig.suppressPieSliceLabels
        return (
            <div>
                <RikerHelmet title="Chart Config" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h3 className="page-heading">{pageHeading}</h3>
                    <div style={{fontSize: "90%", fontStyle: "italic"}}>
                        {"Your first " + entityName} was logged on: <strong>{utils.formatDate(moment, firstLoggedAt)}</strong>.
                    </div>
                    <div style={{marginTop: 5, fontSize: "90%", fontStyle: "italic"}}>
                        {"Your most recent " + entityName} was logged on: <strong>{utils.formatDate(moment, mostRecentLoggedAt)}</strong>.
                    </div>
                    <ChartConfigForm
                        chartConfig={chartConfig}
                        isGlobalConfig={isGlobalConfig}
                        clearErrors={clearErrors}
                        onSubmit={() => handleSubmit(chartConfig)}
                        doGoBack={doGoBack}
                        clearConfig={chartConfig => clearConfig(chartConfig, daysFrom)}
                        entityName={entityName}
                        initialValues={initialFormValues} />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
ChartConfigPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const chartId = ownProps.location.query.chartId
    const entityType = ownProps.location.query.entityType
    const entityName = ownProps.location.query.entityName
    const chartCategory = ownProps.location.query.chartCategory
    const isGlobalConfig = ownProps.location.query.isGlobalConfig === "true"
    const chartConfig = state.allChartConfig[chartId]
    let pageHeading
    if (isGlobalConfig) {
        pageHeading = chartCategory + " Charts Config"
    } else {
        pageHeading = chartConfig.name
    }
    return {
        isGlobalConfig: isGlobalConfig,
        entityType: entityType,
        chartCategory: chartCategory,
        entityName: entityName,
        firstLoggedAt: parseInt(ownProps.location.query.firstLoggedAt),
        mostRecentLoggedAt: parseInt(ownProps.location.query.mostRecentLoggedAt),
        chartConfig: chartConfig,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        pageHeading: pageHeading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const isGlobalConfig = ownProps.location.query.isGlobalConfig === "true"
    return {
        handleSubmit: chartConfig => {
            toastr.clean()
            dispatch(submitChartConfig(chartConfig.id, isGlobalConfig))
        },
        clearConfig: (chartConfig, daysFrom) => {
            const defaultAggregateBy = chartUtils.defaultAggregateBy(daysFrom)
            dispatch(clearChartConfig(chartConfig.id, isGlobalConfig, defaultAggregateBy))
            toastr.clean()
            toastr.info("Chart config cleared.", apiUtils.toastConfigSuccess())
            dispatch(goBack())
        },
        doGoBack: () => dispatch(goBack()),
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck()),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartConfigPage)
