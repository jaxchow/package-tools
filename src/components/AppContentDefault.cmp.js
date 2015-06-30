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
        //检测是否是拖拽文件到页面的操作 
        //检测文件是不是图片 
		if(fileList[0].name!='package.json'){
			alert("亲！文件我不认识，请拖package.json");
			return false;
		}
        if(fileList[0].type!=='application/json'){ 
            alert("亲!不要坑我文件类型不正常"); 
            return false; 
        } 
		var projPath=path.dirname(fileList[0].path);
		NpmUtil.add(projPath);
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
