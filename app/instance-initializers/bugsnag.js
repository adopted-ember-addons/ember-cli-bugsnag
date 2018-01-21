import Ember  from 'ember';
import config from '../config/environment';
import { getContext } from 'ember-cli-bugsnag/utils/errors';
import * as appMethods from '../utils/bugsnag';

const {
  get,
  setProperties,
} = Ember;

export function initialize(instance) {
  let Bugsnag = window.bugsnagClient;

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
    let Bugsnag = window.bugsnagClient;

    const router = get(this, 'router');
    const originalDidTransition = router.didTransition || function() {};

    return function() {
      Bugsnag.refresh();
      return originalDidTransition.apply(this, arguments);
    };
  },

  _onError(error) {
    this._setContext();
    this._setUser();
    this._setNotify(error);

    /* eslint-disable no-console */
    console.error(error.stack);
    /* eslint-enable no-console */
  },

  _setContext() {
    let Bugsnag = window.bugsnagClient;

    const router = get(this, 'router');
    Bugsnag.context = getContext(router);
  },

  _setNotify(error) {
    let Bugsnag = window.bugsnagClient;

    const owner = get(this, 'owner');
    const metaData = appMethods.getMetaData ? appMethods.getMetaData(error, owner) : {};
    const opts = {
      severity: null,
      metaData
    }
    Bugsnag.notify(error, opts);
  },

  _setUser() {
    let Bugsnag = window.bugsnagClient;

    const owner = get(this, 'owner');
    if (appMethods.getUser) {
      const user = appMethods.getUser(owner);
      Bugsnag.user = user;
    }
  }
};
