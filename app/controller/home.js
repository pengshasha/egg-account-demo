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
  async wordFilter() {
    const { ctx } = this;
    const mock = {
      用户名: '把邓小平罢工门',
      密码: '把邓小平',
      验证码: 'aaa',
    };
    const tabooWordService = ctx.grpc.com.chinamobile.iot.microservice.grpc.tabooWordService;
    const result = await tabooWordService.findFirstTabooWords({ txt: JSON.stringify(mock), label: 'default' });
    console.log(result.message);
    ctx.body = result;
  }
  async replaceTabooWord() {
    const { ctx } = this;
    const mock = {
      用户名: '把邓小平罢工门',
      密码: '把邓小平',
      验证码: 'aaa',
    };
    const tabooWordService = ctx.grpc.com.chinamobile.iot.microservice.grpc.tabooWordService;
    const result = await tabooWordService.replaceTabooWord({ txt: JSON.stringify(mock), label: 'default' });
    ctx.body = result;
  }
}

module.exports = HomeController;
