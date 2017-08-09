const path = require('path');
const webpack = require('webpack');
const createHash = require('hash-generator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

function isExternal (module) {
  const context = module.context;
  if (typeof context !== 'string') {
    return false;
  }
  return context.indexOf('node_modules') !== -1;
}

const jsHash = createHash(10);
const cssHash = createHash(10);

module.exports = {
  entry: {
    bundle: './app/assets/scripts/main'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  devServer: {
    publicPath: '/',
    contentBase: './dist',
    hot: true
  },
  module: {
    noParse: /(mapbox-gl)\.js$/,
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'react-hot-loader',
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?url=false',
            `sass-loader?includePaths[]=${path.resolve(__dirname, 'node_modules/bourbon/app/assets/stylesheets')}`
          ]
        }))
      },
      {
        /* the "graphics" and "fonts" directories are copied explicitly,
         * but are additionally siloed in their loaders so that SVGs
         * referenced in code cannot be double-counted */
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader?name=assets/graphics/[path][name].[ext]&context=app/assets/graphics',
        exclude: path.resolve(__dirname, 'app/assets/fonts')
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=assets/fonts/[path][name].[ext]&context=app/assets/fonts',
        exclude: path.resolve(__dirname, 'app/assets/graphics')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: (module) => isExternal(module)
    }),
    new ExtractTextPlugin(`assets/styles/main-${cssHash}.css`, {
      allChunks: true,
      disable: process.env.NODE_ENV !== 'production'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html',
      jsHash: jsHash,
      cssHash: cssHash,
      inject: false
    }),
    new ImageminPlugin({
      test: 'assets/graphics/**',
      gifsicle: {interlaced: true},
      jpegtran: {progressive: true},
      optipng: {optimizationLevel: 5},
      svgo: {plugins: [{cleanupIDs: false}]},
      disable: process.env.NODE_ENV !== 'production'
    }),
    new WebpackShellPlugin({
      onBuildStart: [
        'node_modules/collecticons-processor/bin/collecticons.js ' +
        'compile ' +
        'app/assets/graphics/collecticons ' +
        '--font-embed ' +
        '--font-dest app/assets/fonts ' +
        '--font-name Collecticons ' +
        '--font-types woff ' +
        '--style-format sass ' +
        '--style-dest app/assets/styles/core ' +
        '--style-name collecticons ' +
        '--class-name collecticon ' +
        '--author-name Development Seed ' +
        '--author-url https://developmentseed.org/ ' +
        '--no-preview'
      ]
    })
  ],
  output: {
    filename: `assets/scripts/[name]-${jsHash}.js`,
    path: path.resolve(__dirname, 'dist')
  }
};
