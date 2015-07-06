/**
  *   属性面板
  *
  *
  *
  **/

var React = require('react/addons');
var ReactTools = require('react-tools');
var Utils= require('../utils/util');
var fs= require('fs');
var path= require('path');

require.extensions['.jsx'] = function (module, filename) {
    var fs = require("fs");
    var content = fs.readFileSync(filename, 'utf8');
    return module._compile(ReactTools.transform(content, {
        harmony: true
    }), filename);
};
var AceEditor  = require('react-ace');
var AppPackageProtoPane = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
	return { 
    };
  },
  componentWillMount: function() {
  },
  render: function () {
	  let projPath=this.props.query.path;
	  let pkgStr=fs.readFileSync(path.join(projPath,"package.json"))||"";
      let DOM;
		DOM = (
		<div className="proto-pane pkg-pane">
			 <AceEditor mode="javascript" theme="monokai" width="100%" height="100%" value={pkgStr.toString()}/>
		</div>
	);
    return DOM;
  }
});

module.exports= AppPackageProtoPane;
