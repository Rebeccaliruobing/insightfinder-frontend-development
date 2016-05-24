webpackJsonp([0],{

/***/ 0:
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';__webpack_require__(/*! ./app.less */ 12);var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _reactDom=__webpack_require__(/*! react-dom */ 47);var _reactDom2=_interopRequireDefault(_reactDom);var _reactRouter=__webpack_require__(/*! react-router */ 182);var _react3=__webpack_require__(/*! ./artui/react */ 243);var _cloud=__webpack_require__(/*! ./components/cloud */ 262);var _settings=__webpack_require__(/*! ./components/settings */ 452);__webpack_require__(/*! ./apis */ 454);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var APPID='app';var EmptyContent=function EmptyContent(props){return _react2.default.createElement(_react3.Console.Content,{style:{height:1000}},'Hello Insightfinder!');};var App=function App(props){return _react2.default.createElement(_react3.Console,null,_react2.default.createElement(_react3.Console.Topbar,{logo:__webpack_require__(/*! ./images/logo.png */ 455)},_react2.default.createElement(_react3.Link,{to:'/cloud',className:'item'},'Cloud Monitoring'),_react2.default.createElement(_react3.Link,{to:'/settings',className:'item'},'Project Settings'),_react2.default.createElement(_react3.Link,{to:'/file',className:'item'},'File Analysis'),_react2.default.createElement('div',{className:'right menu'},_react2.default.createElement('div',{className:'ui right simple dropdown item'},_react2.default.createElement('i',{className:'user icon circular teal inverted'}),'Guest',_react2.default.createElement('i',{className:'dropdown icon'}),_react2.default.createElement('div',{className:'menu'},_react2.default.createElement('div',{className:'item'},_react2.default.createElement('i',{className:'icon power'}),'Logout'))))),props.children);};$('body').prepend($('<div id=\''+APPID+'\'></div>'));var appBody=document.querySelector('#'+APPID);if(appBody){_reactDom2.default.render(_react2.default.createElement(_reactRouter.Router,{history:_reactRouter.hashHistory},_react2.default.createElement(_reactRouter.Route,{component:App,path:'/'},_react2.default.createElement(_reactRouter.IndexRedirect,{to:'/cloud'}),_cloud.routes,_react2.default.createElement(_reactRouter.Route,{component:_settings.Settings,path:'settings'},_react2.default.createElement(_reactRouter.IndexRoute,{component:EmptyContent})))),appBody);}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 11)))

/***/ },

/***/ 12:
/*!******************!*\
  !*** ./app.less ***!
  \******************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 262:
/*!***********************************!*\
  !*** ./components/cloud/index.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.routes=exports.Cloud=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _react3=__webpack_require__(/*! ../../artui/react */ 243);var _reactRouter=__webpack_require__(/*! react-router */ 182);var _navbar=__webpack_require__(/*! ./navbar */ 263);var _navbar2=_interopRequireDefault(_navbar);var _monitoring=__webpack_require__(/*! ./monitoring */ 264);var _monitoring2=_interopRequireDefault(_monitoring);var _outlierDetection=__webpack_require__(/*! ./outlier-detection */ 274);var _outlierDetection2=_interopRequireDefault(_outlierDetection);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Cloud=exports.Cloud=function(_React$Component){_inherits(Cloud,_React$Component);function Cloud(){_classCallCheck(this,Cloud);return _possibleConstructorReturn(this,Object.getPrototypeOf(Cloud).apply(this,arguments));}_createClass(Cloud,[{key:'render',value:function render(){return _react2.default.createElement(_react3.Console.Wrapper,null,_react2.default.createElement(_navbar2.default,null),this.props.children);}}]);return Cloud;}(_react2.default.Component);var routes=exports.routes=_react2.default.createElement(_reactRouter.Route,{component:Cloud,path:'cloud'},_react2.default.createElement(_reactRouter.IndexRedirect,{to:'monitoring'}),_react2.default.createElement(_reactRouter.Route,{component:_monitoring2.default,path:'monitoring'}),_react2.default.createElement(_reactRouter.Route,{component:_outlierDetection2.default,path:'outlier'}));

/***/ },

/***/ 273:
/*!************************************************!*\
  !*** ./components/cloud/monitoring/details.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _jquery=__webpack_require__(/*! jquery */ 11);var _jquery2=_interopRequireDefault(_jquery);var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__(/*! classnames */ 247);var _classnames2=_interopRequireDefault(_classnames);var _react3=__webpack_require__(/*! ../../../artui/react */ 243);var _dataviz=__webpack_require__(/*! ../../../artui/react/dataviz */ 267);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ProjectDetails=function(_React$Component){_inherits(ProjectDetails,_React$Component);function ProjectDetails(props){_classCallCheck(this,ProjectDetails);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(ProjectDetails).call(this,props));_this.state={summary:[[]]};return _this;}_createClass(ProjectDetails,[{key:'componentDidMount',value:function componentDidMount(){}},{key:'componentDidUpdate',value:function componentDidUpdate(){}},{key:'componentWillUnmount',value:function componentWillUnmount(){}},{key:'render',value:function render(){var project=this.props.project;return _react2.default.createElement('div',{className:'ui vertical segment'},_react2.default.createElement('h4',{className:'ui header'},project),_react2.default.createElement('div',{className:'ui grid'},_react2.default.createElement('div',{className:'twelve wide column'},_react2.default.createElement(_react3.Accordion,null,_react2.default.createElement('div',{className:'title active'},_react2.default.createElement('i',{className:'dropdown icon'}),'Summary'),_react2.default.createElement('div',{className:'content active'},_react2.default.createElement(_dataviz.Dygraph,{data:[[1,10],[2,20],[3,50],[4,70]],labels:['x','y'],style:{height:150}}))),_react2.default.createElement(_react3.Accordion,null,_react2.default.createElement('div',{className:'title active'},_react2.default.createElement('i',{className:'dropdown icon'}),'Network Group1'),_react2.default.createElement('div',{className:'content active'},_react2.default.createElement(_dataviz.Dygraph,{data:[[1,10],[2,20],[3,50],[4,70]],labels:['x','y'],style:{height:150}}))),_react2.default.createElement(_react3.Accordion,null,_react2.default.createElement('div',{className:'title active'},_react2.default.createElement('i',{className:'dropdown icon'}),'Network Group2'),_react2.default.createElement('div',{className:'content active'},_react2.default.createElement(_dataviz.Dygraph,{data:[[1,10],[2,20],[3,50],[4,70]],labels:['x','y'],style:{height:150}}))),_react2.default.createElement(_react3.Accordion,null,_react2.default.createElement('div',{className:'title active'},_react2.default.createElement('i',{className:'dropdown icon'}),'Network Group3'),_react2.default.createElement('div',{className:'content active'},_react2.default.createElement(_dataviz.Dygraph,{data:[[1,10],[2,20],[3,50],[4,70]],labels:['x','y'],style:{height:150}})))),_react2.default.createElement('div',{className:'four wide column'},_react2.default.createElement(_react3.Accordion,{className:'ui styled fluid accordion',exclusive:true},_react2.default.createElement('div',{className:'title'},_react2.default.createElement('i',{className:'dropdown icon'}),'A: CPU usuage'),_react2.default.createElement('div',{className:'content'},_react2.default.createElement('div',{className:'ui threaded comments'},_react2.default.createElement('div',{className:'comment'},_react2.default.createElement('div',{className:'content'},_react2.default.createElement('a',{className:'author'},'Matt'),_react2.default.createElement('div',{className:'metadata'},_react2.default.createElement('span',{className:'date'},'Today at 5:42PM')),_react2.default.createElement('div',{className:'text'},'Do something!'))),_react2.default.createElement('div',{className:'comment'},_react2.default.createElement('div',{className:'content'},_react2.default.createElement('a',{className:'author'},'Jacob'),_react2.default.createElement('div',{className:'metadata'},_react2.default.createElement('span',{className:'date'},'Today at 6:02PM')),_react2.default.createElement('div',{className:'text'},'Fixed!'))),_react2.default.createElement('form',{className:'ui reply form'},_react2.default.createElement('div',{className:'field'},_react2.default.createElement('textarea',{rows:'3'})),_react2.default.createElement('div',{className:'ui blue labeled submit icon button'},_react2.default.createElement('i',{className:'icon edit'}),' Add Reply')))),_react2.default.createElement('div',{className:'title'},_react2.default.createElement('i',{className:'dropdown icon'}),'B: Network'),_react2.default.createElement('div',{className:'content'},_react2.default.createElement('div',{className:'ui threaded comments'},_react2.default.createElement('div',{className:'comment'},_react2.default.createElement('div',{className:'content'},_react2.default.createElement('a',{className:'author'},'Matt'),_react2.default.createElement('div',{className:'metadata'},_react2.default.createElement('span',{className:'date'},'Today at 5:42PM')),_react2.default.createElement('div',{className:'text'},'Do something!'))),_react2.default.createElement('form',{className:'ui reply form'},_react2.default.createElement('div',{className:'field'},_react2.default.createElement('textarea',{rows:'3'})),_react2.default.createElement('div',{className:'ui blue labeled submit icon button'},_react2.default.createElement('i',{className:'icon edit'}),' Add Reply'))))))));}}]);return ProjectDetails;}(_react2.default.Component);exports.default=ProjectDetails;

/***/ },

/***/ 264:
/*!**********************************************!*\
  !*** ./components/cloud/monitoring/index.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _reactRouter=__webpack_require__(/*! react-router */ 182);var _react3=__webpack_require__(/*! ../../../artui/react */ 243);var _selections=__webpack_require__(/*! ../../selections */ 265);var _summary=__webpack_require__(/*! ./summary */ 266);var _summary2=_interopRequireDefault(_summary);var _metric=__webpack_require__(/*! ./metric */ 272);var _metric2=_interopRequireDefault(_metric);var _details=__webpack_require__(/*! ./details */ 273);var _details2=_interopRequireDefault(_details);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var LiveMonitoring=function(_React$Component){_inherits(LiveMonitoring,_React$Component);function LiveMonitoring(props){_classCallCheck(this,LiveMonitoring);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(LiveMonitoring).call(this,props));_this._el=null;_this.state={view:'chart',showAddPanel:false,addedName:'',addedProjects:['app2AWS','appWestAWS'],detailedProject:''};_this.handleAddMonitoring.bind(_this);return _this;}_createClass(LiveMonitoring,[{key:'componentDidMount',value:function componentDidMount(){$.api({action:'liveAnalysis',method:'POST',on:'now',beforeSend:function beforeSend(settings){settings.data={'pvalue':'','cvalue':'','modelType':''};return settings;},onSuccess:function onSuccess(resp){alert(resp);},onError:function onError(error){alert(error);}});}},{key:'handleAddMonitoring',value:function handleAddMonitoring(){var _state=this.state;var addedProjects=_state.addedProjects;var addedName=_state.addedName;addedProjects.push(addedName);this.setState({'addedProjects':addedProjects});}},{key:'render',value:function render(){var _this2=this;var _state2=this.state;var view=_state2.view;var showAddPanel=_state2.showAddPanel;var addedProjects=_state2.addedProjects;var detailedProject=_state2.detailedProject;return _react2.default.createElement(_react3.Console.Content,null,_react2.default.createElement('div',{className:'ui main tiny container',ref:function ref(c){return _this2._el=c;}},_react2.default.createElement('div',{className:'ui clearing vertical segment'},_react2.default.createElement('div',{className:'ui breadcrumb'},_react2.default.createElement(_reactRouter.IndexLink,{to:'/',className:'section'},'Home'),_react2.default.createElement('i',{className:'right angle icon divider'}),_react2.default.createElement(_reactRouter.Link,{to:'/cloud/monitoring',className:'section'},'Cloud Monitoring'),_react2.default.createElement('i',{className:'right angle icon divider'}),_react2.default.createElement('div',{className:'active section'},'Live Monitoring')),_react2.default.createElement(_react3.ButtonGroup,{className:'right floated basic icon'},_react2.default.createElement(_react3.Button,null,_react2.default.createElement('i',{className:'add icon',onClick:function onClick(){return _this2.setState({showAddPanel:true});}})),_react2.default.createElement(_react3.Button,null,_react2.default.createElement('i',{className:'setting icon'}))),_react2.default.createElement(_react3.ButtonGroup,{className:'right floated basic icon'},_react2.default.createElement(_react3.Button,{active:view=='chart',onClick:function onClick(){return _this2.setState({view:'chart'});}},_react2.default.createElement('i',{className:'line chart icon'})),_react2.default.createElement(_react3.Button,{active:view=='table',onClick:function onClick(){return _this2.setState({view:'table'});}},_react2.default.createElement('i',{className:'table icon'})))),showAddPanel&&_react2.default.createElement('div',{className:'ui vertical segment'},_react2.default.createElement('label',null,'Projects '),_react2.default.createElement(_selections.ProjectSelection,{onChange:function onChange(value,text){_this2.setState({addedName:text});}}),_react2.default.createElement('span',null,'Model Type '),_react2.default.createElement(_selections.ModelType,null),_react2.default.createElement('span',null,'Anomaly Threshold '),_react2.default.createElement(_selections.AnomalyThreshold,null),_react2.default.createElement('span',null,'Duration Threshold (minute) '),_react2.default.createElement(_selections.DurationThreshold,null),_react2.default.createElement(_react3.Button,{className:'orange',onClick:this.handleAddMonitoring.bind(this)},'Add'),_react2.default.createElement(_react3.Button,{className:'orange'},'Add & Save'),_react2.default.createElement('i',{className:'close link icon',style:{float:'right'},onClick:function onClick(){return _this2.setState({showAddPanel:false});}})),view=='chart'&&_react2.default.createElement(_summary2.default,{projects:addedProjects,onProjectSelected:function onProjectSelected(project){return _this2.setState({detailedProject:project});}}),view=='table'&&_react2.default.createElement(_metric2.default,{projects:addedProjects,onProjectSelected:function onProjectSelected(project){return _this2.setState({detailedProject:project});}}),!!detailedProject&&_react2.default.createElement(_details2.default,{project:detailedProject})));}}]);return LiveMonitoring;}(_react2.default.Component);exports.default=LiveMonitoring;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 11)))

/***/ },

/***/ 272:
/*!***********************************************!*\
  !*** ./components/cloud/monitoring/metric.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__(/*! classnames */ 247);var _classnames2=_interopRequireDefault(_classnames);var _react3=__webpack_require__(/*! ../../../artui/react */ 243);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ProjectMetric=function(_BaseComponent){_inherits(ProjectMetric,_BaseComponent);function ProjectMetric(props){_classCallCheck(this,ProjectMetric);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(ProjectMetric).call(this,props));_this.projectData=[{name:'i-8c48fa0c',cpu:[0.00,0.334,0.0375,0.0331],diskReadOps:[0.00,0.0,0.0,0.0],diskWriteOps:[0.00,0.0,0.0,0.0],networkIn:[0.00,0.0,0.0,0.0],networkOut:[0.00,0.0,0.0,0.0],diskReadBytes:[0.00,0.0,0.0,0.0],diskWriteBytes:[0.00,0.0,0.0,0.0]},{name:'i-fdb1a64e',cpu:[0.00,0.334,0.0375,0.0331],diskReadOps:[0.00,0.0,0.0,0.0],diskWriteOps:[0.00,0.0,0.0,0.0],networkIn:[0.00,0.0,0.0,0.0],networkOut:[0.00,0.0,0.0,0.0],diskReadBytes:[0.00,0.0,0.0,0.0],diskWriteBytes:[0.00,0.0,0.0,0.0]}];_this.state={};return _this;}_createClass(ProjectMetric,[{key:'renderRow',value:function renderRow(instance){return [_react2.default.createElement('td',{key:'inst'},instance.name),_react2.default.createElement('td',{key:'cpu_min'},instance.cpu[0]),_react2.default.createElement('td',{key:'cpu_max'},instance.cpu[1]),_react2.default.createElement('td',{key:'cpu_avg'},instance.cpu[2]),_react2.default.createElement('td',{key:'cpu_std'},instance.cpu[3]),_react2.default.createElement('td',{key:'disk_read_ops_min',className:'negative'},instance.diskReadOps[0]),_react2.default.createElement('td',{key:'disk_read_ops_max'},instance.diskReadOps[1]),_react2.default.createElement('td',{key:'disk_read_ops_avg'},instance.diskReadOps[2]),_react2.default.createElement('td',{key:'disk_read_ops_std'},instance.diskReadOps[3]),_react2.default.createElement('td',{key:'disk_write_ops_min'},instance.diskWriteOps[0]),_react2.default.createElement('td',{key:'disk_write_ops_max'},instance.diskWriteOps[1]),_react2.default.createElement('td',{key:'disk_write_ops_avg'},instance.diskWriteOps[2]),_react2.default.createElement('td',{key:'disk_write_ops_std'},instance.diskWriteOps[3]),_react2.default.createElement('td',{key:'network_in_min',className:'warning'},instance.networkIn[0]),_react2.default.createElement('td',{key:'network_in_max'},instance.networkIn[1]),_react2.default.createElement('td',{key:'network_in_avg'},instance.networkIn[2]),_react2.default.createElement('td',{key:'network_in_std'},instance.networkIn[3]),_react2.default.createElement('td',{key:'network_out_min'},instance.networkOut[0]),_react2.default.createElement('td',{key:'network_out_max'},instance.networkOut[1]),_react2.default.createElement('td',{key:'network_out_avg'},instance.networkOut[2]),_react2.default.createElement('td',{key:'network_out_std'},instance.networkOut[3]),_react2.default.createElement('td',{key:'disk_read_bytes_min'},instance.diskReadBytes[0]),_react2.default.createElement('td',{key:'disk_read_bytes_max'},instance.diskReadBytes[1]),_react2.default.createElement('td',{key:'disk_read_bytes_avg'},instance.diskReadBytes[2]),_react2.default.createElement('td',{key:'disk_read_bytes_std'},instance.diskReadBytes[3]),_react2.default.createElement('td',{key:'disk_write_bytes_min'},instance.diskWriteBytes[0]),_react2.default.createElement('td',{key:'disk_write_bytes_max'},instance.diskWriteBytes[1]),_react2.default.createElement('td',{key:'disk_write_bytes_avg'},instance.diskWriteBytes[2]),_react2.default.createElement('td',{key:'disk_write_bytes_std'},instance.diskWriteBytes[3])];}},{key:'renderRows',value:function renderRows(){var _this2=this;var projects=this.props.projects;var rows=[];projects.map(function(project,index){var instances=_this2.projectData;if(instances.length>0){rows.push(_react2.default.createElement('tr',{key:project+'_'+instances[0].name},_react2.default.createElement('td',{rowSpan:instances.length},project),_this2.renderRow(instances[0])));for(var i=1;i<instances.length;++i){rows.push(_react2.default.createElement('tr',{key:project+'_'+instances[i].name},_this2.renderRow(instances[i])));}}});return rows;}},{key:'render',value:function render(){return _react2.default.createElement('div',{className:'ui vertical segment'},_react2.default.createElement(_react3.Table,{className:'selectable single line striped celled structured'},_react2.default.createElement('thead',null,_react2.default.createElement('tr',null,_react2.default.createElement('th',{rowSpan:'2'},'Project'),_react2.default.createElement('th',{rowSpan:'2'},'Instance'),_react2.default.createElement('th',{colSpan:'4'},'CPU Utilization (%)'),_react2.default.createElement('th',{colSpan:'4'},'Disk Read Ops'),_react2.default.createElement('th',{colSpan:'4'},'Disk Write Ops'),_react2.default.createElement('th',{colSpan:'4'},'Network In (bytes)'),_react2.default.createElement('th',{colSpan:'4'},'Network Out (bytes)'),_react2.default.createElement('th',{colSpan:'4'},'Disk Read Bytes'),_react2.default.createElement('th',{colSpan:'4'},'Disk Write Bytes')),_react2.default.createElement('tr',null,_react2.default.createElement('th',null,'Min'),_react2.default.createElement('th',null,'Max'),_react2.default.createElement('th',null,'Avg'),_react2.default.createElement('th',null,'Std'),_react2.default.createElement('th',null,'Min'),_react2.default.createElement('th',null,'Max'),_react2.default.createElement('th',null,'Avg'),_react2.default.createElement('th',null,'Std'),_react2.default.createElement('th',null,'Min'),_react2.default.createElement('th',null,'Max'),_react2.default.createElement('th',null,'Avg'),_react2.default.createElement('th',null,'Std'),_react2.default.createElement('th',null,'Min'),_react2.default.createElement('th',null,'Max'),_react2.default.createElement('th',null,'Avg'),_react2.default.createElement('th',null,'Std'),_react2.default.createElement('th',null,'Min'),_react2.default.createElement('th',null,'Max'),_react2.default.createElement('th',null,'Avg'),_react2.default.createElement('th',null,'Std'),_react2.default.createElement('th',null,'Min'),_react2.default.createElement('th',null,'Max'),_react2.default.createElement('th',null,'Avg'),_react2.default.createElement('th',null,'Std'),_react2.default.createElement('th',null,'Min'),_react2.default.createElement('th',null,'Max'),_react2.default.createElement('th',null,'Avg'),_react2.default.createElement('th',null,'Std'))),_react2.default.createElement('tbody',null,this.renderRows())));}}]);return ProjectMetric;}(_react3.BaseComponent);ProjectMetric.propTypes={};ProjectMetric.defaultProps={};exports.default=ProjectMetric;

/***/ },

/***/ 266:
/*!************************************************!*\
  !*** ./components/cloud/monitoring/summary.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__(/*! classnames */ 247);var _classnames2=_interopRequireDefault(_classnames);var _react3=__webpack_require__(/*! ../../../artui/react */ 243);var _dataviz=__webpack_require__(/*! ../../../artui/react/dataviz */ 267);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ProjectsSummary=function(_BaseComponent){_inherits(ProjectsSummary,_BaseComponent);function ProjectsSummary(props){_classCallCheck(this,ProjectsSummary);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(ProjectsSummary).call(this,props));_this.projectData=[[1,0.1],[2,0.2],[3,0.43],[4,0.33],[5,0.13],[6,0.03],[7,0.03],[8,0.03],[9,0.13]];_this.annotations=[{series:'y',x:6,shortText:'L',text:'test'}];return _this;}_createClass(ProjectsSummary,[{key:'componentDidMount',value:function componentDidMount(){}},{key:'componentDidUpdate',value:function componentDidUpdate(){}},{key:'componentWillUnmount',value:function componentWillUnmount(){}},{key:'handleClick',value:function handleClick(project){var _this2=this;return function(){_this2.props.onProjectSelected(project);};}},{key:'renderCards',value:function renderCards(){var _this3=this;var projects=this.props.projects;var elems=[];projects.map(function(project,index){elems.push(_react2.default.createElement('div',{key:project,className:'ui card',onClick:_this3.handleClick(project)},_react2.default.createElement('div',{className:'content'},_react2.default.createElement('div',{className:'header'},project),_react2.default.createElement('div',{className:'meta'},_react2.default.createElement('span',null,'Holistic'),_react2.default.createElement('span',null,'0.97'),_react2.default.createElement('span',null,'5 mins')),_react2.default.createElement(_dataviz.Dygraph,{data:_this3.projectData,labels:['x','y'],annotations:_this3.annotations,style:{height:120}}))));});return elems;}},{key:'render',value:function render(){return _react2.default.createElement('div',{className:'ui vertical segment'},_react2.default.createElement('div',{className:'ui four cards'},this.renderCards()));}}]);return ProjectsSummary;}(_react3.BaseComponent);ProjectsSummary.propTypes={};ProjectsSummary.defaultProps={};exports.default=ProjectsSummary;

/***/ },

/***/ 263:
/*!************************************!*\
  !*** ./components/cloud/navbar.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default=function(props){return _react2.default.createElement(_react3.Console.Navbar,null,_react2.default.createElement(_react3.Accordion,{className:'ui vertical fluid secondary inverted pointing accordion menu'},_react2.default.createElement('div',{className:'item'},_react2.default.createElement('a',{className:'active title'},_react2.default.createElement('i',{className:'dropdown icon'}),'Monitoring'),_react2.default.createElement('div',{className:'active content menu'},_react2.default.createElement(_react3.Link,{to:'/cloud/monitoring',className:'item'},'Live Monitoring'),_react2.default.createElement(_react3.Link,{to:'/cloud/incident',className:'item'},'Incident Analysis'),_react2.default.createElement(_react3.Link,{to:'/cloud/outlier',className:'item'},'Cluster Outlier Detection'),_react2.default.createElement(_react3.Link,{to:'/cloud/rollout',className:'item'},'Software Rollout Check'),_react2.default.createElement(_react3.Link,{to:'/cloud/summary',className:'item'},'Summary Report'),_react2.default.createElement(_react3.Link,{to:'/cloud/display',className:'item'},'Display Model'))),_react2.default.createElement('div',{className:'item'},_react2.default.createElement('a',{className:'active title'},_react2.default.createElement('i',{className:'dropdown icon'}),'Project Management'),_react2.default.createElement('div',{className:'active content menu'},_react2.default.createElement(_react3.Link,{to:'/cloud/newproject',className:'item'},'Register Project'),_react2.default.createElement(_react3.Link,{to:'/cloud/removeproject',className:'item'},'Remove Project')))));};var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _react3=__webpack_require__(/*! ../../artui/react */ 243);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

/***/ },

/***/ 274:
/*!*****************************************************!*\
  !*** ./components/cloud/outlier-detection/index.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(moment, $, ReactDOM, _) {'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _reactRouter=__webpack_require__(/*! react-router */ 182);var _datetimepicker=__webpack_require__(/*! ../../ui/datetimepicker */ 379);var _datetimepicker2=_interopRequireDefault(_datetimepicker);var _rcSlider=__webpack_require__(/*! ../../ui/rc-slider */ 386);var _rcSlider2=_interopRequireDefault(_rcSlider);var _HeatMap=__webpack_require__(/*! ../../ui/graph/HeatMap */ 446);var _HeatMap2=_interopRequireDefault(_HeatMap);var _react3=__webpack_require__(/*! ../../../artui/react */ 243);var _selections=__webpack_require__(/*! ../../selections */ 265);var _OutlierDetection=__webpack_require__(/*! ../../../mock/cloud/OutlierDetection.json */ 451);var _OutlierDetection2=_interopRequireDefault(_OutlierDetection);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var OutlierDetection=function(_Component){_inherits(OutlierDetection,_Component);function OutlierDetection(props){_classCallCheck(this,OutlierDetection);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(OutlierDetection).call(this,props));var weeks=1;_this.state={view:'chart',dateIndex:0,timeIndex:0,params:{showAddPanel:false,projects:[],weeks:weeks,endTime:moment(new Date()).toDate(),startTime:moment(new Date()).add(-7*weeks,'days')}};return _this;}_createClass(OutlierDetection,[{key:'componentDidMount',value:function componentDidMount(){this.setHeatMap(0,0);}},{key:'setHeatMap',value:function setHeatMap(){var dateIndex=arguments.length<=0||arguments[0]===undefined?0:arguments[0];var timeIndex=arguments.length<=1||arguments[1]===undefined?0:arguments[1];var dataArray=[];_OutlierDetection2.default.data[dateIndex].mapData.NASValues.forEach(function(line,index){var lineArray=line.split(",");var colIndex=lineArray.splice(0,1);dataArray.push({colIndex:colIndex%32,rowIndex:parseInt(index/32),value:lineArray[lineArray.length-2]});});this.setState({heatMap:_react2.default.createElement('div',{className:'ui card'},_react2.default.createElement('div',{className:'image'},_react2.default.createElement(_HeatMap2.default,{duration:300,itemSize:6,data:dataArray})),_react2.default.createElement('div',{className:'content'},_react2.default.createElement('div',{className:'meta'},_react2.default.createElement('span',{className:'date'},moment(_OutlierDetection2.default.data[dateIndex].startTime).format('YYYY-MM-DD HH:mm')))))});}},{key:'handleAddMonitoring',value:function handleAddMonitoring(){}},{key:'handleEndTimeChange',value:function handleEndTimeChange(endTime){var startTime=void 0,params=this.state.params;startTime=moment(endTime).add(-7*params.weeks,'days').toDate();params=Object.assign({},params,{startTime:startTime,endTime:endTime});this.setState({params:params});}},{key:'handleWeeksChange',value:function handleWeeksChange(v){var _this2=this;this.setState({params:Object.assign({},this.state.params,{weeks:v})},function(){_this2.handleEndTimeChange(_this2.state.params.endTime);});}},{key:'handleDateIndexChange',value:function handleDateIndexChange(value){var _this3=this;this.setState({dateIndex:parseInt(value)},function(){_this3.setHeatMap(_this3.state.dateIndex,_this3.state.timeIndex);});}},{key:'handleToggleFilterPanel',value:function handleToggleFilterPanel(){var _this4=this;this.setState({showAddPanel:!this.state.showAddPanel},function(){_this4.state.showAddPanel?_this4.$filterPanel.slideDown():_this4.$filterPanel.slideUp();});}},{key:'render',value:function render(){var _this5=this;var _state=this.state;var view=_state.view;var showAddPanel=_state.showAddPanel;var params=_state.params;return _react2.default.createElement(_react3.Console.Content,null,_react2.default.createElement('div',{className:'ui main tiny container',ref:function ref(c){return _this5._el=c;}},_react2.default.createElement('div',{className:'ui clearing vertical segment'},_react2.default.createElement('div',{className:'ui breadcrumb'},_react2.default.createElement(_reactRouter.IndexLink,{to:'/',className:'section'},'Home'),_react2.default.createElement('i',{className:'right angle icon divider'}),_react2.default.createElement(_reactRouter.Link,{to:'/cloud/monitoring',className:'section'},'Cloud Monitoring'),_react2.default.createElement('i',{className:'right angle icon divider'}),_react2.default.createElement('div',{className:'active section'},'Outlier Detection')),_react2.default.createElement(_react3.ButtonGroup,{className:'right floated basic icon'},_react2.default.createElement(_react3.Button,{onClick:this.handleToggleFilterPanel.bind(this)},_react2.default.createElement('i',{className:'ellipsis horizontal icon'})),_react2.default.createElement(_react3.Button,null,_react2.default.createElement('i',{className:'setting icon'}))),_react2.default.createElement(_react3.ButtonGroup,{className:'right floated basic icon'},_react2.default.createElement(_react3.Button,{active:view=='chart',onClick:function onClick(){return _this5.setState({view:'chart'});}},_react2.default.createElement('i',{className:'line chart icon'})),_react2.default.createElement(_react3.Button,{active:view=='table',onClick:function onClick(){return _this5.setState({view:'table'});}},_react2.default.createElement('i',{className:'table icon'})))),_react2.default.createElement('div',{className:'ui vertical segment filterPanel',style:{display:'none'},ref:function ref(c){return _this5.$filterPanel=$(ReactDOM.findDOMNode(c));}},_react2.default.createElement('label',null,'Projects'),_react2.default.createElement(_selections.ProjectSelection,{onChange:function onChange(value,text){_this5.setState({addedName:text});}}),_react2.default.createElement('label',null,'Start Time'),_react2.default.createElement('div',{className:'ui input'},_react2.default.createElement(_datetimepicker2.default,{dateTimeFormat:'YYYY-MM-DD HH:mm',value:params.startTime,disabled:true})),_react2.default.createElement('label',null,'End Time'),_react2.default.createElement('div',{className:'ui input'},_react2.default.createElement(_datetimepicker2.default,{dateTimeFormat:'YYYY-MM-DD HH:mm',value:params.endTime,onChange:this.handleEndTimeChange.bind(this)})),_react2.default.createElement('label',null,'Window (Week)'),_react2.default.createElement(_selections.WindowWithWeek,{value:params.weeks,onChange:this.handleWeeksChange.bind(this)}),_react2.default.createElement(_react3.Button,{className:'orange',onClick:this.handleAddMonitoring.bind(this)},'Add'),_react2.default.createElement(_react3.Button,{className:'orange'},'Add & Save'),_react2.default.createElement('i',{className:'close link icon',style:{float:'right'},onClick:this.handleToggleFilterPanel.bind(this)}),_react2.default.createElement('div',{className:'ui success message'},_react2.default.createElement('ol',null,_react2.default.createElement('li',null,_react2.default.createElement('span',{className:'bold'},'Project Name:'),'nickname of your cloud project.'),_react2.default.createElement('li',null,_react2.default.createElement('span',{className:'bold'},'Start time/end time/window:'),'models falling into user specified window are loaded.'),_react2.default.createElement('li',null,'Review heat maps modeling the behavior of each instance.')))),_react2.default.createElement('div',{className:'ui vertical segment'},_react2.default.createElement('div',{className:'ui info message'},'Each heat map models the behavior of one instance. Red areas represent frequent behaviors (i.e. normal states) and the size of the red areas indicates the ranges of different metric values.'),_react2.default.createElement('div',{className:'padding40'},_react2.default.createElement(_rcSlider2.default,{max:6,value:this.state.dateIndex,marks:_.zipObject(_.range(0,6),_.range(0,6).map(function(index){return moment(_OutlierDetection2.default.data[index].startTime).format('YYYY-MM-DD HH:mm');})),onChange:this.handleDateIndexChange.bind(this)})),_react2.default.createElement('div',{className:'ui four cards'},this.state.heatMap))));}}]);return OutlierDetection;}(_react.Component);exports.default=OutlierDetection;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! moment */ 275), __webpack_require__(/*! jquery */ 11), __webpack_require__(/*! react-dom */ 47), __webpack_require__(/*! lodash */ 378)))

/***/ },

/***/ 265:
/*!**********************************!*\
  !*** ./components/selections.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.WindowWithWeek=exports.DurationThreshold=exports.AnomalyThreshold=exports.ModelType=exports.ProjectSelection=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _react3=__webpack_require__(/*! ../artui/react */ 243);var _classnames=__webpack_require__(/*! classnames */ 247);var _classnames2=_interopRequireDefault(_classnames);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ProjectSelection=function(_React$Component){_inherits(ProjectSelection,_React$Component);function ProjectSelection(props){_classCallCheck(this,ProjectSelection);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(ProjectSelection).call(this,props));_this.state={projects:['app3GAE','VCL5','hadoopAWS']};return _this;}_createClass(ProjectSelection,[{key:'render',value:function render(){var projects=this.state['projects'];var _props=this.props;var value=_props.value;var others=_objectWithoutProperties(_props,['value']);return _react2.default.createElement(_react3.Dropdown,_extends({mode:'select',value:value},others),_react2.default.createElement('div',{className:'menu'},projects.map(function(p){return _react2.default.createElement('div',{key:p,className:'item'},p);})));}}]);return ProjectSelection;}(_react2.default.Component);ProjectSelection.defaultProps={multiple:false};var ModelType=function ModelType(props){return _react2.default.createElement(_react3.Dropdown,_extends({mode:'select'},props),_react2.default.createElement('i',{className:'dropdown icon'}),_react2.default.createElement('div',{className:'menu'},_react2.default.createElement('div',{className:'item'},'Holistic'),_react2.default.createElement('div',{className:'item'},'Split')));};var AnomalyThreshold=function AnomalyThreshold(props){return _react2.default.createElement(_react3.Dropdown,_extends({mode:'select'},props),_react2.default.createElement('i',{className:'dropdown icon'}),_react2.default.createElement('div',{className:'menu'},_react2.default.createElement('div',{className:'item'},'0.99'),_react2.default.createElement('div',{className:'item'},'0.97'),_react2.default.createElement('div',{className:'item'},'0.95'),_react2.default.createElement('div',{className:'item'},'0.9'),_react2.default.createElement('div',{className:'item'},'0.5'),_react2.default.createElement('div',{className:'item'},'0.25')));};var DurationThreshold=function DurationThreshold(props){return _react2.default.createElement(_react3.Dropdown,_extends({mode:'select'},props),_react2.default.createElement('i',{className:'dropdown icon'}),_react2.default.createElement('div',{className:'menu'},_react2.default.createElement('div',{className:'item'},'5'),_react2.default.createElement('div',{className:'item'},'10'),_react2.default.createElement('div',{className:'item'},'15'),_react2.default.createElement('div',{className:'item'},'20'),_react2.default.createElement('div',{className:'item'},'25'),_react2.default.createElement('div',{className:'item'},'30')));};var WindowWithWeek=function WindowWithWeek(props){return _react2.default.createElement(_react3.Dropdown,_extends({mode:'select'},props),_react2.default.createElement('i',{className:'dropdown icon'}),_react2.default.createElement('div',{className:'menu'},_react2.default.createElement('div',{className:'item'},'1'),_react2.default.createElement('div',{className:'item'},'2'),_react2.default.createElement('div',{className:'item'},'4')));};exports.ProjectSelection=ProjectSelection;exports.ModelType=ModelType;exports.AnomalyThreshold=AnomalyThreshold;exports.DurationThreshold=DurationThreshold;exports.WindowWithWeek=WindowWithWeek;

/***/ },

/***/ 452:
/*!**************************************!*\
  !*** ./components/settings/index.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.Settings=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _react3=__webpack_require__(/*! ../../artui/react */ 243);var _navbar=__webpack_require__(/*! ./navbar */ 453);var _navbar2=_interopRequireDefault(_navbar);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Settings=exports.Settings=function(_React$Component){_inherits(Settings,_React$Component);function Settings(){_classCallCheck(this,Settings);return _possibleConstructorReturn(this,Object.getPrototypeOf(Settings).apply(this,arguments));}_createClass(Settings,[{key:'render',value:function render(){return _react2.default.createElement(_react3.Console.Wrapper,null,_react2.default.createElement(_navbar2.default,null),this.props.children);}}]);return Settings;}(_react2.default.Component);

/***/ },

/***/ 453:
/*!***************************************!*\
  !*** ./components/settings/navbar.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default=function(props){return _react2.default.createElement(_react3.Console.Navbar,null,_react2.default.createElement(_react3.Accordion,{className:'ui vertical fluid secondary inverted pointing accordion menu'},_react2.default.createElement('div',{className:'item'},_react2.default.createElement('a',{className:'active title'},_react2.default.createElement('i',{className:'dropdown icon'}),'Settings'),_react2.default.createElement('div',{className:'active content menu'},_react2.default.createElement('div',{className:'item'},'Threshold Settings'))),_react2.default.createElement('div',{className:'item'},_react2.default.createElement('a',{className:'active title'},_react2.default.createElement('i',{className:'dropdown icon'}),'Integration'),_react2.default.createElement('div',{className:'active content menu'},_react2.default.createElement('div',{className:'item'},'PagerDuty Integration')))));};var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _react3=__webpack_require__(/*! ../../artui/react */ 243);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

/***/ },

/***/ 380:
/*!********************************************************!*\
  !*** ./components/ui/datetimepicker/DateTimePicker.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, moment) {'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _Days=__webpack_require__(/*! ./Days */ 381);var _Days2=_interopRequireDefault(_Days);var _TimePicker=__webpack_require__(/*! ./TimePicker */ 383);var _TimePicker2=_interopRequireDefault(_TimePicker);__webpack_require__(/*! ./datepicker.less */ 384);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var KEYS={RETURN:13,ESC:27,TAB:9};var DateTimePicker=React.createClass({displayName:'DateTimePicker',getInitialState:function getInitialState(){var initialState=this._deriveState();initialState.currentMonth=initialState.selectedDate;return initialState;},getDefaultProps:function getDefaultProps(){return {weekStart:1,time:true,inputMode:true,dateTimeFormat:'YYYY-MM-DD HH:mm',dateFormat:'YYYY-MM-DD',value:new Date()};},render:function render(){var weekDays=['Su','Mo','Tu','We','Th','Fr','Sa'];for(var ii=0;ii<this.props.weekStart;ii++){weekDays.push(weekDays.shift());}var dayColumnHeaderCaptions=weekDays.map(function(day){return React.createElement('th',{key:day},day);});var timePicker=this.props.time?React.createElement(_TimePicker2.default,{minutes:this.state.minutes,ref:'timePicker',onChange:this._handleTimeChange}):null;var selectedDate=this._getCurrentValue();var datePicker=React.createElement('div',{className:this._getClass(),onClick:this._handleClick},React.createElement('div',{className:'month-header'},React.createElement('button',{className:'previous-month',onClick:this._handlePrev},'<'),React.createElement('div',{className:'month-label'},this.state.currentMonth.format('MMMM YYYY')),React.createElement('button',{className:'next-month',onClick:this._handleNext},'>')),React.createElement('div',null,React.createElement('table',{className:'days'},React.createElement('thead',null,React.createElement('tr',null,dayColumnHeaderCaptions)),React.createElement(_Days2.default,{month:this.state.currentMonth,weekStart:this.props.weekStart,selectedDate:selectedDate,dateValidator:this.props.dateValidator,onDayClick:this._handleDayChange}))),timePicker);if(this.props.inputMode){return React.createElement('div',{className:'date-picker-wrapper'},React.createElement('input',Object.assign({},this.props,{type:'text',onClick:this._handleInputClick,value:this._getFormattedCurrentValue(),readOnly:true})),datePicker);}else {return datePicker;}},componentWillUnmount:function componentWillUnmount(){if(this.state.visible){document.removeEventListener('click',this._closeInput);document.removeEventListener('keydown',this._handleKeyDown);}},componentWillReceiveProps:function componentWillReceiveProps(nextProps){var nextState=this._deriveState(nextProps);if(this.props.inputMode&&!nextProps.inputMode){nextState.visible=true;this.setState(nextState);}if(this.props.value!==nextProps.value){nextState.currentMonth=nextState.selectedDate;this.setState(nextState);}},componentDidUpdate:function componentDidUpdate(prevProps,prevState){if(prevState.visible!==this.state.visible){if(this.state.visible){document.addEventListener('click',this._closeInput);document.addEventListener('keydown',this._handleKeyDown);}else {document.removeEventListener('click',this._closeInput);document.removeEventListener('keydown',this._handleKeyDown);}}},getFormattedValue:function getFormattedValue(){if(!this.props.time&&this.props.dateFormat){return moment(this.props.value).format(this.props.dateFormat);}else {return moment(this.props.value).format(this.props.dateTimeFormat);}},_getCurrentValue:function _getCurrentValue(){if(this.props.inputMode&&this.state.visible){var date=this.state.selectedDate;return date.startOf('day').add(this.state.minutes,'minutes');}else {return moment(this.props.value);}},_getFormattedCurrentValue:function _getFormattedCurrentValue(){var value=this._getCurrentValue();if(!this.props.time&&this.props.dateFormat){return value.format(this.props.dateFormat);}else {return value.format(this.props.dateTimeFormat);}},_deriveState:function _deriveState(props){if(!props){props=this.props;}var selectedDate=moment(props.value);var minutes=selectedDate?selectedDate.hours()*60+selectedDate.minutes():0;return {selectedDate:selectedDate,visible:!props.inputMode,minutes:minutes};},_getClass:function _getClass(){var classes='date-picker';if(this.props.inputMode){classes+=' input-mode';}if(!this.state.visible){classes+=' hidden';}return classes;},_handlePrev:function _handlePrev(){this.setState({currentMonth:this.state.currentMonth.clone().subtract(1,'months')});},_handleNext:function _handleNext(){this.setState({currentMonth:this.state.currentMonth.clone().add(1,'months')});},_handleClick:function _handleClick(ev){ev.nativeEvent.stopImmediatePropagation();},_handleTimeChange:function _handleTimeChange(newMinutes){var _this=this;this.setState({minutes:newMinutes},function(){if(!_this.props.inputMode){_this._emitChange();}});},_handleInputClick:function _handleInputClick(){var _this2=this;var currentValue=this._getCurrentValue().toDate();var nextState=this._deriveState();if(this.state.visible){nextState.visible=false;this.setState(nextState,function(){return _this2._emitChange(currentValue);});}else {nextState.visible=true;this.setState(nextState);}},_closeInput:function _closeInput(){var _this3=this;if(this.state.visible){(function(){var currentValue=_this3._getCurrentValue().toDate();var nextState=_this3._deriveState();nextState.visible=false;_this3.setState(nextState,function(){return _this3._emitChange(currentValue);});})();}},_handleKeyDown:function _handleKeyDown(e){e.preventDefault();switch(e.which){case KEYS.ESC:case KEYS.TAB:this._closeInput();return;}},_emitChange:function _emitChange(date){if(typeof this.props.onChange==='function'&&date){this.props.onChange(date);}},_handleDayChange:function _handleDayChange(date){var _this4=this;if(!this.props.inputMode){this._emitChange(date.toDate());return;}if(!this.props.time){var nextState=this._deriveState();nextState.visible=false;this.setState(nextState,function(){_this4._emitChange(date.toDate());});return;}this.setState({selectedDate:date});}});exports.default=DateTimePicker;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! react */ 16), __webpack_require__(/*! moment */ 275)))

/***/ },

/***/ 382:
/*!*********************************************!*\
  !*** ./components/ui/datetimepicker/Day.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React) {'use strict';Object.defineProperty(exports,"__esModule",{value:true});var Day=React.createClass({displayName:'Day',render:function render(){return React.createElement('td',{className:this._getClass(),onClick:this._handleDayClick},this.props.date.date());},_getClass:function _getClass(){var classes='day';if(this.props.cssClass){classes+=' '+this.props.cssClass;}if(this.props.disabled){classes+=' disabled';}if(this.props.selected){classes+=' selected';}if(this.props.today){classes+=' today';}return classes;},_handleDayClick:function _handleDayClick(){if(!this.props.disabled){this.props.onClick(this.props.date);}}});exports.default=Day;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! react */ 16)))

/***/ },

/***/ 381:
/*!**********************************************!*\
  !*** ./components/ui/datetimepicker/Days.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, moment) {'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _Day=__webpack_require__(/*! ./Day */ 382);var _Day2=_interopRequireDefault(_Day);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Days=React.createClass({displayName:'Days',render:function render(){var month=this.props.month;var weekStart=this.props.weekStart;var firstOfMonth=month.clone().startOf('month');var lastOfMonth=month.clone().endOf('month');var subtract=(firstOfMonth.day()-weekStart)%7;subtract=subtract<0?subtract+7:subtract;var startDate=firstOfMonth.clone().subtract(subtract,'days');var stopDate=undefined;if(weekStart===lastOfMonth.day()){stopDate=lastOfMonth.clone().add(7,'days');}else {var add=(weekStart-lastOfMonth.day())%7;add=add<0?add+7:add;stopDate=lastOfMonth.clone().add(add,'days');}var rows=[];var thisRow=null;var thisDate=startDate;while(thisDate.isBefore(stopDate)){if(thisDate.day()===weekStart){if(thisRow){rows.push(thisRow);}thisRow=[];}var cssClass=null;if(thisDate.isBefore(firstOfMonth)){cssClass='prev';}else if(thisDate.isAfter(lastOfMonth)){cssClass='next';}var isDisabled=false;if(typeof this.props.dateValidator==='function'){isDisabled=!this.props.dateValidator(thisDate);}var isSelected=false;if(this.props.selectedDate){var selectedDate=this.props.selectedDate.startOf('day').clone();isSelected=thisDate.isSame(selectedDate);}thisRow.push(React.createElement(_Day2.default,{date:thisDate.clone(),key:thisDate.valueOf(),cssClass:cssClass,selected:isSelected,disabled:isDisabled,today:thisDate.isSame(moment().startOf('day')),onClick:this.props.onDayClick}));thisDate.add(1,'days');}var domRows=rows.map(function(row,rowIndex){return React.createElement('tr',{key:rowIndex},row);});return React.createElement('tbody',null,domRows);}});exports.default=Days;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! react */ 16), __webpack_require__(/*! moment */ 275)))

/***/ },

/***/ 383:
/*!****************************************************!*\
  !*** ./components/ui/datetimepicker/TimePicker.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {'use strict';Object.defineProperty(exports,"__esModule",{value:true});function toTimePartString(timepart){var s=timepart.toString();if(s.length===1){return '0'+s;}else {return s;}}var TimePicker=React.createClass({displayName:'TimePicker',render:function render(){return React.createElement('div',{className:'time-picker'},React.createElement('div',{className:'hours'},React.createElement('span',null,"Hour: "),React.createElement('input',{id:'hours',type:'range',ref:'hours',min:0,max:23,value:this.getHours(),onChange:this._handleChange}),React.createElement('span',null,toTimePartString(this.getHours()))),React.createElement('div',{className:'minutes'},React.createElement('span',null,"Minute: "),React.createElement('input',{id:'minutes',type:'range',ref:'minutes',min:0,max:59,value:this.getMinutes(),onChange:this._handleChange}),React.createElement('span',null,toTimePartString(this.getMinutes()))));},getHours:function getHours(){return Math.floor(this.props.minutes/60);},getMinutes:function getMinutes(){return this.props.minutes%60;},_handleChange:function _handleChange(){var hours=parseInt(ReactDOM.findDOMNode(this.refs.hours).value,10);var minutes=parseInt(ReactDOM.findDOMNode(this.refs.minutes).value,10);this.props.onChange(hours*60+minutes);}});exports.default=TimePicker;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! react */ 16), __webpack_require__(/*! react-dom */ 47)))

/***/ },

/***/ 384:
/*!******************************************************!*\
  !*** ./components/ui/datetimepicker/datepicker.less ***!
  \******************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 379:
/*!***********************************************!*\
  !*** ./components/ui/datetimepicker/index.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _DateTimePicker=__webpack_require__(/*! ./DateTimePicker */ 380);var _DateTimePicker2=_interopRequireDefault(_DateTimePicker);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=_DateTimePicker2.default;

/***/ },

/***/ 446:
/*!****************************************!*\
  !*** ./components/ui/graph/HeatMap.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(cx, _) {'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 16);var _react2=_interopRequireDefault(_react);var _reactDom=__webpack_require__(/*! react-dom */ 47);var _reactDom2=_interopRequireDefault(_reactDom);var _d=__webpack_require__(/*! d3 */ 447);var _d2=_interopRequireDefault(_d);var _reactAddonsPureRenderMixin=__webpack_require__(/*! react-addons-pure-render-mixin */ 448);var _reactAddonsPureRenderMixin2=_interopRequireDefault(_reactAddonsPureRenderMixin);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var defaultSize=200;var dataPropTypes=_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({value:_react2.default.PropTypes.number,colIndex:_react2.default.PropTypes.number,rowIndex:_react2.default.PropTypes.number}));var HeatMap=function(_React$Component){_inherits(HeatMap,_React$Component);function HeatMap(props){_classCallCheck(this,HeatMap);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(HeatMap).call(this,props));_this.shouldComponentUpdate=_reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);return _this;}_createClass(HeatMap,[{key:'render',value:function render(){return _react2.default.createElement('div',{className:cx('heatmap inlin-block')},_react2.default.createElement('svg',{ref:this._refSvg.bind(this)}));}},{key:'_refSvg',value:function _refSvg(svg){var _this2=this;setTimeout(function(){var _props=_this2.props;var width=_props.width;var height=_props.height;var margin=_props.margin;var itemSize=_props.itemSize;var cellSize=_props.cellSize;var data=_props.data;var colorCalibration=_props.colorCalibration;var duration=_props.duration;var dayOffset=0;_this2.svg=_d2.default.select(_reactDom2.default.findDOMNode(svg));var heatmap=_this2.svg.attr('width',width).attr('height',height).append('g').attr('width',width-margin.left-margin.right).attr('height',height-margin.top-margin.bottom).attr('transform','translate('+margin.left+','+margin.top+')');var rect=heatmap.selectAll('rect').data(data).enter().append('rect').attr('width',cellSize).attr('height',cellSize).attr('x',function(item){return itemSize*item.colIndex;}).attr('y',function(item){return itemSize*item.rowIndex;}).attr('fill','#ffffff');rect.filter(function(item){return item.value>=0;}).transition().delay(function(d){return d.colIndex*d.rowIndex*0.1;}).transition().duration(1000).attrTween('fill',function(d,i,a){var colorIndex=_d2.default.scale.quantize().range(_.range(0,colorCalibration.length)).domain([0,duration]);return function(){return colorCalibration[colorCalibration.length-colorIndex(d.value)-1];};});},1);}}]);return HeatMap;}(_react2.default.Component);HeatMap.defaultProps={width:defaultSize,height:defaultSize,itemSize:defaultSize/24,cellSize:defaultSize/24-1,margin:{top:0,right:0,bottom:0,left:0},colorCalibration:['#41FF91','#44FE66','#51FD47','#7EFC4A','#A9FB4C','#D3F94F','#F9F751','#F8CF54','#F7A856','#F68459','#F5605B'],duration:100};exports.default=HeatMap;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! classnames */ 247), __webpack_require__(/*! lodash */ 378)))

/***/ },

/***/ 386:
/*!************************************!*\
  !*** ./components/ui/rc-slider.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});__webpack_require__(/*! rc-slider/assets/index.css */ 387);var _rcSlider=__webpack_require__(/*! rc-slider */ 389);var _rcSlider2=_interopRequireDefault(_rcSlider);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=_rcSlider2.default;

/***/ },

/***/ 455:
/*!*************************!*\
  !*** ./images/logo.png ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "imgs/logo-ec7a789ea5eb0381c16b.png";

/***/ },

/***/ 451:
/*!******************************************!*\
  !*** ./mock/cloud/OutlierDetection.json ***!
  \******************************************/
/***/ function(module, exports) {

	module.exports = {
		"data": [
			{
				"startTime": "2016-05-16T05:02:06.289Z",
				"mapData": {
					"groupId": 0,
					"NASValues": [
						"0,35.00,71.00,1.00,6.00,74.00,31.00,44.00,40.00,53.00,87.00,11.00,15.00,34.00,86.00,163.00,0",
						"1,57.00,96.00,75.00,24.00,86.00,16.00,15.00,25.00,22.00,27.00,70.00,28.00,94.00,93.00,161.82,0",
						"2,42.00,82.00,51.00,32.00,44.00,31.00,56.00,78.00,74.00,89.00,52.00,9.00,16.00,46.00,147.12,0",
						"3,56.00,30.00,1.00,93.00,23.00,46.00,11.00,67.00,39.00,35.00,31.00,19.00,42.00,90.00,144.61,0",
						"4,15.00,49.00,99.00,50.00,43.00,71.00,42.00,87.00,47.00,82.00,50.00,38.00,32.00,80.00,143.98,0",
						"5,68.00,93.00,86.00,26.00,90.00,25.00,41.00,18.00,0.00,99.00,55.00,15.00,39.00,0.00,167.58,0",
						"6,49.00,37.00,80.00,66.00,11.00,37.00,99.00,17.00,27.00,53.00,0.00,95.00,82.00,8.00,163.44,0",
						"7,12.00,1.00,22.00,81.00,25.00,14.00,36.00,62.00,85.00,53.00,49.00,86.00,93.00,2.00,135.50,0",
						"8,69.00,40.00,13.00,46.00,75.00,27.00,93.00,70.00,36.00,22.00,78.00,59.00,96.00,23.00,154.61,0",
						"9,26.00,60.00,67.00,1.00,47.00,63.00,95.00,64.00,99.00,77.00,81.00,71.00,1.00,97.00,161.36,0",
						"10,93.00,68.00,96.00,77.00,43.00,14.00,97.00,86.00,91.00,80.00,92.00,34.00,47.00,30.00,171.86,0",
						"11,32.00,11.00,73.00,43.00,40.00,97.00,27.00,30.00,25.00,13.00,15.00,49.00,53.00,30.00,165.54,0",
						"12,67.00,19.00,10.00,34.00,50.00,97.00,57.00,99.00,10.00,42.00,31.00,15.00,5.00,65.00,155.45,0",
						"13,10.00,89.00,88.00,28.00,1.00,21.00,63.00,35.00,13.00,96.00,6.00,13.00,88.00,26.00,183.71,0",
						"14,90.00,87.00,83.00,77.00,60.00,76.00,36.00,63.00,83.00,97.00,3.00,47.00,17.00,35.00,152.78,0",
						"15,15.00,9.00,71.00,41.00,26.00,73.00,58.00,48.00,73.00,66.00,55.00,67.00,29.00,20.00,140.59,0",
						"16,56.00,92.00,18.00,18.00,41.00,11.00,82.00,66.00,13.00,48.00,96.00,49.00,4.00,35.00,151.14,0",
						"17,39.00,71.00,42.00,89.00,77.00,29.00,51.00,10.00,29.00,92.00,87.00,79.00,12.00,49.00,127.70,0",
						"18,54.00,80.00,69.00,24.00,68.00,2.00,53.00,22.00,47.00,40.00,94.00,13.00,21.00,89.00,149.31,0",
						"19,52.00,11.00,42.00,52.00,81.00,17.00,87.00,68.00,61.00,30.00,65.00,85.00,62.00,63.00,127.65,0",
						"20,37.00,71.00,50.00,99.00,83.00,30.00,21.00,69.00,23.00,59.00,11.00,74.00,24.00,23.00,140.90,0",
						"21,22.00,93.00,74.00,66.00,21.00,9.00,76.00,24.00,83.00,67.00,37.00,24.00,75.00,76.00,143.86,0",
						"22,95.00,57.00,74.00,34.00,33.00,42.00,60.00,91.00,71.00,49.00,4.00,24.00,81.00,32.00,151.63,0",
						"23,14.00,73.00,49.00,36.00,19.00,0.00,82.00,32.00,43.00,68.00,90.00,78.00,0.00,95.00,178.47,0",
						"24,4.00,9.00,11.00,60.00,43.00,76.00,4.00,45.00,27.00,50.00,36.00,1.00,64.00,60.00,164.00,0",
						"25,87.00,91.00,94.00,35.00,60.00,43.00,61.00,47.00,84.00,36.00,98.00,97.00,2.00,71.00,179.94,0",
						"26,40.00,4.00,18.00,74.00,56.00,72.00,13.00,70.00,16.00,23.00,65.00,48.00,58.00,57.00,154.54,0",
						"27,55.00,58.00,68.00,60.00,57.00,63.00,62.00,6.00,43.00,44.00,92.00,59.00,21.00,35.00,140.36,0",
						"28,30.00,90.00,19.00,26.00,91.00,75.00,57.00,80.00,0.00,3.00,30.00,69.00,38.00,13.00,167.71,0",
						"29,17.00,11.00,87.00,46.00,57.00,77.00,67.00,12.00,27.00,96.00,12.00,99.00,98.00,1.00,186.88,0",
						"30,5.57,3.45,27.31,14.44,17.89,24.32,21.26,4.32,8.47,30.13,3.77,31.07,31.39,1.52,92.88,0",
						"31,2.52,1.08,8.57,4.53,5.61,7.87,6.77,1.69,2.66,9.46,1.18,9.75,10.01,0.61,36.02,0",
						"32,1.55,0.33,2.60,1.38,1.70,2.63,2.16,0.85,0.81,2.87,0.36,2.96,3.20,0.32,131.17,0",
						"33,69.00,5.00,28.00,58.00,48.00,70.00,75.00,81.00,71.00,68.00,11.00,27.00,67.00,19.00,183.96,0",
						"34,90.00,99.00,65.00,92.00,57.00,4.00,59.00,13.00,17.00,69.00,38.00,90.00,4.00,20.00,151.19,0",
						"35,66.00,67.00,12.00,34.00,81.00,19.00,86.00,85.00,26.00,53.00,21.00,63.00,14.00,11.00,137.64,0",
						"36,38.00,47.00,43.00,94.00,99.00,86.00,85.00,64.00,64.00,88.00,46.00,5.00,6.00,4.00,150.15,0",
						"37,50.00,44.00,19.00,10.00,70.00,81.00,72.00,4.00,54.00,5.00,14.00,54.00,59.00,62.00,163.78,0",
						"38,96.00,8.00,60.00,90.00,58.00,40.00,33.00,35.00,63.00,5.00,85.00,97.00,5.00,82.00,147.61,0",
						"39,37.00,59.00,5.00,80.00,54.00,51.00,6.00,88.00,64.00,58.00,72.00,61.00,13.00,53.00,142.25,0",
						"40,86.00,59.00,77.00,52.00,69.00,97.00,16.00,72.00,56.00,88.00,63.00,54.00,40.00,1.00,145.20,0",
						"41,12.00,2.00,13.00,43.00,84.00,73.00,44.00,59.00,91.00,41.00,69.00,19.00,54.00,20.00,155.48,0",
						"42,52.00,89.00,98.00,21.00,31.00,30.00,25.00,47.00,23.00,37.00,7.00,14.00,96.00,30.00,166.86,0",
						"43,23.00,76.00,40.00,93.00,11.00,29.00,92.00,24.00,83.00,47.00,74.00,90.00,28.00,57.00,170.45,0",
						"44,87.00,49.00,86.00,11.00,37.00,83.00,56.00,87.00,17.00,77.00,36.00,83.00,78.00,69.00,159.30,0",
						"45,48.00,44.00,26.00,82.00,79.00,56.00,26.00,94.00,74.00,60.00,26.00,84.00,41.00,19.00,169.16,0",
						"46,28.00,28.00,94.00,31.00,13.00,80.00,90.00,5.00,98.00,68.00,16.00,9.00,32.00,78.00,146.07,0",
						"47,52.00,29.00,15.00,65.00,8.00,19.00,61.00,37.00,77.00,54.00,19.00,4.00,0.00,56.00,127.65,0",
						"48,3.00,3.00,44.00,52.00,76.00,47.00,85.00,14.00,75.00,27.00,44.00,69.00,75.00,56.00,148.18,0",
						"49,33.00,57.00,15.00,60.00,39.00,89.00,37.00,56.00,58.00,37.00,99.00,21.00,43.00,23.00,144.22,0",
						"50,74.00,2.00,41.00,65.00,90.00,37.00,27.00,87.00,52.00,91.00,8.00,64.00,9.00,6.00,155.02,0",
						"51,78.00,16.00,72.00,50.00,44.00,4.00,32.00,52.00,71.00,74.00,44.00,39.00,75.00,38.00,117.05,0",
						"52,82.00,40.00,23.00,98.00,19.00,21.00,10.00,15.00,20.00,34.00,38.00,62.00,23.00,90.00,138.85,0",
						"53,55.00,23.00,86.00,17.00,2.00,16.00,18.00,59.00,36.00,26.00,21.00,4.00,82.00,20.00,151.10,0",
						"54,36.00,54.00,26.00,12.00,79.00,77.00,91.00,20.00,58.00,9.00,27.00,18.00,69.00,51.00,142.24,0",
						"55,65.00,9.00,46.00,30.00,51.00,88.00,71.00,89.00,83.00,89.00,24.00,98.00,22.00,67.00,164.31,0",
						"56,22.00,25.00,30.00,68.00,82.00,64.00,0.00,26.00,1.00,28.00,66.00,32.00,12.00,65.00,159.38,0",
						"57,19.00,70.00,73.00,22.00,9.00,47.00,92.00,59.00,80.00,0.00,21.00,88.00,32.00,13.00,158.83,0",
						"58,6.19,21.97,22.91,6.90,2.82,15.17,29.42,19.62,25.11,0.00,6.59,27.62,10.35,4.24,100.20,0",
						"59,29.62,2.82,26.68,10.67,22.91,25.19,21.72,28.27,5.34,15.69,8.79,25.11,21.11,31.29,84.20,0",
						"60,9.53,0.89,8.37,3.35,7.19,8.06,6.99,9.31,1.67,4.93,2.76,7.88,6.95,10.19,69.74,0",
						"61,3.21,0.28,2.63,1.05,2.26,2.64,2.31,3.15,0.53,1.55,0.87,2.47,2.47,3.56,63.69,0",
						"62,1.77,0.09,0.82,0.33,0.71,1.05,0.80,1.38,0.16,0.49,0.27,0.78,0.90,1.20,20.07,0",
						"63,1.33,0.03,0.25,0.10,0.21,0.56,0.35,0.75,0.05,0.15,0.08,0.24,0.43,0.50,8.22,0",
						"64,0.41,0.01,0.08,0.03,0.07,0.20,0.17,0.55,0.02,0.05,0.03,0.07,0.33,0.36,52.60,1",
						"65,21.00,79.00,14.00,39.00,9.00,24.00,5.00,6.00,32.00,88.00,6.00,17.00,47.00,49.00,160.56,0",
						"66,97.00,50.00,19.00,38.00,92.00,28.00,85.00,40.00,40.00,83.00,56.00,15.00,66.00,36.00,142.92,0",
						"67,34.00,13.00,86.00,8.00,18.00,19.00,99.00,55.00,27.00,47.00,1.00,55.00,59.00,25.00,154.93,0",
						"68,25.00,7.00,97.00,53.00,50.00,93.00,4.00,31.00,97.00,40.00,40.00,15.00,74.00,25.00,158.14,0",
						"69,71.00,92.00,66.00,8.00,88.00,44.00,2.00,32.00,57.00,73.00,2.00,19.00,56.00,7.00,150.97,0",
						"70,59.00,55.00,48.00,90.00,54.00,35.00,41.00,27.00,61.00,10.00,46.00,32.00,46.00,46.00,124.94,0",
						"71,4.00,13.00,40.00,68.00,43.00,63.00,74.00,37.00,0.00,7.00,30.00,26.00,98.00,22.00,167.75,0",
						"72,85.00,85.00,91.00,48.00,61.00,7.00,32.00,92.00,22.00,5.00,81.00,16.00,23.00,75.00,164.80,0",
						"73,26.00,46.00,41.00,28.00,83.00,7.00,77.00,65.00,15.00,11.00,18.00,61.00,73.00,11.00,146.72,0",
						"74,34.00,98.00,52.00,90.00,65.00,11.00,72.00,63.00,29.00,34.00,38.00,32.00,26.00,33.00,129.52,0",
						"75,96.00,32.00,35.00,36.00,27.00,65.00,79.00,89.00,54.00,40.00,21.00,80.00,68.00,42.00,164.45,0",
						"76,9.00,14.00,47.00,7.00,94.00,6.00,56.00,45.00,54.00,95.00,75.00,4.00,47.00,62.00,171.96,0",
						"77,2.00,9.00,41.00,7.00,2.00,30.00,45.00,98.00,11.00,37.00,63.00,93.00,2.00,53.00,146.47,0",
						"78,68.00,77.00,61.00,42.00,40.00,59.00,54.00,55.00,87.00,64.00,61.00,39.00,4.00,52.00,133.65,0",
						"79,67.00,1.00,49.00,97.00,33.00,2.00,50.00,88.00,83.00,14.00,66.00,33.00,18.00,66.00,141.48,0",
						"80,63.00,68.00,57.00,33.00,43.00,79.00,67.00,56.00,99.00,20.00,34.00,16.00,92.00,37.00,130.73,0",
						"81,83.00,80.00,6.00,15.00,86.00,81.00,97.00,31.00,43.00,59.00,56.00,10.00,91.00,76.00,132.47,0",
						"82,64.00,37.00,37.00,96.00,73.00,47.00,92.00,76.00,21.00,95.00,82.00,36.00,37.00,97.00,144.63,0",
						"83,75.00,13.00,94.00,52.00,72.00,12.00,81.00,90.00,11.00,89.00,50.00,81.00,55.00,23.00,128.77,0",
						"84,72.00,31.00,18.00,41.00,5.00,25.00,47.00,99.00,46.00,68.00,16.00,67.00,26.00,45.00,119.76,0",
						"85,57.00,27.00,72.00,67.00,73.00,27.00,15.00,90.00,69.00,55.00,41.00,55.00,18.00,71.00,126.58,0",
						"86,84.00,95.00,74.00,20.00,74.00,70.00,76.00,57.00,77.00,54.00,41.00,14.00,14.00,77.00,138.20,0",
						"87,71.00,69.00,78.00,92.00,80.00,62.00,74.00,8.00,96.00,53.00,65.00,35.00,53.00,64.00,161.88,0",
						"88,86.00,28.00,51.00,6.00,24.00,61.00,15.00,8.00,93.00,51.00,78.00,71.00,98.00,36.00,171.83,0",
						"89,27.22,8.79,16.01,1.88,7.53,19.56,5.26,3.62,29.19,16.01,24.48,22.28,31.06,11.46,106.95,0",
						"90,8.49,2.67,4.86,0.57,2.29,6.36,2.15,2.22,8.86,4.86,7.43,6.76,9.74,3.64,33.58,0",
						"91,2.89,0.84,1.52,0.18,0.72,2.19,1.03,1.03,2.78,1.52,2.33,2.12,3.15,1.22,25.19,0",
						"92,1.13,0.26,0.48,0.06,0.23,0.80,0.44,0.55,0.87,0.48,0.73,0.67,1.28,0.74,7.93,0",
						"93,0.57,0.08,0.15,0.02,0.07,0.36,0.25,0.39,0.26,0.15,0.22,0.20,0.68,0.59,2.51,0",
						"94,0.40,0.03,0.05,0.01,0.02,0.22,0.19,0.35,0.08,0.05,0.07,0.06,0.50,0.54,0.96,1",
						"95,0.90,0.01,0.01,0.00,0.01,0.30,0.16,0.49,0.03,0.01,0.02,0.02,0.29,0.27,0.69,1",
						"96,0.51,0.00,0.00,0.00,0.00,0.18,0.12,0.49,0.01,0.00,0.01,0.01,0.25,0.22,81.06,1",
						"97,73.00,35.00,1.00,99.00,60.00,98.00,7.00,75.00,66.00,61.00,77.00,61.00,36.00,70.00,185.72,0",
						"98,83.00,1.00,4.00,34.00,51.00,63.00,33.00,42.00,62.00,93.00,10.00,43.00,33.00,6.00,138.48,0",
						"99,83.00,70.00,59.00,51.00,8.00,88.00,81.00,14.00,91.00,68.00,97.00,63.00,40.00,17.00,149.38,0",
						"100,86.00,93.00,17.00,32.00,80.00,81.00,8.00,43.00,84.00,75.00,85.00,45.00,54.00,86.00,146.18,0",
						"101,80.00,54.00,54.00,81.00,53.00,82.00,15.00,19.00,16.00,31.00,79.00,79.00,88.00,88.00,154.44,0",
						"102,97.00,27.00,44.00,57.00,32.00,3.00,36.00,40.00,51.00,99.00,94.00,29.00,75.00,34.00,141.76,0",
						"103,96.00,3.00,57.00,9.00,92.00,52.00,11.00,19.00,91.00,79.00,59.00,75.00,82.00,8.00,163.98,0",
						"104,73.00,93.00,83.00,1.00,17.00,74.00,63.00,61.00,24.00,76.00,14.00,51.00,85.00,85.00,174.92,0",
						"105,9.00,92.00,77.00,79.00,24.00,88.00,8.00,57.00,87.00,11.00,51.00,46.00,26.00,69.00,175.58,0",
						"106,39.00,53.00,38.00,33.00,0.00,0.00,88.00,44.00,59.00,85.00,61.00,16.00,50.00,74.00,155.46,0",
						"107,0.00,84.00,65.00,76.00,82.00,20.00,42.00,1.00,0.00,29.00,2.00,59.00,56.00,76.00,161.15,0",
						"108,76.00,1.00,39.00,94.00,55.00,13.00,7.00,21.00,4.00,24.00,32.00,52.00,38.00,75.00,142.89,0",
						"109,37.00,4.00,13.00,55.00,44.00,23.00,35.00,67.00,0.00,64.00,6.00,97.00,12.00,49.00,136.70,0",
						"110,36.00,75.00,96.00,43.00,92.00,96.00,72.00,21.00,60.00,37.00,37.00,12.00,68.00,5.00,165.84,0",
						"111,77.00,1.00,43.00,97.00,31.00,99.00,3.00,13.00,43.00,93.00,83.00,79.00,13.00,14.00,149.07,0",
						"112,88.00,20.00,52.00,61.00,4.00,96.00,74.00,76.00,71.00,88.00,75.00,43.00,77.00,6.00,111.18,0",
						"113,66.00,49.00,58.00,72.00,24.00,68.00,52.00,27.00,60.00,91.00,70.00,34.00,98.00,25.00,117.47,0",
						"114,26.00,48.00,61.00,20.00,61.00,55.00,99.00,4.00,20.00,39.00,40.00,63.00,95.00,47.00,147.64,0",
						"115,82.00,34.00,42.00,67.00,83.00,78.00,32.00,51.00,18.00,20.00,83.00,36.00,0.00,38.00,140.55,0",
						"116,51.00,37.00,43.00,52.00,27.00,18.00,29.00,28.00,53.00,0.00,35.00,62.00,39.00,20.00,123.78,0",
						"117,38.00,43.00,74.00,43.00,11.00,30.00,44.00,50.00,62.00,89.00,27.00,68.00,69.00,2.00,127.20,0",
						"118,12.05,13.50,23.23,13.50,3.45,9.50,13.88,16.04,19.46,27.93,8.47,21.34,22.09,1.36,104.34,0",
						"119,4.11,4.24,7.29,4.24,1.08,3.45,4.93,5.36,6.11,8.77,2.66,6.70,7.19,0.81,76.61,0",
						"120,1.51,1.33,2.29,1.33,0.34,1.50,2.10,2.79,1.92,2.75,0.83,2.10,2.56,0.41,59.17,0",
						"121,0.69,0.40,0.69,0.40,0.10,0.87,1.19,1.97,0.58,0.84,0.25,0.64,1.09,0.28,18.84,0",
						"122,0.44,0.13,0.22,0.13,0.03,0.47,0.72,0.95,0.18,0.26,0.08,0.20,0.44,0.17,5.95,1",
						"123,0.36,0.04,0.07,0.04,0.01,0.26,0.34,0.52,0.06,0.08,0.02,0.06,0.43,0.41,1.94,1",
						"124,0.34,0.01,0.02,0.01,0.00,0.19,0.22,0.39,0.02,0.02,0.01,0.02,0.42,0.49,0.64,1",
						"125,0.33,0.00,0.01,0.00,0.00,0.17,0.21,0.50,0.01,0.01,0.00,0.01,0.32,0.36,0.33,1",
						"126,0.33,0.00,0.00,0.00,0.00,0.17,0.18,0.38,0.00,0.00,0.00,0.00,0.39,0.47,0.13,1",
						"127,0.33,0.00,0.00,0.00,0.00,0.16,0.17,0.34,0.00,0.00,0.00,0.00,0.41,0.50,0.36,1",
						"128,0.32,0.00,0.00,0.00,0.00,0.12,0.10,0.49,0.00,0.00,0.00,0.00,0.24,0.21,85.16,1",
						"129,97.00,21.00,89.00,17.00,96.00,3.00,88.00,29.00,83.00,76.00,58.00,56.00,52.00,87.00,185.65,0",
						"130,76.00,76.00,82.00,55.00,92.00,41.00,87.00,88.00,31.00,99.00,16.00,20.00,42.00,32.00,145.63,0",
						"131,95.00,10.00,67.00,38.00,18.00,58.00,84.00,17.00,16.00,37.00,36.00,64.00,84.00,43.00,142.59,0",
						"132,95.00,11.00,19.00,74.00,9.00,54.00,55.00,97.00,63.00,24.00,79.00,67.00,65.00,64.00,150.67,0",
						"133,90.00,46.00,39.00,0.00,27.00,89.00,99.00,32.00,7.00,70.00,85.00,14.00,34.00,8.00,147.92,0",
						"134,69.00,71.00,8.00,29.00,15.00,83.00,49.00,44.00,17.00,13.00,91.00,87.00,10.00,47.00,143.94,0",
						"135,47.00,28.00,14.00,34.00,53.00,18.00,69.00,93.00,24.00,99.00,55.00,40.00,51.00,28.00,149.36,0",
						"136,42.00,24.00,13.00,85.00,12.00,41.00,15.00,44.00,51.00,1.00,65.00,1.00,70.00,16.00,166.09,0",
						"137,79.00,19.00,11.00,13.00,0.00,41.00,71.00,37.00,84.00,48.00,2.00,82.00,86.00,70.00,173.74,0",
						"138,39.00,31.00,64.00,26.00,72.00,87.00,35.00,68.00,88.00,51.00,88.00,38.00,46.00,18.00,137.61,0",
						"139,73.00,79.00,14.00,44.00,62.00,51.00,6.00,35.00,84.00,46.00,63.00,26.00,27.00,92.00,122.54,0",
						"140,52.00,47.00,48.00,26.00,43.00,49.00,38.00,58.00,99.00,59.00,71.00,11.00,29.00,93.00,118.19,0",
						"141,27.00,8.00,15.00,25.00,40.00,52.00,36.00,13.00,89.00,69.00,13.00,47.00,36.00,46.00,139.09,0",
						"142,38.00,61.00,36.00,90.00,64.00,73.00,12.00,10.00,16.00,6.00,98.00,46.00,22.00,21.00,150.63,0",
						"143,56.00,60.00,23.00,78.00,57.00,78.00,33.00,33.00,42.00,80.00,36.00,74.00,3.00,43.00,124.00,0",
						"144,26.00,23.00,60.00,77.00,1.00,86.00,69.00,29.00,57.00,22.00,85.00,54.00,65.00,13.00,138.28,0",
						"145,56.00,28.00,38.00,47.00,48.00,35.00,3.00,31.00,42.00,8.00,5.00,41.00,95.00,38.00,145.56,0",
						"146,63.00,4.00,49.00,2.00,15.00,37.00,77.00,72.00,51.00,96.00,54.00,47.00,30.00,0.00,153.97,0",
						"147,31.00,51.00,42.00,67.00,79.00,69.00,71.00,91.00,10.00,63.00,96.00,0.00,77.00,6.00,164.47,0",
						"148,3.00,10.00,99.00,98.00,28.00,27.00,62.00,50.00,74.00,95.00,17.00,22.00,52.00,56.00,171.09,0",
						"149,1.06,3.14,31.07,30.76,8.79,8.56,19.53,16.04,23.23,29.82,5.34,6.90,16.75,18.31,101.21,0",
						"150,0.66,0.99,9.75,9.65,2.76,3.16,6.70,5.36,7.29,9.36,1.67,2.17,5.51,6.13,31.77,0",
						"151,0.54,0.30,2.96,2.93,0.84,1.44,2.62,1.96,2.21,2.84,0.51,0.66,1.93,2.25,9.96,0",
						"152,0.50,0.09,0.93,0.92,0.26,0.92,1.40,0.94,0.69,0.89,0.16,0.21,0.86,1.09,3.22,0",
						"153,0.38,0.03,0.29,0.29,0.08,0.48,0.79,0.63,0.22,0.28,0.05,0.06,0.37,0.42,1.19,1",
						"154,0.34,0.01,0.09,0.09,0.03,0.35,0.59,0.53,0.07,0.08,0.02,0.02,0.21,0.21,0.40,1",
						"155,0.33,0.00,0.03,0.03,0.01,0.37,0.52,0.47,0.02,0.03,0.00,0.01,0.26,0.23,0.25,1",
						"156,0.33,0.00,0.01,0.01,0.00,0.23,0.28,0.37,0.01,0.01,0.00,0.00,0.37,0.43,0.23,1",
						"157,0.33,0.00,0.00,0.00,0.00,0.18,0.20,0.34,0.00,0.00,0.00,0.00,0.40,0.49,0.21,1",
						"158,0.33,0.00,0.00,0.00,0.00,0.17,0.18,0.33,0.00,0.00,0.00,0.00,0.41,0.51,0.25,1",
						"159,0.32,0.00,0.00,0.00,0.00,0.13,0.11,0.49,0.00,0.00,0.00,0.00,0.24,0.21,0.29,1",
						"160,0.31,0.00,0.00,0.00,0.00,0.12,0.10,0.51,0.00,0.00,0.00,0.00,0.27,0.27,66.51,1",
						"161,42.00,37.00,58.00,14.00,7.00,64.00,96.00,72.00,45.00,56.00,80.00,42.00,30.00,19.00,176.00,0",
						"162,65.00,44.00,97.00,90.00,90.00,25.00,3.00,46.00,27.00,79.00,90.00,15.00,87.00,27.00,157.71,0",
						"163,57.00,83.00,23.00,74.00,71.00,98.00,85.00,38.00,91.00,17.00,86.00,62.00,81.00,62.00,157.91,0",
						"164,90.00,35.00,67.00,84.00,94.00,28.00,99.00,84.00,92.00,17.00,4.00,20.00,31.00,18.00,158.10,0",
						"165,72.00,40.00,86.00,62.00,40.00,55.00,26.00,77.00,19.00,79.00,72.00,7.00,30.00,21.00,147.60,0",
						"166,86.00,20.00,1.00,91.00,30.00,89.00,79.00,24.00,5.00,31.00,88.00,16.00,33.00,84.00,150.26,0",
						"167,97.00,53.00,58.00,51.00,14.00,54.00,28.00,25.00,75.00,91.00,46.00,62.00,40.00,2.00,148.31,0",
						"168,36.00,81.00,98.00,89.00,62.00,38.00,11.00,12.00,20.00,70.00,95.00,38.00,98.00,52.00,135.98,0",
						"169,73.00,36.00,89.00,58.00,77.00,46.00,9.00,86.00,24.00,39.00,39.00,12.00,67.00,48.00,155.19,0",
						"170,34.00,71.00,42.00,72.00,89.00,73.00,8.00,67.00,88.00,59.00,43.00,89.00,32.00,24.00,125.99,0",
						"171,49.00,2.00,34.00,9.00,70.00,41.00,4.00,3.00,38.00,98.00,43.00,30.00,55.00,65.00,152.87,0",
						"172,57.00,60.00,48.00,33.00,10.00,6.00,30.00,89.00,87.00,9.00,40.00,10.00,39.00,0.00,167.82,0",
						"173,90.00,54.00,73.00,53.00,98.00,69.00,36.00,79.00,30.00,91.00,18.00,48.00,82.00,42.00,154.46,0",
						"174,72.00,61.00,3.00,26.00,30.00,95.00,83.00,42.00,11.00,75.00,19.00,49.00,81.00,79.00,163.08,0",
						"175,10.00,27.00,75.00,68.00,99.00,75.00,65.00,44.00,26.00,19.00,68.00,1.00,18.00,42.00,153.23,0",
						"176,98.00,0.00,95.00,85.00,92.00,76.00,95.00,12.00,12.00,47.00,22.00,8.00,52.00,60.00,180.10,0",
						"177,98.00,48.00,0.00,30.00,26.00,9.00,21.00,0.00,91.00,72.00,70.00,30.00,34.00,26.00,156.32,0",
						"178,30.99,15.07,0.00,9.42,8.16,2.98,6.82,0.55,28.56,22.60,21.97,9.42,11.30,9.37,94.54,0",
						"179,10.28,4.73,0.00,2.96,2.56,20.26,2.48,0.18,8.96,7.09,6.90,2.96,3.57,2.96,74.50,0",
						"180,3.61,1.48,0.00,0.93,0.80,1.12,2.10,0.50,2.81,2.23,2.16,0.93,1.32,1.11,67.54,0",
						"181,1.46,0.47,0.00,0.29,0.25,0.82,1.23,0.48,0.88,0.70,0.68,0.29,0.67,0.73,18.68,0",
						"182,0.78,0.14,0.00,0.09,0.08,0.73,0.96,0.48,0.27,0.21,0.21,0.09,0.46,0.61,5.98,1",
						"183,0.58,0.04,0.00,0.03,0.02,0.92,1.13,0.38,0.08,0.07,0.06,0.03,0.26,0.37,1.90,1",
						"184,0.49,0.01,0.00,0.01,0.01,0.67,1.02,0.40,0.03,0.02,0.02,0.01,0.28,0.32,0.82,1",
						"185,0.38,0.00,0.00,0.00,0.00,0.46,0.69,0.49,0.01,0.01,0.01,0.00,0.29,0.31,0.40,1",
						"186,0.45,0.00,0.00,0.00,0.00,0.41,0.60,0.38,0.00,0.00,0.00,0.00,0.17,0.17,0.26,1",
						"187,0.25,0.00,0.00,0.00,0.00,0.32,0.45,0.45,0.00,0.00,0.00,0.00,0.23,0.20,0.14,1",
						"188,0.19,0.00,0.00,0.00,0.00,0.29,0.40,0.47,0.00,0.00,0.00,0.00,0.25,0.21,0.23,1",
						"189,0.18,0.00,0.00,0.00,0.00,0.20,0.24,0.37,0.00,0.00,0.00,0.00,0.16,0.13,0.23,1",
						"190,0.17,0.00,0.00,0.00,0.00,0.16,0.15,0.34,0.00,0.00,0.00,0.00,0.13,0.10,0.21,1",
						"191,0.28,0.00,0.00,0.00,0.00,0.13,0.11,0.44,0.00,0.00,0.00,0.00,0.18,0.15,0.15,1",
						"192,0.20,0.00,0.00,0.00,0.00,0.12,0.10,0.26,0.00,0.00,0.00,0.00,0.16,0.14,75.95,1",
						"193,46.00,74.00,25.00,98.00,69.00,56.00,0.00,31.00,78.00,70.00,63.00,55.00,46.00,71.00,175.45,0",
						"194,28.00,77.00,83.00,78.00,33.00,3.00,62.00,11.00,62.00,22.00,80.00,35.00,97.00,82.00,148.31,0",
						"195,38.00,43.00,69.00,22.00,57.00,76.00,74.00,42.00,77.00,89.00,20.00,73.00,47.00,34.00,146.11,0",
						"196,86.00,85.00,2.00,54.00,93.00,74.00,54.00,9.00,14.00,16.00,7.00,9.00,20.00,49.00,153.33,0",
						"197,65.00,47.00,37.00,3.00,34.00,28.00,77.00,10.00,2.00,1.00,4.00,15.00,56.00,16.00,161.21,0",
						"198,93.00,38.00,41.00,30.00,51.00,34.00,16.00,87.00,32.00,59.00,89.00,61.00,10.00,31.00,154.48,0",
						"199,32.00,54.00,85.00,93.00,55.00,16.00,49.00,28.00,72.00,30.00,20.00,57.00,80.00,45.00,152.06,0",
						"200,63.00,69.00,36.00,81.00,79.00,82.00,43.00,58.00,38.00,97.00,90.00,59.00,90.00,76.00,141.48,0",
						"201,96.00,86.00,29.00,1.00,77.00,70.00,98.00,7.00,25.00,51.00,12.00,85.00,91.00,13.00,178.94,0",
						"202,36.00,55.00,92.00,28.00,99.00,97.00,7.00,58.00,15.00,39.00,62.00,78.00,31.00,45.00,135.77,0",
						"203,83.00,9.00,41.00,67.00,74.00,56.00,87.00,19.00,78.00,22.00,86.00,55.00,76.00,64.00,168.92,0",
						"204,59.00,35.00,86.00,15.00,77.00,87.00,2.00,46.00,8.00,78.00,91.00,89.00,32.00,23.00,168.97,0",
						"205,69.00,57.00,81.00,85.00,14.00,26.00,63.00,86.00,64.00,39.00,67.00,92.00,7.00,66.00,171.51,0",
						"206,22.21,17.89,25.42,26.68,4.39,27.48,20.12,27.00,20.09,12.24,21.03,28.88,2.22,20.73,113.27,0",
						"207,1.79,20.09,2.20,0.00,6.90,14.29,25.05,8.81,1.57,3.14,24.17,6.90,3.01,2.38,76.08,0",
						"208,1.12,6.30,0.69,0.00,2.17,23.81,8.20,2.77,0.49,0.99,7.59,2.17,0.97,0.76,80.63,0",
						"209,14.67,26.36,3.77,11.30,31.07,17.42,19.69,3.38,6.28,9.73,19.15,23.23,1.26,3.41,75.36,0",
						"210,5.16,8.27,1.18,3.55,9.75,24.79,6.52,1.07,1.97,3.05,6.01,7.29,0.42,1.09,31.25,0",
						"211,2.13,2.51,0.36,1.08,2.96,27.14,2.33,0.33,0.60,0.93,1.82,2.21,0.15,0.35,9.78,0",
						"212,1.22,0.79,0.11,0.34,0.93,27.84,1.07,0.11,0.19,0.29,0.57,0.69,0.07,0.13,14.91,0",
						"213,0.79,0.26,0.04,0.11,0.30,1.07,1.78,0.51,0.06,0.09,0.19,0.23,0.24,0.23,14.04,0",
						"214,0.58,0.08,0.01,0.03,0.09,1.03,1.38,0.39,0.02,0.03,0.06,0.07,0.19,0.25,0.60,1",
						"215,0.52,0.02,0.00,0.01,0.03,1.02,1.26,0.34,0.01,0.01,0.02,0.02,0.17,0.26,0.16,1",
						"216,0.50,0.01,0.00,0.00,0.01,1.02,1.22,0.33,0.00,0.00,0.01,0.01,0.17,0.26,0.45,1",
						"217,0.49,0.00,0.00,0.00,0.00,0.58,0.77,0.33,0.00,0.00,0.00,0.00,0.13,0.15,0.40,1",
						"218,0.26,0.00,0.00,0.00,0.00,0.37,0.50,0.43,0.00,0.00,0.00,0.00,0.22,0.20,0.23,1",
						"219,0.19,0.00,0.00,0.00,0.00,0.31,0.42,0.47,0.00,0.00,0.00,0.00,0.25,0.21,0.18,1",
						"220,0.18,0.00,0.00,0.00,0.00,0.21,0.24,0.37,0.00,0.00,0.00,0.00,0.16,0.13,0.18,1",
						"221,0.17,0.00,0.00,0.00,0.00,0.17,0.15,0.34,0.00,0.00,0.00,0.00,0.13,0.10,0.07,1",
						"222,0.16,0.00,0.00,0.00,0.00,0.15,0.13,0.33,0.00,0.00,0.00,0.00,0.13,0.09,0.03,1",
						"223,0.16,0.00,0.00,0.00,0.00,0.15,0.12,0.33,0.00,0.00,0.00,0.00,0.12,0.09,0.07,1",
						"224,0.16,0.00,0.00,0.00,0.00,0.13,0.11,0.19,0.00,0.00,0.00,0.00,0.16,0.13,61.60,1",
						"225,27.00,25.00,64.00,20.00,20.00,48.00,46.00,83.00,16.00,74.00,87.00,10.00,56.00,7.00,150.44,0",
						"226,19.00,59.00,49.00,32.00,1.00,73.00,66.00,76.00,9.00,47.00,35.00,33.00,61.00,19.00,124.83,0",
						"227,64.00,42.00,83.00,55.00,59.00,75.00,93.00,56.00,73.00,45.00,72.00,8.00,92.00,5.00,149.32,0",
						"228,55.00,30.00,66.00,27.00,92.00,32.00,10.00,84.00,9.00,37.00,60.00,97.00,29.00,41.00,173.26,0",
						"229,3.00,91.00,2.00,26.00,15.00,61.00,54.00,60.00,98.00,89.00,66.00,18.00,32.00,92.00,200.47,0",
						"230,39.00,36.00,74.00,3.00,89.00,29.00,95.00,34.00,7.00,38.00,59.00,65.00,20.00,16.00,152.63,0",
						"231,37.00,46.00,44.00,4.00,64.00,51.00,42.00,66.00,3.00,37.00,66.00,13.00,9.00,30.00,133.20,0",
						"232,32.00,28.00,57.00,92.00,3.00,80.00,87.00,46.00,57.00,46.00,67.00,56.00,12.00,49.00,141.83,0",
						"233,27.00,63.00,58.00,83.00,67.00,66.00,14.00,57.00,50.00,89.00,82.00,13.00,28.00,61.00,155.66,0",
						"234,2.00,31.00,99.00,69.00,95.00,60.00,24.00,41.00,57.00,27.00,94.00,92.00,2.00,17.00,151.47,0",
						"235,34.00,80.00,28.00,17.00,2.00,41.00,7.00,61.00,48.00,34.00,8.00,44.00,0.00,17.00,169.71,0",
						"236,78.00,93.00,46.00,26.00,94.00,89.00,9.00,80.00,38.00,17.00,9.00,12.00,44.00,15.00,148.05,0",
						"237,25.03,29.19,14.44,8.16,29.50,47.26,3.17,25.12,11.93,5.34,2.82,3.77,13.83,4.72,109.09,0",
						"238,8.16,8.86,4.38,2.48,8.95,33.96,1.31,7.63,3.62,1.62,0.86,1.14,4.22,1.45,34.16,0",
						"239,3.11,2.78,1.38,0.78,2.81,29.98,0.75,2.40,1.14,0.51,0.27,0.36,1.35,0.47,16.27,0",
						"240,1.51,0.84,0.42,0.24,0.85,28.71,0.58,0.74,0.34,0.15,0.08,0.11,0.43,0.16,5.10,0",
						"241,1.03,0.26,0.13,0.07,0.27,28.33,0.52,0.24,0.11,0.05,0.03,0.03,0.16,0.07,15.32,0",
						"242,0.87,0.08,0.04,0.02,0.08,28.21,0.51,0.08,0.03,0.01,0.01,0.01,0.07,0.04,4.81,1",
						"243,0.83,0.03,0.01,0.01,0.03,28.18,0.50,0.03,0.01,0.00,0.00,0.00,0.04,0.03,1.46,1",
						"244,0.81,0.01,0.00,0.00,0.01,28.17,0.50,0.02,0.00,0.00,0.00,0.00,0.04,0.03,0.46,1",
						"245,0.81,0.00,0.00,0.00,0.00,28.16,0.50,0.01,0.00,0.00,0.00,0.00,0.03,0.02,19.45,1",
						"246,0.51,0.00,0.00,0.00,0.00,1.82,1.21,0.33,0.00,0.00,0.00,0.00,0.17,0.25,7.04,1",
						"247,0.51,0.00,0.00,0.00,0.00,1.00,1.14,0.34,0.00,0.00,0.00,0.00,0.22,0.25,0.47,1",
						"248,0.49,0.00,0.00,0.00,0.00,0.58,0.74,0.33,0.00,0.00,0.00,0.00,0.15,0.14,0.54,1",
						"249,0.48,0.00,0.00,0.00,0.00,0.44,0.62,0.33,0.00,0.00,0.00,0.00,0.13,0.11,0.20,1",
						"250,0.34,0.00,0.00,0.00,0.00,0.41,0.53,0.33,0.00,0.00,0.00,0.00,0.19,0.18,0.22,1",
						"251,0.23,0.00,0.00,0.00,0.00,0.24,0.28,0.33,0.00,0.00,0.00,0.00,0.14,0.12,0.29,1",
						"252,0.18,0.00,0.00,0.00,0.00,0.17,0.16,0.33,0.00,0.00,0.00,0.00,0.13,0.10,0.11,1",
						"253,0.17,0.00,0.00,0.00,0.00,0.16,0.13,0.33,0.00,0.00,0.00,0.00,0.13,0.09,0.04,1",
						"254,0.17,0.00,0.00,0.00,0.00,0.16,0.16,0.33,0.00,0.00,0.00,0.00,0.11,0.08,0.03,1",
						"255,0.17,0.00,0.00,0.00,0.00,0.15,0.13,0.33,0.00,0.00,0.00,0.00,0.12,0.09,0.02,1",
						"256,0.16,0.00,0.00,0.00,0.00,0.15,0.12,0.33,0.00,0.00,0.00,0.00,0.12,0.09,77.44,1",
						"257,20.00,93.00,57.00,49.00,77.00,36.00,4.00,92.00,30.00,99.00,8.00,35.00,44.00,98.00,186.62,0",
						"258,5.00,17.00,24.00,56.00,42.00,49.00,77.00,89.00,74.00,20.00,45.00,93.00,22.00,59.00,155.90,0",
						"259,76.00,25.00,36.00,73.00,38.00,32.00,0.00,61.00,35.00,4.00,31.00,44.00,17.00,89.00,152.93,0",
						"260,29.00,42.00,1.00,96.00,53.00,27.00,74.00,53.00,41.00,77.00,23.00,86.00,80.00,37.00,159.94,0",
						"261,89.00,78.00,71.00,48.00,22.00,34.00,87.00,7.00,13.00,7.00,40.00,87.00,90.00,27.00,157.28,0",
						"262,0.00,43.00,51.00,82.00,64.00,63.00,0.00,77.00,64.00,7.00,4.00,74.00,99.00,45.00,161.40,0",
						"263,53.00,18.00,5.00,48.00,62.00,96.00,9.00,10.00,60.00,0.00,34.00,37.00,6.00,12.00,159.48,0",
						"264,77.00,46.00,75.00,62.00,43.00,6.00,71.00,3.00,69.00,26.00,15.00,20.00,74.00,99.00,151.18,0",
						"265,93.00,44.00,36.00,12.00,59.00,10.00,82.00,56.00,31.00,21.00,38.00,3.00,52.00,29.00,141.14,0",
						"266,78.00,73.00,69.00,45.00,35.00,81.00,95.00,67.00,98.00,77.00,22.00,64.00,99.00,40.00,162.64,0",
						"267,76.00,38.00,73.00,84.00,22.00,72.00,79.00,2.00,13.00,61.00,29.00,2.00,76.00,48.00,150.56,0",
						"268,24.41,11.93,22.91,26.36,6.90,41.92,25.14,0.63,4.08,19.15,9.10,0.63,23.88,15.08,100.49,0",
						"269,7.97,3.62,6.95,8.00,2.10,32.34,7.98,0.20,1.24,5.81,2.76,0.19,7.27,4.59,31.55,0",
						"270,3.05,1.14,2.18,2.51,0.66,29.47,2.85,0.07,0.39,1.82,0.87,0.06,2.30,1.46,9.57,1",
						"271,1.49,0.34,0.66,0.76,0.20,28.56,1.21,0.03,0.12,0.55,0.26,0.02,0.72,0.46,3.01,1",
						"272,1.02,0.11,0.21,0.24,0.06,28.29,0.72,0.02,0.04,0.17,0.08,0.01,0.25,0.16,0.91,1",
						"273,0.87,0.03,0.06,0.07,0.02,28.20,0.57,0.01,0.01,0.05,0.03,0.00,0.10,0.07,0.29,1",
						"274,0.83,0.01,0.02,0.02,0.01,28.17,0.52,0.01,0.00,0.02,0.01,0.00,0.05,0.04,4.64,1",
						"275,0.81,0.00,0.01,0.01,0.00,28.16,0.51,0.01,0.00,0.01,0.00,0.00,0.04,0.03,1.45,1",
						"276,0.81,0.00,0.00,0.00,0.00,28.16,0.50,0.01,0.00,0.00,0.00,0.00,0.03,0.03,12.49,1",
						"277,0.66,0.00,0.00,0.00,0.00,3.91,1.46,0.30,0.00,0.00,0.00,0.00,0.11,0.09,13.15,1",
						"278,0.54,0.00,0.00,0.00,0.00,1.92,1.28,0.32,0.00,0.00,0.00,0.00,0.15,0.21,0.81,1",
						"279,0.51,0.00,0.00,0.00,0.00,1.29,1.23,0.32,0.00,0.00,0.00,0.00,0.16,0.25,0.32,1",
						"280,0.49,0.00,0.00,0.00,0.00,1.10,1.21,0.33,0.00,0.00,0.00,0.00,0.17,0.26,0.49,1",
						"281,0.48,0.00,0.00,0.00,0.00,0.61,0.76,0.33,0.00,0.00,0.00,0.00,0.13,0.15,0.52,1",
						"282,0.48,0.00,0.00,0.00,0.00,0.45,0.62,0.33,0.00,0.00,0.00,0.00,0.12,0.11,0.20,1",
						"283,0.48,0.00,0.00,0.00,0.00,0.41,0.58,0.33,0.00,0.00,0.00,0.00,0.12,0.10,0.28,1",
						"284,0.27,0.00,0.00,0.00,0.00,0.24,0.29,0.33,0.00,0.00,0.00,0.00,0.12,0.10,0.22,1",
						"285,0.20,0.00,0.00,0.00,0.00,0.17,0.17,0.33,0.00,0.00,0.00,0.00,0.12,0.09,0.08,1",
						"286,0.17,0.00,0.00,0.00,0.00,0.16,0.13,0.33,0.00,0.00,0.00,0.00,0.12,0.09,0.03,1",
						"287,0.17,0.00,0.00,0.00,0.00,0.15,0.12,0.33,0.00,0.00,0.00,0.00,0.12,0.09,0.09,1",
						"288,0.17,0.00,0.00,0.00,0.00,0.12,0.10,0.18,0.00,0.00,0.00,0.00,0.15,0.13,77.68,1",
						"289,88.00,79.00,27.00,8.00,25.00,87.00,60.00,53.00,96.00,14.00,38.00,83.00,35.00,77.00,182.67,0",
						"290,86.00,71.00,50.00,85.00,84.00,39.00,38.00,9.00,55.00,90.00,96.00,70.00,91.00,21.00,171.70,0",
						"291,75.00,0.00,83.00,27.00,36.00,91.00,21.00,49.00,99.00,15.00,66.00,76.00,54.00,30.00,138.22,0",
						"292,76.00,16.00,94.00,29.00,6.00,67.00,14.00,63.00,66.00,48.00,28.00,21.00,39.00,98.00,146.41,0",
						"293,99.00,26.00,86.00,97.00,35.00,39.00,59.00,27.00,25.00,38.00,48.00,95.00,86.00,65.00,146.04,0",
						"294,13.00,95.00,24.00,82.00,60.00,48.00,4.00,43.00,57.00,84.00,17.00,13.00,63.00,48.00,150.74,0",
						"295,94.00,25.00,90.00,84.00,43.00,27.00,24.00,8.00,84.00,86.00,58.00,17.00,72.00,12.00,151.41,0",
						"296,44.00,10.00,60.00,93.00,89.00,65.00,67.00,50.00,78.00,53.00,29.00,48.00,50.00,9.00,136.51,0",
						"297,56.00,36.00,75.00,35.00,37.00,29.00,16.00,83.00,64.00,90.00,30.00,0.00,54.00,5.00,130.51,0",
						"298,26.00,14.00,80.00,69.00,1.00,54.00,12.00,61.00,87.00,31.00,89.00,10.00,69.00,41.00,144.60,0",
						"299,89.00,83.00,90.00,67.00,63.00,60.00,2.00,61.00,11.00,16.00,26.00,53.00,21.00,64.00,156.72,0",
						"300,28.16,26.05,28.25,21.03,19.77,19.09,0.92,19.26,3.45,5.02,8.16,16.63,6.67,20.16,106.17,0",
						"301,9.39,8.18,8.87,6.60,6.21,25.31,0.63,6.05,1.08,1.58,2.56,5.22,2.12,6.34,33.45,0",
						"302,3.41,2.48,2.69,2.00,1.88,27.30,0.54,1.84,0.33,0.48,0.78,1.58,0.66,1.94,10.51,1",
						"303,1.62,0.78,0.84,0.63,0.59,27.89,0.51,0.59,0.10,0.15,0.24,0.50,0.23,0.63,3.19,1",
						"304,1.05,0.24,0.26,0.19,0.18,28.08,0.50,0.18,0.03,0.05,0.07,0.15,0.09,0.21,1.00,1",
						"305,0.88,0.07,0.08,0.06,0.06,28.13,0.50,0.06,0.01,0.01,0.02,0.05,0.05,0.08,9.29,1",
						"306,0.83,0.02,0.03,0.02,0.02,9.96,1.45,0.14,0.00,0.00,0.01,0.01,0.12,0.14,13.66,1",
						"307,0.81,0.01,0.01,0.01,0.01,22.45,0.80,0.05,0.00,0.00,0.00,0.00,0.06,0.06,14.52,1",
						"308,0.81,0.00,0.00,0.00,0.00,2.58,2.22,0.31,0.00,0.00,0.00,0.00,0.21,0.19,11.77,1",
						"309,0.81,0.00,0.00,0.00,0.00,2.04,2.28,0.32,0.00,0.00,0.00,0.00,0.22,0.19,0.96,1",
						"310,0.65,0.00,0.00,0.00,0.00,1.54,1.48,0.32,0.00,0.00,0.00,0.00,0.21,0.19,0.67,1",
						"311,0.54,0.00,0.00,0.00,0.00,1.18,1.29,0.33,0.00,0.00,0.00,0.00,0.18,0.24,0.31,1",
						"312,0.51,0.00,0.00,0.00,0.00,1.24,1.41,0.61,0.00,0.00,0.00,0.00,0.27,0.28,0.28,1",
						"313,0.49,0.00,0.00,0.00,0.00,1.22,1.41,0.63,0.00,0.00,0.00,0.00,0.27,0.28,0.64,1",
						"314,0.48,0.00,0.00,0.00,0.00,0.65,0.83,0.42,0.00,0.00,0.00,0.00,0.17,0.16,0.65,1",
						"315,0.38,0.00,0.00,0.00,0.00,0.34,0.42,0.25,0.00,0.00,0.00,0.00,0.06,0.05,0.32,1",
						"316,0.34,0.00,0.00,0.00,0.00,0.20,0.21,0.19,0.00,0.00,0.00,0.00,0.09,0.08,0.19,1",
						"317,0.23,0.00,0.00,0.00,0.00,0.17,0.18,0.28,0.00,0.00,0.00,0.00,0.11,0.09,0.11,1",
						"318,0.18,0.00,0.00,0.00,0.00,0.15,0.13,0.31,0.00,0.00,0.00,0.00,0.12,0.09,0.13,1",
						"319,0.33,0.00,0.00,0.00,0.00,0.12,0.10,0.17,0.00,0.00,0.00,0.00,0.16,0.16,0.18,1",
						"320,0.33,0.00,0.00,0.00,0.00,0.12,0.09,0.17,0.00,0.00,0.00,0.00,0.16,0.16,76.14,1",
						"321,90.00,63.00,14.00,66.00,66.00,2.00,88.00,63.00,54.00,47.00,6.00,90.00,63.00,48.00,174.60,0",
						"322,6.00,31.00,61.00,92.00,68.00,64.00,25.00,24.00,86.00,32.00,35.00,1.00,58.00,58.00,137.72,0",
						"323,8.00,10.00,58.00,54.00,94.00,99.00,51.00,39.00,85.00,2.00,44.00,13.00,92.00,53.00,118.97,0",
						"324,5.00,50.00,53.00,13.00,74.00,76.00,26.00,30.00,29.00,21.00,7.00,57.00,44.00,68.00,135.93,0",
						"325,90.00,71.00,98.00,40.00,94.00,71.00,46.00,99.00,29.00,27.00,41.00,5.00,53.00,24.00,153.70,0",
						"326,25.00,87.00,53.00,84.00,78.00,63.00,81.00,69.00,73.00,6.00,31.00,77.00,9.00,69.00,148.09,0",
						"327,38.00,5.00,81.00,49.00,77.00,79.00,53.00,34.00,14.00,4.00,29.00,55.00,33.00,62.00,133.69,0",
						"328,24.00,0.00,67.00,15.00,11.00,56.00,44.00,7.00,72.00,18.00,12.00,76.00,50.00,84.00,128.38,0",
						"329,11.00,81.00,43.00,32.00,69.00,76.00,46.00,35.00,93.00,61.00,28.00,96.00,58.00,21.00,147.16,0",
						"330,33.00,41.00,67.00,48.00,51.00,16.00,51.00,51.00,70.00,9.00,1.00,21.00,33.00,64.00,140.07,0",
						"331,55.00,81.00,70.00,83.00,55.00,93.00,93.00,3.00,92.00,2.00,77.00,8.00,53.00,61.00,158.24,0",
						"332,55.00,58.00,7.00,82.00,41.00,30.00,82.00,44.00,48.00,62.00,34.00,97.00,7.00,98.00,166.30,0",
						"333,17.49,18.20,2.20,25.74,12.87,9.67,26.03,13.92,15.07,19.46,10.67,30.44,2.28,30.83,104.49,0",
						"334,6.04,5.71,0.69,8.08,4.04,22.36,8.51,4.38,4.73,6.11,3.35,9.56,0.74,9.69,32.31,0",
						"335,2.40,1.73,0.21,2.45,1.23,26.40,2.93,1.33,1.44,1.85,1.02,2.90,0.25,2.96,10.12,0",
						"336,1.30,0.54,0.07,0.77,0.38,27.61,1.26,0.43,0.45,0.58,0.32,0.91,0.10,0.94,25.49,0",
						"337,0.96,0.17,0.02,0.24,0.12,9.79,1.68,0.25,0.14,0.18,0.10,0.29,0.13,0.41,16.53,1",
						"338,0.86,0.05,0.01,0.08,0.04,4.31,2.11,0.30,0.04,0.06,0.03,0.09,0.20,0.26,5.13,1",
						"339,0.82,0.02,0.00,0.02,0.01,2.56,2.24,0.32,0.01,0.02,0.01,0.03,0.22,0.21,6.26,1",
						"340,0.82,0.01,0.00,0.01,0.00,1.68,1.94,0.18,0.00,0.01,0.00,0.01,0.11,0.13,0.80,1",
						"341,0.81,0.00,0.00,0.00,0.00,1.76,2.19,0.28,0.00,0.00,0.00,0.00,0.19,0.17,0.25,1",
						"342,0.81,0.00,0.00,0.00,0.00,1.79,2.27,0.31,0.00,0.00,0.00,0.00,0.21,0.19,0.78,1",
						"343,0.51,0.00,0.00,0.00,0.00,1.22,1.42,0.61,0.00,0.00,0.00,0.00,0.27,0.28,0.49,1",
						"344,0.65,0.00,0.00,0.00,0.00,1.30,1.49,0.33,0.00,0.00,0.00,0.00,0.21,0.19,0.46,1",
						"345,0.54,0.00,0.00,0.00,0.00,0.94,1.19,0.11,0.00,0.00,0.00,0.00,0.07,0.06,0.53,1",
						"346,0.51,0.00,0.00,0.00,0.00,1.22,1.42,0.61,0.00,0.00,0.00,0.00,0.27,0.28,0.90,1",
						"347,0.38,0.00,0.00,0.00,0.00,0.51,0.57,0.30,0.00,0.00,0.00,0.00,0.09,0.09,0.49,1",
						"348,0.34,0.00,0.00,0.00,0.00,0.30,0.34,0.21,0.00,0.00,0.00,0.00,0.03,0.03,0.21,1",
						"349,0.33,0.00,0.00,0.00,0.00,0.17,0.17,0.19,0.00,0.00,0.00,0.00,0.12,0.12,0.17,1",
						"350,0.33,0.00,0.00,0.00,0.00,0.13,0.12,0.18,0.00,0.00,0.00,0.00,0.15,0.15,0.11,1",
						"351,0.33,0.00,0.00,0.00,0.00,0.15,0.13,0.16,0.00,0.00,0.00,0.00,0.10,0.09,0.08,1",
						"352,0.33,0.00,0.00,0.00,0.00,0.13,0.10,0.17,0.00,0.00,0.00,0.00,0.14,0.14,63.16,1",
						"353,67.00,16.00,86.00,51.00,38.00,52.00,3.00,37.00,40.00,65.00,54.00,44.00,66.00,26.00,154.01,0",
						"354,49.00,59.00,56.00,93.00,92.00,64.00,62.00,44.00,21.00,7.00,98.00,61.00,82.00,77.00,142.26,0",
						"355,31.00,72.00,25.00,33.00,21.00,45.00,70.00,0.00,49.00,52.00,41.00,6.00,82.00,62.00,150.27,0",
						"356,2.00,97.00,86.00,37.00,93.00,13.00,51.00,19.00,80.00,5.00,65.00,96.00,93.00,54.00,153.45,0",
						"357,16.00,86.00,39.00,53.00,23.00,38.00,64.00,28.00,9.00,58.00,63.00,26.00,34.00,41.00,142.45,0",
						"358,51.00,75.00,18.00,4.00,20.00,77.00,81.00,79.00,4.00,84.00,33.00,35.00,67.00,77.00,134.86,0",
						"359,20.00,43.00,56.00,54.00,31.00,77.00,59.00,74.00,69.00,77.00,39.00,96.00,59.00,65.00,131.98,0",
						"360,17.00,69.00,84.00,20.00,15.00,8.00,20.00,5.00,76.00,23.00,10.00,99.00,69.00,24.00,133.09,0",
						"361,99.00,23.00,93.00,13.00,63.00,14.00,82.00,36.00,70.00,10.00,79.00,86.00,36.00,44.00,169.41,0",
						"362,11.00,56.00,26.00,48.00,59.00,86.00,57.00,32.00,5.00,56.00,69.00,70.00,17.00,82.00,157.83,0",
						"363,71.00,62.00,84.00,0.00,88.00,9.00,77.00,59.00,34.00,16.00,44.00,0.00,54.00,48.00,145.71,0",
						"364,75.00,26.00,48.00,15.00,83.00,30.00,34.00,49.00,11.00,28.00,4.00,38.00,83.00,60.00,134.85,0",
						"365,57.00,59.00,4.00,24.00,91.00,67.00,38.00,33.00,85.00,51.00,24.00,77.00,54.00,46.00,134.21,0",
						"366,18.11,18.52,1.26,7.53,28.56,21.28,12.22,10.47,26.68,16.01,7.53,24.17,17.03,14.51,97.60,0",
						"367,6.24,5.81,0.39,2.36,8.96,26.00,4.18,3.29,8.37,5.02,2.36,7.59,5.37,4.57,81.10,0",
						"368,26.08,16.63,26.05,30.13,27.31,24.68,23.32,0.43,11.93,21.97,21.97,21.03,30.46,4.41,78.70,0",
						"369,8.74,5.22,8.18,9.46,8.57,8.87,8.61,0.25,3.74,6.90,6.90,6.60,9.66,1.49,33.72,0",
						"370,3.30,1.64,2.57,2.97,2.69,3.91,3.99,0.20,1.17,2.16,2.16,2.07,3.14,0.58,10.53,0",
						"371,1.59,0.51,0.81,0.93,0.84,2.46,2.83,0.29,0.37,0.68,0.68,0.65,1.14,0.31,3.27,0",
						"372,1.04,0.16,0.24,0.28,0.26,2.00,2.46,0.31,0.11,0.21,0.21,0.20,0.50,0.23,1.09,0",
						"373,0.88,0.05,0.08,0.09,0.08,1.86,2.35,0.32,0.04,0.06,0.06,0.06,0.31,0.20,0.82,1",
						"374,0.69,0.01,0.02,0.03,0.02,1.14,1.43,0.17,0.01,0.02,0.02,0.02,0.06,0.03,0.76,1",
						"375,0.55,0.00,0.01,0.01,0.01,1.19,1.41,0.49,0.00,0.01,0.01,0.01,0.21,0.20,0.42,1",
						"376,0.51,0.00,0.00,0.00,0.00,0.91,1.16,0.16,0.00,0.00,0.00,0.00,0.07,0.07,0.37,1",
						"377,0.50,0.00,0.00,0.00,0.00,0.82,1.08,0.06,0.00,0.00,0.00,0.00,0.03,0.02,0.22,1",
						"378,0.49,0.00,0.00,0.00,0.00,0.79,1.06,0.02,0.00,0.00,0.00,0.00,0.01,0.01,0.60,1",
						"379,0.38,0.00,0.00,0.00,0.00,0.42,0.54,0.13,0.00,0.00,0.00,0.00,0.04,0.09,0.35,1",
						"380,0.34,0.00,0.00,0.00,0.00,0.25,0.30,0.15,0.00,0.00,0.00,0.00,0.02,0.03,0.14,1",
						"381,0.33,0.00,0.00,0.00,0.00,0.22,0.26,0.17,0.00,0.00,0.00,0.00,0.01,0.01,0.12,1",
						"382,0.33,0.00,0.00,0.00,0.00,0.15,0.14,0.17,0.00,0.00,0.00,0.00,0.11,0.12,0.14,1",
						"383,0.33,0.00,0.00,0.00,0.00,0.13,0.11,0.17,0.00,0.00,0.00,0.00,0.15,0.15,0.07,1",
						"384,0.33,0.00,0.00,0.00,0.00,0.12,0.10,0.17,0.00,0.00,0.00,0.00,0.16,0.16,73.53,1",
						"385,36.00,59.00,39.00,74.00,36.00,98.00,17.00,52.00,91.00,29.00,72.00,88.00,23.00,20.00,156.27,0",
						"386,79.00,11.00,39.00,75.00,34.00,94.00,85.00,87.00,99.00,39.00,45.00,63.00,80.00,60.00,143.11,0",
						"387,76.00,82.00,46.00,50.00,40.00,29.00,82.00,95.00,3.00,14.00,73.00,69.00,88.00,5.00,161.08,0",
						"388,17.00,20.00,41.00,69.00,64.00,91.00,7.00,38.00,45.00,4.00,24.00,98.00,41.00,9.00,140.75,0",
						"389,71.00,35.00,61.00,70.00,67.00,34.00,33.00,73.00,77.00,18.00,30.00,58.00,60.00,15.00,140.06,0",
						"390,5.00,69.00,7.00,13.00,8.00,65.00,66.00,0.00,78.00,75.00,43.00,31.00,31.00,24.00,161.16,0",
						"391,96.00,58.00,86.00,92.00,37.00,81.00,50.00,92.00,27.00,82.00,96.00,35.00,28.00,70.00,173.21,0",
						"392,43.00,5.00,31.00,57.00,11.00,17.00,41.00,73.00,92.00,65.00,18.00,82.00,79.00,8.00,157.67,0",
						"393,18.00,0.00,3.00,80.00,12.00,32.00,14.00,13.00,36.00,40.00,43.00,15.00,80.00,30.00,171.39,0",
						"394,88.00,40.00,45.00,45.00,24.00,62.00,89.00,69.00,99.00,60.00,41.00,89.00,2.00,55.00,159.74,0",
						"395,26.00,94.00,14.00,41.00,25.00,2.00,63.00,58.00,7.00,74.00,49.00,84.00,27.00,65.00,143.94,0",
						"396,23.00,53.00,51.00,3.00,0.00,31.00,95.00,91.00,70.00,20.00,36.00,70.00,19.00,55.00,150.13,0",
						"397,8.00,80.00,18.00,52.00,88.00,49.00,8.00,55.00,59.00,60.00,1.00,0.00,83.00,24.00,159.20,0",
						"398,0.00,32.00,79.00,92.00,48.00,16.00,2.00,17.00,4.00,25.00,90.00,40.00,73.00,7.00,157.33,0",
						"399,65.00,77.00,81.00,38.00,42.00,64.00,12.00,34.00,41.00,98.00,64.00,74.00,21.00,60.00,177.83,0",
						"400,10.00,49.00,47.00,36.00,18.00,3.00,19.00,86.00,72.00,15.00,19.00,11.00,24.00,14.00,129.03,0",
						"401,3.80,15.38,14.75,11.30,5.65,1.77,7.63,27.11,22.60,4.71,5.96,3.45,7.55,4.41,87.11,0",
						"402,1.75,4.83,4.63,3.55,1.77,1.68,3.68,8.63,7.09,1.48,1.87,1.08,2.47,1.49,50.56,0",
						"403,1.10,1.51,1.45,1.11,0.56,1.66,2.44,2.83,2.23,0.46,0.59,0.34,0.88,0.58,55.42,0",
						"404,0.90,0.48,0.46,0.35,0.17,1.75,2.35,1.11,0.70,0.15,0.18,0.11,0.43,0.31,42.91,0",
						"405,0.69,0.14,0.14,0.11,0.05,1.17,1.44,0.43,0.21,0.04,0.06,0.03,0.12,0.08,13.80,0",
						"406,0.65,0.05,0.04,0.03,0.02,1.22,1.49,0.33,0.07,0.01,0.02,0.01,0.19,0.16,4.21,1",
						"407,0.54,0.01,0.01,0.01,0.01,0.92,1.18,0.11,0.02,0.00,0.01,0.00,0.06,0.05,1.58,1",
						"408,0.51,0.00,0.00,0.00,0.00,0.82,1.09,0.04,0.01,0.00,0.00,0.00,0.02,0.02,0.61,0",
						"409,0.34,0.00,0.00,0.00,0.00,0.48,0.78,0.01,0.00,0.00,0.00,0.00,0.06,0.08,0.47,1",
						"410,0.33,0.00,0.00,0.00,0.00,0.33,0.46,0.12,0.00,0.00,0.00,0.00,0.06,0.11,0.36,1",
						"411,0.33,0.00,0.00,0.00,0.00,0.27,0.35,0.16,0.00,0.00,0.00,0.00,0.06,0.12,0.14,1",
						"412,0.33,0.00,0.00,0.00,0.00,0.26,0.32,0.17,0.00,0.00,0.00,0.00,0.06,0.12,0.08,1",
						"413,0.33,0.00,0.00,0.00,0.00,0.20,0.23,0.16,0.00,0.00,0.00,0.00,0.02,0.04,0.19,1",
						"414,0.11,0.00,0.00,0.00,0.00,0.14,0.13,0.28,0.00,0.00,0.00,0.00,0.13,0.12,0.20,1",
						"415,0.26,0.00,0.00,0.00,0.00,0.13,0.10,0.21,0.00,0.00,0.00,0.00,0.15,0.15,0.17,1",
						"416,0.33,0.00,0.00,0.00,0.00,0.12,0.11,0.33,0.00,0.00,0.00,0.00,0.25,0.22,84.44,1",
						"417,89.00,51.00,34.00,8.00,96.00,56.00,78.00,92.00,81.00,86.00,71.00,63.00,30.00,41.00,174.38,0",
						"418,1.00,16.00,78.00,39.00,5.00,99.00,30.00,97.00,60.00,87.00,72.00,23.00,34.00,45.00,151.39,0",
						"419,43.00,71.00,66.00,66.00,83.00,70.00,48.00,86.00,96.00,83.00,36.00,32.00,34.00,45.00,155.10,0",
						"420,69.00,60.00,10.00,16.00,41.00,69.00,52.00,51.00,27.00,17.00,70.00,81.00,20.00,36.00,132.35,0",
						"421,25.00,29.00,44.00,37.00,96.00,65.00,1.00,43.00,13.00,56.00,14.00,72.00,21.00,84.00,133.01,0",
						"422,26.00,95.00,56.00,56.00,4.00,4.00,10.00,21.00,8.00,50.00,13.00,72.00,27.00,42.00,133.65,0",
						"423,62.00,52.00,35.00,7.00,39.00,30.00,14.00,1.00,63.00,59.00,80.00,78.00,30.00,9.00,166.14,0",
						"424,26.00,32.00,89.00,90.00,82.00,6.00,74.00,54.00,26.00,15.00,97.00,20.00,60.00,89.00,184.46,0",
						"425,77.00,69.00,83.00,49.00,14.00,94.00,5.00,91.00,45.00,60.00,16.00,50.00,39.00,57.00,159.12,0",
						"426,76.00,40.00,28.00,24.00,58.00,81.00,94.00,22.00,56.00,69.00,26.00,1.00,85.00,3.00,157.83,0",
						"427,78.00,66.00,32.00,11.00,86.00,80.00,37.00,24.00,18.00,92.00,74.00,93.00,76.00,88.00,164.49,0",
						"428,54.00,19.00,76.00,71.00,36.00,5.00,87.00,19.00,80.00,55.00,42.00,86.00,2.00,79.00,148.23,0",
						"429,96.00,67.00,86.00,5.00,63.00,71.00,69.00,15.00,77.00,88.00,42.00,30.00,26.00,61.00,161.63,0",
						"430,31.00,9.00,19.00,90.00,15.00,8.00,89.00,3.00,4.00,36.00,32.00,45.00,81.00,74.00,168.72,0",
						"431,56.00,77.00,10.00,73.00,65.00,10.00,93.00,70.00,51.00,5.00,77.00,15.00,8.00,12.00,176.46,0",
						"432,10.00,60.00,95.00,57.00,83.00,34.00,3.00,49.00,96.00,33.00,0.00,50.00,8.00,86.00,166.18,0",
						"433,87.00,45.00,72.00,2.00,87.00,16.00,71.00,6.00,5.00,48.00,21.00,29.00,38.00,87.00,167.40,0",
						"434,55.00,35.00,31.00,45.00,21.00,8.00,7.00,41.00,78.00,85.00,47.00,11.00,21.00,22.00,144.36,0",
						"435,92.00,54.00,1.00,54.00,11.00,44.00,44.00,72.00,1.00,69.00,61.00,12.00,75.00,78.00,173.73,0",
						"436,52.00,33.00,0.00,2.00,7.00,33.00,17.00,0.00,94.00,28.00,91.00,64.00,5.00,29.00,164.43,0",
						"437,16.76,10.36,0.00,0.63,2.20,11.12,6.23,0.11,29.50,8.79,28.56,20.09,1.59,9.12,107.44,0",
						"438,5.54,3.14,0.00,0.19,0.67,4.15,2.80,0.15,8.95,2.67,8.67,6.10,0.51,2.78,33.64,0",
						"439,2.18,0.99,0.00,0.06,0.21,2.06,1.77,0.16,2.81,0.84,2.72,1.91,0.19,0.89,10.43,0",
						"440,1.02,0.31,0.00,0.02,0.07,1.18,1.27,0.06,0.88,0.26,0.85,0.60,0.06,0.28,28.45,0",
						"441,0.54,0.10,0.00,0.01,0.02,0.54,0.61,0.14,0.28,0.08,0.27,0.19,0.06,0.17,9.03,1",
						"442,0.39,0.03,0.00,0.00,0.01,0.34,0.40,0.16,0.08,0.03,0.08,0.06,0.06,0.14,2.84,1",
						"443,0.35,0.01,0.00,0.00,0.00,0.32,0.41,0.05,0.03,0.01,0.03,0.02,0.06,0.07,0.92,1",
						"444,0.34,0.00,0.00,0.00,0.00,0.27,0.34,0.14,0.01,0.00,0.01,0.01,0.06,0.11,0.40,1",
						"445,0.11,0.00,0.00,0.00,0.00,0.16,0.17,0.27,0.00,0.00,0.00,0.00,0.14,0.14,0.27,1",
						"446,0.04,0.00,0.00,0.00,0.00,0.13,0.11,0.31,0.00,0.00,0.00,0.00,0.16,0.16,0.10,1",
						"447,0.02,0.00,0.00,0.00,0.00,0.12,0.10,0.32,0.00,0.00,0.00,0.00,0.17,0.16,0.12,1",
						"448,0.33,0.00,0.00,0.00,0.00,0.16,0.17,0.31,0.00,0.00,0.00,0.00,0.17,0.17,65.57,1",
						"449,79.00,69.00,13.00,41.00,54.00,2.00,82.00,8.00,56.00,57.00,91.00,28.00,11.00,22.00,159.60,0",
						"450,25.00,86.00,69.00,40.00,89.00,47.00,81.00,8.00,33.00,52.00,72.00,49.00,61.00,32.00,149.87,0",
						"451,28.00,44.00,6.00,12.00,6.00,65.00,50.00,46.00,6.00,16.00,18.00,79.00,68.00,11.00,152.38,0",
						"452,62.00,24.00,54.00,22.00,57.00,88.00,28.00,37.00,46.00,85.00,34.00,35.00,58.00,64.00,119.01,0",
						"453,44.00,62.00,49.00,23.00,20.00,99.00,33.00,6.00,22.00,19.00,44.00,93.00,48.00,77.00,115.44,0",
						"454,86.00,66.00,58.00,36.00,42.00,74.00,8.00,33.00,52.00,43.00,23.00,59.00,33.00,18.00,121.74,0",
						"455,90.00,13.00,95.00,86.00,93.00,24.00,75.00,57.00,21.00,59.00,40.00,22.00,8.00,37.00,157.29,0",
						"456,86.00,13.00,24.00,55.00,40.00,44.00,99.00,41.00,61.00,66.00,5.00,51.00,9.00,58.00,147.48,0",
						"457,29.00,85.00,84.00,50.00,47.00,79.00,59.00,93.00,15.00,13.00,42.00,56.00,27.00,91.00,147.88,0",
						"458,95.00,9.00,87.00,49.00,6.00,82.00,78.00,86.00,92.00,30.00,82.00,59.00,93.00,45.00,161.13,0",
						"459,65.00,18.00,48.00,6.00,87.00,8.00,29.00,77.00,99.00,33.00,14.00,7.00,45.00,76.00,178.85,0",
						"460,65.00,83.00,27.00,27.00,43.00,87.00,40.00,21.00,86.00,80.00,42.00,90.00,36.00,27.00,163.09,0",
						"461,56.00,52.00,19.00,9.00,52.00,36.00,85.00,70.00,0.00,33.00,41.00,11.00,20.00,57.00,140.92,0",
						"462,81.00,29.00,88.00,12.00,47.00,22.00,7.00,28.00,31.00,7.00,46.00,7.00,63.00,36.00,142.07,0",
						"463,37.00,64.00,54.00,4.00,52.00,65.00,26.00,76.00,99.00,17.00,21.00,44.00,96.00,34.00,147.82,0",
						"464,24.00,4.00,53.00,5.00,23.00,2.00,3.00,23.00,33.00,90.00,16.00,49.00,79.00,2.00,180.03,0",
						"465,70.00,40.00,44.00,16.00,37.00,92.00,41.00,41.00,99.00,38.00,68.00,17.00,0.00,51.00,141.34,0",
						"466,35.00,57.00,28.00,96.00,61.00,61.00,45.00,45.00,76.00,32.00,2.00,11.00,15.00,65.00,134.18,0",
						"467,30.00,7.00,88.00,88.00,80.00,72.00,75.00,58.00,3.00,60.00,37.00,77.00,33.00,35.00,156.68,0",
						"468,63.00,80.00,32.00,97.00,79.00,0.00,32.00,83.00,21.00,81.00,86.00,92.00,49.00,80.00,165.25,0",
						"469,91.00,86.00,53.00,21.00,90.00,96.00,85.00,64.00,51.00,83.00,54.00,25.00,27.00,75.00,180.65,0",
						"470,29.00,26.99,16.63,6.59,28.25,30.89,27.57,20.20,16.01,26.05,16.95,7.85,8.50,23.55,105.89,0",
						"471,9.44,8.47,5.22,2.07,8.87,10.32,9.36,6.35,5.02,8.18,5.32,2.46,2.68,7.40,95.87,0",
						"472,18.74,6.90,22.60,25.42,7.22,23.30,1.95,27.19,25.74,14.75,8.16,7.22,87.13,14.57,106.86,0",
						"473,6.22,2.17,7.09,7.98,2.27,7.85,1.33,8.54,8.08,4.63,2.56,2.27,27.35,4.57,52.35,0",
						"474,2.18,0.68,2.23,2.50,0.71,2.64,0.63,2.80,2.54,1.45,0.80,0.71,8.62,1.52,16.48,1",
						"475,0.89,0.21,0.68,0.76,0.22,0.98,0.41,0.97,0.77,0.44,0.24,0.22,2.66,0.55,5.17,0",
						"476,0.29,0.06,0.21,0.24,0.07,0.39,0.19,0.53,0.24,0.14,0.08,0.07,0.95,0.28,18.64,0",
						"477,0.09,0.02,0.06,0.07,0.02,0.20,0.12,0.39,0.07,0.04,0.02,0.02,0.41,0.20,5.85,0",
						"478,0.16,0.01,0.02,0.02,0.01,0.14,0.10,0.35,0.02,0.01,0.01,0.01,0.25,0.19,1.80,1",
						"479,0.05,0.00,0.01,0.01,0.00,0.12,0.10,0.33,0.01,0.00,0.00,0.00,0.20,0.17,0.76,1",
						"480,0.02,0.00,0.00,0.00,0.00,0.12,0.09,0.33,0.00,0.00,0.00,0.00,0.18,0.16,80.05,1",
						"481,37.00,21.00,82.00,76.00,51.00,95.00,94.00,97.00,59.00,58.00,4.00,28.00,62.00,43.00,181.58,0",
						"482,69.00,37.00,69.00,11.00,42.00,65.00,31.00,85.00,76.00,29.00,55.00,72.00,2.00,90.00,155.41,0",
						"483,7.00,5.00,16.00,86.00,17.00,57.00,2.00,42.00,3.00,85.00,55.00,47.00,26.00,42.00,145.09,0",
						"484,68.00,78.00,19.00,53.00,57.00,48.00,41.00,77.00,66.00,99.00,48.00,40.00,32.00,57.00,127.20,0",
						"485,3.00,27.00,50.00,55.00,18.00,74.00,59.00,5.00,6.00,85.00,58.00,53.00,21.00,29.00,135.89,0",
						"486,42.00,33.00,24.00,54.00,29.00,75.00,52.00,1.00,31.00,52.00,49.00,91.00,8.00,76.00,120.26,0",
						"487,21.00,94.00,2.00,42.00,36.00,49.00,18.00,48.00,73.00,35.00,70.00,34.00,22.00,99.00,165.78,0",
						"488,96.00,9.00,86.00,51.00,26.00,70.00,24.00,62.00,1.00,81.00,35.00,52.00,48.00,16.00,152.65,0",
						"489,89.00,2.00,25.00,8.00,62.00,68.00,48.00,52.00,37.00,80.00,78.00,93.00,38.00,88.00,154.34,0",
						"490,10.00,19.00,62.00,88.00,54.00,58.00,40.00,93.00,95.00,91.00,39.00,62.00,30.00,14.00,164.24,0",
						"491,58.00,58.00,19.00,77.00,40.00,70.00,74.00,4.00,23.00,21.00,46.00,93.00,78.00,94.00,169.85,0",
						"492,77.00,18.00,56.00,34.00,61.00,14.00,77.00,28.00,9.00,12.00,41.00,6.00,41.00,16.00,150.06,0",
						"493,48.00,30.00,56.00,76.00,60.00,53.00,33.00,51.00,54.00,19.00,41.00,50.00,12.00,98.00,130.96,0",
						"494,78.00,43.00,64.00,25.00,52.00,91.00,34.00,61.00,73.00,47.00,9.00,83.00,89.00,64.00,127.89,0",
						"495,99.00,27.00,9.00,56.00,20.00,86.00,65.00,33.00,52.00,15.00,52.00,53.00,84.00,65.00,128.81,0",
						"496,78.00,96.00,5.00,41.00,6.00,83.00,91.00,18.00,3.00,53.00,14.00,84.00,54.00,95.00,162.87,0",
						"497,98.00,28.00,45.00,29.00,48.00,90.00,94.00,56.00,66.00,29.00,99.00,44.00,44.00,20.00,131.94,0",
						"498,38.00,88.00,30.00,20.00,99.00,37.00,58.00,41.00,33.00,4.00,54.00,33.00,78.00,23.00,139.72,0",
						"499,51.00,75.00,98.00,46.00,93.00,25.00,51.00,34.00,75.00,43.00,80.00,0.00,7.00,9.00,150.48,0",
						"500,72.00,26.00,91.00,75.00,54.00,44.00,11.00,67.00,10.00,44.00,67.00,19.00,87.00,23.00,157.85,0",
						"501,18.00,94.00,73.00,60.00,5.00,59.00,59.00,24.00,21.00,29.00,13.00,49.00,11.00,81.00,152.10,0",
						"502,80.00,67.00,2.00,88.00,58.00,25.00,29.00,52.00,1.00,44.00,4.00,24.00,28.00,20.00,151.02,0",
						"503,44.00,5.00,61.00,35.00,74.00,9.00,87.00,86.00,99.00,35.00,12.00,0.00,83.00,83.00,167.31,0",
						"504,12.00,54.00,46.00,16.00,64.00,6.00,52.00,99.00,77.00,31.00,9.00,32.00,66.00,81.00,133.81,0",
						"505,3.99,16.95,14.44,5.02,20.09,1.96,16.39,32.84,24.17,9.73,2.82,10.04,89.33,27.12,109.77,0",
						"506,2.03,5.32,4.53,1.58,6.30,0.85,5.25,10.53,7.59,3.05,0.89,3.15,28.11,8.58,50.25,0",
						"507,0.86,1.67,1.42,0.49,1.98,0.44,1.86,3.42,2.38,0.96,0.28,0.99,8.86,2.78,45.83,1",
						"508,0.49,0.52,0.45,0.16,0.62,0.22,0.65,2.84,0.75,0.30,0.09,0.31,71.40,2.57,52.54,0",
						"509,0.16,0.16,0.14,0.05,0.19,0.15,0.27,1.12,0.23,0.09,0.03,0.10,22.53,0.92,40.98,0",
						"510,0.06,0.05,0.04,0.01,0.06,0.13,0.14,0.57,0.07,0.03,0.01,0.03,6.96,0.39,12.86,0",
						"511,0.02,0.02,0.01,0.00,0.02,0.12,0.11,0.40,0.02,0.01,0.00,0.01,2.30,0.23,34.83,0",
						"512,0.28,0.00,0.00,0.00,0.01,0.12,0.10,0.39,0.01,0.00,0.00,0.00,0.34,0.22,55.45,0",
						"513,26.00,6.00,27.00,18.00,9.00,67.00,88.00,35.00,18.00,4.00,42.00,43.00,43.00,75.00,156.43,0",
						"514,87.00,52.00,28.00,84.00,4.00,50.00,98.00,19.00,35.00,35.00,51.00,60.00,4.00,83.00,135.64,0",
						"515,77.00,17.00,2.00,73.00,16.00,71.00,82.00,68.00,62.00,77.00,72.00,72.00,32.00,55.00,119.53,0",
						"516,7.00,99.00,43.00,67.00,20.00,8.00,50.00,54.00,7.00,80.00,8.00,81.00,52.00,70.00,141.49,0",
						"517,22.00,47.00,21.00,18.00,66.00,63.00,41.00,97.00,95.00,19.00,46.00,87.00,81.00,97.00,164.73,0",
						"518,64.00,61.00,69.00,82.00,53.00,93.00,14.00,93.00,70.00,9.00,99.00,77.00,44.00,62.00,152.82,0",
						"519,85.00,91.00,93.00,38.00,54.00,67.00,17.00,5.00,64.00,26.00,28.00,15.00,80.00,46.00,144.15,0",
						"520,98.00,63.00,10.00,38.00,70.00,93.00,9.00,72.00,74.00,34.00,32.00,34.00,63.00,59.00,129.77,0",
						"521,52.00,69.00,92.00,26.00,39.00,97.00,1.00,48.00,91.00,89.00,6.00,60.00,19.00,58.00,163.60,0",
						"522,27.00,25.00,30.00,52.00,91.00,32.00,76.00,65.00,37.00,9.00,95.00,23.00,20.00,5.00,157.67,0",
						"523,81.00,17.00,70.00,17.00,29.00,42.00,52.00,89.00,16.00,9.00,68.00,92.00,24.00,89.00,153.32,0",
						"524,34.00,15.00,87.00,29.00,11.00,9.00,34.00,17.00,65.00,63.00,77.00,57.00,57.00,45.00,141.68,0",
						"525,12.00,61.00,3.00,34.00,29.00,70.00,79.00,80.00,97.00,67.00,9.00,80.00,45.00,81.00,154.14,0",
						"526,78.00,57.00,89.00,75.00,71.00,83.00,68.00,81.00,39.00,40.00,59.00,48.00,4.00,23.00,156.93,0",
						"527,32.00,78.00,79.00,25.00,91.00,92.00,73.00,29.00,80.00,58.00,23.00,63.00,96.00,70.00,152.12,0",
						"528,18.00,86.00,55.00,57.00,52.00,80.00,15.00,99.00,11.00,75.00,30.00,98.00,63.00,53.00,143.07,0",
						"529,98.00,43.00,4.00,32.00,89.00,49.00,58.00,16.00,17.00,62.00,56.00,46.00,38.00,4.00,145.85,0",
						"530,25.00,60.00,59.00,1.00,17.00,95.00,80.00,44.00,93.00,36.00,82.00,45.00,34.00,67.00,144.92,0",
						"531,69.00,99.00,84.00,1.00,58.00,92.00,8.00,74.00,17.00,33.00,58.00,87.00,25.00,92.00,162.21,0",
						"532,37.00,10.00,4.00,1.00,25.00,52.00,62.00,17.00,28.00,95.00,38.00,42.00,13.00,38.00,168.90,0",
						"533,13.00,40.00,90.00,87.00,46.00,96.00,84.00,16.00,60.00,84.00,9.00,25.00,86.00,59.00,145.86,0",
						"534,96.00,73.00,88.00,39.00,8.00,83.00,76.00,0.00,27.00,86.00,4.00,11.00,45.00,26.00,150.25,0",
						"535,80.00,44.00,49.00,10.00,16.00,90.00,25.00,11.00,11.00,2.00,25.00,61.00,59.00,87.00,175.52,0",
						"536,87.00,41.00,93.00,57.00,38.00,44.00,58.00,53.00,85.00,67.00,91.00,45.00,92.00,8.00,158.16,0",
						"537,54.00,5.00,80.00,81.00,69.00,53.00,0.00,68.00,73.00,21.00,44.00,7.00,69.00,20.00,138.59,0",
						"538,17.17,1.57,25.11,25.42,21.66,16.71,0.07,23.11,22.91,6.59,13.81,2.20,90.27,7.98,109.32,0",
						"539,5.61,0.49,7.88,7.98,6.80,5.32,0.09,9.02,7.19,2.07,4.33,0.69,96.95,4.20,50.56,0",
						"540,1.93,0.15,2.39,2.42,2.06,1.70,0.09,4.53,2.18,0.63,1.32,0.21,99.07,3.00,15.92,1",
						"541,0.81,0.05,0.73,0.73,0.63,0.59,0.10,3.17,0.66,0.19,0.40,0.06,99.72,2.64,38.80,1",
						"542,0.26,0.01,0.23,0.23,0.20,0.27,0.09,1.22,0.21,0.06,0.13,0.02,31.42,0.94,57.35,1",
						"543,0.37,0.00,0.07,0.07,0.06,0.16,0.10,2.63,0.06,0.02,0.04,0.01,99.97,2.49,97.47,0",
						"544,0.19,0.00,0.02,0.02,0.02,0.15,0.13,0.51,0.02,0.01,0.01,0.00,3.31,0.30,136.96,0",
						"545,92.00,97.00,90.00,94.00,81.00,75.00,98.00,33.00,65.00,64.00,82.00,84.00,98.00,83.00,220.15,0",
						"546,37.00,43.00,56.00,27.00,55.00,42.00,68.00,80.00,68.00,86.00,7.00,82.00,86.00,2.00,152.11,0",
						"547,68.00,65.00,47.00,60.00,39.00,67.00,80.00,56.00,95.00,69.00,63.00,57.00,43.00,69.00,120.40,0",
						"548,19.00,58.00,57.00,84.00,29.00,49.00,7.00,97.00,9.00,72.00,10.00,22.00,36.00,44.00,134.53,0",
						"549,65.00,47.00,88.00,39.00,8.00,61.00,90.00,85.00,44.00,48.00,15.00,20.00,42.00,9.00,152.30,0",
						"550,26.00,17.00,7.00,11.00,59.00,3.00,50.00,76.00,88.00,59.00,46.00,9.00,17.00,61.00,146.89,0",
						"551,12.00,96.00,58.00,47.00,85.00,70.00,82.00,89.00,88.00,5.00,53.00,53.00,70.00,79.00,151.30,0",
						"552,34.00,92.00,39.00,78.00,33.00,49.00,2.00,88.00,52.00,66.00,43.00,51.00,37.00,26.00,133.83,0",
						"553,88.00,13.00,25.00,94.00,46.00,21.00,48.00,32.00,41.00,91.00,36.00,34.00,6.00,74.00,156.77,0",
						"554,12.00,52.00,38.00,54.00,86.00,90.00,91.00,0.00,90.00,32.00,68.00,54.00,63.00,7.00,139.00,0",
						"555,14.00,91.00,35.00,89.00,82.00,91.00,83.00,18.00,15.00,61.00,41.00,87.00,17.00,86.00,158.31,0",
						"556,45.00,80.00,48.00,64.00,4.00,25.00,39.00,83.00,67.00,16.00,32.00,67.00,61.00,63.00,141.72,0",
						"557,4.00,63.00,91.00,22.00,77.00,70.00,97.00,57.00,88.00,17.00,95.00,65.00,65.00,81.00,162.53,0",
						"558,14.00,12.00,26.00,15.00,46.00,25.00,44.00,54.00,11.00,9.00,17.00,35.00,41.00,96.00,153.29,0",
						"559,72.00,16.00,40.00,82.00,87.00,0.00,34.00,15.00,22.00,80.00,12.00,22.00,41.00,80.00,153.32,0",
						"560,39.00,34.00,83.00,36.00,61.00,74.00,11.00,61.00,59.00,99.00,60.00,56.00,52.00,55.00,116.16,0",
						"561,58.00,78.00,15.00,89.00,61.00,59.00,17.00,49.00,52.00,61.00,42.00,75.00,7.00,52.00,117.68,0",
						"562,42.00,72.00,37.00,4.00,85.00,72.00,21.00,63.00,44.00,13.00,89.00,46.00,56.00,73.00,134.48,0",
						"563,58.00,22.00,96.00,9.00,35.00,88.00,98.00,12.00,29.00,63.00,35.00,87.00,44.00,70.00,146.10,0",
						"564,92.00,37.00,54.00,10.00,90.00,26.00,89.00,1.00,74.00,48.00,7.00,5.00,79.00,31.00,160.77,0",
						"565,4.00,76.00,40.00,43.00,1.00,81.00,33.00,37.00,67.00,21.00,18.00,67.00,6.00,48.00,163.52,0",
						"566,39.00,72.00,50.00,59.00,96.00,0.00,29.00,3.00,44.00,28.00,9.00,15.00,46.00,99.00,159.87,0",
						"567,57.00,82.00,44.00,78.00,83.00,24.00,44.00,18.00,96.00,53.00,78.00,51.00,96.00,5.00,163.10,0",
						"568,15.00,12.00,58.00,35.00,87.00,38.00,15.00,63.00,66.00,90.00,71.00,90.00,21.00,96.00,153.06,0",
						"569,60.00,26.00,41.00,14.00,99.00,55.00,57.00,90.00,51.00,42.00,20.00,80.00,5.00,21.00,137.83,0",
						"570,59.00,40.00,66.00,84.00,93.00,57.00,83.00,23.00,49.00,23.00,70.00,44.00,25.00,58.00,155.20,0",
						"571,18.74,12.55,20.71,26.36,29.19,17.97,26.12,8.98,15.38,7.22,21.97,13.81,76.46,19.90,116.29,0",
						"572,6.11,3.94,6.50,8.27,9.16,5.72,8.26,4.58,4.83,2.27,6.90,4.33,92.61,7.95,36.59,0",
						"573,2.08,1.20,1.97,2.51,2.78,1.82,2.58,3.18,1.46,0.69,2.09,1.32,97.76,4.14,11.48,0",
						"574,0.88,0.38,0.62,0.79,0.87,0.65,0.88,2.76,0.46,0.22,0.66,0.41,99.30,3.00,86.35,0",
						"575,0.49,0.11,0.19,0.24,0.26,0.35,0.43,90.78,0.14,0.07,0.20,0.13,9.83,0.87,92.73,1",
						"576,0.61,0.17,0.03,0.84,0.15,0.55,0.36,99.40,0.03,0.11,0.61,0.58,1.08,1.24,110.06,1",
						"577,94.00,30.00,6.00,9.00,84.00,59.00,19.00,87.00,88.00,77.00,82.00,8.00,24.00,95.00,188.55,0",
						"578,54.00,44.00,80.00,90.00,16.00,0.00,88.00,97.00,73.00,94.00,46.00,42.00,58.00,68.00,160.78,0",
						"579,14.00,76.00,55.00,36.00,31.00,40.00,47.00,44.00,50.00,53.00,10.00,11.00,5.00,98.00,143.51,0",
						"580,9.00,44.00,93.00,74.00,82.00,94.00,76.00,14.00,0.00,74.00,34.00,47.00,86.00,71.00,167.06,0",
						"581,97.00,14.00,37.00,79.00,4.00,78.00,10.00,42.00,85.00,26.00,56.00,87.00,54.00,8.00,175.60,0",
						"582,42.00,18.00,5.00,10.00,81.00,11.00,57.00,15.00,61.00,94.00,37.00,2.00,64.00,60.00,160.30,0",
						"583,20.00,96.00,67.00,37.00,11.00,8.00,12.00,59.00,23.00,48.00,37.00,51.00,72.00,38.00,158.24,0",
						"584,87.00,84.00,59.00,17.00,40.00,57.00,44.00,46.00,67.00,8.00,63.00,75.00,1.00,10.00,140.68,0",
						"585,28.00,3.00,98.00,33.00,23.00,41.00,51.00,45.00,71.00,95.00,98.00,22.00,35.00,67.00,150.20,0",
						"586,12.00,31.00,1.00,73.00,62.00,30.00,75.00,2.00,67.00,72.00,69.00,54.00,11.00,0.00,144.14,0",
						"587,69.00,26.00,44.00,46.00,64.00,5.00,39.00,13.00,81.00,49.00,50.00,71.00,27.00,93.00,138.26,0",
						"588,25.00,74.00,64.00,10.00,55.00,66.00,96.00,83.00,66.00,64.00,85.00,66.00,39.00,58.00,140.63,0",
						"589,68.00,26.00,33.00,53.00,26.00,90.00,13.00,60.00,23.00,84.00,11.00,72.00,35.00,60.00,156.95,0",
						"590,84.00,75.00,47.00,56.00,71.00,46.00,34.00,37.00,59.00,11.00,76.00,36.00,90.00,69.00,147.83,0",
						"591,9.00,62.00,13.00,60.00,35.00,90.00,8.00,96.00,70.00,86.00,5.00,30.00,37.00,60.00,152.83,0",
						"592,41.00,10.00,50.00,47.00,70.00,80.00,36.00,25.00,85.00,74.00,41.00,5.00,79.00,71.00,129.87,0",
						"593,98.00,64.00,16.00,86.00,55.00,93.00,39.00,46.00,35.00,33.00,81.00,46.00,53.00,63.00,135.06,0",
						"594,55.00,88.00,59.00,53.00,6.00,7.00,16.00,93.00,19.00,3.00,93.00,88.00,42.00,59.00,143.81,0",
						"595,17.00,46.00,40.00,25.00,17.00,47.00,94.00,56.00,55.00,92.00,96.00,51.00,67.00,85.00,156.00,0",
						"596,28.00,26.00,63.00,27.00,75.00,83.00,44.00,43.00,10.00,0.00,27.00,7.00,39.00,76.00,154.40,0",
						"597,35.00,29.00,80.00,91.00,62.00,26.00,16.00,82.00,50.00,88.00,21.00,64.00,5.00,85.00,151.93,0",
						"598,41.00,28.00,64.00,24.00,21.00,68.00,9.00,54.00,81.00,15.00,77.00,29.00,53.00,99.00,139.60,0",
						"599,25.00,64.00,66.00,18.00,26.00,56.00,49.00,8.00,72.00,75.00,57.00,58.00,52.00,81.00,118.08,0",
						"600,53.00,93.00,77.00,79.00,87.00,4.00,33.00,8.00,56.00,76.00,73.00,66.00,41.00,32.00,124.65,0",
						"601,46.00,41.00,63.00,66.00,44.00,5.00,17.00,38.00,97.00,77.00,62.00,64.00,39.00,41.00,119.76,0",
						"602,6.00,40.00,56.00,96.00,21.00,14.00,27.00,23.00,3.00,76.00,47.00,7.00,52.00,38.00,146.55,0",
						"603,84.00,86.00,52.00,89.00,50.00,41.00,27.00,36.00,98.00,77.00,99.00,39.00,92.00,84.00,177.72,0",
						"604,26.59,26.99,16.32,27.93,15.69,12.95,8.54,13.06,30.76,24.17,31.07,12.24,97.49,28.06,111.63,0",
						"605,8.57,8.47,5.12,8.77,4.93,4.14,2.75,5.87,9.65,7.59,9.75,3.84,99.21,10.51,93.36,0",
						"606,20.62,26.99,29.50,19.77,23.23,23.67,14.26,88.39,14.44,31.07,31.07,30.44,10.75,0.36,127.08,0",
						"607,6.70,8.47,9.26,6.21,7.29,7.56,4.61,96.36,4.53,9.75,9.75,9.56,3.76,0.47,45.53,0",
						"608,2.26,2.57,2.81,1.88,2.21,2.43,1.54,98.89,1.38,2.96,2.96,2.90,1.54,0.51,73.45,0",
						"609,72.00,4.00,95.00,3.00,21.00,23.00,39.00,67.00,75.00,97.00,60.00,42.00,51.00,26.00,159.41,0",
						"610,79.00,73.00,27.00,32.00,81.00,97.00,22.00,37.00,37.00,30.00,58.00,68.00,47.00,41.00,157.18,0",
						"611,30.00,71.00,70.00,84.00,14.00,3.00,19.00,37.00,63.00,80.00,88.00,38.00,40.00,0.00,143.92,0",
						"612,47.00,57.00,27.00,51.00,14.00,41.00,50.00,64.00,1.00,23.00,1.00,63.00,24.00,22.00,152.06,0",
						"613,52.00,54.00,99.00,94.00,14.00,51.00,93.00,68.00,50.00,81.00,43.00,93.00,79.00,63.00,150.92,0",
						"614,38.00,96.00,47.00,94.00,88.00,22.00,45.00,94.00,93.00,65.00,7.00,97.00,19.00,33.00,181.31,0",
						"615,71.00,8.00,39.00,24.00,82.00,55.00,71.00,84.00,24.00,55.00,83.00,18.00,7.00,62.00,166.87,0",
						"616,89.00,70.00,37.00,55.00,34.00,14.00,73.00,1.00,23.00,9.00,18.00,83.00,9.00,74.00,148.67,0",
						"617,29.00,63.00,84.00,50.00,74.00,48.00,60.00,75.00,97.00,69.00,62.00,82.00,2.00,3.00,156.37,0",
						"618,95.00,23.00,13.00,86.00,7.00,60.00,38.00,33.00,15.00,16.00,26.00,32.00,56.00,95.00,174.15,0",
						"619,75.00,68.00,36.00,80.00,81.00,38.00,52.00,22.00,93.00,68.00,61.00,24.00,44.00,13.00,141.09,0",
						"620,54.00,36.00,17.00,16.00,74.00,11.00,93.00,73.00,89.00,11.00,16.00,96.00,45.00,25.00,159.00,0",
						"621,1.00,42.00,11.00,78.00,22.00,90.00,13.00,51.00,86.00,53.00,59.00,21.00,64.00,43.00,131.97,0",
						"622,34.00,47.00,80.00,75.00,29.00,90.00,38.00,25.00,58.00,65.00,35.00,22.00,41.00,75.00,123.53,0",
						"623,28.00,28.00,0.00,35.00,27.00,13.00,59.00,60.00,33.00,79.00,89.00,14.00,18.00,78.00,143.72,0",
						"624,28.00,96.00,26.00,30.00,93.00,63.00,57.00,47.00,11.00,68.00,43.00,98.00,38.00,82.00,162.84,0",
						"625,6.00,91.00,13.00,97.00,19.00,22.00,41.00,7.00,87.00,83.00,85.00,4.00,2.00,38.00,177.08,0",
						"626,82.00,37.00,21.00,75.00,13.00,9.00,45.00,88.00,84.00,45.00,49.00,41.00,10.00,18.00,142.86,0",
						"627,70.00,52.00,82.00,90.00,7.00,26.00,58.00,99.00,3.00,45.00,3.00,60.00,9.00,78.00,159.32,0",
						"628,61.00,2.00,71.00,0.00,14.00,18.00,68.00,38.00,60.00,66.00,64.00,5.00,98.00,77.00,151.82,0",
						"629,7.00,0.00,80.00,21.00,93.00,19.00,91.00,52.00,93.00,25.00,20.00,99.00,57.00,82.00,155.32,0",
						"630,50.00,84.00,82.00,20.00,51.00,86.00,78.00,44.00,88.00,87.00,10.00,93.00,69.00,94.00,128.41,0",
						"631,31.00,94.00,92.00,34.00,33.00,70.00,94.00,40.00,26.00,98.00,40.00,25.00,61.00,34.00,134.44,0",
						"632,55.00,24.00,74.00,4.00,23.00,32.00,14.00,50.00,51.00,28.00,69.00,74.00,25.00,9.00,146.75,0",
						"633,36.00,1.00,66.00,73.00,6.00,10.00,84.00,89.00,87.00,70.00,76.00,99.00,71.00,81.00,150.95,0",
						"634,29.00,81.00,42.00,38.00,22.00,6.00,76.00,23.00,81.00,95.00,32.00,88.00,40.00,1.00,153.22,0",
						"635,90.00,7.00,92.00,27.00,70.00,2.00,77.00,79.00,37.00,34.00,40.00,34.00,46.00,39.00,159.58,0",
						"636,54.00,10.00,46.00,44.00,50.00,99.00,53.00,45.00,47.00,33.00,69.00,68.00,36.00,70.00,155.10,0",
						"637,97.00,82.00,11.00,16.00,47.00,11.00,5.00,78.00,27.00,16.00,15.00,16.00,24.00,5.00,178.17,0",
						"638,84.00,53.00,6.00,18.00,15.00,5.00,38.00,12.00,68.00,84.00,73.00,91.00,36.00,66.00,156.21,0",
						"639,26.59,16.63,1.88,5.65,4.71,1.70,12.06,72.38,21.34,26.36,22.91,28.56,11.69,21.08,133.61,0",
						"640,8.57,5.22,0.59,1.77,1.48,0.67,3.92,91.33,6.70,8.27,7.19,8.96,4.06,6.98,130.41,0",
						"641,55.00,60.00,86.00,71.00,4.00,10.00,22.00,91.00,2.00,77.00,50.00,35.00,57.00,32.00,144.60,0",
						"642,58.00,74.00,71.00,83.00,40.00,76.00,30.00,5.00,36.00,42.00,30.00,63.00,98.00,44.00,133.82,0",
						"643,16.00,98.00,80.00,49.00,34.00,12.00,36.00,74.00,26.00,23.00,97.00,37.00,19.00,43.00,156.37,0",
						"644,91.00,28.00,19.00,35.00,50.00,67.00,83.00,52.00,62.00,7.00,33.00,66.00,93.00,90.00,139.95,0",
						"645,76.00,72.00,26.00,36.00,35.00,55.00,91.00,26.00,11.00,26.00,20.00,18.00,71.00,45.00,120.79,0",
						"646,69.00,71.00,74.00,69.00,1.00,68.00,80.00,36.00,0.00,1.00,62.00,22.00,48.00,81.00,156.55,0",
						"647,64.00,51.00,53.00,23.00,85.00,63.00,63.00,95.00,78.00,45.00,2.00,74.00,73.00,20.00,146.06,0",
						"648,44.00,99.00,26.00,5.00,51.00,32.00,3.00,34.00,33.00,45.00,79.00,99.00,8.00,51.00,148.97,0",
						"649,49.00,64.00,56.00,42.00,15.00,23.00,69.00,33.00,91.00,96.00,55.00,47.00,39.00,11.00,128.76,0",
						"650,45.00,20.00,61.00,53.00,33.00,45.00,66.00,23.00,37.00,89.00,91.00,63.00,75.00,53.00,130.36,0",
						"651,78.00,37.00,35.00,70.00,55.00,48.00,67.00,42.00,43.00,2.00,28.00,73.00,62.00,87.00,141.06,0",
						"652,43.00,92.00,25.00,41.00,48.00,53.00,55.00,24.00,50.00,96.00,81.00,13.00,37.00,13.00,147.12,0",
						"653,54.00,97.00,66.00,74.00,40.00,85.00,0.00,2.00,53.00,60.00,56.00,26.00,50.00,61.00,129.61,0",
						"654,14.00,15.00,17.00,55.00,59.00,72.00,56.00,32.00,88.00,24.00,66.00,18.00,29.00,9.00,134.54,0",
						"655,26.00,33.00,31.00,22.00,71.00,42.00,28.00,86.00,77.00,32.00,67.00,18.00,70.00,5.00,134.19,0",
						"656,85.00,4.00,69.00,68.00,60.00,83.00,97.00,74.00,39.00,60.00,36.00,95.00,96.00,51.00,157.54,0",
						"657,50.00,19.00,24.00,6.00,89.00,87.00,94.00,70.00,26.00,95.00,79.00,80.00,65.00,5.00,168.30,0",
						"658,53.00,59.00,27.00,67.00,84.00,2.00,4.00,77.00,13.00,8.00,2.00,79.00,47.00,89.00,178.85,0",
						"659,57.00,31.00,32.00,75.00,12.00,24.00,92.00,77.00,65.00,30.00,93.00,5.00,16.00,28.00,151.73,0",
						"660,55.00,29.00,88.00,28.00,5.00,41.00,23.00,71.00,10.00,43.00,60.00,42.00,57.00,39.00,132.66,0",
						"661,6.00,25.00,10.00,74.00,39.00,71.00,25.00,59.00,44.00,51.00,73.00,97.00,96.00,38.00,142.39,0",
						"662,15.00,65.00,17.00,45.00,38.00,87.00,42.00,22.00,75.00,71.00,27.00,90.00,90.00,95.00,138.48,0",
						"663,87.00,95.00,52.00,96.00,64.00,69.00,73.00,91.00,2.00,51.00,89.00,45.00,9.00,73.00,162.28,0",
						"664,59.00,10.00,37.00,12.00,49.00,51.00,92.00,17.00,75.00,47.00,67.00,86.00,4.00,82.00,144.53,0",
						"665,59.00,63.00,94.00,58.00,22.00,95.00,27.00,2.00,34.00,40.00,60.00,76.00,26.00,48.00,148.11,0",
						"666,26.00,94.00,92.00,97.00,65.00,33.00,64.00,11.00,61.00,86.00,86.00,26.00,93.00,42.00,136.80,0",
						"667,43.00,69.00,50.00,70.00,70.00,57.00,88.00,16.00,86.00,86.00,33.00,30.00,92.00,80.00,133.97,0",
						"668,50.00,77.00,79.00,2.00,40.00,49.00,12.00,89.00,88.00,56.00,13.00,15.00,70.00,44.00,162.98,0",
						"669,14.00,27.00,37.00,87.00,18.00,18.00,83.00,42.00,40.00,72.00,69.00,90.00,65.00,89.00,171.58,0",
						"670,54.00,23.00,15.00,30.00,65.00,58.00,97.00,87.00,61.00,79.00,98.00,64.00,68.00,41.00,132.84,0",
						"671,32.00,9.00,72.00,70.00,97.00,95.00,31.00,34.00,36.00,77.00,15.00,51.00,90.00,24.00,170.51,0",
						"672,85.00,26.00,77.00,75.00,38.00,75.00,11.00,94.00,15.00,76.00,88.00,49.00,3.00,80.00,159.09,0",
						"673,61.00,89.00,73.00,98.00,97.00,69.00,4.00,80.00,86.00,84.00,50.00,39.00,61.00,51.00,143.39,0",
						"674,4.00,97.00,24.00,40.00,84.00,70.00,52.00,49.00,70.00,39.00,51.00,36.00,77.00,98.00,133.94,0",
						"675,60.00,12.00,6.00,67.00,54.00,70.00,2.00,57.00,76.00,33.00,61.00,81.00,74.00,88.00,138.28,0",
						"676,8.00,26.00,5.00,79.00,92.00,87.00,53.00,45.00,89.00,9.00,44.00,22.00,73.00,90.00,151.65,0",
						"677,15.00,43.00,7.00,56.00,5.00,47.00,76.00,85.00,12.00,13.00,21.00,85.00,37.00,16.00,146.86,0",
						"678,59.00,82.00,64.00,8.00,59.00,92.00,28.00,62.00,10.00,74.00,21.00,16.00,21.00,39.00,151.42,0",
						"679,75.00,50.00,99.00,22.00,40.00,61.00,32.00,70.00,91.00,50.00,27.00,98.00,36.00,36.00,110.45,0",
						"680,44.00,78.00,44.00,31.00,43.00,90.00,13.00,52.00,40.00,55.00,11.00,15.00,83.00,29.00,157.99,0",
						"681,85.00,7.00,28.00,25.00,47.00,58.00,57.00,0.00,66.00,9.00,5.00,72.00,51.00,90.00,136.57,0",
						"682,82.00,37.00,5.00,69.00,48.00,9.00,29.00,0.00,51.00,18.00,28.00,32.00,34.00,17.00,132.84,0",
						"683,0.00,58.00,77.00,1.00,37.00,15.00,70.00,13.00,43.00,9.00,62.00,39.00,40.00,70.00,129.16,0",
						"684,23.00,58.00,55.00,38.00,1.00,47.00,76.00,41.00,60.00,12.00,28.00,58.00,5.00,46.00,116.95,0",
						"685,6.00,16.00,51.00,37.00,72.00,48.00,74.00,30.00,72.00,64.00,71.00,53.00,78.00,55.00,131.60,0",
						"686,38.00,45.00,87.00,46.00,43.00,13.00,12.00,11.00,73.00,84.00,29.00,52.00,94.00,97.00,153.40,0",
						"687,29.00,54.00,77.00,94.00,59.00,0.00,93.00,51.00,68.00,84.00,26.00,64.00,67.00,2.00,147.16,0",
						"688,6.00,63.00,26.00,49.00,86.00,31.00,14.00,39.00,84.00,39.00,55.00,44.00,21.00,7.00,142.61,0",
						"689,31.00,82.00,88.00,67.00,89.00,63.00,69.00,85.00,38.00,60.00,37.00,83.00,94.00,7.00,146.61,0",
						"690,19.00,42.00,49.00,1.00,72.00,9.00,10.00,19.00,8.00,92.00,90.00,82.00,16.00,54.00,172.32,0",
						"691,54.00,81.00,69.00,81.00,6.00,3.00,71.00,18.00,50.00,6.00,79.00,91.00,43.00,16.00,153.37,0",
						"692,55.00,6.00,55.00,84.00,55.00,9.00,59.00,61.00,89.00,74.00,26.00,72.00,90.00,6.00,156.78,0",
						"693,14.00,83.00,93.00,25.00,22.00,91.00,37.00,10.00,71.00,58.00,39.00,30.00,45.00,62.00,155.66,0",
						"694,22.00,2.00,83.00,55.00,42.00,94.00,44.00,76.00,9.00,4.00,28.00,50.00,25.00,83.00,148.97,0",
						"695,57.00,44.00,48.00,46.00,3.00,66.00,65.00,92.00,52.00,13.00,34.00,89.00,34.00,53.00,141.17,0",
						"696,15.00,3.00,46.00,51.00,39.00,84.00,26.00,11.00,88.00,77.00,7.00,85.00,73.00,48.00,150.64,0",
						"697,85.00,63.00,19.00,94.00,85.00,91.00,28.00,27.00,20.00,35.00,76.00,67.00,82.00,7.00,158.40,0",
						"698,91.00,87.00,38.00,54.00,9.00,74.00,78.00,50.00,64.00,58.00,79.00,58.00,3.00,42.00,141.58,0",
						"699,90.00,54.00,24.00,61.00,25.00,70.00,72.00,64.00,17.00,74.00,68.00,38.00,66.00,26.00,121.39,0",
						"700,68.00,23.00,86.00,46.00,28.00,60.00,92.00,15.00,63.00,81.00,71.00,86.00,75.00,15.00,155.83,0",
						"701,83.00,81.00,92.00,69.00,83.00,28.00,9.00,78.00,25.00,69.00,16.00,58.00,89.00,81.00,163.70,0",
						"702,79.00,39.00,29.00,91.00,91.00,19.00,78.00,22.00,74.00,63.00,95.00,54.00,54.00,62.00,136.32,0",
						"703,39.00,60.00,64.00,68.00,37.00,21.00,35.00,86.00,56.00,77.00,88.00,37.00,49.00,93.00,144.93,0",
						"704,87.00,11.00,57.00,91.00,18.00,73.00,28.00,53.00,90.00,94.00,4.00,26.00,16.00,69.00,124.64,0",
						"705,68.00,97.00,25.00,60.00,56.00,47.00,61.00,73.00,10.00,20.00,11.00,41.00,11.00,29.00,164.65,0",
						"706,70.00,7.00,16.00,10.00,97.00,83.00,1.00,36.00,31.00,41.00,75.00,18.00,93.00,74.00,155.54,0",
						"707,10.00,46.00,94.00,42.00,66.00,90.00,26.00,83.00,79.00,35.00,24.00,33.00,53.00,67.00,153.01,0",
						"708,65.00,99.00,38.00,3.00,49.00,19.00,54.00,81.00,17.00,50.00,65.00,96.00,60.00,23.00,179.44,0",
						"709,27.00,36.00,12.00,70.00,18.00,2.00,44.00,85.00,82.00,66.00,35.00,47.00,89.00,25.00,128.56,0",
						"710,96.00,45.00,7.00,26.00,53.00,7.00,19.00,31.00,68.00,7.00,64.00,16.00,72.00,48.00,157.63,0",
						"711,77.00,92.00,97.00,22.00,56.00,77.00,62.00,54.00,91.00,87.00,11.00,75.00,19.00,41.00,148.95,0",
						"712,77.00,28.00,44.00,77.00,26.00,9.00,91.00,77.00,95.00,84.00,80.00,50.00,0.00,12.00,172.10,0",
						"713,66.00,36.00,30.00,22.00,77.00,72.00,56.00,67.00,61.00,11.00,45.00,43.00,72.00,45.00,127.62,0",
						"714,78.00,7.00,30.00,95.00,48.00,15.00,54.00,25.00,88.00,28.00,98.00,75.00,23.00,40.00,141.47,0",
						"715,20.00,47.00,15.00,1.00,63.00,76.00,59.00,70.00,97.00,19.00,59.00,62.00,6.00,99.00,158.39,0",
						"716,83.00,67.00,91.00,7.00,17.00,27.00,62.00,51.00,12.00,3.00,14.00,83.00,0.00,47.00,150.17,0",
						"717,63.00,86.00,44.00,38.00,66.00,19.00,31.00,43.00,44.00,94.00,82.00,6.00,45.00,89.00,161.61,0",
						"718,13.00,6.00,36.00,33.00,29.00,84.00,99.00,17.00,97.00,24.00,52.00,95.00,16.00,76.00,192.36,0",
						"719,99.00,59.00,70.00,98.00,47.00,40.00,20.00,67.00,96.00,89.00,23.00,6.00,84.00,93.00,178.15,0",
						"720,1.00,61.00,37.00,3.00,22.00,44.00,15.00,41.00,90.00,17.00,35.00,68.00,57.00,13.00,146.71,0",
						"721,63.00,10.00,73.00,78.00,31.00,24.00,60.00,56.00,45.00,95.00,49.00,45.00,73.00,45.00,153.96,0",
						"722,88.00,97.00,91.00,12.00,50.00,87.00,37.00,48.00,39.00,68.00,18.00,95.00,91.00,82.00,165.88,0",
						"723,1.00,11.00,57.00,24.00,40.00,83.00,67.00,29.00,1.00,30.00,44.00,98.00,94.00,41.00,168.94,0",
						"724,35.00,90.00,21.00,72.00,64.00,41.00,67.00,13.00,45.00,77.00,33.00,72.00,35.00,93.00,157.16,0",
						"725,22.00,31.00,89.00,43.00,24.00,50.00,81.00,90.00,75.00,80.00,22.00,73.00,12.00,2.00,150.43,0",
						"726,1.00,64.00,26.00,43.00,28.00,8.00,88.00,53.00,42.00,94.00,93.00,70.00,60.00,65.00,162.50,0",
						"727,42.00,8.00,26.00,60.00,6.00,21.00,58.00,8.00,4.00,94.00,66.00,26.00,79.00,7.00,160.04,0",
						"728,45.00,75.00,42.00,47.00,19.00,85.00,52.00,46.00,86.00,1.00,73.00,32.00,50.00,91.00,152.21,0",
						"729,40.00,8.00,57.00,4.00,30.00,7.00,61.00,45.00,51.00,48.00,22.00,6.00,45.00,38.00,168.76,0",
						"730,39.00,22.00,20.00,21.00,89.00,45.00,2.00,57.00,91.00,98.00,52.00,96.00,14.00,72.00,155.11,0",
						"731,82.00,34.00,73.00,89.00,98.00,48.00,2.00,27.00,78.00,98.00,71.00,39.00,56.00,10.00,155.04,0",
						"732,83.00,91.00,59.00,75.00,72.00,19.00,80.00,70.00,75.00,73.00,24.00,37.00,0.00,91.00,154.30,0",
						"733,56.00,38.00,36.00,94.00,82.00,99.00,30.00,36.00,83.00,84.00,57.00,25.00,6.00,88.00,147.69,0",
						"734,24.00,59.00,94.00,97.00,7.00,45.00,22.00,60.00,62.00,96.00,96.00,34.00,92.00,30.00,164.18,0",
						"735,63.00,6.00,14.00,75.00,97.00,88.00,28.00,77.00,57.00,69.00,13.00,39.00,76.00,49.00,161.93,0",
						"736,42.00,54.00,87.00,78.00,36.00,49.00,33.00,63.00,91.00,99.00,2.00,25.00,8.00,59.00,126.57,0",
						"737,50.00,85.00,67.00,28.00,5.00,37.00,26.00,47.00,45.00,49.00,97.00,82.00,59.00,91.00,154.33,0",
						"738,22.00,55.00,16.00,83.00,59.00,86.00,71.00,31.00,8.00,32.00,8.00,14.00,79.00,97.00,155.38,0",
						"739,59.00,43.00,74.00,61.00,34.00,3.00,98.00,11.00,97.00,9.00,26.00,10.00,40.00,39.00,152.05,0",
						"740,48.00,18.00,44.00,86.00,58.00,79.00,36.00,1.00,98.00,10.00,12.00,23.00,47.00,57.00,158.11,0",
						"741,3.00,47.00,38.00,43.00,49.00,22.00,0.00,93.00,55.00,28.00,59.00,88.00,83.00,75.00,131.04,0",
						"742,45.00,14.00,49.00,45.00,33.00,52.00,68.00,60.00,56.00,69.00,4.00,65.00,92.00,36.00,131.60,0",
						"743,96.00,3.00,77.00,71.00,31.00,10.00,10.00,74.00,56.00,28.00,3.00,16.00,78.00,84.00,146.82,0",
						"744,72.00,1.00,67.00,98.00,72.00,28.00,1.00,30.00,8.00,52.00,67.00,5.00,40.00,99.00,148.18,0",
						"745,59.00,6.00,29.00,62.00,13.00,62.00,26.00,67.00,67.00,43.00,65.00,32.00,36.00,31.00,121.91,0",
						"746,54.00,34.00,2.00,66.00,5.00,44.00,25.00,38.00,36.00,87.00,19.00,36.00,33.00,98.00,138.32,0",
						"747,94.00,67.00,71.00,13.00,53.00,95.00,9.00,23.00,41.00,92.00,7.00,33.00,53.00,58.00,158.25,0",
						"748,24.00,55.00,77.00,59.00,21.00,30.00,72.00,0.00,76.00,12.00,89.00,56.00,70.00,41.00,144.84,0",
						"749,44.00,77.00,35.00,50.00,83.00,77.00,52.00,52.00,75.00,14.00,39.00,62.00,26.00,30.00,133.99,0",
						"750,71.00,89.00,30.00,43.00,39.00,58.00,15.00,91.00,28.00,45.00,83.00,88.00,35.00,1.00,159.57,0",
						"751,7.00,39.00,94.00,51.00,99.00,86.00,43.00,57.00,79.00,96.00,79.00,24.00,45.00,85.00,170.53,0",
						"752,88.00,98.00,18.00,0.00,14.00,74.00,4.00,10.00,89.00,45.00,2.00,15.00,76.00,55.00,188.54,0",
						"753,12.00,63.00,71.00,75.00,87.00,79.00,58.00,0.00,97.00,43.00,77.00,25.00,6.00,98.00,162.56,0",
						"754,4.00,65.00,86.00,45.00,96.00,36.00,99.00,88.00,49.00,17.00,47.00,10.00,40.00,64.00,167.08,0",
						"755,91.00,68.00,40.00,99.00,39.00,53.00,68.00,10.00,85.00,97.00,32.00,6.00,46.00,8.00,170.94,0",
						"756,61.00,16.00,68.00,55.00,52.00,74.00,67.00,70.00,51.00,45.00,31.00,29.00,23.00,13.00,149.68,0",
						"757,6.00,49.00,62.00,36.00,12.00,25.00,8.00,63.00,6.00,55.00,54.00,91.00,45.00,81.00,157.98,0",
						"758,43.00,90.00,77.00,93.00,14.00,53.00,22.00,26.00,26.00,8.00,15.00,0.00,5.00,34.00,170.09,0",
						"759,32.00,0.00,16.00,27.00,78.00,13.00,64.00,63.00,34.00,99.00,25.00,44.00,16.00,95.00,163.18,0",
						"760,48.00,69.00,52.00,77.00,99.00,51.00,54.00,86.00,86.00,64.00,66.00,19.00,42.00,82.00,131.95,0",
						"761,10.00,71.00,9.00,14.00,77.00,95.00,25.00,63.00,78.00,99.00,97.00,43.00,9.00,25.00,145.87,0",
						"762,6.00,89.00,55.00,9.00,39.00,55.00,48.00,24.00,29.00,47.00,74.00,63.00,71.00,85.00,153.59,0",
						"763,1.00,11.00,37.00,89.00,2.00,47.00,0.00,49.00,29.00,18.00,80.00,41.00,15.00,60.00,168.02,0",
						"764,99.00,35.00,90.00,95.00,59.00,20.00,63.00,47.00,31.00,11.00,26.00,7.00,96.00,31.00,170.62,0",
						"765,13.00,92.00,5.00,41.00,64.00,57.00,58.00,81.00,85.00,40.00,46.00,11.00,50.00,59.00,156.28,0",
						"766,3.00,12.00,20.00,94.00,76.00,43.00,39.00,50.00,41.00,97.00,37.00,72.00,4.00,57.00,137.89,0",
						"767,14.00,4.00,40.00,90.00,62.00,0.00,86.00,38.00,25.00,97.00,81.00,50.00,23.00,50.00,140.13,0",
						"768,47.00,44.00,71.00,97.00,90.00,81.00,42.00,54.00,37.00,3.00,22.00,49.00,50.00,61.00,138.52,0",
						"769,17.00,84.00,50.00,47.00,49.00,43.00,73.00,49.00,57.00,53.00,12.00,98.00,70.00,44.00,130.52,0",
						"770,54.00,95.00,81.00,48.00,86.00,68.00,20.00,49.00,35.00,31.00,36.00,4.00,86.00,31.00,139.75,0",
						"771,33.00,69.00,16.00,44.00,58.00,62.00,12.00,66.00,45.00,2.00,72.00,68.00,59.00,65.00,148.96,0",
						"772,57.00,32.00,29.00,85.00,26.00,25.00,74.00,52.00,56.00,96.00,41.00,5.00,36.00,11.00,142.33,0",
						"773,3.00,47.00,82.00,27.00,42.00,61.00,31.00,50.00,57.00,56.00,71.00,27.00,39.00,92.00,126.85,0",
						"774,72.00,94.00,48.00,25.00,7.00,76.00,7.00,61.00,36.00,39.00,15.00,68.00,65.00,54.00,145.04,0",
						"775,70.00,17.00,84.00,33.00,98.00,89.00,70.00,88.00,47.00,93.00,13.00,18.00,21.00,52.00,161.13,0",
						"776,75.00,1.00,44.00,98.00,45.00,48.00,55.00,86.00,38.00,2.00,5.00,39.00,60.00,18.00,156.89,0",
						"777,7.00,65.00,69.00,96.00,66.00,55.00,0.00,88.00,86.00,81.00,51.00,93.00,34.00,18.00,147.43,0",
						"778,24.00,65.00,83.00,99.00,92.00,44.00,14.00,22.00,44.00,18.00,41.00,38.00,4.00,98.00,147.39,0",
						"779,78.00,48.00,14.00,70.00,75.00,28.00,8.00,25.00,87.00,42.00,26.00,97.00,51.00,54.00,152.80,0",
						"780,90.00,14.00,93.00,95.00,11.00,35.00,42.00,5.00,97.00,8.00,87.00,96.00,24.00,52.00,158.61,0",
						"781,53.00,34.00,7.00,73.00,13.00,82.00,83.00,42.00,31.00,75.00,85.00,17.00,24.00,87.00,157.12,0",
						"782,40.00,56.00,8.00,18.00,30.00,27.00,50.00,57.00,63.00,31.00,43.00,22.00,63.00,93.00,142.30,0",
						"783,73.00,11.00,77.00,33.00,96.00,2.00,48.00,70.00,76.00,8.00,94.00,3.00,30.00,63.00,156.90,0",
						"784,29.00,5.00,81.00,56.00,70.00,16.00,81.00,15.00,2.00,56.00,91.00,83.00,74.00,38.00,176.95,0",
						"785,97.00,34.00,79.00,43.00,70.00,59.00,51.00,69.00,21.00,9.00,39.00,32.00,17.00,87.00,151.98,0",
						"786,16.00,17.00,36.00,12.00,28.00,91.00,14.00,37.00,66.00,22.00,80.00,39.00,69.00,77.00,151.33,0",
						"787,18.00,61.00,34.00,39.00,77.00,21.00,18.00,31.00,40.00,60.00,27.00,82.00,81.00,69.00,134.62,0",
						"788,4.00,93.00,78.00,98.00,63.00,0.00,47.00,58.00,50.00,1.00,7.00,85.00,98.00,34.00,150.58,0",
						"789,18.00,88.00,80.00,87.00,82.00,52.00,83.00,36.00,18.00,63.00,15.00,23.00,1.00,16.00,158.97,0",
						"790,84.00,58.00,7.00,41.00,46.00,36.00,22.00,38.00,65.00,27.00,24.00,32.00,50.00,45.00,133.39,0",
						"791,77.00,36.00,89.00,91.00,61.00,63.00,15.00,33.00,59.00,47.00,19.00,67.00,77.00,88.00,131.13,0",
						"792,68.00,13.00,79.00,92.00,22.00,49.00,44.00,20.00,94.00,90.00,41.00,9.00,81.00,54.00,147.51,0",
						"793,33.00,64.00,54.00,29.00,46.00,82.00,27.00,74.00,17.00,80.00,77.00,98.00,48.00,83.00,140.87,0",
						"794,96.00,24.00,62.00,3.00,86.00,96.00,24.00,74.00,66.00,93.00,16.00,44.00,76.00,65.00,146.45,0",
						"795,74.00,46.00,20.00,3.00,34.00,60.00,68.00,68.00,47.00,57.00,33.00,59.00,65.00,75.00,131.18,0",
						"796,16.00,40.00,67.00,43.00,9.00,76.00,55.00,18.00,1.00,40.00,3.00,73.00,30.00,60.00,164.23,0",
						"797,94.00,3.00,12.00,47.00,55.00,22.00,9.00,52.00,86.00,18.00,80.00,51.00,8.00,2.00,162.75,0",
						"798,74.00,57.00,82.00,96.00,82.00,51.00,59.00,63.00,71.00,31.00,27.00,99.00,37.00,2.00,148.02,0",
						"799,87.00,34.00,76.00,90.00,46.00,94.00,85.00,34.00,79.00,40.00,28.00,1.00,14.00,48.00,147.66,0",
						"800,44.00,64.00,53.00,39.00,58.00,13.00,19.00,58.00,88.00,57.00,56.00,88.00,80.00,5.00,130.76,0",
						"801,72.00,28.00,14.00,60.00,70.00,44.00,72.00,60.00,49.00,82.00,89.00,64.00,26.00,21.00,127.63,0",
						"802,29.00,40.00,97.00,88.00,22.00,9.00,95.00,15.00,74.00,35.00,85.00,11.00,85.00,99.00,162.23,0",
						"803,10.00,65.00,82.00,85.00,99.00,75.00,19.00,24.00,87.00,47.00,33.00,26.00,55.00,21.00,163.91,0",
						"804,50.00,44.00,32.00,56.00,29.00,15.00,32.00,88.00,0.00,84.00,84.00,55.00,41.00,14.00,132.79,0",
						"805,47.00,53.00,51.00,66.00,65.00,51.00,25.00,52.00,39.00,41.00,77.00,41.00,14.00,20.00,118.16,0",
						"806,74.00,48.00,47.00,16.00,73.00,23.00,49.00,21.00,86.00,98.00,74.00,65.00,83.00,99.00,172.19,0",
						"807,65.00,94.00,79.00,3.00,6.00,58.00,80.00,65.00,1.00,45.00,31.00,81.00,0.00,6.00,181.25,0",
						"808,20.00,83.00,15.00,95.00,66.00,41.00,1.00,39.00,17.00,63.00,57.00,49.00,47.00,70.00,138.86,0",
						"809,48.00,99.00,26.00,69.00,71.00,17.00,24.00,17.00,69.00,16.00,61.00,84.00,74.00,44.00,138.02,0",
						"810,6.00,25.00,15.00,90.00,47.00,42.00,65.00,34.00,10.00,26.00,63.00,25.00,84.00,53.00,143.19,0",
						"811,12.00,59.00,85.00,47.00,82.00,30.00,96.00,82.00,80.00,14.00,65.00,6.00,81.00,12.00,162.73,0",
						"812,94.00,87.00,92.00,34.00,85.00,60.00,4.00,93.00,24.00,46.00,30.00,15.00,40.00,31.00,151.32,0",
						"813,46.00,28.00,52.00,34.00,54.00,12.00,2.00,61.00,15.00,66.00,8.00,51.00,77.00,12.00,154.42,0",
						"814,29.00,28.00,54.00,95.00,75.00,38.00,95.00,70.00,16.00,13.00,90.00,71.00,45.00,27.00,144.90,0",
						"815,17.00,26.00,11.00,99.00,44.00,51.00,62.00,37.00,99.00,47.00,65.00,95.00,87.00,26.00,164.53,0",
						"816,59.00,78.00,47.00,60.00,40.00,67.00,11.00,7.00,7.00,61.00,7.00,25.00,52.00,65.00,149.25,0",
						"817,54.00,55.00,7.00,66.00,78.00,82.00,67.00,19.00,25.00,45.00,50.00,10.00,79.00,12.00,150.65,0",
						"818,26.00,86.00,79.00,0.00,69.00,21.00,4.00,93.00,74.00,96.00,80.00,21.00,3.00,89.00,185.00,0",
						"819,48.00,14.00,4.00,64.00,55.00,11.00,10.00,50.00,1.00,99.00,49.00,74.00,13.00,88.00,139.23,0",
						"820,39.00,49.00,74.00,80.00,18.00,2.00,15.00,98.00,34.00,59.00,82.00,0.00,80.00,23.00,175.71,0",
						"821,90.00,96.00,75.00,33.00,78.00,86.00,64.00,41.00,10.00,29.00,29.00,99.00,82.00,26.00,156.92,0",
						"822,40.00,41.00,14.00,10.00,15.00,66.00,56.00,86.00,8.00,46.00,42.00,58.00,25.00,8.00,155.89,0",
						"823,11.00,75.00,61.00,96.00,25.00,62.00,7.00,1.00,85.00,55.00,53.00,66.00,98.00,11.00,155.63,0",
						"824,94.00,89.00,45.00,98.00,72.00,8.00,7.00,16.00,24.00,22.00,1.00,71.00,76.00,19.00,176.72,0",
						"825,28.00,94.00,55.00,4.00,29.00,69.00,13.00,82.00,88.00,50.00,70.00,45.00,53.00,16.00,147.39,0",
						"826,13.00,60.00,96.00,39.00,3.00,72.00,46.00,0.00,22.00,79.00,82.00,6.00,99.00,67.00,177.82,0",
						"827,78.00,94.00,70.00,52.00,46.00,15.00,92.00,63.00,42.00,63.00,73.00,58.00,8.00,36.00,140.24,0",
						"828,26.00,81.00,3.00,94.00,90.00,58.00,68.00,38.00,88.00,72.00,21.00,27.00,0.00,97.00,166.07,0",
						"829,71.00,80.00,0.00,31.00,1.00,39.00,27.00,79.00,12.00,22.00,96.00,78.00,0.00,68.00,162.04,0",
						"830,28.00,27.00,8.00,35.00,65.00,13.00,81.00,92.00,12.00,10.00,17.00,72.00,19.00,86.00,157.36,0",
						"831,19.00,91.00,8.00,67.00,27.00,98.00,98.00,57.00,7.00,47.00,46.00,5.00,17.00,69.00,152.91,0",
						"832,26.00,23.00,66.00,21.00,30.00,2.00,85.00,24.00,84.00,22.00,68.00,39.00,93.00,44.00,157.11,0",
						"833,91.00,33.00,51.00,68.00,70.00,53.00,50.00,44.00,81.00,76.00,70.00,77.00,4.00,53.00,131.73,0",
						"834,15.00,1.00,66.00,77.00,8.00,64.00,79.00,25.00,36.00,51.00,86.00,36.00,54.00,2.00,157.65,0",
						"835,88.00,90.00,55.00,78.00,23.00,69.00,75.00,48.00,15.00,88.00,44.00,9.00,14.00,90.00,152.37,0",
						"836,24.00,39.00,41.00,86.00,87.00,85.00,58.00,37.00,52.00,68.00,37.00,20.00,72.00,66.00,136.64,0",
						"837,84.00,37.00,17.00,71.00,22.00,53.00,9.00,18.00,97.00,40.00,48.00,1.00,34.00,65.00,129.41,0",
						"838,40.00,74.00,90.00,56.00,96.00,36.00,32.00,65.00,20.00,6.00,18.00,31.00,71.00,11.00,159.09,0",
						"839,19.00,63.00,56.00,94.00,74.00,60.00,79.00,20.00,36.00,61.00,56.00,72.00,64.00,78.00,128.15,0",
						"840,34.00,51.00,64.00,75.00,57.00,63.00,24.00,73.00,26.00,10.00,87.00,31.00,56.00,91.00,122.03,0",
						"841,73.00,34.00,72.00,53.00,9.00,85.00,32.00,51.00,17.00,85.00,89.00,45.00,24.00,69.00,133.09,0",
						"842,51.00,54.00,24.00,26.00,16.00,63.00,55.00,30.00,52.00,31.00,88.00,99.00,9.00,31.00,121.70,0",
						"843,20.00,14.00,59.00,53.00,44.00,85.00,89.00,42.00,27.00,43.00,98.00,87.00,28.00,84.00,134.41,0",
						"844,55.00,66.00,84.00,34.00,86.00,38.00,26.00,70.00,79.00,27.00,56.00,87.00,51.00,66.00,150.67,0",
						"845,72.00,72.00,22.00,98.00,60.00,85.00,64.00,64.00,3.00,94.00,80.00,51.00,60.00,20.00,162.07,0",
						"846,84.00,76.00,88.00,69.00,92.00,24.00,86.00,7.00,37.00,12.00,70.00,96.00,72.00,93.00,165.79,0",
						"847,20.00,97.00,12.00,10.00,73.00,37.00,73.00,51.00,20.00,85.00,18.00,32.00,65.00,19.00,173.87,0",
						"848,74.00,79.00,94.00,52.00,73.00,75.00,48.00,96.00,22.00,13.00,60.00,8.00,29.00,89.00,165.61,0",
						"849,59.00,14.00,0.00,15.00,53.00,9.00,59.00,13.00,85.00,50.00,70.00,26.00,30.00,9.00,151.13,0",
						"850,84.00,4.00,50.00,22.00,39.00,49.00,96.00,24.00,14.00,3.00,89.00,36.00,47.00,47.00,161.27,0",
						"851,36.00,18.00,60.00,53.00,6.00,38.00,2.00,31.00,0.00,66.00,18.00,84.00,36.00,48.00,153.34,0",
						"852,32.00,99.00,12.00,50.00,35.00,61.00,71.00,85.00,79.00,19.00,50.00,71.00,5.00,85.00,164.69,0",
						"853,99.00,43.00,12.00,69.00,48.00,84.00,53.00,12.00,38.00,73.00,17.00,32.00,74.00,16.00,153.95,0",
						"854,15.00,98.00,93.00,41.00,61.00,35.00,93.00,54.00,69.00,6.00,43.00,41.00,73.00,77.00,160.95,0",
						"855,96.00,50.00,80.00,61.00,77.00,83.00,20.00,23.00,78.00,27.00,5.00,9.00,72.00,95.00,164.33,0",
						"856,0.00,19.00,69.00,16.00,53.00,60.00,1.00,66.00,87.00,33.00,72.00,40.00,17.00,68.00,167.35,0",
						"857,59.00,78.00,86.00,49.00,66.00,40.00,63.00,70.00,31.00,18.00,65.00,33.00,92.00,34.00,138.10,0",
						"858,82.00,65.00,59.00,52.00,84.00,58.00,23.00,53.00,93.00,18.00,23.00,26.00,7.00,12.00,164.75,0",
						"859,39.00,61.00,43.00,19.00,7.00,20.00,66.00,16.00,32.00,42.00,56.00,53.00,42.00,50.00,128.80,0",
						"860,61.00,4.00,40.00,53.00,39.00,84.00,64.00,64.00,73.00,62.00,54.00,12.00,85.00,87.00,144.79,0",
						"861,96.00,35.00,20.00,90.00,61.00,12.00,80.00,58.00,38.00,43.00,73.00,31.00,86.00,2.00,163.93,0",
						"862,93.00,10.00,66.00,24.00,13.00,98.00,9.00,97.00,0.00,53.00,42.00,15.00,54.00,88.00,171.39,0",
						"863,52.00,40.00,87.00,40.00,76.00,40.00,72.00,34.00,53.00,10.00,31.00,46.00,81.00,98.00,165.61,0",
						"864,82.00,17.00,0.00,59.00,21.00,96.00,10.00,36.00,77.00,69.00,43.00,73.00,10.00,97.00,171.16,0",
						"865,38.00,76.00,17.00,79.00,96.00,89.00,3.00,25.00,14.00,4.00,93.00,61.00,13.00,54.00,136.89,0",
						"866,56.00,67.00,15.00,91.00,82.00,50.00,6.00,42.00,84.00,20.00,47.00,90.00,36.00,60.00,143.60,0",
						"867,9.00,86.00,95.00,67.00,88.00,65.00,8.00,51.00,17.00,80.00,31.00,25.00,42.00,77.00,158.03,0",
						"868,84.00,33.00,16.00,96.00,36.00,80.00,69.00,89.00,89.00,22.00,13.00,53.00,27.00,66.00,153.52,0",
						"869,48.00,78.00,4.00,83.00,33.00,15.00,5.00,4.00,87.00,61.00,88.00,24.00,9.00,52.00,140.81,0",
						"870,97.00,85.00,93.00,57.00,9.00,20.00,6.00,21.00,5.00,10.00,50.00,15.00,7.00,25.00,158.73,0",
						"871,31.00,52.00,33.00,33.00,54.00,56.00,67.00,6.00,34.00,56.00,40.00,72.00,59.00,31.00,132.31,0",
						"872,76.00,27.00,11.00,42.00,56.00,33.00,2.00,13.00,87.00,12.00,18.00,20.00,89.00,29.00,152.95,0",
						"873,39.00,14.00,4.00,59.00,49.00,62.00,14.00,98.00,24.00,84.00,66.00,45.00,24.00,2.00,140.93,0",
						"874,31.00,23.00,13.00,24.00,50.00,10.00,82.00,29.00,16.00,24.00,26.00,73.00,27.00,39.00,133.62,0",
						"875,22.00,9.00,36.00,56.00,11.00,35.00,83.00,77.00,71.00,51.00,11.00,85.00,19.00,61.00,131.97,0",
						"876,64.00,9.00,11.00,32.00,2.00,24.00,69.00,24.00,8.00,87.00,40.00,90.00,82.00,11.00,171.33,0",
						"877,25.00,98.00,26.00,28.00,37.00,21.00,4.00,24.00,39.00,52.00,33.00,2.00,78.00,12.00,153.34,0",
						"878,99.00,13.00,50.00,41.00,55.00,20.00,11.00,75.00,37.00,72.00,86.00,24.00,31.00,68.00,160.45,0",
						"879,4.00,88.00,73.00,57.00,10.00,98.00,49.00,4.00,99.00,36.00,59.00,53.00,50.00,46.00,184.00,0",
						"880,54.00,21.00,84.00,76.00,14.00,11.00,74.00,70.00,53.00,72.00,16.00,6.00,8.00,30.00,152.63,0",
						"881,72.00,2.00,19.00,95.00,46.00,39.00,9.00,72.00,26.00,97.00,31.00,41.00,32.00,45.00,147.84,0",
						"882,60.00,82.00,81.00,41.00,10.00,17.00,38.00,79.00,72.00,46.00,62.00,26.00,23.00,72.00,162.50,0",
						"883,78.00,2.00,84.00,27.00,84.00,71.00,92.00,39.00,34.00,20.00,79.00,29.00,20.00,5.00,178.95,0",
						"884,58.00,20.00,4.00,64.00,24.00,24.00,35.00,77.00,37.00,3.00,45.00,66.00,66.00,72.00,152.34,0",
						"885,91.00,67.00,13.00,56.00,41.00,33.00,88.00,47.00,98.00,42.00,21.00,21.00,4.00,22.00,141.04,0",
						"886,69.00,63.00,57.00,5.00,68.00,66.00,39.00,9.00,62.00,71.00,29.00,94.00,50.00,68.00,140.55,0",
						"887,23.00,77.00,7.00,46.00,85.00,30.00,91.00,60.00,37.00,22.00,89.00,81.00,81.00,89.00,164.34,0",
						"888,7.00,3.00,71.00,85.00,70.00,52.00,88.00,17.00,83.00,82.00,13.00,77.00,46.00,70.00,165.16,0",
						"889,51.00,67.00,10.00,21.00,9.00,38.00,35.00,67.00,3.00,59.00,4.00,5.00,38.00,14.00,159.31,0",
						"890,41.00,14.00,2.00,95.00,10.00,15.00,49.00,6.00,55.00,25.00,86.00,72.00,56.00,48.00,156.37,0",
						"891,50.00,44.00,12.00,6.00,0.00,42.00,5.00,80.00,92.00,39.00,34.00,77.00,45.00,54.00,148.35,0",
						"892,53.00,61.00,68.00,48.00,2.00,74.00,12.00,35.00,6.00,47.00,81.00,25.00,74.00,2.00,151.91,0",
						"893,6.00,79.00,14.00,48.00,70.00,21.00,24.00,94.00,52.00,10.00,10.00,31.00,58.00,52.00,155.29,0",
						"894,61.00,81.00,64.00,11.00,74.00,34.00,19.00,13.00,67.00,21.00,76.00,19.00,63.00,93.00,148.93,0",
						"895,31.00,40.00,37.00,18.00,5.00,31.00,42.00,46.00,26.00,76.00,91.00,96.00,88.00,6.00,172.76,0",
						"896,7.00,17.00,85.00,84.00,23.00,39.00,8.00,50.00,23.00,79.00,79.00,67.00,53.00,38.00,175.47,0",
						"897,29.00,33.00,32.00,80.00,99.00,65.00,99.00,26.00,34.00,2.00,37.00,19.00,32.00,97.00,148.89,0",
						"898,36.00,77.00,0.00,39.00,38.00,54.00,36.00,39.00,40.00,78.00,52.00,10.00,52.00,96.00,143.01,0",
						"899,64.00,49.00,19.00,73.00,32.00,63.00,6.00,93.00,46.00,48.00,77.00,73.00,42.00,5.00,132.05,0",
						"900,36.00,73.00,49.00,49.00,12.00,52.00,35.00,82.00,92.00,26.00,54.00,62.00,81.00,7.00,134.60,0",
						"901,60.00,93.00,12.00,85.00,18.00,80.00,37.00,36.00,1.00,71.00,5.00,18.00,30.00,20.00,157.08,0",
						"902,41.00,72.00,12.00,24.00,78.00,66.00,5.00,48.00,90.00,19.00,34.00,5.00,81.00,54.00,167.13,0",
						"903,73.00,16.00,93.00,21.00,10.00,25.00,48.00,91.00,6.00,19.00,91.00,81.00,79.00,34.00,165.95,0",
						"904,28.00,76.00,12.00,93.00,18.00,39.00,41.00,11.00,22.00,65.00,69.00,41.00,18.00,19.00,148.79,0",
						"905,76.00,77.00,24.00,40.00,3.00,10.00,64.00,65.00,23.00,60.00,88.00,28.00,18.00,23.00,129.81,0",
						"906,82.00,96.00,90.00,60.00,13.00,72.00,24.00,64.00,36.00,70.00,57.00,62.00,59.00,62.00,151.97,0",
						"907,11.00,4.00,80.00,3.00,74.00,94.00,99.00,6.00,50.00,27.00,67.00,99.00,54.00,8.00,168.08,0",
						"908,59.00,46.00,51.00,43.00,53.00,99.00,87.00,93.00,34.00,17.00,98.00,12.00,12.00,96.00,177.25,0",
						"909,47.00,93.00,54.00,33.00,72.00,42.00,8.00,9.00,47.00,24.00,84.00,87.00,49.00,71.00,151.46,0",
						"910,44.00,70.00,20.00,54.00,47.00,24.00,22.00,75.00,76.00,72.00,78.00,9.00,96.00,59.00,149.77,0",
						"911,10.00,10.00,93.00,25.00,99.00,11.00,75.00,87.00,9.00,6.00,83.00,54.00,32.00,58.00,186.39,0",
						"912,20.00,15.00,44.00,27.00,21.00,59.00,8.00,59.00,94.00,5.00,49.00,60.00,15.00,95.00,169.36,0",
						"913,86.00,99.00,75.00,30.00,1.00,89.00,47.00,47.00,66.00,90.00,53.00,18.00,8.00,8.00,166.88,0",
						"914,20.00,45.00,44.00,94.00,70.00,78.00,26.00,6.00,54.00,78.00,7.00,25.00,85.00,0.00,164.78,0",
						"915,2.00,69.00,43.00,94.00,11.00,1.00,2.00,18.00,37.00,57.00,34.00,40.00,44.00,69.00,168.48,0",
						"916,66.00,96.00,74.00,73.00,76.00,28.00,84.00,35.00,96.00,57.00,9.00,69.00,17.00,63.00,152.83,0",
						"917,80.00,72.00,64.00,46.00,91.00,63.00,83.00,15.00,10.00,41.00,31.00,28.00,59.00,67.00,144.46,0",
						"918,47.00,45.00,24.00,59.00,32.00,20.00,32.00,64.00,77.00,32.00,55.00,80.00,72.00,90.00,131.98,0",
						"919,28.00,15.00,72.00,9.00,9.00,70.00,46.00,72.00,77.00,65.00,55.00,66.00,67.00,53.00,140.61,0",
						"920,64.00,94.00,84.00,94.00,33.00,77.00,47.00,1.00,16.00,90.00,4.00,54.00,49.00,96.00,154.35,0",
						"921,6.00,82.00,31.00,63.00,15.00,40.00,70.00,44.00,18.00,70.00,17.00,83.00,89.00,11.00,155.65,0",
						"922,56.00,8.00,61.00,99.00,66.00,74.00,14.00,59.00,24.00,61.00,96.00,59.00,54.00,62.00,143.49,0",
						"923,56.00,78.00,95.00,77.00,5.00,86.00,41.00,27.00,46.00,57.00,92.00,54.00,84.00,12.00,155.32,0",
						"924,19.00,42.00,42.00,30.00,85.00,33.00,57.00,61.00,21.00,83.00,31.00,25.00,45.00,1.00,145.72,0",
						"925,35.00,53.00,65.00,60.00,18.00,21.00,24.00,11.00,23.00,30.00,61.00,98.00,85.00,81.00,141.68,0",
						"926,68.00,93.00,71.00,63.00,65.00,9.00,15.00,37.00,98.00,45.00,38.00,93.00,80.00,69.00,133.22,0",
						"927,29.00,20.00,47.00,36.00,94.00,0.00,38.00,17.00,16.00,93.00,3.00,30.00,4.00,43.00,182.74,0",
						"928,85.00,80.00,24.00,93.00,40.00,86.00,42.00,93.00,62.00,8.00,6.00,53.00,79.00,7.00,153.37,0",
						"929,73.00,80.00,64.00,84.00,90.00,41.00,14.00,19.00,22.00,37.00,25.00,35.00,37.00,37.00,137.73,0",
						"930,72.00,13.00,57.00,49.00,51.00,61.00,23.00,56.00,0.00,88.00,57.00,76.00,96.00,27.00,138.82,0",
						"931,53.00,41.00,17.00,8.00,21.00,82.00,1.00,33.00,88.00,91.00,78.00,74.00,74.00,55.00,133.32,0",
						"932,94.00,72.00,0.00,23.00,23.00,24.00,18.00,16.00,12.00,6.00,70.00,50.00,14.00,16.00,164.22,0",
						"933,9.00,25.00,81.00,46.00,10.00,37.00,3.00,8.00,75.00,11.00,3.00,22.00,53.00,31.00,167.07,0",
						"934,24.00,48.00,0.00,9.00,65.00,47.00,63.00,31.00,9.00,73.00,74.00,12.00,52.00,93.00,155.34,0",
						"935,69.00,36.00,92.00,50.00,62.00,21.00,66.00,14.00,52.00,70.00,53.00,66.00,78.00,90.00,151.65,0",
						"936,2.00,1.00,95.00,88.00,11.00,26.00,0.00,31.00,57.00,0.00,37.00,13.00,25.00,46.00,175.12,0",
						"937,93.00,97.00,10.00,68.00,48.00,21.00,25.00,89.00,99.00,50.00,15.00,89.00,90.00,39.00,164.03,0",
						"938,80.00,71.00,99.00,33.00,17.00,29.00,0.00,63.00,99.00,36.00,67.00,40.00,95.00,12.00,128.70,0",
						"939,77.00,42.00,91.00,27.00,92.00,94.00,23.00,46.00,51.00,2.00,69.00,54.00,77.00,49.00,144.59,0",
						"940,39.00,85.00,62.00,33.00,43.00,18.00,70.00,67.00,17.00,46.00,34.00,82.00,33.00,41.00,140.32,0",
						"941,16.00,6.00,91.00,97.00,49.00,5.00,27.00,58.00,55.00,33.00,11.00,47.00,6.00,58.00,150.84,0",
						"942,61.00,21.00,87.00,66.00,96.00,77.00,7.00,99.00,6.00,48.00,30.00,83.00,94.00,32.00,176.12,0",
						"943,63.00,84.00,7.00,46.00,12.00,23.00,45.00,13.00,52.00,67.00,42.00,85.00,1.00,12.00,177.89,0",
						"944,74.00,23.00,21.00,94.00,64.00,57.00,65.00,8.00,56.00,69.00,17.00,13.00,25.00,25.00,159.86,0",
						"945,35.00,95.00,44.00,47.00,46.00,14.00,40.00,95.00,91.00,76.00,97.00,58.00,74.00,31.00,158.30,0",
						"946,19.00,84.00,55.00,1.00,96.00,47.00,97.00,53.00,58.00,3.00,5.00,21.00,20.00,18.00,160.95,0",
						"947,40.00,40.00,29.00,5.00,78.00,61.00,30.00,72.00,19.00,22.00,41.00,3.00,12.00,9.00,146.44,0",
						"948,14.00,58.00,67.00,78.00,67.00,49.00,8.00,2.00,0.00,29.00,76.00,95.00,0.00,34.00,168.32,0",
						"949,37.00,8.00,8.00,62.00,36.00,51.00,37.00,79.00,71.00,78.00,22.00,29.00,25.00,28.00,152.84,0",
						"950,20.00,7.00,67.00,22.00,93.00,64.00,87.00,47.00,96.00,66.00,89.00,60.00,75.00,27.00,144.42,0",
						"951,75.00,48.00,85.00,36.00,53.00,64.00,11.00,15.00,97.00,79.00,77.00,44.00,29.00,22.00,144.35,0",
						"952,26.00,60.00,26.00,11.00,7.00,59.00,81.00,35.00,62.00,88.00,54.00,98.00,44.00,91.00,161.21,0",
						"953,70.00,19.00,93.00,64.00,75.00,62.00,29.00,87.00,86.00,11.00,10.00,68.00,78.00,87.00,165.83,0",
						"954,86.00,75.00,36.00,69.00,15.00,16.00,13.00,39.00,49.00,38.00,34.00,20.00,9.00,79.00,158.35,0",
						"955,92.00,52.00,2.00,58.00,29.00,91.00,82.00,92.00,98.00,98.00,44.00,43.00,51.00,51.00,158.23,0",
						"956,85.00,49.00,77.00,8.00,58.00,13.00,49.00,19.00,8.00,17.00,38.00,17.00,75.00,9.00,148.98,0",
						"957,57.00,57.00,53.00,59.00,29.00,40.00,87.00,57.00,69.00,8.00,69.00,63.00,25.00,18.00,122.49,0",
						"958,39.00,93.00,37.00,17.00,16.00,30.00,81.00,64.00,75.00,34.00,72.00,92.00,27.00,83.00,131.10,0",
						"959,65.00,28.00,43.00,43.00,95.00,98.00,75.00,98.00,77.00,3.00,89.00,24.00,12.00,42.00,175.29,0",
						"960,76.00,49.00,5.00,53.00,73.00,81.00,95.00,33.00,31.00,23.00,15.00,14.00,33.00,77.00,143.58,0",
						"961,0.00,72.00,62.00,63.00,70.00,85.00,92.00,86.00,23.00,26.00,19.00,31.00,68.00,12.00,147.42,0",
						"962,94.00,4.00,70.00,17.00,1.00,23.00,84.00,72.00,18.00,47.00,58.00,31.00,17.00,48.00,155.95,0",
						"963,93.00,52.00,58.00,64.00,14.00,83.00,34.00,47.00,77.00,78.00,34.00,87.00,10.00,55.00,127.73,0",
						"964,45.00,30.00,78.00,47.00,42.00,57.00,92.00,24.00,45.00,71.00,24.00,46.00,26.00,86.00,145.47,0",
						"965,74.00,83.00,95.00,86.00,4.00,50.00,20.00,84.00,81.00,20.00,26.00,77.00,34.00,94.00,149.65,0",
						"966,54.00,93.00,7.00,63.00,21.00,15.00,63.00,81.00,43.00,39.00,26.00,93.00,7.00,47.00,152.77,0",
						"967,19.00,36.00,26.00,87.00,86.00,77.00,17.00,80.00,16.00,16.00,23.00,56.00,90.00,41.00,162.62,0",
						"968,44.00,92.00,25.00,11.00,43.00,26.00,51.00,52.00,70.00,18.00,11.00,25.00,55.00,85.00,154.36,0",
						"969,63.00,94.00,9.00,26.00,39.00,49.00,53.00,5.00,43.00,61.00,55.00,97.00,21.00,27.00,152.19,0",
						"970,97.00,62.00,65.00,76.00,42.00,16.00,34.00,81.00,45.00,87.00,93.00,12.00,29.00,40.00,151.23,0",
						"971,70.00,96.00,9.00,28.00,99.00,28.00,21.00,60.00,30.00,57.00,3.00,54.00,16.00,35.00,140.52,0",
						"972,73.00,96.00,23.00,74.00,84.00,62.00,20.00,98.00,5.00,77.00,69.00,84.00,33.00,0.00,149.95,0",
						"973,70.00,12.00,34.00,99.00,4.00,73.00,82.00,88.00,80.00,24.00,32.00,10.00,22.00,85.00,156.82,0",
						"974,97.00,11.00,77.00,62.00,6.00,10.00,86.00,50.00,47.00,74.00,6.00,11.00,77.00,40.00,154.81,0",
						"975,70.00,17.00,93.00,28.00,86.00,72.00,81.00,33.00,50.00,84.00,36.00,12.00,51.00,24.00,146.52,0",
						"976,54.00,30.00,85.00,20.00,54.00,99.00,39.00,28.00,39.00,36.00,91.00,42.00,90.00,32.00,150.22,0",
						"977,29.00,48.00,26.00,95.00,57.00,8.00,59.00,27.00,63.00,76.00,61.00,49.00,62.00,94.00,140.51,0",
						"978,45.00,9.00,6.00,97.00,98.00,14.00,29.00,67.00,10.00,20.00,74.00,55.00,72.00,31.00,165.19,0",
						"979,0.00,3.00,62.00,24.00,65.00,23.00,7.00,16.00,66.00,7.00,27.00,27.00,56.00,92.00,144.90,0",
						"980,28.00,7.00,73.00,50.00,41.00,94.00,85.00,15.00,38.00,96.00,21.00,5.00,26.00,71.00,169.69,0",
						"981,69.00,41.00,77.00,57.00,26.00,4.00,42.00,48.00,67.00,24.00,22.00,46.00,69.00,69.00,139.38,0",
						"982,39.00,38.00,79.00,76.00,76.00,63.00,20.00,45.00,50.00,52.00,15.00,70.00,4.00,82.00,139.90,0",
						"983,41.00,74.00,68.00,75.00,17.00,72.00,73.00,68.00,26.00,93.00,26.00,94.00,87.00,93.00,155.97,0",
						"984,9.00,69.00,99.00,43.00,1.00,97.00,20.00,75.00,9.00,6.00,49.00,86.00,94.00,67.00,156.79,0",
						"985,61.00,5.00,61.00,23.00,0.00,59.00,82.00,33.00,61.00,33.00,29.00,59.00,22.00,43.00,140.10,0",
						"986,10.00,98.00,56.00,25.00,0.00,81.00,90.00,19.00,92.00,39.00,53.00,75.00,77.00,82.00,148.34,0",
						"987,33.00,78.00,28.00,87.00,59.00,34.00,64.00,91.00,96.00,67.00,56.00,85.00,58.00,44.00,133.93,0",
						"988,49.00,18.00,11.00,13.00,47.00,78.00,94.00,40.00,57.00,46.00,87.00,25.00,41.00,1.00,148.99,0",
						"989,67.00,94.00,34.00,29.00,13.00,56.00,4.00,43.00,15.00,20.00,91.00,59.00,40.00,38.00,134.61,0",
						"990,48.00,43.00,92.00,73.00,57.00,49.00,14.00,36.00,52.00,36.00,90.00,57.00,42.00,96.00,134.02,0",
						"991,19.00,27.00,22.00,59.00,32.00,14.00,82.00,42.00,7.00,0.00,71.00,91.00,40.00,2.00,155.70,0",
						"992,72.00,89.00,12.00,5.00,24.00,46.00,70.00,88.00,5.00,89.00,93.00,23.00,5.00,88.00,142.67,0",
						"993,48.00,46.00,8.00,12.00,64.00,92.00,81.00,36.00,12.00,21.00,74.00,49.00,9.00,35.00,143.72,0",
						"994,80.00,93.00,44.00,70.00,80.00,7.00,96.00,44.00,7.00,86.00,16.00,84.00,36.00,4.00,168.39,0",
						"995,18.00,54.00,91.00,72.00,39.00,77.00,59.00,5.00,79.00,37.00,30.00,10.00,6.00,20.00,155.13,0",
						"996,21.00,78.00,13.00,4.00,51.00,43.00,15.00,46.00,27.00,52.00,80.00,14.00,34.00,41.00,141.63,0",
						"997,79.00,63.00,15.00,64.00,91.00,26.00,17.00,70.00,16.00,35.00,71.00,79.00,33.00,12.00,145.01,0",
						"998,95.00,66.00,47.00,19.00,78.00,61.00,65.00,3.00,85.00,10.00,58.00,67.00,64.00,56.00,161.65,0",
						"999,3.00,91.00,23.00,77.00,26.00,4.00,18.00,8.00,50.00,86.00,99.00,14.00,86.00,24.00,195.85,0",
						"1000,91.00,46.00,52.00,1.00,30.00,91.00,86.00,82.00,8.00,3.00,87.00,81.00,33.00,49.00,183.24,0",
						"1001,85.00,61.00,85.00,99.00,63.00,88.00,96.00,90.00,62.00,70.00,41.00,96.00,94.00,27.00,179.39,0",
						"1002,10.00,21.00,54.00,84.00,1.00,18.00,6.00,54.00,54.00,15.00,20.00,1.00,80.00,74.00,188.12,0",
						"1003,57.00,73.00,67.00,17.00,87.00,76.00,48.00,37.00,3.00,76.00,69.00,82.00,83.00,47.00,153.29,0",
						"1004,55.00,84.00,94.00,16.00,28.00,83.00,11.00,79.00,51.00,43.00,61.00,14.00,92.00,26.00,148.01,0",
						"1005,64.00,88.00,14.00,80.00,26.00,36.00,59.00,50.00,72.00,24.00,94.00,71.00,79.00,87.00,151.62,0",
						"1006,40.00,83.00,56.00,53.00,57.00,93.00,60.00,37.00,99.00,0.00,50.00,5.00,9.00,34.00,161.28,0",
						"1007,3.00,90.00,22.00,82.00,59.00,87.00,94.00,84.00,41.00,5.00,54.00,59.00,97.00,1.00,165.22,0",
						"1008,22.00,23.00,4.00,14.00,59.00,25.00,86.00,97.00,83.00,57.00,51.00,63.00,42.00,79.00,160.19,0",
						"1009,86.00,82.00,89.00,34.00,70.00,8.00,66.00,61.00,80.00,66.00,3.00,74.00,12.00,89.00,146.85,0",
						"1010,98.00,25.00,94.00,83.00,74.00,67.00,64.00,56.00,73.00,98.00,4.00,7.00,45.00,2.00,172.10,0",
						"1011,6.00,49.00,2.00,57.00,32.00,50.00,29.00,34.00,52.00,36.00,12.00,59.00,32.00,48.00,139.06,0",
						"1012,98.00,91.00,10.00,55.00,42.00,32.00,46.00,5.00,28.00,6.00,20.00,90.00,18.00,56.00,158.79,0",
						"1013,90.00,95.00,19.00,19.00,23.00,44.00,34.00,61.00,0.00,96.00,67.00,0.00,56.00,81.00,163.06,0",
						"1014,58.00,2.00,91.00,7.00,39.00,13.00,31.00,43.00,3.00,23.00,10.00,49.00,89.00,56.00,160.28,0",
						"1015,72.00,55.00,35.00,7.00,22.00,9.00,48.00,4.00,65.00,79.00,86.00,17.00,41.00,14.00,161.35,0",
						"1016,49.00,36.00,21.00,91.00,38.00,80.00,36.00,33.00,54.00,98.00,91.00,22.00,79.00,55.00,155.29,0",
						"1017,53.00,33.00,49.00,33.00,20.00,11.00,31.00,17.00,9.00,5.00,73.00,57.00,44.00,82.00,148.38,0",
						"1018,30.00,58.00,75.00,62.00,43.00,84.00,77.00,3.00,43.00,93.00,71.00,23.00,90.00,0.00,148.53,0",
						"1019,73.00,71.00,77.00,44.00,64.00,99.00,40.00,86.00,80.00,47.00,66.00,28.00,54.00,11.00,141.73,0",
						"1020,42.00,30.00,44.00,10.00,3.00,43.00,55.00,10.00,99.00,13.00,83.00,52.00,97.00,98.00,162.66,0",
						"1021,93.00,33.00,65.00,57.00,23.00,62.00,73.00,29.00,34.00,1.00,1.00,97.00,45.00,31.00,148.74,0",
						"1022,33.00,40.00,38.00,70.00,75.00,48.00,33.00,50.00,36.00,62.00,13.00,52.00,79.00,72.00,136.22,0",
						"1023,15.00,74.00,85.00,47.00,2.00,51.00,69.00,4.00,76.00,12.00,60.00,95.00,16.00,48.00,147.11,0"
					]
				},
				"endTime": "2016-05-18T06:02:06.289Z"
			},
			{
				"startTime": "2016-05-17T05:01:33.171Z",
				"mapData": {
					"groupId": 0,
					"NASValues": [
						"0,35.00,71.00,1.00,6.00,74.00,31.00,44.00,40.00,53.00,87.00,11.00,15.00,34.00,86.00,157.41,0",
						"1,57.00,96.00,75.00,24.00,86.00,16.00,15.00,25.00,22.00,27.00,70.00,28.00,94.00,93.00,161.82,0",
						"2,42.00,82.00,51.00,32.00,44.00,31.00,56.00,78.00,74.00,89.00,52.00,9.00,16.00,46.00,147.12,0",
						"3,56.00,30.00,1.00,93.00,23.00,46.00,11.00,67.00,39.00,35.00,31.00,19.00,42.00,90.00,144.61,0",
						"4,15.00,49.00,99.00,50.00,43.00,71.00,42.00,87.00,47.00,82.00,50.00,38.00,32.00,80.00,143.98,0",
						"5,68.00,93.00,86.00,26.00,90.00,25.00,41.00,18.00,0.00,99.00,55.00,15.00,39.00,0.00,167.58,0",
						"6,49.00,37.00,80.00,66.00,11.00,37.00,99.00,17.00,27.00,53.00,0.00,95.00,82.00,8.00,163.44,0",
						"7,12.00,1.00,22.00,81.00,25.00,14.00,36.00,62.00,85.00,53.00,49.00,86.00,93.00,2.00,135.50,0",
						"8,69.00,40.00,13.00,46.00,75.00,27.00,93.00,70.00,36.00,22.00,78.00,59.00,96.00,23.00,154.61,0",
						"9,26.00,60.00,67.00,1.00,47.00,63.00,95.00,64.00,99.00,77.00,81.00,71.00,1.00,97.00,161.36,0",
						"10,93.00,68.00,96.00,77.00,43.00,14.00,97.00,86.00,91.00,80.00,92.00,34.00,47.00,30.00,171.86,0",
						"11,32.00,11.00,73.00,43.00,40.00,97.00,27.00,30.00,25.00,13.00,15.00,49.00,53.00,30.00,165.54,0",
						"12,67.00,19.00,10.00,34.00,50.00,97.00,57.00,99.00,10.00,42.00,31.00,15.00,5.00,65.00,155.45,0",
						"13,10.00,89.00,88.00,28.00,1.00,21.00,63.00,35.00,13.00,96.00,6.00,13.00,88.00,26.00,183.71,0",
						"14,90.00,87.00,83.00,77.00,60.00,76.00,36.00,63.00,83.00,97.00,3.00,47.00,17.00,35.00,152.78,0",
						"15,15.00,9.00,71.00,41.00,26.00,73.00,58.00,48.00,73.00,66.00,55.00,67.00,29.00,20.00,140.59,0",
						"16,56.00,92.00,18.00,18.00,41.00,11.00,82.00,66.00,13.00,48.00,96.00,49.00,4.00,35.00,151.14,0",
						"17,39.00,71.00,42.00,89.00,77.00,29.00,51.00,10.00,29.00,92.00,87.00,79.00,12.00,49.00,127.70,0",
						"18,54.00,80.00,69.00,24.00,68.00,2.00,53.00,22.00,47.00,40.00,94.00,13.00,21.00,89.00,149.31,0",
						"19,52.00,11.00,42.00,52.00,81.00,17.00,87.00,68.00,61.00,30.00,65.00,85.00,62.00,63.00,127.65,0",
						"20,37.00,71.00,50.00,99.00,83.00,30.00,21.00,69.00,23.00,59.00,11.00,74.00,24.00,23.00,140.90,0",
						"21,22.00,93.00,74.00,66.00,21.00,9.00,76.00,24.00,83.00,67.00,37.00,24.00,75.00,76.00,143.86,0",
						"22,95.00,57.00,74.00,34.00,33.00,42.00,60.00,91.00,71.00,49.00,4.00,24.00,81.00,32.00,151.63,0",
						"23,14.00,73.00,49.00,36.00,19.00,0.00,82.00,32.00,43.00,68.00,90.00,78.00,0.00,95.00,178.47,0",
						"24,4.00,9.00,11.00,60.00,43.00,76.00,4.00,45.00,27.00,50.00,36.00,1.00,64.00,60.00,164.00,0",
						"25,87.00,91.00,94.00,35.00,60.00,43.00,61.00,47.00,84.00,36.00,98.00,97.00,2.00,71.00,206.38,0",
						"26,27.86,28.56,29.50,10.99,18.83,32.82,19.49,14.76,26.36,11.30,30.76,30.44,0.65,22.30,125.74,0",
						"27,55.00,58.00,68.00,60.00,57.00,63.00,62.00,6.00,43.00,44.00,92.00,59.00,21.00,35.00,153.84,0",
						"28,17.82,18.20,21.34,18.83,17.89,39.10,19.80,1.89,13.50,13.81,28.88,18.52,6.61,11.00,126.57,0",
						"29,17.00,11.00,87.00,46.00,57.00,77.00,67.00,12.00,27.00,96.00,12.00,99.00,98.00,1.00,187.38,0",
						"30,50.00,13.00,48.00,79.00,82.00,40.00,80.00,2.00,61.00,58.00,74.00,9.00,70.00,64.00,158.37,0",
						"31,15.81,4.08,15.07,24.80,25.74,12.71,25.28,0.75,19.15,18.20,23.23,2.82,22.12,20.27,100.90,0",
						"32,5.19,1.28,4.73,7.78,8.08,4.07,8.01,0.24,6.01,5.71,7.29,0.89,6.95,6.36,126.85,0",
						"33,69.00,5.00,28.00,58.00,48.00,70.00,75.00,81.00,71.00,68.00,11.00,27.00,67.00,19.00,181.14,0",
						"34,90.00,99.00,65.00,92.00,57.00,4.00,59.00,13.00,17.00,69.00,38.00,90.00,4.00,20.00,151.19,0",
						"35,66.00,67.00,12.00,34.00,81.00,19.00,86.00,85.00,26.00,53.00,21.00,63.00,14.00,11.00,137.64,0",
						"36,38.00,47.00,43.00,94.00,99.00,86.00,85.00,64.00,64.00,88.00,46.00,5.00,6.00,4.00,150.15,0",
						"37,50.00,44.00,19.00,10.00,70.00,81.00,72.00,4.00,54.00,5.00,14.00,54.00,59.00,62.00,163.78,0",
						"38,96.00,8.00,60.00,90.00,58.00,40.00,33.00,35.00,63.00,5.00,85.00,97.00,5.00,82.00,147.61,0",
						"39,37.00,59.00,5.00,80.00,54.00,51.00,6.00,88.00,64.00,58.00,72.00,61.00,13.00,53.00,142.25,0",
						"40,86.00,59.00,77.00,52.00,69.00,97.00,16.00,72.00,56.00,88.00,63.00,54.00,40.00,1.00,145.20,0",
						"41,12.00,2.00,13.00,43.00,84.00,73.00,44.00,59.00,91.00,41.00,69.00,19.00,54.00,20.00,155.48,0",
						"42,52.00,89.00,98.00,21.00,31.00,30.00,25.00,47.00,23.00,37.00,7.00,14.00,96.00,30.00,166.86,0",
						"43,23.00,76.00,40.00,93.00,11.00,29.00,92.00,24.00,83.00,47.00,74.00,90.00,28.00,57.00,170.45,0",
						"44,87.00,49.00,86.00,11.00,37.00,83.00,56.00,87.00,17.00,77.00,36.00,83.00,78.00,69.00,159.30,0",
						"45,48.00,44.00,26.00,82.00,79.00,56.00,26.00,94.00,74.00,60.00,26.00,84.00,41.00,19.00,169.16,0",
						"46,28.00,28.00,94.00,31.00,13.00,80.00,90.00,5.00,98.00,68.00,16.00,9.00,32.00,78.00,146.07,0",
						"47,52.00,29.00,15.00,65.00,8.00,19.00,61.00,37.00,77.00,54.00,19.00,4.00,0.00,56.00,127.65,0",
						"48,3.00,3.00,44.00,52.00,76.00,47.00,85.00,14.00,75.00,27.00,44.00,69.00,75.00,56.00,148.18,0",
						"49,33.00,57.00,15.00,60.00,39.00,89.00,37.00,56.00,58.00,37.00,99.00,21.00,43.00,23.00,144.22,0",
						"50,74.00,2.00,41.00,65.00,90.00,37.00,27.00,87.00,52.00,91.00,8.00,64.00,9.00,6.00,155.02,0",
						"51,78.00,16.00,72.00,50.00,44.00,4.00,32.00,52.00,71.00,74.00,44.00,39.00,75.00,38.00,117.05,0",
						"52,82.00,40.00,23.00,98.00,19.00,21.00,10.00,15.00,20.00,34.00,38.00,62.00,23.00,90.00,138.85,0",
						"53,55.00,23.00,86.00,17.00,2.00,16.00,18.00,59.00,36.00,26.00,21.00,4.00,82.00,20.00,151.10,0",
						"54,36.00,54.00,26.00,12.00,79.00,77.00,91.00,20.00,58.00,9.00,27.00,18.00,69.00,51.00,142.24,0",
						"55,65.00,9.00,46.00,30.00,51.00,88.00,71.00,89.00,83.00,89.00,24.00,98.00,22.00,67.00,164.31,0",
						"56,22.00,25.00,30.00,68.00,82.00,64.00,0.00,26.00,1.00,28.00,66.00,32.00,12.00,65.00,122.53,0",
						"57,7.46,7.85,9.42,21.34,25.74,39.41,0.34,8.17,0.31,8.79,20.71,10.04,3.79,20.42,101.40,0",
						"58,2.83,2.38,2.86,6.48,7.81,31.57,0.45,2.49,0.10,2.67,6.29,3.05,1.17,6.21,31.79,0",
						"59,1.44,0.75,0.90,2.03,2.45,29.23,0.48,0.79,0.03,0.84,1.97,0.96,0.39,1.97,53.43,0",
						"60,1.00,0.23,0.27,0.62,0.74,28.49,0.50,0.25,0.01,0.25,0.60,0.29,0.14,0.61,16.77,0",
						"61,0.87,0.07,0.09,0.19,0.23,28.26,0.50,0.08,0.00,0.08,0.19,0.09,0.07,0.21,72.09,0",
						"62,19.89,9.10,10.04,22.60,22.60,21.42,10.74,6.50,3.14,22.60,7.85,29.82,24.89,17.96,85.50,0",
						"63,6.47,2.86,3.15,7.09,7.09,6.90,3.58,2.16,0.99,7.09,2.46,9.36,7.85,5.72,39.69,0",
						"64,2.25,0.90,0.99,2.23,2.23,2.29,1.25,0.79,0.31,2.23,0.77,2.94,2.47,1.80,56.35,0",
						"65,21.00,79.00,14.00,39.00,9.00,24.00,5.00,6.00,32.00,88.00,6.00,17.00,47.00,49.00,159.40,0",
						"66,97.00,50.00,19.00,38.00,92.00,28.00,85.00,40.00,40.00,83.00,56.00,15.00,66.00,36.00,142.92,0",
						"67,34.00,13.00,86.00,8.00,18.00,19.00,99.00,55.00,27.00,47.00,1.00,55.00,59.00,25.00,154.93,0",
						"68,25.00,7.00,97.00,53.00,50.00,93.00,4.00,31.00,97.00,40.00,40.00,15.00,74.00,25.00,158.14,0",
						"69,71.00,92.00,66.00,8.00,88.00,44.00,2.00,32.00,57.00,73.00,2.00,19.00,56.00,7.00,150.97,0",
						"70,59.00,55.00,48.00,90.00,54.00,35.00,41.00,27.00,61.00,10.00,46.00,32.00,46.00,46.00,124.94,0",
						"71,4.00,13.00,40.00,68.00,43.00,63.00,74.00,37.00,0.00,7.00,30.00,26.00,98.00,22.00,167.75,0",
						"72,85.00,85.00,91.00,48.00,61.00,7.00,32.00,92.00,22.00,5.00,81.00,16.00,23.00,75.00,164.80,0",
						"73,26.00,46.00,41.00,28.00,83.00,7.00,77.00,65.00,15.00,11.00,18.00,61.00,73.00,11.00,146.72,0",
						"74,34.00,98.00,52.00,90.00,65.00,11.00,72.00,63.00,29.00,34.00,38.00,32.00,26.00,33.00,129.52,0",
						"75,96.00,32.00,35.00,36.00,27.00,65.00,79.00,89.00,54.00,40.00,21.00,80.00,68.00,42.00,164.45,0",
						"76,9.00,14.00,47.00,7.00,94.00,6.00,56.00,45.00,54.00,95.00,75.00,4.00,47.00,62.00,171.96,0",
						"77,2.00,9.00,41.00,7.00,2.00,30.00,45.00,98.00,11.00,37.00,63.00,93.00,2.00,53.00,146.47,0",
						"78,68.00,77.00,61.00,42.00,40.00,59.00,54.00,55.00,87.00,64.00,61.00,39.00,4.00,52.00,133.65,0",
						"79,67.00,1.00,49.00,97.00,33.00,2.00,50.00,88.00,83.00,14.00,66.00,33.00,18.00,66.00,141.48,0",
						"80,63.00,68.00,57.00,33.00,43.00,79.00,67.00,56.00,99.00,20.00,34.00,16.00,92.00,37.00,130.73,0",
						"81,83.00,80.00,6.00,15.00,86.00,81.00,97.00,31.00,43.00,59.00,56.00,10.00,91.00,76.00,132.47,0",
						"82,64.00,37.00,37.00,96.00,73.00,47.00,92.00,76.00,21.00,95.00,82.00,36.00,37.00,97.00,144.63,0",
						"83,75.00,13.00,94.00,52.00,72.00,12.00,81.00,90.00,11.00,89.00,50.00,81.00,55.00,23.00,128.77,0",
						"84,72.00,31.00,18.00,41.00,5.00,25.00,47.00,99.00,46.00,68.00,16.00,67.00,26.00,45.00,119.76,0",
						"85,57.00,27.00,72.00,67.00,73.00,27.00,15.00,90.00,69.00,55.00,41.00,55.00,18.00,71.00,126.58,0",
						"86,84.00,95.00,74.00,20.00,74.00,70.00,76.00,57.00,77.00,54.00,41.00,14.00,14.00,77.00,126.06,0",
						"87,71.00,69.00,78.00,92.00,80.00,62.00,74.00,8.00,96.00,53.00,65.00,35.00,53.00,64.00,159.30,0",
						"88,22.84,21.66,24.48,28.88,25.11,38.78,23.57,2.52,30.13,16.63,20.40,10.99,16.66,20.10,100.59,0",
						"89,7.49,6.57,7.43,8.76,7.62,31.38,7.50,0.77,9.14,5.05,6.19,3.33,5.08,6.12,31.50,0",
						"90,2.90,2.06,2.33,2.75,2.39,29.17,2.70,0.25,2.87,1.58,1.94,1.05,1.62,1.94,9.59,1",
						"91,1.44,0.63,0.71,0.83,0.73,28.47,1.17,0.08,0.87,0.48,0.59,0.32,0.51,0.60,3.00,0",
						"92,1.01,0.20,0.22,0.26,0.23,28.26,0.71,0.03,0.27,0.15,0.19,0.10,0.18,0.21,0.91,1",
						"93,0.87,0.06,0.07,0.08,0.07,28.19,0.56,0.02,0.08,0.05,0.06,0.03,0.08,0.08,0.29,0",
						"94,0.83,0.02,0.02,0.02,0.02,28.17,0.52,0.01,0.03,0.01,0.02,0.01,0.05,0.04,25.80,0",
						"95,0.48,0.01,0.01,0.01,0.01,8.92,0.23,0.12,0.01,0.00,0.01,0.00,0.13,0.13,15.21,1",
						"96,0.33,0.00,0.00,0.00,0.00,0.47,0.23,0.17,0.00,0.00,0.00,0.00,0.02,0.02,83.33,1",
						"97,73.00,35.00,1.00,99.00,60.00,98.00,7.00,75.00,66.00,61.00,77.00,61.00,36.00,70.00,185.75,0",
						"98,83.00,1.00,4.00,34.00,51.00,63.00,33.00,42.00,62.00,93.00,10.00,43.00,33.00,6.00,138.48,0",
						"99,83.00,70.00,59.00,51.00,8.00,88.00,81.00,14.00,91.00,68.00,97.00,63.00,40.00,17.00,149.38,0",
						"100,86.00,93.00,17.00,32.00,80.00,81.00,8.00,43.00,84.00,75.00,85.00,45.00,54.00,86.00,146.18,0",
						"101,80.00,54.00,54.00,81.00,53.00,82.00,15.00,19.00,16.00,31.00,79.00,79.00,88.00,88.00,154.44,0",
						"102,97.00,27.00,44.00,57.00,32.00,3.00,36.00,40.00,51.00,99.00,94.00,29.00,75.00,34.00,141.76,0",
						"103,96.00,3.00,57.00,9.00,92.00,52.00,11.00,19.00,91.00,79.00,59.00,75.00,82.00,8.00,163.98,0",
						"104,73.00,93.00,83.00,1.00,17.00,74.00,63.00,61.00,24.00,76.00,14.00,51.00,85.00,85.00,174.92,0",
						"105,9.00,92.00,77.00,79.00,24.00,88.00,8.00,57.00,87.00,11.00,51.00,46.00,26.00,69.00,175.58,0",
						"106,39.00,53.00,38.00,33.00,0.00,0.00,88.00,44.00,59.00,85.00,61.00,16.00,50.00,74.00,155.46,0",
						"107,0.00,84.00,65.00,76.00,82.00,20.00,42.00,1.00,0.00,29.00,2.00,59.00,56.00,76.00,161.15,0",
						"108,76.00,1.00,39.00,94.00,55.00,13.00,7.00,21.00,4.00,24.00,32.00,52.00,38.00,75.00,142.89,0",
						"109,37.00,4.00,13.00,55.00,44.00,23.00,35.00,67.00,0.00,64.00,6.00,97.00,12.00,49.00,136.70,0",
						"110,36.00,75.00,96.00,43.00,92.00,96.00,72.00,21.00,60.00,37.00,37.00,12.00,68.00,5.00,165.84,0",
						"111,77.00,1.00,43.00,97.00,31.00,99.00,3.00,13.00,43.00,93.00,83.00,79.00,13.00,14.00,149.07,0",
						"112,88.00,20.00,52.00,61.00,4.00,96.00,74.00,76.00,71.00,88.00,75.00,43.00,77.00,6.00,131.25,0",
						"113,66.00,49.00,58.00,72.00,24.00,68.00,52.00,27.00,60.00,91.00,70.00,34.00,98.00,25.00,117.47,0",
						"114,26.00,48.00,61.00,20.00,61.00,55.00,99.00,4.00,20.00,39.00,40.00,63.00,95.00,47.00,156.28,0",
						"115,82.00,34.00,42.00,67.00,83.00,78.00,32.00,51.00,18.00,20.00,83.00,36.00,0.00,38.00,140.55,0",
						"116,51.00,37.00,43.00,52.00,27.00,18.00,29.00,28.00,53.00,0.00,35.00,62.00,39.00,20.00,123.78,0",
						"117,38.00,43.00,74.00,43.00,11.00,30.00,44.00,50.00,62.00,89.00,27.00,68.00,69.00,2.00,121.67,0",
						"118,12.00,73.00,62.00,21.00,94.00,70.00,12.00,45.00,50.00,96.00,12.00,56.00,68.00,13.00,149.92,0",
						"119,4.32,22.91,19.46,6.59,29.50,41.29,4.11,14.13,15.69,30.13,3.77,17.58,21.36,4.10,116.17,0",
						"120,1.69,7.19,6.11,2.07,9.26,13.55,1.97,4.77,4.93,9.46,1.18,5.52,6.85,1.45,39.55,0",
						"121,1.05,2.26,1.92,0.65,2.91,23.44,0.80,1.47,1.55,2.97,0.37,1.73,2.19,0.49,16.55,1",
						"122,0.88,0.68,0.58,0.20,0.88,26.73,0.59,0.45,0.47,0.90,0.11,0.53,0.69,0.17,9.97,0",
						"123,0.83,0.21,0.18,0.06,0.28,27.71,0.53,0.15,0.15,0.28,0.04,0.16,0.24,0.07,7.88,1",
						"124,0.81,0.07,0.06,0.02,0.08,28.02,0.51,0.05,0.04,0.09,0.01,0.05,0.09,0.04,2.47,0",
						"125,0.81,0.02,0.02,0.01,0.03,28.12,0.50,0.02,0.01,0.03,0.00,0.02,0.05,0.03,10.38,0",
						"126,0.48,0.01,0.01,0.00,0.01,8.91,0.22,0.13,0.00,0.01,0.00,0.00,0.13,0.12,12.89,1",
						"127,0.37,0.00,0.00,0.00,0.00,2.78,0.13,0.16,0.00,0.00,0.00,0.00,0.15,0.15,4.98,1",
						"128,0.34,0.00,0.00,0.00,0.00,0.95,0.10,0.17,0.00,0.00,0.00,0.00,0.16,0.16,85.55,1",
						"129,97.00,21.00,89.00,17.00,96.00,3.00,88.00,29.00,83.00,76.00,58.00,56.00,52.00,87.00,185.66,0",
						"130,76.00,76.00,82.00,55.00,92.00,41.00,87.00,88.00,31.00,99.00,16.00,20.00,42.00,32.00,145.63,0",
						"131,95.00,10.00,67.00,38.00,18.00,58.00,84.00,17.00,16.00,37.00,36.00,64.00,84.00,43.00,142.59,0",
						"132,95.00,11.00,19.00,74.00,9.00,54.00,55.00,97.00,63.00,24.00,79.00,67.00,65.00,64.00,150.67,0",
						"133,90.00,46.00,39.00,0.00,27.00,89.00,99.00,32.00,7.00,70.00,85.00,14.00,34.00,8.00,147.92,0",
						"134,69.00,71.00,8.00,29.00,15.00,83.00,49.00,44.00,17.00,13.00,91.00,87.00,10.00,47.00,143.94,0",
						"135,47.00,28.00,14.00,34.00,53.00,18.00,69.00,93.00,24.00,99.00,55.00,40.00,51.00,28.00,149.36,0",
						"136,42.00,24.00,13.00,85.00,12.00,41.00,15.00,44.00,51.00,1.00,65.00,1.00,70.00,16.00,166.09,0",
						"137,79.00,19.00,11.00,13.00,0.00,41.00,71.00,37.00,84.00,48.00,2.00,82.00,86.00,70.00,173.74,0",
						"138,39.00,31.00,64.00,26.00,72.00,87.00,35.00,68.00,88.00,51.00,88.00,38.00,46.00,18.00,137.61,0",
						"139,73.00,79.00,14.00,44.00,62.00,51.00,6.00,35.00,84.00,46.00,63.00,26.00,27.00,92.00,122.54,0",
						"140,52.00,47.00,48.00,26.00,43.00,49.00,38.00,58.00,99.00,59.00,71.00,11.00,29.00,93.00,118.19,0",
						"141,27.00,8.00,15.00,25.00,40.00,52.00,36.00,13.00,89.00,69.00,13.00,47.00,36.00,46.00,139.09,0",
						"142,38.00,61.00,36.00,90.00,64.00,73.00,12.00,10.00,16.00,6.00,98.00,46.00,22.00,21.00,150.63,0",
						"143,56.00,60.00,23.00,78.00,57.00,78.00,33.00,33.00,42.00,80.00,36.00,74.00,3.00,43.00,130.26,0",
						"144,17.80,18.83,7.22,24.48,17.89,24.61,10.49,78.97,13.18,25.11,11.30,23.23,1.33,13.86,128.54,0",
						"145,56.00,28.00,38.00,47.00,48.00,35.00,3.00,31.00,42.00,8.00,5.00,41.00,95.00,38.00,137.03,0",
						"146,17.80,8.79,11.93,14.75,15.07,11.12,1.08,78.34,13.18,2.51,1.57,12.87,30.21,12.29,134.21,0",
						"147,31.00,51.00,42.00,67.00,79.00,69.00,71.00,91.00,10.00,63.00,96.00,0.00,77.00,6.00,172.10,0",
						"148,3.00,10.00,99.00,98.00,28.00,27.00,62.00,50.00,74.00,95.00,17.00,22.00,52.00,56.00,171.07,0",
						"149,1.27,3.14,31.07,30.76,8.79,9.08,20.25,15.92,23.23,29.82,5.34,6.90,16.51,17.80,101.11,0",
						"150,0.62,0.99,9.75,9.65,2.76,3.26,6.91,6.10,7.29,9.36,1.67,2.17,5.49,5.74,70.04,0",
						"151,0.42,0.31,3.06,3.03,0.87,1.44,2.72,3.02,2.29,2.94,0.53,0.68,2.03,1.96,24.18,0",
						"152,0.50,0.09,0.93,0.92,0.26,1.09,1.55,1.02,0.69,0.89,0.16,0.21,0.72,0.77,7.67,0",
						"153,0.49,0.03,0.29,0.29,0.08,0.93,1.16,0.66,0.22,0.28,0.05,0.06,0.37,0.41,6.64,1",
						"154,0.27,0.01,0.09,0.09,0.03,0.48,0.63,0.54,0.07,0.09,0.02,0.02,0.29,0.28,6.94,0",
						"155,0.19,0.00,0.03,0.03,0.01,0.34,0.46,0.50,0.02,0.03,0.00,0.01,0.27,0.23,11.75,1",
						"156,0.61,0.00,0.01,0.01,0.00,19.43,0.49,0.16,0.01,0.01,0.00,0.00,0.11,0.09,15.05,1",
						"157,0.42,0.00,0.00,0.00,0.00,6.18,0.22,0.17,0.00,0.00,0.00,0.00,0.14,0.14,11.37,1",
						"158,0.35,0.00,0.00,0.00,0.00,1.96,0.13,0.17,0.00,0.00,0.00,0.00,0.16,0.16,3.71,1",
						"159,0.16,0.00,0.00,0.00,0.00,0.12,0.11,0.18,0.00,0.00,0.00,0.00,0.16,0.14,1.55,1",
						"160,0.28,0.00,0.00,0.00,0.00,0.12,0.10,0.17,0.00,0.00,0.00,0.00,0.16,0.16,66.73,1",
						"161,42.00,37.00,58.00,14.00,7.00,64.00,96.00,72.00,45.00,56.00,80.00,42.00,30.00,19.00,176.04,0",
						"162,65.00,44.00,97.00,90.00,90.00,25.00,3.00,46.00,27.00,79.00,90.00,15.00,87.00,27.00,157.71,0",
						"163,57.00,83.00,23.00,74.00,71.00,98.00,85.00,38.00,91.00,17.00,86.00,62.00,81.00,62.00,157.91,0",
						"164,90.00,35.00,67.00,84.00,94.00,28.00,99.00,84.00,92.00,17.00,4.00,20.00,31.00,18.00,158.10,0",
						"165,72.00,40.00,86.00,62.00,40.00,55.00,26.00,77.00,19.00,79.00,72.00,7.00,30.00,21.00,147.60,0",
						"166,86.00,20.00,1.00,91.00,30.00,89.00,79.00,24.00,5.00,31.00,88.00,16.00,33.00,84.00,150.26,0",
						"167,97.00,53.00,58.00,51.00,14.00,54.00,28.00,25.00,75.00,91.00,46.00,62.00,40.00,2.00,148.31,0",
						"168,36.00,81.00,98.00,89.00,62.00,38.00,11.00,12.00,20.00,70.00,95.00,38.00,98.00,52.00,135.98,0",
						"169,73.00,36.00,89.00,58.00,77.00,46.00,9.00,86.00,24.00,39.00,39.00,12.00,67.00,48.00,155.19,0",
						"170,34.00,71.00,42.00,72.00,89.00,73.00,8.00,67.00,88.00,59.00,43.00,89.00,32.00,24.00,125.99,0",
						"171,49.00,2.00,34.00,9.00,70.00,41.00,4.00,3.00,38.00,98.00,43.00,30.00,55.00,65.00,152.87,0",
						"172,57.00,60.00,48.00,33.00,10.00,6.00,30.00,89.00,87.00,9.00,40.00,10.00,39.00,0.00,167.82,0",
						"173,90.00,54.00,73.00,53.00,98.00,69.00,36.00,79.00,30.00,91.00,18.00,48.00,82.00,42.00,154.46,0",
						"174,72.00,61.00,3.00,26.00,30.00,95.00,83.00,42.00,11.00,75.00,19.00,49.00,81.00,79.00,161.78,0",
						"175,22.82,19.15,0.94,8.16,9.42,29.95,26.19,81.80,3.45,23.54,5.96,15.38,25.81,25.16,105.01,0",
						"176,7.15,5.81,0.29,2.48,2.86,9.22,8.09,94.48,1.05,7.14,1.81,4.67,8.23,8.00,32.91,0",
						"177,2.47,1.82,0.09,0.78,0.90,3.03,2.67,98.27,0.33,2.24,0.57,1.46,2.97,2.87,48.03,0",
						"178,0.98,0.55,0.03,0.24,0.27,1.05,0.95,99.47,0.10,0.68,0.17,0.44,1.30,1.24,15.07,0",
						"179,0.53,0.17,0.01,0.07,0.09,0.46,0.44,99.83,0.03,0.21,0.05,0.14,0.80,0.75,78.08,0",
						"180,3.35,1.48,0.00,0.93,0.80,0.80,1.34,1.31,2.81,2.23,2.16,0.93,1.55,1.19,104.38,0",
						"181,1.27,0.47,0.00,0.29,0.25,0.66,0.97,1.52,0.88,0.70,0.68,0.29,0.79,0.53,25.99,0",
						"182,0.62,0.15,0.00,0.09,0.08,0.62,0.85,1.58,0.28,0.22,0.21,0.09,0.55,0.32,8.08,0",
						"183,0.42,0.04,0.00,0.03,0.02,0.61,0.82,1.60,0.08,0.07,0.06,0.03,0.48,0.26,1.89,1",
						"184,0.35,0.01,0.00,0.01,0.01,0.60,0.81,1.61,0.03,0.02,0.02,0.01,0.45,0.24,1.00,1",
						"185,0.22,0.00,0.00,0.00,0.00,0.38,0.51,0.83,0.01,0.01,0.01,0.00,0.32,0.22,0.64,1",
						"186,0.18,0.00,0.00,0.00,0.00,0.31,0.42,0.59,0.00,0.00,0.00,0.00,0.28,0.22,0.24,1",
						"187,0.33,0.00,0.00,0.00,0.00,0.29,0.52,0.52,0.00,0.00,0.00,0.00,0.15,0.12,0.34,1",
						"188,0.11,0.00,0.00,0.00,0.00,0.17,0.23,0.39,0.00,0.00,0.00,0.00,0.16,0.15,4.99,1",
						"189,0.04,0.00,0.00,0.00,0.00,0.13,0.13,0.35,0.00,0.00,0.00,0.00,0.17,0.16,1.65,1",
						"190,0.24,0.00,0.00,0.00,0.00,0.12,0.10,0.23,0.00,0.00,0.00,0.00,0.16,0.16,0.58,1",
						"191,0.19,0.00,0.00,0.00,0.00,0.14,0.11,0.30,0.00,0.00,0.00,0.00,0.14,0.11,0.09,1",
						"192,0.32,0.00,0.00,0.00,0.00,0.12,0.09,0.18,0.00,0.00,0.00,0.00,0.16,0.16,75.90,1",
						"193,46.00,74.00,25.00,98.00,69.00,56.00,0.00,31.00,78.00,70.00,63.00,55.00,46.00,71.00,175.45,0",
						"194,28.00,77.00,83.00,78.00,33.00,3.00,62.00,11.00,62.00,22.00,80.00,35.00,97.00,82.00,148.31,0",
						"195,38.00,43.00,69.00,22.00,57.00,76.00,74.00,42.00,77.00,89.00,20.00,73.00,47.00,34.00,146.11,0",
						"196,86.00,85.00,2.00,54.00,93.00,74.00,54.00,9.00,14.00,16.00,7.00,9.00,20.00,49.00,153.33,0",
						"197,65.00,47.00,37.00,3.00,34.00,28.00,77.00,10.00,2.00,1.00,4.00,15.00,56.00,16.00,161.21,0",
						"198,93.00,38.00,41.00,30.00,51.00,34.00,16.00,87.00,32.00,59.00,89.00,61.00,10.00,31.00,154.48,0",
						"199,32.00,54.00,85.00,93.00,55.00,16.00,49.00,28.00,72.00,30.00,20.00,57.00,80.00,45.00,152.06,0",
						"200,63.00,69.00,36.00,81.00,79.00,82.00,43.00,58.00,38.00,97.00,90.00,59.00,90.00,76.00,141.48,0",
						"201,96.00,86.00,29.00,1.00,77.00,70.00,98.00,7.00,25.00,51.00,12.00,85.00,91.00,13.00,178.94,0",
						"202,36.00,55.00,92.00,28.00,99.00,97.00,7.00,58.00,15.00,39.00,62.00,78.00,31.00,45.00,135.77,0",
						"203,83.00,9.00,41.00,67.00,74.00,56.00,87.00,19.00,78.00,22.00,86.00,55.00,76.00,64.00,168.92,0",
						"204,59.00,35.00,86.00,15.00,77.00,87.00,2.00,46.00,8.00,78.00,91.00,89.00,32.00,23.00,168.97,0",
						"205,69.00,57.00,81.00,85.00,14.00,26.00,63.00,86.00,64.00,39.00,67.00,92.00,7.00,66.00,166.49,0",
						"206,21.88,17.89,25.42,26.68,4.39,8.29,19.91,95.61,20.09,12.24,21.03,28.88,2.59,21.08,111.44,0",
						"207,6.87,5.43,7.72,8.10,1.33,2.65,6.18,98.67,6.10,3.71,6.38,8.76,1.18,6.76,34.89,0",
						"208,2.38,1.70,2.42,2.54,0.42,0.96,2.08,99.58,1.91,1.17,2.00,2.75,0.76,2.48,10.62,1",
						"209,0.95,0.52,0.73,0.77,0.13,0.43,0.77,99.87,0.58,0.35,0.61,0.83,0.63,1.12,20.00,0",
						"210,0.52,0.16,0.23,0.24,0.04,0.27,0.38,99.96,0.18,0.11,0.19,0.26,0.59,0.71,17.99,1",
						"211,0.39,0.05,0.07,0.07,0.01,0.21,0.25,99.99,0.06,0.03,0.06,0.08,0.58,0.58,22.80,0",
						"212,0.34,0.02,0.02,0.02,0.00,0.20,0.22,100.00,0.02,0.01,0.02,0.02,0.57,0.54,58.78,0",
						"213,0.33,0.00,0.01,0.01,0.00,0.48,0.62,32.49,0.01,0.00,0.01,0.01,0.48,0.33,35.67,1",
						"214,0.33,0.00,0.00,0.00,0.00,0.56,0.75,10.98,0.00,0.00,0.00,0.00,0.46,0.26,11.79,1",
						"215,0.47,0.00,0.00,0.00,0.00,0.79,0.95,1.55,0.00,0.00,0.00,0.00,0.36,0.47,2.76,1",
						"216,0.37,0.00,0.00,0.00,0.00,0.44,0.65,0.82,0.00,0.00,0.00,0.00,0.21,0.23,0.65,1",
						"217,0.34,0.00,0.00,0.00,0.00,0.33,0.55,0.59,0.00,0.00,0.00,0.00,0.16,0.15,0.47,1",
						"218,0.22,0.00,0.00,0.00,0.00,0.30,0.43,0.51,0.00,0.00,0.00,0.00,0.23,0.20,0.21,1",
						"219,0.08,0.00,0.00,0.00,0.00,0.17,0.20,0.39,0.00,0.00,0.00,0.00,0.19,0.17,0.30,1",
						"220,0.03,0.00,0.00,0.00,0.00,0.13,0.12,0.34,0.00,0.00,0.00,0.00,0.18,0.16,0.13,1",
						"221,0.16,0.00,0.00,0.00,0.00,0.17,0.19,0.27,0.00,0.00,0.00,0.00,0.19,0.16,0.14,1",
						"222,0.16,0.00,0.00,0.00,0.00,0.15,0.14,0.31,0.00,0.00,0.00,0.00,0.14,0.11,0.07,1",
						"223,0.16,0.00,0.00,0.00,0.00,0.15,0.12,0.32,0.00,0.00,0.00,0.00,0.13,0.10,0.04,1",
						"224,0.16,0.00,0.00,0.00,0.00,0.15,0.12,0.32,0.00,0.00,0.00,0.00,0.13,0.09,61.58,1",
						"225,27.00,25.00,64.00,20.00,20.00,48.00,46.00,83.00,16.00,74.00,87.00,10.00,56.00,7.00,150.42,0",
						"226,19.00,59.00,49.00,32.00,1.00,73.00,66.00,76.00,9.00,47.00,35.00,33.00,61.00,19.00,124.83,0",
						"227,64.00,42.00,83.00,55.00,59.00,75.00,93.00,56.00,73.00,45.00,72.00,8.00,92.00,5.00,149.32,0",
						"228,55.00,30.00,66.00,27.00,92.00,32.00,10.00,84.00,9.00,37.00,60.00,97.00,29.00,41.00,173.26,0",
						"229,3.00,91.00,2.00,26.00,15.00,61.00,54.00,60.00,98.00,89.00,66.00,18.00,32.00,92.00,200.47,0",
						"230,39.00,36.00,74.00,3.00,89.00,29.00,95.00,34.00,7.00,38.00,59.00,65.00,20.00,16.00,152.63,0",
						"231,37.00,46.00,44.00,4.00,64.00,51.00,42.00,66.00,3.00,37.00,66.00,13.00,9.00,30.00,133.20,0",
						"232,32.00,28.00,57.00,92.00,3.00,80.00,87.00,46.00,57.00,46.00,67.00,56.00,12.00,49.00,141.83,0",
						"233,27.00,63.00,58.00,83.00,67.00,66.00,14.00,57.00,50.00,89.00,82.00,13.00,28.00,61.00,155.66,0",
						"234,2.00,31.00,99.00,69.00,95.00,60.00,24.00,41.00,57.00,27.00,94.00,92.00,2.00,17.00,151.47,0",
						"235,34.00,80.00,28.00,17.00,2.00,41.00,7.00,61.00,48.00,34.00,8.00,44.00,0.00,17.00,169.71,0",
						"236,78.00,93.00,46.00,26.00,94.00,89.00,9.00,80.00,38.00,17.00,9.00,12.00,44.00,15.00,133.77,0",
						"237,24.71,29.19,14.44,8.16,29.50,28.07,2.96,93.72,11.93,5.34,2.82,3.77,14.20,5.07,113.09,0",
						"238,7.73,8.86,4.38,2.48,8.95,8.65,1.04,98.09,3.62,1.62,0.86,1.14,4.71,1.90,35.54,0",
						"239,2.65,2.78,1.38,0.78,2.81,2.85,0.46,99.40,1.14,0.51,0.27,0.36,1.87,0.96,10.77,1",
						"240,1.03,0.84,0.42,0.24,0.85,1.00,0.28,99.82,0.34,0.15,0.08,0.11,0.96,0.66,37.25,0",
						"241,0.76,0.26,0.13,0.07,0.27,1.07,0.98,31.44,0.11,0.05,0.03,0.03,0.33,0.22,39.97,0",
						"242,0.50,0.08,0.04,0.02,0.08,0.78,0.79,31.49,0.03,0.02,0.01,0.01,0.29,0.24,29.80,1",
						"243,0.49,0.03,0.01,0.01,0.03,1.08,1.21,9.89,0.01,0.00,0.00,0.00,0.10,0.08,35.55,1",
						"244,0.44,0.01,0.00,0.00,0.01,0.80,0.96,31.39,0.00,0.00,0.00,0.00,0.23,0.22,35.69,1",
						"245,0.36,0.00,0.00,0.00,0.00,0.89,1.08,9.86,0.00,0.00,0.00,0.00,0.11,0.11,14.90,1",
						"246,0.34,0.00,0.00,0.00,0.00,0.69,0.89,4.20,0.00,0.00,0.00,0.00,0.34,0.19,4.75,1",
						"247,0.44,0.00,0.00,0.00,0.00,0.91,1.11,1.54,0.00,0.00,0.00,0.00,0.22,0.24,1.27,1",
						"248,0.48,0.00,0.00,0.00,0.00,0.73,1.08,0.70,0.00,0.00,0.00,0.00,0.23,0.25,0.57,1",
						"249,0.49,0.00,0.00,0.00,0.00,1.06,1.31,0.66,0.00,0.00,0.00,0.00,0.26,0.27,0.67,1",
						"250,0.34,0.00,0.00,0.00,0.00,0.33,0.56,0.51,0.00,0.00,0.00,0.00,0.15,0.13,0.68,1",
						"251,0.22,0.00,0.00,0.00,0.00,0.29,0.44,0.49,0.00,0.00,0.00,0.00,0.22,0.19,0.36,1",
						"252,0.08,0.00,0.00,0.00,0.00,0.17,0.20,0.38,0.00,0.00,0.00,0.00,0.19,0.17,0.30,1",
						"253,0.14,0.00,0.00,0.00,0.00,0.15,0.14,0.34,0.00,0.00,0.00,0.00,0.14,0.12,0.13,1",
						"254,0.15,0.00,0.00,0.00,0.00,0.15,0.12,0.33,0.00,0.00,0.00,0.00,0.13,0.10,0.05,1",
						"255,0.16,0.00,0.00,0.00,0.00,0.16,0.16,0.33,0.00,0.00,0.00,0.00,0.12,0.10,0.03,1",
						"256,0.16,0.00,0.00,0.00,0.00,0.15,0.13,0.33,0.00,0.00,0.00,0.00,0.12,0.09,77.34,1",
						"257,20.00,93.00,57.00,49.00,77.00,36.00,4.00,92.00,30.00,99.00,8.00,35.00,44.00,98.00,186.62,0",
						"258,5.00,17.00,24.00,56.00,42.00,49.00,77.00,89.00,74.00,20.00,45.00,93.00,22.00,59.00,155.90,0",
						"259,76.00,25.00,36.00,73.00,38.00,32.00,0.00,61.00,35.00,4.00,31.00,44.00,17.00,89.00,152.93,0",
						"260,29.00,42.00,1.00,96.00,53.00,27.00,74.00,53.00,41.00,77.00,23.00,86.00,80.00,37.00,159.94,0",
						"261,89.00,78.00,71.00,48.00,22.00,34.00,87.00,7.00,13.00,7.00,40.00,87.00,90.00,27.00,157.28,0",
						"262,0.00,43.00,51.00,82.00,64.00,63.00,0.00,77.00,64.00,7.00,4.00,74.00,99.00,45.00,161.40,0",
						"263,53.00,18.00,5.00,48.00,62.00,96.00,9.00,10.00,60.00,0.00,34.00,37.00,6.00,12.00,159.48,0",
						"264,77.00,46.00,75.00,62.00,43.00,6.00,71.00,3.00,69.00,26.00,15.00,20.00,74.00,99.00,151.18,0",
						"265,93.00,44.00,36.00,12.00,59.00,10.00,82.00,56.00,31.00,21.00,38.00,3.00,52.00,29.00,141.14,0",
						"266,78.00,73.00,69.00,45.00,35.00,81.00,95.00,67.00,98.00,77.00,22.00,64.00,99.00,40.00,162.64,0",
						"267,76.00,38.00,73.00,84.00,22.00,72.00,79.00,2.00,13.00,61.00,29.00,2.00,76.00,48.00,151.73,0",
						"268,15.00,77.00,13.00,68.00,51.00,83.00,17.00,56.00,2.00,47.00,12.00,42.00,43.00,27.00,125.42,0",
						"269,4.94,24.17,4.08,21.34,16.01,26.13,5.40,18.02,0.63,14.75,3.77,13.18,13.65,8.61,77.34,0",
						"270,1.77,7.59,1.28,6.70,5.02,8.33,1.83,74.27,0.20,4.63,1.18,4.14,4.68,3.06,46.68,0",
						"271,0.77,2.30,0.39,2.03,1.52,2.66,0.69,92.19,0.06,1.41,0.36,1.26,1.82,1.29,45.94,1",
						"272,0.68,0.72,0.12,0.64,0.48,1.60,1.11,29.05,0.02,0.44,0.11,0.39,0.60,0.42,45.72,0",
						"273,0.65,0.22,0.04,0.19,0.15,1.26,1.25,8.93,0.01,0.13,0.03,0.12,0.21,0.14,14.37,1",
						"274,0.65,0.07,0.01,0.06,0.05,1.16,1.29,2.91,0.00,0.04,0.01,0.04,0.09,0.06,9.85,1",
						"275,0.49,0.02,0.00,0.02,0.01,1.20,1.36,0.90,0.00,0.01,0.00,0.01,0.03,0.02,3.10,1",
						"276,0.48,0.01,0.00,0.01,0.00,1.21,1.38,0.29,0.00,0.00,0.00,0.00,0.02,0.01,8.16,1",
						"277,0.49,0.00,0.00,0.00,0.00,0.92,1.15,0.10,0.00,0.00,0.00,0.00,0.01,0.01,2.70,1",
						"278,0.49,0.00,0.00,0.00,0.00,0.95,1.13,0.36,0.00,0.00,0.00,0.00,0.20,0.31,1.23,1",
						"279,0.49,0.00,0.00,0.00,0.00,0.99,1.18,0.34,0.00,0.00,0.00,0.00,0.18,0.28,0.40,1",
						"280,0.49,0.00,0.00,0.00,0.00,1.01,1.20,0.33,0.00,0.00,0.00,0.00,0.17,0.27,0.24,1",
						"281,0.49,0.00,0.00,0.00,0.00,1.17,1.38,0.61,0.00,0.00,0.00,0.00,0.27,0.29,0.23,1",
						"282,0.49,0.00,0.00,0.00,0.00,1.20,1.40,0.63,0.00,0.00,0.00,0.00,0.27,0.29,0.67,1",
						"283,0.48,0.00,0.00,0.00,0.00,0.64,0.82,0.42,0.00,0.00,0.00,0.00,0.17,0.16,0.85,1",
						"284,0.48,0.00,0.00,0.00,0.00,0.46,0.64,0.36,0.00,0.00,0.00,0.00,0.13,0.12,0.48,1",
						"285,0.27,0.00,0.00,0.00,0.00,0.25,0.31,0.34,0.00,0.00,0.00,0.00,0.12,0.10,0.35,1",
						"286,0.20,0.00,0.00,0.00,0.00,0.18,0.17,0.33,0.00,0.00,0.00,0.00,0.12,0.09,0.12,1",
						"287,0.17,0.00,0.00,0.00,0.00,0.16,0.13,0.33,0.00,0.00,0.00,0.00,0.12,0.09,0.05,1",
						"288,0.17,0.00,0.00,0.00,0.00,0.15,0.12,0.33,0.00,0.00,0.00,0.00,0.12,0.09,77.59,1",
						"289,88.00,79.00,27.00,8.00,25.00,87.00,60.00,53.00,96.00,14.00,38.00,83.00,35.00,77.00,182.66,0",
						"290,86.00,71.00,50.00,85.00,84.00,39.00,38.00,9.00,55.00,90.00,96.00,70.00,91.00,21.00,171.70,0",
						"291,75.00,0.00,83.00,27.00,36.00,91.00,21.00,49.00,99.00,15.00,66.00,76.00,54.00,30.00,138.22,0",
						"292,76.00,16.00,94.00,29.00,6.00,67.00,14.00,63.00,66.00,48.00,28.00,21.00,39.00,98.00,146.41,0",
						"293,99.00,26.00,86.00,97.00,35.00,39.00,59.00,27.00,25.00,38.00,48.00,95.00,86.00,65.00,146.04,0",
						"294,13.00,95.00,24.00,82.00,60.00,48.00,4.00,43.00,57.00,84.00,17.00,13.00,63.00,48.00,150.74,0",
						"295,94.00,25.00,90.00,84.00,43.00,27.00,24.00,8.00,84.00,86.00,58.00,17.00,72.00,12.00,151.41,0",
						"296,44.00,10.00,60.00,93.00,89.00,65.00,67.00,50.00,78.00,53.00,29.00,48.00,50.00,9.00,136.51,0",
						"297,56.00,36.00,75.00,35.00,37.00,29.00,16.00,83.00,64.00,90.00,30.00,0.00,54.00,5.00,130.51,0",
						"298,26.00,14.00,80.00,69.00,1.00,54.00,12.00,61.00,87.00,31.00,89.00,10.00,69.00,41.00,144.60,0",
						"299,89.00,83.00,90.00,67.00,63.00,60.00,2.00,61.00,11.00,16.00,26.00,53.00,21.00,64.00,156.75,0",
						"300,28.05,26.05,28.25,21.03,19.77,18.91,0.69,19.26,3.45,5.02,8.16,16.63,6.67,20.16,125.17,0",
						"301,8.63,7.91,8.57,6.38,6.00,5.82,0.28,5.96,1.05,1.52,2.48,5.05,2.11,6.19,39.48,0",
						"302,2.94,2.48,2.69,2.00,1.88,1.91,0.15,2.31,0.33,0.48,0.78,1.58,0.82,2.07,27.09,1",
						"303,1.36,0.78,0.84,0.63,0.59,1.36,0.94,0.84,0.10,0.15,0.24,0.50,0.28,0.67,41.52,0",
						"304,0.86,0.24,0.26,0.19,0.18,1.18,1.20,0.37,0.03,0.05,0.07,0.15,0.11,0.22,13.06,0",
						"305,0.57,0.08,0.08,0.06,0.06,1.16,1.26,0.16,0.01,0.01,0.02,0.05,0.07,0.10,3.99,1",
						"306,0.62,0.02,0.03,0.02,0.02,1.12,1.29,0.16,0.00,0.00,0.01,0.01,0.05,0.04,1.25,1",
						"307,0.64,0.01,0.01,0.01,0.01,1.11,1.30,0.16,0.00,0.00,0.00,0.00,0.04,0.03,0.45,1",
						"308,0.54,0.00,0.00,0.00,0.00,0.88,1.13,0.06,0.00,0.00,0.00,0.00,0.02,0.01,17.44,1",
						"309,0.50,0.00,0.00,0.00,0.00,0.81,1.07,0.02,0.00,0.00,0.00,0.00,0.01,0.01,0.16,1",
						"310,0.49,0.00,0.00,0.00,0.00,0.79,1.05,0.01,0.00,0.00,0.00,0.00,0.01,0.00,0.35,1",
						"311,0.49,0.00,0.00,0.00,0.00,1.12,1.31,0.51,0.00,0.00,0.00,0.00,0.22,0.23,0.46,1",
						"312,0.49,0.00,0.00,0.00,0.00,1.05,1.24,0.38,0.00,0.00,0.00,0.00,0.18,0.25,0.10,1",
						"313,0.49,0.00,0.00,0.00,0.00,1.02,1.21,0.34,0.00,0.00,0.00,0.00,0.17,0.26,0.48,1",
						"314,0.60,0.00,0.00,0.00,0.00,1.46,1.81,0.44,0.00,0.00,0.00,0.00,0.23,0.23,0.55,1",
						"315,0.74,0.00,0.00,0.00,0.00,1.69,2.15,0.36,0.00,0.00,0.00,0.00,0.22,0.20,0.93,1",
						"316,0.56,0.00,0.00,0.00,0.00,0.80,1.06,0.34,0.00,0.00,0.00,0.00,0.15,0.13,1.01,1",
						"317,0.50,0.00,0.00,0.00,0.00,0.51,0.71,0.33,0.00,0.00,0.00,0.00,0.13,0.11,0.50,1",
						"318,0.28,0.00,0.00,0.00,0.00,0.27,0.33,0.33,0.00,0.00,0.00,0.00,0.12,0.10,0.41,1",
						"319,0.20,0.00,0.00,0.00,0.00,0.19,0.18,0.33,0.00,0.00,0.00,0.00,0.12,0.09,0.17,1",
						"320,0.18,0.00,0.00,0.00,0.00,0.17,0.18,0.33,0.00,0.00,0.00,0.00,0.12,0.09,76.20,1",
						"321,90.00,63.00,14.00,66.00,66.00,2.00,88.00,63.00,54.00,47.00,6.00,90.00,63.00,48.00,174.60,0",
						"322,6.00,31.00,61.00,92.00,68.00,64.00,25.00,24.00,86.00,32.00,35.00,1.00,58.00,58.00,137.72,0",
						"323,8.00,10.00,58.00,54.00,94.00,99.00,51.00,39.00,85.00,2.00,44.00,13.00,92.00,53.00,118.97,0",
						"324,5.00,50.00,53.00,13.00,74.00,76.00,26.00,30.00,29.00,21.00,7.00,57.00,44.00,68.00,135.93,0",
						"325,90.00,71.00,98.00,40.00,94.00,71.00,46.00,99.00,29.00,27.00,41.00,5.00,53.00,24.00,153.70,0",
						"326,25.00,87.00,53.00,84.00,78.00,63.00,81.00,69.00,73.00,6.00,31.00,77.00,9.00,69.00,148.09,0",
						"327,38.00,5.00,81.00,49.00,77.00,79.00,53.00,34.00,14.00,4.00,29.00,55.00,33.00,62.00,133.69,0",
						"328,24.00,0.00,67.00,15.00,11.00,56.00,44.00,7.00,72.00,18.00,12.00,76.00,50.00,84.00,128.38,0",
						"329,11.00,81.00,43.00,32.00,69.00,76.00,46.00,35.00,93.00,61.00,28.00,96.00,58.00,21.00,147.16,0",
						"330,33.00,41.00,67.00,48.00,51.00,16.00,51.00,51.00,70.00,9.00,1.00,21.00,33.00,64.00,140.07,0",
						"331,55.00,81.00,70.00,83.00,55.00,93.00,93.00,3.00,92.00,2.00,77.00,8.00,53.00,61.00,158.24,0",
						"332,55.00,58.00,7.00,82.00,41.00,30.00,82.00,44.00,48.00,62.00,34.00,97.00,7.00,98.00,166.36,0",
						"333,17.38,18.20,2.20,25.74,12.87,9.49,25.80,13.92,15.07,19.46,10.67,30.44,2.28,30.83,104.06,0",
						"334,5.40,5.52,0.67,7.81,3.91,2.96,7.90,4.34,4.57,5.91,3.24,9.24,0.78,9.43,58.17,0",
						"335,1.92,1.73,0.21,2.45,1.23,1.01,2.55,3.13,1.44,1.85,1.02,2.90,68.86,4.66,54.03,0",
						"336,1.04,0.54,0.07,0.77,0.38,1.08,1.69,1.09,0.45,0.58,0.32,0.91,21.64,1.48,40.36,0",
						"337,0.76,0.17,0.02,0.23,0.12,1.10,1.42,0.45,0.14,0.18,0.10,0.28,6.59,0.46,12.67,0",
						"338,0.68,0.05,0.01,0.07,0.04,1.11,1.34,0.25,0.04,0.06,0.03,0.09,2.09,0.16,3.96,1",
						"339,0.55,0.02,0.00,0.02,0.01,0.88,1.14,0.09,0.01,0.02,0.01,0.03,0.66,0.05,35.37,1",
						"340,0.40,0.01,0.00,0.01,0.00,0.36,0.42,1.79,0.00,0.01,0.00,0.01,68.82,1.72,57.10,0",
						"341,0.49,0.00,0.00,0.00,0.00,1.06,1.29,0.02,0.00,0.00,0.00,0.00,0.13,0.09,41.66,1",
						"342,0.49,0.00,0.00,0.00,0.00,0.86,1.12,0.01,0.00,0.00,0.00,0.00,0.04,0.03,0.15,1",
						"343,0.49,0.00,0.00,0.00,0.00,0.81,1.07,0.01,0.00,0.00,0.00,0.00,0.02,0.01,0.61,1",
						"344,0.49,0.00,0.00,0.00,0.00,1.02,1.21,0.32,0.00,0.00,0.00,0.00,0.17,0.26,0.47,1",
						"345,0.60,0.00,0.00,0.00,0.00,1.46,1.81,0.44,0.00,0.00,0.00,0.00,0.22,0.23,0.58,1",
						"346,0.74,0.00,0.00,0.00,0.00,1.69,2.15,0.36,0.00,0.00,0.00,0.00,0.22,0.20,0.28,1",
						"347,0.79,0.00,0.00,0.00,0.00,1.77,2.26,0.34,0.00,0.00,0.00,0.00,0.22,0.20,0.15,1",
						"348,0.80,0.00,0.00,0.00,0.00,1.79,2.29,0.33,0.00,0.00,0.00,0.00,0.22,0.19,0.82,1",
						"349,0.58,0.00,0.00,0.00,0.00,0.83,1.10,0.33,0.00,0.00,0.00,0.00,0.15,0.13,1.11,1",
						"350,0.96,0.00,0.00,0.00,0.00,0.49,0.45,0.43,0.00,0.00,0.00,0.00,0.20,0.17,1.01,1",
						"351,0.42,0.00,0.00,0.00,0.00,0.26,0.25,0.36,0.00,0.00,0.00,0.00,0.15,0.12,0.51,1",
						"352,0.37,0.00,0.00,0.00,0.00,0.27,0.30,0.32,0.00,0.00,0.00,0.00,0.22,0.19,63.28,1",
						"353,67.00,16.00,86.00,51.00,38.00,52.00,3.00,37.00,40.00,65.00,54.00,44.00,66.00,26.00,153.98,0",
						"354,49.00,59.00,56.00,93.00,92.00,64.00,62.00,44.00,21.00,7.00,98.00,61.00,82.00,77.00,142.26,0",
						"355,31.00,72.00,25.00,33.00,21.00,45.00,70.00,0.00,49.00,52.00,41.00,6.00,82.00,62.00,150.27,0",
						"356,2.00,97.00,86.00,37.00,93.00,13.00,51.00,19.00,80.00,5.00,65.00,96.00,93.00,54.00,153.45,0",
						"357,16.00,86.00,39.00,53.00,23.00,38.00,64.00,28.00,9.00,58.00,63.00,26.00,34.00,41.00,142.45,0",
						"358,51.00,75.00,18.00,4.00,20.00,77.00,81.00,79.00,4.00,84.00,33.00,35.00,67.00,77.00,134.86,0",
						"359,20.00,43.00,56.00,54.00,31.00,77.00,59.00,74.00,69.00,77.00,39.00,96.00,59.00,65.00,131.98,0",
						"360,17.00,69.00,84.00,20.00,15.00,8.00,20.00,5.00,76.00,23.00,10.00,99.00,69.00,24.00,133.09,0",
						"361,99.00,23.00,93.00,13.00,63.00,14.00,82.00,36.00,70.00,10.00,79.00,86.00,36.00,44.00,169.41,0",
						"362,11.00,56.00,26.00,48.00,59.00,86.00,57.00,32.00,5.00,56.00,69.00,70.00,17.00,82.00,157.83,0",
						"363,71.00,62.00,84.00,0.00,88.00,9.00,77.00,59.00,34.00,16.00,44.00,0.00,54.00,48.00,145.71,0",
						"364,75.00,26.00,48.00,15.00,83.00,30.00,34.00,49.00,11.00,28.00,4.00,38.00,83.00,60.00,134.85,0",
						"365,57.00,59.00,4.00,24.00,91.00,67.00,38.00,33.00,85.00,51.00,24.00,77.00,54.00,46.00,133.78,0",
						"366,18.11,18.52,1.26,7.53,28.56,21.11,11.99,12.12,26.68,16.01,7.53,24.17,85.56,16.14,108.18,0",
						"367,5.72,5.62,0.38,2.29,8.67,6.49,3.71,5.47,8.10,4.86,2.29,7.33,95.62,6.62,33.94,0",
						"368,2.02,1.76,0.12,0.72,2.72,2.11,1.23,3.48,2.54,1.52,0.72,2.30,98.62,3.78,43.17,1",
						"369,1.08,0.55,0.04,0.23,0.85,1.42,1.28,1.20,0.80,0.48,0.23,0.72,30.98,1.20,45.47,1",
						"370,0.67,0.17,0.01,0.07,0.27,1.05,1.07,0.60,0.25,0.15,0.07,0.23,9.84,0.48,45.21,0",
						"371,0.43,0.05,0.00,0.02,0.08,0.41,0.40,1.95,0.08,0.05,0.02,0.07,71.70,1.85,45.24,0",
						"372,0.36,0.02,0.00,0.01,0.03,0.20,0.19,2.38,0.02,0.01,0.01,0.02,91.41,2.29,14.20,0",
						"373,0.34,0.01,0.00,0.00,0.01,0.14,0.13,2.51,0.01,0.00,0.00,0.01,97.30,2.42,50.78,0",
						"374,0.49,0.00,0.00,0.00,0.00,0.79,1.05,0.02,0.00,0.00,0.00,0.00,0.10,0.01,49.61,1",
						"375,0.51,0.00,0.00,0.00,0.00,1.08,1.27,0.32,0.00,0.00,0.00,0.00,1.05,0.23,2.95,1",
						"376,0.64,0.00,0.00,0.00,0.00,1.29,1.48,0.32,0.00,0.00,0.00,0.00,0.48,0.19,1.17,1",
						"377,0.76,0.00,0.00,0.00,0.00,1.64,2.04,0.33,0.00,0.00,0.00,0.00,0.31,0.19,0.59,1",
						"378,0.79,0.00,0.00,0.00,0.00,1.75,2.22,0.33,0.00,0.00,0.00,0.00,0.25,0.19,0.24,1",
						"379,0.66,0.00,0.00,0.00,0.00,1.64,2.06,0.46,0.00,0.00,0.00,0.00,0.25,0.21,0.27,1",
						"380,0.76,0.00,0.00,0.00,0.00,1.75,2.23,0.37,0.00,0.00,0.00,0.00,0.23,0.20,0.12,1",
						"381,0.79,0.00,0.00,0.00,0.00,1.78,2.28,0.34,0.00,0.00,0.00,0.00,0.23,0.19,0.68,1",
						"382,0.80,0.00,0.00,0.00,0.00,1.49,1.93,0.06,0.00,0.00,0.00,0.00,0.06,0.05,1.40,1",
						"383,0.48,0.00,0.00,0.00,0.00,0.58,0.72,0.24,0.00,0.00,0.00,0.00,0.31,0.37,0.94,1",
						"384,0.38,0.00,0.00,0.00,0.00,0.26,0.29,0.20,0.00,0.00,0.00,0.00,0.36,0.35,73.55,1",
						"385,36.00,59.00,39.00,74.00,36.00,98.00,17.00,52.00,91.00,29.00,72.00,88.00,23.00,20.00,156.24,0",
						"386,79.00,11.00,39.00,75.00,34.00,94.00,85.00,87.00,99.00,39.00,45.00,63.00,80.00,60.00,143.11,0",
						"387,76.00,82.00,46.00,50.00,40.00,29.00,82.00,95.00,3.00,14.00,73.00,69.00,88.00,5.00,161.08,0",
						"388,17.00,20.00,41.00,69.00,64.00,91.00,7.00,38.00,45.00,4.00,24.00,98.00,41.00,9.00,140.75,0",
						"389,71.00,35.00,61.00,70.00,67.00,34.00,33.00,73.00,77.00,18.00,30.00,58.00,60.00,15.00,140.06,0",
						"390,5.00,69.00,7.00,13.00,8.00,65.00,66.00,0.00,78.00,75.00,43.00,31.00,31.00,24.00,161.16,0",
						"391,96.00,58.00,86.00,92.00,37.00,81.00,50.00,92.00,27.00,82.00,96.00,35.00,28.00,70.00,173.21,0",
						"392,43.00,5.00,31.00,57.00,11.00,17.00,41.00,73.00,92.00,65.00,18.00,82.00,79.00,8.00,157.67,0",
						"393,18.00,0.00,3.00,80.00,12.00,32.00,14.00,13.00,36.00,40.00,43.00,15.00,80.00,30.00,171.39,0",
						"394,88.00,40.00,45.00,45.00,24.00,62.00,89.00,69.00,99.00,60.00,41.00,89.00,2.00,55.00,159.74,0",
						"395,26.00,94.00,14.00,41.00,25.00,2.00,63.00,58.00,7.00,74.00,49.00,84.00,27.00,65.00,143.94,0",
						"396,23.00,53.00,51.00,3.00,0.00,31.00,95.00,91.00,70.00,20.00,36.00,70.00,19.00,55.00,150.13,0",
						"397,8.00,80.00,18.00,52.00,88.00,49.00,8.00,55.00,59.00,60.00,1.00,0.00,83.00,24.00,159.20,0",
						"398,0.00,32.00,79.00,92.00,48.00,16.00,2.00,17.00,4.00,25.00,90.00,40.00,73.00,7.00,144.14,0",
						"399,0.22,10.04,24.80,28.88,15.07,5.10,0.69,7.10,1.26,7.85,28.25,12.55,91.53,3.90,98.47,0",
						"400,0.30,3.05,7.53,8.76,4.57,1.63,0.28,3.95,0.38,2.38,8.57,3.81,97.43,2.91,30.84,0",
						"401,0.32,0.96,2.36,2.75,1.44,0.59,0.15,3.00,0.12,0.75,2.69,1.20,99.19,2.61,25.35,1",
						"402,0.32,0.30,0.74,0.86,0.45,0.26,0.12,2.71,0.04,0.23,0.84,0.38,99.75,2.52,25.09,0",
						"403,0.33,0.09,0.22,0.26,0.14,0.16,0.10,2.61,0.01,0.07,0.26,0.11,99.92,2.49,7.88,1",
						"404,0.33,0.03,0.07,0.08,0.04,0.13,0.10,2.58,0.00,0.02,0.08,0.03,99.98,2.48,2.39,1",
						"405,0.33,0.01,0.02,0.02,0.01,0.12,0.10,2.58,0.00,0.01,0.02,0.01,99.99,2.48,0.75,0",
						"406,0.33,0.00,0.01,0.01,0.00,0.12,0.10,2.57,0.00,0.00,0.01,0.00,100.00,2.48,73.80,0",
						"407,0.68,0.00,0.00,0.00,0.00,1.20,1.60,0.52,0.00,0.00,0.00,0.00,9.93,0.32,32.11,0",
						"408,0.66,0.00,0.00,0.00,0.00,1.26,1.52,0.39,0.00,0.00,0.00,0.00,3.27,0.23,4.68,0",
						"409,0.66,0.00,0.00,0.00,0.00,1.29,1.49,0.34,0.00,0.00,0.00,0.00,1.15,0.21,1.59,0",
						"410,0.76,0.00,0.00,0.00,0.00,1.64,2.05,0.33,0.00,0.00,0.00,0.00,0.51,0.20,0.81,0",
						"411,0.79,0.00,0.00,0.00,0.00,1.75,2.22,0.33,0.00,0.00,0.00,0.00,0.31,0.19,0.30,1",
						"412,0.80,0.00,0.00,0.00,0.00,1.78,2.28,0.33,0.00,0.00,0.00,0.00,0.25,0.19,0.78,1",
						"413,0.80,0.00,0.00,0.00,0.00,1.55,1.96,0.14,0.00,0.00,0.00,0.00,0.03,0.02,1.25,1",
						"414,0.48,0.00,0.00,0.00,0.00,0.60,0.73,0.27,0.00,0.00,0.00,0.00,0.30,0.36,1.14,1",
						"415,0.38,0.00,0.00,0.00,0.00,0.27,0.29,0.20,0.00,0.00,0.00,0.00,0.36,0.35,0.45,1",
						"416,0.35,0.00,0.00,0.00,0.00,0.16,0.15,0.18,0.00,0.00,0.00,0.00,0.38,0.35,84.46,1",
						"417,89.00,51.00,34.00,8.00,96.00,56.00,78.00,92.00,81.00,86.00,71.00,63.00,30.00,41.00,174.38,0",
						"418,1.00,16.00,78.00,39.00,5.00,99.00,30.00,97.00,60.00,87.00,72.00,23.00,34.00,45.00,151.39,0",
						"419,43.00,71.00,66.00,66.00,83.00,70.00,48.00,86.00,96.00,83.00,36.00,32.00,34.00,45.00,155.10,0",
						"420,69.00,60.00,10.00,16.00,41.00,69.00,52.00,51.00,27.00,17.00,70.00,81.00,20.00,36.00,132.35,0",
						"421,25.00,29.00,44.00,37.00,96.00,65.00,1.00,43.00,13.00,56.00,14.00,72.00,21.00,84.00,133.01,0",
						"422,26.00,95.00,56.00,56.00,4.00,4.00,10.00,21.00,8.00,50.00,13.00,72.00,27.00,42.00,133.65,0",
						"423,62.00,52.00,35.00,7.00,39.00,30.00,14.00,1.00,63.00,59.00,80.00,78.00,30.00,9.00,166.14,0",
						"424,26.00,32.00,89.00,90.00,82.00,6.00,74.00,54.00,26.00,15.00,97.00,20.00,60.00,89.00,184.46,0",
						"425,77.00,69.00,83.00,49.00,14.00,94.00,5.00,91.00,45.00,60.00,16.00,50.00,39.00,57.00,159.12,0",
						"426,76.00,40.00,28.00,24.00,58.00,81.00,94.00,22.00,56.00,69.00,26.00,1.00,85.00,3.00,157.83,0",
						"427,78.00,66.00,32.00,11.00,86.00,80.00,37.00,24.00,18.00,92.00,74.00,93.00,76.00,88.00,164.49,0",
						"428,54.00,19.00,76.00,71.00,36.00,5.00,87.00,19.00,80.00,55.00,42.00,86.00,2.00,79.00,148.23,0",
						"429,96.00,67.00,86.00,5.00,63.00,71.00,69.00,15.00,77.00,88.00,42.00,30.00,26.00,61.00,161.63,0",
						"430,31.00,9.00,19.00,90.00,15.00,8.00,89.00,3.00,4.00,36.00,32.00,45.00,81.00,74.00,168.72,0",
						"431,56.00,77.00,10.00,73.00,65.00,10.00,93.00,70.00,51.00,5.00,77.00,15.00,8.00,12.00,170.72,0",
						"432,17.80,24.17,3.14,22.91,20.40,3.22,29.26,23.74,16.01,1.57,24.17,4.71,71.12,5.47,95.06,0",
						"433,5.63,7.33,0.95,6.95,6.19,1.06,8.95,9.00,4.86,0.48,7.33,1.43,91.24,3.38,29.63,0",
						"434,1.99,2.30,0.30,2.18,1.94,0.41,2.88,4.59,1.52,0.15,2.30,0.45,97.25,2.76,57.14,0",
						"435,0.85,0.72,0.09,0.68,0.61,0.21,0.97,3.21,0.48,0.05,0.72,0.14,99.14,2.57,17.94,0",
						"436,0.48,0.22,0.03,0.21,0.19,0.14,0.36,2.76,0.15,0.01,0.22,0.04,99.74,2.50,5.63,0",
						"437,0.38,0.07,0.01,0.07,0.06,0.12,0.18,2.63,0.05,0.00,0.07,0.01,99.92,2.48,92.85,0",
						"438,21.90,7.22,30.76,12.55,26.68,14.31,13.21,16.75,23.85,24.48,2.51,28.25,23.02,17.69,109.66,0",
						"439,7.53,2.27,9.65,3.94,8.37,5.32,5.81,5.38,7.49,7.68,0.79,8.87,7.24,5.56,69.73,0",
						"440,2.80,0.71,3.03,1.24,2.63,2.60,2.90,1.92,2.35,2.41,0.25,2.78,2.35,1.81,65.57,0",
						"441,1.33,0.22,0.95,0.39,0.82,1.70,1.93,0.83,0.74,0.76,0.08,0.87,0.89,0.70,56.40,0",
						"442,0.49,0.82,0.57,0.39,0.74,1.39,1.77,0.49,0.33,0.11,0.69,0.34,0.84,0.51,52.65,0",
						"443,0.71,0.26,0.18,0.12,0.23,1.67,2.14,0.38,0.10,0.03,0.22,0.11,0.42,0.29,17.11,0",
						"444,0.34,0.08,0.06,0.04,0.07,0.35,0.41,0.48,0.03,0.01,0.07,0.03,0.42,0.45,6.33,0",
						"445,0.33,0.03,0.02,0.01,0.02,0.22,0.24,0.38,0.01,0.00,0.02,0.01,0.42,0.50,2.30,1",
						"446,0.33,0.01,0.01,0.00,0.01,0.15,0.14,0.24,0.00,0.00,0.01,0.00,0.40,0.39,0.78,1",
						"447,0.34,0.00,0.00,0.00,0.00,0.13,0.11,0.19,0.00,0.00,0.00,0.00,0.39,0.36,0.32,1",
						"448,0.33,0.00,0.00,0.00,0.00,0.16,0.16,0.38,0.00,0.00,0.00,0.00,0.38,0.45,65.57,1",
						"449,79.00,69.00,13.00,41.00,54.00,2.00,82.00,8.00,56.00,57.00,91.00,28.00,11.00,22.00,159.59,0",
						"450,25.00,86.00,69.00,40.00,89.00,47.00,81.00,8.00,33.00,52.00,72.00,49.00,61.00,32.00,149.87,0",
						"451,28.00,44.00,6.00,12.00,6.00,65.00,50.00,46.00,6.00,16.00,18.00,79.00,68.00,11.00,152.38,0",
						"452,62.00,24.00,54.00,22.00,57.00,88.00,28.00,37.00,46.00,85.00,34.00,35.00,58.00,64.00,119.01,0",
						"453,44.00,62.00,49.00,23.00,20.00,99.00,33.00,6.00,22.00,19.00,44.00,93.00,48.00,77.00,115.44,0",
						"454,86.00,66.00,58.00,36.00,42.00,74.00,8.00,33.00,52.00,43.00,23.00,59.00,33.00,18.00,121.74,0",
						"455,90.00,13.00,95.00,86.00,93.00,24.00,75.00,57.00,21.00,59.00,40.00,22.00,8.00,37.00,157.29,0",
						"456,86.00,13.00,24.00,55.00,40.00,44.00,99.00,41.00,61.00,66.00,5.00,51.00,9.00,58.00,147.48,0",
						"457,29.00,85.00,84.00,50.00,47.00,79.00,59.00,93.00,15.00,13.00,42.00,56.00,27.00,91.00,147.88,0",
						"458,95.00,9.00,87.00,49.00,6.00,82.00,78.00,86.00,92.00,30.00,82.00,59.00,93.00,45.00,161.13,0",
						"459,65.00,18.00,48.00,6.00,87.00,8.00,29.00,77.00,99.00,33.00,14.00,7.00,45.00,76.00,178.85,0",
						"460,65.00,83.00,27.00,27.00,43.00,87.00,40.00,21.00,86.00,80.00,42.00,90.00,36.00,27.00,163.09,0",
						"461,56.00,52.00,19.00,9.00,52.00,36.00,85.00,70.00,0.00,33.00,41.00,11.00,20.00,57.00,140.92,0",
						"462,81.00,29.00,88.00,12.00,47.00,22.00,7.00,28.00,31.00,7.00,46.00,7.00,63.00,36.00,142.07,0",
						"463,37.00,64.00,54.00,4.00,52.00,65.00,26.00,76.00,99.00,17.00,21.00,44.00,96.00,34.00,147.82,0",
						"464,24.00,4.00,53.00,5.00,23.00,2.00,3.00,23.00,33.00,90.00,16.00,49.00,79.00,2.00,141.24,0",
						"465,7.76,1.26,16.63,1.57,7.22,0.71,1.01,8.98,10.36,28.25,5.02,15.38,93.41,2.33,133.45,0",
						"466,35.00,57.00,28.00,96.00,61.00,61.00,45.00,45.00,76.00,32.00,2.00,11.00,15.00,65.00,170.77,0",
						"467,11.21,17.89,8.79,30.13,19.15,19.22,14.19,15.89,23.85,10.04,0.63,3.45,73.32,22.10,109.78,0",
						"468,3.74,5.61,2.76,9.46,6.01,6.11,4.52,6.75,7.49,3.15,0.20,1.08,91.63,8.64,122.70,0",
						"469,91.00,86.00,53.00,21.00,90.00,96.00,85.00,64.00,51.00,83.00,54.00,25.00,27.00,75.00,206.80,0",
						"470,11.00,78.00,57.00,39.00,4.00,61.00,84.00,16.00,74.00,67.00,71.00,75.00,81.00,68.00,170.48,0",
						"471,59.00,22.00,72.00,81.00,23.00,74.00,6.00,81.00,82.00,47.00,26.00,23.00,59.00,41.00,150.59,0",
						"472,38.00,32.00,85.00,86.00,82.00,73.00,27.00,92.00,67.00,13.00,70.00,74.00,11.00,67.00,160.49,0",
						"473,42.00,39.00,26.00,82.00,23.00,0.00,27.00,64.00,57.00,48.00,91.00,61.00,79.00,90.00,158.89,0",
						"474,8.00,33.00,57.00,53.00,43.00,82.00,14.00,3.00,94.00,49.00,92.00,13.00,60.00,62.00,159.53,0",
						"475,2.84,10.36,17.89,16.63,13.50,26.21,4.97,1.27,29.50,15.38,28.88,4.08,19.09,19.84,101.35,0",
						"476,1.12,3.25,5.61,5.22,4.24,8.39,1.74,0.73,9.26,4.83,9.06,1.28,6.25,6.59,80.46,0",
						"477,0.57,1.02,1.76,1.64,1.33,2.79,0.72,0.56,2.91,1.51,2.84,0.40,2.22,2.35,25.25,0",
						"478,0.40,0.32,0.55,0.51,0.42,0.99,0.34,0.40,0.91,0.48,0.89,0.13,0.98,1.09,7.98,0",
						"479,0.36,0.10,0.17,0.16,0.13,0.39,0.17,0.24,0.29,0.15,0.28,0.04,0.57,0.58,3.24,0",
						"480,0.34,0.03,0.05,0.05,0.04,0.20,0.12,0.19,0.09,0.05,0.09,0.01,0.44,0.42,80.65,1",
						"481,37.00,21.00,82.00,76.00,51.00,95.00,94.00,97.00,59.00,58.00,4.00,28.00,62.00,43.00,181.53,0",
						"482,69.00,37.00,69.00,11.00,42.00,65.00,31.00,85.00,76.00,29.00,55.00,72.00,2.00,90.00,155.41,0",
						"483,7.00,5.00,16.00,86.00,17.00,57.00,2.00,42.00,3.00,85.00,55.00,47.00,26.00,42.00,145.09,0",
						"484,68.00,78.00,19.00,53.00,57.00,48.00,41.00,77.00,66.00,99.00,48.00,40.00,32.00,57.00,127.20,0",
						"485,3.00,27.00,50.00,55.00,18.00,74.00,59.00,5.00,6.00,85.00,58.00,53.00,21.00,29.00,135.89,0",
						"486,42.00,33.00,24.00,54.00,29.00,75.00,52.00,1.00,31.00,52.00,49.00,91.00,8.00,76.00,120.26,0",
						"487,21.00,94.00,2.00,42.00,36.00,49.00,18.00,48.00,73.00,35.00,70.00,34.00,22.00,99.00,165.78,0",
						"488,96.00,9.00,86.00,51.00,26.00,70.00,24.00,62.00,1.00,81.00,35.00,52.00,48.00,16.00,152.65,0",
						"489,89.00,2.00,25.00,8.00,62.00,68.00,48.00,52.00,37.00,80.00,78.00,93.00,38.00,88.00,154.34,0",
						"490,10.00,19.00,62.00,88.00,54.00,58.00,40.00,93.00,95.00,91.00,39.00,62.00,30.00,14.00,164.24,0",
						"491,58.00,58.00,19.00,77.00,40.00,70.00,74.00,4.00,23.00,21.00,46.00,93.00,78.00,94.00,169.85,0",
						"492,77.00,18.00,56.00,34.00,61.00,14.00,77.00,28.00,9.00,12.00,41.00,6.00,41.00,16.00,150.06,0",
						"493,48.00,30.00,56.00,76.00,60.00,53.00,33.00,51.00,54.00,19.00,41.00,50.00,12.00,98.00,130.96,0",
						"494,78.00,43.00,64.00,25.00,52.00,91.00,34.00,61.00,73.00,47.00,9.00,83.00,89.00,64.00,127.89,0",
						"495,99.00,27.00,9.00,56.00,20.00,86.00,65.00,33.00,52.00,15.00,52.00,53.00,84.00,65.00,128.81,0",
						"496,78.00,96.00,5.00,41.00,6.00,83.00,91.00,18.00,3.00,53.00,14.00,84.00,54.00,95.00,162.87,0",
						"497,98.00,28.00,45.00,29.00,48.00,90.00,94.00,56.00,66.00,29.00,99.00,44.00,44.00,20.00,160.78,0",
						"498,38.00,88.00,30.00,20.00,99.00,37.00,58.00,41.00,33.00,4.00,54.00,33.00,78.00,23.00,139.72,0",
						"499,51.00,75.00,98.00,46.00,93.00,25.00,51.00,34.00,75.00,43.00,80.00,0.00,7.00,9.00,157.54,0",
						"500,72.00,26.00,91.00,75.00,54.00,44.00,11.00,67.00,10.00,44.00,67.00,19.00,87.00,23.00,164.89,0",
						"501,18.00,94.00,73.00,60.00,5.00,59.00,59.00,24.00,21.00,29.00,13.00,49.00,11.00,81.00,152.10,0",
						"502,80.00,67.00,2.00,88.00,58.00,25.00,29.00,52.00,1.00,44.00,4.00,24.00,28.00,20.00,169.10,0",
						"503,44.00,5.00,61.00,35.00,74.00,9.00,87.00,86.00,99.00,35.00,12.00,0.00,83.00,83.00,150.05,0",
						"504,12.00,54.00,46.00,16.00,64.00,6.00,52.00,99.00,77.00,31.00,9.00,32.00,66.00,81.00,129.27,0",
						"505,28.00,65.00,81.00,14.00,29.00,23.00,10.00,58.00,35.00,94.00,13.00,49.00,63.00,59.00,139.82,0",
						"506,54.00,67.00,79.00,53.00,4.00,95.00,91.00,17.00,6.00,93.00,73.00,7.00,31.00,34.00,147.37,0",
						"507,65.00,70.00,81.00,91.00,16.00,36.00,24.00,51.00,11.00,32.00,62.00,22.00,0.00,57.00,155.02,0",
						"508,51.00,79.00,60.00,68.00,51.00,96.00,40.00,53.00,88.00,41.00,25.00,95.00,98.00,75.00,183.15,0",
						"509,16.12,24.80,18.83,21.34,16.01,30.22,12.62,16.97,27.62,12.87,7.85,29.82,31.07,23.90,113.98,0",
						"510,5.28,7.78,5.91,6.70,5.02,9.65,4.14,5.77,8.67,4.04,2.46,9.36,10.07,7.87,71.53,0",
						"511,1.88,2.44,1.86,2.10,1.58,3.14,1.41,2.04,2.72,1.27,0.77,2.94,3.45,2.82,77.10,0",
						"512,0.82,0.77,0.58,0.66,0.49,1.07,0.51,0.76,0.85,0.40,0.24,0.92,1.35,1.12,76.05,0",
						"513,26.00,6.00,27.00,18.00,9.00,67.00,88.00,35.00,18.00,4.00,42.00,43.00,43.00,75.00,155.92,0",
						"514,87.00,52.00,28.00,84.00,4.00,50.00,98.00,19.00,35.00,35.00,51.00,60.00,4.00,83.00,135.64,0",
						"515,77.00,17.00,2.00,73.00,16.00,71.00,82.00,68.00,62.00,77.00,72.00,72.00,32.00,55.00,119.53,0",
						"516,7.00,99.00,43.00,67.00,20.00,8.00,50.00,54.00,7.00,80.00,8.00,81.00,52.00,70.00,141.49,0",
						"517,22.00,47.00,21.00,18.00,66.00,63.00,41.00,97.00,95.00,19.00,46.00,87.00,81.00,97.00,164.73,0",
						"518,64.00,61.00,69.00,82.00,53.00,93.00,14.00,93.00,70.00,9.00,99.00,77.00,44.00,62.00,152.82,0",
						"519,85.00,91.00,93.00,38.00,54.00,67.00,17.00,5.00,64.00,26.00,28.00,15.00,80.00,46.00,144.15,0",
						"520,98.00,63.00,10.00,38.00,70.00,93.00,9.00,72.00,74.00,34.00,32.00,34.00,63.00,59.00,129.77,0",
						"521,52.00,69.00,92.00,26.00,39.00,97.00,1.00,48.00,91.00,89.00,6.00,60.00,19.00,58.00,163.60,0",
						"522,27.00,25.00,30.00,52.00,91.00,32.00,76.00,65.00,37.00,9.00,95.00,23.00,20.00,5.00,157.67,0",
						"523,81.00,17.00,70.00,17.00,29.00,42.00,52.00,89.00,16.00,9.00,68.00,92.00,24.00,89.00,153.32,0",
						"524,34.00,15.00,87.00,29.00,11.00,9.00,34.00,17.00,65.00,63.00,77.00,57.00,57.00,45.00,141.68,0",
						"525,12.00,61.00,3.00,34.00,29.00,70.00,79.00,80.00,97.00,67.00,9.00,80.00,45.00,81.00,154.14,0",
						"526,78.00,57.00,89.00,75.00,71.00,83.00,68.00,81.00,39.00,40.00,59.00,48.00,4.00,23.00,156.93,0",
						"527,32.00,78.00,79.00,25.00,91.00,92.00,73.00,29.00,80.00,58.00,23.00,63.00,96.00,70.00,152.12,0",
						"528,18.00,86.00,55.00,57.00,52.00,80.00,15.00,99.00,11.00,75.00,30.00,98.00,63.00,53.00,143.07,0",
						"529,98.00,43.00,4.00,32.00,89.00,49.00,58.00,16.00,17.00,62.00,56.00,46.00,38.00,4.00,145.85,0",
						"530,25.00,60.00,59.00,1.00,17.00,95.00,80.00,44.00,93.00,36.00,82.00,45.00,34.00,67.00,144.92,0",
						"531,69.00,99.00,84.00,1.00,58.00,92.00,8.00,74.00,17.00,33.00,58.00,87.00,25.00,92.00,162.21,0",
						"532,37.00,10.00,4.00,1.00,25.00,52.00,62.00,17.00,28.00,95.00,38.00,42.00,13.00,38.00,168.90,0",
						"533,13.00,40.00,90.00,87.00,46.00,96.00,84.00,16.00,60.00,84.00,9.00,25.00,86.00,59.00,145.86,0",
						"534,96.00,73.00,88.00,39.00,8.00,83.00,76.00,0.00,27.00,86.00,4.00,11.00,45.00,26.00,150.25,0",
						"535,80.00,44.00,49.00,10.00,16.00,90.00,25.00,11.00,11.00,2.00,25.00,61.00,59.00,87.00,175.52,0",
						"536,87.00,41.00,93.00,57.00,38.00,44.00,58.00,53.00,85.00,67.00,91.00,45.00,92.00,8.00,158.16,0",
						"537,54.00,5.00,80.00,81.00,69.00,53.00,0.00,68.00,73.00,21.00,44.00,7.00,69.00,20.00,148.71,0",
						"538,11.00,53.00,24.00,70.00,26.00,19.00,58.00,14.00,42.00,77.00,70.00,87.00,63.00,77.00,150.37,0",
						"539,21.00,81.00,35.00,19.00,71.00,64.00,31.00,2.00,51.00,10.00,18.00,35.00,85.00,91.00,150.73,0",
						"540,71.00,96.00,8.00,51.00,4.00,60.00,19.00,23.00,61.00,9.00,89.00,48.00,48.00,43.00,142.04,0",
						"541,32.00,56.00,88.00,29.00,47.00,7.00,76.00,78.00,12.00,4.00,76.00,7.00,17.00,6.00,165.05,0",
						"542,12.00,60.00,34.00,62.00,34.00,72.00,77.00,78.00,86.00,17.00,3.00,94.00,29.00,17.00,176.29,0",
						"543,6.00,67.00,50.00,40.00,65.00,14.00,54.00,3.00,91.00,60.00,96.00,31.00,84.00,9.00,180.22,0",
						"544,2.11,21.03,15.69,12.55,20.40,4.48,17.02,1.39,28.56,18.83,30.13,9.73,26.77,3.50,174.13,0",
						"545,92.00,97.00,90.00,94.00,81.00,75.00,98.00,33.00,65.00,64.00,82.00,84.00,98.00,83.00,206.74,0",
						"546,37.00,43.00,56.00,27.00,55.00,42.00,68.00,80.00,68.00,86.00,7.00,82.00,86.00,2.00,152.11,0",
						"547,68.00,65.00,47.00,60.00,39.00,67.00,80.00,56.00,95.00,69.00,63.00,57.00,43.00,69.00,120.40,0",
						"548,19.00,58.00,57.00,84.00,29.00,49.00,7.00,97.00,9.00,72.00,10.00,22.00,36.00,44.00,134.53,0",
						"549,65.00,47.00,88.00,39.00,8.00,61.00,90.00,85.00,44.00,48.00,15.00,20.00,42.00,9.00,152.30,0",
						"550,26.00,17.00,7.00,11.00,59.00,3.00,50.00,76.00,88.00,59.00,46.00,9.00,17.00,61.00,146.89,0",
						"551,12.00,96.00,58.00,47.00,85.00,70.00,82.00,89.00,88.00,5.00,53.00,53.00,70.00,79.00,151.30,0",
						"552,34.00,92.00,39.00,78.00,33.00,49.00,2.00,88.00,52.00,66.00,43.00,51.00,37.00,26.00,133.83,0",
						"553,88.00,13.00,25.00,94.00,46.00,21.00,48.00,32.00,41.00,91.00,36.00,34.00,6.00,74.00,156.77,0",
						"554,12.00,52.00,38.00,54.00,86.00,90.00,91.00,0.00,90.00,32.00,68.00,54.00,63.00,7.00,139.00,0",
						"555,14.00,91.00,35.00,89.00,82.00,91.00,83.00,18.00,15.00,61.00,41.00,87.00,17.00,86.00,158.31,0",
						"556,45.00,80.00,48.00,64.00,4.00,25.00,39.00,83.00,67.00,16.00,32.00,67.00,61.00,63.00,141.72,0",
						"557,4.00,63.00,91.00,22.00,77.00,70.00,97.00,57.00,88.00,17.00,95.00,65.00,65.00,81.00,162.53,0",
						"558,14.00,12.00,26.00,15.00,46.00,25.00,44.00,54.00,11.00,9.00,17.00,35.00,41.00,96.00,153.29,0",
						"559,72.00,16.00,40.00,82.00,87.00,0.00,34.00,15.00,22.00,80.00,12.00,22.00,41.00,80.00,153.32,0",
						"560,39.00,34.00,83.00,36.00,61.00,74.00,11.00,61.00,59.00,99.00,60.00,56.00,52.00,55.00,116.16,0",
						"561,58.00,78.00,15.00,89.00,61.00,59.00,17.00,49.00,52.00,61.00,42.00,75.00,7.00,52.00,117.68,0",
						"562,42.00,72.00,37.00,4.00,85.00,72.00,21.00,63.00,44.00,13.00,89.00,46.00,56.00,73.00,134.48,0",
						"563,58.00,22.00,96.00,9.00,35.00,88.00,98.00,12.00,29.00,63.00,35.00,87.00,44.00,70.00,146.10,0",
						"564,92.00,37.00,54.00,10.00,90.00,26.00,89.00,1.00,74.00,48.00,7.00,5.00,79.00,31.00,160.77,0",
						"565,4.00,76.00,40.00,43.00,1.00,81.00,33.00,37.00,67.00,21.00,18.00,67.00,6.00,48.00,163.52,0",
						"566,39.00,72.00,50.00,59.00,96.00,0.00,29.00,3.00,44.00,28.00,9.00,15.00,46.00,99.00,159.87,0",
						"567,57.00,82.00,44.00,78.00,83.00,24.00,44.00,18.00,96.00,53.00,78.00,51.00,96.00,5.00,163.10,0",
						"568,15.00,12.00,58.00,35.00,87.00,38.00,15.00,63.00,66.00,90.00,71.00,90.00,21.00,96.00,153.06,0",
						"569,60.00,26.00,41.00,14.00,99.00,55.00,57.00,90.00,51.00,42.00,20.00,80.00,5.00,21.00,137.83,0",
						"570,59.00,40.00,66.00,84.00,93.00,57.00,83.00,23.00,49.00,23.00,70.00,44.00,25.00,58.00,137.90,0",
						"571,23.00,83.00,4.00,84.00,90.00,82.00,31.00,72.00,85.00,75.00,41.00,49.00,43.00,7.00,156.75,0",
						"572,32.00,19.00,3.00,93.00,17.00,40.00,18.00,34.00,3.00,12.00,67.00,64.00,57.00,79.00,163.15,0",
						"573,84.00,81.00,82.00,37.00,3.00,59.00,97.00,28.00,81.00,6.00,35.00,89.00,72.00,83.00,182.81,0",
						"574,72.00,9.00,79.00,93.00,52.00,26.00,6.00,82.00,18.00,7.00,91.00,38.00,38.00,28.00,175.01,0",
						"575,64.00,7.00,37.00,4.00,73.00,73.00,81.00,41.00,18.00,26.00,65.00,14.00,26.00,52.00,165.07,0",
						"576,18.00,57.00,82.00,86.00,11.00,2.00,89.00,40.00,87.00,93.00,45.00,47.00,88.00,96.00,191.40,0",
						"577,94.00,30.00,6.00,9.00,84.00,59.00,19.00,87.00,88.00,77.00,82.00,8.00,24.00,95.00,183.18,0",
						"578,54.00,44.00,80.00,90.00,16.00,0.00,88.00,97.00,73.00,94.00,46.00,42.00,58.00,68.00,160.78,0",
						"579,14.00,76.00,55.00,36.00,31.00,40.00,47.00,44.00,50.00,53.00,10.00,11.00,5.00,98.00,143.51,0",
						"580,9.00,44.00,93.00,74.00,82.00,94.00,76.00,14.00,0.00,74.00,34.00,47.00,86.00,71.00,167.06,0",
						"581,97.00,14.00,37.00,79.00,4.00,78.00,10.00,42.00,85.00,26.00,56.00,87.00,54.00,8.00,175.60,0",
						"582,42.00,18.00,5.00,10.00,81.00,11.00,57.00,15.00,61.00,94.00,37.00,2.00,64.00,60.00,160.30,0",
						"583,20.00,96.00,67.00,37.00,11.00,8.00,12.00,59.00,23.00,48.00,37.00,51.00,72.00,38.00,158.24,0",
						"584,87.00,84.00,59.00,17.00,40.00,57.00,44.00,46.00,67.00,8.00,63.00,75.00,1.00,10.00,140.68,0",
						"585,28.00,3.00,98.00,33.00,23.00,41.00,51.00,45.00,71.00,95.00,98.00,22.00,35.00,67.00,150.20,0",
						"586,12.00,31.00,1.00,73.00,62.00,30.00,75.00,2.00,67.00,72.00,69.00,54.00,11.00,0.00,144.14,0",
						"587,69.00,26.00,44.00,46.00,64.00,5.00,39.00,13.00,81.00,49.00,50.00,71.00,27.00,93.00,138.26,0",
						"588,25.00,74.00,64.00,10.00,55.00,66.00,96.00,83.00,66.00,64.00,85.00,66.00,39.00,58.00,140.63,0",
						"589,68.00,26.00,33.00,53.00,26.00,90.00,13.00,60.00,23.00,84.00,11.00,72.00,35.00,60.00,156.95,0",
						"590,84.00,75.00,47.00,56.00,71.00,46.00,34.00,37.00,59.00,11.00,76.00,36.00,90.00,69.00,147.83,0",
						"591,9.00,62.00,13.00,60.00,35.00,90.00,8.00,96.00,70.00,86.00,5.00,30.00,37.00,60.00,152.83,0",
						"592,41.00,10.00,50.00,47.00,70.00,80.00,36.00,25.00,85.00,74.00,41.00,5.00,79.00,71.00,129.87,0",
						"593,98.00,64.00,16.00,86.00,55.00,93.00,39.00,46.00,35.00,33.00,81.00,46.00,53.00,63.00,135.06,0",
						"594,55.00,88.00,59.00,53.00,6.00,7.00,16.00,93.00,19.00,3.00,93.00,88.00,42.00,59.00,143.81,0",
						"595,17.00,46.00,40.00,25.00,17.00,47.00,94.00,56.00,55.00,92.00,96.00,51.00,67.00,85.00,156.00,0",
						"596,28.00,26.00,63.00,27.00,75.00,83.00,44.00,43.00,10.00,0.00,27.00,7.00,39.00,76.00,154.40,0",
						"597,35.00,29.00,80.00,91.00,62.00,26.00,16.00,82.00,50.00,88.00,21.00,64.00,5.00,85.00,151.93,0",
						"598,41.00,28.00,64.00,24.00,21.00,68.00,9.00,54.00,81.00,15.00,77.00,29.00,53.00,99.00,139.60,0",
						"599,25.00,64.00,66.00,18.00,26.00,56.00,49.00,8.00,72.00,75.00,57.00,58.00,52.00,81.00,118.08,0",
						"600,53.00,93.00,77.00,79.00,87.00,4.00,33.00,8.00,56.00,76.00,73.00,66.00,41.00,32.00,124.65,0",
						"601,46.00,41.00,63.00,66.00,44.00,5.00,17.00,38.00,97.00,77.00,62.00,64.00,39.00,41.00,119.76,0",
						"602,6.00,40.00,56.00,96.00,21.00,14.00,27.00,23.00,3.00,76.00,47.00,7.00,52.00,38.00,146.55,0",
						"603,84.00,86.00,52.00,89.00,50.00,41.00,27.00,36.00,98.00,77.00,99.00,39.00,92.00,84.00,159.39,0",
						"604,66.00,65.00,3.00,3.00,56.00,9.00,69.00,91.00,82.00,77.00,99.00,64.00,25.00,92.00,162.06,0",
						"605,65.00,86.00,94.00,63.00,74.00,75.00,45.00,63.00,46.00,99.00,99.00,97.00,33.00,0.00,179.42,0",
						"606,88.00,62.00,5.00,89.00,83.00,2.00,4.00,33.00,98.00,97.00,40.00,68.00,20.00,62.00,159.66,0",
						"607,9.00,15.00,95.00,56.00,61.00,30.00,18.00,29.00,83.00,55.00,77.00,98.00,89.00,93.00,170.57,0",
						"608,29.00,69.00,75.00,95.00,1.00,83.00,17.00,79.00,91.00,51.00,59.00,64.00,20.00,7.00,160.67,0",
						"609,72.00,4.00,95.00,3.00,21.00,23.00,39.00,67.00,75.00,97.00,60.00,42.00,51.00,26.00,148.74,0",
						"610,79.00,73.00,27.00,32.00,81.00,97.00,22.00,37.00,37.00,30.00,58.00,68.00,47.00,41.00,157.18,0",
						"611,30.00,71.00,70.00,84.00,14.00,3.00,19.00,37.00,63.00,80.00,88.00,38.00,40.00,0.00,143.92,0",
						"612,47.00,57.00,27.00,51.00,14.00,41.00,50.00,64.00,1.00,23.00,1.00,63.00,24.00,22.00,152.06,0",
						"613,52.00,54.00,99.00,94.00,14.00,51.00,93.00,68.00,50.00,81.00,43.00,93.00,79.00,63.00,150.92,0",
						"614,38.00,96.00,47.00,94.00,88.00,22.00,45.00,94.00,93.00,65.00,7.00,97.00,19.00,33.00,181.31,0",
						"615,71.00,8.00,39.00,24.00,82.00,55.00,71.00,84.00,24.00,55.00,83.00,18.00,7.00,62.00,166.87,0",
						"616,89.00,70.00,37.00,55.00,34.00,14.00,73.00,1.00,23.00,9.00,18.00,83.00,9.00,74.00,148.67,0",
						"617,29.00,63.00,84.00,50.00,74.00,48.00,60.00,75.00,97.00,69.00,62.00,82.00,2.00,3.00,156.37,0",
						"618,95.00,23.00,13.00,86.00,7.00,60.00,38.00,33.00,15.00,16.00,26.00,32.00,56.00,95.00,174.15,0",
						"619,75.00,68.00,36.00,80.00,81.00,38.00,52.00,22.00,93.00,68.00,61.00,24.00,44.00,13.00,141.09,0",
						"620,54.00,36.00,17.00,16.00,74.00,11.00,93.00,73.00,89.00,11.00,16.00,96.00,45.00,25.00,159.00,0",
						"621,1.00,42.00,11.00,78.00,22.00,90.00,13.00,51.00,86.00,53.00,59.00,21.00,64.00,43.00,131.97,0",
						"622,34.00,47.00,80.00,75.00,29.00,90.00,38.00,25.00,58.00,65.00,35.00,22.00,41.00,75.00,123.53,0",
						"623,28.00,28.00,0.00,35.00,27.00,13.00,59.00,60.00,33.00,79.00,89.00,14.00,18.00,78.00,143.72,0",
						"624,28.00,96.00,26.00,30.00,93.00,63.00,57.00,47.00,11.00,68.00,43.00,98.00,38.00,82.00,162.84,0",
						"625,6.00,91.00,13.00,97.00,19.00,22.00,41.00,7.00,87.00,83.00,85.00,4.00,2.00,38.00,177.08,0",
						"626,82.00,37.00,21.00,75.00,13.00,9.00,45.00,88.00,84.00,45.00,49.00,41.00,10.00,18.00,142.86,0",
						"627,70.00,52.00,82.00,90.00,7.00,26.00,58.00,99.00,3.00,45.00,3.00,60.00,9.00,78.00,159.32,0",
						"628,61.00,2.00,71.00,0.00,14.00,18.00,68.00,38.00,60.00,66.00,64.00,5.00,98.00,77.00,151.82,0",
						"629,7.00,0.00,80.00,21.00,93.00,19.00,91.00,52.00,93.00,25.00,20.00,99.00,57.00,82.00,155.32,0",
						"630,50.00,84.00,82.00,20.00,51.00,86.00,78.00,44.00,88.00,87.00,10.00,93.00,69.00,94.00,128.41,0",
						"631,31.00,94.00,92.00,34.00,33.00,70.00,94.00,40.00,26.00,98.00,40.00,25.00,61.00,34.00,134.44,0",
						"632,55.00,24.00,74.00,4.00,23.00,32.00,14.00,50.00,51.00,28.00,69.00,74.00,25.00,9.00,146.75,0",
						"633,36.00,1.00,66.00,73.00,6.00,10.00,84.00,89.00,87.00,70.00,76.00,99.00,71.00,81.00,150.95,0",
						"634,29.00,81.00,42.00,38.00,22.00,6.00,76.00,23.00,81.00,95.00,32.00,88.00,40.00,1.00,153.22,0",
						"635,90.00,7.00,92.00,27.00,70.00,2.00,77.00,79.00,37.00,34.00,40.00,34.00,46.00,39.00,159.58,0",
						"636,54.00,10.00,46.00,44.00,50.00,99.00,53.00,45.00,47.00,33.00,69.00,68.00,36.00,70.00,153.20,0",
						"637,97.00,82.00,11.00,16.00,47.00,11.00,5.00,78.00,27.00,16.00,15.00,16.00,24.00,5.00,185.99,0",
						"638,84.00,53.00,6.00,18.00,15.00,5.00,38.00,12.00,68.00,84.00,73.00,91.00,36.00,66.00,125.55,0",
						"639,75.00,42.00,4.00,25.00,69.00,12.00,40.00,32.00,79.00,64.00,64.00,58.00,11.00,47.00,135.81,0",
						"640,68.00,17.00,95.00,99.00,2.00,97.00,90.00,8.00,33.00,40.00,46.00,5.00,70.00,27.00,163.16,0",
						"641,55.00,60.00,86.00,71.00,4.00,10.00,22.00,91.00,2.00,77.00,50.00,35.00,57.00,32.00,142.36,0",
						"642,58.00,74.00,71.00,83.00,40.00,76.00,30.00,5.00,36.00,42.00,30.00,63.00,98.00,44.00,133.82,0",
						"643,16.00,98.00,80.00,49.00,34.00,12.00,36.00,74.00,26.00,23.00,97.00,37.00,19.00,43.00,156.37,0",
						"644,91.00,28.00,19.00,35.00,50.00,67.00,83.00,52.00,62.00,7.00,33.00,66.00,93.00,90.00,139.95,0",
						"645,76.00,72.00,26.00,36.00,35.00,55.00,91.00,26.00,11.00,26.00,20.00,18.00,71.00,45.00,120.79,0",
						"646,69.00,71.00,74.00,69.00,1.00,68.00,80.00,36.00,0.00,1.00,62.00,22.00,48.00,81.00,156.55,0",
						"647,64.00,51.00,53.00,23.00,85.00,63.00,63.00,95.00,78.00,45.00,2.00,74.00,73.00,20.00,146.06,0",
						"648,44.00,99.00,26.00,5.00,51.00,32.00,3.00,34.00,33.00,45.00,79.00,99.00,8.00,51.00,148.97,0",
						"649,49.00,64.00,56.00,42.00,15.00,23.00,69.00,33.00,91.00,96.00,55.00,47.00,39.00,11.00,128.76,0",
						"650,45.00,20.00,61.00,53.00,33.00,45.00,66.00,23.00,37.00,89.00,91.00,63.00,75.00,53.00,130.36,0",
						"651,78.00,37.00,35.00,70.00,55.00,48.00,67.00,42.00,43.00,2.00,28.00,73.00,62.00,87.00,141.06,0",
						"652,43.00,92.00,25.00,41.00,48.00,53.00,55.00,24.00,50.00,96.00,81.00,13.00,37.00,13.00,147.12,0",
						"653,54.00,97.00,66.00,74.00,40.00,85.00,0.00,2.00,53.00,60.00,56.00,26.00,50.00,61.00,129.61,0",
						"654,14.00,15.00,17.00,55.00,59.00,72.00,56.00,32.00,88.00,24.00,66.00,18.00,29.00,9.00,134.54,0",
						"655,26.00,33.00,31.00,22.00,71.00,42.00,28.00,86.00,77.00,32.00,67.00,18.00,70.00,5.00,134.19,0",
						"656,85.00,4.00,69.00,68.00,60.00,83.00,97.00,74.00,39.00,60.00,36.00,95.00,96.00,51.00,157.54,0",
						"657,50.00,19.00,24.00,6.00,89.00,87.00,94.00,70.00,26.00,95.00,79.00,80.00,65.00,5.00,168.30,0",
						"658,53.00,59.00,27.00,67.00,84.00,2.00,4.00,77.00,13.00,8.00,2.00,79.00,47.00,89.00,178.85,0",
						"659,57.00,31.00,32.00,75.00,12.00,24.00,92.00,77.00,65.00,30.00,93.00,5.00,16.00,28.00,151.73,0",
						"660,55.00,29.00,88.00,28.00,5.00,41.00,23.00,71.00,10.00,43.00,60.00,42.00,57.00,39.00,132.66,0",
						"661,6.00,25.00,10.00,74.00,39.00,71.00,25.00,59.00,44.00,51.00,73.00,97.00,96.00,38.00,142.39,0",
						"662,15.00,65.00,17.00,45.00,38.00,87.00,42.00,22.00,75.00,71.00,27.00,90.00,90.00,95.00,138.48,0",
						"663,87.00,95.00,52.00,96.00,64.00,69.00,73.00,91.00,2.00,51.00,89.00,45.00,9.00,73.00,162.28,0",
						"664,59.00,10.00,37.00,12.00,49.00,51.00,92.00,17.00,75.00,47.00,67.00,86.00,4.00,82.00,144.53,0",
						"665,59.00,63.00,94.00,58.00,22.00,95.00,27.00,2.00,34.00,40.00,60.00,76.00,26.00,48.00,148.11,0",
						"666,26.00,94.00,92.00,97.00,65.00,33.00,64.00,11.00,61.00,86.00,86.00,26.00,93.00,42.00,136.80,0",
						"667,43.00,69.00,50.00,70.00,70.00,57.00,88.00,16.00,86.00,86.00,33.00,30.00,92.00,80.00,133.97,0",
						"668,50.00,77.00,79.00,2.00,40.00,49.00,12.00,89.00,88.00,56.00,13.00,15.00,70.00,44.00,162.98,0",
						"669,14.00,27.00,37.00,87.00,18.00,18.00,83.00,42.00,40.00,72.00,69.00,90.00,65.00,89.00,171.58,0",
						"670,54.00,23.00,15.00,30.00,65.00,58.00,97.00,87.00,61.00,79.00,98.00,64.00,68.00,41.00,132.84,0",
						"671,32.00,9.00,72.00,70.00,97.00,95.00,31.00,34.00,36.00,77.00,15.00,51.00,90.00,24.00,162.16,0",
						"672,85.00,26.00,77.00,75.00,38.00,75.00,11.00,94.00,15.00,76.00,88.00,49.00,3.00,80.00,147.42,0",
						"673,61.00,89.00,73.00,98.00,97.00,69.00,4.00,80.00,86.00,84.00,50.00,39.00,61.00,51.00,143.39,0",
						"674,4.00,97.00,24.00,40.00,84.00,70.00,52.00,49.00,70.00,39.00,51.00,36.00,77.00,98.00,133.94,0",
						"675,60.00,12.00,6.00,67.00,54.00,70.00,2.00,57.00,76.00,33.00,61.00,81.00,74.00,88.00,138.28,0",
						"676,8.00,26.00,5.00,79.00,92.00,87.00,53.00,45.00,89.00,9.00,44.00,22.00,73.00,90.00,151.65,0",
						"677,15.00,43.00,7.00,56.00,5.00,47.00,76.00,85.00,12.00,13.00,21.00,85.00,37.00,16.00,146.86,0",
						"678,59.00,82.00,64.00,8.00,59.00,92.00,28.00,62.00,10.00,74.00,21.00,16.00,21.00,39.00,151.42,0",
						"679,75.00,50.00,99.00,22.00,40.00,61.00,32.00,70.00,91.00,50.00,27.00,98.00,36.00,36.00,110.45,0",
						"680,44.00,78.00,44.00,31.00,43.00,90.00,13.00,52.00,40.00,55.00,11.00,15.00,83.00,29.00,157.99,0",
						"681,85.00,7.00,28.00,25.00,47.00,58.00,57.00,0.00,66.00,9.00,5.00,72.00,51.00,90.00,136.57,0",
						"682,82.00,37.00,5.00,69.00,48.00,9.00,29.00,0.00,51.00,18.00,28.00,32.00,34.00,17.00,132.84,0",
						"683,0.00,58.00,77.00,1.00,37.00,15.00,70.00,13.00,43.00,9.00,62.00,39.00,40.00,70.00,129.16,0",
						"684,23.00,58.00,55.00,38.00,1.00,47.00,76.00,41.00,60.00,12.00,28.00,58.00,5.00,46.00,116.95,0",
						"685,6.00,16.00,51.00,37.00,72.00,48.00,74.00,30.00,72.00,64.00,71.00,53.00,78.00,55.00,131.60,0",
						"686,38.00,45.00,87.00,46.00,43.00,13.00,12.00,11.00,73.00,84.00,29.00,52.00,94.00,97.00,153.40,0",
						"687,29.00,54.00,77.00,94.00,59.00,0.00,93.00,51.00,68.00,84.00,26.00,64.00,67.00,2.00,147.16,0",
						"688,6.00,63.00,26.00,49.00,86.00,31.00,14.00,39.00,84.00,39.00,55.00,44.00,21.00,7.00,142.61,0",
						"689,31.00,82.00,88.00,67.00,89.00,63.00,69.00,85.00,38.00,60.00,37.00,83.00,94.00,7.00,146.61,0",
						"690,19.00,42.00,49.00,1.00,72.00,9.00,10.00,19.00,8.00,92.00,90.00,82.00,16.00,54.00,172.32,0",
						"691,54.00,81.00,69.00,81.00,6.00,3.00,71.00,18.00,50.00,6.00,79.00,91.00,43.00,16.00,153.37,0",
						"692,55.00,6.00,55.00,84.00,55.00,9.00,59.00,61.00,89.00,74.00,26.00,72.00,90.00,6.00,156.78,0",
						"693,14.00,83.00,93.00,25.00,22.00,91.00,37.00,10.00,71.00,58.00,39.00,30.00,45.00,62.00,155.66,0",
						"694,22.00,2.00,83.00,55.00,42.00,94.00,44.00,76.00,9.00,4.00,28.00,50.00,25.00,83.00,148.97,0",
						"695,57.00,44.00,48.00,46.00,3.00,66.00,65.00,92.00,52.00,13.00,34.00,89.00,34.00,53.00,141.17,0",
						"696,15.00,3.00,46.00,51.00,39.00,84.00,26.00,11.00,88.00,77.00,7.00,85.00,73.00,48.00,150.64,0",
						"697,85.00,63.00,19.00,94.00,85.00,91.00,28.00,27.00,20.00,35.00,76.00,67.00,82.00,7.00,158.40,0",
						"698,91.00,87.00,38.00,54.00,9.00,74.00,78.00,50.00,64.00,58.00,79.00,58.00,3.00,42.00,141.58,0",
						"699,90.00,54.00,24.00,61.00,25.00,70.00,72.00,64.00,17.00,74.00,68.00,38.00,66.00,26.00,121.39,0",
						"700,68.00,23.00,86.00,46.00,28.00,60.00,92.00,15.00,63.00,81.00,71.00,86.00,75.00,15.00,155.83,0",
						"701,83.00,81.00,92.00,69.00,83.00,28.00,9.00,78.00,25.00,69.00,16.00,58.00,89.00,81.00,163.70,0",
						"702,79.00,39.00,29.00,91.00,91.00,19.00,78.00,22.00,74.00,63.00,95.00,54.00,54.00,62.00,136.32,0",
						"703,39.00,60.00,64.00,68.00,37.00,21.00,35.00,86.00,56.00,77.00,88.00,37.00,49.00,93.00,144.93,0",
						"704,87.00,11.00,57.00,91.00,18.00,73.00,28.00,53.00,90.00,94.00,4.00,26.00,16.00,69.00,124.64,0",
						"705,68.00,97.00,25.00,60.00,56.00,47.00,61.00,73.00,10.00,20.00,11.00,41.00,11.00,29.00,164.65,0",
						"706,70.00,7.00,16.00,10.00,97.00,83.00,1.00,36.00,31.00,41.00,75.00,18.00,93.00,74.00,155.54,0",
						"707,10.00,46.00,94.00,42.00,66.00,90.00,26.00,83.00,79.00,35.00,24.00,33.00,53.00,67.00,153.01,0",
						"708,65.00,99.00,38.00,3.00,49.00,19.00,54.00,81.00,17.00,50.00,65.00,96.00,60.00,23.00,179.44,0",
						"709,27.00,36.00,12.00,70.00,18.00,2.00,44.00,85.00,82.00,66.00,35.00,47.00,89.00,25.00,128.56,0",
						"710,96.00,45.00,7.00,26.00,53.00,7.00,19.00,31.00,68.00,7.00,64.00,16.00,72.00,48.00,157.63,0",
						"711,77.00,92.00,97.00,22.00,56.00,77.00,62.00,54.00,91.00,87.00,11.00,75.00,19.00,41.00,148.95,0",
						"712,77.00,28.00,44.00,77.00,26.00,9.00,91.00,77.00,95.00,84.00,80.00,50.00,0.00,12.00,172.10,0",
						"713,66.00,36.00,30.00,22.00,77.00,72.00,56.00,67.00,61.00,11.00,45.00,43.00,72.00,45.00,127.62,0",
						"714,78.00,7.00,30.00,95.00,48.00,15.00,54.00,25.00,88.00,28.00,98.00,75.00,23.00,40.00,141.47,0",
						"715,20.00,47.00,15.00,1.00,63.00,76.00,59.00,70.00,97.00,19.00,59.00,62.00,6.00,99.00,158.39,0",
						"716,83.00,67.00,91.00,7.00,17.00,27.00,62.00,51.00,12.00,3.00,14.00,83.00,0.00,47.00,150.17,0",
						"717,63.00,86.00,44.00,38.00,66.00,19.00,31.00,43.00,44.00,94.00,82.00,6.00,45.00,89.00,161.61,0",
						"718,13.00,6.00,36.00,33.00,29.00,84.00,99.00,17.00,97.00,24.00,52.00,95.00,16.00,76.00,192.36,0",
						"719,99.00,59.00,70.00,98.00,47.00,40.00,20.00,67.00,96.00,89.00,23.00,6.00,84.00,93.00,178.15,0",
						"720,1.00,61.00,37.00,3.00,22.00,44.00,15.00,41.00,90.00,17.00,35.00,68.00,57.00,13.00,146.71,0",
						"721,63.00,10.00,73.00,78.00,31.00,24.00,60.00,56.00,45.00,95.00,49.00,45.00,73.00,45.00,153.96,0",
						"722,88.00,97.00,91.00,12.00,50.00,87.00,37.00,48.00,39.00,68.00,18.00,95.00,91.00,82.00,165.88,0",
						"723,1.00,11.00,57.00,24.00,40.00,83.00,67.00,29.00,1.00,30.00,44.00,98.00,94.00,41.00,168.94,0",
						"724,35.00,90.00,21.00,72.00,64.00,41.00,67.00,13.00,45.00,77.00,33.00,72.00,35.00,93.00,157.16,0",
						"725,22.00,31.00,89.00,43.00,24.00,50.00,81.00,90.00,75.00,80.00,22.00,73.00,12.00,2.00,150.43,0",
						"726,1.00,64.00,26.00,43.00,28.00,8.00,88.00,53.00,42.00,94.00,93.00,70.00,60.00,65.00,162.50,0",
						"727,42.00,8.00,26.00,60.00,6.00,21.00,58.00,8.00,4.00,94.00,66.00,26.00,79.00,7.00,160.04,0",
						"728,45.00,75.00,42.00,47.00,19.00,85.00,52.00,46.00,86.00,1.00,73.00,32.00,50.00,91.00,152.21,0",
						"729,40.00,8.00,57.00,4.00,30.00,7.00,61.00,45.00,51.00,48.00,22.00,6.00,45.00,38.00,168.76,0",
						"730,39.00,22.00,20.00,21.00,89.00,45.00,2.00,57.00,91.00,98.00,52.00,96.00,14.00,72.00,155.11,0",
						"731,82.00,34.00,73.00,89.00,98.00,48.00,2.00,27.00,78.00,98.00,71.00,39.00,56.00,10.00,155.04,0",
						"732,83.00,91.00,59.00,75.00,72.00,19.00,80.00,70.00,75.00,73.00,24.00,37.00,0.00,91.00,154.30,0",
						"733,56.00,38.00,36.00,94.00,82.00,99.00,30.00,36.00,83.00,84.00,57.00,25.00,6.00,88.00,147.69,0",
						"734,24.00,59.00,94.00,97.00,7.00,45.00,22.00,60.00,62.00,96.00,96.00,34.00,92.00,30.00,164.18,0",
						"735,63.00,6.00,14.00,75.00,97.00,88.00,28.00,77.00,57.00,69.00,13.00,39.00,76.00,49.00,161.93,0",
						"736,42.00,54.00,87.00,78.00,36.00,49.00,33.00,63.00,91.00,99.00,2.00,25.00,8.00,59.00,126.57,0",
						"737,50.00,85.00,67.00,28.00,5.00,37.00,26.00,47.00,45.00,49.00,97.00,82.00,59.00,91.00,154.33,0",
						"738,22.00,55.00,16.00,83.00,59.00,86.00,71.00,31.00,8.00,32.00,8.00,14.00,79.00,97.00,155.38,0",
						"739,59.00,43.00,74.00,61.00,34.00,3.00,98.00,11.00,97.00,9.00,26.00,10.00,40.00,39.00,152.05,0",
						"740,48.00,18.00,44.00,86.00,58.00,79.00,36.00,1.00,98.00,10.00,12.00,23.00,47.00,57.00,158.11,0",
						"741,3.00,47.00,38.00,43.00,49.00,22.00,0.00,93.00,55.00,28.00,59.00,88.00,83.00,75.00,131.04,0",
						"742,45.00,14.00,49.00,45.00,33.00,52.00,68.00,60.00,56.00,69.00,4.00,65.00,92.00,36.00,131.60,0",
						"743,96.00,3.00,77.00,71.00,31.00,10.00,10.00,74.00,56.00,28.00,3.00,16.00,78.00,84.00,146.82,0",
						"744,72.00,1.00,67.00,98.00,72.00,28.00,1.00,30.00,8.00,52.00,67.00,5.00,40.00,99.00,148.18,0",
						"745,59.00,6.00,29.00,62.00,13.00,62.00,26.00,67.00,67.00,43.00,65.00,32.00,36.00,31.00,121.91,0",
						"746,54.00,34.00,2.00,66.00,5.00,44.00,25.00,38.00,36.00,87.00,19.00,36.00,33.00,98.00,138.32,0",
						"747,94.00,67.00,71.00,13.00,53.00,95.00,9.00,23.00,41.00,92.00,7.00,33.00,53.00,58.00,158.25,0",
						"748,24.00,55.00,77.00,59.00,21.00,30.00,72.00,0.00,76.00,12.00,89.00,56.00,70.00,41.00,144.84,0",
						"749,44.00,77.00,35.00,50.00,83.00,77.00,52.00,52.00,75.00,14.00,39.00,62.00,26.00,30.00,133.99,0",
						"750,71.00,89.00,30.00,43.00,39.00,58.00,15.00,91.00,28.00,45.00,83.00,88.00,35.00,1.00,159.57,0",
						"751,7.00,39.00,94.00,51.00,99.00,86.00,43.00,57.00,79.00,96.00,79.00,24.00,45.00,85.00,170.53,0",
						"752,88.00,98.00,18.00,0.00,14.00,74.00,4.00,10.00,89.00,45.00,2.00,15.00,76.00,55.00,188.54,0",
						"753,12.00,63.00,71.00,75.00,87.00,79.00,58.00,0.00,97.00,43.00,77.00,25.00,6.00,98.00,162.56,0",
						"754,4.00,65.00,86.00,45.00,96.00,36.00,99.00,88.00,49.00,17.00,47.00,10.00,40.00,64.00,167.08,0",
						"755,91.00,68.00,40.00,99.00,39.00,53.00,68.00,10.00,85.00,97.00,32.00,6.00,46.00,8.00,170.94,0",
						"756,61.00,16.00,68.00,55.00,52.00,74.00,67.00,70.00,51.00,45.00,31.00,29.00,23.00,13.00,149.68,0",
						"757,6.00,49.00,62.00,36.00,12.00,25.00,8.00,63.00,6.00,55.00,54.00,91.00,45.00,81.00,157.98,0",
						"758,43.00,90.00,77.00,93.00,14.00,53.00,22.00,26.00,26.00,8.00,15.00,0.00,5.00,34.00,170.09,0",
						"759,32.00,0.00,16.00,27.00,78.00,13.00,64.00,63.00,34.00,99.00,25.00,44.00,16.00,95.00,163.18,0",
						"760,48.00,69.00,52.00,77.00,99.00,51.00,54.00,86.00,86.00,64.00,66.00,19.00,42.00,82.00,131.95,0",
						"761,10.00,71.00,9.00,14.00,77.00,95.00,25.00,63.00,78.00,99.00,97.00,43.00,9.00,25.00,145.87,0",
						"762,6.00,89.00,55.00,9.00,39.00,55.00,48.00,24.00,29.00,47.00,74.00,63.00,71.00,85.00,153.59,0",
						"763,1.00,11.00,37.00,89.00,2.00,47.00,0.00,49.00,29.00,18.00,80.00,41.00,15.00,60.00,168.02,0",
						"764,99.00,35.00,90.00,95.00,59.00,20.00,63.00,47.00,31.00,11.00,26.00,7.00,96.00,31.00,170.62,0",
						"765,13.00,92.00,5.00,41.00,64.00,57.00,58.00,81.00,85.00,40.00,46.00,11.00,50.00,59.00,156.28,0",
						"766,3.00,12.00,20.00,94.00,76.00,43.00,39.00,50.00,41.00,97.00,37.00,72.00,4.00,57.00,137.89,0",
						"767,14.00,4.00,40.00,90.00,62.00,0.00,86.00,38.00,25.00,97.00,81.00,50.00,23.00,50.00,140.13,0",
						"768,47.00,44.00,71.00,97.00,90.00,81.00,42.00,54.00,37.00,3.00,22.00,49.00,50.00,61.00,138.52,0",
						"769,17.00,84.00,50.00,47.00,49.00,43.00,73.00,49.00,57.00,53.00,12.00,98.00,70.00,44.00,130.52,0",
						"770,54.00,95.00,81.00,48.00,86.00,68.00,20.00,49.00,35.00,31.00,36.00,4.00,86.00,31.00,139.75,0",
						"771,33.00,69.00,16.00,44.00,58.00,62.00,12.00,66.00,45.00,2.00,72.00,68.00,59.00,65.00,148.96,0",
						"772,57.00,32.00,29.00,85.00,26.00,25.00,74.00,52.00,56.00,96.00,41.00,5.00,36.00,11.00,142.33,0",
						"773,3.00,47.00,82.00,27.00,42.00,61.00,31.00,50.00,57.00,56.00,71.00,27.00,39.00,92.00,126.85,0",
						"774,72.00,94.00,48.00,25.00,7.00,76.00,7.00,61.00,36.00,39.00,15.00,68.00,65.00,54.00,145.04,0",
						"775,70.00,17.00,84.00,33.00,98.00,89.00,70.00,88.00,47.00,93.00,13.00,18.00,21.00,52.00,161.13,0",
						"776,75.00,1.00,44.00,98.00,45.00,48.00,55.00,86.00,38.00,2.00,5.00,39.00,60.00,18.00,156.89,0",
						"777,7.00,65.00,69.00,96.00,66.00,55.00,0.00,88.00,86.00,81.00,51.00,93.00,34.00,18.00,147.43,0",
						"778,24.00,65.00,83.00,99.00,92.00,44.00,14.00,22.00,44.00,18.00,41.00,38.00,4.00,98.00,147.39,0",
						"779,78.00,48.00,14.00,70.00,75.00,28.00,8.00,25.00,87.00,42.00,26.00,97.00,51.00,54.00,152.80,0",
						"780,90.00,14.00,93.00,95.00,11.00,35.00,42.00,5.00,97.00,8.00,87.00,96.00,24.00,52.00,158.61,0",
						"781,53.00,34.00,7.00,73.00,13.00,82.00,83.00,42.00,31.00,75.00,85.00,17.00,24.00,87.00,157.12,0",
						"782,40.00,56.00,8.00,18.00,30.00,27.00,50.00,57.00,63.00,31.00,43.00,22.00,63.00,93.00,142.30,0",
						"783,73.00,11.00,77.00,33.00,96.00,2.00,48.00,70.00,76.00,8.00,94.00,3.00,30.00,63.00,156.90,0",
						"784,29.00,5.00,81.00,56.00,70.00,16.00,81.00,15.00,2.00,56.00,91.00,83.00,74.00,38.00,176.95,0",
						"785,97.00,34.00,79.00,43.00,70.00,59.00,51.00,69.00,21.00,9.00,39.00,32.00,17.00,87.00,151.98,0",
						"786,16.00,17.00,36.00,12.00,28.00,91.00,14.00,37.00,66.00,22.00,80.00,39.00,69.00,77.00,151.33,0",
						"787,18.00,61.00,34.00,39.00,77.00,21.00,18.00,31.00,40.00,60.00,27.00,82.00,81.00,69.00,134.62,0",
						"788,4.00,93.00,78.00,98.00,63.00,0.00,47.00,58.00,50.00,1.00,7.00,85.00,98.00,34.00,150.58,0",
						"789,18.00,88.00,80.00,87.00,82.00,52.00,83.00,36.00,18.00,63.00,15.00,23.00,1.00,16.00,158.97,0",
						"790,84.00,58.00,7.00,41.00,46.00,36.00,22.00,38.00,65.00,27.00,24.00,32.00,50.00,45.00,133.39,0",
						"791,77.00,36.00,89.00,91.00,61.00,63.00,15.00,33.00,59.00,47.00,19.00,67.00,77.00,88.00,131.13,0",
						"792,68.00,13.00,79.00,92.00,22.00,49.00,44.00,20.00,94.00,90.00,41.00,9.00,81.00,54.00,147.51,0",
						"793,33.00,64.00,54.00,29.00,46.00,82.00,27.00,74.00,17.00,80.00,77.00,98.00,48.00,83.00,140.87,0",
						"794,96.00,24.00,62.00,3.00,86.00,96.00,24.00,74.00,66.00,93.00,16.00,44.00,76.00,65.00,146.45,0",
						"795,74.00,46.00,20.00,3.00,34.00,60.00,68.00,68.00,47.00,57.00,33.00,59.00,65.00,75.00,131.18,0",
						"796,16.00,40.00,67.00,43.00,9.00,76.00,55.00,18.00,1.00,40.00,3.00,73.00,30.00,60.00,164.23,0",
						"797,94.00,3.00,12.00,47.00,55.00,22.00,9.00,52.00,86.00,18.00,80.00,51.00,8.00,2.00,162.75,0",
						"798,74.00,57.00,82.00,96.00,82.00,51.00,59.00,63.00,71.00,31.00,27.00,99.00,37.00,2.00,148.02,0",
						"799,87.00,34.00,76.00,90.00,46.00,94.00,85.00,34.00,79.00,40.00,28.00,1.00,14.00,48.00,147.66,0",
						"800,44.00,64.00,53.00,39.00,58.00,13.00,19.00,58.00,88.00,57.00,56.00,88.00,80.00,5.00,130.76,0",
						"801,72.00,28.00,14.00,60.00,70.00,44.00,72.00,60.00,49.00,82.00,89.00,64.00,26.00,21.00,127.63,0",
						"802,29.00,40.00,97.00,88.00,22.00,9.00,95.00,15.00,74.00,35.00,85.00,11.00,85.00,99.00,162.23,0",
						"803,10.00,65.00,82.00,85.00,99.00,75.00,19.00,24.00,87.00,47.00,33.00,26.00,55.00,21.00,163.91,0",
						"804,50.00,44.00,32.00,56.00,29.00,15.00,32.00,88.00,0.00,84.00,84.00,55.00,41.00,14.00,132.79,0",
						"805,47.00,53.00,51.00,66.00,65.00,51.00,25.00,52.00,39.00,41.00,77.00,41.00,14.00,20.00,118.16,0",
						"806,74.00,48.00,47.00,16.00,73.00,23.00,49.00,21.00,86.00,98.00,74.00,65.00,83.00,99.00,172.19,0",
						"807,65.00,94.00,79.00,3.00,6.00,58.00,80.00,65.00,1.00,45.00,31.00,81.00,0.00,6.00,181.25,0",
						"808,20.00,83.00,15.00,95.00,66.00,41.00,1.00,39.00,17.00,63.00,57.00,49.00,47.00,70.00,138.86,0",
						"809,48.00,99.00,26.00,69.00,71.00,17.00,24.00,17.00,69.00,16.00,61.00,84.00,74.00,44.00,138.02,0",
						"810,6.00,25.00,15.00,90.00,47.00,42.00,65.00,34.00,10.00,26.00,63.00,25.00,84.00,53.00,143.19,0",
						"811,12.00,59.00,85.00,47.00,82.00,30.00,96.00,82.00,80.00,14.00,65.00,6.00,81.00,12.00,162.73,0",
						"812,94.00,87.00,92.00,34.00,85.00,60.00,4.00,93.00,24.00,46.00,30.00,15.00,40.00,31.00,151.32,0",
						"813,46.00,28.00,52.00,34.00,54.00,12.00,2.00,61.00,15.00,66.00,8.00,51.00,77.00,12.00,154.42,0",
						"814,29.00,28.00,54.00,95.00,75.00,38.00,95.00,70.00,16.00,13.00,90.00,71.00,45.00,27.00,144.90,0",
						"815,17.00,26.00,11.00,99.00,44.00,51.00,62.00,37.00,99.00,47.00,65.00,95.00,87.00,26.00,164.53,0",
						"816,59.00,78.00,47.00,60.00,40.00,67.00,11.00,7.00,7.00,61.00,7.00,25.00,52.00,65.00,149.25,0",
						"817,54.00,55.00,7.00,66.00,78.00,82.00,67.00,19.00,25.00,45.00,50.00,10.00,79.00,12.00,150.65,0",
						"818,26.00,86.00,79.00,0.00,69.00,21.00,4.00,93.00,74.00,96.00,80.00,21.00,3.00,89.00,185.00,0",
						"819,48.00,14.00,4.00,64.00,55.00,11.00,10.00,50.00,1.00,99.00,49.00,74.00,13.00,88.00,139.23,0",
						"820,39.00,49.00,74.00,80.00,18.00,2.00,15.00,98.00,34.00,59.00,82.00,0.00,80.00,23.00,175.71,0",
						"821,90.00,96.00,75.00,33.00,78.00,86.00,64.00,41.00,10.00,29.00,29.00,99.00,82.00,26.00,156.92,0",
						"822,40.00,41.00,14.00,10.00,15.00,66.00,56.00,86.00,8.00,46.00,42.00,58.00,25.00,8.00,155.89,0",
						"823,11.00,75.00,61.00,96.00,25.00,62.00,7.00,1.00,85.00,55.00,53.00,66.00,98.00,11.00,155.63,0",
						"824,94.00,89.00,45.00,98.00,72.00,8.00,7.00,16.00,24.00,22.00,1.00,71.00,76.00,19.00,176.72,0",
						"825,28.00,94.00,55.00,4.00,29.00,69.00,13.00,82.00,88.00,50.00,70.00,45.00,53.00,16.00,147.39,0",
						"826,13.00,60.00,96.00,39.00,3.00,72.00,46.00,0.00,22.00,79.00,82.00,6.00,99.00,67.00,177.82,0",
						"827,78.00,94.00,70.00,52.00,46.00,15.00,92.00,63.00,42.00,63.00,73.00,58.00,8.00,36.00,140.24,0",
						"828,26.00,81.00,3.00,94.00,90.00,58.00,68.00,38.00,88.00,72.00,21.00,27.00,0.00,97.00,166.07,0",
						"829,71.00,80.00,0.00,31.00,1.00,39.00,27.00,79.00,12.00,22.00,96.00,78.00,0.00,68.00,162.04,0",
						"830,28.00,27.00,8.00,35.00,65.00,13.00,81.00,92.00,12.00,10.00,17.00,72.00,19.00,86.00,157.36,0",
						"831,19.00,91.00,8.00,67.00,27.00,98.00,98.00,57.00,7.00,47.00,46.00,5.00,17.00,69.00,152.91,0",
						"832,26.00,23.00,66.00,21.00,30.00,2.00,85.00,24.00,84.00,22.00,68.00,39.00,93.00,44.00,157.11,0",
						"833,91.00,33.00,51.00,68.00,70.00,53.00,50.00,44.00,81.00,76.00,70.00,77.00,4.00,53.00,131.73,0",
						"834,15.00,1.00,66.00,77.00,8.00,64.00,79.00,25.00,36.00,51.00,86.00,36.00,54.00,2.00,157.65,0",
						"835,88.00,90.00,55.00,78.00,23.00,69.00,75.00,48.00,15.00,88.00,44.00,9.00,14.00,90.00,152.37,0",
						"836,24.00,39.00,41.00,86.00,87.00,85.00,58.00,37.00,52.00,68.00,37.00,20.00,72.00,66.00,136.64,0",
						"837,84.00,37.00,17.00,71.00,22.00,53.00,9.00,18.00,97.00,40.00,48.00,1.00,34.00,65.00,129.41,0",
						"838,40.00,74.00,90.00,56.00,96.00,36.00,32.00,65.00,20.00,6.00,18.00,31.00,71.00,11.00,159.09,0",
						"839,19.00,63.00,56.00,94.00,74.00,60.00,79.00,20.00,36.00,61.00,56.00,72.00,64.00,78.00,128.15,0",
						"840,34.00,51.00,64.00,75.00,57.00,63.00,24.00,73.00,26.00,10.00,87.00,31.00,56.00,91.00,122.03,0",
						"841,73.00,34.00,72.00,53.00,9.00,85.00,32.00,51.00,17.00,85.00,89.00,45.00,24.00,69.00,133.09,0",
						"842,51.00,54.00,24.00,26.00,16.00,63.00,55.00,30.00,52.00,31.00,88.00,99.00,9.00,31.00,121.70,0",
						"843,20.00,14.00,59.00,53.00,44.00,85.00,89.00,42.00,27.00,43.00,98.00,87.00,28.00,84.00,134.41,0",
						"844,55.00,66.00,84.00,34.00,86.00,38.00,26.00,70.00,79.00,27.00,56.00,87.00,51.00,66.00,150.67,0",
						"845,72.00,72.00,22.00,98.00,60.00,85.00,64.00,64.00,3.00,94.00,80.00,51.00,60.00,20.00,162.07,0",
						"846,84.00,76.00,88.00,69.00,92.00,24.00,86.00,7.00,37.00,12.00,70.00,96.00,72.00,93.00,165.79,0",
						"847,20.00,97.00,12.00,10.00,73.00,37.00,73.00,51.00,20.00,85.00,18.00,32.00,65.00,19.00,173.87,0",
						"848,74.00,79.00,94.00,52.00,73.00,75.00,48.00,96.00,22.00,13.00,60.00,8.00,29.00,89.00,165.61,0",
						"849,59.00,14.00,0.00,15.00,53.00,9.00,59.00,13.00,85.00,50.00,70.00,26.00,30.00,9.00,151.13,0",
						"850,84.00,4.00,50.00,22.00,39.00,49.00,96.00,24.00,14.00,3.00,89.00,36.00,47.00,47.00,161.27,0",
						"851,36.00,18.00,60.00,53.00,6.00,38.00,2.00,31.00,0.00,66.00,18.00,84.00,36.00,48.00,153.34,0",
						"852,32.00,99.00,12.00,50.00,35.00,61.00,71.00,85.00,79.00,19.00,50.00,71.00,5.00,85.00,164.69,0",
						"853,99.00,43.00,12.00,69.00,48.00,84.00,53.00,12.00,38.00,73.00,17.00,32.00,74.00,16.00,153.95,0",
						"854,15.00,98.00,93.00,41.00,61.00,35.00,93.00,54.00,69.00,6.00,43.00,41.00,73.00,77.00,160.95,0",
						"855,96.00,50.00,80.00,61.00,77.00,83.00,20.00,23.00,78.00,27.00,5.00,9.00,72.00,95.00,164.33,0",
						"856,0.00,19.00,69.00,16.00,53.00,60.00,1.00,66.00,87.00,33.00,72.00,40.00,17.00,68.00,167.35,0",
						"857,59.00,78.00,86.00,49.00,66.00,40.00,63.00,70.00,31.00,18.00,65.00,33.00,92.00,34.00,138.10,0",
						"858,82.00,65.00,59.00,52.00,84.00,58.00,23.00,53.00,93.00,18.00,23.00,26.00,7.00,12.00,164.75,0",
						"859,39.00,61.00,43.00,19.00,7.00,20.00,66.00,16.00,32.00,42.00,56.00,53.00,42.00,50.00,128.80,0",
						"860,61.00,4.00,40.00,53.00,39.00,84.00,64.00,64.00,73.00,62.00,54.00,12.00,85.00,87.00,144.79,0",
						"861,96.00,35.00,20.00,90.00,61.00,12.00,80.00,58.00,38.00,43.00,73.00,31.00,86.00,2.00,163.93,0",
						"862,93.00,10.00,66.00,24.00,13.00,98.00,9.00,97.00,0.00,53.00,42.00,15.00,54.00,88.00,171.39,0",
						"863,52.00,40.00,87.00,40.00,76.00,40.00,72.00,34.00,53.00,10.00,31.00,46.00,81.00,98.00,165.61,0",
						"864,82.00,17.00,0.00,59.00,21.00,96.00,10.00,36.00,77.00,69.00,43.00,73.00,10.00,97.00,171.16,0",
						"865,38.00,76.00,17.00,79.00,96.00,89.00,3.00,25.00,14.00,4.00,93.00,61.00,13.00,54.00,136.89,0",
						"866,56.00,67.00,15.00,91.00,82.00,50.00,6.00,42.00,84.00,20.00,47.00,90.00,36.00,60.00,143.60,0",
						"867,9.00,86.00,95.00,67.00,88.00,65.00,8.00,51.00,17.00,80.00,31.00,25.00,42.00,77.00,158.03,0",
						"868,84.00,33.00,16.00,96.00,36.00,80.00,69.00,89.00,89.00,22.00,13.00,53.00,27.00,66.00,153.52,0",
						"869,48.00,78.00,4.00,83.00,33.00,15.00,5.00,4.00,87.00,61.00,88.00,24.00,9.00,52.00,140.81,0",
						"870,97.00,85.00,93.00,57.00,9.00,20.00,6.00,21.00,5.00,10.00,50.00,15.00,7.00,25.00,158.73,0",
						"871,31.00,52.00,33.00,33.00,54.00,56.00,67.00,6.00,34.00,56.00,40.00,72.00,59.00,31.00,132.31,0",
						"872,76.00,27.00,11.00,42.00,56.00,33.00,2.00,13.00,87.00,12.00,18.00,20.00,89.00,29.00,152.95,0",
						"873,39.00,14.00,4.00,59.00,49.00,62.00,14.00,98.00,24.00,84.00,66.00,45.00,24.00,2.00,140.93,0",
						"874,31.00,23.00,13.00,24.00,50.00,10.00,82.00,29.00,16.00,24.00,26.00,73.00,27.00,39.00,133.62,0",
						"875,22.00,9.00,36.00,56.00,11.00,35.00,83.00,77.00,71.00,51.00,11.00,85.00,19.00,61.00,131.97,0",
						"876,64.00,9.00,11.00,32.00,2.00,24.00,69.00,24.00,8.00,87.00,40.00,90.00,82.00,11.00,171.33,0",
						"877,25.00,98.00,26.00,28.00,37.00,21.00,4.00,24.00,39.00,52.00,33.00,2.00,78.00,12.00,153.34,0",
						"878,99.00,13.00,50.00,41.00,55.00,20.00,11.00,75.00,37.00,72.00,86.00,24.00,31.00,68.00,160.45,0",
						"879,4.00,88.00,73.00,57.00,10.00,98.00,49.00,4.00,99.00,36.00,59.00,53.00,50.00,46.00,184.00,0",
						"880,54.00,21.00,84.00,76.00,14.00,11.00,74.00,70.00,53.00,72.00,16.00,6.00,8.00,30.00,152.63,0",
						"881,72.00,2.00,19.00,95.00,46.00,39.00,9.00,72.00,26.00,97.00,31.00,41.00,32.00,45.00,147.84,0",
						"882,60.00,82.00,81.00,41.00,10.00,17.00,38.00,79.00,72.00,46.00,62.00,26.00,23.00,72.00,162.50,0",
						"883,78.00,2.00,84.00,27.00,84.00,71.00,92.00,39.00,34.00,20.00,79.00,29.00,20.00,5.00,178.95,0",
						"884,58.00,20.00,4.00,64.00,24.00,24.00,35.00,77.00,37.00,3.00,45.00,66.00,66.00,72.00,152.34,0",
						"885,91.00,67.00,13.00,56.00,41.00,33.00,88.00,47.00,98.00,42.00,21.00,21.00,4.00,22.00,141.04,0",
						"886,69.00,63.00,57.00,5.00,68.00,66.00,39.00,9.00,62.00,71.00,29.00,94.00,50.00,68.00,140.55,0",
						"887,23.00,77.00,7.00,46.00,85.00,30.00,91.00,60.00,37.00,22.00,89.00,81.00,81.00,89.00,164.34,0",
						"888,7.00,3.00,71.00,85.00,70.00,52.00,88.00,17.00,83.00,82.00,13.00,77.00,46.00,70.00,165.16,0",
						"889,51.00,67.00,10.00,21.00,9.00,38.00,35.00,67.00,3.00,59.00,4.00,5.00,38.00,14.00,159.31,0",
						"890,41.00,14.00,2.00,95.00,10.00,15.00,49.00,6.00,55.00,25.00,86.00,72.00,56.00,48.00,156.37,0",
						"891,50.00,44.00,12.00,6.00,0.00,42.00,5.00,80.00,92.00,39.00,34.00,77.00,45.00,54.00,148.35,0",
						"892,53.00,61.00,68.00,48.00,2.00,74.00,12.00,35.00,6.00,47.00,81.00,25.00,74.00,2.00,151.91,0",
						"893,6.00,79.00,14.00,48.00,70.00,21.00,24.00,94.00,52.00,10.00,10.00,31.00,58.00,52.00,155.29,0",
						"894,61.00,81.00,64.00,11.00,74.00,34.00,19.00,13.00,67.00,21.00,76.00,19.00,63.00,93.00,148.93,0",
						"895,31.00,40.00,37.00,18.00,5.00,31.00,42.00,46.00,26.00,76.00,91.00,96.00,88.00,6.00,172.76,0",
						"896,7.00,17.00,85.00,84.00,23.00,39.00,8.00,50.00,23.00,79.00,79.00,67.00,53.00,38.00,175.47,0",
						"897,29.00,33.00,32.00,80.00,99.00,65.00,99.00,26.00,34.00,2.00,37.00,19.00,32.00,97.00,148.89,0",
						"898,36.00,77.00,0.00,39.00,38.00,54.00,36.00,39.00,40.00,78.00,52.00,10.00,52.00,96.00,143.01,0",
						"899,64.00,49.00,19.00,73.00,32.00,63.00,6.00,93.00,46.00,48.00,77.00,73.00,42.00,5.00,132.05,0",
						"900,36.00,73.00,49.00,49.00,12.00,52.00,35.00,82.00,92.00,26.00,54.00,62.00,81.00,7.00,134.60,0",
						"901,60.00,93.00,12.00,85.00,18.00,80.00,37.00,36.00,1.00,71.00,5.00,18.00,30.00,20.00,157.08,0",
						"902,41.00,72.00,12.00,24.00,78.00,66.00,5.00,48.00,90.00,19.00,34.00,5.00,81.00,54.00,167.13,0",
						"903,73.00,16.00,93.00,21.00,10.00,25.00,48.00,91.00,6.00,19.00,91.00,81.00,79.00,34.00,165.95,0",
						"904,28.00,76.00,12.00,93.00,18.00,39.00,41.00,11.00,22.00,65.00,69.00,41.00,18.00,19.00,148.79,0",
						"905,76.00,77.00,24.00,40.00,3.00,10.00,64.00,65.00,23.00,60.00,88.00,28.00,18.00,23.00,129.81,0",
						"906,82.00,96.00,90.00,60.00,13.00,72.00,24.00,64.00,36.00,70.00,57.00,62.00,59.00,62.00,151.97,0",
						"907,11.00,4.00,80.00,3.00,74.00,94.00,99.00,6.00,50.00,27.00,67.00,99.00,54.00,8.00,168.08,0",
						"908,59.00,46.00,51.00,43.00,53.00,99.00,87.00,93.00,34.00,17.00,98.00,12.00,12.00,96.00,177.25,0",
						"909,47.00,93.00,54.00,33.00,72.00,42.00,8.00,9.00,47.00,24.00,84.00,87.00,49.00,71.00,151.46,0",
						"910,44.00,70.00,20.00,54.00,47.00,24.00,22.00,75.00,76.00,72.00,78.00,9.00,96.00,59.00,149.77,0",
						"911,10.00,10.00,93.00,25.00,99.00,11.00,75.00,87.00,9.00,6.00,83.00,54.00,32.00,58.00,186.39,0",
						"912,20.00,15.00,44.00,27.00,21.00,59.00,8.00,59.00,94.00,5.00,49.00,60.00,15.00,95.00,169.36,0",
						"913,86.00,99.00,75.00,30.00,1.00,89.00,47.00,47.00,66.00,90.00,53.00,18.00,8.00,8.00,166.88,0",
						"914,20.00,45.00,44.00,94.00,70.00,78.00,26.00,6.00,54.00,78.00,7.00,25.00,85.00,0.00,164.78,0",
						"915,2.00,69.00,43.00,94.00,11.00,1.00,2.00,18.00,37.00,57.00,34.00,40.00,44.00,69.00,168.48,0",
						"916,66.00,96.00,74.00,73.00,76.00,28.00,84.00,35.00,96.00,57.00,9.00,69.00,17.00,63.00,152.83,0",
						"917,80.00,72.00,64.00,46.00,91.00,63.00,83.00,15.00,10.00,41.00,31.00,28.00,59.00,67.00,144.46,0",
						"918,47.00,45.00,24.00,59.00,32.00,20.00,32.00,64.00,77.00,32.00,55.00,80.00,72.00,90.00,131.98,0",
						"919,28.00,15.00,72.00,9.00,9.00,70.00,46.00,72.00,77.00,65.00,55.00,66.00,67.00,53.00,140.61,0",
						"920,64.00,94.00,84.00,94.00,33.00,77.00,47.00,1.00,16.00,90.00,4.00,54.00,49.00,96.00,154.35,0",
						"921,6.00,82.00,31.00,63.00,15.00,40.00,70.00,44.00,18.00,70.00,17.00,83.00,89.00,11.00,155.65,0",
						"922,56.00,8.00,61.00,99.00,66.00,74.00,14.00,59.00,24.00,61.00,96.00,59.00,54.00,62.00,143.49,0",
						"923,56.00,78.00,95.00,77.00,5.00,86.00,41.00,27.00,46.00,57.00,92.00,54.00,84.00,12.00,155.32,0",
						"924,19.00,42.00,42.00,30.00,85.00,33.00,57.00,61.00,21.00,83.00,31.00,25.00,45.00,1.00,145.72,0",
						"925,35.00,53.00,65.00,60.00,18.00,21.00,24.00,11.00,23.00,30.00,61.00,98.00,85.00,81.00,141.68,0",
						"926,68.00,93.00,71.00,63.00,65.00,9.00,15.00,37.00,98.00,45.00,38.00,93.00,80.00,69.00,133.22,0",
						"927,29.00,20.00,47.00,36.00,94.00,0.00,38.00,17.00,16.00,93.00,3.00,30.00,4.00,43.00,182.74,0",
						"928,85.00,80.00,24.00,93.00,40.00,86.00,42.00,93.00,62.00,8.00,6.00,53.00,79.00,7.00,153.37,0",
						"929,73.00,80.00,64.00,84.00,90.00,41.00,14.00,19.00,22.00,37.00,25.00,35.00,37.00,37.00,137.73,0",
						"930,72.00,13.00,57.00,49.00,51.00,61.00,23.00,56.00,0.00,88.00,57.00,76.00,96.00,27.00,138.82,0",
						"931,53.00,41.00,17.00,8.00,21.00,82.00,1.00,33.00,88.00,91.00,78.00,74.00,74.00,55.00,133.32,0",
						"932,94.00,72.00,0.00,23.00,23.00,24.00,18.00,16.00,12.00,6.00,70.00,50.00,14.00,16.00,164.22,0",
						"933,9.00,25.00,81.00,46.00,10.00,37.00,3.00,8.00,75.00,11.00,3.00,22.00,53.00,31.00,167.07,0",
						"934,24.00,48.00,0.00,9.00,65.00,47.00,63.00,31.00,9.00,73.00,74.00,12.00,52.00,93.00,155.34,0",
						"935,69.00,36.00,92.00,50.00,62.00,21.00,66.00,14.00,52.00,70.00,53.00,66.00,78.00,90.00,151.65,0",
						"936,2.00,1.00,95.00,88.00,11.00,26.00,0.00,31.00,57.00,0.00,37.00,13.00,25.00,46.00,175.12,0",
						"937,93.00,97.00,10.00,68.00,48.00,21.00,25.00,89.00,99.00,50.00,15.00,89.00,90.00,39.00,164.03,0",
						"938,80.00,71.00,99.00,33.00,17.00,29.00,0.00,63.00,99.00,36.00,67.00,40.00,95.00,12.00,128.70,0",
						"939,77.00,42.00,91.00,27.00,92.00,94.00,23.00,46.00,51.00,2.00,69.00,54.00,77.00,49.00,144.59,0",
						"940,39.00,85.00,62.00,33.00,43.00,18.00,70.00,67.00,17.00,46.00,34.00,82.00,33.00,41.00,140.32,0",
						"941,16.00,6.00,91.00,97.00,49.00,5.00,27.00,58.00,55.00,33.00,11.00,47.00,6.00,58.00,150.84,0",
						"942,61.00,21.00,87.00,66.00,96.00,77.00,7.00,99.00,6.00,48.00,30.00,83.00,94.00,32.00,176.12,0",
						"943,63.00,84.00,7.00,46.00,12.00,23.00,45.00,13.00,52.00,67.00,42.00,85.00,1.00,12.00,177.89,0",
						"944,74.00,23.00,21.00,94.00,64.00,57.00,65.00,8.00,56.00,69.00,17.00,13.00,25.00,25.00,159.86,0",
						"945,35.00,95.00,44.00,47.00,46.00,14.00,40.00,95.00,91.00,76.00,97.00,58.00,74.00,31.00,158.30,0",
						"946,19.00,84.00,55.00,1.00,96.00,47.00,97.00,53.00,58.00,3.00,5.00,21.00,20.00,18.00,160.95,0",
						"947,40.00,40.00,29.00,5.00,78.00,61.00,30.00,72.00,19.00,22.00,41.00,3.00,12.00,9.00,146.44,0",
						"948,14.00,58.00,67.00,78.00,67.00,49.00,8.00,2.00,0.00,29.00,76.00,95.00,0.00,34.00,168.32,0",
						"949,37.00,8.00,8.00,62.00,36.00,51.00,37.00,79.00,71.00,78.00,22.00,29.00,25.00,28.00,152.84,0",
						"950,20.00,7.00,67.00,22.00,93.00,64.00,87.00,47.00,96.00,66.00,89.00,60.00,75.00,27.00,144.42,0",
						"951,75.00,48.00,85.00,36.00,53.00,64.00,11.00,15.00,97.00,79.00,77.00,44.00,29.00,22.00,144.35,0",
						"952,26.00,60.00,26.00,11.00,7.00,59.00,81.00,35.00,62.00,88.00,54.00,98.00,44.00,91.00,161.21,0",
						"953,70.00,19.00,93.00,64.00,75.00,62.00,29.00,87.00,86.00,11.00,10.00,68.00,78.00,87.00,165.83,0",
						"954,86.00,75.00,36.00,69.00,15.00,16.00,13.00,39.00,49.00,38.00,34.00,20.00,9.00,79.00,158.35,0",
						"955,92.00,52.00,2.00,58.00,29.00,91.00,82.00,92.00,98.00,98.00,44.00,43.00,51.00,51.00,158.23,0",
						"956,85.00,49.00,77.00,8.00,58.00,13.00,49.00,19.00,8.00,17.00,38.00,17.00,75.00,9.00,148.98,0",
						"957,57.00,57.00,53.00,59.00,29.00,40.00,87.00,57.00,69.00,8.00,69.00,63.00,25.00,18.00,122.49,0",
						"958,39.00,93.00,37.00,17.00,16.00,30.00,81.00,64.00,75.00,34.00,72.00,92.00,27.00,83.00,131.10,0",
						"959,65.00,28.00,43.00,43.00,95.00,98.00,75.00,98.00,77.00,3.00,89.00,24.00,12.00,42.00,175.29,0",
						"960,76.00,49.00,5.00,53.00,73.00,81.00,95.00,33.00,31.00,23.00,15.00,14.00,33.00,77.00,143.58,0",
						"961,0.00,72.00,62.00,63.00,70.00,85.00,92.00,86.00,23.00,26.00,19.00,31.00,68.00,12.00,147.42,0",
						"962,94.00,4.00,70.00,17.00,1.00,23.00,84.00,72.00,18.00,47.00,58.00,31.00,17.00,48.00,155.95,0",
						"963,93.00,52.00,58.00,64.00,14.00,83.00,34.00,47.00,77.00,78.00,34.00,87.00,10.00,55.00,127.73,0",
						"964,45.00,30.00,78.00,47.00,42.00,57.00,92.00,24.00,45.00,71.00,24.00,46.00,26.00,86.00,145.47,0",
						"965,74.00,83.00,95.00,86.00,4.00,50.00,20.00,84.00,81.00,20.00,26.00,77.00,34.00,94.00,149.65,0",
						"966,54.00,93.00,7.00,63.00,21.00,15.00,63.00,81.00,43.00,39.00,26.00,93.00,7.00,47.00,152.77,0",
						"967,19.00,36.00,26.00,87.00,86.00,77.00,17.00,80.00,16.00,16.00,23.00,56.00,90.00,41.00,162.62,0",
						"968,44.00,92.00,25.00,11.00,43.00,26.00,51.00,52.00,70.00,18.00,11.00,25.00,55.00,85.00,154.36,0",
						"969,63.00,94.00,9.00,26.00,39.00,49.00,53.00,5.00,43.00,61.00,55.00,97.00,21.00,27.00,152.19,0",
						"970,97.00,62.00,65.00,76.00,42.00,16.00,34.00,81.00,45.00,87.00,93.00,12.00,29.00,40.00,151.23,0",
						"971,70.00,96.00,9.00,28.00,99.00,28.00,21.00,60.00,30.00,57.00,3.00,54.00,16.00,35.00,140.52,0",
						"972,73.00,96.00,23.00,74.00,84.00,62.00,20.00,98.00,5.00,77.00,69.00,84.00,33.00,0.00,149.95,0",
						"973,70.00,12.00,34.00,99.00,4.00,73.00,82.00,88.00,80.00,24.00,32.00,10.00,22.00,85.00,156.82,0",
						"974,97.00,11.00,77.00,62.00,6.00,10.00,86.00,50.00,47.00,74.00,6.00,11.00,77.00,40.00,154.81,0",
						"975,70.00,17.00,93.00,28.00,86.00,72.00,81.00,33.00,50.00,84.00,36.00,12.00,51.00,24.00,146.52,0",
						"976,54.00,30.00,85.00,20.00,54.00,99.00,39.00,28.00,39.00,36.00,91.00,42.00,90.00,32.00,150.22,0",
						"977,29.00,48.00,26.00,95.00,57.00,8.00,59.00,27.00,63.00,76.00,61.00,49.00,62.00,94.00,140.51,0",
						"978,45.00,9.00,6.00,97.00,98.00,14.00,29.00,67.00,10.00,20.00,74.00,55.00,72.00,31.00,165.19,0",
						"979,0.00,3.00,62.00,24.00,65.00,23.00,7.00,16.00,66.00,7.00,27.00,27.00,56.00,92.00,144.90,0",
						"980,28.00,7.00,73.00,50.00,41.00,94.00,85.00,15.00,38.00,96.00,21.00,5.00,26.00,71.00,169.69,0",
						"981,69.00,41.00,77.00,57.00,26.00,4.00,42.00,48.00,67.00,24.00,22.00,46.00,69.00,69.00,139.38,0",
						"982,39.00,38.00,79.00,76.00,76.00,63.00,20.00,45.00,50.00,52.00,15.00,70.00,4.00,82.00,139.90,0",
						"983,41.00,74.00,68.00,75.00,17.00,72.00,73.00,68.00,26.00,93.00,26.00,94.00,87.00,93.00,155.97,0",
						"984,9.00,69.00,99.00,43.00,1.00,97.00,20.00,75.00,9.00,6.00,49.00,86.00,94.00,67.00,156.79,0",
						"985,61.00,5.00,61.00,23.00,0.00,59.00,82.00,33.00,61.00,33.00,29.00,59.00,22.00,43.00,140.10,0",
						"986,10.00,98.00,56.00,25.00,0.00,81.00,90.00,19.00,92.00,39.00,53.00,75.00,77.00,82.00,148.34,0",
						"987,33.00,78.00,28.00,87.00,59.00,34.00,64.00,91.00,96.00,67.00,56.00,85.00,58.00,44.00,133.93,0",
						"988,49.00,18.00,11.00,13.00,47.00,78.00,94.00,40.00,57.00,46.00,87.00,25.00,41.00,1.00,148.99,0",
						"989,67.00,94.00,34.00,29.00,13.00,56.00,4.00,43.00,15.00,20.00,91.00,59.00,40.00,38.00,134.61,0",
						"990,48.00,43.00,92.00,73.00,57.00,49.00,14.00,36.00,52.00,36.00,90.00,57.00,42.00,96.00,134.02,0",
						"991,19.00,27.00,22.00,59.00,32.00,14.00,82.00,42.00,7.00,0.00,71.00,91.00,40.00,2.00,155.70,0",
						"992,72.00,89.00,12.00,5.00,24.00,46.00,70.00,88.00,5.00,89.00,93.00,23.00,5.00,88.00,142.67,0",
						"993,48.00,46.00,8.00,12.00,64.00,92.00,81.00,36.00,12.00,21.00,74.00,49.00,9.00,35.00,143.72,0",
						"994,80.00,93.00,44.00,70.00,80.00,7.00,96.00,44.00,7.00,86.00,16.00,84.00,36.00,4.00,168.39,0",
						"995,18.00,54.00,91.00,72.00,39.00,77.00,59.00,5.00,79.00,37.00,30.00,10.00,6.00,20.00,155.13,0",
						"996,21.00,78.00,13.00,4.00,51.00,43.00,15.00,46.00,27.00,52.00,80.00,14.00,34.00,41.00,141.63,0",
						"997,79.00,63.00,15.00,64.00,91.00,26.00,17.00,70.00,16.00,35.00,71.00,79.00,33.00,12.00,145.01,0",
						"998,95.00,66.00,47.00,19.00,78.00,61.00,65.00,3.00,85.00,10.00,58.00,67.00,64.00,56.00,161.65,0",
						"999,3.00,91.00,23.00,77.00,26.00,4.00,18.00,8.00,50.00,86.00,99.00,14.00,86.00,24.00,195.85,0",
						"1000,91.00,46.00,52.00,1.00,30.00,91.00,86.00,82.00,8.00,3.00,87.00,81.00,33.00,49.00,183.24,0",
						"1001,85.00,61.00,85.00,99.00,63.00,88.00,96.00,90.00,62.00,70.00,41.00,96.00,94.00,27.00,179.39,0",
						"1002,10.00,21.00,54.00,84.00,1.00,18.00,6.00,54.00,54.00,15.00,20.00,1.00,80.00,74.00,188.12,0",
						"1003,57.00,73.00,67.00,17.00,87.00,76.00,48.00,37.00,3.00,76.00,69.00,82.00,83.00,47.00,153.29,0",
						"1004,55.00,84.00,94.00,16.00,28.00,83.00,11.00,79.00,51.00,43.00,61.00,14.00,92.00,26.00,148.01,0",
						"1005,64.00,88.00,14.00,80.00,26.00,36.00,59.00,50.00,72.00,24.00,94.00,71.00,79.00,87.00,151.62,0",
						"1006,40.00,83.00,56.00,53.00,57.00,93.00,60.00,37.00,99.00,0.00,50.00,5.00,9.00,34.00,161.28,0",
						"1007,3.00,90.00,22.00,82.00,59.00,87.00,94.00,84.00,41.00,5.00,54.00,59.00,97.00,1.00,165.22,0",
						"1008,22.00,23.00,4.00,14.00,59.00,25.00,86.00,97.00,83.00,57.00,51.00,63.00,42.00,79.00,160.19,0",
						"1009,86.00,82.00,89.00,34.00,70.00,8.00,66.00,61.00,80.00,66.00,3.00,74.00,12.00,89.00,146.85,0",
						"1010,98.00,25.00,94.00,83.00,74.00,67.00,64.00,56.00,73.00,98.00,4.00,7.00,45.00,2.00,172.10,0",
						"1011,6.00,49.00,2.00,57.00,32.00,50.00,29.00,34.00,52.00,36.00,12.00,59.00,32.00,48.00,139.06,0",
						"1012,98.00,91.00,10.00,55.00,42.00,32.00,46.00,5.00,28.00,6.00,20.00,90.00,18.00,56.00,158.79,0",
						"1013,90.00,95.00,19.00,19.00,23.00,44.00,34.00,61.00,0.00,96.00,67.00,0.00,56.00,81.00,163.06,0",
						"1014,58.00,2.00,91.00,7.00,39.00,13.00,31.00,43.00,3.00,23.00,10.00,49.00,89.00,56.00,160.28,0",
						"1015,72.00,55.00,35.00,7.00,22.00,9.00,48.00,4.00,65.00,79.00,86.00,17.00,41.00,14.00,161.35,0",
						"1016,49.00,36.00,21.00,91.00,38.00,80.00,36.00,33.00,54.00,98.00,91.00,22.00,79.00,55.00,155.29,0",
						"1017,53.00,33.00,49.00,33.00,20.00,11.00,31.00,17.00,9.00,5.00,73.00,57.00,44.00,82.00,148.38,0",
						"1018,30.00,58.00,75.00,62.00,43.00,84.00,77.00,3.00,43.00,93.00,71.00,23.00,90.00,0.00,148.53,0",
						"1019,73.00,71.00,77.00,44.00,64.00,99.00,40.00,86.00,80.00,47.00,66.00,28.00,54.00,11.00,141.73,0",
						"1020,42.00,30.00,44.00,10.00,3.00,43.00,55.00,10.00,99.00,13.00,83.00,52.00,97.00,98.00,162.66,0",
						"1021,93.00,33.00,65.00,57.00,23.00,62.00,73.00,29.00,34.00,1.00,1.00,97.00,45.00,31.00,148.74,0",
						"1022,33.00,40.00,38.00,70.00,75.00,48.00,33.00,50.00,36.00,62.00,13.00,52.00,79.00,72.00,136.22,0",
						"1023,15.00,74.00,85.00,47.00,2.00,51.00,69.00,4.00,76.00,12.00,60.00,95.00,16.00,48.00,147.11,0"
					]
				},
				"endTime": "2016-05-18T05:01:33.171Z"
			},
			{
				"startTime": "2016-05-18T05:01:33.171Z",
				"mapData": {
					"groupId": 0,
					"NASValues": [
						"0,35.00,71.00,1.00,6.00,74.00,31.00,44.00,40.00,53.00,87.00,11.00,15.00,34.00,86.00,149.06,0",
						"1,57.00,96.00,75.00,24.00,86.00,16.00,15.00,25.00,22.00,27.00,70.00,28.00,94.00,93.00,161.82,0",
						"2,42.00,82.00,51.00,32.00,44.00,31.00,56.00,78.00,74.00,89.00,52.00,9.00,16.00,46.00,147.12,0",
						"3,56.00,30.00,1.00,93.00,23.00,46.00,11.00,67.00,39.00,35.00,31.00,19.00,42.00,90.00,144.61,0",
						"4,15.00,49.00,99.00,50.00,43.00,71.00,42.00,87.00,47.00,82.00,50.00,38.00,32.00,80.00,143.98,0",
						"5,68.00,93.00,86.00,26.00,90.00,25.00,41.00,18.00,0.00,99.00,55.00,15.00,39.00,0.00,167.58,0",
						"6,49.00,37.00,80.00,66.00,11.00,37.00,99.00,17.00,27.00,53.00,0.00,95.00,82.00,8.00,163.44,0",
						"7,12.00,1.00,22.00,81.00,25.00,14.00,36.00,62.00,85.00,53.00,49.00,86.00,93.00,2.00,135.50,0",
						"8,69.00,40.00,13.00,46.00,75.00,27.00,93.00,70.00,36.00,22.00,78.00,59.00,96.00,23.00,154.61,0",
						"9,26.00,60.00,67.00,1.00,47.00,63.00,95.00,64.00,99.00,77.00,81.00,71.00,1.00,97.00,161.36,0",
						"10,93.00,68.00,96.00,77.00,43.00,14.00,97.00,86.00,91.00,80.00,92.00,34.00,47.00,30.00,171.86,0",
						"11,32.00,11.00,73.00,43.00,40.00,97.00,27.00,30.00,25.00,13.00,15.00,49.00,53.00,30.00,165.54,0",
						"12,67.00,19.00,10.00,34.00,50.00,97.00,57.00,99.00,10.00,42.00,31.00,15.00,5.00,65.00,155.45,0",
						"13,10.00,89.00,88.00,28.00,1.00,21.00,63.00,35.00,13.00,96.00,6.00,13.00,88.00,26.00,183.71,0",
						"14,90.00,87.00,83.00,77.00,60.00,76.00,36.00,63.00,83.00,97.00,3.00,47.00,17.00,35.00,152.78,0",
						"15,15.00,9.00,71.00,41.00,26.00,73.00,58.00,48.00,73.00,66.00,55.00,67.00,29.00,20.00,140.59,0",
						"16,56.00,92.00,18.00,18.00,41.00,11.00,82.00,66.00,13.00,48.00,96.00,49.00,4.00,35.00,151.14,0",
						"17,39.00,71.00,42.00,89.00,77.00,29.00,51.00,10.00,29.00,92.00,87.00,79.00,12.00,49.00,127.70,0",
						"18,54.00,80.00,69.00,24.00,68.00,2.00,53.00,22.00,47.00,40.00,94.00,13.00,21.00,89.00,149.31,0",
						"19,52.00,11.00,42.00,52.00,81.00,17.00,87.00,68.00,61.00,30.00,65.00,85.00,62.00,63.00,127.65,0",
						"20,37.00,71.00,50.00,99.00,83.00,30.00,21.00,69.00,23.00,59.00,11.00,74.00,24.00,23.00,140.90,0",
						"21,22.00,93.00,74.00,66.00,21.00,9.00,76.00,24.00,83.00,67.00,37.00,24.00,75.00,76.00,157.21,0",
						"22,95.00,57.00,74.00,34.00,33.00,42.00,60.00,91.00,71.00,49.00,4.00,24.00,81.00,32.00,151.63,0",
						"23,14.00,73.00,49.00,36.00,19.00,0.00,82.00,32.00,43.00,68.00,90.00,78.00,0.00,95.00,172.61,0",
						"24,10.23,22.91,15.38,11.30,5.96,0.12,25.83,15.88,13.50,21.34,28.25,24.48,0.13,29.92,136.06,0",
						"25,87.00,91.00,94.00,35.00,60.00,43.00,61.00,47.00,84.00,36.00,98.00,97.00,2.00,71.00,212.13,0",
						"26,32.80,28.56,29.50,10.99,18.83,13.62,19.24,20.58,26.36,11.30,30.76,30.44,0.64,22.29,130.55,0",
						"27,55.00,58.00,68.00,60.00,57.00,63.00,62.00,6.00,43.00,44.00,92.00,59.00,21.00,35.00,159.63,0",
						"28,22.75,18.20,21.34,18.83,17.89,19.90,19.56,7.37,13.50,13.81,28.88,18.52,6.72,11.08,130.20,0",
						"29,17.00,11.00,87.00,46.00,57.00,77.00,67.00,12.00,27.00,96.00,12.00,99.00,98.00,1.00,191.46,0",
						"30,50.00,13.00,48.00,79.00,82.00,40.00,80.00,2.00,61.00,58.00,74.00,9.00,70.00,64.00,166.73,0",
						"31,64.00,17.00,22.00,67.00,23.00,70.00,42.00,10.00,87.00,11.00,19.00,1.00,56.00,14.00,154.84,0",
						"32,9.00,76.00,8.00,54.00,60.00,64.00,6.00,25.00,93.00,42.00,98.00,99.00,37.00,78.00,169.18,0",
						"33,69.00,5.00,28.00,58.00,48.00,70.00,75.00,81.00,71.00,68.00,11.00,27.00,67.00,19.00,180.32,0",
						"34,90.00,99.00,65.00,92.00,57.00,4.00,59.00,13.00,17.00,69.00,38.00,90.00,4.00,20.00,151.19,0",
						"35,66.00,67.00,12.00,34.00,81.00,19.00,86.00,85.00,26.00,53.00,21.00,63.00,14.00,11.00,137.64,0",
						"36,38.00,47.00,43.00,94.00,99.00,86.00,85.00,64.00,64.00,88.00,46.00,5.00,6.00,4.00,150.15,0",
						"37,50.00,44.00,19.00,10.00,70.00,81.00,72.00,4.00,54.00,5.00,14.00,54.00,59.00,62.00,163.78,0",
						"38,96.00,8.00,60.00,90.00,58.00,40.00,33.00,35.00,63.00,5.00,85.00,97.00,5.00,82.00,147.61,0",
						"39,37.00,59.00,5.00,80.00,54.00,51.00,6.00,88.00,64.00,58.00,72.00,61.00,13.00,53.00,142.25,0",
						"40,86.00,59.00,77.00,52.00,69.00,97.00,16.00,72.00,56.00,88.00,63.00,54.00,40.00,1.00,145.20,0",
						"41,12.00,2.00,13.00,43.00,84.00,73.00,44.00,59.00,91.00,41.00,69.00,19.00,54.00,20.00,155.48,0",
						"42,52.00,89.00,98.00,21.00,31.00,30.00,25.00,47.00,23.00,37.00,7.00,14.00,96.00,30.00,166.86,0",
						"43,23.00,76.00,40.00,93.00,11.00,29.00,92.00,24.00,83.00,47.00,74.00,90.00,28.00,57.00,170.45,0",
						"44,87.00,49.00,86.00,11.00,37.00,83.00,56.00,87.00,17.00,77.00,36.00,83.00,78.00,69.00,159.30,0",
						"45,48.00,44.00,26.00,82.00,79.00,56.00,26.00,94.00,74.00,60.00,26.00,84.00,41.00,19.00,169.16,0",
						"46,28.00,28.00,94.00,31.00,13.00,80.00,90.00,5.00,98.00,68.00,16.00,9.00,32.00,78.00,146.07,0",
						"47,52.00,29.00,15.00,65.00,8.00,19.00,61.00,37.00,77.00,54.00,19.00,4.00,0.00,56.00,127.65,0",
						"48,3.00,3.00,44.00,52.00,76.00,47.00,85.00,14.00,75.00,27.00,44.00,69.00,75.00,56.00,148.18,0",
						"49,33.00,57.00,15.00,60.00,39.00,89.00,37.00,56.00,58.00,37.00,99.00,21.00,43.00,23.00,144.22,0",
						"50,74.00,2.00,41.00,65.00,90.00,37.00,27.00,87.00,52.00,91.00,8.00,64.00,9.00,6.00,158.02,0",
						"51,78.00,16.00,72.00,50.00,44.00,4.00,32.00,52.00,71.00,74.00,44.00,39.00,75.00,38.00,117.05,0",
						"52,82.00,40.00,23.00,98.00,19.00,21.00,10.00,15.00,20.00,34.00,38.00,62.00,23.00,90.00,132.79,0",
						"53,31.23,12.55,7.22,30.76,5.96,6.71,3.23,10.54,6.28,10.67,11.93,19.46,7.24,28.25,130.31,0",
						"54,36.00,54.00,26.00,12.00,79.00,77.00,91.00,20.00,58.00,9.00,27.00,18.00,69.00,51.00,155.33,0",
						"55,17.13,16.95,8.16,3.77,24.80,24.29,28.66,12.11,18.20,2.82,8.47,5.65,21.79,16.11,103.69,0",
						"56,11.12,5.14,2.48,1.14,7.53,7.49,8.79,9.60,5.52,0.86,2.57,1.71,6.74,4.99,33.57,0",
						"57,14.81,1.61,0.78,0.36,2.36,2.51,2.88,3.01,1.73,0.27,0.81,0.54,2.12,1.57,71.33,0",
						"58,8.30,0.49,0.24,0.11,0.72,0.87,0.96,8.60,0.53,0.08,0.24,0.16,0.66,0.48,25.72,0",
						"59,8.09,0.15,0.07,0.03,0.22,0.40,0.40,8.19,0.17,0.03,0.08,0.05,0.33,0.25,53.89,0",
						"60,8.03,0.05,0.02,0.01,0.07,0.25,0.22,8.06,0.05,0.01,0.02,0.02,0.23,0.17,16.29,0",
						"61,8.01,0.01,0.01,0.00,0.02,0.20,0.17,8.02,0.02,0.00,0.01,0.00,0.20,0.15,57.75,0",
						"62,8.00,0.00,0.00,0.00,0.01,0.18,0.15,8.35,0.00,0.00,0.00,0.00,0.08,0.05,111.72,0",
						"63,24.00,35.00,31.00,93.00,68.00,15.00,0.00,61.00,84.00,99.00,50.00,83.00,20.00,87.00,214.95,0",
						"64,81.00,12.00,62.00,73.00,45.00,42.00,17.00,45.00,86.00,92.00,64.00,50.00,71.00,3.00,160.46,0",
						"65,21.00,79.00,14.00,39.00,9.00,24.00,5.00,6.00,32.00,88.00,6.00,17.00,47.00,49.00,162.35,0",
						"66,97.00,50.00,19.00,38.00,92.00,28.00,85.00,40.00,40.00,83.00,56.00,15.00,66.00,36.00,142.92,0",
						"67,34.00,13.00,86.00,8.00,18.00,19.00,99.00,55.00,27.00,47.00,1.00,55.00,59.00,25.00,154.93,0",
						"68,25.00,7.00,97.00,53.00,50.00,93.00,4.00,31.00,97.00,40.00,40.00,15.00,74.00,25.00,158.14,0",
						"69,71.00,92.00,66.00,8.00,88.00,44.00,2.00,32.00,57.00,73.00,2.00,19.00,56.00,7.00,150.97,0",
						"70,59.00,55.00,48.00,90.00,54.00,35.00,41.00,27.00,61.00,10.00,46.00,32.00,46.00,46.00,124.94,0",
						"71,4.00,13.00,40.00,68.00,43.00,63.00,74.00,37.00,0.00,7.00,30.00,26.00,98.00,22.00,167.75,0",
						"72,85.00,85.00,91.00,48.00,61.00,7.00,32.00,92.00,22.00,5.00,81.00,16.00,23.00,75.00,164.80,0",
						"73,26.00,46.00,41.00,28.00,83.00,7.00,77.00,65.00,15.00,11.00,18.00,61.00,73.00,11.00,146.72,0",
						"74,34.00,98.00,52.00,90.00,65.00,11.00,72.00,63.00,29.00,34.00,38.00,32.00,26.00,33.00,129.52,0",
						"75,96.00,32.00,35.00,36.00,27.00,65.00,79.00,89.00,54.00,40.00,21.00,80.00,68.00,42.00,164.45,0",
						"76,9.00,14.00,47.00,7.00,94.00,6.00,56.00,45.00,54.00,95.00,75.00,4.00,47.00,62.00,171.96,0",
						"77,2.00,9.00,41.00,7.00,2.00,30.00,45.00,98.00,11.00,37.00,63.00,93.00,2.00,53.00,146.47,0",
						"78,68.00,77.00,61.00,42.00,40.00,59.00,54.00,55.00,87.00,64.00,61.00,39.00,4.00,52.00,133.65,0",
						"79,67.00,1.00,49.00,97.00,33.00,2.00,50.00,88.00,83.00,14.00,66.00,33.00,18.00,66.00,141.48,0",
						"80,63.00,68.00,57.00,33.00,43.00,79.00,67.00,56.00,99.00,20.00,34.00,16.00,92.00,37.00,130.73,0",
						"81,83.00,80.00,6.00,15.00,86.00,81.00,97.00,31.00,43.00,59.00,56.00,10.00,91.00,76.00,150.98,0",
						"82,43.20,25.11,1.88,4.71,26.99,25.98,31.53,15.22,13.50,18.52,17.58,3.14,28.58,23.86,143.22,0",
						"83,75.00,13.00,94.00,52.00,72.00,12.00,81.00,90.00,11.00,89.00,50.00,81.00,55.00,23.00,169.28,0",
						"84,40.69,4.08,29.50,16.32,22.60,4.32,26.50,33.74,3.45,27.93,15.69,25.42,17.28,7.22,106.04,0",
						"85,20.43,1.28,9.26,5.12,7.09,1.34,8.11,10.70,1.08,8.77,4.93,7.98,5.43,2.27,33.73,0",
						"86,12.25,0.40,2.91,1.61,2.23,0.54,2.64,9.19,0.34,2.75,1.55,2.50,1.83,0.81,55.93,0",
						"87,15.16,0.13,0.91,0.50,0.70,0.29,0.93,2.88,0.11,0.86,0.49,0.79,0.58,0.26,18.39,0",
						"88,16.08,0.04,0.29,0.16,0.22,0.25,0.41,0.91,0.03,0.27,0.15,0.25,0.19,0.08,6.23,1",
						"89,16.37,0.01,0.09,0.05,0.07,0.23,0.25,0.27,0.01,0.08,0.05,0.07,0.06,0.02,1.96,0",
						"90,16.46,0.00,0.03,0.02,0.02,0.23,0.20,0.09,0.00,0.03,0.01,0.02,0.02,0.01,3.75,1",
						"91,14.48,0.00,0.01,0.00,0.01,0.18,0.15,1.93,0.00,0.01,0.00,0.01,0.05,0.03,5.79,0",
						"92,8.16,0.00,0.00,0.00,0.00,0.18,0.14,7.91,0.00,0.00,0.00,0.00,0.06,0.04,3.17,1",
						"93,8.05,0.00,0.00,0.00,0.00,0.18,0.14,8.31,0.00,0.00,0.00,0.00,0.04,0.02,0.48,0",
						"94,8.02,0.00,0.00,0.00,0.00,0.18,0.14,8.44,0.00,0.00,0.00,0.00,0.03,0.01,0.10,0",
						"95,8.00,0.00,0.00,0.00,0.00,0.18,0.14,8.48,0.00,0.00,0.00,0.00,0.03,0.01,76.70,0",
						"96,73.00,75.00,61.00,11.00,13.00,49.00,99.00,53.00,60.00,0.00,39.00,54.00,60.00,9.00,183.13,0",
						"97,73.00,35.00,1.00,99.00,60.00,98.00,7.00,75.00,66.00,61.00,77.00,61.00,36.00,70.00,172.50,0",
						"98,83.00,1.00,4.00,34.00,51.00,63.00,33.00,42.00,62.00,93.00,10.00,43.00,33.00,6.00,138.48,0",
						"99,83.00,70.00,59.00,51.00,8.00,88.00,81.00,14.00,91.00,68.00,97.00,63.00,40.00,17.00,149.38,0",
						"100,86.00,93.00,17.00,32.00,80.00,81.00,8.00,43.00,84.00,75.00,85.00,45.00,54.00,86.00,146.18,0",
						"101,80.00,54.00,54.00,81.00,53.00,82.00,15.00,19.00,16.00,31.00,79.00,79.00,88.00,88.00,154.44,0",
						"102,97.00,27.00,44.00,57.00,32.00,3.00,36.00,40.00,51.00,99.00,94.00,29.00,75.00,34.00,141.76,0",
						"103,96.00,3.00,57.00,9.00,92.00,52.00,11.00,19.00,91.00,79.00,59.00,75.00,82.00,8.00,163.98,0",
						"104,73.00,93.00,83.00,1.00,17.00,74.00,63.00,61.00,24.00,76.00,14.00,51.00,85.00,85.00,174.92,0",
						"105,9.00,92.00,77.00,79.00,24.00,88.00,8.00,57.00,87.00,11.00,51.00,46.00,26.00,69.00,175.58,0",
						"106,39.00,53.00,38.00,33.00,0.00,0.00,88.00,44.00,59.00,85.00,61.00,16.00,50.00,74.00,155.46,0",
						"107,0.00,84.00,65.00,76.00,82.00,20.00,42.00,1.00,0.00,29.00,2.00,59.00,56.00,76.00,161.15,0",
						"108,76.00,1.00,39.00,94.00,55.00,13.00,7.00,21.00,4.00,24.00,32.00,52.00,38.00,75.00,142.89,0",
						"109,37.00,4.00,13.00,55.00,44.00,23.00,35.00,67.00,0.00,64.00,6.00,97.00,12.00,49.00,136.70,0",
						"110,36.00,75.00,96.00,43.00,92.00,96.00,72.00,21.00,60.00,37.00,37.00,12.00,68.00,5.00,165.84,0",
						"111,77.00,1.00,43.00,97.00,31.00,99.00,3.00,13.00,43.00,93.00,83.00,79.00,13.00,14.00,163.81,0",
						"112,88.00,20.00,52.00,61.00,4.00,96.00,74.00,76.00,71.00,88.00,75.00,43.00,77.00,6.00,159.54,0",
						"113,44.77,6.28,16.32,19.15,1.26,30.69,24.31,29.34,22.28,27.62,23.54,13.50,24.18,1.89,117.17,0",
						"114,31.00,1.91,4.95,5.81,0.38,9.88,8.48,14.48,6.76,8.38,7.14,4.10,7.36,0.58,36.70,0",
						"115,26.88,0.60,1.55,1.82,0.12,3.65,3.74,10.03,2.12,2.63,2.24,1.29,2.33,0.19,62.98,0",
						"116,25.57,0.18,0.47,0.55,0.04,1.67,2.23,8.62,0.64,0.80,0.68,0.39,0.72,0.06,19.76,0",
						"117,25.18,0.06,0.15,0.17,0.01,1.08,1.78,8.19,0.20,0.25,0.21,0.12,0.24,0.02,8.54,1",
						"118,16.81,0.02,0.05,0.05,0.00,0.28,0.25,0.30,0.06,0.08,0.07,0.04,0.08,0.01,8.79,0",
						"119,16.60,0.01,0.01,0.02,0.00,0.24,0.20,0.09,0.02,0.02,0.02,0.01,0.03,0.00,3.12,1",
						"120,16.53,0.00,0.00,0.01,0.00,0.23,0.18,0.03,0.01,0.01,0.01,0.00,0.01,0.00,0.99,0",
						"121,16.51,0.00,0.00,0.00,0.00,0.18,0.15,0.01,0.00,0.00,0.00,0.00,0.01,0.00,0.32,1",
						"122,16.50,0.00,0.00,0.00,0.00,0.21,0.17,0.00,0.00,0.00,0.00,0.00,0.01,0.00,0.10,0",
						"123,16.50,0.00,0.00,0.00,0.00,0.22,0.17,0.00,0.00,0.00,0.00,0.00,0.01,0.00,4.13,1",
						"124,10.67,0.00,0.00,0.00,0.00,0.19,0.15,5.83,0.00,0.00,0.00,0.00,0.02,0.01,5.59,1",
						"125,8.81,0.00,0.00,0.00,0.00,0.18,0.14,7.69,0.00,0.00,0.00,0.00,0.02,0.01,1.82,1",
						"126,8.11,0.00,0.00,0.00,0.00,0.18,0.14,8.46,0.00,0.00,0.00,0.00,0.07,0.05,0.57,1",
						"127,8.03,0.00,0.00,0.00,0.00,0.18,0.14,8.49,0.00,0.00,0.00,0.00,0.04,0.02,0.15,0",
						"128,8.01,0.00,0.00,0.00,0.00,0.18,0.14,8.50,0.00,0.00,0.00,0.00,0.03,0.01,226.08,0",
						"129,97.00,21.00,89.00,17.00,96.00,3.00,88.00,29.00,83.00,76.00,58.00,56.00,52.00,87.00,184.78,0",
						"130,76.00,76.00,82.00,55.00,92.00,41.00,87.00,88.00,31.00,99.00,16.00,20.00,42.00,32.00,145.63,0",
						"131,95.00,10.00,67.00,38.00,18.00,58.00,84.00,17.00,16.00,37.00,36.00,64.00,84.00,43.00,142.59,0",
						"132,95.00,11.00,19.00,74.00,9.00,54.00,55.00,97.00,63.00,24.00,79.00,67.00,65.00,64.00,150.67,0",
						"133,90.00,46.00,39.00,0.00,27.00,89.00,99.00,32.00,7.00,70.00,85.00,14.00,34.00,8.00,147.92,0",
						"134,69.00,71.00,8.00,29.00,15.00,83.00,49.00,44.00,17.00,13.00,91.00,87.00,10.00,47.00,143.94,0",
						"135,47.00,28.00,14.00,34.00,53.00,18.00,69.00,93.00,24.00,99.00,55.00,40.00,51.00,28.00,149.36,0",
						"136,42.00,24.00,13.00,85.00,12.00,41.00,15.00,44.00,51.00,1.00,65.00,1.00,70.00,16.00,166.09,0",
						"137,79.00,19.00,11.00,13.00,0.00,41.00,71.00,37.00,84.00,48.00,2.00,82.00,86.00,70.00,173.74,0",
						"138,39.00,31.00,64.00,26.00,72.00,87.00,35.00,68.00,88.00,51.00,88.00,38.00,46.00,18.00,137.61,0",
						"139,73.00,79.00,14.00,44.00,62.00,51.00,6.00,35.00,84.00,46.00,63.00,26.00,27.00,92.00,122.54,0",
						"140,52.00,47.00,48.00,26.00,43.00,49.00,38.00,58.00,99.00,59.00,71.00,11.00,29.00,93.00,118.19,0",
						"141,27.00,8.00,15.00,25.00,40.00,52.00,36.00,13.00,89.00,69.00,13.00,47.00,36.00,46.00,139.09,0",
						"142,38.00,61.00,36.00,90.00,64.00,73.00,12.00,10.00,16.00,6.00,98.00,46.00,22.00,21.00,142.95,0",
						"143,46.23,19.15,11.30,28.25,20.09,53.27,4.49,8.97,5.02,1.88,30.76,14.44,7.06,6.72,98.44,0",
						"144,31.66,6.01,3.55,8.87,6.30,17.28,2.49,8.30,1.58,0.59,9.65,4.53,2.23,2.11,79.38,0",
						"145,27.02,1.82,1.08,2.69,1.91,5.81,1.86,8.09,0.48,0.18,2.93,1.38,0.70,0.65,24.98,0",
						"146,25.63,0.57,0.34,0.84,0.60,2.38,1.66,8.03,0.15,0.06,0.92,0.43,0.24,0.21,7.56,1",
						"147,25.19,0.17,0.10,0.26,0.18,1.28,1.60,8.01,0.05,0.02,0.28,0.13,0.09,0.07,2.38,0",
						"148,25.06,0.05,0.03,0.08,0.06,0.96,1.59,8.00,0.01,0.01,0.09,0.04,0.04,0.03,0.72,1",
						"149,25.02,0.02,0.01,0.02,0.02,0.85,1.58,8.00,0.00,0.00,0.03,0.01,0.03,0.01,0.23,1",
						"150,25.01,0.01,0.00,0.01,0.01,0.82,1.58,8.00,0.00,0.00,0.01,0.00,0.03,0.01,5.81,0",
						"151,19.17,0.00,0.00,0.00,0.00,0.40,0.61,8.00,0.00,0.00,0.00,0.00,0.13,0.10,5.49,1",
						"152,17.34,0.00,0.00,0.00,0.00,0.28,0.31,2.51,0.00,0.00,0.00,0.00,0.04,0.03,4.03,1",
						"153,16.75,0.00,0.00,0.00,0.00,0.24,0.22,0.76,0.00,0.00,0.00,0.00,0.02,0.01,1.27,1",
						"154,16.58,0.00,0.00,0.00,0.00,0.23,0.19,0.24,0.00,0.00,0.00,0.00,0.01,0.00,3.65,1",
						"155,11.04,0.00,0.00,0.00,0.00,0.18,0.14,0.02,0.00,0.00,0.00,0.00,0.01,0.00,4.56,1",
						"156,16.50,0.00,0.00,0.00,0.00,0.18,0.14,0.00,0.00,0.00,0.00,0.00,0.01,0.00,7.43,0",
						"157,10.67,0.00,0.00,0.00,0.00,0.18,0.14,5.83,0.00,0.00,0.00,0.00,0.02,0.01,6.19,0",
						"158,8.81,0.00,0.00,0.00,0.00,0.18,0.14,7.69,0.00,0.00,0.00,0.00,0.02,0.01,1.99,0",
						"159,8.25,0.00,0.00,0.00,0.00,0.18,0.14,8.25,0.00,0.00,0.00,0.00,0.02,0.01,5.55,0",
						"160,54.00,96.00,39.00,28.00,38.00,65.00,73.00,76.00,12.00,69.00,84.00,23.00,76.00,65.00,151.60,0",
						"161,42.00,37.00,58.00,14.00,7.00,64.00,96.00,72.00,45.00,56.00,80.00,42.00,30.00,19.00,153.09,0",
						"162,65.00,44.00,97.00,90.00,90.00,25.00,3.00,46.00,27.00,79.00,90.00,15.00,87.00,27.00,157.71,0",
						"163,57.00,83.00,23.00,74.00,71.00,98.00,85.00,38.00,91.00,17.00,86.00,62.00,81.00,62.00,157.91,0",
						"164,90.00,35.00,67.00,84.00,94.00,28.00,99.00,84.00,92.00,17.00,4.00,20.00,31.00,18.00,158.10,0",
						"165,72.00,40.00,86.00,62.00,40.00,55.00,26.00,77.00,19.00,79.00,72.00,7.00,30.00,21.00,147.60,0",
						"166,86.00,20.00,1.00,91.00,30.00,89.00,79.00,24.00,5.00,31.00,88.00,16.00,33.00,84.00,150.26,0",
						"167,97.00,53.00,58.00,51.00,14.00,54.00,28.00,25.00,75.00,91.00,46.00,62.00,40.00,2.00,148.31,0",
						"168,36.00,81.00,98.00,89.00,62.00,38.00,11.00,12.00,20.00,70.00,95.00,38.00,98.00,52.00,135.98,0",
						"169,73.00,36.00,89.00,58.00,77.00,46.00,9.00,86.00,24.00,39.00,39.00,12.00,67.00,48.00,155.19,0",
						"170,34.00,71.00,42.00,72.00,89.00,73.00,8.00,67.00,88.00,59.00,43.00,89.00,32.00,24.00,125.99,0",
						"171,49.00,2.00,34.00,9.00,70.00,41.00,4.00,3.00,38.00,98.00,43.00,30.00,55.00,65.00,152.87,0",
						"172,57.00,60.00,48.00,33.00,10.00,6.00,30.00,89.00,87.00,9.00,40.00,10.00,39.00,0.00,167.82,0",
						"173,90.00,54.00,73.00,53.00,98.00,69.00,36.00,79.00,30.00,91.00,18.00,48.00,82.00,42.00,163.33,0",
						"174,62.55,16.95,22.91,16.63,30.76,52.02,12.03,30.63,9.42,28.56,5.65,15.07,25.89,13.31,103.18,0",
						"175,36.79,5.32,7.19,5.22,9.65,16.88,4.86,15.10,2.96,8.96,1.77,4.73,8.14,4.18,45.64,0",
						"176,45.85,1.67,2.26,1.64,3.03,35.66,2.25,10.57,0.93,2.81,0.56,1.48,2.71,1.44,22.97,0",
						"177,31.54,0.52,0.71,0.51,0.95,11.75,1.79,8.81,0.29,0.88,0.17,0.47,0.87,0.46,20.83,1",
						"178,26.99,0.16,0.21,0.16,0.29,4.13,1.64,8.24,0.09,0.27,0.05,0.14,0.28,0.14,15.14,1",
						"179,25.62,0.05,0.07,0.05,0.09,1.85,1.60,8.08,0.03,0.08,0.02,0.04,0.11,0.05,13.32,0",
						"180,25.19,0.02,0.02,0.01,0.03,1.12,1.58,8.02,0.01,0.03,0.01,0.01,0.05,0.02,4.18,1",
						"181,25.06,0.00,0.01,0.00,0.01,0.91,1.58,8.01,0.00,0.01,0.00,0.00,0.03,0.01,2.88,0",
						"182,19.19,0.00,0.00,0.00,0.00,0.43,0.61,8.00,0.00,0.00,0.00,0.00,0.13,0.10,3.86,1",
						"183,17.32,0.00,0.00,0.00,0.00,0.28,0.30,8.00,0.00,0.00,0.00,0.00,0.17,0.13,1.26,1",
						"184,16.76,0.00,0.00,0.00,0.00,0.21,0.20,8.34,0.00,0.00,0.00,0.00,0.11,0.12,3.11,1",
						"185,16.58,0.00,0.00,0.00,0.00,0.22,0.18,2.62,0.00,0.00,0.00,0.00,0.04,0.04,4.71,0",
						"186,16.52,0.00,0.00,0.00,0.00,0.19,0.15,8.49,0.00,0.00,0.00,0.00,0.09,0.12,6.34,0",
						"187,9.26,0.00,0.00,0.00,0.00,0.18,0.14,0.08,0.00,0.00,0.00,0.00,0.01,0.00,6.12,1",
						"188,8.74,0.00,0.00,0.00,0.00,0.18,0.14,0.02,0.00,0.00,0.00,0.00,0.01,0.00,11.16,0",
						"189,8.23,0.00,0.00,0.00,0.00,0.18,0.14,16.82,0.00,0.00,0.00,0.00,0.24,0.19,9.99,0",
						"190,8.07,0.00,0.00,0.00,0.00,0.18,0.14,11.11,0.00,0.00,0.00,0.00,0.09,0.07,8.82,0",
						"191,8.02,0.00,0.00,0.00,0.00,0.18,0.14,23.77,0.00,0.00,0.00,0.00,0.33,0.27,9.64,0",
						"192,94.00,90.00,21.00,85.00,12.00,89.00,52.00,58.00,85.00,57.00,50.00,25.00,62.00,84.00,158.13,0",
						"193,46.00,74.00,25.00,98.00,69.00,56.00,0.00,31.00,78.00,70.00,63.00,55.00,46.00,71.00,146.24,0",
						"194,28.00,77.00,83.00,78.00,33.00,3.00,62.00,11.00,62.00,22.00,80.00,35.00,97.00,82.00,148.31,0",
						"195,38.00,43.00,69.00,22.00,57.00,76.00,74.00,42.00,77.00,89.00,20.00,73.00,47.00,34.00,146.11,0",
						"196,86.00,85.00,2.00,54.00,93.00,74.00,54.00,9.00,14.00,16.00,7.00,9.00,20.00,49.00,153.33,0",
						"197,65.00,47.00,37.00,3.00,34.00,28.00,77.00,10.00,2.00,1.00,4.00,15.00,56.00,16.00,161.21,0",
						"198,93.00,38.00,41.00,30.00,51.00,34.00,16.00,87.00,32.00,59.00,89.00,61.00,10.00,31.00,154.48,0",
						"199,32.00,54.00,85.00,93.00,55.00,16.00,49.00,28.00,72.00,30.00,20.00,57.00,80.00,45.00,152.06,0",
						"200,63.00,69.00,36.00,81.00,79.00,82.00,43.00,58.00,38.00,97.00,90.00,59.00,90.00,76.00,141.48,0",
						"201,96.00,86.00,29.00,1.00,77.00,70.00,98.00,7.00,25.00,51.00,12.00,85.00,91.00,13.00,178.94,0",
						"202,36.00,55.00,92.00,28.00,99.00,97.00,7.00,58.00,15.00,39.00,62.00,78.00,31.00,45.00,135.77,0",
						"203,83.00,9.00,41.00,67.00,74.00,56.00,87.00,19.00,78.00,22.00,86.00,55.00,76.00,64.00,168.92,0",
						"204,59.00,35.00,86.00,15.00,77.00,87.00,2.00,46.00,8.00,78.00,91.00,89.00,32.00,23.00,163.62,0",
						"205,52.82,10.99,26.99,4.71,24.17,57.67,1.36,20.27,2.51,24.48,28.56,27.93,10.20,7.35,101.71,0",
						"206,50.89,3.45,8.47,1.48,7.59,48.46,1.15,12.19,0.79,7.68,8.96,8.77,3.36,2.43,31.92,0",
						"207,50.28,1.08,2.66,0.46,2.38,45.57,1.09,9.66,0.25,2.41,2.81,2.75,1.21,0.89,14.69,1",
						"208,50.09,0.34,0.83,0.15,0.75,44.66,1.07,8.86,0.08,0.76,0.88,0.86,0.54,0.41,4.61,0",
						"209,50.03,0.10,0.25,0.04,0.23,44.38,1.06,8.61,0.02,0.23,0.27,0.26,0.32,0.25,9.95,1",
						"210,50.01,0.03,0.08,0.01,0.07,44.29,1.06,8.53,0.01,0.07,0.08,0.08,0.26,0.21,11.75,1",
						"211,50.00,0.01,0.02,0.00,0.02,44.26,1.06,8.51,0.00,0.02,0.03,0.02,0.24,0.19,20.89,1",
						"212,32.85,0.00,0.01,0.00,0.01,14.45,1.42,8.16,0.00,0.01,0.01,0.01,0.09,0.06,24.77,1",
						"213,21.63,0.00,0.00,0.00,0.00,4.68,0.56,8.05,0.00,0.00,0.00,0.00,0.15,0.12,18.39,1",
						"214,18.06,0.00,0.00,0.00,0.00,1.57,0.29,8.02,0.00,0.00,0.00,0.00,0.17,0.13,5.80,1",
						"215,16.99,0.00,0.00,0.00,0.00,0.62,0.19,8.35,0.00,0.00,0.00,0.00,0.11,0.12,1.80,1",
						"216,16.65,0.00,0.00,0.00,0.00,0.32,0.16,8.45,0.00,0.00,0.00,0.00,0.09,0.12,0.66,0",
						"217,16.50,0.00,0.00,0.00,0.00,0.21,0.17,8.00,0.00,0.00,0.00,0.00,0.18,0.14,1.73,1",
						"218,16.50,0.00,0.00,0.00,0.00,0.19,0.15,8.35,0.00,0.00,0.00,0.00,0.11,0.12,0.20,1",
						"219,16.50,0.00,0.00,0.00,0.00,0.19,0.15,8.45,0.00,0.00,0.00,0.00,0.09,0.12,8.41,1",
						"220,10.67,0.00,0.00,0.00,0.00,0.18,0.14,19.46,0.00,0.00,0.00,0.00,0.27,0.23,13.76,1",
						"221,8.81,0.00,0.00,0.00,0.00,0.18,0.14,22.97,0.00,0.00,0.00,0.00,0.32,0.26,4.39,0",
						"222,8.01,0.00,0.00,0.00,0.00,0.18,0.14,24.50,0.00,0.00,0.00,0.00,0.35,0.28,4.36,1",
						"223,8.00,0.00,0.00,0.00,0.00,0.18,0.14,24.50,0.00,0.00,0.00,0.00,0.34,0.28,0.49,0",
						"224,8.00,0.00,0.00,0.00,0.00,0.18,0.14,24.50,0.00,0.00,0.00,0.00,0.34,0.28,208.56,0",
						"225,27.00,25.00,64.00,20.00,20.00,48.00,46.00,83.00,16.00,74.00,87.00,10.00,56.00,7.00,147.77,0",
						"226,19.00,59.00,49.00,32.00,1.00,73.00,66.00,76.00,9.00,47.00,35.00,33.00,61.00,19.00,124.83,0",
						"227,64.00,42.00,83.00,55.00,59.00,75.00,93.00,56.00,73.00,45.00,72.00,8.00,92.00,5.00,149.32,0",
						"228,55.00,30.00,66.00,27.00,92.00,32.00,10.00,84.00,9.00,37.00,60.00,97.00,29.00,41.00,173.26,0",
						"229,3.00,91.00,2.00,26.00,15.00,61.00,54.00,60.00,98.00,89.00,66.00,18.00,32.00,92.00,200.47,0",
						"230,39.00,36.00,74.00,3.00,89.00,29.00,95.00,34.00,7.00,38.00,59.00,65.00,20.00,16.00,152.63,0",
						"231,37.00,46.00,44.00,4.00,64.00,51.00,42.00,66.00,3.00,37.00,66.00,13.00,9.00,30.00,133.20,0",
						"232,32.00,28.00,57.00,92.00,3.00,80.00,87.00,46.00,57.00,46.00,67.00,56.00,12.00,49.00,141.83,0",
						"233,27.00,63.00,58.00,83.00,67.00,66.00,14.00,57.00,50.00,89.00,82.00,13.00,28.00,61.00,155.66,0",
						"234,2.00,31.00,99.00,69.00,95.00,60.00,24.00,41.00,57.00,27.00,94.00,92.00,2.00,17.00,151.47,0",
						"235,34.00,80.00,28.00,17.00,2.00,41.00,7.00,61.00,48.00,34.00,8.00,44.00,0.00,17.00,169.71,0",
						"236,78.00,93.00,46.00,26.00,94.00,89.00,9.00,80.00,38.00,17.00,9.00,12.00,44.00,15.00,130.85,0",
						"237,58.79,29.19,14.44,8.16,29.50,58.29,3.55,30.94,11.93,5.34,2.82,3.77,13.97,4.83,91.45,0",
						"238,52.76,9.16,4.53,2.56,9.26,48.66,1.84,15.54,3.74,1.67,0.89,1.18,4.54,1.64,28.70,0",
						"239,50.87,2.88,1.42,0.80,2.91,45.63,1.31,10.71,1.17,0.53,0.28,0.37,1.58,0.64,9.02,1",
						"240,50.26,0.87,0.43,0.24,0.88,44.67,1.14,9.17,0.36,0.16,0.08,0.11,0.64,0.32,2.83,1",
						"241,50.08,0.27,0.14,0.08,0.28,44.38,1.08,8.71,0.11,0.05,0.03,0.04,0.36,0.23,0.86,1",
						"242,50.03,0.08,0.04,0.02,0.08,44.29,1.07,8.56,0.03,0.02,0.01,0.01,0.27,0.20,0.27,1",
						"243,50.03,0.02,0.06,0.02,0.01,44.28,1.09,8.57,0.05,0.03,0.04,0.03,0.27,0.22,0.11,1",
						"244,50.01,0.01,0.02,0.01,0.00,44.26,1.07,8.52,0.02,0.01,0.01,0.01,0.24,0.20,8.64,0",
						"245,50.00,0.00,0.01,0.00,0.00,44.25,1.06,8.51,0.01,0.00,0.00,0.00,0.23,0.19,49.51,0",
						"246,27.02,0.00,0.00,0.00,0.00,14.03,0.45,8.16,0.00,0.00,0.00,0.00,0.20,0.16,26.02,0",
						"247,19.69,0.00,0.00,0.00,0.00,4.41,0.25,8.05,0.00,0.00,0.00,0.00,0.19,0.15,8.11,1",
						"248,17.50,0.00,0.00,0.00,0.00,1.51,0.18,8.36,0.00,0.00,0.00,0.00,0.12,0.13,3.64,0",
						"249,16.80,0.00,0.00,0.00,0.00,0.59,0.16,8.46,0.00,0.00,0.00,0.00,0.09,0.12,1.19,1",
						"250,16.60,0.00,0.00,0.00,0.00,0.31,0.15,8.49,0.00,0.00,0.00,0.00,0.09,0.12,4.67,1",
						"251,9.26,0.00,0.00,0.00,0.00,0.18,0.14,1.55,0.00,0.00,0.00,0.00,0.03,0.02,6.33,0",
						"252,8.74,0.00,0.00,0.00,0.00,0.18,0.14,0.49,0.00,0.00,0.00,0.00,0.01,0.01,13.85,1",
						"253,8.58,0.00,0.00,0.00,0.00,0.18,0.14,17.31,0.00,0.00,0.00,0.00,0.26,0.21,8.31,1",
						"254,8.07,0.00,0.00,0.00,0.00,0.18,0.14,22.21,0.00,0.00,0.00,0.00,0.31,0.25,2.76,0",
						"255,8.02,0.00,0.00,0.00,0.00,0.18,0.14,23.78,0.00,0.00,0.00,0.00,0.33,0.27,63.81,0",
						"256,61.00,87.00,67.00,19.00,28.00,57.00,42.00,22.00,64.00,61.00,56.00,25.00,65.00,81.00,148.11,0",
						"257,20.00,93.00,57.00,49.00,77.00,36.00,4.00,92.00,30.00,99.00,8.00,35.00,44.00,98.00,161.82,0",
						"258,5.00,17.00,24.00,56.00,42.00,49.00,77.00,89.00,74.00,20.00,45.00,93.00,22.00,59.00,155.90,0",
						"259,76.00,25.00,36.00,73.00,38.00,32.00,0.00,61.00,35.00,4.00,31.00,44.00,17.00,89.00,152.93,0",
						"260,29.00,42.00,1.00,96.00,53.00,27.00,74.00,53.00,41.00,77.00,23.00,86.00,80.00,37.00,159.94,0",
						"261,89.00,78.00,71.00,48.00,22.00,34.00,87.00,7.00,13.00,7.00,40.00,87.00,90.00,27.00,157.28,0",
						"262,0.00,43.00,51.00,82.00,64.00,63.00,0.00,77.00,64.00,7.00,4.00,74.00,99.00,45.00,161.40,0",
						"263,53.00,18.00,5.00,48.00,62.00,96.00,9.00,10.00,60.00,0.00,34.00,37.00,6.00,12.00,159.48,0",
						"264,77.00,46.00,75.00,62.00,43.00,6.00,71.00,3.00,69.00,26.00,15.00,20.00,74.00,99.00,151.18,0",
						"265,93.00,44.00,36.00,12.00,59.00,10.00,82.00,56.00,31.00,21.00,38.00,3.00,52.00,29.00,141.14,0",
						"266,78.00,73.00,69.00,45.00,35.00,81.00,95.00,67.00,98.00,77.00,22.00,64.00,99.00,40.00,162.64,0",
						"267,76.00,38.00,73.00,84.00,22.00,72.00,79.00,2.00,13.00,61.00,29.00,2.00,76.00,48.00,151.73,0",
						"268,15.00,77.00,13.00,68.00,51.00,83.00,17.00,56.00,2.00,47.00,12.00,42.00,43.00,27.00,135.00,0",
						"269,31.00,69.00,28.00,43.00,1.00,26.00,51.00,9.00,99.00,48.00,62.00,39.00,51.00,12.00,143.80,0",
						"270,44.04,21.66,8.79,13.50,0.31,38.52,16.74,8.66,31.07,15.07,19.46,12.24,16.17,3.89,75.22,0",
						"271,48.13,6.80,2.76,4.24,0.10,42.45,5.98,8.55,9.75,4.73,6.11,3.84,5.23,1.35,23.61,0",
						"272,49.41,2.13,0.87,1.33,0.03,43.68,2.61,8.52,3.06,1.48,1.92,1.21,1.80,0.55,7.43,0",
						"273,49.82,0.65,0.26,0.40,0.01,44.08,1.53,8.50,0.93,0.45,0.58,0.37,0.71,0.30,2.32,0",
						"274,49.94,0.20,0.08,0.13,0.00,44.20,1.21,8.50,0.29,0.14,0.18,0.11,0.38,0.22,36.66,1",
						"275,49.98,0.06,0.03,0.04,0.00,44.23,1.11,8.50,0.09,0.04,0.06,0.03,0.28,0.19,11.50,1",
						"276,49.99,0.02,0.01,0.01,0.00,44.24,1.08,8.50,0.03,0.01,0.02,0.01,0.24,0.19,64.86,1",
						"277,11.11,0.01,0.00,0.00,0.00,0.31,0.15,73.77,0.01,0.00,0.01,0.00,68.68,2.33,81.22,1",
						"278,14.81,0.00,0.00,0.00,0.00,0.23,0.15,34.47,0.00,0.00,0.00,0.00,21.68,0.83,56.45,0",
						"279,15.97,0.00,0.00,0.00,0.00,0.22,0.16,16.31,0.00,0.00,0.00,0.00,6.93,0.36,19.59,1",
						"280,16.50,0.00,0.00,0.00,0.00,0.20,0.15,16.49,0.00,0.00,0.00,0.00,0.18,0.14,8.24,1",
						"281,16.50,0.00,0.00,0.00,0.00,0.19,0.15,11.01,0.00,0.00,0.00,0.00,0.11,0.12,5.53,0",
						"282,16.50,0.00,0.00,0.00,0.00,0.19,0.15,16.50,0.00,0.00,0.00,0.00,0.18,0.14,9.90,0",
						"283,11.01,0.00,0.00,0.00,0.00,0.18,0.14,5.18,0.00,0.00,0.00,0.00,0.06,0.05,12.84,1",
						"284,9.29,0.00,0.00,0.00,0.00,0.18,0.14,18.78,0.00,0.00,0.00,0.00,0.27,0.22,10.74,0",
						"285,8.74,0.00,0.00,0.00,0.00,0.18,0.14,23.11,0.00,0.00,0.00,0.00,0.34,0.28,3.36,0",
						"286,8.58,0.00,0.00,0.00,0.00,0.18,0.14,24.41,0.00,0.00,0.00,0.00,0.36,0.30,48.27,0",
						"287,89.00,12.00,16.00,74.00,92.00,26.00,58.00,21.00,35.00,44.00,7.00,24.00,54.00,65.00,189.00,0",
						"288,9.00,42.00,31.00,3.00,34.00,63.00,61.00,4.00,25.00,49.00,88.00,14.00,89.00,98.00,146.47,0",
						"289,88.00,79.00,27.00,8.00,25.00,87.00,60.00,53.00,96.00,14.00,38.00,83.00,35.00,77.00,166.01,0",
						"290,86.00,71.00,50.00,85.00,84.00,39.00,38.00,9.00,55.00,90.00,96.00,70.00,91.00,21.00,171.70,0",
						"291,75.00,0.00,83.00,27.00,36.00,91.00,21.00,49.00,99.00,15.00,66.00,76.00,54.00,30.00,138.22,0",
						"292,76.00,16.00,94.00,29.00,6.00,67.00,14.00,63.00,66.00,48.00,28.00,21.00,39.00,98.00,146.41,0",
						"293,99.00,26.00,86.00,97.00,35.00,39.00,59.00,27.00,25.00,38.00,48.00,95.00,86.00,65.00,146.04,0",
						"294,13.00,95.00,24.00,82.00,60.00,48.00,4.00,43.00,57.00,84.00,17.00,13.00,63.00,48.00,150.74,0",
						"295,94.00,25.00,90.00,84.00,43.00,27.00,24.00,8.00,84.00,86.00,58.00,17.00,72.00,12.00,151.41,0",
						"296,44.00,10.00,60.00,93.00,89.00,65.00,67.00,50.00,78.00,53.00,29.00,48.00,50.00,9.00,136.51,0",
						"297,56.00,36.00,75.00,35.00,37.00,29.00,16.00,83.00,64.00,90.00,30.00,0.00,54.00,5.00,130.51,0",
						"298,26.00,14.00,80.00,69.00,1.00,54.00,12.00,61.00,87.00,31.00,89.00,10.00,69.00,41.00,144.60,0",
						"299,89.00,83.00,90.00,67.00,63.00,60.00,2.00,61.00,11.00,16.00,26.00,53.00,21.00,64.00,160.03,0",
						"300,72.00,20.00,13.00,13.00,22.00,66.00,22.00,81.00,30.00,79.00,50.00,95.00,49.00,8.00,150.06,0",
						"301,90.00,30.00,55.00,46.00,44.00,69.00,60.00,10.00,53.00,60.00,99.00,74.00,5.00,90.00,153.63,0",
						"302,34.08,9.42,17.26,14.44,13.81,21.78,18.93,71.75,16.63,18.83,31.07,23.23,70.18,30.53,127.37,0",
						"303,45.00,2.96,5.42,4.53,4.33,37.20,6.67,28.35,5.22,5.91,9.75,7.29,22.19,9.71,61.92,0",
						"304,48.43,0.93,1.70,1.42,1.36,42.04,2.82,14.73,1.64,1.86,3.06,2.29,7.12,3.17,44.26,1",
						"305,49.51,0.29,0.53,0.45,0.43,43.55,1.61,10.46,0.51,0.58,0.96,0.72,2.39,1.12,74.12,0",
						"306,9.59,0.09,0.16,0.14,0.13,1.28,0.33,97.86,0.16,0.18,0.29,0.22,97.67,3.52,97.30,0",
						"307,37.32,0.03,0.05,0.04,0.04,30.76,0.83,36.55,0.05,0.06,0.09,0.07,30.81,1.23,87.51,0",
						"308,8.60,0.01,0.02,0.01,0.01,0.28,0.16,99.80,0.01,0.02,0.03,0.02,99.78,3.35,62.77,0",
						"309,8.53,0.00,0.00,0.00,0.00,0.21,0.14,99.94,0.00,0.01,0.01,0.01,99.93,3.33,10.32,1",
						"310,8.51,0.00,0.00,0.00,0.00,0.18,0.14,99.98,0.00,0.00,0.00,0.00,99.98,3.33,47.97,0",
						"311,13.99,0.00,0.00,0.00,0.00,0.19,0.14,42.70,0.00,0.00,0.00,0.00,31.50,1.14,60.90,1",
						"312,15.74,0.00,0.00,0.00,0.00,0.19,0.15,24.45,0.00,0.00,0.00,0.00,9.68,0.44,19.49,0",
						"313,16.26,0.00,0.00,0.00,0.00,0.19,0.15,19.00,0.00,0.00,0.00,0.00,3.16,0.23,11.98,0",
						"314,10.59,0.00,0.00,0.00,0.00,0.19,0.15,28.60,0.00,0.00,0.00,0.00,1.34,0.42,8.46,0",
						"315,9.16,0.00,0.00,0.00,0.00,0.18,0.14,26.13,0.00,0.00,0.00,0.00,0.67,0.34,7.97,0",
						"316,8.70,0.00,0.00,0.00,0.00,0.18,0.14,25.34,0.00,0.00,0.00,0.00,0.46,0.32,2.52,1",
						"317,8.50,0.00,0.00,0.00,0.00,0.18,0.14,25.07,0.00,0.00,0.00,0.00,0.39,0.34,0.77,1",
						"318,8.50,0.00,0.00,0.00,0.00,0.18,0.14,25.02,0.00,0.00,0.00,0.00,0.38,0.31,0.23,0",
						"319,8.50,0.00,0.00,0.00,0.00,0.18,0.14,25.01,0.00,0.00,0.00,0.00,0.37,0.31,127.97,0",
						"320,33.00,3.00,94.00,91.00,12.00,98.00,33.00,61.00,35.00,68.00,62.00,94.00,60.00,68.00,174.50,0",
						"321,90.00,63.00,14.00,66.00,66.00,2.00,88.00,63.00,54.00,47.00,6.00,90.00,63.00,48.00,163.23,0",
						"322,6.00,31.00,61.00,92.00,68.00,64.00,25.00,24.00,86.00,32.00,35.00,1.00,58.00,58.00,137.72,0",
						"323,8.00,10.00,58.00,54.00,94.00,99.00,51.00,39.00,85.00,2.00,44.00,13.00,92.00,53.00,118.97,0",
						"324,5.00,50.00,53.00,13.00,74.00,76.00,26.00,30.00,29.00,21.00,7.00,57.00,44.00,68.00,135.93,0",
						"325,90.00,71.00,98.00,40.00,94.00,71.00,46.00,99.00,29.00,27.00,41.00,5.00,53.00,24.00,153.70,0",
						"326,25.00,87.00,53.00,84.00,78.00,63.00,81.00,69.00,73.00,6.00,31.00,77.00,9.00,69.00,148.09,0",
						"327,38.00,5.00,81.00,49.00,77.00,79.00,53.00,34.00,14.00,4.00,29.00,55.00,33.00,62.00,133.69,0",
						"328,24.00,0.00,67.00,15.00,11.00,56.00,44.00,7.00,72.00,18.00,12.00,76.00,50.00,84.00,128.38,0",
						"329,11.00,81.00,43.00,32.00,69.00,76.00,46.00,35.00,93.00,61.00,28.00,96.00,58.00,21.00,147.16,0",
						"330,33.00,41.00,67.00,48.00,51.00,16.00,51.00,51.00,70.00,9.00,1.00,21.00,33.00,64.00,140.07,0",
						"331,55.00,81.00,70.00,83.00,55.00,93.00,93.00,3.00,92.00,2.00,77.00,8.00,53.00,61.00,158.24,0",
						"332,55.00,58.00,7.00,82.00,41.00,30.00,82.00,44.00,48.00,62.00,34.00,97.00,7.00,98.00,159.18,0",
						"333,77.00,64.00,79.00,8.00,8.00,8.00,63.00,47.00,19.00,71.00,61.00,52.00,26.00,24.00,151.13,0",
						"334,20.00,42.00,58.00,63.00,5.00,69.00,94.00,64.00,97.00,37.00,66.00,40.00,89.00,73.00,155.73,0",
						"335,12.11,13.18,18.20,19.77,1.57,21.78,29.60,88.70,30.44,11.61,20.71,12.55,96.55,25.19,129.37,0",
						"336,9.60,4.00,5.52,6.00,0.48,6.73,9.08,96.57,9.24,3.52,6.29,3.81,98.95,9.96,65.54,0",
						"337,8.84,1.26,1.73,1.88,0.15,2.23,2.94,98.92,2.90,1.11,1.97,1.20,99.67,5.41,45.61,1",
						"338,8.60,0.38,0.53,0.57,0.05,0.80,0.99,99.67,0.88,0.34,0.60,0.36,99.90,3.96,3.88,0",
						"339,8.53,0.12,0.17,0.18,0.01,0.37,0.40,99.90,0.28,0.11,0.19,0.11,99.97,3.53,26.60,1",
						"340,8.51,0.04,0.05,0.05,0.00,0.23,0.22,99.97,0.08,0.03,0.06,0.03,99.99,3.39,0.37,0",
						"341,8.50,0.01,0.02,0.02,0.00,0.19,0.16,99.99,0.03,0.01,0.02,0.01,100.00,3.35,0.11,1",
						"342,8.50,0.00,0.00,0.01,0.00,0.18,0.15,100.00,0.01,0.00,0.01,0.00,100.00,3.33,0.04,0",
						"343,8.50,0.00,0.00,0.00,0.00,0.18,0.14,100.00,0.00,0.00,0.00,0.00,100.00,3.33,74.85,0",
						"344,13.99,0.00,0.00,0.00,0.00,0.19,0.15,42.71,0.00,0.00,0.00,0.00,31.51,1.14,43.37,1",
						"345,9.88,0.00,0.00,0.00,0.00,0.18,0.14,36.05,0.00,0.00,0.00,0.00,10.24,0.71,14.93,0",
						"346,8.57,0.00,0.00,0.00,0.00,0.18,0.14,33.92,0.00,0.00,0.00,0.00,3.45,0.57,4.90,1",
						"347,8.00,0.00,0.00,0.00,0.01,0.18,0.14,32.99,0.01,0.00,0.00,0.00,0.51,0.51,4.04,1",
						"348,8.34,0.00,0.00,0.00,0.00,0.18,0.14,27.51,0.00,0.00,0.00,0.00,0.41,0.37,3.74,0",
						"349,8.45,0.00,0.00,0.00,0.00,0.18,0.14,25.76,0.00,0.00,0.00,0.00,0.38,0.32,1.18,0",
						"350,8.49,0.00,0.00,0.00,0.00,0.18,0.14,25.24,0.00,0.00,0.00,0.00,0.37,0.31,99.34,0",
						"351,94.00,2.00,23.00,4.00,73.00,87.00,28.00,57.00,69.00,13.00,91.00,5.00,21.00,43.00,183.56,0",
						"352,15.00,70.00,86.00,31.00,5.00,6.00,60.00,6.00,2.00,18.00,39.00,63.00,2.00,74.00,170.85,0",
						"353,67.00,16.00,86.00,51.00,38.00,52.00,3.00,37.00,40.00,65.00,54.00,44.00,66.00,26.00,145.45,0",
						"354,49.00,59.00,56.00,93.00,92.00,64.00,62.00,44.00,21.00,7.00,98.00,61.00,82.00,77.00,142.26,0",
						"355,31.00,72.00,25.00,33.00,21.00,45.00,70.00,0.00,49.00,52.00,41.00,6.00,82.00,62.00,150.27,0",
						"356,2.00,97.00,86.00,37.00,93.00,13.00,51.00,19.00,80.00,5.00,65.00,96.00,93.00,54.00,153.45,0",
						"357,16.00,86.00,39.00,53.00,23.00,38.00,64.00,28.00,9.00,58.00,63.00,26.00,34.00,41.00,142.45,0",
						"358,51.00,75.00,18.00,4.00,20.00,77.00,81.00,79.00,4.00,84.00,33.00,35.00,67.00,77.00,134.86,0",
						"359,20.00,43.00,56.00,54.00,31.00,77.00,59.00,74.00,69.00,77.00,39.00,96.00,59.00,65.00,131.98,0",
						"360,17.00,69.00,84.00,20.00,15.00,8.00,20.00,5.00,76.00,23.00,10.00,99.00,69.00,24.00,133.09,0",
						"361,99.00,23.00,93.00,13.00,63.00,14.00,82.00,36.00,70.00,10.00,79.00,86.00,36.00,44.00,169.41,0",
						"362,11.00,56.00,26.00,48.00,59.00,86.00,57.00,32.00,5.00,56.00,69.00,70.00,17.00,82.00,157.83,0",
						"363,71.00,62.00,84.00,0.00,88.00,9.00,77.00,59.00,34.00,16.00,44.00,0.00,54.00,48.00,145.71,0",
						"364,75.00,26.00,48.00,15.00,83.00,30.00,34.00,49.00,11.00,28.00,4.00,38.00,83.00,60.00,134.85,0",
						"365,57.00,59.00,4.00,24.00,91.00,67.00,38.00,33.00,85.00,51.00,24.00,77.00,54.00,46.00,144.12,0",
						"366,73.00,97.00,70.00,93.00,2.00,23.00,65.00,35.00,31.00,83.00,4.00,21.00,95.00,6.00,162.69,0",
						"367,81.00,53.00,83.00,96.00,87.00,76.00,69.00,1.00,38.00,70.00,70.00,67.00,97.00,14.00,167.98,0",
						"368,31.25,16.63,26.05,30.13,27.31,23.97,21.75,68.93,11.93,21.97,21.97,21.03,99.06,6.68,103.33,0",
						"369,15.41,5.05,7.91,9.14,8.29,7.40,6.70,90.57,3.62,6.67,6.67,6.38,99.71,4.34,32.22,0",
						"370,10.67,1.58,2.48,2.87,2.60,2.44,2.20,97.04,1.14,2.09,2.09,2.00,99.91,3.65,62.78,0",
						"371,9.16,0.48,0.75,0.87,0.79,0.86,0.76,99.10,0.34,0.64,0.64,0.61,99.97,3.42,19.70,0",
						"372,8.71,0.15,0.24,0.27,0.25,0.39,0.33,99.72,0.11,0.20,0.20,0.19,99.99,3.36,62.65,0",
						"373,8.56,0.05,0.07,0.08,0.08,0.24,0.20,99.91,0.03,0.06,0.06,0.06,100.00,3.34,19.66,0",
						"374,8.52,0.01,0.02,0.03,0.02,0.19,0.16,99.97,0.01,0.02,0.02,0.02,100.00,3.33,81.39,0",
						"375,32.80,12.87,3.77,17.26,21.97,8.28,19.24,43.67,21.03,13.50,28.56,19.15,13.21,2.55,116.71,0",
						"376,15.53,3.91,1.14,5.24,6.67,2.63,5.93,36.24,6.38,4.10,8.67,5.81,4.36,1.13,37.00,0",
						"377,10.36,1.23,0.36,1.64,2.09,0.95,1.96,34.02,2.00,1.29,2.72,1.82,1.71,0.70,62.57,0",
						"378,8.74,0.38,0.11,0.52,0.66,0.42,0.71,33.32,0.63,0.40,0.85,0.57,0.88,0.57,19.62,0",
						"379,8.22,0.12,0.03,0.16,0.20,0.25,0.31,33.10,0.19,0.12,0.26,0.17,0.61,0.53,6.06,0",
						"380,8.07,0.04,0.01,0.05,0.06,0.20,0.19,33.03,0.06,0.04,0.08,0.05,0.54,0.51,46.51,0",
						"381,8.37,0.01,0.00,0.02,0.02,0.18,0.15,27.52,0.02,0.01,0.03,0.02,0.42,0.37,109.68,0",
						"382,78.00,84.00,31.00,42.00,64.00,8.00,4.00,52.00,5.00,71.00,74.00,71.00,69.00,30.00,173.71,0",
						"383,55.00,36.00,35.00,19.00,24.00,0.00,73.00,78.00,31.00,57.00,69.00,60.00,74.00,17.00,137.09,0",
						"384,66.00,28.00,65.00,50.00,69.00,87.00,92.00,50.00,30.00,90.00,13.00,95.00,87.00,41.00,153.56,0",
						"385,36.00,59.00,39.00,74.00,36.00,98.00,17.00,52.00,91.00,29.00,72.00,88.00,23.00,20.00,141.07,0",
						"386,79.00,11.00,39.00,75.00,34.00,94.00,85.00,87.00,99.00,39.00,45.00,63.00,80.00,60.00,143.11,0",
						"387,76.00,82.00,46.00,50.00,40.00,29.00,82.00,95.00,3.00,14.00,73.00,69.00,88.00,5.00,161.08,0",
						"388,17.00,20.00,41.00,69.00,64.00,91.00,7.00,38.00,45.00,4.00,24.00,98.00,41.00,9.00,140.75,0",
						"389,71.00,35.00,61.00,70.00,67.00,34.00,33.00,73.00,77.00,18.00,30.00,58.00,60.00,15.00,140.06,0",
						"390,5.00,69.00,7.00,13.00,8.00,65.00,66.00,0.00,78.00,75.00,43.00,31.00,31.00,24.00,161.16,0",
						"391,96.00,58.00,86.00,92.00,37.00,81.00,50.00,92.00,27.00,82.00,96.00,35.00,28.00,70.00,173.21,0",
						"392,43.00,5.00,31.00,57.00,11.00,17.00,41.00,73.00,92.00,65.00,18.00,82.00,79.00,8.00,157.67,0",
						"393,18.00,0.00,3.00,80.00,12.00,32.00,14.00,13.00,36.00,40.00,43.00,15.00,80.00,30.00,171.39,0",
						"394,88.00,40.00,45.00,45.00,24.00,62.00,89.00,69.00,99.00,60.00,41.00,89.00,2.00,55.00,159.74,0",
						"395,26.00,94.00,14.00,41.00,25.00,2.00,63.00,58.00,7.00,74.00,49.00,84.00,27.00,65.00,143.94,0",
						"396,23.00,53.00,51.00,3.00,0.00,31.00,95.00,91.00,70.00,20.00,36.00,70.00,19.00,55.00,150.13,0",
						"397,8.00,80.00,18.00,52.00,88.00,49.00,8.00,55.00,59.00,60.00,1.00,0.00,83.00,24.00,159.20,0",
						"398,0.00,32.00,79.00,92.00,48.00,16.00,2.00,17.00,4.00,25.00,90.00,40.00,73.00,7.00,159.89,0",
						"399,65.00,77.00,81.00,38.00,42.00,64.00,12.00,34.00,41.00,98.00,64.00,74.00,21.00,60.00,162.06,0",
						"400,10.00,49.00,47.00,36.00,18.00,3.00,19.00,86.00,72.00,15.00,19.00,11.00,24.00,14.00,126.32,0",
						"401,8.97,15.38,14.75,11.30,5.65,1.06,6.06,95.61,22.60,4.71,5.96,3.45,76.15,6.68,132.09,0",
						"402,6.00,50.00,54.00,97.00,57.00,10.00,91.00,5.00,20.00,22.00,48.00,45.00,16.00,70.00,185.10,0",
						"403,7.72,15.69,16.95,30.44,17.89,3.26,28.66,70.18,6.28,6.90,15.07,14.12,73.64,24.25,140.34,0",
						"404,53.00,93.00,21.00,95.00,34.00,70.00,39.00,22.00,64.00,45.00,94.00,72.00,16.00,32.00,185.47,0",
						"405,22.47,29.19,6.59,29.82,10.67,22.09,12.33,75.52,20.09,14.12,29.50,22.60,73.64,12.33,147.05,0",
						"406,82.00,4.00,98.00,26.00,48.00,18.00,64.00,68.00,85.00,51.00,27.00,13.00,21.00,44.00,174.31,0",
						"407,10.00,7.00,96.00,99.00,3.00,48.00,51.00,9.00,98.00,26.00,71.00,60.00,71.00,16.00,170.05,0",
						"408,8.63,2.20,30.13,31.07,0.94,15.18,16.10,25.47,30.76,8.16,22.28,18.83,22.63,5.37,130.47,0",
						"409,91.00,0.00,53.00,73.00,58.00,78.00,27.00,72.00,25.00,49.00,83.00,57.00,98.00,50.00,180.80,0",
						"410,34.05,0.00,16.63,22.91,18.20,24.60,8.57,45.24,7.85,15.38,26.05,17.89,31.10,16.04,102.55,0",
						"411,16.18,0.00,5.22,7.19,5.71,7.84,2.78,36.84,2.46,4.83,8.18,5.61,10.10,5.38,112.00,0",
						"412,14.00,4.00,60.00,54.00,75.00,13.00,63.00,78.00,44.00,77.00,11.00,38.00,15.00,51.00,154.47,0",
						"413,84.00,60.00,73.00,90.00,5.00,3.00,39.00,73.00,94.00,38.00,77.00,62.00,26.00,77.00,171.51,0",
						"414,7.00,54.00,60.00,8.00,1.00,24.00,71.00,50.00,97.00,1.00,98.00,99.00,24.00,48.00,162.73,0",
						"415,59.00,78.00,54.00,96.00,31.00,27.00,55.00,95.00,84.00,85.00,18.00,40.00,12.00,36.00,167.01,0",
						"416,94.00,85.00,66.00,89.00,40.00,60.00,88.00,35.00,43.00,68.00,38.00,58.00,31.00,41.00,118.74,0",
						"417,89.00,51.00,34.00,8.00,96.00,56.00,78.00,92.00,81.00,86.00,71.00,63.00,30.00,41.00,144.81,0",
						"418,1.00,16.00,78.00,39.00,5.00,99.00,30.00,97.00,60.00,87.00,72.00,23.00,34.00,45.00,151.39,0",
						"419,43.00,71.00,66.00,66.00,83.00,70.00,48.00,86.00,96.00,83.00,36.00,32.00,34.00,45.00,155.10,0",
						"420,69.00,60.00,10.00,16.00,41.00,69.00,52.00,51.00,27.00,17.00,70.00,81.00,20.00,36.00,132.35,0",
						"421,25.00,29.00,44.00,37.00,96.00,65.00,1.00,43.00,13.00,56.00,14.00,72.00,21.00,84.00,133.01,0",
						"422,26.00,95.00,56.00,56.00,4.00,4.00,10.00,21.00,8.00,50.00,13.00,72.00,27.00,42.00,133.65,0",
						"423,62.00,52.00,35.00,7.00,39.00,30.00,14.00,1.00,63.00,59.00,80.00,78.00,30.00,9.00,166.14,0",
						"424,26.00,32.00,89.00,90.00,82.00,6.00,74.00,54.00,26.00,15.00,97.00,20.00,60.00,89.00,184.46,0",
						"425,77.00,69.00,83.00,49.00,14.00,94.00,5.00,91.00,45.00,60.00,16.00,50.00,39.00,57.00,159.12,0",
						"426,76.00,40.00,28.00,24.00,58.00,81.00,94.00,22.00,56.00,69.00,26.00,1.00,85.00,3.00,157.83,0",
						"427,78.00,66.00,32.00,11.00,86.00,80.00,37.00,24.00,18.00,92.00,74.00,93.00,76.00,88.00,164.49,0",
						"428,54.00,19.00,76.00,71.00,36.00,5.00,87.00,19.00,80.00,55.00,42.00,86.00,2.00,79.00,148.23,0",
						"429,96.00,67.00,86.00,5.00,63.00,71.00,69.00,15.00,77.00,88.00,42.00,30.00,26.00,61.00,161.63,0",
						"430,31.00,9.00,19.00,90.00,15.00,8.00,89.00,3.00,4.00,36.00,32.00,45.00,81.00,74.00,168.72,0",
						"431,56.00,77.00,10.00,73.00,65.00,10.00,93.00,70.00,51.00,5.00,77.00,15.00,8.00,12.00,176.46,0",
						"432,10.00,60.00,95.00,57.00,83.00,34.00,3.00,49.00,96.00,33.00,0.00,50.00,8.00,86.00,166.18,0",
						"433,87.00,45.00,72.00,2.00,87.00,16.00,71.00,6.00,5.00,48.00,21.00,29.00,38.00,87.00,172.05,0",
						"434,55.00,35.00,31.00,45.00,21.00,8.00,7.00,41.00,78.00,85.00,47.00,11.00,21.00,22.00,147.40,0",
						"435,92.00,54.00,1.00,54.00,11.00,44.00,44.00,72.00,1.00,69.00,61.00,12.00,75.00,78.00,157.92,0",
						"436,52.00,33.00,0.00,2.00,7.00,33.00,17.00,0.00,94.00,28.00,91.00,64.00,5.00,29.00,174.81,0",
						"437,68.00,23.00,98.00,40.00,85.00,42.00,38.00,53.00,76.00,78.00,8.00,90.00,73.00,56.00,171.75,0",
						"438,5.00,85.00,59.00,40.00,76.00,64.00,85.00,16.00,34.00,11.00,71.00,35.00,58.00,10.00,154.95,0",
						"439,83.00,71.00,15.00,56.00,37.00,12.00,62.00,50.00,7.00,67.00,95.00,67.00,75.00,68.00,165.41,0",
						"440,49.00,38.00,35.00,4.00,46.00,53.00,82.00,26.00,58.00,6.00,37.00,21.00,91.00,17.00,155.52,0",
						"441,5.00,15.00,29.00,88.00,96.00,73.00,64.00,84.00,87.00,52.00,10.00,47.00,22.00,52.00,170.52,0",
						"442,77.00,51.00,24.00,20.00,47.00,7.00,67.00,25.00,8.00,81.00,92.00,24.00,21.00,13.00,170.44,0",
						"443,35.00,3.00,98.00,84.00,5.00,84.00,95.00,29.00,96.00,27.00,88.00,21.00,45.00,37.00,180.62,0",
						"444,67.00,13.00,82.00,69.00,71.00,55.00,78.00,31.00,17.00,21.00,20.00,40.00,60.00,97.00,136.57,0",
						"445,8.00,78.00,23.00,63.00,57.00,24.00,51.00,48.00,2.00,78.00,63.00,45.00,68.00,95.00,153.56,0",
						"446,20.00,68.00,36.00,20.00,82.00,95.00,67.00,39.00,85.00,12.00,30.00,60.00,77.00,16.00,143.10,0",
						"447,24.00,96.00,24.00,49.00,87.00,67.00,42.00,18.00,6.00,4.00,79.00,61.00,22.00,53.00,137.71,0",
						"448,99.00,85.00,45.00,60.00,35.00,97.00,36.00,6.00,50.00,26.00,41.00,50.00,83.00,17.00,144.36,0",
						"449,79.00,69.00,13.00,41.00,54.00,2.00,82.00,8.00,56.00,57.00,91.00,28.00,11.00,22.00,148.23,0",
						"450,25.00,86.00,69.00,40.00,89.00,47.00,81.00,8.00,33.00,52.00,72.00,49.00,61.00,32.00,149.87,0",
						"451,28.00,44.00,6.00,12.00,6.00,65.00,50.00,46.00,6.00,16.00,18.00,79.00,68.00,11.00,152.38,0",
						"452,62.00,24.00,54.00,22.00,57.00,88.00,28.00,37.00,46.00,85.00,34.00,35.00,58.00,64.00,119.01,0",
						"453,44.00,62.00,49.00,23.00,20.00,99.00,33.00,6.00,22.00,19.00,44.00,93.00,48.00,77.00,115.44,0",
						"454,86.00,66.00,58.00,36.00,42.00,74.00,8.00,33.00,52.00,43.00,23.00,59.00,33.00,18.00,121.74,0",
						"455,90.00,13.00,95.00,86.00,93.00,24.00,75.00,57.00,21.00,59.00,40.00,22.00,8.00,37.00,157.29,0",
						"456,86.00,13.00,24.00,55.00,40.00,44.00,99.00,41.00,61.00,66.00,5.00,51.00,9.00,58.00,147.48,0",
						"457,29.00,85.00,84.00,50.00,47.00,79.00,59.00,93.00,15.00,13.00,42.00,56.00,27.00,91.00,147.88,0",
						"458,95.00,9.00,87.00,49.00,6.00,82.00,78.00,86.00,92.00,30.00,82.00,59.00,93.00,45.00,161.13,0",
						"459,65.00,18.00,48.00,6.00,87.00,8.00,29.00,77.00,99.00,33.00,14.00,7.00,45.00,76.00,178.85,0",
						"460,65.00,83.00,27.00,27.00,43.00,87.00,40.00,21.00,86.00,80.00,42.00,90.00,36.00,27.00,163.09,0",
						"461,56.00,52.00,19.00,9.00,52.00,36.00,85.00,70.00,0.00,33.00,41.00,11.00,20.00,57.00,140.92,0",
						"462,81.00,29.00,88.00,12.00,47.00,22.00,7.00,28.00,31.00,7.00,46.00,7.00,63.00,36.00,142.07,0",
						"463,37.00,64.00,54.00,4.00,52.00,65.00,26.00,76.00,99.00,17.00,21.00,44.00,96.00,34.00,147.82,0",
						"464,24.00,4.00,53.00,5.00,23.00,2.00,3.00,23.00,33.00,90.00,16.00,49.00,79.00,2.00,180.03,0",
						"465,70.00,40.00,44.00,16.00,37.00,92.00,41.00,41.00,99.00,38.00,68.00,17.00,0.00,51.00,141.34,0",
						"466,35.00,57.00,28.00,96.00,61.00,61.00,45.00,45.00,76.00,32.00,2.00,11.00,15.00,65.00,134.18,0",
						"467,30.00,7.00,88.00,88.00,80.00,72.00,75.00,58.00,3.00,60.00,37.00,77.00,33.00,35.00,156.68,0",
						"468,63.00,80.00,32.00,97.00,79.00,0.00,32.00,83.00,21.00,81.00,86.00,92.00,49.00,80.00,165.25,0",
						"469,91.00,86.00,53.00,21.00,90.00,96.00,85.00,64.00,51.00,83.00,54.00,25.00,27.00,75.00,155.55,0",
						"470,11.00,78.00,57.00,39.00,4.00,61.00,84.00,16.00,74.00,67.00,71.00,75.00,81.00,68.00,157.38,0",
						"471,59.00,22.00,72.00,81.00,23.00,74.00,6.00,81.00,82.00,47.00,26.00,23.00,59.00,41.00,145.91,0",
						"472,38.00,32.00,85.00,86.00,82.00,73.00,27.00,92.00,67.00,13.00,70.00,74.00,11.00,67.00,146.35,0",
						"473,42.00,39.00,26.00,82.00,23.00,0.00,27.00,64.00,57.00,48.00,91.00,61.00,79.00,90.00,145.66,0",
						"474,8.00,33.00,57.00,53.00,43.00,82.00,14.00,3.00,94.00,49.00,92.00,13.00,60.00,62.00,158.37,0",
						"475,51.00,59.00,6.00,71.00,69.00,25.00,95.00,55.00,72.00,25.00,10.00,57.00,15.00,56.00,155.48,0",
						"476,20.00,45.00,62.00,61.00,57.00,57.00,93.00,97.00,88.00,0.00,52.00,41.00,91.00,52.00,134.06,0",
						"477,80.00,73.00,38.00,70.00,36.00,90.00,15.00,64.00,54.00,76.00,3.00,39.00,69.00,26.00,146.71,0",
						"478,15.00,44.00,57.00,50.00,97.00,97.00,5.00,52.00,35.00,40.00,98.00,43.00,39.00,27.00,132.94,0",
						"479,80.00,85.00,30.00,79.00,58.00,77.00,50.00,32.00,47.00,15.00,83.00,14.00,24.00,87.00,122.95,0",
						"480,21.00,43.00,2.00,10.00,40.00,8.00,40.00,86.00,34.00,1.00,18.00,76.00,94.00,62.00,164.94,0",
						"481,37.00,21.00,82.00,76.00,51.00,95.00,94.00,97.00,59.00,58.00,4.00,28.00,62.00,43.00,164.99,0",
						"482,69.00,37.00,69.00,11.00,42.00,65.00,31.00,85.00,76.00,29.00,55.00,72.00,2.00,90.00,155.41,0",
						"483,7.00,5.00,16.00,86.00,17.00,57.00,2.00,42.00,3.00,85.00,55.00,47.00,26.00,42.00,145.09,0",
						"484,68.00,78.00,19.00,53.00,57.00,48.00,41.00,77.00,66.00,99.00,48.00,40.00,32.00,57.00,127.20,0",
						"485,3.00,27.00,50.00,55.00,18.00,74.00,59.00,5.00,6.00,85.00,58.00,53.00,21.00,29.00,135.89,0",
						"486,42.00,33.00,24.00,54.00,29.00,75.00,52.00,1.00,31.00,52.00,49.00,91.00,8.00,76.00,120.26,0",
						"487,21.00,94.00,2.00,42.00,36.00,49.00,18.00,48.00,73.00,35.00,70.00,34.00,22.00,99.00,165.78,0",
						"488,96.00,9.00,86.00,51.00,26.00,70.00,24.00,62.00,1.00,81.00,35.00,52.00,48.00,16.00,152.65,0",
						"489,89.00,2.00,25.00,8.00,62.00,68.00,48.00,52.00,37.00,80.00,78.00,93.00,38.00,88.00,154.34,0",
						"490,10.00,19.00,62.00,88.00,54.00,58.00,40.00,93.00,95.00,91.00,39.00,62.00,30.00,14.00,164.24,0",
						"491,58.00,58.00,19.00,77.00,40.00,70.00,74.00,4.00,23.00,21.00,46.00,93.00,78.00,94.00,169.85,0",
						"492,77.00,18.00,56.00,34.00,61.00,14.00,77.00,28.00,9.00,12.00,41.00,6.00,41.00,16.00,150.06,0",
						"493,48.00,30.00,56.00,76.00,60.00,53.00,33.00,51.00,54.00,19.00,41.00,50.00,12.00,98.00,130.96,0",
						"494,78.00,43.00,64.00,25.00,52.00,91.00,34.00,61.00,73.00,47.00,9.00,83.00,89.00,64.00,127.89,0",
						"495,99.00,27.00,9.00,56.00,20.00,86.00,65.00,33.00,52.00,15.00,52.00,53.00,84.00,65.00,128.81,0",
						"496,78.00,96.00,5.00,41.00,6.00,83.00,91.00,18.00,3.00,53.00,14.00,84.00,54.00,95.00,162.87,0",
						"497,98.00,28.00,45.00,29.00,48.00,90.00,94.00,56.00,66.00,29.00,99.00,44.00,44.00,20.00,131.94,0",
						"498,38.00,88.00,30.00,20.00,99.00,37.00,58.00,41.00,33.00,4.00,54.00,33.00,78.00,23.00,139.72,0",
						"499,51.00,75.00,98.00,46.00,93.00,25.00,51.00,34.00,75.00,43.00,80.00,0.00,7.00,9.00,150.48,0",
						"500,72.00,26.00,91.00,75.00,54.00,44.00,11.00,67.00,10.00,44.00,67.00,19.00,87.00,23.00,157.85,0",
						"501,18.00,94.00,73.00,60.00,5.00,59.00,59.00,24.00,21.00,29.00,13.00,49.00,11.00,81.00,152.10,0",
						"502,80.00,67.00,2.00,88.00,58.00,25.00,29.00,52.00,1.00,44.00,4.00,24.00,28.00,20.00,169.10,0",
						"503,44.00,5.00,61.00,35.00,74.00,9.00,87.00,86.00,99.00,35.00,12.00,0.00,83.00,83.00,150.05,0",
						"504,12.00,54.00,46.00,16.00,64.00,6.00,52.00,99.00,77.00,31.00,9.00,32.00,66.00,81.00,129.27,0",
						"505,28.00,65.00,81.00,14.00,29.00,23.00,10.00,58.00,35.00,94.00,13.00,49.00,63.00,59.00,139.82,0",
						"506,54.00,67.00,79.00,53.00,4.00,95.00,91.00,17.00,6.00,93.00,73.00,7.00,31.00,34.00,147.37,0",
						"507,65.00,70.00,81.00,91.00,16.00,36.00,24.00,51.00,11.00,32.00,62.00,22.00,0.00,57.00,153.86,0",
						"508,51.00,79.00,60.00,68.00,51.00,96.00,40.00,53.00,88.00,41.00,25.00,95.00,98.00,75.00,143.43,0",
						"509,16.00,50.00,74.00,36.00,48.00,99.00,22.00,49.00,95.00,83.00,23.00,92.00,0.00,4.00,154.93,0",
						"510,90.00,99.00,46.00,77.00,81.00,61.00,2.00,17.00,65.00,16.00,78.00,60.00,1.00,13.00,148.92,0",
						"511,42.00,86.00,34.00,33.00,89.00,93.00,67.00,48.00,34.00,18.00,10.00,24.00,66.00,15.00,145.38,0",
						"512,12.00,67.00,5.00,48.00,33.00,43.00,12.00,4.00,10.00,64.00,85.00,39.00,87.00,67.00,142.74,0",
						"513,26.00,6.00,27.00,18.00,9.00,67.00,88.00,35.00,18.00,4.00,42.00,43.00,43.00,75.00,151.65,0",
						"514,87.00,52.00,28.00,84.00,4.00,50.00,98.00,19.00,35.00,35.00,51.00,60.00,4.00,83.00,135.64,0",
						"515,77.00,17.00,2.00,73.00,16.00,71.00,82.00,68.00,62.00,77.00,72.00,72.00,32.00,55.00,119.53,0",
						"516,7.00,99.00,43.00,67.00,20.00,8.00,50.00,54.00,7.00,80.00,8.00,81.00,52.00,70.00,141.49,0",
						"517,22.00,47.00,21.00,18.00,66.00,63.00,41.00,97.00,95.00,19.00,46.00,87.00,81.00,97.00,164.73,0",
						"518,64.00,61.00,69.00,82.00,53.00,93.00,14.00,93.00,70.00,9.00,99.00,77.00,44.00,62.00,152.82,0",
						"519,85.00,91.00,93.00,38.00,54.00,67.00,17.00,5.00,64.00,26.00,28.00,15.00,80.00,46.00,144.15,0",
						"520,98.00,63.00,10.00,38.00,70.00,93.00,9.00,72.00,74.00,34.00,32.00,34.00,63.00,59.00,129.77,0",
						"521,52.00,69.00,92.00,26.00,39.00,97.00,1.00,48.00,91.00,89.00,6.00,60.00,19.00,58.00,163.60,0",
						"522,27.00,25.00,30.00,52.00,91.00,32.00,76.00,65.00,37.00,9.00,95.00,23.00,20.00,5.00,157.67,0",
						"523,81.00,17.00,70.00,17.00,29.00,42.00,52.00,89.00,16.00,9.00,68.00,92.00,24.00,89.00,153.32,0",
						"524,34.00,15.00,87.00,29.00,11.00,9.00,34.00,17.00,65.00,63.00,77.00,57.00,57.00,45.00,141.68,0",
						"525,12.00,61.00,3.00,34.00,29.00,70.00,79.00,80.00,97.00,67.00,9.00,80.00,45.00,81.00,154.14,0",
						"526,78.00,57.00,89.00,75.00,71.00,83.00,68.00,81.00,39.00,40.00,59.00,48.00,4.00,23.00,156.93,0",
						"527,32.00,78.00,79.00,25.00,91.00,92.00,73.00,29.00,80.00,58.00,23.00,63.00,96.00,70.00,152.12,0",
						"528,18.00,86.00,55.00,57.00,52.00,80.00,15.00,99.00,11.00,75.00,30.00,98.00,63.00,53.00,143.07,0",
						"529,98.00,43.00,4.00,32.00,89.00,49.00,58.00,16.00,17.00,62.00,56.00,46.00,38.00,4.00,145.85,0",
						"530,25.00,60.00,59.00,1.00,17.00,95.00,80.00,44.00,93.00,36.00,82.00,45.00,34.00,67.00,144.92,0",
						"531,69.00,99.00,84.00,1.00,58.00,92.00,8.00,74.00,17.00,33.00,58.00,87.00,25.00,92.00,162.21,0",
						"532,37.00,10.00,4.00,1.00,25.00,52.00,62.00,17.00,28.00,95.00,38.00,42.00,13.00,38.00,168.90,0",
						"533,13.00,40.00,90.00,87.00,46.00,96.00,84.00,16.00,60.00,84.00,9.00,25.00,86.00,59.00,145.86,0",
						"534,96.00,73.00,88.00,39.00,8.00,83.00,76.00,0.00,27.00,86.00,4.00,11.00,45.00,26.00,150.25,0",
						"535,80.00,44.00,49.00,10.00,16.00,90.00,25.00,11.00,11.00,2.00,25.00,61.00,59.00,87.00,175.52,0",
						"536,87.00,41.00,93.00,57.00,38.00,44.00,58.00,53.00,85.00,67.00,91.00,45.00,92.00,8.00,158.16,0",
						"537,54.00,5.00,80.00,81.00,69.00,53.00,0.00,68.00,73.00,21.00,44.00,7.00,69.00,20.00,148.71,0",
						"538,11.00,53.00,24.00,70.00,26.00,19.00,58.00,14.00,42.00,77.00,70.00,87.00,63.00,77.00,150.37,0",
						"539,21.00,81.00,35.00,19.00,71.00,64.00,31.00,2.00,51.00,10.00,18.00,35.00,85.00,91.00,150.73,0",
						"540,71.00,96.00,8.00,51.00,4.00,60.00,19.00,23.00,61.00,9.00,89.00,48.00,48.00,43.00,142.04,0",
						"541,32.00,56.00,88.00,29.00,47.00,7.00,76.00,78.00,12.00,4.00,76.00,7.00,17.00,6.00,176.12,0",
						"542,12.00,60.00,34.00,62.00,34.00,72.00,77.00,78.00,86.00,17.00,3.00,94.00,29.00,17.00,170.69,0",
						"543,6.00,67.00,50.00,40.00,65.00,14.00,54.00,3.00,91.00,60.00,96.00,31.00,84.00,9.00,162.93,0",
						"544,8.00,79.00,82.00,33.00,56.00,10.00,88.00,51.00,36.00,81.00,90.00,69.00,52.00,73.00,130.80,0",
						"545,92.00,97.00,90.00,94.00,81.00,75.00,98.00,33.00,65.00,64.00,82.00,84.00,98.00,83.00,178.33,0",
						"546,37.00,43.00,56.00,27.00,55.00,42.00,68.00,80.00,68.00,86.00,7.00,82.00,86.00,2.00,152.11,0",
						"547,68.00,65.00,47.00,60.00,39.00,67.00,80.00,56.00,95.00,69.00,63.00,57.00,43.00,69.00,120.40,0",
						"548,19.00,58.00,57.00,84.00,29.00,49.00,7.00,97.00,9.00,72.00,10.00,22.00,36.00,44.00,134.53,0",
						"549,65.00,47.00,88.00,39.00,8.00,61.00,90.00,85.00,44.00,48.00,15.00,20.00,42.00,9.00,152.30,0",
						"550,26.00,17.00,7.00,11.00,59.00,3.00,50.00,76.00,88.00,59.00,46.00,9.00,17.00,61.00,146.89,0",
						"551,12.00,96.00,58.00,47.00,85.00,70.00,82.00,89.00,88.00,5.00,53.00,53.00,70.00,79.00,151.30,0",
						"552,34.00,92.00,39.00,78.00,33.00,49.00,2.00,88.00,52.00,66.00,43.00,51.00,37.00,26.00,133.83,0",
						"553,88.00,13.00,25.00,94.00,46.00,21.00,48.00,32.00,41.00,91.00,36.00,34.00,6.00,74.00,156.77,0",
						"554,12.00,52.00,38.00,54.00,86.00,90.00,91.00,0.00,90.00,32.00,68.00,54.00,63.00,7.00,139.00,0",
						"555,14.00,91.00,35.00,89.00,82.00,91.00,83.00,18.00,15.00,61.00,41.00,87.00,17.00,86.00,158.31,0",
						"556,45.00,80.00,48.00,64.00,4.00,25.00,39.00,83.00,67.00,16.00,32.00,67.00,61.00,63.00,141.72,0",
						"557,4.00,63.00,91.00,22.00,77.00,70.00,97.00,57.00,88.00,17.00,95.00,65.00,65.00,81.00,162.53,0",
						"558,14.00,12.00,26.00,15.00,46.00,25.00,44.00,54.00,11.00,9.00,17.00,35.00,41.00,96.00,153.29,0",
						"559,72.00,16.00,40.00,82.00,87.00,0.00,34.00,15.00,22.00,80.00,12.00,22.00,41.00,80.00,153.32,0",
						"560,39.00,34.00,83.00,36.00,61.00,74.00,11.00,61.00,59.00,99.00,60.00,56.00,52.00,55.00,116.16,0",
						"561,58.00,78.00,15.00,89.00,61.00,59.00,17.00,49.00,52.00,61.00,42.00,75.00,7.00,52.00,117.68,0",
						"562,42.00,72.00,37.00,4.00,85.00,72.00,21.00,63.00,44.00,13.00,89.00,46.00,56.00,73.00,134.48,0",
						"563,58.00,22.00,96.00,9.00,35.00,88.00,98.00,12.00,29.00,63.00,35.00,87.00,44.00,70.00,146.10,0",
						"564,92.00,37.00,54.00,10.00,90.00,26.00,89.00,1.00,74.00,48.00,7.00,5.00,79.00,31.00,160.77,0",
						"565,4.00,76.00,40.00,43.00,1.00,81.00,33.00,37.00,67.00,21.00,18.00,67.00,6.00,48.00,163.52,0",
						"566,39.00,72.00,50.00,59.00,96.00,0.00,29.00,3.00,44.00,28.00,9.00,15.00,46.00,99.00,159.87,0",
						"567,57.00,82.00,44.00,78.00,83.00,24.00,44.00,18.00,96.00,53.00,78.00,51.00,96.00,5.00,163.10,0",
						"568,15.00,12.00,58.00,35.00,87.00,38.00,15.00,63.00,66.00,90.00,71.00,90.00,21.00,96.00,153.06,0",
						"569,60.00,26.00,41.00,14.00,99.00,55.00,57.00,90.00,51.00,42.00,20.00,80.00,5.00,21.00,137.83,0",
						"570,59.00,40.00,66.00,84.00,93.00,57.00,83.00,23.00,49.00,23.00,70.00,44.00,25.00,58.00,137.90,0",
						"571,23.00,83.00,4.00,84.00,90.00,82.00,31.00,72.00,85.00,75.00,41.00,49.00,43.00,7.00,156.75,0",
						"572,32.00,19.00,3.00,93.00,17.00,40.00,18.00,34.00,3.00,12.00,67.00,64.00,57.00,79.00,163.15,0",
						"573,84.00,81.00,82.00,37.00,3.00,59.00,97.00,28.00,81.00,6.00,35.00,89.00,72.00,83.00,182.81,0",
						"574,72.00,9.00,79.00,93.00,52.00,26.00,6.00,82.00,18.00,7.00,91.00,38.00,38.00,28.00,175.01,0",
						"575,64.00,7.00,37.00,4.00,73.00,73.00,81.00,41.00,18.00,26.00,65.00,14.00,26.00,52.00,165.07,0",
						"576,18.00,57.00,82.00,86.00,11.00,2.00,89.00,40.00,87.00,93.00,45.00,47.00,88.00,96.00,161.49,0",
						"577,94.00,30.00,6.00,9.00,84.00,59.00,19.00,87.00,88.00,77.00,82.00,8.00,24.00,95.00,183.18,0",
						"578,54.00,44.00,80.00,90.00,16.00,0.00,88.00,97.00,73.00,94.00,46.00,42.00,58.00,68.00,160.78,0",
						"579,14.00,76.00,55.00,36.00,31.00,40.00,47.00,44.00,50.00,53.00,10.00,11.00,5.00,98.00,143.51,0",
						"580,9.00,44.00,93.00,74.00,82.00,94.00,76.00,14.00,0.00,74.00,34.00,47.00,86.00,71.00,167.06,0",
						"581,97.00,14.00,37.00,79.00,4.00,78.00,10.00,42.00,85.00,26.00,56.00,87.00,54.00,8.00,175.60,0",
						"582,42.00,18.00,5.00,10.00,81.00,11.00,57.00,15.00,61.00,94.00,37.00,2.00,64.00,60.00,160.30,0",
						"583,20.00,96.00,67.00,37.00,11.00,8.00,12.00,59.00,23.00,48.00,37.00,51.00,72.00,38.00,158.24,0",
						"584,87.00,84.00,59.00,17.00,40.00,57.00,44.00,46.00,67.00,8.00,63.00,75.00,1.00,10.00,140.68,0",
						"585,28.00,3.00,98.00,33.00,23.00,41.00,51.00,45.00,71.00,95.00,98.00,22.00,35.00,67.00,150.20,0",
						"586,12.00,31.00,1.00,73.00,62.00,30.00,75.00,2.00,67.00,72.00,69.00,54.00,11.00,0.00,144.14,0",
						"587,69.00,26.00,44.00,46.00,64.00,5.00,39.00,13.00,81.00,49.00,50.00,71.00,27.00,93.00,138.26,0",
						"588,25.00,74.00,64.00,10.00,55.00,66.00,96.00,83.00,66.00,64.00,85.00,66.00,39.00,58.00,140.63,0",
						"589,68.00,26.00,33.00,53.00,26.00,90.00,13.00,60.00,23.00,84.00,11.00,72.00,35.00,60.00,156.95,0",
						"590,84.00,75.00,47.00,56.00,71.00,46.00,34.00,37.00,59.00,11.00,76.00,36.00,90.00,69.00,147.83,0",
						"591,9.00,62.00,13.00,60.00,35.00,90.00,8.00,96.00,70.00,86.00,5.00,30.00,37.00,60.00,152.83,0",
						"592,41.00,10.00,50.00,47.00,70.00,80.00,36.00,25.00,85.00,74.00,41.00,5.00,79.00,71.00,129.87,0",
						"593,98.00,64.00,16.00,86.00,55.00,93.00,39.00,46.00,35.00,33.00,81.00,46.00,53.00,63.00,135.06,0",
						"594,55.00,88.00,59.00,53.00,6.00,7.00,16.00,93.00,19.00,3.00,93.00,88.00,42.00,59.00,143.81,0",
						"595,17.00,46.00,40.00,25.00,17.00,47.00,94.00,56.00,55.00,92.00,96.00,51.00,67.00,85.00,156.00,0",
						"596,28.00,26.00,63.00,27.00,75.00,83.00,44.00,43.00,10.00,0.00,27.00,7.00,39.00,76.00,154.40,0",
						"597,35.00,29.00,80.00,91.00,62.00,26.00,16.00,82.00,50.00,88.00,21.00,64.00,5.00,85.00,151.93,0",
						"598,41.00,28.00,64.00,24.00,21.00,68.00,9.00,54.00,81.00,15.00,77.00,29.00,53.00,99.00,139.60,0",
						"599,25.00,64.00,66.00,18.00,26.00,56.00,49.00,8.00,72.00,75.00,57.00,58.00,52.00,81.00,118.08,0",
						"600,53.00,93.00,77.00,79.00,87.00,4.00,33.00,8.00,56.00,76.00,73.00,66.00,41.00,32.00,124.65,0",
						"601,46.00,41.00,63.00,66.00,44.00,5.00,17.00,38.00,97.00,77.00,62.00,64.00,39.00,41.00,119.76,0",
						"602,6.00,40.00,56.00,96.00,21.00,14.00,27.00,23.00,3.00,76.00,47.00,7.00,52.00,38.00,146.55,0",
						"603,84.00,86.00,52.00,89.00,50.00,41.00,27.00,36.00,98.00,77.00,99.00,39.00,92.00,84.00,159.39,0",
						"604,66.00,65.00,3.00,3.00,56.00,9.00,69.00,91.00,82.00,77.00,99.00,64.00,25.00,92.00,162.06,0",
						"605,65.00,86.00,94.00,63.00,74.00,75.00,45.00,63.00,46.00,99.00,99.00,97.00,33.00,0.00,179.42,0",
						"606,88.00,62.00,5.00,89.00,83.00,2.00,4.00,33.00,98.00,97.00,40.00,68.00,20.00,62.00,159.66,0",
						"607,9.00,15.00,95.00,56.00,61.00,30.00,18.00,29.00,83.00,55.00,77.00,98.00,89.00,93.00,170.57,0",
						"608,29.00,69.00,75.00,95.00,1.00,83.00,17.00,79.00,91.00,51.00,59.00,64.00,20.00,7.00,160.67,0",
						"609,72.00,4.00,95.00,3.00,21.00,23.00,39.00,67.00,75.00,97.00,60.00,42.00,51.00,26.00,148.74,0",
						"610,79.00,73.00,27.00,32.00,81.00,97.00,22.00,37.00,37.00,30.00,58.00,68.00,47.00,41.00,157.18,0",
						"611,30.00,71.00,70.00,84.00,14.00,3.00,19.00,37.00,63.00,80.00,88.00,38.00,40.00,0.00,143.92,0",
						"612,47.00,57.00,27.00,51.00,14.00,41.00,50.00,64.00,1.00,23.00,1.00,63.00,24.00,22.00,152.06,0",
						"613,52.00,54.00,99.00,94.00,14.00,51.00,93.00,68.00,50.00,81.00,43.00,93.00,79.00,63.00,150.92,0",
						"614,38.00,96.00,47.00,94.00,88.00,22.00,45.00,94.00,93.00,65.00,7.00,97.00,19.00,33.00,181.31,0",
						"615,71.00,8.00,39.00,24.00,82.00,55.00,71.00,84.00,24.00,55.00,83.00,18.00,7.00,62.00,166.87,0",
						"616,89.00,70.00,37.00,55.00,34.00,14.00,73.00,1.00,23.00,9.00,18.00,83.00,9.00,74.00,148.67,0",
						"617,29.00,63.00,84.00,50.00,74.00,48.00,60.00,75.00,97.00,69.00,62.00,82.00,2.00,3.00,156.37,0",
						"618,95.00,23.00,13.00,86.00,7.00,60.00,38.00,33.00,15.00,16.00,26.00,32.00,56.00,95.00,174.15,0",
						"619,75.00,68.00,36.00,80.00,81.00,38.00,52.00,22.00,93.00,68.00,61.00,24.00,44.00,13.00,141.09,0",
						"620,54.00,36.00,17.00,16.00,74.00,11.00,93.00,73.00,89.00,11.00,16.00,96.00,45.00,25.00,159.00,0",
						"621,1.00,42.00,11.00,78.00,22.00,90.00,13.00,51.00,86.00,53.00,59.00,21.00,64.00,43.00,131.97,0",
						"622,34.00,47.00,80.00,75.00,29.00,90.00,38.00,25.00,58.00,65.00,35.00,22.00,41.00,75.00,123.53,0",
						"623,28.00,28.00,0.00,35.00,27.00,13.00,59.00,60.00,33.00,79.00,89.00,14.00,18.00,78.00,143.72,0",
						"624,28.00,96.00,26.00,30.00,93.00,63.00,57.00,47.00,11.00,68.00,43.00,98.00,38.00,82.00,162.84,0",
						"625,6.00,91.00,13.00,97.00,19.00,22.00,41.00,7.00,87.00,83.00,85.00,4.00,2.00,38.00,177.08,0",
						"626,82.00,37.00,21.00,75.00,13.00,9.00,45.00,88.00,84.00,45.00,49.00,41.00,10.00,18.00,142.86,0",
						"627,70.00,52.00,82.00,90.00,7.00,26.00,58.00,99.00,3.00,45.00,3.00,60.00,9.00,78.00,159.32,0",
						"628,61.00,2.00,71.00,0.00,14.00,18.00,68.00,38.00,60.00,66.00,64.00,5.00,98.00,77.00,151.82,0",
						"629,7.00,0.00,80.00,21.00,93.00,19.00,91.00,52.00,93.00,25.00,20.00,99.00,57.00,82.00,155.32,0",
						"630,50.00,84.00,82.00,20.00,51.00,86.00,78.00,44.00,88.00,87.00,10.00,93.00,69.00,94.00,128.41,0",
						"631,31.00,94.00,92.00,34.00,33.00,70.00,94.00,40.00,26.00,98.00,40.00,25.00,61.00,34.00,134.44,0",
						"632,55.00,24.00,74.00,4.00,23.00,32.00,14.00,50.00,51.00,28.00,69.00,74.00,25.00,9.00,146.75,0",
						"633,36.00,1.00,66.00,73.00,6.00,10.00,84.00,89.00,87.00,70.00,76.00,99.00,71.00,81.00,150.95,0",
						"634,29.00,81.00,42.00,38.00,22.00,6.00,76.00,23.00,81.00,95.00,32.00,88.00,40.00,1.00,153.22,0",
						"635,90.00,7.00,92.00,27.00,70.00,2.00,77.00,79.00,37.00,34.00,40.00,34.00,46.00,39.00,159.58,0",
						"636,54.00,10.00,46.00,44.00,50.00,99.00,53.00,45.00,47.00,33.00,69.00,68.00,36.00,70.00,153.20,0",
						"637,97.00,82.00,11.00,16.00,47.00,11.00,5.00,78.00,27.00,16.00,15.00,16.00,24.00,5.00,185.99,0",
						"638,84.00,53.00,6.00,18.00,15.00,5.00,38.00,12.00,68.00,84.00,73.00,91.00,36.00,66.00,125.55,0",
						"639,75.00,42.00,4.00,25.00,69.00,12.00,40.00,32.00,79.00,64.00,64.00,58.00,11.00,47.00,135.81,0",
						"640,68.00,17.00,95.00,99.00,2.00,97.00,90.00,8.00,33.00,40.00,46.00,5.00,70.00,27.00,163.16,0",
						"641,55.00,60.00,86.00,71.00,4.00,10.00,22.00,91.00,2.00,77.00,50.00,35.00,57.00,32.00,142.36,0",
						"642,58.00,74.00,71.00,83.00,40.00,76.00,30.00,5.00,36.00,42.00,30.00,63.00,98.00,44.00,133.82,0",
						"643,16.00,98.00,80.00,49.00,34.00,12.00,36.00,74.00,26.00,23.00,97.00,37.00,19.00,43.00,156.37,0",
						"644,91.00,28.00,19.00,35.00,50.00,67.00,83.00,52.00,62.00,7.00,33.00,66.00,93.00,90.00,139.95,0",
						"645,76.00,72.00,26.00,36.00,35.00,55.00,91.00,26.00,11.00,26.00,20.00,18.00,71.00,45.00,120.79,0",
						"646,69.00,71.00,74.00,69.00,1.00,68.00,80.00,36.00,0.00,1.00,62.00,22.00,48.00,81.00,156.55,0",
						"647,64.00,51.00,53.00,23.00,85.00,63.00,63.00,95.00,78.00,45.00,2.00,74.00,73.00,20.00,146.06,0",
						"648,44.00,99.00,26.00,5.00,51.00,32.00,3.00,34.00,33.00,45.00,79.00,99.00,8.00,51.00,148.97,0",
						"649,49.00,64.00,56.00,42.00,15.00,23.00,69.00,33.00,91.00,96.00,55.00,47.00,39.00,11.00,128.76,0",
						"650,45.00,20.00,61.00,53.00,33.00,45.00,66.00,23.00,37.00,89.00,91.00,63.00,75.00,53.00,130.36,0",
						"651,78.00,37.00,35.00,70.00,55.00,48.00,67.00,42.00,43.00,2.00,28.00,73.00,62.00,87.00,141.06,0",
						"652,43.00,92.00,25.00,41.00,48.00,53.00,55.00,24.00,50.00,96.00,81.00,13.00,37.00,13.00,147.12,0",
						"653,54.00,97.00,66.00,74.00,40.00,85.00,0.00,2.00,53.00,60.00,56.00,26.00,50.00,61.00,129.61,0",
						"654,14.00,15.00,17.00,55.00,59.00,72.00,56.00,32.00,88.00,24.00,66.00,18.00,29.00,9.00,134.54,0",
						"655,26.00,33.00,31.00,22.00,71.00,42.00,28.00,86.00,77.00,32.00,67.00,18.00,70.00,5.00,134.19,0",
						"656,85.00,4.00,69.00,68.00,60.00,83.00,97.00,74.00,39.00,60.00,36.00,95.00,96.00,51.00,157.54,0",
						"657,50.00,19.00,24.00,6.00,89.00,87.00,94.00,70.00,26.00,95.00,79.00,80.00,65.00,5.00,168.30,0",
						"658,53.00,59.00,27.00,67.00,84.00,2.00,4.00,77.00,13.00,8.00,2.00,79.00,47.00,89.00,178.85,0",
						"659,57.00,31.00,32.00,75.00,12.00,24.00,92.00,77.00,65.00,30.00,93.00,5.00,16.00,28.00,151.73,0",
						"660,55.00,29.00,88.00,28.00,5.00,41.00,23.00,71.00,10.00,43.00,60.00,42.00,57.00,39.00,132.66,0",
						"661,6.00,25.00,10.00,74.00,39.00,71.00,25.00,59.00,44.00,51.00,73.00,97.00,96.00,38.00,142.39,0",
						"662,15.00,65.00,17.00,45.00,38.00,87.00,42.00,22.00,75.00,71.00,27.00,90.00,90.00,95.00,138.48,0",
						"663,87.00,95.00,52.00,96.00,64.00,69.00,73.00,91.00,2.00,51.00,89.00,45.00,9.00,73.00,162.28,0",
						"664,59.00,10.00,37.00,12.00,49.00,51.00,92.00,17.00,75.00,47.00,67.00,86.00,4.00,82.00,144.53,0",
						"665,59.00,63.00,94.00,58.00,22.00,95.00,27.00,2.00,34.00,40.00,60.00,76.00,26.00,48.00,148.11,0",
						"666,26.00,94.00,92.00,97.00,65.00,33.00,64.00,11.00,61.00,86.00,86.00,26.00,93.00,42.00,136.80,0",
						"667,43.00,69.00,50.00,70.00,70.00,57.00,88.00,16.00,86.00,86.00,33.00,30.00,92.00,80.00,133.97,0",
						"668,50.00,77.00,79.00,2.00,40.00,49.00,12.00,89.00,88.00,56.00,13.00,15.00,70.00,44.00,162.98,0",
						"669,14.00,27.00,37.00,87.00,18.00,18.00,83.00,42.00,40.00,72.00,69.00,90.00,65.00,89.00,171.58,0",
						"670,54.00,23.00,15.00,30.00,65.00,58.00,97.00,87.00,61.00,79.00,98.00,64.00,68.00,41.00,132.84,0",
						"671,32.00,9.00,72.00,70.00,97.00,95.00,31.00,34.00,36.00,77.00,15.00,51.00,90.00,24.00,162.16,0",
						"672,85.00,26.00,77.00,75.00,38.00,75.00,11.00,94.00,15.00,76.00,88.00,49.00,3.00,80.00,147.42,0",
						"673,61.00,89.00,73.00,98.00,97.00,69.00,4.00,80.00,86.00,84.00,50.00,39.00,61.00,51.00,143.39,0",
						"674,4.00,97.00,24.00,40.00,84.00,70.00,52.00,49.00,70.00,39.00,51.00,36.00,77.00,98.00,133.94,0",
						"675,60.00,12.00,6.00,67.00,54.00,70.00,2.00,57.00,76.00,33.00,61.00,81.00,74.00,88.00,138.28,0",
						"676,8.00,26.00,5.00,79.00,92.00,87.00,53.00,45.00,89.00,9.00,44.00,22.00,73.00,90.00,151.65,0",
						"677,15.00,43.00,7.00,56.00,5.00,47.00,76.00,85.00,12.00,13.00,21.00,85.00,37.00,16.00,146.86,0",
						"678,59.00,82.00,64.00,8.00,59.00,92.00,28.00,62.00,10.00,74.00,21.00,16.00,21.00,39.00,151.42,0",
						"679,75.00,50.00,99.00,22.00,40.00,61.00,32.00,70.00,91.00,50.00,27.00,98.00,36.00,36.00,110.45,0",
						"680,44.00,78.00,44.00,31.00,43.00,90.00,13.00,52.00,40.00,55.00,11.00,15.00,83.00,29.00,157.99,0",
						"681,85.00,7.00,28.00,25.00,47.00,58.00,57.00,0.00,66.00,9.00,5.00,72.00,51.00,90.00,136.57,0",
						"682,82.00,37.00,5.00,69.00,48.00,9.00,29.00,0.00,51.00,18.00,28.00,32.00,34.00,17.00,132.84,0",
						"683,0.00,58.00,77.00,1.00,37.00,15.00,70.00,13.00,43.00,9.00,62.00,39.00,40.00,70.00,129.16,0",
						"684,23.00,58.00,55.00,38.00,1.00,47.00,76.00,41.00,60.00,12.00,28.00,58.00,5.00,46.00,116.95,0",
						"685,6.00,16.00,51.00,37.00,72.00,48.00,74.00,30.00,72.00,64.00,71.00,53.00,78.00,55.00,131.60,0",
						"686,38.00,45.00,87.00,46.00,43.00,13.00,12.00,11.00,73.00,84.00,29.00,52.00,94.00,97.00,153.40,0",
						"687,29.00,54.00,77.00,94.00,59.00,0.00,93.00,51.00,68.00,84.00,26.00,64.00,67.00,2.00,147.16,0",
						"688,6.00,63.00,26.00,49.00,86.00,31.00,14.00,39.00,84.00,39.00,55.00,44.00,21.00,7.00,142.61,0",
						"689,31.00,82.00,88.00,67.00,89.00,63.00,69.00,85.00,38.00,60.00,37.00,83.00,94.00,7.00,146.61,0",
						"690,19.00,42.00,49.00,1.00,72.00,9.00,10.00,19.00,8.00,92.00,90.00,82.00,16.00,54.00,172.32,0",
						"691,54.00,81.00,69.00,81.00,6.00,3.00,71.00,18.00,50.00,6.00,79.00,91.00,43.00,16.00,153.37,0",
						"692,55.00,6.00,55.00,84.00,55.00,9.00,59.00,61.00,89.00,74.00,26.00,72.00,90.00,6.00,156.78,0",
						"693,14.00,83.00,93.00,25.00,22.00,91.00,37.00,10.00,71.00,58.00,39.00,30.00,45.00,62.00,155.66,0",
						"694,22.00,2.00,83.00,55.00,42.00,94.00,44.00,76.00,9.00,4.00,28.00,50.00,25.00,83.00,148.97,0",
						"695,57.00,44.00,48.00,46.00,3.00,66.00,65.00,92.00,52.00,13.00,34.00,89.00,34.00,53.00,141.17,0",
						"696,15.00,3.00,46.00,51.00,39.00,84.00,26.00,11.00,88.00,77.00,7.00,85.00,73.00,48.00,150.64,0",
						"697,85.00,63.00,19.00,94.00,85.00,91.00,28.00,27.00,20.00,35.00,76.00,67.00,82.00,7.00,158.40,0",
						"698,91.00,87.00,38.00,54.00,9.00,74.00,78.00,50.00,64.00,58.00,79.00,58.00,3.00,42.00,141.58,0",
						"699,90.00,54.00,24.00,61.00,25.00,70.00,72.00,64.00,17.00,74.00,68.00,38.00,66.00,26.00,121.39,0",
						"700,68.00,23.00,86.00,46.00,28.00,60.00,92.00,15.00,63.00,81.00,71.00,86.00,75.00,15.00,155.83,0",
						"701,83.00,81.00,92.00,69.00,83.00,28.00,9.00,78.00,25.00,69.00,16.00,58.00,89.00,81.00,163.70,0",
						"702,79.00,39.00,29.00,91.00,91.00,19.00,78.00,22.00,74.00,63.00,95.00,54.00,54.00,62.00,136.32,0",
						"703,39.00,60.00,64.00,68.00,37.00,21.00,35.00,86.00,56.00,77.00,88.00,37.00,49.00,93.00,144.93,0",
						"704,87.00,11.00,57.00,91.00,18.00,73.00,28.00,53.00,90.00,94.00,4.00,26.00,16.00,69.00,124.64,0",
						"705,68.00,97.00,25.00,60.00,56.00,47.00,61.00,73.00,10.00,20.00,11.00,41.00,11.00,29.00,164.65,0",
						"706,70.00,7.00,16.00,10.00,97.00,83.00,1.00,36.00,31.00,41.00,75.00,18.00,93.00,74.00,155.54,0",
						"707,10.00,46.00,94.00,42.00,66.00,90.00,26.00,83.00,79.00,35.00,24.00,33.00,53.00,67.00,153.01,0",
						"708,65.00,99.00,38.00,3.00,49.00,19.00,54.00,81.00,17.00,50.00,65.00,96.00,60.00,23.00,179.44,0",
						"709,27.00,36.00,12.00,70.00,18.00,2.00,44.00,85.00,82.00,66.00,35.00,47.00,89.00,25.00,128.56,0",
						"710,96.00,45.00,7.00,26.00,53.00,7.00,19.00,31.00,68.00,7.00,64.00,16.00,72.00,48.00,157.63,0",
						"711,77.00,92.00,97.00,22.00,56.00,77.00,62.00,54.00,91.00,87.00,11.00,75.00,19.00,41.00,148.95,0",
						"712,77.00,28.00,44.00,77.00,26.00,9.00,91.00,77.00,95.00,84.00,80.00,50.00,0.00,12.00,172.10,0",
						"713,66.00,36.00,30.00,22.00,77.00,72.00,56.00,67.00,61.00,11.00,45.00,43.00,72.00,45.00,127.62,0",
						"714,78.00,7.00,30.00,95.00,48.00,15.00,54.00,25.00,88.00,28.00,98.00,75.00,23.00,40.00,141.47,0",
						"715,20.00,47.00,15.00,1.00,63.00,76.00,59.00,70.00,97.00,19.00,59.00,62.00,6.00,99.00,158.39,0",
						"716,83.00,67.00,91.00,7.00,17.00,27.00,62.00,51.00,12.00,3.00,14.00,83.00,0.00,47.00,150.17,0",
						"717,63.00,86.00,44.00,38.00,66.00,19.00,31.00,43.00,44.00,94.00,82.00,6.00,45.00,89.00,161.61,0",
						"718,13.00,6.00,36.00,33.00,29.00,84.00,99.00,17.00,97.00,24.00,52.00,95.00,16.00,76.00,192.36,0",
						"719,99.00,59.00,70.00,98.00,47.00,40.00,20.00,67.00,96.00,89.00,23.00,6.00,84.00,93.00,178.15,0",
						"720,1.00,61.00,37.00,3.00,22.00,44.00,15.00,41.00,90.00,17.00,35.00,68.00,57.00,13.00,146.71,0",
						"721,63.00,10.00,73.00,78.00,31.00,24.00,60.00,56.00,45.00,95.00,49.00,45.00,73.00,45.00,153.96,0",
						"722,88.00,97.00,91.00,12.00,50.00,87.00,37.00,48.00,39.00,68.00,18.00,95.00,91.00,82.00,165.88,0",
						"723,1.00,11.00,57.00,24.00,40.00,83.00,67.00,29.00,1.00,30.00,44.00,98.00,94.00,41.00,168.94,0",
						"724,35.00,90.00,21.00,72.00,64.00,41.00,67.00,13.00,45.00,77.00,33.00,72.00,35.00,93.00,157.16,0",
						"725,22.00,31.00,89.00,43.00,24.00,50.00,81.00,90.00,75.00,80.00,22.00,73.00,12.00,2.00,150.43,0",
						"726,1.00,64.00,26.00,43.00,28.00,8.00,88.00,53.00,42.00,94.00,93.00,70.00,60.00,65.00,162.50,0",
						"727,42.00,8.00,26.00,60.00,6.00,21.00,58.00,8.00,4.00,94.00,66.00,26.00,79.00,7.00,160.04,0",
						"728,45.00,75.00,42.00,47.00,19.00,85.00,52.00,46.00,86.00,1.00,73.00,32.00,50.00,91.00,152.21,0",
						"729,40.00,8.00,57.00,4.00,30.00,7.00,61.00,45.00,51.00,48.00,22.00,6.00,45.00,38.00,168.76,0",
						"730,39.00,22.00,20.00,21.00,89.00,45.00,2.00,57.00,91.00,98.00,52.00,96.00,14.00,72.00,155.11,0",
						"731,82.00,34.00,73.00,89.00,98.00,48.00,2.00,27.00,78.00,98.00,71.00,39.00,56.00,10.00,155.04,0",
						"732,83.00,91.00,59.00,75.00,72.00,19.00,80.00,70.00,75.00,73.00,24.00,37.00,0.00,91.00,154.30,0",
						"733,56.00,38.00,36.00,94.00,82.00,99.00,30.00,36.00,83.00,84.00,57.00,25.00,6.00,88.00,147.69,0",
						"734,24.00,59.00,94.00,97.00,7.00,45.00,22.00,60.00,62.00,96.00,96.00,34.00,92.00,30.00,164.18,0",
						"735,63.00,6.00,14.00,75.00,97.00,88.00,28.00,77.00,57.00,69.00,13.00,39.00,76.00,49.00,161.93,0",
						"736,42.00,54.00,87.00,78.00,36.00,49.00,33.00,63.00,91.00,99.00,2.00,25.00,8.00,59.00,126.57,0",
						"737,50.00,85.00,67.00,28.00,5.00,37.00,26.00,47.00,45.00,49.00,97.00,82.00,59.00,91.00,154.33,0",
						"738,22.00,55.00,16.00,83.00,59.00,86.00,71.00,31.00,8.00,32.00,8.00,14.00,79.00,97.00,155.38,0",
						"739,59.00,43.00,74.00,61.00,34.00,3.00,98.00,11.00,97.00,9.00,26.00,10.00,40.00,39.00,152.05,0",
						"740,48.00,18.00,44.00,86.00,58.00,79.00,36.00,1.00,98.00,10.00,12.00,23.00,47.00,57.00,158.11,0",
						"741,3.00,47.00,38.00,43.00,49.00,22.00,0.00,93.00,55.00,28.00,59.00,88.00,83.00,75.00,131.04,0",
						"742,45.00,14.00,49.00,45.00,33.00,52.00,68.00,60.00,56.00,69.00,4.00,65.00,92.00,36.00,131.60,0",
						"743,96.00,3.00,77.00,71.00,31.00,10.00,10.00,74.00,56.00,28.00,3.00,16.00,78.00,84.00,146.82,0",
						"744,72.00,1.00,67.00,98.00,72.00,28.00,1.00,30.00,8.00,52.00,67.00,5.00,40.00,99.00,148.18,0",
						"745,59.00,6.00,29.00,62.00,13.00,62.00,26.00,67.00,67.00,43.00,65.00,32.00,36.00,31.00,121.91,0",
						"746,54.00,34.00,2.00,66.00,5.00,44.00,25.00,38.00,36.00,87.00,19.00,36.00,33.00,98.00,138.32,0",
						"747,94.00,67.00,71.00,13.00,53.00,95.00,9.00,23.00,41.00,92.00,7.00,33.00,53.00,58.00,158.25,0",
						"748,24.00,55.00,77.00,59.00,21.00,30.00,72.00,0.00,76.00,12.00,89.00,56.00,70.00,41.00,144.84,0",
						"749,44.00,77.00,35.00,50.00,83.00,77.00,52.00,52.00,75.00,14.00,39.00,62.00,26.00,30.00,133.99,0",
						"750,71.00,89.00,30.00,43.00,39.00,58.00,15.00,91.00,28.00,45.00,83.00,88.00,35.00,1.00,159.57,0",
						"751,7.00,39.00,94.00,51.00,99.00,86.00,43.00,57.00,79.00,96.00,79.00,24.00,45.00,85.00,170.53,0",
						"752,88.00,98.00,18.00,0.00,14.00,74.00,4.00,10.00,89.00,45.00,2.00,15.00,76.00,55.00,188.54,0",
						"753,12.00,63.00,71.00,75.00,87.00,79.00,58.00,0.00,97.00,43.00,77.00,25.00,6.00,98.00,162.56,0",
						"754,4.00,65.00,86.00,45.00,96.00,36.00,99.00,88.00,49.00,17.00,47.00,10.00,40.00,64.00,167.08,0",
						"755,91.00,68.00,40.00,99.00,39.00,53.00,68.00,10.00,85.00,97.00,32.00,6.00,46.00,8.00,170.94,0",
						"756,61.00,16.00,68.00,55.00,52.00,74.00,67.00,70.00,51.00,45.00,31.00,29.00,23.00,13.00,149.68,0",
						"757,6.00,49.00,62.00,36.00,12.00,25.00,8.00,63.00,6.00,55.00,54.00,91.00,45.00,81.00,157.98,0",
						"758,43.00,90.00,77.00,93.00,14.00,53.00,22.00,26.00,26.00,8.00,15.00,0.00,5.00,34.00,170.09,0",
						"759,32.00,0.00,16.00,27.00,78.00,13.00,64.00,63.00,34.00,99.00,25.00,44.00,16.00,95.00,163.18,0",
						"760,48.00,69.00,52.00,77.00,99.00,51.00,54.00,86.00,86.00,64.00,66.00,19.00,42.00,82.00,131.95,0",
						"761,10.00,71.00,9.00,14.00,77.00,95.00,25.00,63.00,78.00,99.00,97.00,43.00,9.00,25.00,145.87,0",
						"762,6.00,89.00,55.00,9.00,39.00,55.00,48.00,24.00,29.00,47.00,74.00,63.00,71.00,85.00,153.59,0",
						"763,1.00,11.00,37.00,89.00,2.00,47.00,0.00,49.00,29.00,18.00,80.00,41.00,15.00,60.00,168.02,0",
						"764,99.00,35.00,90.00,95.00,59.00,20.00,63.00,47.00,31.00,11.00,26.00,7.00,96.00,31.00,170.62,0",
						"765,13.00,92.00,5.00,41.00,64.00,57.00,58.00,81.00,85.00,40.00,46.00,11.00,50.00,59.00,156.28,0",
						"766,3.00,12.00,20.00,94.00,76.00,43.00,39.00,50.00,41.00,97.00,37.00,72.00,4.00,57.00,137.89,0",
						"767,14.00,4.00,40.00,90.00,62.00,0.00,86.00,38.00,25.00,97.00,81.00,50.00,23.00,50.00,140.13,0",
						"768,47.00,44.00,71.00,97.00,90.00,81.00,42.00,54.00,37.00,3.00,22.00,49.00,50.00,61.00,138.52,0",
						"769,17.00,84.00,50.00,47.00,49.00,43.00,73.00,49.00,57.00,53.00,12.00,98.00,70.00,44.00,130.52,0",
						"770,54.00,95.00,81.00,48.00,86.00,68.00,20.00,49.00,35.00,31.00,36.00,4.00,86.00,31.00,139.75,0",
						"771,33.00,69.00,16.00,44.00,58.00,62.00,12.00,66.00,45.00,2.00,72.00,68.00,59.00,65.00,148.96,0",
						"772,57.00,32.00,29.00,85.00,26.00,25.00,74.00,52.00,56.00,96.00,41.00,5.00,36.00,11.00,142.33,0",
						"773,3.00,47.00,82.00,27.00,42.00,61.00,31.00,50.00,57.00,56.00,71.00,27.00,39.00,92.00,126.85,0",
						"774,72.00,94.00,48.00,25.00,7.00,76.00,7.00,61.00,36.00,39.00,15.00,68.00,65.00,54.00,145.04,0",
						"775,70.00,17.00,84.00,33.00,98.00,89.00,70.00,88.00,47.00,93.00,13.00,18.00,21.00,52.00,161.13,0",
						"776,75.00,1.00,44.00,98.00,45.00,48.00,55.00,86.00,38.00,2.00,5.00,39.00,60.00,18.00,156.89,0",
						"777,7.00,65.00,69.00,96.00,66.00,55.00,0.00,88.00,86.00,81.00,51.00,93.00,34.00,18.00,147.43,0",
						"778,24.00,65.00,83.00,99.00,92.00,44.00,14.00,22.00,44.00,18.00,41.00,38.00,4.00,98.00,147.39,0",
						"779,78.00,48.00,14.00,70.00,75.00,28.00,8.00,25.00,87.00,42.00,26.00,97.00,51.00,54.00,152.80,0",
						"780,90.00,14.00,93.00,95.00,11.00,35.00,42.00,5.00,97.00,8.00,87.00,96.00,24.00,52.00,158.61,0",
						"781,53.00,34.00,7.00,73.00,13.00,82.00,83.00,42.00,31.00,75.00,85.00,17.00,24.00,87.00,157.12,0",
						"782,40.00,56.00,8.00,18.00,30.00,27.00,50.00,57.00,63.00,31.00,43.00,22.00,63.00,93.00,142.30,0",
						"783,73.00,11.00,77.00,33.00,96.00,2.00,48.00,70.00,76.00,8.00,94.00,3.00,30.00,63.00,156.90,0",
						"784,29.00,5.00,81.00,56.00,70.00,16.00,81.00,15.00,2.00,56.00,91.00,83.00,74.00,38.00,176.95,0",
						"785,97.00,34.00,79.00,43.00,70.00,59.00,51.00,69.00,21.00,9.00,39.00,32.00,17.00,87.00,151.98,0",
						"786,16.00,17.00,36.00,12.00,28.00,91.00,14.00,37.00,66.00,22.00,80.00,39.00,69.00,77.00,151.33,0",
						"787,18.00,61.00,34.00,39.00,77.00,21.00,18.00,31.00,40.00,60.00,27.00,82.00,81.00,69.00,134.62,0",
						"788,4.00,93.00,78.00,98.00,63.00,0.00,47.00,58.00,50.00,1.00,7.00,85.00,98.00,34.00,150.58,0",
						"789,18.00,88.00,80.00,87.00,82.00,52.00,83.00,36.00,18.00,63.00,15.00,23.00,1.00,16.00,158.97,0",
						"790,84.00,58.00,7.00,41.00,46.00,36.00,22.00,38.00,65.00,27.00,24.00,32.00,50.00,45.00,133.39,0",
						"791,77.00,36.00,89.00,91.00,61.00,63.00,15.00,33.00,59.00,47.00,19.00,67.00,77.00,88.00,131.13,0",
						"792,68.00,13.00,79.00,92.00,22.00,49.00,44.00,20.00,94.00,90.00,41.00,9.00,81.00,54.00,147.51,0",
						"793,33.00,64.00,54.00,29.00,46.00,82.00,27.00,74.00,17.00,80.00,77.00,98.00,48.00,83.00,140.87,0",
						"794,96.00,24.00,62.00,3.00,86.00,96.00,24.00,74.00,66.00,93.00,16.00,44.00,76.00,65.00,146.45,0",
						"795,74.00,46.00,20.00,3.00,34.00,60.00,68.00,68.00,47.00,57.00,33.00,59.00,65.00,75.00,131.18,0",
						"796,16.00,40.00,67.00,43.00,9.00,76.00,55.00,18.00,1.00,40.00,3.00,73.00,30.00,60.00,164.23,0",
						"797,94.00,3.00,12.00,47.00,55.00,22.00,9.00,52.00,86.00,18.00,80.00,51.00,8.00,2.00,162.75,0",
						"798,74.00,57.00,82.00,96.00,82.00,51.00,59.00,63.00,71.00,31.00,27.00,99.00,37.00,2.00,148.02,0",
						"799,87.00,34.00,76.00,90.00,46.00,94.00,85.00,34.00,79.00,40.00,28.00,1.00,14.00,48.00,147.66,0",
						"800,44.00,64.00,53.00,39.00,58.00,13.00,19.00,58.00,88.00,57.00,56.00,88.00,80.00,5.00,130.76,0",
						"801,72.00,28.00,14.00,60.00,70.00,44.00,72.00,60.00,49.00,82.00,89.00,64.00,26.00,21.00,127.63,0",
						"802,29.00,40.00,97.00,88.00,22.00,9.00,95.00,15.00,74.00,35.00,85.00,11.00,85.00,99.00,162.23,0",
						"803,10.00,65.00,82.00,85.00,99.00,75.00,19.00,24.00,87.00,47.00,33.00,26.00,55.00,21.00,163.91,0",
						"804,50.00,44.00,32.00,56.00,29.00,15.00,32.00,88.00,0.00,84.00,84.00,55.00,41.00,14.00,132.79,0",
						"805,47.00,53.00,51.00,66.00,65.00,51.00,25.00,52.00,39.00,41.00,77.00,41.00,14.00,20.00,118.16,0",
						"806,74.00,48.00,47.00,16.00,73.00,23.00,49.00,21.00,86.00,98.00,74.00,65.00,83.00,99.00,172.19,0",
						"807,65.00,94.00,79.00,3.00,6.00,58.00,80.00,65.00,1.00,45.00,31.00,81.00,0.00,6.00,181.25,0",
						"808,20.00,83.00,15.00,95.00,66.00,41.00,1.00,39.00,17.00,63.00,57.00,49.00,47.00,70.00,138.86,0",
						"809,48.00,99.00,26.00,69.00,71.00,17.00,24.00,17.00,69.00,16.00,61.00,84.00,74.00,44.00,138.02,0",
						"810,6.00,25.00,15.00,90.00,47.00,42.00,65.00,34.00,10.00,26.00,63.00,25.00,84.00,53.00,143.19,0",
						"811,12.00,59.00,85.00,47.00,82.00,30.00,96.00,82.00,80.00,14.00,65.00,6.00,81.00,12.00,162.73,0",
						"812,94.00,87.00,92.00,34.00,85.00,60.00,4.00,93.00,24.00,46.00,30.00,15.00,40.00,31.00,151.32,0",
						"813,46.00,28.00,52.00,34.00,54.00,12.00,2.00,61.00,15.00,66.00,8.00,51.00,77.00,12.00,154.42,0",
						"814,29.00,28.00,54.00,95.00,75.00,38.00,95.00,70.00,16.00,13.00,90.00,71.00,45.00,27.00,144.90,0",
						"815,17.00,26.00,11.00,99.00,44.00,51.00,62.00,37.00,99.00,47.00,65.00,95.00,87.00,26.00,164.53,0",
						"816,59.00,78.00,47.00,60.00,40.00,67.00,11.00,7.00,7.00,61.00,7.00,25.00,52.00,65.00,149.25,0",
						"817,54.00,55.00,7.00,66.00,78.00,82.00,67.00,19.00,25.00,45.00,50.00,10.00,79.00,12.00,150.65,0",
						"818,26.00,86.00,79.00,0.00,69.00,21.00,4.00,93.00,74.00,96.00,80.00,21.00,3.00,89.00,185.00,0",
						"819,48.00,14.00,4.00,64.00,55.00,11.00,10.00,50.00,1.00,99.00,49.00,74.00,13.00,88.00,139.23,0",
						"820,39.00,49.00,74.00,80.00,18.00,2.00,15.00,98.00,34.00,59.00,82.00,0.00,80.00,23.00,175.71,0",
						"821,90.00,96.00,75.00,33.00,78.00,86.00,64.00,41.00,10.00,29.00,29.00,99.00,82.00,26.00,156.92,0",
						"822,40.00,41.00,14.00,10.00,15.00,66.00,56.00,86.00,8.00,46.00,42.00,58.00,25.00,8.00,155.89,0",
						"823,11.00,75.00,61.00,96.00,25.00,62.00,7.00,1.00,85.00,55.00,53.00,66.00,98.00,11.00,155.63,0",
						"824,94.00,89.00,45.00,98.00,72.00,8.00,7.00,16.00,24.00,22.00,1.00,71.00,76.00,19.00,176.72,0",
						"825,28.00,94.00,55.00,4.00,29.00,69.00,13.00,82.00,88.00,50.00,70.00,45.00,53.00,16.00,147.39,0",
						"826,13.00,60.00,96.00,39.00,3.00,72.00,46.00,0.00,22.00,79.00,82.00,6.00,99.00,67.00,177.82,0",
						"827,78.00,94.00,70.00,52.00,46.00,15.00,92.00,63.00,42.00,63.00,73.00,58.00,8.00,36.00,140.24,0",
						"828,26.00,81.00,3.00,94.00,90.00,58.00,68.00,38.00,88.00,72.00,21.00,27.00,0.00,97.00,166.07,0",
						"829,71.00,80.00,0.00,31.00,1.00,39.00,27.00,79.00,12.00,22.00,96.00,78.00,0.00,68.00,162.04,0",
						"830,28.00,27.00,8.00,35.00,65.00,13.00,81.00,92.00,12.00,10.00,17.00,72.00,19.00,86.00,157.36,0",
						"831,19.00,91.00,8.00,67.00,27.00,98.00,98.00,57.00,7.00,47.00,46.00,5.00,17.00,69.00,152.91,0",
						"832,26.00,23.00,66.00,21.00,30.00,2.00,85.00,24.00,84.00,22.00,68.00,39.00,93.00,44.00,157.11,0",
						"833,91.00,33.00,51.00,68.00,70.00,53.00,50.00,44.00,81.00,76.00,70.00,77.00,4.00,53.00,131.73,0",
						"834,15.00,1.00,66.00,77.00,8.00,64.00,79.00,25.00,36.00,51.00,86.00,36.00,54.00,2.00,157.65,0",
						"835,88.00,90.00,55.00,78.00,23.00,69.00,75.00,48.00,15.00,88.00,44.00,9.00,14.00,90.00,152.37,0",
						"836,24.00,39.00,41.00,86.00,87.00,85.00,58.00,37.00,52.00,68.00,37.00,20.00,72.00,66.00,136.64,0",
						"837,84.00,37.00,17.00,71.00,22.00,53.00,9.00,18.00,97.00,40.00,48.00,1.00,34.00,65.00,129.41,0",
						"838,40.00,74.00,90.00,56.00,96.00,36.00,32.00,65.00,20.00,6.00,18.00,31.00,71.00,11.00,159.09,0",
						"839,19.00,63.00,56.00,94.00,74.00,60.00,79.00,20.00,36.00,61.00,56.00,72.00,64.00,78.00,128.15,0",
						"840,34.00,51.00,64.00,75.00,57.00,63.00,24.00,73.00,26.00,10.00,87.00,31.00,56.00,91.00,122.03,0",
						"841,73.00,34.00,72.00,53.00,9.00,85.00,32.00,51.00,17.00,85.00,89.00,45.00,24.00,69.00,133.09,0",
						"842,51.00,54.00,24.00,26.00,16.00,63.00,55.00,30.00,52.00,31.00,88.00,99.00,9.00,31.00,121.70,0",
						"843,20.00,14.00,59.00,53.00,44.00,85.00,89.00,42.00,27.00,43.00,98.00,87.00,28.00,84.00,134.41,0",
						"844,55.00,66.00,84.00,34.00,86.00,38.00,26.00,70.00,79.00,27.00,56.00,87.00,51.00,66.00,150.67,0",
						"845,72.00,72.00,22.00,98.00,60.00,85.00,64.00,64.00,3.00,94.00,80.00,51.00,60.00,20.00,162.07,0",
						"846,84.00,76.00,88.00,69.00,92.00,24.00,86.00,7.00,37.00,12.00,70.00,96.00,72.00,93.00,165.79,0",
						"847,20.00,97.00,12.00,10.00,73.00,37.00,73.00,51.00,20.00,85.00,18.00,32.00,65.00,19.00,173.87,0",
						"848,74.00,79.00,94.00,52.00,73.00,75.00,48.00,96.00,22.00,13.00,60.00,8.00,29.00,89.00,165.61,0",
						"849,59.00,14.00,0.00,15.00,53.00,9.00,59.00,13.00,85.00,50.00,70.00,26.00,30.00,9.00,151.13,0",
						"850,84.00,4.00,50.00,22.00,39.00,49.00,96.00,24.00,14.00,3.00,89.00,36.00,47.00,47.00,161.27,0",
						"851,36.00,18.00,60.00,53.00,6.00,38.00,2.00,31.00,0.00,66.00,18.00,84.00,36.00,48.00,153.34,0",
						"852,32.00,99.00,12.00,50.00,35.00,61.00,71.00,85.00,79.00,19.00,50.00,71.00,5.00,85.00,164.69,0",
						"853,99.00,43.00,12.00,69.00,48.00,84.00,53.00,12.00,38.00,73.00,17.00,32.00,74.00,16.00,153.95,0",
						"854,15.00,98.00,93.00,41.00,61.00,35.00,93.00,54.00,69.00,6.00,43.00,41.00,73.00,77.00,160.95,0",
						"855,96.00,50.00,80.00,61.00,77.00,83.00,20.00,23.00,78.00,27.00,5.00,9.00,72.00,95.00,164.33,0",
						"856,0.00,19.00,69.00,16.00,53.00,60.00,1.00,66.00,87.00,33.00,72.00,40.00,17.00,68.00,167.35,0",
						"857,59.00,78.00,86.00,49.00,66.00,40.00,63.00,70.00,31.00,18.00,65.00,33.00,92.00,34.00,138.10,0",
						"858,82.00,65.00,59.00,52.00,84.00,58.00,23.00,53.00,93.00,18.00,23.00,26.00,7.00,12.00,164.75,0",
						"859,39.00,61.00,43.00,19.00,7.00,20.00,66.00,16.00,32.00,42.00,56.00,53.00,42.00,50.00,128.80,0",
						"860,61.00,4.00,40.00,53.00,39.00,84.00,64.00,64.00,73.00,62.00,54.00,12.00,85.00,87.00,144.79,0",
						"861,96.00,35.00,20.00,90.00,61.00,12.00,80.00,58.00,38.00,43.00,73.00,31.00,86.00,2.00,163.93,0",
						"862,93.00,10.00,66.00,24.00,13.00,98.00,9.00,97.00,0.00,53.00,42.00,15.00,54.00,88.00,171.39,0",
						"863,52.00,40.00,87.00,40.00,76.00,40.00,72.00,34.00,53.00,10.00,31.00,46.00,81.00,98.00,165.61,0",
						"864,82.00,17.00,0.00,59.00,21.00,96.00,10.00,36.00,77.00,69.00,43.00,73.00,10.00,97.00,171.16,0",
						"865,38.00,76.00,17.00,79.00,96.00,89.00,3.00,25.00,14.00,4.00,93.00,61.00,13.00,54.00,136.89,0",
						"866,56.00,67.00,15.00,91.00,82.00,50.00,6.00,42.00,84.00,20.00,47.00,90.00,36.00,60.00,143.60,0",
						"867,9.00,86.00,95.00,67.00,88.00,65.00,8.00,51.00,17.00,80.00,31.00,25.00,42.00,77.00,158.03,0",
						"868,84.00,33.00,16.00,96.00,36.00,80.00,69.00,89.00,89.00,22.00,13.00,53.00,27.00,66.00,153.52,0",
						"869,48.00,78.00,4.00,83.00,33.00,15.00,5.00,4.00,87.00,61.00,88.00,24.00,9.00,52.00,140.81,0",
						"870,97.00,85.00,93.00,57.00,9.00,20.00,6.00,21.00,5.00,10.00,50.00,15.00,7.00,25.00,158.73,0",
						"871,31.00,52.00,33.00,33.00,54.00,56.00,67.00,6.00,34.00,56.00,40.00,72.00,59.00,31.00,132.31,0",
						"872,76.00,27.00,11.00,42.00,56.00,33.00,2.00,13.00,87.00,12.00,18.00,20.00,89.00,29.00,152.95,0",
						"873,39.00,14.00,4.00,59.00,49.00,62.00,14.00,98.00,24.00,84.00,66.00,45.00,24.00,2.00,140.93,0",
						"874,31.00,23.00,13.00,24.00,50.00,10.00,82.00,29.00,16.00,24.00,26.00,73.00,27.00,39.00,133.62,0",
						"875,22.00,9.00,36.00,56.00,11.00,35.00,83.00,77.00,71.00,51.00,11.00,85.00,19.00,61.00,131.97,0",
						"876,64.00,9.00,11.00,32.00,2.00,24.00,69.00,24.00,8.00,87.00,40.00,90.00,82.00,11.00,171.33,0",
						"877,25.00,98.00,26.00,28.00,37.00,21.00,4.00,24.00,39.00,52.00,33.00,2.00,78.00,12.00,153.34,0",
						"878,99.00,13.00,50.00,41.00,55.00,20.00,11.00,75.00,37.00,72.00,86.00,24.00,31.00,68.00,160.45,0",
						"879,4.00,88.00,73.00,57.00,10.00,98.00,49.00,4.00,99.00,36.00,59.00,53.00,50.00,46.00,184.00,0",
						"880,54.00,21.00,84.00,76.00,14.00,11.00,74.00,70.00,53.00,72.00,16.00,6.00,8.00,30.00,152.63,0",
						"881,72.00,2.00,19.00,95.00,46.00,39.00,9.00,72.00,26.00,97.00,31.00,41.00,32.00,45.00,147.84,0",
						"882,60.00,82.00,81.00,41.00,10.00,17.00,38.00,79.00,72.00,46.00,62.00,26.00,23.00,72.00,162.50,0",
						"883,78.00,2.00,84.00,27.00,84.00,71.00,92.00,39.00,34.00,20.00,79.00,29.00,20.00,5.00,178.95,0",
						"884,58.00,20.00,4.00,64.00,24.00,24.00,35.00,77.00,37.00,3.00,45.00,66.00,66.00,72.00,152.34,0",
						"885,91.00,67.00,13.00,56.00,41.00,33.00,88.00,47.00,98.00,42.00,21.00,21.00,4.00,22.00,141.04,0",
						"886,69.00,63.00,57.00,5.00,68.00,66.00,39.00,9.00,62.00,71.00,29.00,94.00,50.00,68.00,140.55,0",
						"887,23.00,77.00,7.00,46.00,85.00,30.00,91.00,60.00,37.00,22.00,89.00,81.00,81.00,89.00,164.34,0",
						"888,7.00,3.00,71.00,85.00,70.00,52.00,88.00,17.00,83.00,82.00,13.00,77.00,46.00,70.00,165.16,0",
						"889,51.00,67.00,10.00,21.00,9.00,38.00,35.00,67.00,3.00,59.00,4.00,5.00,38.00,14.00,159.31,0",
						"890,41.00,14.00,2.00,95.00,10.00,15.00,49.00,6.00,55.00,25.00,86.00,72.00,56.00,48.00,156.37,0",
						"891,50.00,44.00,12.00,6.00,0.00,42.00,5.00,80.00,92.00,39.00,34.00,77.00,45.00,54.00,148.35,0",
						"892,53.00,61.00,68.00,48.00,2.00,74.00,12.00,35.00,6.00,47.00,81.00,25.00,74.00,2.00,151.91,0",
						"893,6.00,79.00,14.00,48.00,70.00,21.00,24.00,94.00,52.00,10.00,10.00,31.00,58.00,52.00,155.29,0",
						"894,61.00,81.00,64.00,11.00,74.00,34.00,19.00,13.00,67.00,21.00,76.00,19.00,63.00,93.00,148.93,0",
						"895,31.00,40.00,37.00,18.00,5.00,31.00,42.00,46.00,26.00,76.00,91.00,96.00,88.00,6.00,172.76,0",
						"896,7.00,17.00,85.00,84.00,23.00,39.00,8.00,50.00,23.00,79.00,79.00,67.00,53.00,38.00,175.47,0",
						"897,29.00,33.00,32.00,80.00,99.00,65.00,99.00,26.00,34.00,2.00,37.00,19.00,32.00,97.00,148.89,0",
						"898,36.00,77.00,0.00,39.00,38.00,54.00,36.00,39.00,40.00,78.00,52.00,10.00,52.00,96.00,143.01,0",
						"899,64.00,49.00,19.00,73.00,32.00,63.00,6.00,93.00,46.00,48.00,77.00,73.00,42.00,5.00,132.05,0",
						"900,36.00,73.00,49.00,49.00,12.00,52.00,35.00,82.00,92.00,26.00,54.00,62.00,81.00,7.00,134.60,0",
						"901,60.00,93.00,12.00,85.00,18.00,80.00,37.00,36.00,1.00,71.00,5.00,18.00,30.00,20.00,157.08,0",
						"902,41.00,72.00,12.00,24.00,78.00,66.00,5.00,48.00,90.00,19.00,34.00,5.00,81.00,54.00,167.13,0",
						"903,73.00,16.00,93.00,21.00,10.00,25.00,48.00,91.00,6.00,19.00,91.00,81.00,79.00,34.00,165.95,0",
						"904,28.00,76.00,12.00,93.00,18.00,39.00,41.00,11.00,22.00,65.00,69.00,41.00,18.00,19.00,148.79,0",
						"905,76.00,77.00,24.00,40.00,3.00,10.00,64.00,65.00,23.00,60.00,88.00,28.00,18.00,23.00,129.81,0",
						"906,82.00,96.00,90.00,60.00,13.00,72.00,24.00,64.00,36.00,70.00,57.00,62.00,59.00,62.00,151.97,0",
						"907,11.00,4.00,80.00,3.00,74.00,94.00,99.00,6.00,50.00,27.00,67.00,99.00,54.00,8.00,168.08,0",
						"908,59.00,46.00,51.00,43.00,53.00,99.00,87.00,93.00,34.00,17.00,98.00,12.00,12.00,96.00,177.25,0",
						"909,47.00,93.00,54.00,33.00,72.00,42.00,8.00,9.00,47.00,24.00,84.00,87.00,49.00,71.00,151.46,0",
						"910,44.00,70.00,20.00,54.00,47.00,24.00,22.00,75.00,76.00,72.00,78.00,9.00,96.00,59.00,149.77,0",
						"911,10.00,10.00,93.00,25.00,99.00,11.00,75.00,87.00,9.00,6.00,83.00,54.00,32.00,58.00,186.39,0",
						"912,20.00,15.00,44.00,27.00,21.00,59.00,8.00,59.00,94.00,5.00,49.00,60.00,15.00,95.00,169.36,0",
						"913,86.00,99.00,75.00,30.00,1.00,89.00,47.00,47.00,66.00,90.00,53.00,18.00,8.00,8.00,166.88,0",
						"914,20.00,45.00,44.00,94.00,70.00,78.00,26.00,6.00,54.00,78.00,7.00,25.00,85.00,0.00,164.78,0",
						"915,2.00,69.00,43.00,94.00,11.00,1.00,2.00,18.00,37.00,57.00,34.00,40.00,44.00,69.00,168.48,0",
						"916,66.00,96.00,74.00,73.00,76.00,28.00,84.00,35.00,96.00,57.00,9.00,69.00,17.00,63.00,152.83,0",
						"917,80.00,72.00,64.00,46.00,91.00,63.00,83.00,15.00,10.00,41.00,31.00,28.00,59.00,67.00,144.46,0",
						"918,47.00,45.00,24.00,59.00,32.00,20.00,32.00,64.00,77.00,32.00,55.00,80.00,72.00,90.00,131.98,0",
						"919,28.00,15.00,72.00,9.00,9.00,70.00,46.00,72.00,77.00,65.00,55.00,66.00,67.00,53.00,140.61,0",
						"920,64.00,94.00,84.00,94.00,33.00,77.00,47.00,1.00,16.00,90.00,4.00,54.00,49.00,96.00,154.35,0",
						"921,6.00,82.00,31.00,63.00,15.00,40.00,70.00,44.00,18.00,70.00,17.00,83.00,89.00,11.00,155.65,0",
						"922,56.00,8.00,61.00,99.00,66.00,74.00,14.00,59.00,24.00,61.00,96.00,59.00,54.00,62.00,143.49,0",
						"923,56.00,78.00,95.00,77.00,5.00,86.00,41.00,27.00,46.00,57.00,92.00,54.00,84.00,12.00,155.32,0",
						"924,19.00,42.00,42.00,30.00,85.00,33.00,57.00,61.00,21.00,83.00,31.00,25.00,45.00,1.00,145.72,0",
						"925,35.00,53.00,65.00,60.00,18.00,21.00,24.00,11.00,23.00,30.00,61.00,98.00,85.00,81.00,141.68,0",
						"926,68.00,93.00,71.00,63.00,65.00,9.00,15.00,37.00,98.00,45.00,38.00,93.00,80.00,69.00,133.22,0",
						"927,29.00,20.00,47.00,36.00,94.00,0.00,38.00,17.00,16.00,93.00,3.00,30.00,4.00,43.00,182.74,0",
						"928,85.00,80.00,24.00,93.00,40.00,86.00,42.00,93.00,62.00,8.00,6.00,53.00,79.00,7.00,153.37,0",
						"929,73.00,80.00,64.00,84.00,90.00,41.00,14.00,19.00,22.00,37.00,25.00,35.00,37.00,37.00,137.73,0",
						"930,72.00,13.00,57.00,49.00,51.00,61.00,23.00,56.00,0.00,88.00,57.00,76.00,96.00,27.00,138.82,0",
						"931,53.00,41.00,17.00,8.00,21.00,82.00,1.00,33.00,88.00,91.00,78.00,74.00,74.00,55.00,133.32,0",
						"932,94.00,72.00,0.00,23.00,23.00,24.00,18.00,16.00,12.00,6.00,70.00,50.00,14.00,16.00,164.22,0",
						"933,9.00,25.00,81.00,46.00,10.00,37.00,3.00,8.00,75.00,11.00,3.00,22.00,53.00,31.00,167.07,0",
						"934,24.00,48.00,0.00,9.00,65.00,47.00,63.00,31.00,9.00,73.00,74.00,12.00,52.00,93.00,155.34,0",
						"935,69.00,36.00,92.00,50.00,62.00,21.00,66.00,14.00,52.00,70.00,53.00,66.00,78.00,90.00,151.65,0",
						"936,2.00,1.00,95.00,88.00,11.00,26.00,0.00,31.00,57.00,0.00,37.00,13.00,25.00,46.00,175.12,0",
						"937,93.00,97.00,10.00,68.00,48.00,21.00,25.00,89.00,99.00,50.00,15.00,89.00,90.00,39.00,164.03,0",
						"938,80.00,71.00,99.00,33.00,17.00,29.00,0.00,63.00,99.00,36.00,67.00,40.00,95.00,12.00,128.70,0",
						"939,77.00,42.00,91.00,27.00,92.00,94.00,23.00,46.00,51.00,2.00,69.00,54.00,77.00,49.00,144.59,0",
						"940,39.00,85.00,62.00,33.00,43.00,18.00,70.00,67.00,17.00,46.00,34.00,82.00,33.00,41.00,140.32,0",
						"941,16.00,6.00,91.00,97.00,49.00,5.00,27.00,58.00,55.00,33.00,11.00,47.00,6.00,58.00,150.84,0",
						"942,61.00,21.00,87.00,66.00,96.00,77.00,7.00,99.00,6.00,48.00,30.00,83.00,94.00,32.00,176.12,0",
						"943,63.00,84.00,7.00,46.00,12.00,23.00,45.00,13.00,52.00,67.00,42.00,85.00,1.00,12.00,177.89,0",
						"944,74.00,23.00,21.00,94.00,64.00,57.00,65.00,8.00,56.00,69.00,17.00,13.00,25.00,25.00,159.86,0",
						"945,35.00,95.00,44.00,47.00,46.00,14.00,40.00,95.00,91.00,76.00,97.00,58.00,74.00,31.00,158.30,0",
						"946,19.00,84.00,55.00,1.00,96.00,47.00,97.00,53.00,58.00,3.00,5.00,21.00,20.00,18.00,160.95,0",
						"947,40.00,40.00,29.00,5.00,78.00,61.00,30.00,72.00,19.00,22.00,41.00,3.00,12.00,9.00,146.44,0",
						"948,14.00,58.00,67.00,78.00,67.00,49.00,8.00,2.00,0.00,29.00,76.00,95.00,0.00,34.00,168.32,0",
						"949,37.00,8.00,8.00,62.00,36.00,51.00,37.00,79.00,71.00,78.00,22.00,29.00,25.00,28.00,152.84,0",
						"950,20.00,7.00,67.00,22.00,93.00,64.00,87.00,47.00,96.00,66.00,89.00,60.00,75.00,27.00,144.42,0",
						"951,75.00,48.00,85.00,36.00,53.00,64.00,11.00,15.00,97.00,79.00,77.00,44.00,29.00,22.00,144.35,0",
						"952,26.00,60.00,26.00,11.00,7.00,59.00,81.00,35.00,62.00,88.00,54.00,98.00,44.00,91.00,161.21,0",
						"953,70.00,19.00,93.00,64.00,75.00,62.00,29.00,87.00,86.00,11.00,10.00,68.00,78.00,87.00,165.83,0",
						"954,86.00,75.00,36.00,69.00,15.00,16.00,13.00,39.00,49.00,38.00,34.00,20.00,9.00,79.00,158.35,0",
						"955,92.00,52.00,2.00,58.00,29.00,91.00,82.00,92.00,98.00,98.00,44.00,43.00,51.00,51.00,158.23,0",
						"956,85.00,49.00,77.00,8.00,58.00,13.00,49.00,19.00,8.00,17.00,38.00,17.00,75.00,9.00,148.98,0",
						"957,57.00,57.00,53.00,59.00,29.00,40.00,87.00,57.00,69.00,8.00,69.00,63.00,25.00,18.00,122.49,0",
						"958,39.00,93.00,37.00,17.00,16.00,30.00,81.00,64.00,75.00,34.00,72.00,92.00,27.00,83.00,131.10,0",
						"959,65.00,28.00,43.00,43.00,95.00,98.00,75.00,98.00,77.00,3.00,89.00,24.00,12.00,42.00,175.29,0",
						"960,76.00,49.00,5.00,53.00,73.00,81.00,95.00,33.00,31.00,23.00,15.00,14.00,33.00,77.00,143.58,0",
						"961,0.00,72.00,62.00,63.00,70.00,85.00,92.00,86.00,23.00,26.00,19.00,31.00,68.00,12.00,147.42,0",
						"962,94.00,4.00,70.00,17.00,1.00,23.00,84.00,72.00,18.00,47.00,58.00,31.00,17.00,48.00,155.95,0",
						"963,93.00,52.00,58.00,64.00,14.00,83.00,34.00,47.00,77.00,78.00,34.00,87.00,10.00,55.00,127.73,0",
						"964,45.00,30.00,78.00,47.00,42.00,57.00,92.00,24.00,45.00,71.00,24.00,46.00,26.00,86.00,145.47,0",
						"965,74.00,83.00,95.00,86.00,4.00,50.00,20.00,84.00,81.00,20.00,26.00,77.00,34.00,94.00,149.65,0",
						"966,54.00,93.00,7.00,63.00,21.00,15.00,63.00,81.00,43.00,39.00,26.00,93.00,7.00,47.00,152.77,0",
						"967,19.00,36.00,26.00,87.00,86.00,77.00,17.00,80.00,16.00,16.00,23.00,56.00,90.00,41.00,162.62,0",
						"968,44.00,92.00,25.00,11.00,43.00,26.00,51.00,52.00,70.00,18.00,11.00,25.00,55.00,85.00,154.36,0",
						"969,63.00,94.00,9.00,26.00,39.00,49.00,53.00,5.00,43.00,61.00,55.00,97.00,21.00,27.00,152.19,0",
						"970,97.00,62.00,65.00,76.00,42.00,16.00,34.00,81.00,45.00,87.00,93.00,12.00,29.00,40.00,151.23,0",
						"971,70.00,96.00,9.00,28.00,99.00,28.00,21.00,60.00,30.00,57.00,3.00,54.00,16.00,35.00,140.52,0",
						"972,73.00,96.00,23.00,74.00,84.00,62.00,20.00,98.00,5.00,77.00,69.00,84.00,33.00,0.00,149.95,0",
						"973,70.00,12.00,34.00,99.00,4.00,73.00,82.00,88.00,80.00,24.00,32.00,10.00,22.00,85.00,156.82,0",
						"974,97.00,11.00,77.00,62.00,6.00,10.00,86.00,50.00,47.00,74.00,6.00,11.00,77.00,40.00,154.81,0",
						"975,70.00,17.00,93.00,28.00,86.00,72.00,81.00,33.00,50.00,84.00,36.00,12.00,51.00,24.00,146.52,0",
						"976,54.00,30.00,85.00,20.00,54.00,99.00,39.00,28.00,39.00,36.00,91.00,42.00,90.00,32.00,150.22,0",
						"977,29.00,48.00,26.00,95.00,57.00,8.00,59.00,27.00,63.00,76.00,61.00,49.00,62.00,94.00,140.51,0",
						"978,45.00,9.00,6.00,97.00,98.00,14.00,29.00,67.00,10.00,20.00,74.00,55.00,72.00,31.00,165.19,0",
						"979,0.00,3.00,62.00,24.00,65.00,23.00,7.00,16.00,66.00,7.00,27.00,27.00,56.00,92.00,144.90,0",
						"980,28.00,7.00,73.00,50.00,41.00,94.00,85.00,15.00,38.00,96.00,21.00,5.00,26.00,71.00,169.69,0",
						"981,69.00,41.00,77.00,57.00,26.00,4.00,42.00,48.00,67.00,24.00,22.00,46.00,69.00,69.00,139.38,0",
						"982,39.00,38.00,79.00,76.00,76.00,63.00,20.00,45.00,50.00,52.00,15.00,70.00,4.00,82.00,139.90,0",
						"983,41.00,74.00,68.00,75.00,17.00,72.00,73.00,68.00,26.00,93.00,26.00,94.00,87.00,93.00,155.97,0",
						"984,9.00,69.00,99.00,43.00,1.00,97.00,20.00,75.00,9.00,6.00,49.00,86.00,94.00,67.00,156.79,0",
						"985,61.00,5.00,61.00,23.00,0.00,59.00,82.00,33.00,61.00,33.00,29.00,59.00,22.00,43.00,140.10,0",
						"986,10.00,98.00,56.00,25.00,0.00,81.00,90.00,19.00,92.00,39.00,53.00,75.00,77.00,82.00,148.34,0",
						"987,33.00,78.00,28.00,87.00,59.00,34.00,64.00,91.00,96.00,67.00,56.00,85.00,58.00,44.00,133.93,0",
						"988,49.00,18.00,11.00,13.00,47.00,78.00,94.00,40.00,57.00,46.00,87.00,25.00,41.00,1.00,148.99,0",
						"989,67.00,94.00,34.00,29.00,13.00,56.00,4.00,43.00,15.00,20.00,91.00,59.00,40.00,38.00,134.61,0",
						"990,48.00,43.00,92.00,73.00,57.00,49.00,14.00,36.00,52.00,36.00,90.00,57.00,42.00,96.00,134.02,0",
						"991,19.00,27.00,22.00,59.00,32.00,14.00,82.00,42.00,7.00,0.00,71.00,91.00,40.00,2.00,155.70,0",
						"992,72.00,89.00,12.00,5.00,24.00,46.00,70.00,88.00,5.00,89.00,93.00,23.00,5.00,88.00,142.67,0",
						"993,48.00,46.00,8.00,12.00,64.00,92.00,81.00,36.00,12.00,21.00,74.00,49.00,9.00,35.00,143.72,0",
						"994,80.00,93.00,44.00,70.00,80.00,7.00,96.00,44.00,7.00,86.00,16.00,84.00,36.00,4.00,168.39,0",
						"995,18.00,54.00,91.00,72.00,39.00,77.00,59.00,5.00,79.00,37.00,30.00,10.00,6.00,20.00,155.13,0",
						"996,21.00,78.00,13.00,4.00,51.00,43.00,15.00,46.00,27.00,52.00,80.00,14.00,34.00,41.00,141.63,0",
						"997,79.00,63.00,15.00,64.00,91.00,26.00,17.00,70.00,16.00,35.00,71.00,79.00,33.00,12.00,145.01,0",
						"998,95.00,66.00,47.00,19.00,78.00,61.00,65.00,3.00,85.00,10.00,58.00,67.00,64.00,56.00,161.65,0",
						"999,3.00,91.00,23.00,77.00,26.00,4.00,18.00,8.00,50.00,86.00,99.00,14.00,86.00,24.00,195.85,0",
						"1000,91.00,46.00,52.00,1.00,30.00,91.00,86.00,82.00,8.00,3.00,87.00,81.00,33.00,49.00,183.24,0",
						"1001,85.00,61.00,85.00,99.00,63.00,88.00,96.00,90.00,62.00,70.00,41.00,96.00,94.00,27.00,179.39,0",
						"1002,10.00,21.00,54.00,84.00,1.00,18.00,6.00,54.00,54.00,15.00,20.00,1.00,80.00,74.00,188.12,0",
						"1003,57.00,73.00,67.00,17.00,87.00,76.00,48.00,37.00,3.00,76.00,69.00,82.00,83.00,47.00,153.29,0",
						"1004,55.00,84.00,94.00,16.00,28.00,83.00,11.00,79.00,51.00,43.00,61.00,14.00,92.00,26.00,148.01,0",
						"1005,64.00,88.00,14.00,80.00,26.00,36.00,59.00,50.00,72.00,24.00,94.00,71.00,79.00,87.00,151.62,0",
						"1006,40.00,83.00,56.00,53.00,57.00,93.00,60.00,37.00,99.00,0.00,50.00,5.00,9.00,34.00,161.28,0",
						"1007,3.00,90.00,22.00,82.00,59.00,87.00,94.00,84.00,41.00,5.00,54.00,59.00,97.00,1.00,165.22,0",
						"1008,22.00,23.00,4.00,14.00,59.00,25.00,86.00,97.00,83.00,57.00,51.00,63.00,42.00,79.00,160.19,0",
						"1009,86.00,82.00,89.00,34.00,70.00,8.00,66.00,61.00,80.00,66.00,3.00,74.00,12.00,89.00,146.85,0",
						"1010,98.00,25.00,94.00,83.00,74.00,67.00,64.00,56.00,73.00,98.00,4.00,7.00,45.00,2.00,172.10,0",
						"1011,6.00,49.00,2.00,57.00,32.00,50.00,29.00,34.00,52.00,36.00,12.00,59.00,32.00,48.00,139.06,0",
						"1012,98.00,91.00,10.00,55.00,42.00,32.00,46.00,5.00,28.00,6.00,20.00,90.00,18.00,56.00,158.79,0",
						"1013,90.00,95.00,19.00,19.00,23.00,44.00,34.00,61.00,0.00,96.00,67.00,0.00,56.00,81.00,163.06,0",
						"1014,58.00,2.00,91.00,7.00,39.00,13.00,31.00,43.00,3.00,23.00,10.00,49.00,89.00,56.00,160.28,0",
						"1015,72.00,55.00,35.00,7.00,22.00,9.00,48.00,4.00,65.00,79.00,86.00,17.00,41.00,14.00,161.35,0",
						"1016,49.00,36.00,21.00,91.00,38.00,80.00,36.00,33.00,54.00,98.00,91.00,22.00,79.00,55.00,155.29,0",
						"1017,53.00,33.00,49.00,33.00,20.00,11.00,31.00,17.00,9.00,5.00,73.00,57.00,44.00,82.00,148.38,0",
						"1018,30.00,58.00,75.00,62.00,43.00,84.00,77.00,3.00,43.00,93.00,71.00,23.00,90.00,0.00,148.53,0",
						"1019,73.00,71.00,77.00,44.00,64.00,99.00,40.00,86.00,80.00,47.00,66.00,28.00,54.00,11.00,141.73,0",
						"1020,42.00,30.00,44.00,10.00,3.00,43.00,55.00,10.00,99.00,13.00,83.00,52.00,97.00,98.00,162.66,0",
						"1021,93.00,33.00,65.00,57.00,23.00,62.00,73.00,29.00,34.00,1.00,1.00,97.00,45.00,31.00,148.74,0",
						"1022,33.00,40.00,38.00,70.00,75.00,48.00,33.00,50.00,36.00,62.00,13.00,52.00,79.00,72.00,136.22,0",
						"1023,15.00,74.00,85.00,47.00,2.00,51.00,69.00,4.00,76.00,12.00,60.00,95.00,16.00,48.00,147.11,0"
					]
				},
				"endTime": "2016-05-18T06:55:40.144Z"
			},
			{
				"startTime": "2016-05-18T12:57:56.740Z",
				"mapData": {
					"groupId": 0,
					"NASValues": [
						"0,35.00,71.00,1.00,6.00,74.00,31.00,44.00,40.00,53.00,87.00,11.00,15.00,34.00,86.00,151.59,0",
						"1,57.00,96.00,75.00,24.00,86.00,16.00,15.00,25.00,22.00,27.00,70.00,28.00,94.00,93.00,161.82,0",
						"2,42.00,82.00,51.00,32.00,44.00,31.00,56.00,78.00,74.00,89.00,52.00,9.00,16.00,46.00,147.12,0",
						"3,56.00,30.00,1.00,93.00,23.00,46.00,11.00,67.00,39.00,35.00,31.00,19.00,42.00,90.00,144.61,0",
						"4,15.00,49.00,99.00,50.00,43.00,71.00,42.00,87.00,47.00,82.00,50.00,38.00,32.00,80.00,143.98,0",
						"5,68.00,93.00,86.00,26.00,90.00,25.00,41.00,18.00,0.00,99.00,55.00,15.00,39.00,0.00,167.58,0",
						"6,49.00,37.00,80.00,66.00,11.00,37.00,99.00,17.00,27.00,53.00,0.00,95.00,82.00,8.00,163.44,0",
						"7,12.00,1.00,22.00,81.00,25.00,14.00,36.00,62.00,85.00,53.00,49.00,86.00,93.00,2.00,135.50,0",
						"8,69.00,40.00,13.00,46.00,75.00,27.00,93.00,70.00,36.00,22.00,78.00,59.00,96.00,23.00,154.61,0",
						"9,26.00,60.00,67.00,1.00,47.00,63.00,95.00,64.00,99.00,77.00,81.00,71.00,1.00,97.00,161.36,0",
						"10,93.00,68.00,96.00,77.00,43.00,14.00,97.00,86.00,91.00,80.00,92.00,34.00,47.00,30.00,171.86,0",
						"11,32.00,11.00,73.00,43.00,40.00,97.00,27.00,30.00,25.00,13.00,15.00,49.00,53.00,30.00,165.54,0",
						"12,67.00,19.00,10.00,34.00,50.00,97.00,57.00,99.00,10.00,42.00,31.00,15.00,5.00,65.00,155.45,0",
						"13,10.00,89.00,88.00,28.00,1.00,21.00,63.00,35.00,13.00,96.00,6.00,13.00,88.00,26.00,183.71,0",
						"14,90.00,87.00,83.00,77.00,60.00,76.00,36.00,63.00,83.00,97.00,3.00,47.00,17.00,35.00,152.78,0",
						"15,15.00,9.00,71.00,41.00,26.00,73.00,58.00,48.00,73.00,66.00,55.00,67.00,29.00,20.00,140.59,0",
						"16,56.00,92.00,18.00,18.00,41.00,11.00,82.00,66.00,13.00,48.00,96.00,49.00,4.00,35.00,151.14,0",
						"17,39.00,71.00,42.00,89.00,77.00,29.00,51.00,10.00,29.00,92.00,87.00,79.00,12.00,49.00,127.70,0",
						"18,54.00,80.00,69.00,24.00,68.00,2.00,53.00,22.00,47.00,40.00,94.00,13.00,21.00,89.00,149.31,0",
						"19,52.00,11.00,42.00,52.00,81.00,17.00,87.00,68.00,61.00,30.00,65.00,85.00,62.00,63.00,141.69,0",
						"20,37.00,71.00,50.00,99.00,83.00,30.00,21.00,69.00,23.00,59.00,11.00,74.00,24.00,23.00,140.90,0",
						"21,22.00,93.00,74.00,66.00,21.00,9.00,76.00,24.00,83.00,67.00,37.00,24.00,75.00,76.00,154.54,0",
						"22,95.00,57.00,74.00,34.00,33.00,42.00,60.00,91.00,71.00,49.00,4.00,24.00,81.00,32.00,151.63,0",
						"23,14.00,73.00,49.00,36.00,19.00,0.00,82.00,32.00,43.00,68.00,90.00,78.00,0.00,95.00,182.98,0",
						"24,4.00,9.00,11.00,60.00,43.00,76.00,4.00,45.00,27.00,50.00,36.00,1.00,64.00,60.00,164.00,0",
						"25,87.00,91.00,94.00,35.00,60.00,43.00,61.00,47.00,84.00,36.00,98.00,97.00,2.00,71.00,179.94,0",
						"26,40.00,4.00,18.00,74.00,56.00,72.00,13.00,70.00,16.00,23.00,65.00,48.00,58.00,57.00,146.83,0",
						"27,55.00,58.00,68.00,60.00,57.00,63.00,62.00,6.00,43.00,44.00,92.00,59.00,21.00,35.00,133.22,0",
						"28,30.00,90.00,19.00,26.00,91.00,75.00,57.00,80.00,0.00,3.00,30.00,69.00,38.00,13.00,166.48,0",
						"29,17.00,11.00,87.00,46.00,57.00,77.00,67.00,12.00,27.00,96.00,12.00,99.00,98.00,1.00,149.03,0",
						"30,50.00,13.00,48.00,79.00,82.00,40.00,80.00,2.00,61.00,58.00,74.00,9.00,70.00,64.00,143.97,0",
						"31,64.00,17.00,22.00,67.00,23.00,70.00,42.00,10.00,87.00,11.00,19.00,1.00,56.00,14.00,125.58,0",
						"32,37.50,5.34,6.90,21.03,7.22,26.87,16.97,3.14,27.31,3.45,5.96,0.31,17.79,4.49,119.87,0",
						"33,69.00,5.00,28.00,58.00,48.00,70.00,75.00,81.00,71.00,68.00,11.00,27.00,67.00,19.00,172.95,0",
						"34,90.00,99.00,65.00,92.00,57.00,4.00,59.00,13.00,17.00,69.00,38.00,90.00,4.00,20.00,151.19,0",
						"35,66.00,67.00,12.00,34.00,81.00,19.00,86.00,85.00,26.00,53.00,21.00,63.00,14.00,11.00,137.64,0",
						"36,38.00,47.00,43.00,94.00,99.00,86.00,85.00,64.00,64.00,88.00,46.00,5.00,6.00,4.00,150.15,0",
						"37,50.00,44.00,19.00,10.00,70.00,81.00,72.00,4.00,54.00,5.00,14.00,54.00,59.00,62.00,163.78,0",
						"38,96.00,8.00,60.00,90.00,58.00,40.00,33.00,35.00,63.00,5.00,85.00,97.00,5.00,82.00,147.61,0",
						"39,37.00,59.00,5.00,80.00,54.00,51.00,6.00,88.00,64.00,58.00,72.00,61.00,13.00,53.00,142.25,0",
						"40,86.00,59.00,77.00,52.00,69.00,97.00,16.00,72.00,56.00,88.00,63.00,54.00,40.00,1.00,145.20,0",
						"41,12.00,2.00,13.00,43.00,84.00,73.00,44.00,59.00,91.00,41.00,69.00,19.00,54.00,20.00,155.48,0",
						"42,52.00,89.00,98.00,21.00,31.00,30.00,25.00,47.00,23.00,37.00,7.00,14.00,96.00,30.00,166.86,0",
						"43,23.00,76.00,40.00,93.00,11.00,29.00,92.00,24.00,83.00,47.00,74.00,90.00,28.00,57.00,170.45,0",
						"44,87.00,49.00,86.00,11.00,37.00,83.00,56.00,87.00,17.00,77.00,36.00,83.00,78.00,69.00,159.30,0",
						"45,48.00,44.00,26.00,82.00,79.00,56.00,26.00,94.00,74.00,60.00,26.00,84.00,41.00,19.00,169.16,0",
						"46,28.00,28.00,94.00,31.00,13.00,80.00,90.00,5.00,98.00,68.00,16.00,9.00,32.00,78.00,146.07,0",
						"47,52.00,29.00,15.00,65.00,8.00,19.00,61.00,37.00,77.00,54.00,19.00,4.00,0.00,56.00,127.65,0",
						"48,3.00,3.00,44.00,52.00,76.00,47.00,85.00,14.00,75.00,27.00,44.00,69.00,75.00,56.00,148.18,0",
						"49,33.00,57.00,15.00,60.00,39.00,89.00,37.00,56.00,58.00,37.00,99.00,21.00,43.00,23.00,144.22,0",
						"50,74.00,2.00,41.00,65.00,90.00,37.00,27.00,87.00,52.00,91.00,8.00,64.00,9.00,6.00,156.81,0",
						"51,57.02,0.63,12.87,20.40,28.25,23.23,20.87,78.51,16.32,28.56,2.51,20.09,17.81,25.88,115.47,0",
						"52,82.00,40.00,23.00,98.00,19.00,21.00,10.00,15.00,20.00,34.00,38.00,62.00,23.00,90.00,135.71,0",
						"53,59.53,12.55,7.22,30.76,5.96,18.21,15.54,55.91,6.28,10.67,11.93,19.46,22.20,52.24,123.66,0",
						"54,36.00,54.00,26.00,12.00,79.00,77.00,91.00,20.00,58.00,9.00,27.00,18.00,69.00,51.00,144.28,0",
						"55,45.09,16.95,8.16,3.77,24.80,35.79,40.96,57.48,18.20,2.82,8.47,5.65,36.64,40.00,120.63,0",
						"56,22.00,25.00,30.00,68.00,82.00,64.00,0.00,26.00,1.00,28.00,66.00,32.00,12.00,65.00,144.88,0",
						"57,19.00,70.00,73.00,22.00,9.00,47.00,92.00,59.00,80.00,0.00,21.00,88.00,32.00,13.00,165.05,0",
						"58,94.00,9.00,85.00,34.00,73.00,80.00,69.00,89.00,17.00,50.00,28.00,80.00,66.00,97.00,162.30,0",
						"59,51.00,27.00,16.00,47.00,18.00,63.00,11.00,85.00,12.00,16.00,77.00,51.00,5.00,17.00,154.96,0",
						"60,21.00,80.00,55.00,75.00,69.00,98.00,66.00,25.00,96.00,92.00,1.00,67.00,5.00,84.00,175.24,0",
						"61,63.00,29.00,32.00,72.00,72.00,68.00,34.00,20.00,10.00,72.00,25.00,95.00,79.00,57.00,147.40,0",
						"62,61.00,96.00,47.00,28.00,58.00,52.00,47.00,60.00,48.00,53.00,89.00,47.00,1.00,41.00,146.22,0",
						"63,36.56,30.13,14.75,8.79,18.20,21.22,18.54,18.83,15.07,16.63,27.93,14.75,0.52,12.96,103.78,0",
						"64,28.77,9.14,4.48,2.67,5.52,11.41,9.48,5.72,4.57,5.05,8.48,4.48,0.37,4.03,63.40,0",
						"65,21.00,79.00,14.00,39.00,9.00,24.00,5.00,6.00,32.00,88.00,6.00,17.00,47.00,49.00,156.92,0",
						"66,97.00,50.00,19.00,38.00,92.00,28.00,85.00,40.00,40.00,83.00,56.00,15.00,66.00,36.00,142.92,0",
						"67,34.00,13.00,86.00,8.00,18.00,19.00,99.00,55.00,27.00,47.00,1.00,55.00,59.00,25.00,154.93,0",
						"68,25.00,7.00,97.00,53.00,50.00,93.00,4.00,31.00,97.00,40.00,40.00,15.00,74.00,25.00,158.14,0",
						"69,71.00,92.00,66.00,8.00,88.00,44.00,2.00,32.00,57.00,73.00,2.00,19.00,56.00,7.00,150.97,0",
						"70,59.00,55.00,48.00,90.00,54.00,35.00,41.00,27.00,61.00,10.00,46.00,32.00,46.00,46.00,124.94,0",
						"71,4.00,13.00,40.00,68.00,43.00,63.00,74.00,37.00,0.00,7.00,30.00,26.00,98.00,22.00,167.75,0",
						"72,85.00,85.00,91.00,48.00,61.00,7.00,32.00,92.00,22.00,5.00,81.00,16.00,23.00,75.00,164.80,0",
						"73,26.00,46.00,41.00,28.00,83.00,7.00,77.00,65.00,15.00,11.00,18.00,61.00,73.00,11.00,146.72,0",
						"74,34.00,98.00,52.00,90.00,65.00,11.00,72.00,63.00,29.00,34.00,38.00,32.00,26.00,33.00,129.52,0",
						"75,96.00,32.00,35.00,36.00,27.00,65.00,79.00,89.00,54.00,40.00,21.00,80.00,68.00,42.00,164.45,0",
						"76,9.00,14.00,47.00,7.00,94.00,6.00,56.00,45.00,54.00,95.00,75.00,4.00,47.00,62.00,171.96,0",
						"77,2.00,9.00,41.00,7.00,2.00,30.00,45.00,98.00,11.00,37.00,63.00,93.00,2.00,53.00,146.47,0",
						"78,68.00,77.00,61.00,42.00,40.00,59.00,54.00,55.00,87.00,64.00,61.00,39.00,4.00,52.00,133.65,0",
						"79,67.00,1.00,49.00,97.00,33.00,2.00,50.00,88.00,83.00,14.00,66.00,33.00,18.00,66.00,141.48,0",
						"80,63.00,68.00,57.00,33.00,43.00,79.00,67.00,56.00,99.00,20.00,34.00,16.00,92.00,37.00,130.73,0",
						"81,83.00,80.00,6.00,15.00,86.00,81.00,97.00,31.00,43.00,59.00,56.00,10.00,91.00,76.00,141.22,0",
						"82,59.85,25.11,1.88,4.71,26.99,37.04,42.84,60.93,13.50,18.52,17.58,3.14,43.55,47.85,98.80,0",
						"83,52.47,7.62,0.57,1.43,8.19,23.04,25.59,70.47,4.10,5.62,5.33,0.95,28.43,38.88,30.88,0",
						"84,50.26,2.39,0.18,0.45,2.57,18.85,20.43,73.32,1.29,1.76,1.67,0.30,23.91,36.19,48.76,0",
						"85,49.56,0.73,0.05,0.14,0.78,17.52,18.78,74.23,0.39,0.54,0.51,0.09,22.47,35.34,15.30,0",
						"86,49.35,0.23,0.02,0.04,0.24,17.12,18.29,74.50,0.12,0.17,0.16,0.03,22.04,35.08,43.30,0",
						"87,49.28,0.07,0.01,0.01,0.07,16.99,18.14,74.59,0.04,0.05,0.05,0.01,21.90,35.00,13.50,0",
						"88,49.26,0.02,0.00,0.00,0.02,16.95,18.09,74.62,0.01,0.02,0.02,0.00,21.86,34.98,90.92,0",
						"89,67.00,47.00,89.00,32.00,35.00,46.00,42.00,5.00,64.00,80.00,40.00,78.00,72.00,76.00,175.01,0",
						"90,38.44,14.75,27.93,10.04,10.99,19.54,17.14,35.36,20.09,25.11,12.55,24.48,31.45,31.20,106.68,0",
						"91,29.47,4.63,8.77,3.15,3.45,11.24,9.33,44.89,6.30,7.88,3.94,7.68,18.72,17.14,95.46,0",
						"92,14.00,44.00,98.00,39.00,86.00,9.00,36.00,92.00,26.00,99.00,27.00,65.00,75.00,47.00,179.42,0",
						"93,61.00,69.00,94.00,8.00,93.00,21.00,60.00,57.00,89.00,26.00,78.00,26.00,46.00,44.00,160.16,0",
						"94,36.56,21.66,29.50,2.51,29.19,11.49,22.62,17.89,27.93,8.16,24.48,8.16,14.65,13.90,99.76,0",
						"95,28.77,6.57,8.95,0.76,8.86,8.46,10.71,5.43,8.48,2.48,7.43,2.48,4.66,4.31,36.86,0",
						"96,25.09,2.06,2.81,0.24,2.78,7.17,6.89,1.70,2.66,0.78,2.33,0.78,2.36,1.74,82.95,1",
						"97,73.00,35.00,1.00,99.00,60.00,98.00,7.00,75.00,66.00,61.00,77.00,61.00,36.00,70.00,182.40,0",
						"98,83.00,1.00,4.00,34.00,51.00,63.00,33.00,42.00,62.00,93.00,10.00,43.00,33.00,6.00,138.48,0",
						"99,83.00,70.00,59.00,51.00,8.00,88.00,81.00,14.00,91.00,68.00,97.00,63.00,40.00,17.00,149.38,0",
						"100,86.00,93.00,17.00,32.00,80.00,81.00,8.00,43.00,84.00,75.00,85.00,45.00,54.00,86.00,146.18,0",
						"101,80.00,54.00,54.00,81.00,53.00,82.00,15.00,19.00,16.00,31.00,79.00,79.00,88.00,88.00,154.44,0",
						"102,97.00,27.00,44.00,57.00,32.00,3.00,36.00,40.00,51.00,99.00,94.00,29.00,75.00,34.00,141.76,0",
						"103,96.00,3.00,57.00,9.00,92.00,52.00,11.00,19.00,91.00,79.00,59.00,75.00,82.00,8.00,163.98,0",
						"104,73.00,93.00,83.00,1.00,17.00,74.00,63.00,61.00,24.00,76.00,14.00,51.00,85.00,85.00,174.92,0",
						"105,9.00,92.00,77.00,79.00,24.00,88.00,8.00,57.00,87.00,11.00,51.00,46.00,26.00,69.00,175.58,0",
						"106,39.00,53.00,38.00,33.00,0.00,0.00,88.00,44.00,59.00,85.00,61.00,16.00,50.00,74.00,155.46,0",
						"107,0.00,84.00,65.00,76.00,82.00,20.00,42.00,1.00,0.00,29.00,2.00,59.00,56.00,76.00,161.15,0",
						"108,76.00,1.00,39.00,94.00,55.00,13.00,7.00,21.00,4.00,24.00,32.00,52.00,38.00,75.00,142.89,0",
						"109,37.00,4.00,13.00,55.00,44.00,23.00,35.00,67.00,0.00,64.00,6.00,97.00,12.00,49.00,136.70,0",
						"110,36.00,75.00,96.00,43.00,92.00,96.00,72.00,21.00,60.00,37.00,37.00,12.00,68.00,5.00,165.84,0",
						"111,77.00,1.00,43.00,97.00,31.00,99.00,3.00,13.00,43.00,93.00,83.00,79.00,13.00,14.00,167.21,0",
						"112,88.00,20.00,52.00,61.00,4.00,96.00,74.00,76.00,71.00,88.00,75.00,43.00,77.00,6.00,149.50,0",
						"113,61.41,6.28,16.32,19.15,1.26,41.75,35.62,75.06,22.28,27.62,23.54,13.50,39.15,25.88,105.81,0",
						"114,52.94,1.91,4.95,5.81,0.38,24.47,23.40,74.76,6.76,8.38,7.14,4.10,27.09,32.21,33.13,0",
						"115,50.41,0.60,1.55,1.82,0.12,19.30,19.74,74.67,2.12,2.63,2.24,1.29,23.49,34.10,15.73,1",
						"116,49.62,0.19,0.49,0.57,0.04,12.25,12.29,74.64,0.67,0.83,0.70,0.40,20.14,23.83,11.88,0",
						"117,49.37,0.06,0.15,0.18,0.01,15.46,16.25,74.63,0.21,0.26,0.22,0.13,21.30,31.47,8.31,1",
						"118,49.29,0.02,0.05,0.05,0.00,16.49,17.52,74.63,0.06,0.08,0.07,0.04,21.68,33.91,2.71,0",
						"119,49.26,0.01,0.01,0.02,0.00,16.96,18.08,74.63,0.02,0.02,0.02,0.01,21.85,34.96,0.85,1",
						"120,49.26,0.00,0.00,0.01,0.00,16.94,18.07,74.63,0.01,0.01,0.01,0.00,21.84,34.97,0.17,0",
						"121,49.25,0.00,0.00,0.00,0.00,16.94,18.07,74.63,0.00,0.00,0.00,0.00,21.84,34.97,66.80,0",
						"122,32.87,0.00,0.00,0.00,0.00,9.93,9.31,57.22,0.00,0.00,0.00,0.00,14.48,18.69,30.14,0",
						"123,25.36,0.04,0.07,0.04,0.01,7.45,5.79,49.24,0.06,0.08,0.02,0.06,12.93,10.68,9.36,0",
						"124,25.37,0.01,0.02,0.01,0.00,7.44,5.77,49.25,0.02,0.02,0.01,0.02,12.91,10.70,68.44,0",
						"125,14.58,26.99,16.95,4.39,24.48,6.28,24.17,27.45,23.85,5.34,23.54,12.24,1.26,0.63,85.37,0",
						"126,20.96,8.47,5.32,1.38,7.68,6.58,11.17,8.62,7.49,1.68,7.39,3.84,0.97,0.29,34.30,0",
						"127,23.99,2.66,1.67,0.43,2.41,6.96,7.30,2.70,2.35,0.53,2.32,1.21,0.52,0.18,12.90,0",
						"128,24.95,0.81,0.51,0.13,0.73,7.08,6.06,0.82,0.71,0.16,0.70,0.37,0.37,0.15,83.86,1",
						"129,97.00,21.00,89.00,17.00,96.00,3.00,88.00,29.00,83.00,76.00,58.00,56.00,52.00,87.00,182.79,0",
						"130,76.00,76.00,82.00,55.00,92.00,41.00,87.00,88.00,31.00,99.00,16.00,20.00,42.00,32.00,145.63,0",
						"131,95.00,10.00,67.00,38.00,18.00,58.00,84.00,17.00,16.00,37.00,36.00,64.00,84.00,43.00,142.59,0",
						"132,95.00,11.00,19.00,74.00,9.00,54.00,55.00,97.00,63.00,24.00,79.00,67.00,65.00,64.00,150.67,0",
						"133,90.00,46.00,39.00,0.00,27.00,89.00,99.00,32.00,7.00,70.00,85.00,14.00,34.00,8.00,147.92,0",
						"134,69.00,71.00,8.00,29.00,15.00,83.00,49.00,44.00,17.00,13.00,91.00,87.00,10.00,47.00,143.94,0",
						"135,47.00,28.00,14.00,34.00,53.00,18.00,69.00,93.00,24.00,99.00,55.00,40.00,51.00,28.00,149.36,0",
						"136,42.00,24.00,13.00,85.00,12.00,41.00,15.00,44.00,51.00,1.00,65.00,1.00,70.00,16.00,166.09,0",
						"137,79.00,19.00,11.00,13.00,0.00,41.00,71.00,37.00,84.00,48.00,2.00,82.00,86.00,70.00,173.74,0",
						"138,39.00,31.00,64.00,26.00,72.00,87.00,35.00,68.00,88.00,51.00,88.00,38.00,46.00,18.00,137.61,0",
						"139,73.00,79.00,14.00,44.00,62.00,51.00,6.00,35.00,84.00,46.00,63.00,26.00,27.00,92.00,122.54,0",
						"140,52.00,47.00,48.00,26.00,43.00,49.00,38.00,58.00,99.00,59.00,71.00,11.00,29.00,93.00,118.19,0",
						"141,27.00,8.00,15.00,25.00,40.00,52.00,36.00,13.00,89.00,69.00,13.00,47.00,36.00,46.00,139.09,0",
						"142,38.00,61.00,36.00,90.00,64.00,73.00,12.00,10.00,16.00,6.00,98.00,46.00,22.00,21.00,150.70,0",
						"143,45.72,19.15,11.30,28.25,20.09,27.70,7.52,53.32,5.02,1.88,30.76,14.44,13.04,11.21,100.30,0",
						"144,48.15,6.01,3.55,8.87,6.30,13.65,6.25,66.92,1.58,0.59,9.65,4.53,14.17,10.97,70.98,0",
						"145,48.91,1.89,1.11,2.78,1.98,11.06,8.31,87.89,0.49,0.19,3.03,1.42,15.76,16.72,32.58,0",
						"146,49.14,0.59,0.35,0.87,0.62,15.09,15.01,78.79,0.16,0.06,0.95,0.45,19.93,29.24,16.37,1",
						"147,49.22,0.19,0.11,0.27,0.19,10.93,10.80,75.93,0.05,0.02,0.30,0.14,19.02,22.30,9.01,0",
						"148,49.24,0.06,0.03,0.08,0.06,9.60,9.46,75.02,0.01,0.01,0.09,0.04,18.73,20.09,2.88,0",
						"149,49.25,0.02,0.01,0.03,0.02,9.21,9.06,74.75,0.00,0.00,0.03,0.01,18.64,19.43,7.66,0",
						"150,49.25,0.01,0.00,0.01,0.01,14.51,15.24,74.67,0.00,0.00,0.01,0.00,20.84,30.09,9.22,0",
						"151,49.25,0.00,0.00,0.00,0.00,16.20,17.21,74.64,0.00,0.00,0.00,0.00,21.53,33.49,3.00,0",
						"152,49.25,0.00,0.00,0.00,0.00,16.70,17.80,74.63,0.00,0.00,0.00,0.00,21.74,34.50,16.58,1",
						"153,32.87,0.00,0.00,0.00,0.00,9.86,9.22,57.22,0.00,0.00,0.00,0.00,14.45,18.54,21.04,0",
						"154,27.65,0.00,0.00,0.00,0.00,7.68,6.49,51.67,0.00,0.00,0.00,0.00,12.13,13.45,6.87,1",
						"155,26.09,0.00,0.00,0.00,0.00,7.02,5.67,50.01,0.00,0.00,0.00,0.00,11.43,11.93,2.20,1",
						"156,25.38,0.00,0.00,0.00,0.00,7.44,5.76,49.26,0.00,0.00,0.00,0.00,12.90,10.71,1.05,0",
						"157,25.38,0.00,0.00,0.00,0.00,7.44,5.76,49.26,0.00,0.00,0.00,0.00,12.90,10.71,34.28,0",
						"158,10.78,0.62,0.59,0.64,0.26,0.44,0.31,20.92,0.76,0.54,0.44,0.04,0.92,0.41,20.97,1",
						"159,19.77,0.19,0.19,0.20,0.08,4.75,3.69,6.57,0.24,0.17,0.14,0.01,0.86,0.22,13.69,1",
						"160,23.61,0.06,0.06,0.06,0.03,6.39,4.95,2.06,0.07,0.05,0.04,0.00,0.48,0.16,66.24,1",
						"161,42.00,37.00,58.00,14.00,7.00,64.00,96.00,72.00,45.00,56.00,80.00,42.00,30.00,19.00,173.86,0",
						"162,65.00,44.00,97.00,90.00,90.00,25.00,3.00,46.00,27.00,79.00,90.00,15.00,87.00,27.00,157.71,0",
						"163,57.00,83.00,23.00,74.00,71.00,98.00,85.00,38.00,91.00,17.00,86.00,62.00,81.00,62.00,157.91,0",
						"164,90.00,35.00,67.00,84.00,94.00,28.00,99.00,84.00,92.00,17.00,4.00,20.00,31.00,18.00,158.10,0",
						"165,72.00,40.00,86.00,62.00,40.00,55.00,26.00,77.00,19.00,79.00,72.00,7.00,30.00,21.00,147.60,0",
						"166,86.00,20.00,1.00,91.00,30.00,89.00,79.00,24.00,5.00,31.00,88.00,16.00,33.00,84.00,150.26,0",
						"167,97.00,53.00,58.00,51.00,14.00,54.00,28.00,25.00,75.00,91.00,46.00,62.00,40.00,2.00,148.31,0",
						"168,36.00,81.00,98.00,89.00,62.00,38.00,11.00,12.00,20.00,70.00,95.00,38.00,98.00,52.00,135.98,0",
						"169,73.00,36.00,89.00,58.00,77.00,46.00,9.00,86.00,24.00,39.00,39.00,12.00,67.00,48.00,155.19,0",
						"170,34.00,71.00,42.00,72.00,89.00,73.00,8.00,67.00,88.00,59.00,43.00,89.00,32.00,24.00,125.99,0",
						"171,49.00,2.00,34.00,9.00,70.00,41.00,4.00,3.00,38.00,98.00,43.00,30.00,55.00,65.00,152.87,0",
						"172,57.00,60.00,48.00,33.00,10.00,6.00,30.00,89.00,87.00,9.00,40.00,10.00,39.00,0.00,167.82,0",
						"173,90.00,54.00,73.00,53.00,98.00,69.00,36.00,79.00,30.00,91.00,18.00,48.00,82.00,42.00,159.40,0",
						"174,62.04,16.95,22.91,16.63,30.76,26.45,15.06,74.98,9.42,28.56,5.65,15.07,31.88,17.80,100.09,0",
						"175,53.27,5.32,7.19,5.22,9.65,13.25,8.61,73.71,2.96,8.96,1.77,4.73,20.08,13.03,31.18,0",
						"176,50.47,1.61,2.18,1.58,2.93,9.05,6.56,73.31,0.90,2.72,0.54,1.44,16.33,11.52,9.75,0",
						"177,49.64,0.51,0.68,0.50,0.92,7.79,5.94,73.19,0.28,0.85,0.17,0.45,15.21,11.06,8.19,0",
						"178,49.37,0.16,0.21,0.16,0.29,8.53,7.87,80.96,0.09,0.27,0.05,0.14,17.41,16.86,10.44,1",
						"179,49.29,0.05,0.07,0.05,0.09,8.88,8.57,76.55,0.03,0.08,0.02,0.04,18.24,18.44,4.21,0",
						"180,49.22,0.02,0.02,0.01,0.03,9.12,8.90,74.53,0.01,0.03,0.01,0.01,18.07,18.74,1.61,1",
						"181,49.24,0.00,0.01,0.00,0.01,9.05,8.88,74.60,0.00,0.01,0.00,0.00,18.44,19.01,6.83,0",
						"182,49.25,0.00,0.00,0.00,0.00,9.04,8.88,74.62,0.00,0.00,0.00,0.00,18.55,19.09,13.39,1",
						"183,49.25,0.00,0.00,0.00,0.00,14.46,15.18,74.62,0.00,0.00,0.00,0.00,20.81,29.98,22.34,1",
						"184,32.87,0.00,0.00,0.00,0.00,9.15,8.40,57.22,0.00,0.00,0.00,0.00,14.16,17.12,21.97,1",
						"185,27.65,0.00,0.00,0.00,0.00,7.46,6.24,51.67,0.00,0.00,0.00,0.00,12.04,13.02,7.16,0",
						"186,25.60,0.00,0.00,0.00,0.00,7.38,5.72,49.49,0.00,0.00,0.00,0.00,12.02,10.65,2.61,1",
						"187,25.44,0.00,0.00,0.00,0.00,6.92,5.43,49.33,0.00,0.00,0.00,0.00,11.39,11.06,0.75,0",
						"188,25.39,0.00,0.00,0.00,0.00,6.79,5.34,49.28,0.00,0.00,0.00,0.00,11.20,11.18,10.09,0",
						"189,10.87,0.81,0.81,0.33,0.80,0.73,0.46,21.32,0.14,0.78,0.85,0.42,0.80,0.31,27.69,0",
						"190,10.77,0.25,0.25,0.10,0.25,0.23,0.14,17.51,0.04,0.24,0.27,0.13,0.25,0.10,3.20,0",
						"191,10.74,0.08,0.08,0.03,0.08,0.07,0.04,16.30,0.01,0.07,0.08,0.04,0.08,0.03,9.96,1",
						"192,19.76,0.03,0.03,0.01,0.03,4.63,3.60,5.12,0.00,0.02,0.03,0.01,0.60,0.10,82.71,1",
						"193,46.00,74.00,25.00,98.00,69.00,56.00,0.00,31.00,78.00,70.00,63.00,55.00,46.00,71.00,174.23,0",
						"194,28.00,77.00,83.00,78.00,33.00,3.00,62.00,11.00,62.00,22.00,80.00,35.00,97.00,82.00,148.31,0",
						"195,38.00,43.00,69.00,22.00,57.00,76.00,74.00,42.00,77.00,89.00,20.00,73.00,47.00,34.00,146.11,0",
						"196,86.00,85.00,2.00,54.00,93.00,74.00,54.00,9.00,14.00,16.00,7.00,9.00,20.00,49.00,153.33,0",
						"197,65.00,47.00,37.00,3.00,34.00,28.00,77.00,10.00,2.00,1.00,4.00,15.00,56.00,16.00,161.21,0",
						"198,93.00,38.00,41.00,30.00,51.00,34.00,16.00,87.00,32.00,59.00,89.00,61.00,10.00,31.00,154.48,0",
						"199,32.00,54.00,85.00,93.00,55.00,16.00,49.00,28.00,72.00,30.00,20.00,57.00,80.00,45.00,152.06,0",
						"200,63.00,69.00,36.00,81.00,79.00,82.00,43.00,58.00,38.00,97.00,90.00,59.00,90.00,76.00,141.48,0",
						"201,96.00,86.00,29.00,1.00,77.00,70.00,98.00,7.00,25.00,51.00,12.00,85.00,91.00,13.00,178.94,0",
						"202,36.00,55.00,92.00,28.00,99.00,97.00,7.00,58.00,15.00,39.00,62.00,78.00,31.00,45.00,135.77,0",
						"203,83.00,9.00,41.00,67.00,74.00,56.00,87.00,19.00,78.00,22.00,86.00,55.00,76.00,64.00,168.92,0",
						"204,59.00,35.00,86.00,15.00,77.00,87.00,2.00,46.00,8.00,78.00,91.00,89.00,32.00,23.00,176.07,0",
						"205,52.31,10.99,26.99,4.71,24.17,32.10,4.39,64.62,2.51,24.48,28.56,27.93,16.18,11.83,104.53,0",
						"206,50.21,3.45,8.47,1.48,7.59,15.03,5.26,70.46,0.79,7.68,8.96,8.77,15.16,11.16,32.25,0",
						"207,49.55,1.05,2.57,0.45,2.30,9.59,5.54,72.32,0.24,2.33,2.72,2.66,14.83,10.95,10.11,1",
						"208,49.35,0.33,0.81,0.14,0.72,7.96,5.62,72.88,0.08,0.73,0.85,0.84,14.74,10.89,3.07,1",
						"209,49.28,0.10,0.24,0.04,0.22,7.44,5.65,73.06,0.02,0.22,0.26,0.25,14.70,10.87,0.96,1",
						"210,49.26,0.03,0.08,0.01,0.07,7.29,5.66,73.11,0.01,0.07,0.08,0.08,14.70,10.86,11.16,0",
						"211,49.26,0.01,0.02,0.00,0.02,8.37,7.78,80.93,0.00,0.02,0.03,0.02,17.25,16.80,11.60,0",
						"212,49.25,0.00,0.01,0.00,0.01,8.83,8.54,76.54,0.00,0.01,0.01,0.01,18.19,18.42,17.22,1",
						"213,32.87,0.00,0.00,0.00,0.00,7.44,6.34,57.82,0.00,0.00,0.00,0.00,11.38,10.26,16.79,1",
						"214,32.87,0.00,0.00,0.00,0.00,7.42,6.37,57.38,0.00,0.00,0.00,0.00,12.56,12.80,12.84,0",
						"215,27.73,0.00,0.00,0.00,0.00,8.08,6.55,51.81,0.00,0.00,0.00,0.00,8.64,7.71,14.62,1",
						"216,26.11,0.00,0.00,0.00,0.00,7.43,5.90,50.05,0.00,0.00,0.00,0.00,7.45,6.14,6.31,1",
						"217,25.60,0.00,0.00,0.00,0.00,6.95,5.49,49.51,0.00,0.00,0.00,0.00,9.97,9.64,4.01,1",
						"218,25.44,0.00,0.00,0.00,0.00,6.79,5.36,49.33,0.00,0.00,0.00,0.00,10.77,10.75,1.23,1",
						"219,25.40,0.00,0.00,0.00,0.00,6.75,5.32,49.28,0.00,0.00,0.00,0.00,11.01,11.09,1.47,1",
						"220,25.38,0.00,0.00,0.00,0.00,7.32,5.60,49.26,0.00,0.00,0.00,0.00,9.35,9.88,1.75,1",
						"221,23.93,0.00,0.00,0.00,0.00,7.29,5.70,49.26,0.00,0.00,0.00,0.00,9.61,9.61,22.18,1",
						"222,10.73,0.00,0.00,0.00,0.00,0.00,0.00,21.14,0.00,0.00,0.00,0.00,0.00,0.00,21.63,1",
						"223,19.75,0.00,0.00,0.00,0.00,4.66,3.66,23.02,0.00,0.00,0.00,0.00,4.74,3.72,12.51,1",
						"224,22.59,0.00,0.00,0.00,0.00,6.13,4.81,23.61,0.00,0.00,0.00,0.00,6.23,4.88,64.04,1",
						"225,27.00,25.00,64.00,20.00,20.00,48.00,46.00,83.00,16.00,74.00,87.00,10.00,56.00,7.00,146.43,0",
						"226,19.00,59.00,49.00,32.00,1.00,73.00,66.00,76.00,9.00,47.00,35.00,33.00,61.00,19.00,124.83,0",
						"227,64.00,42.00,83.00,55.00,59.00,75.00,93.00,56.00,73.00,45.00,72.00,8.00,92.00,5.00,149.32,0",
						"228,55.00,30.00,66.00,27.00,92.00,32.00,10.00,84.00,9.00,37.00,60.00,97.00,29.00,41.00,173.26,0",
						"229,3.00,91.00,2.00,26.00,15.00,61.00,54.00,60.00,98.00,89.00,66.00,18.00,32.00,92.00,200.47,0",
						"230,39.00,36.00,74.00,3.00,89.00,29.00,95.00,34.00,7.00,38.00,59.00,65.00,20.00,16.00,152.63,0",
						"231,37.00,46.00,44.00,4.00,64.00,51.00,42.00,66.00,3.00,37.00,66.00,13.00,9.00,30.00,133.20,0",
						"232,32.00,28.00,57.00,92.00,3.00,80.00,87.00,46.00,57.00,46.00,67.00,56.00,12.00,49.00,141.83,0",
						"233,27.00,63.00,58.00,83.00,67.00,66.00,14.00,57.00,50.00,89.00,82.00,13.00,28.00,61.00,155.66,0",
						"234,2.00,31.00,99.00,69.00,95.00,60.00,24.00,41.00,57.00,27.00,94.00,92.00,2.00,17.00,151.47,0",
						"235,34.00,80.00,28.00,17.00,2.00,41.00,7.00,61.00,48.00,34.00,8.00,44.00,0.00,17.00,152.73,0",
						"236,21.49,25.11,8.79,5.34,0.63,12.87,2.20,87.76,15.07,10.67,2.51,13.81,68.61,5.42,100.67,0",
						"237,40.54,7.88,2.76,1.68,0.20,8.99,4.58,77.72,4.73,3.35,0.79,4.33,31.61,9.15,38.29,0",
						"238,46.61,2.39,0.84,0.51,0.06,7.76,5.33,74.53,1.44,1.02,0.24,1.32,19.83,10.34,12.17,1",
						"239,48.42,0.75,0.26,0.16,0.02,7.39,5.56,73.57,0.45,0.32,0.08,0.41,16.30,10.69,4.68,1",
						"240,49.00,0.23,0.08,0.05,0.01,7.27,5.63,73.27,0.14,0.10,0.02,0.13,15.18,10.81,1.46,1",
						"241,49.17,0.07,0.03,0.02,0.00,7.23,5.65,73.18,0.04,0.03,0.01,0.04,14.84,10.84,10.12,1",
						"242,49.18,0.02,0.01,0.00,0.00,6.84,5.37,96.31,0.01,0.01,0.00,0.01,14.30,11.76,30.39,1",
						"243,32.84,0.01,0.00,0.00,0.00,6.81,5.30,64.02,0.00,0.00,0.00,0.00,10.08,8.19,21.61,1",
						"244,27.72,0.00,0.00,0.00,0.00,6.80,5.32,53.89,0.00,0.00,0.00,0.00,8.83,7.05,13.44,1",
						"245,26.08,0.00,0.00,0.00,0.00,6.80,5.33,50.66,0.00,0.00,0.00,0.00,8.44,6.68,4.26,1",
						"246,25.60,0.00,0.00,0.00,0.00,6.80,5.33,49.70,0.00,0.00,0.00,0.00,8.32,6.57,4.00,0",
						"247,25.95,0.00,0.00,0.00,0.00,7.37,5.84,49.94,0.00,0.00,0.00,0.00,7.37,5.93,1.84,1",
						"248,25.55,0.00,0.00,0.00,0.00,7.20,5.67,49.46,0.00,0.00,0.00,0.00,7.05,5.57,0.81,1",
						"249,25.43,0.00,0.00,0.00,0.00,7.15,5.62,49.32,0.00,0.00,0.00,0.00,6.95,5.47,2.66,1",
						"250,25.39,0.00,0.00,0.00,0.00,6.86,5.40,49.27,0.00,0.00,0.00,0.00,9.81,9.43,3.11,1",
						"251,25.38,0.00,0.00,0.00,0.00,7.21,5.61,49.26,0.00,0.00,0.00,0.00,9.07,9.05,1.06,0",
						"252,25.37,0.00,0.00,0.00,0.00,7.14,5.58,49.26,0.00,0.00,0.00,0.00,9.07,8.93,9.12,1",
						"253,24.35,0.00,0.00,0.00,0.00,8.43,7.85,31.84,0.00,0.00,0.00,0.00,9.65,9.54,14.61,1",
						"254,24.02,0.00,0.00,0.00,0.00,7.30,5.69,49.25,0.00,0.00,0.00,0.00,9.52,9.61,23.84,1",
						"255,23.93,0.00,0.00,0.00,0.00,6.95,5.45,31.84,0.00,0.00,0.00,0.00,7.73,6.73,12.20,1",
						"256,23.89,0.00,0.00,0.00,0.00,6.84,5.37,26.30,0.00,0.00,0.00,0.00,7.16,5.82,74.42,1",
						"257,20.00,93.00,57.00,49.00,77.00,36.00,4.00,92.00,30.00,99.00,8.00,35.00,44.00,98.00,182.96,0",
						"258,5.00,17.00,24.00,56.00,42.00,49.00,77.00,89.00,74.00,20.00,45.00,93.00,22.00,59.00,155.90,0",
						"259,76.00,25.00,36.00,73.00,38.00,32.00,0.00,61.00,35.00,4.00,31.00,44.00,17.00,89.00,152.93,0",
						"260,29.00,42.00,1.00,96.00,53.00,27.00,74.00,53.00,41.00,77.00,23.00,86.00,80.00,37.00,159.94,0",
						"261,89.00,78.00,71.00,48.00,22.00,34.00,87.00,7.00,13.00,7.00,40.00,87.00,90.00,27.00,157.28,0",
						"262,0.00,43.00,51.00,82.00,64.00,63.00,0.00,77.00,64.00,7.00,4.00,74.00,99.00,45.00,161.40,0",
						"263,53.00,18.00,5.00,48.00,62.00,96.00,9.00,10.00,60.00,0.00,34.00,37.00,6.00,12.00,159.48,0",
						"264,77.00,46.00,75.00,62.00,43.00,6.00,71.00,3.00,69.00,26.00,15.00,20.00,74.00,99.00,151.18,0",
						"265,93.00,44.00,36.00,12.00,59.00,10.00,82.00,56.00,31.00,21.00,38.00,3.00,52.00,29.00,141.14,0",
						"266,78.00,73.00,69.00,45.00,35.00,81.00,95.00,67.00,98.00,77.00,22.00,64.00,99.00,40.00,168.20,0",
						"267,35.30,22.91,21.66,14.12,10.99,25.42,29.82,89.64,30.76,24.17,6.90,20.09,99.69,12.64,128.29,0",
						"268,21.70,6.95,6.57,4.29,3.33,7.72,9.05,96.86,9.33,7.33,2.10,6.10,99.90,3.92,68.42,0",
						"269,23.20,2.18,2.06,1.35,1.05,7.43,6.75,64.20,2.93,2.30,0.66,1.91,37.90,7.80,40.67,1",
						"270,41.08,0.68,0.65,0.42,0.33,7.12,5.88,70.33,0.92,0.72,0.21,0.60,18.04,7.06,14.28,1",
						"271,46.77,0.21,0.20,0.13,0.10,7.03,5.60,72.28,0.28,0.22,0.06,0.18,11.71,6.83,5.91,0",
						"272,48.47,0.07,0.06,0.04,0.03,7.16,5.64,72.87,0.09,0.07,0.02,0.06,13.75,9.59,12.45,1",
						"273,49.01,0.02,0.02,0.01,0.01,6.95,5.47,89.44,0.03,0.02,0.01,0.02,14.60,11.46,22.33,1",
						"274,32.79,0.01,0.01,0.00,0.00,6.84,5.33,61.87,0.01,0.01,0.00,0.01,10.18,8.09,24.11,1",
						"275,27.70,0.00,0.00,0.00,0.00,6.81,5.33,53.21,0.00,0.00,0.00,0.00,8.86,7.02,7.57,1",
						"276,26.08,0.00,0.00,0.00,0.00,6.80,5.33,50.46,0.00,0.00,0.00,0.00,8.44,6.67,2.44,1",
						"277,25.59,0.00,0.00,0.00,0.00,6.80,5.28,49.47,0.00,0.00,0.00,0.00,8.19,6.55,0.83,1",
						"278,25.44,0.00,0.00,0.00,0.00,6.80,5.32,49.32,0.00,0.00,0.00,0.00,8.24,6.53,0.23,1",
						"279,25.39,0.00,0.00,0.00,0.00,6.80,5.33,49.27,0.00,0.00,0.00,0.00,8.25,6.53,1.43,1",
						"280,25.38,0.00,0.00,0.00,0.00,7.97,6.31,49.26,0.00,0.00,0.00,0.00,6.85,5.38,1.31,1",
						"281,25.38,0.00,0.00,0.00,0.00,7.38,5.81,49.26,0.00,0.00,0.00,0.00,6.89,5.41,0.41,1",
						"282,25.37,0.00,0.00,0.00,0.00,7.21,5.66,49.25,0.00,0.00,0.00,0.00,6.91,5.41,2.99,1",
						"283,25.37,0.00,0.00,0.00,0.00,7.13,5.59,49.25,0.00,0.00,0.00,0.00,9.00,8.77,9.89,1",
						"284,24.35,0.00,0.00,0.00,0.00,8.43,7.85,31.84,0.00,0.00,0.00,0.00,9.62,9.49,11.64,1",
						"285,24.02,0.00,0.00,0.00,0.00,8.85,8.57,26.30,0.00,0.00,0.00,0.00,9.82,9.72,4.20,1",
						"286,23.93,0.00,0.00,0.00,0.00,8.97,8.79,24.64,0.00,0.00,0.00,0.00,9.88,9.78,8.50,1",
						"287,23.88,0.00,0.00,0.00,0.00,6.81,5.35,24.09,0.00,0.00,0.00,0.00,7.20,5.83,6.75,1",
						"288,24.32,0.00,0.00,0.00,0.00,6.77,5.32,23.90,0.00,0.00,0.00,0.00,6.94,5.46,80.27,1",
						"289,88.00,79.00,27.00,8.00,25.00,87.00,60.00,53.00,96.00,14.00,38.00,83.00,35.00,77.00,177.89,0",
						"290,86.00,71.00,50.00,85.00,84.00,39.00,38.00,9.00,55.00,90.00,96.00,70.00,91.00,21.00,171.70,0",
						"291,75.00,0.00,83.00,27.00,36.00,91.00,21.00,49.00,99.00,15.00,66.00,76.00,54.00,30.00,138.22,0",
						"292,76.00,16.00,94.00,29.00,6.00,67.00,14.00,63.00,66.00,48.00,28.00,21.00,39.00,98.00,146.41,0",
						"293,99.00,26.00,86.00,97.00,35.00,39.00,59.00,27.00,25.00,38.00,48.00,95.00,86.00,65.00,146.04,0",
						"294,13.00,95.00,24.00,82.00,60.00,48.00,4.00,43.00,57.00,84.00,17.00,13.00,63.00,48.00,150.74,0",
						"295,94.00,25.00,90.00,84.00,43.00,27.00,24.00,8.00,84.00,86.00,58.00,17.00,72.00,12.00,151.41,0",
						"296,44.00,10.00,60.00,93.00,89.00,65.00,67.00,50.00,78.00,53.00,29.00,48.00,50.00,9.00,136.51,0",
						"297,56.00,36.00,75.00,35.00,37.00,29.00,16.00,83.00,64.00,90.00,30.00,0.00,54.00,5.00,130.51,0",
						"298,26.00,14.00,80.00,69.00,1.00,54.00,12.00,61.00,87.00,31.00,89.00,10.00,69.00,41.00,144.60,0",
						"299,89.00,83.00,90.00,67.00,63.00,60.00,2.00,61.00,11.00,16.00,26.00,53.00,21.00,64.00,159.22,0",
						"300,44.32,26.05,28.25,21.03,19.77,23.83,4.54,52.94,3.45,5.02,8.16,16.63,13.14,26.66,114.46,0",
						"301,47.70,8.18,8.87,6.60,6.21,12.27,5.18,66.80,1.08,1.58,2.56,5.22,10.26,12.98,38.72,0",
						"302,48.78,2.48,2.69,2.00,1.88,8.59,5.39,71.21,0.33,0.48,0.78,1.58,9.35,8.63,12.62,1",
						"303,47.39,0.81,0.87,0.65,0.61,8.71,7.26,72.51,0.11,0.16,0.25,0.51,13.02,10.18,15.55,1",
						"304,31.26,0.25,0.27,0.20,0.19,18.19,23.11,72.94,0.03,0.05,0.08,0.16,10.22,7.83,20.59,1",
						"305,31.67,0.08,0.08,0.06,0.06,6.91,5.51,73.07,0.01,0.01,0.02,0.05,14.09,12.61,20.49,1",
						"306,26.24,0.02,0.03,0.02,0.02,6.72,5.35,73.12,0.00,0.00,0.01,0.01,15.34,14.15,10.92,1",
						"307,25.65,0.01,0.01,0.01,0.01,6.77,5.29,56.74,0.00,0.00,0.00,0.00,10.41,8.94,11.61,1",
						"308,25.46,0.00,0.00,0.00,0.00,6.79,5.32,51.60,0.00,0.00,0.00,0.00,8.94,7.28,3.65,1",
						"309,25.40,0.00,0.00,0.00,0.00,6.80,5.33,49.97,0.00,0.00,0.00,0.00,8.47,6.75,1.19,1",
						"310,25.38,0.00,0.00,0.00,0.00,6.80,5.33,49.48,0.00,0.00,0.00,0.00,8.33,6.60,1.30,1",
						"311,25.38,0.00,0.00,0.00,0.00,7.36,5.79,49.32,0.00,0.00,0.00,0.00,7.04,5.55,1.32,1",
						"312,25.37,0.00,0.00,0.00,0.00,7.20,5.65,49.28,0.00,0.00,0.00,0.00,6.95,5.46,7.29,1",
						"313,25.37,0.00,0.00,0.00,0.00,7.15,5.61,49.26,0.00,0.00,0.00,0.00,6.92,5.43,2.19,1",
						"314,25.37,0.00,0.00,0.00,0.00,7.38,5.81,49.26,0.00,0.00,0.00,0.00,8.37,7.77,10.41,1",
						"315,24.35,0.00,0.00,0.00,0.00,8.51,7.92,31.84,0.00,0.00,0.00,0.00,9.43,9.17,17.29,1",
						"316,24.02,0.00,0.00,0.00,0.00,8.87,8.59,26.30,0.00,0.00,0.00,0.00,9.76,9.62,6.01,1",
						"317,24.30,0.00,0.00,0.00,0.00,6.84,5.38,25.56,0.00,0.00,0.00,0.00,9.86,9.76,3.86,1",
						"318,24.01,0.00,0.00,0.00,0.00,8.36,7.82,24.39,0.00,0.00,0.00,0.00,9.90,9.80,1.66,1",
						"319,23.92,0.00,0.00,0.00,0.00,8.82,8.55,24.04,0.00,0.00,0.00,0.00,9.91,9.81,10.81,1",
						"320,41.30,0.00,0.00,0.00,0.00,7.68,6.12,41.76,0.00,0.00,0.00,0.00,7.63,6.52,77.87,1",
						"321,90.00,63.00,14.00,66.00,66.00,2.00,88.00,63.00,54.00,47.00,6.00,90.00,63.00,48.00,167.84,0",
						"322,6.00,31.00,61.00,92.00,68.00,64.00,25.00,24.00,86.00,32.00,35.00,1.00,58.00,58.00,137.72,0",
						"323,8.00,10.00,58.00,54.00,94.00,99.00,51.00,39.00,85.00,2.00,44.00,13.00,92.00,53.00,118.97,0",
						"324,5.00,50.00,53.00,13.00,74.00,76.00,26.00,30.00,29.00,21.00,7.00,57.00,44.00,68.00,135.93,0",
						"325,90.00,71.00,98.00,40.00,94.00,71.00,46.00,99.00,29.00,27.00,41.00,5.00,53.00,24.00,153.70,0",
						"326,25.00,87.00,53.00,84.00,78.00,63.00,81.00,69.00,73.00,6.00,31.00,77.00,9.00,69.00,148.09,0",
						"327,38.00,5.00,81.00,49.00,77.00,79.00,53.00,34.00,14.00,4.00,29.00,55.00,33.00,62.00,133.69,0",
						"328,24.00,0.00,67.00,15.00,11.00,56.00,44.00,7.00,72.00,18.00,12.00,76.00,50.00,84.00,128.38,0",
						"329,11.00,81.00,43.00,32.00,69.00,76.00,46.00,35.00,93.00,61.00,28.00,96.00,58.00,21.00,147.16,0",
						"330,33.00,41.00,67.00,48.00,51.00,16.00,51.00,51.00,70.00,9.00,1.00,21.00,33.00,64.00,140.07,0",
						"331,55.00,81.00,70.00,83.00,55.00,93.00,93.00,3.00,92.00,2.00,77.00,8.00,53.00,61.00,158.24,0",
						"332,55.00,58.00,7.00,82.00,41.00,30.00,82.00,44.00,48.00,62.00,34.00,97.00,7.00,98.00,161.59,0",
						"333,34.67,18.20,2.20,25.74,12.87,14.02,29.35,47.60,15.07,19.46,10.67,30.44,8.96,37.61,76.22,0",
						"334,44.68,5.71,0.69,8.08,4.04,9.19,12.97,65.12,4.73,6.11,3.35,9.56,8.95,16.42,31.38,0",
						"335,30.41,1.79,0.22,2.54,1.27,18.34,24.90,70.62,1.48,1.92,1.05,3.00,8.94,9.79,17.56,1",
						"336,25.86,0.54,0.07,0.77,0.38,21.25,28.70,72.37,0.45,0.58,0.32,0.91,8.94,7.68,5.51,1",
						"337,24.50,0.17,0.02,0.24,0.12,22.12,29.84,72.89,0.14,0.18,0.10,0.29,8.94,7.05,15.77,1",
						"338,23.91,0.05,0.01,0.07,0.04,7.03,5.59,74.54,0.04,0.06,0.03,0.09,13.46,10.76,16.82,1",
						"339,23.89,0.02,0.00,0.02,0.01,6.76,5.37,73.56,0.01,0.02,0.01,0.03,15.15,13.59,10.28,1",
						"340,24.91,0.00,0.00,0.01,0.00,6.78,5.30,56.88,0.00,0.01,0.00,0.01,10.35,8.76,16.02,1",
						"341,25.23,0.00,0.00,0.00,0.00,6.79,5.32,51.65,0.00,0.00,0.00,0.00,8.92,7.23,11.04,1",
						"342,25.23,0.00,0.00,0.00,0.00,8.03,6.41,51.54,0.00,0.00,0.00,0.00,8.11,6.77,4.12,1",
						"343,25.33,0.00,0.00,0.00,0.00,8.13,6.49,49.97,0.00,0.00,0.00,0.00,7.56,6.22,14.99,1",
						"344,41.74,0.00,0.00,0.00,0.00,21.13,23.31,49.48,0.00,0.00,0.00,0.00,6.75,5.60,21.94,1",
						"345,30.58,0.00,0.00,0.00,0.00,8.20,7.08,48.87,0.00,0.00,0.00,0.00,7.43,6.31,19.35,1",
						"346,43.39,0.00,0.00,0.00,0.00,8.71,8.96,48.11,0.00,0.00,0.00,0.00,8.94,8.70,10.46,1",
						"347,47.48,0.00,0.00,0.00,0.00,8.87,9.56,47.87,0.00,0.00,0.00,0.00,9.42,9.46,14.32,1",
						"348,31.29,0.00,0.00,0.00,0.00,8.98,9.10,31.41,0.00,0.00,0.00,0.00,9.76,9.70,15.91,0",
						"349,26.13,0.00,0.00,0.00,0.00,9.01,8.95,26.17,0.00,0.00,0.00,0.00,9.86,9.78,5.47,1",
						"350,24.59,0.00,0.00,0.00,0.00,9.02,8.90,24.60,0.00,0.00,0.00,0.00,9.89,9.80,15.74,1",
						"351,41.36,0.00,0.00,0.00,0.00,7.69,6.13,41.82,0.00,0.00,0.00,0.00,7.62,6.50,20.25,1",
						"352,46.86,0.00,0.00,0.00,0.00,7.96,6.37,47.00,0.00,0.00,0.00,0.00,7.11,5.68,60.10,1",
						"353,67.00,16.00,86.00,51.00,38.00,52.00,3.00,37.00,40.00,65.00,54.00,44.00,66.00,26.00,149.02,0",
						"354,49.00,59.00,56.00,93.00,92.00,64.00,62.00,44.00,21.00,7.00,98.00,61.00,82.00,77.00,142.26,0",
						"355,31.00,72.00,25.00,33.00,21.00,45.00,70.00,0.00,49.00,52.00,41.00,6.00,82.00,62.00,150.27,0",
						"356,2.00,97.00,86.00,37.00,93.00,13.00,51.00,19.00,80.00,5.00,65.00,96.00,93.00,54.00,153.45,0",
						"357,16.00,86.00,39.00,53.00,23.00,38.00,64.00,28.00,9.00,58.00,63.00,26.00,34.00,41.00,142.45,0",
						"358,51.00,75.00,18.00,4.00,20.00,77.00,81.00,79.00,4.00,84.00,33.00,35.00,67.00,77.00,134.86,0",
						"359,20.00,43.00,56.00,54.00,31.00,77.00,59.00,74.00,69.00,77.00,39.00,96.00,59.00,65.00,131.98,0",
						"360,17.00,69.00,84.00,20.00,15.00,8.00,20.00,5.00,76.00,23.00,10.00,99.00,69.00,24.00,133.09,0",
						"361,99.00,23.00,93.00,13.00,63.00,14.00,82.00,36.00,70.00,10.00,79.00,86.00,36.00,44.00,169.41,0",
						"362,11.00,56.00,26.00,48.00,59.00,86.00,57.00,32.00,5.00,56.00,69.00,70.00,17.00,82.00,157.83,0",
						"363,71.00,62.00,84.00,0.00,88.00,9.00,77.00,59.00,34.00,16.00,44.00,0.00,54.00,48.00,145.71,0",
						"364,75.00,26.00,48.00,15.00,83.00,30.00,34.00,49.00,11.00,28.00,4.00,38.00,83.00,60.00,131.76,0",
						"365,39.92,8.16,15.07,4.71,26.05,24.87,31.50,65.56,3.45,8.79,1.26,11.93,32.18,23.47,85.15,0",
						"366,28.92,2.56,4.73,1.48,8.18,23.26,30.72,70.76,1.08,2.76,0.39,3.74,16.23,12.01,30.61,0",
						"367,25.41,0.78,1.44,0.45,2.48,22.74,30.47,72.41,0.33,0.84,0.12,1.14,11.15,8.35,9.63,1",
						"368,24.36,0.24,0.45,0.14,0.78,22.59,30.39,72.91,0.10,0.26,0.04,0.36,9.63,7.26,2.92,1",
						"369,24.03,0.07,0.14,0.04,0.24,22.54,30.37,73.07,0.03,0.08,0.01,0.11,9.15,6.91,0.92,1",
						"370,23.93,0.02,0.04,0.01,0.07,22.52,30.36,73.11,0.01,0.03,0.00,0.03,9.00,6.81,20.61,1",
						"371,23.89,0.01,0.01,0.00,0.02,7.12,6.03,73.13,0.00,0.01,0.00,0.01,15.69,14.60,33.10,0",
						"372,46.76,0.00,0.00,0.00,0.01,7.31,5.88,30.21,0.00,0.00,0.00,0.00,7.99,5.70,23.56,1",
						"373,48.47,0.00,0.00,0.00,0.00,7.09,5.60,25.87,0.00,0.00,0.00,0.00,7.38,5.65,17.47,1",
						"374,32.10,0.00,0.00,0.00,0.00,12.12,11.70,48.28,0.00,0.00,0.00,0.00,7.36,6.07,20.72,1",
						"375,43.87,0.00,0.00,0.00,0.00,22.38,24.95,48.95,0.00,0.00,0.00,0.00,6.69,5.56,16.06,0",
						"376,47.62,0.00,0.00,0.00,0.00,25.65,29.17,49.16,0.00,0.00,0.00,0.00,6.48,5.39,5.14,1",
						"377,48.74,0.00,0.00,0.00,0.00,26.63,30.43,49.22,0.00,0.00,0.00,0.00,6.41,5.34,16.36,1",
						"378,49.10,0.00,0.00,0.00,0.00,8.93,9.78,47.71,0.00,0.00,0.00,0.00,9.61,9.76,15.57,1",
						"379,49.20,0.00,0.00,0.00,0.00,8.93,9.79,47.77,0.00,0.00,0.00,0.00,9.62,9.79,0.56,1",
						"380,49.24,0.00,0.00,0.00,0.00,8.94,9.81,47.76,0.00,0.00,0.00,0.00,9.63,9.79,12.09,1",
						"381,31.84,0.00,0.00,0.00,0.00,9.00,9.17,31.38,0.00,0.00,0.00,0.00,9.82,9.81,20.54,1",
						"382,49.25,0.00,0.00,0.00,0.00,8.34,7.52,48.79,0.00,0.00,0.00,0.00,7.74,6.72,15.62,0",
						"383,49.25,0.00,0.00,0.00,0.00,8.15,6.79,49.11,0.00,0.00,0.00,0.00,7.14,5.74,4.20,1",
						"384,49.12,0.00,0.00,0.00,0.00,8.38,6.71,49.10,0.00,0.00,0.00,0.00,7.10,5.57,79.55,1",
						"385,36.00,59.00,39.00,74.00,36.00,98.00,17.00,52.00,91.00,29.00,72.00,88.00,23.00,20.00,152.78,0",
						"386,79.00,11.00,39.00,75.00,34.00,94.00,85.00,87.00,99.00,39.00,45.00,63.00,80.00,60.00,143.11,0",
						"387,76.00,82.00,46.00,50.00,40.00,29.00,82.00,95.00,3.00,14.00,73.00,69.00,88.00,5.00,161.08,0",
						"388,17.00,20.00,41.00,69.00,64.00,91.00,7.00,38.00,45.00,4.00,24.00,98.00,41.00,9.00,140.75,0",
						"389,71.00,35.00,61.00,70.00,67.00,34.00,33.00,73.00,77.00,18.00,30.00,58.00,60.00,15.00,140.06,0",
						"390,5.00,69.00,7.00,13.00,8.00,65.00,66.00,0.00,78.00,75.00,43.00,31.00,31.00,24.00,161.16,0",
						"391,96.00,58.00,86.00,92.00,37.00,81.00,50.00,92.00,27.00,82.00,96.00,35.00,28.00,70.00,173.21,0",
						"392,43.00,5.00,31.00,57.00,11.00,17.00,41.00,73.00,92.00,65.00,18.00,82.00,79.00,8.00,157.67,0",
						"393,18.00,0.00,3.00,80.00,12.00,32.00,14.00,13.00,36.00,40.00,43.00,15.00,80.00,30.00,171.39,0",
						"394,88.00,40.00,45.00,45.00,24.00,62.00,89.00,69.00,99.00,60.00,41.00,89.00,2.00,55.00,159.74,0",
						"395,26.00,94.00,14.00,41.00,25.00,2.00,63.00,58.00,7.00,74.00,49.00,84.00,27.00,65.00,143.94,0",
						"396,23.00,53.00,51.00,3.00,0.00,31.00,95.00,91.00,70.00,20.00,36.00,70.00,19.00,55.00,150.13,0",
						"397,8.00,80.00,18.00,52.00,88.00,49.00,8.00,55.00,59.00,60.00,1.00,0.00,83.00,24.00,156.84,0",
						"398,18.90,25.11,5.65,16.32,27.62,30.83,23.34,67.44,18.52,18.83,0.31,0.00,32.18,12.17,91.27,0",
						"399,22.32,7.88,1.77,5.12,8.67,25.13,28.15,71.35,5.81,5.91,0.10,0.00,16.23,8.46,28.71,0",
						"400,23.41,2.39,0.54,1.55,2.63,23.31,29.69,72.59,1.76,1.79,0.03,0.00,11.15,7.28,8.98,1",
						"401,23.73,0.75,0.17,0.49,0.83,22.77,30.15,72.96,0.55,0.56,0.01,0.00,9.63,6.92,17.40,1",
						"402,23.84,0.23,0.05,0.15,0.25,11.70,13.09,73.08,0.17,0.17,0.00,0.00,13.91,12.34,35.89,1",
						"403,46.74,0.07,0.02,0.05,0.08,8.72,8.09,30.06,0.05,0.05,0.00,0.00,7.64,5.36,27.65,1",
						"404,48.46,0.02,0.01,0.01,0.02,7.53,6.29,25.82,0.02,0.02,0.00,0.00,7.27,5.54,3.29,1",
						"405,49.01,0.01,0.00,0.00,0.01,7.15,5.72,24.47,0.01,0.01,0.00,0.00,7.15,5.60,8.01,1",
						"406,49.18,0.00,0.00,0.00,0.00,20.82,23.07,41.47,0.00,0.00,0.00,0.00,6.63,5.41,17.15,1",
						"407,49.23,0.00,0.00,0.00,0.00,25.18,28.60,46.89,0.00,0.00,0.00,0.00,6.46,5.35,5.60,1",
						"408,49.25,0.00,0.00,0.00,0.00,26.89,30.78,49.02,0.00,0.00,0.00,0.00,6.39,5.32,1.87,1",
						"409,49.25,0.00,0.00,0.00,0.00,27.02,30.94,49.18,0.00,0.00,0.00,0.00,6.39,5.32,0.38,1",
						"410,49.25,0.00,0.00,0.00,0.00,27.06,30.99,49.23,0.00,0.00,0.00,0.00,6.38,5.32,15.51,1",
						"411,49.27,0.00,0.00,0.00,0.00,9.11,10.02,47.75,0.00,0.00,0.00,0.00,9.62,9.77,17.31,1",
						"412,49.26,0.00,0.00,0.00,0.00,8.99,9.88,47.76,0.00,0.00,0.00,0.00,9.63,9.79,3.27,1",
						"413,49.68,0.00,0.00,0.00,0.00,8.35,6.76,49.21,0.00,0.00,0.00,0.00,7.97,7.05,18.15,0",
						"414,49.38,0.00,0.00,0.00,0.00,8.37,6.72,49.24,0.00,0.00,0.00,0.00,7.31,5.91,1.74,1",
						"415,49.29,0.00,0.00,0.00,0.00,8.17,6.55,49.25,0.00,0.00,0.00,0.00,7.02,5.51,10.16,1",
						"416,49.27,0.00,0.00,0.00,0.00,22.30,26.28,32.87,0.00,0.00,0.00,0.00,8.47,7.91,84.68,1",
						"417,89.00,51.00,34.00,8.00,96.00,56.00,78.00,92.00,81.00,86.00,71.00,63.00,30.00,41.00,165.01,0",
						"418,1.00,16.00,78.00,39.00,5.00,99.00,30.00,97.00,60.00,87.00,72.00,23.00,34.00,45.00,151.39,0",
						"419,43.00,71.00,66.00,66.00,83.00,70.00,48.00,86.00,96.00,83.00,36.00,32.00,34.00,45.00,155.10,0",
						"420,69.00,60.00,10.00,16.00,41.00,69.00,52.00,51.00,27.00,17.00,70.00,81.00,20.00,36.00,132.35,0",
						"421,25.00,29.00,44.00,37.00,96.00,65.00,1.00,43.00,13.00,56.00,14.00,72.00,21.00,84.00,133.01,0",
						"422,26.00,95.00,56.00,56.00,4.00,4.00,10.00,21.00,8.00,50.00,13.00,72.00,27.00,42.00,133.65,0",
						"423,62.00,52.00,35.00,7.00,39.00,30.00,14.00,1.00,63.00,59.00,80.00,78.00,30.00,9.00,166.14,0",
						"424,26.00,32.00,89.00,90.00,82.00,6.00,74.00,54.00,26.00,15.00,97.00,20.00,60.00,89.00,184.46,0",
						"425,77.00,69.00,83.00,49.00,14.00,94.00,5.00,91.00,45.00,60.00,16.00,50.00,39.00,57.00,159.12,0",
						"426,76.00,40.00,28.00,24.00,58.00,81.00,94.00,22.00,56.00,69.00,26.00,1.00,85.00,3.00,157.83,0",
						"427,78.00,66.00,32.00,11.00,86.00,80.00,37.00,24.00,18.00,92.00,74.00,93.00,76.00,88.00,164.49,0",
						"428,54.00,19.00,76.00,71.00,36.00,5.00,87.00,19.00,80.00,55.00,42.00,86.00,2.00,79.00,148.23,0",
						"429,96.00,67.00,86.00,5.00,63.00,71.00,69.00,15.00,77.00,88.00,42.00,30.00,26.00,61.00,161.63,0",
						"430,31.00,9.00,19.00,90.00,15.00,8.00,89.00,3.00,4.00,36.00,32.00,45.00,81.00,74.00,159.70,0",
						"431,26.12,2.82,5.96,28.25,4.71,17.96,48.76,51.12,1.26,11.30,10.04,14.12,31.55,27.87,93.54,0",
						"432,24.58,0.89,1.87,8.87,1.48,21.09,36.13,66.23,0.39,3.55,3.15,4.43,16.03,13.39,36.66,0",
						"433,41.51,0.28,0.59,2.78,0.46,12.16,15.78,38.20,0.12,1.11,0.99,1.39,9.83,7.96,36.07,0",
						"434,46.82,0.09,0.18,0.87,0.15,8.56,8.68,29.40,0.04,0.35,0.31,0.44,8.27,5.99,20.96,1",
						"435,48.49,0.03,0.06,0.27,0.05,7.48,6.48,25.61,0.01,0.11,0.10,0.14,7.47,5.74,4.32,1",
						"436,49.02,0.01,0.02,0.08,0.01,7.14,5.78,24.41,0.00,0.03,0.03,0.04,7.21,5.66,1.52,1",
						"437,49.19,0.00,0.00,0.02,0.00,7.21,5.74,25.36,0.00,0.01,0.01,0.01,7.38,5.21,15.33,1",
						"438,49.23,0.00,0.00,0.01,0.00,21.54,23.78,41.76,0.00,0.00,0.00,0.00,10.43,12.95,14.37,0",
						"439,49.25,0.00,0.00,0.00,0.00,25.34,28.74,46.90,0.00,0.00,0.00,0.00,7.65,7.71,5.68,1",
						"440,49.25,0.00,0.00,0.00,0.00,26.55,30.32,48.54,0.00,0.00,0.00,0.00,6.77,6.05,1.84,0",
						"441,49.25,0.00,0.00,0.00,0.00,26.91,30.79,49.03,0.00,0.00,0.00,0.00,6.50,5.55,3.26,1",
						"442,50.70,0.00,0.00,0.00,0.00,29.09,34.75,48.50,0.00,0.00,0.00,0.00,8.74,6.66,7.40,0",
						"443,66.10,0.00,0.00,0.00,0.00,33.58,37.38,49.23,0.00,0.00,0.00,0.00,12.00,12.41,29.82,1",
						"444,49.72,0.00,0.00,0.00,0.00,7.50,6.26,49.25,0.00,0.00,0.00,0.00,12.70,15.91,36.47,1",
						"445,66.81,0.00,0.00,0.00,0.00,29.10,36.62,49.25,0.00,0.00,0.00,0.00,13.60,12.30,34.99,1",
						"446,49.30,0.00,0.00,0.00,0.00,7.96,6.37,49.25,0.00,0.00,0.00,0.00,8.82,9.28,29.78,1",
						"447,49.27,0.00,0.00,0.00,0.00,22.24,26.23,32.87,0.00,0.00,0.00,0.00,9.03,9.09,31.88,1",
						"448,49.26,0.00,0.00,0.00,0.00,26.79,32.55,27.65,0.00,0.00,0.00,0.00,9.10,9.03,62.14,1",
						"449,79.00,69.00,13.00,41.00,54.00,2.00,82.00,8.00,56.00,57.00,91.00,28.00,11.00,22.00,153.46,0",
						"450,25.00,86.00,69.00,40.00,89.00,47.00,81.00,8.00,33.00,52.00,72.00,49.00,61.00,32.00,149.87,0",
						"451,28.00,44.00,6.00,12.00,6.00,65.00,50.00,46.00,6.00,16.00,18.00,79.00,68.00,11.00,152.38,0",
						"452,62.00,24.00,54.00,22.00,57.00,88.00,28.00,37.00,46.00,85.00,34.00,35.00,58.00,64.00,119.01,0",
						"453,44.00,62.00,49.00,23.00,20.00,99.00,33.00,6.00,22.00,19.00,44.00,93.00,48.00,77.00,115.44,0",
						"454,86.00,66.00,58.00,36.00,42.00,74.00,8.00,33.00,52.00,43.00,23.00,59.00,33.00,18.00,121.74,0",
						"455,90.00,13.00,95.00,86.00,93.00,24.00,75.00,57.00,21.00,59.00,40.00,22.00,8.00,37.00,157.29,0",
						"456,86.00,13.00,24.00,55.00,40.00,44.00,99.00,41.00,61.00,66.00,5.00,51.00,9.00,58.00,147.48,0",
						"457,29.00,85.00,84.00,50.00,47.00,79.00,59.00,93.00,15.00,13.00,42.00,56.00,27.00,91.00,147.88,0",
						"458,95.00,9.00,87.00,49.00,6.00,82.00,78.00,86.00,92.00,30.00,82.00,59.00,93.00,45.00,161.13,0",
						"459,65.00,18.00,48.00,6.00,87.00,8.00,29.00,77.00,99.00,33.00,14.00,7.00,45.00,76.00,178.85,0",
						"460,65.00,83.00,27.00,27.00,43.00,87.00,40.00,21.00,86.00,80.00,42.00,90.00,36.00,27.00,163.09,0",
						"461,56.00,52.00,19.00,9.00,52.00,36.00,85.00,70.00,0.00,33.00,41.00,11.00,20.00,57.00,140.92,0",
						"462,81.00,29.00,88.00,12.00,47.00,22.00,7.00,28.00,31.00,7.00,46.00,7.00,63.00,36.00,142.07,0",
						"463,37.00,64.00,54.00,4.00,52.00,65.00,26.00,76.00,99.00,17.00,21.00,44.00,96.00,34.00,139.04,0",
						"464,28.00,20.09,16.95,1.26,16.32,35.85,28.99,74.03,31.07,5.34,6.59,13.81,36.26,15.31,99.67,0",
						"465,25.17,6.30,5.32,0.39,5.12,26.70,29.93,73.42,9.75,1.67,2.07,4.33,17.51,9.45,78.55,0",
						"466,41.70,1.98,1.67,0.12,1.61,13.92,13.83,40.45,3.06,0.53,0.65,1.36,10.30,6.72,36.69,0",
						"467,46.88,0.62,0.52,0.04,0.50,9.11,8.07,30.11,0.96,0.16,0.20,0.43,8.42,5.61,12.22,0",
						"468,48.51,0.19,0.16,0.01,0.16,7.65,6.28,25.83,0.30,0.05,0.06,0.13,7.52,5.62,17.90,1",
						"469,49.02,0.06,0.05,0.00,0.05,21.68,23.95,41.90,0.09,0.02,0.02,0.04,10.47,13.08,19.77,1",
						"470,49.18,0.02,0.02,0.00,0.02,26.15,29.58,47.02,0.03,0.00,0.01,0.01,11.42,15.45,7.64,1",
						"471,50.26,0.01,0.00,0.00,0.00,28.64,33.75,48.55,0.01,0.00,0.00,0.00,9.61,9.44,6.72,1",
						"472,49.57,0.00,0.00,0.00,0.00,27.57,31.87,49.03,0.00,0.00,0.00,0.00,7.40,6.61,4.05,1",
						"473,50.73,0.00,0.00,0.00,0.00,29.75,35.61,49.25,0.00,0.00,0.00,0.00,8.82,6.78,3.02,1",
						"474,50.74,0.00,0.00,0.00,0.00,29.77,35.64,49.25,0.00,0.00,0.00,0.00,8.80,6.72,0.44,0",
						"475,50.74,0.00,0.00,0.00,0.00,29.77,35.65,49.25,0.00,0.00,0.00,0.00,8.79,6.70,14.80,1",
						"476,67.13,0.00,0.00,0.00,0.00,36.12,46.44,48.83,0.00,0.00,0.00,0.00,11.88,9.05,21.71,0",
						"477,72.35,0.00,0.00,0.00,0.00,38.11,49.27,49.13,0.00,0.00,0.00,0.00,13.36,10.16,13.73,1",
						"478,56.50,0.00,0.00,0.00,0.00,31.70,39.69,32.83,0.00,0.00,0.00,0.00,10.46,9.37,28.83,1",
						"479,67.91,0.00,0.00,0.00,0.00,41.91,50.01,26.69,0.00,0.00,0.00,0.00,7.98,6.68,21.47,1",
						"480,50.74,0.00,0.00,0.00,0.00,24.72,30.06,25.35,0.00,0.00,0.00,0.00,7.46,6.24,83.20,1",
						"481,37.00,21.00,82.00,76.00,51.00,95.00,94.00,97.00,59.00,58.00,4.00,28.00,62.00,43.00,172.85,0",
						"482,69.00,37.00,69.00,11.00,42.00,65.00,31.00,85.00,76.00,29.00,55.00,72.00,2.00,90.00,155.41,0",
						"483,7.00,5.00,16.00,86.00,17.00,57.00,2.00,42.00,3.00,85.00,55.00,47.00,26.00,42.00,145.09,0",
						"484,68.00,78.00,19.00,53.00,57.00,48.00,41.00,77.00,66.00,99.00,48.00,40.00,32.00,57.00,127.20,0",
						"485,3.00,27.00,50.00,55.00,18.00,74.00,59.00,5.00,6.00,85.00,58.00,53.00,21.00,29.00,135.89,0",
						"486,42.00,33.00,24.00,54.00,29.00,75.00,52.00,1.00,31.00,52.00,49.00,91.00,8.00,76.00,120.26,0",
						"487,21.00,94.00,2.00,42.00,36.00,49.00,18.00,48.00,73.00,35.00,70.00,34.00,22.00,99.00,165.78,0",
						"488,96.00,9.00,86.00,51.00,26.00,70.00,24.00,62.00,1.00,81.00,35.00,52.00,48.00,16.00,152.65,0",
						"489,89.00,2.00,25.00,8.00,62.00,68.00,48.00,52.00,37.00,80.00,78.00,93.00,38.00,88.00,154.34,0",
						"490,10.00,19.00,62.00,88.00,54.00,58.00,40.00,93.00,95.00,91.00,39.00,62.00,30.00,14.00,164.24,0",
						"491,58.00,58.00,19.00,77.00,40.00,70.00,74.00,4.00,23.00,21.00,46.00,93.00,78.00,94.00,169.85,0",
						"492,77.00,18.00,56.00,34.00,61.00,14.00,77.00,28.00,9.00,12.00,41.00,6.00,41.00,16.00,150.06,0",
						"493,48.00,30.00,56.00,76.00,60.00,53.00,33.00,51.00,54.00,19.00,41.00,50.00,12.00,98.00,130.96,0",
						"494,78.00,43.00,64.00,25.00,52.00,91.00,34.00,61.00,73.00,47.00,9.00,83.00,89.00,64.00,127.89,0",
						"495,99.00,27.00,9.00,56.00,20.00,86.00,65.00,33.00,52.00,15.00,52.00,53.00,84.00,65.00,128.81,0",
						"496,78.00,96.00,5.00,41.00,6.00,83.00,91.00,18.00,3.00,53.00,14.00,84.00,54.00,95.00,157.51,0",
						"497,98.00,28.00,45.00,29.00,48.00,90.00,94.00,56.00,66.00,29.00,99.00,44.00,44.00,20.00,149.86,0",
						"498,64.55,8.79,14.12,9.10,15.07,47.53,51.48,51.37,20.71,9.10,31.07,13.81,21.93,17.59,101.09,0",
						"499,54.06,2.76,4.43,2.86,4.73,20.46,20.59,33.53,6.50,2.86,9.75,4.33,11.68,9.28,40.58,0",
						"500,50.76,0.87,1.39,0.90,1.48,25.70,28.44,44.32,2.04,0.90,3.06,1.36,11.78,14.23,19.78,1",
						"501,49.71,0.26,0.42,0.27,0.45,27.37,30.94,47.76,0.62,0.27,0.93,0.41,11.81,15.80,6.28,1",
						"502,49.40,0.08,0.13,0.09,0.14,28.16,32.11,48.62,0.19,0.09,0.29,0.13,11.84,16.28,1.98,1",
						"503,49.30,0.03,0.04,0.03,0.04,28.12,32.05,49.06,0.06,0.03,0.09,0.04,11.83,16.43,4.07,1",
						"504,50.29,0.01,0.01,0.01,0.01,29.25,34.52,49.19,0.02,0.01,0.03,0.01,9.74,9.75,6.43,0",
						"505,50.61,0.00,0.00,0.00,0.00,29.61,35.31,49.24,0.01,0.00,0.01,0.00,9.08,7.62,1.85,1",
						"506,50.70,0.00,0.00,0.00,0.00,29.72,35.55,49.25,0.00,0.00,0.00,0.00,8.88,6.98,11.43,1",
						"507,67.13,0.00,0.00,0.00,0.00,36.11,46.48,48.80,0.00,0.00,0.00,0.00,11.85,9.05,14.28,1",
						"508,72.35,0.00,0.00,0.00,0.00,38.11,49.28,49.12,0.00,0.00,0.00,0.00,13.35,10.16,5.44,1",
						"509,73.12,0.00,0.00,0.00,0.00,42.55,47.72,49.25,0.00,0.00,0.00,0.00,12.15,13.77,12.85,1",
						"510,73.13,0.00,0.00,0.00,0.00,45.32,52.53,31.84,0.00,0.00,0.00,0.00,8.51,8.06,24.29,0",
						"511,73.13,0.00,0.00,0.00,0.00,46.20,54.06,26.30,0.00,0.00,0.00,0.00,7.35,6.24,6.13,1",
						"512,73.13,0.00,0.00,0.00,0.00,46.47,54.52,24.64,0.00,0.00,0.00,0.00,7.00,5.70,54.60,1",
						"513,26.00,6.00,27.00,18.00,9.00,67.00,88.00,35.00,18.00,4.00,42.00,43.00,43.00,75.00,146.38,0",
						"514,87.00,52.00,28.00,84.00,4.00,50.00,98.00,19.00,35.00,35.00,51.00,60.00,4.00,83.00,135.64,0",
						"515,77.00,17.00,2.00,73.00,16.00,71.00,82.00,68.00,62.00,77.00,72.00,72.00,32.00,55.00,119.53,0",
						"516,7.00,99.00,43.00,67.00,20.00,8.00,50.00,54.00,7.00,80.00,8.00,81.00,52.00,70.00,141.49,0",
						"517,22.00,47.00,21.00,18.00,66.00,63.00,41.00,97.00,95.00,19.00,46.00,87.00,81.00,97.00,164.73,0",
						"518,64.00,61.00,69.00,82.00,53.00,93.00,14.00,93.00,70.00,9.00,99.00,77.00,44.00,62.00,152.82,0",
						"519,85.00,91.00,93.00,38.00,54.00,67.00,17.00,5.00,64.00,26.00,28.00,15.00,80.00,46.00,144.15,0",
						"520,98.00,63.00,10.00,38.00,70.00,93.00,9.00,72.00,74.00,34.00,32.00,34.00,63.00,59.00,129.77,0",
						"521,52.00,69.00,92.00,26.00,39.00,97.00,1.00,48.00,91.00,89.00,6.00,60.00,19.00,58.00,163.60,0",
						"522,27.00,25.00,30.00,52.00,91.00,32.00,76.00,65.00,37.00,9.00,95.00,23.00,20.00,5.00,157.67,0",
						"523,81.00,17.00,70.00,17.00,29.00,42.00,52.00,89.00,16.00,9.00,68.00,92.00,24.00,89.00,153.32,0",
						"524,34.00,15.00,87.00,29.00,11.00,9.00,34.00,17.00,65.00,63.00,77.00,57.00,57.00,45.00,141.68,0",
						"525,12.00,61.00,3.00,34.00,29.00,70.00,79.00,80.00,97.00,67.00,9.00,80.00,45.00,81.00,154.14,0",
						"526,78.00,57.00,89.00,75.00,71.00,83.00,68.00,81.00,39.00,40.00,59.00,48.00,4.00,23.00,156.93,0",
						"527,32.00,78.00,79.00,25.00,91.00,92.00,73.00,29.00,80.00,58.00,23.00,63.00,96.00,70.00,152.12,0",
						"528,18.00,86.00,55.00,57.00,52.00,80.00,15.00,99.00,11.00,75.00,30.00,98.00,63.00,53.00,143.07,0",
						"529,98.00,43.00,4.00,32.00,89.00,49.00,58.00,16.00,17.00,62.00,56.00,46.00,38.00,4.00,145.85,0",
						"530,25.00,60.00,59.00,1.00,17.00,95.00,80.00,44.00,93.00,36.00,82.00,45.00,34.00,67.00,141.17,0",
						"531,41.64,18.83,18.52,0.31,5.34,49.10,47.09,47.60,29.19,11.30,25.74,14.12,18.79,32.34,96.43,0",
						"532,46.94,5.72,5.62,0.10,1.62,34.47,36.60,48.75,8.86,3.43,7.81,4.29,13.94,21.30,30.23,0",
						"533,48.53,1.79,1.76,0.03,0.51,30.10,33.46,49.10,2.78,1.08,2.45,1.35,12.49,18.00,21.60,0",
						"534,49.03,0.54,0.54,0.01,0.15,28.71,32.47,49.21,0.84,0.33,0.74,0.41,12.03,16.95,6.72,1",
						"535,49.18,0.17,0.17,0.00,0.05,28.29,32.17,49.24,0.26,0.10,0.23,0.13,11.89,16.63,9.33,1",
						"536,50.58,0.05,0.05,0.00,0.01,36.06,41.66,49.25,0.08,0.03,0.07,0.04,7.40,6.52,8.94,0",
						"537,50.70,0.02,0.02,0.00,0.00,31.75,37.54,49.25,0.03,0.01,0.02,0.01,8.35,6.64,9.68,1",
						"538,65.64,0.01,0.01,0.00,0.00,41.45,48.18,49.25,0.01,0.00,0.01,0.00,11.44,12.66,17.33,0",
						"539,70.86,0.00,0.00,0.00,0.00,42.22,47.86,49.25,0.00,0.00,0.00,0.00,11.93,13.43,7.93,1",
						"540,73.44,0.00,0.00,0.00,0.00,39.99,49.67,49.25,0.00,0.00,0.00,0.00,13.36,11.52,10.22,1",
						"541,73.23,0.00,0.00,0.00,0.00,44.52,53.14,31.84,0.00,0.00,0.00,0.00,8.89,7.36,33.66,1",
						"542,91.60,0.00,0.00,0.00,0.00,69.44,85.29,43.79,0.00,0.00,0.00,0.00,7.40,5.94,39.39,1",
						"543,74.53,0.00,0.00,0.00,0.00,42.86,52.26,25.29,0.00,0.00,0.00,0.00,7.12,5.46,40.73,1",
						"544,73.56,0.00,0.00,0.00,0.00,45.46,53.98,24.31,0.00,0.00,0.00,0.00,6.93,5.45,90.64,1",
						"545,92.00,97.00,90.00,94.00,81.00,75.00,98.00,33.00,65.00,64.00,82.00,84.00,98.00,83.00,210.24,0",
						"546,37.00,43.00,56.00,27.00,55.00,42.00,68.00,80.00,68.00,86.00,7.00,82.00,86.00,2.00,152.11,0",
						"547,68.00,65.00,47.00,60.00,39.00,67.00,80.00,56.00,95.00,69.00,63.00,57.00,43.00,69.00,120.40,0",
						"548,19.00,58.00,57.00,84.00,29.00,49.00,7.00,97.00,9.00,72.00,10.00,22.00,36.00,44.00,134.53,0",
						"549,65.00,47.00,88.00,39.00,8.00,61.00,90.00,85.00,44.00,48.00,15.00,20.00,42.00,9.00,152.30,0",
						"550,26.00,17.00,7.00,11.00,59.00,3.00,50.00,76.00,88.00,59.00,46.00,9.00,17.00,61.00,146.89,0",
						"551,12.00,96.00,58.00,47.00,85.00,70.00,82.00,89.00,88.00,5.00,53.00,53.00,70.00,79.00,151.30,0",
						"552,34.00,92.00,39.00,78.00,33.00,49.00,2.00,88.00,52.00,66.00,43.00,51.00,37.00,26.00,133.83,0",
						"553,88.00,13.00,25.00,94.00,46.00,21.00,48.00,32.00,41.00,91.00,36.00,34.00,6.00,74.00,156.77,0",
						"554,12.00,52.00,38.00,54.00,86.00,90.00,91.00,0.00,90.00,32.00,68.00,54.00,63.00,7.00,139.00,0",
						"555,14.00,91.00,35.00,89.00,82.00,91.00,83.00,18.00,15.00,61.00,41.00,87.00,17.00,86.00,158.31,0",
						"556,45.00,80.00,48.00,64.00,4.00,25.00,39.00,83.00,67.00,16.00,32.00,67.00,61.00,63.00,141.72,0",
						"557,4.00,63.00,91.00,22.00,77.00,70.00,97.00,57.00,88.00,17.00,95.00,65.00,65.00,81.00,162.53,0",
						"558,14.00,12.00,26.00,15.00,46.00,25.00,44.00,54.00,11.00,9.00,17.00,35.00,41.00,96.00,153.29,0",
						"559,72.00,16.00,40.00,82.00,87.00,0.00,34.00,15.00,22.00,80.00,12.00,22.00,41.00,80.00,153.32,0",
						"560,39.00,34.00,83.00,36.00,61.00,74.00,11.00,61.00,59.00,99.00,60.00,56.00,52.00,55.00,116.16,0",
						"561,58.00,78.00,15.00,89.00,61.00,59.00,17.00,49.00,52.00,61.00,42.00,75.00,7.00,52.00,117.68,0",
						"562,42.00,72.00,37.00,4.00,85.00,72.00,21.00,63.00,44.00,13.00,89.00,46.00,56.00,73.00,134.48,0",
						"563,58.00,22.00,96.00,9.00,35.00,88.00,98.00,12.00,29.00,63.00,35.00,87.00,44.00,70.00,143.13,0",
						"564,52.00,6.90,30.13,2.82,10.99,46.90,52.74,37.56,9.10,19.77,10.99,27.31,21.93,33.28,84.83,0",
						"565,79.06,11.61,16.95,3.14,28.25,37.36,60.68,34.11,23.23,15.07,2.20,1.57,33.13,19.18,87.14,0",
						"566,58.61,3.64,5.32,0.99,8.87,31.01,41.02,44.50,7.29,4.73,0.69,0.49,18.51,17.33,36.79,0",
						"567,53.44,1.11,1.61,0.30,2.69,36.88,44.35,47.81,2.21,1.44,0.21,0.15,9.41,6.73,15.82,1",
						"568,51.59,0.35,0.51,0.09,0.84,36.85,43.17,48.80,0.69,0.45,0.07,0.05,7.70,5.83,3.59,1",
						"569,51.00,0.11,0.15,0.03,0.26,36.84,42.79,49.12,0.21,0.14,0.02,0.01,7.15,5.55,2.81,0",
						"570,50.83,0.03,0.05,0.01,0.08,36.84,42.68,49.21,0.07,0.04,0.01,0.00,6.99,5.46,16.11,0",
						"571,66.73,0.01,0.02,0.00,0.03,43.17,57.57,49.24,0.02,0.01,0.00,0.00,7.65,6.66,15.63,1",
						"572,72.23,0.00,0.00,0.00,0.01,44.46,60.28,49.25,0.01,0.00,0.00,0.00,7.02,5.73,25.81,1",
						"573,91.28,0.00,0.00,0.00,0.00,69.42,87.53,49.25,0.00,0.00,0.00,0.00,6.82,5.43,29.31,0",
						"574,97.35,0.00,0.00,0.00,0.00,77.37,96.22,49.25,0.00,0.00,0.00,0.00,6.75,5.33,21.50,0",
						"575,99.17,0.00,0.00,0.00,0.00,79.75,98.81,49.25,0.00,0.00,0.00,0.00,6.73,5.30,29.55,1",
						"576,73.16,0.00,0.00,0.00,0.00,46.41,54.69,24.64,0.00,0.00,0.00,0.00,6.99,5.56,90.00,0",
						"577,94.00,30.00,6.00,9.00,84.00,59.00,19.00,87.00,88.00,77.00,82.00,8.00,24.00,95.00,184.06,0",
						"578,54.00,44.00,80.00,90.00,16.00,0.00,88.00,97.00,73.00,94.00,46.00,42.00,58.00,68.00,160.78,0",
						"579,14.00,76.00,55.00,36.00,31.00,40.00,47.00,44.00,50.00,53.00,10.00,11.00,5.00,98.00,143.51,0",
						"580,9.00,44.00,93.00,74.00,82.00,94.00,76.00,14.00,0.00,74.00,34.00,47.00,86.00,71.00,167.06,0",
						"581,97.00,14.00,37.00,79.00,4.00,78.00,10.00,42.00,85.00,26.00,56.00,87.00,54.00,8.00,175.60,0",
						"582,42.00,18.00,5.00,10.00,81.00,11.00,57.00,15.00,61.00,94.00,37.00,2.00,64.00,60.00,160.30,0",
						"583,20.00,96.00,67.00,37.00,11.00,8.00,12.00,59.00,23.00,48.00,37.00,51.00,72.00,38.00,158.24,0",
						"584,87.00,84.00,59.00,17.00,40.00,57.00,44.00,46.00,67.00,8.00,63.00,75.00,1.00,10.00,140.68,0",
						"585,28.00,3.00,98.00,33.00,23.00,41.00,51.00,45.00,71.00,95.00,98.00,22.00,35.00,67.00,150.20,0",
						"586,12.00,31.00,1.00,73.00,62.00,30.00,75.00,2.00,67.00,72.00,69.00,54.00,11.00,0.00,144.14,0",
						"587,69.00,26.00,44.00,46.00,64.00,5.00,39.00,13.00,81.00,49.00,50.00,71.00,27.00,93.00,138.26,0",
						"588,25.00,74.00,64.00,10.00,55.00,66.00,96.00,83.00,66.00,64.00,85.00,66.00,39.00,58.00,140.63,0",
						"589,68.00,26.00,33.00,53.00,26.00,90.00,13.00,60.00,23.00,84.00,11.00,72.00,35.00,60.00,156.95,0",
						"590,84.00,75.00,47.00,56.00,71.00,46.00,34.00,37.00,59.00,11.00,76.00,36.00,90.00,69.00,147.83,0",
						"591,9.00,62.00,13.00,60.00,35.00,90.00,8.00,96.00,70.00,86.00,5.00,30.00,37.00,60.00,152.83,0",
						"592,41.00,10.00,50.00,47.00,70.00,80.00,36.00,25.00,85.00,74.00,41.00,5.00,79.00,71.00,129.87,0",
						"593,98.00,64.00,16.00,86.00,55.00,93.00,39.00,46.00,35.00,33.00,81.00,46.00,53.00,63.00,135.06,0",
						"594,55.00,88.00,59.00,53.00,6.00,7.00,16.00,93.00,19.00,3.00,93.00,88.00,42.00,59.00,143.81,0",
						"595,17.00,46.00,40.00,25.00,17.00,47.00,94.00,56.00,55.00,92.00,96.00,51.00,67.00,85.00,156.00,0",
						"596,28.00,26.00,63.00,27.00,75.00,83.00,44.00,43.00,10.00,0.00,27.00,7.00,39.00,76.00,143.64,0",
						"597,35.00,29.00,80.00,91.00,62.00,26.00,16.00,82.00,50.00,88.00,21.00,64.00,5.00,85.00,159.16,0",
						"598,62.19,9.10,25.11,28.56,19.46,31.19,31.28,76.94,15.69,27.62,6.59,20.09,10.97,34.16,111.31,0",
						"599,54.34,2.86,7.88,8.96,6.11,35.06,39.07,57.94,4.93,8.67,2.07,6.30,8.18,14.44,37.31,0",
						"600,51.84,0.87,2.39,2.72,1.85,36.30,41.55,51.89,1.49,2.63,0.63,1.91,7.30,8.16,11.69,1",
						"601,51.09,0.27,0.75,0.85,0.58,36.67,42.29,50.08,0.47,0.83,0.20,0.60,7.03,6.28,17.34,1",
						"602,66.78,0.09,0.24,0.27,0.18,43.17,57.59,49.51,0.15,0.26,0.06,0.19,7.72,7.02,23.58,0",
						"603,72.17,0.03,0.07,0.08,0.06,39.67,59.08,66.74,0.05,0.08,0.02,0.06,12.86,11.99,23.79,0",
						"604,91.26,0.01,0.02,0.03,0.02,67.92,87.16,54.74,0.01,0.03,0.01,0.02,8.65,7.39,37.70,1",
						"605,97.35,0.00,0.01,0.01,0.01,76.91,96.10,50.92,0.00,0.01,0.00,0.01,7.31,5.93,24.03,1",
						"606,74.53,0.00,0.00,0.00,0.00,44.91,60.97,48.35,0.00,0.00,0.00,0.00,7.01,5.60,49.94,1",
						"607,92.27,0.00,0.00,0.00,0.00,69.93,88.15,48.98,0.00,0.00,0.00,0.00,6.81,5.38,24.34,1",
						"608,97.57,0.00,0.00,0.00,0.00,77.41,96.28,49.17,0.00,0.00,0.00,0.00,6.75,5.32,113.85,1",
						"609,72.00,4.00,95.00,3.00,21.00,23.00,39.00,67.00,75.00,97.00,60.00,42.00,51.00,26.00,159.90,0",
						"610,79.00,73.00,27.00,32.00,81.00,97.00,22.00,37.00,37.00,30.00,58.00,68.00,47.00,41.00,157.18,0",
						"611,30.00,71.00,70.00,84.00,14.00,3.00,19.00,37.00,63.00,80.00,88.00,38.00,40.00,0.00,143.92,0",
						"612,47.00,57.00,27.00,51.00,14.00,41.00,50.00,64.00,1.00,23.00,1.00,63.00,24.00,22.00,152.06,0",
						"613,52.00,54.00,99.00,94.00,14.00,51.00,93.00,68.00,50.00,81.00,43.00,93.00,79.00,63.00,150.92,0",
						"614,38.00,96.00,47.00,94.00,88.00,22.00,45.00,94.00,93.00,65.00,7.00,97.00,19.00,33.00,181.31,0",
						"615,71.00,8.00,39.00,24.00,82.00,55.00,71.00,84.00,24.00,55.00,83.00,18.00,7.00,62.00,166.87,0",
						"616,89.00,70.00,37.00,55.00,34.00,14.00,73.00,1.00,23.00,9.00,18.00,83.00,9.00,74.00,148.67,0",
						"617,29.00,63.00,84.00,50.00,74.00,48.00,60.00,75.00,97.00,69.00,62.00,82.00,2.00,3.00,156.37,0",
						"618,95.00,23.00,13.00,86.00,7.00,60.00,38.00,33.00,15.00,16.00,26.00,32.00,56.00,95.00,174.15,0",
						"619,75.00,68.00,36.00,80.00,81.00,38.00,52.00,22.00,93.00,68.00,61.00,24.00,44.00,13.00,141.09,0",
						"620,54.00,36.00,17.00,16.00,74.00,11.00,93.00,73.00,89.00,11.00,16.00,96.00,45.00,25.00,159.00,0",
						"621,1.00,42.00,11.00,78.00,22.00,90.00,13.00,51.00,86.00,53.00,59.00,21.00,64.00,43.00,131.97,0",
						"622,34.00,47.00,80.00,75.00,29.00,90.00,38.00,25.00,58.00,65.00,35.00,22.00,41.00,75.00,123.53,0",
						"623,28.00,28.00,0.00,35.00,27.00,13.00,59.00,60.00,33.00,79.00,89.00,14.00,18.00,78.00,143.72,0",
						"624,28.00,96.00,26.00,30.00,93.00,63.00,57.00,47.00,11.00,68.00,43.00,98.00,38.00,82.00,162.84,0",
						"625,6.00,91.00,13.00,97.00,19.00,22.00,41.00,7.00,87.00,83.00,85.00,4.00,2.00,38.00,177.08,0",
						"626,82.00,37.00,21.00,75.00,13.00,9.00,45.00,88.00,84.00,45.00,49.00,41.00,10.00,18.00,142.86,0",
						"627,70.00,52.00,82.00,90.00,7.00,26.00,58.00,99.00,3.00,45.00,3.00,60.00,9.00,78.00,159.32,0",
						"628,61.00,2.00,71.00,0.00,14.00,18.00,68.00,38.00,60.00,66.00,64.00,5.00,98.00,77.00,151.82,0",
						"629,7.00,0.00,80.00,21.00,93.00,19.00,91.00,52.00,93.00,25.00,20.00,99.00,57.00,82.00,155.32,0",
						"630,50.00,84.00,82.00,20.00,51.00,86.00,78.00,44.00,88.00,87.00,10.00,93.00,69.00,94.00,148.68,0",
						"631,66.90,26.36,25.74,6.28,16.01,50.02,50.74,65.01,27.62,27.31,3.14,29.19,31.05,36.98,112.31,0",
						"632,55.82,8.27,8.08,1.97,5.02,40.97,45.18,54.20,8.67,8.57,0.99,9.16,14.49,15.33,42.45,0",
						"633,73.89,2.51,2.45,0.60,1.52,39.21,58.91,73.71,2.63,2.60,0.30,2.78,16.72,16.42,23.52,0",
						"634,74.40,0.79,0.77,0.19,0.48,38.43,59.50,74.34,0.83,0.82,0.09,0.87,15.69,14.94,9.99,1",
						"635,74.56,0.24,0.23,0.06,0.15,38.18,59.69,74.54,0.25,0.25,0.03,0.26,15.36,14.47,3.14,0",
						"636,74.60,0.08,0.07,0.02,0.05,38.11,59.74,74.60,0.08,0.08,0.01,0.08,15.26,14.32,24.48,0",
						"637,92.03,0.02,0.02,0.01,0.01,67.42,87.36,57.21,0.02,0.02,0.00,0.03,9.40,8.12,34.50,1",
						"638,97.58,0.01,0.01,0.00,0.00,76.77,96.17,51.67,0.01,0.01,0.00,0.01,7.54,6.15,22.86,0",
						"639,99.24,0.00,0.00,0.00,0.00,79.56,98.80,50.01,0.00,0.00,0.00,0.00,6.98,5.56,35.07,0",
						"640,74.63,0.00,0.00,0.00,0.00,38.88,49.70,1.49,0.00,0.00,0.00,0.00,5.73,9.95,92.95,0",
						"641,55.00,60.00,86.00,71.00,4.00,10.00,22.00,91.00,2.00,77.00,50.00,35.00,57.00,32.00,151.77,0",
						"642,58.00,74.00,71.00,83.00,40.00,76.00,30.00,5.00,36.00,42.00,30.00,63.00,98.00,44.00,133.82,0",
						"643,16.00,98.00,80.00,49.00,34.00,12.00,36.00,74.00,26.00,23.00,97.00,37.00,19.00,43.00,156.37,0",
						"644,91.00,28.00,19.00,35.00,50.00,67.00,83.00,52.00,62.00,7.00,33.00,66.00,93.00,90.00,139.95,0",
						"645,76.00,72.00,26.00,36.00,35.00,55.00,91.00,26.00,11.00,26.00,20.00,18.00,71.00,45.00,120.79,0",
						"646,69.00,71.00,74.00,69.00,1.00,68.00,80.00,36.00,0.00,1.00,62.00,22.00,48.00,81.00,156.55,0",
						"647,64.00,51.00,53.00,23.00,85.00,63.00,63.00,95.00,78.00,45.00,2.00,74.00,73.00,20.00,146.06,0",
						"648,44.00,99.00,26.00,5.00,51.00,32.00,3.00,34.00,33.00,45.00,79.00,99.00,8.00,51.00,148.97,0",
						"649,49.00,64.00,56.00,42.00,15.00,23.00,69.00,33.00,91.00,96.00,55.00,47.00,39.00,11.00,128.76,0",
						"650,45.00,20.00,61.00,53.00,33.00,45.00,66.00,23.00,37.00,89.00,91.00,63.00,75.00,53.00,130.36,0",
						"651,78.00,37.00,35.00,70.00,55.00,48.00,67.00,42.00,43.00,2.00,28.00,73.00,62.00,87.00,141.06,0",
						"652,43.00,92.00,25.00,41.00,48.00,53.00,55.00,24.00,50.00,96.00,81.00,13.00,37.00,13.00,147.12,0",
						"653,54.00,97.00,66.00,74.00,40.00,85.00,0.00,2.00,53.00,60.00,56.00,26.00,50.00,61.00,129.61,0",
						"654,14.00,15.00,17.00,55.00,59.00,72.00,56.00,32.00,88.00,24.00,66.00,18.00,29.00,9.00,134.54,0",
						"655,26.00,33.00,31.00,22.00,71.00,42.00,28.00,86.00,77.00,32.00,67.00,18.00,70.00,5.00,134.19,0",
						"656,85.00,4.00,69.00,68.00,60.00,83.00,97.00,74.00,39.00,60.00,36.00,95.00,96.00,51.00,157.54,0",
						"657,50.00,19.00,24.00,6.00,89.00,87.00,94.00,70.00,26.00,95.00,79.00,80.00,65.00,5.00,168.30,0",
						"658,53.00,59.00,27.00,67.00,84.00,2.00,4.00,77.00,13.00,8.00,2.00,79.00,47.00,89.00,178.85,0",
						"659,57.00,31.00,32.00,75.00,12.00,24.00,92.00,77.00,65.00,30.00,93.00,5.00,16.00,28.00,151.73,0",
						"660,55.00,29.00,88.00,28.00,5.00,41.00,23.00,71.00,10.00,43.00,60.00,42.00,57.00,39.00,132.66,0",
						"661,6.00,25.00,10.00,74.00,39.00,71.00,25.00,59.00,44.00,51.00,73.00,97.00,96.00,38.00,142.39,0",
						"662,15.00,65.00,17.00,45.00,38.00,87.00,42.00,22.00,75.00,71.00,27.00,90.00,90.00,95.00,138.48,0",
						"663,87.00,95.00,52.00,96.00,64.00,69.00,73.00,91.00,2.00,51.00,89.00,45.00,9.00,73.00,160.27,0",
						"664,78.51,29.82,16.32,30.13,20.09,44.68,49.17,79.77,0.63,16.01,27.93,14.12,12.22,30.39,108.86,0",
						"665,75.85,9.36,5.12,9.46,6.30,40.15,56.44,76.24,0.20,5.02,8.77,4.43,14.28,19.32,66.68,0",
						"666,75.00,2.84,1.55,2.87,1.91,38.70,58.76,75.12,0.06,1.52,2.66,1.35,14.93,15.80,20.92,0",
						"667,74.74,0.89,0.49,0.90,0.60,38.27,59.45,74.78,0.02,0.48,0.84,0.42,15.13,14.74,6.35,1",
						"668,74.66,0.27,0.15,0.27,0.18,38.13,59.67,74.67,0.01,0.15,0.25,0.13,15.19,14.41,14.95,0",
						"669,74.64,0.08,0.05,0.09,0.06,38.52,52.59,23.44,0.00,0.05,0.08,0.04,8.68,11.44,40.89,0",
						"670,92.04,0.03,0.01,0.03,0.02,67.55,85.12,41.15,0.00,0.01,0.02,0.01,7.34,7.22,47.99,1",
						"671,74.63,0.01,0.00,0.01,0.01,38.69,49.44,0.68,0.00,0.00,0.01,0.00,5.78,10.13,49.97,1",
						"672,74.63,0.00,0.00,0.00,0.00,38.70,49.38,0.21,0.00,0.00,0.00,0.00,5.72,10.10,85.59,0",
						"673,61.00,89.00,73.00,98.00,97.00,69.00,4.00,80.00,86.00,84.00,50.00,39.00,61.00,51.00,172.03,0",
						"674,4.00,97.00,24.00,40.00,84.00,70.00,52.00,49.00,70.00,39.00,51.00,36.00,77.00,98.00,133.94,0",
						"675,60.00,12.00,6.00,67.00,54.00,70.00,2.00,57.00,76.00,33.00,61.00,81.00,74.00,88.00,138.28,0",
						"676,8.00,26.00,5.00,79.00,92.00,87.00,53.00,45.00,89.00,9.00,44.00,22.00,73.00,90.00,151.65,0",
						"677,15.00,43.00,7.00,56.00,5.00,47.00,76.00,85.00,12.00,13.00,21.00,85.00,37.00,16.00,146.86,0",
						"678,59.00,82.00,64.00,8.00,59.00,92.00,28.00,62.00,10.00,74.00,21.00,16.00,21.00,39.00,151.42,0",
						"679,75.00,50.00,99.00,22.00,40.00,61.00,32.00,70.00,91.00,50.00,27.00,98.00,36.00,36.00,110.45,0",
						"680,44.00,78.00,44.00,31.00,43.00,90.00,13.00,52.00,40.00,55.00,11.00,15.00,83.00,29.00,157.99,0",
						"681,85.00,7.00,28.00,25.00,47.00,58.00,57.00,0.00,66.00,9.00,5.00,72.00,51.00,90.00,136.57,0",
						"682,82.00,37.00,5.00,69.00,48.00,9.00,29.00,0.00,51.00,18.00,28.00,32.00,34.00,17.00,132.84,0",
						"683,0.00,58.00,77.00,1.00,37.00,15.00,70.00,13.00,43.00,9.00,62.00,39.00,40.00,70.00,129.16,0",
						"684,23.00,58.00,55.00,38.00,1.00,47.00,76.00,41.00,60.00,12.00,28.00,58.00,5.00,46.00,116.95,0",
						"685,6.00,16.00,51.00,37.00,72.00,48.00,74.00,30.00,72.00,64.00,71.00,53.00,78.00,55.00,131.60,0",
						"686,38.00,45.00,87.00,46.00,43.00,13.00,12.00,11.00,73.00,84.00,29.00,52.00,94.00,97.00,153.40,0",
						"687,29.00,54.00,77.00,94.00,59.00,0.00,93.00,51.00,68.00,84.00,26.00,64.00,67.00,2.00,147.16,0",
						"688,6.00,63.00,26.00,49.00,86.00,31.00,14.00,39.00,84.00,39.00,55.00,44.00,21.00,7.00,142.61,0",
						"689,31.00,82.00,88.00,67.00,89.00,63.00,69.00,85.00,38.00,60.00,37.00,83.00,94.00,7.00,146.61,0",
						"690,19.00,42.00,49.00,1.00,72.00,9.00,10.00,19.00,8.00,92.00,90.00,82.00,16.00,54.00,172.32,0",
						"691,54.00,81.00,69.00,81.00,6.00,3.00,71.00,18.00,50.00,6.00,79.00,91.00,43.00,16.00,153.37,0",
						"692,55.00,6.00,55.00,84.00,55.00,9.00,59.00,61.00,89.00,74.00,26.00,72.00,90.00,6.00,156.78,0",
						"693,14.00,83.00,93.00,25.00,22.00,91.00,37.00,10.00,71.00,58.00,39.00,30.00,45.00,62.00,155.66,0",
						"694,22.00,2.00,83.00,55.00,42.00,94.00,44.00,76.00,9.00,4.00,28.00,50.00,25.00,83.00,148.97,0",
						"695,57.00,44.00,48.00,46.00,3.00,66.00,65.00,92.00,52.00,13.00,34.00,89.00,34.00,53.00,141.17,0",
						"696,15.00,3.00,46.00,51.00,39.00,84.00,26.00,11.00,88.00,77.00,7.00,85.00,73.00,48.00,161.64,0",
						"697,85.00,63.00,19.00,94.00,85.00,91.00,28.00,27.00,20.00,35.00,76.00,67.00,82.00,7.00,171.94,0",
						"698,77.88,19.77,5.96,29.50,26.68,54.68,49.80,59.68,6.28,10.99,23.85,21.03,36.18,11.98,107.61,0",
						"699,75.61,6.00,1.81,8.95,8.10,43.11,56.74,70.09,1.91,3.33,7.24,6.38,21.58,13.57,33.68,0",
						"700,74.94,1.88,0.57,2.81,2.54,39.65,58.82,73.20,0.60,1.05,2.27,2.00,17.21,14.04,68.29,0",
						"701,74.72,0.59,0.18,0.88,0.80,39.00,52.32,22.98,0.19,0.33,0.71,0.63,9.31,11.33,71.02,0",
						"702,74.66,0.19,0.06,0.28,0.25,38.79,50.28,7.21,0.06,0.10,0.22,0.20,6.83,10.48,36.97,0",
						"703,74.64,0.06,0.02,0.08,0.08,38.73,49.64,2.19,0.02,0.03,0.07,0.06,6.04,10.21,9.28,0",
						"704,74.63,0.02,0.01,0.03,0.02,38.71,49.44,0.69,0.01,0.01,0.02,0.02,5.80,10.12,122.93,0",
						"705,68.00,97.00,25.00,60.00,56.00,47.00,61.00,73.00,10.00,20.00,11.00,41.00,11.00,29.00,162.94,0",
						"706,70.00,7.00,16.00,10.00,97.00,83.00,1.00,36.00,31.00,41.00,75.00,18.00,93.00,74.00,155.54,0",
						"707,10.00,46.00,94.00,42.00,66.00,90.00,26.00,83.00,79.00,35.00,24.00,33.00,53.00,67.00,153.01,0",
						"708,65.00,99.00,38.00,3.00,49.00,19.00,54.00,81.00,17.00,50.00,65.00,96.00,60.00,23.00,179.44,0",
						"709,27.00,36.00,12.00,70.00,18.00,2.00,44.00,85.00,82.00,66.00,35.00,47.00,89.00,25.00,128.56,0",
						"710,96.00,45.00,7.00,26.00,53.00,7.00,19.00,31.00,68.00,7.00,64.00,16.00,72.00,48.00,157.63,0",
						"711,77.00,92.00,97.00,22.00,56.00,77.00,62.00,54.00,91.00,87.00,11.00,75.00,19.00,41.00,148.95,0",
						"712,77.00,28.00,44.00,77.00,26.00,9.00,91.00,77.00,95.00,84.00,80.00,50.00,0.00,12.00,172.10,0",
						"713,66.00,36.00,30.00,22.00,77.00,72.00,56.00,67.00,61.00,11.00,45.00,43.00,72.00,45.00,127.62,0",
						"714,78.00,7.00,30.00,95.00,48.00,15.00,54.00,25.00,88.00,28.00,98.00,75.00,23.00,40.00,141.47,0",
						"715,20.00,47.00,15.00,1.00,63.00,76.00,59.00,70.00,97.00,19.00,59.00,62.00,6.00,99.00,158.39,0",
						"716,83.00,67.00,91.00,7.00,17.00,27.00,62.00,51.00,12.00,3.00,14.00,83.00,0.00,47.00,150.17,0",
						"717,63.00,86.00,44.00,38.00,66.00,19.00,31.00,43.00,44.00,94.00,82.00,6.00,45.00,89.00,161.61,0",
						"718,13.00,6.00,36.00,33.00,29.00,84.00,99.00,17.00,97.00,24.00,52.00,95.00,16.00,76.00,192.36,0",
						"719,99.00,59.00,70.00,98.00,47.00,40.00,20.00,67.00,96.00,89.00,23.00,6.00,84.00,93.00,178.15,0",
						"720,1.00,61.00,37.00,3.00,22.00,44.00,15.00,41.00,90.00,17.00,35.00,68.00,57.00,13.00,146.71,0",
						"721,63.00,10.00,73.00,78.00,31.00,24.00,60.00,56.00,45.00,95.00,49.00,45.00,73.00,45.00,153.96,0",
						"722,88.00,97.00,91.00,12.00,50.00,87.00,37.00,48.00,39.00,68.00,18.00,95.00,91.00,82.00,165.88,0",
						"723,1.00,11.00,57.00,24.00,40.00,83.00,67.00,29.00,1.00,30.00,44.00,98.00,94.00,41.00,168.94,0",
						"724,35.00,90.00,21.00,72.00,64.00,41.00,67.00,13.00,45.00,77.00,33.00,72.00,35.00,93.00,157.16,0",
						"725,22.00,31.00,89.00,43.00,24.00,50.00,81.00,90.00,75.00,80.00,22.00,73.00,12.00,2.00,150.43,0",
						"726,1.00,64.00,26.00,43.00,28.00,8.00,88.00,53.00,42.00,94.00,93.00,70.00,60.00,65.00,162.50,0",
						"727,42.00,8.00,26.00,60.00,6.00,21.00,58.00,8.00,4.00,94.00,66.00,26.00,79.00,7.00,160.04,0",
						"728,45.00,75.00,42.00,47.00,19.00,85.00,52.00,46.00,86.00,1.00,73.00,32.00,50.00,91.00,152.21,0",
						"729,40.00,8.00,57.00,4.00,30.00,7.00,61.00,45.00,51.00,48.00,22.00,6.00,45.00,38.00,168.76,0",
						"730,39.00,22.00,20.00,21.00,89.00,45.00,2.00,57.00,91.00,98.00,52.00,96.00,14.00,72.00,161.85,0",
						"731,63.44,6.90,6.28,6.59,27.93,40.25,41.64,69.09,28.56,30.76,16.32,30.13,14.83,32.38,127.41,0",
						"732,83.00,91.00,59.00,75.00,72.00,19.00,80.00,70.00,75.00,73.00,24.00,37.00,0.00,91.00,162.67,0",
						"733,56.00,38.00,36.00,94.00,82.00,99.00,30.00,36.00,83.00,84.00,57.00,25.00,6.00,88.00,156.83,0",
						"734,68.78,11.93,11.30,29.50,25.74,57.62,43.28,11.30,26.05,26.36,17.89,7.85,5.79,34.54,104.07,0",
						"735,72.79,3.74,3.55,9.26,8.08,44.64,47.45,3.55,8.18,8.27,5.61,2.46,5.73,17.76,86.27,0",
						"736,42.00,54.00,87.00,78.00,36.00,49.00,33.00,63.00,91.00,99.00,2.00,25.00,8.00,59.00,170.55,0",
						"737,50.00,85.00,67.00,28.00,5.00,37.00,26.00,47.00,45.00,49.00,97.00,82.00,59.00,91.00,154.33,0",
						"738,22.00,55.00,16.00,83.00,59.00,86.00,71.00,31.00,8.00,32.00,8.00,14.00,79.00,97.00,155.38,0",
						"739,59.00,43.00,74.00,61.00,34.00,3.00,98.00,11.00,97.00,9.00,26.00,10.00,40.00,39.00,152.05,0",
						"740,48.00,18.00,44.00,86.00,58.00,79.00,36.00,1.00,98.00,10.00,12.00,23.00,47.00,57.00,158.11,0",
						"741,3.00,47.00,38.00,43.00,49.00,22.00,0.00,93.00,55.00,28.00,59.00,88.00,83.00,75.00,131.04,0",
						"742,45.00,14.00,49.00,45.00,33.00,52.00,68.00,60.00,56.00,69.00,4.00,65.00,92.00,36.00,131.60,0",
						"743,96.00,3.00,77.00,71.00,31.00,10.00,10.00,74.00,56.00,28.00,3.00,16.00,78.00,84.00,146.82,0",
						"744,72.00,1.00,67.00,98.00,72.00,28.00,1.00,30.00,8.00,52.00,67.00,5.00,40.00,99.00,148.18,0",
						"745,59.00,6.00,29.00,62.00,13.00,62.00,26.00,67.00,67.00,43.00,65.00,32.00,36.00,31.00,121.91,0",
						"746,54.00,34.00,2.00,66.00,5.00,44.00,25.00,38.00,36.00,87.00,19.00,36.00,33.00,98.00,138.32,0",
						"747,94.00,67.00,71.00,13.00,53.00,95.00,9.00,23.00,41.00,92.00,7.00,33.00,53.00,58.00,158.25,0",
						"748,24.00,55.00,77.00,59.00,21.00,30.00,72.00,0.00,76.00,12.00,89.00,56.00,70.00,41.00,144.84,0",
						"749,44.00,77.00,35.00,50.00,83.00,77.00,52.00,52.00,75.00,14.00,39.00,62.00,26.00,30.00,133.99,0",
						"750,71.00,89.00,30.00,43.00,39.00,58.00,15.00,91.00,28.00,45.00,83.00,88.00,35.00,1.00,159.57,0",
						"751,7.00,39.00,94.00,51.00,99.00,86.00,43.00,57.00,79.00,96.00,79.00,24.00,45.00,85.00,170.53,0",
						"752,88.00,98.00,18.00,0.00,14.00,74.00,4.00,10.00,89.00,45.00,2.00,15.00,76.00,55.00,188.54,0",
						"753,12.00,63.00,71.00,75.00,87.00,79.00,58.00,0.00,97.00,43.00,77.00,25.00,6.00,98.00,162.56,0",
						"754,4.00,65.00,86.00,45.00,96.00,36.00,99.00,88.00,49.00,17.00,47.00,10.00,40.00,64.00,167.08,0",
						"755,91.00,68.00,40.00,99.00,39.00,53.00,68.00,10.00,85.00,97.00,32.00,6.00,46.00,8.00,170.94,0",
						"756,61.00,16.00,68.00,55.00,52.00,74.00,67.00,70.00,51.00,45.00,31.00,29.00,23.00,13.00,149.68,0",
						"757,6.00,49.00,62.00,36.00,12.00,25.00,8.00,63.00,6.00,55.00,54.00,91.00,45.00,81.00,157.98,0",
						"758,43.00,90.00,77.00,93.00,14.00,53.00,22.00,26.00,26.00,8.00,15.00,0.00,5.00,34.00,170.09,0",
						"759,32.00,0.00,16.00,27.00,78.00,13.00,64.00,63.00,34.00,99.00,25.00,44.00,16.00,95.00,163.18,0",
						"760,48.00,69.00,52.00,77.00,99.00,51.00,54.00,86.00,86.00,64.00,66.00,19.00,42.00,82.00,131.95,0",
						"761,10.00,71.00,9.00,14.00,77.00,95.00,25.00,63.00,78.00,99.00,97.00,43.00,9.00,25.00,145.87,0",
						"762,6.00,89.00,55.00,9.00,39.00,55.00,48.00,24.00,29.00,47.00,74.00,63.00,71.00,85.00,153.59,0",
						"763,1.00,11.00,37.00,89.00,2.00,47.00,0.00,49.00,29.00,18.00,80.00,41.00,15.00,60.00,158.90,0",
						"764,99.00,35.00,90.00,95.00,59.00,20.00,63.00,47.00,31.00,11.00,26.00,7.00,96.00,31.00,170.62,0",
						"765,13.00,92.00,5.00,41.00,64.00,57.00,58.00,81.00,85.00,40.00,46.00,11.00,50.00,59.00,156.28,0",
						"766,3.00,12.00,20.00,94.00,76.00,43.00,39.00,50.00,41.00,97.00,37.00,72.00,4.00,57.00,134.64,0",
						"767,14.00,4.00,40.00,90.00,62.00,0.00,86.00,38.00,25.00,97.00,81.00,50.00,23.00,50.00,149.36,0",
						"768,47.00,44.00,71.00,97.00,90.00,81.00,42.00,54.00,37.00,3.00,22.00,49.00,50.00,61.00,138.52,0",
						"769,17.00,84.00,50.00,47.00,49.00,43.00,73.00,49.00,57.00,53.00,12.00,98.00,70.00,44.00,130.52,0",
						"770,54.00,95.00,81.00,48.00,86.00,68.00,20.00,49.00,35.00,31.00,36.00,4.00,86.00,31.00,139.75,0",
						"771,33.00,69.00,16.00,44.00,58.00,62.00,12.00,66.00,45.00,2.00,72.00,68.00,59.00,65.00,148.96,0",
						"772,57.00,32.00,29.00,85.00,26.00,25.00,74.00,52.00,56.00,96.00,41.00,5.00,36.00,11.00,142.33,0",
						"773,3.00,47.00,82.00,27.00,42.00,61.00,31.00,50.00,57.00,56.00,71.00,27.00,39.00,92.00,126.85,0",
						"774,72.00,94.00,48.00,25.00,7.00,76.00,7.00,61.00,36.00,39.00,15.00,68.00,65.00,54.00,145.04,0",
						"775,70.00,17.00,84.00,33.00,98.00,89.00,70.00,88.00,47.00,93.00,13.00,18.00,21.00,52.00,161.13,0",
						"776,75.00,1.00,44.00,98.00,45.00,48.00,55.00,86.00,38.00,2.00,5.00,39.00,60.00,18.00,156.89,0",
						"777,7.00,65.00,69.00,96.00,66.00,55.00,0.00,88.00,86.00,81.00,51.00,93.00,34.00,18.00,147.43,0",
						"778,24.00,65.00,83.00,99.00,92.00,44.00,14.00,22.00,44.00,18.00,41.00,38.00,4.00,98.00,147.39,0",
						"779,78.00,48.00,14.00,70.00,75.00,28.00,8.00,25.00,87.00,42.00,26.00,97.00,51.00,54.00,152.80,0",
						"780,90.00,14.00,93.00,95.00,11.00,35.00,42.00,5.00,97.00,8.00,87.00,96.00,24.00,52.00,158.61,0",
						"781,53.00,34.00,7.00,73.00,13.00,82.00,83.00,42.00,31.00,75.00,85.00,17.00,24.00,87.00,157.12,0",
						"782,40.00,56.00,8.00,18.00,30.00,27.00,50.00,57.00,63.00,31.00,43.00,22.00,63.00,93.00,142.30,0",
						"783,73.00,11.00,77.00,33.00,96.00,2.00,48.00,70.00,76.00,8.00,94.00,3.00,30.00,63.00,156.90,0",
						"784,29.00,5.00,81.00,56.00,70.00,16.00,81.00,15.00,2.00,56.00,91.00,83.00,74.00,38.00,176.95,0",
						"785,97.00,34.00,79.00,43.00,70.00,59.00,51.00,69.00,21.00,9.00,39.00,32.00,17.00,87.00,151.98,0",
						"786,16.00,17.00,36.00,12.00,28.00,91.00,14.00,37.00,66.00,22.00,80.00,39.00,69.00,77.00,151.33,0",
						"787,18.00,61.00,34.00,39.00,77.00,21.00,18.00,31.00,40.00,60.00,27.00,82.00,81.00,69.00,134.62,0",
						"788,4.00,93.00,78.00,98.00,63.00,0.00,47.00,58.00,50.00,1.00,7.00,85.00,98.00,34.00,150.58,0",
						"789,18.00,88.00,80.00,87.00,82.00,52.00,83.00,36.00,18.00,63.00,15.00,23.00,1.00,16.00,158.97,0",
						"790,84.00,58.00,7.00,41.00,46.00,36.00,22.00,38.00,65.00,27.00,24.00,32.00,50.00,45.00,133.39,0",
						"791,77.00,36.00,89.00,91.00,61.00,63.00,15.00,33.00,59.00,47.00,19.00,67.00,77.00,88.00,131.13,0",
						"792,68.00,13.00,79.00,92.00,22.00,49.00,44.00,20.00,94.00,90.00,41.00,9.00,81.00,54.00,147.51,0",
						"793,33.00,64.00,54.00,29.00,46.00,82.00,27.00,74.00,17.00,80.00,77.00,98.00,48.00,83.00,140.87,0",
						"794,96.00,24.00,62.00,3.00,86.00,96.00,24.00,74.00,66.00,93.00,16.00,44.00,76.00,65.00,146.45,0",
						"795,74.00,46.00,20.00,3.00,34.00,60.00,68.00,68.00,47.00,57.00,33.00,59.00,65.00,75.00,131.18,0",
						"796,16.00,40.00,67.00,43.00,9.00,76.00,55.00,18.00,1.00,40.00,3.00,73.00,30.00,60.00,164.23,0",
						"797,94.00,3.00,12.00,47.00,55.00,22.00,9.00,52.00,86.00,18.00,80.00,51.00,8.00,2.00,162.75,0",
						"798,74.00,57.00,82.00,96.00,82.00,51.00,59.00,63.00,71.00,31.00,27.00,99.00,37.00,2.00,148.02,0",
						"799,87.00,34.00,76.00,90.00,46.00,94.00,85.00,34.00,79.00,40.00,28.00,1.00,14.00,48.00,147.66,0",
						"800,44.00,64.00,53.00,39.00,58.00,13.00,19.00,58.00,88.00,57.00,56.00,88.00,80.00,5.00,130.76,0",
						"801,72.00,28.00,14.00,60.00,70.00,44.00,72.00,60.00,49.00,82.00,89.00,64.00,26.00,21.00,127.63,0",
						"802,29.00,40.00,97.00,88.00,22.00,9.00,95.00,15.00,74.00,35.00,85.00,11.00,85.00,99.00,162.23,0",
						"803,10.00,65.00,82.00,85.00,99.00,75.00,19.00,24.00,87.00,47.00,33.00,26.00,55.00,21.00,163.91,0",
						"804,50.00,44.00,32.00,56.00,29.00,15.00,32.00,88.00,0.00,84.00,84.00,55.00,41.00,14.00,132.79,0",
						"805,47.00,53.00,51.00,66.00,65.00,51.00,25.00,52.00,39.00,41.00,77.00,41.00,14.00,20.00,118.16,0",
						"806,74.00,48.00,47.00,16.00,73.00,23.00,49.00,21.00,86.00,98.00,74.00,65.00,83.00,99.00,172.19,0",
						"807,65.00,94.00,79.00,3.00,6.00,58.00,80.00,65.00,1.00,45.00,31.00,81.00,0.00,6.00,181.25,0",
						"808,20.00,83.00,15.00,95.00,66.00,41.00,1.00,39.00,17.00,63.00,57.00,49.00,47.00,70.00,138.86,0",
						"809,48.00,99.00,26.00,69.00,71.00,17.00,24.00,17.00,69.00,16.00,61.00,84.00,74.00,44.00,138.02,0",
						"810,6.00,25.00,15.00,90.00,47.00,42.00,65.00,34.00,10.00,26.00,63.00,25.00,84.00,53.00,143.19,0",
						"811,12.00,59.00,85.00,47.00,82.00,30.00,96.00,82.00,80.00,14.00,65.00,6.00,81.00,12.00,162.73,0",
						"812,94.00,87.00,92.00,34.00,85.00,60.00,4.00,93.00,24.00,46.00,30.00,15.00,40.00,31.00,151.32,0",
						"813,46.00,28.00,52.00,34.00,54.00,12.00,2.00,61.00,15.00,66.00,8.00,51.00,77.00,12.00,154.42,0",
						"814,29.00,28.00,54.00,95.00,75.00,38.00,95.00,70.00,16.00,13.00,90.00,71.00,45.00,27.00,144.90,0",
						"815,17.00,26.00,11.00,99.00,44.00,51.00,62.00,37.00,99.00,47.00,65.00,95.00,87.00,26.00,164.53,0",
						"816,59.00,78.00,47.00,60.00,40.00,67.00,11.00,7.00,7.00,61.00,7.00,25.00,52.00,65.00,149.25,0",
						"817,54.00,55.00,7.00,66.00,78.00,82.00,67.00,19.00,25.00,45.00,50.00,10.00,79.00,12.00,150.65,0",
						"818,26.00,86.00,79.00,0.00,69.00,21.00,4.00,93.00,74.00,96.00,80.00,21.00,3.00,89.00,185.00,0",
						"819,48.00,14.00,4.00,64.00,55.00,11.00,10.00,50.00,1.00,99.00,49.00,74.00,13.00,88.00,139.23,0",
						"820,39.00,49.00,74.00,80.00,18.00,2.00,15.00,98.00,34.00,59.00,82.00,0.00,80.00,23.00,175.71,0",
						"821,90.00,96.00,75.00,33.00,78.00,86.00,64.00,41.00,10.00,29.00,29.00,99.00,82.00,26.00,156.92,0",
						"822,40.00,41.00,14.00,10.00,15.00,66.00,56.00,86.00,8.00,46.00,42.00,58.00,25.00,8.00,155.89,0",
						"823,11.00,75.00,61.00,96.00,25.00,62.00,7.00,1.00,85.00,55.00,53.00,66.00,98.00,11.00,155.63,0",
						"824,94.00,89.00,45.00,98.00,72.00,8.00,7.00,16.00,24.00,22.00,1.00,71.00,76.00,19.00,176.72,0",
						"825,28.00,94.00,55.00,4.00,29.00,69.00,13.00,82.00,88.00,50.00,70.00,45.00,53.00,16.00,147.39,0",
						"826,13.00,60.00,96.00,39.00,3.00,72.00,46.00,0.00,22.00,79.00,82.00,6.00,99.00,67.00,177.82,0",
						"827,78.00,94.00,70.00,52.00,46.00,15.00,92.00,63.00,42.00,63.00,73.00,58.00,8.00,36.00,140.24,0",
						"828,26.00,81.00,3.00,94.00,90.00,58.00,68.00,38.00,88.00,72.00,21.00,27.00,0.00,97.00,166.07,0",
						"829,71.00,80.00,0.00,31.00,1.00,39.00,27.00,79.00,12.00,22.00,96.00,78.00,0.00,68.00,162.04,0",
						"830,28.00,27.00,8.00,35.00,65.00,13.00,81.00,92.00,12.00,10.00,17.00,72.00,19.00,86.00,157.36,0",
						"831,19.00,91.00,8.00,67.00,27.00,98.00,98.00,57.00,7.00,47.00,46.00,5.00,17.00,69.00,152.91,0",
						"832,26.00,23.00,66.00,21.00,30.00,2.00,85.00,24.00,84.00,22.00,68.00,39.00,93.00,44.00,157.11,0",
						"833,91.00,33.00,51.00,68.00,70.00,53.00,50.00,44.00,81.00,76.00,70.00,77.00,4.00,53.00,131.73,0",
						"834,15.00,1.00,66.00,77.00,8.00,64.00,79.00,25.00,36.00,51.00,86.00,36.00,54.00,2.00,157.65,0",
						"835,88.00,90.00,55.00,78.00,23.00,69.00,75.00,48.00,15.00,88.00,44.00,9.00,14.00,90.00,152.37,0",
						"836,24.00,39.00,41.00,86.00,87.00,85.00,58.00,37.00,52.00,68.00,37.00,20.00,72.00,66.00,136.64,0",
						"837,84.00,37.00,17.00,71.00,22.00,53.00,9.00,18.00,97.00,40.00,48.00,1.00,34.00,65.00,129.41,0",
						"838,40.00,74.00,90.00,56.00,96.00,36.00,32.00,65.00,20.00,6.00,18.00,31.00,71.00,11.00,159.09,0",
						"839,19.00,63.00,56.00,94.00,74.00,60.00,79.00,20.00,36.00,61.00,56.00,72.00,64.00,78.00,128.15,0",
						"840,34.00,51.00,64.00,75.00,57.00,63.00,24.00,73.00,26.00,10.00,87.00,31.00,56.00,91.00,122.03,0",
						"841,73.00,34.00,72.00,53.00,9.00,85.00,32.00,51.00,17.00,85.00,89.00,45.00,24.00,69.00,133.09,0",
						"842,51.00,54.00,24.00,26.00,16.00,63.00,55.00,30.00,52.00,31.00,88.00,99.00,9.00,31.00,121.70,0",
						"843,20.00,14.00,59.00,53.00,44.00,85.00,89.00,42.00,27.00,43.00,98.00,87.00,28.00,84.00,134.41,0",
						"844,55.00,66.00,84.00,34.00,86.00,38.00,26.00,70.00,79.00,27.00,56.00,87.00,51.00,66.00,150.67,0",
						"845,72.00,72.00,22.00,98.00,60.00,85.00,64.00,64.00,3.00,94.00,80.00,51.00,60.00,20.00,162.07,0",
						"846,84.00,76.00,88.00,69.00,92.00,24.00,86.00,7.00,37.00,12.00,70.00,96.00,72.00,93.00,165.79,0",
						"847,20.00,97.00,12.00,10.00,73.00,37.00,73.00,51.00,20.00,85.00,18.00,32.00,65.00,19.00,173.87,0",
						"848,74.00,79.00,94.00,52.00,73.00,75.00,48.00,96.00,22.00,13.00,60.00,8.00,29.00,89.00,165.61,0",
						"849,59.00,14.00,0.00,15.00,53.00,9.00,59.00,13.00,85.00,50.00,70.00,26.00,30.00,9.00,151.13,0",
						"850,84.00,4.00,50.00,22.00,39.00,49.00,96.00,24.00,14.00,3.00,89.00,36.00,47.00,47.00,161.27,0",
						"851,36.00,18.00,60.00,53.00,6.00,38.00,2.00,31.00,0.00,66.00,18.00,84.00,36.00,48.00,153.34,0",
						"852,32.00,99.00,12.00,50.00,35.00,61.00,71.00,85.00,79.00,19.00,50.00,71.00,5.00,85.00,164.69,0",
						"853,99.00,43.00,12.00,69.00,48.00,84.00,53.00,12.00,38.00,73.00,17.00,32.00,74.00,16.00,153.95,0",
						"854,15.00,98.00,93.00,41.00,61.00,35.00,93.00,54.00,69.00,6.00,43.00,41.00,73.00,77.00,160.95,0",
						"855,96.00,50.00,80.00,61.00,77.00,83.00,20.00,23.00,78.00,27.00,5.00,9.00,72.00,95.00,164.33,0",
						"856,0.00,19.00,69.00,16.00,53.00,60.00,1.00,66.00,87.00,33.00,72.00,40.00,17.00,68.00,167.35,0",
						"857,59.00,78.00,86.00,49.00,66.00,40.00,63.00,70.00,31.00,18.00,65.00,33.00,92.00,34.00,138.10,0",
						"858,82.00,65.00,59.00,52.00,84.00,58.00,23.00,53.00,93.00,18.00,23.00,26.00,7.00,12.00,164.75,0",
						"859,39.00,61.00,43.00,19.00,7.00,20.00,66.00,16.00,32.00,42.00,56.00,53.00,42.00,50.00,128.80,0",
						"860,61.00,4.00,40.00,53.00,39.00,84.00,64.00,64.00,73.00,62.00,54.00,12.00,85.00,87.00,144.79,0",
						"861,96.00,35.00,20.00,90.00,61.00,12.00,80.00,58.00,38.00,43.00,73.00,31.00,86.00,2.00,163.93,0",
						"862,93.00,10.00,66.00,24.00,13.00,98.00,9.00,97.00,0.00,53.00,42.00,15.00,54.00,88.00,171.39,0",
						"863,52.00,40.00,87.00,40.00,76.00,40.00,72.00,34.00,53.00,10.00,31.00,46.00,81.00,98.00,165.61,0",
						"864,82.00,17.00,0.00,59.00,21.00,96.00,10.00,36.00,77.00,69.00,43.00,73.00,10.00,97.00,171.16,0",
						"865,38.00,76.00,17.00,79.00,96.00,89.00,3.00,25.00,14.00,4.00,93.00,61.00,13.00,54.00,136.89,0",
						"866,56.00,67.00,15.00,91.00,82.00,50.00,6.00,42.00,84.00,20.00,47.00,90.00,36.00,60.00,143.60,0",
						"867,9.00,86.00,95.00,67.00,88.00,65.00,8.00,51.00,17.00,80.00,31.00,25.00,42.00,77.00,158.03,0",
						"868,84.00,33.00,16.00,96.00,36.00,80.00,69.00,89.00,89.00,22.00,13.00,53.00,27.00,66.00,153.52,0",
						"869,48.00,78.00,4.00,83.00,33.00,15.00,5.00,4.00,87.00,61.00,88.00,24.00,9.00,52.00,140.81,0",
						"870,97.00,85.00,93.00,57.00,9.00,20.00,6.00,21.00,5.00,10.00,50.00,15.00,7.00,25.00,158.73,0",
						"871,31.00,52.00,33.00,33.00,54.00,56.00,67.00,6.00,34.00,56.00,40.00,72.00,59.00,31.00,132.31,0",
						"872,76.00,27.00,11.00,42.00,56.00,33.00,2.00,13.00,87.00,12.00,18.00,20.00,89.00,29.00,152.95,0",
						"873,39.00,14.00,4.00,59.00,49.00,62.00,14.00,98.00,24.00,84.00,66.00,45.00,24.00,2.00,140.93,0",
						"874,31.00,23.00,13.00,24.00,50.00,10.00,82.00,29.00,16.00,24.00,26.00,73.00,27.00,39.00,133.62,0",
						"875,22.00,9.00,36.00,56.00,11.00,35.00,83.00,77.00,71.00,51.00,11.00,85.00,19.00,61.00,131.97,0",
						"876,64.00,9.00,11.00,32.00,2.00,24.00,69.00,24.00,8.00,87.00,40.00,90.00,82.00,11.00,171.33,0",
						"877,25.00,98.00,26.00,28.00,37.00,21.00,4.00,24.00,39.00,52.00,33.00,2.00,78.00,12.00,153.34,0",
						"878,99.00,13.00,50.00,41.00,55.00,20.00,11.00,75.00,37.00,72.00,86.00,24.00,31.00,68.00,160.45,0",
						"879,4.00,88.00,73.00,57.00,10.00,98.00,49.00,4.00,99.00,36.00,59.00,53.00,50.00,46.00,184.00,0",
						"880,54.00,21.00,84.00,76.00,14.00,11.00,74.00,70.00,53.00,72.00,16.00,6.00,8.00,30.00,152.63,0",
						"881,72.00,2.00,19.00,95.00,46.00,39.00,9.00,72.00,26.00,97.00,31.00,41.00,32.00,45.00,147.84,0",
						"882,60.00,82.00,81.00,41.00,10.00,17.00,38.00,79.00,72.00,46.00,62.00,26.00,23.00,72.00,162.50,0",
						"883,78.00,2.00,84.00,27.00,84.00,71.00,92.00,39.00,34.00,20.00,79.00,29.00,20.00,5.00,178.95,0",
						"884,58.00,20.00,4.00,64.00,24.00,24.00,35.00,77.00,37.00,3.00,45.00,66.00,66.00,72.00,152.34,0",
						"885,91.00,67.00,13.00,56.00,41.00,33.00,88.00,47.00,98.00,42.00,21.00,21.00,4.00,22.00,141.04,0",
						"886,69.00,63.00,57.00,5.00,68.00,66.00,39.00,9.00,62.00,71.00,29.00,94.00,50.00,68.00,140.55,0",
						"887,23.00,77.00,7.00,46.00,85.00,30.00,91.00,60.00,37.00,22.00,89.00,81.00,81.00,89.00,164.34,0",
						"888,7.00,3.00,71.00,85.00,70.00,52.00,88.00,17.00,83.00,82.00,13.00,77.00,46.00,70.00,165.16,0",
						"889,51.00,67.00,10.00,21.00,9.00,38.00,35.00,67.00,3.00,59.00,4.00,5.00,38.00,14.00,159.31,0",
						"890,41.00,14.00,2.00,95.00,10.00,15.00,49.00,6.00,55.00,25.00,86.00,72.00,56.00,48.00,156.37,0",
						"891,50.00,44.00,12.00,6.00,0.00,42.00,5.00,80.00,92.00,39.00,34.00,77.00,45.00,54.00,148.35,0",
						"892,53.00,61.00,68.00,48.00,2.00,74.00,12.00,35.00,6.00,47.00,81.00,25.00,74.00,2.00,151.91,0",
						"893,6.00,79.00,14.00,48.00,70.00,21.00,24.00,94.00,52.00,10.00,10.00,31.00,58.00,52.00,155.29,0",
						"894,61.00,81.00,64.00,11.00,74.00,34.00,19.00,13.00,67.00,21.00,76.00,19.00,63.00,93.00,148.93,0",
						"895,31.00,40.00,37.00,18.00,5.00,31.00,42.00,46.00,26.00,76.00,91.00,96.00,88.00,6.00,172.76,0",
						"896,7.00,17.00,85.00,84.00,23.00,39.00,8.00,50.00,23.00,79.00,79.00,67.00,53.00,38.00,175.47,0",
						"897,29.00,33.00,32.00,80.00,99.00,65.00,99.00,26.00,34.00,2.00,37.00,19.00,32.00,97.00,148.89,0",
						"898,36.00,77.00,0.00,39.00,38.00,54.00,36.00,39.00,40.00,78.00,52.00,10.00,52.00,96.00,143.01,0",
						"899,64.00,49.00,19.00,73.00,32.00,63.00,6.00,93.00,46.00,48.00,77.00,73.00,42.00,5.00,132.05,0",
						"900,36.00,73.00,49.00,49.00,12.00,52.00,35.00,82.00,92.00,26.00,54.00,62.00,81.00,7.00,134.60,0",
						"901,60.00,93.00,12.00,85.00,18.00,80.00,37.00,36.00,1.00,71.00,5.00,18.00,30.00,20.00,157.08,0",
						"902,41.00,72.00,12.00,24.00,78.00,66.00,5.00,48.00,90.00,19.00,34.00,5.00,81.00,54.00,167.13,0",
						"903,73.00,16.00,93.00,21.00,10.00,25.00,48.00,91.00,6.00,19.00,91.00,81.00,79.00,34.00,165.95,0",
						"904,28.00,76.00,12.00,93.00,18.00,39.00,41.00,11.00,22.00,65.00,69.00,41.00,18.00,19.00,148.79,0",
						"905,76.00,77.00,24.00,40.00,3.00,10.00,64.00,65.00,23.00,60.00,88.00,28.00,18.00,23.00,129.81,0",
						"906,82.00,96.00,90.00,60.00,13.00,72.00,24.00,64.00,36.00,70.00,57.00,62.00,59.00,62.00,151.97,0",
						"907,11.00,4.00,80.00,3.00,74.00,94.00,99.00,6.00,50.00,27.00,67.00,99.00,54.00,8.00,168.08,0",
						"908,59.00,46.00,51.00,43.00,53.00,99.00,87.00,93.00,34.00,17.00,98.00,12.00,12.00,96.00,177.25,0",
						"909,47.00,93.00,54.00,33.00,72.00,42.00,8.00,9.00,47.00,24.00,84.00,87.00,49.00,71.00,151.46,0",
						"910,44.00,70.00,20.00,54.00,47.00,24.00,22.00,75.00,76.00,72.00,78.00,9.00,96.00,59.00,149.77,0",
						"911,10.00,10.00,93.00,25.00,99.00,11.00,75.00,87.00,9.00,6.00,83.00,54.00,32.00,58.00,186.39,0",
						"912,20.00,15.00,44.00,27.00,21.00,59.00,8.00,59.00,94.00,5.00,49.00,60.00,15.00,95.00,169.36,0",
						"913,86.00,99.00,75.00,30.00,1.00,89.00,47.00,47.00,66.00,90.00,53.00,18.00,8.00,8.00,166.88,0",
						"914,20.00,45.00,44.00,94.00,70.00,78.00,26.00,6.00,54.00,78.00,7.00,25.00,85.00,0.00,164.78,0",
						"915,2.00,69.00,43.00,94.00,11.00,1.00,2.00,18.00,37.00,57.00,34.00,40.00,44.00,69.00,168.48,0",
						"916,66.00,96.00,74.00,73.00,76.00,28.00,84.00,35.00,96.00,57.00,9.00,69.00,17.00,63.00,152.83,0",
						"917,80.00,72.00,64.00,46.00,91.00,63.00,83.00,15.00,10.00,41.00,31.00,28.00,59.00,67.00,144.46,0",
						"918,47.00,45.00,24.00,59.00,32.00,20.00,32.00,64.00,77.00,32.00,55.00,80.00,72.00,90.00,131.98,0",
						"919,28.00,15.00,72.00,9.00,9.00,70.00,46.00,72.00,77.00,65.00,55.00,66.00,67.00,53.00,140.61,0",
						"920,64.00,94.00,84.00,94.00,33.00,77.00,47.00,1.00,16.00,90.00,4.00,54.00,49.00,96.00,154.35,0",
						"921,6.00,82.00,31.00,63.00,15.00,40.00,70.00,44.00,18.00,70.00,17.00,83.00,89.00,11.00,155.65,0",
						"922,56.00,8.00,61.00,99.00,66.00,74.00,14.00,59.00,24.00,61.00,96.00,59.00,54.00,62.00,143.49,0",
						"923,56.00,78.00,95.00,77.00,5.00,86.00,41.00,27.00,46.00,57.00,92.00,54.00,84.00,12.00,155.32,0",
						"924,19.00,42.00,42.00,30.00,85.00,33.00,57.00,61.00,21.00,83.00,31.00,25.00,45.00,1.00,145.72,0",
						"925,35.00,53.00,65.00,60.00,18.00,21.00,24.00,11.00,23.00,30.00,61.00,98.00,85.00,81.00,141.68,0",
						"926,68.00,93.00,71.00,63.00,65.00,9.00,15.00,37.00,98.00,45.00,38.00,93.00,80.00,69.00,133.22,0",
						"927,29.00,20.00,47.00,36.00,94.00,0.00,38.00,17.00,16.00,93.00,3.00,30.00,4.00,43.00,182.74,0",
						"928,85.00,80.00,24.00,93.00,40.00,86.00,42.00,93.00,62.00,8.00,6.00,53.00,79.00,7.00,153.37,0",
						"929,73.00,80.00,64.00,84.00,90.00,41.00,14.00,19.00,22.00,37.00,25.00,35.00,37.00,37.00,137.73,0",
						"930,72.00,13.00,57.00,49.00,51.00,61.00,23.00,56.00,0.00,88.00,57.00,76.00,96.00,27.00,138.82,0",
						"931,53.00,41.00,17.00,8.00,21.00,82.00,1.00,33.00,88.00,91.00,78.00,74.00,74.00,55.00,133.32,0",
						"932,94.00,72.00,0.00,23.00,23.00,24.00,18.00,16.00,12.00,6.00,70.00,50.00,14.00,16.00,164.22,0",
						"933,9.00,25.00,81.00,46.00,10.00,37.00,3.00,8.00,75.00,11.00,3.00,22.00,53.00,31.00,167.07,0",
						"934,24.00,48.00,0.00,9.00,65.00,47.00,63.00,31.00,9.00,73.00,74.00,12.00,52.00,93.00,155.34,0",
						"935,69.00,36.00,92.00,50.00,62.00,21.00,66.00,14.00,52.00,70.00,53.00,66.00,78.00,90.00,151.65,0",
						"936,2.00,1.00,95.00,88.00,11.00,26.00,0.00,31.00,57.00,0.00,37.00,13.00,25.00,46.00,175.12,0",
						"937,93.00,97.00,10.00,68.00,48.00,21.00,25.00,89.00,99.00,50.00,15.00,89.00,90.00,39.00,164.03,0",
						"938,80.00,71.00,99.00,33.00,17.00,29.00,0.00,63.00,99.00,36.00,67.00,40.00,95.00,12.00,128.70,0",
						"939,77.00,42.00,91.00,27.00,92.00,94.00,23.00,46.00,51.00,2.00,69.00,54.00,77.00,49.00,144.59,0",
						"940,39.00,85.00,62.00,33.00,43.00,18.00,70.00,67.00,17.00,46.00,34.00,82.00,33.00,41.00,140.32,0",
						"941,16.00,6.00,91.00,97.00,49.00,5.00,27.00,58.00,55.00,33.00,11.00,47.00,6.00,58.00,150.84,0",
						"942,61.00,21.00,87.00,66.00,96.00,77.00,7.00,99.00,6.00,48.00,30.00,83.00,94.00,32.00,176.12,0",
						"943,63.00,84.00,7.00,46.00,12.00,23.00,45.00,13.00,52.00,67.00,42.00,85.00,1.00,12.00,177.89,0",
						"944,74.00,23.00,21.00,94.00,64.00,57.00,65.00,8.00,56.00,69.00,17.00,13.00,25.00,25.00,159.86,0",
						"945,35.00,95.00,44.00,47.00,46.00,14.00,40.00,95.00,91.00,76.00,97.00,58.00,74.00,31.00,158.30,0",
						"946,19.00,84.00,55.00,1.00,96.00,47.00,97.00,53.00,58.00,3.00,5.00,21.00,20.00,18.00,160.95,0",
						"947,40.00,40.00,29.00,5.00,78.00,61.00,30.00,72.00,19.00,22.00,41.00,3.00,12.00,9.00,146.44,0",
						"948,14.00,58.00,67.00,78.00,67.00,49.00,8.00,2.00,0.00,29.00,76.00,95.00,0.00,34.00,168.32,0",
						"949,37.00,8.00,8.00,62.00,36.00,51.00,37.00,79.00,71.00,78.00,22.00,29.00,25.00,28.00,152.84,0",
						"950,20.00,7.00,67.00,22.00,93.00,64.00,87.00,47.00,96.00,66.00,89.00,60.00,75.00,27.00,144.42,0",
						"951,75.00,48.00,85.00,36.00,53.00,64.00,11.00,15.00,97.00,79.00,77.00,44.00,29.00,22.00,144.35,0",
						"952,26.00,60.00,26.00,11.00,7.00,59.00,81.00,35.00,62.00,88.00,54.00,98.00,44.00,91.00,161.21,0",
						"953,70.00,19.00,93.00,64.00,75.00,62.00,29.00,87.00,86.00,11.00,10.00,68.00,78.00,87.00,165.83,0",
						"954,86.00,75.00,36.00,69.00,15.00,16.00,13.00,39.00,49.00,38.00,34.00,20.00,9.00,79.00,158.35,0",
						"955,92.00,52.00,2.00,58.00,29.00,91.00,82.00,92.00,98.00,98.00,44.00,43.00,51.00,51.00,158.23,0",
						"956,85.00,49.00,77.00,8.00,58.00,13.00,49.00,19.00,8.00,17.00,38.00,17.00,75.00,9.00,148.98,0",
						"957,57.00,57.00,53.00,59.00,29.00,40.00,87.00,57.00,69.00,8.00,69.00,63.00,25.00,18.00,122.49,0",
						"958,39.00,93.00,37.00,17.00,16.00,30.00,81.00,64.00,75.00,34.00,72.00,92.00,27.00,83.00,131.10,0",
						"959,65.00,28.00,43.00,43.00,95.00,98.00,75.00,98.00,77.00,3.00,89.00,24.00,12.00,42.00,175.29,0",
						"960,76.00,49.00,5.00,53.00,73.00,81.00,95.00,33.00,31.00,23.00,15.00,14.00,33.00,77.00,143.58,0",
						"961,0.00,72.00,62.00,63.00,70.00,85.00,92.00,86.00,23.00,26.00,19.00,31.00,68.00,12.00,147.42,0",
						"962,94.00,4.00,70.00,17.00,1.00,23.00,84.00,72.00,18.00,47.00,58.00,31.00,17.00,48.00,155.95,0",
						"963,93.00,52.00,58.00,64.00,14.00,83.00,34.00,47.00,77.00,78.00,34.00,87.00,10.00,55.00,127.73,0",
						"964,45.00,30.00,78.00,47.00,42.00,57.00,92.00,24.00,45.00,71.00,24.00,46.00,26.00,86.00,145.47,0",
						"965,74.00,83.00,95.00,86.00,4.00,50.00,20.00,84.00,81.00,20.00,26.00,77.00,34.00,94.00,149.65,0",
						"966,54.00,93.00,7.00,63.00,21.00,15.00,63.00,81.00,43.00,39.00,26.00,93.00,7.00,47.00,152.77,0",
						"967,19.00,36.00,26.00,87.00,86.00,77.00,17.00,80.00,16.00,16.00,23.00,56.00,90.00,41.00,162.62,0",
						"968,44.00,92.00,25.00,11.00,43.00,26.00,51.00,52.00,70.00,18.00,11.00,25.00,55.00,85.00,154.36,0",
						"969,63.00,94.00,9.00,26.00,39.00,49.00,53.00,5.00,43.00,61.00,55.00,97.00,21.00,27.00,152.19,0",
						"970,97.00,62.00,65.00,76.00,42.00,16.00,34.00,81.00,45.00,87.00,93.00,12.00,29.00,40.00,151.23,0",
						"971,70.00,96.00,9.00,28.00,99.00,28.00,21.00,60.00,30.00,57.00,3.00,54.00,16.00,35.00,140.52,0",
						"972,73.00,96.00,23.00,74.00,84.00,62.00,20.00,98.00,5.00,77.00,69.00,84.00,33.00,0.00,149.95,0",
						"973,70.00,12.00,34.00,99.00,4.00,73.00,82.00,88.00,80.00,24.00,32.00,10.00,22.00,85.00,156.82,0",
						"974,97.00,11.00,77.00,62.00,6.00,10.00,86.00,50.00,47.00,74.00,6.00,11.00,77.00,40.00,154.81,0",
						"975,70.00,17.00,93.00,28.00,86.00,72.00,81.00,33.00,50.00,84.00,36.00,12.00,51.00,24.00,146.52,0",
						"976,54.00,30.00,85.00,20.00,54.00,99.00,39.00,28.00,39.00,36.00,91.00,42.00,90.00,32.00,150.22,0",
						"977,29.00,48.00,26.00,95.00,57.00,8.00,59.00,27.00,63.00,76.00,61.00,49.00,62.00,94.00,140.51,0",
						"978,45.00,9.00,6.00,97.00,98.00,14.00,29.00,67.00,10.00,20.00,74.00,55.00,72.00,31.00,165.19,0",
						"979,0.00,3.00,62.00,24.00,65.00,23.00,7.00,16.00,66.00,7.00,27.00,27.00,56.00,92.00,144.90,0",
						"980,28.00,7.00,73.00,50.00,41.00,94.00,85.00,15.00,38.00,96.00,21.00,5.00,26.00,71.00,169.69,0",
						"981,69.00,41.00,77.00,57.00,26.00,4.00,42.00,48.00,67.00,24.00,22.00,46.00,69.00,69.00,139.38,0",
						"982,39.00,38.00,79.00,76.00,76.00,63.00,20.00,45.00,50.00,52.00,15.00,70.00,4.00,82.00,139.90,0",
						"983,41.00,74.00,68.00,75.00,17.00,72.00,73.00,68.00,26.00,93.00,26.00,94.00,87.00,93.00,155.97,0",
						"984,9.00,69.00,99.00,43.00,1.00,97.00,20.00,75.00,9.00,6.00,49.00,86.00,94.00,67.00,156.79,0",
						"985,61.00,5.00,61.00,23.00,0.00,59.00,82.00,33.00,61.00,33.00,29.00,59.00,22.00,43.00,140.10,0",
						"986,10.00,98.00,56.00,25.00,0.00,81.00,90.00,19.00,92.00,39.00,53.00,75.00,77.00,82.00,148.34,0",
						"987,33.00,78.00,28.00,87.00,59.00,34.00,64.00,91.00,96.00,67.00,56.00,85.00,58.00,44.00,133.93,0",
						"988,49.00,18.00,11.00,13.00,47.00,78.00,94.00,40.00,57.00,46.00,87.00,25.00,41.00,1.00,148.99,0",
						"989,67.00,94.00,34.00,29.00,13.00,56.00,4.00,43.00,15.00,20.00,91.00,59.00,40.00,38.00,134.61,0",
						"990,48.00,43.00,92.00,73.00,57.00,49.00,14.00,36.00,52.00,36.00,90.00,57.00,42.00,96.00,134.02,0",
						"991,19.00,27.00,22.00,59.00,32.00,14.00,82.00,42.00,7.00,0.00,71.00,91.00,40.00,2.00,155.70,0",
						"992,72.00,89.00,12.00,5.00,24.00,46.00,70.00,88.00,5.00,89.00,93.00,23.00,5.00,88.00,142.67,0",
						"993,48.00,46.00,8.00,12.00,64.00,92.00,81.00,36.00,12.00,21.00,74.00,49.00,9.00,35.00,143.72,0",
						"994,80.00,93.00,44.00,70.00,80.00,7.00,96.00,44.00,7.00,86.00,16.00,84.00,36.00,4.00,168.39,0",
						"995,18.00,54.00,91.00,72.00,39.00,77.00,59.00,5.00,79.00,37.00,30.00,10.00,6.00,20.00,155.13,0",
						"996,21.00,78.00,13.00,4.00,51.00,43.00,15.00,46.00,27.00,52.00,80.00,14.00,34.00,41.00,141.63,0",
						"997,79.00,63.00,15.00,64.00,91.00,26.00,17.00,70.00,16.00,35.00,71.00,79.00,33.00,12.00,145.01,0",
						"998,95.00,66.00,47.00,19.00,78.00,61.00,65.00,3.00,85.00,10.00,58.00,67.00,64.00,56.00,161.65,0",
						"999,3.00,91.00,23.00,77.00,26.00,4.00,18.00,8.00,50.00,86.00,99.00,14.00,86.00,24.00,195.85,0",
						"1000,91.00,46.00,52.00,1.00,30.00,91.00,86.00,82.00,8.00,3.00,87.00,81.00,33.00,49.00,183.24,0",
						"1001,85.00,61.00,85.00,99.00,63.00,88.00,96.00,90.00,62.00,70.00,41.00,96.00,94.00,27.00,179.39,0",
						"1002,10.00,21.00,54.00,84.00,1.00,18.00,6.00,54.00,54.00,15.00,20.00,1.00,80.00,74.00,188.12,0",
						"1003,57.00,73.00,67.00,17.00,87.00,76.00,48.00,37.00,3.00,76.00,69.00,82.00,83.00,47.00,153.29,0",
						"1004,55.00,84.00,94.00,16.00,28.00,83.00,11.00,79.00,51.00,43.00,61.00,14.00,92.00,26.00,148.01,0",
						"1005,64.00,88.00,14.00,80.00,26.00,36.00,59.00,50.00,72.00,24.00,94.00,71.00,79.00,87.00,151.62,0",
						"1006,40.00,83.00,56.00,53.00,57.00,93.00,60.00,37.00,99.00,0.00,50.00,5.00,9.00,34.00,161.28,0",
						"1007,3.00,90.00,22.00,82.00,59.00,87.00,94.00,84.00,41.00,5.00,54.00,59.00,97.00,1.00,165.22,0",
						"1008,22.00,23.00,4.00,14.00,59.00,25.00,86.00,97.00,83.00,57.00,51.00,63.00,42.00,79.00,160.19,0",
						"1009,86.00,82.00,89.00,34.00,70.00,8.00,66.00,61.00,80.00,66.00,3.00,74.00,12.00,89.00,146.85,0",
						"1010,98.00,25.00,94.00,83.00,74.00,67.00,64.00,56.00,73.00,98.00,4.00,7.00,45.00,2.00,172.10,0",
						"1011,6.00,49.00,2.00,57.00,32.00,50.00,29.00,34.00,52.00,36.00,12.00,59.00,32.00,48.00,139.06,0",
						"1012,98.00,91.00,10.00,55.00,42.00,32.00,46.00,5.00,28.00,6.00,20.00,90.00,18.00,56.00,158.79,0",
						"1013,90.00,95.00,19.00,19.00,23.00,44.00,34.00,61.00,0.00,96.00,67.00,0.00,56.00,81.00,163.06,0",
						"1014,58.00,2.00,91.00,7.00,39.00,13.00,31.00,43.00,3.00,23.00,10.00,49.00,89.00,56.00,160.28,0",
						"1015,72.00,55.00,35.00,7.00,22.00,9.00,48.00,4.00,65.00,79.00,86.00,17.00,41.00,14.00,161.35,0",
						"1016,49.00,36.00,21.00,91.00,38.00,80.00,36.00,33.00,54.00,98.00,91.00,22.00,79.00,55.00,155.29,0",
						"1017,53.00,33.00,49.00,33.00,20.00,11.00,31.00,17.00,9.00,5.00,73.00,57.00,44.00,82.00,148.38,0",
						"1018,30.00,58.00,75.00,62.00,43.00,84.00,77.00,3.00,43.00,93.00,71.00,23.00,90.00,0.00,148.53,0",
						"1019,73.00,71.00,77.00,44.00,64.00,99.00,40.00,86.00,80.00,47.00,66.00,28.00,54.00,11.00,141.73,0",
						"1020,42.00,30.00,44.00,10.00,3.00,43.00,55.00,10.00,99.00,13.00,83.00,52.00,97.00,98.00,162.66,0",
						"1021,93.00,33.00,65.00,57.00,23.00,62.00,73.00,29.00,34.00,1.00,1.00,97.00,45.00,31.00,148.74,0",
						"1022,33.00,40.00,38.00,70.00,75.00,48.00,33.00,50.00,36.00,62.00,13.00,52.00,79.00,72.00,136.22,0",
						"1023,15.00,74.00,85.00,47.00,2.00,51.00,69.00,4.00,76.00,12.00,60.00,95.00,16.00,48.00,147.11,0"
					]
				},
				"endTime": "2016-05-18T18:58:43.828Z"
			},
			{
				"startTime": "2016-05-18T12:57:56.740Z",
				"mapData": {
					"groupId": 0,
					"NASValues": [
						"0,35.00,71.00,1.00,6.00,74.00,31.00,44.00,40.00,53.00,87.00,11.00,15.00,34.00,86.00,151.59,0",
						"1,57.00,96.00,75.00,24.00,86.00,16.00,15.00,25.00,22.00,27.00,70.00,28.00,94.00,93.00,161.82,0",
						"2,42.00,82.00,51.00,32.00,44.00,31.00,56.00,78.00,74.00,89.00,52.00,9.00,16.00,46.00,147.12,0",
						"3,56.00,30.00,1.00,93.00,23.00,46.00,11.00,67.00,39.00,35.00,31.00,19.00,42.00,90.00,144.61,0",
						"4,15.00,49.00,99.00,50.00,43.00,71.00,42.00,87.00,47.00,82.00,50.00,38.00,32.00,80.00,143.98,0",
						"5,68.00,93.00,86.00,26.00,90.00,25.00,41.00,18.00,0.00,99.00,55.00,15.00,39.00,0.00,167.58,0",
						"6,49.00,37.00,80.00,66.00,11.00,37.00,99.00,17.00,27.00,53.00,0.00,95.00,82.00,8.00,163.44,0",
						"7,12.00,1.00,22.00,81.00,25.00,14.00,36.00,62.00,85.00,53.00,49.00,86.00,93.00,2.00,135.50,0",
						"8,69.00,40.00,13.00,46.00,75.00,27.00,93.00,70.00,36.00,22.00,78.00,59.00,96.00,23.00,154.61,0",
						"9,26.00,60.00,67.00,1.00,47.00,63.00,95.00,64.00,99.00,77.00,81.00,71.00,1.00,97.00,161.36,0",
						"10,93.00,68.00,96.00,77.00,43.00,14.00,97.00,86.00,91.00,80.00,92.00,34.00,47.00,30.00,171.86,0",
						"11,32.00,11.00,73.00,43.00,40.00,97.00,27.00,30.00,25.00,13.00,15.00,49.00,53.00,30.00,165.54,0",
						"12,67.00,19.00,10.00,34.00,50.00,97.00,57.00,99.00,10.00,42.00,31.00,15.00,5.00,65.00,155.45,0",
						"13,10.00,89.00,88.00,28.00,1.00,21.00,63.00,35.00,13.00,96.00,6.00,13.00,88.00,26.00,183.71,0",
						"14,90.00,87.00,83.00,77.00,60.00,76.00,36.00,63.00,83.00,97.00,3.00,47.00,17.00,35.00,152.78,0",
						"15,15.00,9.00,71.00,41.00,26.00,73.00,58.00,48.00,73.00,66.00,55.00,67.00,29.00,20.00,140.59,0",
						"16,56.00,92.00,18.00,18.00,41.00,11.00,82.00,66.00,13.00,48.00,96.00,49.00,4.00,35.00,151.14,0",
						"17,39.00,71.00,42.00,89.00,77.00,29.00,51.00,10.00,29.00,92.00,87.00,79.00,12.00,49.00,127.70,0",
						"18,54.00,80.00,69.00,24.00,68.00,2.00,53.00,22.00,47.00,40.00,94.00,13.00,21.00,89.00,149.31,0",
						"19,52.00,11.00,42.00,52.00,81.00,17.00,87.00,68.00,61.00,30.00,65.00,85.00,62.00,63.00,141.69,0",
						"20,37.00,71.00,50.00,99.00,83.00,30.00,21.00,69.00,23.00,59.00,11.00,74.00,24.00,23.00,140.90,0",
						"21,22.00,93.00,74.00,66.00,21.00,9.00,76.00,24.00,83.00,67.00,37.00,24.00,75.00,76.00,154.54,0",
						"22,95.00,57.00,74.00,34.00,33.00,42.00,60.00,91.00,71.00,49.00,4.00,24.00,81.00,32.00,151.63,0",
						"23,14.00,73.00,49.00,36.00,19.00,0.00,82.00,32.00,43.00,68.00,90.00,78.00,0.00,95.00,182.98,0",
						"24,4.00,9.00,11.00,60.00,43.00,76.00,4.00,45.00,27.00,50.00,36.00,1.00,64.00,60.00,164.00,0",
						"25,87.00,91.00,94.00,35.00,60.00,43.00,61.00,47.00,84.00,36.00,98.00,97.00,2.00,71.00,179.94,0",
						"26,40.00,4.00,18.00,74.00,56.00,72.00,13.00,70.00,16.00,23.00,65.00,48.00,58.00,57.00,146.83,0",
						"27,55.00,58.00,68.00,60.00,57.00,63.00,62.00,6.00,43.00,44.00,92.00,59.00,21.00,35.00,133.22,0",
						"28,30.00,90.00,19.00,26.00,91.00,75.00,57.00,80.00,0.00,3.00,30.00,69.00,38.00,13.00,166.48,0",
						"29,17.00,11.00,87.00,46.00,57.00,77.00,67.00,12.00,27.00,96.00,12.00,99.00,98.00,1.00,149.03,0",
						"30,50.00,13.00,48.00,79.00,82.00,40.00,80.00,2.00,61.00,58.00,74.00,9.00,70.00,64.00,143.97,0",
						"31,64.00,17.00,22.00,67.00,23.00,70.00,42.00,10.00,87.00,11.00,19.00,1.00,56.00,14.00,125.58,0",
						"32,37.50,5.34,6.90,21.03,7.22,26.87,16.97,3.14,27.31,3.45,5.96,0.31,17.79,4.49,119.87,0",
						"33,69.00,5.00,28.00,58.00,48.00,70.00,75.00,81.00,71.00,68.00,11.00,27.00,67.00,19.00,172.95,0",
						"34,90.00,99.00,65.00,92.00,57.00,4.00,59.00,13.00,17.00,69.00,38.00,90.00,4.00,20.00,151.19,0",
						"35,66.00,67.00,12.00,34.00,81.00,19.00,86.00,85.00,26.00,53.00,21.00,63.00,14.00,11.00,137.64,0",
						"36,38.00,47.00,43.00,94.00,99.00,86.00,85.00,64.00,64.00,88.00,46.00,5.00,6.00,4.00,150.15,0",
						"37,50.00,44.00,19.00,10.00,70.00,81.00,72.00,4.00,54.00,5.00,14.00,54.00,59.00,62.00,163.78,0",
						"38,96.00,8.00,60.00,90.00,58.00,40.00,33.00,35.00,63.00,5.00,85.00,97.00,5.00,82.00,147.61,0",
						"39,37.00,59.00,5.00,80.00,54.00,51.00,6.00,88.00,64.00,58.00,72.00,61.00,13.00,53.00,142.25,0",
						"40,86.00,59.00,77.00,52.00,69.00,97.00,16.00,72.00,56.00,88.00,63.00,54.00,40.00,1.00,145.20,0",
						"41,12.00,2.00,13.00,43.00,84.00,73.00,44.00,59.00,91.00,41.00,69.00,19.00,54.00,20.00,155.48,0",
						"42,52.00,89.00,98.00,21.00,31.00,30.00,25.00,47.00,23.00,37.00,7.00,14.00,96.00,30.00,166.86,0",
						"43,23.00,76.00,40.00,93.00,11.00,29.00,92.00,24.00,83.00,47.00,74.00,90.00,28.00,57.00,170.45,0",
						"44,87.00,49.00,86.00,11.00,37.00,83.00,56.00,87.00,17.00,77.00,36.00,83.00,78.00,69.00,159.30,0",
						"45,48.00,44.00,26.00,82.00,79.00,56.00,26.00,94.00,74.00,60.00,26.00,84.00,41.00,19.00,169.16,0",
						"46,28.00,28.00,94.00,31.00,13.00,80.00,90.00,5.00,98.00,68.00,16.00,9.00,32.00,78.00,146.07,0",
						"47,52.00,29.00,15.00,65.00,8.00,19.00,61.00,37.00,77.00,54.00,19.00,4.00,0.00,56.00,127.65,0",
						"48,3.00,3.00,44.00,52.00,76.00,47.00,85.00,14.00,75.00,27.00,44.00,69.00,75.00,56.00,148.18,0",
						"49,33.00,57.00,15.00,60.00,39.00,89.00,37.00,56.00,58.00,37.00,99.00,21.00,43.00,23.00,144.22,0",
						"50,74.00,2.00,41.00,65.00,90.00,37.00,27.00,87.00,52.00,91.00,8.00,64.00,9.00,6.00,156.81,0",
						"51,57.02,0.63,12.87,20.40,28.25,23.23,20.87,78.51,16.32,28.56,2.51,20.09,17.81,25.88,115.47,0",
						"52,82.00,40.00,23.00,98.00,19.00,21.00,10.00,15.00,20.00,34.00,38.00,62.00,23.00,90.00,135.71,0",
						"53,59.53,12.55,7.22,30.76,5.96,18.21,15.54,55.91,6.28,10.67,11.93,19.46,22.20,52.24,123.66,0",
						"54,36.00,54.00,26.00,12.00,79.00,77.00,91.00,20.00,58.00,9.00,27.00,18.00,69.00,51.00,144.28,0",
						"55,45.09,16.95,8.16,3.77,24.80,35.79,40.96,57.48,18.20,2.82,8.47,5.65,36.64,40.00,120.63,0",
						"56,22.00,25.00,30.00,68.00,82.00,64.00,0.00,26.00,1.00,28.00,66.00,32.00,12.00,65.00,144.88,0",
						"57,19.00,70.00,73.00,22.00,9.00,47.00,92.00,59.00,80.00,0.00,21.00,88.00,32.00,13.00,165.05,0",
						"58,94.00,9.00,85.00,34.00,73.00,80.00,69.00,89.00,17.00,50.00,28.00,80.00,66.00,97.00,162.30,0",
						"59,51.00,27.00,16.00,47.00,18.00,63.00,11.00,85.00,12.00,16.00,77.00,51.00,5.00,17.00,154.96,0",
						"60,21.00,80.00,55.00,75.00,69.00,98.00,66.00,25.00,96.00,92.00,1.00,67.00,5.00,84.00,175.24,0",
						"61,63.00,29.00,32.00,72.00,72.00,68.00,34.00,20.00,10.00,72.00,25.00,95.00,79.00,57.00,147.40,0",
						"62,61.00,96.00,47.00,28.00,58.00,52.00,47.00,60.00,48.00,53.00,89.00,47.00,1.00,41.00,146.22,0",
						"63,36.56,30.13,14.75,8.79,18.20,21.22,18.54,18.83,15.07,16.63,27.93,14.75,0.52,12.96,103.78,0",
						"64,28.77,9.14,4.48,2.67,5.52,11.41,9.48,5.72,4.57,5.05,8.48,4.48,0.37,4.03,63.40,0",
						"65,21.00,79.00,14.00,39.00,9.00,24.00,5.00,6.00,32.00,88.00,6.00,17.00,47.00,49.00,156.92,0",
						"66,97.00,50.00,19.00,38.00,92.00,28.00,85.00,40.00,40.00,83.00,56.00,15.00,66.00,36.00,142.92,0",
						"67,34.00,13.00,86.00,8.00,18.00,19.00,99.00,55.00,27.00,47.00,1.00,55.00,59.00,25.00,154.93,0",
						"68,25.00,7.00,97.00,53.00,50.00,93.00,4.00,31.00,97.00,40.00,40.00,15.00,74.00,25.00,158.14,0",
						"69,71.00,92.00,66.00,8.00,88.00,44.00,2.00,32.00,57.00,73.00,2.00,19.00,56.00,7.00,150.97,0",
						"70,59.00,55.00,48.00,90.00,54.00,35.00,41.00,27.00,61.00,10.00,46.00,32.00,46.00,46.00,124.94,0",
						"71,4.00,13.00,40.00,68.00,43.00,63.00,74.00,37.00,0.00,7.00,30.00,26.00,98.00,22.00,167.75,0",
						"72,85.00,85.00,91.00,48.00,61.00,7.00,32.00,92.00,22.00,5.00,81.00,16.00,23.00,75.00,164.80,0",
						"73,26.00,46.00,41.00,28.00,83.00,7.00,77.00,65.00,15.00,11.00,18.00,61.00,73.00,11.00,146.72,0",
						"74,34.00,98.00,52.00,90.00,65.00,11.00,72.00,63.00,29.00,34.00,38.00,32.00,26.00,33.00,129.52,0",
						"75,96.00,32.00,35.00,36.00,27.00,65.00,79.00,89.00,54.00,40.00,21.00,80.00,68.00,42.00,164.45,0",
						"76,9.00,14.00,47.00,7.00,94.00,6.00,56.00,45.00,54.00,95.00,75.00,4.00,47.00,62.00,171.96,0",
						"77,2.00,9.00,41.00,7.00,2.00,30.00,45.00,98.00,11.00,37.00,63.00,93.00,2.00,53.00,146.47,0",
						"78,68.00,77.00,61.00,42.00,40.00,59.00,54.00,55.00,87.00,64.00,61.00,39.00,4.00,52.00,133.65,0",
						"79,67.00,1.00,49.00,97.00,33.00,2.00,50.00,88.00,83.00,14.00,66.00,33.00,18.00,66.00,141.48,0",
						"80,63.00,68.00,57.00,33.00,43.00,79.00,67.00,56.00,99.00,20.00,34.00,16.00,92.00,37.00,130.73,0",
						"81,83.00,80.00,6.00,15.00,86.00,81.00,97.00,31.00,43.00,59.00,56.00,10.00,91.00,76.00,141.22,0",
						"82,59.85,25.11,1.88,4.71,26.99,37.04,42.84,60.93,13.50,18.52,17.58,3.14,43.55,47.85,98.80,0",
						"83,52.47,7.62,0.57,1.43,8.19,23.04,25.59,70.47,4.10,5.62,5.33,0.95,28.43,38.88,30.88,0",
						"84,50.26,2.39,0.18,0.45,2.57,18.85,20.43,73.32,1.29,1.76,1.67,0.30,23.91,36.19,48.76,0",
						"85,49.56,0.73,0.05,0.14,0.78,17.52,18.78,74.23,0.39,0.54,0.51,0.09,22.47,35.34,15.30,0",
						"86,49.35,0.23,0.02,0.04,0.24,17.12,18.29,74.50,0.12,0.17,0.16,0.03,22.04,35.08,43.30,0",
						"87,49.28,0.07,0.01,0.01,0.07,16.99,18.14,74.59,0.04,0.05,0.05,0.01,21.90,35.00,13.50,0",
						"88,49.26,0.02,0.00,0.00,0.02,16.95,18.09,74.62,0.01,0.02,0.02,0.00,21.86,34.98,90.92,0",
						"89,67.00,47.00,89.00,32.00,35.00,46.00,42.00,5.00,64.00,80.00,40.00,78.00,72.00,76.00,175.01,0",
						"90,38.44,14.75,27.93,10.04,10.99,19.54,17.14,35.36,20.09,25.11,12.55,24.48,31.45,31.20,106.68,0",
						"91,29.47,4.63,8.77,3.15,3.45,11.24,9.33,44.89,6.30,7.88,3.94,7.68,18.72,17.14,95.46,0",
						"92,14.00,44.00,98.00,39.00,86.00,9.00,36.00,92.00,26.00,99.00,27.00,65.00,75.00,47.00,179.42,0",
						"93,61.00,69.00,94.00,8.00,93.00,21.00,60.00,57.00,89.00,26.00,78.00,26.00,46.00,44.00,160.16,0",
						"94,36.56,21.66,29.50,2.51,29.19,11.49,22.62,17.89,27.93,8.16,24.48,8.16,14.65,13.90,99.76,0",
						"95,28.77,6.57,8.95,0.76,8.86,8.46,10.71,5.43,8.48,2.48,7.43,2.48,4.66,4.31,36.86,0",
						"96,25.09,2.06,2.81,0.24,2.78,7.17,6.89,1.70,2.66,0.78,2.33,0.78,2.36,1.74,82.95,1",
						"97,73.00,35.00,1.00,99.00,60.00,98.00,7.00,75.00,66.00,61.00,77.00,61.00,36.00,70.00,182.40,0",
						"98,83.00,1.00,4.00,34.00,51.00,63.00,33.00,42.00,62.00,93.00,10.00,43.00,33.00,6.00,138.48,0",
						"99,83.00,70.00,59.00,51.00,8.00,88.00,81.00,14.00,91.00,68.00,97.00,63.00,40.00,17.00,149.38,0",
						"100,86.00,93.00,17.00,32.00,80.00,81.00,8.00,43.00,84.00,75.00,85.00,45.00,54.00,86.00,146.18,0",
						"101,80.00,54.00,54.00,81.00,53.00,82.00,15.00,19.00,16.00,31.00,79.00,79.00,88.00,88.00,154.44,0",
						"102,97.00,27.00,44.00,57.00,32.00,3.00,36.00,40.00,51.00,99.00,94.00,29.00,75.00,34.00,141.76,0",
						"103,96.00,3.00,57.00,9.00,92.00,52.00,11.00,19.00,91.00,79.00,59.00,75.00,82.00,8.00,163.98,0",
						"104,73.00,93.00,83.00,1.00,17.00,74.00,63.00,61.00,24.00,76.00,14.00,51.00,85.00,85.00,174.92,0",
						"105,9.00,92.00,77.00,79.00,24.00,88.00,8.00,57.00,87.00,11.00,51.00,46.00,26.00,69.00,175.58,0",
						"106,39.00,53.00,38.00,33.00,0.00,0.00,88.00,44.00,59.00,85.00,61.00,16.00,50.00,74.00,155.46,0",
						"107,0.00,84.00,65.00,76.00,82.00,20.00,42.00,1.00,0.00,29.00,2.00,59.00,56.00,76.00,161.15,0",
						"108,76.00,1.00,39.00,94.00,55.00,13.00,7.00,21.00,4.00,24.00,32.00,52.00,38.00,75.00,142.89,0",
						"109,37.00,4.00,13.00,55.00,44.00,23.00,35.00,67.00,0.00,64.00,6.00,97.00,12.00,49.00,136.70,0",
						"110,36.00,75.00,96.00,43.00,92.00,96.00,72.00,21.00,60.00,37.00,37.00,12.00,68.00,5.00,165.84,0",
						"111,77.00,1.00,43.00,97.00,31.00,99.00,3.00,13.00,43.00,93.00,83.00,79.00,13.00,14.00,167.21,0",
						"112,88.00,20.00,52.00,61.00,4.00,96.00,74.00,76.00,71.00,88.00,75.00,43.00,77.00,6.00,149.50,0",
						"113,61.41,6.28,16.32,19.15,1.26,41.75,35.62,75.06,22.28,27.62,23.54,13.50,39.15,25.88,105.81,0",
						"114,52.94,1.91,4.95,5.81,0.38,24.47,23.40,74.76,6.76,8.38,7.14,4.10,27.09,32.21,33.13,0",
						"115,50.41,0.60,1.55,1.82,0.12,19.30,19.74,74.67,2.12,2.63,2.24,1.29,23.49,34.10,15.73,1",
						"116,49.62,0.19,0.49,0.57,0.04,12.25,12.29,74.64,0.67,0.83,0.70,0.40,20.14,23.83,11.88,0",
						"117,49.37,0.06,0.15,0.18,0.01,15.46,16.25,74.63,0.21,0.26,0.22,0.13,21.30,31.47,8.31,1",
						"118,49.29,0.02,0.05,0.05,0.00,16.49,17.52,74.63,0.06,0.08,0.07,0.04,21.68,33.91,2.71,0",
						"119,49.26,0.01,0.01,0.02,0.00,16.96,18.08,74.63,0.02,0.02,0.02,0.01,21.85,34.96,0.85,1",
						"120,49.26,0.00,0.00,0.01,0.00,16.94,18.07,74.63,0.01,0.01,0.01,0.00,21.84,34.97,0.17,0",
						"121,49.25,0.00,0.00,0.00,0.00,16.94,18.07,74.63,0.00,0.00,0.00,0.00,21.84,34.97,66.80,0",
						"122,32.87,0.00,0.00,0.00,0.00,9.93,9.31,57.22,0.00,0.00,0.00,0.00,14.48,18.69,30.14,0",
						"123,25.36,0.04,0.07,0.04,0.01,7.45,5.79,49.24,0.06,0.08,0.02,0.06,12.93,10.68,9.36,0",
						"124,25.37,0.01,0.02,0.01,0.00,7.44,5.77,49.25,0.02,0.02,0.01,0.02,12.91,10.70,68.44,0",
						"125,14.58,26.99,16.95,4.39,24.48,6.28,24.17,27.45,23.85,5.34,23.54,12.24,1.26,0.63,85.37,0",
						"126,20.96,8.47,5.32,1.38,7.68,6.58,11.17,8.62,7.49,1.68,7.39,3.84,0.97,0.29,34.30,0",
						"127,23.99,2.66,1.67,0.43,2.41,6.96,7.30,2.70,2.35,0.53,2.32,1.21,0.52,0.18,12.90,0",
						"128,24.95,0.81,0.51,0.13,0.73,7.08,6.06,0.82,0.71,0.16,0.70,0.37,0.37,0.15,83.86,1",
						"129,97.00,21.00,89.00,17.00,96.00,3.00,88.00,29.00,83.00,76.00,58.00,56.00,52.00,87.00,182.79,0",
						"130,76.00,76.00,82.00,55.00,92.00,41.00,87.00,88.00,31.00,99.00,16.00,20.00,42.00,32.00,145.63,0",
						"131,95.00,10.00,67.00,38.00,18.00,58.00,84.00,17.00,16.00,37.00,36.00,64.00,84.00,43.00,142.59,0",
						"132,95.00,11.00,19.00,74.00,9.00,54.00,55.00,97.00,63.00,24.00,79.00,67.00,65.00,64.00,150.67,0",
						"133,90.00,46.00,39.00,0.00,27.00,89.00,99.00,32.00,7.00,70.00,85.00,14.00,34.00,8.00,147.92,0",
						"134,69.00,71.00,8.00,29.00,15.00,83.00,49.00,44.00,17.00,13.00,91.00,87.00,10.00,47.00,143.94,0",
						"135,47.00,28.00,14.00,34.00,53.00,18.00,69.00,93.00,24.00,99.00,55.00,40.00,51.00,28.00,149.36,0",
						"136,42.00,24.00,13.00,85.00,12.00,41.00,15.00,44.00,51.00,1.00,65.00,1.00,70.00,16.00,166.09,0",
						"137,79.00,19.00,11.00,13.00,0.00,41.00,71.00,37.00,84.00,48.00,2.00,82.00,86.00,70.00,173.74,0",
						"138,39.00,31.00,64.00,26.00,72.00,87.00,35.00,68.00,88.00,51.00,88.00,38.00,46.00,18.00,137.61,0",
						"139,73.00,79.00,14.00,44.00,62.00,51.00,6.00,35.00,84.00,46.00,63.00,26.00,27.00,92.00,122.54,0",
						"140,52.00,47.00,48.00,26.00,43.00,49.00,38.00,58.00,99.00,59.00,71.00,11.00,29.00,93.00,118.19,0",
						"141,27.00,8.00,15.00,25.00,40.00,52.00,36.00,13.00,89.00,69.00,13.00,47.00,36.00,46.00,139.09,0",
						"142,38.00,61.00,36.00,90.00,64.00,73.00,12.00,10.00,16.00,6.00,98.00,46.00,22.00,21.00,150.70,0",
						"143,45.72,19.15,11.30,28.25,20.09,27.70,7.52,53.32,5.02,1.88,30.76,14.44,13.04,11.21,100.30,0",
						"144,48.15,6.01,3.55,8.87,6.30,13.65,6.25,66.92,1.58,0.59,9.65,4.53,14.17,10.97,70.98,0",
						"145,48.91,1.89,1.11,2.78,1.98,11.06,8.31,87.89,0.49,0.19,3.03,1.42,15.76,16.72,32.58,0",
						"146,49.14,0.59,0.35,0.87,0.62,15.09,15.01,78.79,0.16,0.06,0.95,0.45,19.93,29.24,16.37,1",
						"147,49.22,0.19,0.11,0.27,0.19,10.93,10.80,75.93,0.05,0.02,0.30,0.14,19.02,22.30,9.01,0",
						"148,49.24,0.06,0.03,0.08,0.06,9.60,9.46,75.02,0.01,0.01,0.09,0.04,18.73,20.09,2.88,0",
						"149,49.25,0.02,0.01,0.03,0.02,9.21,9.06,74.75,0.00,0.00,0.03,0.01,18.64,19.43,7.66,0",
						"150,49.25,0.01,0.00,0.01,0.01,14.51,15.24,74.67,0.00,0.00,0.01,0.00,20.84,30.09,9.22,0",
						"151,49.25,0.00,0.00,0.00,0.00,16.20,17.21,74.64,0.00,0.00,0.00,0.00,21.53,33.49,3.00,0",
						"152,49.25,0.00,0.00,0.00,0.00,16.70,17.80,74.63,0.00,0.00,0.00,0.00,21.74,34.50,16.58,1",
						"153,32.87,0.00,0.00,0.00,0.00,9.86,9.22,57.22,0.00,0.00,0.00,0.00,14.45,18.54,21.04,0",
						"154,27.65,0.00,0.00,0.00,0.00,7.68,6.49,51.67,0.00,0.00,0.00,0.00,12.13,13.45,6.87,1",
						"155,26.09,0.00,0.00,0.00,0.00,7.02,5.67,50.01,0.00,0.00,0.00,0.00,11.43,11.93,2.20,1",
						"156,25.38,0.00,0.00,0.00,0.00,7.44,5.76,49.26,0.00,0.00,0.00,0.00,12.90,10.71,1.05,0",
						"157,25.38,0.00,0.00,0.00,0.00,7.44,5.76,49.26,0.00,0.00,0.00,0.00,12.90,10.71,34.28,0",
						"158,10.78,0.62,0.59,0.64,0.26,0.44,0.31,20.92,0.76,0.54,0.44,0.04,0.92,0.41,20.97,1",
						"159,19.77,0.19,0.19,0.20,0.08,4.75,3.69,6.57,0.24,0.17,0.14,0.01,0.86,0.22,13.69,1",
						"160,23.61,0.06,0.06,0.06,0.03,6.39,4.95,2.06,0.07,0.05,0.04,0.00,0.48,0.16,66.24,1",
						"161,42.00,37.00,58.00,14.00,7.00,64.00,96.00,72.00,45.00,56.00,80.00,42.00,30.00,19.00,173.86,0",
						"162,65.00,44.00,97.00,90.00,90.00,25.00,3.00,46.00,27.00,79.00,90.00,15.00,87.00,27.00,157.71,0",
						"163,57.00,83.00,23.00,74.00,71.00,98.00,85.00,38.00,91.00,17.00,86.00,62.00,81.00,62.00,157.91,0",
						"164,90.00,35.00,67.00,84.00,94.00,28.00,99.00,84.00,92.00,17.00,4.00,20.00,31.00,18.00,158.10,0",
						"165,72.00,40.00,86.00,62.00,40.00,55.00,26.00,77.00,19.00,79.00,72.00,7.00,30.00,21.00,147.60,0",
						"166,86.00,20.00,1.00,91.00,30.00,89.00,79.00,24.00,5.00,31.00,88.00,16.00,33.00,84.00,150.26,0",
						"167,97.00,53.00,58.00,51.00,14.00,54.00,28.00,25.00,75.00,91.00,46.00,62.00,40.00,2.00,148.31,0",
						"168,36.00,81.00,98.00,89.00,62.00,38.00,11.00,12.00,20.00,70.00,95.00,38.00,98.00,52.00,135.98,0",
						"169,73.00,36.00,89.00,58.00,77.00,46.00,9.00,86.00,24.00,39.00,39.00,12.00,67.00,48.00,155.19,0",
						"170,34.00,71.00,42.00,72.00,89.00,73.00,8.00,67.00,88.00,59.00,43.00,89.00,32.00,24.00,125.99,0",
						"171,49.00,2.00,34.00,9.00,70.00,41.00,4.00,3.00,38.00,98.00,43.00,30.00,55.00,65.00,152.87,0",
						"172,57.00,60.00,48.00,33.00,10.00,6.00,30.00,89.00,87.00,9.00,40.00,10.00,39.00,0.00,167.82,0",
						"173,90.00,54.00,73.00,53.00,98.00,69.00,36.00,79.00,30.00,91.00,18.00,48.00,82.00,42.00,159.40,0",
						"174,62.04,16.95,22.91,16.63,30.76,26.45,15.06,74.98,9.42,28.56,5.65,15.07,31.88,17.80,100.09,0",
						"175,53.27,5.32,7.19,5.22,9.65,13.25,8.61,73.71,2.96,8.96,1.77,4.73,20.08,13.03,31.18,0",
						"176,50.47,1.61,2.18,1.58,2.93,9.05,6.56,73.31,0.90,2.72,0.54,1.44,16.33,11.52,9.75,0",
						"177,49.64,0.51,0.68,0.50,0.92,7.79,5.94,73.19,0.28,0.85,0.17,0.45,15.21,11.06,8.19,0",
						"178,49.37,0.16,0.21,0.16,0.29,8.53,7.87,80.96,0.09,0.27,0.05,0.14,17.41,16.86,10.44,1",
						"179,49.29,0.05,0.07,0.05,0.09,8.88,8.57,76.55,0.03,0.08,0.02,0.04,18.24,18.44,4.21,0",
						"180,49.22,0.02,0.02,0.01,0.03,9.12,8.90,74.53,0.01,0.03,0.01,0.01,18.07,18.74,1.61,1",
						"181,49.24,0.00,0.01,0.00,0.01,9.05,8.88,74.60,0.00,0.01,0.00,0.00,18.44,19.01,6.83,0",
						"182,49.25,0.00,0.00,0.00,0.00,9.04,8.88,74.62,0.00,0.00,0.00,0.00,18.55,19.09,13.39,1",
						"183,49.25,0.00,0.00,0.00,0.00,14.46,15.18,74.62,0.00,0.00,0.00,0.00,20.81,29.98,22.34,1",
						"184,32.87,0.00,0.00,0.00,0.00,9.15,8.40,57.22,0.00,0.00,0.00,0.00,14.16,17.12,21.97,1",
						"185,27.65,0.00,0.00,0.00,0.00,7.46,6.24,51.67,0.00,0.00,0.00,0.00,12.04,13.02,7.16,0",
						"186,25.60,0.00,0.00,0.00,0.00,7.38,5.72,49.49,0.00,0.00,0.00,0.00,12.02,10.65,2.61,1",
						"187,25.44,0.00,0.00,0.00,0.00,6.92,5.43,49.33,0.00,0.00,0.00,0.00,11.39,11.06,0.75,0",
						"188,25.39,0.00,0.00,0.00,0.00,6.79,5.34,49.28,0.00,0.00,0.00,0.00,11.20,11.18,10.09,0",
						"189,10.87,0.81,0.81,0.33,0.80,0.73,0.46,21.32,0.14,0.78,0.85,0.42,0.80,0.31,27.69,0",
						"190,10.77,0.25,0.25,0.10,0.25,0.23,0.14,17.51,0.04,0.24,0.27,0.13,0.25,0.10,3.20,0",
						"191,10.74,0.08,0.08,0.03,0.08,0.07,0.04,16.30,0.01,0.07,0.08,0.04,0.08,0.03,9.96,1",
						"192,19.76,0.03,0.03,0.01,0.03,4.63,3.60,5.12,0.00,0.02,0.03,0.01,0.60,0.10,82.71,1",
						"193,46.00,74.00,25.00,98.00,69.00,56.00,0.00,31.00,78.00,70.00,63.00,55.00,46.00,71.00,174.23,0",
						"194,28.00,77.00,83.00,78.00,33.00,3.00,62.00,11.00,62.00,22.00,80.00,35.00,97.00,82.00,148.31,0",
						"195,38.00,43.00,69.00,22.00,57.00,76.00,74.00,42.00,77.00,89.00,20.00,73.00,47.00,34.00,146.11,0",
						"196,86.00,85.00,2.00,54.00,93.00,74.00,54.00,9.00,14.00,16.00,7.00,9.00,20.00,49.00,153.33,0",
						"197,65.00,47.00,37.00,3.00,34.00,28.00,77.00,10.00,2.00,1.00,4.00,15.00,56.00,16.00,161.21,0",
						"198,93.00,38.00,41.00,30.00,51.00,34.00,16.00,87.00,32.00,59.00,89.00,61.00,10.00,31.00,154.48,0",
						"199,32.00,54.00,85.00,93.00,55.00,16.00,49.00,28.00,72.00,30.00,20.00,57.00,80.00,45.00,152.06,0",
						"200,63.00,69.00,36.00,81.00,79.00,82.00,43.00,58.00,38.00,97.00,90.00,59.00,90.00,76.00,141.48,0",
						"201,96.00,86.00,29.00,1.00,77.00,70.00,98.00,7.00,25.00,51.00,12.00,85.00,91.00,13.00,178.94,0",
						"202,36.00,55.00,92.00,28.00,99.00,97.00,7.00,58.00,15.00,39.00,62.00,78.00,31.00,45.00,135.77,0",
						"203,83.00,9.00,41.00,67.00,74.00,56.00,87.00,19.00,78.00,22.00,86.00,55.00,76.00,64.00,168.92,0",
						"204,59.00,35.00,86.00,15.00,77.00,87.00,2.00,46.00,8.00,78.00,91.00,89.00,32.00,23.00,176.07,0",
						"205,52.31,10.99,26.99,4.71,24.17,32.10,4.39,64.62,2.51,24.48,28.56,27.93,16.18,11.83,104.53,0",
						"206,50.21,3.45,8.47,1.48,7.59,15.03,5.26,70.46,0.79,7.68,8.96,8.77,15.16,11.16,32.25,0",
						"207,49.55,1.05,2.57,0.45,2.30,9.59,5.54,72.32,0.24,2.33,2.72,2.66,14.83,10.95,10.11,1",
						"208,49.35,0.33,0.81,0.14,0.72,7.96,5.62,72.88,0.08,0.73,0.85,0.84,14.74,10.89,3.07,1",
						"209,49.28,0.10,0.24,0.04,0.22,7.44,5.65,73.06,0.02,0.22,0.26,0.25,14.70,10.87,0.96,1",
						"210,49.26,0.03,0.08,0.01,0.07,7.29,5.66,73.11,0.01,0.07,0.08,0.08,14.70,10.86,11.16,0",
						"211,49.26,0.01,0.02,0.00,0.02,8.37,7.78,80.93,0.00,0.02,0.03,0.02,17.25,16.80,11.60,0",
						"212,49.25,0.00,0.01,0.00,0.01,8.83,8.54,76.54,0.00,0.01,0.01,0.01,18.19,18.42,17.22,1",
						"213,32.87,0.00,0.00,0.00,0.00,7.44,6.34,57.82,0.00,0.00,0.00,0.00,11.38,10.26,16.79,1",
						"214,32.87,0.00,0.00,0.00,0.00,7.42,6.37,57.38,0.00,0.00,0.00,0.00,12.56,12.80,12.84,0",
						"215,27.73,0.00,0.00,0.00,0.00,8.08,6.55,51.81,0.00,0.00,0.00,0.00,8.64,7.71,14.62,1",
						"216,26.11,0.00,0.00,0.00,0.00,7.43,5.90,50.05,0.00,0.00,0.00,0.00,7.45,6.14,6.31,1",
						"217,25.60,0.00,0.00,0.00,0.00,6.95,5.49,49.51,0.00,0.00,0.00,0.00,9.97,9.64,4.01,1",
						"218,25.44,0.00,0.00,0.00,0.00,6.79,5.36,49.33,0.00,0.00,0.00,0.00,10.77,10.75,1.23,1",
						"219,25.40,0.00,0.00,0.00,0.00,6.75,5.32,49.28,0.00,0.00,0.00,0.00,11.01,11.09,1.47,1",
						"220,25.38,0.00,0.00,0.00,0.00,7.32,5.60,49.26,0.00,0.00,0.00,0.00,9.35,9.88,1.75,1",
						"221,23.93,0.00,0.00,0.00,0.00,7.29,5.70,49.26,0.00,0.00,0.00,0.00,9.61,9.61,22.18,1",
						"222,10.73,0.00,0.00,0.00,0.00,0.00,0.00,21.14,0.00,0.00,0.00,0.00,0.00,0.00,21.63,1",
						"223,19.75,0.00,0.00,0.00,0.00,4.66,3.66,23.02,0.00,0.00,0.00,0.00,4.74,3.72,12.51,1",
						"224,22.59,0.00,0.00,0.00,0.00,6.13,4.81,23.61,0.00,0.00,0.00,0.00,6.23,4.88,64.04,1",
						"225,27.00,25.00,64.00,20.00,20.00,48.00,46.00,83.00,16.00,74.00,87.00,10.00,56.00,7.00,146.43,0",
						"226,19.00,59.00,49.00,32.00,1.00,73.00,66.00,76.00,9.00,47.00,35.00,33.00,61.00,19.00,124.83,0",
						"227,64.00,42.00,83.00,55.00,59.00,75.00,93.00,56.00,73.00,45.00,72.00,8.00,92.00,5.00,149.32,0",
						"228,55.00,30.00,66.00,27.00,92.00,32.00,10.00,84.00,9.00,37.00,60.00,97.00,29.00,41.00,173.26,0",
						"229,3.00,91.00,2.00,26.00,15.00,61.00,54.00,60.00,98.00,89.00,66.00,18.00,32.00,92.00,200.47,0",
						"230,39.00,36.00,74.00,3.00,89.00,29.00,95.00,34.00,7.00,38.00,59.00,65.00,20.00,16.00,152.63,0",
						"231,37.00,46.00,44.00,4.00,64.00,51.00,42.00,66.00,3.00,37.00,66.00,13.00,9.00,30.00,133.20,0",
						"232,32.00,28.00,57.00,92.00,3.00,80.00,87.00,46.00,57.00,46.00,67.00,56.00,12.00,49.00,141.83,0",
						"233,27.00,63.00,58.00,83.00,67.00,66.00,14.00,57.00,50.00,89.00,82.00,13.00,28.00,61.00,155.66,0",
						"234,2.00,31.00,99.00,69.00,95.00,60.00,24.00,41.00,57.00,27.00,94.00,92.00,2.00,17.00,151.47,0",
						"235,34.00,80.00,28.00,17.00,2.00,41.00,7.00,61.00,48.00,34.00,8.00,44.00,0.00,17.00,152.73,0",
						"236,21.49,25.11,8.79,5.34,0.63,12.87,2.20,87.76,15.07,10.67,2.51,13.81,68.61,5.42,100.67,0",
						"237,40.54,7.88,2.76,1.68,0.20,8.99,4.58,77.72,4.73,3.35,0.79,4.33,31.61,9.15,38.29,0",
						"238,46.61,2.39,0.84,0.51,0.06,7.76,5.33,74.53,1.44,1.02,0.24,1.32,19.83,10.34,12.17,1",
						"239,48.42,0.75,0.26,0.16,0.02,7.39,5.56,73.57,0.45,0.32,0.08,0.41,16.30,10.69,4.68,1",
						"240,49.00,0.23,0.08,0.05,0.01,7.27,5.63,73.27,0.14,0.10,0.02,0.13,15.18,10.81,1.46,1",
						"241,49.17,0.07,0.03,0.02,0.00,7.23,5.65,73.18,0.04,0.03,0.01,0.04,14.84,10.84,10.12,1",
						"242,49.18,0.02,0.01,0.00,0.00,6.84,5.37,96.31,0.01,0.01,0.00,0.01,14.30,11.76,30.39,1",
						"243,32.84,0.01,0.00,0.00,0.00,6.81,5.30,64.02,0.00,0.00,0.00,0.00,10.08,8.19,21.61,1",
						"244,27.72,0.00,0.00,0.00,0.00,6.80,5.32,53.89,0.00,0.00,0.00,0.00,8.83,7.05,13.44,1",
						"245,26.08,0.00,0.00,0.00,0.00,6.80,5.33,50.66,0.00,0.00,0.00,0.00,8.44,6.68,4.26,1",
						"246,25.60,0.00,0.00,0.00,0.00,6.80,5.33,49.70,0.00,0.00,0.00,0.00,8.32,6.57,4.00,0",
						"247,25.95,0.00,0.00,0.00,0.00,7.37,5.84,49.94,0.00,0.00,0.00,0.00,7.37,5.93,1.84,1",
						"248,25.55,0.00,0.00,0.00,0.00,7.20,5.67,49.46,0.00,0.00,0.00,0.00,7.05,5.57,0.81,1",
						"249,25.43,0.00,0.00,0.00,0.00,7.15,5.62,49.32,0.00,0.00,0.00,0.00,6.95,5.47,2.66,1",
						"250,25.39,0.00,0.00,0.00,0.00,6.86,5.40,49.27,0.00,0.00,0.00,0.00,9.81,9.43,3.11,1",
						"251,25.38,0.00,0.00,0.00,0.00,7.21,5.61,49.26,0.00,0.00,0.00,0.00,9.07,9.05,1.06,0",
						"252,25.37,0.00,0.00,0.00,0.00,7.14,5.58,49.26,0.00,0.00,0.00,0.00,9.07,8.93,9.12,1",
						"253,24.35,0.00,0.00,0.00,0.00,8.43,7.85,31.84,0.00,0.00,0.00,0.00,9.65,9.54,14.61,1",
						"254,24.02,0.00,0.00,0.00,0.00,7.30,5.69,49.25,0.00,0.00,0.00,0.00,9.52,9.61,23.84,1",
						"255,23.93,0.00,0.00,0.00,0.00,6.95,5.45,31.84,0.00,0.00,0.00,0.00,7.73,6.73,12.20,1",
						"256,23.89,0.00,0.00,0.00,0.00,6.84,5.37,26.30,0.00,0.00,0.00,0.00,7.16,5.82,74.42,1",
						"257,20.00,93.00,57.00,49.00,77.00,36.00,4.00,92.00,30.00,99.00,8.00,35.00,44.00,98.00,182.96,0",
						"258,5.00,17.00,24.00,56.00,42.00,49.00,77.00,89.00,74.00,20.00,45.00,93.00,22.00,59.00,155.90,0",
						"259,76.00,25.00,36.00,73.00,38.00,32.00,0.00,61.00,35.00,4.00,31.00,44.00,17.00,89.00,152.93,0",
						"260,29.00,42.00,1.00,96.00,53.00,27.00,74.00,53.00,41.00,77.00,23.00,86.00,80.00,37.00,159.94,0",
						"261,89.00,78.00,71.00,48.00,22.00,34.00,87.00,7.00,13.00,7.00,40.00,87.00,90.00,27.00,157.28,0",
						"262,0.00,43.00,51.00,82.00,64.00,63.00,0.00,77.00,64.00,7.00,4.00,74.00,99.00,45.00,161.40,0",
						"263,53.00,18.00,5.00,48.00,62.00,96.00,9.00,10.00,60.00,0.00,34.00,37.00,6.00,12.00,159.48,0",
						"264,77.00,46.00,75.00,62.00,43.00,6.00,71.00,3.00,69.00,26.00,15.00,20.00,74.00,99.00,151.18,0",
						"265,93.00,44.00,36.00,12.00,59.00,10.00,82.00,56.00,31.00,21.00,38.00,3.00,52.00,29.00,141.14,0",
						"266,78.00,73.00,69.00,45.00,35.00,81.00,95.00,67.00,98.00,77.00,22.00,64.00,99.00,40.00,168.20,0",
						"267,35.30,22.91,21.66,14.12,10.99,25.42,29.82,89.64,30.76,24.17,6.90,20.09,99.69,12.64,128.29,0",
						"268,21.70,6.95,6.57,4.29,3.33,7.72,9.05,96.86,9.33,7.33,2.10,6.10,99.90,3.92,68.42,0",
						"269,23.20,2.18,2.06,1.35,1.05,7.43,6.75,64.20,2.93,2.30,0.66,1.91,37.90,7.80,40.67,1",
						"270,41.08,0.68,0.65,0.42,0.33,7.12,5.88,70.33,0.92,0.72,0.21,0.60,18.04,7.06,14.28,1",
						"271,46.77,0.21,0.20,0.13,0.10,7.03,5.60,72.28,0.28,0.22,0.06,0.18,11.71,6.83,5.91,0",
						"272,48.47,0.07,0.06,0.04,0.03,7.16,5.64,72.87,0.09,0.07,0.02,0.06,13.75,9.59,12.45,1",
						"273,49.01,0.02,0.02,0.01,0.01,6.95,5.47,89.44,0.03,0.02,0.01,0.02,14.60,11.46,22.33,1",
						"274,32.79,0.01,0.01,0.00,0.00,6.84,5.33,61.87,0.01,0.01,0.00,0.01,10.18,8.09,24.11,1",
						"275,27.70,0.00,0.00,0.00,0.00,6.81,5.33,53.21,0.00,0.00,0.00,0.00,8.86,7.02,7.57,1",
						"276,26.08,0.00,0.00,0.00,0.00,6.80,5.33,50.46,0.00,0.00,0.00,0.00,8.44,6.67,2.44,1",
						"277,25.59,0.00,0.00,0.00,0.00,6.80,5.28,49.47,0.00,0.00,0.00,0.00,8.19,6.55,0.83,1",
						"278,25.44,0.00,0.00,0.00,0.00,6.80,5.32,49.32,0.00,0.00,0.00,0.00,8.24,6.53,0.23,1",
						"279,25.39,0.00,0.00,0.00,0.00,6.80,5.33,49.27,0.00,0.00,0.00,0.00,8.25,6.53,1.43,1",
						"280,25.38,0.00,0.00,0.00,0.00,7.97,6.31,49.26,0.00,0.00,0.00,0.00,6.85,5.38,1.31,1",
						"281,25.38,0.00,0.00,0.00,0.00,7.38,5.81,49.26,0.00,0.00,0.00,0.00,6.89,5.41,0.41,1",
						"282,25.37,0.00,0.00,0.00,0.00,7.21,5.66,49.25,0.00,0.00,0.00,0.00,6.91,5.41,2.99,1",
						"283,25.37,0.00,0.00,0.00,0.00,7.13,5.59,49.25,0.00,0.00,0.00,0.00,9.00,8.77,9.89,1",
						"284,24.35,0.00,0.00,0.00,0.00,8.43,7.85,31.84,0.00,0.00,0.00,0.00,9.62,9.49,11.64,1",
						"285,24.02,0.00,0.00,0.00,0.00,8.85,8.57,26.30,0.00,0.00,0.00,0.00,9.82,9.72,4.20,1",
						"286,23.93,0.00,0.00,0.00,0.00,8.97,8.79,24.64,0.00,0.00,0.00,0.00,9.88,9.78,8.50,1",
						"287,23.88,0.00,0.00,0.00,0.00,6.81,5.35,24.09,0.00,0.00,0.00,0.00,7.20,5.83,6.75,1",
						"288,24.32,0.00,0.00,0.00,0.00,6.77,5.32,23.90,0.00,0.00,0.00,0.00,6.94,5.46,80.27,1",
						"289,88.00,79.00,27.00,8.00,25.00,87.00,60.00,53.00,96.00,14.00,38.00,83.00,35.00,77.00,177.89,0",
						"290,86.00,71.00,50.00,85.00,84.00,39.00,38.00,9.00,55.00,90.00,96.00,70.00,91.00,21.00,171.70,0",
						"291,75.00,0.00,83.00,27.00,36.00,91.00,21.00,49.00,99.00,15.00,66.00,76.00,54.00,30.00,138.22,0",
						"292,76.00,16.00,94.00,29.00,6.00,67.00,14.00,63.00,66.00,48.00,28.00,21.00,39.00,98.00,146.41,0",
						"293,99.00,26.00,86.00,97.00,35.00,39.00,59.00,27.00,25.00,38.00,48.00,95.00,86.00,65.00,146.04,0",
						"294,13.00,95.00,24.00,82.00,60.00,48.00,4.00,43.00,57.00,84.00,17.00,13.00,63.00,48.00,150.74,0",
						"295,94.00,25.00,90.00,84.00,43.00,27.00,24.00,8.00,84.00,86.00,58.00,17.00,72.00,12.00,151.41,0",
						"296,44.00,10.00,60.00,93.00,89.00,65.00,67.00,50.00,78.00,53.00,29.00,48.00,50.00,9.00,136.51,0",
						"297,56.00,36.00,75.00,35.00,37.00,29.00,16.00,83.00,64.00,90.00,30.00,0.00,54.00,5.00,130.51,0",
						"298,26.00,14.00,80.00,69.00,1.00,54.00,12.00,61.00,87.00,31.00,89.00,10.00,69.00,41.00,144.60,0",
						"299,89.00,83.00,90.00,67.00,63.00,60.00,2.00,61.00,11.00,16.00,26.00,53.00,21.00,64.00,159.22,0",
						"300,44.32,26.05,28.25,21.03,19.77,23.83,4.54,52.94,3.45,5.02,8.16,16.63,13.14,26.66,114.46,0",
						"301,47.70,8.18,8.87,6.60,6.21,12.27,5.18,66.80,1.08,1.58,2.56,5.22,10.26,12.98,38.72,0",
						"302,48.78,2.48,2.69,2.00,1.88,8.59,5.39,71.21,0.33,0.48,0.78,1.58,9.35,8.63,12.62,1",
						"303,47.39,0.81,0.87,0.65,0.61,8.71,7.26,72.51,0.11,0.16,0.25,0.51,13.02,10.18,15.55,1",
						"304,31.26,0.25,0.27,0.20,0.19,18.19,23.11,72.94,0.03,0.05,0.08,0.16,10.22,7.83,20.59,1",
						"305,31.67,0.08,0.08,0.06,0.06,6.91,5.51,73.07,0.01,0.01,0.02,0.05,14.09,12.61,20.49,1",
						"306,26.24,0.02,0.03,0.02,0.02,6.72,5.35,73.12,0.00,0.00,0.01,0.01,15.34,14.15,10.92,1",
						"307,25.65,0.01,0.01,0.01,0.01,6.77,5.29,56.74,0.00,0.00,0.00,0.00,10.41,8.94,11.61,1",
						"308,25.46,0.00,0.00,0.00,0.00,6.79,5.32,51.60,0.00,0.00,0.00,0.00,8.94,7.28,3.65,1",
						"309,25.40,0.00,0.00,0.00,0.00,6.80,5.33,49.97,0.00,0.00,0.00,0.00,8.47,6.75,1.19,1",
						"310,25.38,0.00,0.00,0.00,0.00,6.80,5.33,49.48,0.00,0.00,0.00,0.00,8.33,6.60,1.30,1",
						"311,25.38,0.00,0.00,0.00,0.00,7.36,5.79,49.32,0.00,0.00,0.00,0.00,7.04,5.55,1.32,1",
						"312,25.37,0.00,0.00,0.00,0.00,7.20,5.65,49.28,0.00,0.00,0.00,0.00,6.95,5.46,7.29,1",
						"313,25.37,0.00,0.00,0.00,0.00,7.15,5.61,49.26,0.00,0.00,0.00,0.00,6.92,5.43,2.19,1",
						"314,25.37,0.00,0.00,0.00,0.00,7.38,5.81,49.26,0.00,0.00,0.00,0.00,8.37,7.77,10.41,1",
						"315,24.35,0.00,0.00,0.00,0.00,8.51,7.92,31.84,0.00,0.00,0.00,0.00,9.43,9.17,17.29,1",
						"316,24.02,0.00,0.00,0.00,0.00,8.87,8.59,26.30,0.00,0.00,0.00,0.00,9.76,9.62,6.01,1",
						"317,24.30,0.00,0.00,0.00,0.00,6.84,5.38,25.56,0.00,0.00,0.00,0.00,9.86,9.76,3.86,1",
						"318,24.01,0.00,0.00,0.00,0.00,8.36,7.82,24.39,0.00,0.00,0.00,0.00,9.90,9.80,1.66,1",
						"319,23.92,0.00,0.00,0.00,0.00,8.82,8.55,24.04,0.00,0.00,0.00,0.00,9.91,9.81,10.81,1",
						"320,41.30,0.00,0.00,0.00,0.00,7.68,6.12,41.76,0.00,0.00,0.00,0.00,7.63,6.52,77.87,1",
						"321,90.00,63.00,14.00,66.00,66.00,2.00,88.00,63.00,54.00,47.00,6.00,90.00,63.00,48.00,167.84,0",
						"322,6.00,31.00,61.00,92.00,68.00,64.00,25.00,24.00,86.00,32.00,35.00,1.00,58.00,58.00,137.72,0",
						"323,8.00,10.00,58.00,54.00,94.00,99.00,51.00,39.00,85.00,2.00,44.00,13.00,92.00,53.00,118.97,0",
						"324,5.00,50.00,53.00,13.00,74.00,76.00,26.00,30.00,29.00,21.00,7.00,57.00,44.00,68.00,135.93,0",
						"325,90.00,71.00,98.00,40.00,94.00,71.00,46.00,99.00,29.00,27.00,41.00,5.00,53.00,24.00,153.70,0",
						"326,25.00,87.00,53.00,84.00,78.00,63.00,81.00,69.00,73.00,6.00,31.00,77.00,9.00,69.00,148.09,0",
						"327,38.00,5.00,81.00,49.00,77.00,79.00,53.00,34.00,14.00,4.00,29.00,55.00,33.00,62.00,133.69,0",
						"328,24.00,0.00,67.00,15.00,11.00,56.00,44.00,7.00,72.00,18.00,12.00,76.00,50.00,84.00,128.38,0",
						"329,11.00,81.00,43.00,32.00,69.00,76.00,46.00,35.00,93.00,61.00,28.00,96.00,58.00,21.00,147.16,0",
						"330,33.00,41.00,67.00,48.00,51.00,16.00,51.00,51.00,70.00,9.00,1.00,21.00,33.00,64.00,140.07,0",
						"331,55.00,81.00,70.00,83.00,55.00,93.00,93.00,3.00,92.00,2.00,77.00,8.00,53.00,61.00,158.24,0",
						"332,55.00,58.00,7.00,82.00,41.00,30.00,82.00,44.00,48.00,62.00,34.00,97.00,7.00,98.00,161.59,0",
						"333,34.67,18.20,2.20,25.74,12.87,14.02,29.35,47.60,15.07,19.46,10.67,30.44,8.96,37.61,76.22,0",
						"334,44.68,5.71,0.69,8.08,4.04,9.19,12.97,65.12,4.73,6.11,3.35,9.56,8.95,16.42,31.38,0",
						"335,30.41,1.79,0.22,2.54,1.27,18.34,24.90,70.62,1.48,1.92,1.05,3.00,8.94,9.79,17.56,1",
						"336,25.86,0.54,0.07,0.77,0.38,21.25,28.70,72.37,0.45,0.58,0.32,0.91,8.94,7.68,5.51,1",
						"337,24.50,0.17,0.02,0.24,0.12,22.12,29.84,72.89,0.14,0.18,0.10,0.29,8.94,7.05,15.77,1",
						"338,23.91,0.05,0.01,0.07,0.04,7.03,5.59,74.54,0.04,0.06,0.03,0.09,13.46,10.76,16.82,1",
						"339,23.89,0.02,0.00,0.02,0.01,6.76,5.37,73.56,0.01,0.02,0.01,0.03,15.15,13.59,10.28,1",
						"340,24.91,0.00,0.00,0.01,0.00,6.78,5.30,56.88,0.00,0.01,0.00,0.01,10.35,8.76,16.02,1",
						"341,25.23,0.00,0.00,0.00,0.00,6.79,5.32,51.65,0.00,0.00,0.00,0.00,8.92,7.23,11.04,1",
						"342,25.23,0.00,0.00,0.00,0.00,8.03,6.41,51.54,0.00,0.00,0.00,0.00,8.11,6.77,4.12,1",
						"343,25.33,0.00,0.00,0.00,0.00,8.13,6.49,49.97,0.00,0.00,0.00,0.00,7.56,6.22,14.99,1",
						"344,41.74,0.00,0.00,0.00,0.00,21.13,23.31,49.48,0.00,0.00,0.00,0.00,6.75,5.60,21.94,1",
						"345,30.58,0.00,0.00,0.00,0.00,8.20,7.08,48.87,0.00,0.00,0.00,0.00,7.43,6.31,19.35,1",
						"346,43.39,0.00,0.00,0.00,0.00,8.71,8.96,48.11,0.00,0.00,0.00,0.00,8.94,8.70,10.46,1",
						"347,47.48,0.00,0.00,0.00,0.00,8.87,9.56,47.87,0.00,0.00,0.00,0.00,9.42,9.46,14.32,1",
						"348,31.29,0.00,0.00,0.00,0.00,8.98,9.10,31.41,0.00,0.00,0.00,0.00,9.76,9.70,15.91,0",
						"349,26.13,0.00,0.00,0.00,0.00,9.01,8.95,26.17,0.00,0.00,0.00,0.00,9.86,9.78,5.47,1",
						"350,24.59,0.00,0.00,0.00,0.00,9.02,8.90,24.60,0.00,0.00,0.00,0.00,9.89,9.80,15.74,1",
						"351,41.36,0.00,0.00,0.00,0.00,7.69,6.13,41.82,0.00,0.00,0.00,0.00,7.62,6.50,20.25,1",
						"352,46.86,0.00,0.00,0.00,0.00,7.96,6.37,47.00,0.00,0.00,0.00,0.00,7.11,5.68,60.10,1",
						"353,67.00,16.00,86.00,51.00,38.00,52.00,3.00,37.00,40.00,65.00,54.00,44.00,66.00,26.00,149.02,0",
						"354,49.00,59.00,56.00,93.00,92.00,64.00,62.00,44.00,21.00,7.00,98.00,61.00,82.00,77.00,142.26,0",
						"355,31.00,72.00,25.00,33.00,21.00,45.00,70.00,0.00,49.00,52.00,41.00,6.00,82.00,62.00,150.27,0",
						"356,2.00,97.00,86.00,37.00,93.00,13.00,51.00,19.00,80.00,5.00,65.00,96.00,93.00,54.00,153.45,0",
						"357,16.00,86.00,39.00,53.00,23.00,38.00,64.00,28.00,9.00,58.00,63.00,26.00,34.00,41.00,142.45,0",
						"358,51.00,75.00,18.00,4.00,20.00,77.00,81.00,79.00,4.00,84.00,33.00,35.00,67.00,77.00,134.86,0",
						"359,20.00,43.00,56.00,54.00,31.00,77.00,59.00,74.00,69.00,77.00,39.00,96.00,59.00,65.00,131.98,0",
						"360,17.00,69.00,84.00,20.00,15.00,8.00,20.00,5.00,76.00,23.00,10.00,99.00,69.00,24.00,133.09,0",
						"361,99.00,23.00,93.00,13.00,63.00,14.00,82.00,36.00,70.00,10.00,79.00,86.00,36.00,44.00,169.41,0",
						"362,11.00,56.00,26.00,48.00,59.00,86.00,57.00,32.00,5.00,56.00,69.00,70.00,17.00,82.00,157.83,0",
						"363,71.00,62.00,84.00,0.00,88.00,9.00,77.00,59.00,34.00,16.00,44.00,0.00,54.00,48.00,145.71,0",
						"364,75.00,26.00,48.00,15.00,83.00,30.00,34.00,49.00,11.00,28.00,4.00,38.00,83.00,60.00,131.76,0",
						"365,39.92,8.16,15.07,4.71,26.05,24.87,31.50,65.56,3.45,8.79,1.26,11.93,32.18,23.47,85.15,0",
						"366,28.92,2.56,4.73,1.48,8.18,23.26,30.72,70.76,1.08,2.76,0.39,3.74,16.23,12.01,30.61,0",
						"367,25.41,0.78,1.44,0.45,2.48,22.74,30.47,72.41,0.33,0.84,0.12,1.14,11.15,8.35,9.63,1",
						"368,24.36,0.24,0.45,0.14,0.78,22.59,30.39,72.91,0.10,0.26,0.04,0.36,9.63,7.26,2.92,1",
						"369,24.03,0.07,0.14,0.04,0.24,22.54,30.37,73.07,0.03,0.08,0.01,0.11,9.15,6.91,0.92,1",
						"370,23.93,0.02,0.04,0.01,0.07,22.52,30.36,73.11,0.01,0.03,0.00,0.03,9.00,6.81,20.61,1",
						"371,23.89,0.01,0.01,0.00,0.02,7.12,6.03,73.13,0.00,0.01,0.00,0.01,15.69,14.60,33.10,0",
						"372,46.76,0.00,0.00,0.00,0.01,7.31,5.88,30.21,0.00,0.00,0.00,0.00,7.99,5.70,23.56,1",
						"373,48.47,0.00,0.00,0.00,0.00,7.09,5.60,25.87,0.00,0.00,0.00,0.00,7.38,5.65,17.47,1",
						"374,32.10,0.00,0.00,0.00,0.00,12.12,11.70,48.28,0.00,0.00,0.00,0.00,7.36,6.07,20.72,1",
						"375,43.87,0.00,0.00,0.00,0.00,22.38,24.95,48.95,0.00,0.00,0.00,0.00,6.69,5.56,16.06,0",
						"376,47.62,0.00,0.00,0.00,0.00,25.65,29.17,49.16,0.00,0.00,0.00,0.00,6.48,5.39,5.14,1",
						"377,48.74,0.00,0.00,0.00,0.00,26.63,30.43,49.22,0.00,0.00,0.00,0.00,6.41,5.34,16.36,1",
						"378,49.10,0.00,0.00,0.00,0.00,8.93,9.78,47.71,0.00,0.00,0.00,0.00,9.61,9.76,15.57,1",
						"379,49.20,0.00,0.00,0.00,0.00,8.93,9.79,47.77,0.00,0.00,0.00,0.00,9.62,9.79,0.56,1",
						"380,49.24,0.00,0.00,0.00,0.00,8.94,9.81,47.76,0.00,0.00,0.00,0.00,9.63,9.79,12.09,1",
						"381,31.84,0.00,0.00,0.00,0.00,9.00,9.17,31.38,0.00,0.00,0.00,0.00,9.82,9.81,20.54,1",
						"382,49.25,0.00,0.00,0.00,0.00,8.34,7.52,48.79,0.00,0.00,0.00,0.00,7.74,6.72,15.62,0",
						"383,49.25,0.00,0.00,0.00,0.00,8.15,6.79,49.11,0.00,0.00,0.00,0.00,7.14,5.74,4.20,1",
						"384,49.12,0.00,0.00,0.00,0.00,8.38,6.71,49.10,0.00,0.00,0.00,0.00,7.10,5.57,79.55,1",
						"385,36.00,59.00,39.00,74.00,36.00,98.00,17.00,52.00,91.00,29.00,72.00,88.00,23.00,20.00,152.78,0",
						"386,79.00,11.00,39.00,75.00,34.00,94.00,85.00,87.00,99.00,39.00,45.00,63.00,80.00,60.00,143.11,0",
						"387,76.00,82.00,46.00,50.00,40.00,29.00,82.00,95.00,3.00,14.00,73.00,69.00,88.00,5.00,161.08,0",
						"388,17.00,20.00,41.00,69.00,64.00,91.00,7.00,38.00,45.00,4.00,24.00,98.00,41.00,9.00,140.75,0",
						"389,71.00,35.00,61.00,70.00,67.00,34.00,33.00,73.00,77.00,18.00,30.00,58.00,60.00,15.00,140.06,0",
						"390,5.00,69.00,7.00,13.00,8.00,65.00,66.00,0.00,78.00,75.00,43.00,31.00,31.00,24.00,161.16,0",
						"391,96.00,58.00,86.00,92.00,37.00,81.00,50.00,92.00,27.00,82.00,96.00,35.00,28.00,70.00,173.21,0",
						"392,43.00,5.00,31.00,57.00,11.00,17.00,41.00,73.00,92.00,65.00,18.00,82.00,79.00,8.00,157.67,0",
						"393,18.00,0.00,3.00,80.00,12.00,32.00,14.00,13.00,36.00,40.00,43.00,15.00,80.00,30.00,171.39,0",
						"394,88.00,40.00,45.00,45.00,24.00,62.00,89.00,69.00,99.00,60.00,41.00,89.00,2.00,55.00,159.74,0",
						"395,26.00,94.00,14.00,41.00,25.00,2.00,63.00,58.00,7.00,74.00,49.00,84.00,27.00,65.00,143.94,0",
						"396,23.00,53.00,51.00,3.00,0.00,31.00,95.00,91.00,70.00,20.00,36.00,70.00,19.00,55.00,150.13,0",
						"397,8.00,80.00,18.00,52.00,88.00,49.00,8.00,55.00,59.00,60.00,1.00,0.00,83.00,24.00,156.84,0",
						"398,18.90,25.11,5.65,16.32,27.62,30.83,23.34,67.44,18.52,18.83,0.31,0.00,32.18,12.17,91.27,0",
						"399,22.32,7.88,1.77,5.12,8.67,25.13,28.15,71.35,5.81,5.91,0.10,0.00,16.23,8.46,28.71,0",
						"400,23.41,2.39,0.54,1.55,2.63,23.31,29.69,72.59,1.76,1.79,0.03,0.00,11.15,7.28,8.98,1",
						"401,23.73,0.75,0.17,0.49,0.83,22.77,30.15,72.96,0.55,0.56,0.01,0.00,9.63,6.92,17.40,1",
						"402,23.84,0.23,0.05,0.15,0.25,11.70,13.09,73.08,0.17,0.17,0.00,0.00,13.91,12.34,35.89,1",
						"403,46.74,0.07,0.02,0.05,0.08,8.72,8.09,30.06,0.05,0.05,0.00,0.00,7.64,5.36,27.65,1",
						"404,48.46,0.02,0.01,0.01,0.02,7.53,6.29,25.82,0.02,0.02,0.00,0.00,7.27,5.54,3.29,1",
						"405,49.01,0.01,0.00,0.00,0.01,7.15,5.72,24.47,0.01,0.01,0.00,0.00,7.15,5.60,8.01,1",
						"406,49.18,0.00,0.00,0.00,0.00,20.82,23.07,41.47,0.00,0.00,0.00,0.00,6.63,5.41,17.15,1",
						"407,49.23,0.00,0.00,0.00,0.00,25.18,28.60,46.89,0.00,0.00,0.00,0.00,6.46,5.35,5.60,1",
						"408,49.25,0.00,0.00,0.00,0.00,26.89,30.78,49.02,0.00,0.00,0.00,0.00,6.39,5.32,1.87,1",
						"409,49.25,0.00,0.00,0.00,0.00,27.02,30.94,49.18,0.00,0.00,0.00,0.00,6.39,5.32,0.38,1",
						"410,49.25,0.00,0.00,0.00,0.00,27.06,30.99,49.23,0.00,0.00,0.00,0.00,6.38,5.32,15.51,1",
						"411,49.27,0.00,0.00,0.00,0.00,9.11,10.02,47.75,0.00,0.00,0.00,0.00,9.62,9.77,17.31,1",
						"412,49.26,0.00,0.00,0.00,0.00,8.99,9.88,47.76,0.00,0.00,0.00,0.00,9.63,9.79,3.27,1",
						"413,49.68,0.00,0.00,0.00,0.00,8.35,6.76,49.21,0.00,0.00,0.00,0.00,7.97,7.05,18.15,0",
						"414,49.38,0.00,0.00,0.00,0.00,8.37,6.72,49.24,0.00,0.00,0.00,0.00,7.31,5.91,1.74,1",
						"415,49.29,0.00,0.00,0.00,0.00,8.17,6.55,49.25,0.00,0.00,0.00,0.00,7.02,5.51,10.16,1",
						"416,49.27,0.00,0.00,0.00,0.00,22.30,26.28,32.87,0.00,0.00,0.00,0.00,8.47,7.91,84.68,1",
						"417,89.00,51.00,34.00,8.00,96.00,56.00,78.00,92.00,81.00,86.00,71.00,63.00,30.00,41.00,165.01,0",
						"418,1.00,16.00,78.00,39.00,5.00,99.00,30.00,97.00,60.00,87.00,72.00,23.00,34.00,45.00,151.39,0",
						"419,43.00,71.00,66.00,66.00,83.00,70.00,48.00,86.00,96.00,83.00,36.00,32.00,34.00,45.00,155.10,0",
						"420,69.00,60.00,10.00,16.00,41.00,69.00,52.00,51.00,27.00,17.00,70.00,81.00,20.00,36.00,132.35,0",
						"421,25.00,29.00,44.00,37.00,96.00,65.00,1.00,43.00,13.00,56.00,14.00,72.00,21.00,84.00,133.01,0",
						"422,26.00,95.00,56.00,56.00,4.00,4.00,10.00,21.00,8.00,50.00,13.00,72.00,27.00,42.00,133.65,0",
						"423,62.00,52.00,35.00,7.00,39.00,30.00,14.00,1.00,63.00,59.00,80.00,78.00,30.00,9.00,166.14,0",
						"424,26.00,32.00,89.00,90.00,82.00,6.00,74.00,54.00,26.00,15.00,97.00,20.00,60.00,89.00,184.46,0",
						"425,77.00,69.00,83.00,49.00,14.00,94.00,5.00,91.00,45.00,60.00,16.00,50.00,39.00,57.00,159.12,0",
						"426,76.00,40.00,28.00,24.00,58.00,81.00,94.00,22.00,56.00,69.00,26.00,1.00,85.00,3.00,157.83,0",
						"427,78.00,66.00,32.00,11.00,86.00,80.00,37.00,24.00,18.00,92.00,74.00,93.00,76.00,88.00,164.49,0",
						"428,54.00,19.00,76.00,71.00,36.00,5.00,87.00,19.00,80.00,55.00,42.00,86.00,2.00,79.00,148.23,0",
						"429,96.00,67.00,86.00,5.00,63.00,71.00,69.00,15.00,77.00,88.00,42.00,30.00,26.00,61.00,161.63,0",
						"430,31.00,9.00,19.00,90.00,15.00,8.00,89.00,3.00,4.00,36.00,32.00,45.00,81.00,74.00,159.70,0",
						"431,26.12,2.82,5.96,28.25,4.71,17.96,48.76,51.12,1.26,11.30,10.04,14.12,31.55,27.87,93.54,0",
						"432,24.58,0.89,1.87,8.87,1.48,21.09,36.13,66.23,0.39,3.55,3.15,4.43,16.03,13.39,36.66,0",
						"433,41.51,0.28,0.59,2.78,0.46,12.16,15.78,38.20,0.12,1.11,0.99,1.39,9.83,7.96,36.07,0",
						"434,46.82,0.09,0.18,0.87,0.15,8.56,8.68,29.40,0.04,0.35,0.31,0.44,8.27,5.99,20.96,1",
						"435,48.49,0.03,0.06,0.27,0.05,7.48,6.48,25.61,0.01,0.11,0.10,0.14,7.47,5.74,4.32,1",
						"436,49.02,0.01,0.02,0.08,0.01,7.14,5.78,24.41,0.00,0.03,0.03,0.04,7.21,5.66,1.52,1",
						"437,49.19,0.00,0.00,0.02,0.00,7.21,5.74,25.36,0.00,0.01,0.01,0.01,7.38,5.21,15.33,1",
						"438,49.23,0.00,0.00,0.01,0.00,21.54,23.78,41.76,0.00,0.00,0.00,0.00,10.43,12.95,14.37,0",
						"439,49.25,0.00,0.00,0.00,0.00,25.34,28.74,46.90,0.00,0.00,0.00,0.00,7.65,7.71,5.68,1",
						"440,49.25,0.00,0.00,0.00,0.00,26.55,30.32,48.54,0.00,0.00,0.00,0.00,6.77,6.05,1.84,0",
						"441,49.25,0.00,0.00,0.00,0.00,26.91,30.79,49.03,0.00,0.00,0.00,0.00,6.50,5.55,3.26,1",
						"442,50.70,0.00,0.00,0.00,0.00,29.09,34.75,48.50,0.00,0.00,0.00,0.00,8.74,6.66,7.40,0",
						"443,66.10,0.00,0.00,0.00,0.00,33.58,37.38,49.23,0.00,0.00,0.00,0.00,12.00,12.41,29.82,1",
						"444,49.72,0.00,0.00,0.00,0.00,7.50,6.26,49.25,0.00,0.00,0.00,0.00,12.70,15.91,36.47,1",
						"445,66.81,0.00,0.00,0.00,0.00,29.10,36.62,49.25,0.00,0.00,0.00,0.00,13.60,12.30,34.99,1",
						"446,49.30,0.00,0.00,0.00,0.00,7.96,6.37,49.25,0.00,0.00,0.00,0.00,8.82,9.28,29.78,1",
						"447,49.27,0.00,0.00,0.00,0.00,22.24,26.23,32.87,0.00,0.00,0.00,0.00,9.03,9.09,31.88,1",
						"448,49.26,0.00,0.00,0.00,0.00,26.79,32.55,27.65,0.00,0.00,0.00,0.00,9.10,9.03,62.14,1",
						"449,79.00,69.00,13.00,41.00,54.00,2.00,82.00,8.00,56.00,57.00,91.00,28.00,11.00,22.00,153.46,0",
						"450,25.00,86.00,69.00,40.00,89.00,47.00,81.00,8.00,33.00,52.00,72.00,49.00,61.00,32.00,149.87,0",
						"451,28.00,44.00,6.00,12.00,6.00,65.00,50.00,46.00,6.00,16.00,18.00,79.00,68.00,11.00,152.38,0",
						"452,62.00,24.00,54.00,22.00,57.00,88.00,28.00,37.00,46.00,85.00,34.00,35.00,58.00,64.00,119.01,0",
						"453,44.00,62.00,49.00,23.00,20.00,99.00,33.00,6.00,22.00,19.00,44.00,93.00,48.00,77.00,115.44,0",
						"454,86.00,66.00,58.00,36.00,42.00,74.00,8.00,33.00,52.00,43.00,23.00,59.00,33.00,18.00,121.74,0",
						"455,90.00,13.00,95.00,86.00,93.00,24.00,75.00,57.00,21.00,59.00,40.00,22.00,8.00,37.00,157.29,0",
						"456,86.00,13.00,24.00,55.00,40.00,44.00,99.00,41.00,61.00,66.00,5.00,51.00,9.00,58.00,147.48,0",
						"457,29.00,85.00,84.00,50.00,47.00,79.00,59.00,93.00,15.00,13.00,42.00,56.00,27.00,91.00,147.88,0",
						"458,95.00,9.00,87.00,49.00,6.00,82.00,78.00,86.00,92.00,30.00,82.00,59.00,93.00,45.00,161.13,0",
						"459,65.00,18.00,48.00,6.00,87.00,8.00,29.00,77.00,99.00,33.00,14.00,7.00,45.00,76.00,178.85,0",
						"460,65.00,83.00,27.00,27.00,43.00,87.00,40.00,21.00,86.00,80.00,42.00,90.00,36.00,27.00,163.09,0",
						"461,56.00,52.00,19.00,9.00,52.00,36.00,85.00,70.00,0.00,33.00,41.00,11.00,20.00,57.00,140.92,0",
						"462,81.00,29.00,88.00,12.00,47.00,22.00,7.00,28.00,31.00,7.00,46.00,7.00,63.00,36.00,142.07,0",
						"463,37.00,64.00,54.00,4.00,52.00,65.00,26.00,76.00,99.00,17.00,21.00,44.00,96.00,34.00,139.04,0",
						"464,28.00,20.09,16.95,1.26,16.32,35.85,28.99,74.03,31.07,5.34,6.59,13.81,36.26,15.31,99.67,0",
						"465,25.17,6.30,5.32,0.39,5.12,26.70,29.93,73.42,9.75,1.67,2.07,4.33,17.51,9.45,78.55,0",
						"466,41.70,1.98,1.67,0.12,1.61,13.92,13.83,40.45,3.06,0.53,0.65,1.36,10.30,6.72,36.69,0",
						"467,46.88,0.62,0.52,0.04,0.50,9.11,8.07,30.11,0.96,0.16,0.20,0.43,8.42,5.61,12.22,0",
						"468,48.51,0.19,0.16,0.01,0.16,7.65,6.28,25.83,0.30,0.05,0.06,0.13,7.52,5.62,17.90,1",
						"469,49.02,0.06,0.05,0.00,0.05,21.68,23.95,41.90,0.09,0.02,0.02,0.04,10.47,13.08,19.77,1",
						"470,49.18,0.02,0.02,0.00,0.02,26.15,29.58,47.02,0.03,0.00,0.01,0.01,11.42,15.45,7.64,1",
						"471,50.26,0.01,0.00,0.00,0.00,28.64,33.75,48.55,0.01,0.00,0.00,0.00,9.61,9.44,6.72,1",
						"472,49.57,0.00,0.00,0.00,0.00,27.57,31.87,49.03,0.00,0.00,0.00,0.00,7.40,6.61,4.05,1",
						"473,50.73,0.00,0.00,0.00,0.00,29.75,35.61,49.25,0.00,0.00,0.00,0.00,8.82,6.78,3.02,1",
						"474,50.74,0.00,0.00,0.00,0.00,29.77,35.64,49.25,0.00,0.00,0.00,0.00,8.80,6.72,0.44,0",
						"475,50.74,0.00,0.00,0.00,0.00,29.77,35.65,49.25,0.00,0.00,0.00,0.00,8.79,6.70,14.80,1",
						"476,67.13,0.00,0.00,0.00,0.00,36.12,46.44,48.83,0.00,0.00,0.00,0.00,11.88,9.05,21.71,0",
						"477,72.35,0.00,0.00,0.00,0.00,38.11,49.27,49.13,0.00,0.00,0.00,0.00,13.36,10.16,13.73,1",
						"478,56.50,0.00,0.00,0.00,0.00,31.70,39.69,32.83,0.00,0.00,0.00,0.00,10.46,9.37,28.83,1",
						"479,67.91,0.00,0.00,0.00,0.00,41.91,50.01,26.69,0.00,0.00,0.00,0.00,7.98,6.68,21.47,1",
						"480,50.74,0.00,0.00,0.00,0.00,24.72,30.06,25.35,0.00,0.00,0.00,0.00,7.46,6.24,83.20,1",
						"481,37.00,21.00,82.00,76.00,51.00,95.00,94.00,97.00,59.00,58.00,4.00,28.00,62.00,43.00,172.85,0",
						"482,69.00,37.00,69.00,11.00,42.00,65.00,31.00,85.00,76.00,29.00,55.00,72.00,2.00,90.00,155.41,0",
						"483,7.00,5.00,16.00,86.00,17.00,57.00,2.00,42.00,3.00,85.00,55.00,47.00,26.00,42.00,145.09,0",
						"484,68.00,78.00,19.00,53.00,57.00,48.00,41.00,77.00,66.00,99.00,48.00,40.00,32.00,57.00,127.20,0",
						"485,3.00,27.00,50.00,55.00,18.00,74.00,59.00,5.00,6.00,85.00,58.00,53.00,21.00,29.00,135.89,0",
						"486,42.00,33.00,24.00,54.00,29.00,75.00,52.00,1.00,31.00,52.00,49.00,91.00,8.00,76.00,120.26,0",
						"487,21.00,94.00,2.00,42.00,36.00,49.00,18.00,48.00,73.00,35.00,70.00,34.00,22.00,99.00,165.78,0",
						"488,96.00,9.00,86.00,51.00,26.00,70.00,24.00,62.00,1.00,81.00,35.00,52.00,48.00,16.00,152.65,0",
						"489,89.00,2.00,25.00,8.00,62.00,68.00,48.00,52.00,37.00,80.00,78.00,93.00,38.00,88.00,154.34,0",
						"490,10.00,19.00,62.00,88.00,54.00,58.00,40.00,93.00,95.00,91.00,39.00,62.00,30.00,14.00,164.24,0",
						"491,58.00,58.00,19.00,77.00,40.00,70.00,74.00,4.00,23.00,21.00,46.00,93.00,78.00,94.00,169.85,0",
						"492,77.00,18.00,56.00,34.00,61.00,14.00,77.00,28.00,9.00,12.00,41.00,6.00,41.00,16.00,150.06,0",
						"493,48.00,30.00,56.00,76.00,60.00,53.00,33.00,51.00,54.00,19.00,41.00,50.00,12.00,98.00,130.96,0",
						"494,78.00,43.00,64.00,25.00,52.00,91.00,34.00,61.00,73.00,47.00,9.00,83.00,89.00,64.00,127.89,0",
						"495,99.00,27.00,9.00,56.00,20.00,86.00,65.00,33.00,52.00,15.00,52.00,53.00,84.00,65.00,128.81,0",
						"496,78.00,96.00,5.00,41.00,6.00,83.00,91.00,18.00,3.00,53.00,14.00,84.00,54.00,95.00,157.51,0",
						"497,98.00,28.00,45.00,29.00,48.00,90.00,94.00,56.00,66.00,29.00,99.00,44.00,44.00,20.00,149.86,0",
						"498,64.55,8.79,14.12,9.10,15.07,47.53,51.48,51.37,20.71,9.10,31.07,13.81,21.93,17.59,101.09,0",
						"499,54.06,2.76,4.43,2.86,4.73,20.46,20.59,33.53,6.50,2.86,9.75,4.33,11.68,9.28,40.58,0",
						"500,50.76,0.87,1.39,0.90,1.48,25.70,28.44,44.32,2.04,0.90,3.06,1.36,11.78,14.23,19.78,1",
						"501,49.71,0.26,0.42,0.27,0.45,27.37,30.94,47.76,0.62,0.27,0.93,0.41,11.81,15.80,6.28,1",
						"502,49.40,0.08,0.13,0.09,0.14,28.16,32.11,48.62,0.19,0.09,0.29,0.13,11.84,16.28,1.98,1",
						"503,49.30,0.03,0.04,0.03,0.04,28.12,32.05,49.06,0.06,0.03,0.09,0.04,11.83,16.43,4.07,1",
						"504,50.29,0.01,0.01,0.01,0.01,29.25,34.52,49.19,0.02,0.01,0.03,0.01,9.74,9.75,6.43,0",
						"505,50.61,0.00,0.00,0.00,0.00,29.61,35.31,49.24,0.01,0.00,0.01,0.00,9.08,7.62,1.85,1",
						"506,50.70,0.00,0.00,0.00,0.00,29.72,35.55,49.25,0.00,0.00,0.00,0.00,8.88,6.98,11.43,1",
						"507,67.13,0.00,0.00,0.00,0.00,36.11,46.48,48.80,0.00,0.00,0.00,0.00,11.85,9.05,14.28,1",
						"508,72.35,0.00,0.00,0.00,0.00,38.11,49.28,49.12,0.00,0.00,0.00,0.00,13.35,10.16,5.44,1",
						"509,73.12,0.00,0.00,0.00,0.00,42.55,47.72,49.25,0.00,0.00,0.00,0.00,12.15,13.77,12.85,1",
						"510,73.13,0.00,0.00,0.00,0.00,45.32,52.53,31.84,0.00,0.00,0.00,0.00,8.51,8.06,24.29,0",
						"511,73.13,0.00,0.00,0.00,0.00,46.20,54.06,26.30,0.00,0.00,0.00,0.00,7.35,6.24,6.13,1",
						"512,73.13,0.00,0.00,0.00,0.00,46.47,54.52,24.64,0.00,0.00,0.00,0.00,7.00,5.70,54.60,1",
						"513,26.00,6.00,27.00,18.00,9.00,67.00,88.00,35.00,18.00,4.00,42.00,43.00,43.00,75.00,146.38,0",
						"514,87.00,52.00,28.00,84.00,4.00,50.00,98.00,19.00,35.00,35.00,51.00,60.00,4.00,83.00,135.64,0",
						"515,77.00,17.00,2.00,73.00,16.00,71.00,82.00,68.00,62.00,77.00,72.00,72.00,32.00,55.00,119.53,0",
						"516,7.00,99.00,43.00,67.00,20.00,8.00,50.00,54.00,7.00,80.00,8.00,81.00,52.00,70.00,141.49,0",
						"517,22.00,47.00,21.00,18.00,66.00,63.00,41.00,97.00,95.00,19.00,46.00,87.00,81.00,97.00,164.73,0",
						"518,64.00,61.00,69.00,82.00,53.00,93.00,14.00,93.00,70.00,9.00,99.00,77.00,44.00,62.00,152.82,0",
						"519,85.00,91.00,93.00,38.00,54.00,67.00,17.00,5.00,64.00,26.00,28.00,15.00,80.00,46.00,144.15,0",
						"520,98.00,63.00,10.00,38.00,70.00,93.00,9.00,72.00,74.00,34.00,32.00,34.00,63.00,59.00,129.77,0",
						"521,52.00,69.00,92.00,26.00,39.00,97.00,1.00,48.00,91.00,89.00,6.00,60.00,19.00,58.00,163.60,0",
						"522,27.00,25.00,30.00,52.00,91.00,32.00,76.00,65.00,37.00,9.00,95.00,23.00,20.00,5.00,157.67,0",
						"523,81.00,17.00,70.00,17.00,29.00,42.00,52.00,89.00,16.00,9.00,68.00,92.00,24.00,89.00,153.32,0",
						"524,34.00,15.00,87.00,29.00,11.00,9.00,34.00,17.00,65.00,63.00,77.00,57.00,57.00,45.00,141.68,0",
						"525,12.00,61.00,3.00,34.00,29.00,70.00,79.00,80.00,97.00,67.00,9.00,80.00,45.00,81.00,154.14,0",
						"526,78.00,57.00,89.00,75.00,71.00,83.00,68.00,81.00,39.00,40.00,59.00,48.00,4.00,23.00,156.93,0",
						"527,32.00,78.00,79.00,25.00,91.00,92.00,73.00,29.00,80.00,58.00,23.00,63.00,96.00,70.00,152.12,0",
						"528,18.00,86.00,55.00,57.00,52.00,80.00,15.00,99.00,11.00,75.00,30.00,98.00,63.00,53.00,143.07,0",
						"529,98.00,43.00,4.00,32.00,89.00,49.00,58.00,16.00,17.00,62.00,56.00,46.00,38.00,4.00,145.85,0",
						"530,25.00,60.00,59.00,1.00,17.00,95.00,80.00,44.00,93.00,36.00,82.00,45.00,34.00,67.00,141.17,0",
						"531,41.64,18.83,18.52,0.31,5.34,49.10,47.09,47.60,29.19,11.30,25.74,14.12,18.79,32.34,96.43,0",
						"532,46.94,5.72,5.62,0.10,1.62,34.47,36.60,48.75,8.86,3.43,7.81,4.29,13.94,21.30,30.23,0",
						"533,48.53,1.79,1.76,0.03,0.51,30.10,33.46,49.10,2.78,1.08,2.45,1.35,12.49,18.00,21.60,0",
						"534,49.03,0.54,0.54,0.01,0.15,28.71,32.47,49.21,0.84,0.33,0.74,0.41,12.03,16.95,6.72,1",
						"535,49.18,0.17,0.17,0.00,0.05,28.29,32.17,49.24,0.26,0.10,0.23,0.13,11.89,16.63,9.33,1",
						"536,50.58,0.05,0.05,0.00,0.01,36.06,41.66,49.25,0.08,0.03,0.07,0.04,7.40,6.52,8.94,0",
						"537,50.70,0.02,0.02,0.00,0.00,31.75,37.54,49.25,0.03,0.01,0.02,0.01,8.35,6.64,9.68,1",
						"538,65.64,0.01,0.01,0.00,0.00,41.45,48.18,49.25,0.01,0.00,0.01,0.00,11.44,12.66,17.33,0",
						"539,70.86,0.00,0.00,0.00,0.00,42.22,47.86,49.25,0.00,0.00,0.00,0.00,11.93,13.43,7.93,1",
						"540,73.44,0.00,0.00,0.00,0.00,39.99,49.67,49.25,0.00,0.00,0.00,0.00,13.36,11.52,10.22,1",
						"541,73.23,0.00,0.00,0.00,0.00,44.52,53.14,31.84,0.00,0.00,0.00,0.00,8.89,7.36,33.66,1",
						"542,91.60,0.00,0.00,0.00,0.00,69.44,85.29,43.79,0.00,0.00,0.00,0.00,7.40,5.94,39.39,1",
						"543,74.53,0.00,0.00,0.00,0.00,42.86,52.26,25.29,0.00,0.00,0.00,0.00,7.12,5.46,40.73,1",
						"544,73.56,0.00,0.00,0.00,0.00,45.46,53.98,24.31,0.00,0.00,0.00,0.00,6.93,5.45,90.64,1",
						"545,92.00,97.00,90.00,94.00,81.00,75.00,98.00,33.00,65.00,64.00,82.00,84.00,98.00,83.00,210.24,0",
						"546,37.00,43.00,56.00,27.00,55.00,42.00,68.00,80.00,68.00,86.00,7.00,82.00,86.00,2.00,152.11,0",
						"547,68.00,65.00,47.00,60.00,39.00,67.00,80.00,56.00,95.00,69.00,63.00,57.00,43.00,69.00,120.40,0",
						"548,19.00,58.00,57.00,84.00,29.00,49.00,7.00,97.00,9.00,72.00,10.00,22.00,36.00,44.00,134.53,0",
						"549,65.00,47.00,88.00,39.00,8.00,61.00,90.00,85.00,44.00,48.00,15.00,20.00,42.00,9.00,152.30,0",
						"550,26.00,17.00,7.00,11.00,59.00,3.00,50.00,76.00,88.00,59.00,46.00,9.00,17.00,61.00,146.89,0",
						"551,12.00,96.00,58.00,47.00,85.00,70.00,82.00,89.00,88.00,5.00,53.00,53.00,70.00,79.00,151.30,0",
						"552,34.00,92.00,39.00,78.00,33.00,49.00,2.00,88.00,52.00,66.00,43.00,51.00,37.00,26.00,133.83,0",
						"553,88.00,13.00,25.00,94.00,46.00,21.00,48.00,32.00,41.00,91.00,36.00,34.00,6.00,74.00,156.77,0",
						"554,12.00,52.00,38.00,54.00,86.00,90.00,91.00,0.00,90.00,32.00,68.00,54.00,63.00,7.00,139.00,0",
						"555,14.00,91.00,35.00,89.00,82.00,91.00,83.00,18.00,15.00,61.00,41.00,87.00,17.00,86.00,158.31,0",
						"556,45.00,80.00,48.00,64.00,4.00,25.00,39.00,83.00,67.00,16.00,32.00,67.00,61.00,63.00,141.72,0",
						"557,4.00,63.00,91.00,22.00,77.00,70.00,97.00,57.00,88.00,17.00,95.00,65.00,65.00,81.00,162.53,0",
						"558,14.00,12.00,26.00,15.00,46.00,25.00,44.00,54.00,11.00,9.00,17.00,35.00,41.00,96.00,153.29,0",
						"559,72.00,16.00,40.00,82.00,87.00,0.00,34.00,15.00,22.00,80.00,12.00,22.00,41.00,80.00,153.32,0",
						"560,39.00,34.00,83.00,36.00,61.00,74.00,11.00,61.00,59.00,99.00,60.00,56.00,52.00,55.00,116.16,0",
						"561,58.00,78.00,15.00,89.00,61.00,59.00,17.00,49.00,52.00,61.00,42.00,75.00,7.00,52.00,117.68,0",
						"562,42.00,72.00,37.00,4.00,85.00,72.00,21.00,63.00,44.00,13.00,89.00,46.00,56.00,73.00,134.48,0",
						"563,58.00,22.00,96.00,9.00,35.00,88.00,98.00,12.00,29.00,63.00,35.00,87.00,44.00,70.00,143.13,0",
						"564,52.00,6.90,30.13,2.82,10.99,46.90,52.74,37.56,9.10,19.77,10.99,27.31,21.93,33.28,84.83,0",
						"565,79.06,11.61,16.95,3.14,28.25,37.36,60.68,34.11,23.23,15.07,2.20,1.57,33.13,19.18,87.14,0",
						"566,58.61,3.64,5.32,0.99,8.87,31.01,41.02,44.50,7.29,4.73,0.69,0.49,18.51,17.33,36.79,0",
						"567,53.44,1.11,1.61,0.30,2.69,36.88,44.35,47.81,2.21,1.44,0.21,0.15,9.41,6.73,15.82,1",
						"568,51.59,0.35,0.51,0.09,0.84,36.85,43.17,48.80,0.69,0.45,0.07,0.05,7.70,5.83,3.59,1",
						"569,51.00,0.11,0.15,0.03,0.26,36.84,42.79,49.12,0.21,0.14,0.02,0.01,7.15,5.55,2.81,0",
						"570,50.83,0.03,0.05,0.01,0.08,36.84,42.68,49.21,0.07,0.04,0.01,0.00,6.99,5.46,16.11,0",
						"571,66.73,0.01,0.02,0.00,0.03,43.17,57.57,49.24,0.02,0.01,0.00,0.00,7.65,6.66,15.63,1",
						"572,72.23,0.00,0.00,0.00,0.01,44.46,60.28,49.25,0.01,0.00,0.00,0.00,7.02,5.73,25.81,1",
						"573,91.28,0.00,0.00,0.00,0.00,69.42,87.53,49.25,0.00,0.00,0.00,0.00,6.82,5.43,29.31,0",
						"574,97.35,0.00,0.00,0.00,0.00,77.37,96.22,49.25,0.00,0.00,0.00,0.00,6.75,5.33,21.50,0",
						"575,99.17,0.00,0.00,0.00,0.00,79.75,98.81,49.25,0.00,0.00,0.00,0.00,6.73,5.30,29.55,1",
						"576,73.16,0.00,0.00,0.00,0.00,46.41,54.69,24.64,0.00,0.00,0.00,0.00,6.99,5.56,90.00,0",
						"577,94.00,30.00,6.00,9.00,84.00,59.00,19.00,87.00,88.00,77.00,82.00,8.00,24.00,95.00,184.06,0",
						"578,54.00,44.00,80.00,90.00,16.00,0.00,88.00,97.00,73.00,94.00,46.00,42.00,58.00,68.00,160.78,0",
						"579,14.00,76.00,55.00,36.00,31.00,40.00,47.00,44.00,50.00,53.00,10.00,11.00,5.00,98.00,143.51,0",
						"580,9.00,44.00,93.00,74.00,82.00,94.00,76.00,14.00,0.00,74.00,34.00,47.00,86.00,71.00,167.06,0",
						"581,97.00,14.00,37.00,79.00,4.00,78.00,10.00,42.00,85.00,26.00,56.00,87.00,54.00,8.00,175.60,0",
						"582,42.00,18.00,5.00,10.00,81.00,11.00,57.00,15.00,61.00,94.00,37.00,2.00,64.00,60.00,160.30,0",
						"583,20.00,96.00,67.00,37.00,11.00,8.00,12.00,59.00,23.00,48.00,37.00,51.00,72.00,38.00,158.24,0",
						"584,87.00,84.00,59.00,17.00,40.00,57.00,44.00,46.00,67.00,8.00,63.00,75.00,1.00,10.00,140.68,0",
						"585,28.00,3.00,98.00,33.00,23.00,41.00,51.00,45.00,71.00,95.00,98.00,22.00,35.00,67.00,150.20,0",
						"586,12.00,31.00,1.00,73.00,62.00,30.00,75.00,2.00,67.00,72.00,69.00,54.00,11.00,0.00,144.14,0",
						"587,69.00,26.00,44.00,46.00,64.00,5.00,39.00,13.00,81.00,49.00,50.00,71.00,27.00,93.00,138.26,0",
						"588,25.00,74.00,64.00,10.00,55.00,66.00,96.00,83.00,66.00,64.00,85.00,66.00,39.00,58.00,140.63,0",
						"589,68.00,26.00,33.00,53.00,26.00,90.00,13.00,60.00,23.00,84.00,11.00,72.00,35.00,60.00,156.95,0",
						"590,84.00,75.00,47.00,56.00,71.00,46.00,34.00,37.00,59.00,11.00,76.00,36.00,90.00,69.00,147.83,0",
						"591,9.00,62.00,13.00,60.00,35.00,90.00,8.00,96.00,70.00,86.00,5.00,30.00,37.00,60.00,152.83,0",
						"592,41.00,10.00,50.00,47.00,70.00,80.00,36.00,25.00,85.00,74.00,41.00,5.00,79.00,71.00,129.87,0",
						"593,98.00,64.00,16.00,86.00,55.00,93.00,39.00,46.00,35.00,33.00,81.00,46.00,53.00,63.00,135.06,0",
						"594,55.00,88.00,59.00,53.00,6.00,7.00,16.00,93.00,19.00,3.00,93.00,88.00,42.00,59.00,143.81,0",
						"595,17.00,46.00,40.00,25.00,17.00,47.00,94.00,56.00,55.00,92.00,96.00,51.00,67.00,85.00,156.00,0",
						"596,28.00,26.00,63.00,27.00,75.00,83.00,44.00,43.00,10.00,0.00,27.00,7.00,39.00,76.00,143.64,0",
						"597,35.00,29.00,80.00,91.00,62.00,26.00,16.00,82.00,50.00,88.00,21.00,64.00,5.00,85.00,159.16,0",
						"598,62.19,9.10,25.11,28.56,19.46,31.19,31.28,76.94,15.69,27.62,6.59,20.09,10.97,34.16,111.31,0",
						"599,54.34,2.86,7.88,8.96,6.11,35.06,39.07,57.94,4.93,8.67,2.07,6.30,8.18,14.44,37.31,0",
						"600,51.84,0.87,2.39,2.72,1.85,36.30,41.55,51.89,1.49,2.63,0.63,1.91,7.30,8.16,11.69,1",
						"601,51.09,0.27,0.75,0.85,0.58,36.67,42.29,50.08,0.47,0.83,0.20,0.60,7.03,6.28,17.34,1",
						"602,66.78,0.09,0.24,0.27,0.18,43.17,57.59,49.51,0.15,0.26,0.06,0.19,7.72,7.02,23.58,0",
						"603,72.17,0.03,0.07,0.08,0.06,39.67,59.08,66.74,0.05,0.08,0.02,0.06,12.86,11.99,23.79,0",
						"604,91.26,0.01,0.02,0.03,0.02,67.92,87.16,54.74,0.01,0.03,0.01,0.02,8.65,7.39,37.70,1",
						"605,97.35,0.00,0.01,0.01,0.01,76.91,96.10,50.92,0.00,0.01,0.00,0.01,7.31,5.93,24.03,1",
						"606,74.53,0.00,0.00,0.00,0.00,44.91,60.97,48.35,0.00,0.00,0.00,0.00,7.01,5.60,49.94,1",
						"607,92.27,0.00,0.00,0.00,0.00,69.93,88.15,48.98,0.00,0.00,0.00,0.00,6.81,5.38,24.34,1",
						"608,97.57,0.00,0.00,0.00,0.00,77.41,96.28,49.17,0.00,0.00,0.00,0.00,6.75,5.32,113.85,1",
						"609,72.00,4.00,95.00,3.00,21.00,23.00,39.00,67.00,75.00,97.00,60.00,42.00,51.00,26.00,159.90,0",
						"610,79.00,73.00,27.00,32.00,81.00,97.00,22.00,37.00,37.00,30.00,58.00,68.00,47.00,41.00,157.18,0",
						"611,30.00,71.00,70.00,84.00,14.00,3.00,19.00,37.00,63.00,80.00,88.00,38.00,40.00,0.00,143.92,0",
						"612,47.00,57.00,27.00,51.00,14.00,41.00,50.00,64.00,1.00,23.00,1.00,63.00,24.00,22.00,152.06,0",
						"613,52.00,54.00,99.00,94.00,14.00,51.00,93.00,68.00,50.00,81.00,43.00,93.00,79.00,63.00,150.92,0",
						"614,38.00,96.00,47.00,94.00,88.00,22.00,45.00,94.00,93.00,65.00,7.00,97.00,19.00,33.00,181.31,0",
						"615,71.00,8.00,39.00,24.00,82.00,55.00,71.00,84.00,24.00,55.00,83.00,18.00,7.00,62.00,166.87,0",
						"616,89.00,70.00,37.00,55.00,34.00,14.00,73.00,1.00,23.00,9.00,18.00,83.00,9.00,74.00,148.67,0",
						"617,29.00,63.00,84.00,50.00,74.00,48.00,60.00,75.00,97.00,69.00,62.00,82.00,2.00,3.00,156.37,0",
						"618,95.00,23.00,13.00,86.00,7.00,60.00,38.00,33.00,15.00,16.00,26.00,32.00,56.00,95.00,174.15,0",
						"619,75.00,68.00,36.00,80.00,81.00,38.00,52.00,22.00,93.00,68.00,61.00,24.00,44.00,13.00,141.09,0",
						"620,54.00,36.00,17.00,16.00,74.00,11.00,93.00,73.00,89.00,11.00,16.00,96.00,45.00,25.00,159.00,0",
						"621,1.00,42.00,11.00,78.00,22.00,90.00,13.00,51.00,86.00,53.00,59.00,21.00,64.00,43.00,131.97,0",
						"622,34.00,47.00,80.00,75.00,29.00,90.00,38.00,25.00,58.00,65.00,35.00,22.00,41.00,75.00,123.53,0",
						"623,28.00,28.00,0.00,35.00,27.00,13.00,59.00,60.00,33.00,79.00,89.00,14.00,18.00,78.00,143.72,0",
						"624,28.00,96.00,26.00,30.00,93.00,63.00,57.00,47.00,11.00,68.00,43.00,98.00,38.00,82.00,162.84,0",
						"625,6.00,91.00,13.00,97.00,19.00,22.00,41.00,7.00,87.00,83.00,85.00,4.00,2.00,38.00,177.08,0",
						"626,82.00,37.00,21.00,75.00,13.00,9.00,45.00,88.00,84.00,45.00,49.00,41.00,10.00,18.00,142.86,0",
						"627,70.00,52.00,82.00,90.00,7.00,26.00,58.00,99.00,3.00,45.00,3.00,60.00,9.00,78.00,159.32,0",
						"628,61.00,2.00,71.00,0.00,14.00,18.00,68.00,38.00,60.00,66.00,64.00,5.00,98.00,77.00,151.82,0",
						"629,7.00,0.00,80.00,21.00,93.00,19.00,91.00,52.00,93.00,25.00,20.00,99.00,57.00,82.00,155.32,0",
						"630,50.00,84.00,82.00,20.00,51.00,86.00,78.00,44.00,88.00,87.00,10.00,93.00,69.00,94.00,148.68,0",
						"631,66.90,26.36,25.74,6.28,16.01,50.02,50.74,65.01,27.62,27.31,3.14,29.19,31.05,36.98,112.31,0",
						"632,55.82,8.27,8.08,1.97,5.02,40.97,45.18,54.20,8.67,8.57,0.99,9.16,14.49,15.33,42.45,0",
						"633,73.89,2.51,2.45,0.60,1.52,39.21,58.91,73.71,2.63,2.60,0.30,2.78,16.72,16.42,23.52,0",
						"634,74.40,0.79,0.77,0.19,0.48,38.43,59.50,74.34,0.83,0.82,0.09,0.87,15.69,14.94,9.99,1",
						"635,74.56,0.24,0.23,0.06,0.15,38.18,59.69,74.54,0.25,0.25,0.03,0.26,15.36,14.47,3.14,0",
						"636,74.60,0.08,0.07,0.02,0.05,38.11,59.74,74.60,0.08,0.08,0.01,0.08,15.26,14.32,24.48,0",
						"637,92.03,0.02,0.02,0.01,0.01,67.42,87.36,57.21,0.02,0.02,0.00,0.03,9.40,8.12,34.50,1",
						"638,97.58,0.01,0.01,0.00,0.00,76.77,96.17,51.67,0.01,0.01,0.00,0.01,7.54,6.15,22.86,0",
						"639,99.24,0.00,0.00,0.00,0.00,79.56,98.80,50.01,0.00,0.00,0.00,0.00,6.98,5.56,35.07,0",
						"640,74.63,0.00,0.00,0.00,0.00,38.88,49.70,1.49,0.00,0.00,0.00,0.00,5.73,9.95,92.95,0",
						"641,55.00,60.00,86.00,71.00,4.00,10.00,22.00,91.00,2.00,77.00,50.00,35.00,57.00,32.00,151.77,0",
						"642,58.00,74.00,71.00,83.00,40.00,76.00,30.00,5.00,36.00,42.00,30.00,63.00,98.00,44.00,133.82,0",
						"643,16.00,98.00,80.00,49.00,34.00,12.00,36.00,74.00,26.00,23.00,97.00,37.00,19.00,43.00,156.37,0",
						"644,91.00,28.00,19.00,35.00,50.00,67.00,83.00,52.00,62.00,7.00,33.00,66.00,93.00,90.00,139.95,0",
						"645,76.00,72.00,26.00,36.00,35.00,55.00,91.00,26.00,11.00,26.00,20.00,18.00,71.00,45.00,120.79,0",
						"646,69.00,71.00,74.00,69.00,1.00,68.00,80.00,36.00,0.00,1.00,62.00,22.00,48.00,81.00,156.55,0",
						"647,64.00,51.00,53.00,23.00,85.00,63.00,63.00,95.00,78.00,45.00,2.00,74.00,73.00,20.00,146.06,0",
						"648,44.00,99.00,26.00,5.00,51.00,32.00,3.00,34.00,33.00,45.00,79.00,99.00,8.00,51.00,148.97,0",
						"649,49.00,64.00,56.00,42.00,15.00,23.00,69.00,33.00,91.00,96.00,55.00,47.00,39.00,11.00,128.76,0",
						"650,45.00,20.00,61.00,53.00,33.00,45.00,66.00,23.00,37.00,89.00,91.00,63.00,75.00,53.00,130.36,0",
						"651,78.00,37.00,35.00,70.00,55.00,48.00,67.00,42.00,43.00,2.00,28.00,73.00,62.00,87.00,141.06,0",
						"652,43.00,92.00,25.00,41.00,48.00,53.00,55.00,24.00,50.00,96.00,81.00,13.00,37.00,13.00,147.12,0",
						"653,54.00,97.00,66.00,74.00,40.00,85.00,0.00,2.00,53.00,60.00,56.00,26.00,50.00,61.00,129.61,0",
						"654,14.00,15.00,17.00,55.00,59.00,72.00,56.00,32.00,88.00,24.00,66.00,18.00,29.00,9.00,134.54,0",
						"655,26.00,33.00,31.00,22.00,71.00,42.00,28.00,86.00,77.00,32.00,67.00,18.00,70.00,5.00,134.19,0",
						"656,85.00,4.00,69.00,68.00,60.00,83.00,97.00,74.00,39.00,60.00,36.00,95.00,96.00,51.00,157.54,0",
						"657,50.00,19.00,24.00,6.00,89.00,87.00,94.00,70.00,26.00,95.00,79.00,80.00,65.00,5.00,168.30,0",
						"658,53.00,59.00,27.00,67.00,84.00,2.00,4.00,77.00,13.00,8.00,2.00,79.00,47.00,89.00,178.85,0",
						"659,57.00,31.00,32.00,75.00,12.00,24.00,92.00,77.00,65.00,30.00,93.00,5.00,16.00,28.00,151.73,0",
						"660,55.00,29.00,88.00,28.00,5.00,41.00,23.00,71.00,10.00,43.00,60.00,42.00,57.00,39.00,132.66,0",
						"661,6.00,25.00,10.00,74.00,39.00,71.00,25.00,59.00,44.00,51.00,73.00,97.00,96.00,38.00,142.39,0",
						"662,15.00,65.00,17.00,45.00,38.00,87.00,42.00,22.00,75.00,71.00,27.00,90.00,90.00,95.00,138.48,0",
						"663,87.00,95.00,52.00,96.00,64.00,69.00,73.00,91.00,2.00,51.00,89.00,45.00,9.00,73.00,160.27,0",
						"664,78.51,29.82,16.32,30.13,20.09,44.68,49.17,79.77,0.63,16.01,27.93,14.12,12.22,30.39,108.86,0",
						"665,75.85,9.36,5.12,9.46,6.30,40.15,56.44,76.24,0.20,5.02,8.77,4.43,14.28,19.32,66.68,0",
						"666,75.00,2.84,1.55,2.87,1.91,38.70,58.76,75.12,0.06,1.52,2.66,1.35,14.93,15.80,20.92,0",
						"667,74.74,0.89,0.49,0.90,0.60,38.27,59.45,74.78,0.02,0.48,0.84,0.42,15.13,14.74,6.35,1",
						"668,74.66,0.27,0.15,0.27,0.18,38.13,59.67,74.67,0.01,0.15,0.25,0.13,15.19,14.41,14.95,0",
						"669,74.64,0.08,0.05,0.09,0.06,38.52,52.59,23.44,0.00,0.05,0.08,0.04,8.68,11.44,40.89,0",
						"670,92.04,0.03,0.01,0.03,0.02,67.55,85.12,41.15,0.00,0.01,0.02,0.01,7.34,7.22,47.99,1",
						"671,74.63,0.01,0.00,0.01,0.01,38.69,49.44,0.68,0.00,0.00,0.01,0.00,5.78,10.13,49.97,1",
						"672,74.63,0.00,0.00,0.00,0.00,38.70,49.38,0.21,0.00,0.00,0.00,0.00,5.72,10.10,85.59,0",
						"673,61.00,89.00,73.00,98.00,97.00,69.00,4.00,80.00,86.00,84.00,50.00,39.00,61.00,51.00,172.03,0",
						"674,4.00,97.00,24.00,40.00,84.00,70.00,52.00,49.00,70.00,39.00,51.00,36.00,77.00,98.00,133.94,0",
						"675,60.00,12.00,6.00,67.00,54.00,70.00,2.00,57.00,76.00,33.00,61.00,81.00,74.00,88.00,138.28,0",
						"676,8.00,26.00,5.00,79.00,92.00,87.00,53.00,45.00,89.00,9.00,44.00,22.00,73.00,90.00,151.65,0",
						"677,15.00,43.00,7.00,56.00,5.00,47.00,76.00,85.00,12.00,13.00,21.00,85.00,37.00,16.00,146.86,0",
						"678,59.00,82.00,64.00,8.00,59.00,92.00,28.00,62.00,10.00,74.00,21.00,16.00,21.00,39.00,151.42,0",
						"679,75.00,50.00,99.00,22.00,40.00,61.00,32.00,70.00,91.00,50.00,27.00,98.00,36.00,36.00,110.45,0",
						"680,44.00,78.00,44.00,31.00,43.00,90.00,13.00,52.00,40.00,55.00,11.00,15.00,83.00,29.00,157.99,0",
						"681,85.00,7.00,28.00,25.00,47.00,58.00,57.00,0.00,66.00,9.00,5.00,72.00,51.00,90.00,136.57,0",
						"682,82.00,37.00,5.00,69.00,48.00,9.00,29.00,0.00,51.00,18.00,28.00,32.00,34.00,17.00,132.84,0",
						"683,0.00,58.00,77.00,1.00,37.00,15.00,70.00,13.00,43.00,9.00,62.00,39.00,40.00,70.00,129.16,0",
						"684,23.00,58.00,55.00,38.00,1.00,47.00,76.00,41.00,60.00,12.00,28.00,58.00,5.00,46.00,116.95,0",
						"685,6.00,16.00,51.00,37.00,72.00,48.00,74.00,30.00,72.00,64.00,71.00,53.00,78.00,55.00,131.60,0",
						"686,38.00,45.00,87.00,46.00,43.00,13.00,12.00,11.00,73.00,84.00,29.00,52.00,94.00,97.00,153.40,0",
						"687,29.00,54.00,77.00,94.00,59.00,0.00,93.00,51.00,68.00,84.00,26.00,64.00,67.00,2.00,147.16,0",
						"688,6.00,63.00,26.00,49.00,86.00,31.00,14.00,39.00,84.00,39.00,55.00,44.00,21.00,7.00,142.61,0",
						"689,31.00,82.00,88.00,67.00,89.00,63.00,69.00,85.00,38.00,60.00,37.00,83.00,94.00,7.00,146.61,0",
						"690,19.00,42.00,49.00,1.00,72.00,9.00,10.00,19.00,8.00,92.00,90.00,82.00,16.00,54.00,172.32,0",
						"691,54.00,81.00,69.00,81.00,6.00,3.00,71.00,18.00,50.00,6.00,79.00,91.00,43.00,16.00,153.37,0",
						"692,55.00,6.00,55.00,84.00,55.00,9.00,59.00,61.00,89.00,74.00,26.00,72.00,90.00,6.00,156.78,0",
						"693,14.00,83.00,93.00,25.00,22.00,91.00,37.00,10.00,71.00,58.00,39.00,30.00,45.00,62.00,155.66,0",
						"694,22.00,2.00,83.00,55.00,42.00,94.00,44.00,76.00,9.00,4.00,28.00,50.00,25.00,83.00,148.97,0",
						"695,57.00,44.00,48.00,46.00,3.00,66.00,65.00,92.00,52.00,13.00,34.00,89.00,34.00,53.00,141.17,0",
						"696,15.00,3.00,46.00,51.00,39.00,84.00,26.00,11.00,88.00,77.00,7.00,85.00,73.00,48.00,161.64,0",
						"697,85.00,63.00,19.00,94.00,85.00,91.00,28.00,27.00,20.00,35.00,76.00,67.00,82.00,7.00,171.94,0",
						"698,77.88,19.77,5.96,29.50,26.68,54.68,49.80,59.68,6.28,10.99,23.85,21.03,36.18,11.98,107.61,0",
						"699,75.61,6.00,1.81,8.95,8.10,43.11,56.74,70.09,1.91,3.33,7.24,6.38,21.58,13.57,33.68,0",
						"700,74.94,1.88,0.57,2.81,2.54,39.65,58.82,73.20,0.60,1.05,2.27,2.00,17.21,14.04,68.29,0",
						"701,74.72,0.59,0.18,0.88,0.80,39.00,52.32,22.98,0.19,0.33,0.71,0.63,9.31,11.33,71.02,0",
						"702,74.66,0.19,0.06,0.28,0.25,38.79,50.28,7.21,0.06,0.10,0.22,0.20,6.83,10.48,36.97,0",
						"703,74.64,0.06,0.02,0.08,0.08,38.73,49.64,2.19,0.02,0.03,0.07,0.06,6.04,10.21,9.28,0",
						"704,74.63,0.02,0.01,0.03,0.02,38.71,49.44,0.69,0.01,0.01,0.02,0.02,5.80,10.12,122.93,0",
						"705,68.00,97.00,25.00,60.00,56.00,47.00,61.00,73.00,10.00,20.00,11.00,41.00,11.00,29.00,162.94,0",
						"706,70.00,7.00,16.00,10.00,97.00,83.00,1.00,36.00,31.00,41.00,75.00,18.00,93.00,74.00,155.54,0",
						"707,10.00,46.00,94.00,42.00,66.00,90.00,26.00,83.00,79.00,35.00,24.00,33.00,53.00,67.00,153.01,0",
						"708,65.00,99.00,38.00,3.00,49.00,19.00,54.00,81.00,17.00,50.00,65.00,96.00,60.00,23.00,179.44,0",
						"709,27.00,36.00,12.00,70.00,18.00,2.00,44.00,85.00,82.00,66.00,35.00,47.00,89.00,25.00,128.56,0",
						"710,96.00,45.00,7.00,26.00,53.00,7.00,19.00,31.00,68.00,7.00,64.00,16.00,72.00,48.00,157.63,0",
						"711,77.00,92.00,97.00,22.00,56.00,77.00,62.00,54.00,91.00,87.00,11.00,75.00,19.00,41.00,148.95,0",
						"712,77.00,28.00,44.00,77.00,26.00,9.00,91.00,77.00,95.00,84.00,80.00,50.00,0.00,12.00,172.10,0",
						"713,66.00,36.00,30.00,22.00,77.00,72.00,56.00,67.00,61.00,11.00,45.00,43.00,72.00,45.00,127.62,0",
						"714,78.00,7.00,30.00,95.00,48.00,15.00,54.00,25.00,88.00,28.00,98.00,75.00,23.00,40.00,141.47,0",
						"715,20.00,47.00,15.00,1.00,63.00,76.00,59.00,70.00,97.00,19.00,59.00,62.00,6.00,99.00,158.39,0",
						"716,83.00,67.00,91.00,7.00,17.00,27.00,62.00,51.00,12.00,3.00,14.00,83.00,0.00,47.00,150.17,0",
						"717,63.00,86.00,44.00,38.00,66.00,19.00,31.00,43.00,44.00,94.00,82.00,6.00,45.00,89.00,161.61,0",
						"718,13.00,6.00,36.00,33.00,29.00,84.00,99.00,17.00,97.00,24.00,52.00,95.00,16.00,76.00,192.36,0",
						"719,99.00,59.00,70.00,98.00,47.00,40.00,20.00,67.00,96.00,89.00,23.00,6.00,84.00,93.00,178.15,0",
						"720,1.00,61.00,37.00,3.00,22.00,44.00,15.00,41.00,90.00,17.00,35.00,68.00,57.00,13.00,146.71,0",
						"721,63.00,10.00,73.00,78.00,31.00,24.00,60.00,56.00,45.00,95.00,49.00,45.00,73.00,45.00,153.96,0",
						"722,88.00,97.00,91.00,12.00,50.00,87.00,37.00,48.00,39.00,68.00,18.00,95.00,91.00,82.00,165.88,0",
						"723,1.00,11.00,57.00,24.00,40.00,83.00,67.00,29.00,1.00,30.00,44.00,98.00,94.00,41.00,168.94,0",
						"724,35.00,90.00,21.00,72.00,64.00,41.00,67.00,13.00,45.00,77.00,33.00,72.00,35.00,93.00,157.16,0",
						"725,22.00,31.00,89.00,43.00,24.00,50.00,81.00,90.00,75.00,80.00,22.00,73.00,12.00,2.00,150.43,0",
						"726,1.00,64.00,26.00,43.00,28.00,8.00,88.00,53.00,42.00,94.00,93.00,70.00,60.00,65.00,162.50,0",
						"727,42.00,8.00,26.00,60.00,6.00,21.00,58.00,8.00,4.00,94.00,66.00,26.00,79.00,7.00,160.04,0",
						"728,45.00,75.00,42.00,47.00,19.00,85.00,52.00,46.00,86.00,1.00,73.00,32.00,50.00,91.00,152.21,0",
						"729,40.00,8.00,57.00,4.00,30.00,7.00,61.00,45.00,51.00,48.00,22.00,6.00,45.00,38.00,168.76,0",
						"730,39.00,22.00,20.00,21.00,89.00,45.00,2.00,57.00,91.00,98.00,52.00,96.00,14.00,72.00,161.85,0",
						"731,63.44,6.90,6.28,6.59,27.93,40.25,41.64,69.09,28.56,30.76,16.32,30.13,14.83,32.38,127.41,0",
						"732,83.00,91.00,59.00,75.00,72.00,19.00,80.00,70.00,75.00,73.00,24.00,37.00,0.00,91.00,162.67,0",
						"733,56.00,38.00,36.00,94.00,82.00,99.00,30.00,36.00,83.00,84.00,57.00,25.00,6.00,88.00,156.83,0",
						"734,68.78,11.93,11.30,29.50,25.74,57.62,43.28,11.30,26.05,26.36,17.89,7.85,5.79,34.54,104.07,0",
						"735,72.79,3.74,3.55,9.26,8.08,44.64,47.45,3.55,8.18,8.27,5.61,2.46,5.73,17.76,86.27,0",
						"736,42.00,54.00,87.00,78.00,36.00,49.00,33.00,63.00,91.00,99.00,2.00,25.00,8.00,59.00,170.55,0",
						"737,50.00,85.00,67.00,28.00,5.00,37.00,26.00,47.00,45.00,49.00,97.00,82.00,59.00,91.00,154.33,0",
						"738,22.00,55.00,16.00,83.00,59.00,86.00,71.00,31.00,8.00,32.00,8.00,14.00,79.00,97.00,155.38,0",
						"739,59.00,43.00,74.00,61.00,34.00,3.00,98.00,11.00,97.00,9.00,26.00,10.00,40.00,39.00,152.05,0",
						"740,48.00,18.00,44.00,86.00,58.00,79.00,36.00,1.00,98.00,10.00,12.00,23.00,47.00,57.00,158.11,0",
						"741,3.00,47.00,38.00,43.00,49.00,22.00,0.00,93.00,55.00,28.00,59.00,88.00,83.00,75.00,131.04,0",
						"742,45.00,14.00,49.00,45.00,33.00,52.00,68.00,60.00,56.00,69.00,4.00,65.00,92.00,36.00,131.60,0",
						"743,96.00,3.00,77.00,71.00,31.00,10.00,10.00,74.00,56.00,28.00,3.00,16.00,78.00,84.00,146.82,0",
						"744,72.00,1.00,67.00,98.00,72.00,28.00,1.00,30.00,8.00,52.00,67.00,5.00,40.00,99.00,148.18,0",
						"745,59.00,6.00,29.00,62.00,13.00,62.00,26.00,67.00,67.00,43.00,65.00,32.00,36.00,31.00,121.91,0",
						"746,54.00,34.00,2.00,66.00,5.00,44.00,25.00,38.00,36.00,87.00,19.00,36.00,33.00,98.00,138.32,0",
						"747,94.00,67.00,71.00,13.00,53.00,95.00,9.00,23.00,41.00,92.00,7.00,33.00,53.00,58.00,158.25,0",
						"748,24.00,55.00,77.00,59.00,21.00,30.00,72.00,0.00,76.00,12.00,89.00,56.00,70.00,41.00,144.84,0",
						"749,44.00,77.00,35.00,50.00,83.00,77.00,52.00,52.00,75.00,14.00,39.00,62.00,26.00,30.00,133.99,0",
						"750,71.00,89.00,30.00,43.00,39.00,58.00,15.00,91.00,28.00,45.00,83.00,88.00,35.00,1.00,159.57,0",
						"751,7.00,39.00,94.00,51.00,99.00,86.00,43.00,57.00,79.00,96.00,79.00,24.00,45.00,85.00,170.53,0",
						"752,88.00,98.00,18.00,0.00,14.00,74.00,4.00,10.00,89.00,45.00,2.00,15.00,76.00,55.00,188.54,0",
						"753,12.00,63.00,71.00,75.00,87.00,79.00,58.00,0.00,97.00,43.00,77.00,25.00,6.00,98.00,162.56,0",
						"754,4.00,65.00,86.00,45.00,96.00,36.00,99.00,88.00,49.00,17.00,47.00,10.00,40.00,64.00,167.08,0",
						"755,91.00,68.00,40.00,99.00,39.00,53.00,68.00,10.00,85.00,97.00,32.00,6.00,46.00,8.00,170.94,0",
						"756,61.00,16.00,68.00,55.00,52.00,74.00,67.00,70.00,51.00,45.00,31.00,29.00,23.00,13.00,149.68,0",
						"757,6.00,49.00,62.00,36.00,12.00,25.00,8.00,63.00,6.00,55.00,54.00,91.00,45.00,81.00,157.98,0",
						"758,43.00,90.00,77.00,93.00,14.00,53.00,22.00,26.00,26.00,8.00,15.00,0.00,5.00,34.00,170.09,0",
						"759,32.00,0.00,16.00,27.00,78.00,13.00,64.00,63.00,34.00,99.00,25.00,44.00,16.00,95.00,163.18,0",
						"760,48.00,69.00,52.00,77.00,99.00,51.00,54.00,86.00,86.00,64.00,66.00,19.00,42.00,82.00,131.95,0",
						"761,10.00,71.00,9.00,14.00,77.00,95.00,25.00,63.00,78.00,99.00,97.00,43.00,9.00,25.00,145.87,0",
						"762,6.00,89.00,55.00,9.00,39.00,55.00,48.00,24.00,29.00,47.00,74.00,63.00,71.00,85.00,153.59,0",
						"763,1.00,11.00,37.00,89.00,2.00,47.00,0.00,49.00,29.00,18.00,80.00,41.00,15.00,60.00,158.90,0",
						"764,99.00,35.00,90.00,95.00,59.00,20.00,63.00,47.00,31.00,11.00,26.00,7.00,96.00,31.00,170.62,0",
						"765,13.00,92.00,5.00,41.00,64.00,57.00,58.00,81.00,85.00,40.00,46.00,11.00,50.00,59.00,156.28,0",
						"766,3.00,12.00,20.00,94.00,76.00,43.00,39.00,50.00,41.00,97.00,37.00,72.00,4.00,57.00,134.64,0",
						"767,14.00,4.00,40.00,90.00,62.00,0.00,86.00,38.00,25.00,97.00,81.00,50.00,23.00,50.00,149.36,0",
						"768,47.00,44.00,71.00,97.00,90.00,81.00,42.00,54.00,37.00,3.00,22.00,49.00,50.00,61.00,138.52,0",
						"769,17.00,84.00,50.00,47.00,49.00,43.00,73.00,49.00,57.00,53.00,12.00,98.00,70.00,44.00,130.52,0",
						"770,54.00,95.00,81.00,48.00,86.00,68.00,20.00,49.00,35.00,31.00,36.00,4.00,86.00,31.00,139.75,0",
						"771,33.00,69.00,16.00,44.00,58.00,62.00,12.00,66.00,45.00,2.00,72.00,68.00,59.00,65.00,148.96,0",
						"772,57.00,32.00,29.00,85.00,26.00,25.00,74.00,52.00,56.00,96.00,41.00,5.00,36.00,11.00,142.33,0",
						"773,3.00,47.00,82.00,27.00,42.00,61.00,31.00,50.00,57.00,56.00,71.00,27.00,39.00,92.00,126.85,0",
						"774,72.00,94.00,48.00,25.00,7.00,76.00,7.00,61.00,36.00,39.00,15.00,68.00,65.00,54.00,145.04,0",
						"775,70.00,17.00,84.00,33.00,98.00,89.00,70.00,88.00,47.00,93.00,13.00,18.00,21.00,52.00,161.13,0",
						"776,75.00,1.00,44.00,98.00,45.00,48.00,55.00,86.00,38.00,2.00,5.00,39.00,60.00,18.00,156.89,0",
						"777,7.00,65.00,69.00,96.00,66.00,55.00,0.00,88.00,86.00,81.00,51.00,93.00,34.00,18.00,147.43,0",
						"778,24.00,65.00,83.00,99.00,92.00,44.00,14.00,22.00,44.00,18.00,41.00,38.00,4.00,98.00,147.39,0",
						"779,78.00,48.00,14.00,70.00,75.00,28.00,8.00,25.00,87.00,42.00,26.00,97.00,51.00,54.00,152.80,0",
						"780,90.00,14.00,93.00,95.00,11.00,35.00,42.00,5.00,97.00,8.00,87.00,96.00,24.00,52.00,158.61,0",
						"781,53.00,34.00,7.00,73.00,13.00,82.00,83.00,42.00,31.00,75.00,85.00,17.00,24.00,87.00,157.12,0",
						"782,40.00,56.00,8.00,18.00,30.00,27.00,50.00,57.00,63.00,31.00,43.00,22.00,63.00,93.00,142.30,0",
						"783,73.00,11.00,77.00,33.00,96.00,2.00,48.00,70.00,76.00,8.00,94.00,3.00,30.00,63.00,156.90,0",
						"784,29.00,5.00,81.00,56.00,70.00,16.00,81.00,15.00,2.00,56.00,91.00,83.00,74.00,38.00,176.95,0",
						"785,97.00,34.00,79.00,43.00,70.00,59.00,51.00,69.00,21.00,9.00,39.00,32.00,17.00,87.00,151.98,0",
						"786,16.00,17.00,36.00,12.00,28.00,91.00,14.00,37.00,66.00,22.00,80.00,39.00,69.00,77.00,151.33,0",
						"787,18.00,61.00,34.00,39.00,77.00,21.00,18.00,31.00,40.00,60.00,27.00,82.00,81.00,69.00,134.62,0",
						"788,4.00,93.00,78.00,98.00,63.00,0.00,47.00,58.00,50.00,1.00,7.00,85.00,98.00,34.00,150.58,0",
						"789,18.00,88.00,80.00,87.00,82.00,52.00,83.00,36.00,18.00,63.00,15.00,23.00,1.00,16.00,158.97,0",
						"790,84.00,58.00,7.00,41.00,46.00,36.00,22.00,38.00,65.00,27.00,24.00,32.00,50.00,45.00,133.39,0",
						"791,77.00,36.00,89.00,91.00,61.00,63.00,15.00,33.00,59.00,47.00,19.00,67.00,77.00,88.00,131.13,0",
						"792,68.00,13.00,79.00,92.00,22.00,49.00,44.00,20.00,94.00,90.00,41.00,9.00,81.00,54.00,147.51,0",
						"793,33.00,64.00,54.00,29.00,46.00,82.00,27.00,74.00,17.00,80.00,77.00,98.00,48.00,83.00,140.87,0",
						"794,96.00,24.00,62.00,3.00,86.00,96.00,24.00,74.00,66.00,93.00,16.00,44.00,76.00,65.00,146.45,0",
						"795,74.00,46.00,20.00,3.00,34.00,60.00,68.00,68.00,47.00,57.00,33.00,59.00,65.00,75.00,131.18,0",
						"796,16.00,40.00,67.00,43.00,9.00,76.00,55.00,18.00,1.00,40.00,3.00,73.00,30.00,60.00,164.23,0",
						"797,94.00,3.00,12.00,47.00,55.00,22.00,9.00,52.00,86.00,18.00,80.00,51.00,8.00,2.00,162.75,0",
						"798,74.00,57.00,82.00,96.00,82.00,51.00,59.00,63.00,71.00,31.00,27.00,99.00,37.00,2.00,148.02,0",
						"799,87.00,34.00,76.00,90.00,46.00,94.00,85.00,34.00,79.00,40.00,28.00,1.00,14.00,48.00,147.66,0",
						"800,44.00,64.00,53.00,39.00,58.00,13.00,19.00,58.00,88.00,57.00,56.00,88.00,80.00,5.00,130.76,0",
						"801,72.00,28.00,14.00,60.00,70.00,44.00,72.00,60.00,49.00,82.00,89.00,64.00,26.00,21.00,127.63,0",
						"802,29.00,40.00,97.00,88.00,22.00,9.00,95.00,15.00,74.00,35.00,85.00,11.00,85.00,99.00,162.23,0",
						"803,10.00,65.00,82.00,85.00,99.00,75.00,19.00,24.00,87.00,47.00,33.00,26.00,55.00,21.00,163.91,0",
						"804,50.00,44.00,32.00,56.00,29.00,15.00,32.00,88.00,0.00,84.00,84.00,55.00,41.00,14.00,132.79,0",
						"805,47.00,53.00,51.00,66.00,65.00,51.00,25.00,52.00,39.00,41.00,77.00,41.00,14.00,20.00,118.16,0",
						"806,74.00,48.00,47.00,16.00,73.00,23.00,49.00,21.00,86.00,98.00,74.00,65.00,83.00,99.00,172.19,0",
						"807,65.00,94.00,79.00,3.00,6.00,58.00,80.00,65.00,1.00,45.00,31.00,81.00,0.00,6.00,181.25,0",
						"808,20.00,83.00,15.00,95.00,66.00,41.00,1.00,39.00,17.00,63.00,57.00,49.00,47.00,70.00,138.86,0",
						"809,48.00,99.00,26.00,69.00,71.00,17.00,24.00,17.00,69.00,16.00,61.00,84.00,74.00,44.00,138.02,0",
						"810,6.00,25.00,15.00,90.00,47.00,42.00,65.00,34.00,10.00,26.00,63.00,25.00,84.00,53.00,143.19,0",
						"811,12.00,59.00,85.00,47.00,82.00,30.00,96.00,82.00,80.00,14.00,65.00,6.00,81.00,12.00,162.73,0",
						"812,94.00,87.00,92.00,34.00,85.00,60.00,4.00,93.00,24.00,46.00,30.00,15.00,40.00,31.00,151.32,0",
						"813,46.00,28.00,52.00,34.00,54.00,12.00,2.00,61.00,15.00,66.00,8.00,51.00,77.00,12.00,154.42,0",
						"814,29.00,28.00,54.00,95.00,75.00,38.00,95.00,70.00,16.00,13.00,90.00,71.00,45.00,27.00,144.90,0",
						"815,17.00,26.00,11.00,99.00,44.00,51.00,62.00,37.00,99.00,47.00,65.00,95.00,87.00,26.00,164.53,0",
						"816,59.00,78.00,47.00,60.00,40.00,67.00,11.00,7.00,7.00,61.00,7.00,25.00,52.00,65.00,149.25,0",
						"817,54.00,55.00,7.00,66.00,78.00,82.00,67.00,19.00,25.00,45.00,50.00,10.00,79.00,12.00,150.65,0",
						"818,26.00,86.00,79.00,0.00,69.00,21.00,4.00,93.00,74.00,96.00,80.00,21.00,3.00,89.00,185.00,0",
						"819,48.00,14.00,4.00,64.00,55.00,11.00,10.00,50.00,1.00,99.00,49.00,74.00,13.00,88.00,139.23,0",
						"820,39.00,49.00,74.00,80.00,18.00,2.00,15.00,98.00,34.00,59.00,82.00,0.00,80.00,23.00,175.71,0",
						"821,90.00,96.00,75.00,33.00,78.00,86.00,64.00,41.00,10.00,29.00,29.00,99.00,82.00,26.00,156.92,0",
						"822,40.00,41.00,14.00,10.00,15.00,66.00,56.00,86.00,8.00,46.00,42.00,58.00,25.00,8.00,155.89,0",
						"823,11.00,75.00,61.00,96.00,25.00,62.00,7.00,1.00,85.00,55.00,53.00,66.00,98.00,11.00,155.63,0",
						"824,94.00,89.00,45.00,98.00,72.00,8.00,7.00,16.00,24.00,22.00,1.00,71.00,76.00,19.00,176.72,0",
						"825,28.00,94.00,55.00,4.00,29.00,69.00,13.00,82.00,88.00,50.00,70.00,45.00,53.00,16.00,147.39,0",
						"826,13.00,60.00,96.00,39.00,3.00,72.00,46.00,0.00,22.00,79.00,82.00,6.00,99.00,67.00,177.82,0",
						"827,78.00,94.00,70.00,52.00,46.00,15.00,92.00,63.00,42.00,63.00,73.00,58.00,8.00,36.00,140.24,0",
						"828,26.00,81.00,3.00,94.00,90.00,58.00,68.00,38.00,88.00,72.00,21.00,27.00,0.00,97.00,166.07,0",
						"829,71.00,80.00,0.00,31.00,1.00,39.00,27.00,79.00,12.00,22.00,96.00,78.00,0.00,68.00,162.04,0",
						"830,28.00,27.00,8.00,35.00,65.00,13.00,81.00,92.00,12.00,10.00,17.00,72.00,19.00,86.00,157.36,0",
						"831,19.00,91.00,8.00,67.00,27.00,98.00,98.00,57.00,7.00,47.00,46.00,5.00,17.00,69.00,152.91,0",
						"832,26.00,23.00,66.00,21.00,30.00,2.00,85.00,24.00,84.00,22.00,68.00,39.00,93.00,44.00,157.11,0",
						"833,91.00,33.00,51.00,68.00,70.00,53.00,50.00,44.00,81.00,76.00,70.00,77.00,4.00,53.00,131.73,0",
						"834,15.00,1.00,66.00,77.00,8.00,64.00,79.00,25.00,36.00,51.00,86.00,36.00,54.00,2.00,157.65,0",
						"835,88.00,90.00,55.00,78.00,23.00,69.00,75.00,48.00,15.00,88.00,44.00,9.00,14.00,90.00,152.37,0",
						"836,24.00,39.00,41.00,86.00,87.00,85.00,58.00,37.00,52.00,68.00,37.00,20.00,72.00,66.00,136.64,0",
						"837,84.00,37.00,17.00,71.00,22.00,53.00,9.00,18.00,97.00,40.00,48.00,1.00,34.00,65.00,129.41,0",
						"838,40.00,74.00,90.00,56.00,96.00,36.00,32.00,65.00,20.00,6.00,18.00,31.00,71.00,11.00,159.09,0",
						"839,19.00,63.00,56.00,94.00,74.00,60.00,79.00,20.00,36.00,61.00,56.00,72.00,64.00,78.00,128.15,0",
						"840,34.00,51.00,64.00,75.00,57.00,63.00,24.00,73.00,26.00,10.00,87.00,31.00,56.00,91.00,122.03,0",
						"841,73.00,34.00,72.00,53.00,9.00,85.00,32.00,51.00,17.00,85.00,89.00,45.00,24.00,69.00,133.09,0",
						"842,51.00,54.00,24.00,26.00,16.00,63.00,55.00,30.00,52.00,31.00,88.00,99.00,9.00,31.00,121.70,0",
						"843,20.00,14.00,59.00,53.00,44.00,85.00,89.00,42.00,27.00,43.00,98.00,87.00,28.00,84.00,134.41,0",
						"844,55.00,66.00,84.00,34.00,86.00,38.00,26.00,70.00,79.00,27.00,56.00,87.00,51.00,66.00,150.67,0",
						"845,72.00,72.00,22.00,98.00,60.00,85.00,64.00,64.00,3.00,94.00,80.00,51.00,60.00,20.00,162.07,0",
						"846,84.00,76.00,88.00,69.00,92.00,24.00,86.00,7.00,37.00,12.00,70.00,96.00,72.00,93.00,165.79,0",
						"847,20.00,97.00,12.00,10.00,73.00,37.00,73.00,51.00,20.00,85.00,18.00,32.00,65.00,19.00,173.87,0",
						"848,74.00,79.00,94.00,52.00,73.00,75.00,48.00,96.00,22.00,13.00,60.00,8.00,29.00,89.00,165.61,0",
						"849,59.00,14.00,0.00,15.00,53.00,9.00,59.00,13.00,85.00,50.00,70.00,26.00,30.00,9.00,151.13,0",
						"850,84.00,4.00,50.00,22.00,39.00,49.00,96.00,24.00,14.00,3.00,89.00,36.00,47.00,47.00,161.27,0",
						"851,36.00,18.00,60.00,53.00,6.00,38.00,2.00,31.00,0.00,66.00,18.00,84.00,36.00,48.00,153.34,0",
						"852,32.00,99.00,12.00,50.00,35.00,61.00,71.00,85.00,79.00,19.00,50.00,71.00,5.00,85.00,164.69,0",
						"853,99.00,43.00,12.00,69.00,48.00,84.00,53.00,12.00,38.00,73.00,17.00,32.00,74.00,16.00,153.95,0",
						"854,15.00,98.00,93.00,41.00,61.00,35.00,93.00,54.00,69.00,6.00,43.00,41.00,73.00,77.00,160.95,0",
						"855,96.00,50.00,80.00,61.00,77.00,83.00,20.00,23.00,78.00,27.00,5.00,9.00,72.00,95.00,164.33,0",
						"856,0.00,19.00,69.00,16.00,53.00,60.00,1.00,66.00,87.00,33.00,72.00,40.00,17.00,68.00,167.35,0",
						"857,59.00,78.00,86.00,49.00,66.00,40.00,63.00,70.00,31.00,18.00,65.00,33.00,92.00,34.00,138.10,0",
						"858,82.00,65.00,59.00,52.00,84.00,58.00,23.00,53.00,93.00,18.00,23.00,26.00,7.00,12.00,164.75,0",
						"859,39.00,61.00,43.00,19.00,7.00,20.00,66.00,16.00,32.00,42.00,56.00,53.00,42.00,50.00,128.80,0",
						"860,61.00,4.00,40.00,53.00,39.00,84.00,64.00,64.00,73.00,62.00,54.00,12.00,85.00,87.00,144.79,0",
						"861,96.00,35.00,20.00,90.00,61.00,12.00,80.00,58.00,38.00,43.00,73.00,31.00,86.00,2.00,163.93,0",
						"862,93.00,10.00,66.00,24.00,13.00,98.00,9.00,97.00,0.00,53.00,42.00,15.00,54.00,88.00,171.39,0",
						"863,52.00,40.00,87.00,40.00,76.00,40.00,72.00,34.00,53.00,10.00,31.00,46.00,81.00,98.00,165.61,0",
						"864,82.00,17.00,0.00,59.00,21.00,96.00,10.00,36.00,77.00,69.00,43.00,73.00,10.00,97.00,171.16,0",
						"865,38.00,76.00,17.00,79.00,96.00,89.00,3.00,25.00,14.00,4.00,93.00,61.00,13.00,54.00,136.89,0",
						"866,56.00,67.00,15.00,91.00,82.00,50.00,6.00,42.00,84.00,20.00,47.00,90.00,36.00,60.00,143.60,0",
						"867,9.00,86.00,95.00,67.00,88.00,65.00,8.00,51.00,17.00,80.00,31.00,25.00,42.00,77.00,158.03,0",
						"868,84.00,33.00,16.00,96.00,36.00,80.00,69.00,89.00,89.00,22.00,13.00,53.00,27.00,66.00,153.52,0",
						"869,48.00,78.00,4.00,83.00,33.00,15.00,5.00,4.00,87.00,61.00,88.00,24.00,9.00,52.00,140.81,0",
						"870,97.00,85.00,93.00,57.00,9.00,20.00,6.00,21.00,5.00,10.00,50.00,15.00,7.00,25.00,158.73,0",
						"871,31.00,52.00,33.00,33.00,54.00,56.00,67.00,6.00,34.00,56.00,40.00,72.00,59.00,31.00,132.31,0",
						"872,76.00,27.00,11.00,42.00,56.00,33.00,2.00,13.00,87.00,12.00,18.00,20.00,89.00,29.00,152.95,0",
						"873,39.00,14.00,4.00,59.00,49.00,62.00,14.00,98.00,24.00,84.00,66.00,45.00,24.00,2.00,140.93,0",
						"874,31.00,23.00,13.00,24.00,50.00,10.00,82.00,29.00,16.00,24.00,26.00,73.00,27.00,39.00,133.62,0",
						"875,22.00,9.00,36.00,56.00,11.00,35.00,83.00,77.00,71.00,51.00,11.00,85.00,19.00,61.00,131.97,0",
						"876,64.00,9.00,11.00,32.00,2.00,24.00,69.00,24.00,8.00,87.00,40.00,90.00,82.00,11.00,171.33,0",
						"877,25.00,98.00,26.00,28.00,37.00,21.00,4.00,24.00,39.00,52.00,33.00,2.00,78.00,12.00,153.34,0",
						"878,99.00,13.00,50.00,41.00,55.00,20.00,11.00,75.00,37.00,72.00,86.00,24.00,31.00,68.00,160.45,0",
						"879,4.00,88.00,73.00,57.00,10.00,98.00,49.00,4.00,99.00,36.00,59.00,53.00,50.00,46.00,184.00,0",
						"880,54.00,21.00,84.00,76.00,14.00,11.00,74.00,70.00,53.00,72.00,16.00,6.00,8.00,30.00,152.63,0",
						"881,72.00,2.00,19.00,95.00,46.00,39.00,9.00,72.00,26.00,97.00,31.00,41.00,32.00,45.00,147.84,0",
						"882,60.00,82.00,81.00,41.00,10.00,17.00,38.00,79.00,72.00,46.00,62.00,26.00,23.00,72.00,162.50,0",
						"883,78.00,2.00,84.00,27.00,84.00,71.00,92.00,39.00,34.00,20.00,79.00,29.00,20.00,5.00,178.95,0",
						"884,58.00,20.00,4.00,64.00,24.00,24.00,35.00,77.00,37.00,3.00,45.00,66.00,66.00,72.00,152.34,0",
						"885,91.00,67.00,13.00,56.00,41.00,33.00,88.00,47.00,98.00,42.00,21.00,21.00,4.00,22.00,141.04,0",
						"886,69.00,63.00,57.00,5.00,68.00,66.00,39.00,9.00,62.00,71.00,29.00,94.00,50.00,68.00,140.55,0",
						"887,23.00,77.00,7.00,46.00,85.00,30.00,91.00,60.00,37.00,22.00,89.00,81.00,81.00,89.00,164.34,0",
						"888,7.00,3.00,71.00,85.00,70.00,52.00,88.00,17.00,83.00,82.00,13.00,77.00,46.00,70.00,165.16,0",
						"889,51.00,67.00,10.00,21.00,9.00,38.00,35.00,67.00,3.00,59.00,4.00,5.00,38.00,14.00,159.31,0",
						"890,41.00,14.00,2.00,95.00,10.00,15.00,49.00,6.00,55.00,25.00,86.00,72.00,56.00,48.00,156.37,0",
						"891,50.00,44.00,12.00,6.00,0.00,42.00,5.00,80.00,92.00,39.00,34.00,77.00,45.00,54.00,148.35,0",
						"892,53.00,61.00,68.00,48.00,2.00,74.00,12.00,35.00,6.00,47.00,81.00,25.00,74.00,2.00,151.91,0",
						"893,6.00,79.00,14.00,48.00,70.00,21.00,24.00,94.00,52.00,10.00,10.00,31.00,58.00,52.00,155.29,0",
						"894,61.00,81.00,64.00,11.00,74.00,34.00,19.00,13.00,67.00,21.00,76.00,19.00,63.00,93.00,148.93,0",
						"895,31.00,40.00,37.00,18.00,5.00,31.00,42.00,46.00,26.00,76.00,91.00,96.00,88.00,6.00,172.76,0",
						"896,7.00,17.00,85.00,84.00,23.00,39.00,8.00,50.00,23.00,79.00,79.00,67.00,53.00,38.00,175.47,0",
						"897,29.00,33.00,32.00,80.00,99.00,65.00,99.00,26.00,34.00,2.00,37.00,19.00,32.00,97.00,148.89,0",
						"898,36.00,77.00,0.00,39.00,38.00,54.00,36.00,39.00,40.00,78.00,52.00,10.00,52.00,96.00,143.01,0",
						"899,64.00,49.00,19.00,73.00,32.00,63.00,6.00,93.00,46.00,48.00,77.00,73.00,42.00,5.00,132.05,0",
						"900,36.00,73.00,49.00,49.00,12.00,52.00,35.00,82.00,92.00,26.00,54.00,62.00,81.00,7.00,134.60,0",
						"901,60.00,93.00,12.00,85.00,18.00,80.00,37.00,36.00,1.00,71.00,5.00,18.00,30.00,20.00,157.08,0",
						"902,41.00,72.00,12.00,24.00,78.00,66.00,5.00,48.00,90.00,19.00,34.00,5.00,81.00,54.00,167.13,0",
						"903,73.00,16.00,93.00,21.00,10.00,25.00,48.00,91.00,6.00,19.00,91.00,81.00,79.00,34.00,165.95,0",
						"904,28.00,76.00,12.00,93.00,18.00,39.00,41.00,11.00,22.00,65.00,69.00,41.00,18.00,19.00,148.79,0",
						"905,76.00,77.00,24.00,40.00,3.00,10.00,64.00,65.00,23.00,60.00,88.00,28.00,18.00,23.00,129.81,0",
						"906,82.00,96.00,90.00,60.00,13.00,72.00,24.00,64.00,36.00,70.00,57.00,62.00,59.00,62.00,151.97,0",
						"907,11.00,4.00,80.00,3.00,74.00,94.00,99.00,6.00,50.00,27.00,67.00,99.00,54.00,8.00,168.08,0",
						"908,59.00,46.00,51.00,43.00,53.00,99.00,87.00,93.00,34.00,17.00,98.00,12.00,12.00,96.00,177.25,0",
						"909,47.00,93.00,54.00,33.00,72.00,42.00,8.00,9.00,47.00,24.00,84.00,87.00,49.00,71.00,151.46,0",
						"910,44.00,70.00,20.00,54.00,47.00,24.00,22.00,75.00,76.00,72.00,78.00,9.00,96.00,59.00,149.77,0",
						"911,10.00,10.00,93.00,25.00,99.00,11.00,75.00,87.00,9.00,6.00,83.00,54.00,32.00,58.00,186.39,0",
						"912,20.00,15.00,44.00,27.00,21.00,59.00,8.00,59.00,94.00,5.00,49.00,60.00,15.00,95.00,169.36,0",
						"913,86.00,99.00,75.00,30.00,1.00,89.00,47.00,47.00,66.00,90.00,53.00,18.00,8.00,8.00,166.88,0",
						"914,20.00,45.00,44.00,94.00,70.00,78.00,26.00,6.00,54.00,78.00,7.00,25.00,85.00,0.00,164.78,0",
						"915,2.00,69.00,43.00,94.00,11.00,1.00,2.00,18.00,37.00,57.00,34.00,40.00,44.00,69.00,168.48,0",
						"916,66.00,96.00,74.00,73.00,76.00,28.00,84.00,35.00,96.00,57.00,9.00,69.00,17.00,63.00,152.83,0",
						"917,80.00,72.00,64.00,46.00,91.00,63.00,83.00,15.00,10.00,41.00,31.00,28.00,59.00,67.00,144.46,0",
						"918,47.00,45.00,24.00,59.00,32.00,20.00,32.00,64.00,77.00,32.00,55.00,80.00,72.00,90.00,131.98,0",
						"919,28.00,15.00,72.00,9.00,9.00,70.00,46.00,72.00,77.00,65.00,55.00,66.00,67.00,53.00,140.61,0",
						"920,64.00,94.00,84.00,94.00,33.00,77.00,47.00,1.00,16.00,90.00,4.00,54.00,49.00,96.00,154.35,0",
						"921,6.00,82.00,31.00,63.00,15.00,40.00,70.00,44.00,18.00,70.00,17.00,83.00,89.00,11.00,155.65,0",
						"922,56.00,8.00,61.00,99.00,66.00,74.00,14.00,59.00,24.00,61.00,96.00,59.00,54.00,62.00,143.49,0",
						"923,56.00,78.00,95.00,77.00,5.00,86.00,41.00,27.00,46.00,57.00,92.00,54.00,84.00,12.00,155.32,0",
						"924,19.00,42.00,42.00,30.00,85.00,33.00,57.00,61.00,21.00,83.00,31.00,25.00,45.00,1.00,145.72,0",
						"925,35.00,53.00,65.00,60.00,18.00,21.00,24.00,11.00,23.00,30.00,61.00,98.00,85.00,81.00,141.68,0",
						"926,68.00,93.00,71.00,63.00,65.00,9.00,15.00,37.00,98.00,45.00,38.00,93.00,80.00,69.00,133.22,0",
						"927,29.00,20.00,47.00,36.00,94.00,0.00,38.00,17.00,16.00,93.00,3.00,30.00,4.00,43.00,182.74,0",
						"928,85.00,80.00,24.00,93.00,40.00,86.00,42.00,93.00,62.00,8.00,6.00,53.00,79.00,7.00,153.37,0",
						"929,73.00,80.00,64.00,84.00,90.00,41.00,14.00,19.00,22.00,37.00,25.00,35.00,37.00,37.00,137.73,0",
						"930,72.00,13.00,57.00,49.00,51.00,61.00,23.00,56.00,0.00,88.00,57.00,76.00,96.00,27.00,138.82,0",
						"931,53.00,41.00,17.00,8.00,21.00,82.00,1.00,33.00,88.00,91.00,78.00,74.00,74.00,55.00,133.32,0",
						"932,94.00,72.00,0.00,23.00,23.00,24.00,18.00,16.00,12.00,6.00,70.00,50.00,14.00,16.00,164.22,0",
						"933,9.00,25.00,81.00,46.00,10.00,37.00,3.00,8.00,75.00,11.00,3.00,22.00,53.00,31.00,167.07,0",
						"934,24.00,48.00,0.00,9.00,65.00,47.00,63.00,31.00,9.00,73.00,74.00,12.00,52.00,93.00,155.34,0",
						"935,69.00,36.00,92.00,50.00,62.00,21.00,66.00,14.00,52.00,70.00,53.00,66.00,78.00,90.00,151.65,0",
						"936,2.00,1.00,95.00,88.00,11.00,26.00,0.00,31.00,57.00,0.00,37.00,13.00,25.00,46.00,175.12,0",
						"937,93.00,97.00,10.00,68.00,48.00,21.00,25.00,89.00,99.00,50.00,15.00,89.00,90.00,39.00,164.03,0",
						"938,80.00,71.00,99.00,33.00,17.00,29.00,0.00,63.00,99.00,36.00,67.00,40.00,95.00,12.00,128.70,0",
						"939,77.00,42.00,91.00,27.00,92.00,94.00,23.00,46.00,51.00,2.00,69.00,54.00,77.00,49.00,144.59,0",
						"940,39.00,85.00,62.00,33.00,43.00,18.00,70.00,67.00,17.00,46.00,34.00,82.00,33.00,41.00,140.32,0",
						"941,16.00,6.00,91.00,97.00,49.00,5.00,27.00,58.00,55.00,33.00,11.00,47.00,6.00,58.00,150.84,0",
						"942,61.00,21.00,87.00,66.00,96.00,77.00,7.00,99.00,6.00,48.00,30.00,83.00,94.00,32.00,176.12,0",
						"943,63.00,84.00,7.00,46.00,12.00,23.00,45.00,13.00,52.00,67.00,42.00,85.00,1.00,12.00,177.89,0",
						"944,74.00,23.00,21.00,94.00,64.00,57.00,65.00,8.00,56.00,69.00,17.00,13.00,25.00,25.00,159.86,0",
						"945,35.00,95.00,44.00,47.00,46.00,14.00,40.00,95.00,91.00,76.00,97.00,58.00,74.00,31.00,158.30,0",
						"946,19.00,84.00,55.00,1.00,96.00,47.00,97.00,53.00,58.00,3.00,5.00,21.00,20.00,18.00,160.95,0",
						"947,40.00,40.00,29.00,5.00,78.00,61.00,30.00,72.00,19.00,22.00,41.00,3.00,12.00,9.00,146.44,0",
						"948,14.00,58.00,67.00,78.00,67.00,49.00,8.00,2.00,0.00,29.00,76.00,95.00,0.00,34.00,168.32,0",
						"949,37.00,8.00,8.00,62.00,36.00,51.00,37.00,79.00,71.00,78.00,22.00,29.00,25.00,28.00,152.84,0",
						"950,20.00,7.00,67.00,22.00,93.00,64.00,87.00,47.00,96.00,66.00,89.00,60.00,75.00,27.00,144.42,0",
						"951,75.00,48.00,85.00,36.00,53.00,64.00,11.00,15.00,97.00,79.00,77.00,44.00,29.00,22.00,144.35,0",
						"952,26.00,60.00,26.00,11.00,7.00,59.00,81.00,35.00,62.00,88.00,54.00,98.00,44.00,91.00,161.21,0",
						"953,70.00,19.00,93.00,64.00,75.00,62.00,29.00,87.00,86.00,11.00,10.00,68.00,78.00,87.00,165.83,0",
						"954,86.00,75.00,36.00,69.00,15.00,16.00,13.00,39.00,49.00,38.00,34.00,20.00,9.00,79.00,158.35,0",
						"955,92.00,52.00,2.00,58.00,29.00,91.00,82.00,92.00,98.00,98.00,44.00,43.00,51.00,51.00,158.23,0",
						"956,85.00,49.00,77.00,8.00,58.00,13.00,49.00,19.00,8.00,17.00,38.00,17.00,75.00,9.00,148.98,0",
						"957,57.00,57.00,53.00,59.00,29.00,40.00,87.00,57.00,69.00,8.00,69.00,63.00,25.00,18.00,122.49,0",
						"958,39.00,93.00,37.00,17.00,16.00,30.00,81.00,64.00,75.00,34.00,72.00,92.00,27.00,83.00,131.10,0",
						"959,65.00,28.00,43.00,43.00,95.00,98.00,75.00,98.00,77.00,3.00,89.00,24.00,12.00,42.00,175.29,0",
						"960,76.00,49.00,5.00,53.00,73.00,81.00,95.00,33.00,31.00,23.00,15.00,14.00,33.00,77.00,143.58,0",
						"961,0.00,72.00,62.00,63.00,70.00,85.00,92.00,86.00,23.00,26.00,19.00,31.00,68.00,12.00,147.42,0",
						"962,94.00,4.00,70.00,17.00,1.00,23.00,84.00,72.00,18.00,47.00,58.00,31.00,17.00,48.00,155.95,0",
						"963,93.00,52.00,58.00,64.00,14.00,83.00,34.00,47.00,77.00,78.00,34.00,87.00,10.00,55.00,127.73,0",
						"964,45.00,30.00,78.00,47.00,42.00,57.00,92.00,24.00,45.00,71.00,24.00,46.00,26.00,86.00,145.47,0",
						"965,74.00,83.00,95.00,86.00,4.00,50.00,20.00,84.00,81.00,20.00,26.00,77.00,34.00,94.00,149.65,0",
						"966,54.00,93.00,7.00,63.00,21.00,15.00,63.00,81.00,43.00,39.00,26.00,93.00,7.00,47.00,152.77,0",
						"967,19.00,36.00,26.00,87.00,86.00,77.00,17.00,80.00,16.00,16.00,23.00,56.00,90.00,41.00,162.62,0",
						"968,44.00,92.00,25.00,11.00,43.00,26.00,51.00,52.00,70.00,18.00,11.00,25.00,55.00,85.00,154.36,0",
						"969,63.00,94.00,9.00,26.00,39.00,49.00,53.00,5.00,43.00,61.00,55.00,97.00,21.00,27.00,152.19,0",
						"970,97.00,62.00,65.00,76.00,42.00,16.00,34.00,81.00,45.00,87.00,93.00,12.00,29.00,40.00,151.23,0",
						"971,70.00,96.00,9.00,28.00,99.00,28.00,21.00,60.00,30.00,57.00,3.00,54.00,16.00,35.00,140.52,0",
						"972,73.00,96.00,23.00,74.00,84.00,62.00,20.00,98.00,5.00,77.00,69.00,84.00,33.00,0.00,149.95,0",
						"973,70.00,12.00,34.00,99.00,4.00,73.00,82.00,88.00,80.00,24.00,32.00,10.00,22.00,85.00,156.82,0",
						"974,97.00,11.00,77.00,62.00,6.00,10.00,86.00,50.00,47.00,74.00,6.00,11.00,77.00,40.00,154.81,0",
						"975,70.00,17.00,93.00,28.00,86.00,72.00,81.00,33.00,50.00,84.00,36.00,12.00,51.00,24.00,146.52,0",
						"976,54.00,30.00,85.00,20.00,54.00,99.00,39.00,28.00,39.00,36.00,91.00,42.00,90.00,32.00,150.22,0",
						"977,29.00,48.00,26.00,95.00,57.00,8.00,59.00,27.00,63.00,76.00,61.00,49.00,62.00,94.00,140.51,0",
						"978,45.00,9.00,6.00,97.00,98.00,14.00,29.00,67.00,10.00,20.00,74.00,55.00,72.00,31.00,165.19,0",
						"979,0.00,3.00,62.00,24.00,65.00,23.00,7.00,16.00,66.00,7.00,27.00,27.00,56.00,92.00,144.90,0",
						"980,28.00,7.00,73.00,50.00,41.00,94.00,85.00,15.00,38.00,96.00,21.00,5.00,26.00,71.00,169.69,0",
						"981,69.00,41.00,77.00,57.00,26.00,4.00,42.00,48.00,67.00,24.00,22.00,46.00,69.00,69.00,139.38,0",
						"982,39.00,38.00,79.00,76.00,76.00,63.00,20.00,45.00,50.00,52.00,15.00,70.00,4.00,82.00,139.90,0",
						"983,41.00,74.00,68.00,75.00,17.00,72.00,73.00,68.00,26.00,93.00,26.00,94.00,87.00,93.00,155.97,0",
						"984,9.00,69.00,99.00,43.00,1.00,97.00,20.00,75.00,9.00,6.00,49.00,86.00,94.00,67.00,156.79,0",
						"985,61.00,5.00,61.00,23.00,0.00,59.00,82.00,33.00,61.00,33.00,29.00,59.00,22.00,43.00,140.10,0",
						"986,10.00,98.00,56.00,25.00,0.00,81.00,90.00,19.00,92.00,39.00,53.00,75.00,77.00,82.00,148.34,0",
						"987,33.00,78.00,28.00,87.00,59.00,34.00,64.00,91.00,96.00,67.00,56.00,85.00,58.00,44.00,133.93,0",
						"988,49.00,18.00,11.00,13.00,47.00,78.00,94.00,40.00,57.00,46.00,87.00,25.00,41.00,1.00,148.99,0",
						"989,67.00,94.00,34.00,29.00,13.00,56.00,4.00,43.00,15.00,20.00,91.00,59.00,40.00,38.00,134.61,0",
						"990,48.00,43.00,92.00,73.00,57.00,49.00,14.00,36.00,52.00,36.00,90.00,57.00,42.00,96.00,134.02,0",
						"991,19.00,27.00,22.00,59.00,32.00,14.00,82.00,42.00,7.00,0.00,71.00,91.00,40.00,2.00,155.70,0",
						"992,72.00,89.00,12.00,5.00,24.00,46.00,70.00,88.00,5.00,89.00,93.00,23.00,5.00,88.00,142.67,0",
						"993,48.00,46.00,8.00,12.00,64.00,92.00,81.00,36.00,12.00,21.00,74.00,49.00,9.00,35.00,143.72,0",
						"994,80.00,93.00,44.00,70.00,80.00,7.00,96.00,44.00,7.00,86.00,16.00,84.00,36.00,4.00,168.39,0",
						"995,18.00,54.00,91.00,72.00,39.00,77.00,59.00,5.00,79.00,37.00,30.00,10.00,6.00,20.00,155.13,0",
						"996,21.00,78.00,13.00,4.00,51.00,43.00,15.00,46.00,27.00,52.00,80.00,14.00,34.00,41.00,141.63,0",
						"997,79.00,63.00,15.00,64.00,91.00,26.00,17.00,70.00,16.00,35.00,71.00,79.00,33.00,12.00,145.01,0",
						"998,95.00,66.00,47.00,19.00,78.00,61.00,65.00,3.00,85.00,10.00,58.00,67.00,64.00,56.00,161.65,0",
						"999,3.00,91.00,23.00,77.00,26.00,4.00,18.00,8.00,50.00,86.00,99.00,14.00,86.00,24.00,195.85,0",
						"1000,91.00,46.00,52.00,1.00,30.00,91.00,86.00,82.00,8.00,3.00,87.00,81.00,33.00,49.00,183.24,0",
						"1001,85.00,61.00,85.00,99.00,63.00,88.00,96.00,90.00,62.00,70.00,41.00,96.00,94.00,27.00,179.39,0",
						"1002,10.00,21.00,54.00,84.00,1.00,18.00,6.00,54.00,54.00,15.00,20.00,1.00,80.00,74.00,188.12,0",
						"1003,57.00,73.00,67.00,17.00,87.00,76.00,48.00,37.00,3.00,76.00,69.00,82.00,83.00,47.00,153.29,0",
						"1004,55.00,84.00,94.00,16.00,28.00,83.00,11.00,79.00,51.00,43.00,61.00,14.00,92.00,26.00,148.01,0",
						"1005,64.00,88.00,14.00,80.00,26.00,36.00,59.00,50.00,72.00,24.00,94.00,71.00,79.00,87.00,151.62,0",
						"1006,40.00,83.00,56.00,53.00,57.00,93.00,60.00,37.00,99.00,0.00,50.00,5.00,9.00,34.00,161.28,0",
						"1007,3.00,90.00,22.00,82.00,59.00,87.00,94.00,84.00,41.00,5.00,54.00,59.00,97.00,1.00,165.22,0",
						"1008,22.00,23.00,4.00,14.00,59.00,25.00,86.00,97.00,83.00,57.00,51.00,63.00,42.00,79.00,160.19,0",
						"1009,86.00,82.00,89.00,34.00,70.00,8.00,66.00,61.00,80.00,66.00,3.00,74.00,12.00,89.00,146.85,0",
						"1010,98.00,25.00,94.00,83.00,74.00,67.00,64.00,56.00,73.00,98.00,4.00,7.00,45.00,2.00,172.10,0",
						"1011,6.00,49.00,2.00,57.00,32.00,50.00,29.00,34.00,52.00,36.00,12.00,59.00,32.00,48.00,139.06,0",
						"1012,98.00,91.00,10.00,55.00,42.00,32.00,46.00,5.00,28.00,6.00,20.00,90.00,18.00,56.00,158.79,0",
						"1013,90.00,95.00,19.00,19.00,23.00,44.00,34.00,61.00,0.00,96.00,67.00,0.00,56.00,81.00,163.06,0",
						"1014,58.00,2.00,91.00,7.00,39.00,13.00,31.00,43.00,3.00,23.00,10.00,49.00,89.00,56.00,160.28,0",
						"1015,72.00,55.00,35.00,7.00,22.00,9.00,48.00,4.00,65.00,79.00,86.00,17.00,41.00,14.00,161.35,0",
						"1016,49.00,36.00,21.00,91.00,38.00,80.00,36.00,33.00,54.00,98.00,91.00,22.00,79.00,55.00,155.29,0",
						"1017,53.00,33.00,49.00,33.00,20.00,11.00,31.00,17.00,9.00,5.00,73.00,57.00,44.00,82.00,148.38,0",
						"1018,30.00,58.00,75.00,62.00,43.00,84.00,77.00,3.00,43.00,93.00,71.00,23.00,90.00,0.00,148.53,0",
						"1019,73.00,71.00,77.00,44.00,64.00,99.00,40.00,86.00,80.00,47.00,66.00,28.00,54.00,11.00,141.73,0",
						"1020,42.00,30.00,44.00,10.00,3.00,43.00,55.00,10.00,99.00,13.00,83.00,52.00,97.00,98.00,162.66,0",
						"1021,93.00,33.00,65.00,57.00,23.00,62.00,73.00,29.00,34.00,1.00,1.00,97.00,45.00,31.00,148.74,0",
						"1022,33.00,40.00,38.00,70.00,75.00,48.00,33.00,50.00,36.00,62.00,13.00,52.00,79.00,72.00,136.22,0",
						"1023,15.00,74.00,85.00,47.00,2.00,51.00,69.00,4.00,76.00,12.00,60.00,95.00,16.00,48.00,147.11,0"
					]
				},
				"endTime": "2016-05-18T18:58:43.828Z"
			},
			{
				"startTime": "2016-05-18T18:58:43.828Z",
				"mapData": {
					"groupId": 0,
					"NASValues": [
						"0,35.00,71.00,1.00,6.00,74.00,31.00,44.00,40.00,53.00,87.00,11.00,15.00,34.00,86.00,162.85,0",
						"1,57.00,96.00,75.00,24.00,86.00,16.00,15.00,25.00,22.00,27.00,70.00,28.00,94.00,93.00,161.82,0",
						"2,42.00,82.00,51.00,32.00,44.00,31.00,56.00,78.00,74.00,89.00,52.00,9.00,16.00,46.00,147.12,0",
						"3,56.00,30.00,1.00,93.00,23.00,46.00,11.00,67.00,39.00,35.00,31.00,19.00,42.00,90.00,144.61,0",
						"4,15.00,49.00,99.00,50.00,43.00,71.00,42.00,87.00,47.00,82.00,50.00,38.00,32.00,80.00,143.98,0",
						"5,68.00,93.00,86.00,26.00,90.00,25.00,41.00,18.00,0.00,99.00,55.00,15.00,39.00,0.00,167.58,0",
						"6,49.00,37.00,80.00,66.00,11.00,37.00,99.00,17.00,27.00,53.00,0.00,95.00,82.00,8.00,163.44,0",
						"7,12.00,1.00,22.00,81.00,25.00,14.00,36.00,62.00,85.00,53.00,49.00,86.00,93.00,2.00,135.50,0",
						"8,69.00,40.00,13.00,46.00,75.00,27.00,93.00,70.00,36.00,22.00,78.00,59.00,96.00,23.00,154.61,0",
						"9,26.00,60.00,67.00,1.00,47.00,63.00,95.00,64.00,99.00,77.00,81.00,71.00,1.00,97.00,161.36,0",
						"10,93.00,68.00,96.00,77.00,43.00,14.00,97.00,86.00,91.00,80.00,92.00,34.00,47.00,30.00,171.86,0",
						"11,32.00,11.00,73.00,43.00,40.00,97.00,27.00,30.00,25.00,13.00,15.00,49.00,53.00,30.00,165.54,0",
						"12,67.00,19.00,10.00,34.00,50.00,97.00,57.00,99.00,10.00,42.00,31.00,15.00,5.00,65.00,155.45,0",
						"13,10.00,89.00,88.00,28.00,1.00,21.00,63.00,35.00,13.00,96.00,6.00,13.00,88.00,26.00,183.71,0",
						"14,90.00,87.00,83.00,77.00,60.00,76.00,36.00,63.00,83.00,97.00,3.00,47.00,17.00,35.00,152.78,0",
						"15,15.00,9.00,71.00,41.00,26.00,73.00,58.00,48.00,73.00,66.00,55.00,67.00,29.00,20.00,140.59,0",
						"16,56.00,92.00,18.00,18.00,41.00,11.00,82.00,66.00,13.00,48.00,96.00,49.00,4.00,35.00,151.14,0",
						"17,39.00,71.00,42.00,89.00,77.00,29.00,51.00,10.00,29.00,92.00,87.00,79.00,12.00,49.00,127.70,0",
						"18,54.00,80.00,69.00,24.00,68.00,2.00,53.00,22.00,47.00,40.00,94.00,13.00,21.00,89.00,149.31,0",
						"19,52.00,11.00,42.00,52.00,81.00,17.00,87.00,68.00,61.00,30.00,65.00,85.00,62.00,63.00,127.65,0",
						"20,37.00,71.00,50.00,99.00,83.00,30.00,21.00,69.00,23.00,59.00,11.00,74.00,24.00,23.00,140.90,0",
						"21,22.00,93.00,74.00,66.00,21.00,9.00,76.00,24.00,83.00,67.00,37.00,24.00,75.00,76.00,143.86,0",
						"22,95.00,57.00,74.00,34.00,33.00,42.00,60.00,91.00,71.00,49.00,4.00,24.00,81.00,32.00,151.63,0",
						"23,14.00,73.00,49.00,36.00,19.00,0.00,82.00,32.00,43.00,68.00,90.00,78.00,0.00,95.00,178.47,0",
						"24,4.00,9.00,11.00,60.00,43.00,76.00,4.00,45.00,27.00,50.00,36.00,1.00,64.00,60.00,135.88,0",
						"25,16.70,2.82,3.45,18.83,13.50,24.36,1.66,29.57,8.47,15.69,11.30,0.31,20.61,19.41,59.06,0",
						"26,20.69,0.89,1.08,5.91,4.24,8.15,0.92,24.73,2.66,4.93,3.55,0.10,7.00,6.68,18.58,0",
						"27,21.94,0.28,0.34,1.86,1.33,3.06,0.69,23.21,0.83,1.55,1.11,0.03,2.72,2.51,5.67,0",
						"28,22.34,0.09,0.11,0.58,0.42,1.46,0.58,23.19,0.26,0.49,0.35,0.01,1.62,1.74,1.68,0",
						"29,22.46,0.03,0.03,0.18,0.13,0.95,0.54,23.18,0.08,0.15,0.11,0.00,1.27,1.49,0.66,1",
						"30,22.50,0.01,0.01,0.06,0.04,0.80,0.53,23.18,0.02,0.05,0.03,0.00,1.16,1.42,7.64,0",
						"31,14.79,0.00,0.00,0.02,0.01,0.70,0.52,15.00,0.01,0.01,0.01,0.00,0.97,1.06,7.44,1",
						"32,12.33,0.00,0.00,0.01,0.00,0.67,0.51,12.39,0.00,0.00,0.00,0.00,0.91,0.95,130.52,1",
						"33,69.00,5.00,28.00,58.00,48.00,70.00,75.00,81.00,71.00,68.00,11.00,27.00,67.00,19.00,183.24,0",
						"34,90.00,99.00,65.00,92.00,57.00,4.00,59.00,13.00,17.00,69.00,38.00,90.00,4.00,20.00,151.19,0",
						"35,66.00,67.00,12.00,34.00,81.00,19.00,86.00,85.00,26.00,53.00,21.00,63.00,14.00,11.00,137.64,0",
						"36,38.00,47.00,43.00,94.00,99.00,86.00,85.00,64.00,64.00,88.00,46.00,5.00,6.00,4.00,150.15,0",
						"37,50.00,44.00,19.00,10.00,70.00,81.00,72.00,4.00,54.00,5.00,14.00,54.00,59.00,62.00,163.78,0",
						"38,96.00,8.00,60.00,90.00,58.00,40.00,33.00,35.00,63.00,5.00,85.00,97.00,5.00,82.00,147.61,0",
						"39,37.00,59.00,5.00,80.00,54.00,51.00,6.00,88.00,64.00,58.00,72.00,61.00,13.00,53.00,142.25,0",
						"40,86.00,59.00,77.00,52.00,69.00,97.00,16.00,72.00,56.00,88.00,63.00,54.00,40.00,1.00,145.20,0",
						"41,12.00,2.00,13.00,43.00,84.00,73.00,44.00,59.00,91.00,41.00,69.00,19.00,54.00,20.00,155.48,0",
						"42,52.00,89.00,98.00,21.00,31.00,30.00,25.00,47.00,23.00,37.00,7.00,14.00,96.00,30.00,166.86,0",
						"43,23.00,76.00,40.00,93.00,11.00,29.00,92.00,24.00,83.00,47.00,74.00,90.00,28.00,57.00,170.45,0",
						"44,87.00,49.00,86.00,11.00,37.00,83.00,56.00,87.00,17.00,77.00,36.00,83.00,78.00,69.00,159.30,0",
						"45,48.00,44.00,26.00,82.00,79.00,56.00,26.00,94.00,74.00,60.00,26.00,84.00,41.00,19.00,169.16,0",
						"46,28.00,28.00,94.00,31.00,13.00,80.00,90.00,5.00,98.00,68.00,16.00,9.00,32.00,78.00,146.07,0",
						"47,52.00,29.00,15.00,65.00,8.00,19.00,61.00,37.00,77.00,54.00,19.00,4.00,0.00,56.00,127.65,0",
						"48,3.00,3.00,44.00,52.00,76.00,47.00,85.00,14.00,75.00,27.00,44.00,69.00,75.00,56.00,148.18,0",
						"49,33.00,57.00,15.00,60.00,39.00,89.00,37.00,56.00,58.00,37.00,99.00,21.00,43.00,23.00,144.22,0",
						"50,74.00,2.00,41.00,65.00,90.00,37.00,27.00,87.00,52.00,91.00,8.00,64.00,9.00,6.00,155.02,0",
						"51,78.00,16.00,72.00,50.00,44.00,4.00,32.00,52.00,71.00,74.00,44.00,39.00,75.00,38.00,117.05,0",
						"52,82.00,40.00,23.00,98.00,19.00,21.00,10.00,15.00,20.00,34.00,38.00,62.00,23.00,90.00,141.96,0",
						"53,55.00,23.00,86.00,17.00,2.00,16.00,18.00,59.00,36.00,26.00,21.00,4.00,82.00,20.00,147.87,0",
						"54,36.00,54.00,26.00,12.00,79.00,77.00,91.00,20.00,58.00,9.00,27.00,18.00,69.00,51.00,158.39,0",
						"55,65.00,9.00,46.00,30.00,51.00,88.00,71.00,89.00,83.00,89.00,24.00,98.00,22.00,67.00,178.88,0",
						"56,35.85,2.82,14.44,9.42,16.01,28.13,22.69,43.38,26.05,27.93,7.53,30.76,7.43,21.61,100.12,0",
						"57,26.70,0.89,4.53,2.96,5.02,9.34,7.52,29.07,8.18,8.77,2.36,9.65,2.86,7.37,31.45,0",
						"58,23.83,0.28,1.42,0.93,1.58,3.43,2.76,24.57,2.57,2.75,0.74,3.03,1.42,2.72,9.84,0",
						"59,22.93,0.09,0.45,0.29,0.49,1.58,1.23,23.62,0.81,0.86,0.23,0.95,1.21,1.81,3.07,0",
						"60,22.64,0.03,0.14,0.09,0.15,0.99,0.74,23.31,0.24,0.26,0.07,0.29,1.15,1.51,1.11,0",
						"61,23.01,0.01,0.04,0.03,0.05,0.82,0.58,22.77,0.08,0.08,0.02,0.09,1.24,1.59,3.33,1",
						"62,14.80,0.00,0.01,0.01,0.01,0.69,0.54,14.81,0.02,0.03,0.01,0.03,0.94,0.91,9.43,1",
						"63,12.33,0.00,0.00,0.00,0.00,0.67,0.52,12.34,0.01,0.01,0.00,0.01,0.90,0.90,4.30,1",
						"64,12.05,0.00,0.00,0.00,0.00,0.65,0.51,4.33,0.00,0.00,0.00,0.00,0.31,0.29,53.14,1",
						"65,21.00,79.00,14.00,39.00,9.00,24.00,5.00,6.00,32.00,88.00,6.00,17.00,47.00,49.00,160.25,0",
						"66,97.00,50.00,19.00,38.00,92.00,28.00,85.00,40.00,40.00,83.00,56.00,15.00,66.00,36.00,142.92,0",
						"67,34.00,13.00,86.00,8.00,18.00,19.00,99.00,55.00,27.00,47.00,1.00,55.00,59.00,25.00,154.93,0",
						"68,25.00,7.00,97.00,53.00,50.00,93.00,4.00,31.00,97.00,40.00,40.00,15.00,74.00,25.00,158.14,0",
						"69,71.00,92.00,66.00,8.00,88.00,44.00,2.00,32.00,57.00,73.00,2.00,19.00,56.00,7.00,150.97,0",
						"70,59.00,55.00,48.00,90.00,54.00,35.00,41.00,27.00,61.00,10.00,46.00,32.00,46.00,46.00,124.94,0",
						"71,4.00,13.00,40.00,68.00,43.00,63.00,74.00,37.00,0.00,7.00,30.00,26.00,98.00,22.00,167.75,0",
						"72,85.00,85.00,91.00,48.00,61.00,7.00,32.00,92.00,22.00,5.00,81.00,16.00,23.00,75.00,164.80,0",
						"73,26.00,46.00,41.00,28.00,83.00,7.00,77.00,65.00,15.00,11.00,18.00,61.00,73.00,11.00,146.72,0",
						"74,34.00,98.00,52.00,90.00,65.00,11.00,72.00,63.00,29.00,34.00,38.00,32.00,26.00,33.00,129.52,0",
						"75,96.00,32.00,35.00,36.00,27.00,65.00,79.00,89.00,54.00,40.00,21.00,80.00,68.00,42.00,164.45,0",
						"76,9.00,14.00,47.00,7.00,94.00,6.00,56.00,45.00,54.00,95.00,75.00,4.00,47.00,62.00,171.96,0",
						"77,2.00,9.00,41.00,7.00,2.00,30.00,45.00,98.00,11.00,37.00,63.00,93.00,2.00,53.00,146.47,0",
						"78,68.00,77.00,61.00,42.00,40.00,59.00,54.00,55.00,87.00,64.00,61.00,39.00,4.00,52.00,133.65,0",
						"79,67.00,1.00,49.00,97.00,33.00,2.00,50.00,88.00,83.00,14.00,66.00,33.00,18.00,66.00,141.48,0",
						"80,63.00,68.00,57.00,33.00,43.00,79.00,67.00,56.00,99.00,20.00,34.00,16.00,92.00,37.00,130.73,0",
						"81,83.00,80.00,6.00,15.00,86.00,81.00,97.00,31.00,43.00,59.00,56.00,10.00,91.00,76.00,132.47,0",
						"82,64.00,37.00,37.00,96.00,73.00,47.00,92.00,76.00,21.00,95.00,82.00,36.00,37.00,97.00,144.63,0",
						"83,75.00,13.00,94.00,52.00,72.00,12.00,81.00,90.00,11.00,89.00,50.00,81.00,55.00,23.00,144.32,0",
						"84,38.99,4.08,29.50,16.32,22.60,4.21,25.77,35.97,3.45,27.93,15.69,25.42,17.68,7.50,100.63,0",
						"85,27.69,1.28,9.26,5.12,7.09,2.05,8.97,19.02,1.08,8.77,4.93,7.98,6.37,3.03,52.64,0",
						"86,24.14,0.40,2.91,1.61,2.23,1.56,4.03,21.42,0.34,2.75,1.55,2.50,2.45,1.30,52.30,0",
						"87,23.03,0.13,0.91,0.50,0.70,0.86,1.57,22.03,0.11,0.86,0.49,0.79,1.21,0.76,59.98,0",
						"88,22.68,0.04,0.29,0.16,0.22,0.78,0.90,22.36,0.03,0.27,0.15,0.25,0.91,0.82,18.85,0",
						"89,22.57,0.01,0.09,0.05,0.07,0.74,0.84,22.47,0.01,0.09,0.05,0.08,0.73,0.61,5.96,1",
						"90,22.53,0.00,0.03,0.02,0.02,0.74,0.62,22.50,0.00,0.03,0.01,0.02,0.77,0.62,1.96,1",
						"91,22.52,0.00,0.01,0.00,0.01,0.69,0.55,22.51,0.00,0.01,0.00,0.01,0.73,0.65,1.14,1",
						"92,22.97,0.00,0.00,0.00,0.00,0.72,0.53,22.52,0.00,0.00,0.00,0.00,1.11,1.32,4.32,1",
						"93,23.12,0.00,0.00,0.00,0.00,0.74,0.52,22.52,0.00,0.00,0.00,0.00,1.23,1.53,0.38,1",
						"94,23.16,0.00,0.00,0.00,0.00,0.74,0.51,22.52,0.00,0.00,0.00,0.00,1.26,1.60,11.32,1",
						"95,15.45,0.00,0.00,0.00,0.00,0.67,0.51,7.52,0.00,0.00,0.00,0.00,0.42,0.51,9.36,1",
						"96,12.99,0.00,0.00,0.00,0.00,0.65,0.50,2.74,0.00,0.00,0.00,0.00,0.15,0.16,81.99,1",
						"97,73.00,35.00,1.00,99.00,60.00,98.00,7.00,75.00,66.00,61.00,77.00,61.00,36.00,70.00,184.64,0",
						"98,83.00,1.00,4.00,34.00,51.00,63.00,33.00,42.00,62.00,93.00,10.00,43.00,33.00,6.00,138.48,0",
						"99,83.00,70.00,59.00,51.00,8.00,88.00,81.00,14.00,91.00,68.00,97.00,63.00,40.00,17.00,149.38,0",
						"100,86.00,93.00,17.00,32.00,80.00,81.00,8.00,43.00,84.00,75.00,85.00,45.00,54.00,86.00,146.18,0",
						"101,80.00,54.00,54.00,81.00,53.00,82.00,15.00,19.00,16.00,31.00,79.00,79.00,88.00,88.00,154.44,0",
						"102,97.00,27.00,44.00,57.00,32.00,3.00,36.00,40.00,51.00,99.00,94.00,29.00,75.00,34.00,141.76,0",
						"103,96.00,3.00,57.00,9.00,92.00,52.00,11.00,19.00,91.00,79.00,59.00,75.00,82.00,8.00,163.98,0",
						"104,73.00,93.00,83.00,1.00,17.00,74.00,63.00,61.00,24.00,76.00,14.00,51.00,85.00,85.00,174.92,0",
						"105,9.00,92.00,77.00,79.00,24.00,88.00,8.00,57.00,87.00,11.00,51.00,46.00,26.00,69.00,175.58,0",
						"106,39.00,53.00,38.00,33.00,0.00,0.00,88.00,44.00,59.00,85.00,61.00,16.00,50.00,74.00,155.46,0",
						"107,0.00,84.00,65.00,76.00,82.00,20.00,42.00,1.00,0.00,29.00,2.00,59.00,56.00,76.00,161.15,0",
						"108,76.00,1.00,39.00,94.00,55.00,13.00,7.00,21.00,4.00,24.00,32.00,52.00,38.00,75.00,142.89,0",
						"109,37.00,4.00,13.00,55.00,44.00,23.00,35.00,67.00,0.00,64.00,6.00,97.00,12.00,49.00,136.70,0",
						"110,36.00,75.00,96.00,43.00,92.00,96.00,72.00,21.00,60.00,37.00,37.00,12.00,68.00,5.00,165.84,0",
						"111,77.00,1.00,43.00,97.00,31.00,99.00,3.00,13.00,43.00,93.00,83.00,79.00,13.00,14.00,149.07,0",
						"112,88.00,20.00,52.00,61.00,4.00,96.00,74.00,76.00,71.00,88.00,75.00,43.00,77.00,6.00,111.18,0",
						"113,66.00,49.00,58.00,72.00,24.00,68.00,52.00,27.00,60.00,91.00,70.00,34.00,98.00,25.00,126.27,0",
						"114,26.00,48.00,61.00,20.00,61.00,55.00,99.00,4.00,20.00,39.00,40.00,63.00,95.00,47.00,152.07,0",
						"115,23.61,15.07,19.15,6.28,19.15,17.87,31.70,8.98,6.28,12.24,12.55,19.77,29.95,14.85,107.05,0",
						"116,22.86,4.73,6.01,1.97,6.01,6.66,11.33,18.72,1.97,3.84,3.94,6.21,9.55,4.75,32.82,0",
						"117,22.62,1.48,1.89,0.62,1.89,3.01,4.77,21.33,0.62,1.21,1.24,1.95,3.44,1.84,10.10,0",
						"118,22.55,0.45,0.57,0.19,0.57,1.85,2.68,22.16,0.19,0.37,0.38,0.59,1.50,0.92,3.24,0",
						"119,22.53,0.14,0.18,0.06,0.18,1.50,2.05,22.40,0.06,0.11,0.12,0.19,0.92,0.64,1.37,0",
						"120,22.52,0.04,0.06,0.02,0.06,0.96,1.20,22.48,0.02,0.04,0.04,0.06,0.73,0.55,0.63,1",
						"121,22.52,0.01,0.02,0.01,0.02,0.79,0.93,22.51,0.01,0.01,0.01,0.02,0.67,0.53,0.23,1",
						"122,22.52,0.00,0.01,0.00,0.01,0.74,0.85,22.51,0.00,0.00,0.00,0.01,0.66,0.52,0.39,1",
						"123,23.02,0.00,0.00,0.00,0.00,0.74,0.55,22.52,0.00,0.00,0.00,0.00,1.12,1.30,8.01,1",
						"124,22.67,0.00,0.00,0.00,0.00,1.06,1.28,7.52,0.00,0.00,0.00,0.00,0.69,1.02,12.58,1",
						"125,22.52,0.00,0.00,0.00,0.00,0.71,0.52,22.97,0.00,0.00,0.00,0.00,1.12,1.26,13.74,1",
						"126,15.25,0.00,0.00,0.00,0.00,0.66,0.51,7.66,0.00,0.00,0.00,0.00,0.37,0.40,14.05,1",
						"127,12.93,0.00,0.00,0.00,0.00,0.64,0.51,2.79,0.00,0.00,0.00,0.00,0.14,0.13,5.39,1",
						"128,14.57,0.00,0.00,0.00,0.00,0.66,0.51,8.14,0.00,0.00,0.00,0.00,0.63,0.63,86.79,1",
						"129,97.00,21.00,89.00,17.00,96.00,3.00,88.00,29.00,83.00,76.00,58.00,56.00,52.00,87.00,184.11,0",
						"130,76.00,76.00,82.00,55.00,92.00,41.00,87.00,88.00,31.00,99.00,16.00,20.00,42.00,32.00,145.63,0",
						"131,95.00,10.00,67.00,38.00,18.00,58.00,84.00,17.00,16.00,37.00,36.00,64.00,84.00,43.00,142.59,0",
						"132,95.00,11.00,19.00,74.00,9.00,54.00,55.00,97.00,63.00,24.00,79.00,67.00,65.00,64.00,150.67,0",
						"133,90.00,46.00,39.00,0.00,27.00,89.00,99.00,32.00,7.00,70.00,85.00,14.00,34.00,8.00,147.92,0",
						"134,69.00,71.00,8.00,29.00,15.00,83.00,49.00,44.00,17.00,13.00,91.00,87.00,10.00,47.00,143.94,0",
						"135,47.00,28.00,14.00,34.00,53.00,18.00,69.00,93.00,24.00,99.00,55.00,40.00,51.00,28.00,149.36,0",
						"136,42.00,24.00,13.00,85.00,12.00,41.00,15.00,44.00,51.00,1.00,65.00,1.00,70.00,16.00,166.09,0",
						"137,79.00,19.00,11.00,13.00,0.00,41.00,71.00,37.00,84.00,48.00,2.00,82.00,86.00,70.00,173.74,0",
						"138,39.00,31.00,64.00,26.00,72.00,87.00,35.00,68.00,88.00,51.00,88.00,38.00,46.00,18.00,137.61,0",
						"139,73.00,79.00,14.00,44.00,62.00,51.00,6.00,35.00,84.00,46.00,63.00,26.00,27.00,92.00,122.54,0",
						"140,52.00,47.00,48.00,26.00,43.00,49.00,38.00,58.00,99.00,59.00,71.00,11.00,29.00,93.00,118.19,0",
						"141,27.00,8.00,15.00,25.00,40.00,52.00,36.00,13.00,89.00,69.00,13.00,47.00,36.00,46.00,139.09,0",
						"142,38.00,61.00,36.00,90.00,64.00,73.00,12.00,10.00,16.00,6.00,98.00,46.00,22.00,21.00,144.19,0",
						"143,56.00,60.00,23.00,78.00,57.00,78.00,33.00,33.00,42.00,80.00,36.00,74.00,3.00,43.00,124.00,0",
						"144,26.00,23.00,60.00,77.00,1.00,86.00,69.00,29.00,57.00,22.00,85.00,54.00,65.00,13.00,133.67,0",
						"145,23.61,7.22,18.83,24.17,0.31,28.04,23.04,25.01,17.89,6.90,26.68,16.95,20.55,4.17,99.07,0",
						"146,22.86,2.27,5.91,7.59,0.10,9.72,8.44,23.30,5.61,2.17,8.37,5.32,6.90,1.66,81.67,0",
						"147,22.62,0.71,1.86,2.38,0.03,4.10,4.03,23.22,1.76,0.68,2.63,1.67,2.31,0.61,20.65,0",
						"148,22.55,0.22,0.58,0.75,0.01,2.21,2.48,22.74,0.55,0.21,0.82,0.52,1.17,0.54,6.51,1",
						"149,22.53,0.07,0.18,0.23,0.00,1.60,1.98,22.58,0.17,0.06,0.25,0.16,0.81,0.52,2.14,1",
						"150,22.52,0.02,0.05,0.07,0.00,1.18,1.36,22.52,0.05,0.02,0.08,0.05,0.75,0.59,2.69,1",
						"151,22.52,0.01,0.02,0.02,0.00,0.86,0.98,22.52,0.02,0.01,0.02,0.02,0.68,0.54,0.53,1",
						"152,22.52,0.00,0.01,0.01,0.00,0.76,0.86,22.52,0.00,0.00,0.01,0.00,0.66,0.52,0.21,1",
						"153,22.52,0.00,0.00,0.00,0.00,0.73,0.65,22.52,0.00,0.00,0.00,0.00,0.68,0.54,0.20,1",
						"154,22.52,0.00,0.00,0.00,0.00,0.72,0.76,22.52,0.00,0.00,0.00,0.00,0.66,0.52,7.56,1",
						"155,22.52,0.00,0.00,0.00,0.00,1.06,1.35,7.52,0.00,0.00,0.00,0.00,0.54,0.77,9.91,1",
						"156,22.52,0.00,0.00,0.00,0.00,1.17,1.54,2.74,0.00,0.00,0.00,0.00,0.51,0.85,3.99,1",
						"157,22.52,0.00,0.00,0.00,0.00,1.20,1.59,1.32,0.00,0.00,0.00,0.00,0.50,0.88,11.47,1",
						"158,23.16,0.00,0.00,0.00,0.00,0.74,0.51,22.52,0.00,0.00,0.00,0.00,1.26,1.59,19.09,1",
						"159,15.45,0.00,0.00,0.00,0.00,0.67,0.51,7.52,0.00,0.00,0.00,0.00,0.42,0.51,10.21,1",
						"160,12.99,0.00,0.00,0.00,0.00,0.65,0.50,2.74,0.00,0.00,0.00,0.00,0.15,0.16,68.03,1",
						"161,42.00,37.00,58.00,14.00,7.00,64.00,96.00,72.00,45.00,56.00,80.00,42.00,30.00,19.00,175.15,0",
						"162,65.00,44.00,97.00,90.00,90.00,25.00,3.00,46.00,27.00,79.00,90.00,15.00,87.00,27.00,157.71,0",
						"163,57.00,83.00,23.00,74.00,71.00,98.00,85.00,38.00,91.00,17.00,86.00,62.00,81.00,62.00,157.91,0",
						"164,90.00,35.00,67.00,84.00,94.00,28.00,99.00,84.00,92.00,17.00,4.00,20.00,31.00,18.00,158.10,0",
						"165,72.00,40.00,86.00,62.00,40.00,55.00,26.00,77.00,19.00,79.00,72.00,7.00,30.00,21.00,147.60,0",
						"166,86.00,20.00,1.00,91.00,30.00,89.00,79.00,24.00,5.00,31.00,88.00,16.00,33.00,84.00,150.26,0",
						"167,97.00,53.00,58.00,51.00,14.00,54.00,28.00,25.00,75.00,91.00,46.00,62.00,40.00,2.00,148.31,0",
						"168,36.00,81.00,98.00,89.00,62.00,38.00,11.00,12.00,20.00,70.00,95.00,38.00,98.00,52.00,135.98,0",
						"169,73.00,36.00,89.00,58.00,77.00,46.00,9.00,86.00,24.00,39.00,39.00,12.00,67.00,48.00,155.19,0",
						"170,34.00,71.00,42.00,72.00,89.00,73.00,8.00,67.00,88.00,59.00,43.00,89.00,32.00,24.00,125.99,0",
						"171,49.00,2.00,34.00,9.00,70.00,41.00,4.00,3.00,38.00,98.00,43.00,30.00,55.00,65.00,152.87,0",
						"172,57.00,60.00,48.00,33.00,10.00,6.00,30.00,89.00,87.00,9.00,40.00,10.00,39.00,0.00,167.82,0",
						"173,90.00,54.00,73.00,53.00,98.00,69.00,36.00,79.00,30.00,91.00,18.00,48.00,82.00,42.00,160.63,0",
						"174,96.86,16.95,22.91,16.63,30.76,90.27,12.20,40.24,9.42,28.56,5.65,15.07,26.64,13.93,128.61,0",
						"175,10.00,27.00,75.00,68.00,99.00,75.00,65.00,44.00,26.00,19.00,68.00,1.00,18.00,42.00,160.14,0",
						"176,71.75,8.47,23.54,21.34,31.07,92.15,21.30,29.26,8.16,5.96,21.34,0.31,6.56,13.93,114.83,0",
						"177,21.28,2.66,7.39,6.70,9.75,8.64,8.05,24.78,2.56,1.87,6.70,0.10,2.27,4.52,89.96,0",
						"178,75.29,0.83,2.32,2.10,3.06,71.32,3.42,23.23,0.80,0.59,2.10,0.03,1.62,2.16,72.78,0",
						"179,22.40,0.25,0.70,0.64,0.93,2.20,2.59,23.33,0.24,0.18,0.64,0.01,0.41,0.55,54.69,1",
						"180,22.48,0.08,0.22,0.20,0.29,1.38,1.60,22.58,0.08,0.06,0.20,0.00,0.73,0.68,4.03,1",
						"181,22.50,0.02,0.07,0.06,0.09,1.35,1.71,22.54,0.02,0.02,0.06,0.00,0.68,0.57,4.14,1",
						"182,22.51,0.01,0.02,0.02,0.03,0.96,0.97,29.79,0.01,0.01,0.02,0.00,1.17,1.38,6.16,1",
						"183,22.52,0.00,0.01,0.01,0.01,0.91,0.98,22.52,0.00,0.00,0.01,0.00,0.74,0.59,4.50,1",
						"184,22.52,0.00,0.00,0.00,0.00,0.78,0.86,22.52,0.00,0.00,0.00,0.00,0.68,0.54,2.70,1",
						"185,22.52,0.00,0.00,0.00,0.00,0.74,0.82,22.52,0.00,0.00,0.00,0.00,0.66,0.52,4.64,1",
						"186,22.52,0.00,0.00,0.00,0.00,1.06,1.37,7.52,0.00,0.00,0.00,0.00,0.54,0.77,12.46,1",
						"187,22.52,0.00,0.00,0.00,0.00,1.17,1.54,2.74,0.00,0.00,0.00,0.00,0.51,0.85,4.83,1",
						"188,22.52,0.00,0.00,0.00,0.00,0.67,0.53,7.52,0.00,0.00,0.00,0.00,0.32,0.25,4.93,1",
						"189,22.52,0.00,0.00,0.00,0.00,1.05,1.29,2.74,0.00,0.00,0.00,0.00,0.44,0.69,2.32,1",
						"190,22.52,0.00,0.00,0.00,0.00,1.16,1.51,1.32,0.00,0.00,0.00,0.00,0.48,0.83,13.82,1",
						"191,22.52,0.00,0.00,0.00,0.00,0.64,0.51,11.93,0.00,0.00,0.00,0.00,0.61,0.51,6.50,1",
						"192,15.25,0.00,0.00,0.00,0.00,0.64,0.50,4.20,0.00,0.00,0.00,0.00,0.22,0.17,79.11,1",
						"193,46.00,74.00,25.00,98.00,69.00,56.00,0.00,31.00,78.00,70.00,63.00,55.00,46.00,71.00,174.65,0",
						"194,28.00,77.00,83.00,78.00,33.00,3.00,62.00,11.00,62.00,22.00,80.00,35.00,97.00,82.00,148.31,0",
						"195,38.00,43.00,69.00,22.00,57.00,76.00,74.00,42.00,77.00,89.00,20.00,73.00,47.00,34.00,146.11,0",
						"196,86.00,85.00,2.00,54.00,93.00,74.00,54.00,9.00,14.00,16.00,7.00,9.00,20.00,49.00,153.33,0",
						"197,65.00,47.00,37.00,3.00,34.00,28.00,77.00,10.00,2.00,1.00,4.00,15.00,56.00,16.00,161.21,0",
						"198,93.00,38.00,41.00,30.00,51.00,34.00,16.00,87.00,32.00,59.00,89.00,61.00,10.00,31.00,154.48,0",
						"199,32.00,54.00,85.00,93.00,55.00,16.00,49.00,28.00,72.00,30.00,20.00,57.00,80.00,45.00,152.06,0",
						"200,63.00,69.00,36.00,81.00,79.00,82.00,43.00,58.00,38.00,97.00,90.00,59.00,90.00,76.00,141.48,0",
						"201,96.00,86.00,29.00,1.00,77.00,70.00,98.00,7.00,25.00,51.00,12.00,85.00,91.00,13.00,178.94,0",
						"202,36.00,55.00,92.00,28.00,99.00,97.00,7.00,58.00,15.00,39.00,62.00,78.00,31.00,45.00,135.77,0",
						"203,83.00,9.00,41.00,67.00,74.00,56.00,87.00,19.00,78.00,22.00,86.00,55.00,76.00,64.00,168.92,0",
						"204,59.00,35.00,86.00,15.00,77.00,87.00,2.00,46.00,8.00,78.00,91.00,89.00,32.00,23.00,168.75,0",
						"205,87.13,10.99,26.99,4.71,24.17,95.92,1.52,29.89,2.51,24.48,28.56,27.93,10.95,7.96,101.65,0",
						"206,96.09,3.33,8.19,1.43,7.33,98.76,1.37,24.75,0.76,7.43,8.67,8.48,4.24,3.17,31.85,0",
						"207,98.77,1.05,2.57,0.45,2.30,99.61,1.33,23.22,0.24,2.33,2.72,2.66,2.24,1.74,55.62,0",
						"208,99.63,0.32,0.78,0.14,0.70,99.88,1.31,22.73,0.07,0.71,0.83,0.81,1.60,1.28,17.45,0",
						"209,99.88,0.10,0.24,0.04,0.22,99.96,1.31,22.58,0.02,0.22,0.26,0.25,1.41,1.15,30.98,1",
						"210,99.96,0.03,0.07,0.01,0.07,99.99,1.31,22.54,0.01,0.07,0.08,0.08,1.35,1.10,9.72,1",
						"211,99.99,0.01,0.02,0.00,0.02,100.00,1.31,22.52,0.00,0.02,0.02,0.02,1.33,1.09,59.60,1",
						"212,29.89,0.00,0.01,0.00,0.01,10.90,1.94,23.12,0.00,0.01,0.01,0.01,0.32,0.22,41.12,1",
						"213,24.83,0.00,0.00,0.00,0.00,3.96,1.04,29.98,0.00,0.00,0.00,0.00,1.06,1.27,7.82,1",
						"214,23.22,0.00,0.00,0.00,0.00,1.75,0.75,32.16,0.00,0.00,0.00,0.00,1.29,1.60,2.20,1",
						"215,22.74,0.00,0.00,0.00,0.00,1.09,0.66,32.81,0.00,0.00,0.00,0.00,1.36,1.70,3.26,1",
						"216,22.59,0.00,0.00,0.00,0.00,0.80,0.52,33.02,0.00,0.00,0.00,0.00,0.94,0.78,4.97,1",
						"217,22.54,0.00,0.00,0.00,0.00,0.74,0.72,25.81,0.00,0.00,0.00,0.00,0.74,0.60,5.28,1",
						"218,22.52,0.00,0.00,0.00,0.00,0.71,0.63,22.52,0.00,0.00,0.00,0.00,0.67,0.52,10.99,1",
						"219,22.52,0.00,0.00,0.00,0.00,1.05,1.31,7.52,0.00,0.00,0.00,0.00,0.55,0.78,10.85,1",
						"220,22.52,0.00,0.00,0.00,0.00,1.16,1.52,2.74,0.00,0.00,0.00,0.00,0.51,0.85,4.28,0",
						"221,22.52,0.00,0.00,0.00,0.00,1.20,1.59,1.32,0.00,0.00,0.00,0.00,0.50,0.88,11.68,1",
						"222,22.52,0.00,0.00,0.00,0.00,0.63,0.49,23.16,0.00,0.00,0.00,0.00,0.76,0.60,13.63,1",
						"223,22.52,0.00,0.00,0.00,0.00,0.65,0.51,12.43,0.00,0.00,0.00,0.00,0.65,0.54,7.33,1",
						"224,22.52,0.00,0.00,0.00,0.00,0.65,0.51,11.61,0.00,0.00,0.00,0.00,0.60,0.50,62.66,1",
						"225,27.00,25.00,64.00,20.00,20.00,48.00,46.00,83.00,16.00,74.00,87.00,10.00,56.00,7.00,148.64,0",
						"226,19.00,59.00,49.00,32.00,1.00,73.00,66.00,76.00,9.00,47.00,35.00,33.00,61.00,19.00,124.83,0",
						"227,64.00,42.00,83.00,55.00,59.00,75.00,93.00,56.00,73.00,45.00,72.00,8.00,92.00,5.00,149.32,0",
						"228,55.00,30.00,66.00,27.00,92.00,32.00,10.00,84.00,9.00,37.00,60.00,97.00,29.00,41.00,173.26,0",
						"229,3.00,91.00,2.00,26.00,15.00,61.00,54.00,60.00,98.00,89.00,66.00,18.00,32.00,92.00,200.47,0",
						"230,39.00,36.00,74.00,3.00,89.00,29.00,95.00,34.00,7.00,38.00,59.00,65.00,20.00,16.00,152.63,0",
						"231,37.00,46.00,44.00,4.00,64.00,51.00,42.00,66.00,3.00,37.00,66.00,13.00,9.00,30.00,133.20,0",
						"232,32.00,28.00,57.00,92.00,3.00,80.00,87.00,46.00,57.00,46.00,67.00,56.00,12.00,49.00,141.83,0",
						"233,27.00,63.00,58.00,83.00,67.00,66.00,14.00,57.00,50.00,89.00,82.00,13.00,28.00,61.00,155.66,0",
						"234,2.00,31.00,99.00,69.00,95.00,60.00,24.00,41.00,57.00,27.00,94.00,92.00,2.00,17.00,151.47,0",
						"235,34.00,80.00,28.00,17.00,2.00,41.00,7.00,61.00,48.00,34.00,8.00,44.00,0.00,17.00,162.87,0",
						"236,79.29,25.11,8.79,5.34,0.63,81.48,3.09,34.60,15.07,10.67,2.51,13.81,0.91,6.08,112.64,0",
						"237,93.71,7.62,2.67,1.62,0.19,94.38,1.85,26.18,4.57,3.24,0.76,4.19,1.19,2.60,35.48,0",
						"238,98.03,2.39,0.84,0.51,0.06,98.24,1.48,23.67,1.44,1.02,0.24,1.32,1.28,1.56,10.73,1",
						"239,99.40,0.73,0.25,0.15,0.02,99.46,1.36,22.87,0.44,0.31,0.07,0.40,1.31,1.23,3.38,0",
						"240,99.81,0.23,0.08,0.05,0.01,99.83,1.32,22.63,0.14,0.10,0.02,0.13,1.32,1.13,1.02,1",
						"241,99.94,0.07,0.02,0.01,0.00,99.95,1.31,22.55,0.04,0.03,0.01,0.04,1.32,1.10,0.32,0",
						"242,99.98,0.02,0.01,0.00,0.00,99.98,1.31,22.53,0.01,0.01,0.00,0.01,1.32,1.09,0.10,1",
						"243,99.99,0.01,0.00,0.00,0.00,100.00,1.31,22.52,0.00,0.00,0.00,0.00,1.32,1.08,21.70,1",
						"244,46.83,0.00,0.00,0.00,0.00,31.92,0.84,29.79,0.00,0.00,0.00,0.00,1.37,1.54,45.31,1",
						"245,29.90,0.00,0.00,0.00,0.00,10.24,0.69,32.10,0.00,0.00,0.00,0.00,1.39,1.69,14.97,1",
						"246,22.58,0.00,0.00,0.00,0.00,0.73,0.51,33.10,0.00,0.00,0.00,0.00,1.58,1.54,3.53,1",
						"247,22.54,0.00,0.00,0.00,0.00,0.77,0.59,33.11,0.00,0.00,0.00,0.00,1.45,1.69,0.22,1",
						"248,22.52,0.00,0.00,0.00,0.00,0.78,0.61,33.11,0.00,0.00,0.00,0.00,1.41,1.73,0.90,1",
						"249,22.52,0.00,0.00,0.00,0.00,0.73,0.50,33.11,0.00,0.00,0.00,0.00,0.72,0.54,2.33,1",
						"250,22.52,0.00,0.00,0.00,0.00,0.63,0.50,33.11,0.00,0.00,0.00,0.00,1.15,0.92,4.65,1",
						"251,22.52,0.00,0.00,0.00,0.00,0.63,0.49,26.30,0.00,0.00,0.00,0.00,0.89,0.70,12.52,1",
						"252,22.52,0.00,0.00,0.00,0.00,1.03,1.26,8.71,0.00,0.00,0.00,0.00,0.62,0.83,13.93,1",
						"253,22.52,0.00,0.00,0.00,0.00,0.64,0.50,23.21,0.00,0.00,0.00,0.00,0.69,0.61,9.36,1",
						"254,22.52,0.00,0.00,0.00,0.00,0.63,0.49,23.19,0.00,0.00,0.00,0.00,0.74,0.61,0.10,1",
						"255,22.52,0.00,0.00,0.00,0.00,0.63,0.49,23.18,0.00,0.00,0.00,0.00,0.76,0.61,6.14,1",
						"256,22.52,0.00,0.00,0.00,0.00,0.68,0.53,11.80,0.00,0.00,0.00,0.00,0.62,0.50,75.98,1",
						"257,20.00,93.00,57.00,49.00,77.00,36.00,4.00,92.00,30.00,99.00,8.00,35.00,44.00,98.00,185.24,0",
						"258,5.00,17.00,24.00,56.00,42.00,49.00,77.00,89.00,74.00,20.00,45.00,93.00,22.00,59.00,155.90,0",
						"259,76.00,25.00,36.00,73.00,38.00,32.00,0.00,61.00,35.00,4.00,31.00,44.00,17.00,89.00,152.93,0",
						"260,29.00,42.00,1.00,96.00,53.00,27.00,74.00,53.00,41.00,77.00,23.00,86.00,80.00,37.00,159.94,0",
						"261,89.00,78.00,71.00,48.00,22.00,34.00,87.00,7.00,13.00,7.00,40.00,87.00,90.00,27.00,157.28,0",
						"262,0.00,43.00,51.00,82.00,64.00,63.00,0.00,77.00,64.00,7.00,4.00,74.00,99.00,45.00,161.40,0",
						"263,53.00,18.00,5.00,48.00,62.00,96.00,9.00,10.00,60.00,0.00,34.00,37.00,6.00,12.00,159.48,0",
						"264,77.00,46.00,75.00,62.00,43.00,6.00,71.00,3.00,69.00,26.00,15.00,20.00,74.00,99.00,151.18,0",
						"265,93.00,44.00,36.00,12.00,59.00,10.00,82.00,56.00,31.00,21.00,38.00,3.00,52.00,29.00,141.14,0",
						"266,78.00,73.00,69.00,45.00,35.00,81.00,95.00,67.00,98.00,77.00,22.00,64.00,99.00,40.00,162.64,0",
						"267,76.00,38.00,73.00,84.00,22.00,72.00,79.00,2.00,13.00,61.00,29.00,2.00,76.00,48.00,151.73,0",
						"268,15.00,77.00,13.00,68.00,51.00,83.00,17.00,56.00,2.00,47.00,12.00,42.00,43.00,27.00,129.24,0",
						"269,73.32,24.17,4.08,21.34,16.01,94.66,6.23,33.03,0.63,14.75,3.77,13.18,14.40,9.22,75.27,0",
						"270,91.90,7.33,1.24,6.48,4.86,98.38,2.80,25.71,0.19,4.48,1.14,4.00,5.29,3.55,23.50,0",
						"271,97.46,2.30,0.39,2.03,1.52,99.49,1.78,23.52,0.06,1.41,0.36,1.26,2.57,1.86,7.17,1",
						"272,99.23,0.70,0.12,0.62,0.46,99.85,1.45,22.82,0.02,0.43,0.11,0.38,1.70,1.32,23.85,1",
						"273,99.76,0.22,0.04,0.19,0.15,99.95,1.35,22.61,0.01,0.13,0.03,0.12,1.44,1.16,29.22,1",
						"274,99.93,0.07,0.01,0.06,0.04,99.99,1.32,22.55,0.00,0.04,0.01,0.04,1.36,1.11,9.17,1",
						"275,99.98,0.02,0.00,0.02,0.01,100.00,1.31,22.53,0.00,0.01,0.00,0.01,1.33,1.09,55.93,1",
						"276,23.19,0.01,0.00,0.01,0.00,0.98,0.59,33.08,0.00,0.00,0.00,0.00,1.31,1.08,43.45,1",
						"277,22.73,0.00,0.00,0.00,0.00,0.85,0.61,33.10,0.00,0.00,0.00,0.00,1.37,1.54,3.80,1",
						"278,22.58,0.00,0.00,0.00,0.00,0.81,0.62,33.11,0.00,0.00,0.00,0.00,1.39,1.69,0.33,1",
						"279,22.54,0.00,0.00,0.00,0.00,0.79,0.62,33.11,0.00,0.00,0.00,0.00,1.39,1.73,0.54,1",
						"280,22.52,0.00,0.00,0.00,0.00,0.64,0.50,33.11,0.00,0.00,0.00,0.00,0.97,0.77,0.67,1",
						"281,22.52,0.00,0.00,0.00,0.00,0.70,0.50,33.11,0.00,0.00,0.00,0.00,0.78,0.59,0.13,1",
						"282,22.52,0.00,0.00,0.00,0.00,0.72,0.50,33.11,0.00,0.00,0.00,0.00,0.72,0.54,0.51,1",
						"283,22.52,0.00,0.00,0.00,0.00,0.63,0.49,33.11,0.00,0.00,0.00,0.00,1.23,0.97,3.59,1",
						"284,22.52,0.00,0.00,0.00,0.00,0.63,0.49,26.30,0.00,0.00,0.00,0.00,0.91,0.72,8.36,1",
						"285,22.52,0.00,0.00,0.00,0.00,0.63,0.49,24.13,0.00,0.00,0.00,0.00,0.81,0.64,1.48,1",
						"286,22.52,0.00,0.00,0.00,0.00,0.63,0.49,23.48,0.00,0.00,0.00,0.00,0.78,0.62,3.40,1",
						"287,22.52,0.00,0.00,0.00,0.00,0.72,0.57,15.55,0.00,0.00,0.00,0.00,0.86,0.66,9.70,1",
						"288,22.52,0.00,0.00,0.00,0.00,0.75,0.60,13.02,0.00,0.00,0.00,0.00,0.75,0.56,75.83,1",
						"289,88.00,79.00,27.00,8.00,25.00,87.00,60.00,53.00,96.00,14.00,38.00,83.00,35.00,77.00,179.98,0",
						"290,86.00,71.00,50.00,85.00,84.00,39.00,38.00,9.00,55.00,90.00,96.00,70.00,91.00,21.00,171.70,0",
						"291,75.00,0.00,83.00,27.00,36.00,91.00,21.00,49.00,99.00,15.00,66.00,76.00,54.00,30.00,138.22,0",
						"292,76.00,16.00,94.00,29.00,6.00,67.00,14.00,63.00,66.00,48.00,28.00,21.00,39.00,98.00,146.41,0",
						"293,99.00,26.00,86.00,97.00,35.00,39.00,59.00,27.00,25.00,38.00,48.00,95.00,86.00,65.00,146.04,0",
						"294,13.00,95.00,24.00,82.00,60.00,48.00,4.00,43.00,57.00,84.00,17.00,13.00,63.00,48.00,150.74,0",
						"295,94.00,25.00,90.00,84.00,43.00,27.00,24.00,8.00,84.00,86.00,58.00,17.00,72.00,12.00,151.41,0",
						"296,44.00,10.00,60.00,93.00,89.00,65.00,67.00,50.00,78.00,53.00,29.00,48.00,50.00,9.00,136.51,0",
						"297,56.00,36.00,75.00,35.00,37.00,29.00,16.00,83.00,64.00,90.00,30.00,0.00,54.00,5.00,130.51,0",
						"298,26.00,14.00,80.00,69.00,1.00,54.00,12.00,61.00,87.00,31.00,89.00,10.00,69.00,41.00,144.60,0",
						"299,89.00,83.00,90.00,67.00,63.00,60.00,2.00,61.00,11.00,16.00,26.00,53.00,21.00,64.00,154.69,0",
						"300,35.66,26.05,28.25,21.03,19.77,19.26,0.96,41.87,3.45,5.02,8.16,16.63,7.62,21.01,119.91,0",
						"301,26.64,8.18,8.87,6.60,6.21,6.50,0.66,35.86,1.08,1.58,2.56,5.22,2.99,7.21,71.15,0",
						"302,76.98,2.57,2.78,2.07,1.95,70.65,1.10,26.70,0.34,0.49,0.80,1.64,1.84,3.00,57.54,1",
						"303,93.01,0.78,0.84,0.63,0.59,91.09,1.25,23.79,0.10,0.15,0.24,0.50,1.48,1.67,57.35,1",
						"304,44.19,0.24,0.27,0.20,0.19,29.58,1.60,30.19,0.03,0.05,0.08,0.16,1.68,1.79,57.33,0",
						"305,28.63,0.07,0.08,0.06,0.06,9.99,1.72,32.22,0.01,0.01,0.02,0.05,1.75,1.83,57.51,1",
						"306,77.60,0.02,0.03,0.02,0.02,71.75,1.44,25.56,0.00,0.00,0.01,0.01,1.45,1.32,66.71,1",
						"307,40.26,0.01,0.01,0.01,0.01,22.96,0.80,30.74,0.00,0.00,0.00,0.00,1.31,1.09,51.91,1",
						"308,28.09,0.00,0.00,0.00,0.00,7.64,0.59,32.37,0.00,0.00,0.00,0.00,1.60,1.56,10.79,1",
						"309,24.21,0.00,0.00,0.00,0.00,2.76,0.53,32.89,0.00,0.00,0.00,0.00,1.69,1.71,3.31,0",
						"310,23.05,0.00,0.00,0.00,0.00,1.41,0.59,33.04,0.00,0.00,0.00,0.00,1.49,1.74,1.17,1",
						"311,22.68,0.00,0.00,0.00,0.00,0.91,0.51,33.09,0.00,0.00,0.00,0.00,1.02,0.90,0.76,1",
						"312,22.57,0.00,0.00,0.00,0.00,0.78,0.50,33.11,0.00,0.00,0.00,0.00,0.80,0.63,2.86,1",
						"313,22.53,0.00,0.00,0.00,0.00,0.75,0.50,33.11,0.00,0.00,0.00,0.00,0.73,0.55,0.40,1",
						"314,22.52,0.00,0.00,0.00,0.00,0.64,0.50,33.11,0.00,0.00,0.00,0.00,1.25,0.98,0.35,1",
						"315,22.52,0.00,0.00,0.00,0.00,0.63,0.50,33.11,0.00,0.00,0.00,0.00,1.24,0.98,0.01,1",
						"316,22.52,0.00,0.00,0.00,0.00,0.63,0.49,33.11,0.00,0.00,0.00,0.00,1.23,0.98,3.59,1",
						"317,22.52,0.00,0.00,0.00,0.00,0.63,0.49,26.30,0.00,0.00,0.00,0.00,0.91,0.72,6.01,1",
						"318,22.52,0.00,0.00,0.00,0.00,0.72,0.57,18.77,0.00,0.00,0.00,0.00,0.82,0.99,9.39,1",
						"319,22.52,0.00,0.00,0.00,0.00,0.65,0.51,29.07,0.00,0.00,0.00,0.00,1.12,1.00,9.51,1",
						"320,22.52,0.00,0.00,0.00,0.00,0.73,0.58,17.30,0.00,0.00,0.00,0.00,0.83,0.67,78.82,1",
						"321,90.00,63.00,14.00,66.00,66.00,2.00,88.00,63.00,54.00,47.00,6.00,90.00,63.00,48.00,171.47,0",
						"322,6.00,31.00,61.00,92.00,68.00,64.00,25.00,24.00,86.00,32.00,35.00,1.00,58.00,58.00,137.72,0",
						"323,8.00,10.00,58.00,54.00,94.00,99.00,51.00,39.00,85.00,2.00,44.00,13.00,92.00,53.00,118.97,0",
						"324,5.00,50.00,53.00,13.00,74.00,76.00,26.00,30.00,29.00,21.00,7.00,57.00,44.00,68.00,135.93,0",
						"325,90.00,71.00,98.00,40.00,94.00,71.00,46.00,99.00,29.00,27.00,41.00,5.00,53.00,24.00,153.70,0",
						"326,25.00,87.00,53.00,84.00,78.00,63.00,81.00,69.00,73.00,6.00,31.00,77.00,9.00,69.00,148.09,0",
						"327,38.00,5.00,81.00,49.00,77.00,79.00,53.00,34.00,14.00,4.00,29.00,55.00,33.00,62.00,133.69,0",
						"328,24.00,0.00,67.00,15.00,11.00,56.00,44.00,7.00,72.00,18.00,12.00,76.00,50.00,84.00,128.38,0",
						"329,11.00,81.00,43.00,32.00,69.00,76.00,46.00,35.00,93.00,61.00,28.00,96.00,58.00,21.00,147.16,0",
						"330,33.00,41.00,67.00,48.00,51.00,16.00,51.00,51.00,70.00,9.00,1.00,21.00,33.00,64.00,140.07,0",
						"331,55.00,81.00,70.00,83.00,55.00,93.00,93.00,3.00,92.00,2.00,77.00,8.00,53.00,61.00,158.24,0",
						"332,55.00,58.00,7.00,82.00,41.00,30.00,82.00,44.00,48.00,62.00,34.00,97.00,7.00,98.00,164.30,0",
						"333,24.99,18.20,2.20,25.74,12.87,9.84,26.07,36.53,15.07,19.46,10.67,30.44,3.23,31.68,100.77,0",
						"334,23.29,5.71,0.69,8.08,4.04,3.54,8.54,34.19,4.73,6.11,3.35,9.56,1.61,10.55,48.72,0",
						"335,22.31,1.79,0.22,2.54,1.27,2.10,3.89,33.45,1.48,1.92,1.05,3.00,1.72,4.58,54.77,0",
						"336,21.99,0.54,0.07,0.77,0.38,1.65,2.41,33.21,0.45,0.58,0.32,0.91,1.76,2.68,17.38,0",
						"337,22.50,0.17,0.02,0.24,0.12,1.27,1.67,33.14,0.14,0.18,0.10,0.29,1.29,1.33,5.57,1",
						"338,22.05,0.05,0.01,0.07,0.04,1.39,1.74,33.12,0.04,0.06,0.03,0.09,1.63,1.69,23.63,0",
						"339,22.37,0.02,0.00,0.02,0.01,0.87,0.89,33.12,0.01,0.02,0.01,0.03,1.70,1.75,34.53,1",
						"340,22.47,0.00,0.00,0.01,0.00,0.71,0.62,33.11,0.00,0.01,0.00,0.01,1.72,1.77,10.85,1",
						"341,22.50,0.00,0.00,0.00,0.00,0.66,0.53,33.11,0.00,0.00,0.00,0.00,1.67,1.67,3.33,1",
						"342,22.51,0.00,0.00,0.00,0.00,0.64,0.51,33.11,0.00,0.00,0.00,0.00,1.71,1.74,1.23,1",
						"343,22.52,0.00,0.00,0.00,0.00,0.63,0.50,33.11,0.00,0.00,0.00,0.00,1.39,1.22,5.71,1",
						"344,14.79,0.00,0.00,0.00,0.00,0.71,0.56,40.38,0.00,0.00,0.00,0.00,1.30,1.06,8.85,1",
						"345,22.52,0.00,0.00,0.00,0.00,0.63,0.50,33.11,0.00,0.00,0.00,0.00,1.25,1.00,6.59,1",
						"346,22.52,0.00,0.00,0.00,0.00,0.63,0.49,33.11,0.00,0.00,0.00,0.00,1.24,0.99,0.05,1",
						"347,22.52,0.00,0.00,0.00,0.00,0.63,0.49,33.11,0.00,0.00,0.00,0.00,1.23,0.98,0.67,0",
						"348,22.44,0.00,0.00,0.00,0.00,0.66,0.52,33.82,0.00,0.00,0.00,0.00,1.21,0.99,0.47,1",
						"349,22.49,0.00,0.00,0.00,0.00,0.63,0.50,33.79,0.00,0.00,0.00,0.00,1.23,0.98,1.93,1",
						"350,22.51,0.00,0.00,0.00,0.00,0.62,0.49,33.78,0.00,0.00,0.00,0.00,1.25,0.99,3.77,1",
						"351,22.51,0.00,0.00,0.00,0.00,0.62,0.49,33.78,0.00,0.00,0.00,0.00,1.25,1.00,1.58,1",
						"352,22.52,0.00,0.00,0.00,0.00,0.62,0.48,33.78,0.00,0.00,0.00,0.00,1.25,1.00,64.96,1",
						"353,67.00,16.00,86.00,51.00,38.00,52.00,3.00,37.00,40.00,65.00,54.00,44.00,66.00,26.00,151.26,0",
						"354,49.00,59.00,56.00,93.00,92.00,64.00,62.00,44.00,21.00,7.00,98.00,61.00,82.00,77.00,142.26,0",
						"355,31.00,72.00,25.00,33.00,21.00,45.00,70.00,0.00,49.00,52.00,41.00,6.00,82.00,62.00,150.27,0",
						"356,2.00,97.00,86.00,37.00,93.00,13.00,51.00,19.00,80.00,5.00,65.00,96.00,93.00,54.00,153.45,0",
						"357,16.00,86.00,39.00,53.00,23.00,38.00,64.00,28.00,9.00,58.00,63.00,26.00,34.00,41.00,142.45,0",
						"358,51.00,75.00,18.00,4.00,20.00,77.00,81.00,79.00,4.00,84.00,33.00,35.00,67.00,77.00,134.86,0",
						"359,20.00,43.00,56.00,54.00,31.00,77.00,59.00,74.00,69.00,77.00,39.00,96.00,59.00,65.00,131.98,0",
						"360,17.00,69.00,84.00,20.00,15.00,8.00,20.00,5.00,76.00,23.00,10.00,99.00,69.00,24.00,133.09,0",
						"361,99.00,23.00,93.00,13.00,63.00,14.00,82.00,36.00,70.00,10.00,79.00,86.00,36.00,44.00,169.41,0",
						"362,11.00,56.00,26.00,48.00,59.00,86.00,57.00,32.00,5.00,56.00,69.00,70.00,17.00,82.00,157.83,0",
						"363,71.00,62.00,84.00,0.00,88.00,9.00,77.00,59.00,34.00,16.00,44.00,0.00,54.00,48.00,145.71,0",
						"364,75.00,26.00,48.00,15.00,83.00,30.00,34.00,49.00,11.00,28.00,4.00,38.00,83.00,60.00,134.85,0",
						"365,57.00,59.00,4.00,24.00,91.00,67.00,38.00,33.00,85.00,51.00,24.00,77.00,54.00,46.00,132.33,0",
						"366,25.61,18.52,1.26,7.53,28.56,21.45,12.26,33.08,26.68,16.01,7.53,24.17,17.98,15.36,92.12,0",
						"367,23.49,5.81,0.39,2.36,8.96,7.48,4.72,79.00,8.37,5.02,2.36,7.59,74.15,5.51,65.30,0",
						"368,22.37,1.82,0.12,0.74,2.81,3.34,2.69,47.51,2.63,1.58,0.74,2.38,24.49,3.00,49.31,0",
						"369,22.01,0.55,0.04,0.23,0.85,2.02,2.05,37.48,0.80,0.48,0.23,0.72,8.67,2.20,15.59,0",
						"370,21.90,0.17,0.01,0.07,0.27,1.63,1.85,34.48,0.25,0.15,0.07,0.23,3.94,1.96,57.53,0",
						"371,22.53,0.05,0.00,0.02,0.08,1.16,1.31,94.05,0.08,0.05,0.02,0.07,91.12,1.04,74.60,1",
						"372,22.52,0.02,0.00,0.01,0.03,0.80,0.75,52.24,0.02,0.01,0.01,0.02,29.79,1.55,54.14,1",
						"373,22.52,0.01,0.00,0.00,0.01,0.69,0.58,38.92,0.01,0.00,0.00,0.01,10.25,1.71,20.25,0",
						"374,22.52,0.00,0.00,0.00,0.00,0.65,0.52,34.93,0.00,0.00,0.00,0.00,4.41,1.75,10.34,1",
						"375,14.79,0.00,0.00,0.00,0.00,0.72,0.57,40.95,0.00,0.00,0.00,0.00,2.24,1.23,7.69,1",
						"376,12.33,0.00,0.00,0.00,0.00,0.74,0.58,42.87,0.00,0.00,0.00,0.00,1.55,1.06,2.32,1",
						"377,11.59,0.00,0.00,0.00,0.00,0.75,0.59,43.45,0.00,0.00,0.00,0.00,1.35,1.01,7.85,1",
						"378,22.43,0.00,0.00,0.00,0.00,0.63,0.50,33.23,0.00,0.00,0.00,0.00,1.26,0.98,8.04,1",
						"379,21.45,0.00,0.00,0.00,0.00,0.67,0.53,34.73,0.00,0.00,0.00,0.00,1.23,0.99,1.19,0",
						"380,22.18,0.00,0.00,0.00,0.00,0.63,0.50,34.07,0.00,0.00,0.00,0.00,1.23,0.98,0.42,1",
						"381,22.41,0.00,0.00,0.00,0.00,0.62,0.49,33.87,0.00,0.00,0.00,0.00,1.25,0.99,0.14,1",
						"382,22.48,0.00,0.00,0.00,0.00,0.62,0.49,33.80,0.00,0.00,0.00,0.00,1.25,1.00,0.05,1",
						"383,22.52,0.00,0.00,0.00,0.00,0.63,0.50,33.77,0.00,0.00,0.00,0.00,1.23,0.98,0.04,1",
						"384,22.52,0.00,0.00,0.00,0.00,0.62,0.49,33.77,0.00,0.00,0.00,0.00,1.25,0.99,70.66,1",
						"385,36.00,59.00,39.00,74.00,36.00,98.00,17.00,52.00,91.00,29.00,72.00,88.00,23.00,20.00,154.17,0",
						"386,79.00,11.00,39.00,75.00,34.00,94.00,85.00,87.00,99.00,39.00,45.00,63.00,80.00,60.00,143.11,0",
						"387,76.00,82.00,46.00,50.00,40.00,29.00,82.00,95.00,3.00,14.00,73.00,69.00,88.00,5.00,161.08,0",
						"388,17.00,20.00,41.00,69.00,64.00,91.00,7.00,38.00,45.00,4.00,24.00,98.00,41.00,9.00,140.75,0",
						"389,71.00,35.00,61.00,70.00,67.00,34.00,33.00,73.00,77.00,18.00,30.00,58.00,60.00,15.00,140.06,0",
						"390,5.00,69.00,7.00,13.00,8.00,65.00,66.00,0.00,78.00,75.00,43.00,31.00,31.00,24.00,161.16,0",
						"391,96.00,58.00,86.00,92.00,37.00,81.00,50.00,92.00,27.00,82.00,96.00,35.00,28.00,70.00,173.21,0",
						"392,43.00,5.00,31.00,57.00,11.00,17.00,41.00,73.00,92.00,65.00,18.00,82.00,79.00,8.00,157.67,0",
						"393,18.00,0.00,3.00,80.00,12.00,32.00,14.00,13.00,36.00,40.00,43.00,15.00,80.00,30.00,171.39,0",
						"394,88.00,40.00,45.00,45.00,24.00,62.00,89.00,69.00,99.00,60.00,41.00,89.00,2.00,55.00,159.74,0",
						"395,26.00,94.00,14.00,41.00,25.00,2.00,63.00,58.00,7.00,74.00,49.00,84.00,27.00,65.00,143.94,0",
						"396,23.00,53.00,51.00,3.00,0.00,31.00,95.00,91.00,70.00,20.00,36.00,70.00,19.00,55.00,150.13,0",
						"397,8.00,80.00,18.00,52.00,88.00,49.00,8.00,55.00,59.00,60.00,1.00,0.00,83.00,24.00,148.41,0",
						"398,17.96,25.11,5.65,16.32,27.62,16.13,3.38,85.88,18.52,18.83,0.31,0.00,94.56,8.22,105.80,0",
						"399,21.13,7.62,1.71,4.95,8.38,5.65,1.91,95.71,5.62,5.72,0.10,0.00,98.24,3.19,33.27,0",
						"400,22.08,2.39,0.54,1.55,2.63,2.52,1.47,98.65,1.76,1.79,0.03,0.00,99.34,1.69,49.69,1",
						"401,21.93,0.75,0.17,0.49,0.83,1.78,1.67,53.68,0.55,0.56,0.01,0.00,32.40,1.80,67.76,1",
						"402,22.48,0.23,0.05,0.15,0.25,1.23,1.29,99.87,0.17,0.17,0.00,0.00,99.80,1.07,49.95,1",
						"403,22.45,0.09,0.22,0.25,0.13,1.13,1.27,99.77,0.01,0.07,0.25,0.11,99.77,1.02,2.91,1",
						"404,22.50,0.03,0.07,0.08,0.04,1.10,1.27,99.93,0.00,0.02,0.08,0.03,99.83,1.01,57.69,1",
						"405,14.79,0.01,0.02,0.02,0.01,0.78,0.74,69.53,0.00,0.01,0.02,0.01,34.31,5.93,41.26,1",
						"406,12.37,0.00,0.01,0.01,0.00,0.76,0.64,51.81,0.00,0.00,0.01,0.00,11.63,2.54,17.02,1",
						"407,11.59,0.00,0.00,0.00,0.00,0.75,0.60,46.17,0.00,0.00,0.00,0.00,4.40,1.46,5.52,1",
						"408,11.89,0.00,0.00,0.00,0.00,0.63,0.49,44.40,0.00,0.00,0.00,0.00,1.33,0.99,1.76,1",
						"409,11.45,0.00,0.00,0.00,0.00,0.71,0.56,43.92,0.00,0.00,0.00,0.00,1.28,0.99,0.43,1",
						"410,11.32,0.00,0.00,0.00,0.00,0.74,0.58,43.77,0.00,0.00,0.00,0.00,1.26,0.99,10.14,1",
						"411,21.43,0.00,0.00,0.00,0.00,0.66,0.52,34.77,0.00,0.00,0.00,0.00,1.23,0.99,3.83,1",
						"412,22.19,0.00,0.00,0.00,0.00,0.66,0.52,34.08,0.00,0.00,0.00,0.00,1.22,0.99,0.40,1",
						"413,22.41,0.00,0.00,0.00,0.00,0.63,0.50,33.87,0.00,0.00,0.00,0.00,1.23,0.98,1.93,1",
						"414,22.48,0.00,0.00,0.00,0.00,0.62,0.49,33.80,0.00,0.00,0.00,0.00,1.25,0.99,3.11,1",
						"415,22.51,0.00,0.00,0.00,0.00,0.62,0.49,33.78,0.00,0.00,0.00,0.00,1.25,1.00,1.31,1",
						"416,22.51,0.00,0.00,0.00,0.00,0.62,0.48,33.78,0.00,0.00,0.00,0.00,1.25,1.00,83.51,1",
						"417,89.00,51.00,34.00,8.00,96.00,56.00,78.00,92.00,81.00,86.00,71.00,63.00,30.00,41.00,169.93,0",
						"418,1.00,16.00,78.00,39.00,5.00,99.00,30.00,97.00,60.00,87.00,72.00,23.00,34.00,45.00,151.39,0",
						"419,43.00,71.00,66.00,66.00,83.00,70.00,48.00,86.00,96.00,83.00,36.00,32.00,34.00,45.00,155.10,0",
						"420,69.00,60.00,10.00,16.00,41.00,69.00,52.00,51.00,27.00,17.00,70.00,81.00,20.00,36.00,132.35,0",
						"421,25.00,29.00,44.00,37.00,96.00,65.00,1.00,43.00,13.00,56.00,14.00,72.00,21.00,84.00,133.01,0",
						"422,26.00,95.00,56.00,56.00,4.00,4.00,10.00,21.00,8.00,50.00,13.00,72.00,27.00,42.00,133.65,0",
						"423,62.00,52.00,35.00,7.00,39.00,30.00,14.00,1.00,63.00,59.00,80.00,78.00,30.00,9.00,166.14,0",
						"424,26.00,32.00,89.00,90.00,82.00,6.00,74.00,54.00,26.00,15.00,97.00,20.00,60.00,89.00,184.46,0",
						"425,77.00,69.00,83.00,49.00,14.00,94.00,5.00,91.00,45.00,60.00,16.00,50.00,39.00,57.00,159.12,0",
						"426,76.00,40.00,28.00,24.00,58.00,81.00,94.00,22.00,56.00,69.00,26.00,1.00,85.00,3.00,157.83,0",
						"427,78.00,66.00,32.00,11.00,86.00,80.00,37.00,24.00,18.00,92.00,74.00,93.00,76.00,88.00,164.49,0",
						"428,54.00,19.00,76.00,71.00,36.00,5.00,87.00,19.00,80.00,55.00,42.00,86.00,2.00,79.00,148.23,0",
						"429,96.00,67.00,86.00,5.00,63.00,71.00,69.00,15.00,77.00,88.00,42.00,30.00,26.00,61.00,161.63,0",
						"430,31.00,9.00,19.00,90.00,15.00,8.00,89.00,3.00,4.00,36.00,32.00,45.00,81.00,74.00,164.60,0",
						"431,25.18,2.82,5.96,28.25,4.71,3.26,28.80,69.56,1.26,11.30,10.04,14.12,93.93,23.91,94.61,0",
						"432,23.32,0.86,1.81,8.57,1.43,1.75,9.63,90.76,0.38,3.43,3.05,4.29,98.05,7.96,29.56,0",
						"433,22.77,0.27,0.57,2.69,0.45,1.30,3.89,97.10,0.12,1.08,0.96,1.35,99.28,3.19,34.81,0",
						"434,22.60,0.08,0.18,0.84,0.14,1.16,2.09,99.09,0.04,0.34,0.30,0.42,99.67,1.69,21.26,0",
						"435,22.54,0.03,0.05,0.26,0.04,1.11,1.52,99.72,0.01,0.10,0.09,0.13,99.79,1.21,42.89,0",
						"436,14.80,0.01,0.02,0.08,0.01,0.79,0.82,69.47,0.00,0.03,0.03,0.04,34.30,6.00,49.83,1",
						"437,12.33,0.00,0.01,0.02,0.00,0.68,0.59,59.83,0.00,0.01,0.01,0.01,13.44,7.52,15.12,1",
						"438,11.60,0.00,0.00,0.01,0.00,0.65,0.53,56.95,0.00,0.00,0.00,0.00,7.20,7.98,7.25,1",
						"439,11.36,0.00,0.00,0.00,0.00,0.72,0.57,47.86,0.00,0.00,0.00,0.00,3.12,3.18,6.36,1",
						"440,11.29,0.00,0.00,0.00,0.00,0.74,0.58,44.97,0.00,0.00,0.00,0.00,1.82,1.65,2.08,1",
						"441,11.27,0.00,0.00,0.00,0.00,0.75,0.59,44.10,0.00,0.00,0.00,0.00,1.43,1.20,6.07,0",
						"442,22.83,0.00,0.00,0.00,0.00,0.62,0.49,44.37,0.00,0.00,0.00,0.00,1.35,1.08,8.11,1",
						"443,21.45,0.00,0.00,0.00,0.00,0.67,0.52,35.33,0.00,0.00,0.00,0.00,1.46,1.38,5.09,1",
						"444,22.18,0.00,0.00,0.00,0.00,0.66,0.52,34.26,0.00,0.00,0.00,0.00,1.29,1.11,3.98,1",
						"445,15.14,0.00,0.00,0.00,0.00,0.65,0.51,33.93,0.00,0.00,0.00,0.00,1.23,1.02,6.20,1",
						"446,12.93,0.00,0.00,0.00,0.00,0.64,0.50,26.10,0.00,0.00,0.00,0.00,0.90,0.73,9.13,1",
						"447,19.51,0.00,0.00,0.00,0.00,0.63,0.49,31.37,0.00,0.00,0.00,0.00,1.14,0.92,7.22,1",
						"448,12.01,0.00,0.00,0.00,0.00,0.63,0.49,22.62,0.00,0.00,0.00,0.00,0.91,0.91,69.45,1",
						"449,79.00,69.00,13.00,41.00,54.00,2.00,82.00,8.00,56.00,57.00,91.00,28.00,11.00,22.00,158.54,0",
						"450,25.00,86.00,69.00,40.00,89.00,47.00,81.00,8.00,33.00,52.00,72.00,49.00,61.00,32.00,149.87,0",
						"451,28.00,44.00,6.00,12.00,6.00,65.00,50.00,46.00,6.00,16.00,18.00,79.00,68.00,11.00,152.38,0",
						"452,62.00,24.00,54.00,22.00,57.00,88.00,28.00,37.00,46.00,85.00,34.00,35.00,58.00,64.00,119.01,0",
						"453,44.00,62.00,49.00,23.00,20.00,99.00,33.00,6.00,22.00,19.00,44.00,93.00,48.00,77.00,115.44,0",
						"454,86.00,66.00,58.00,36.00,42.00,74.00,8.00,33.00,52.00,43.00,23.00,59.00,33.00,18.00,121.74,0",
						"455,90.00,13.00,95.00,86.00,93.00,24.00,75.00,57.00,21.00,59.00,40.00,22.00,8.00,37.00,157.29,0",
						"456,86.00,13.00,24.00,55.00,40.00,44.00,99.00,41.00,61.00,66.00,5.00,51.00,9.00,58.00,147.48,0",
						"457,29.00,85.00,84.00,50.00,47.00,79.00,59.00,93.00,15.00,13.00,42.00,56.00,27.00,91.00,147.88,0",
						"458,95.00,9.00,87.00,49.00,6.00,82.00,78.00,86.00,92.00,30.00,82.00,59.00,93.00,45.00,161.13,0",
						"459,65.00,18.00,48.00,6.00,87.00,8.00,29.00,77.00,99.00,33.00,14.00,7.00,45.00,76.00,178.85,0",
						"460,65.00,83.00,27.00,27.00,43.00,87.00,40.00,21.00,86.00,80.00,42.00,90.00,36.00,27.00,163.09,0",
						"461,56.00,52.00,19.00,9.00,52.00,36.00,85.00,70.00,0.00,33.00,41.00,11.00,20.00,57.00,140.92,0",
						"462,81.00,29.00,88.00,12.00,47.00,22.00,7.00,28.00,31.00,7.00,46.00,7.00,63.00,36.00,142.07,0",
						"463,37.00,64.00,54.00,4.00,52.00,65.00,26.00,76.00,99.00,17.00,21.00,44.00,96.00,34.00,134.41,0",
						"464,27.06,20.09,16.95,1.26,16.32,21.15,9.03,92.47,31.07,5.34,6.59,13.81,98.64,11.36,105.08,0",
						"465,22.98,1.26,16.63,1.57,7.22,1.38,1.81,75.83,10.36,28.25,5.02,15.38,93.30,1.32,90.97,0",
						"466,14.94,0.39,5.22,0.49,2.27,0.87,0.91,61.97,3.25,8.87,1.58,4.83,32.27,6.03,85.71,0",
						"467,12.41,0.12,1.64,0.15,0.71,0.71,0.63,57.62,1.02,2.78,0.49,1.51,13.11,7.51,45.08,0",
						"468,11.61,0.04,0.50,0.05,0.22,0.66,0.54,56.23,0.31,0.84,0.15,0.46,7.00,7.98,13.90,1",
						"469,11.59,0.01,0.15,0.01,0.07,0.65,0.52,56.69,0.09,0.26,0.05,0.14,7.05,7.98,3.85,1",
						"470,11.36,0.00,0.05,0.00,0.02,0.64,0.51,55.95,0.03,0.08,0.01,0.04,5.16,8.12,4.65,0",
						"471,19.47,0.00,0.01,0.00,0.01,0.63,0.49,48.01,0.01,0.02,0.00,0.01,2.54,3.29,8.73,1",
						"472,13.84,0.00,0.00,0.00,0.00,0.71,0.56,45.06,0.00,0.01,0.00,0.00,1.66,1.71,6.91,1",
						"473,22.57,0.02,0.01,0.03,0.02,0.67,0.53,44.08,0.02,0.01,0.00,0.00,1.38,1.16,5.37,1",
						"474,22.99,0.00,0.00,0.01,0.01,0.64,0.50,44.28,0.01,0.00,0.00,0.00,1.35,1.10,0.27,0",
						"475,23.12,0.00,0.00,0.00,0.00,0.63,0.49,44.34,0.00,0.00,0.00,0.00,1.34,1.08,8.49,1",
						"476,15.44,0.00,0.00,0.00,0.00,0.64,0.50,37.09,0.00,0.00,0.00,0.00,1.24,1.01,6.57,1",
						"477,12.99,0.00,0.00,0.00,0.00,0.64,0.50,34.78,0.00,0.00,0.00,0.00,1.21,0.99,2.25,1",
						"478,11.63,0.00,0.00,0.00,0.00,0.64,0.50,33.61,0.00,0.00,0.00,0.00,1.33,1.10,4.35,1",
						"479,11.83,0.00,0.00,0.00,0.00,0.63,0.50,26.00,0.00,0.00,0.00,0.00,0.93,0.76,8.26,1",
						"480,11.89,0.00,0.00,0.00,0.00,0.63,0.50,23.57,0.00,0.00,0.00,0.00,0.81,0.65,77.46,1",
						"481,37.00,21.00,82.00,76.00,51.00,95.00,94.00,97.00,59.00,58.00,4.00,28.00,62.00,43.00,178.93,0",
						"482,69.00,37.00,69.00,11.00,42.00,65.00,31.00,85.00,76.00,29.00,55.00,72.00,2.00,90.00,155.41,0",
						"483,7.00,5.00,16.00,86.00,17.00,57.00,2.00,42.00,3.00,85.00,55.00,47.00,26.00,42.00,145.09,0",
						"484,68.00,78.00,19.00,53.00,57.00,48.00,41.00,77.00,66.00,99.00,48.00,40.00,32.00,57.00,127.20,0",
						"485,3.00,27.00,50.00,55.00,18.00,74.00,59.00,5.00,6.00,85.00,58.00,53.00,21.00,29.00,135.89,0",
						"486,42.00,33.00,24.00,54.00,29.00,75.00,52.00,1.00,31.00,52.00,49.00,91.00,8.00,76.00,120.26,0",
						"487,21.00,94.00,2.00,42.00,36.00,49.00,18.00,48.00,73.00,35.00,70.00,34.00,22.00,99.00,165.78,0",
						"488,96.00,9.00,86.00,51.00,26.00,70.00,24.00,62.00,1.00,81.00,35.00,52.00,48.00,16.00,152.65,0",
						"489,89.00,2.00,25.00,8.00,62.00,68.00,48.00,52.00,37.00,80.00,78.00,93.00,38.00,88.00,154.34,0",
						"490,10.00,19.00,62.00,88.00,54.00,58.00,40.00,93.00,95.00,91.00,39.00,62.00,30.00,14.00,164.24,0",
						"491,58.00,58.00,19.00,77.00,40.00,70.00,74.00,4.00,23.00,21.00,46.00,93.00,78.00,94.00,169.85,0",
						"492,77.00,18.00,56.00,34.00,61.00,14.00,77.00,28.00,9.00,12.00,41.00,6.00,41.00,16.00,150.06,0",
						"493,48.00,30.00,56.00,76.00,60.00,53.00,33.00,51.00,54.00,19.00,41.00,50.00,12.00,98.00,130.96,0",
						"494,78.00,43.00,64.00,25.00,52.00,91.00,34.00,61.00,73.00,47.00,9.00,83.00,89.00,64.00,127.89,0",
						"495,99.00,27.00,9.00,56.00,20.00,86.00,65.00,33.00,52.00,15.00,52.00,53.00,84.00,65.00,128.81,0",
						"496,78.00,96.00,5.00,41.00,6.00,83.00,91.00,18.00,3.00,53.00,14.00,84.00,54.00,95.00,163.44,0",
						"497,98.00,28.00,45.00,29.00,48.00,90.00,94.00,56.00,66.00,29.00,99.00,44.00,44.00,20.00,158.06,0",
						"498,38.00,88.00,30.00,20.00,99.00,37.00,58.00,41.00,33.00,4.00,54.00,33.00,78.00,23.00,147.84,0",
						"499,19.65,27.62,9.42,6.28,31.07,12.05,18.54,51.04,10.36,1.26,16.95,10.36,27.46,12.84,103.21,0",
						"500,13.89,8.67,2.96,1.97,9.75,4.22,6.16,54.19,3.25,0.39,5.32,3.25,11.60,9.65,32.45,0",
						"501,12.06,2.63,0.90,0.60,2.96,1.72,2.22,55.19,0.99,0.12,1.61,0.99,6.55,8.63,10.17,0",
						"502,11.51,0.83,0.28,0.19,0.93,0.98,1.04,55.49,0.31,0.04,0.51,0.31,5.04,8.32,60.15,0",
						"503,23.64,0.80,2.81,2.32,1.67,2.00,0.84,44.79,0.31,1.36,2.07,0.59,4.02,1.82,23.11,0",
						"504,23.32,0.25,0.88,0.73,0.52,1.05,0.60,44.50,0.10,0.43,0.65,0.18,2.18,1.31,8.66,0",
						"505,23.22,0.08,0.27,0.22,0.16,0.75,0.52,44.41,0.03,0.13,0.20,0.06,1.59,1.14,2.18,0",
						"506,23.19,0.02,0.08,0.07,0.05,0.66,0.50,44.38,0.01,0.04,0.06,0.02,1.42,1.10,7.19,0",
						"507,12.88,0.01,0.03,0.02,0.02,0.68,0.53,35.27,0.00,0.01,0.02,0.01,2.27,4.22,8.52,1",
						"508,11.77,0.00,0.01,0.01,0.00,0.64,0.50,33.79,0.00,0.00,0.01,0.00,1.57,2.00,2.43,1",
						"509,11.87,0.00,0.00,0.00,0.00,0.64,0.50,33.78,0.00,0.00,0.00,0.00,1.31,1.30,0.84,1",
						"510,11.91,0.00,0.00,0.00,0.00,0.64,0.50,33.78,0.00,0.00,0.00,0.00,1.23,1.08,0.23,1",
						"511,11.92,0.00,0.00,0.00,0.00,0.64,0.50,33.78,0.00,0.00,0.00,0.00,1.21,1.01,2.93,1",
						"512,11.92,0.00,0.00,0.00,0.00,0.63,0.50,26.05,0.00,0.00,0.00,0.00,0.89,0.73,55.64,1",
						"513,26.00,6.00,27.00,18.00,9.00,67.00,88.00,35.00,18.00,4.00,42.00,43.00,43.00,75.00,155.00,0",
						"514,87.00,52.00,28.00,84.00,4.00,50.00,98.00,19.00,35.00,35.00,51.00,60.00,4.00,83.00,135.64,0",
						"515,77.00,17.00,2.00,73.00,16.00,71.00,82.00,68.00,62.00,77.00,72.00,72.00,32.00,55.00,119.53,0",
						"516,7.00,99.00,43.00,67.00,20.00,8.00,50.00,54.00,7.00,80.00,8.00,81.00,52.00,70.00,141.49,0",
						"517,22.00,47.00,21.00,18.00,66.00,63.00,41.00,97.00,95.00,19.00,46.00,87.00,81.00,97.00,164.73,0",
						"518,64.00,61.00,69.00,82.00,53.00,93.00,14.00,93.00,70.00,9.00,99.00,77.00,44.00,62.00,152.82,0",
						"519,85.00,91.00,93.00,38.00,54.00,67.00,17.00,5.00,64.00,26.00,28.00,15.00,80.00,46.00,144.15,0",
						"520,98.00,63.00,10.00,38.00,70.00,93.00,9.00,72.00,74.00,34.00,32.00,34.00,63.00,59.00,129.77,0",
						"521,52.00,69.00,92.00,26.00,39.00,97.00,1.00,48.00,91.00,89.00,6.00,60.00,19.00,58.00,163.60,0",
						"522,27.00,25.00,30.00,52.00,91.00,32.00,76.00,65.00,37.00,9.00,95.00,23.00,20.00,5.00,157.67,0",
						"523,81.00,17.00,70.00,17.00,29.00,42.00,52.00,89.00,16.00,9.00,68.00,92.00,24.00,89.00,153.32,0",
						"524,34.00,15.00,87.00,29.00,11.00,9.00,34.00,17.00,65.00,63.00,77.00,57.00,57.00,45.00,141.68,0",
						"525,12.00,61.00,3.00,34.00,29.00,70.00,79.00,80.00,97.00,67.00,9.00,80.00,45.00,81.00,154.14,0",
						"526,78.00,57.00,89.00,75.00,71.00,83.00,68.00,81.00,39.00,40.00,59.00,48.00,4.00,23.00,156.93,0",
						"527,32.00,78.00,79.00,25.00,91.00,92.00,73.00,29.00,80.00,58.00,23.00,63.00,96.00,70.00,152.12,0",
						"528,18.00,86.00,55.00,57.00,52.00,80.00,15.00,99.00,11.00,75.00,30.00,98.00,63.00,53.00,143.07,0",
						"529,98.00,43.00,4.00,32.00,89.00,49.00,58.00,16.00,17.00,62.00,56.00,46.00,38.00,4.00,145.85,0",
						"530,25.00,60.00,59.00,1.00,17.00,95.00,80.00,44.00,93.00,36.00,82.00,45.00,34.00,67.00,144.92,0",
						"531,69.00,99.00,84.00,1.00,58.00,92.00,8.00,74.00,17.00,33.00,58.00,87.00,25.00,92.00,158.74,0",
						"532,29.38,31.07,26.36,0.31,18.20,29.31,2.85,61.40,5.34,10.36,18.20,27.31,10.83,34.49,111.30,0",
						"533,16.95,9.75,8.27,0.10,5.71,9.64,1.24,57.44,1.67,3.25,5.71,8.57,6.38,16.44,105.87,0",
						"534,96.00,73.00,88.00,39.00,8.00,83.00,76.00,0.00,27.00,86.00,4.00,11.00,45.00,26.00,185.67,0",
						"535,45.13,22.91,27.62,12.24,2.51,26.58,24.28,29.54,8.47,26.99,1.26,3.45,15.17,9.12,112.57,0",
						"536,30.07,7.19,8.67,3.84,0.79,8.77,7.95,39.71,2.66,8.47,0.39,1.08,5.68,3.60,72.93,0",
						"537,25.34,2.26,2.72,1.21,0.25,3.18,2.83,42.91,0.83,2.66,0.12,0.34,2.70,1.87,53.71,0",
						"538,13.65,0.68,0.83,0.37,0.08,1.43,1.23,34.94,0.25,0.81,0.04,0.10,2.65,4.43,22.45,0",
						"539,12.01,0.21,0.26,0.11,0.02,0.87,0.72,33.69,0.08,0.25,0.01,0.03,1.69,2.06,6.44,1",
						"540,11.49,0.07,0.08,0.03,0.01,0.70,0.56,33.29,0.02,0.08,0.00,0.01,1.38,1.31,2.01,1",
						"541,11.34,0.04,0.05,0.01,0.01,0.72,0.52,33.16,0.01,0.00,0.02,0.06,1.34,1.13,0.85,1",
						"542,11.74,0.01,0.01,0.00,0.00,0.67,0.51,33.58,0.00,0.00,0.01,0.02,1.24,1.03,0.54,1",
						"543,11.27,0.00,0.00,0.00,0.00,0.63,0.49,33.12,0.00,0.00,0.00,0.01,1.26,1.00,0.76,1",
						"544,11.90,0.00,0.00,0.00,0.00,0.65,0.50,33.11,0.00,0.00,0.00,0.00,1.49,1.38,103.75,1",
						"545,92.00,97.00,90.00,94.00,81.00,75.00,98.00,33.00,65.00,64.00,82.00,84.00,98.00,83.00,218.92,0",
						"546,37.00,43.00,56.00,27.00,55.00,42.00,68.00,80.00,68.00,86.00,7.00,82.00,86.00,2.00,152.11,0",
						"547,68.00,65.00,47.00,60.00,39.00,67.00,80.00,56.00,95.00,69.00,63.00,57.00,43.00,69.00,120.40,0",
						"548,19.00,58.00,57.00,84.00,29.00,49.00,7.00,97.00,9.00,72.00,10.00,22.00,36.00,44.00,134.53,0",
						"549,65.00,47.00,88.00,39.00,8.00,61.00,90.00,85.00,44.00,48.00,15.00,20.00,42.00,9.00,152.30,0",
						"550,26.00,17.00,7.00,11.00,59.00,3.00,50.00,76.00,88.00,59.00,46.00,9.00,17.00,61.00,146.89,0",
						"551,12.00,96.00,58.00,47.00,85.00,70.00,82.00,89.00,88.00,5.00,53.00,53.00,70.00,79.00,151.30,0",
						"552,34.00,92.00,39.00,78.00,33.00,49.00,2.00,88.00,52.00,66.00,43.00,51.00,37.00,26.00,133.83,0",
						"553,88.00,13.00,25.00,94.00,46.00,21.00,48.00,32.00,41.00,91.00,36.00,34.00,6.00,74.00,156.77,0",
						"554,12.00,52.00,38.00,54.00,86.00,90.00,91.00,0.00,90.00,32.00,68.00,54.00,63.00,7.00,139.00,0",
						"555,14.00,91.00,35.00,89.00,82.00,91.00,83.00,18.00,15.00,61.00,41.00,87.00,17.00,86.00,158.31,0",
						"556,45.00,80.00,48.00,64.00,4.00,25.00,39.00,83.00,67.00,16.00,32.00,67.00,61.00,63.00,141.72,0",
						"557,4.00,63.00,91.00,22.00,77.00,70.00,97.00,57.00,88.00,17.00,95.00,65.00,65.00,81.00,162.53,0",
						"558,14.00,12.00,26.00,15.00,46.00,25.00,44.00,54.00,11.00,9.00,17.00,35.00,41.00,96.00,153.29,0",
						"559,72.00,16.00,40.00,82.00,87.00,0.00,34.00,15.00,22.00,80.00,12.00,22.00,41.00,80.00,153.32,0",
						"560,39.00,34.00,83.00,36.00,61.00,74.00,11.00,61.00,59.00,99.00,60.00,56.00,52.00,55.00,116.16,0",
						"561,58.00,78.00,15.00,89.00,61.00,59.00,17.00,49.00,52.00,61.00,42.00,75.00,7.00,52.00,117.68,0",
						"562,42.00,72.00,37.00,4.00,85.00,72.00,21.00,63.00,44.00,13.00,89.00,46.00,56.00,73.00,134.48,0",
						"563,58.00,22.00,96.00,9.00,35.00,88.00,98.00,12.00,29.00,63.00,35.00,87.00,44.00,70.00,146.10,0",
						"564,92.00,37.00,54.00,10.00,90.00,26.00,89.00,1.00,74.00,48.00,7.00,5.00,79.00,31.00,167.67,0",
						"565,4.00,76.00,40.00,43.00,1.00,81.00,33.00,37.00,67.00,21.00,18.00,67.00,6.00,48.00,163.19,0",
						"566,39.00,72.00,50.00,59.00,96.00,0.00,29.00,3.00,44.00,28.00,9.00,15.00,46.00,99.00,159.87,0",
						"567,57.00,82.00,44.00,78.00,83.00,24.00,44.00,18.00,96.00,53.00,78.00,51.00,96.00,5.00,164.11,0",
						"568,15.00,12.00,58.00,35.00,87.00,38.00,15.00,63.00,66.00,90.00,71.00,90.00,21.00,96.00,164.01,0",
						"569,60.00,26.00,41.00,14.00,99.00,55.00,57.00,90.00,51.00,42.00,20.00,80.00,5.00,21.00,145.33,0",
						"570,27.01,8.16,12.87,4.39,31.07,17.71,18.25,51.88,16.01,13.18,6.28,25.11,3.17,9.69,93.96,0",
						"571,16.50,2.48,3.91,1.33,9.43,5.83,5.90,39.73,4.86,4.00,1.91,7.62,2.58,6.08,29.78,0",
						"572,12.90,0.78,1.23,0.42,2.96,2.26,2.19,35.19,1.52,1.26,0.60,2.39,1.67,2.58,9.45,0",
						"573,11.76,0.24,0.37,0.13,0.90,1.12,1.00,33.74,0.46,0.38,0.18,0.73,1.37,1.47,2.94,0",
						"574,11.41,0.07,0.12,0.04,0.28,0.77,0.65,33.31,0.15,0.12,0.06,0.23,1.29,1.14,1.04,1",
						"575,11.92,0.02,0.04,0.01,0.09,0.72,0.57,33.20,0.05,0.04,0.02,0.07,1.29,1.11,0.66,1",
						"576,11.92,0.01,0.01,0.00,0.03,0.67,0.52,33.14,0.01,0.01,0.01,0.02,1.44,1.30,75.53,1",
						"577,94.00,30.00,6.00,9.00,84.00,59.00,19.00,87.00,88.00,77.00,82.00,8.00,24.00,95.00,189.04,0",
						"578,54.00,44.00,80.00,90.00,16.00,0.00,88.00,97.00,73.00,94.00,46.00,42.00,58.00,68.00,160.78,0",
						"579,14.00,76.00,55.00,36.00,31.00,40.00,47.00,44.00,50.00,53.00,10.00,11.00,5.00,98.00,143.51,0",
						"580,9.00,44.00,93.00,74.00,82.00,94.00,76.00,14.00,0.00,74.00,34.00,47.00,86.00,71.00,167.06,0",
						"581,97.00,14.00,37.00,79.00,4.00,78.00,10.00,42.00,85.00,26.00,56.00,87.00,54.00,8.00,175.60,0",
						"582,42.00,18.00,5.00,10.00,81.00,11.00,57.00,15.00,61.00,94.00,37.00,2.00,64.00,60.00,160.30,0",
						"583,20.00,96.00,67.00,37.00,11.00,8.00,12.00,59.00,23.00,48.00,37.00,51.00,72.00,38.00,158.24,0",
						"584,87.00,84.00,59.00,17.00,40.00,57.00,44.00,46.00,67.00,8.00,63.00,75.00,1.00,10.00,140.68,0",
						"585,28.00,3.00,98.00,33.00,23.00,41.00,51.00,45.00,71.00,95.00,98.00,22.00,35.00,67.00,150.20,0",
						"586,12.00,31.00,1.00,73.00,62.00,30.00,75.00,2.00,67.00,72.00,69.00,54.00,11.00,0.00,144.14,0",
						"587,69.00,26.00,44.00,46.00,64.00,5.00,39.00,13.00,81.00,49.00,50.00,71.00,27.00,93.00,138.26,0",
						"588,25.00,74.00,64.00,10.00,55.00,66.00,96.00,83.00,66.00,64.00,85.00,66.00,39.00,58.00,140.63,0",
						"589,68.00,26.00,33.00,53.00,26.00,90.00,13.00,60.00,23.00,84.00,11.00,72.00,35.00,60.00,156.95,0",
						"590,84.00,75.00,47.00,56.00,71.00,46.00,34.00,37.00,59.00,11.00,76.00,36.00,90.00,69.00,147.83,0",
						"591,9.00,62.00,13.00,60.00,35.00,90.00,8.00,96.00,70.00,86.00,5.00,30.00,37.00,60.00,152.83,0",
						"592,41.00,10.00,50.00,47.00,70.00,80.00,36.00,25.00,85.00,74.00,41.00,5.00,79.00,71.00,129.87,0",
						"593,98.00,64.00,16.00,86.00,55.00,93.00,39.00,46.00,35.00,33.00,81.00,46.00,53.00,63.00,135.06,0",
						"594,55.00,88.00,59.00,53.00,6.00,7.00,16.00,93.00,19.00,3.00,93.00,88.00,42.00,59.00,143.81,0",
						"595,17.00,46.00,40.00,25.00,17.00,47.00,94.00,56.00,55.00,92.00,96.00,51.00,67.00,85.00,156.00,0",
						"596,28.00,26.00,63.00,27.00,75.00,83.00,44.00,43.00,10.00,0.00,27.00,7.00,39.00,76.00,154.40,0",
						"597,35.00,29.00,80.00,91.00,62.00,26.00,16.00,82.00,50.00,88.00,21.00,64.00,5.00,85.00,151.93,0",
						"598,41.00,28.00,64.00,24.00,21.00,68.00,9.00,54.00,81.00,15.00,77.00,29.00,53.00,99.00,139.60,0",
						"599,25.00,64.00,66.00,18.00,26.00,56.00,49.00,8.00,72.00,75.00,57.00,58.00,52.00,81.00,118.08,0",
						"600,53.00,93.00,77.00,79.00,87.00,4.00,33.00,8.00,56.00,76.00,73.00,66.00,41.00,32.00,124.65,0",
						"601,46.00,41.00,63.00,66.00,44.00,5.00,17.00,38.00,97.00,77.00,62.00,64.00,39.00,41.00,119.76,0",
						"602,6.00,40.00,56.00,96.00,21.00,14.00,27.00,23.00,3.00,76.00,47.00,7.00,52.00,38.00,134.82,0",
						"603,10.06,12.55,17.58,30.13,6.59,4.84,8.83,30.85,0.94,23.85,14.75,2.20,17.92,15.02,90.25,0",
						"604,10.88,3.94,5.52,9.46,2.07,1.95,3.11,32.86,0.30,7.49,4.63,0.69,6.73,5.73,62.70,0",
						"605,11.14,1.24,1.73,2.97,0.65,1.04,1.31,33.03,0.09,2.35,1.45,0.22,2.97,2.47,40.45,0",
						"606,11.68,0.39,0.54,0.93,0.20,0.77,0.76,33.23,0.03,0.74,0.46,0.07,2.04,1.84,12.76,0",
						"607,11.85,0.12,0.16,0.28,0.06,0.68,0.58,33.15,0.01,0.22,0.14,0.02,1.66,1.52,5.29,0",
						"608,11.90,0.04,0.05,0.09,0.02,0.66,0.52,33.12,0.00,0.07,0.04,0.01,1.55,1.43,67.87,1",
						"609,72.00,4.00,95.00,3.00,21.00,23.00,39.00,67.00,75.00,97.00,60.00,42.00,51.00,26.00,160.00,0",
						"610,79.00,73.00,27.00,32.00,81.00,97.00,22.00,37.00,37.00,30.00,58.00,68.00,47.00,41.00,157.18,0",
						"611,30.00,71.00,70.00,84.00,14.00,3.00,19.00,37.00,63.00,80.00,88.00,38.00,40.00,0.00,143.92,0",
						"612,47.00,57.00,27.00,51.00,14.00,41.00,50.00,64.00,1.00,23.00,1.00,63.00,24.00,22.00,152.06,0",
						"613,52.00,54.00,99.00,94.00,14.00,51.00,93.00,68.00,50.00,81.00,43.00,93.00,79.00,63.00,150.92,0",
						"614,38.00,96.00,47.00,94.00,88.00,22.00,45.00,94.00,93.00,65.00,7.00,97.00,19.00,33.00,181.31,0",
						"615,71.00,8.00,39.00,24.00,82.00,55.00,71.00,84.00,24.00,55.00,83.00,18.00,7.00,62.00,166.87,0",
						"616,89.00,70.00,37.00,55.00,34.00,14.00,73.00,1.00,23.00,9.00,18.00,83.00,9.00,74.00,148.67,0",
						"617,29.00,63.00,84.00,50.00,74.00,48.00,60.00,75.00,97.00,69.00,62.00,82.00,2.00,3.00,156.37,0",
						"618,95.00,23.00,13.00,86.00,7.00,60.00,38.00,33.00,15.00,16.00,26.00,32.00,56.00,95.00,174.15,0",
						"619,75.00,68.00,36.00,80.00,81.00,38.00,52.00,22.00,93.00,68.00,61.00,24.00,44.00,13.00,141.09,0",
						"620,54.00,36.00,17.00,16.00,74.00,11.00,93.00,73.00,89.00,11.00,16.00,96.00,45.00,25.00,159.00,0",
						"621,1.00,42.00,11.00,78.00,22.00,90.00,13.00,51.00,86.00,53.00,59.00,21.00,64.00,43.00,131.97,0",
						"622,34.00,47.00,80.00,75.00,29.00,90.00,38.00,25.00,58.00,65.00,35.00,22.00,41.00,75.00,123.53,0",
						"623,28.00,28.00,0.00,35.00,27.00,13.00,59.00,60.00,33.00,79.00,89.00,14.00,18.00,78.00,143.72,0",
						"624,28.00,96.00,26.00,30.00,93.00,63.00,57.00,47.00,11.00,68.00,43.00,98.00,38.00,82.00,162.84,0",
						"625,6.00,91.00,13.00,97.00,19.00,22.00,41.00,7.00,87.00,83.00,85.00,4.00,2.00,38.00,177.08,0",
						"626,82.00,37.00,21.00,75.00,13.00,9.00,45.00,88.00,84.00,45.00,49.00,41.00,10.00,18.00,142.86,0",
						"627,70.00,52.00,82.00,90.00,7.00,26.00,58.00,99.00,3.00,45.00,3.00,60.00,9.00,78.00,159.32,0",
						"628,61.00,2.00,71.00,0.00,14.00,18.00,68.00,38.00,60.00,66.00,64.00,5.00,98.00,77.00,151.82,0",
						"629,7.00,0.00,80.00,21.00,93.00,19.00,91.00,52.00,93.00,25.00,20.00,99.00,57.00,82.00,155.32,0",
						"630,50.00,84.00,82.00,20.00,51.00,86.00,78.00,44.00,88.00,87.00,10.00,93.00,69.00,94.00,128.41,0",
						"631,31.00,94.00,92.00,34.00,33.00,70.00,94.00,40.00,26.00,98.00,40.00,25.00,61.00,34.00,134.44,0",
						"632,55.00,24.00,74.00,4.00,23.00,32.00,14.00,50.00,51.00,28.00,69.00,74.00,25.00,9.00,146.75,0",
						"633,36.00,1.00,66.00,73.00,6.00,10.00,84.00,89.00,87.00,70.00,76.00,99.00,71.00,81.00,150.95,0",
						"634,29.00,81.00,42.00,38.00,22.00,6.00,76.00,23.00,81.00,95.00,32.00,88.00,40.00,1.00,153.22,0",
						"635,90.00,7.00,92.00,27.00,70.00,2.00,77.00,79.00,37.00,34.00,40.00,34.00,46.00,39.00,156.78,0",
						"636,54.00,10.00,46.00,44.00,50.00,99.00,53.00,45.00,47.00,33.00,69.00,68.00,36.00,70.00,163.37,0",
						"637,97.00,82.00,11.00,16.00,47.00,11.00,5.00,78.00,27.00,16.00,15.00,16.00,24.00,5.00,156.74,0",
						"638,38.62,25.74,3.45,5.02,14.75,3.90,1.92,47.66,8.47,5.02,4.71,5.02,8.59,2.54,95.09,0",
						"639,20.30,8.08,1.08,1.58,4.63,1.67,0.95,37.68,2.66,1.58,1.48,1.58,3.72,1.75,86.04,0",
						"640,14.41,2.54,0.34,0.49,1.45,0.98,0.65,34.55,0.83,0.49,0.46,0.49,1.93,1.21,85.59,0",
						"641,55.00,60.00,86.00,71.00,4.00,10.00,22.00,91.00,2.00,77.00,50.00,35.00,57.00,32.00,148.92,0",
						"642,58.00,74.00,71.00,83.00,40.00,76.00,30.00,5.00,36.00,42.00,30.00,63.00,98.00,44.00,133.82,0",
						"643,16.00,98.00,80.00,49.00,34.00,12.00,36.00,74.00,26.00,23.00,97.00,37.00,19.00,43.00,156.37,0",
						"644,91.00,28.00,19.00,35.00,50.00,67.00,83.00,52.00,62.00,7.00,33.00,66.00,93.00,90.00,139.95,0",
						"645,76.00,72.00,26.00,36.00,35.00,55.00,91.00,26.00,11.00,26.00,20.00,18.00,71.00,45.00,120.79,0",
						"646,69.00,71.00,74.00,69.00,1.00,68.00,80.00,36.00,0.00,1.00,62.00,22.00,48.00,81.00,156.55,0",
						"647,64.00,51.00,53.00,23.00,85.00,63.00,63.00,95.00,78.00,45.00,2.00,74.00,73.00,20.00,146.06,0",
						"648,44.00,99.00,26.00,5.00,51.00,32.00,3.00,34.00,33.00,45.00,79.00,99.00,8.00,51.00,148.97,0",
						"649,49.00,64.00,56.00,42.00,15.00,23.00,69.00,33.00,91.00,96.00,55.00,47.00,39.00,11.00,128.76,0",
						"650,45.00,20.00,61.00,53.00,33.00,45.00,66.00,23.00,37.00,89.00,91.00,63.00,75.00,53.00,130.36,0",
						"651,78.00,37.00,35.00,70.00,55.00,48.00,67.00,42.00,43.00,2.00,28.00,73.00,62.00,87.00,141.06,0",
						"652,43.00,92.00,25.00,41.00,48.00,53.00,55.00,24.00,50.00,96.00,81.00,13.00,37.00,13.00,147.12,0",
						"653,54.00,97.00,66.00,74.00,40.00,85.00,0.00,2.00,53.00,60.00,56.00,26.00,50.00,61.00,129.61,0",
						"654,14.00,15.00,17.00,55.00,59.00,72.00,56.00,32.00,88.00,24.00,66.00,18.00,29.00,9.00,134.54,0",
						"655,26.00,33.00,31.00,22.00,71.00,42.00,28.00,86.00,77.00,32.00,67.00,18.00,70.00,5.00,134.19,0",
						"656,85.00,4.00,69.00,68.00,60.00,83.00,97.00,74.00,39.00,60.00,36.00,95.00,96.00,51.00,157.54,0",
						"657,50.00,19.00,24.00,6.00,89.00,87.00,94.00,70.00,26.00,95.00,79.00,80.00,65.00,5.00,168.30,0",
						"658,53.00,59.00,27.00,67.00,84.00,2.00,4.00,77.00,13.00,8.00,2.00,79.00,47.00,89.00,178.85,0",
						"659,57.00,31.00,32.00,75.00,12.00,24.00,92.00,77.00,65.00,30.00,93.00,5.00,16.00,28.00,151.73,0",
						"660,55.00,29.00,88.00,28.00,5.00,41.00,23.00,71.00,10.00,43.00,60.00,42.00,57.00,39.00,132.66,0",
						"661,6.00,25.00,10.00,74.00,39.00,71.00,25.00,59.00,44.00,51.00,73.00,97.00,96.00,38.00,142.39,0",
						"662,15.00,65.00,17.00,45.00,38.00,87.00,42.00,22.00,75.00,71.00,27.00,90.00,90.00,95.00,138.48,0",
						"663,87.00,95.00,52.00,96.00,64.00,69.00,73.00,91.00,2.00,51.00,89.00,45.00,9.00,73.00,162.28,0",
						"664,59.00,10.00,37.00,12.00,49.00,51.00,92.00,17.00,75.00,47.00,67.00,86.00,4.00,82.00,144.53,0",
						"665,59.00,63.00,94.00,58.00,22.00,95.00,27.00,2.00,34.00,40.00,60.00,76.00,26.00,48.00,148.11,0",
						"666,26.00,94.00,92.00,97.00,65.00,33.00,64.00,11.00,61.00,86.00,86.00,26.00,93.00,42.00,136.80,0",
						"667,43.00,69.00,50.00,70.00,70.00,57.00,88.00,16.00,86.00,86.00,33.00,30.00,92.00,80.00,133.97,0",
						"668,50.00,77.00,79.00,2.00,40.00,49.00,12.00,89.00,88.00,56.00,13.00,15.00,70.00,44.00,162.98,0",
						"669,14.00,27.00,37.00,87.00,18.00,18.00,83.00,42.00,40.00,72.00,69.00,90.00,65.00,89.00,171.58,0",
						"670,54.00,23.00,15.00,30.00,65.00,58.00,97.00,87.00,61.00,79.00,98.00,64.00,68.00,41.00,149.43,0",
						"671,32.00,9.00,72.00,70.00,97.00,95.00,31.00,34.00,36.00,77.00,15.00,51.00,90.00,24.00,176.80,0",
						"672,17.77,2.82,22.60,21.97,30.44,30.24,10.06,33.39,11.30,24.17,4.71,16.01,28.97,8.42,145.50,0",
						"673,61.00,89.00,73.00,98.00,97.00,69.00,4.00,80.00,86.00,84.00,50.00,39.00,61.00,51.00,158.51,0",
						"674,4.00,97.00,24.00,40.00,84.00,70.00,52.00,49.00,70.00,39.00,51.00,36.00,77.00,98.00,133.94,0",
						"675,60.00,12.00,6.00,67.00,54.00,70.00,2.00,57.00,76.00,33.00,61.00,81.00,74.00,88.00,138.28,0",
						"676,8.00,26.00,5.00,79.00,92.00,87.00,53.00,45.00,89.00,9.00,44.00,22.00,73.00,90.00,151.65,0",
						"677,15.00,43.00,7.00,56.00,5.00,47.00,76.00,85.00,12.00,13.00,21.00,85.00,37.00,16.00,146.86,0",
						"678,59.00,82.00,64.00,8.00,59.00,92.00,28.00,62.00,10.00,74.00,21.00,16.00,21.00,39.00,151.42,0",
						"679,75.00,50.00,99.00,22.00,40.00,61.00,32.00,70.00,91.00,50.00,27.00,98.00,36.00,36.00,110.45,0",
						"680,44.00,78.00,44.00,31.00,43.00,90.00,13.00,52.00,40.00,55.00,11.00,15.00,83.00,29.00,157.99,0",
						"681,85.00,7.00,28.00,25.00,47.00,58.00,57.00,0.00,66.00,9.00,5.00,72.00,51.00,90.00,136.57,0",
						"682,82.00,37.00,5.00,69.00,48.00,9.00,29.00,0.00,51.00,18.00,28.00,32.00,34.00,17.00,132.84,0",
						"683,0.00,58.00,77.00,1.00,37.00,15.00,70.00,13.00,43.00,9.00,62.00,39.00,40.00,70.00,129.16,0",
						"684,23.00,58.00,55.00,38.00,1.00,47.00,76.00,41.00,60.00,12.00,28.00,58.00,5.00,46.00,116.95,0",
						"685,6.00,16.00,51.00,37.00,72.00,48.00,74.00,30.00,72.00,64.00,71.00,53.00,78.00,55.00,131.60,0",
						"686,38.00,45.00,87.00,46.00,43.00,13.00,12.00,11.00,73.00,84.00,29.00,52.00,94.00,97.00,153.40,0",
						"687,29.00,54.00,77.00,94.00,59.00,0.00,93.00,51.00,68.00,84.00,26.00,64.00,67.00,2.00,147.16,0",
						"688,6.00,63.00,26.00,49.00,86.00,31.00,14.00,39.00,84.00,39.00,55.00,44.00,21.00,7.00,142.61,0",
						"689,31.00,82.00,88.00,67.00,89.00,63.00,69.00,85.00,38.00,60.00,37.00,83.00,94.00,7.00,146.61,0",
						"690,19.00,42.00,49.00,1.00,72.00,9.00,10.00,19.00,8.00,92.00,90.00,82.00,16.00,54.00,172.32,0",
						"691,54.00,81.00,69.00,81.00,6.00,3.00,71.00,18.00,50.00,6.00,79.00,91.00,43.00,16.00,153.37,0",
						"692,55.00,6.00,55.00,84.00,55.00,9.00,59.00,61.00,89.00,74.00,26.00,72.00,90.00,6.00,156.78,0",
						"693,14.00,83.00,93.00,25.00,22.00,91.00,37.00,10.00,71.00,58.00,39.00,30.00,45.00,62.00,155.66,0",
						"694,22.00,2.00,83.00,55.00,42.00,94.00,44.00,76.00,9.00,4.00,28.00,50.00,25.00,83.00,148.97,0",
						"695,57.00,44.00,48.00,46.00,3.00,66.00,65.00,92.00,52.00,13.00,34.00,89.00,34.00,53.00,141.17,0",
						"696,15.00,3.00,46.00,51.00,39.00,84.00,26.00,11.00,88.00,77.00,7.00,85.00,73.00,48.00,150.64,0",
						"697,85.00,63.00,19.00,94.00,85.00,91.00,28.00,27.00,20.00,35.00,76.00,67.00,82.00,7.00,158.40,0",
						"698,91.00,87.00,38.00,54.00,9.00,74.00,78.00,50.00,64.00,58.00,79.00,58.00,3.00,42.00,141.58,0",
						"699,90.00,54.00,24.00,61.00,25.00,70.00,72.00,64.00,17.00,74.00,68.00,38.00,66.00,26.00,121.39,0",
						"700,68.00,23.00,86.00,46.00,28.00,60.00,92.00,15.00,63.00,81.00,71.00,86.00,75.00,15.00,155.83,0",
						"701,83.00,81.00,92.00,69.00,83.00,28.00,9.00,78.00,25.00,69.00,16.00,58.00,89.00,81.00,163.70,0",
						"702,79.00,39.00,29.00,91.00,91.00,19.00,78.00,22.00,74.00,63.00,95.00,54.00,54.00,62.00,136.32,0",
						"703,39.00,60.00,64.00,68.00,37.00,21.00,35.00,86.00,56.00,77.00,88.00,37.00,49.00,93.00,144.93,0",
						"704,87.00,11.00,57.00,91.00,18.00,73.00,28.00,53.00,90.00,94.00,4.00,26.00,16.00,69.00,137.35,0",
						"705,68.00,97.00,25.00,60.00,56.00,47.00,61.00,73.00,10.00,20.00,11.00,41.00,11.00,29.00,164.65,0",
						"706,70.00,7.00,16.00,10.00,97.00,83.00,1.00,36.00,31.00,41.00,75.00,18.00,93.00,74.00,155.54,0",
						"707,10.00,46.00,94.00,42.00,66.00,90.00,26.00,83.00,79.00,35.00,24.00,33.00,53.00,67.00,153.01,0",
						"708,65.00,99.00,38.00,3.00,49.00,19.00,54.00,81.00,17.00,50.00,65.00,96.00,60.00,23.00,179.44,0",
						"709,27.00,36.00,12.00,70.00,18.00,2.00,44.00,85.00,82.00,66.00,35.00,47.00,89.00,25.00,128.56,0",
						"710,96.00,45.00,7.00,26.00,53.00,7.00,19.00,31.00,68.00,7.00,64.00,16.00,72.00,48.00,157.63,0",
						"711,77.00,92.00,97.00,22.00,56.00,77.00,62.00,54.00,91.00,87.00,11.00,75.00,19.00,41.00,148.95,0",
						"712,77.00,28.00,44.00,77.00,26.00,9.00,91.00,77.00,95.00,84.00,80.00,50.00,0.00,12.00,172.10,0",
						"713,66.00,36.00,30.00,22.00,77.00,72.00,56.00,67.00,61.00,11.00,45.00,43.00,72.00,45.00,127.62,0",
						"714,78.00,7.00,30.00,95.00,48.00,15.00,54.00,25.00,88.00,28.00,98.00,75.00,23.00,40.00,141.47,0",
						"715,20.00,47.00,15.00,1.00,63.00,76.00,59.00,70.00,97.00,19.00,59.00,62.00,6.00,99.00,158.39,0",
						"716,83.00,67.00,91.00,7.00,17.00,27.00,62.00,51.00,12.00,3.00,14.00,83.00,0.00,47.00,150.17,0",
						"717,63.00,86.00,44.00,38.00,66.00,19.00,31.00,43.00,44.00,94.00,82.00,6.00,45.00,89.00,161.61,0",
						"718,13.00,6.00,36.00,33.00,29.00,84.00,99.00,17.00,97.00,24.00,52.00,95.00,16.00,76.00,192.36,0",
						"719,99.00,59.00,70.00,98.00,47.00,40.00,20.00,67.00,96.00,89.00,23.00,6.00,84.00,93.00,178.15,0",
						"720,1.00,61.00,37.00,3.00,22.00,44.00,15.00,41.00,90.00,17.00,35.00,68.00,57.00,13.00,146.71,0",
						"721,63.00,10.00,73.00,78.00,31.00,24.00,60.00,56.00,45.00,95.00,49.00,45.00,73.00,45.00,153.96,0",
						"722,88.00,97.00,91.00,12.00,50.00,87.00,37.00,48.00,39.00,68.00,18.00,95.00,91.00,82.00,165.88,0",
						"723,1.00,11.00,57.00,24.00,40.00,83.00,67.00,29.00,1.00,30.00,44.00,98.00,94.00,41.00,168.94,0",
						"724,35.00,90.00,21.00,72.00,64.00,41.00,67.00,13.00,45.00,77.00,33.00,72.00,35.00,93.00,157.16,0",
						"725,22.00,31.00,89.00,43.00,24.00,50.00,81.00,90.00,75.00,80.00,22.00,73.00,12.00,2.00,150.43,0",
						"726,1.00,64.00,26.00,43.00,28.00,8.00,88.00,53.00,42.00,94.00,93.00,70.00,60.00,65.00,162.50,0",
						"727,42.00,8.00,26.00,60.00,6.00,21.00,58.00,8.00,4.00,94.00,66.00,26.00,79.00,7.00,160.04,0",
						"728,45.00,75.00,42.00,47.00,19.00,85.00,52.00,46.00,86.00,1.00,73.00,32.00,50.00,91.00,152.21,0",
						"729,40.00,8.00,57.00,4.00,30.00,7.00,61.00,45.00,51.00,48.00,22.00,6.00,45.00,38.00,168.76,0",
						"730,39.00,22.00,20.00,21.00,89.00,45.00,2.00,57.00,91.00,98.00,52.00,96.00,14.00,72.00,155.11,0",
						"731,82.00,34.00,73.00,89.00,98.00,48.00,2.00,27.00,78.00,98.00,71.00,39.00,56.00,10.00,155.04,0",
						"732,83.00,91.00,59.00,75.00,72.00,19.00,80.00,70.00,75.00,73.00,24.00,37.00,0.00,91.00,154.30,0",
						"733,56.00,38.00,36.00,94.00,82.00,99.00,30.00,36.00,83.00,84.00,57.00,25.00,6.00,88.00,147.69,0",
						"734,24.00,59.00,94.00,97.00,7.00,45.00,22.00,60.00,62.00,96.00,96.00,34.00,92.00,30.00,164.18,0",
						"735,63.00,6.00,14.00,75.00,97.00,88.00,28.00,77.00,57.00,69.00,13.00,39.00,76.00,49.00,161.93,0",
						"736,42.00,54.00,87.00,78.00,36.00,49.00,33.00,63.00,91.00,99.00,2.00,25.00,8.00,59.00,126.57,0",
						"737,50.00,85.00,67.00,28.00,5.00,37.00,26.00,47.00,45.00,49.00,97.00,82.00,59.00,91.00,154.33,0",
						"738,22.00,55.00,16.00,83.00,59.00,86.00,71.00,31.00,8.00,32.00,8.00,14.00,79.00,97.00,155.38,0",
						"739,59.00,43.00,74.00,61.00,34.00,3.00,98.00,11.00,97.00,9.00,26.00,10.00,40.00,39.00,152.05,0",
						"740,48.00,18.00,44.00,86.00,58.00,79.00,36.00,1.00,98.00,10.00,12.00,23.00,47.00,57.00,158.11,0",
						"741,3.00,47.00,38.00,43.00,49.00,22.00,0.00,93.00,55.00,28.00,59.00,88.00,83.00,75.00,131.04,0",
						"742,45.00,14.00,49.00,45.00,33.00,52.00,68.00,60.00,56.00,69.00,4.00,65.00,92.00,36.00,131.60,0",
						"743,96.00,3.00,77.00,71.00,31.00,10.00,10.00,74.00,56.00,28.00,3.00,16.00,78.00,84.00,146.82,0",
						"744,72.00,1.00,67.00,98.00,72.00,28.00,1.00,30.00,8.00,52.00,67.00,5.00,40.00,99.00,148.18,0",
						"745,59.00,6.00,29.00,62.00,13.00,62.00,26.00,67.00,67.00,43.00,65.00,32.00,36.00,31.00,121.91,0",
						"746,54.00,34.00,2.00,66.00,5.00,44.00,25.00,38.00,36.00,87.00,19.00,36.00,33.00,98.00,138.32,0",
						"747,94.00,67.00,71.00,13.00,53.00,95.00,9.00,23.00,41.00,92.00,7.00,33.00,53.00,58.00,158.25,0",
						"748,24.00,55.00,77.00,59.00,21.00,30.00,72.00,0.00,76.00,12.00,89.00,56.00,70.00,41.00,144.84,0",
						"749,44.00,77.00,35.00,50.00,83.00,77.00,52.00,52.00,75.00,14.00,39.00,62.00,26.00,30.00,133.99,0",
						"750,71.00,89.00,30.00,43.00,39.00,58.00,15.00,91.00,28.00,45.00,83.00,88.00,35.00,1.00,159.57,0",
						"751,7.00,39.00,94.00,51.00,99.00,86.00,43.00,57.00,79.00,96.00,79.00,24.00,45.00,85.00,170.53,0",
						"752,88.00,98.00,18.00,0.00,14.00,74.00,4.00,10.00,89.00,45.00,2.00,15.00,76.00,55.00,188.54,0",
						"753,12.00,63.00,71.00,75.00,87.00,79.00,58.00,0.00,97.00,43.00,77.00,25.00,6.00,98.00,162.56,0",
						"754,4.00,65.00,86.00,45.00,96.00,36.00,99.00,88.00,49.00,17.00,47.00,10.00,40.00,64.00,167.08,0",
						"755,91.00,68.00,40.00,99.00,39.00,53.00,68.00,10.00,85.00,97.00,32.00,6.00,46.00,8.00,170.94,0",
						"756,61.00,16.00,68.00,55.00,52.00,74.00,67.00,70.00,51.00,45.00,31.00,29.00,23.00,13.00,149.68,0",
						"757,6.00,49.00,62.00,36.00,12.00,25.00,8.00,63.00,6.00,55.00,54.00,91.00,45.00,81.00,157.98,0",
						"758,43.00,90.00,77.00,93.00,14.00,53.00,22.00,26.00,26.00,8.00,15.00,0.00,5.00,34.00,170.09,0",
						"759,32.00,0.00,16.00,27.00,78.00,13.00,64.00,63.00,34.00,99.00,25.00,44.00,16.00,95.00,163.18,0",
						"760,48.00,69.00,52.00,77.00,99.00,51.00,54.00,86.00,86.00,64.00,66.00,19.00,42.00,82.00,131.95,0",
						"761,10.00,71.00,9.00,14.00,77.00,95.00,25.00,63.00,78.00,99.00,97.00,43.00,9.00,25.00,145.87,0",
						"762,6.00,89.00,55.00,9.00,39.00,55.00,48.00,24.00,29.00,47.00,74.00,63.00,71.00,85.00,153.59,0",
						"763,1.00,11.00,37.00,89.00,2.00,47.00,0.00,49.00,29.00,18.00,80.00,41.00,15.00,60.00,168.02,0",
						"764,99.00,35.00,90.00,95.00,59.00,20.00,63.00,47.00,31.00,11.00,26.00,7.00,96.00,31.00,170.62,0",
						"765,13.00,92.00,5.00,41.00,64.00,57.00,58.00,81.00,85.00,40.00,46.00,11.00,50.00,59.00,156.28,0",
						"766,3.00,12.00,20.00,94.00,76.00,43.00,39.00,50.00,41.00,97.00,37.00,72.00,4.00,57.00,137.89,0",
						"767,14.00,4.00,40.00,90.00,62.00,0.00,86.00,38.00,25.00,97.00,81.00,50.00,23.00,50.00,140.13,0",
						"768,47.00,44.00,71.00,97.00,90.00,81.00,42.00,54.00,37.00,3.00,22.00,49.00,50.00,61.00,138.52,0",
						"769,17.00,84.00,50.00,47.00,49.00,43.00,73.00,49.00,57.00,53.00,12.00,98.00,70.00,44.00,130.52,0",
						"770,54.00,95.00,81.00,48.00,86.00,68.00,20.00,49.00,35.00,31.00,36.00,4.00,86.00,31.00,139.75,0",
						"771,33.00,69.00,16.00,44.00,58.00,62.00,12.00,66.00,45.00,2.00,72.00,68.00,59.00,65.00,148.96,0",
						"772,57.00,32.00,29.00,85.00,26.00,25.00,74.00,52.00,56.00,96.00,41.00,5.00,36.00,11.00,142.33,0",
						"773,3.00,47.00,82.00,27.00,42.00,61.00,31.00,50.00,57.00,56.00,71.00,27.00,39.00,92.00,126.85,0",
						"774,72.00,94.00,48.00,25.00,7.00,76.00,7.00,61.00,36.00,39.00,15.00,68.00,65.00,54.00,145.04,0",
						"775,70.00,17.00,84.00,33.00,98.00,89.00,70.00,88.00,47.00,93.00,13.00,18.00,21.00,52.00,161.13,0",
						"776,75.00,1.00,44.00,98.00,45.00,48.00,55.00,86.00,38.00,2.00,5.00,39.00,60.00,18.00,156.89,0",
						"777,7.00,65.00,69.00,96.00,66.00,55.00,0.00,88.00,86.00,81.00,51.00,93.00,34.00,18.00,147.43,0",
						"778,24.00,65.00,83.00,99.00,92.00,44.00,14.00,22.00,44.00,18.00,41.00,38.00,4.00,98.00,147.39,0",
						"779,78.00,48.00,14.00,70.00,75.00,28.00,8.00,25.00,87.00,42.00,26.00,97.00,51.00,54.00,152.80,0",
						"780,90.00,14.00,93.00,95.00,11.00,35.00,42.00,5.00,97.00,8.00,87.00,96.00,24.00,52.00,158.61,0",
						"781,53.00,34.00,7.00,73.00,13.00,82.00,83.00,42.00,31.00,75.00,85.00,17.00,24.00,87.00,157.12,0",
						"782,40.00,56.00,8.00,18.00,30.00,27.00,50.00,57.00,63.00,31.00,43.00,22.00,63.00,93.00,142.30,0",
						"783,73.00,11.00,77.00,33.00,96.00,2.00,48.00,70.00,76.00,8.00,94.00,3.00,30.00,63.00,156.90,0",
						"784,29.00,5.00,81.00,56.00,70.00,16.00,81.00,15.00,2.00,56.00,91.00,83.00,74.00,38.00,176.95,0",
						"785,97.00,34.00,79.00,43.00,70.00,59.00,51.00,69.00,21.00,9.00,39.00,32.00,17.00,87.00,151.98,0",
						"786,16.00,17.00,36.00,12.00,28.00,91.00,14.00,37.00,66.00,22.00,80.00,39.00,69.00,77.00,151.33,0",
						"787,18.00,61.00,34.00,39.00,77.00,21.00,18.00,31.00,40.00,60.00,27.00,82.00,81.00,69.00,134.62,0",
						"788,4.00,93.00,78.00,98.00,63.00,0.00,47.00,58.00,50.00,1.00,7.00,85.00,98.00,34.00,150.58,0",
						"789,18.00,88.00,80.00,87.00,82.00,52.00,83.00,36.00,18.00,63.00,15.00,23.00,1.00,16.00,158.97,0",
						"790,84.00,58.00,7.00,41.00,46.00,36.00,22.00,38.00,65.00,27.00,24.00,32.00,50.00,45.00,133.39,0",
						"791,77.00,36.00,89.00,91.00,61.00,63.00,15.00,33.00,59.00,47.00,19.00,67.00,77.00,88.00,131.13,0",
						"792,68.00,13.00,79.00,92.00,22.00,49.00,44.00,20.00,94.00,90.00,41.00,9.00,81.00,54.00,147.51,0",
						"793,33.00,64.00,54.00,29.00,46.00,82.00,27.00,74.00,17.00,80.00,77.00,98.00,48.00,83.00,140.87,0",
						"794,96.00,24.00,62.00,3.00,86.00,96.00,24.00,74.00,66.00,93.00,16.00,44.00,76.00,65.00,146.45,0",
						"795,74.00,46.00,20.00,3.00,34.00,60.00,68.00,68.00,47.00,57.00,33.00,59.00,65.00,75.00,131.18,0",
						"796,16.00,40.00,67.00,43.00,9.00,76.00,55.00,18.00,1.00,40.00,3.00,73.00,30.00,60.00,164.23,0",
						"797,94.00,3.00,12.00,47.00,55.00,22.00,9.00,52.00,86.00,18.00,80.00,51.00,8.00,2.00,162.75,0",
						"798,74.00,57.00,82.00,96.00,82.00,51.00,59.00,63.00,71.00,31.00,27.00,99.00,37.00,2.00,148.02,0",
						"799,87.00,34.00,76.00,90.00,46.00,94.00,85.00,34.00,79.00,40.00,28.00,1.00,14.00,48.00,147.66,0",
						"800,44.00,64.00,53.00,39.00,58.00,13.00,19.00,58.00,88.00,57.00,56.00,88.00,80.00,5.00,130.76,0",
						"801,72.00,28.00,14.00,60.00,70.00,44.00,72.00,60.00,49.00,82.00,89.00,64.00,26.00,21.00,127.63,0",
						"802,29.00,40.00,97.00,88.00,22.00,9.00,95.00,15.00,74.00,35.00,85.00,11.00,85.00,99.00,162.23,0",
						"803,10.00,65.00,82.00,85.00,99.00,75.00,19.00,24.00,87.00,47.00,33.00,26.00,55.00,21.00,163.91,0",
						"804,50.00,44.00,32.00,56.00,29.00,15.00,32.00,88.00,0.00,84.00,84.00,55.00,41.00,14.00,132.79,0",
						"805,47.00,53.00,51.00,66.00,65.00,51.00,25.00,52.00,39.00,41.00,77.00,41.00,14.00,20.00,118.16,0",
						"806,74.00,48.00,47.00,16.00,73.00,23.00,49.00,21.00,86.00,98.00,74.00,65.00,83.00,99.00,172.19,0",
						"807,65.00,94.00,79.00,3.00,6.00,58.00,80.00,65.00,1.00,45.00,31.00,81.00,0.00,6.00,181.25,0",
						"808,20.00,83.00,15.00,95.00,66.00,41.00,1.00,39.00,17.00,63.00,57.00,49.00,47.00,70.00,138.86,0",
						"809,48.00,99.00,26.00,69.00,71.00,17.00,24.00,17.00,69.00,16.00,61.00,84.00,74.00,44.00,138.02,0",
						"810,6.00,25.00,15.00,90.00,47.00,42.00,65.00,34.00,10.00,26.00,63.00,25.00,84.00,53.00,143.19,0",
						"811,12.00,59.00,85.00,47.00,82.00,30.00,96.00,82.00,80.00,14.00,65.00,6.00,81.00,12.00,162.73,0",
						"812,94.00,87.00,92.00,34.00,85.00,60.00,4.00,93.00,24.00,46.00,30.00,15.00,40.00,31.00,151.32,0",
						"813,46.00,28.00,52.00,34.00,54.00,12.00,2.00,61.00,15.00,66.00,8.00,51.00,77.00,12.00,154.42,0",
						"814,29.00,28.00,54.00,95.00,75.00,38.00,95.00,70.00,16.00,13.00,90.00,71.00,45.00,27.00,144.90,0",
						"815,17.00,26.00,11.00,99.00,44.00,51.00,62.00,37.00,99.00,47.00,65.00,95.00,87.00,26.00,164.53,0",
						"816,59.00,78.00,47.00,60.00,40.00,67.00,11.00,7.00,7.00,61.00,7.00,25.00,52.00,65.00,149.25,0",
						"817,54.00,55.00,7.00,66.00,78.00,82.00,67.00,19.00,25.00,45.00,50.00,10.00,79.00,12.00,150.65,0",
						"818,26.00,86.00,79.00,0.00,69.00,21.00,4.00,93.00,74.00,96.00,80.00,21.00,3.00,89.00,185.00,0",
						"819,48.00,14.00,4.00,64.00,55.00,11.00,10.00,50.00,1.00,99.00,49.00,74.00,13.00,88.00,139.23,0",
						"820,39.00,49.00,74.00,80.00,18.00,2.00,15.00,98.00,34.00,59.00,82.00,0.00,80.00,23.00,175.71,0",
						"821,90.00,96.00,75.00,33.00,78.00,86.00,64.00,41.00,10.00,29.00,29.00,99.00,82.00,26.00,156.92,0",
						"822,40.00,41.00,14.00,10.00,15.00,66.00,56.00,86.00,8.00,46.00,42.00,58.00,25.00,8.00,155.89,0",
						"823,11.00,75.00,61.00,96.00,25.00,62.00,7.00,1.00,85.00,55.00,53.00,66.00,98.00,11.00,155.63,0",
						"824,94.00,89.00,45.00,98.00,72.00,8.00,7.00,16.00,24.00,22.00,1.00,71.00,76.00,19.00,176.72,0",
						"825,28.00,94.00,55.00,4.00,29.00,69.00,13.00,82.00,88.00,50.00,70.00,45.00,53.00,16.00,147.39,0",
						"826,13.00,60.00,96.00,39.00,3.00,72.00,46.00,0.00,22.00,79.00,82.00,6.00,99.00,67.00,177.82,0",
						"827,78.00,94.00,70.00,52.00,46.00,15.00,92.00,63.00,42.00,63.00,73.00,58.00,8.00,36.00,140.24,0",
						"828,26.00,81.00,3.00,94.00,90.00,58.00,68.00,38.00,88.00,72.00,21.00,27.00,0.00,97.00,166.07,0",
						"829,71.00,80.00,0.00,31.00,1.00,39.00,27.00,79.00,12.00,22.00,96.00,78.00,0.00,68.00,162.04,0",
						"830,28.00,27.00,8.00,35.00,65.00,13.00,81.00,92.00,12.00,10.00,17.00,72.00,19.00,86.00,157.36,0",
						"831,19.00,91.00,8.00,67.00,27.00,98.00,98.00,57.00,7.00,47.00,46.00,5.00,17.00,69.00,152.91,0",
						"832,26.00,23.00,66.00,21.00,30.00,2.00,85.00,24.00,84.00,22.00,68.00,39.00,93.00,44.00,157.11,0",
						"833,91.00,33.00,51.00,68.00,70.00,53.00,50.00,44.00,81.00,76.00,70.00,77.00,4.00,53.00,131.73,0",
						"834,15.00,1.00,66.00,77.00,8.00,64.00,79.00,25.00,36.00,51.00,86.00,36.00,54.00,2.00,157.65,0",
						"835,88.00,90.00,55.00,78.00,23.00,69.00,75.00,48.00,15.00,88.00,44.00,9.00,14.00,90.00,152.37,0",
						"836,24.00,39.00,41.00,86.00,87.00,85.00,58.00,37.00,52.00,68.00,37.00,20.00,72.00,66.00,136.64,0",
						"837,84.00,37.00,17.00,71.00,22.00,53.00,9.00,18.00,97.00,40.00,48.00,1.00,34.00,65.00,129.41,0",
						"838,40.00,74.00,90.00,56.00,96.00,36.00,32.00,65.00,20.00,6.00,18.00,31.00,71.00,11.00,159.09,0",
						"839,19.00,63.00,56.00,94.00,74.00,60.00,79.00,20.00,36.00,61.00,56.00,72.00,64.00,78.00,128.15,0",
						"840,34.00,51.00,64.00,75.00,57.00,63.00,24.00,73.00,26.00,10.00,87.00,31.00,56.00,91.00,122.03,0",
						"841,73.00,34.00,72.00,53.00,9.00,85.00,32.00,51.00,17.00,85.00,89.00,45.00,24.00,69.00,133.09,0",
						"842,51.00,54.00,24.00,26.00,16.00,63.00,55.00,30.00,52.00,31.00,88.00,99.00,9.00,31.00,121.70,0",
						"843,20.00,14.00,59.00,53.00,44.00,85.00,89.00,42.00,27.00,43.00,98.00,87.00,28.00,84.00,134.41,0",
						"844,55.00,66.00,84.00,34.00,86.00,38.00,26.00,70.00,79.00,27.00,56.00,87.00,51.00,66.00,150.67,0",
						"845,72.00,72.00,22.00,98.00,60.00,85.00,64.00,64.00,3.00,94.00,80.00,51.00,60.00,20.00,162.07,0",
						"846,84.00,76.00,88.00,69.00,92.00,24.00,86.00,7.00,37.00,12.00,70.00,96.00,72.00,93.00,165.79,0",
						"847,20.00,97.00,12.00,10.00,73.00,37.00,73.00,51.00,20.00,85.00,18.00,32.00,65.00,19.00,173.87,0",
						"848,74.00,79.00,94.00,52.00,73.00,75.00,48.00,96.00,22.00,13.00,60.00,8.00,29.00,89.00,165.61,0",
						"849,59.00,14.00,0.00,15.00,53.00,9.00,59.00,13.00,85.00,50.00,70.00,26.00,30.00,9.00,151.13,0",
						"850,84.00,4.00,50.00,22.00,39.00,49.00,96.00,24.00,14.00,3.00,89.00,36.00,47.00,47.00,161.27,0",
						"851,36.00,18.00,60.00,53.00,6.00,38.00,2.00,31.00,0.00,66.00,18.00,84.00,36.00,48.00,153.34,0",
						"852,32.00,99.00,12.00,50.00,35.00,61.00,71.00,85.00,79.00,19.00,50.00,71.00,5.00,85.00,164.69,0",
						"853,99.00,43.00,12.00,69.00,48.00,84.00,53.00,12.00,38.00,73.00,17.00,32.00,74.00,16.00,153.95,0",
						"854,15.00,98.00,93.00,41.00,61.00,35.00,93.00,54.00,69.00,6.00,43.00,41.00,73.00,77.00,160.95,0",
						"855,96.00,50.00,80.00,61.00,77.00,83.00,20.00,23.00,78.00,27.00,5.00,9.00,72.00,95.00,164.33,0",
						"856,0.00,19.00,69.00,16.00,53.00,60.00,1.00,66.00,87.00,33.00,72.00,40.00,17.00,68.00,167.35,0",
						"857,59.00,78.00,86.00,49.00,66.00,40.00,63.00,70.00,31.00,18.00,65.00,33.00,92.00,34.00,138.10,0",
						"858,82.00,65.00,59.00,52.00,84.00,58.00,23.00,53.00,93.00,18.00,23.00,26.00,7.00,12.00,164.75,0",
						"859,39.00,61.00,43.00,19.00,7.00,20.00,66.00,16.00,32.00,42.00,56.00,53.00,42.00,50.00,128.80,0",
						"860,61.00,4.00,40.00,53.00,39.00,84.00,64.00,64.00,73.00,62.00,54.00,12.00,85.00,87.00,144.79,0",
						"861,96.00,35.00,20.00,90.00,61.00,12.00,80.00,58.00,38.00,43.00,73.00,31.00,86.00,2.00,163.93,0",
						"862,93.00,10.00,66.00,24.00,13.00,98.00,9.00,97.00,0.00,53.00,42.00,15.00,54.00,88.00,171.39,0",
						"863,52.00,40.00,87.00,40.00,76.00,40.00,72.00,34.00,53.00,10.00,31.00,46.00,81.00,98.00,165.61,0",
						"864,82.00,17.00,0.00,59.00,21.00,96.00,10.00,36.00,77.00,69.00,43.00,73.00,10.00,97.00,171.16,0",
						"865,38.00,76.00,17.00,79.00,96.00,89.00,3.00,25.00,14.00,4.00,93.00,61.00,13.00,54.00,136.89,0",
						"866,56.00,67.00,15.00,91.00,82.00,50.00,6.00,42.00,84.00,20.00,47.00,90.00,36.00,60.00,143.60,0",
						"867,9.00,86.00,95.00,67.00,88.00,65.00,8.00,51.00,17.00,80.00,31.00,25.00,42.00,77.00,158.03,0",
						"868,84.00,33.00,16.00,96.00,36.00,80.00,69.00,89.00,89.00,22.00,13.00,53.00,27.00,66.00,153.52,0",
						"869,48.00,78.00,4.00,83.00,33.00,15.00,5.00,4.00,87.00,61.00,88.00,24.00,9.00,52.00,140.81,0",
						"870,97.00,85.00,93.00,57.00,9.00,20.00,6.00,21.00,5.00,10.00,50.00,15.00,7.00,25.00,158.73,0",
						"871,31.00,52.00,33.00,33.00,54.00,56.00,67.00,6.00,34.00,56.00,40.00,72.00,59.00,31.00,132.31,0",
						"872,76.00,27.00,11.00,42.00,56.00,33.00,2.00,13.00,87.00,12.00,18.00,20.00,89.00,29.00,152.95,0",
						"873,39.00,14.00,4.00,59.00,49.00,62.00,14.00,98.00,24.00,84.00,66.00,45.00,24.00,2.00,140.93,0",
						"874,31.00,23.00,13.00,24.00,50.00,10.00,82.00,29.00,16.00,24.00,26.00,73.00,27.00,39.00,133.62,0",
						"875,22.00,9.00,36.00,56.00,11.00,35.00,83.00,77.00,71.00,51.00,11.00,85.00,19.00,61.00,131.97,0",
						"876,64.00,9.00,11.00,32.00,2.00,24.00,69.00,24.00,8.00,87.00,40.00,90.00,82.00,11.00,171.33,0",
						"877,25.00,98.00,26.00,28.00,37.00,21.00,4.00,24.00,39.00,52.00,33.00,2.00,78.00,12.00,153.34,0",
						"878,99.00,13.00,50.00,41.00,55.00,20.00,11.00,75.00,37.00,72.00,86.00,24.00,31.00,68.00,160.45,0",
						"879,4.00,88.00,73.00,57.00,10.00,98.00,49.00,4.00,99.00,36.00,59.00,53.00,50.00,46.00,184.00,0",
						"880,54.00,21.00,84.00,76.00,14.00,11.00,74.00,70.00,53.00,72.00,16.00,6.00,8.00,30.00,152.63,0",
						"881,72.00,2.00,19.00,95.00,46.00,39.00,9.00,72.00,26.00,97.00,31.00,41.00,32.00,45.00,147.84,0",
						"882,60.00,82.00,81.00,41.00,10.00,17.00,38.00,79.00,72.00,46.00,62.00,26.00,23.00,72.00,162.50,0",
						"883,78.00,2.00,84.00,27.00,84.00,71.00,92.00,39.00,34.00,20.00,79.00,29.00,20.00,5.00,178.95,0",
						"884,58.00,20.00,4.00,64.00,24.00,24.00,35.00,77.00,37.00,3.00,45.00,66.00,66.00,72.00,152.34,0",
						"885,91.00,67.00,13.00,56.00,41.00,33.00,88.00,47.00,98.00,42.00,21.00,21.00,4.00,22.00,141.04,0",
						"886,69.00,63.00,57.00,5.00,68.00,66.00,39.00,9.00,62.00,71.00,29.00,94.00,50.00,68.00,140.55,0",
						"887,23.00,77.00,7.00,46.00,85.00,30.00,91.00,60.00,37.00,22.00,89.00,81.00,81.00,89.00,164.34,0",
						"888,7.00,3.00,71.00,85.00,70.00,52.00,88.00,17.00,83.00,82.00,13.00,77.00,46.00,70.00,165.16,0",
						"889,51.00,67.00,10.00,21.00,9.00,38.00,35.00,67.00,3.00,59.00,4.00,5.00,38.00,14.00,159.31,0",
						"890,41.00,14.00,2.00,95.00,10.00,15.00,49.00,6.00,55.00,25.00,86.00,72.00,56.00,48.00,156.37,0",
						"891,50.00,44.00,12.00,6.00,0.00,42.00,5.00,80.00,92.00,39.00,34.00,77.00,45.00,54.00,148.35,0",
						"892,53.00,61.00,68.00,48.00,2.00,74.00,12.00,35.00,6.00,47.00,81.00,25.00,74.00,2.00,151.91,0",
						"893,6.00,79.00,14.00,48.00,70.00,21.00,24.00,94.00,52.00,10.00,10.00,31.00,58.00,52.00,155.29,0",
						"894,61.00,81.00,64.00,11.00,74.00,34.00,19.00,13.00,67.00,21.00,76.00,19.00,63.00,93.00,148.93,0",
						"895,31.00,40.00,37.00,18.00,5.00,31.00,42.00,46.00,26.00,76.00,91.00,96.00,88.00,6.00,172.76,0",
						"896,7.00,17.00,85.00,84.00,23.00,39.00,8.00,50.00,23.00,79.00,79.00,67.00,53.00,38.00,175.47,0",
						"897,29.00,33.00,32.00,80.00,99.00,65.00,99.00,26.00,34.00,2.00,37.00,19.00,32.00,97.00,148.89,0",
						"898,36.00,77.00,0.00,39.00,38.00,54.00,36.00,39.00,40.00,78.00,52.00,10.00,52.00,96.00,143.01,0",
						"899,64.00,49.00,19.00,73.00,32.00,63.00,6.00,93.00,46.00,48.00,77.00,73.00,42.00,5.00,132.05,0",
						"900,36.00,73.00,49.00,49.00,12.00,52.00,35.00,82.00,92.00,26.00,54.00,62.00,81.00,7.00,134.60,0",
						"901,60.00,93.00,12.00,85.00,18.00,80.00,37.00,36.00,1.00,71.00,5.00,18.00,30.00,20.00,157.08,0",
						"902,41.00,72.00,12.00,24.00,78.00,66.00,5.00,48.00,90.00,19.00,34.00,5.00,81.00,54.00,167.13,0",
						"903,73.00,16.00,93.00,21.00,10.00,25.00,48.00,91.00,6.00,19.00,91.00,81.00,79.00,34.00,165.95,0",
						"904,28.00,76.00,12.00,93.00,18.00,39.00,41.00,11.00,22.00,65.00,69.00,41.00,18.00,19.00,148.79,0",
						"905,76.00,77.00,24.00,40.00,3.00,10.00,64.00,65.00,23.00,60.00,88.00,28.00,18.00,23.00,129.81,0",
						"906,82.00,96.00,90.00,60.00,13.00,72.00,24.00,64.00,36.00,70.00,57.00,62.00,59.00,62.00,151.97,0",
						"907,11.00,4.00,80.00,3.00,74.00,94.00,99.00,6.00,50.00,27.00,67.00,99.00,54.00,8.00,168.08,0",
						"908,59.00,46.00,51.00,43.00,53.00,99.00,87.00,93.00,34.00,17.00,98.00,12.00,12.00,96.00,177.25,0",
						"909,47.00,93.00,54.00,33.00,72.00,42.00,8.00,9.00,47.00,24.00,84.00,87.00,49.00,71.00,151.46,0",
						"910,44.00,70.00,20.00,54.00,47.00,24.00,22.00,75.00,76.00,72.00,78.00,9.00,96.00,59.00,149.77,0",
						"911,10.00,10.00,93.00,25.00,99.00,11.00,75.00,87.00,9.00,6.00,83.00,54.00,32.00,58.00,186.39,0",
						"912,20.00,15.00,44.00,27.00,21.00,59.00,8.00,59.00,94.00,5.00,49.00,60.00,15.00,95.00,169.36,0",
						"913,86.00,99.00,75.00,30.00,1.00,89.00,47.00,47.00,66.00,90.00,53.00,18.00,8.00,8.00,166.88,0",
						"914,20.00,45.00,44.00,94.00,70.00,78.00,26.00,6.00,54.00,78.00,7.00,25.00,85.00,0.00,164.78,0",
						"915,2.00,69.00,43.00,94.00,11.00,1.00,2.00,18.00,37.00,57.00,34.00,40.00,44.00,69.00,168.48,0",
						"916,66.00,96.00,74.00,73.00,76.00,28.00,84.00,35.00,96.00,57.00,9.00,69.00,17.00,63.00,152.83,0",
						"917,80.00,72.00,64.00,46.00,91.00,63.00,83.00,15.00,10.00,41.00,31.00,28.00,59.00,67.00,144.46,0",
						"918,47.00,45.00,24.00,59.00,32.00,20.00,32.00,64.00,77.00,32.00,55.00,80.00,72.00,90.00,131.98,0",
						"919,28.00,15.00,72.00,9.00,9.00,70.00,46.00,72.00,77.00,65.00,55.00,66.00,67.00,53.00,140.61,0",
						"920,64.00,94.00,84.00,94.00,33.00,77.00,47.00,1.00,16.00,90.00,4.00,54.00,49.00,96.00,154.35,0",
						"921,6.00,82.00,31.00,63.00,15.00,40.00,70.00,44.00,18.00,70.00,17.00,83.00,89.00,11.00,155.65,0",
						"922,56.00,8.00,61.00,99.00,66.00,74.00,14.00,59.00,24.00,61.00,96.00,59.00,54.00,62.00,143.49,0",
						"923,56.00,78.00,95.00,77.00,5.00,86.00,41.00,27.00,46.00,57.00,92.00,54.00,84.00,12.00,155.32,0",
						"924,19.00,42.00,42.00,30.00,85.00,33.00,57.00,61.00,21.00,83.00,31.00,25.00,45.00,1.00,145.72,0",
						"925,35.00,53.00,65.00,60.00,18.00,21.00,24.00,11.00,23.00,30.00,61.00,98.00,85.00,81.00,141.68,0",
						"926,68.00,93.00,71.00,63.00,65.00,9.00,15.00,37.00,98.00,45.00,38.00,93.00,80.00,69.00,133.22,0",
						"927,29.00,20.00,47.00,36.00,94.00,0.00,38.00,17.00,16.00,93.00,3.00,30.00,4.00,43.00,182.74,0",
						"928,85.00,80.00,24.00,93.00,40.00,86.00,42.00,93.00,62.00,8.00,6.00,53.00,79.00,7.00,153.37,0",
						"929,73.00,80.00,64.00,84.00,90.00,41.00,14.00,19.00,22.00,37.00,25.00,35.00,37.00,37.00,137.73,0",
						"930,72.00,13.00,57.00,49.00,51.00,61.00,23.00,56.00,0.00,88.00,57.00,76.00,96.00,27.00,138.82,0",
						"931,53.00,41.00,17.00,8.00,21.00,82.00,1.00,33.00,88.00,91.00,78.00,74.00,74.00,55.00,133.32,0",
						"932,94.00,72.00,0.00,23.00,23.00,24.00,18.00,16.00,12.00,6.00,70.00,50.00,14.00,16.00,164.22,0",
						"933,9.00,25.00,81.00,46.00,10.00,37.00,3.00,8.00,75.00,11.00,3.00,22.00,53.00,31.00,167.07,0",
						"934,24.00,48.00,0.00,9.00,65.00,47.00,63.00,31.00,9.00,73.00,74.00,12.00,52.00,93.00,155.34,0",
						"935,69.00,36.00,92.00,50.00,62.00,21.00,66.00,14.00,52.00,70.00,53.00,66.00,78.00,90.00,151.65,0",
						"936,2.00,1.00,95.00,88.00,11.00,26.00,0.00,31.00,57.00,0.00,37.00,13.00,25.00,46.00,175.12,0",
						"937,93.00,97.00,10.00,68.00,48.00,21.00,25.00,89.00,99.00,50.00,15.00,89.00,90.00,39.00,164.03,0",
						"938,80.00,71.00,99.00,33.00,17.00,29.00,0.00,63.00,99.00,36.00,67.00,40.00,95.00,12.00,128.70,0",
						"939,77.00,42.00,91.00,27.00,92.00,94.00,23.00,46.00,51.00,2.00,69.00,54.00,77.00,49.00,144.59,0",
						"940,39.00,85.00,62.00,33.00,43.00,18.00,70.00,67.00,17.00,46.00,34.00,82.00,33.00,41.00,140.32,0",
						"941,16.00,6.00,91.00,97.00,49.00,5.00,27.00,58.00,55.00,33.00,11.00,47.00,6.00,58.00,150.84,0",
						"942,61.00,21.00,87.00,66.00,96.00,77.00,7.00,99.00,6.00,48.00,30.00,83.00,94.00,32.00,176.12,0",
						"943,63.00,84.00,7.00,46.00,12.00,23.00,45.00,13.00,52.00,67.00,42.00,85.00,1.00,12.00,177.89,0",
						"944,74.00,23.00,21.00,94.00,64.00,57.00,65.00,8.00,56.00,69.00,17.00,13.00,25.00,25.00,159.86,0",
						"945,35.00,95.00,44.00,47.00,46.00,14.00,40.00,95.00,91.00,76.00,97.00,58.00,74.00,31.00,158.30,0",
						"946,19.00,84.00,55.00,1.00,96.00,47.00,97.00,53.00,58.00,3.00,5.00,21.00,20.00,18.00,160.95,0",
						"947,40.00,40.00,29.00,5.00,78.00,61.00,30.00,72.00,19.00,22.00,41.00,3.00,12.00,9.00,146.44,0",
						"948,14.00,58.00,67.00,78.00,67.00,49.00,8.00,2.00,0.00,29.00,76.00,95.00,0.00,34.00,168.32,0",
						"949,37.00,8.00,8.00,62.00,36.00,51.00,37.00,79.00,71.00,78.00,22.00,29.00,25.00,28.00,152.84,0",
						"950,20.00,7.00,67.00,22.00,93.00,64.00,87.00,47.00,96.00,66.00,89.00,60.00,75.00,27.00,144.42,0",
						"951,75.00,48.00,85.00,36.00,53.00,64.00,11.00,15.00,97.00,79.00,77.00,44.00,29.00,22.00,144.35,0",
						"952,26.00,60.00,26.00,11.00,7.00,59.00,81.00,35.00,62.00,88.00,54.00,98.00,44.00,91.00,161.21,0",
						"953,70.00,19.00,93.00,64.00,75.00,62.00,29.00,87.00,86.00,11.00,10.00,68.00,78.00,87.00,165.83,0",
						"954,86.00,75.00,36.00,69.00,15.00,16.00,13.00,39.00,49.00,38.00,34.00,20.00,9.00,79.00,158.35,0",
						"955,92.00,52.00,2.00,58.00,29.00,91.00,82.00,92.00,98.00,98.00,44.00,43.00,51.00,51.00,158.23,0",
						"956,85.00,49.00,77.00,8.00,58.00,13.00,49.00,19.00,8.00,17.00,38.00,17.00,75.00,9.00,148.98,0",
						"957,57.00,57.00,53.00,59.00,29.00,40.00,87.00,57.00,69.00,8.00,69.00,63.00,25.00,18.00,122.49,0",
						"958,39.00,93.00,37.00,17.00,16.00,30.00,81.00,64.00,75.00,34.00,72.00,92.00,27.00,83.00,131.10,0",
						"959,65.00,28.00,43.00,43.00,95.00,98.00,75.00,98.00,77.00,3.00,89.00,24.00,12.00,42.00,175.29,0",
						"960,76.00,49.00,5.00,53.00,73.00,81.00,95.00,33.00,31.00,23.00,15.00,14.00,33.00,77.00,143.58,0",
						"961,0.00,72.00,62.00,63.00,70.00,85.00,92.00,86.00,23.00,26.00,19.00,31.00,68.00,12.00,147.42,0",
						"962,94.00,4.00,70.00,17.00,1.00,23.00,84.00,72.00,18.00,47.00,58.00,31.00,17.00,48.00,155.95,0",
						"963,93.00,52.00,58.00,64.00,14.00,83.00,34.00,47.00,77.00,78.00,34.00,87.00,10.00,55.00,127.73,0",
						"964,45.00,30.00,78.00,47.00,42.00,57.00,92.00,24.00,45.00,71.00,24.00,46.00,26.00,86.00,145.47,0",
						"965,74.00,83.00,95.00,86.00,4.00,50.00,20.00,84.00,81.00,20.00,26.00,77.00,34.00,94.00,149.65,0",
						"966,54.00,93.00,7.00,63.00,21.00,15.00,63.00,81.00,43.00,39.00,26.00,93.00,7.00,47.00,152.77,0",
						"967,19.00,36.00,26.00,87.00,86.00,77.00,17.00,80.00,16.00,16.00,23.00,56.00,90.00,41.00,162.62,0",
						"968,44.00,92.00,25.00,11.00,43.00,26.00,51.00,52.00,70.00,18.00,11.00,25.00,55.00,85.00,154.36,0",
						"969,63.00,94.00,9.00,26.00,39.00,49.00,53.00,5.00,43.00,61.00,55.00,97.00,21.00,27.00,152.19,0",
						"970,97.00,62.00,65.00,76.00,42.00,16.00,34.00,81.00,45.00,87.00,93.00,12.00,29.00,40.00,151.23,0",
						"971,70.00,96.00,9.00,28.00,99.00,28.00,21.00,60.00,30.00,57.00,3.00,54.00,16.00,35.00,140.52,0",
						"972,73.00,96.00,23.00,74.00,84.00,62.00,20.00,98.00,5.00,77.00,69.00,84.00,33.00,0.00,149.95,0",
						"973,70.00,12.00,34.00,99.00,4.00,73.00,82.00,88.00,80.00,24.00,32.00,10.00,22.00,85.00,156.82,0",
						"974,97.00,11.00,77.00,62.00,6.00,10.00,86.00,50.00,47.00,74.00,6.00,11.00,77.00,40.00,154.81,0",
						"975,70.00,17.00,93.00,28.00,86.00,72.00,81.00,33.00,50.00,84.00,36.00,12.00,51.00,24.00,146.52,0",
						"976,54.00,30.00,85.00,20.00,54.00,99.00,39.00,28.00,39.00,36.00,91.00,42.00,90.00,32.00,150.22,0",
						"977,29.00,48.00,26.00,95.00,57.00,8.00,59.00,27.00,63.00,76.00,61.00,49.00,62.00,94.00,140.51,0",
						"978,45.00,9.00,6.00,97.00,98.00,14.00,29.00,67.00,10.00,20.00,74.00,55.00,72.00,31.00,165.19,0",
						"979,0.00,3.00,62.00,24.00,65.00,23.00,7.00,16.00,66.00,7.00,27.00,27.00,56.00,92.00,144.90,0",
						"980,28.00,7.00,73.00,50.00,41.00,94.00,85.00,15.00,38.00,96.00,21.00,5.00,26.00,71.00,169.69,0",
						"981,69.00,41.00,77.00,57.00,26.00,4.00,42.00,48.00,67.00,24.00,22.00,46.00,69.00,69.00,139.38,0",
						"982,39.00,38.00,79.00,76.00,76.00,63.00,20.00,45.00,50.00,52.00,15.00,70.00,4.00,82.00,139.90,0",
						"983,41.00,74.00,68.00,75.00,17.00,72.00,73.00,68.00,26.00,93.00,26.00,94.00,87.00,93.00,155.97,0",
						"984,9.00,69.00,99.00,43.00,1.00,97.00,20.00,75.00,9.00,6.00,49.00,86.00,94.00,67.00,156.79,0",
						"985,61.00,5.00,61.00,23.00,0.00,59.00,82.00,33.00,61.00,33.00,29.00,59.00,22.00,43.00,140.10,0",
						"986,10.00,98.00,56.00,25.00,0.00,81.00,90.00,19.00,92.00,39.00,53.00,75.00,77.00,82.00,148.34,0",
						"987,33.00,78.00,28.00,87.00,59.00,34.00,64.00,91.00,96.00,67.00,56.00,85.00,58.00,44.00,133.93,0",
						"988,49.00,18.00,11.00,13.00,47.00,78.00,94.00,40.00,57.00,46.00,87.00,25.00,41.00,1.00,148.99,0",
						"989,67.00,94.00,34.00,29.00,13.00,56.00,4.00,43.00,15.00,20.00,91.00,59.00,40.00,38.00,134.61,0",
						"990,48.00,43.00,92.00,73.00,57.00,49.00,14.00,36.00,52.00,36.00,90.00,57.00,42.00,96.00,134.02,0",
						"991,19.00,27.00,22.00,59.00,32.00,14.00,82.00,42.00,7.00,0.00,71.00,91.00,40.00,2.00,155.70,0",
						"992,72.00,89.00,12.00,5.00,24.00,46.00,70.00,88.00,5.00,89.00,93.00,23.00,5.00,88.00,142.67,0",
						"993,48.00,46.00,8.00,12.00,64.00,92.00,81.00,36.00,12.00,21.00,74.00,49.00,9.00,35.00,143.72,0",
						"994,80.00,93.00,44.00,70.00,80.00,7.00,96.00,44.00,7.00,86.00,16.00,84.00,36.00,4.00,168.39,0",
						"995,18.00,54.00,91.00,72.00,39.00,77.00,59.00,5.00,79.00,37.00,30.00,10.00,6.00,20.00,155.13,0",
						"996,21.00,78.00,13.00,4.00,51.00,43.00,15.00,46.00,27.00,52.00,80.00,14.00,34.00,41.00,141.63,0",
						"997,79.00,63.00,15.00,64.00,91.00,26.00,17.00,70.00,16.00,35.00,71.00,79.00,33.00,12.00,145.01,0",
						"998,95.00,66.00,47.00,19.00,78.00,61.00,65.00,3.00,85.00,10.00,58.00,67.00,64.00,56.00,161.65,0",
						"999,3.00,91.00,23.00,77.00,26.00,4.00,18.00,8.00,50.00,86.00,99.00,14.00,86.00,24.00,195.85,0",
						"1000,91.00,46.00,52.00,1.00,30.00,91.00,86.00,82.00,8.00,3.00,87.00,81.00,33.00,49.00,183.24,0",
						"1001,85.00,61.00,85.00,99.00,63.00,88.00,96.00,90.00,62.00,70.00,41.00,96.00,94.00,27.00,179.39,0",
						"1002,10.00,21.00,54.00,84.00,1.00,18.00,6.00,54.00,54.00,15.00,20.00,1.00,80.00,74.00,188.12,0",
						"1003,57.00,73.00,67.00,17.00,87.00,76.00,48.00,37.00,3.00,76.00,69.00,82.00,83.00,47.00,153.29,0",
						"1004,55.00,84.00,94.00,16.00,28.00,83.00,11.00,79.00,51.00,43.00,61.00,14.00,92.00,26.00,148.01,0",
						"1005,64.00,88.00,14.00,80.00,26.00,36.00,59.00,50.00,72.00,24.00,94.00,71.00,79.00,87.00,151.62,0",
						"1006,40.00,83.00,56.00,53.00,57.00,93.00,60.00,37.00,99.00,0.00,50.00,5.00,9.00,34.00,161.28,0",
						"1007,3.00,90.00,22.00,82.00,59.00,87.00,94.00,84.00,41.00,5.00,54.00,59.00,97.00,1.00,165.22,0",
						"1008,22.00,23.00,4.00,14.00,59.00,25.00,86.00,97.00,83.00,57.00,51.00,63.00,42.00,79.00,160.19,0",
						"1009,86.00,82.00,89.00,34.00,70.00,8.00,66.00,61.00,80.00,66.00,3.00,74.00,12.00,89.00,146.85,0",
						"1010,98.00,25.00,94.00,83.00,74.00,67.00,64.00,56.00,73.00,98.00,4.00,7.00,45.00,2.00,172.10,0",
						"1011,6.00,49.00,2.00,57.00,32.00,50.00,29.00,34.00,52.00,36.00,12.00,59.00,32.00,48.00,139.06,0",
						"1012,98.00,91.00,10.00,55.00,42.00,32.00,46.00,5.00,28.00,6.00,20.00,90.00,18.00,56.00,158.79,0",
						"1013,90.00,95.00,19.00,19.00,23.00,44.00,34.00,61.00,0.00,96.00,67.00,0.00,56.00,81.00,163.06,0",
						"1014,58.00,2.00,91.00,7.00,39.00,13.00,31.00,43.00,3.00,23.00,10.00,49.00,89.00,56.00,160.28,0",
						"1015,72.00,55.00,35.00,7.00,22.00,9.00,48.00,4.00,65.00,79.00,86.00,17.00,41.00,14.00,161.35,0",
						"1016,49.00,36.00,21.00,91.00,38.00,80.00,36.00,33.00,54.00,98.00,91.00,22.00,79.00,55.00,155.29,0",
						"1017,53.00,33.00,49.00,33.00,20.00,11.00,31.00,17.00,9.00,5.00,73.00,57.00,44.00,82.00,148.38,0",
						"1018,30.00,58.00,75.00,62.00,43.00,84.00,77.00,3.00,43.00,93.00,71.00,23.00,90.00,0.00,148.53,0",
						"1019,73.00,71.00,77.00,44.00,64.00,99.00,40.00,86.00,80.00,47.00,66.00,28.00,54.00,11.00,141.73,0",
						"1020,42.00,30.00,44.00,10.00,3.00,43.00,55.00,10.00,99.00,13.00,83.00,52.00,97.00,98.00,162.66,0",
						"1021,93.00,33.00,65.00,57.00,23.00,62.00,73.00,29.00,34.00,1.00,1.00,97.00,45.00,31.00,148.74,0",
						"1022,33.00,40.00,38.00,70.00,75.00,48.00,33.00,50.00,36.00,62.00,13.00,52.00,79.00,72.00,136.22,0",
						"1023,15.00,74.00,85.00,47.00,2.00,51.00,69.00,4.00,76.00,12.00,60.00,95.00,16.00,48.00,147.11,0"
					]
				},
				"endTime": "2016-05-19T13:13:02.353Z"
			}
		]
	};

/***/ },

/***/ 449:
/*!************************************************************************************!*\
  !*** ../~/.npminstall/react/15.0.2/react/lib/ReactComponentWithPureRenderMixin.js ***!
  \************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentWithPureRenderMixin
	 */
	
	'use strict';
	
	var shallowCompare = __webpack_require__(/*! ./shallowCompare */ 450);
	
	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function (nextProps, nextState) {
	    return shallowCompare(this, nextProps, nextState);
	  }
	};
	
	module.exports = ReactComponentWithPureRenderMixin;

/***/ },

/***/ 450:
/*!*****************************************************************!*\
  !*** ../~/.npminstall/react/15.0.2/react/lib/shallowCompare.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule shallowCompare
	*/
	
	'use strict';
	
	var shallowEqual = __webpack_require__(/*! fbjs/lib/shallowEqual */ 139);
	
	/**
	 * Does a shallow comparison for props and state.
	 * See ReactComponentWithPureRenderMixin
	 */
	function shallowCompare(instance, nextProps, nextState) {
	  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
	}
	
	module.exports = shallowCompare;

/***/ },

/***/ 407:
/*!**********************************************************!*\
  !*** ../~/add-dom-event-listener/lib/EventBaseObject.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	/**
	 * @ignore
	 * base event object for custom and dom event.
	 * @author yiminghe@gmail.com
	 */
	
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function returnFalse() {
	  return false;
	}
	
	function returnTrue() {
	  return true;
	}
	
	function EventBaseObject() {
	  this.timeStamp = Date.now();
	  this.target = undefined;
	  this.currentTarget = undefined;
	}
	
	EventBaseObject.prototype = {
	  isEventObject: 1,
	
	  constructor: EventBaseObject,
	
	  isDefaultPrevented: returnFalse,
	
	  isPropagationStopped: returnFalse,
	
	  isImmediatePropagationStopped: returnFalse,
	
	  preventDefault: function preventDefault() {
	    this.isDefaultPrevented = returnTrue;
	  },
	
	  stopPropagation: function stopPropagation() {
	    this.isPropagationStopped = returnTrue;
	  },
	
	  stopImmediatePropagation: function stopImmediatePropagation() {
	    this.isImmediatePropagationStopped = returnTrue;
	    // fixed 1.2
	    // call stopPropagation implicitly
	    this.stopPropagation();
	  },
	
	  halt: function halt(immediate) {
	    if (immediate) {
	      this.stopImmediatePropagation();
	    } else {
	      this.stopPropagation();
	    }
	    this.preventDefault();
	  }
	};
	
	exports["default"] = EventBaseObject;
	module.exports = exports["default"];

/***/ },

/***/ 406:
/*!******************************************************!*\
  !*** ../~/add-dom-event-listener/lib/EventObject.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @ignore
	 * event object for dom
	 * @author yiminghe@gmail.com
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _EventBaseObject = __webpack_require__(/*! ./EventBaseObject */ 407);
	
	var _EventBaseObject2 = _interopRequireDefault(_EventBaseObject);
	
	var _objectAssign = __webpack_require__(/*! object-assign */ 408);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var TRUE = true;
	var FALSE = false;
	var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];
	
	function isNullOrUndefined(w) {
	  return w === null || w === undefined;
	}
	
	var eventNormalizers = [{
	  reg: /^key/,
	  props: ['char', 'charCode', 'key', 'keyCode', 'which'],
	  fix: function fix(event, nativeEvent) {
	    if (isNullOrUndefined(event.which)) {
	      event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
	    }
	
	    // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
	    if (event.metaKey === undefined) {
	      event.metaKey = event.ctrlKey;
	    }
	  }
	}, {
	  reg: /^touch/,
	  props: ['touches', 'changedTouches', 'targetTouches']
	}, {
	  reg: /^hashchange$/,
	  props: ['newURL', 'oldURL']
	}, {
	  reg: /^gesturechange$/i,
	  props: ['rotation', 'scale']
	}, {
	  reg: /^(mousewheel|DOMMouseScroll)$/,
	  props: [],
	  fix: function fix(event, nativeEvent) {
	    var deltaX = undefined;
	    var deltaY = undefined;
	    var delta = undefined;
	    var wheelDelta = nativeEvent.wheelDelta;
	    var axis = nativeEvent.axis;
	    var wheelDeltaY = nativeEvent.wheelDeltaY;
	    var wheelDeltaX = nativeEvent.wheelDeltaX;
	    var detail = nativeEvent.detail;
	
	    // ie/webkit
	    if (wheelDelta) {
	      delta = wheelDelta / 120;
	    }
	
	    // gecko
	    if (detail) {
	      // press control e.detail == 1 else e.detail == 3
	      delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
	    }
	
	    // Gecko
	    if (axis !== undefined) {
	      if (axis === event.HORIZONTAL_AXIS) {
	        deltaY = 0;
	        deltaX = 0 - delta;
	      } else if (axis === event.VERTICAL_AXIS) {
	        deltaX = 0;
	        deltaY = delta;
	      }
	    }
	
	    // Webkit
	    if (wheelDeltaY !== undefined) {
	      deltaY = wheelDeltaY / 120;
	    }
	    if (wheelDeltaX !== undefined) {
	      deltaX = -1 * wheelDeltaX / 120;
	    }
	
	    // 默认 deltaY (ie)
	    if (!deltaX && !deltaY) {
	      deltaY = delta;
	    }
	
	    if (deltaX !== undefined) {
	      /**
	       * deltaX of mousewheel event
	       * @property deltaX
	       * @member Event.DomEvent.Object
	       */
	      event.deltaX = deltaX;
	    }
	
	    if (deltaY !== undefined) {
	      /**
	       * deltaY of mousewheel event
	       * @property deltaY
	       * @member Event.DomEvent.Object
	       */
	      event.deltaY = deltaY;
	    }
	
	    if (delta !== undefined) {
	      /**
	       * delta of mousewheel event
	       * @property delta
	       * @member Event.DomEvent.Object
	       */
	      event.delta = delta;
	    }
	  }
	}, {
	  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
	  props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
	  fix: function fix(event, nativeEvent) {
	    var eventDoc = undefined;
	    var doc = undefined;
	    var body = undefined;
	    var target = event.target;
	    var button = nativeEvent.button;
	
	    // Calculate pageX/Y if missing and clientX/Y available
	    if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
	      eventDoc = target.ownerDocument || document;
	      doc = eventDoc.documentElement;
	      body = eventDoc.body;
	      event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
	      event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
	    }
	
	    // which for click: 1 === left; 2 === middle; 3 === right
	    // do not use button
	    if (!event.which && button !== undefined) {
	      if (button & 1) {
	        event.which = 1;
	      } else if (button & 2) {
	        event.which = 3;
	      } else if (button & 4) {
	        event.which = 2;
	      } else {
	        event.which = 0;
	      }
	    }
	
	    // add relatedTarget, if necessary
	    if (!event.relatedTarget && event.fromElement) {
	      event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
	    }
	
	    return event;
	  }
	}];
	
	function retTrue() {
	  return TRUE;
	}
	
	function retFalse() {
	  return FALSE;
	}
	
	function DomEventObject(nativeEvent) {
	  var type = nativeEvent.type;
	
	  var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';
	
	  _EventBaseObject2['default'].call(this);
	
	  this.nativeEvent = nativeEvent;
	
	  // in case dom event has been mark as default prevented by lower dom node
	  var isDefaultPrevented = retFalse;
	  if ('defaultPrevented' in nativeEvent) {
	    isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
	  } else if ('getPreventDefault' in nativeEvent) {
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
	    isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
	  } else if ('returnValue' in nativeEvent) {
	    isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
	  }
	
	  this.isDefaultPrevented = isDefaultPrevented;
	
	  var fixFns = [];
	  var fixFn = undefined;
	  var l = undefined;
	  var prop = undefined;
	  var props = commonProps.concat();
	
	  eventNormalizers.forEach(function (normalizer) {
	    if (type.match(normalizer.reg)) {
	      props = props.concat(normalizer.props);
	      if (normalizer.fix) {
	        fixFns.push(normalizer.fix);
	      }
	    }
	  });
	
	  l = props.length;
	
	  // clone properties of the original event object
	  while (l) {
	    prop = props[--l];
	    this[prop] = nativeEvent[prop];
	  }
	
	  // fix target property, if necessary
	  if (!this.target && isNative) {
	    this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
	  }
	
	  // check if target is a text node (safari)
	  if (this.target && this.target.nodeType === 3) {
	    this.target = this.target.parentNode;
	  }
	
	  l = fixFns.length;
	
	  while (l) {
	    fixFn = fixFns[--l];
	    fixFn(this, nativeEvent);
	  }
	
	  this.timeStamp = nativeEvent.timeStamp || Date.now();
	}
	
	var EventBaseObjectProto = _EventBaseObject2['default'].prototype;
	
	(0, _objectAssign2['default'])(DomEventObject.prototype, EventBaseObjectProto, {
	  constructor: DomEventObject,
	
	  preventDefault: function preventDefault() {
	    var e = this.nativeEvent;
	
	    // if preventDefault exists run it on the original event
	    if (e.preventDefault) {
	      e.preventDefault();
	    } else {
	      // otherwise set the returnValue property of the original event to FALSE (IE)
	      e.returnValue = FALSE;
	    }
	
	    EventBaseObjectProto.preventDefault.call(this);
	  },
	
	  stopPropagation: function stopPropagation() {
	    var e = this.nativeEvent;
	
	    // if stopPropagation exists run it on the original event
	    if (e.stopPropagation) {
	      e.stopPropagation();
	    } else {
	      // otherwise set the cancelBubble property of the original event to TRUE (IE)
	      e.cancelBubble = TRUE;
	    }
	
	    EventBaseObjectProto.stopPropagation.call(this);
	  }
	});
	
	exports['default'] = DomEventObject;
	module.exports = exports['default'];

/***/ },

/***/ 405:
/*!************************************************!*\
  !*** ../~/add-dom-event-listener/lib/index.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = addEventListener;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _EventObject = __webpack_require__(/*! ./EventObject */ 406);
	
	var _EventObject2 = _interopRequireDefault(_EventObject);
	
	function addEventListener(target, eventType, callback) {
	  function wrapCallback(e) {
	    var ne = new _EventObject2['default'](e);
	    callback.call(target, ne);
	  }
	
	  if (target.addEventListener) {
	    target.addEventListener(eventType, wrapCallback, false);
	    return {
	      remove: function remove() {
	        target.removeEventListener(eventType, wrapCallback, false);
	      }
	    };
	  } else if (target.attachEvent) {
	    target.attachEvent('on' + eventType, wrapCallback);
	    return {
	      remove: function remove() {
	        target.detachEvent('on' + eventType, wrapCallback);
	      }
	    };
	  }
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 408:
/*!************************************************************!*\
  !*** ../~/add-dom-event-listener/~/object-assign/index.js ***!
  \************************************************************/
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },

/***/ 437:
/*!***************************************!*\
  !*** ../~/component-classes/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	try {
	  var index = __webpack_require__(/*! indexof */ 438);
	} catch (err) {
	  var index = __webpack_require__(/*! component-indexof */ 438);
	}
	
	/**
	 * Whitespace regexp.
	 */
	
	var re = /\s+/;
	
	/**
	 * toString reference.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */
	
	module.exports = function(el){
	  return new ClassList(el);
	};
	
	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */
	
	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}
	
	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }
	
	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */
	
	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};
	
	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }
	
	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */
	
	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};
	
	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ },

/***/ 438:
/*!***************************************!*\
  !*** ../~/component-indexof/index.js ***!
  \***************************************/
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },

/***/ 436:
/*!***************************************!*\
  !*** ../~/css-animation/lib/Event.js ***!
  \***************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EVENT_NAME_MAP = {
	  transitionend: {
	    transition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd',
	    MozTransition: 'mozTransitionEnd',
	    OTransition: 'oTransitionEnd',
	    msTransition: 'MSTransitionEnd'
	  },
	
	  animationend: {
	    animation: 'animationend',
	    WebkitAnimation: 'webkitAnimationEnd',
	    MozAnimation: 'mozAnimationEnd',
	    OAnimation: 'oAnimationEnd',
	    msAnimation: 'MSAnimationEnd'
	  }
	};
	
	var endEvents = [];
	
	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;
	
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }
	
	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }
	
	  for (var baseEventName in EVENT_NAME_MAP) {
	    if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
	      var baseEvents = EVENT_NAME_MAP[baseEventName];
	      for (var styleName in baseEvents) {
	        if (styleName in style) {
	          endEvents.push(baseEvents[styleName]);
	          break;
	        }
	      }
	    }
	  }
	}
	
	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	  detectEvents();
	}
	
	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}
	
	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}
	
	var TransitionEvents = {
	  addEndEventListener: function addEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },
	
	
	  endEvents: endEvents,
	
	  removeEndEventListener: function removeEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};
	
	exports["default"] = TransitionEvents;
	module.exports = exports['default'];

/***/ },

/***/ 435:
/*!***************************************!*\
  !*** ../~/css-animation/lib/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Event = __webpack_require__(/*! ./Event */ 436);
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _componentClasses = __webpack_require__(/*! component-classes */ 437);
	
	var _componentClasses2 = _interopRequireDefault(_componentClasses);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var isCssAnimationSupported = _Event2["default"].endEvents.length !== 0;
	
	
	var capitalPrefixes = ['Webkit', 'Moz', 'O',
	// ms is special .... !
	'ms'];
	var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];
	
	function getDuration(node, name) {
	  var style = window.getComputedStyle(node);
	
	  var ret = '';
	  for (var i = 0; i < prefixes.length; i++) {
	    ret = style.getPropertyValue(prefixes[i] + name);
	    if (ret) {
	      break;
	    }
	  }
	  return ret;
	}
	
	function fixBrowserByTimeout(node) {
	  if (isCssAnimationSupported) {
	    var transitionDuration = parseFloat(getDuration(node, 'transition-duration')) || 0;
	    var animationDuration = parseFloat(getDuration(node, 'animation-duration')) || 0;
	    var time = Math.max(transitionDuration, animationDuration);
	    // sometimes, browser bug
	    node.rcEndAnimTimeout = setTimeout(function () {
	      node.rcEndAnimTimeout = null;
	      if (node.rcEndListener) {
	        node.rcEndListener();
	      }
	    }, time * 1000 + 200);
	  }
	}
	
	function clearBrowserBugTimeout(node) {
	  if (node.rcEndAnimTimeout) {
	    clearTimeout(node.rcEndAnimTimeout);
	    node.rcEndAnimTimeout = null;
	  }
	}
	
	var cssAnimation = function cssAnimation(node, transitionName, endCallback) {
	  var className = transitionName;
	  var activeClassName = className + '-active';
	  var end = endCallback;
	  var start = void 0;
	  var active = void 0;
	  var nodeClasses = (0, _componentClasses2["default"])(node);
	
	  if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
	    end = endCallback.end;
	    start = endCallback.start;
	    active = endCallback.active;
	  }
	
	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }
	
	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }
	
	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }
	
	    clearBrowserBugTimeout(node);
	
	    nodeClasses.remove(className);
	    nodeClasses.remove(activeClassName);
	
	    _Event2["default"].removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;
	
	    // Usually this optional end is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (end) {
	      end();
	    }
	  };
	
	  _Event2["default"].addEndEventListener(node, node.rcEndListener);
	
	  if (start) {
	    start();
	  }
	  nodeClasses.add(className);
	
	  node.rcAnimTimeout = setTimeout(function () {
	    node.rcAnimTimeout = null;
	    nodeClasses.add(activeClassName);
	    if (active) {
	      setTimeout(active, 0);
	    }
	    fixBrowserByTimeout(node);
	    // 30ms for firefox
	  }, 30);
	
	  return {
	    stop: function stop() {
	      if (node.rcEndListener) {
	        node.rcEndListener();
	      }
	    }
	  };
	};
	
	cssAnimation.style = function (node, style, callback) {
	  if (node.rcEndListener) {
	    node.rcEndListener();
	  }
	
	  node.rcEndListener = function (e) {
	    if (e && e.target !== node) {
	      return;
	    }
	
	    if (node.rcAnimTimeout) {
	      clearTimeout(node.rcAnimTimeout);
	      node.rcAnimTimeout = null;
	    }
	
	    clearBrowserBugTimeout(node);
	
	    _Event2["default"].removeEndEventListener(node, node.rcEndListener);
	    node.rcEndListener = null;
	
	    // Usually this optional callback is used for informing an owner of
	    // a leave animation and telling it to remove the child.
	    if (callback) {
	      callback();
	    }
	  };
	
	  _Event2["default"].addEndEventListener(node, node.rcEndListener);
	
	  node.rcAnimTimeout = setTimeout(function () {
	    for (var s in style) {
	      if (style.hasOwnProperty(s)) {
	        node.style[s] = style[s];
	      }
	    }
	    node.rcAnimTimeout = null;
	    fixBrowserByTimeout(node);
	  }, 0);
	};
	
	cssAnimation.setTransition = function (node, p, value) {
	  var property = p;
	  var v = value;
	  if (value === undefined) {
	    v = property;
	    property = '';
	  }
	  property = property || '';
	  capitalPrefixes.forEach(function (prefix) {
	    node.style[prefix + 'Transition' + property] = v;
	  });
	};
	
	cssAnimation.isCssAnimationSupported = isCssAnimationSupported;
	
	exports["default"] = cssAnimation;
	module.exports = exports['default'];

/***/ },

/***/ 426:
/*!***********************************************!*\
  !*** ../~/dom-align/lib/adjustForViewport.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utils = __webpack_require__(/*! ./utils */ 423);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
	  var pos = _utils2['default'].clone(elFuturePos);
	  var size = {
	    width: elRegion.width,
	    height: elRegion.height
	  };
	
	  if (overflow.adjustX && pos.left < visibleRect.left) {
	    pos.left = visibleRect.left;
	  }
	
	  // Left edge inside and right edge outside viewport, try to resize it.
	  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
	    size.width -= pos.left + size.width - visibleRect.right;
	  }
	
	  // Right edge outside viewport, try to move it.
	  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
	    // 保证左边界和可视区域左边界对齐
	    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
	  }
	
	  // Top edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top < visibleRect.top) {
	    pos.top = visibleRect.top;
	  }
	
	  // Top edge inside and bottom edge outside viewport, try to resize it.
	  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
	    size.height -= pos.top + size.height - visibleRect.bottom;
	  }
	
	  // Bottom edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
	    // 保证上边界和可视区域上边界对齐
	    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
	  }
	
	  return _utils2['default'].mix(pos, size);
	}
	
	exports['default'] = adjustForViewport;
	module.exports = exports['default'];

/***/ },

/***/ 429:
/*!********************************************!*\
  !*** ../~/dom-align/lib/getAlignOffset.js ***!
  \********************************************/
/***/ function(module, exports) {

	/**
	 * 获取 node 上的 align 对齐点 相对于页面的坐标
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	function getAlignOffset(region, align) {
	  var V = align.charAt(0);
	  var H = align.charAt(1);
	  var w = region.width;
	  var h = region.height;
	  var x = undefined;
	  var y = undefined;
	
	  x = region.left;
	  y = region.top;
	
	  if (V === 'c') {
	    y += h / 2;
	  } else if (V === 'b') {
	    y += h;
	  }
	
	  if (H === 'c') {
	    x += w / 2;
	  } else if (H === 'r') {
	    x += w;
	  }
	
	  return {
	    left: x,
	    top: y
	  };
	}
	
	exports['default'] = getAlignOffset;
	module.exports = exports['default'];

/***/ },

/***/ 428:
/*!********************************************!*\
  !*** ../~/dom-align/lib/getElFuturePos.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _getAlignOffset = __webpack_require__(/*! ./getAlignOffset */ 429);
	
	var _getAlignOffset2 = _interopRequireDefault(_getAlignOffset);
	
	function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
	  var xy = undefined;
	  var diff = undefined;
	  var p1 = undefined;
	  var p2 = undefined;
	
	  xy = {
	    left: elRegion.left,
	    top: elRegion.top
	  };
	
	  p1 = (0, _getAlignOffset2['default'])(refNodeRegion, points[1]);
	  p2 = (0, _getAlignOffset2['default'])(elRegion, points[0]);
	
	  diff = [p2.left - p1.left, p2.top - p1.top];
	
	  return {
	    left: xy.left - diff[0] + offset[0] - targetOffset[0],
	    top: xy.top - diff[1] + offset[1] - targetOffset[1]
	  };
	}
	
	exports['default'] = getElFuturePos;
	module.exports = exports['default'];

/***/ },

/***/ 424:
/*!*********************************************!*\
  !*** ../~/dom-align/lib/getOffsetParent.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utils = __webpack_require__(/*! ./utils */ 423);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	/**
	 * 得到会导致元素显示不全的祖先元素
	 */
	
	function getOffsetParent(element) {
	  // ie 这个也不是完全可行
	  /*
	   <div style="width: 50px;height: 100px;overflow: hidden">
	   <div style="width: 50px;height: 100px;position: relative;" id="d6">
	   元素 6 高 100px 宽 50px<br/>
	   </div>
	   </div>
	   */
	  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
	  //  In other browsers it only includes elements with position absolute, relative or
	  // fixed, not elements with overflow set to auto or scroll.
	  //        if (UA.ie && ieMode < 8) {
	  //            return element.offsetParent;
	  //        }
	  // 统一的 offsetParent 方法
	  var doc = element.ownerDocument;
	  var body = doc.body;
	  var parent = undefined;
	  var positionStyle = _utils2['default'].css(element, 'position');
	  var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';
	
	  if (!skipStatic) {
	    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
	  }
	
	  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
	    positionStyle = _utils2['default'].css(parent, 'position');
	    if (positionStyle !== 'static') {
	      return parent;
	    }
	  }
	  return null;
	}
	
	exports['default'] = getOffsetParent;
	module.exports = exports['default'];

/***/ },

/***/ 427:
/*!***************************************!*\
  !*** ../~/dom-align/lib/getRegion.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utils = __webpack_require__(/*! ./utils */ 423);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function getRegion(node) {
	  var offset = undefined;
	  var w = undefined;
	  var h = undefined;
	  if (!_utils2['default'].isWindow(node) && node.nodeType !== 9) {
	    offset = _utils2['default'].offset(node);
	    w = _utils2['default'].outerWidth(node);
	    h = _utils2['default'].outerHeight(node);
	  } else {
	    var win = _utils2['default'].getWindow(node);
	    offset = {
	      left: _utils2['default'].getWindowScrollLeft(win),
	      top: _utils2['default'].getWindowScrollTop(win)
	    };
	    w = _utils2['default'].viewportWidth(win);
	    h = _utils2['default'].viewportHeight(win);
	  }
	  offset.width = w;
	  offset.height = h;
	  return offset;
	}
	
	exports['default'] = getRegion;
	module.exports = exports['default'];

/***/ },

/***/ 425:
/*!******************************************************!*\
  !*** ../~/dom-align/lib/getVisibleRectForElement.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utils = __webpack_require__(/*! ./utils */ 423);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _getOffsetParent = __webpack_require__(/*! ./getOffsetParent */ 424);
	
	var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);
	
	/**
	 * 获得元素的显示部分的区域
	 */
	function getVisibleRectForElement(element) {
	  var visibleRect = {
	    left: 0,
	    right: Infinity,
	    top: 0,
	    bottom: Infinity
	  };
	  var el = (0, _getOffsetParent2['default'])(element);
	  var scrollX = undefined;
	  var scrollY = undefined;
	  var winSize = undefined;
	  var doc = element.ownerDocument;
	  var win = doc.defaultView || doc.parentWindow;
	  var body = doc.body;
	  var documentElement = doc.documentElement;
	
	  // Determine the size of the visible rect by climbing the dom accounting for
	  // all scrollable containers.
	  while (el) {
	    // clientWidth is zero for inline block elements in ie.
	    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) &&
	    // body may have overflow set on it, yet we still get the entire
	    // viewport. In some browsers, el.offsetParent may be
	    // document.documentElement, so check for that too.
	    el !== body && el !== documentElement && _utils2['default'].css(el, 'overflow') !== 'visible') {
	      var pos = _utils2['default'].offset(el);
	      // add border
	      pos.left += el.clientLeft;
	      pos.top += el.clientTop;
	      visibleRect.top = Math.max(visibleRect.top, pos.top);
	      visibleRect.right = Math.min(visibleRect.right,
	      // consider area without scrollBar
	      pos.left + el.clientWidth);
	      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
	      visibleRect.left = Math.max(visibleRect.left, pos.left);
	    } else if (el === body || el === documentElement) {
	      break;
	    }
	    el = (0, _getOffsetParent2['default'])(el);
	  }
	
	  // Clip by window's viewport.
	  scrollX = _utils2['default'].getWindowScrollLeft(win);
	  scrollY = _utils2['default'].getWindowScrollTop(win);
	  visibleRect.left = Math.max(visibleRect.left, scrollX);
	  visibleRect.top = Math.max(visibleRect.top, scrollY);
	  winSize = {
	    width: _utils2['default'].viewportWidth(win),
	    height: _utils2['default'].viewportHeight(win)
	  };
	  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
	  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
	  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
	}
	
	exports['default'] = getVisibleRectForElement;
	module.exports = exports['default'];

/***/ },

/***/ 422:
/*!***********************************!*\
  !*** ../~/dom-align/lib/index.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * align dom node flexibly
	 * @author yiminghe@gmail.com
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utils = __webpack_require__(/*! ./utils */ 423);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _getOffsetParent = __webpack_require__(/*! ./getOffsetParent */ 424);
	
	var _getOffsetParent2 = _interopRequireDefault(_getOffsetParent);
	
	var _getVisibleRectForElement = __webpack_require__(/*! ./getVisibleRectForElement */ 425);
	
	var _getVisibleRectForElement2 = _interopRequireDefault(_getVisibleRectForElement);
	
	var _adjustForViewport = __webpack_require__(/*! ./adjustForViewport */ 426);
	
	var _adjustForViewport2 = _interopRequireDefault(_adjustForViewport);
	
	var _getRegion = __webpack_require__(/*! ./getRegion */ 427);
	
	var _getRegion2 = _interopRequireDefault(_getRegion);
	
	var _getElFuturePos = __webpack_require__(/*! ./getElFuturePos */ 428);
	
	var _getElFuturePos2 = _interopRequireDefault(_getElFuturePos);
	
	// http://yiminghe.iteye.com/blog/1124720
	
	function isFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
	}
	
	function isFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
	}
	
	function isCompleteFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left > visibleRect.right || elFuturePos.left + elRegion.width < visibleRect.left;
	}
	
	function isCompleteFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top > visibleRect.bottom || elFuturePos.top + elRegion.height < visibleRect.top;
	}
	
	function flip(points, reg, map) {
	  var ret = [];
	  _utils2['default'].each(points, function (p) {
	    ret.push(p.replace(reg, function (m) {
	      return map[m];
	    }));
	  });
	  return ret;
	}
	
	function flipOffset(offset, index) {
	  offset[index] = -offset[index];
	  return offset;
	}
	
	function convertOffset(str, offsetLen) {
	  var n = undefined;
	  if (/%$/.test(str)) {
	    n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
	  } else {
	    n = parseInt(str, 10);
	  }
	  return n || 0;
	}
	
	function normalizeOffset(offset, el) {
	  offset[0] = convertOffset(offset[0], el.width);
	  offset[1] = convertOffset(offset[1], el.height);
	}
	
	function domAlign(el, refNode, align) {
	  var points = align.points;
	  var offset = align.offset || [0, 0];
	  var targetOffset = align.targetOffset || [0, 0];
	  var overflow = align.overflow;
	  var target = align.target || refNode;
	  var source = align.source || el;
	  offset = [].concat(offset);
	  targetOffset = [].concat(targetOffset);
	  overflow = overflow || {};
	  var newOverflowCfg = {};
	
	  var fail = 0;
	  // 当前节点可以被放置的显示区域
	  var visibleRect = (0, _getVisibleRectForElement2['default'])(source);
	  // 当前节点所占的区域, left/top/width/height
	  var elRegion = (0, _getRegion2['default'])(source);
	  // 参照节点所占的区域, left/top/width/height
	  var refNodeRegion = (0, _getRegion2['default'])(target);
	  // 将 offset 转换成数值，支持百分比
	  normalizeOffset(offset, elRegion);
	  normalizeOffset(targetOffset, refNodeRegion);
	  // 当前节点将要被放置的位置
	  var elFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, points, offset, targetOffset);
	  // 当前节点将要所处的区域
	  var newElRegion = _utils2['default'].merge(elRegion, elFuturePos);
	
	  // 如果可视区域不能完全放置当前节点时允许调整
	  if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
	    if (overflow.adjustX) {
	      // 如果横向不能放下
	      if (isFailX(elFuturePos, elRegion, visibleRect)) {
	        // 对齐位置反下
	        var newPoints = flip(points, /[lr]/ig, {
	          l: 'r',
	          r: 'l'
	        });
	        // 偏移量也反下
	        var newOffset = flipOffset(offset, 0);
	        var newTargetOffset = flipOffset(targetOffset, 0);
	        var newElFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, newPoints, newOffset, newTargetOffset);
	        if (!isCompleteFailX(newElFuturePos, elRegion, visibleRect)) {
	          fail = 1;
	          points = newPoints;
	          offset = newOffset;
	          targetOffset = newTargetOffset;
	        }
	      }
	    }
	
	    if (overflow.adjustY) {
	      // 如果纵向不能放下
	      if (isFailY(elFuturePos, elRegion, visibleRect)) {
	        // 对齐位置反下
	        var newPoints = flip(points, /[tb]/ig, {
	          t: 'b',
	          b: 't'
	        });
	        // 偏移量也反下
	        var newOffset = flipOffset(offset, 1);
	        var newTargetOffset = flipOffset(targetOffset, 1);
	        var newElFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, newPoints, newOffset, newTargetOffset);
	        if (!isCompleteFailY(newElFuturePos, elRegion, visibleRect)) {
	          fail = 1;
	          points = newPoints;
	          offset = newOffset;
	          targetOffset = newTargetOffset;
	        }
	      }
	    }
	
	    // 如果失败，重新计算当前节点将要被放置的位置
	    if (fail) {
	      elFuturePos = (0, _getElFuturePos2['default'])(elRegion, refNodeRegion, points, offset, targetOffset);
	      _utils2['default'].mix(newElRegion, elFuturePos);
	    }
	
	    // 检查反下后的位置是否可以放下了
	    // 如果仍然放不下只有指定了可以调整当前方向才调整
	    newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);
	
	    newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);
	
	    // 确实要调整，甚至可能会调整高度宽度
	    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
	      newElRegion = (0, _adjustForViewport2['default'])(elFuturePos, elRegion, visibleRect, newOverflowCfg);
	    }
	  }
	
	  // need judge to in case set fixed with in css on height auto element
	  if (newElRegion.width !== elRegion.width) {
	    _utils2['default'].css(source, 'width', source.width() + newElRegion.width - elRegion.width);
	  }
	
	  if (newElRegion.height !== elRegion.height) {
	    _utils2['default'].css(source, 'height', source.height() + newElRegion.height - elRegion.height);
	  }
	
	  // https://github.com/kissyteam/kissy/issues/190
	  // http://localhost:8888/kissy/src/overlay/demo/other/relative_align/align.html
	  // 相对于屏幕位置没变，而 left/top 变了
	  // 例如 <div 'relative'><el absolute></div>
	  _utils2['default'].offset(source, {
	    left: newElRegion.left,
	    top: newElRegion.top
	  }, {
	    useCssRight: align.useCssRight,
	    useCssBottom: align.useCssBottom
	  });
	
	  return {
	    points: points,
	    offset: offset,
	    targetOffset: targetOffset,
	    overflow: newOverflowCfg
	  };
	}
	
	domAlign.__getOffsetParent = _getOffsetParent2['default'];
	
	domAlign.__getVisibleRectForElement = _getVisibleRectForElement2['default'];
	
	exports['default'] = domAlign;
	
	/**
	 *  2012-04-26 yiminghe@gmail.com
	 *   - 优化智能对齐算法
	 *   - 慎用 resizeXX
	 *
	 *  2011-07-13 yiminghe@gmail.com note:
	 *   - 增加智能对齐，以及大小调整选项
	 **/
	module.exports = exports['default'];

/***/ },

/***/ 423:
/*!***********************************!*\
  !*** ../~/dom-align/lib/utils.js ***!
  \***********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
	
	var getComputedStyleX = undefined;
	
	function css(el, name, v) {
	  var value = v;
	  if (typeof name === 'object') {
	    for (var i in name) {
	      if (name.hasOwnProperty(i)) {
	        css(el, i, name[i]);
	      }
	    }
	    return undefined;
	  }
	  if (typeof value !== 'undefined') {
	    if (typeof value === 'number') {
	      value = value + 'px';
	    }
	    el.style[name] = value;
	    return undefined;
	  }
	  return getComputedStyleX(el, name);
	}
	
	function getClientPosition(elem) {
	  var box = undefined;
	  var x = undefined;
	  var y = undefined;
	  var doc = elem.ownerDocument;
	  var body = doc.body;
	  var docElem = doc && doc.documentElement;
	  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
	  box = elem.getBoundingClientRect();
	
	  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
	  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
	  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin
	
	  x = box.left;
	  y = box.top;
	
	  // In IE, most of the time, 2 extra pixels are added to the top and left
	  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
	  // IE6 standards mode, this border can be overridden by setting the
	  // document element's border to zero -- thus, we cannot rely on the
	  // offset always being 2 pixels.
	
	  // In quirks mode, the offset can be determined by querying the body's
	  // clientLeft/clientTop, but in standards mode, it is found by querying
	  // the document element's clientLeft/clientTop.  Since we already called
	  // getClientBoundingRect we have already forced a reflow, so it is not
	  // too expensive just to query them all.
	
	  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
	  // 窗口边框标准是设 documentElement ,quirks 时设置 body
	  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
	  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
	  // 标准 ie 下 docElem.clientTop 就是 border-top
	  // ie7 html 即窗口边框改变不了。永远为 2
	  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0
	
	  x -= docElem.clientLeft || body.clientLeft || 0;
	  y -= docElem.clientTop || body.clientTop || 0;
	
	  return { left: x, top: y };
	}
	
	function getScroll(w, top) {
	  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
	  var method = 'scroll' + (top ? 'Top' : 'Left');
	  if (typeof ret !== 'number') {
	    var d = w.document;
	    // ie6,7,8 standard mode
	    ret = d.documentElement[method];
	    if (typeof ret !== 'number') {
	      // quirks mode
	      ret = d.body[method];
	    }
	  }
	  return ret;
	}
	
	function getScrollLeft(w) {
	  return getScroll(w);
	}
	
	function getScrollTop(w) {
	  return getScroll(w, true);
	}
	
	function getOffset(el) {
	  var pos = getClientPosition(el);
	  var doc = el.ownerDocument;
	  var w = doc.defaultView || doc.parentWindow;
	  pos.left += getScrollLeft(w);
	  pos.top += getScrollTop(w);
	  return pos;
	}
	function _getComputedStyle(elem, name, cs) {
	  var computedStyle = cs;
	  var val = '';
	  var d = elem.ownerDocument;
	  computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null);
	
	  // https://github.com/kissyteam/kissy/issues/61
	  if (computedStyle) {
	    val = computedStyle.getPropertyValue(name) || computedStyle[name];
	  }
	
	  return val;
	}
	
	var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
	var RE_POS = /^(top|right|bottom|left)$/;
	var CURRENT_STYLE = 'currentStyle';
	var RUNTIME_STYLE = 'runtimeStyle';
	var LEFT = 'left';
	var PX = 'px';
	
	function _getComputedStyleIE(elem, name) {
	  // currentStyle maybe null
	  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
	  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];
	
	  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
	  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
	  // 在 ie 下不对，需要直接用 offset 方式
	  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了
	
	  // From the awesome hack by Dean Edwards
	  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	  // If we're not dealing with a regular pixel number
	  // but a number that has a weird ending, we need to convert it to pixels
	  // exclude left right for relativity
	  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
	    // Remember the original values
	    var style = elem.style;
	    var left = style[LEFT];
	    var rsLeft = elem[RUNTIME_STYLE][LEFT];
	
	    // prevent flashing of content
	    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];
	
	    // Put in the new values to get a computed value out
	    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
	    ret = style.pixelLeft + PX;
	
	    // Revert the changed values
	    style[LEFT] = left;
	
	    elem[RUNTIME_STYLE][LEFT] = rsLeft;
	  }
	  return ret === '' ? 'auto' : ret;
	}
	
	if (typeof window !== 'undefined') {
	  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
	}
	
	function getOffsetDirection(dir, option) {
	  if (dir === 'left') {
	    return option.useCssRight ? 'right' : dir;
	  }
	  return option.useCssBottom ? 'bottom' : dir;
	}
	
	function oppositeOffsetDirection(dir) {
	  if (dir === 'left') {
	    return 'right';
	  } else if (dir === 'right') {
	    return 'left';
	  } else if (dir === 'top') {
	    return 'bottom';
	  } else if (dir === 'bottom') {
	    return 'top';
	  }
	}
	
	// 设置 elem 相对 elem.ownerDocument 的坐标
	function setOffset(elem, offset, option) {
	  // set position first, in-case top/left are set even on static elem
	  if (css(elem, 'position') === 'static') {
	    elem.style.position = 'relative';
	  }
	  var presetH = -999;
	  var presetV = -999;
	  var horizontalProperty = getOffsetDirection('left', option);
	  var verticalProperty = getOffsetDirection('top', option);
	  var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
	  var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);
	
	  if (horizontalProperty !== 'left') {
	    presetH = 999;
	  }
	
	  if (verticalProperty !== 'top') {
	    presetV = 999;
	  }
	
	  if ('left' in offset) {
	    elem.style[oppositeHorizontalProperty] = '';
	    elem.style[horizontalProperty] = presetH + 'px';
	  }
	  if ('top' in offset) {
	    elem.style[oppositeVerticalProperty] = '';
	    elem.style[verticalProperty] = presetV + 'px';
	  }
	  var old = getOffset(elem);
	  var ret = {};
	  var key = undefined;
	  for (key in offset) {
	    if (offset.hasOwnProperty(key)) {
	      var dir = getOffsetDirection(key, option);
	      var preset = key === 'left' ? presetH : presetV;
	      if (dir === key) {
	        ret[dir] = preset + offset[key] - old[key];
	      } else {
	        ret[dir] = preset + old[key] - offset[key];
	      }
	    }
	  }
	  css(elem, ret);
	}
	
	function each(arr, fn) {
	  for (var i = 0; i < arr.length; i++) {
	    fn(arr[i]);
	  }
	}
	
	function isBorderBoxFn(elem) {
	  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
	}
	
	var BOX_MODELS = ['margin', 'border', 'padding'];
	var CONTENT_INDEX = -1;
	var PADDING_INDEX = 2;
	var BORDER_INDEX = 1;
	var MARGIN_INDEX = 0;
	
	function swap(elem, options, callback) {
	  var old = {};
	  var style = elem.style;
	  var name = undefined;
	
	  // Remember the old values, and insert the new ones
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      old[name] = style[name];
	      style[name] = options[name];
	    }
	  }
	
	  callback.call(elem);
	
	  // Revert the old values
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      style[name] = old[name];
	    }
	  }
	}
	
	function getPBMWidth(elem, props, which) {
	  var value = 0;
	  var prop = undefined;
	  var j = undefined;
	  var i = undefined;
	  for (j = 0; j < props.length; j++) {
	    prop = props[j];
	    if (prop) {
	      for (i = 0; i < which.length; i++) {
	        var cssProp = undefined;
	        if (prop === 'border') {
	          cssProp = prop + which[i] + 'Width';
	        } else {
	          cssProp = prop + which[i];
	        }
	        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
	      }
	    }
	  }
	  return value;
	}
	
	/**
	 * A crude way of determining if an object is a window
	 * @member util
	 */
	function isWindow(obj) {
	  // must use == for ie8
	  /* eslint eqeqeq:0 */
	  return obj !== null && obj !== undefined && obj == obj.window;
	}
	
	var domUtils = {};
	
	each(['Width', 'Height'], function (name) {
	  domUtils['doc' + name] = function (refWin) {
	    var d = refWin.document;
	    return Math.max(
	    // firefox chrome documentElement.scrollHeight< body.scrollHeight
	    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
	    d.documentElement['scroll' + name],
	    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
	    d.body['scroll' + name], domUtils['viewport' + name](d));
	  };
	
	  domUtils['viewport' + name] = function (win) {
	    // pc browser includes scrollbar in window.innerWidth
	    var prop = 'client' + name;
	    var doc = win.document;
	    var body = doc.body;
	    var documentElement = doc.documentElement;
	    var documentElementProp = documentElement[prop];
	    // 标准模式取 documentElement
	    // backcompat 取 body
	    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
	  };
	});
	
	/*
	 得到元素的大小信息
	 @param elem
	 @param name
	 @param {String} [extra]  'padding' : (css width) + padding
	 'border' : (css width) + padding + border
	 'margin' : (css width) + padding + border + margin
	 */
	function getWH(elem, name, ex) {
	  var extra = ex;
	  if (isWindow(elem)) {
	    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
	  } else if (elem.nodeType === 9) {
	    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
	  }
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	  var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
	  var computedStyle = getComputedStyleX(elem);
	  var isBorderBox = isBorderBoxFn(elem, computedStyle);
	  var cssBoxValue = 0;
	  if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
	    borderBoxValue = undefined;
	    // Fall back to computed then un computed css if necessary
	    cssBoxValue = getComputedStyleX(elem, name);
	    if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
	      cssBoxValue = elem.style[name] || 0;
	    }
	    // Normalize '', auto, and prepare for extra
	    cssBoxValue = parseFloat(cssBoxValue) || 0;
	  }
	  if (extra === undefined) {
	    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
	  }
	  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
	  var val = borderBoxValue || cssBoxValue;
	  if (extra === CONTENT_INDEX) {
	    if (borderBoxValueOrIsBorderBox) {
	      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
	    }
	    return cssBoxValue;
	  } else if (borderBoxValueOrIsBorderBox) {
	    if (extra === BORDER_INDEX) {
	      return val;
	    }
	    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
	  }
	  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
	}
	
	var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };
	
	// fix #119 : https://github.com/kissyteam/kissy/issues/119
	function getWHIgnoreDisplay() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var val = undefined;
	  var elem = args[0];
	  // in case elem is window
	  // elem.offsetWidth === undefined
	  if (elem.offsetWidth !== 0) {
	    val = getWH.apply(undefined, args);
	  } else {
	    swap(elem, cssShow, function () {
	      val = getWH.apply(undefined, args);
	    });
	  }
	  return val;
	}
	
	each(['width', 'height'], function (name) {
	  var first = name.charAt(0).toUpperCase() + name.slice(1);
	  domUtils['outer' + first] = function (el, includeMargin) {
	    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
	  };
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	
	  domUtils[name] = function (elem, v) {
	    var val = v;
	    if (val !== undefined) {
	      if (elem) {
	        var computedStyle = getComputedStyleX(elem);
	        var isBorderBox = isBorderBoxFn(elem);
	        if (isBorderBox) {
	          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
	        }
	        return css(elem, name, val);
	      }
	      return undefined;
	    }
	    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
	  };
	});
	
	function mix(to, from) {
	  for (var i in from) {
	    if (from.hasOwnProperty(i)) {
	      to[i] = from[i];
	    }
	  }
	  return to;
	}
	
	var utils = {
	  getWindow: function getWindow(node) {
	    if (node && node.document && node.setTimeout) {
	      return node;
	    }
	    var doc = node.ownerDocument || node;
	    return doc.defaultView || doc.parentWindow;
	  },
	  offset: function offset(el, value, option) {
	    if (typeof value !== 'undefined') {
	      setOffset(el, value, option || {});
	    } else {
	      return getOffset(el);
	    }
	  },
	  isWindow: isWindow,
	  each: each,
	  css: css,
	  clone: function clone(obj) {
	    var i = undefined;
	    var ret = {};
	    for (i in obj) {
	      if (obj.hasOwnProperty(i)) {
	        ret[i] = obj[i];
	      }
	    }
	    var overflow = obj.overflow;
	    if (overflow) {
	      for (i in obj) {
	        if (obj.hasOwnProperty(i)) {
	          ret.overflow[i] = obj.overflow[i];
	        }
	      }
	    }
	    return ret;
	  },
	  mix: mix,
	  getWindowScrollLeft: function getWindowScrollLeft(w) {
	    return getScrollLeft(w);
	  },
	  getWindowScrollTop: function getWindowScrollTop(w) {
	    return getScrollTop(w);
	  },
	  merge: function merge() {
	    var ret = {};
	
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    for (var i = 0; i < args.length; i++) {
	      utils.mix(ret, args[i]);
	    }
	    return ret;
	  },
	  viewportWidth: 0,
	  viewportHeight: 0
	};
	
	mix(utils, domUtils);
	
	exports['default'] = utils;
	module.exports = exports['default'];

/***/ },

/***/ 399:
/*!*********************************!*\
  !*** ../~/lodash.keys/index.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(/*! lodash._getnative */ 400),
	    isArguments = __webpack_require__(/*! lodash.isarguments */ 401),
	    isArray = __webpack_require__(/*! lodash.isarray */ 402);
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;
	
	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));
	
	  var index = -1,
	      result = [];
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;
	
	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;
	
	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },

/***/ 400:
/*!*****************************************************!*\
  !*** ../~/lodash.keys/~/lodash._getnative/index.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = getNative;


/***/ },

/***/ 401:
/*!******************************************************!*\
  !*** ../~/lodash.keys/~/lodash.isarguments/index.js ***!
  \******************************************************/
/***/ function(module, exports) {

	/**
	 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isArguments;


/***/ },

/***/ 402:
/*!**************************************************!*\
  !*** ../~/lodash.keys/~/lodash.isarray/index.js ***!
  \**************************************************/
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isArray;


/***/ },

/***/ 421:
/*!**********************************!*\
  !*** ../~/rc-align/lib/Align.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 47);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _domAlign = __webpack_require__(/*! dom-align */ 422);
	
	var _domAlign2 = _interopRequireDefault(_domAlign);
	
	var _rcUtil = __webpack_require__(/*! rc-util */ 391);
	
	var _isWindow = __webpack_require__(/*! ./isWindow */ 430);
	
	var _isWindow2 = _interopRequireDefault(_isWindow);
	
	function buffer(fn, ms) {
	  var timer = undefined;
	  return function bufferFn() {
	    if (timer) {
	      clearTimeout(timer);
	    }
	    timer = setTimeout(fn, ms);
	  };
	}
	
	var Align = _react2['default'].createClass({
	  displayName: 'Align',
	
	  propTypes: {
	    childrenProps: _react.PropTypes.object,
	    align: _react.PropTypes.object.isRequired,
	    target: _react.PropTypes.func,
	    onAlign: _react.PropTypes.func,
	    monitorBufferTime: _react.PropTypes.number,
	    monitorWindowResize: _react.PropTypes.bool,
	    disabled: _react.PropTypes.bool,
	    children: _react.PropTypes.any
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      target: function target() {
	        return window;
	      },
	      onAlign: function onAlign() {},
	      monitorBufferTime: 50,
	      monitorWindowResize: false,
	      disabled: false
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    var props = this.props;
	    // if parent ref not attached .... use document.getElementById
	    if (!props.disabled) {
	      var source = _reactDom2['default'].findDOMNode(this);
	      props.onAlign(source, (0, _domAlign2['default'])(source, props.target(), props.align));
	      if (props.monitorWindowResize) {
	        this.startMonitorWindowResize();
	      }
	    }
	  },
	
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var reAlign = false;
	    var props = this.props;
	    var currentTarget = undefined;
	
	    if (!props.disabled) {
	      if (prevProps.disabled || prevProps.align !== props.align) {
	        reAlign = true;
	        currentTarget = props.target();
	      } else {
	        var lastTarget = prevProps.target();
	        currentTarget = props.target();
	        if ((0, _isWindow2['default'])(lastTarget) && (0, _isWindow2['default'])(currentTarget)) {
	          reAlign = false;
	        } else if (lastTarget !== currentTarget) {
	          reAlign = true;
	        }
	      }
	    }
	
	    if (reAlign) {
	      var source = _reactDom2['default'].findDOMNode(this);
	      props.onAlign(source, (0, _domAlign2['default'])(source, currentTarget, props.align));
	    }
	
	    if (props.monitorWindowResize && !props.disabled) {
	      this.startMonitorWindowResize();
	    } else {
	      this.stopMonitorWindowResize();
	    }
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    this.stopMonitorWindowResize();
	  },
	
	  onWindowResize: function onWindowResize() {
	    var props = this.props;
	    if (!props.disabled) {
	      var source = _reactDom2['default'].findDOMNode(this);
	      props.onAlign(source, (0, _domAlign2['default'])(source, props.target(), props.align));
	    }
	  },
	
	  startMonitorWindowResize: function startMonitorWindowResize() {
	    if (!this.resizeHandler) {
	      this.resizeHandler = _rcUtil.Dom.addEventListener(window, 'resize', buffer(this.onWindowResize, this.props.monitorBufferTime));
	    }
	  },
	
	  stopMonitorWindowResize: function stopMonitorWindowResize() {
	    if (this.resizeHandler) {
	      this.resizeHandler.remove();
	      this.resizeHandler = null;
	    }
	  },
	
	  render: function render() {
	    var _props = this.props;
	    var childrenProps = _props.childrenProps;
	    var children = _props.children;
	
	    var child = _react2['default'].Children.only(children);
	    if (childrenProps) {
	      var newProps = {};
	      for (var prop in childrenProps) {
	        if (childrenProps.hasOwnProperty(prop)) {
	          newProps[prop] = this.props[childrenProps[prop]];
	        }
	      }
	      return _react2['default'].cloneElement(child, newProps);
	    }
	    return child;
	  }
	});
	
	exports['default'] = Align;
	module.exports = exports['default'];

/***/ },

/***/ 420:
/*!**********************************!*\
  !*** ../~/rc-align/lib/index.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	// export this package's api
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Align = __webpack_require__(/*! ./Align */ 421);
	
	var _Align2 = _interopRequireDefault(_Align);
	
	exports['default'] = _Align2['default'];
	module.exports = exports['default'];

/***/ },

/***/ 430:
/*!*************************************!*\
  !*** ../~/rc-align/lib/isWindow.js ***!
  \*************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = isWindow;
	
	function isWindow(obj) {
	  /* eslint no-eq-null: 0 */
	  /* eslint eqeqeq: 0 */
	  return obj != null && obj == obj.window;
	}
	
	module.exports = exports["default"];

/***/ },

/***/ 432:
/*!**************************************!*\
  !*** ../~/rc-animate/lib/Animate.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ChildrenUtils = __webpack_require__(/*! ./ChildrenUtils */ 433);
	
	var _AnimateChild = __webpack_require__(/*! ./AnimateChild */ 434);
	
	var _AnimateChild2 = _interopRequireDefault(_AnimateChild);
	
	var _util = __webpack_require__(/*! ./util */ 439);
	
	var _util2 = _interopRequireDefault(_util);
	
	var defaultKey = 'rc_animate_' + Date.now();
	
	function getChildrenFromProps(props) {
	  var children = props.children;
	  if (_react2['default'].isValidElement(children)) {
	    if (!children.key) {
	      return _react2['default'].cloneElement(children, {
	        key: defaultKey
	      });
	    }
	  }
	  return children;
	}
	
	function noop() {}
	
	var Animate = _react2['default'].createClass({
	  displayName: 'Animate',
	
	  propTypes: {
	    component: _react2['default'].PropTypes.any,
	    animation: _react2['default'].PropTypes.object,
	    transitionName: _react2['default'].PropTypes.string,
	    transitionEnter: _react2['default'].PropTypes.bool,
	    transitionAppear: _react2['default'].PropTypes.bool,
	    exclusive: _react2['default'].PropTypes.bool,
	    transitionLeave: _react2['default'].PropTypes.bool,
	    onEnd: _react2['default'].PropTypes.func,
	    onEnter: _react2['default'].PropTypes.func,
	    onLeave: _react2['default'].PropTypes.func,
	    onAppear: _react2['default'].PropTypes.func,
	    showProp: _react2['default'].PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      animation: {},
	      component: 'span',
	      transitionEnter: true,
	      transitionLeave: true,
	      transitionAppear: false,
	      onEnd: noop,
	      onEnter: noop,
	      onLeave: noop,
	      onAppear: noop
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    this.currentlyAnimatingKeys = {};
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	    return {
	      children: (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(this.props))
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    var _this = this;
	
	    var showProp = this.props.showProp;
	    var children = this.state.children;
	    if (showProp) {
	      children = children.filter(function (child) {
	        return !!child.props[showProp];
	      });
	    }
	    children.forEach(function (child) {
	      _this.performAppear(child.key);
	    });
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    this.nextProps = nextProps;
	    var nextChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(nextProps));
	    var props = this.props;
	    // exclusive needs immediate response
	    if (props.exclusive) {
	      Object.keys(this.currentlyAnimatingKeys).forEach(function (key) {
	        _this2.stop(key);
	      });
	    }
	    var showProp = props.showProp;
	    var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
	    // last props children if exclusive
	    var currentChildren = props.exclusive ? (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props)) : this.state.children;
	    // in case destroy in showProp mode
	    var newChildren = [];
	    if (showProp) {
	      currentChildren.forEach(function (currentChild) {
	        var nextChild = (0, _ChildrenUtils.findChildInChildrenByKey)(nextChildren, currentChild.key);
	        var newChild = undefined;
	        if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
	          newChild = _react2['default'].cloneElement(nextChild || currentChild, _defineProperty({}, showProp, true));
	        } else {
	          newChild = nextChild;
	        }
	        if (newChild) {
	          newChildren.push(newChild);
	        }
	      });
	      nextChildren.forEach(function (nextChild) {
	        if (!(0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, nextChild.key)) {
	          newChildren.push(nextChild);
	        }
	      });
	    } else {
	      newChildren = (0, _ChildrenUtils.mergeChildren)(currentChildren, nextChildren);
	    }
	
	    // need render to avoid update
	    this.setState({
	      children: newChildren
	    });
	
	    nextChildren.forEach(function (child) {
	      var key = child.key;
	      if (currentlyAnimatingKeys[key]) {
	        return;
	      }
	      var hasPrev = (0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, key);
	      if (showProp) {
	        var showInNext = child.props[showProp];
	        if (hasPrev) {
	          var showInNow = (0, _ChildrenUtils.findShownChildInChildrenByKey)(currentChildren, key, showProp);
	          if (!showInNow && showInNext) {
	            _this2.keysToEnter.push(key);
	          }
	        } else if (showInNext) {
	          _this2.keysToEnter.push(key);
	        }
	      } else if (!hasPrev) {
	        _this2.keysToEnter.push(key);
	      }
	    });
	
	    currentChildren.forEach(function (child) {
	      var key = child.key;
	      if (currentlyAnimatingKeys[key]) {
	        return;
	      }
	      var hasNext = (0, _ChildrenUtils.findChildInChildrenByKey)(nextChildren, key);
	      if (showProp) {
	        var showInNow = child.props[showProp];
	        if (hasNext) {
	          var showInNext = (0, _ChildrenUtils.findShownChildInChildrenByKey)(nextChildren, key, showProp);
	          if (!showInNext && showInNow) {
	            _this2.keysToLeave.push(key);
	          }
	        } else if (showInNow) {
	          _this2.keysToLeave.push(key);
	        }
	      } else if (!hasNext) {
	        _this2.keysToLeave.push(key);
	      }
	    });
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	    if (this.isMounted()) {
	      var keysToEnter = this.keysToEnter;
	      this.keysToEnter = [];
	      keysToEnter.forEach(this.performEnter);
	      var keysToLeave = this.keysToLeave;
	      this.keysToLeave = [];
	      keysToLeave.forEach(this.performLeave);
	    }
	  },
	
	  performEnter: function performEnter(key) {
	    // may already remove by exclusive
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillEnter(this.handleDoneAdding.bind(this, key, 'enter'));
	    }
	  },
	
	  performAppear: function performAppear(key) {
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillAppear(this.handleDoneAdding.bind(this, key, 'appear'));
	    }
	  },
	
	  handleDoneAdding: function handleDoneAdding(key, type) {
	    var props = this.props;
	    delete this.currentlyAnimatingKeys[key];
	    // if update on exclusive mode, skip check
	    if (props.exclusive && props !== this.nextProps) {
	      return;
	    }
	    var currentChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props));
	    if (!this.isValidChildByKey(currentChildren, key)) {
	      // exclusive will not need this
	      this.performLeave(key);
	    } else {
	      if (type === 'appear') {
	        if (_util2['default'].allowAppearCallback(props)) {
	          props.onAppear(key);
	          props.onEnd(key, true);
	        }
	      } else {
	        if (_util2['default'].allowEnterCallback(props)) {
	          props.onEnter(key);
	          props.onEnd(key, true);
	        }
	      }
	    }
	  },
	
	  performLeave: function performLeave(key) {
	    // may already remove by exclusive
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillLeave(this.handleDoneLeaving.bind(this, key));
	    }
	  },
	
	  handleDoneLeaving: function handleDoneLeaving(key) {
	    var props = this.props;
	    delete this.currentlyAnimatingKeys[key];
	    // if update on exclusive mode, skip check
	    if (props.exclusive && props !== this.nextProps) {
	      return;
	    }
	    var currentChildren = (0, _ChildrenUtils.toArrayChildren)(getChildrenFromProps(props));
	    // in case state change is too fast
	    if (this.isValidChildByKey(currentChildren, key)) {
	      this.performEnter(key);
	    } else {
	      if (_util2['default'].allowLeaveCallback(props)) {
	        props.onLeave(key);
	        props.onEnd(key, false);
	      }
	      if (this.isMounted() && !(0, _ChildrenUtils.isSameChildren)(this.state.children, currentChildren, props.showProp)) {
	        this.setState({
	          children: currentChildren
	        });
	      }
	    }
	  },
	
	  isValidChildByKey: function isValidChildByKey(currentChildren, key) {
	    var showProp = this.props.showProp;
	    if (showProp) {
	      return (0, _ChildrenUtils.findShownChildInChildrenByKey)(currentChildren, key, showProp);
	    }
	    return (0, _ChildrenUtils.findChildInChildrenByKey)(currentChildren, key);
	  },
	
	  stop: function stop(key) {
	    delete this.currentlyAnimatingKeys[key];
	    var component = this.refs[key];
	    if (component) {
	      component.stop();
	    }
	  },
	
	  render: function render() {
	    var props = this.props;
	    this.nextProps = props;
	    var stateChildren = this.state.children;
	    var children = null;
	    if (stateChildren) {
	      children = stateChildren.map(function (child) {
	        if (child === null) {
	          return child;
	        }
	        if (!child.key) {
	          throw new Error('must set key for <rc-animate> children');
	        }
	        return _react2['default'].createElement(
	          _AnimateChild2['default'],
	          {
	            key: child.key,
	            ref: child.key,
	            animation: props.animation,
	            transitionName: props.transitionName,
	            transitionEnter: props.transitionEnter,
	            transitionAppear: props.transitionAppear,
	            transitionLeave: props.transitionLeave },
	          child
	        );
	      });
	    }
	    var Component = props.component;
	    if (Component) {
	      return _react2['default'].createElement(
	        Component,
	        this.props,
	        children
	      );
	    }
	    return children[0] || null;
	  }
	});
	
	exports['default'] = Animate;
	module.exports = exports['default'];

/***/ },

/***/ 434:
/*!*******************************************!*\
  !*** ../~/rc-animate/lib/AnimateChild.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 47);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _cssAnimation = __webpack_require__(/*! css-animation */ 435);
	
	var _cssAnimation2 = _interopRequireDefault(_cssAnimation);
	
	var _util = __webpack_require__(/*! ./util */ 439);
	
	var _util2 = _interopRequireDefault(_util);
	
	var transitionMap = {
	  enter: 'transitionEnter',
	  appear: 'transitionAppear',
	  leave: 'transitionLeave'
	};
	
	var AnimateChild = _react2['default'].createClass({
	  displayName: 'AnimateChild',
	
	  propTypes: {
	    children: _react2['default'].PropTypes.any
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    this.stop();
	  },
	
	  componentWillEnter: function componentWillEnter(done) {
	    if (_util2['default'].isEnterSupported(this.props)) {
	      this.transition('enter', done);
	    } else {
	      done();
	    }
	  },
	
	  componentWillAppear: function componentWillAppear(done) {
	    if (_util2['default'].isAppearSupported(this.props)) {
	      this.transition('appear', done);
	    } else {
	      done();
	    }
	  },
	
	  componentWillLeave: function componentWillLeave(done) {
	    if (_util2['default'].isLeaveSupported(this.props)) {
	      this.transition('leave', done);
	    } else {
	      done();
	    }
	  },
	
	  transition: function transition(animationType, finishCallback) {
	    var _this = this;
	
	    var node = _reactDom2['default'].findDOMNode(this);
	    var props = this.props;
	    var transitionName = props.transitionName;
	    this.stop();
	    var end = function end() {
	      _this.stopper = null;
	      finishCallback();
	    };
	    if ((_cssAnimation.isCssAnimationSupported || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
	      this.stopper = (0, _cssAnimation2['default'])(node, transitionName + '-' + animationType, end);
	    } else {
	      this.stopper = props.animation[animationType](node, end);
	    }
	  },
	
	  stop: function stop() {
	    var stopper = this.stopper;
	    if (stopper) {
	      this.stopper = null;
	      stopper.stop();
	    }
	  },
	
	  render: function render() {
	    return this.props.children;
	  }
	});
	
	exports['default'] = AnimateChild;
	module.exports = exports['default'];

/***/ },

/***/ 433:
/*!********************************************!*\
  !*** ../~/rc-animate/lib/ChildrenUtils.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.toArrayChildren = toArrayChildren;
	exports.findChildInChildrenByKey = findChildInChildrenByKey;
	exports.findShownChildInChildrenByKey = findShownChildInChildrenByKey;
	exports.findHiddenChildInChildrenByKey = findHiddenChildInChildrenByKey;
	exports.isSameChildren = isSameChildren;
	exports.mergeChildren = mergeChildren;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	function toArrayChildren(children) {
	  var ret = [];
	  _react2['default'].Children.forEach(children, function (child) {
	    ret.push(child);
	  });
	  return ret;
	}
	
	function findChildInChildrenByKey(children, key) {
	  var ret = null;
	  if (children) {
	    children.forEach(function (child) {
	      if (ret) {
	        return;
	      }
	      if (child.key === key) {
	        ret = child;
	      }
	    });
	  }
	  return ret;
	}
	
	function findShownChildInChildrenByKey(children, key, showProp) {
	  var ret = null;
	  if (children) {
	    children.forEach(function (child) {
	      if (child.key === key && child.props[showProp]) {
	        if (ret) {
	          throw new Error('two child with same key for <rc-animate> children');
	        }
	        ret = child;
	      }
	    });
	  }
	  return ret;
	}
	
	function findHiddenChildInChildrenByKey(children, key, showProp) {
	  var found = 0;
	  if (children) {
	    children.forEach(function (child) {
	      if (found) {
	        return;
	      }
	      found = child.key === key && !child.props[showProp];
	    });
	  }
	  return found;
	}
	
	function isSameChildren(c1, c2, showProp) {
	  var same = c1.length === c2.length;
	  if (same) {
	    c1.forEach(function (child, index) {
	      var child2 = c2[index];
	      if (child.key !== child2.key) {
	        same = false;
	      } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
	        same = false;
	      }
	    });
	  }
	  return same;
	}
	
	function mergeChildren(prev, next) {
	  var ret = [];
	
	  // For each key of `next`, the list of keys to insert before that key in
	  // the combined list
	  var nextChildrenPending = {};
	  var pendingChildren = [];
	  prev.forEach(function (child) {
	    if (findChildInChildrenByKey(next, child.key)) {
	      if (pendingChildren.length) {
	        nextChildrenPending[child.key] = pendingChildren;
	        pendingChildren = [];
	      }
	    } else {
	      pendingChildren.push(child);
	    }
	  });
	
	  next.forEach(function (child) {
	    if (nextChildrenPending.hasOwnProperty(child.key)) {
	      ret = ret.concat(nextChildrenPending[child.key]);
	    }
	    ret.push(child);
	  });
	
	  ret = ret.concat(pendingChildren);
	
	  return ret;
	}

/***/ },

/***/ 431:
/*!************************************!*\
  !*** ../~/rc-animate/lib/index.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	// export this package's api
	'use strict';
	
	module.exports = __webpack_require__(/*! ./Animate */ 432);

/***/ },

/***/ 439:
/*!***********************************!*\
  !*** ../~/rc-animate/lib/util.js ***!
  \***********************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var util = {
	  isAppearSupported: function isAppearSupported(props) {
	    return props.transitionName && props.transitionAppear || props.animation.appear;
	  },
	  isEnterSupported: function isEnterSupported(props) {
	    return props.transitionName && props.transitionEnter || props.animation.enter;
	  },
	  isLeaveSupported: function isLeaveSupported(props) {
	    return props.transitionName && props.transitionLeave || props.animation.leave;
	  },
	
	  allowAppearCallback: function allowAppearCallback(props) {
	    return props.transitionAppear || props.animation.appear;
	  },
	  allowEnterCallback: function allowEnterCallback(props) {
	    return props.transitionEnter || props.animation.enter;
	  },
	  allowLeaveCallback: function allowLeaveCallback(props) {
	    return props.transitionLeave || props.animation.leave;
	  }
	};
	exports["default"] = util;
	module.exports = exports["default"];

/***/ },

/***/ 387:
/*!***************************************!*\
  !*** ../~/rc-slider/assets/index.css ***!
  \***************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 413:
/*!************************************!*\
  !*** ../~/rc-slider/lib/Handle.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcTooltip = __webpack_require__(/*! rc-tooltip */ 414);
	
	var _rcTooltip2 = _interopRequireDefault(_rcTooltip);
	
	var Handle = (function (_React$Component) {
	  _inherits(Handle, _React$Component);
	
	  function Handle(props) {
	    _classCallCheck(this, Handle);
	
	    _get(Object.getPrototypeOf(Handle.prototype), 'constructor', this).call(this, props);
	
	    this.state = {
	      isTooltipVisible: false
	    };
	  }
	
	  _createClass(Handle, [{
	    key: 'showTooltip',
	    value: function showTooltip() {
	      this.setState({
	        isTooltipVisible: true
	      });
	    }
	  }, {
	    key: 'hideTooltip',
	    value: function hideTooltip() {
	      this.setState({
	        isTooltipVisible: false
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var className = props.className;
	      var tipTransitionName = props.tipTransitionName;
	      var tipFormatter = props.tipFormatter;
	      var vertical = props.vertical;
	      var offset = props.offset;
	      var value = props.value;
	      var dragging = props.dragging;
	      var noTip = props.noTip;
	
	      var style = vertical ? { bottom: offset + '%' } : { left: offset + '%' };
	      var handle = _react2['default'].createElement('div', { className: className, style: style,
	        onMouseUp: this.showTooltip.bind(this),
	        onMouseEnter: this.showTooltip.bind(this),
	        onMouseLeave: this.hideTooltip.bind(this) });
	
	      if (noTip) {
	        return handle;
	      }
	
	      var isTooltipVisible = dragging || this.state.isTooltipVisible;
	      return _react2['default'].createElement(
	        _rcTooltip2['default'],
	        {
	          prefixCls: className.replace('slider-handle', 'tooltip'),
	          placement: 'top',
	          visible: isTooltipVisible,
	          overlay: _react2['default'].createElement(
	            'span',
	            null,
	            tipFormatter(value)
	          ),
	          delay: 0,
	          transitionName: tipTransitionName },
	        handle
	      );
	    }
	  }]);
	
	  return Handle;
	})(_react2['default'].Component);
	
	exports['default'] = Handle;
	
	Handle.propTypes = {
	  className: _react2['default'].PropTypes.string,
	  vertical: _react2['default'].PropTypes.bool,
	  offset: _react2['default'].PropTypes.number,
	  tipTransitionName: _react2['default'].PropTypes.string,
	  tipFormatter: _react2['default'].PropTypes.func,
	  value: _react2['default'].PropTypes.number,
	  dragging: _react2['default'].PropTypes.bool,
	  noTip: _react2['default'].PropTypes.bool
	};
	module.exports = exports['default'];

/***/ },

/***/ 445:
/*!***********************************!*\
  !*** ../~/rc-slider/lib/Marks.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 247);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Marks = function Marks(_ref) {
	  var className = _ref.className;
	  var vertical = _ref.vertical;
	  var marks = _ref.marks;
	  var included = _ref.included;
	  var upperBound = _ref.upperBound;
	  var lowerBound = _ref.lowerBound;
	  var max = _ref.max;
	  var min = _ref.min;
	
	  var marksKeys = Object.keys(marks);
	  var marksCount = marksKeys.length;
	  var unit = 100 / (marksCount - 1);
	  var markWidth = unit * 0.9;
	
	  var range = max - min;
	  var elements = marksKeys.map(parseFloat).sort(function (a, b) {
	    return a - b;
	  }).map(function (point) {
	    var _classNames;
	
	    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
	    var markClassName = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, className + '-text', true), _defineProperty(_classNames, className + '-text-active', isActived), _classNames));
	
	    var bottomStyle = {
	      // height: markWidth + '%',
	      marginBottom: '-200' + '%',
	      bottom: (point - min) / range * 100 + '%'
	    };
	
	    var leftStyle = {
	      width: markWidth + '%',
	      marginLeft: -markWidth / 2 + '%',
	      left: (point - min) / range * 100 + '%'
	    };
	
	    var style = vertical ? bottomStyle : leftStyle;
	
	    var markPoint = marks[point];
	    var markPointIsObject = typeof markPoint === 'object' && !_react2['default'].isValidElement(markPoint);
	    var markLabel = markPointIsObject ? markPoint.label : markPoint;
	    var markStyle = markPointIsObject ? _extends({}, style, markPoint.style) : style;
	    return _react2['default'].createElement(
	      'span',
	      { className: markClassName, style: markStyle, key: point },
	      markLabel
	    );
	  });
	
	  return _react2['default'].createElement(
	    'div',
	    { className: className },
	    elements
	  );
	};
	
	exports['default'] = Marks;
	module.exports = exports['default'];

/***/ },

/***/ 390:
/*!************************************!*\
  !*** ../~/rc-slider/lib/Slider.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcUtil = __webpack_require__(/*! rc-util */ 391);
	
	var _classnames = __webpack_require__(/*! classnames */ 247);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Track = __webpack_require__(/*! ./Track */ 412);
	
	var _Track2 = _interopRequireDefault(_Track);
	
	var _Handle = __webpack_require__(/*! ./Handle */ 413);
	
	var _Handle2 = _interopRequireDefault(_Handle);
	
	var _Steps = __webpack_require__(/*! ./Steps */ 443);
	
	var _Steps2 = _interopRequireDefault(_Steps);
	
	var _Marks = __webpack_require__(/*! ./Marks */ 445);
	
	var _Marks2 = _interopRequireDefault(_Marks);
	
	function noop() {}
	
	function isNotTouchEvent(e) {
	  return e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0;
	}
	
	function getTouchPosition(vertical, e) {
	  return vertical ? e.touches[0].clientY : e.touches[0].pageX;
	}
	
	function getMousePosition(vertical, e) {
	  return vertical ? e.clientY : e.pageX;
	}
	
	function pauseEvent(e) {
	  e.stopPropagation();
	  e.preventDefault();
	}
	
	var Slider = (function (_React$Component) {
	  _inherits(Slider, _React$Component);
	
	  function Slider(props) {
	    _classCallCheck(this, Slider);
	
	    _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this, props);
	
	    var range = props.range;
	    var min = props.min;
	    var max = props.max;
	
	    var initialValue = range ? [min, min] : min;
	    var defaultValue = 'defaultValue' in props ? props.defaultValue : initialValue;
	    var value = props.value !== undefined ? props.value : defaultValue;
	
	    var upperBound = undefined;
	    var lowerBound = undefined;
	    if (props.range) {
	      lowerBound = this.trimAlignValue(value[0]);
	      upperBound = this.trimAlignValue(value[1]);
	    } else {
	      upperBound = this.trimAlignValue(value);
	    }
	
	    var recent = undefined;
	    if (props.range && upperBound === lowerBound) {
	      recent = lowerBound === max ? 'lowerBound' : 'upperBound';
	    } else {
	      recent = 'upperBound';
	    }
	
	    this.state = {
	      handle: null,
	      recent: recent,
	      upperBound: upperBound,
	      // If Slider is not range, set `lowerBound` equal to `min`.
	      lowerBound: lowerBound || min
	    };
	  }
	
	  _createClass(Slider, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;
	
	      var _state = this.state;
	      var lowerBound = _state.lowerBound;
	      var upperBound = _state.upperBound;
	
	      if (nextProps.range) {
	        var value = nextProps.value || [lowerBound, upperBound];
	        var nextUpperBound = this.trimAlignValue(value[1], nextProps);
	        var nextLowerBound = this.trimAlignValue(value[0], nextProps);
	        if (nextLowerBound === lowerBound && nextUpperBound === upperBound) return;
	
	        this.setState({
	          upperBound: nextUpperBound,
	          lowerBound: nextLowerBound
	        });
	        if (this.isValueOutOfBounds(upperBound, nextProps) || this.isValueOutOfBounds(lowerBound, nextProps)) {
	          this.props.onChange([nextLowerBound, nextUpperBound]);
	        }
	      } else {
	        var value = nextProps.value !== undefined ? nextProps.value : upperBound;
	        var nextValue = this.trimAlignValue(value, nextProps);
	        if (nextValue === upperBound && lowerBound === nextProps.min) return;
	
	        this.setState({
	          upperBound: nextValue,
	          lowerBound: nextProps.min
	        });
	        if (this.isValueOutOfBounds(upperBound, nextProps)) {
	          this.props.onChange(nextValue);
	        }
	      }
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(state) {
	      var props = this.props;
	      var isNotControlled = !('value' in props);
	      if (isNotControlled) {
	        this.setState(state);
	      } else if (state.handle) {
	        this.setState({ handle: state.handle });
	      }
	
	      var data = _extends({}, this.state, state);
	      var changedValue = props.range ? [data.lowerBound, data.upperBound] : data.upperBound;
	      props.onChange(changedValue);
	    }
	  }, {
	    key: 'onMouseMove',
	    value: function onMouseMove(e) {
	      var position = getMousePosition(this.props.vertical, e);
	      this.onMove(e, position);
	    }
	  }, {
	    key: 'onTouchMove',
	    value: function onTouchMove(e) {
	      if (isNotTouchEvent(e)) {
	        this.end('touch');
	        return;
	      }
	
	      var position = getTouchPosition(this.props.vertical, e);
	      this.onMove(e, position);
	    }
	  }, {
	    key: 'onMove',
	    value: function onMove(e, position) {
	      pauseEvent(e);
	      var props = this.props;
	      var state = this.state;
	
	      var diffPosition = position - this.startPosition;
	      diffPosition = this.props.vertical ? -diffPosition : diffPosition;
	      var diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);
	
	      var value = this.trimAlignValue(this.startValue + diffValue);
	      var oldValue = state[state.handle];
	      if (value === oldValue) return;
	
	      if (props.allowCross && value < state.lowerBound && state.handle === 'upperBound') {
	        this.onChange({
	          handle: 'lowerBound',
	          lowerBound: value,
	          upperBound: this.state.lowerBound
	        });
	        return;
	      }
	      if (props.allowCross && value > state.upperBound && state.handle === 'lowerBound') {
	        this.onChange({
	          handle: 'upperBound',
	          upperBound: value,
	          lowerBound: this.state.upperBound
	        });
	        return;
	      }
	
	      this.onChange(_defineProperty({}, state.handle, value));
	    }
	  }, {
	    key: 'onTouchStart',
	    value: function onTouchStart(e) {
	      if (isNotTouchEvent(e)) return;
	
	      var position = getTouchPosition(this.props.vertical, e);
	      this.onStart(position);
	      this.addDocumentEvents('touch');
	      pauseEvent(e);
	    }
	  }, {
	    key: 'onMouseDown',
	    value: function onMouseDown(e) {
	      var position = getMousePosition(this.props.vertical, e);
	      this.onStart(position);
	      this.addDocumentEvents('mouse');
	      pauseEvent(e);
	    }
	  }, {
	    key: 'onStart',
	    value: function onStart(position) {
	      var props = this.props;
	      props.onBeforeChange(this.getValue());
	
	      var value = this.calcValueByPos(position);
	      this.startValue = value;
	      this.startPosition = position;
	
	      var state = this.state;
	      var upperBound = state.upperBound;
	      var lowerBound = state.lowerBound;
	
	      var valueNeedChanging = 'upperBound';
	      if (this.props.range) {
	        var isLowerBoundCloser = Math.abs(upperBound - value) > Math.abs(lowerBound - value);
	        if (isLowerBoundCloser) {
	          valueNeedChanging = 'lowerBound';
	        }
	
	        var isAtTheSamePoint = upperBound === lowerBound;
	        if (isAtTheSamePoint) {
	          valueNeedChanging = state.recent;
	        }
	
	        if (isAtTheSamePoint && value !== upperBound) {
	          valueNeedChanging = value < upperBound ? 'lowerBound' : 'upperBound';
	        }
	      }
	
	      this.setState({
	        handle: valueNeedChanging,
	        recent: valueNeedChanging
	      });
	
	      var oldValue = state[valueNeedChanging];
	      if (value === oldValue) return;
	
	      this.onChange(_defineProperty({}, valueNeedChanging, value));
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      var _state2 = this.state;
	      var lowerBound = _state2.lowerBound;
	      var upperBound = _state2.upperBound;
	
	      return this.props.range ? [lowerBound, upperBound] : upperBound;
	    }
	  }, {
	    key: 'getSliderLength',
	    value: function getSliderLength() {
	      var slider = this.refs.slider;
	      if (!slider) {
	        return 0;
	      }
	
	      return this.props.vertical ? slider.clientHeight : slider.clientWidth;
	    }
	  }, {
	    key: 'getSliderStart',
	    value: function getSliderStart() {
	      var slider = this.refs.slider;
	      var rect = slider.getBoundingClientRect();
	
	      return this.props.vertical ? rect.top : rect.left;
	    }
	  }, {
	    key: 'getPrecision',
	    value: function getPrecision(step) {
	      var stepString = step.toString();
	      var precision = 0;
	      if (stepString.indexOf('.') >= 0) {
	        precision = stepString.length - stepString.indexOf('.') - 1;
	      }
	      return precision;
	    }
	  }, {
	    key: 'isValueOutOfBounds',
	    value: function isValueOutOfBounds(value, props) {
	      return value < props.min || value > props.max;
	    }
	  }, {
	    key: 'trimAlignValue',
	    value: function trimAlignValue(v, nextProps) {
	      var state = this.state || {};
	      var handle = state.handle;
	      var lowerBound = state.lowerBound;
	      var upperBound = state.upperBound;
	
	      var _extends2 = _extends({}, this.props, nextProps || {});
	
	      var marks = _extends2.marks;
	      var step = _extends2.step;
	      var min = _extends2.min;
	      var max = _extends2.max;
	      var allowCross = _extends2.allowCross;
	
	      var val = v;
	      if (val <= min) {
	        val = min;
	      }
	      if (val >= max) {
	        val = max;
	      }
	      if (!allowCross && handle === 'upperBound' && val <= lowerBound) {
	        val = lowerBound;
	      }
	      if (!allowCross && handle === 'lowerBound' && val >= upperBound) {
	        val = upperBound;
	      }
	
	      var points = Object.keys(marks).map(parseFloat);
	      if (step !== null) {
	        var closestStep = Math.round(val / step) * step;
	        points.push(closestStep);
	      }
	
	      var diffs = points.map(function (point) {
	        return Math.abs(val - point);
	      });
	      var closestPoint = points[diffs.indexOf(Math.min.apply(Math, diffs))];
	
	      return step !== null ? parseFloat(closestPoint.toFixed(this.getPrecision(step))) : closestPoint;
	    }
	  }, {
	    key: 'calcOffset',
	    value: function calcOffset(value) {
	      var _props = this.props;
	      var min = _props.min;
	      var max = _props.max;
	
	      var ratio = (value - min) / (max - min);
	      return ratio * 100;
	    }
	  }, {
	    key: 'calcValue',
	    value: function calcValue(offset) {
	      var _props2 = this.props;
	      var vertical = _props2.vertical;
	      var min = _props2.min;
	      var max = _props2.max;
	
	      var ratio = Math.abs(offset / this.getSliderLength());
	      var value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
	      return value;
	    }
	  }, {
	    key: 'calcValueByPos',
	    value: function calcValueByPos(position) {
	      var pixelOffset = position - this.getSliderStart();
	      var nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
	      return nextValue;
	    }
	  }, {
	    key: 'addDocumentEvents',
	    value: function addDocumentEvents(type) {
	      if (type === 'touch') {
	        // just work for chrome iOS Safari and Android Browser
	        this.onTouchMoveListener = _rcUtil.Dom.addEventListener(document, 'touchmove', this.onTouchMove.bind(this));
	        this.onTouchUpListener = _rcUtil.Dom.addEventListener(document, 'touchend', this.end.bind(this, 'touch'));
	      } else if (type === 'mouse') {
	        this.onMouseMoveListener = _rcUtil.Dom.addEventListener(document, 'mousemove', this.onMouseMove.bind(this));
	        this.onMouseUpListener = _rcUtil.Dom.addEventListener(document, 'mouseup', this.end.bind(this, 'mouse'));
	      }
	    }
	  }, {
	    key: 'removeEvents',
	    value: function removeEvents(type) {
	      if (type === 'touch') {
	        this.onTouchMoveListener.remove();
	        this.onTouchUpListener.remove();
	      } else if (type === 'mouse') {
	        this.onMouseMoveListener.remove();
	        this.onMouseUpListener.remove();
	      }
	    }
	  }, {
	    key: 'end',
	    value: function end(type) {
	      this.removeEvents(type);
	      this.props.onAfterChange(this.getValue());
	      this.setState({ handle: null });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames;
	
	      var _state3 = this.state;
	      var handle = _state3.handle;
	      var upperBound = _state3.upperBound;
	      var lowerBound = _state3.lowerBound;
	      var _props3 = this.props;
	      var className = _props3.className;
	      var prefixCls = _props3.prefixCls;
	      var disabled = _props3.disabled;
	      var vertical = _props3.vertical;
	      var dots = _props3.dots;
	      var included = _props3.included;
	      var range = _props3.range;
	      var step = _props3.step;
	      var marks = _props3.marks;
	      var max = _props3.max;
	      var min = _props3.min;
	      var tipTransitionName = _props3.tipTransitionName;
	      var tipFormatter = _props3.tipFormatter;
	      var children = _props3.children;
	
	      var upperOffset = this.calcOffset(upperBound);
	      var lowerOffset = this.calcOffset(lowerBound);
	
	      var handleClassName = prefixCls + '-handle';
	      var isNoTip = step === null || tipFormatter === null;
	
	      var upper = _react2['default'].createElement(_Handle2['default'], { className: handleClassName,
	        noTip: isNoTip, tipTransitionName: tipTransitionName, tipFormatter: tipFormatter,
	        vertical: vertical, offset: upperOffset, value: upperBound, dragging: handle === 'upperBound' });
	
	      var lower = null;
	      if (range) {
	        lower = _react2['default'].createElement(_Handle2['default'], { className: handleClassName,
	          noTip: isNoTip, tipTransitionName: tipTransitionName, tipFormatter: tipFormatter,
	          vertical: vertical, offset: lowerOffset, value: lowerBound, dragging: handle === 'lowerBound' });
	      }
	
	      var sliderClassName = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-vertical', this.props.vertical), _classNames));
	      var isIncluded = included || range;
	      return _react2['default'].createElement(
	        'div',
	        { ref: 'slider', className: sliderClassName,
	          onTouchStart: disabled ? noop : this.onTouchStart.bind(this),
	          onMouseDown: disabled ? noop : this.onMouseDown.bind(this) },
	        upper,
	        lower,
	        _react2['default'].createElement(_Track2['default'], { className: prefixCls + '-track', vertical: vertical, included: isIncluded,
	          offset: lowerOffset, length: upperOffset - lowerOffset }),
	        _react2['default'].createElement(_Steps2['default'], { prefixCls: prefixCls, vertical: vertical, marks: marks, dots: dots, step: step,
	          included: isIncluded, lowerBound: lowerBound,
	          upperBound: upperBound, max: max, min: min }),
	        _react2['default'].createElement(_Marks2['default'], { className: prefixCls + '-mark', vertical: vertical, marks: marks,
	          included: isIncluded, lowerBound: lowerBound,
	          upperBound: upperBound, max: max, min: min }),
	        children
	      );
	    }
	  }]);
	
	  return Slider;
	})(_react2['default'].Component);
	
	Slider.propTypes = {
	  min: _react2['default'].PropTypes.number,
	  max: _react2['default'].PropTypes.number,
	  step: _react2['default'].PropTypes.number,
	  defaultValue: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.number)]),
	  value: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.number)]),
	  marks: _react2['default'].PropTypes.object,
	  included: _react2['default'].PropTypes.bool,
	  className: _react2['default'].PropTypes.string,
	  prefixCls: _react2['default'].PropTypes.string,
	  disabled: _react2['default'].PropTypes.bool,
	  children: _react2['default'].PropTypes.any,
	  onBeforeChange: _react2['default'].PropTypes.func,
	  onChange: _react2['default'].PropTypes.func,
	  onAfterChange: _react2['default'].PropTypes.func,
	  tipTransitionName: _react2['default'].PropTypes.string,
	  tipFormatter: _react2['default'].PropTypes.func,
	  dots: _react2['default'].PropTypes.bool,
	  range: _react2['default'].PropTypes.bool,
	  vertical: _react2['default'].PropTypes.bool,
	  allowCross: _react2['default'].PropTypes.bool
	};
	
	Slider.defaultProps = {
	  prefixCls: 'rc-slider',
	  className: '',
	  tipTransitionName: '',
	  min: 0,
	  max: 100,
	  step: 1,
	  marks: {},
	  onBeforeChange: noop,
	  onChange: noop,
	  onAfterChange: noop,
	  tipFormatter: function tipFormatter(value) {
	    return value;
	  },
	  included: true,
	  disabled: false,
	  dots: false,
	  range: false,
	  vertical: false,
	  allowCross: true
	};
	
	exports['default'] = Slider;
	module.exports = exports['default'];

/***/ },

/***/ 443:
/*!***********************************!*\
  !*** ../~/rc-slider/lib/Steps.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(/*! classnames */ 247);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _warning = __webpack_require__(/*! warning */ 444);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function calcPoints(vertical, marks, dots, step, min, max) {
	  (0, _warning2['default'])(dots ? step > 0 : true, '`Slider[step]` should be a positive number in order to make Slider[dots] work.');
	  var points = Object.keys(marks).map(parseFloat);
	  if (dots) {
	    for (var i = min; i <= max; i = i + step) {
	      if (points.indexOf(i) >= 0) continue;
	      points.push(i);
	    }
	  }
	  return points;
	}
	
	var Steps = function Steps(_ref) {
	  var prefixCls = _ref.prefixCls;
	  var vertical = _ref.vertical;
	  var marks = _ref.marks;
	  var dots = _ref.dots;
	  var step = _ref.step;
	  var included = _ref.included;
	  var lowerBound = _ref.lowerBound;
	  var upperBound = _ref.upperBound;
	  var max = _ref.max;
	  var min = _ref.min;
	
	  var range = max - min;
	  var elements = calcPoints(vertical, marks, dots, step, min, max).map(function (point) {
	    var _classNames;
	
	    var offset = Math.abs(point - min) / range * 100 + '%';
	    var style = vertical ? { bottom: offset } : { left: offset };
	
	    var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
	    var pointClassName = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefixCls + '-dot', true), _defineProperty(_classNames, prefixCls + '-dot-active', isActived), _classNames));
	
	    return _react2['default'].createElement('span', { className: pointClassName, style: style, key: point });
	  });
	
	  return _react2['default'].createElement(
	    'div',
	    { className: prefixCls + '-step' },
	    elements
	  );
	};
	
	exports['default'] = Steps;
	module.exports = exports['default'];

/***/ },

/***/ 412:
/*!***********************************!*\
  !*** ../~/rc-slider/lib/Track.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var Track = function Track(_ref) {
	  var className = _ref.className;
	  var included = _ref.included;
	  var vertical = _ref.vertical;
	  var offset = _ref.offset;
	  var length = _ref.length;
	
	  var style = {
	    visibility: included ? 'visible' : 'hidden'
	  };
	  if (vertical) {
	    style.bottom = offset + '%';
	    style.height = length + '%';
	  } else {
	    style.left = offset + '%';
	    style.width = length + '%';
	  }
	  return _react2['default'].createElement('div', { className: className, style: style });
	};
	
	exports['default'] = Track;
	module.exports = exports['default'];

/***/ },

/***/ 389:
/*!***********************************!*\
  !*** ../~/rc-slider/lib/index.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(/*! ./Slider */ 390);

/***/ },

/***/ 415:
/*!**************************************!*\
  !*** ../~/rc-tooltip/lib/Tooltip.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _placements = __webpack_require__(/*! ./placements */ 416);
	
	var _rcTrigger = __webpack_require__(/*! rc-trigger */ 417);
	
	var _rcTrigger2 = _interopRequireDefault(_rcTrigger);
	
	var Tooltip = _react2['default'].createClass({
	  displayName: 'Tooltip',
	
	  propTypes: {
	    trigger: _react.PropTypes.any,
	    children: _react.PropTypes.any,
	    defaultVisible: _react.PropTypes.bool,
	    visible: _react.PropTypes.bool,
	    placement: _react.PropTypes.string,
	    transitionName: _react.PropTypes.string,
	    animation: _react.PropTypes.any,
	    onVisibleChange: _react.PropTypes.func,
	    afterVisibleChange: _react.PropTypes.func,
	    overlay: _react.PropTypes.node.isRequired,
	    overlayStyle: _react.PropTypes.object,
	    overlayClassName: _react.PropTypes.string,
	    prefixCls: _react.PropTypes.string,
	    mouseEnterDelay: _react.PropTypes.number,
	    mouseLeaveDelay: _react.PropTypes.number,
	    getTooltipContainer: _react.PropTypes.func,
	    destroyTooltipOnHide: _react.PropTypes.bool,
	    align: _react.PropTypes.shape({
	      offset: _react.PropTypes.array,
	      targetOffset: _react.PropTypes.array
	    }),
	    arrowContent: _react.PropTypes.any
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      prefixCls: 'rc-tooltip',
	      mouseEnterDelay: 0,
	      destroyTooltipOnHide: false,
	      mouseLeaveDelay: 0.1,
	      align: {},
	      placement: 'right',
	      trigger: ['hover'],
	      arrowContent: null
	    };
	  },
	
	  getPopupElement: function getPopupElement() {
	    var _props = this.props;
	    var arrowContent = _props.arrowContent;
	    var overlay = _props.overlay;
	    var prefixCls = _props.prefixCls;
	
	    return [_react2['default'].createElement(
	      'div',
	      { className: prefixCls + '-arrow', key: 'arrow' },
	      arrowContent
	    ), _react2['default'].createElement(
	      'div',
	      { className: prefixCls + '-inner', key: 'content' },
	      overlay
	    )];
	  },
	
	  getPopupDomNode: function getPopupDomNode() {
	    return this.refs.trigger.popupDomNode;
	  },
	
	  render: function render() {
	    var _props2 = this.props;
	    var overlayClassName = _props2.overlayClassName;
	    var trigger = _props2.trigger;
	    var mouseEnterDelay = _props2.mouseEnterDelay;
	    var mouseLeaveDelay = _props2.mouseLeaveDelay;
	    var overlayStyle = _props2.overlayStyle;
	    var prefixCls = _props2.prefixCls;
	    var children = _props2.children;
	    var onVisibleChange = _props2.onVisibleChange;
	    var transitionName = _props2.transitionName;
	    var animation = _props2.animation;
	    var placement = _props2.placement;
	    var align = _props2.align;
	    var destroyTooltipOnHide = _props2.destroyTooltipOnHide;
	    var defaultVisible = _props2.defaultVisible;
	    var getTooltipContainer = _props2.getTooltipContainer;
	
	    var restProps = _objectWithoutProperties(_props2, ['overlayClassName', 'trigger', 'mouseEnterDelay', 'mouseLeaveDelay', 'overlayStyle', 'prefixCls', 'children', 'onVisibleChange', 'transitionName', 'animation', 'placement', 'align', 'destroyTooltipOnHide', 'defaultVisible', 'getTooltipContainer']);
	
	    var extraProps = _extends({}, restProps);
	    if ('visible' in this.props) {
	      extraProps.popupVisible = this.props.visible;
	    }
	    return _react2['default'].createElement(
	      _rcTrigger2['default'],
	      _extends({ popupClassName: overlayClassName,
	        ref: 'trigger',
	        prefixCls: prefixCls,
	        popup: this.getPopupElement(),
	        action: trigger,
	        builtinPlacements: _placements.placements,
	        popupPlacement: placement,
	        popupAlign: align,
	        getPopupContainer: getTooltipContainer,
	        onPopupVisibleChange: onVisibleChange,
	        popupTransitionName: transitionName,
	        popupAnimation: animation,
	        defaultPopupVisible: defaultVisible,
	        destroyPopupOnHide: destroyTooltipOnHide,
	        mouseLeaveDelay: mouseLeaveDelay,
	        popupStyle: overlayStyle,
	        mouseEnterDelay: mouseEnterDelay
	      }, extraProps),
	      children
	    );
	  }
	});
	
	exports['default'] = Tooltip;
	module.exports = exports['default'];

/***/ },

/***/ 414:
/*!************************************!*\
  !*** ../~/rc-tooltip/lib/index.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(/*! ./Tooltip */ 415);

/***/ },

/***/ 416:
/*!*****************************************!*\
  !*** ../~/rc-tooltip/lib/placements.js ***!
  \*****************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var autoAdjustOverflow = {
	  adjustX: 1,
	  adjustY: 1
	};
	
	var targetOffset = [0, 0];
	
	var placements = {
	  left: {
	    points: ['cr', 'cl'],
	    overflow: autoAdjustOverflow,
	    offset: [-4, 0],
	    targetOffset: targetOffset
	  },
	  right: {
	    points: ['cl', 'cr'],
	    overflow: autoAdjustOverflow,
	    offset: [4, 0],
	    targetOffset: targetOffset
	  },
	  top: {
	    points: ['bc', 'tc'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -4],
	    targetOffset: targetOffset
	  },
	  bottom: {
	    points: ['tc', 'bc'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 4],
	    targetOffset: targetOffset
	  },
	  topLeft: {
	    points: ['bl', 'tl'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -4],
	    targetOffset: targetOffset
	  },
	  leftTop: {
	    points: ['tr', 'tl'],
	    overflow: autoAdjustOverflow,
	    offset: [-3, 0],
	    targetOffset: targetOffset
	  },
	  topRight: {
	    points: ['br', 'tr'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -4],
	    targetOffset: targetOffset
	  },
	  rightTop: {
	    points: ['tl', 'tr'],
	    overflow: autoAdjustOverflow,
	    offset: [4, 0],
	    targetOffset: targetOffset
	  },
	  bottomRight: {
	    points: ['tr', 'br'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 4],
	    targetOffset: targetOffset
	  },
	  rightBottom: {
	    points: ['bl', 'br'],
	    overflow: autoAdjustOverflow,
	    offset: [4, 0],
	    targetOffset: targetOffset
	  },
	  bottomLeft: {
	    points: ['tl', 'bl'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 4],
	    targetOffset: targetOffset
	  },
	  leftBottom: {
	    points: ['br', 'bl'],
	    overflow: autoAdjustOverflow,
	    offset: [-4, 0],
	    targetOffset: targetOffset
	  }
	};
	
	exports.placements = placements;
	exports['default'] = placements;

/***/ },

/***/ 441:
/*!********************************************!*\
  !*** ../~/rc-trigger/lib/LazyRenderBox.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var LazyRenderBox = _react2["default"].createClass({
	  displayName: 'LazyRenderBox',
	
	  propTypes: {
	    children: _react.PropTypes.any,
	    className: _react.PropTypes.string,
	    visible: _react.PropTypes.bool,
	    hiddenClassName: _react.PropTypes.string
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return nextProps.hiddenClassName || nextProps.visible;
	  },
	  render: function render() {
	    if (this.props.hiddenClassName) {
	      var className = this.props.className;
	      if (!this.props.visible) {
	        className += ' ' + this.props.hiddenClassName;
	      }
	      return _react2["default"].createElement('div', _extends({}, this.props, { className: className }));
	    }
	    if (_react2["default"].Children.count(this.props.children) > 1) {
	      return _react2["default"].createElement('div', this.props);
	    }
	    return _react2["default"].Children.only(this.props.children);
	  }
	});
	
	exports["default"] = LazyRenderBox;
	module.exports = exports['default'];

/***/ },

/***/ 419:
/*!************************************!*\
  !*** ../~/rc-trigger/lib/Popup.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 47);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcAlign = __webpack_require__(/*! rc-align */ 420);
	
	var _rcAlign2 = _interopRequireDefault(_rcAlign);
	
	var _rcAnimate = __webpack_require__(/*! rc-animate */ 431);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _PopupInner = __webpack_require__(/*! ./PopupInner */ 440);
	
	var _PopupInner2 = _interopRequireDefault(_PopupInner);
	
	var _LazyRenderBox = __webpack_require__(/*! ./LazyRenderBox */ 441);
	
	var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var Popup = _react2["default"].createClass({
	  displayName: 'Popup',
	
	  propTypes: {
	    visible: _react.PropTypes.bool,
	    style: _react.PropTypes.object,
	    getClassNameFromAlign: _react.PropTypes.func,
	    onAlign: _react.PropTypes.func,
	    getRootDomNode: _react.PropTypes.func,
	    onMouseEnter: _react.PropTypes.func,
	    align: _react.PropTypes.any,
	    destroyPopupOnHide: _react.PropTypes.bool,
	    className: _react.PropTypes.string,
	    prefixCls: _react.PropTypes.string,
	    onMouseLeave: _react.PropTypes.func
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.rootNode = this.getPopupDomNode();
	  },
	  onAlign: function onAlign(popupDomNode, align) {
	    var props = this.props;
	    var alignClassName = props.getClassNameFromAlign(props.align);
	    var currentAlignClassName = props.getClassNameFromAlign(align);
	    if (alignClassName !== currentAlignClassName) {
	      this.currentAlignClassName = currentAlignClassName;
	      popupDomNode.className = this.getClassName(currentAlignClassName);
	    }
	    props.onAlign(popupDomNode, align);
	  },
	  getPopupDomNode: function getPopupDomNode() {
	    return _reactDom2["default"].findDOMNode(this.refs.popup);
	  },
	  getTarget: function getTarget() {
	    return this.props.getRootDomNode();
	  },
	  getMaskTransitionName: function getMaskTransitionName() {
	    var props = this.props;
	    var transitionName = props.maskTransitionName;
	    var animation = props.maskAnimation;
	    if (!transitionName && animation) {
	      transitionName = props.prefixCls + '-' + animation;
	    }
	    return transitionName;
	  },
	  getTransitionName: function getTransitionName() {
	    var props = this.props;
	    var transitionName = props.transitionName;
	    if (!transitionName && props.animation) {
	      transitionName = props.prefixCls + '-' + props.animation;
	    }
	    return transitionName;
	  },
	  getClassName: function getClassName(currentAlignClassName) {
	    return this.props.prefixCls + ' ' + this.props.className + ' ' + currentAlignClassName;
	  },
	  getPopupElement: function getPopupElement() {
	    var props = this.props;
	    var align = props.align;
	    var style = props.style;
	    var visible = props.visible;
	    var prefixCls = props.prefixCls;
	    var destroyPopupOnHide = props.destroyPopupOnHide;
	
	    var className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
	    var hiddenClassName = prefixCls + '-hidden';
	    if (!visible) {
	      this.currentAlignClassName = null;
	    }
	    var newStyle = _extends({}, style, this.getZIndexStyle());
	    var popupInnerProps = {
	      className: className,
	      prefixCls: prefixCls,
	      ref: 'popup',
	      onMouseEnter: props.onMouseEnter,
	      onMouseLeave: props.onMouseLeave,
	      style: newStyle
	    };
	    if (destroyPopupOnHide) {
	      return _react2["default"].createElement(
	        _rcAnimate2["default"],
	        {
	          component: '',
	          exclusive: true,
	          transitionAppear: true,
	          transitionName: this.getTransitionName()
	        },
	        visible ? _react2["default"].createElement(
	          _rcAlign2["default"],
	          {
	            target: this.getTarget,
	            key: 'popup',
	            monitorWindowResize: true,
	            align: align,
	            onAlign: this.onAlign
	          },
	          _react2["default"].createElement(
	            _PopupInner2["default"],
	            _extends({
	              visible: true
	            }, popupInnerProps),
	            props.children
	          )
	        ) : null
	      );
	    }
	    return _react2["default"].createElement(
	      _rcAnimate2["default"],
	      {
	        component: '',
	        exclusive: true,
	        transitionAppear: true,
	        transitionName: this.getTransitionName(),
	        showProp: 'xVisible'
	      },
	      _react2["default"].createElement(
	        _rcAlign2["default"],
	        {
	          target: this.getTarget,
	          key: 'popup',
	          monitorWindowResize: true,
	          xVisible: visible,
	          childrenProps: { visible: 'xVisible' },
	          disabled: !visible,
	          align: align,
	          onAlign: this.onAlign
	        },
	        _react2["default"].createElement(
	          _PopupInner2["default"],
	          _extends({
	            hiddenClassName: hiddenClassName
	          }, popupInnerProps),
	          props.children
	        )
	      )
	    );
	  },
	  getZIndexStyle: function getZIndexStyle() {
	    var style = {};
	    var props = this.props;
	    if (props.zIndex !== undefined) {
	      style.zIndex = props.zIndex;
	    }
	    return style;
	  },
	  getMaskElement: function getMaskElement() {
	    var props = this.props;
	    var maskElement = void 0;
	    if (props.mask) {
	      var maskTransition = this.getMaskTransitionName();
	      maskElement = _react2["default"].createElement(_LazyRenderBox2["default"], {
	        style: this.getZIndexStyle(),
	        key: 'mask',
	        className: props.prefixCls + '-mask',
	        hiddenClassName: props.prefixCls + '-mask-hidden',
	        visible: props.visible
	      });
	      if (maskTransition) {
	        maskElement = _react2["default"].createElement(
	          _rcAnimate2["default"],
	          {
	            key: 'mask',
	            showProp: 'visible',
	            transitionAppear: true,
	            component: '',
	            transitionName: maskTransition
	          },
	          maskElement
	        );
	      }
	    }
	    return maskElement;
	  },
	  render: function render() {
	    return _react2["default"].createElement(
	      'div',
	      null,
	      this.getMaskElement(),
	      this.getPopupElement()
	    );
	  }
	});
	
	exports["default"] = Popup;
	module.exports = exports['default'];

/***/ },

/***/ 440:
/*!*****************************************!*\
  !*** ../~/rc-trigger/lib/PopupInner.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _LazyRenderBox = __webpack_require__(/*! ./LazyRenderBox */ 441);
	
	var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var PopupInner = _react2["default"].createClass({
	  displayName: 'PopupInner',
	
	  propTypes: {
	    hiddenClassName: _react.PropTypes.string,
	    className: _react.PropTypes.string,
	    prefixCls: _react.PropTypes.string,
	    onMouseEnter: _react.PropTypes.func,
	    onMouseLeave: _react.PropTypes.func,
	    children: _react.PropTypes.any
	  },
	  render: function render() {
	    var props = this.props;
	    var className = props.className;
	    if (!props.visible) {
	      className += ' ' + props.hiddenClassName;
	    }
	    return _react2["default"].createElement(
	      'div',
	      {
	        className: className,
	        onMouseEnter: props.onMouseEnter,
	        onMouseLeave: props.onMouseLeave,
	        style: props.style
	      },
	      _react2["default"].createElement(
	        _LazyRenderBox2["default"],
	        { className: props.prefixCls + '-content', visible: props.visible },
	        props.children
	      )
	    );
	  }
	});
	
	exports["default"] = PopupInner;
	module.exports = exports['default'];

/***/ },

/***/ 418:
/*!**************************************!*\
  !*** ../~/rc-trigger/lib/Trigger.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(/*! react */ 16);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 47);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcUtil = __webpack_require__(/*! rc-util */ 391);
	
	var _Popup = __webpack_require__(/*! ./Popup */ 419);
	
	var _Popup2 = _interopRequireDefault(_Popup);
	
	var _utils = __webpack_require__(/*! ./utils */ 442);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function noop() {}
	
	function returnEmptyString() {
	  return '';
	}
	
	var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];
	
	var Trigger = _react2["default"].createClass({
	  displayName: 'Trigger',
	
	  propTypes: {
	    action: _react.PropTypes.any,
	    showAction: _react.PropTypes.any,
	    hideAction: _react.PropTypes.any,
	    getPopupClassNameFromAlign: _react.PropTypes.any,
	    onPopupVisibleChange: _react.PropTypes.func,
	    afterPopupVisibleChange: _react.PropTypes.func,
	    popup: _react.PropTypes.node.isRequired,
	    popupStyle: _react.PropTypes.object,
	    prefixCls: _react.PropTypes.string,
	    popupClassName: _react.PropTypes.string,
	    popupPlacement: _react.PropTypes.string,
	    builtinPlacements: _react.PropTypes.object,
	    popupTransitionName: _react.PropTypes.string,
	    popupAnimation: _react.PropTypes.any,
	    mouseEnterDelay: _react.PropTypes.number,
	    mouseLeaveDelay: _react.PropTypes.number,
	    zIndex: _react.PropTypes.number,
	    focusDelay: _react.PropTypes.number,
	    blurDelay: _react.PropTypes.number,
	    getPopupContainer: _react.PropTypes.func,
	    destroyPopupOnHide: _react.PropTypes.bool,
	    mask: _react.PropTypes.bool,
	    onPopupAlign: _react.PropTypes.func,
	    popupAlign: _react.PropTypes.object,
	    popupVisible: _react.PropTypes.bool,
	    maskTransitionName: _react.PropTypes.string,
	    maskAnimation: _react.PropTypes.string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      prefixCls: 'rc-trigger-popup',
	      getPopupClassNameFromAlign: returnEmptyString,
	      onPopupVisibleChange: noop,
	      afterPopupVisibleChange: noop,
	      onPopupAlign: noop,
	      popupClassName: '',
	      mouseEnterDelay: 0,
	      mouseLeaveDelay: 0.1,
	      focusDelay: 0,
	      blurDelay: 0.15,
	      popupStyle: {},
	      destroyPopupOnHide: false,
	      popupAlign: {},
	      defaultPopupVisible: false,
	      mask: false,
	      action: [],
	      showAction: [],
	      hideAction: []
	    };
	  },
	  getInitialState: function getInitialState() {
	    var props = this.props;
	    var popupVisible = void 0;
	    if ('popupVisible' in props) {
	      popupVisible = !!props.popupVisible;
	    } else {
	      popupVisible = !!props.defaultPopupVisible;
	    }
	    return {
	      popupVisible: popupVisible
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.componentDidUpdate({}, {
	      popupVisible: this.state.popupVisible
	    });
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if ('popupVisible' in nextProps) {
	      this.setState({
	        popupVisible: !!nextProps.popupVisible
	      });
	    }
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
	    var _this = this;
	
	    var props = this.props;
	    var state = this.state;
	    if (this.popupRendered) {
	      var _ret = function () {
	        var self = _this;
	        _reactDom2["default"].unstable_renderSubtreeIntoContainer(_this, _this.getPopupElement(), _this.getPopupContainer(), function renderPopup() {
	          /* eslint react/no-is-mounted:0 */
	          if (this.isMounted()) {
	            self.popupDomNode = this.getPopupDomNode();
	          } else {
	            self.popupDomNode = null;
	          }
	          if (prevState.popupVisible !== state.popupVisible) {
	            props.afterPopupVisibleChange(state.popupVisible);
	          }
	        });
	        if (_this.isClickToHide()) {
	          if (state.popupVisible) {
	            if (!_this.clickOutsideHandler) {
	              _this.clickOutsideHandler = _rcUtil.Dom.addEventListener(document, 'mousedown', _this.onDocumentClick);
	              _this.touchOutsideHandler = _rcUtil.Dom.addEventListener(document, 'touchstart', _this.onDocumentClick);
	            }
	            return {
	              v: void 0
	            };
	          }
	        }
	        if (_this.clickOutsideHandler) {
	          _this.clickOutsideHandler.remove();
	          _this.touchOutsideHandler.remove();
	          _this.clickOutsideHandler = null;
	          _this.touchOutsideHandler = null;
	        }
	      }();
	
	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    var popupContainer = this.popupContainer;
	    if (popupContainer) {
	      _reactDom2["default"].unmountComponentAtNode(popupContainer);
	      popupContainer.parentNode.removeChild(popupContainer);
	      this.popupContainer = null;
	    }
	    this.clearDelayTimer();
	    if (this.clickOutsideHandler) {
	      this.clickOutsideHandler.remove();
	      this.touchOutsideHandler.remove();
	      this.clickOutsideHandler = null;
	      this.touchOutsideHandler = null;
	    }
	  },
	  onMouseEnter: function onMouseEnter() {
	    this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
	  },
	  onMouseLeave: function onMouseLeave(e) {
	    // https://github.com/react-component/trigger/pull/13
	    // react bug?
	    if (e.relatedTarget && !e.relatedTarget.setTimeout && _rcUtil.Dom.contains(this.popupContainer, e.relatedTarget)) {
	      return;
	    }
	    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
	  },
	  onFocus: function onFocus() {
	    // incase focusin and focusout
	    this.clearDelayTimer();
	    if (this.isFocusToShow()) {
	      this.focusTime = Date.now();
	      this.delaySetPopupVisible(true, this.props.focusDelay);
	    }
	  },
	  onMouseDown: function onMouseDown() {
	    this.preClickTime = Date.now();
	  },
	  onTouchStart: function onTouchStart() {
	    this.preTouchTime = Date.now();
	  },
	  onBlur: function onBlur() {
	    this.clearDelayTimer();
	    if (this.isBlurToHide()) {
	      this.delaySetPopupVisible(false, this.props.blurDelay);
	    }
	  },
	  onClick: function onClick(event) {
	    // focus will trigger click
	    if (this.focusTime) {
	      var preTime = void 0;
	      if (this.preClickTime && this.preTouchTime) {
	        preTime = Math.min(this.preClickTime, this.preTouchTime);
	      } else if (this.preClickTime) {
	        preTime = this.preClickTime;
	      } else if (this.preTouchTime) {
	        preTime = this.preTouchTime;
	      }
	      if (Math.abs(preTime - this.focusTime) < 20) {
	        return;
	      }
	      this.focusTime = 0;
	    }
	    this.preClickTime = 0;
	    this.preTouchTime = 0;
	    event.preventDefault();
	    var nextVisible = !this.state.popupVisible;
	    if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
	      this.setPopupVisible(!this.state.popupVisible);
	    }
	  },
	  onDocumentClick: function onDocumentClick(event) {
	    var target = event.target;
	    var root = (0, _reactDom.findDOMNode)(this);
	    var popupNode = this.getPopupDomNode();
	    if (!_rcUtil.Dom.contains(root, target) && !_rcUtil.Dom.contains(popupNode, target)) {
	      this.setPopupVisible(false);
	    }
	  },
	  getPopupDomNode: function getPopupDomNode() {
	    // for test
	    return this.popupDomNode;
	  },
	  getRootDomNode: function getRootDomNode() {
	    return _reactDom2["default"].findDOMNode(this);
	  },
	  getPopupContainer: function getPopupContainer() {
	    if (!this.popupContainer) {
	      this.popupContainer = document.createElement('div');
	      var mountNode = this.props.getPopupContainer ? this.props.getPopupContainer((0, _reactDom.findDOMNode)(this)) : document.body;
	      mountNode.appendChild(this.popupContainer);
	    }
	    return this.popupContainer;
	  },
	  getPopupClassNameFromAlign: function getPopupClassNameFromAlign(align) {
	    var className = [];
	    var props = this.props;
	    var popupPlacement = props.popupPlacement;
	    var builtinPlacements = props.builtinPlacements;
	    var prefixCls = props.prefixCls;
	
	    if (popupPlacement && builtinPlacements) {
	      className.push((0, _utils.getPopupClassNameFromAlign)(builtinPlacements, prefixCls, align));
	    }
	    if (props.getPopupClassNameFromAlign) {
	      className.push(props.getPopupClassNameFromAlign(align));
	    }
	    return className.join(' ');
	  },
	  getPopupAlign: function getPopupAlign() {
	    var props = this.props;
	    var popupPlacement = props.popupPlacement;
	    var popupAlign = props.popupAlign;
	    var builtinPlacements = props.builtinPlacements;
	
	    if (popupPlacement && builtinPlacements) {
	      return (0, _utils.getAlignFromPlacement)(builtinPlacements, popupPlacement, popupAlign);
	    }
	    return popupAlign;
	  },
	  getPopupElement: function getPopupElement() {
	    var props = this.props;
	    var state = this.state;
	
	    var mouseProps = {};
	    if (this.isMouseEnterToShow()) {
	      mouseProps.onMouseEnter = this.onMouseEnter;
	    }
	    if (this.isMouseLeaveToHide()) {
	      mouseProps.onMouseLeave = this.onMouseLeave;
	    }
	    return _react2["default"].createElement(
	      _Popup2["default"],
	      _extends({
	        prefixCls: props.prefixCls,
	        destroyPopupOnHide: props.destroyPopupOnHide,
	        visible: state.popupVisible,
	        className: props.popupClassName,
	        action: props.action,
	        align: this.getPopupAlign(),
	        onAlign: props.onPopupAlign,
	        animation: props.popupAnimation,
	        getClassNameFromAlign: this.getPopupClassNameFromAlign
	      }, mouseProps, {
	        getRootDomNode: this.getRootDomNode,
	        style: props.popupStyle,
	        mask: props.mask,
	        zIndex: props.zIndex,
	        transitionName: props.popupTransitionName,
	        maskAnimation: props.maskAnimation,
	        maskTransitionName: props.maskTransitionName
	      }),
	      props.popup
	    );
	  },
	  setPopupVisible: function setPopupVisible(popupVisible) {
	    this.clearDelayTimer();
	    if (this.state.popupVisible !== popupVisible) {
	      if (!('popupVisible' in this.props)) {
	        this.setState({
	          popupVisible: popupVisible
	        });
	      }
	      this.props.onPopupVisibleChange(popupVisible);
	    }
	  },
	  delaySetPopupVisible: function delaySetPopupVisible(visible, delayS) {
	    var _this2 = this;
	
	    var delay = delayS * 1000;
	    this.clearDelayTimer();
	    if (delay) {
	      this.delayTimer = setTimeout(function () {
	        _this2.setPopupVisible(visible);
	        _this2.clearDelayTimer();
	      }, delay);
	    } else {
	      this.setPopupVisible(visible);
	    }
	  },
	  clearDelayTimer: function clearDelayTimer() {
	    if (this.delayTimer) {
	      clearTimeout(this.delayTimer);
	      this.delayTimer = null;
	    }
	  },
	  isClickToShow: function isClickToShow() {
	    var _props = this.props;
	    var action = _props.action;
	    var showAction = _props.showAction;
	
	    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
	  },
	  isClickToHide: function isClickToHide() {
	    var _props2 = this.props;
	    var action = _props2.action;
	    var hideAction = _props2.hideAction;
	
	    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
	  },
	  isMouseEnterToShow: function isMouseEnterToShow() {
	    var _props3 = this.props;
	    var action = _props3.action;
	    var showAction = _props3.showAction;
	
	    return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
	  },
	  isMouseLeaveToHide: function isMouseLeaveToHide() {
	    var _props4 = this.props;
	    var action = _props4.action;
	    var hideAction = _props4.hideAction;
	
	    return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
	  },
	  isFocusToShow: function isFocusToShow() {
	    var _props5 = this.props;
	    var action = _props5.action;
	    var showAction = _props5.showAction;
	
	    return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
	  },
	  isBlurToHide: function isBlurToHide() {
	    var _props6 = this.props;
	    var action = _props6.action;
	    var hideAction = _props6.hideAction;
	
	    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
	  },
	  render: function render() {
	    this.popupRendered = this.popupRendered || this.state.popupVisible;
	    var props = this.props;
	    var children = props.children;
	    var child = _react2["default"].Children.only(children);
	    var childProps = child.props || {};
	    var newChildProps = {};
	
	    if (this.isClickToHide() || this.isClickToShow()) {
	      newChildProps.onClick = (0, _rcUtil.createChainedFunction)(this.onClick, childProps.onClick);
	      newChildProps.onMouseDown = (0, _rcUtil.createChainedFunction)(this.onMouseDown, childProps.onMouseDown);
	      newChildProps.onTouchStart = (0, _rcUtil.createChainedFunction)(this.onTouchStart, childProps.onTouchStart);
	    }
	    if (this.isMouseEnterToShow()) {
	      newChildProps.onMouseEnter = (0, _rcUtil.createChainedFunction)(this.onMouseEnter, childProps.onMouseEnter);
	    }
	    if (this.isMouseLeaveToHide()) {
	      newChildProps.onMouseLeave = (0, _rcUtil.createChainedFunction)(this.onMouseLeave, childProps.onMouseLeave);
	    }
	    if (this.isFocusToShow() || this.isBlurToHide()) {
	      newChildProps.onFocus = (0, _rcUtil.createChainedFunction)(this.onFocus, childProps.onFocus);
	      newChildProps.onBlur = (0, _rcUtil.createChainedFunction)(this.onBlur, childProps.onBlur);
	    }
	
	    ALL_HANDLERS.forEach(function (handler) {
	      var newFn = void 0;
	      if (props[handler] && newChildProps[handler]) {
	        newFn = (0, _rcUtil.createChainedFunction)(props[handler], newChildProps[handler]);
	      } else {
	        newFn = props[handler] || newChildProps[handler];
	      }
	      if (newFn) {
	        newChildProps[handler] = newFn;
	      }
	    });
	
	    return _react2["default"].cloneElement(child, newChildProps);
	  }
	});
	
	exports["default"] = Trigger;
	module.exports = exports['default'];

/***/ },

/***/ 417:
/*!************************************!*\
  !*** ../~/rc-trigger/lib/index.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(/*! ./Trigger */ 418);

/***/ },

/***/ 442:
/*!************************************!*\
  !*** ../~/rc-trigger/lib/utils.js ***!
  \************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.getAlignFromPlacement = getAlignFromPlacement;
	exports.getPopupClassNameFromAlign = getPopupClassNameFromAlign;
	function isPointsEq(a1, a2) {
	  return a1[0] === a2[0] && a1[1] === a2[1];
	}
	
	function getAlignFromPlacement(builtinPlacements, placementStr, align) {
	  var baseAlign = builtinPlacements[placementStr] || {};
	  return _extends({}, baseAlign, align);
	}
	
	function getPopupClassNameFromAlign(builtinPlacements, prefixCls, align) {
	  var points = align.points;
	  for (var placement in builtinPlacements) {
	    if (builtinPlacements.hasOwnProperty(placement)) {
	      if (isPointsEq(builtinPlacements[placement].points, points)) {
	        return prefixCls + '-placement-' + placement;
	      }
	    }
	  }
	  return '';
	}

/***/ },

/***/ 411:
/*!********************************************!*\
  !*** ../~/rc-util/lib/Children/mapSelf.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(/*! react */ 16);
	
	function mirror(o) {
	  return o;
	}
	
	module.exports = function mapSelf(children) {
	  // return ReactFragment
	  return React.Children.map(children, mirror);
	};

/***/ },

/***/ 410:
/*!********************************************!*\
  !*** ../~/rc-util/lib/Children/toArray.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(/*! react */ 16);
	
	module.exports = function toArray(children) {
	  var ret = [];
	  React.Children.forEach(children, function each(c) {
	    ret.push(c);
	  });
	  return ret;
	};

/***/ },

/***/ 404:
/*!************************************************!*\
  !*** ../~/rc-util/lib/Dom/addEventListener.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = addEventListenerWrap;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _addDomEventListener = __webpack_require__(/*! add-dom-event-listener */ 405);
	
	var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 47);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function addEventListenerWrap(target, eventType, cb) {
	  /* eslint camelcase: 2 */
	  var callback = _reactDom2['default'].unstable_batchedUpdates ? function run(e) {
	    _reactDom2['default'].unstable_batchedUpdates(cb, e);
	  } : cb;
	  return (0, _addDomEventListener2['default'])(target, eventType, callback);
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 409:
/*!****************************************!*\
  !*** ../~/rc-util/lib/Dom/contains.js ***!
  \****************************************/
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function contains(root, n) {
	  var node = n;
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }
	
	  return false;
	};

/***/ },

/***/ 396:
/*!***********************************!*\
  !*** ../~/rc-util/lib/KeyCode.js ***!
  \***********************************/
/***/ function(module, exports) {

	/**
	 * @ignore
	 * some key-codes definition and utils from closure-library
	 * @author yiminghe@gmail.com
	 */
	
	'use strict';
	
	var KeyCode = {
	  /**
	   * MAC_ENTER
	   */
	  MAC_ENTER: 3,
	  /**
	   * BACKSPACE
	   */
	  BACKSPACE: 8,
	  /**
	   * TAB
	   */
	  TAB: 9,
	  /**
	   * NUMLOCK on FF/Safari Mac
	   */
	  NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
	  /**
	   * ENTER
	   */
	  ENTER: 13,
	  /**
	   * SHIFT
	   */
	  SHIFT: 16,
	  /**
	   * CTRL
	   */
	  CTRL: 17,
	  /**
	   * ALT
	   */
	  ALT: 18,
	  /**
	   * PAUSE
	   */
	  PAUSE: 19,
	  /**
	   * CAPS_LOCK
	   */
	  CAPS_LOCK: 20,
	  /**
	   * ESC
	   */
	  ESC: 27,
	  /**
	   * SPACE
	   */
	  SPACE: 32,
	  /**
	   * PAGE_UP
	   */
	  PAGE_UP: 33, // also NUM_NORTH_EAST
	  /**
	   * PAGE_DOWN
	   */
	  PAGE_DOWN: 34, // also NUM_SOUTH_EAST
	  /**
	   * END
	   */
	  END: 35, // also NUM_SOUTH_WEST
	  /**
	   * HOME
	   */
	  HOME: 36, // also NUM_NORTH_WEST
	  /**
	   * LEFT
	   */
	  LEFT: 37, // also NUM_WEST
	  /**
	   * UP
	   */
	  UP: 38, // also NUM_NORTH
	  /**
	   * RIGHT
	   */
	  RIGHT: 39, // also NUM_EAST
	  /**
	   * DOWN
	   */
	  DOWN: 40, // also NUM_SOUTH
	  /**
	   * PRINT_SCREEN
	   */
	  PRINT_SCREEN: 44,
	  /**
	   * INSERT
	   */
	  INSERT: 45, // also NUM_INSERT
	  /**
	   * DELETE
	   */
	  DELETE: 46, // also NUM_DELETE
	  /**
	   * ZERO
	   */
	  ZERO: 48,
	  /**
	   * ONE
	   */
	  ONE: 49,
	  /**
	   * TWO
	   */
	  TWO: 50,
	  /**
	   * THREE
	   */
	  THREE: 51,
	  /**
	   * FOUR
	   */
	  FOUR: 52,
	  /**
	   * FIVE
	   */
	  FIVE: 53,
	  /**
	   * SIX
	   */
	  SIX: 54,
	  /**
	   * SEVEN
	   */
	  SEVEN: 55,
	  /**
	   * EIGHT
	   */
	  EIGHT: 56,
	  /**
	   * NINE
	   */
	  NINE: 57,
	  /**
	   * QUESTION_MARK
	   */
	  QUESTION_MARK: 63, // needs localization
	  /**
	   * A
	   */
	  A: 65,
	  /**
	   * B
	   */
	  B: 66,
	  /**
	   * C
	   */
	  C: 67,
	  /**
	   * D
	   */
	  D: 68,
	  /**
	   * E
	   */
	  E: 69,
	  /**
	   * F
	   */
	  F: 70,
	  /**
	   * G
	   */
	  G: 71,
	  /**
	   * H
	   */
	  H: 72,
	  /**
	   * I
	   */
	  I: 73,
	  /**
	   * J
	   */
	  J: 74,
	  /**
	   * K
	   */
	  K: 75,
	  /**
	   * L
	   */
	  L: 76,
	  /**
	   * M
	   */
	  M: 77,
	  /**
	   * N
	   */
	  N: 78,
	  /**
	   * O
	   */
	  O: 79,
	  /**
	   * P
	   */
	  P: 80,
	  /**
	   * Q
	   */
	  Q: 81,
	  /**
	   * R
	   */
	  R: 82,
	  /**
	   * S
	   */
	  S: 83,
	  /**
	   * T
	   */
	  T: 84,
	  /**
	   * U
	   */
	  U: 85,
	  /**
	   * V
	   */
	  V: 86,
	  /**
	   * W
	   */
	  W: 87,
	  /**
	   * X
	   */
	  X: 88,
	  /**
	   * Y
	   */
	  Y: 89,
	  /**
	   * Z
	   */
	  Z: 90,
	  /**
	   * META
	   */
	  META: 91, // WIN_KEY_LEFT
	  /**
	   * WIN_KEY_RIGHT
	   */
	  WIN_KEY_RIGHT: 92,
	  /**
	   * CONTEXT_MENU
	   */
	  CONTEXT_MENU: 93,
	  /**
	   * NUM_ZERO
	   */
	  NUM_ZERO: 96,
	  /**
	   * NUM_ONE
	   */
	  NUM_ONE: 97,
	  /**
	   * NUM_TWO
	   */
	  NUM_TWO: 98,
	  /**
	   * NUM_THREE
	   */
	  NUM_THREE: 99,
	  /**
	   * NUM_FOUR
	   */
	  NUM_FOUR: 100,
	  /**
	   * NUM_FIVE
	   */
	  NUM_FIVE: 101,
	  /**
	   * NUM_SIX
	   */
	  NUM_SIX: 102,
	  /**
	   * NUM_SEVEN
	   */
	  NUM_SEVEN: 103,
	  /**
	   * NUM_EIGHT
	   */
	  NUM_EIGHT: 104,
	  /**
	   * NUM_NINE
	   */
	  NUM_NINE: 105,
	  /**
	   * NUM_MULTIPLY
	   */
	  NUM_MULTIPLY: 106,
	  /**
	   * NUM_PLUS
	   */
	  NUM_PLUS: 107,
	  /**
	   * NUM_MINUS
	   */
	  NUM_MINUS: 109,
	  /**
	   * NUM_PERIOD
	   */
	  NUM_PERIOD: 110,
	  /**
	   * NUM_DIVISION
	   */
	  NUM_DIVISION: 111,
	  /**
	   * F1
	   */
	  F1: 112,
	  /**
	   * F2
	   */
	  F2: 113,
	  /**
	   * F3
	   */
	  F3: 114,
	  /**
	   * F4
	   */
	  F4: 115,
	  /**
	   * F5
	   */
	  F5: 116,
	  /**
	   * F6
	   */
	  F6: 117,
	  /**
	   * F7
	   */
	  F7: 118,
	  /**
	   * F8
	   */
	  F8: 119,
	  /**
	   * F9
	   */
	  F9: 120,
	  /**
	   * F10
	   */
	  F10: 121,
	  /**
	   * F11
	   */
	  F11: 122,
	  /**
	   * F12
	   */
	  F12: 123,
	  /**
	   * NUMLOCK
	   */
	  NUMLOCK: 144,
	  /**
	   * SEMICOLON
	   */
	  SEMICOLON: 186, // needs localization
	  /**
	   * DASH
	   */
	  DASH: 189, // needs localization
	  /**
	   * EQUALS
	   */
	  EQUALS: 187, // needs localization
	  /**
	   * COMMA
	   */
	  COMMA: 188, // needs localization
	  /**
	   * PERIOD
	   */
	  PERIOD: 190, // needs localization
	  /**
	   * SLASH
	   */
	  SLASH: 191, // needs localization
	  /**
	   * APOSTROPHE
	   */
	  APOSTROPHE: 192, // needs localization
	  /**
	   * SINGLE_QUOTE
	   */
	  SINGLE_QUOTE: 222, // needs localization
	  /**
	   * OPEN_SQUARE_BRACKET
	   */
	  OPEN_SQUARE_BRACKET: 219, // needs localization
	  /**
	   * BACKSLASH
	   */
	  BACKSLASH: 220, // needs localization
	  /**
	   * CLOSE_SQUARE_BRACKET
	   */
	  CLOSE_SQUARE_BRACKET: 221, // needs localization
	  /**
	   * WIN_KEY
	   */
	  WIN_KEY: 224,
	  /**
	   * MAC_FF_META
	   */
	  MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
	  /**
	   * WIN_IME
	   */
	  WIN_IME: 229
	};
	
	/*
	 whether text and modified key is entered at the same time.
	 */
	KeyCode.isTextModifyingKeyEvent = function isTextModifyingKeyEvent(e) {
	  var keyCode = e.keyCode;
	  if (e.altKey && !e.ctrlKey || e.metaKey ||
	  // Function keys don't generate text
	  keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
	    return false;
	  }
	
	  // The following keys are quite harmless, even in combination with
	  // CTRL, ALT or SHIFT.
	  switch (keyCode) {
	    case KeyCode.ALT:
	    case KeyCode.CAPS_LOCK:
	    case KeyCode.CONTEXT_MENU:
	    case KeyCode.CTRL:
	    case KeyCode.DOWN:
	    case KeyCode.END:
	    case KeyCode.ESC:
	    case KeyCode.HOME:
	    case KeyCode.INSERT:
	    case KeyCode.LEFT:
	    case KeyCode.MAC_FF_META:
	    case KeyCode.META:
	    case KeyCode.NUMLOCK:
	    case KeyCode.NUM_CENTER:
	    case KeyCode.PAGE_DOWN:
	    case KeyCode.PAGE_UP:
	    case KeyCode.PAUSE:
	    case KeyCode.PRINT_SCREEN:
	    case KeyCode.RIGHT:
	    case KeyCode.SHIFT:
	    case KeyCode.UP:
	    case KeyCode.WIN_KEY:
	    case KeyCode.WIN_KEY_RIGHT:
	      return false;
	    default:
	      return true;
	  }
	};
	
	/*
	 whether character is entered.
	 */
	KeyCode.isCharacterKey = function isCharacterKey(keyCode) {
	  if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
	    return true;
	  }
	
	  if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
	    return true;
	  }
	
	  if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
	    return true;
	  }
	
	  // Safari sends zero key code for non-latin characters.
	  if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
	    return true;
	  }
	
	  switch (keyCode) {
	    case KeyCode.SPACE:
	    case KeyCode.QUESTION_MARK:
	    case KeyCode.NUM_PLUS:
	    case KeyCode.NUM_MINUS:
	    case KeyCode.NUM_PERIOD:
	    case KeyCode.NUM_DIVISION:
	    case KeyCode.SEMICOLON:
	    case KeyCode.DASH:
	    case KeyCode.EQUALS:
	    case KeyCode.COMMA:
	    case KeyCode.PERIOD:
	    case KeyCode.SLASH:
	    case KeyCode.APOSTROPHE:
	    case KeyCode.SINGLE_QUOTE:
	    case KeyCode.OPEN_SQUARE_BRACKET:
	    case KeyCode.BACKSLASH:
	    case KeyCode.CLOSE_SQUARE_BRACKET:
	      return true;
	    default:
	      return false;
	  }
	};
	
	module.exports = KeyCode;

/***/ },

/***/ 397:
/*!*******************************************!*\
  !*** ../~/rc-util/lib/PureRenderMixin.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var shallowEqual = __webpack_require__(/*! shallowequal */ 398);
	
	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   const ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	  }
	};
	
	module.exports = ReactComponentWithPureRenderMixin;

/***/ },

/***/ 393:
/*!************************************!*\
  !*** ../~/rc-util/lib/classSet.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var deprecate = __webpack_require__(/*! util-deprecate */ 394);
	var classNames = __webpack_require__(/*! classnames */ 247);
	
	module.exports = deprecate(classNames, '`rcUtil.classSet()` is deprecated, use `classNames()` by `require(\'classnames\')` instead');

/***/ },

/***/ 403:
/*!*************************************************!*\
  !*** ../~/rc-util/lib/createChainedFunction.js ***!
  \*************************************************/
/***/ function(module, exports) {

	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @returns {function|null}
	 */
	"use strict";
	
	function createChainedFunction() {
	  var args = arguments;
	  return function chainedFunction() {
	    for (var i = 0; i < args.length; i++) {
	      if (args[i] && args[i].apply) {
	        args[i].apply(this, arguments);
	      }
	    }
	  };
	}
	
	module.exports = createChainedFunction;

/***/ },

/***/ 392:
/*!********************************!*\
  !*** ../~/rc-util/lib/guid.js ***!
  \********************************/
/***/ function(module, exports) {

	'use strict';
	
	var seed = 0;
	module.exports = function guid() {
	  return Date.now() + '_' + seed++;
	};

/***/ },

/***/ 391:
/*!*********************************!*\
  !*** ../~/rc-util/lib/index.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  guid: __webpack_require__(/*! ./guid */ 392),
	  classSet: __webpack_require__(/*! ./classSet */ 393),
	  joinClasses: __webpack_require__(/*! ./joinClasses */ 395),
	  KeyCode: __webpack_require__(/*! ./KeyCode */ 396),
	  PureRenderMixin: __webpack_require__(/*! ./PureRenderMixin */ 397),
	  shallowEqual: __webpack_require__(/*! shallowequal */ 398),
	  createChainedFunction: __webpack_require__(/*! ./createChainedFunction */ 403),
	  Dom: {
	    addEventListener: __webpack_require__(/*! ./Dom/addEventListener */ 404),
	    contains: __webpack_require__(/*! ./Dom/contains */ 409)
	  },
	  Children: {
	    toArray: __webpack_require__(/*! ./Children/toArray */ 410),
	    mapSelf: __webpack_require__(/*! ./Children/mapSelf */ 411)
	  }
	};

/***/ },

/***/ 395:
/*!***************************************!*\
  !*** ../~/rc-util/lib/joinClasses.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var deprecate = __webpack_require__(/*! util-deprecate */ 394);
	var classNames = __webpack_require__(/*! classnames */ 247);
	
	module.exports = deprecate(classNames, '`rcUtil.joinClasses()` is deprecated, use `classNames()` by `require(\'classnames\')` instead');

/***/ },

/***/ 394:
/*!************************************************!*\
  !*** ../~/rc-util/~/util-deprecate/browser.js ***!
  \************************************************/
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module exports.
	 */
	
	module.exports = deprecate;
	
	/**
	 * Mark that a method should not be used.
	 * Returns a modified function which warns once by default.
	 *
	 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
	 *
	 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
	 * will throw an Error when invoked.
	 *
	 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
	 * will invoke `console.trace()` instead of `console.error()`.
	 *
	 * @param {Function} fn - the function to deprecate
	 * @param {String} msg - the string to print to the console when `fn` is invoked
	 * @returns {Function} a new "deprecated" version of `fn`
	 * @api public
	 */
	
	function deprecate (fn, msg) {
	  if (config('noDeprecation')) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (config('throwDeprecation')) {
	        throw new Error(msg);
	      } else if (config('traceDeprecation')) {
	        console.trace(msg);
	      } else {
	        console.warn(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	}
	
	/**
	 * Checks `localStorage` for boolean values for the given `name`.
	 *
	 * @param {String} name
	 * @returns {Boolean}
	 * @api private
	 */
	
	function config (name) {
	  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
	  try {
	    if (!global.localStorage) return false;
	  } catch (_) {
	    return false;
	  }
	  var val = global.localStorage[name];
	  if (null == val) return false;
	  return String(val).toLowerCase() === 'true';
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 448:
/*!****************************************************!*\
  !*** ../~/react-addons-pure-render-mixin/index.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! react/lib/ReactComponentWithPureRenderMixin */ 449);

/***/ },

/***/ 398:
/*!******************************************!*\
  !*** ../~/shallowequal/modules/index.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var fetchKeys = __webpack_require__(/*! lodash.keys */ 399);
	
	module.exports = function shallowEqual(objA, objB, compare, compareContext) {
	
	    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
	
	    if (ret !== void 0) {
	        return !!ret;
	    }
	
	    if (objA === objB) {
	        return true;
	    }
	
	    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	        return false;
	    }
	
	    var keysA = fetchKeys(objA);
	    var keysB = fetchKeys(objB);
	
	    var len = keysA.length;
	    if (len !== keysB.length) {
	        return false;
	    }
	
	    compareContext = compareContext || null;
	
	    // Test for A's keys different from B.
	    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	    for (var i = 0; i < len; i++) {
	        var key = keysA[i];
	        if (!bHasOwnProperty(key)) {
	            return false;
	        }
	        var valueA = objA[key];
	        var valueB = objB[key];
	
	        var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
	        if (_ret === false || _ret === void 0 && valueA !== valueB) {
	            return false;
	        }
	    }
	
	    return true;
	};

/***/ },

/***/ 444:
/*!*******************************!*\
  !*** ../~/warning/browser.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (({"USE_CDN":true}).NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ }

});
//# sourceMappingURL=app-b682f3e24512adf11c50.js.map