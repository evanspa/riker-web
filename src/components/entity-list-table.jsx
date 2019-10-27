import React from "react"
import { Link } from "react-router"
import _ from "lodash"
import moment from "moment"
import momentLocalizer from "react-widgets-moment"
import * as utils from "../utils"
import ReactTable from "react-table"

export default class EntityListTable extends React.Component {
    render() {
        const { fields,
                entities,
                navigateTo,
                entityRowOnClick,
                entitiesSortFn,
                entityIdKey,
                entityLinkToFn
        } = this.props
        momentLocalizer(moment)
        const entitiesArray = _.values(entities)
        if (entitiesSortFn != null) {
            entitiesArray.sort(entitiesSortFn)
        }
        const columns = []
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i]
            const formatter = field.formatter
            let textAlignVal = "left"
            if (field.textAlign != null) {
                textAlignVal = field.textAlign
            }
            columns.push(
                {
                    id: "" + i,
                    Header: props => fields[i].label,
                    headerStyle: {textAlign: textAlignVal,
                                  backgroundColor: utils.RIKERAPP_LIGHTER_BLACK_HEX,
                                  color: "#fff"},
                    style: {textAlign: textAlignVal},
                    accessor: entity => {
                        const entityPayload = entity.payload
                        const entityId = entityPayload[entityIdKey]
                        let entityValue = entityPayload[field.valueKey]
                        if (formatter != null) {
                            entityValue = formatter(entityValue, entityPayload)
                        }
                        return entityValue
                    }
                }
            )
        }
        return (
            <ReactTable
                style={{ display: "block" }}
                data={entitiesArray}
                columns={columns}
                getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: e => {
                                const entityPayload = rowInfo.original.payload
                                const entityId = entityPayload[entityIdKey]
                                entityRowOnClick(entityId)
                                navigateTo(entityLinkToFn(entityId))
                            }
                        }
                }}
            />
        )
    }
}
