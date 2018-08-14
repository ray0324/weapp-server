const Router = require('koa-router');
const auth = require('../middlewares/auth');
const user = require('../controllers/user');

const userRouter = new Router();

userRouter.prefix('/user');
userRouter.post('/login', auth.wx, user.login);
userRouter.post('/update', auth.jwt, user.updateInfo);

module.exports = {
  userRouter
};
