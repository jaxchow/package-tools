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
		logs:[]
    };
  },
  componentDidMount: function() {
	 NpmUtils.on(NpmUtils.NPM_LOGS_EVENT, this.update);
  },
  update:function(event){
	this.setState({
      logs: NpmUtils.getLogs(event.text)
    });
  },
  componentDidUpdate: function () {
    this.scrollToBottom();
  },
  //TODO 临时解决滚动问题
  scrollToBottom: function () {
    var parent =  this.getDOMNode().parentElement;
     parent.scrollTop=9999999999999; 
  },
  //TODO 布局问题暂时使用白底黑字方案显示 
  render: function () {
    let DOM;
		var logs = this.state.logs.map(function (l, i) {
		  return <div key={i} dangerouslySetInnerHTML={{__html: l}}></div>;
		});
		if (logs.length === 0) {
		  logs = "No logs!";
		}
		DOM = (
		<div className="log-pane pkg-pane">
			{logs}
		</div>
	);
    return DOM;
  }
});

module.exports = AppPackageLogPane;
