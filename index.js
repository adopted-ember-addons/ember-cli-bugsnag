/* jshint node: true */
'use strict';

var readEnvironmentConfig = require('./lib/environment-config').read;

module.exports = {
  name: 'ember-cli-bugsnag',

  config: function() {
    return {
      bugsnag: readEnvironmentConfig(process.env)
    }
  },

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/bugsnag/src/bugsnag.js');

    app.import('vendor/bugsnag/shim.js', {
      type: 'vendor',
      exports: {
        'bugsnag': ['default']
      }
    });
  }
};
