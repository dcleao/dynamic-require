module.exports = function (config) {
  config.set({
    basePath: '../../',

    frameworks: ['jasmine', 'requirejs'],

    files: [
      {pattern: "main/**/*",included : false },
      {pattern: "test/**/test*.js",included : false },
      "main/scripts/external/common-ui/jquery/jquery-1.9.1.min.js",
      "test/scripts/require-config.js"
    ],

    // auto run tests when files change
    autoWatch: true,

    browsers: ['Chrome'],
    reporters: ['progress'/*, 'coverage'*/],

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_WARN

  });
};