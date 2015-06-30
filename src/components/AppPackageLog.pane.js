/**
  *  日志面板
  *
  *
  */
var Convert =require('ansi-to-html');
var NpmUtils = require('../utils/NpmUtils');

var AppPackageLogPane = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
    return {
    };
  },
  componentDidMount: function() {
	 NpmUtils.on(NpmUtils.NPM_LOGS_EVENT, this.update);
  },
  _escape: function (html) {
    var text = document.createTextNode( new Convert().toHtml(html));
    var div = document.createElement('div');
    div.appendChild(text);
    return div;
  },
  update:function(event){
	this.getDOMNode().appendChild(this._escape(event.text));
  },
  render: function () {
    let DOM;
		DOM = (
		<div className="log-pane pkg-pane">

		</div>
	);
    return DOM;
  }
});

module.exports = AppPackageLogPane;
