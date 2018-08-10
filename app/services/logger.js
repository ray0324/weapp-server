const log4js = require('log4js');
const conf = require('../conf');
log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'dateFile', filename: './log/app.log' }
  },
  categories: {
    default: { appenders: ['out'], level: conf.LOG_LEVEL }
  }
});

const logger = log4js.getLogger();
module.exports = logger;
