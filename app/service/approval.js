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

  async create(doc) {
    this.extLogger.info(`Approval create doc: ${JSON.stringify(doc)}`);

    const { title, type, content, money, useOfMoney } = doc;

    const now = new Date();

    const approverInfo = null;

    const approvalDoc = {};
    approvalDoc.title = title;
    approvalDoc.type = type;
    approvalDoc.content = content;
    approvalDoc.money = money;
    approvalDoc.useOfMoney = useOfMoney;
    approvalDoc.applicant = this.ctx.user;
    approvalDoc.approver = approverInfo;
    approvalDoc.comment = null;
    approvalDoc.status = 0;
    approvalDoc.created_time = now;
    approvalDoc.updated_time = now;

    const res = await this.model.Approval.create(approvalDoc);

    return res;
  }
}


module.exports = ApprovalService;
