const logger = require('../services/logger');
module.exports = async function(ctx, next) {
  try {
    await next();
  } catch (e) {
    logger.error(`SERVER ERROR: ${e.message}`);
    // 设置状态码为 200 - 服务端错误
    ctx.status = 200;
    // 输出详细的错误信息
    ctx.body = {
      code: -1,
      err_msg: e.message
    };
  }
};
