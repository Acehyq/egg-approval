'use strict';

async function errorHandler(ctx, next) {

  try {
    await next();
    ctx.extLogger.info(`req body: ${JSON.stringify(ctx.request.body)} succeed`);
  } catch (err) {
    ctx.extLogger.error(`req body: ${JSON.stringify(ctx.request.body)} error`);
    ctx.setErrResBody(err);
  }
}


module.exports = () => {
  return errorHandler;
};
