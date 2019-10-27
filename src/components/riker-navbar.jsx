import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from "react-router"
import { LinkContainer } from "react-router-bootstrap"
import { Image, Navbar, Nav, NavItem } from "react-bootstrap"
import { logout } from "../actions/action-creators"
import _ from "lodash"
import * as urls from "../urls"
import Tappable from "react-tappable"

class RikerNavBar extends React.Component {

    // https://github.com/react-bootstrap/react-router-bootstrap/issues/112#issuecomment-142599003
    componentDidMount() {
        const navBar = ReactDOM.findDOMNode(this);
        const collapsibleNav = navBar.querySelector('div.navbar-collapse');
        const btnToggle = navBar.querySelector('button.navbar-toggle');
        navBar.addEventListener('click', (evt) => {
            if (evt.target.tagName !== 'A' || evt.target.classList.contains('dropdown-toggle') || ! collapsibleNav.classList.contains('in')) {
                return;
            }
            btnToggle.click();
        }, false);
    }
    render() {
        const {
            authToken,
            onLogoutClick,
            logoutUri,
            navigateTo
        } = this.props
        let marginBottom = this.props.marginBottom
        if (marginBottom == null) {
            marginBottom = 20
        }
        const { router } = this.context
        const fontSizeStyle = {fontSize: "0.8em"}
        const makeMenuItem = (url, label, onlyActiveOnIndex = false) => {
            return (
                <NavItem style={fontSizeStyle} className={router.isActive(url, onlyActiveOnIndex) ? "active" : null}>
                    <Tappable
                        style={{paddingTop: 12, paddingBottom: 12}}
                        onTap={() => navigateTo(url)}>{label}</Tappable>
                </NavItem>
            )
        }
        var nav
        if (_.isEmpty(authToken)) {
            nav = (
                <Nav pullRight>
                    {makeMenuItem(urls.ROOT_URI, "Home", true)}
                    {makeMenuItem(urls.FAQ_URI, "FAQ")}
                    {makeMenuItem(urls.PRICING_URI, "Pricing")}
                    {makeMenuItem(urls.SIGNUP_URI, "Sign Up")}
                    {makeMenuItem(urls.LOGIN_URI, "Log In")}
                    {makeMenuItem(urls.SUPPORT_URI, "Support")}
                </Nav>
            )
        } else {
            nav = (
                <Nav pullRight>
                    {makeMenuItem(urls.ROOT_URI, "Home", true)}
                    {makeMenuItem(urls.RECORDS_URI, "Records")}
                    {makeMenuItem(urls.SETTINGS_URI, "Profile and Settings")}
                    {makeMenuItem(urls.GENERAL_INFO_URI, "General Info")}
                    {makeMenuItem(urls.ACCOUNT_URI, "My Account")}
                    {makeMenuItem(urls.SUPPORT_URI, "Support")}
                </Nav>
            )
        }
        return (
            <Navbar bsStyle="default" fluid style={{marginBottom: marginBottom}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={urls.ROOT_URI}>
                            <img style={{display: "inline-block"}} src="/images/dumbell-35x35.svg" />&nbsp;&nbsp;<span className="riker-label-nav">Riker</span>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <div>
                        {nav}
                    </div>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

RikerNavBar.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    const logoutLink = state.serverSnapshot._links.logout;
    var logoutUri = ""
    if (!_.isEmpty(logoutLink)) {
        logoutUri = logoutLink.href;
    }
    return {
        authToken: state.authToken.value,
        logoutUri: logoutUri
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogoutClick: (logoutUri, authToken) => {
            dispatch(logout(logoutUri, authToken))
        },
        navigateTo: url => {
            dispatch(push(url))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RikerNavBar)
