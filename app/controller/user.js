'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /*
  async index() {
    const { ctx } = this;
    ctx.logger.info("1234");
    ctx.body = 'hi, egg';
  }
   */

  async login() {
    const { ctx } = this;

    ctx.logger.info("UserController login.");

    ctx.setSuccessResBody("OK");
  }
}

module.exports = UserController;
