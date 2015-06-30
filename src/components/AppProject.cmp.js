var React = require('react/addons');
var Router = require('react-router');
var NpmUtils= require("../utils/NpmUtils");
var Utils = require('../utils/Util');


var ProjectItemCmp =React.createClass({
	render:function(){
		var proj=this.props.project;
		return (
		  <Router.Link to="projectDetail" query={{path:proj.path}} params={{name:proj.name}}>
			<li className="project-item">
				<h5>{proj.name}<small>({proj.version})</small></h5>
				<span>{proj.path}</span>
			</li>
		  </Router.Link>
		)
	}
});

var ProjectListCmp = React.createClass({
  render: function () {
	 let projectsList=[];
	 let projects=this.props.projects;
	  for(let proj in projects){
		  projectsList.push(
			<ProjectItemCmp project={projects[proj]} />
		  );
		}
    return (
		<ul className="projects-list">
			{projectsList}
		</ul>
    );
  }
});

module.exports.ProjectListCmp= ProjectListCmp;


var AppContentPackageCmp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
	let name= this.props.params.name;
	let dir=this.props.query.path;
	let pkg= Utils.readPackagejson(dir);
    let content;
	content = (
		<div className="package-panel">
			<div className="package-header">
				<h2>{pkg.name} <small>(ver:{pkg.version})</small></h2>
				<p>{pkg.description}</p>
				<div className="package-toolbar">
					<AppPackageToolbarCmp scripts={pkg.scripts} dir={dir}/>
					<ul className="nav nav-tabs package-nav-tabs">
						<li className="active">
						  <Router.Link to="pkgProto" {...this.props}>
							Proto
						  </Router.Link>
						</li>
						<li>
						  <Router.Link to="pkgReadme" {...this.props}>
							Readme
						  </Router.Link>
						</li>
						<li>
						  <Router.Link to="pkgLog" {...this.props}>
							Log
						  </Router.Link>
						</li>
						<li>
						  <Router.Link to="pkgDenpenden" {...this.props}>
							Dependencies
						  </Router.Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="package-body">
				<Router.RouteHandler />
			</div>
		</div>
	);
    return content;
  }
});

module.exports.AppContentPackageCmp = AppContentPackageCmp;

var AppPackageToolbarCmp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
    return {
      scripts:{},
	  name:''
    };
  },
  componentDidMount: function() {
  },
	/**
	 * 执行命令
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 * todo: NpmUtils.runTask 方法无法正常执行
	 */
  handlerClick:function(event){
	let target=event.currentTarget;
	let cmd=target.dataset.script;
	let params=this.context.router.getCurrentParams();
	NpmUtils[cmd](this.props.dir,params.name);
	this.context.router.transitionTo('pkgLog', {name: params.name});
  },
  render: function () {
    let content;
	let btns;
	btns=Object.keys(this.props.scripts).map(scrp => {
		return	<button className="btn btn-default" type="button" data-script={scrp} onClick={this.handlerClick}><span className="glyphicon glyphicon-align-left">{scrp}</span></button>
	});

	content = (
		<div role="toolbar" className="pull-left btn-toolbar">
		  <div className="btn-group">
			{btns}
		  </div>
		</div>

	);
    return content;
  }
});
module.exports.AppPackageToolbarCmp = AppPackageToolbarCmp;
