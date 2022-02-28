'use strict';


const Controller = require('egg').Controller;


class MoneyController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.reqBody = ctx.request.body;
    this.extLogger = ctx.extLogger;
  }

  async sum() {
    const res = await this.service.money.sum();
    this.ctx.setSuccessResBody(res);
  }

  async create() {
    this.extLogger.info(`MoneyController create`);
    const res = await this.service.money.create(this.reqBody);
    this.ctx.setSuccessResBody(res);
  }
}


module.exports = MoneyController;


/*
'use strict';

const Controller = require('egg').Controller;

class MoneyController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.reqBody = ctx.request.body;
    this.extLogger = ctx.extLogger;
  }


  async create() {
    this.extLogger.info(`MoneyController create`);
    const res = await this.service.money.create(this.reqBody);
    this.ctx.setSuccessResBody(res);
  }
}

module.exports = MoneyController;
*/
