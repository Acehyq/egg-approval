'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.logger.info("1234");
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
