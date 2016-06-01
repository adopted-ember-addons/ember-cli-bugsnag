import readEnvironmentConfiguration from 'dummy/utils/read-environment-configuration';
import { module, test } from 'qunit';

module('Unit | Utility | read environment configuration');

test('reads bugsnag config values from provided environment variables', function(assert) {
  let result = readEnvironmentConfiguration({
    BUGSNAG_API_KEY: 'scarlet',
    BUGSNAG_NOTIFY_RELEASE: "holmes,watson",
    BUGSNAG_RELEASE_STAGE: "baskerville",
    BUGSNAG_ENDPOINT: "hounds"
  });

  assert.deepEqual(result, {
    apiKey: 'scarlet',
    notifyReleaseStages: ['holmes', 'watson'],
    releaseStage: 'baskerville',
    endpoint: 'hounds'
  });
});
