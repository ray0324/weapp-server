const Router = require('koa-router');
const auth = require('../middlewares/auth');
const user = require('../controllers/user');
const proxy = require('../controllers/proxy');
const userRouter = new Router();
const proxyRouter = new Router();

userRouter.prefix('/user');
userRouter.post('/login', auth.wx, user.login);
userRouter.post('/update', auth.jwt, user.updateInfo);

proxyRouter.post('/reqxml', proxy);

module.exports = {
  userRouter,
  proxyRouter
};
