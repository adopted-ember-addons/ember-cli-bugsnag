'use strict';

var fs   = require('fs');
var path = require('path');

var readFile = fs.readFileSync;
var exists   = fs.existsSync;

module.exports = function readConfig() {
  var config     = {};
  var configPath = path.join(process.cwd(), '.bugsnag');

  if (exists(configPath)) {
    try {
      config = JSON.parse(
        readFile(configPath)
      );
    } catch(e) {
      throw new Error('`.bugsnag` config file is malformed: ' + e.message);
    }
  } else {
    throw new Error('Please, check if `.newrelic` configuration file exists.');
  }

  return config;
};
