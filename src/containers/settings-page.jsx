import React from "react"
import { Breadcrumb, Panel, Row, Col, Button, Well } from "react-bootstrap"
import SmallModal from "../components/small-modal.jsx"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import RikerHelmet from "../components/riker-helmet.jsx"
import RikerNavBar from "../components/riker-navbar.jsx"
import SettingsForm from "../components/settings-form.jsx"
import { markSettingsForEdit,
         clearErrors,
         maintenanceAck,
         bannerRemindLater} from "../actions/action-creators"
import * as urls from "../urls"
import { toastr } from 'react-redux-toastr'
import * as gvs from "../grid-vals"
import * as utils from "../utils"
import _ from "lodash"
import NavbarBanner from "../components/navbar-banner.jsx"

class SettingsPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showEntityGoneModal: false,
            entityGoneModalTitle: "Account deactivated on other device",
            entityGoneModalContent: "It appears your Riker account has been deactivated."
        };
    }

    componentWillReceiveProps(nextProps) {
        const { settings } = nextProps
        if (settings == null) {
            this.setState({showEntityGoneModal: true})
        }
    }

    render() {
        const {
            settings,
            markSettingsForEdit,
            clearErrors,
            userAcknowledgedNotFound
        } = this.props
        return (
            <div>
                <RikerHelmet title="Profile and Settings" />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(this.props.accountStatuses, this.props.redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={this.props.navigateTo}
                    remindMeLaterFn={this.props.remindMeLaterFn}
                    redisplayBannerAfter={this.props.redisplayBannerAfter}
                    accountStatuses={this.props.accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <Col lg={gvs.LG} lgOffset={gvs.LG_OFFSET}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <h3 className="page-heading">Profile and Settings</h3>
                    <SmallModal
                        show={this.state.showEntityGoneModal}
                        buttonTitle="Okay"
                        imageName="yellow-exclamation-30x30.svg"
                        onHide={() => {
                                this.setState({ showEntityGoneModal: false })
                                userAcknowledgedNotFound()
                            }}
                        title={this.state.entityGoneModalTitle}
                        content={this.state.entityGoneModalContent} />
                    {
                        (() => {
                            // not sure if this could ever possibly be null, but, better to be safe than sorry
                            if (settings != null) {
                                return (<SettingsForm
                                            settings={settings}
                                            accountStatuses={this.props.accountStatuses}
                                            markSettingsForEdit={markSettingsForEdit}
                                            clearErrors={clearErrors}
                                            initialValues={utils.toSettingsFormModel(settings.payload)}
                                            editMode={false} />)
                            }
                            return null
                        })()
                    }
                </Col>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const logoutLink = state.serverSnapshot._links.logout;
    var logoutUri = ""
    if (!_.isEmpty(logoutLink)) {
        logoutUri = logoutLink.href
    }
    return {
        settings: utils.userSettings(state),
        authToken: state.authToken.value,
        api: state.api,
        logoutUri: logoutUri,
        accountStatuses: utils.accountStatuses(state),
        redisplayBannerAfter: state.redisplayBannerAfter.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markSettingsForEdit: settingsId => {
            toastr.clean()
            dispatch(markSettingsForEdit(settingsId))
            dispatch(push(urls.settingsEditUrl(settingsId)))
        },
        clearErrors: () => dispatch(clearErrors()),
        userAcknowledgedNotFound: () => dispatch(push(urls.ACCOUNT_DELETED_URI)),
        navigateTo: url => dispatch(push(url)),
        remindMeLaterFn: () => dispatch(bannerRemindLater()),
        maintenanceAckFn: () => dispatch(maintenanceAck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
