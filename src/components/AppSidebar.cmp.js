
var React = require('react/addons');
var Router = require('react-router');
var ProjectListCmp=require('./AppProject.cmp').ProjectListCmp;

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
			<div className="sidebar-footer-bar"></div>
   		</div>
	);
    return side;
  }
});

module.exports = AppSidebarCmp;
