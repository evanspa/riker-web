import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router"
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import { Col, Row } from "react-bootstrap"
import * as gvs from "../grid-vals"
import * as urls from "../urls"
import * as utils from "../utils"
import RikerNavBarBare from "../components/riker-navbar-bare.jsx"
import PrivacyContent from "../components/privacy-content.jsx"

class PrivacyBareNavPage extends React.Component {
    render() {
        const { navigateTo } = this.props
        return (
            <div>
                <RikerHelmet title="Riker Privacy Policy" />
                <RikerNavBarBare nonClickable={true} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <PrivacyContent
                        enableLinks={false}
                        tosUri={urls.TOS_BARE_NAV_URI}
                        securityUri={urls.SECURITY_BARE_NAV_URI}
                    />
                </Col>
            </div>
        )
    }
}

PrivacyBareNavPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyBareNavPage)
