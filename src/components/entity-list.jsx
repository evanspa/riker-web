import React from "react"
import _ from "lodash"
import { Label, Button } from "react-bootstrap"
import EntityListTable from "./entity-list-table.jsx"
import * as utils from "../utils"
import Tappable from "react-tappable"

export default class EntityList extends React.Component {
    render() {
        const { entityType,
                entities,
                fields,
                navigateTo,
                handleAddEntity,
                entityRowOnClick,
                entityIdKey,
                entitiesSortFn,
                accountStatuses,
                entityLinkToFn
        } = this.props
        const numEntities = _.keys(entities).length
        const editAllowed = utils.editOperationAllowed(accountStatuses)
        var inner
        if (numEntities > 0) {
            inner = <EntityListTable
                        fields={fields}
                        navigateTo={navigateTo}
                        entities={entities}
                        entityRowOnClick={entityRowOnClick}
                        entitiesSortFn={entitiesSortFn}
                        entityIdKey={entityIdKey}
                        entityLinkToFn={entityLinkToFn} />
            } else {
            inner = <div style={{marginTop: 15}}>{"You currently have no " + entityType + "s."}</div>
        }
        return (
            <div style={{marginTop: 15 }}>
                <Tappable style={{marginBottom: editAllowed ? 10 : 5}}
                          className="btn btn-lg btn-primary"
                          disabled={!editAllowed}
                          onTap={() => { if (editAllowed) handleAddEntity() }}>{"Add " + entityType.toTitleCase()}</Tappable>
                {(() => {
                     if (!editAllowed) {
                         return (<div style={{fontSize: ".75em", fontStyle: "italic", marginBottom: 5}}>{"account closed - '" + "Add " + entityType.toTitleCase() + "' disabled"}</div>)
                     }
                 })()}
                { inner }
            </div>
        )
    }
}
