var React = require('react/addons');
var Router = require('react-router');
var NotFoundRoute=Router.NotFoundRoute;
//var Setup = require('./components/Setup.react');
var AppLayoutCmp = require('../components/AppLayout.cmp');
var AppContentCmp = require('../components/AppContent.cmp');
var AppContentDefaultCmp = require('../components/AppContentDefault.cmp');
var AppProjectCmp= require('../components/AppProject.cmp');

var AppPackageLogPane = require("../components/AppPackageLog.pane");
var AppPackageProtoPane = require("../components/AppPackageProto.pane");
var AppPackageReadMePane = require("../components/AppPackageReadMe.pane");
var AppPackageDenpendenPane = require("../components/AppPackageDenpenden.pane");
var AppContentPackageCmp= AppProjectCmp.AppContentPackageCmp;

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

var App = React.createClass({
  render: function () {
    return (
      <RouteHandler/>
    );
  }
});

var routes = (
  <Route name="application" path="/" handler={App}>
	<Route name="/" handler={AppLayoutCmp}>
		<Route name="project" path="project" handler={AppContentCmp} >
			<Route name="projectDetail" path=":name" handler={AppContentPackageCmp} >
				<Route name="pkgProto" path="proto" handler={AppPackageProtoPane} />
				<Route name="pkgReadme" path="readme" handler={AppPackageReadMePane} />
				<Route name="pkgLog" path="log" handler={AppPackageLogPane} />
				<Route name="pkgDenpenden" path="denpenden" handler={AppPackageDenpendenPane} />
				<DefaultRoute name="pkgDefault" handler={AppPackageProtoPane} />
			</Route>
		</Route>
		<DefaultRoute name="projectDefault" handler={AppContentDefaultCmp} />
	</Route>
	<NotFoundRoute handler={AppContentDefaultCmp} />
  </Route>
);
module.exports = routes;
