'use strict';


const Service = require('egg').Service;
const Common = require('../common');


class RelationService extends Service {

  constructor(ctx) {
    super(ctx);
    this.service = ctx.service;
    this.extLogger = ctx.extLogger;
    this.model = ctx.model;
  }

  // todo: write into db
  async getApprover(applicantId) {
    return "62179f3bee38e8121329a0d9";
  }
}

module.exports = RelationService;
