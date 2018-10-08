'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'yundun-fe-web';
  }
}

module.exports = HomeController;
