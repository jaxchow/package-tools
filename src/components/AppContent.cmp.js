var React = require('react/addons');
var Router = require('react-router');

/**
 * 右侧主界面
 * @param  {[type]} [description]
 * @return {[type]} [description]
 */
var AppContentCmp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    let DOM;
	DOM = (
		<Router.RouteHandler />
	);
    return DOM;
  }
});

module.exports = AppContentCmp;
