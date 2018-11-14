'use strict';
const ObjectId = require('mongoose').Types.ObjectId;
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async Login() {
    const { ctx } = this;
    const { service } = ctx;
    const { body } = ctx.request;
    const { auth } = this.app.config;
    try{
      await ctx.validate('schema.login',body);
      const result = await service.index.login(body);
      ctx.assert(result, 404)
      const objectId = ObjectId()
      console.log(result)
      if (result && JSON.stringify(result) !== "[]") {
        if(body.password && body.password === result[0].passWord) {
          await service.index.verifyCaptcha(body.vcode)
          const token = {
            name: result.usename,
            tel: result.telepone,
            nickname: result.nickname
          }
          this.app.redis.set(`access-token-${objectId}`,JSON.stringify(token),'EX',auth.tokenExpireTime/1000)
          ctx.cookies.set('access-token',objectId,{
            tokenExpireTime: auth['tokenExpireTime'],
            overwrite: true,
            httpOnly: false
          })
          ctx.body = {
            code: 200,
            data: result[0],
            token: objectId
          };
        } else {
          ctx.body = {
            code: 500,
            data: [],
            error:{
              message: '密码错误，请检查'
            }
          };
        }
       
      } else {
        ctx.body = {
          code: 500,
          data: [],
          error:{
            message: '用户名不存在，请检查'
          }
        };
      }
    }catch(err){
      console.log('err----------')
      console.log(err)
      ctx.body = {
        code: 500,
        data: [],
        error:{
          message: err || '服务器异常'
        }
      };
    }

  }
  async Logout() {
    const { ctx } = this;
    const objectId = ctx.cookies.get('access-token')
    ctx.cookies.set('access-token', null)
    this.app.redis.del(`access-token-${objectId}`)
    ctx.body = {
      code: 200,
      data: [],
      message: '登出成功'
    }
  }
  async CreateCaptcha() {
    const {ctx} = this;
    const {service} = ctx;
    const captchaData =await service.index.captcha();
    ctx.type = 'image/bmp'
    ctx.body = captchaData.getFileData()
  }
}
module.exports = HomeController;
