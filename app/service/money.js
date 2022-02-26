'use strict';


const Service = require('egg').Service;
const Common = require('../common');


class MoneyService extends Service {

  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.extLogger = ctx.extLogger;
    this.model = ctx.model;
  }

  async create(sum) {
    const moneyDoc = { sum };
    await this.model.Money.create(moneyDoc);
  }

  async detail() {
    const money = await this.model.Money.findOne();
    return money.sum;
  }
}


module.exports = MoneyService;
