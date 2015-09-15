import Ember  from 'ember';
import config from '../config/environment';
import { getContext, generateError } from 'ember-cli-bugsnag/utils/errors';

const currentEnv = config.environment;

export default {
  name: 'bugsnag-error-service',

  initialize(container) {
    if (typeof Bugsnag === 'undefined') { return; }

    const reportError = (error) => {
      const mainContext = container.lookup('router:main');
      Bugsnag.context = getContext(mainContext, error.toLocaleString(), {
        userId: mainContext.get('currentUser.id'),
        location: window.location.href;
      });
      Bugsnag.notifyException(error);
      console.error(error.stack);
    };

    if (currentEnv !== 'test' && Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1) {
      Ember.onerror = reportError;
      Ember.RSVP.on('error', reportError);
    }
  }
};
