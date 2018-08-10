const Router = require('koa-router');

const auth = require('../controllers/auth');
const passport = require('../services/passport');

const users = new Router();

users.prefix('/user');
users.post('/login', passport.local, auth.login);
users.post('/register', auth.register);

module.exports = {
  users
};
