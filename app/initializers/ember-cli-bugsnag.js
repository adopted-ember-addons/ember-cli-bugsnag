import config from '../config/environment';
import bugsnag from 'bugsnag';
import BugsnagConfiguration from 'ember-cli-bugsnag/utils/bugsnag-configuration';

export default {
  name: 'ember-cli-bugsnag',

  initialize(application) {
    if (typeof FastBoot !== 'undefined') {
      return;
    }

    const configVariables = config.bugsnag || {};
    const releaseStage = config.bugsnag.releaseStage || config.environment;

    // Set currentRevision value as Bugsnag appVersion
    configVariables.appVersion = config.currentRevision || config.APP.version;

    const bugsnagConfig = new BugsnagConfiguration(configVariables, releaseStage).config;

    if (!bugsnagConfig.apiKey) {
      return;
    }

    const client = bugsnag(bugsnagConfig);

    application.register('bugsnag:main', client, { instantiate: false });
  }
};
