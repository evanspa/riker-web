import React from "react"
import { FormGroup, ControlLabel } from "react-bootstrap"
import moment from "moment"
import * as utils from "../utils"

export default class ImportedAt extends React.Component {
    render() {
        const { importedAt } = this.props
        return (
            <div>
                <FormGroup>
                    <div>
                        <ControlLabel type="text" bsSize="lg">Imported</ControlLabel>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div>This record was imported from a CSV file on: <strong>{moment(importedAt).format(utils.DATETIME_DISPLAY_FORMAT)}</strong></div>
                    </div>
                </FormGroup>
            </div>
        )
    }
}
