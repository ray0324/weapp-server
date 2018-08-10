const Koa = require('koa');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const mongoose = require('mongoose');
const koaStatic = require('koa-static');
const errorHandle = require('./middlewares/errorhandle');
const routers = require('./routes');
const conf = require('./conf');

// 路由
const { users } = routers;

// link db
mongoose.connect(conf.MONGODB_HOST, { useNewUrlParser: true });

const app = new Koa();
// middlewares
app.use(cors());
app.use(errorHandle);
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }));
app.use(json());
app.use(koaStatic(__dirname + '/public'));
app.use(users.routes(), users.allowedMethods());

module.exports = app;
