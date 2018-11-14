module.exports = () => async function (ctx, next) {
  ctx.logger.info('\n requestBody: %j',ctx.request.body)

  await next()
  // ctx.logger.info('\n responseBody: %j', ctx.body)
}