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
    const ts = new Date().getTime();

    const approverUserId = await this.service.relation.getApprover(this.ctx.user.id);
    const approverUser = await this.model.User.findOne({
      _id: approverUserId
    });
    const approverInfo = {
      id: approverUserId,
      name: approverUser.name,
      code: approverUser.code
    };

    const approvalDoc = {};
    approvalDoc.code = "HYQ" + ts;
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


  async getApplyList(userId, page, size) {
    this.extLogger.info(`ApprovalService.getApplyList, userId: ${userId}, page: ${page}, size: ${size}`);

    const list = await this.model.Approval.find({
      "applicant.id": userId
    }).skip((page - 1) * size).limit(size);

    return list;
  }


  /**
   * 获取userId为approver的审批流
   * @param userId 用户
   * @param page
   * @param size
   * @return {Promise<void>}
   */
  async getApprovalList(userId, page, size) {
    this.extLogger.info(`ApprovalService.getApprovalList, userId: ${userId}, page: ${page}, size: ${size}`);

    const approvalList = await this.model.Approval.find({
      "approver.id": userId
    }).skip((page - 1) * size).limit(size);

    return approvalList;
  }


  async detail(approvalId) {
    this.extLogger.info(`ApprovalService.detail, approvalId: ${approvalId}`);

    const approval = await this.model.Approval.findOne({
      _id: approvalId
    });

    return approval;
  }
}


module.exports = ApprovalService;
