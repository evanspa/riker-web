import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import SetForm from "../components/set-form.jsx"
import { toastr } from 'react-redux-toastr'
import { attemptSaveSet,
         bannerRemindLater,
         clearErrors,
         maintenanceAck,
         attemptDownloadChangelog,
         changelogCountsViewed } from "../actions/action-creators"
import { toSetFormModel } from "../utils"
import EntityEditDetailPage from "../components/entity-edit-detail-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import { destroy } from "redux-form"
import { SET_FORM } from "../forms"
import * as utils from "../utils"
import * as urls from "../urls"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import { conflictDetectedUserAck } from "../actions/api-utils"
import ReactGA from "react-ga"

class SetEditPage extends React.Component {
    render() {
        momentLocalizer(moment)
        const {
            set,
            cancelSetEdit,
            handleSubmit,
            api,
            becameUnauthenticated,
            userAcknowledgedNotFound,
            setIdNotFound,
            movements,
            movementVariants,
            allMuscles,
            allMuscleGroups,
            destroyMovementForm,
            doGoBack,
            changelogCounts,
            dismissChangelogReport,
            isConflict,
            conflictAckFn,
            downloadChangelogFn,
            clearErrors
        } = this.props
        const { responseStatus, requestInProgress, rErrorMask } = api
        const entityFormFn = () => <SetForm
                                       clearErrors={clearErrors}
                                       movements={movements}
                                       movementVariants={movementVariants}
                                       allMuscleGroups={allMuscleGroups}
                                       allMuscles={allMuscles}
                                       cancelSetEdit={cancelSetEdit}
                                       onSubmit={() => handleSubmit(set.payload["set/id"])}
                                       responseStatus={responseStatus}
                                       requestInProgress={requestInProgress}
                                       accountStatuses={this.props.accountStatuses}
                                       set={set}
                                       initialValues={toSetFormModel(set.payload)}
                                       editMode={true}
                                       navigateTo={this.props.navigateTo}
                                       rErrorMask={rErrorMask} />
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To save your set, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(set.payload["set/id"])} />
        return (<EntityEditDetailPage
                    doGoBack={doGoBack}
                    entity={set}
                    entityGoneModalTitle="Deleted on other device"
                    entityGoneModalContent="It appears this set record was deleted from another device."
                    userAcknowledgedNotFound={userAcknowledgedNotFound}
                    editMode={true}
                    maintenanceAckFn={this.props.maintenanceAckFn}
                    entityType="set"
                    entitiesUri={urls.SETS_URI}
                    reauthenticateModal={reauthenticateModal}
                    breadcrumbParentUri={urls.SETS_URI}
                    breadcrumbParentLabel="Sets"
                    breadcrumbActiveLabelFn={set => {
                            const setPayload = set.payload
                            return setPayload["set/num-reps"] + (setPayload["set/num-reps"] == 1 ? " rep" : " reps") + " of " + movements[setPayload["set/movement-id"]].payload["movement/canonical-name"]
                        }}
                    entityFormFn={entityFormFn}
                    changelogCounts={changelogCounts}
                    dismissChangelogReport={dismissChangelogReport}
                    isConflict={isConflict}
                    conflictAckFn={conflictAckFn}
                    conflictMessagePrefix="This set"
                    conflictMessageSuffix="this set"
                    downloadChangelogFn={downloadChangelogFn}
                    navigateTo={this.props.navigateTo}
                    accountStatuses={this.props.accountStatuses}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    remindMeLaterFn={this.props.remindMeLaterFn} />)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        api: state.api,
        set: state.serverSnapshot._embedded.sets[ownProps.params.setId],
        movements: state.serverSnapshot._embedded.movements,
        movementVariants: state.serverSnapshot._embedded["movement-variants"],
        becameUnauthenticated: state.becameUnauthenticated,
        allMuscles: state.serverSnapshot._embedded["muscles"],
        allMuscleGroups: state.serverSnapshot._embedded["muscle-groups"],
        changelogCounts: state.changelogCounts,
        isConflict: state.api.isConflict,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelSetEdit: setId => {
            toastr.clean()
            dispatch(destroy(SET_FORM))
            dispatch(push(urls.setDetailUrl(setId)))
        },
        handleSubmit: setId => {
            toastr.clean()
            dispatch(attemptSaveSet(setId));
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: () => {
            // dispatching 'goBack' is not needed because the render() function
            // of EntityEditDetailPage will call doGoBack if the entity passed
            // to it is null
        },
        doGoBack: () => dispatch(goBack()),
        dismissChangelogReport: () => { dispatch(changelogCountsViewed()) },
        conflictAckFn: () => dispatch(conflictDetectedUserAck()),
        downloadChangelogFn: () => {
            toastr.clean()
            utils.trackEventSynchronizedAccount("from set edit page")
            dispatch(attemptDownloadChangelog(null))
        },
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetEditPage)
