const jwt = require('jwt-simple');
const User = require('../models/user');
const logger = require('../services/logger');
const conf = require('../conf');

function tokenForUser(user) {
  const token = jwt.encode({ sub: user.id, iat: Date.now() }, conf.APP_SECRET);
  logger.debug('token: %s', token);
  return token;
}

// 注册
async function register(ctx, next) {
  const { username, email, password } = ctx.request.body;
  logger.info(`From Request ( name:${username} | email:${email} | password: **** )`);
  // 查询是否存在当前用户名
  const member = await User.findOne({ email });
  // 用户名已经占用
  if (member) {
    logger.warn(`Existing ( email:${member.email} )`);
    return ctx.body = { status: -10000, message: '该邮箱已经被注册！' };
  }
  const user = new User({ username, email, password });
  await user.save();
  ctx.body = {
    status: 0,
    message: '注册成功',
    token: tokenForUser(user)
  };
};

// 登录
function login(ctx, next) {
  ctx.body = {
    status: 0,
    message: '登录成功',
    token: tokenForUser(ctx.state.user)
  };
};

module.exports = {
  register,
  login
};

