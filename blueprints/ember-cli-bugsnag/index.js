'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    afterInstall: function(options) {
      return this.addBowerPackageToProject('bugsnag', '~2.5.0');
    }
  }
};
