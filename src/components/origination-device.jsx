import React from "react"
import { Image, FormGroup, ControlLabel } from "react-bootstrap"

export default class OriginationDevice extends React.Component {
    render() {
        const {
            originationDevices,
            originationDeviceId
        } = this.props
        return (
            <div>
                <FormGroup>
                    <div>
                        <ControlLabel type="text" bsSize="lg">Origination Device</ControlLabel>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Image
                            height={20}
                            width={20}
                            style={{marginRight: 10}}
                            src={"/images/" + originationDevices[originationDeviceId].payload['originationdevice/icon-image-name'] + ".png"} />
                        <div>{originationDevices[originationDeviceId].payload['originationdevice/name']}</div>
                    </div>
                </FormGroup>
            </div>
        )
    }
}
