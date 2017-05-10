import Ember  from 'ember';
import config from '../config/environment';
import { getContext } from 'ember-cli-bugsnag/utils/errors';
import { getMetaData } from '../utils/bugsnag';
import { getUser } from '../utils/get-user';
import Bugsnag from 'bugsnag';

export default {
  name: 'bugsnag-error-service',

  initialize: function(instance) {
    if (Bugsnag.apiKey === undefined) {
      return;
    }
    const currentEnv = config.environment;
    const bugsnagConfig = config.bugsnag || {};
    const releaseStage = bugsnagConfig.releaseStage || currentEnv;

    if (currentEnv !== 'test' && Bugsnag.notifyReleaseStages.indexOf(releaseStage) !== -1) {
      let owner = instance.lookup ? instance : instance.container;
      let router = owner.lookup('router:main');

      Ember.onerror = function(error) {
        Bugsnag.context = getContext(router);
        const metaData = getMetaData(error, owner);
        const user = getUser(owner) || {};
        Bugsnag.user = user;
        Bugsnag.notifyException(error, null, metaData);
        console.error(error.stack);
      };

      const originalDidTransition = router.didTransition || function() {};
      router.didTransition = function() {
        Bugsnag.refresh();
        return originalDidTransition.apply(this, arguments);
      };
    }
  }
};
