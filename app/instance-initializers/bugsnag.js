import Ember  from 'ember';
import config from '../config/environment';
import { getContext } from 'ember-cli-bugsnag/utils/errors';
import { getMetaData, getUser } from '../utils/bugsnag';
import Bugsnag from 'bugsnag';

const {
  get,
  setProperties,
} = Ember;

export function initialize(instance) {
  if (Bugsnag.apiKey === undefined) {
    return;
  }
  const currentEnv = config.environment;
  const bugsnagConfig = config.bugsnag || {};
  const releaseStage = bugsnagConfig.releaseStage || currentEnv;

  if (currentEnv !== 'test' && Bugsnag.notifyReleaseStages.indexOf(releaseStage) !== -1) {
    const owner = instance.lookup ? instance : instance.container;
    const router = owner.lookup('router:main');

    setProperties(this, {
      owner,
      router,
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
      Bugsnag.refresh();
      return originalDidTransition.apply(this, arguments);
    };
  },

  _onError(error) {
    this._setContext();
    this._setNotifyException(error);
    this._setUser();

    /* eslint-disable no-console */
    console.error(error.stack);
    /* eslint-enable no-console */
  },

  _setContext() {
    const router = get(this, 'router');
    Bugsnag.context = getContext(router);
  },

  _setNotifyException(error) {
    const owner = get(this, 'owner');
    if (getMetaData) {
      const metaData = getMetaData(error, owner);
      Bugsnag.notifyException(error, null, metaData);
    }
  },

  _setUser() {
    const owner = get(this, 'owner');
    if (getUser) {
      const user = getUser(owner);
      Bugsnag.user = user;
    }
  },
};
