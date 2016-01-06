import Ember  from 'ember';
import config from '../config/environment';
import { getContext, generateError } from 'ember-cli-bugsnag/utils/errors';

var currentEnv = config.environment;

export default {
  name: 'bugsnag-error-service',

  initialize: function(instance) {
    if (typeof Bugsnag === 'undefined') { return; }

    if (currentEnv !== 'test' && Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1) {
      Ember.onerror = function (error) {
        Bugsnag.context = getContext(instance.lookup('router:main'));
        Bugsnag.notifyException(error);
        console.error(error.stack);
      };

      Ember.RSVP.on('error', function(error) {
        Bugsnag.context = getContext(instance.lookup('router:main'));
        Bugsnag.notifyException(error);
        console.error(error.stack);
      });

      Ember.Logger.error = function (message, cause, stack) {
        Bugsnag.context = getContext(instance.lookup('router:main'));
        Bugsnag.notifyException(generateError(cause, stack), message);
        console.error(stack);
      };

      const router = instance.lookup('router:main');
      const originalDidTransition = router.didTransition || Ember.K;
      router.didTransition = function() {
        Bugsnag.refresh();
        return originalDidTransition.apply(this, arguments);
      };
    }
  }
};
