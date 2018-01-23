(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var winston = require('winston');

const type = process.env.PROCESS_TYPE;
const logger = winston.createLogger({ level: 'info', transports: [new winston.transports.Console()] });

logger.info('Starting in ${type} mode');
console.log('asdfasdfeqwer');
require('./web');

})));
//# sourceMappingURL=bundle.js.map
