export default class BugsnagConfiguration {
  constructor(config, releaseStage) {
    this.config = config || {};

    this.config.releaseStage = releaseStage;

    this._setDefaultValues();
    this.valid = this._validate();
  }

  setup(bugsnag) {
    if (this.valid) {
      window.bugsnagClient = bugsnag(this.config);
    } else {
      /* eslint-disable no-console */
      console.error(
        "[ember-cli-bugsnag] Could not start Bugsnag reporting because of configuration issues"
      );
      /* eslint-enable no-console */
    }
  }

  _validate() {
    if (!this.config.apiKey) {
      /* eslint-disable no-console */
      console.error(
        "[ember-cli-bugsnag] Required value `apiKey` was not configured. Please add it to `bugsnag.apiKey` in `config/environment` or define environment variable `BUGSNAG_API_KEY`"
      );
      /* eslint-enable no-console */
      return false;
    }
    return true;
  }

  _setDefaultValues() {
    if (!this.config.notifyReleaseStages) {
      /* eslint-disable no-console */
      console.info(
        '[ember-cli-bugsnag] Notify release stages not defined in configuration, defaulting to `["production"]`. Either define `bugsnag.notifyReleaseStages` in your config file or a comma separated environment variable BUGSNAG_NOTIFY_RELEASE'
      );
      /* eslint-enable no-console */
      this.config.notifyReleaseStages = ["production"];
    }
  }
}
