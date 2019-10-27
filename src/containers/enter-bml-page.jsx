import React from "react"
import PropTypes from "prop-types"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router"
import { push } from 'react-router-redux'
import { Button, Breadcrumb, Col } from "react-bootstrap"
import { connect } from 'react-redux'
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import EnterBmlForm from "../components/enter-bml-form.jsx"
import Records from "../components/records.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import * as strs from "../strings"
import { destroy } from "redux-form"
import * as forms from "../forms"
import { toastr } from 'react-redux-toastr'
import numeral from "numeral"
import AddRecordButton from "../components/add-record-button.jsx"
import ButtonSelection from "../components/button-selection.jsx"
import * as gvs from "../grid-vals"
import { clearErrors,
         bmlTypesMaker,
         saveNewBmlAttemptMaker,
         bannerRemindLater,
         maintenanceAck } from "../actions/action-creators"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import NavbarBanner from "../components/navbar-banner.jsx"
import ReactGA from "react-ga"

class EnterBmlPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            hideNavBar: true
        }
    }

    render() {
        const {
            navigateTo,
            selectedBmlType,
            currentWeight,
            responseStatus,
            requestInProgress,
            handleSubmit,
            becameUnauthenticated,
            changeUnitsClickedFn,
            hideUnitsClickedFn,
            userSettings,
            setOnClick,
            clearErrors,
            uomDisplay
        } = this.props
        momentLocalizer(moment)
        let weightVal = null
        return (
            <div>
                <RikerHelmet title="Enter body log" />
                <div>
                    <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                    <NavbarBanner
                        navigateTo={navigateTo}
                        remindMeLaterFn={this.props.remindMeLaterFn}
                        redisplayBannerAfter={this.props.redisplayBannerAfter}
                        accountStatuses={this.props.accountStatuses}
                        maintenanceAckFn={this.props.maintenanceAckFn} />
                </div>
                <ReauthenticateModal
                    showModal={becameUnauthenticated}
                    message="To save your set, we need you to re-authenticate."
                    operationOnLightLoginSuccess={() => handleSubmit()} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#" onClick={() => navigateTo(urls.HOME_URI)}>body log</Breadcrumb.Item>
                        <LinkContainer to={{pathname: urls.SELECT_BML_TYPE_URI}}>
                            <Breadcrumb.Item>{selectedBmlType.payload["name"]}</Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item active>Input Value</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>{selectedBmlType.payload["name"] + " - " + uomDisplay}</h4>
                    <EnterBmlForm
                        navigateTo={navigateTo}
                        onSubmit={() => handleSubmit(selectedBmlType)}
                        clearErrors={clearErrors}
                        selectedBmlType={selectedBmlType}
                        initialValues={{originationDeviceId: utils.ORIG_DEVICE_ID_WEB,
                                        uom: selectedBmlType.payload["uomDisplay"],
                                        displayUnitsPicker: false,
                                        loggedAt: moment().format(utils.DATE_DISPLAY_FORMAT)}}
                        userSettings={userSettings}
                        changeUnitsClickedFn={changeUnitsClickedFn}
                        hideUnitsClickedFn={hideUnitsClickedFn}
                        requestInProgress={requestInProgress}
                        responseStatus={responseStatus} />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
EnterBmlPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const userSettings = utils.userSettings(state)
    const bmlTypes = bmlTypesMaker(userSettings)
    const selectedBmlType = bmlTypes[state.selectionContext.selectedBmlTypeId]
    let uomDisplay;
    if (state.form.newBml) {
        uomDisplay = state.form.newBml.uom.value
    } else {
        uomDisplay = selectedBmlType.payload["uomDisplay"]
    }
    return {
        selectedBmlType: selectedBmlType,
        responseStatus: state.api.responseStatus,
        requestInProgress: state.api.requestInProgress,
        becameUnauthenticated: state.becameUnauthenticated,
        userSettings: userSettings,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value,
        uomDisplay: uomDisplay
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: url => dispatch(push(url)),
        handleSubmit: selectedBmlType => {
            toastr.clean()
            ReactGA.event({
                category: utils.GA_EVENT_CATEGORY_USER,
                action: "save new " + selectedBmlType.payload["gaActionPostfix"]
            })
            dispatch(saveNewBmlAttemptMaker(selectedBmlType.payload["requestPayloadFn"])(urls.HOME_URI, true, true))
        },
        clearErrors: () => dispatch(clearErrors()),
        changeUnitsClickedFn: () => dispatch({type: "redux-form/CHANGE", field: "displayUnitsPicker", value: true, touch: false, form: forms.NEW_BML_FORM}),
        hideUnitsClickedFn: () => dispatch({type: "redux-form/CHANGE", field: "displayUnitsPicker", value: false, touch: false, form: forms.NEW_BML_FORM}),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterBmlPage)
