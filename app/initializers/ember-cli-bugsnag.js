import config from '../config/environment';
import Bugsnag from 'bugsnag';

import BugsnagConfiguration from 'ember-cli-bugsnag/utils/bugsnag-configuration';

export default {
  name: 'ember-cli-bugsnag',

  initialize: function() {
    let configVariables = config.bugsnag || {};
    let releaseStage = config.bugsnag.releaseStage || config.environment;
    new BugsnagConfiguration(configVariables, releaseStage).apply(Bugsnag);
  }
};
