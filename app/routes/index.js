const Router = require('koa-router');
const auth = require('../middlewares/auth');
const session = require('../controllers/auth');

const users = new Router();

users.prefix('/user');
users.post('/login', auth.wx, session.login);
users.get('/test', auth.jwt, session.test);

module.exports = {
  users
};
