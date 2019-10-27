import React from "react"
import PropTypes from "prop-types"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'
import EntitiesPage from "../components/entities-page.jsx"
import _ from "lodash"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import { bannerRemindLater,
         maintenanceAck } from "../actions/action-creators"
import { destroy } from "redux-form"
import { SET_FORM } from "../forms"
import * as urls from "../urls"
import * as utils from "../utils"

class SetsPage extends React.Component {
    render() {
        momentLocalizer(moment)
        const {
            movements,
            movementVariants,
            sets,
            originationDevices,
            setRowOnClick,
            handleAddSet
        } = this.props
        const fields = [
            { label: "Logged",
              valueKey: "set/logged-at",
              formatter: (loggedAt, payload) => { // TODO, the formatter needs to receive the whole set object..because, I need to alter this behavior based on if "ignoreTime" is true.
                  const loggedAtMoment = moment(loggedAt)
                  return loggedAtMoment.fromNow()
              },
              cellWidth: 200
            },
            { label: "Movement",
              valueKey: "set/movement-id",
              formatter: (movementId, payload) => movements[movementId].payload['movement/canonical-name'],
              cellWidth: 250
            },
            { label: "Variant",
              valueKey: "set/movement-variant-id",
              formatter: (movementVariantId, payload) => movementVariantId != null ? movementVariants[movementVariantId].payload['movementvariant/name'] : "",
              cellWidth: 200
            },
            { label: "Reps", valueKey: "set/num-reps", cellWidth: 75 },
            { label: "Weight", valueKey: "set/weight", cellWidth: 100 },
            { label: "Created from",
              valueKey: "set/origination-device-id",
              formatter: (originationDeviceId, payload) => (<Image height={20} width={20} src={"/images/" + originationDevices[originationDeviceId].payload['originationdevice/icon-image-name'] + ".png"} />),
              cellWidth: 150,
              textAlign: "center"
            },
            { label: "Imported",
              valueKey: "set/imported-at",
              formatter: (importedAt, payload) => {
                  if (importedAt != null) {
                      const importedAtMoment = moment(importedAt)
                      return (<span>{importedAtMoment.format(utils.DATE_DISPLAY_FORMAT)} <Image style={{marginLeft: 5}} height={15} width={10} src={"/images/imported.png"} /></span>)
                  }
                  return ""
              },
              cellWidth: 125
            }
        ]
        return (
            <EntitiesPage
                containerUrl={urls.SETS_URI}
                entityType="set"
                entityIdKey="set/id"
                entitiesImportUrl={urls.SETS_IMPORT_SYNCHRONIZE_URI}
                entities={sets}
                fields={fields}
                csvFields={utils.setCsvFields(movements, movementVariants, originationDevices)}
                csvExportFileNamePart="set"
                maintenanceAckFn={this.props.maintenanceAckFn}
                entityRowOnClick={setRowOnClick}
                entitiesSortFn={(o1, o2) => {
                        let compareResult = o2.payload["set/logged-at"] - o1.payload["set/logged-at"]
                        if (compareResult == 0) {
                            return o2.payload["set/updated-at"] - o1.payload["set/updated-at"]
                        }
                        return compareResult
                    }}
                handleAddEntity={handleAddSet}
                breadcrumbActiveLabel="Sets"
                entityLinkToFn={setId => urls.setDetailUrl(setId)}
                navigateTo={this.props.navigateTo}
                accountStatuses={this.props.accountStatuses}
                verifiedAt={this.props.verifiedAt}
                redisplayBannerAfter={this.props.redisplayBannerAfter}
                remindMeLaterFn={this.props.remindMeLaterFn} />
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
SetsPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        verifiedAt: state.serverSnapshot["user/verified-at"],
        originationDevices: state.serverSnapshot._embedded["origination-devices"],
        movements: state.serverSnapshot._embedded.movements,
        movementVariants: state.serverSnapshot._embedded["movement-variants"],
        sets: state.serverSnapshot._embedded.sets,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRowOnClick: setId => {
            dispatch(destroy(SET_FORM))
        },
        handleAddSet: () => dispatch(push(urls.SELECT_BODY_SEGMENT_URI)),
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetsPage)
