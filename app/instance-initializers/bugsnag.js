import Ember  from 'ember';
import config from '../config/environment';
import { getContext, generateError } from 'ember-cli-bugsnag/utils/errors';
import { getMetaData } from '../utils/bugsnag';
import Bugsnag from 'bugsnag';

var currentEnv = config.environment;

export default {
  name: 'bugsnag-error-service',

  initialize: function(instance) {

    if (typeof Bugsnag === 'undefined') { return; }

    var content = '';
    var bugsnagConfig;
    var envArray;

    if (!config.bugsnag) {
      console.warn('`config.bugsnag` is not defined, using environment variables instead.');

      var envApiKey = process.env['BUGSNAG_API_KEY'];
      var envReleases = process.env['BUGSNAG_NOTIFY_RELEASE'];
      var envEndpoint = process.env['BUGSNAG_ENDPOINT'];

      if (!envApiKey || !envReleases) {
        console.error('Environment variables `BUGSNAG_API_KEY` and `BUGSNAG_NOTIFY_RELEASE` are not specified. Bugsnag will not be injected.');

        return '';
      }

      bugsnagConfig = {
        apiKey: envApiKey,
        notifyReleaseStages: envReleases.split(','),
        releaseStage: process.env['BUGSNAG_RELEASE_STAGE'],
        endpoint: envEndpoint
      };
    } else {
      bugsnagConfig = config.bugsnag;
    }

    var releaseStage = bugsnagConfig.releaseStage || config.environment;
    envArray = bugsnagConfig.notifyReleaseStages ? bugsnagConfig.notifyReleaseStages : [];

    Object.keys(bugsnagConfig).forEach(function(key) {
      Bugsnag[key] = bugsnagConfig[key];
    });

    if (currentEnv !== 'test' && Bugsnag.notifyReleaseStages.indexOf(currentEnv) !== -1) {
      let owner = instance.lookup ? instance : instance.container;
      let router = owner.lookup('router:main');

      Ember.onerror = function(error) {
        Bugsnag.context = getContext(router);
        const metaData = getMetaData(error, owner);
        Bugsnag.notifyException(error, null, metaData);
        console.error(error.stack);
      };

      const originalDidTransition = router.didTransition || Ember.K;
      router.didTransition = function() {
        Bugsnag.refresh();
        return originalDidTransition.apply(this, arguments);
      };
    }
  }
};
