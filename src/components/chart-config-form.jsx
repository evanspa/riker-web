import React from "react"
import { Button, Row, Col, Panel, Well, ControlLabel, FormGroup, FormControl } from "react-bootstrap"
import { reduxForm } from "redux-form"
import { RikerDateFormGroup,
         RikerDropdownFormGroup,
         RikerSelectListFormGroup } from "./form-input.jsx"
import { cannotBeEmptyValidator,
         mustBeDateValidator } from "../utils"
import _ from "lodash"
import { CHART_CONFIG_FORM } from "../forms"
import Tappable from "react-tappable"
import * as utils from "../utils"
import * as chartUtils from "../chart-utils"
import moment from "moment"

const validate = values => {
    const errors = {}
    cannotBeEmptyValidator(values, errors, "rangeStartDate")
    mustBeDateValidator(values, errors, "rangeStartDate")
    cannotBeEmptyValidator(values, errors, "rangeEndDate")
    mustBeDateValidator(values, errors, "rangeEndDate")
    return errors
}

class ChartConfigForm extends React.Component {

    componentWillUnmount() {
        const { clearErrors } = this.props
        if (clearErrors != null) {
            clearErrors()
        }
    }

    render() {
        const {
            fields: {
                rangeStartDate,
                rangeEndDate,
                aggregateBy,
                boundedEndDate,
                suppressPieSliceLabels
            },
            cancelSettingsEdit,
            handleSubmit,
            chartConfig,
            navigateTo,
            doGoBack,
            clearConfig,
            isGlobalConfig,
            entityName,
            clearErrors
        } = this.props
        const errors = []
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Row><Col xs={12}><hr /></Col></Row>
                    <RikerDateFormGroup
                        style={{marginTop: 0}}
                        label="Range start date"
                        field={rangeStartDate}
                        disabled={false}
                        helpText={"Only include " + entityName + "s that were logged on or after this date."} />
                    <FormGroup bsSize="lg" style={{display: "flex", alignItems: "center", marginTop: 15}}>
                        <input
                            type="checkbox"
                            checked={boundedEndDate.value}
                            onChange={boundedEndDate.onChange}
                            name={boundedEndDate.name}
                            disabled={false} />
                        <ControlLabel type="text" style={{marginLeft: 10, marginBottom: 0}}>Bounded end date?</ControlLabel>
                    </FormGroup>
                    {(() => {
                         if (boundedEndDate.value) {
                             return (
                                 <RikerDateFormGroup
                                     style={{marginTop: 15}}
                                     label="Range end date"
                                     field={rangeEndDate}
                                     disabled={false}
                                     helpText={"Only include " + entityName + "s that were logged on or before this date."} />
                             )
                         }
                    })()
                    }
                    {(() => {
                         if (chartConfig.isTimelineChart) {
                             return (
                                 <RikerDropdownFormGroup
                                     field={aggregateBy}
                                     label="Aggregate by"
                                     data={chartUtils.AGGREGATE_BY_OPTIONS}
                                     disabled={false}
                                     textField="name"
                                     valueField="value"
                                     helpText={"How your " + entityName + " data should be aggregated."} />
                             )
                         }
                    })()
                    }
                    {(() => {
                         const screenWidth = utils.screenWidth()
                         const enoughRoom = screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD
                         if (enoughRoom && (!chartConfig.isTimelineChart || isGlobalConfig)) {
                             return (
                                 <div style={{marginTop: 15}}>
                                     <FormGroup
                                         bsSize="lg"
                                         style={{display: "flex",
                                                 marginBottom: 5,
                                                 alignItems: "center"}}>
                                         <input
                                             type="checkbox"
                                             checked={suppressPieSliceLabels.value}
                                             onChange={suppressPieSliceLabels.onChange}
                                             name={suppressPieSliceLabels.name}
                                             disabled={this.props.disabled} />
                                         <ControlLabel type="text" style={{marginLeft: 10, marginBottom: 0}}>Suppress pie slice labels</ControlLabel>
                                     </FormGroup>
                                     <em style={{fontSize: ".8em"}}>Pie slice labels may become difficult to read or obscure the view of small slices.  This option prevents the labels from displaying.</em>
                                 </div>
                             )
                         }
                    })()
                    }
                    <Row><Col xs={12}><hr style={{ marginTop: 15, marginBottom: 15}}/></Col></Row>
                    <Tappable className="btn btn-default"
                              style={{marginBottom: 0, marginTop: 3, marginRight: 10}}
                              onTap={() => {
                                      doGoBack()
                              }}>Cancel</Tappable>
                    {(() => {
                         if (chartConfig.manuallyConfigured || isGlobalConfig) {
                             return (
                                 <Tappable className="btn btn-primary"
                                           style={{marginBottom: 0, marginTop: 3, marginRight: 10}}
                                           onTap={() => {
                                                   clearConfig(chartConfig)
                                           }}>{isGlobalConfig ? "Clear All Config" : "Clear Config"}</Tappable>
                             )
                         }
                    })()
                    }
                    <Tappable component="Button"
                              type="submit"
                              style={{fontSize: 16, marginBottom: 0, marginTop: 3, paddingTop: 10, paddingBottom: 10, paddingRight: 25, paddingLeft: 25}}
                              className="btn btn-success">Submit</Tappable>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: CHART_CONFIG_FORM,
    fields: ["rangeStartDate", "rangeEndDate", "boundedEndDate", "aggregateBy", "suppressPieSliceLabels"],
    validate
})(ChartConfigForm)
