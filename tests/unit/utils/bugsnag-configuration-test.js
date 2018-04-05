import BugsnagConfiguration from 'dummy/utils/bugsnag-configuration';
import { module, test } from 'qunit';

module('Unit | Utility | bugsnag configuration');

test('passes initialized values to bugsnag instance', function(assert) {
  let configuration = new BugsnagConfiguration({
    apiKey: 'UALSCA319',
    notifyReleaseStages: ['test']
  }, 'insomnia');

  let bugsnagConfig = {};
  const bugsnagObject = function(_config) {
    bugsnagConfig = _config
  };
  configuration.setup(bugsnagObject);
  assert.equal(bugsnagConfig['apiKey'], 'UALSCA319');
  assert.equal(bugsnagConfig['releaseStage'], 'insomnia');
  assert.deepEqual(bugsnagConfig['notifyReleaseStages'], ['test']);
});

test('sets default a default for notifyReleaseStages', function(assert) {
  let configuration = new BugsnagConfiguration({
    apiKey: 'UALSCA319'
  }, 'insomnia');

  let bugsnagConfig = {};
  const bugsnagObject = function(_config) {
    bugsnagConfig = _config;
  };
  configuration.setup(bugsnagObject);
  assert.deepEqual(bugsnagConfig['notifyReleaseStages'], ['production']);
});

test('does not set any values if there is a configuration problem', function(assert) {
  let configuration = new BugsnagConfiguration({});

  let bugsnagConfig = {};
  const bugsnagObject = function(_config) {
    bugsnagConfig = _config;
  };
  configuration.setup(bugsnagObject);
  assert.deepEqual(bugsnagConfig, {});
});
