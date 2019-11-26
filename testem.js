<<<<<<< HEAD
/*jshint node:true*/

function reportFormat() {
  return _circleTestDirectory() ? 'xunit' : 'tap';
}

function outputFile() {
  if (_circleTestDirectory()) {
    return _ouputLocation(_circleTestDirectory(), _emberTryVersion());
  }
}

function _ouputLocation(directory, version) {
  var output = directory + '/testem';

  if (version) {
    output += '-' + version;
  }

  return output + '.xml';
}

function _circleTestDirectory() {
  return process.env['CIRCLE_TEST_REPORTS'];
}

function _emberTryVersion() {
  return process.env['EMBER_TRY_CURRENT_SCENARIO'];
}

||||||| parent of b961f78... message
/* eslint-env node */
=======
>>>>>>> b961f78... message
module.exports = {
<<<<<<< HEAD
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "launch_in_ci": [
    "Chrome",
    "Firefox"
||||||| parent of b961f78... message
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "launch_in_ci": [
    "PhantomJS"
=======
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Chrome'
>>>>>>> b961f78... message
  ],
<<<<<<< HEAD
  "launch_in_dev": [
    "Chrome"
  ],
	browser_args: {
		Chrome: [
			'--disable-gpu',
			'--headless',
			'--remote-debugging-port=0',
			'--window-size=1440,900'
		]
	},
  reporter: reportFormat(),
  report_file: outputFile(),
  xunit_intermediate_output: true
||||||| parent of b961f78... message
  "launch_in_dev": [
    "PhantomJS",
    "Chrome"
  ]
=======
  launch_in_dev: [
    'Chrome'
  ],
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ].filter(Boolean)
    }
  }
>>>>>>> b961f78... message
};
