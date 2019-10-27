import React from "react"
import PropTypes from "prop-types"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router"
import { push } from 'react-router-redux'
import { ButtonToolbar,
         Button,
         DropdownButton,
         MenuItem,
         Breadcrumb,
         Panel,
         Col,
         ListGroup,
         ListGroupItem } from "react-bootstrap";
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx";
import RikerNavBar from "../components/riker-navbar.jsx"
import Records from "../components/records.jsx"
import _ from "lodash"
import * as urls from "../urls"
import * as utils from "../utils"
import { destroy } from "redux-form"
import * as forms from "../forms"
import numeral from "numeral"
import AddRecordButton from "../components/add-record-button.jsx"
import * as gvs from "../grid-vals"
import ButtonSelection from "../components/button-selection.jsx"
import { cardioTypeSelected } from "../actions/action-creators"
import * as ctids from "../cardio-type-ids"

class SelectCardioTypePage extends React.Component {
    render() {
        const {
            cardioTypes,
            cardioTypesSortFn,
            handleSelectCardioTypeFn
        } = this.props
        return (
            <div>
                <RikerHelmet title="Select Activity" />
                <RikerNavBar />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <Breadcrumb>
                        <LinkContainer to={{pathname: urls.HOME_URI}}>
                            <Breadcrumb.Item>
                                Cardio
                            </Breadcrumb.Item>
                        </LinkContainer>
                        <Breadcrumb.Item active>
                            Select Activity
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <h3>Select activity</h3>
                    <ButtonSelection
                        entities={cardioTypes}
                        entityIdKey="cardiotype/id"
                        entityDisplayKey="cardiotype/name"
                        entitiesSortFn={cardioTypesSortFn}
                        handleButtonClickFn={handleSelectCardioTypeFn} />
                </Col>
            </div>
        )
    }
}

// https://github.com/reactjs/react-router/issues/975#issuecomment-192272704
SelectCardioTypePage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        cardioTypes: state.serverSnapshot._embedded["cardio-types"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cardioTypesSortFn: utils.makeAscendPaylaodComparator("cardiotype/name", "cardiotype/id", ctids.CARDIO_TYPE_ID_OTHER),
        handleSelectCardioTypeFn: (cardioTypeId) => {
            dispatch(cardioTypeSelected(cardioTypeId))
            dispatch(push(urls.SELECT_MUSCLE_GROUP_URI))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCardioTypePage)
