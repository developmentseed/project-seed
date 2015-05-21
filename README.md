# india-lights

The front end for the India Lights project.

## Build

- `npm run build` - clean & build everything and put it into dist folder
- `npm run serve` - serve the pages and utilize live reload on changes to
  styles, fonts, images, scripts and HTML.  Run this and then open up
  [http://localhost:9000](http://localhost:9000) in your browser.
- `API_URL='http://whatever.blah:1337' npm run serve` - same as above, but
  point the site at the specified API url. By default, this will be the
  heroku app at http://india-lights.herokuapp.com.

## Important Libraries

 - [React][1] for view rendering
 - [React Router][2] for routing
 - [Reflux][3] for event and state management
 - [Mapbox GL JS][4] for map rendering
 - [d3][5] for data processing and chart building

[1]: https://facebook.github.io/react/
[2]: https://github.com/rackt/react-router
[3]: https://github.com/spoike/refluxjs
[4]: https://github.com/mapbox/mapbox-gl-js
[5]: http://d3js.org/


## File Structure

```
app/scripts/
|
+- main.js: entry point -- boot up the app.
+- actions.js: the user actions available to the app's components
+- store.js: the data store, responsible for hitting the api and providing
|    the result to the rest of the application
+- config.js: app configuration object
|
+- component/: individual view (React) components.
+- lib/: generic app helpers
```

## Naming Things Is Hard

We use `region` as a generic term to refer to the nation, states, districts, and
even villages.

