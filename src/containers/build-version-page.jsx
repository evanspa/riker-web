import React from "react"
import ReactDOM from "react-dom"

export default class BuildVersionPage extends React.Component {
    render() {
        return (
            <div><version>{process.env.RIKER_VERSION}</version></div>
        )
    }
}
