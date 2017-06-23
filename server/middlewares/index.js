const Boom = require('boom')


exports.pageNotFound = async (ctx, next) => {
  await next()

  const status = ctx.status || 404 

  if (status === 404) {
    ctx.body = Boom.notFound('Page Not Found').output
  }
}

exports.errorHandling = async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    ctx.status = ctx.status || 500
    ctx.body = Boom.badImplementation('An internal server error occurred').output
  }
}
