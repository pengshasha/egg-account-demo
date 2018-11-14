const { VError } = require('verror')

module.exports = {
  //定义常见错误类型
  get errors() {
    const errors = {
      FAILE: 'FAILE'
    }
    const handler = {
      get: function(target, name){
        if(name in target) {
          return target[name]
        } else {
          throw new VError({
            name: 'FAILE',
            message: `使用了未定义的错误类型 ${name}`
          })
        }
      }
    }
    return new Proxy(errors, handler)

  }
}