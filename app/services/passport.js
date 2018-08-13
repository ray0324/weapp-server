const axios = require('axios');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const conf = require('../conf');
const logger = require('./logger');

// const User = require('../models/user');


// 微信登陆策略
passport.use(new LocalStrategy({
  usernameField: 'code'
}, async (code, password, done) => {
  try {
    // 查询用户
    // const user = await User.findOne({ email });
    debugger;
    logger.log(`微信登陆code:${code}`);
    const result = await axios({
      url: conf.WX_AUTH_URL,
      method: 'GET',
      params: {
        appid: conf.APP_ID,
        secret: conf.APP_SECRET,
        js_code: code,
        grant_type: 'authorization_code'
      }
    }).then(res => {
      res = res.data;
      if (res.errcode || !res.openid || !res.session_key) {
        logger.debug('%s: %O', ERRORS.ERR_GET_SESSION_KEY, res.errmsg);
        throw new Error(`${ERRORS.ERR_GET_SESSION_KEY}\n${JSON.stringify(res)}`);
      } else {
        logger.debug('openid: %s, session_key: %s', res.openid, res.session_key);
        return res;
      }
    });

    logger.log(result);

    // if (!result) throw new Error('用户不存在!');
    // 比较密码
    // const isMatch = await user.compare(password);
    // 密码不匹配
    // if (!isMatch) return done(null, false);
    // 登录成功
    done(null, result);
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
  secretOrKey: conf.APP_KEY
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
