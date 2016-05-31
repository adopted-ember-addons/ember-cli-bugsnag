/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-bugsnag',

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
