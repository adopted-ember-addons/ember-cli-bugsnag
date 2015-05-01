import Ember  from 'ember';
import config from '../config/environment';
import { getContext, generateError } from 'ember-cli-bugsnag/utils/errors';

var currentEnv = config.environment;

export default {
  name: 'bugsnag-error-service',

  initialize: function(container) {
    if (typeof Bugsnag === 'undefined') { return; }

    if (currentEnv !== 'test' && Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1) {
      Ember.onerror = function (error) {
        Bugsnag.context = getContext(container.lookup('router:main'));
        Bugsnag.notifyException(error);
        console.error(error.stack);
      };

      Ember.RSVP.on('error', function(error) {
        Bugsnag.context = getContext(container.lookup('router:main'));
        Bugsnag.notifyException(error);
        console.error(error.stack);
      });

      Ember.Logger.error = function (message, cause, stack) {
        Bugsnag.context = getContext(container.lookup('router:main'));
        Bugsnag.notifyException(generateError(cause, stack), message);
        console.error(stack);
      };
    }
  }
};
