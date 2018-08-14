const { decode } = require('jwt-simple');
const axios = require('axios');
const conf = require('../conf');
const logger = require('../services/logger');

// 微信登陆认证
async function wx(ctx, next) {
  const { code } = ctx.request.body;
  logger.debug(`code:${code}`);
  // 请求session
  const res = await axios({
    url: conf.WX_AUTH_URL,
    method: 'GET',
    params: {
      appid: conf.APP_ID,
      secret: conf.APP_SECRET,
      js_code: code,
      grant_type: 'authorization_code'
    }
  });

  if (res.data.errcode || !res.data.openid || !res.data.session_key) {
    logger.error(res.data.errmsg);
    throw new Error(JSON.stringify(res.data));
  }

  logger.debug(`openid: ${res.data.openid}, session_key: ${res.data.session_key}`);

  ctx.state = {
    $session: res.data
  };

  await next();
};

// jwt登陆认证
async function jwt(ctx, next) {
  // 从 获取请求中的token
  const token = ctx.request.query.token || ctx.request.body.token;
  logger.debug(`token: ${token}`);
  // 验证token 这里可以做时长验证
  const user = decode(token, conf.APP_KEY);
  ctx.state = { user };
  await next();
}

module.exports = {
  jwt,
  wx
};
