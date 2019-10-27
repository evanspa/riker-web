import React from "react"
import PropTypes from "prop-types"
import { push, replace } from "react-router-redux"
import RikerHelmet from "../components/riker-helmet.jsx"
import { Col, Panel, Label, Image } from "react-bootstrap"
import { connect } from "react-redux"
import RikerNavBar from "../components/riker-navbar.jsx"
import {toastr} from "react-redux-toastr"
import * as gvs from "../grid-vals"
import * as utils from "../utils"
import _ from "lodash"
import Loading from "../components/loading.jsx"

class RedirectPage extends React.Component {

    componentDidMount() {
        //console.log("inside redirect.jsx, props: " + JSON.stringify(this.props))
        const { query } = this.props.location
        if (!_.isEmpty(query.nextPathname)) {
            const { redirectToPath } = this.props
            let queryParams = this.props.location.search
            const nextPathnameParamIndex = queryParams.indexOf("&nextPathname=")
            if (nextPathnameParamIndex !== -1) {
                queryParams = queryParams.substring(0, nextPathnameParamIndex)
            }
            if (queryParams.indexOf("?nextPathname") !== -1) {
                redirectToPath(query.nextPathname)
            } else {
                redirectToPath(query.nextPathname + queryParams)
            }

        }
    }

    render() {
        return (
            <div>
                <RikerHelmet />
                <RikerNavBar />
                <Col lg={gvs.LG_CONDENSED} lgOffset={gvs.LG_OFFSET_CONDENSED}
                     md={gvs.MD} mdOffset={gvs.MD_OFFSET}
                     sm={gvs.SM} smOffset={gvs.SM_OFFSET}
                     xs={gvs.XS} xsOffset={gvs.XS_OFFSET}>
                    <div className="center-it">
                        <Loading />
                    </div>
                </Col>
            </div>
        );
    }
}

RedirectPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        redirectToPath: pathname => {
            let augmentedPathname
            if (pathname.indexOf("?") !== -1) {
                augmentedPathname = pathname
                if (augmentedPathname.indexOf(utils.FROM_SERVER_QUERY_PARAM) === -1) {
                    augmentedPathname = augmentedPathname + "&" + utils.FROM_SERVER_QUERY_PARAM + "=1"
                }
            } else {
                augmentedPathname = pathname + "?" + utils.FROM_SERVER_QUERY_PARAM + "=1"
            }
            dispatch(replace(augmentedPathname))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedirectPage)
