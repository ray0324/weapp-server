require('dotenv').config();

module.exports = {
  APP_SECRET: process.env.APP_SECRET,
  MONGODB_HOST: process.env.MONGODB_HOST,
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL
};
