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
    this.extLogger.info(`ApprovalController create`);

    const res = await this.service.approval.create(this.reqBody);
    this.ctx.setSuccessResBody(res);
  }

  async getApplyList() {
    this.extLogger.info(`ApprovalController.getApplyList`);

    let { page, size } = this.ctx.request.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 1;
    }

    const userId = this.ctx.user.id;
    const applyList = await this.service.approval.getApplyList(userId, page, size);

    this.ctx.setSuccessResBody(applyList);
  }

  async getApproveList() {
    this.extLogger.info(`ApprovalController.getApproveList`);
    let { page, size } = this.ctx.request.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 1;
    }

    const userId = this.ctx.user.id;
    const approveList = await this.service.approval.getApprovalList(userId, page, size);

    this.ctx.setSuccessResBody(approveList);
  }

  async getApprovalDetail(id) {
    this.extLogger.info(`ApprovalController.getApproval, id: ${id}`);

    const approval = await this.service.approval.detail(id);

    this.ctx.setSuccessResBody(approval);
  }
}

module.exports = ApprovalController;
