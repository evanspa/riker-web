import React from "react"
import PropTypes from "prop-types"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import EntitiesPage from "../components/entities-page.jsx"
import { Image } from 'react-bootstrap'
import _ from "lodash"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import { bannerRemindLater, maintenanceAck } from "../actions/action-creators"
import { destroy } from "redux-form"
import { BODY_JOURNAL_LOG_FORM } from "../forms"
import * as urls from "../urls"
import * as utils from "../utils"

class BodyJournalLogsPage extends React.Component {
    render() {
        momentLocalizer(moment)
        const {
            movements,
            originationDevices,
            bodyJournalLogs,
            bodyJournalLogRowOnClick,
            handleAddBodyJournalLog
        } = this.props
        const sizeColumnMaker = (namePrefix, keyPostfix) => ({ label: namePrefix + " Size",
                                                               valueKey: "bodyjournallog/" + keyPostfix,
                                                               formatter: (size, payload) => size != null ? size + " " + utils.toLengthUnitsDisplay(payload["bodyjournallog/size-uom"]) : "",
                                                               cellWidth: 200})
        const fields = [
            { label: "Logged",
              valueKey: "bodyjournallog/logged-at",
              formatter: (loggedAt, payload) => { return moment(loggedAt).calendar(null, { sameDay: "[Today]",
                                                                                           lastDay: "[Yesterday]",
                                                                                           lastWeek: "[Last] dddd",
                                                                                           sameElse: utils.DATE_DISPLAY_FORMAT }) },
              cellWidth: 200
            },
            { label: "Body Weight",
              valueKey: "bodyjournallog/body-weight",
              formatter: (weight, payload) => weight != null ? weight + " " + utils.toWeightUnitsDisplay(payload["bodyjournallog/body-weight-uom"]) : "",
              cellWidth: 200
            },
            sizeColumnMaker("Arm", "arm-size"),
            sizeColumnMaker("Chest", "chest-size"),
            sizeColumnMaker("Calf", "calf-size"),
            sizeColumnMaker("Thigh", "thigh-size"),
            sizeColumnMaker("Forearm", "forearm-size"),
            sizeColumnMaker("Waist", "waist-size"),
            sizeColumnMaker("Neck", "neck-size"),
            { label: "Created from",
              valueKey: "bodyjournallog/origination-device-id",
              formatter: (originationDeviceId, payload) => (<Image height={20} width={20} src={"images/" + originationDevices[originationDeviceId].payload['originationdevice/icon-image-name'] + ".png"} />),
              cellWidth: 150,
              textAlign: "center"
            },
            { label: "Imported",
              valueKey: "bodyjournallog/imported-at",
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
                containerUrl={urls.BODY_JOURNAL_LOGS_URI}
                entityType="body measurement log"
                entityIdKey="bodyjournallog/id"
                entitiesImportUrl={urls.BODY_JOURNAL_LOGS_IMPORT_SYNCHRONIZE_URI}
                entities={bodyJournalLogs}
                maintenanceAckFn={this.props.maintenanceAckFn}
                fields={fields}
                csvFields={utils.bodyJournalLogCsvFields(originationDevices)}
                csvExportFileNamePart="body-log"
                entityRowOnClick={bodyJournalLogRowOnClick}
                entitiesSortFn={(o1, o2) => {
                        let compareResult = o2.payload["bodyjournallog/logged-at"] - o1.payload["bodyjournallog/logged-at"]
                        if (compareResult == 0) {
                            return o2.payload["bodyjournallog/updated-at"] - o1.payload["bodyjournallog/updated-at"]
                        }
                        return compareResult
                    }}
                handleAddEntity={handleAddBodyJournalLog}
                breadcrumbActiveLabel="Body Measurement Logs"
                entityLinkToFn={bodyJournalLogId => urls.bodyJournalLogDetailUrl(bodyJournalLogId)}
                navigateTo={this.props.navigateTo}
                accountStatuses={this.props.accountStatuses}
                verifiedAt={this.props.verifiedAt}
                redisplayBannerAfter={this.props.redisplayBannerAfter}
                remindMeLaterFn={this.props.remindMeLaterFn} />
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
BodyJournalLogsPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        verifiedAt: state.serverSnapshot["user/verified-at"],
        originationDevices: state.serverSnapshot._embedded["origination-devices"],
        movements: state.serverSnapshot._embedded.movements,
        bodyJournalLogs: state.serverSnapshot._embedded["body-journal-logs"],
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bodyJournalLogRowOnClick: (bodyJournalLogId) => {
            dispatch(destroy(BODY_JOURNAL_LOG_FORM))
        },
        handleAddBodyJournalLog: () => {
            dispatch(destroy(BODY_JOURNAL_LOG_FORM))
            dispatch(push(urls.ADD_BODY_JOURNAL_LOG_URI))
        },
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyJournalLogsPage)
