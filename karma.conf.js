var webpackConfig = require("./webpack.testing.config");

const TESTS_SETUP_PATH = './src/tests-setup.ts'

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    // files: ["**/*.tests.ts"],
    files: [
      TESTS_SETUP_PATH
    ],
    exclude: [],
    // preprocessors: {
    //   "**/*.tests.ts": ["webpack"]
    // },
    preprocessors: {
      [TESTS_SETUP_PATH]: ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["PhantomJS"],
    singleRun: false,
    concurrency: Infinity,
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    }
  });
};