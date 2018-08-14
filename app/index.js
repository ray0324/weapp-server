const Koa = require('koa');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const mongoose = require('mongoose');
const koaStatic = require('koa-static');
const onerror = require('./middlewares/onerror');
const routers = require('./routes');
const conf = require('./conf');

const { userRouter } = routers;


mongoose.connect(conf.MONGODB_HOST, { useNewUrlParser: true });

const app = new Koa();
// middlewares
app.use(cors());
app.use(onerror);
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }));
app.use(json());
app.use(koaStatic(__dirname + '/public'));
app.use(userRouter.routes(), userRouter.allowedMethods());

module.exports = app;
