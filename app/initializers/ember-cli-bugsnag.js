import Ember  from 'ember';
import config from '../config/environment';
import Bugsnag from 'bugsnag';

export default {
  name: 'ember-cli-bugsnag',

  initialize: function(instance) {
    let bugsnagConfig;

    if (!config.bugsnag) {
      console.info('[ember-cli-bugsnag] `config.bugsnag` is not defined, using environment variables instead.');

      bugsnagConfig = {
        apiKey: process.env['BUGSNAG_API_KEY'],
        notifyReleaseStages: process.env['BUGSNAG_NOTIFY_RELEASE'].split(','),
        releaseStage: process.env['BUGSNAG_RELEASE_STAGE'],
        endpoint: process.env['BUGSNAG_ENDPOINT']
      };
    } else {
      bugsnagConfig = config.bugsnag;
    }

    if (!bugsnagConfig.apiKey) {
      console.error('[ember-cli-bugsnag] Bugsnag reporting could not be started because `apiKey` was not configred. Please add it to `bugsnag.apiKey` in `config/environment` or define environment variable `BUGSNAG_API_KEY`');
      return;
    }

    if (!bugsnagConfig.notifyReleaseStages) {
      console.warn('[ember-cli-bugsnag] Notify release stages not defined in configuration, defaulting to `["production"]`. Either define `bugsnag.notifyReleaseStages` in your config file or a comma separated environment variable BUGSNAG_NOTIFY_RELEASE');
      bugsnagConfig.notifyReleaseStages = ["production"]
    }

    Object.keys(bugsnagConfig).forEach(function(key) {
      Bugsnag[key] = bugsnagConfig[key];
    });
  }
};
