import Bugsnag from 'bugsnag';
import Ember  from 'ember';
import config from '../config/environment';
import { getContext } from 'ember-cli-bugsnag/utils/errors';
import * as appMethods from '../utils/bugsnag';

const {
  get,
  setProperties,
} = Ember;

export function initialize(instance) {
  if (Bugsnag._client._config.apiKey === undefined) {
    return;
  }
  const currentEnv = config.environment;
  const bugsnagConfig = config.bugsnag || {};
  const releaseStage = bugsnagConfig.releaseStage || currentEnv;
  const releaseStages = Bugsnag._client._config.enabledReleaseStages;

  if (currentEnv !== 'test' && releaseStages.indexOf(releaseStage) !== -1) {
    const owner = instance.lookup ? instance : instance.container;
    const router = owner.lookup('router:main');

    setProperties(this, {
      owner,
      router
    });

    Ember.onerror = (error) => this._onError(error);

    router.didTransition = this._didTransition();
  }
}

export default {
  name: 'bugsnag-error-service',

  initialize,

  _didTransition() {
    const router = get(this, 'router');
    const originalDidTransition = router.didTransition || function() {};

    return function() {
      Bugsnag.resetEventCount();
      return originalDidTransition.apply(this, arguments);
    };
  },

  _onError(error) {
    this._setNotifyException(error);

    /* eslint-disable no-console */
    console.error(error.stack);
    /* eslint-enable no-console */
  },

  _setNotifyException(error) {
    const owner = get(this, 'owner');
    const metadata = appMethods.getMetadata ? appMethods.getMetadata(error, owner) : {};
    const user = this._getUser();
    const context = this._getContext();

    Bugsnag.notify(error, event => {
      const sections = Object.keys(metadata)
      for (const section of sections) {
        event.addMetadata(section, metadata[section]);
      }
      event.setUser(user.id, user.name, user.email);
      event.context = context;
    });
  },

  _getContext() {
    const router = get(this, 'router');
    return getContext(router);
  },

  _getUser() {
    const owner = get(this, 'owner');
    if (appMethods.getUser) {
      const user = appMethods.getUser(owner);
      return user;
    }
  }
};
