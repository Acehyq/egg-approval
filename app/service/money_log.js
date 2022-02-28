'use strict';


const Service = require('egg').Service;
const Common = require('../common');


class MoneyLogService extends Service {

  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.extLogger = ctx.extLogger;
    this.model = ctx.model;
  }

  async create(approvalCode, money) {
    const moneyLogDoc = {};
    moneyLogDoc.approval_code = approvalCode;
    moneyLogDoc.money = money;
    const moneyLog = await this.model.MoneyLog.create(moneyLogDoc);

    return moneyLog;
  }

  async list(page, size) {
    const list = await this.model.MoneyLog.find(
      {}
    ).skip((page - 1) * size).limit(size);

    return list;
  }
}

module.exports = MoneyLogService;
