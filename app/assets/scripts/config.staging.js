var production = require('./config.production');

/*
 * App config for staging.  Any property set here will override
 * the ones set in config.production.js
 */
var staging = {
  consoleMessage: production.consoleMessage.concat(['\nSTAGING'])
};

// export the properties
for (var key in production) {
  module.exports[key] = typeof staging[key] === 'undefined' ?
    staging[key] : production[key];
}
