import React from "react"
import PropTypes from "prop-types"
import { Modal, Image, Breadcrumb, Col, Panel, Button } from "react-bootstrap"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import { attemptResendVerificationEmail,
         accountVerificationEmailSentUserAck } from "../actions/action-creators"
import _ from "lodash"
import * as urls from "../urls"
import * as gvs from "../grid-vals"
import * as strs from "../strings"
import Tappable from "react-tappable"
import ChangelogResultsModal from "../components/changelog-results-modal.jsx"
import { toastr } from 'react-redux-toastr'

class AccountVerificationErrorPage extends React.Component {
    render() {
        const {
            authToken,
            resendVerificationEmail,
            accountVerificationEmailSentUserAck,
            indicateAccountVerificationEmailSent,
            userEmail
        } = this.props
        return (
            <div>
                <RikerHelmet title="Verification Error" />
                <RikerNavBar />
                <Modal
                    show={indicateAccountVerificationEmailSent}
                    dialogClassName="riker-modal-dialog">
                    <Modal.Body>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                            <div>Verificaton email sent to you at <strong>{userEmail}</strong>.</div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Tappable className="btn btn-default" onTap={() => accountVerificationEmailSentUserAck()}>Close</Tappable>
                    </Modal.Footer>
                </Modal>
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h1 className="page-heading">Verification Error</h1>
                    <p>Whoops, something went wrong with that verification link.</p>
                    {(() => {
                         if (!_.isEmpty(authToken)) {
                             return (
                                 <p><Tappable component="a" onTap={resendVerificationEmail}>Re-send verification email</Tappable>.</p>
                             )
                         } else {
                             return (<p style={{paddingBottom: 10}}><Link to={urls.LOGIN_URI}>Riker log in</Link>.</p>)
                         }
                    })()
                    }
                </Col>
            </div>
        );
    }
}

AccountVerificationErrorPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        authToken: state.authToken.value,
        indicateAccountVerificationEmailSent: state.api.indicateAccountVerificationEmailSent,
        userEmail: state.serverSnapshot["user/email"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resendVerificationEmail: () => dispatch(attemptResendVerificationEmail()),
        accountVerificationEmailSentUserAck: () => dispatch(accountVerificationEmailSentUserAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountVerificationErrorPage)
