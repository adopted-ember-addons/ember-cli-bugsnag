'use strict';

var EOL = require('os').EOL;

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    this.insertIntoFile('.jshintrc', '    "Bugsnag",', {
      after: '"predef": [\n'
    });

    return this.insertIntoFile('.gitignore', '.bugsnag');
  },

  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/bugsnag/src/bugsnag.js');
  },
};
