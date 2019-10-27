import React from "react"

export default class Loading extends React.Component {
    render() {
        let scale = this.props.scale
        if (!scale) {
            scale = 0.6
        }
        return (
            <div className="uil-default-css" style={{transform: "scale(" + scale + ")"}}>
                <div className="loading0"/>
                <div className="loading30"/>
                <div className="loading60"/>
                <div className="loading90"/>
                <div className="loading120"/>
                <div className="loading150"/>
                <div className="loading180"/>
                <div className="loading210"/>
                <div className="loading240"/>
                <div className="loading270"/>
                <div className="loading300"/>
                <div className="loading330"/>
            </div>
        )
    }
}
