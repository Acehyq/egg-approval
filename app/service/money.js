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


}
