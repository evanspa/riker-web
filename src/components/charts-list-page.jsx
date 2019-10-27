import React from "react"
import { Link } from "react-router"
import { Image, Modal, Col, Breadcrumb } from "react-bootstrap"
import RikerHelmet from "./riker-helmet.jsx"
import RikerNavBar from "./riker-navbar.jsx"
import _ from "lodash"
import * as utils from "../utils"
import * as gvs from "../grid-vals"
import * as urls from "../urls"
import Tappable from "react-tappable"
import NavbarBanner from "./navbar-banner.jsx"
import ReactGA from "react-ga"
import Autosuggest from "react-autosuggest"

export default class ChartsListPage extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            showNoChartsToConfigureModal: false,
            movementSuggestions: [],
            movementSearchText: ""
        }
    }

    movementSearchOnChange = (event, { newValue, method }) => {
        this.setState({ movementSearchText: newValue })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            movementSuggestions: utils.computeMovementSuggestions(value, this.props.movementsArray)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({ movementSuggestions: [] })
    }

    render() {
        const {
            navigateTo,
            homepageTabSelected,
            becameUnauthenticated,
            accountStatuses,
            redisplayBannerAfter,
            onMovementSuggestionSelectedFn,
            remindMeLaterFn,
            title,
            previewPageUrl,
            previewPageName,
            breadcrumbName,
            movementVariants
        } = this.props
        let {
            movementSearchText,
            movementSuggestions
        } = this.state
        const movementSearchInputProps = {
            placeholder: "search all movements",
            value: movementSearchText,
            onChange: this.movementSearchOnChange
        }
        const colHorizontalPadding = utils.chartScreenHorizontalColPadding()
        return (
            <div>
                <RikerHelmet title={title} />
                <RikerNavBar marginBottom={utils.navbarMarginBottom(accountStatuses, redisplayBannerAfter)} />
                <NavbarBanner
                    navigateTo={navigateTo}
                    remindMeLaterFn={remindMeLaterFn}
                    redisplayBannerAfter={redisplayBannerAfter}
                    accountStatuses={accountStatuses}
                    maintenanceAckFn={this.props.maintenanceAckFn} />
                <Col lg={6} lgOffset={3}
                     md={8} mdOffset={2}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}
                     style={{paddingLeft: colHorizontalPadding, paddingRight: colHorizontalPadding}}>
                    <Autosuggest
                        suggestions={movementSuggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={movement => movement.payload["movement/canonical-name"]}
                        renderSuggestion={(movement, {query}) => utils.renderMovementAsSuggestion(movement)}
                        onSuggestionSelected={(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
                                ReactGA.event({
                                    category: utils.GA_EVENT_CATEGORY_USER,
                                    action: "search movements from charts list"
                                })
                                onMovementSuggestionSelectedFn(suggestion, movementVariants)
                        }}
                        inputProps={movementSearchInputProps} />
                    <Breadcrumb>
                        <Breadcrumb.Item href="#" onClick={() => navigateTo(urls.HOME_URI)}>Home</Breadcrumb.Item>
                        {(() => {
                             if (previewPageUrl != null) {
                                 return (
                                     <Breadcrumb.Item href="#" onClick={() => navigateTo(previewPageUrl)}>{previewPageName}</Breadcrumb.Item>
                                 )
                             }
                        })()
                        }
                        <Breadcrumb.Item active>
                            {breadcrumbName}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    {this.props.children}
                </Col>
            </div>
        )
    }
}
