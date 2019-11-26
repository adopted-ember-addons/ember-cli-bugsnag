import { setProperties, get } from '@ember/object';
import Ember  from 'ember';
import { getContext } from 'ember-cli-bugsnag/utils/errors';
import * as appMethods from '../utils/bugsnag';
import config from '../config/environment';

export function initialize(instance) {
  const owner = instance.lookup ? instance : instance.container;
  const client = owner.lookup('bugsnag:main');

  if (client && config.environment !== 'test' && client.config.notifyReleaseStages.includes(client.config.releaseStage)) {
    const router = owner.lookup('router:main');

    setProperties(this, {
      owner,
      router,
      client
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
    const client = get(this, 'client');
    const originalDidTransition = router.didTransition || function() {};

    return function() {
      client.refresh();
      return originalDidTransition.apply(this, arguments);
    };
  },

  _onError(error) {
    if (!error || typeof error !== 'object' || !error.name || !error.message) {
      error = this._formatUnknownError(error);
    }

    this._setContext();
    this._setUser();
    this._notify(error);

    /* eslint-disable no-console */
    console.error(error.stack || error.message);
    /* eslint-enable no-console */

    if (Ember.testing) {
      throw error;
    }
  },

  _formatUnknownError(error) {
    return {
      name: (error && error.name) || 'UnknownError',
      message: (error && error.message) || String(error)
    }
  },

  _setUser() {
    const owner = get(this, 'owner');
    const client = get(this, 'client');
    const user = appMethods.getUser && appMethods.getUser(owner);

    client.user = user;
  },

  _setContext() {
    const router = get(this, 'router');
    const client = get(this, 'client');
    const context = getContext(router);

    client.context = context;
  },

  _notify(error) {
    const owner = get(this, 'owner');
    const client = get(this, 'client');
    const metaData = appMethods.getMetaData ? appMethods.getMetaData(error, owner) : {};

    client.notify(error, { metaData });
  }
};
