var assert = require('assert');
var readEnvironmentConfig = require('../../lib/environment-config').read;

var result = readEnvironmentConfig({
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
