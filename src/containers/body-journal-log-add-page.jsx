import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import BodyJournalLogForm from "../components/body-journal-log-form.jsx"
import { cancelRecordEdit,
         bannerRemindLater,
         maintenanceAck,
         attemptSaveNewBodyJournalLog,
         clearErrors } from "../actions/action-creators"
import EntityAddPage from "../components/entity-add-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import { destroy } from "redux-form"
import { BODY_JOURNAL_LOG_FORM } from "../forms"
import { toastr } from 'react-redux-toastr'
import { browserHistory, hashHistory } from 'react-router'
import * as utils from "../utils"
import * as urls from "../urls"
import moment from "moment"
import _ from "lodash"
import momentLocalizer from "react-widgets-moment"

class BodyJournalLogAddPage extends React.Component {
    render() {
        momentLocalizer(moment)
        const {
            displayBodyWeightUnits,
            hideBodyWeightUnits,
            displaySizeUnits,
            hideSizeUnits,
            userSettings,
            cancelBodyJournalLogAdd,
            handleSubmit,
            becameUnauthenticated,
            api,
            clearErrors,
            backLink
        } = this.props
        const { responseStatus, requestInProgress, rErrorMask } = api
        const bodyJournalLogForm = <BodyJournalLogForm
                                       displayBodyWeightUnits={displayBodyWeightUnits}
                                       hideBodyWeightUnits={hideBodyWeightUnits}
                                       displaySizeUnits={displaySizeUnits}
                                       hideSizeUnits={hideSizeUnits}
                                       initialValues={{originationDeviceId: utils.ORIG_DEVICE_ID_WEB,
                                                       loggedAt: moment().format(utils.DATE_DISPLAY_FORMAT),
                                                       bodyWeightUom: utils.toWeightUnitsDisplay(userSettings.payload["usersettings/weight-uom"]),
                                                       sizeUom: utils.toLengthUnitsDisplay(userSettings.payload["usersettings/size-uom"])}}
                                       cancelBodyJournalLogEdit={cancelBodyJournalLogAdd}
                                       onSubmit={() => handleSubmit()}
                                       responseStatus={responseStatus}
                                       requestInProgress={requestInProgress}
                                       accountStatuses={this.props.accountStatuses}
                                       editMode={true}
                                       navigateTo={this.props.navigateTo}
                                       clearErrors={clearErrors}
                                       rErrorMask={rErrorMask} />
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your body measurement, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit()} />
        return (
            <EntityAddPage
                entityType="body measurement log"
                backLink={backLink}
                maintenanceAckFn={this.props.maintenanceAckFn}
                reauthenticateModal={reauthenticateModal}
                breadcrumbParentUri={urls.BODY_JOURNAL_LOGS_URI}
                breadcrumbParentLabel="Body Measurement Logs"
                breadcrumbActiveLabelFn={NOT_USED => "Add Log"}
                entityForm={bodyJournalLogForm}
                navigateTo={this.props.navigateTo}
                accountStatuses={this.props.accountStatuses}
                redisplayBannerAfter={this.props.redisplayBannerAfter}
                remindMeLaterFn={this.props.remindMeLaterFn} />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        becameUnauthenticated: state.becameUnauthenticated,
        userSettings: utils.userSettings(state),
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { query } = ownProps.location
    let nextPathname = null
    if (query != null) {
        nextPathname = query.nextPathname
    }
    return {
        displayBodyWeightUnits: () => {
            dispatch({type: "redux-form/CHANGE", field: "displayWeightUnitsPicker", value: true, touch: false, form: BODY_JOURNAL_LOG_FORM})
        },
        hideBodyWeightUnits: () => {
            dispatch({type: "redux-form/CHANGE", field: "displayWeightUnitsPicker", value: false, touch: false, form: BODY_JOURNAL_LOG_FORM})
        },
        displaySizeUnits: () => {
            dispatch({type: "redux-form/CHANGE", field: "displaySizeUnitsPicker", value: true, touch: false, form: BODY_JOURNAL_LOG_FORM})
            window.scrollTo(0, document.body.scrollHeight) // so that the units picker is visible
        },
        hideSizeUnits: () => {
            dispatch({type: "redux-form/CHANGE", field: "displaySizeUnitsPicker", value: false, touch: false, form: BODY_JOURNAL_LOG_FORM})
        },
        cancelBodyJournalLogAdd: () => {
            toastr.clean()
            dispatch(destroy(BODY_JOURNAL_LOG_FORM))
            dispatch(cancelRecordEdit())
            if (nextPathname != null) {
                dispatch(push(nextPathname))
            } else {
                if (!_.isEmpty(query[utils.FROM_SERVER_QUERY_PARAM])) {
                    dispatch(push(urls.BODY_JOURNAL_LOGS_URI))
                } else {
                    dispatch(goBack())
                }
            }
        },
        handleSubmit: () => {
            toastr.clean()
            dispatch(attemptSaveNewBodyJournalLog(nextPathname, true, true))
        },
        clearErrors: () => dispatch(clearErrors()),
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyJournalLogAddPage)
