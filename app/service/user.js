'use strict';


const Service = require('egg').Service;


class UserService extends Service {

  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.extLogger = ctx.extLogger;
    this.model = ctx.model;
  }

  async register(param) {
    this.extLogger.info(`UserService.register, param: ${JSON.stringify(param)}`);

    const { name, department, code, position, password } = param;

    const existedUser = await this.model.User.findOne({ code });
    if (existedUser) {
      this.logger.warning('用户创建重复');
    }

    const encryptedPassword = password + "_pwd";
    const token = code.toString() + "_token";

    const now = Date.now();

    let res = await this.model.User.create({
      name,
      department,
      code,
      position,
      password: encryptedPassword,
      token,
      created_time: now,
      updated_time: now,
    });

    return res;
  }

  async login(param) {
    this.extLogger.info("UserService.login");

    const { code, password } = param;

    const token = code + "_token"

    const user = await this.model.User.findOne({ code });
    if (user.password !== password + "_pwd") {
      throw new Error("password wrong");
    }

    user.token = token;
    await user.save();

    return token;
  }

  async pos(userInfo) {
    return userInfo.position;
  }
}


module.exports = UserService;
