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

  treeForAddon: function() {
    if (this._includeBugsnag) {
      return this._super.treeForAddon.apply(this, arguments);
    }
  },

  treeForApp: function() {
    if (this._includeBugsnag) {
      return this._super.treeForApp.apply(this, arguments);
    }
  },

  included: function(app) {
    this._super.included(app);
    this._includeBugsnag = this.isDevelopingAddon() || process.env.EMBER_ENV !== 'test';
    if (this._includeBugsnag) {
      app.import(app.bowerDirectory + '/bugsnag/src/bugsnag.js');
      app.import('vendor/bugsnag/shim.js', {
        type: 'vendor',
        exports: {
          'bugsnag': ['default']
        }
      });
    }
  }
};
