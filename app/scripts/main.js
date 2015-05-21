'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var config = require('./config');
var Data = require('./component/data');

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>India Lights</h1>
        <RouteHandler />
      </div>
    );
  }
}

App.displayName = 'App';

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='nation' path='nation' handler={Data}/>
    <Route name='state' path='state/:state' handler={Data}/>
    <Route name='district' path='state/:state/district/:district' handler={Data}/>

    // TODO: possibly replace this with a landing page
    <DefaultRoute handler={Data}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root, state) => {
  console.log(state);
  console.log(config.apiUrl);

  React.render(<Root/>, document.body);
});
