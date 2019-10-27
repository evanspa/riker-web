import React from "react"
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import SetForm from "../components/set-form.jsx"
import { markSetForEdit,
         attemptDeleteSet,
         maintenanceAck,
         bannerRemindLater,
         clearErrors } from "../actions/action-creators"
import { toSetFormModel } from "../utils"
import { toastr } from 'react-redux-toastr'
import EntityEditDetailPage from "../components/entity-edit-detail-page.jsx"
import ReauthenticateModal from "./reauthenticate-modal.jsx"
import _ from "lodash"
import * as utils from "../utils"
import * as urls from "../urls"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import { attemptDownloadChangelog,
         changelogCountsViewed } from "../actions/action-creators"
import { conflictDetectedUserAck } from "../actions/api-utils"
import ReactGA from "react-ga"

class SetDetailPage extends React.Component {
    render() {
        momentLocalizer(moment)
        const {
            set,
            markSetForEdit,
            clearErrors,
            deleteSet,
            becameUnauthenticated,
            userAcknowledgedNotFound,
            deleteConfirmMessage,
            movements,
            movementVariants,
            allMuscles,
            allMuscleGroups,
            doGoBack,
            changelogCounts,
            dismissChangelogReport,
            isConflict,
            conflictAckFn,
            downloadChangelogFn,
            requestInProgress,
            responseStatus,
            originationDevices
        } = this.props
        const entityFormFn = () => <SetForm
                                       movements={movements}
                                       movementVariants={movementVariants}
                                       allMuscleGroups={allMuscleGroups}
                                       allMuscles={allMuscles}
                                       markSetForEdit={markSetForEdit}
                                       deleteSet={deleteSet}
                                       set={set}
                                       requestInProgress={requestInProgress}
                                       navigateTo={this.props.navigateTo}
                                       accountStatuses={this.props.accountStatuses}
                                       originationDevices={originationDevices}
                                       clearErrors={clearErrors}
                                       responseStatus={responseStatus}
                                       initialValues={toSetFormModel(set.payload)}
                                       deleteConfirmMessage={deleteConfirmMessage}
                                       editMode={false} />
        const reauthenticateModal = <ReauthenticateModal
                                        showModal={becameUnauthenticated}
                                        message="To delete your set, we need you to re-authenticate."
                                        operationOnLightLoginSuccess={() => handleSubmit(set.payload["set/id"])} />
        return (<EntityEditDetailPage
                    doGoBack={doGoBack}
                    entity={set}
                    entityGoneModalTitle="Deleted on other device"
                    entityGoneModalContent="It appears this set record was already deleted from another device."
                    userAcknowledgedNotFound={userAcknowledgedNotFound}
                    editMode={false}
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
        originationDevices: state.serverSnapshot._embedded["origination-devices"],
        set: state.serverSnapshot._embedded.sets[ownProps.params.setId],
        becameUnauthenticated: state.becameUnauthenticated,
        movements: state.serverSnapshot._embedded.movements,
        movementVariants: state.serverSnapshot._embedded["movement-variants"],
        allMuscles: state.serverSnapshot._embedded["muscles"],
        allMuscleGroups: state.serverSnapshot._embedded["muscle-groups"],
        deleteConfirmMessage: "Are you sure you want to delete this set?",
        changelogCounts: state.changelogCounts,
        isConflict: state.api.isConflict,
        requestInProgress: state.api.requestInProgress,
        responseStatus: state.api.responseStatus,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markSetForEdit: (setId) => {
            toastr.clean()
            dispatch(markSetForEdit(setId))
            dispatch(push(urls.setEditUrl(setId)))
        },
        deleteSet: (setId) => {
            ReactGA.event({
                category: utils.GA_EVENT_CATEGORY_USER,
                action: "delete set"
            })
            dispatch(attemptDeleteSet(setId))
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
            utils.trackEventSynchronizedAccount("from set detail page")
            dispatch(attemptDownloadChangelog(null))
        },
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetDetailPage)
