'use strict';
import config from './config';

console.log.apply(console, config.consoleMessage);
console.log('Environment', config.environment);
