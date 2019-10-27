import React from "react"
import { Row, Col } from "react-bootstrap"

const PaddingTop = 10
const PaddingBottom = PaddingTop
const MarginTop = 2
const MarginBottom = MarginTop

const FieldNameXsOffset = 0
const FieldNameXs = 6
const FieldValueXs = 6

const FieldNameMdOffset = 0
const FieldNameMd = 4
const FieldValueMd = 8

export const FieldNameCol = ({value}) => {
    return (
        <Col xs={FieldNameXs}
             xsOffset={FieldNameXsOffset}
             md={FieldNameMd}
             mdOffset={FieldNameMdOffset}
             style={{textAlign: "right", backgroundColor: "#F5F5F5", paddingTop: PaddingTop, paddingBottom: PaddingBottom, marginTop: MarginTop, marginBottom: MarginBottom}}>
            <strong>{value}</strong>
        </Col>
    )
}

export const FieldValueCol = ({value}) => {
    return (
        <Col xs={FieldValueXs}
             md={FieldValueMd}
             style={{paddingTop: PaddingTop, paddingBottom: PaddingBottom, marginTop: MarginTop, marginBottom: MarginBottom}}>
            {value}
        </Col>
    )
}

export const FieldElementCol = (props) => {
    return (
        <Col xs={FieldValueXs}
             md={FieldValueMd}
             style={{paddingTop: PaddingTop, paddingBottom: PaddingBottom, marginTop: MarginTop, marginBottom: MarginBottom}}>
            {props.children}
        </Col>
    )
}

export const FieldRow = ({fieldName, fieldValue}) => {
    return (
        <Row>
            <FieldNameCol value={fieldName} />
            <FieldValueCol value={fieldValue} />
        </Row>
    )
}
