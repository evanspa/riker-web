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
import TosContent from "../components/tos-content.jsx"

class TermsOfServiceBareNavPage extends React.Component {
    render() {
        const { navigateTo } = this.props
        return (
            <div>
                <RikerHelmet title="Riker Terms of Service" />
                <RikerNavBarBare nonClickable={true} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <TosContent
                        privacyUri={urls.PRIVACY_BARE_NAV_URI}
                    />
                </Col>
            </div>
        )
    }
}

TermsOfServiceBareNavPage.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfServiceBareNavPage)
