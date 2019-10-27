import React from "react"
import { Link } from "react-router"
import * as urls from "../urls"

export default class SecurityContent extends React.Component {
    render() {
        let accountPageContent
        let email
        if (this.props.enableLinks) {
            accountPageContent = (<Link to={urls.ACCOUNT_URI}>to your account page</Link>)
            email = (<a href="mailto:security@rikerapp.com">security@rikerapp.com</a>)
        } else {
            accountPageContent = (<span>to your account page</span>)
            email = (<strong>security@rikerapp.com</strong>)
        }
        return (
            <div>
                <h1 className="page-heading">Riker Security Policy</h1>
                <h2>Riker Security, Backups, and Data</h2>
                <p>All traffic on Riker runs over SSL/TLS/HTTPS, the most common and trusted communications protocol on the internet. Data is backed up hourly and copies are stored at an off-site location for disaster recovery.</p>
                <h2>Portability</h2>
                <p>Your data is yours. If you ever want to stop using Riker, you should be able to download your data. Riker features data portability where applicable. We strongly believe in it.</p>
                <p>To export your data, navigate {accountPageContent}, and click the 'Export' button.  Currently, we allow export to CSV, which is a format that lends itself well to Riker's specific data storage model.</p>
                <p>See also the <Link to={this.props.privacyUri}>Riker Privacy Policy</Link>.</p>
                <h2>Need to report a security vulnerability?</h2>
                <p>Please contact us at {email} and we will respond as soon as possible.</p>
            </div>
        )
    }
}
