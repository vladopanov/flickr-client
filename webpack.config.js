const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WatchTimePlugin = require('webpack-watch-time-plugin');

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const CURRENT_PATH = __dirname;
const BASE_PATH = "./";
const OUT_DIR_PATH = `${BASE_PATH}/dist`;

const extractStyles = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  allChunks: true,
  disable: IS_DEVELOPMENT
});
const setUrlLoaderOutput = folder => IS_DEVELOPMENT ? `${folder}/[name].[ext]` : `${folder}/[hash].[ext]`

let config = {
  stats: {
    modules: false
  },

  context: CURRENT_PATH,

  devtool: IS_DEVELOPMENT ? "inline-source-map" : false,

  entry: {
    app: `${BASE_PATH}/src/index.tsx`
  },

  output: {
    filename: IS_DEVELOPMENT ? "[name].js" : "[name].[chunkhash].js",
    publicPath: "./",
    path: path.join(CURRENT_PATH, OUT_DIR_PATH),
    library: "flickr-client",
    libraryTarget: "umd"
  },

  module: {
    rules: [{
        test: /\.tsx?$/,
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          configFile: "./tslint.json",
          failOnHint: false,
          fix: true
        }
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss|css)$/,
        loader: extractStyles.extract({
          fallback: "style-loader",
          use: [{
              loader: "css-loader?minimize",
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: `url-loader?limit=10000&mimetype=application/octet-stream&name=${setUrlLoaderOutput('fonts')}`,
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: `url-loader?limit=10000&mimetype=image/svg+xml&name=${setUrlLoaderOutput('imgs')}`,
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: file => {
            return IS_DEVELOPMENT ? 'fonts/[name].[ext]' : 'fonts/[hash].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2)$/,
        loader: `url-loader?prefix=font/&limit=5000&name=${setUrlLoaderOutput('fonts')}`,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: `url-loader?name=${setUrlLoaderOutput('imgs')}`,
          options: {
            limit: 8192,
          }
        }]
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$',
      }
    ]
  },

  plugins: [
    extractStyles,
    new HtmlWebpackPlugin({
      template: `${BASE_PATH}/public/index.html`,
      inject: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      DEBUG_MODE: IS_DEVELOPMENT
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: module => module.context && module.context.indexOf('node_modules') > -1
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest"
    }),
    WatchTimePlugin,
  ],

  externals: {},

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      '@models': path.resolve(CURRENT_PATH, `${BASE_PATH}/src/models`),
      '@services': path.resolve(CURRENT_PATH, `${BASE_PATH}/src/services`),
      '@src': path.resolve(CURRENT_PATH, `${BASE_PATH}/src`),
    }
  }
};

if (IS_DEVELOPMENT) {
  config.output.publicPath = 'http://localhost:3000/';
  config.devServer = {
    contentBase: OUT_DIR_PATH,
    host: 'localhost',
    port: 3000,
    hot: true
  };

  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  config.plugins.push(new UglifyJsPlugin());
  config.externals["mobx-react-devtools"] = "mobxDevtools";
}

module.exports = config;