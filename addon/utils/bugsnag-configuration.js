export default class BugsnagConfiguration {
  constructor(config) {
    this.config = config || {};

    this._setDefaultValues();
    this.valid = this._validate();
  }

  apply(bugsnagInstance) {
    if (this.valid) {
      Object.keys(this.config).forEach((key) => {
        bugsnagInstance[key] = this.config[key];
      });
    } else {
      console.error('[ember-cli-bugsnag] Could not start Bugsnag reporting because of configuration issues');
    }
  }

  _validate() {
    if (!this.config.apiKey) {
      console.error('[ember-cli-bugsnag] Required value `apiKey` was not configured. Please add it to `bugsnag.apiKey` in `config/environment` or define environment variable `BUGSNAG_API_KEY`');
      return false;
    }
    return true;
  }

  _setDefaultValues() {
    if (!this.config.notifyReleaseStages) {
      console.info('[ember-cli-bugsnag] Notify release stages not defined in configuration, defaulting to `["production"]`. Either define `bugsnag.notifyReleaseStages` in your config file or a comma separated environment variable BUGSNAG_NOTIFY_RELEASE');
      this.config.notifyReleaseStages = ["production"];
    }
  }
}
