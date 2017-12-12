const path = require('path');
const webpack = require('webpack');

// automatically includes all bundles in the body using script tags
const HtmlWebpackPlugin = require('html-webpack-plugin');

// moves all *.css files from the bundle to a separate css file
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// parses css and add vendor prefixes to css e.g. flex box property prefixes
const autoprefixer = require('autoprefixer');

// allows the use of variable, mixins, conditionals, etc, in css
const precss = require('precss');

// app's server configuration to be used with webpack-dev-server
const appServerSetup = require('./src/server/index.js');

const SERVER_PORT = process.env.PORT || 3000;
const DEV_ENV = process.env.NODE_ENV !== 'production';

const PATHS = {
  SRC_DIR: path.resolve(__dirname, 'src'),
  ENTRY_POINT: path.resolve(__dirname, 'src', 'browser', 'index.jsx'),
  OUTPUT_DIR: path.resolve(__dirname, 'dist'),
  TEMPLATE_FILE: path.resolve(__dirname, 'src', 'browser', 'index.html'),
};

// used by autoprefixer and babel-preset-env
const BROWSER_LIST = {
  browsers: [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
  ],
};

module.exports = {
  entry: {
    // all bundles with [name] will use the entry point name 'index'
    main: ['react-hot-loader/patch', PATHS.ENTRY_POINT],
  },
  // source map helps to debug after bundle all content
  devtool: 'inline-source-map',
  output: {
    path: PATHS.OUTPUT_DIR,
    filename: '[name].bundle.js',
    // public URL address where the output files are expected to be served from
    publicPath: '/',
  },
  // enable importing js and jsx files without specifying their's extensions
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        // We are telling webpack to use 'babel-loader' for .js and .jsx files
        // to transpile files
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        include: PATHS.SRC_DIR,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                // transpile react files to es5
                ['react'],
                // transpile es6 to es5
                ['env', {
                  targets: BROWSER_LIST,
                }],
              ],
              plugins: ['react-hot-loader/babel'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          ...(
            (DEV_ENV)
              // css-loader resolve imports and url() while style-loader add
              // the css to the DOM by injecting a <style> tag
              ? ['style-loader', 'css-loader']
              // extract css data from bundle and write to BUNDLE_NAMES.CSS
              : [
                // desctructuring the plugin result since it is a list
                ...ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'css-loader',
                }),
              ]
          ),
          {
            // process css with postcss, which transforms styles with js
            // plugins
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer(BROWSER_LIST),
                precss(),
              ],
            },
          },
        ],
      },
      {
        // emits the required/imported object as file and returns its public URL
        test: /\.(eot|ttf|woff|svg|otf|gif|png|jpe?g)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    ...(
      (DEV_ENV)
        ? [
          new webpack.NamedModulesPlugin(), // show module name during reload
          new webpack.HotModuleReplacementPlugin(),
        ]
        : [
          new webpack.optimize.UglifyJsPlugin(),
          new ExtractTextPlugin('[name].bundle.css'),
        ]
    ),
    new HtmlWebpackPlugin({
      title: 'My title',
      template: PATHS.TEMPLATE_FILE,
    }),
    // sets global constants to be replaced by its text whenever it happens.
    // For instance, when NODE_ENV is inside the code, it will be replaced by
    // the value set when starting the app, e.g. 'production'. Then, webpack
    // could remove unreachable blocks of code when something like
    // `if (NODE_ENV !== 'production') {}` happens and NODE_ENV is equal to
    // 'production'
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devServer: {
    hot: true,
    port: SERVER_PORT,
    before: (app) => {
      app.use(appServerSetup());
    },
  },
};
