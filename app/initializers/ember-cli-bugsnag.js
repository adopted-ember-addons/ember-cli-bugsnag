import config from '../config/environment';
import BugsnagConfiguration from 'ember-cli-bugsnag/utils/bugsnag-configuration';

export function initialize() {
  let configVariables = config.bugsnag || {};
  let releaseStage = config.bugsnag.releaseStage || config.environment;

  // Set currentRevision value as Bugsnag appVersion
  configVariables.appVersion = config.currentRevision || config.APP.version;

  if (typeof FastBoot === 'undefined') {
    new BugsnagConfiguration(configVariables, releaseStage).setup();
  }
}

export default {
  name: 'ember-cli-bugsnag',

  initialize,
};
