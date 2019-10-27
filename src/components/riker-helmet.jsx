import React from "react"
import Helmet from "react-helmet"
import _ from "lodash"

export default class RikerHelmet extends React.Component {
    render() {
        let title = this.props.title
        let description = null
        if (this.props.description) {
            description = this.props.description
        }
        if (_.isEmpty(title)) {
            title = "Riker"
        }
        return (
            <Helmet {...this.props} title={title}>
                {(() => {
                     if (description) {
                         return (
                             <meta name="description" content={description} />
                         )
                     }
                })()}
            </Helmet>
        )
    }
}
