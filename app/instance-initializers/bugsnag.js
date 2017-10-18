import Ember from 'ember';
import config from '../config/environment';
import { getContext, generateError } from 'ember-cli-bugsnag/utils/errors';
import { getMetaData } from '../utils/bugsnag';
import Bugsnag from 'bugsnag';

export default {
  name: 'bugsnag-error-service',

  initialize: function(instance) {
    if (!Bugsnag || Bugsnag.apiKey === undefined) {
      return;
    }

    const currentEnv = config.environment;
    const bugsnagConfig = config.bugsnag || {};
    const releaseStage = bugsnagConfig.releaseStage || currentEnv;
    const isBugsnagActive = Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1;
    let owner = instance.lookup ? instance : instance.container;
    let router = owner.lookup('router:main');

    Ember.onerror = function(error) {
      const plain = !(error instanceof Error);

      if (!plain) {
        if (isBugsnagActive) {
          const metaData = getMetaData(error, owner) || {};

          Bugsnag.context = getContext(router);
          Bugsnag.notifyException(error, null, metaData);
        }

        console.error(error.message, error.stack);
      }
    };

    Ember.Logger.error = function(message, cause, stack) {
      if (isBugsnagActive) {
        const metaData = getMetaData(message, owner) || {};

        // Group all Logger.error by message.
        metaData.groupingHash = message;

        Bugsnag.context = getContext(router);

        if (cause && stack) {
          Bugsnag.notifyException(generateError(cause, stack), message, metaData);
        } else {
          Bugsnag.notifyException(new Error(message), metaData);
        }
      }

      if (stack) {
        console.error(stack);
      } else if (cause) {
        console.error(message, cause);
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
