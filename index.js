/* jshint node: true */
'use strict';

var readEnvironmentConfig = require('./lib/environment-config').read;
var fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-cli-bugsnag',

  options: {
    nodeAssets: {
      'bugsnag-js': {
        vendor: {
          srcDir: 'dist',
          destDir: 'bugsnag-js',
          include: ['bugsnag.js'],

          processTree(input) {
            return fastbootTransform(input);
          }
        }
      }
    }
  },

  config: function() {
    var envConfig = readEnvironmentConfig(process.env);
    return {
      bugsnag: readEnvironmentConfig(envConfig)
    };
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

  isDevelopingAddon() {
    return true;
  },

  included: function(app) {
    this._includeBugsnag =
      this.isDevelopingAddon() || process.env.EMBER_ENV !== 'test';

    this._super.included.apply(this, arguments);
    if (this._includeBugsnag) {
      app.import('vendor/bugsnag-js/bugsnag.js');

      app.import('vendor/bugsnag/shim.js', {
        type: 'vendor',
        exports: {
          bugsnag: ['default']
        }
      });
    }
  }
};
