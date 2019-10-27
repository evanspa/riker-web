import React from "react"
import moment from "moment"
import Tappable from "react-tappable"
import * as strs from "../strings"
import * as utils from "../utils"

export default class NewMovementsAddedModal extends React.Component {
    render() {
        const {
            newMovementsAddedAt,
            newMovementsAddedAtAckAt,
            downloadChangelog,
            requestInProgress
        } = this.props
        let newMovementsAddedAtMoment = null
        if (newMovementsAddedAt != null) {
            newMovementsAddedAtMoment = moment(newMovementsAddedAt)
        }
        let newMovementsAddedAtAckAtMoment = null
        if (newMovementsAddedAtAckAt != null) {
            newMovementsAddedAtAckAtMoment = moment(newMovementsAddedAtAckAt)
        }
        if (newMovementsAddedAtMoment != null &&
            (newMovementsAddedAtAckAtMoment == null ||
             newMovementsAddedAtAckAtMoment.isBefore(newMovementsAddedAtMoment))) {
            return (
                <div className="new-movements-available">
                    <span style={{paddingTop: 3, marginRight: 5}}>New movements available.</span>
                    <Tappable className="btn btn-xs btn-default"
                              component="div"
                              onTap={() => {
                                      if (!requestInProgress) {
                                          utils.trackEventSynchronizedAccount("from new movements added button")
                                          downloadChangelog()
                                      }
                                  }}
                              disabled={requestInProgress}>{strs.refresh_userdata_lbl}</Tappable>
                </div>
            )
        }
        return null
    }
}
