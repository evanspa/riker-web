import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import { Link } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { Image, Col, Navbar, Nav, NavItem } from "react-bootstrap"
import { logout } from "../actions/action-creators"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"

export default class RikerNavBarBare extends React.Component {
    render() {
        let contentPanel
        if (this.props.nonClickable != null && this.props.nonClickable) {
            contentPanel = (
                <Image className="navbar-brand-bare-img" src="/images/dumbell-35x35.svg" />
            )
        } else {
            contentPanel = (
                <Link className="brand" to={urls.ROOT_URI}>
                    <Image className="navbar-brand-bare-img" src="/images/dumbell-35x35.svg" />
                </Link>
            )
        }
        return (
            <Col xs={gvs.XS}
                 xsOffset={gvs.XS_OFFSET}
                 className="navbar-brand-bare">
                {contentPanel}
            </Col>
        );
    }
}
