import Ember  from 'ember';
import config from '../config/environment';
import Bugsnag from 'bugsnag';

import BugsnagConfiguration from 'ember-cli-bugsnag/utils/bugsnag-configuration';

export default {
  name: 'ember-cli-bugsnag',

  initialize: function(instance) {
    let configVariables = config.bugsnag;
    new BugsnagConfiguration(configVariables).apply(Bugsnag);
  }
};
