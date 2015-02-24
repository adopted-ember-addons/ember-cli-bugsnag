import Ember from 'ember';

export default {
  name: 'bugsnag-error-service',

  initialize: function() {
    Ember.onerror = function (error) {
      Bugsnag.notifyException(error);
    };

    Ember.RSVP.on('error', function(error) {
      Bugsnag.notifyException(error);
    });

    Ember.Logger.error = function (message, cause, stack) {
      Bugsnag.notifyException(new Error(message), null, { cause: cause, stack: stack });
    };
  }
};
