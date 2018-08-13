const jwt = require('jwt-simple');
const logger = require('../services/logger');
const conf = require('../conf');
const Session = require('../models/session');

// token生成
function tokenForSession(session) {
  const token = jwt.encode({
    sub: session.id,
    iat: Date.now(),
    exp: Date.now() + 5*60*1000
  }, conf.APP_KEY);
  logger.debug('token: %s', token);
  return token;
}

// 登录
async function login(ctx, next) {
  const { openid, session_key } = ctx.state.$session;
  const { rawData } = ctx.request.body;

  let session = await Session.findOne({ openid });

  if (session) { // 已有session  更新操作
    logger.debug('Exist openid: %s', openid);
    await Session.findByIdAndUpdate(session.id, {
      session_key,
      last_visit_time: Date.now()
    });
  } else { // 新的session  创建一条记录
    logger.debug('New openid: %s', openid);
    session = new Session({
      openid,
      session_key,
      user_info: JSON.parse(rawData)
    });
    await session.save();
  }

  // 返回token
  ctx.body = {
    status: 0,
    message: '登录成功',
    token: tokenForSession(session)
  };
};

function test(ctx, next) {
  ctx.body= ctx.state.user;
}

module.exports = {
  login,
  test
};

