import Ember  from 'ember';
import config from '../config/environment';
import Bugsnag from 'bugsnag';

import BugsnagConfiguration from 'ember-cli-bugsnag/utils/bugsnag-configuration';
import readEnvironmentConfiguration from 'ember-cli-bugsnag/utils/read-environment-configuration';

export default {
  name: 'ember-cli-bugsnag',

  initialize: function(instance) {
    let configVariables = config.bugsnag;

    if (!configVariables) {
      console.info('[ember-cli-bugsnag] `config.bugsnag` is not defined, using environment variables instead.');
      configVariables = readEnvironmentConfiguration(process.env);
    }

    new BugsnagConfiguration(configVariables).apply(Bugsnag);
  }
};
