'use strict';


const Controller = require('egg').Controller;


class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.reqBody = ctx.request.body;
    this.extLogger = ctx.extLogger;
  }

  async login() {
    const { ctx } = this;

    ctx.extLogger.info("UserController login.");

    const token = await this.service.user.login(this.reqBody);

    ctx.setSuccessResBody(token);
  }

  async register() {
    const { ctx } = this;

    ctx.logger.info("UserController register.");

    const res = await this.service.user.register(this.reqBody);

    ctx.setSuccessResBody();
  }

  async pos() {
    const { ctx } = this;

    const res = await this.service.user.pos(ctx.user);

    ctx.setSuccessResBody(res);
  }
}

module.exports = UserController;
