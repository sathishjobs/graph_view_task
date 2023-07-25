import cytoscape from 'cytoscape';
import degre from "cytoscape-dagre";
import nodeHtmlLabel from "cytoscape-node-html-label";
import expandCollapse from "cytoscape-expand-collapse";
import contextMenus from 'cytoscape-context-menus';
import navigator from "cytoscape-navigator"

export function GraphViewMiddleWare(){
    cytoscape.use(degre)
    if (typeof cytoscape("core", "expandCollapse") === "undefined") {
        expandCollapse(cytoscape);
    }
    if (typeof cytoscape("core", "nodeHtmlLabel") === "undefined") {
        nodeHtmlLabel(cytoscape);
    }
    if (typeof cytoscape("core", "contextMenus") === "undefined") {
        contextMenus(cytoscape);
    }
    if (typeof cytoscape("core", "navigator") === "undefined") {
        navigator(cytoscape);
    }
}


export const options = {
    evtType: "cxttap",
    menuItems: [
        {
            id: "details",
            content: "View Details...",
            tooltipText: "View Details",
            selector: "node, edge",
            onClickFunction: function (...event) {
                alert("View Details Clicked")
            },
            hasTrailingDivider: true,
            // coreAsWell:true
        },
        {
            id: "generateReport",
            content: "Generate Report",
            selector: "node, edge",
            onClickFunction: function (event) {
                alert("Generate Report Clicked")
            },
            hasTrailingDivider: true
        }
    ],
    menuItemClasses: ["custom-menu-item", "custom-menu-item:hover"],
    contextMenuClasses: ["custom-context-menu"]
};