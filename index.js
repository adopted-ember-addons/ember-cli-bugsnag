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
  },

  contentFor: function(type, config) {
    var content = '';
    var bugsnagConfig;
    var envArray;

    if (type === 'head' && config.environment !== 'test') {
      if (!config.bugsnag) {
        console.warn('`config.bugsnag` is not defined, using environment variables instead.');

        var envApiKey = process.env['BUGSNAG_API_KEY'];
        var envReleases = process.env['BUGSNAG_NOTIFY_RELEASE'];
        var envEndpoint = process.env['BUGSNAG_ENDPOINT'];

        if (!envApiKey || !envReleases) {
          console.error('Environment variables `BUGSNAG_API_KEY` and `BUGSNAG_NOTIFY_RELEASE` are not specified. Bugsnag will not be injected.');

          return '';
        }

        bugsnagConfig = {
          apiKey: envApiKey,
          libraryUrl: process.env['BUGSNAG_LIBRARY_URL'],
          notifyReleaseStages: envReleases.split(','),
          releaseStage: process.env['BUGSNAG_RELEASE_STAGE'],
          endpoint: envEndpoint
        };
      } else {
        bugsnagConfig = config.bugsnag;
      }

      var libraryUrl = bugsnagConfig.libraryUrl || 'https://d2wy8f7a9ursnm.cloudfront.net/bugsnag-2.min.js';
      var releaseStage = bugsnagConfig.releaseStage || config.environment;
      envArray = bugsnagConfig.notifyReleaseStages ? bugsnagConfig.notifyReleaseStages : [];

      content = [
        '<script ',
        'src="' + libraryUrl + '" ',
        'data-appversion="' + config.currentRevision + '" ',
        'data-apikey="' + bugsnagConfig.apiKey + '">',
        '</script>',
        '<script>',
        'if (typeof Bugsnag !== "undefined") {',
        'Bugsnag.releaseStage = "' + releaseStage + '";',
        'Bugsnag.notifyReleaseStages = ["' + envArray.join('","') + '"];',
        bugsnagConfig.endpoint ? 'Bugsnag.endpoint = ["' + bugsnagConfig.endpoint + '"];' : '',
        '}',
        '</script>'
      ];
    }

    return content;
  }
};
