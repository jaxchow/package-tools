


var remote = require('remote');
var Menu = remote.require('menu');
var React = require('react');
var ipc = require('ipc');
//var metrics = require('./utils/MetricsUtil');
var router = require('./router');
var template = require('./menutemplate');
var webUtil = require('./utils/WebUtil');
var urlUtil = require ('./utils/URLUtil');
var app = remote.require('app');
var request = require('request');

//webUtil.addWindowSizeSaving();
webUtil.addLiveReload();
webUtil.disableGlobalBackspace();

router.run(Handler => React.render(<Handler/>, document.body));
Menu.setApplicationMenu(Menu.buildFromTemplate(template()));
ipc.on('application:quitting', () => {
	console.log("quit!");
});
