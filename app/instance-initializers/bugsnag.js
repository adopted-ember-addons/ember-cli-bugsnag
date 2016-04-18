import Ember  from 'ember';
import config from '../config/environment';
import { getContext, generateError, getError } from 'ember-cli-bugsnag/utils/errors';
import { getMetaData } from '../utils/bugsnag';

var currentEnv = config.environment;

export default {
  name: 'bugsnag-error-service',

  initialize: function(instance) {
    if (typeof Bugsnag === 'undefined') { return; }

      const isBugsnagActive = currentEnv !== 'test' && Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1;
      let owner = instance.lookup ? instance : instance.container;
      let router = owner.lookup('router:main');

      Ember.onerror = function(error) {
        if (isBugsnagActive) {
          Bugsnag.context = getContext(router);
          const metaData = getMetaData(error, owner);
          Bugsnag.notifyException(error, null, metaData);
        }
        console.error(getError(error));
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
