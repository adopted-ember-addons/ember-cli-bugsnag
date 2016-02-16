import Ember  from 'ember';
import config from '../config/environment';
import { getContext, generateError } from 'ember-cli-bugsnag/utils/errors';

var currentEnv = config.environment;

export default {
  name: 'bugsnag-error-service',

  initialize: function(instance) {
    if (typeof Bugsnag === 'undefined') { return; }

    if (currentEnv !== 'test' && Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1) {
      let owner = instance.lookup ? instance : instance.container;
      let router = owner.lookup('router:main');

      Ember.onerror = function(error) {
        Bugsnag.context = getContext(router);
        Bugsnag.notifyException(error);
        console.error(error.stack);
      };

      Ember.RSVP.on('error', function(error) {
        if (error.name !== 'TransitionAborted') {
          Bugsnag.context = getContext(router);
          Bugsnag.notifyException(error);
          console.error(error.stack);
        }
      });

      Ember.Logger.error = function(message, cause, stack) {
        Bugsnag.context = getContext(router);
        Bugsnag.notifyException(generateError(cause, stack), message);
        console.error(stack);
      };

      const originalDidTransition = router.didTransition || Ember.K;
      router.didTransition = function() {
        Bugsnag.refresh();
        return originalDidTransition.apply(this, arguments);
      };
    }
  }
};
