'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    return this.insertIntoFile('.jshintrc', '    "Bugsnag",', {
      after: '"predef": [\n'
    });
  }
};
