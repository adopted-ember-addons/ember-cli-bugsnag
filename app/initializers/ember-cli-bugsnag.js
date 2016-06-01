import Ember  from 'ember';
import config from '../config/environment';
import Bugsnag from 'bugsnag';
import BugsnagConfiguration from 'ember-cli-bugsnag/utils/bugsnag-configuration';

export default {
  name: 'ember-cli-bugsnag',

  initialize: function(instance) {
    let configuration;

    if (config.bugsnag) {
      configuration = new BugsnagConfiguration(config.bugsnag);
    } else {
      console.info('[ember-cli-bugsnag] `config.bugsnag` is not defined, using environment variables instead.');

      configuration = new BugsnagConfiguration({
        apiKey: process.env['BUGSNAG_API_KEY'],
        notifyReleaseStages: process.env['BUGSNAG_NOTIFY_RELEASE'].split(','),
        releaseStage: process.env['BUGSNAG_RELEASE_STAGE'],
        endpoint: process.env['BUGSNAG_ENDPOINT']
      });
    }

    configuration.apply(Bugsnag);
  }
};
