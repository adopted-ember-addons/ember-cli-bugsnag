/* jshint node: true */
'use strict';

var readConfig = require('./lib/config');

module.exports = {
  name: 'ember-cli-bugsnag',

  contentFor: function(type, config) {
    var content = '';
    var bugsnagConfig;

    if (type === 'head' && config.environment !== 'test') {
      bugsnagConfig = readConfig();

      content = [
        '<script>',
        'Bugsnag.apiKey = "' + bugsnagConfig.apiKey + '";',
        'Bugsnag.appVersion = "' + config.curentRevision + '";',
        'Bugsnag.releaseStage = "' + config.environment + '";',
        'Bugsnag.notifyReleaseStages = ["' + config.environment + '"];',
        '</script>'
      ];
    }

    return content;
  }
};
