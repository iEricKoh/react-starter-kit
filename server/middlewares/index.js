const Boom = require('boom')

export const pageNotFound = async (ctx, next) => {
  await next()
  ctx.body = Boom.notFound('Page Not Found').output
}

export const errorHandling = async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    ctx.status = ctx.status || 503
    ctx.body = Boom.serverUnavailable('unavailable').output
  }
}
