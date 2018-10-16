'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async grpc() {
    const { ctx } = this;
    const helloService = ctx.grpc.demo.helloService;
    const result = await helloService.sayHello({ code: '200', message: '来自Node服务端的OK' });
    console.log(result.message);
    ctx.body = result;
  }
}

module.exports = HomeController;
