import Ember  from 'ember';
import config from '../config/environment';
import { getContext, generateError, getError } from 'ember-cli-bugsnag/utils/errors';

var currentEnv = config.environment;

export default {
  name: 'bugsnag-error-service',

  initialize: function(instance) {
    if (typeof Bugsnag === 'undefined') { return; }

    const isBugsnagActive = currentEnv !== 'test' && Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1;
    let router = isBugsnagActive ? instance.container.lookup('router:main') : null;

    Ember.onerror = function (error) {
     if (isBugsnagActive) {
          Bugsnag.context = getContext(router);
          Bugsnag.notifyException(error);
      }
      console.error(getError(error));
    };

    Ember.RSVP.on('error', function(error) {
      if (isBugsnagActive) {
        Bugsnag.context = getContext(router);
        Bugsnag.notifyException(error);
      }
      console.error(getError(error));
    });

    Ember.Logger.error = function (message, cause, stack) {
      if (isBugsnagActive) {
        Bugsnag.context = getContext(router);
        Bugsnag.notifyException(generateError(cause, stack), message);
      }
      var error = message || cause || stack || "Error";
      console.error(error);
    };
    if(isBugsnagActive){
      const originalDidTransition = router.didTransition || Ember.K;
      router.didTransition = function() {
        Bugsnag.refresh();
        return originalDidTransition.apply(this, arguments);
      };
    }
  }
};