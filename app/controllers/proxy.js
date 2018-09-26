const logger = require('../services/logger');
const conf = require('../conf');
const axios = require('axios');
const qs = require('querystring');
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

module.exports = async function(ctx, next) {
  const params = qs.stringify(ctx.request.body);
  logger.info(params);
  const result = await axios.post(conf.API_PROXY, new URLSearchParams(params));
  ctx.body = result.data;
};
