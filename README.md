

## How to run this Graph View Task: 
* yarn install && yarn start
* In this example I used below library.
https://github.com/plotly/react-cytoscapejs
* Functionality covered : 
    1) Expand and collpase of gropus, 
    2) view details of nodes (to right click you will get)
    
## Graph-Library analysic for graph visulation

| Library | Open Source | Documentation| Github Open Issues & Stars | library link
| ------ | ------ | ------| -----| ----
| cytoscape.js| Yes | Great Documentation | 9 open issues & 9k stars | https://js.cytoscape.org/#introduction
| react-flow | No (Need to pay for commerical use | Greate Documentation | 69 open issues & 15K stars | https://github.com/wbkd/react-flow
| react-digraph | Yes | Not Good | 79 open issues & 2.5K stars | https://github.com/uber/react-digraph
| React graph vis | Yes | Average | 38 open issues & 800 stars | https://github.com/crubier/react-graph-vis


The reason I chose Cytoscape.js
 : 
-----
* It is pure js, we can have our own wrapper.
* It has great documentation.
* Lots of Extensions. they decoupled there moudules. current supported Extensions list -> https://js.cytoscape.org/#extensions/ui-extensions
* If we want some new feture we can create our own widgets/Extensions.
* These are the big companies using Cytoscape.js currently - > https://js.cytoscape.org/#introduction/who-uses-cytoscape.js
* There is one opensource React wrapper around cytoscape.js -> https://github.com/plotly/react-cytoscapejs


