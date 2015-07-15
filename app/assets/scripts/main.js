'use strict';

var config = require('./config');

console.log.apply(console, config.consoleMessage);
if (config.environment === 'staging') {
  console.log('STAGING');
}
