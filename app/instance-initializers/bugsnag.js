import Bugsnag from 'bugsnag';
import Ember from 'ember';
import config from '../config/environment';
import { getContext } from 'ember-cli-bugsnag/utils/errors';
import * as appMethods from '../utils/bugsnag';
import { setProperties } from '@ember/object';

export function initialize(application) {
  if (!Bugsnag._client || Bugsnag._client._config.apiKey === undefined) {
    return;
  }
  const currentEnv = config.environment;
  const bugsnagConfig = config.bugsnag || {};
  const releaseStage = bugsnagConfig.releaseStage || currentEnv;
  const releaseStages = Bugsnag._client._config.enabledReleaseStages;

  if (currentEnv !== 'test' && releaseStages.indexOf(releaseStage) !== -1) {
    const owner = application.lookup ? application : application.container;
    // eslint-disable-next-line ember/no-private-routing-service
    const router = owner.lookup('router:main');

    setProperties(this, { owner, router });

    Ember.onerror = (error) => {
      this._onError(error);
    };

    router.on('routeDidChange', () => {
      Bugsnag.resetEventCount();
    });
  }
}

export default {
  name: 'bugsnag-error-service',

  initialize,

  _onError(error) {
    this._setNotifyException(error);

    /* eslint-disable-next-line no-console */
    console.error(error.stack);
  },

  _setNotifyException(error) {
    const metadata = this._getMetadata(error);
    const user = this._getUser();
    const context = this._getContext();

    Bugsnag.notify(error, (event) => {
      const sections = Object.keys(metadata);
      for (const section of sections) {
        event.addMetadata(section, metadata[section]);
      }
      event.setUser(user.id, user.name, user.email);
      event.context = context;
    });
  },

  _getMetadata(error) {
    const owner = this.owner;
    return appMethods.getMetadata ? appMethods.getMetadata(error, owner) : {};
  },

  _getContext() {
    const router = this.router;
    return getContext(router);
  },

  _getUser() {
    const owner = this.owner;
    if (appMethods.getUser) {
      const user = appMethods.getUser(owner);
      return user;
    }
  },
};
