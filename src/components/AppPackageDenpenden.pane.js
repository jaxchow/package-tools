/**
 *
 *  依赖模块面板显示
 *
 *
 */


var AppPackageList = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  componentWillMount: function() {

  },
  render: function () {
    let DOM,listDenpends=[];
	let dependens=this.props.dependens;
	for(let dep in dependens){
		listDenpends.push(
			<AppPackageItem name={dep} version={dependens[dep]} description="" />
		)
	}
		DOM = (
			<div className="denpendens">
				<h3>{this.props.name}</h3>
				<div className="row">
					{listDenpends}
				</div>
			</div>
		
	);
    return DOM;
  }
});


var AppPackageItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    let DOM;
		DOM = (
			<div className="pkg-item col-sm-6 col-md-4">
				<div className="thumbnail">
					<div className="caption">
						<h4>{this.props.name}
							<span className="badge">{this.props.version}</span>
						</h4>
					</div>
					<p>{this.props.description}</p>
					<div className="btn-toolbar">
						<div className="btn-group">
							<button type="button" className="btn btn-success">Installed</button>
						</div>
						<div className="btn-group">
							<button type="button" className="btn btn-warning">update</button>
						</div>
					</div>
				</div>
			</div>
	);
    return DOM;
  }
});

var Utils= require('../utils/util');

var AppPackageDenpendenPane = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
	return {
      pkg: []
    };
  },
  componentWillMount: function() {
	  let projPath=this.props.query.path;
	  let pkg=Utils.readPackagejson(projPath);
	  this.setState({
		pkg:pkg
	  });
  },
  render: function () {
    let DOM;
		DOM = (
		<div className="denpenden-pane pkg-pane">
			<AppPackageList dependens={this.state.pkg.dependencies} name="dependencies"/>
			<AppPackageList dependens={this.state.pkg.devDependencies} name="devDependencies"/>
		</div>
	);
    return DOM;
  }
});

module.exports = AppPackageDenpendenPane;
