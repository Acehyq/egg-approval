'use strict';


const Service = require('egg').Service;
const { Constant } = require('../common');
const {MyError} = require("../common/constant/err");
const { ApprovalActionEnum } = Constant.Enum;


class ApprovalService extends Service {

  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.extLogger = ctx.extLogger;
    this.model = ctx.model;
  }

  /**
   * 创建审批流申请文档
   * @param doc 文档数据内容
   * @return {Promise<*>}
   */
  async create(doc) {
    this.extLogger.info(`Approval create doc: ${JSON.stringify(doc)}`);

    const { title, type, content, money, useOfMoney } = doc;

    const now = new Date();
    const ts = new Date().getTime();

    // 获取审批人信息
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
    approvalDoc.code = "HYQ" + ts;        // "HYQ" + 时间戳
    approvalDoc.title = title;            // 标题
    approvalDoc.type = type;              // 类型
    approvalDoc.content = content;        // 内容
    approvalDoc.money = money;
    approvalDoc.useOfMoney = useOfMoney;
    approvalDoc.applicant = this.ctx.user;
    approvalDoc.approver = approverInfo;
    approvalDoc.comment = null;
    approvalDoc.status = ApprovalActionEnum.CREATE;
    approvalDoc.created_time = now;
    approvalDoc.updated_time = now;

    // 创建审批流
    const res = await this.model.Approval.create(approvalDoc);

    await this.model.ApprovalLog.create({
      code: approvalDoc.code,
      title: approvalDoc.title,
      type: approvalDoc.type,
      action: ApprovalActionEnum.CREATE   // 创建
    });

    return res;
  }


  /**
   * 获取用户的的申请列表
   * @param userId 用户id
   * @param page 页数
   * @param size 该页最多条目数
   * @return {Promise<*>} 列表
   */
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


  /**
   * 审批流详情
   * @param approvalId
   * @return {Promise<*>}
   */
  async detail(approvalId) {
    this.extLogger.info(`ApprovalService.detail, approvalId: ${approvalId}`);

    const approval = await this.model.Approval.findOne({
      _id: approvalId
    });

    return approval;
  }


  async approve(approvalId, action, comment) {
    this.extLogger.info(`ApprovalService.approve, approvalId: ${approvalId},\
     action: ${action}, comment: ${comment}`);

    const approval = await this.model.Approval.findOne({ _id: approvalId });
    if (approval.status !== ApprovalActionEnum.CREATE &&
      action !== ApprovalActionEnum.CREATE
    ) {
      throw new MyError("status wrong");
    }

    // 更新审批流状态
    const res = await this.model.Approval.findOneAndUpdate(
      { _id: approvalId },
      { $set: { status: action, comment: comment } }
    );

    const money = await this.service.money.detail();
    const approvalMoney = approval.money;
    const newSum = money.sum - approvalMoney;

    // 更新总金额
    await this.model.Money.findOneAndUpdate(
      {},
      { $set: { sum: newSum } }
    );

    // 创建审批流操作日志
    await this.model.ApprovalLog.create({
      code: approval.code,
      title: approval.title,
      type: approval.type,
      action: action
    });

    // 创建资金使用日志
    await this.service.moneyLog.create(approval.code, approvalMoney);
  }
}


module.exports = ApprovalService;
