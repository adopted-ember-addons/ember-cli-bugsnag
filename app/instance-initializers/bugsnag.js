import Ember from 'ember';
import config from '../config/environment';
import { getContext, generateError, getError } from 'ember-cli-bugsnag/utils/errors';

var currentEnv = config.environment;

export default {
  name: 'bugsnag-error-service',

  initialize: function(instance) {
    if (typeof Bugsnag === 'undefined') {
      return;
    }

    const isBugsnagActive = Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1;
    const router = instance.container.lookup('router:main');
    const getMetaData = instance.getBugsnagMetadata || (() => null);

    Ember.onerror = function(error) {
      if (!(error instanceof Error)) {
        error = new Error(error);
      }

      if (isBugsnagActive) {
        Bugsnag.context = getContext(router);
        Bugsnag.notifyException(error, getMetaData());
      }

      console.error(getError(error));
    };

    Ember.Logger.error = function(message, cause, stack) {
      if (isBugsnagActive) {
        Bugsnag.context = getContext(router);

        if(cause && stack) {
          Bugsnag.notifyException(generateError(cause, stack), message, getMetaData());
        } else {
          Bugsnag.notifyException(new Error(message), getMetaData());
        }
      }

      console.error(message);
    };

    if (isBugsnagActive) {
      const originalDidTransition = router.didTransition || Ember.K;

      router.didTransition = function() {
        Bugsnag.refresh();
        return originalDidTransition.apply(this, arguments);
      };
    }
  }
};
