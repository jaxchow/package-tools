var remote = require('remote');
var dialog =remote.require('dialog');
var React = require('react/addons');
var Router = require('react-router');
var NpmUtils= require('../utils/NpmUtils');
var ProjectListCmp=require('./AppProject.cmp').ProjectListCmp;
var ReactBootstrap= require('react-bootstrap');
var ButtonToolbar=ReactBootstrap.ButtonToolbar;
var ButtonGroup=ReactBootstrap.ButtonGroup;
var Button=ReactBootstrap.Button;
var Glyphicon=ReactBootstrap.Glyphicon;
var Input=ReactBootstrap.Input;

var AppSidebarDropDrapCmp = React.createClass({
	componentWillmount: function() {
		let domNode=this.getDOMNode();
		let holder=domNode.querySelector("#holder");

		holder.addEventListener("drop",function(e){ 
			e.preventDefault(); //取消默认浏览器拖拽效果 
			var fileList = e.dataTransfer.files; //获取文件对象 
			NpmUtil.importProject(fileList[0].path);
		});
		holder.addEventListener('dragover', function (e) {
			e.preventDefault(); //取消默认浏览器拖拽效果 
			this.className = 'hover';
		});
		domNode.addEventListener("collapsePanel",this.handlerCollapsePanel);
	},
	handlerCollapsePanel:function(e){
		console.log(e);
	},
	render: function () {
		return (
			<div className="sidebar-dropdrap">
				<div id="holder" draggable="true">
					Drag your app package.json here 
				</div>
			</div>
		);
	}
});
var AppSidebarCmp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  componentDidUpdate: function () {
    this.handleResize();
  },

  handleResize: function () {
  //  $('.left .wrapper').height(window.innerHeight - 240);
  //  $('.right .wrapper').height(window.innerHeight / 2 - 100);
  },
  handlerFullScreen:function(){
	remote.getCurrentWindow().setFullScreen(true);
  },
  handlerDDCollapse:function(){
	var domNode=this.getDOMNode(),
		ddNode=domNode.querySelector(".sidebar-dropdrap"),
		ddNodeStyle=ddNode.style;
	ddNodeStyle.display=ddNodeStyle.display=='none'?'flex':'none';
  },
  handlerGoHome:function(event){
	this.context.router.transitionTo('projectDefault');
  },
  handlerSearchProject:function(event){
	  console.log(event);
  },
  handlerImportProject:function(event){
	dialog.showOpenDialog({ properties: [ 'openFile'],filters:[{ name: 'package.json', extensions: ['json']}]},function(file){
		NpmUtils.importProject(file);
	})
		
  },
  render: function () {
    let side;
	side = (
		<div className="app-sidebar">
            <div className="sidebar-header">
				<form onSubmit={this.handlerSearchProject}>
				<Input type='text' addonAfter={<Glyphicon glyph='search' />} />
				</form>
			</div>
            <div className="sidebar-body">
				<ProjectListCmp projects={this.props.projects} />
			</div>

			<AppSidebarDropDrapCmp />
			<div className="sidebar-footer-bar">
				<ButtonToolbar>
					<ButtonGroup bsSize='medium'>
					  <Button onClick={this.handlerImportProject}><Glyphicon glyph='plus' /></Button>
					  <Button><Glyphicon glyph='trash' /></Button>
					  <Button onClick={this.handlerGoHome}><Glyphicon glyph='home' /></Button>
					</ButtonGroup>

					<ButtonGroup bsSize='medium'>
					  <Button onClick={this.handlerFullScreen}><Glyphicon glyph='fullscreen' /></Button>
					  <Button onClick={this.handlerDDCollapse}><Glyphicon glyph='open' /></Button>
					  <Button onClick={this.handlerDDCollapse}><Glyphicon glyph='cog' /></Button>
					</ButtonGroup>
				</ButtonToolbar>	

			</div>
   		</div>
	);
    return side;
  }
});

module.exports = AppSidebarCmp;
