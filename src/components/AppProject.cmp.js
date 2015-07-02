var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
var React = require('react/addons');
var Router = require('react-router');
var NpmUtils= require("../utils/NpmUtils");
var shell= require("shell");
var Utils = require('../utils/Util');


var ProjectItemCmp =React.createClass({
	getInitialState:function(){
		let contextMenuTpl=[{
				label: '删除',
				accelerator: 'Command+Z',
				selector: 'undo:'
			  },{
				type: 'separator'
			  },{
				label: 'Redo',
				accelerator: 'Shift+Command+Z',
				selector: 'redo:'
			  }];
		return  {
			memu:Menu.buildFromTemplate(contextMenuTpl)
		}
	},
	//TODO 未实现右键菜单功能 
	handlerContextMenu:function(e){
		  e.preventDefault();
		  this.statue.menu.popup(remote.getCurrentWindow());
	},
	render:function(){
		var proj=this.props.project;
		return (
		  <Router.Link to="projectDetail" query={{path:proj.path}} params={{name:proj.name}}>
			<li className="project-item" oncontextmenu={this.handlerContextMenu}>
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
  handlerVisitRepo:function(e){
	console.log(e.currentTarget.href);
	shell.openExternal(e.currentTarget.href);
  },
  render: function () {
	let name= this.props.params.name;
	let dir=this.props.query.path;
	let pkg= Utils.readPackagejson(dir);
    let content;
	content = (
		<div className="package-panel">
			<div className="package-header">
				<h2><img src="github.png" /> <a href="http://github.com/jaxchow/hns-server" onClick={this.handlerVisitRepo}>{pkg.name}</a> <small>(ver:{pkg.version})</small></h2>
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
	/**
	 * 执行命令
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 * todo: NpmUtils.runTask 方法无法正常执行
	 */
  handlerClick:function(event){
	let self=this;
	let target=event.currentTarget;
	let cmd=target.dataset.script;
	let router=self.context.router;
	let params=router.getCurrentParams();
	this.context.router.transitionTo('pkgLog', router.getCurrentParams(),router.getCurrentQuery());
	//NpmUtils[cmd](self.props.dir,params.name);
	NpmUtils.runTask(cmd,params.name,self.props.dir);	
  },
  render: function () {
    let content;
	let btns;
	// 过滤preXXX postXXX 所有script
	btns=Object.keys(this.props.scripts).map(scrp => {
		if(/^pre|post\w+/.test(scrp)) return ;
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
