import Ember  from 'ember';
import config from '../config/environment';
import { getContext, generateError } from 'ember-cli-bugsnag/utils/errors';
import { getMetaData } from '../utils/bugsnag';
import Bugsnag from 'bugsnag';

export default {
  name: 'bugsnag-error-service',

  initialize: function(instance) {
    var content = '';
    var bugsnagConfig;
    var envArray;

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
        notifyReleaseStages: envReleases.split(','),
        releaseStage: process.env['BUGSNAG_RELEASE_STAGE'],
        endpoint: envEndpoint
      };
    } else {
      bugsnagConfig = config.bugsnag;
    }

    if (!bugsnagConfig.notifyReleaseStages) {
      bugsnagConfig.notifyReleaseStages = ["production"]
    }

    Object.keys(bugsnagConfig).forEach(function(key) {
      Bugsnag[key] = bugsnagConfig[key];
    });
  }
};
