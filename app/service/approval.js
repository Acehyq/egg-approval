'use strict';


const Service = require('egg').Service;
const Common = require('../common');


class ApprovalService extends Service {

  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.extLogger = ctx.extLogger;
    this.model = ctx.model;
  }

  async create(doc, userInfo) {
    this.extLogger.info(`Approval create doc: ${JSON.stringify(doc)}, by: ${JSON.stringify(userInfo)}`);

    const { title, type, content, money, useOfMoney } = doc;
    const { id, name, code } = userInfo;

    const now = new Date();

    const approverInfo = null;

    const approvalDoc = {
      title,
      type,
      content,
      money,
      useOfMoney,
      userInfo,
      approver: approverInfo,
      comment: null,
      status: 0,
      created_time: now,
      updated_time: now
    }

    const res = await this.model.Approval.create(approvalDoc);

    return res;
  }
}


module.exports = ApprovalService;
