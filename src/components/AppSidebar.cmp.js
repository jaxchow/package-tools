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
  handlerImportProject:function(){
	dialog.showOpenDialog({ properties: [ 'openFile'],filters:[{ name: 'package.json', extensions: ['json']}]},function(file){
		NpmUtils.importProject(file);
	})
		
  },
  render: function () {

    let side;
	side = (
		<div className="app-sidebar">
            <div className="sidebar-header">
			 <Router.Link to="projectDefault">
				<span className="glyphicon glyphicon-home"></span>
			 </Router.Link>
				<input type="text" name="search" className="sidebar-search" value="" />
			</div>
            <div className="sidebar-body">
				<ProjectListCmp projects={this.props.projects} />
			</div>
			<div className="sidebar-footer-bar">
				<ButtonToolbar>
					<ButtonGroup bsSize='medium'>
					  <Button onClick={this.handlerImportProject}><Glyphicon glyph='plus' /></Button>
					  <Button><Glyphicon glyph='trash' /></Button>
					  <Button><Glyphicon glyph='cloud' /></Button>
					</ButtonGroup>

					<ButtonGroup bsSize='medium'>
					  <Button><Glyphicon glyph='fullscreen' /></Button>
					  <Button><Glyphicon glyph='option-horizontal' /></Button>
					</ButtonGroup>
				</ButtonToolbar>	

			</div>
   		</div>
	);
    return side;
  }
});

module.exports = AppSidebarCmp;
