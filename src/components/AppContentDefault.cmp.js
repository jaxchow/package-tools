var React = require('react/addons');
var path= require("path");
var NpmUtil = require("../utils/NpmUtils");
var AppContentCmp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount:function(){
	let holder=document.getElementById("holder");

	holder.addEventListener("drop",function(e){ 
        e.preventDefault(); //取消默认浏览器拖拽效果 
        var fileList = e.dataTransfer.files; //获取文件对象 
		NpmUtil.importProject(fileList[0].path);
	});
    holder.addEventListener('dragover', function (e) {
        e.preventDefault(); //取消默认浏览器拖拽效果 
		this.className = 'hover';
	});
  },
  render: function () {
    let content;
	let img = 'npm-logo.png';
	content = (
		  <div className="default-panel">
			  <div className="contents">
				<img src={img} className="logo"/>
				<h3 className="logo-name"> Package-Tools</h3>
				<div id="holder" draggable="true">
					Drag your app package.json here 
				</div>
			  </div>
		  </div>
	);
    return content;
  }
});

module.exports = AppContentCmp;
