const Koa = require('koa');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const koaStatic = require('koa-static');

// 路由
const routers = require('./routes');
const { users, records } = routers;

dotenv.config();

// link db
mongoose.connect(process.env.MONGODB_HOST, { useNewUrlParser: true });

const app = new Koa();

app.use(cors());

// error handler
onerror(app);

// middlewares
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }));
app.use(json());

app.use(koaStatic(__dirname + '/public'));

// app.use(views(__dirname + '/views', { extension: 'pug' }));

app.use(records.routes(), records.allowedMethods());
app.use(users.routes(), users.allowedMethods());

module.exports = app;
