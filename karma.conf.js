// Karma configuration

module.exports = function(config) {
  config.set({

    // Base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // Frameworks to use
    // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],
    client: {
      mocha: {
        ui: 'bdd'
      }
    },


    // list of files / patterns to load in the browser
    files: [
	  'https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js',
      'public/test/index.html',
      'public/js/csv.js',
      'public/test/csv-testing.js'
    ],
    
    files: [
      'public/js/csv.js',
      'public/test/csv-testing.js',
      'public/vendor/chai.js',
      'public/vendor/mocha.css',
      'public/vendor/mocha.js',
      'public/vendor/sinon-1.17.3.js',
      'public/vendor/blanket.min.js',
      'public/vendor/mocha-blanket.js',
      'public/vendor/sinon-1.7.1.js'
    ],

    // list of files to exclude
    exclude: [
      'gulpfile.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'public/test/index.html':['html2js'],
    },
    
    plugins : [
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-html2js-preprocessor',
      'karma-phantomjs-launcher',
      'karma-safari-launcher'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox', 'PhantomJS'],

   // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false


  });
};
