    display: flex;
    flex-direction: ${"bottom"===A.legend.placement?"column":"row"};
    height: 100%;
  `,diagramContainer:w.css`
    min-height: 65%;
    flex-grow: 1;
    overflow: scroll;
  `,legendContainer:w.css`
    padding: 10px 0;
    max-height: ${"bottom"===A.legend.placement?"35%":"none"};
  `})));class Z extends C().Component{static getDerivedStateFromProps(A,I){const{diagramContainer:g,wrapper:Q,legendContainer:C}=t(A);return I?null:{diagramContainer:g,wrapper:Q,legendContainer:C}}setDiagramRef(A){this.diagramRef=A}componentDidMount(){this.initVizGraph()}componentDidUpdate(A){A.options===this.props.options&&A.fieldConfig===this.props.fieldConfig&&A.theme===this.props.theme&&A.data===this.props.data||this.initVizGraph()}getRemoteDiagramDefinition(A){var I,g=this;return(I=function*(){const I=yield fetch(g.props.replaceVariables(A));return yield I.text()},function(){var A=this,g=arguments;return new Promise((function(Q,C){var B=I.apply(A,g);function E(A){J(B,Q,C,E,D,"next",A)}function D(A){J(B,Q,C,E,D,"throw",A)}E(void 0)}))})()}loadDiagramDefinition(){return this.props.options.contentUrl?this.getRemoteDiagramDefinition(this.props.options.contentUrl):Promise.resolve(this.props.options.content)}initVizGraph(){o({wasm:k()}).then((A=>new N(A))).then((A=>{this.diagramRef&&null==document.querySelector("#graph")&&this.loadDiagramDefinition().then((I=>{try{const g=A.renderSVGElement(I);g.id="graph",this.diagramRef.appendChild(g),Y()("#graph",{zoomEnabled:!0,controlIconsEnabled:!0})}catch(A){console.log(A),this.diagramRef.innerHTML=`<div><p>Error rendering diagram. Check the diagram definition</p><p>${A}</p></div>`}}))}))}onToggleSort(A){const{onOptionsChange:I,options:g}=this.props;I(H(a({},g),{legend:H(a({},g.legend),{sortBy:A,sortDesc:A===g.legend.sortBy&&!g.legend.sortDesc})}))}renderCallback(A,I){this&&I&&(console.log("binding diagram functions"),this.bindFunctions=I)}render(){return C().createElement("div",{className:`diagram-container diagram-container-${this.props.id}`&&this.state.wrapper},C().createElement("div",{ref:this.setDiagramRef,className:`diagram diagram-${this.props.id}`&&this.state.diagramContainer}),this.props.options.legend.show&&C().createElement("div",{className:this.state.legendContainer},C().createElement(E.CustomScrollbar,{hideHorizontalTrack:!0},C().createElement(S,{fallback:"Error rendering Legend"},C().createElement(E.VizLegend,{items:this.getLegendItems(),displayMode:this.props.options.legend.displayMode,placement:this.props.options.legend.placement,sortBy:this.props.options.legend.sortBy,sortDesc:this.props.options.legend.sortDesc,onLabelClick:(A,I)=>{},onToggleSort:this.onToggleSort})))))}constructor(A){super(A),c(this,"diagramRef",void 0),c(this,"bindFunctions",void 0),c(this,"legendStyles",{position:"absolute",bottom:0,width:"100%"}),c(this,"shouldHideLegendItem",((A,I=!1,g=!1)=>{const Q=0===A.reduce(((A,I)=>A+(I[1]||0)),0),C=!A.reduce(((A,I)=>A&&null!==I[1]),!0);return I&&C||g&&Q})),c(this,"getLegendItems",(()=>this.props.data.reduce(((A,I)=>this.shouldHideLegendItem(I.data,this.props.options.legend.hideEmpty,this.props.options.legend.hideZero)?A:A.concat([{label:I.label,color:"",disabled:!I.isVisible,yAxis:0,getDisplayValues:()=>I.info||[]}])),[]))),this.onToggleSort=this.onToggleSort.bind(this),this.setDiagramRef=this.setDiagramRef.bind(this),this.renderCallback=this.renderCallback.bind(this)}}function q(A,I,g){return I in A?Object.defineProperty(A,I,{value:g,enumerable:!0,configurable:!0,writable:!0}):A[I]=g,A}function d(A){for(var I=1;I<arguments.length;I++){var g=null!=arguments[I]?arguments[I]:{},Q=Object.keys(g);"function"==typeof Object.getOwnPropertySymbols&&(Q=Q.concat(Object.getOwnPropertySymbols(g).filter((function(A){return Object.getOwnPropertyDescriptor(g,A).enumerable})))),Q.forEach((function(I){q(A,I,g[I])}))}return A}function l(A,I){return I=null!=I?I:{},Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(I)):function(A,I){var g=Object.keys(A);if(Object.getOwnPropertySymbols){var Q=Object.getOwnPropertySymbols(A);g.push.apply(g,Q)}return g}(Object(I)).forEach((function(g){Object.defineProperty(A,g,Object.getOwnPropertyDescriptor(I,g))})),A}const n=(I,g)=>{if("string"!=typeof I)return"DATASOURCE_SENT_INVALID_METRIC_TARGET";let Q=I.replace(/"|,|;|=|:|{|}|\//g,"_");for(let I in g){const C=g[I];let B=C.replacementPattern;0!==B.toString().length&&("/"===B.toString()[0]&&(B=(0,A.stringToJsRegex)(C.replacementPattern.toString())),Q=Q.replace(B,C.replaceWithText))}return Q},r=["min","max","mean","last","sum"],W=(0,E.stylesFactory)((()=>({wrapper:w.css`
      position: relative;
    `}))),b={pluginVersion:"",nodeSize:{minWidth:30,minHeight:30},composites:[],metricCharacterReplacements:[],style:"",legend:{show:!1,stats:["mean","last","min","max","sum"],asTable:!0,hideEmpty:!1,hideZero:!1,placement:"bottom",displayMode:E.LegendDisplayMode.Table,sortBy:"last",sortDesc:!0,gradient:{enabled:!0,show:!0}},maxWidth:!0,moddedSeriesVal:0,valueName:"last",content:"digraph { a -> b }",mode:"content",useBasicAuth:!1,authUsername:"",authPassword:"",useBackground:!1},x=({value:A,onChange:I,context:g,item:B})=>{const[D,i]=(0,Q.useState)(null!=A?A:[]),w=()=>{I(D)};D||(i([]),w());const o=A=>C().createElement("div",null,C().createElement("hr",null),C().createElement("div",{className:"gf-form"},C().createElement("label",{className:"gf-form-label"},C().createElement("i",{className:"fa fa-trash pointer",onClick:()=>(A=>{D.splice(D.indexOf(A)),w()})(A)})),C().createElement("div",{className:"gf-form"},C().createElement("label",{className:"gf-form-label"},"Name")),C().createElement("div",{className:"gf-form"},C().createElement("input",{value:A.name,onChange:I=>((A,I)=>{I.name=A.currentTarget.value,w()})(I,A),type:"text",className:"gf-form-input width-15"}))),C().createElement("div",{className:"gf-form"},C().createElement(E.Checkbox,{value:A.showLowestValue,onChange:I=>((A,I)=>{I.showLowestValue=!I.showLowestValue,w()})(0,A),label:"Show lowest metric"})),C().createElement("div",null,(A=>A.members.map(((I,Q)=>{return C().createElement("div",{key:`${I}-${Q}`,className:"gf-form-inline"},C().createElement("div",{className:"gf-form"},C().createElement("label",{className:"gf-form-label"},C().createElement("i",{className:"fa fa-trash pointer",onClick:()=>((A,I)=>{A.members.splice(A.members.indexOf(I)),w()})(A,I)}))),C().createElement("div",{className:"gf-form"},C().createElement("select",{value:I,onChange:I=>((A,I,g)=>{g.members[I]=A.currentTarget.value,w()})(I,Q,A)},C().createElement("option",null),(B=I,null===(E=g.data)||void 0===E?void 0:E.map(((A,I)=>C().createElement("option",{key:`${A.name}-${I}`,selected:A.name===B,value:A.name},A.name)))))));var B,E})))(A)),C().createElement("div",{className:"gf-form"},C().createElement("button",{className:"btn btn-inverse gf-form-input",onClick:()=>(A=>{A.members.push(""),w()})(A)},C().createElement("i",{className:"fa fa-plus pointer"})," Add member to composite"))),G=D.map(((A,I)=>C().createElement("div",{key:`${A.name}-${I}`},o(A))));return C().createElement("div",{className:"gf-form-group"},C().createElement("div",{className:"edit-tab-content"},C().createElement("div",{className:"gf-form-group"},G),C().createElement("hr",null)),C().createElement("button",{className:"btn btn-inverse gf-form-input",onClick:()=>{D.push({name:"new-composite",members:[],valueName:"last",showLowestValue:!1}),w()}},C().createElement("i",{className:"fa fa-plus pointer"})," Add Composite"))},m=({})=>C().createElement("div",{className:"gf-form-group"},C().createElement("div",{className:"edit-tab-content"},C().createElement("div",{className:"gf-form"},C().createElement("button",{className:"btn btn-secondary gf-form-input",onClick:()=>{window.open("https://github.com/jdbranham/grafana-diagram/issues","_github")}},C().createElement("i",{className:"fa fa-help pointer"})," Community Support")),C().createElement("div",{className:"gf-form"},C().createElement("button",{className:"btn btn-primary gf-form-input",onClick:()=>{window.open("https://github.com/sponsors/jdbranham","_github")}},C().createElement("i",{className:"fa fa-help pointer"})," Sponsors")),C().createElement("div",{className:"gf-form"},C().createElement("button",{className:"btn btn-primary gf-form-input",onClick:()=>{window.open("https://patreon.com/savantly","_patreon")}},C().createElement("i",{className:"fa fa-help pointer"})," Vote for features")))),e=[{label:"mean",value:"mean",description:"Use the mean value of all datapoints"},{label:"min",value:"min",description:"Use the minimum datapoint value"},{label:"max",value:"max",description:"Use the maximum datapoint value"},{label:"sum",value:"sum",description:"Use the summation of all datapoints"},{label:"last",value:"last",description:"Use the last datapoint value"}],O=new A.PanelPlugin((({id:I,data:g,timeZone:Q,width:B,height:D,options:i,fieldConfig:o,replaceVariables:G,onOptionsChange:M,onChangeTimeRange:R})=>{const F=(0,E.useTheme2)(),h=W();if(!g)return C().createElement("div",{className:"panel-empty"},C().createElement("p",null,"No data found in response"));const s=((I,g,Q,C,B)=>{var E,D,i,w,o,G;const M=[],R=(0,A.getDisplayProcessor)({field:{config:{decimals:null===(D=B)||void 0===D||null===(E=D.defaults)||void 0===E?void 0:E.decimals,unit:null===(w=B)||void 0===w||null===(i=w.defaults)||void 0===i?void 0:i.unit,thresholds:null===(G=B)||void 0===G||null===(o=G.defaults)||void 0===o?void 0:o.thresholds}},theme:C,timeZone:g});let F=-1;for(const B of I){const{timeField:E}=(0,A.getTimeField)(B);if(E)for(const D of B.fields){if(D.type!==A.FieldType.number)continue;F++;const i=(0,A.getFlotPairs)({xField:E,yField:D,nullValueMode:A.NullValueMode.Null});if(i.length>0){const w=(0,A.reduceField)({field:D,reducers:r});let o=[];o=r.map((A=>l(d({},D.display?D.display(w[A]):R(w[A])),{title:A})));const G=(0,A.getSeriesTimeStep)(E),h=(0,A.hasMsResolution)(E);E.display=(0,A.getDisplayProcessor)({timeZone:g,field:l(d({},E),{type:E.type,config:{unit:"time:"+(h?"YYYY-MM-DD HH:mm:ss.SSS":"YYYY-MM-DD HH:mm:ss")}}),theme:C}),M.push({label:n((0,A.getFieldDisplayName)(D,B,I),Q.metricCharacterReplacements),data:i,info:o,isVisible:!0,seriesIndex:F,timeField:d({},E),valueField:d({},D),timeStep:G})}}}return M})(g.series,Q,i,F,o);return C().createElement("div",{className:(0,w.cx)(h.wrapper,w.css`
          width: ${B}px;
          height: ${D}px;
        `)},C().createElement(Z,{theme:F,id:I,data:s,timeZone:Q,width:B,height:D,options:i,fieldConfig:o,replaceVariables:G,onOptionsChange:M,onChangeTimeRange:R}))})).setMigrationHandler((A=>{const I=A.options||b;return I.pluginVersion=A.pluginVersion||"latest",I})).setPanelChangeHandler((A=>(A.options=b,A.options.pluginVersion=A.pluginVersion||"",A.options))).useFieldConfig({disableStandardOptions:[A.FieldConfigProperty.Min,A.FieldConfigProperty.Max,A.FieldConfigProperty.DisplayName,A.FieldConfigProperty.Links,A.FieldConfigProperty.Color],useCustomConfig:A=>{A.addSelect({name:"Value by",path:"valueName",description:"Use this reduction function on each series to determine the value of the metric indicator",defaultValue:b.valueName,category:["Indicator"],settings:{options:e}})}}).setPanelOptions((A=>(A.addBooleanSwitch({path:"useBackground",name:"Use shape background for metric indicator",defaultValue:b.useBackground}).addTextInput({name:"Diagram URL",path:"contentUrl",description:"Get the diagram definition from a URL"}).addTextInput({name:"Diagram definition",path:"content",description:"This area uses Viz.js syntax - https://viz-js.com/",defaultValue:b.content,settings:{rows:10,useTextarea:!0}}).addNumberInput({name:"Minimum text node width",path:"nodeSize.minWidth",defaultValue:b.nodeSize.minWidth,description:"The minimum width a matched diagram text node should be"}).addNumberInput({name:"Minimum text node height",path:"nodeSize.minHeight",defaultValue:b.nodeSize.minHeight,description:"The minimum height a matched diagram text node should be"}).addBooleanSwitch({name:"Show legend",path:"legend.show",description:"Show the legend",category:["Legend"],defaultValue:b.legend.show}).addCustomEditor({editor:x,id:"composites",path:"composites",name:"Composite metrics",category:["Composites"],description:"Combine series into a composite metric"}).addCustomEditor({editor:B,id:"metricCharacterReplacements",path:"metricCharacterReplacements",name:"Metric Character Replacements",category:["Advanced"],description:"Match/replace charactes in the metric name"}),A.addCustomEditor({editor:m,id:"support",path:"support",name:"Support",category:["Help"]}),A)))})(),i})()));
//# sourceMappingURL=module.js.map