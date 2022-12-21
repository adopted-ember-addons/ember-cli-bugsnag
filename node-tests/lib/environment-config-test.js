var assert = require('assert');
var readEnvironmentConfig = require('../../lib/environment-config').read;

var result = readEnvironmentConfig({
  BUGSNAG_API_KEY: 'scarlet',
  BUGSNAG_ENABLED_RELEASE: 'holmes,watson',
  BUGSNAG_RELEASE_STAGE: 'baskerville',
  BUGSNAG_ENDPOINTS: 'hounds,dartmoor',
});

assert.deepEqual(result, {
  apiKey: 'scarlet',
  enabledReleaseStages: ['holmes', 'watson'],
  releaseStage: 'baskerville',
  endpoints: {
    notify: 'hounds',
    sessions: 'dartmoor',
  },
});
