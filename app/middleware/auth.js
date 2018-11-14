const ObjectId = require ('mongoose').Types.ObjectId

module.exports=() => async function(ctx, next){
  const accessToke = ctx.request.headers['access-token'] || ctx.cookies.get('access-token');
  console.log(accessToke)
  if(!accessToke) {
    await next()
    return
  }
  try {
    const token = await ctx.app.redis.get(`access-token-${accessToke}`)
    ctx.assert(token,'token失效或过期')
    ctx.auth = JSON.parse(token)
  } catch(err){
    console.log(err)
    ctx.cookies.set('access-token', null)
    ctx.status = 403
    ctx.body = err.msg || 'access-token已过期或解析错误,请重新登录'
    return
  }

  await next()
}