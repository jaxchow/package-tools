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
  runTask (taskName,name,cwd){
	  var self=this;
	  self._logs[name]=self._logs[name]|| new Array();
	return util.execTask(['npm','run',taskName],{cwd:path.resolve(cwd)}).then(function(process){
		process.stderr.on('data',function(chunk){
			self._logs[name].push(_convert.toHtml(chunk));
			self.emit(self.NPM_LOGS_EVENT,{text:name});
		});
		process.stdout.on('data',function(chunk){
			self._logs[name].push(_convert.toHtml(self._escape(chunk)));
			self.emit(self.NPM_LOGS_EVENT,{text:name});
		});
	})
  },
  importProject (file){
	var filename=path.basename(file);
	var fileDir=path.dirname(file);
	if(filename!='package.json'){
		alert("亲！文件我不认识，请拖package.json");
		return false;
	}
	this.add(fileDir);
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
   _escape (html) {
    var text = document.createTextNode(html);
    var div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
  },
  remove (){

  },
  getLogs (taskName){
	return this._logs[taskName];
  }
});
