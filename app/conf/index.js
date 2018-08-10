require('dotenv').config();

module.exports = {
  APP_KEY: process.env.APP_KEY,
  APP_ID: process.env.APP_ID,
  APP_SECRET: process.env.APP_SECRET,
  MONGODB_HOST: process.env.MONGODB_HOST,
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  WX_AUTH_URL: 'https://api.weixin.qq.com/sns/jscode2session'
};
