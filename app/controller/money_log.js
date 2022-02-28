'use strict';


const Controller = require('egg').Controller;


class MoneyLogController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.reqBody = ctx.request.body;
    this.extLogger = ctx.extLogger;
  }

  async list() {
    const { page, size } = this.ctx.request.query;
    const list = await this.service.moneyLog.list(page, size);

    // return list;
    this.ctx.setSuccessResBody(list)
  }
}


module.exports = MoneyLogController;
