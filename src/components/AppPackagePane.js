
var Utils=require("../utils/Util");
var AppPackagePaneMixin = {
    getInitialState: function(){
        return{
            projPath:'',
            pkg:{}
        }
    },
    componentWillMount:function(){
        let projName=this.props.params.projName;
        let projects=JSON.parse(localStorage.getItem('projects'));
        for(var proj in projects){
            console.log(proj.projName);
            if(proj.projName==projName){
                this.setState({
                    projPath:projects[proj].path,
                    pkg:Utils.readPackagejson(this.projPath)
                })
            }
        }
        console.log(projects[projName]);

    },
    componentDidMount: function() {
    },
 };

module.exports = AppPackagePaneMixin;
