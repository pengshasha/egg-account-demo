module.exports = {
  properties: {
    userName: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    vcode: {
      type: 'string',
    },
  },
  required:['userName','password','vcode'],
  $async: true,
  additionalroperties: false,
  errorMessage: {
    properties:{
      userName: '用户名类型错误'
    },
    required: '用户名、密码、验证码不能为空'
  }
}