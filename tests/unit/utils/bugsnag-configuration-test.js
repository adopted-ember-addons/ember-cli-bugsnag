import BugsnagConfiguration from 'dummy/utils/bugsnag-configuration';
import { module, test } from 'qunit';

module('Unit | Utility | bugsnag configuration');

test('passes initialized values to bugsnag instance', function(assert) {
  const configuration = new BugsnagConfiguration({
    apiKey: 'UALSCA319',
    notifyReleaseStages: ['test']
  }, 'insomnia').config;

  assert.equal(configuration['apiKey'], 'UALSCA319');
  assert.equal(configuration['releaseStage'], 'insomnia');
  assert.deepEqual(configuration['notifyReleaseStages'], ['test']);
});

test('sets default a default for notifyReleaseStages', function(assert) {
  const configuration = new BugsnagConfiguration({
    apiKey: 'UALSCA319'
  }, 'insomnia').config;

  assert.deepEqual(configuration['notifyReleaseStages'], ['production']);
});

test('does not set any values if there is a configuration problem', function(assert) {
  const configuration = new BugsnagConfiguration({}).config;

  assert.deepEqual(configuration, {});
});
