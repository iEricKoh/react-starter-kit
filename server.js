const Koa              = require('koa')
const path             = require('path')
const bodyParser       = require('koa-bodyparser')
const send             = require('koa-send')
const serve            = require('koa-static')
const staticCache      = require('koa-static-cache')
const logger           = require('koa-logger')
const router           = require('./server/routes')
const { pageNotFound, errorHandling } = require('./server/middlewares')

// Constants
const PORT = process.env.EXPOSE_PORT || 8080
const HOSTNAME = process.env.HOSTNAME || 'localhost'

// Env
const PROD = process.env.NODE_ENV === 'production'

const app = new Koa()

app.use(logger())
app.use(bodyParser())
app.use(errorHandling)

// Production
if (PROD) {
  // Serve static assets
  app.use(staticCache(path.join(__dirname, 'assets'), {
    prefix: "/assets/"
  })) 

  // Serve dist folder
  app.use(serve(path.join(__dirname, 'dist')))

  // History fall back
  app.use(async function (ctx, next) {
    return send(ctx, '/index.html', { 
      root: path.join(__dirname, 'dist')
    })
    .then(() => next()) 
  }) 
} else {
// Development
  const webpack          = require('webpack')
  const WebpackDevServer = require("webpack-dev-server")
  const config           = require('./webpack.config')()
  const compiler         = webpack(config)

  const middleware       = require('koa-webpack')
  
  app.use(middleware({
    compiler: compiler,
    dev: {
      publicPath: '/',
      stats: 'errors-only',
      historyApiFallback: true
    }
  }))
}

app.use(router.routes(), router.allowedMethods())
app.use(pageNotFound)

// Koa server
app.listen(PORT, () => {
  console.log('==> 🌎  Server is up at http://%s:%s ===', HOSTNAME, PORT)
})

module.exports = app
