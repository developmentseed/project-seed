'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Link = Router.Link;

var TimeSeries = require('./store/time-series');
var Data = require('./component/data');

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>India Lights</h1>
        <Link to='nation' params={{
          interval: '2010.01-2011.01'
        }}>National</Link><br/>

        <Link to='state'
          params={{
          interval: '2010.01-2011.01',
          state: 'uttar-pradesh'
        }}>State</Link><br/>

        <Link to='district' params={{
          interval: '2010.01-2011.01',
          state: 'uttar-pradesh',
          district: 'blahblah'
        }}>District</Link><br/>

        <RouteHandler />
      </div>
    );
  }
}

App.displayName = 'App';

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='nation' path='months/:interval' handler={Data}/>
    <Route name='state' path='months/:interval/state/:state' handler={Data}/>
    <Route name='district'
      path='months/:interval/state/:state/district/:district' handler={Data}/>

    // TODO: replace this with a landing page
    <DefaultRoute handler={Data}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root, state) => {
  console.log('route', state);
  React.render(<Root/>, document.body);
  // TODO: only do this for the relevant routes!
  TimeSeries.onChooseRegion(state.params);
});
