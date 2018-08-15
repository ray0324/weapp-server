const jwt = require('jwt-simple');
const logger = require('../services/logger');
const conf = require('../conf');
const User = require('../models/user');

// token生成
function tokenForUser(user) {
  const token = jwt.encode({
    sub: user.id,
    iat: Date.now(),
    exp: Date.now() + 5*60*1000
  }, conf.APP_KEY);
  logger.debug('token: %s', token);
  return token;
}

// 登录
async function login(ctx, next) {
  const { openid, session_key } = ctx.state.$session;

  let user = await User.findOne({ openid });

  if (user) { // 更新session
    logger.debug('Exist openid: %s', openid);
    await User.findByIdAndUpdate(user.id, {
      session_key,
      last_visit_time: Date.now()
    });
  } else { // 新用户
    logger.debug('New openid: %s', openid);
    user = new User({
      openid,
      session_key
    });
    await user.save();
  }

  // 返回token
  ctx.body = {
    code: 0,
    token: tokenForUser(user)
  };
};

// 更新用户个人信息
async function updateInfo(ctx, next) {
  const { sub } = ctx.state.user;
  const { info } = ctx.request.body;

  logger.debug('sub: %s', sub);

  const result = await User.findByIdAndUpdate(sub, {
    info: info,
    last_visit_time: Date.now()
  });

  ctx.body = result ? {
    code: 0,
    msg: '更新成功'
  } : {
    code: -1,
    err_msg: '更新失败'
  };
}

module.exports = {
  login,
  updateInfo
};

