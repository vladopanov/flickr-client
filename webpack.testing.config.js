const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const CURRENT_PATH = __dirname;
const BASE_PATH = "./";
const setUrlLoaderOutput = folder => `${folder}/[hash].[ext]`

const extractStyles = new ExtractTextPlugin({
  filename: "styles/[name].[contenthash].css",
  allChunks: true,
  disable: true
});

let config = {

  module: {
    rules: [
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
          return 'fonts/[name].[ext]';
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
    new webpack.DefinePlugin({
      DEBUG_MODE: true
    })
  ],

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      '@models': path.resolve(CURRENT_PATH, `${BASE_PATH}/src/models`),
      '@services': path.resolve(CURRENT_PATH, `${BASE_PATH}/src/services`),
      '@src': path.resolve(CURRENT_PATH, `${BASE_PATH}/src`),
    }
  }
};

module.exports = config;