const { resolve }       = require('path')
const webpack           = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path              = require('path')
const autoprefixer      = require('autoprefixer')
const precss            = require('precss')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const PATHS = {
  app   : path.join(__dirname, 'src'),
  style : [
    path.join(__dirname, 'assets', 'styles', 'styles.css')
  ],
  build : path.join(__dirname, 'dist'),
  hotEntry: ['react-hot-loader/patch', 'webpack-hot-middleware/client']
}

module.exports = options => {

  const PROD = !!(options && options.production)

  return {
    context: resolve(__dirname, 'src'),

    performance: {
      hints: PROD ? "warning" : false
    },

    entry: {
      // App entry
      app: [].concat(PROD ? PATHS.app : [...PATHS.hotEntry, PATHS.app]),

      // Loading dependencies to a vendor Bundle Automatically
      vendor: ['react', 'react-dom', 'axios'],

      // Polyfills
      polyfills: ['babel-polyfill'],

      // Style entry 
      style: PATHS.style
    },

    output: {
      path       : PATHS.build,
      publicPath : '/',
      filename   : '[name].js'
    },

    devtool: PROD ? "source-map" : "eval-source-map",

    resolve: {
      modules    : [PATHS.app, "node_modules"],
      extensions : ['.js', '.jsx']
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test : /\.jsx?$/,
          use  : [{
            loader: 'eslint-loader',
          }],
          include: PATHS.app
        },
        {
          test : /\.jsx?$/,
          use  : [{
            loader: 'babel-loader',
            query: {
              cacheDirectory: !PROD
            }
          }],
          include: PATHS.app
        }
      ].concat(PROD ? [...extractStyle()] : [...inlineStyle()])
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          context: __dirname,
          postcss: () => [autoprefixer, precss]
        },
        debug    : !PROD,
        minimize : PROD
      }),

      new HtmlWebpackPlugin({ template: 'index.html' }),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'style', 'polyfills'],
        minChunks: Infinity
      })

    ].concat(PROD ? 
      // Production
      [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          output: {
            comments: false
          },
          minimize: true,
          sourceMap: true
        }),
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify('production') 
           }
        }),
        new ExtractTextPlugin({
          disable   : false,
          allChunks : true,
          filename  : '[name].[chunkhash].css'
        })
      ] 
      : 
      // Development
      [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
        //new BrowserSyncPlugin(
        //  {
        //    host: 'localhost',
        //    port: 4000,
        //    proxy: 'http://localhost:8080/'
        //  },
        //  {
        //    reload: false
        //  }
        //),
      ]
    )
  }
}

const extractStyle = () => {
  // Component style with css modules
  return [{
    test: /\.css$/, 
    loader: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: ["css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]", "postcss-loader?parser=postcss-scss"]
    }),
    include: [PATHS.app]
  }, {
    // Global style without css modules
    test: /\.css$/, 
    loader: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: ["css-loader", "postcss-loader?parser=postcss-scss"]
    }),
    include: [PATHS.style]
  }]
}

const inlineStyle = () => {
  return [{
    // Component style with css modules
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader : 'css-loader',
        query  : { 
          modules: true,
          importLoaders: 1,
          localIdentName: '[folder]___[local]___[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader',
        query: { parser: 'postcss-scss' }
      }
    ],
    include: [PATHS.app]
  }, {
    // Global style without css modules
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader : 'css-loader',
      },
      {
        loader: 'postcss-loader',
        query: { parser: 'postcss-scss' }
      }
    ],
    include: [PATHS.style]
  }]
}
