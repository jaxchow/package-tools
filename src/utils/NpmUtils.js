import {EventEmitter} from 'events';
import fs from 'fs';
import path from 'path';
import resolve from 'resolve';
import npm from 'npm';
import util from './Util';
import assign from 'object-assign';
import Convert from 'ansi-to-html';

var _convert = new Convert();
export default assign(Object.create(EventEmitter.prototype),{
  NPM_LOGS_EVENT: 'npm_logs_event',
  NPM_PROJECT_EVENT:'npm_project_event',
  _logs:{
  },
  execTask (taskName,name,cwd){
	  var self=this;
	  //var self._logs[name]=[];
	return util.execTask(['npm',taskName],{cwd:cwd}).then(function(process){

		process.stderr.on('data',function(chunk){
			self.emit(self.NPM_LOGS_EVENT,{text:chunk});
		//	self._logs[name].push(_convert.toHtml(self._escape(chunk)))
		});
		process.stdout.on('data',function(chunk){
			self.emit(self.NPM_LOGS_EVENT,{text:chunk});
		//	self._logs[name].push(_convert.toHtml(self._escape(chunk)))
		});
	})
  },
  start (dirPath,name){
	return this.execTask('start',name,path.resolve(dirPath));
  },
  test (dirPath,name){
	return this.execTask('test',name,path.resolve(dirPath));
  },
  add (dirPath){
	let self=this;
	let proj={};
	let projects=JSON.parse(localStorage.getItem('projects'))||{};
	let json=util.readPackagejson(dirPath);
	projects[json.name]={
		name:json.name,
		version:json.version,
		path:dirPath
	};
	localStorage.setItem('projects',JSON.stringify(projects));
	self.emit(self.NPM_PROJECT_EVENT,{projects:projects});
  },
  _escape: function (html) {
    var text = document.createTextNode(html);
    var div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
  },
  logs:function(taskName){
	return this._logs[taskName];
  }
});
