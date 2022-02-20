'use strict'

module.exports = config => {

  return async function authorization(ctx, next) {
    ctx.extLogger.info('authorization');

    const curAuthorization = ctx.request.headers.authorization;

    const user = await ctx.model.User.findOne({ token: curAuthorization });
    ctx.user = user;

    await next();
  }
}
