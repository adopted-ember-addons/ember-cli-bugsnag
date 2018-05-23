export default class BugsnagConfiguration {
  constructor(config, releaseStage) {
    config = config || {};
    config.releaseStage = releaseStage;

    this._setDefaultValues(config);
    this.config = this._validate(config) ? config : {};
  }

  _validate(config) {
    if (!config.apiKey) {
      /* eslint-disable no-console */
      console.error('[ember-cli-bugsnag] Required value `apiKey` was not configured. Please add it to `bugsnag.apiKey` in `config/environment` or define environment variable `BUGSNAG_API_KEY`');
      /* eslint-enable no-console */
      return false;
    }
    return true;
  }

  _setDefaultValues(config) {
    if (!config.notifyReleaseStages) {
      /* eslint-disable no-console */
      console.info('[ember-cli-bugsnag] Notify release stages not defined in configuration, defaulting to `["production"]`. Either define `bugsnag.notifyReleaseStages` in your config file or a comma separated environment variable BUGSNAG_NOTIFY_RELEASE');
      /* eslint-enable no-console */
      config.notifyReleaseStages = ["production"];
    }
  }
}
