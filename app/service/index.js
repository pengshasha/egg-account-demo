const { Service } = require('egg');
const svgCaptcha = require('svg-captcha');
const BMP24 = require('gd-bmp').BMP24;

class IndexService extends Service {
  async login(loginInfo) {
    // const res = await this.ctx.model.test
    const ctx = this.ctx;
    // const result = await ctx.model.index
    //   .insertMany(loginInfo);
    return ctx.model.UserTable1.find({userName: loginInfo['userName']});
    // return result;
  }
  svgCaptcha(){
    const config = {
      width: 80,
      height: 40,
      fontSize: 28,
      color: true,
      noise: 1
      
    }
    const captcha = svgCaptcha.create(config);
    console.log('===========')
    console.log(captcha)
    return captcha;
  }
  async captcha() {
//仿PHP的rand函数
    function rand(min, max) {
      return Math.random()*(max-min+1) + min | 0; //特殊的技巧，|0可以强制转换为整数
    }
    //封装函数（随机颜色）

  function randomColor(){
    var r=parseInt(Math.random()*256);
    var g=parseInt(Math.random()*256);
    var b=parseInt(Math.random()*256);
    var rgb="rgb("+r+","+g+","+b+")";
    return rgb;
    }
    //制造验证码图片
    var img = new BMP24(80, 40);
    img.drawCircle(rand(0, 80), rand(0, 40), rand(10 , 40), randomColor(0, 0xffffff));
    //边框
    img.drawRect(0, 0, img.w-1, img.h-1, randomColor(0x000000, 0xffffff));
    img.fillRect(rand(0, 80), rand(0, 40), rand(10, 35), rand(10, 35), randomColor(0x000000, 0xffffff));
    img.drawLine(rand(0, 80), rand(0, 40), rand(0, 80), rand(0, 40), randomColor(0x000000, 0xffffff));
    //return img;
  
    //画曲线
    var w=img.w/2;
    var h=img.h;
    var color = rand(0, 0xffffff);
    var y1=rand(-5,5); //Y轴位置调整
    var w2=rand(10,15); //数值越小频率越高
    var h3=rand(4,6); //数值越小幅度越大
    var bl = rand(1,5);
    for(var i=-w; i<w; i+=0.1) {
      var y = Math.floor(h/h3*Math.sin(i/w2)+h/2+y1);
      var x = Math.floor(i+w);
      for(var j=0; j<bl; j++){
        img.drawPoint(x, y+j, color);
      }
    }
  
    var p = "ABCDEFGHKMNPQRSTUVWXYZ3456789";
    var str = '';
    for(var i=0; i<4; i++){
    str += p.charAt(Math.random() * p.length |0);
    }
    await this.app.redis.set('captcha',str,'EX', 10000)
    var fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
    var x = 15, y=8;
    for(var i=0; i<str.length; i++){
    var f = fonts[Math.random() * fonts.length |0];
    y = 8 + rand(-10, 10);
    img.drawChar(str[i], x, y, f, rand(0, 0xffffff));
    x += f.w + rand(2, 8);
    }
    return img;
  }
  async verifyCaptcha(str) {
    const {ctx} = this;
    const captcha = await ctx.app.redis.get('captcha');
    console.log(captcha);
    ctx.assert(captcha, '验证码已过期，请重新输入')
    await ctx.app.redis.del('captcha')
    ctx.assert(str.toLowerCase() === captcha.toLowerCase(), '验证码错误，请重新输入')
  }
}

module.exports = IndexService;
