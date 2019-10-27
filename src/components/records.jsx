import React from "react"
import { push } from 'react-router-redux'
import { ListGroup, ListGroupItem } from "react-bootstrap"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import pluralize from "pluralize"

export default class Records extends React.Component {

    render() {
        const {
            onItemSelect,
            setCount,
            cardioLogsCount,
            sorenessLogsCount,
            bodyJournalLogsCount
        } = this.props
        return (
            <div>
                <ListGroup>
                    <ListGroupItem header="Sets" onClick={() => onItemSelect(urls.SETS_URI)}>
                        <em>{utils.numberWithCommas(setCount)} set {pluralize("record", setCount)}.</em>
                    </ListGroupItem>
                    <ListGroupItem header="Body Measurement Logs" onClick={() => onItemSelect(urls.BODY_JOURNAL_LOGS_URI)}>
                        <em>{utils.numberWithCommas(bodyJournalLogsCount)} body measurement {pluralize("log", bodyJournalLogsCount)}.</em>
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
}
