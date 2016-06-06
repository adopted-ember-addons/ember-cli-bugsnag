import BugsnagConfiguration from 'dummy/utils/bugsnag-configuration';
import { module, test } from 'qunit';

module('Unit | Utility | bugsnag configuration');

test('passes initialized values to bugsnag instance', function(assert) {
  let configuration = new BugsnagConfiguration({
    apiKey: 'UALSCA319',
    notifyReleaseStages: ['test']
  });

  let bugsnagInstance = {};
  configuration.apply(bugsnagInstance);
  assert.equal(bugsnagInstance['apiKey'], 'UALSCA319');
  assert.deepEqual(bugsnagInstance['notifyReleaseStages'], ['test']);
});

test('sets default a default for notifyReleaseStages', function(assert) {
  let configuration = new BugsnagConfiguration({
    apiKey: 'UALSCA319'
  });

  let bugsnagInstance = {};
  configuration.apply(bugsnagInstance);
  assert.deepEqual(bugsnagInstance['notifyReleaseStages'], ['production']);
});

test('does not set any values if there is a configuration problem', function(assert) {
  let configuration = new BugsnagConfiguration({});

  let bugsnagInstance = {};
  configuration.apply(bugsnagInstance);
  assert.deepEqual(bugsnagInstance, {});
});
