import config from '../config/environment';
import bugsnagClient from 'bugsnag';

import BugsnagConfiguration from 'ember-cli-bugsnag/utils/bugsnag-configuration';

export default {
  name: 'ember-cli-bugsnag',

  initialize: function() {
    let configVariables = config.bugsnag || {};
    let releaseStage = config.bugsnag.releaseStage || config.environment;

    // Set currentRevision value as Bugsnag appVersion
    configVariables.appVersion = config.currentRevision || config.APP.version;
    if (typeof FastBoot === 'undefined') {
      new BugsnagConfiguration(configVariables, releaseStage).apply(bugsnagClient);
    }
  }
};
