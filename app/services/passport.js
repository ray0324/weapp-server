const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

const User = require('../models/user');

// 用户名&密码登录策略
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // 查询用户
    const user = await User.findOne({ email });
    if (!user) throw new Error('用户不存在!');
    // 比较密码
    const isMatch = await user.compare(password);
    // 密码不匹配
    if (!isMatch) return done(null, false);
    // 登录成功
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

// jwt登录策略
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromBodyField('token'),
    ExtractJwt.fromUrlQueryParameter('token')
  ]),
  secretOrKey: process.env.APP_SECRET
}, async (payload, done) => {
  const user = await User.findById(payload.sub);
  if (user) return done(null, user);
  done(null, false);
}));

function jwt(ctx, next) {
  return passport.authenticate('jwt', async function(err, user, info, status) {
    if (err) {
      return ctx.body = { status: -10000, message: err.message };
    }
    if (!user) {
      return ctx.body = { status: -10001, message: '密码错误！' };
    }
    ctx.state = { user };
    await next();
  })(ctx);
}

function local(ctx, next) {
  return passport.authenticate('local', async (err, user, info, status) => {
    if (err) {
      return ctx.body = { status: -10000, message: err.message };
    }
    if (!user) {
      return ctx.body = { status: -10001, message: '密码错误！' };
    }
    ctx.state = { user };
    await next();
  })(ctx);
}


module.exports = {
  jwt,
  local
};
