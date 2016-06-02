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

    const owner = instance.lookup ? instance : instance.container;
    const isBugsnagActive = Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1;
    const router = owner.lookup('router:main');
    const getMetaData = instance.getBugsnagMetadata || (() => { return {}; });

    Ember.onerror = function(error) {
      const plain = !(error instanceof Error);

      if (plain) {
        error = getError(error);
      }

      if (isBugsnagActive) {
        const metadata = getMetaData();

        // Group all plain errors by message.
        if (plain) {
          metadata.groupingHash = error.message;
        }

        Bugsnag.context = getContext(router);
        Bugsnag.notifyException(error, metadata);
      }

      console.error(error.stack);
    };

    Ember.Logger.error = function(message, cause, stack) {
      if (isBugsnagActive) {
        const metadata = getMetaData();

        // Group all Logger.error by message.
        metadata.groupingHash = message;

        Bugsnag.context = getContext(router);

        if(cause && stack) {
          Bugsnag.notifyException(generateError(cause, stack), message, metadata);
        } else {
          Bugsnag.notifyException(new Error(message), metadata);
        }
      }

      if(cause && stack) {
        console.error(message, cause, stack);
      } else {
        console.error(message);
      }
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
