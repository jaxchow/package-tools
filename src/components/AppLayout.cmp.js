var React = require('react');
var ipc = require('ipc');
var remote = require('remote');
var AppSidebarCmp=require('./AppSidebar.cmp');
var AppContentCmp=require('./AppContent.cmp');
var NpmUtils = require('../utils/NpmUtils');
var AppLayoutCmp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
	var projects=JSON.parse(localStorage.getItem('projects'));
    return {
      sidebarOffset: 0,
	  projects:projects,
      currentButtonLabel: ''
    };
  },
  componentDidMount: function () {
    NpmUtils.on(NpmUtils.NPM_PROJECT_EVENT, this.handleProjectChange);
  },
  handleProjectChange:function(e){
	  this.setState({
		  projects:e.projects
	  });
  },
  render: function () {
    return (
	<div className="app">
		<AppSidebarCmp projects={this.state.projects} />
		<div className="app-content">
			<AppContentCmp />
		</div>
	</div>
    );
  }
});

module.exports = AppLayoutCmp;
