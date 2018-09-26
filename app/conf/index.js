require('dotenv').config();

module.exports = {
  APP_KEY: process.env.APP_KEY, // 签发Token用的AppKey
  APP_ID: process.env.APP_ID, // 小程序ID
  APP_SECRET: process.env.APP_SECRET, // 小程序密钥
  MONGODB_HOST: process.env.MONGODB_HOST, // mongodb连接
  PORT: process.env.PORT, // 启动端口
  LOG_LEVEL: process.env.LOG_LEVEL, // 日志级别
  API_PROXY: process.env.API_PROXY, // 接口地址
  WX_AUTH_URL: 'https://api.weixin.qq.com/sns/jscode2session' // 小程序登陆接口
};
