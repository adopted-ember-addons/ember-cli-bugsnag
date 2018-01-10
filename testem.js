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

module.exports = {
  // "framework": "qunit",
  // "test_page": "tests/index.html?hidepassed",
  // "disable_watching": true,
  // "launch_in_ci": [
  //   "Chrome",
  //   "Firefox"
  // ],
  // "launch_in_dev": [
  //   "Chrome"
  // ],
  // reporter: reportFormat(),
  // report_file: outputFile(),
  // xunit_intermediate_output: true
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Chrome'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  browser_args: {
    Chrome: {
      mode: 'ci',
      args: [
        '--disable-gpu',
        '--headless',
        '--remote-debugging-port=9222',
        '--window-size=1440,900'
      ]
    },
  }
};
