'use strict';


const Controller = require('egg').Controller;


class ApprovalController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.reqBody = ctx.request.body;
    this.extLogger = ctx.extLogger;
  }

  async create() {
    // this.extLogger.info(`ApprovalController create`);

    // const res = await this.service.approval.create(this.reqBody);
    // return res;
    return 123;
  }
}

module.exports = ApprovalController;
