import React from "react"
import DateTimePicker from "react-widgets/lib/DateTimePicker"
import SelectList from "react-widgets/lib/SelectList"
import { Link } from "react-router"
import { Button, FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock } from "react-bootstrap"
import { DropdownList } from "react-widgets"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import * as utils from "../utils"
import _ from "lodash"
import Tappable from "react-tappable"

export class RikerFormGroup extends React.Component {
    render() {
        momentLocalizer(moment)
        const { field, type } = this.props
        const formGroupOpts = {} // http://stackoverflow.com/a/29103727/1034895
        const areErrors = !this.props.disabled && field != null && field.touched && (field.error != null) && (field.error.length > 0);
        if (areErrors) {
            if (!this.props.suppressErrors) {
                formGroupOpts['validationState'] = "error"
            }
        }
        return (
            <div>
                <FormGroup {...formGroupOpts} bsSize="lg">
                    <div>
                        <ControlLabel type={this.props.type}>{this.props.label}</ControlLabel>
                        {(() => {
                             if (this.props.adjacentButton != null) {
                                 return (<Tappable style={{marginLeft: 10, marginBottom: 5}}
                                                   className="btn btn-xs btn-default"
                                                   disabled={this.props.disabled}
                                                   onTap={this.props.adjacentButton.onClick}>{this.props.adjacentButton.label}</Tappable>)
                             }
                             return null
                        })()
                        }

                    </div>
                    {(() => {
                         if (type == "date" || type == "datetime") {
                             const editFormat = type == "date" ? utils.DATE_DISPLAY_FORMAT : utils.DATETIME_DISPLAY_FORMAT
                             const displayFormat = type == "date" ? utils.DATE_DISPLAY_FORMAT : utils.DATETIME_DISPLAY_FORMAT
                             return (<DateTimePicker
                                         time={type == "datetime"}
                                         editFormat={editFormat}
                                         parse={str => moment(str, editFormat).toDate()}
                                         format={displayFormat}
                                         value={!_.isEmpty(field.value) ? moment(field.value, displayFormat).toDate() : null}
                                         onChange={(name, value) => field.onChange(value)}
                                         name={field.name}
                                         disabled={this.props.disabled}
                                         autoFocus={this.props.autoFocus} />)
                         } else if (type == "integer") {
                             return (<FormControl
                                         type="number"
                                         value={field.value && field.value.toString().length > 0 ? field.value : field.initialValue}
                                         onChange={field.onChange}
                                         name={field.name}
                                         disabled={this.props.disabled}
                                         autoFocus={this.props.autoFocus}
                                         pattern="\d*" />)
                         } else if (type == "number") {
                             return (<FormControl
                                         type={type}
                                         value={field.value && field.value.toString().length > 0 ? field.value : field.initialValue}
                                         onChange={field.onChange}
                                         name={field.name}
                                         disabled={this.props.disabled}
                                         step="any"
                                         autoFocus={this.props.autoFocus} />)
                         } else if (type == "selectlist") {

                             return (<SelectList
                                         value={field.value}
                                         onChange={field.onChange}
                                         name={field.name}
                                         data={this.props.data}
                                         disabled={this.props.disabled}
                                         autoFocus={this.props.autoFocus} />)
                         } else {
                             return (<FormControl
                                         type={type}
                                         autoComplete={this.props.autoComplete}
                                         value={field.value && field.value.toString().length > 0 ? field.value : field.initialValue}
                                         onChange={field.onChange}
                                         name={field.name}
                                         disabled={this.props.disabled}
                                         autoFocus={this.props.autoFocus} />)
                         }
                    })()
                    }
                    {(() => {
                         if (this.props.helpText != null) {
                             return (<em className="formGroupHelpText">{this.props.helpText}</em>)
                         }
                         return null
                    })()
                    }
                    <HelpBlock>{areErrors && !this.props.suppressErrors ? field.error : ""}</HelpBlock>
                </FormGroup>
            </div>
        )
    }
}

export class RikerTextFormGroup extends React.Component {
    render() {
        return <RikerFormGroup type="text" {...this.props} />
    }
}

export class RikerNumberFormGroup extends React.Component {
    render() {
        return <RikerFormGroup type="number" {...this.props} />
    }
}

export class RikerIntegerFormGroup extends React.Component {
    render() {
        return <RikerFormGroup type="integer" {...this.props} />
    }
}

export class RikerSelectListFormGroup extends React.Component {
    render() {
        return <RikerFormGroup type="selectlist" {...this.props} />
    }
}

export class RikerDateFormGroup extends React.Component {
    render() {
        return <RikerFormGroup type="date" {...this.props} />
    }
}

export class RikerDateTimeFormGroup extends React.Component {
    render() {
        return <RikerFormGroup type="datetime" {...this.props} />
    }
}

export class RikerCheckboxFormGroup extends React.Component {
    render() {
        const { field } = this.props
        return (
            <FormGroup>
                <Checkbox
                    inline={true}
                    checked={field.value}
                    onChange={field.onChange}
                    name={field.name}
                    disabled={this.props.disabled}>
                    <ControlLabel type="text">{this.props.label}</ControlLabel>
                </Checkbox>
            </FormGroup>
        )
    }
}

export class RikerDropdownFormGroup extends React.Component {
    render() {
        const {
            field,
            disabled,
            data,
            valueField,
            textField,
            needToAddTextLinkObj,
            groupBy,
            groupComponent
        } = this.props
        const formGroupOpts = {} // http://stackoverflow.com/a/29103727/1034895
        const areErrors = !this.props.disabled && field != null && field.touched && (field.error != null) && (field.error.length > 0);
        if (areErrors) {
            formGroupOpts['validationState'] = "error"
        }
        let val = field.value
          let foundVal = false
        for (let i = 0; i < data.length && !foundVal; i++) {
            if (_.isObject(val)) {
                foundVal = data[i][valueField] == val[valueField]
            } else {
                foundVal = data[i][valueField] == val
            }
        }
        if (!foundVal) {
            val = null
        }
        return (
            <FormGroup {...formGroupOpts}>
                <ControlLabel type="text">{this.props.label}</ControlLabel>
                <DropdownList
                    groupBy={groupBy}
                    groupComponent={groupComponent}
                    onChange={field.onChange}
                    name={field.name}
                    value={val}
                    valueField={valueField}
                    textField={textField}
                    data={data}
                    disabled={disabled} />
                {(() => {
                     if (needToAddTextLinkObj != null) {
                         let initFn = needToAddTextLinkObj.initFn
                         if (initFn == null) {
                             initFn = () => {}
                         }
                         return (<div style={{marginTop: 5}}>{needToAddTextLinkObj.question}  <Link onClick={initFn} to={needToAddTextLinkObj.url}>Click here</Link></div>)
                     } else {
                         return ""
                     }
                 }
                 )()
                }
                {(() => {
                     if (this.props.helpText != null) {
                         return (<em className="formGroupHelpText">{this.props.helpText}</em>)
                     }
                     return null
                 })()
                }
                <HelpBlock>{areErrors ? field.error : ""}</HelpBlock>
            </FormGroup>
        )
    }
}
