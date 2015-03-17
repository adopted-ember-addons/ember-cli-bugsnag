import Ember  from 'ember';
import config from '../config/environment';

var currentEnv = config.environment;

export default {
  name: 'bugsnag-error-service',

  initialize: function(container) {
    if (currentEnv !== 'test' && Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1) {
      Ember.onerror = function (error) {
        Bugsnag.context = container.lookup('router:main').get('location').getURL();
        Bugsnag.notifyException(error);
      };

      Ember.RSVP.on('error', function(error) {
        Bugsnag.context = container.lookup('router:main').get('location').getURL();
        Bugsnag.notifyException(error);
      });

      Ember.Logger.error = function (message, cause, stack) {
        Bugsnag.context = container.lookup('router:main').get('location').getURL();
        Bugsnag.notifyException(new Error(message), null, { cause: cause, stack: stack });
      };
    }
  }
};
