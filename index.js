/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-bugsnag',

  contentFor: function(type, config) {
    var content = '';
    var bugsnagConfig;
    var envArray;

    if (type === 'head' && config.environment !== 'test') {
      if (!config.bugsnag) {
        console.warn('`config.bugsnag` is not defined, using environment variables instead.');

        var envApiKey = process.env['BUGSNAG_API_KEY'];
        var envReleases = process.env['BUGSNAG_NOTIFY_RELEASE'];

        if (!envApiKey || !envReleases) {
          console.error('Environment variables `BUGSNAG_API_KEY` and `BUGSNAG_NOTIFY_RELEASE` are not specified. Bugsnag will not be injected.');

          return '';
        }

        bugsnagConfig = {
          apiKey: envApiKey,
          notifyReleaseStages: envReleases.split(',')
        };
      } else {
        bugsnagConfig = config.bugsnag;
      }

      envArray = bugsnagConfig.notifyReleaseStages ? bugsnagConfig.notifyReleaseStages : [];

      content = [
        '<script ',
        'src="https://d2wy8f7a9ursnm.cloudfront.net/bugsnag-2.min.js" ',
        'data-appversion="' + config.currentRevision + '" ',
        'data-apikey="' + bugsnagConfig.apiKey + '">',
        '</script>',
        '<script>',
        'if (typeof Bugsnag !== "undefined") {',
        'Bugsnag.releaseStage = "' + config.environment + '";',
        'Bugsnag.notifyReleaseStages = ["' + envArray.join('","') + '"];',
        '}',
        '</script>'
      ];
    }

    return content;
  }
};
