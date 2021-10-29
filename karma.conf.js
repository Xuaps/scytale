// Karma configuration
// Generated on Wed May 12 2021 21:39:24 GMT+0200 (Central European Summer Time)

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine", "karma-typescript"],

    // list of files / patterns to load in the browser
    files: [
      { pattern: "src/web/domain/*.ts", type: "js" },
      { pattern: "src/web/__tests__/*.ts", type: "js" },
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*.ts": "karma-typescript",
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"],
    processKillTimeout: 60000,

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing __tests__ whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the __tests__ and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    karmaTypescriptConfig: {
      compilerOptions: {
        esModuleInterop: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        module: "ES5",
        sourceMap: false,
        target: "ES5",
        exclude: ["node_modules"],
        downlevelIteration: true,
      },
    },
  });
};
