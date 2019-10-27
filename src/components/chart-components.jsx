import React from "react"
import { Link } from "react-router"
import Tappable from "react-tappable"
import * as utils from "../utils"
import { Image, Modal } from "react-bootstrap"
import _ from "lodash"

export const MARGIN_BETWEEN_HELP_PARAGRAPHS = 12
export const TOP_CHART_TOP_MARGIN = 7

export const commonChartTopMargin = screenWidth => {
    if (screenWidth > 1023) {
        return 25
    } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) {
        return 20
    } else {
        return 15
    }
}

export const MetricHeadingPanel = ({bgColor, title, onTapFn, marginTop, children}) => {
    let marginTopVal = 0
    if (marginTop) {
        marginTopVal = marginTop
    }
    return (
        <div className="metricHeadingPanel" style={{marginTop: marginTopVal, textAlign: "center"}}>
            <span><strong>{title}</strong></span>
            <Tappable
                component="div"
                style={{marginLeft: 20, marginRight: 20}}
                className="question-mark question-mark-light"
                onTap={onTapFn}>i</Tappable>
            {children}
        </div>
    )
}

export const InfoModal = ({show, title, content, closeOnTapFn}) => (
    <Modal show={show}>
        <Modal.Header>
            <Modal.Title id="contained-modal-title-sm">
                <div style={{display: "flex", alignItems: "center"}}>
                    <Image src="/images/blue-info-30x30.svg" style={{marginRight: 8}} />
                    <div>{title}</div>
                </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
            <Tappable className="btn btn-default" onTap={closeOnTapFn}>Close</Tappable>
        </Modal.Footer>
    </Modal>
)

export const NoChartsToConfigureModal = ({show, closeOnTapFn}) => (
    <Modal show={show} dialogClassName="riker-modal-dialog">
        <Modal.Header>
            <Modal.Title id="contained-modal-title-sm">
                <div style={{display: "flex", alignItems: "center"}}>
                    <Image src="/images/yellow-exclamation-30x30.svg" style={{marginRight: 8}} />
                    <div>No Charts to Configure</div>
                </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>You do not currently have any strength charts to configure.</div>
        </Modal.Body>
        <Modal.Footer>
            <Tappable className="btn btn-default" onTap={closeOnTapFn}>Close</Tappable>
        </Modal.Footer>
    </Modal>
)

export const ChartSection = ({jumps, id, title, content, marginTop}) => {
    const screenWidth = utils.screenWidth()
    let paddingTopBottom = 30
    let marginLeftRight = 15
    let innerMarginTop = 20
    let fontSize = "100%"
    if (screenWidth < utils.MAX_DEVICE_WIDTH_THRESHOLD) {
        paddingTopBottom = 15
        marginLeftRight = 5
        innerMarginTop = 15
        fontSize = "90%"
    }
    return (
        <div id={id} style={{ backgroundColor: utils.RIKERAPP_LIGHTER_BLACK_HEX, marginTop: marginTop }}>
            <div style={{ paddingTop: paddingTopBottom,
                          paddingBottom: paddingTopBottom,
                          marginLeft: marginLeftRight,
                          marginRight: marginLeftRight }}>
                <div style={{color: "white",
                             textAlign: "left",
                             display: "inline",
                             marginLeft: marginLeftRight,
                             fontWeight: "bold"}}>{title}</div>
                <div style={{display: "inline", marginLeft: 15}}>
                    <Tappable
                        className="btn btn-riker btn-jumpTo"
                        style={{marginTop: 2, marginBottom: 2}}
                        onTap={() => window.scrollTo(0, 0)}>top</Tappable>
                </div>
                <div style={{marginTop: innerMarginTop,
                             marginLeft: marginLeftRight,
                             fontSize: fontSize,
                             textAlign: "left",
                             color: "white"}}>
                    {content}
                    {(() => {
                         if (jumps != null && jumps.length > 0) {
                             const jumpToId = id => {
                                 const top = document.getElementById(id).offsetTop
                                 window.scrollTo(0, top)
                             }
                             const jumpToButtons = []
                             let marginRight = 10
                             for (let i = 0; i < jumps.length; i++) {
                                 if (i + 1 == jumps.length) {
                                     marginRight = 0
                                 }
                                 jumpToButtons.push(
                                     <Tappable
                                         key={i}
                                         className="btn btn-riker btn-jumpTo"
                                         style={{marginTop: 8, marginRight: marginRight}}
                                         onTap={() => jumpToId(jumps[i][0])}>{jumps[i][1]}</Tappable>
                                 )
                             }
                             return (
                                 <div style={{marginTop: 2}}>{jumpToButtons}</div>
                             )
                         }
                         return null
                    })()}
                </div>
            </div>
        </div>
    )
}

export const JumpToButtonsPanel = ({totalId, avgId, distId, distTimeId}) => {
    const jumpToId = id => {
        const top = document.getElementById(id).offsetTop
        window.scrollTo(0, top)
    }
    return (
        <div style={{backgroundColor: "#59636C", textAlign: "center", marginTop: utils.THIN_MARGIN_TOP}}>
            <div style={{display: "inline-block", marginRight: 10, marginTop: 10 }}>
                <Tappable
                    className="btn btn-riker btn-jumpTo"
                    onTap={() => jumpToId(totalId)}>total</Tappable>
            </div>
            <div style={{display: "inline-block", marginRight: 10, marginTop: 10 }}>
                <Tappable
                    className="btn btn-riker btn-jumpTo"
                    onTap={() => jumpToId(avgId)}>avg</Tappable>
            </div>
            <div style={{display: "inline-block", marginRight: 10, marginTop: 10 }}>
                <Tappable
                    className="btn btn-riker btn-jumpTo"
                    onTap={() => jumpToId(distId)}>dist</Tappable>
            </div>
            <div style={{display: "inline-block", marginTop: 10, marginBottom: 10}}>
                <Tappable
                    className="btn btn-riker btn-jumpTo"
                    onTap={() => jumpToId(distTimeId)}>dist / time</Tappable>
            </div>
        </div>
    )
}

export const MgMvJumpToButtonsPanel = () => {
    const jumpToId = id => {
        const top = document.getElementById(id).offsetTop
        window.scrollTo(0, top)
    }
    let marginHorizontal = 12
    let paddingVertical = 4
    let marginVertical = 10
    const screenWidth = utils.screenWidth()
    if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
        // use above defaults
    } else if (screenWidth > 411) { // iphone 6 plus
        marginHorizontal = 10
        marginVertical = 9
    } else if (screenWidth > 374) { // iphone 6
        marginHorizontal = 10
        marginVertical = 8
    } else { // iphone 5 and similar
        marginHorizontal = 8
        paddingVertical = 3
        marginVertical = 8
    }
    return (
        <div style={{backgroundColor: "#59636C", marginTop: utils.THIN_MARGIN_TOP, display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
            <div style={{ display: "inline-flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          marginLeft: marginHorizontal,
                          marginTop: marginVertical,
                          marginBottom: marginVertical,
                          marginRight: marginHorizontal }}>
                <div style={{display: "inline-block", marginRight: marginHorizontal - 3, padding: 3 }}>
                    <Tappable
                        className="btn btn-riker btn-jumpTo"
                        style={{ paddingTop: paddingVertical, paddingBottom: paddingVertical }}
                        onTap={() => jumpToId(utils.ELEMENT_ID_MG_SECTION)}>muscle groups</Tappable>
                </div>
                <div style={{display: "inline-block", padding: 3}}>
                    <Tappable
                        className="btn btn-riker btn-jumpTo"
                        style={{ paddingTop: paddingVertical, paddingBottom: paddingVertical }}
                        onTap={() => jumpToId(utils.ELEMENT_ID_MV_SECTION)}>movement variants</Tappable>
                </div>
            </div>
        </div>
    )
}

export const HeadingPanel = ({id, bgColor, title, showInfo, infoContent, showInfoFn, navigateTo, closeInfoFn, marginTop, moreChartsUri}) => {
    const screenWidth = utils.screenWidth()
    let titleFontSize
    let btnFontSize
    let btnLeftRightPadding
    if (screenWidth > 1023) {
        titleFontSize = "115%"
        btnFontSize = "100%"
        btnLeftRightPadding = 10
    } else if (screenWidth > utils.MAX_DEVICE_WIDTH_THRESHOLD) { // ipad
        titleFontSize = "110%"
        btnFontSize = "100%"
        btnLeftRightPadding = 10
    } else if (screenWidth > 411) { // iphone 6 plus
        titleFontSize = "100%"
        btnFontSize = "97%"
        btnLeftRightPadding = 8
    } else if (screenWidth > 374) { // iphone 6
        titleFontSize = "97%"
        btnFontSize = "95%"
        btnLeftRightPadding = 6
    } else { // iphone 5 and similar
        titleFontSize = "95%"
        btnFontSize = "92%"
        btnLeftRightPadding = 6
    }
    return (
        <div className="chartTypeHeadingPanel"
             id={id}
             style={{marginTop: marginTop,
                     paddingBottom: 12,
                     textAlign: "center",
                     backgroundColor: bgColor}}>
            <InfoModal show={showInfo} title={title} content={infoContent} closeOnTapFn={closeInfoFn} />
            <div
                style={{fontSize: titleFontSize,
                        display: "inline-flex",
                        marginLeft: 8,
                        marginRight: 4,
                        marginTop: 8}}>{title}</div>
            <Tappable
                component="div"
                style={{marginBottom: 2, marginRight: 14}}
                className="question-mark question-mark-light"
                onTap={showInfoFn}>i</Tappable>
            {(() => {
                 if (moreChartsUri) {
                     return (
                         <div style={{display: "inline-flex"}}>
                             <Tappable
                                 component="div"
                                 className="btn btn-riker"
                                 style={{ marginRight: 12,
                                          paddingLeft: btnLeftRightPadding,
                                          paddingRight: btnLeftRightPadding,
                                          marginTop: 6,
                                          backgroundColor: bgColor,
                                          display: "inline-flex",
                                          borderColor: "white",
                                          borderWidth: 2,
                                          fontSize: btnFontSize }}
                                 onTap={() => navigateTo(moreChartsUri)}>more charts</Tappable>
                             <Tappable
                                 component="div"
                                 className="btn btn-riker"
                                 style={{ paddingLeft: btnLeftRightPadding,
                                          paddingRight: btnLeftRightPadding,
                                          marginRight: 8,
                                          marginTop: 6,
                                          backgroundColor: bgColor,
                                          display: "inline-flex",
                                          borderColor: "white",
                                          borderWidth: 2,
                                          fontSize: btnFontSize }}
                                 onTap={() => window.scrollTo(0, 0)}>top</Tappable>
                         </div>
                     )
                 }
            })()
            }
        </div>)
}
