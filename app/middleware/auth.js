'use strict'


module.exports = config => {
  return async function auth(ctx, next) {
    ctx.extLogger.info('authorization');

    const curAuthorization = ctx.request.headers.authorization;

    const user = await ctx.model.User.findOne({ token: curAuthorization });

    const userInfo = {
      id: user._id,
      name: user.name,
      code: user.code,
    };

    ctx.user = userInfo;

    await next();
  }
}
