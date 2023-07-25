import React, { useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import elements from "./data";
import { GraphViewMiddleWare, options } from './utils';
import ExpandLess from "./imgs/ic_expand_less.svg";
import ExpandMore from "./imgs/ic_expand_more.svg";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import "cytoscape-navigator/cytoscape.js-navigator.css";
import styles from "./graph_view.module.css";
import "./global.css";

//init GraphMiddleWare
GraphViewMiddleWare();

export function GraphView() {
    let cyRef = useRef();
    let collapseRef = useRef();
    function handleColapseAll() {
        collapseRef.collapseAll();
    }

    function handleExpandAll() {
        collapseRef.expandAll();
    }

    return <div>
        <div className={styles.actionsWrapper}>
            <p onClick={handleColapseAll}>Collapse all</p>|
            <p onClick={handleExpandAll} >Expand all</p>
        </div>
        <div className={styles.wrapper}>
            <CytoscapeComponent
                elements={CytoscapeComponent.normalizeElements(elements)}
                stylesheet={[
                    //CORE
                    {
                        selector: "core",
                        css: {
                            "active-bg-size": 0 //The size of the active background indicator.
                        }
                    },

                    //NODE
                    {
                        selector: "node",
                        css: {
                            width: "38px",
                            height: "38px",
                            "font-family": "Nokia Pure Regular",
                            "background-opacity": "1"
                        }
                    },
                    //GROUP
                    {
                        selector: "node.cy-expand-collapse-collapsed-node",
                        css: {
                            width: "56px",
                            height: "56px",
                            "background-opacity": "0",
                            "font-family": "Nokia Pure Regular"
                        }
                    },
                    {
                        selector: "$node > node",
                        css: {
                            "background-color": "#fff",
                            "background-opacity": "1",
                            "border-width": "1px",
                            "border-color": "#dcdcdc",

                            //LABEL
                            //label: "data(name)",
                            color: "#000",
                            shape: "rectangle",
                            "text-opacity": "0.56",
                            "font-size": "10px",
                            "text-transform": "uppercase",
                            "text-wrap": "none",
                            "text-max-width": "75px",
                            "padding-top": "16px",
                            "padding-left": "16px",
                            "padding-bottom": "16px",
                            "padding-right": "16px"
                        }
                    },
                    {
                        selector: ":parent",
                        css: {
                            "text-valign": "top",
                            "text-halign": "center"
                        }
                    },
                    //EDGE
                    {
                        selector: "edge",
                        style: {
                            width: 1,
                            "line-color": "#b8b8b8",
                            "curve-style": "bezier",

                            //LABEL
                            label: ""
                        }
                    },
                    {
                        selector: "edge.hover",
                        style: {
                            width: 2,
                            "line-color": "#239df9"
                        }
                    },
                    {
                        selector: "edge:selected",
                        style: {
                            width: 1,
                            "line-color": "#239df9"
                        }
                    }
                ]}
                style={{ width: "100%", height: "100%" }}
                layout={{
                    name: "dagre",
                    padding: 24,
                    spacingFactor: 1.5
                }}
                zoomingEnabled={true}
                userZoomingEnabled={true}
                boxSelectionEnabled={true}
                ref={cyRef}
                cy={(cy) => {
                    cy.contextMenus(options);
                    collapseRef = cy.expandCollapse({
                        layoutBy: {
                            name: "dagre",
                            animate: "end",
                            randomize: false,
                            fit: false
                        },
                        fisheye: false,
                        animate: true,
                        undoable: false,
                        cueEnabled: true,
                        expandCollapseCuePosition: "top-left",
                        expandCollapseCueSize: 16,
                        expandCollapseCueLineSize: 24,
                        expandCueImage: ExpandMore,
                        collapseCueImage: ExpandLess,
                        expandCollapseCueSensitivity: 1,
                        edgeTypeInfo: "edgeType",
                        groupEdgesOfSameTypeOnCollapse: false,
                        allowNestedEdgeCollapse: true,
                        zIndex: 999
                    });

                    cy.nodeHtmlLabel([
                        {
                            query: ".groupIcon",
                            halign: "center",
                            valign: "center",
                            halignBox: "center",
                            valignBox: "center",
                            tpl: function (data) {
                                return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                                  <span class="group-graphic alarmSeverity-${data.alarmSeverity}">
                                    <i class="icon icon-group"></i>
                                    <span class="overlay"></span>
                                  </span>
                                  <span class="group-label">Group</span>
                                </div>`;
                            }
                        },
                        {
                            query: ".groupIcon.hover",
                            halign: "center",
                            valign: "center",
                            halignBox: "center",
                            valignBox: "center",
                            tpl: function (data) {
                                return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                                  <span class="group-graphic hover alarmSeverity-${data.alarmSeverity
                                    }">
                                    <i class="icon icon-group"></i>
                                    <span class="overlay"></span>
                                  </span>
                                  <span class="group-label">${data.displayName}</span>
                                </div>`;
                            }
                        },
                        {
                            query: ".groupIcon:selected",
                            halign: "center",
                            valign: "center",
                            halignBox: "center",
                            valignBox: "center",
                            tpl: function (data) {
                                return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                                  <span class="group-graphic selected alarmSeverity-${data.alarmSeverity
                                    }">
                                    <i class="icon icon-group"></i>
                                    <span class="overlay"></span>
                                  </span>
                                  <span class="group-label">${data.displayName}</span>
                                </div>`;
                            }
                        },
                        {
                            query: ".groupIcon.hover:selected",
                            halign: "center",
                            valign: "center",
                            halignBox: "center",
                            valignBox: "center",
                            tpl: function (data) {
                                return `<div class="group ${data.collapsedChildren ? "show" : "hide"}">
                                  <span class="group-graphic hover selected alarmSeverity-${data.alarmSeverity
                                    }">
                                    <i class="icon icon-group"></i>
                                    <span class="overlay"></span>
                                  </span>
                                  <span class="group-label">${data.displayName}</span>
                                </div>`;
                            }
                        },
                        {
                            query: ".nodeIcon",
                            halign: "center",
                            valign: "center",
                            halignBox: "center",
                            valignBox: "center",
                            tpl: function (data) {
                                return `<div class="element ${data._hidden}">
                                  <span class="element-severity_badge">
                                    <i class="icon icon-${data.alarmSeverity}" /></i>
                                  </span>
                                  <span class="element-pm_badge">
                                    <i class="icon icon-pm" /></i>
                                    <span>PM</span>
                                  </span>
                                  <span class="element-graphic operationalState-${data.operationalState}">
                                    <i class="icon icon-${data.kind}" /></i>
                                    <span class="overlay"></span>
                                  </span>
                                  <span title="${data.displayName}" class="element-label">${data.displayName}</span>
                                </div>`;
                            }
                        },
                        {
                            query: ".nodeIcon.hover",
                            halign: "center",
                            valign: "center",
                            halignBox: "center",
                            valignBox: "center",
                            tpl: function (data) {
                                return `<div class="element ${data._hidden}">
                                  <span class="element-severity_badge">
                                    <i class="icon icon-${data.alarmSeverity}" /></i>
                                  </span>
                                  <span class="element-pm_badge">
                                    <i class="icon icon-pm" /></i>
                                    <span>PM</span>
                                  </span>
                                  <span class="element-graphic hover operationalState-${data.operationalState}">
                                    <i class="icon icon-${data.kind} icon-hover" /></i>
                                    <span class="overlay"></span>
                                  </span>
                                  <span title="${data.displayName}" class="element-label">${data.displayName}</span>
                                </div>`;
                            }
                        },
                        {
                            query: ".nodeIcon:selected",
                            halign: "center",
                            valign: "center",
                            halignBox: "center",
                            valignBox: "center",
                            tpl: function (data) {
                                return `<div class="element ${data._hidden}">
                                  <span class="element-severity_badge">
                                    <i class="icon icon-${data.alarmSeverity}" /></i>
                                  </span>
                                  <span class="element-pm_badge">
                                    <i class="icon icon-pm" /></i>
                                    <span>PM</span>
                                  </span>
                                  <span class="element-graphic selected operationalState-${data.operationalState}">
                                    <i class="icon icon-${data.kind}" /></i>
                                    <span class="overlay"></span>  
                                  </span>
                                  <span title="${data.displayName}" class="element-label">${data.displayName}</span>
                                </div>`;
                            }
                        },
                        {
                            query: ".nodeIcon.hover:selected",
                            halign: "center",
                            valign: "center",
                            halignBox: "center",
                            valignBox: "center",
                            tpl: function (data) {
                                return `<div class="element ${data._hidden}">
                                  <span class="element-severity_badge">
                                    <i class="icon icon-${data.alarmSeverity}" /></i>
                                  </span>
                                  <span class="element-pm_badge">
                                    <i class="icon icon-pm" /></i>
                                    <span>PM</span>
                                  </span>
                                  <span class="element-graphic hover selected operationalState-${data.operationalState}">
                                    <i class="icon icon-${data.kind}" /></i>
                                    <span class="overlay"></span>
                                  </span>
                                  <span title="${data.displayName}" class="element-label">${data.displayName}</span>
                                </div>`;
                            }
                        }
                    ]);
                }}
            />
        </div>
    </div>
}