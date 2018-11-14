const { VError } = require('verror')
module.exports = () =>{
  return async function (ctx, next){
    const { FAILE } = ctx.app.errors
    try{
      await next();
    }catch(err){
      const errId = Date.now()
      if(VError.hasCauseWithName(err, FAILE)){
        const e = VError.findCauseByName(err, FAILE)
        ctx.body = {
          errors: {
            message: e.message,
            errorId: errId
          }
        }
        ctx.statue = 403
      } else {
        ctx.body = {
          errors: {
            message: err.message || '服务器错误',
            errorId: errorId
          }
        }
        ctx.status = err.status || 500
      }
    }
  }
}