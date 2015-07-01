
/**
 *	 readme pane
 *
 *
 *
 *
 */

var marked= require('marked');
var fs= require('fs');
var path= require('path');

var AppPackageReadMePane = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
    return {
        projDir:"",
		textContent:"no readme!"
	};
  },
  componentDidMount: function() {
	let projPath=this.props.query.path;
	var textContent="no readme!";
	if(fs.existsSync(path.join(projPath,'README.md'))){
		textContent=fs.readFileSync(path.join(projPath,"README.md")).toString()
	}else if(fs.existsSync(path.join(projPath,'README'))){
		textContent=fs.readFileSync(path.join(projPath,"README")).toString()
	}
	this.setState({
		textContent:textContent
	});
  },
  render: function () {
	let textContent=this.state.textContent;
    let DOM;
		DOM = (
		<div className="markdown-pane pkg-pane"
			dangerouslySetInnerHTML={{
				__html: marked(textContent,{sanitize: true})
			}} >
		</div>
	);
    return DOM;
  }
});

module.exports= AppPackageReadMePane;
