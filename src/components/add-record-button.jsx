import React from "react"
import { DropdownButton, MenuItem } from "react-bootstrap"

export default class AddRecordButton extends React.Component {
    render() {
        const {
            handleAddVehicle,
            handleAddFuelstation,
            handleAddGasLog,
            handleAddOdometerLog
        } = this.props
        return (
             <DropdownButton title="Add Record" bsSize="large">
            </DropdownButton>
        )
    }
}
