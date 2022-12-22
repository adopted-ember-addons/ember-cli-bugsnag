import BugsnagConfiguration from 'dummy/utils/bugsnag-configuration';
import { module, test } from 'qunit';
import Bugsnag from 'bugsnag';

module('Unit | Utility | bugsnag configuration', function (hooks) {
  hooks.beforeEach(() => {
    this.originalStart = Bugsnag.start; // NOTE: cached so we can restore it
  });

  hooks.afterEach(() => {
    Bugsnag.start = this.start; // NOTE: restore original value
  });

  test('passes initialized values to bugsnag instance', function (assert) {
    assert.expect(3);

    let configuration = new BugsnagConfiguration(
      {
        apiKey: 'UALSCA319',
        enabledReleaseStages: ['test'],
      },
      'insomnia'
    );

    Bugsnag.start = function (options) {
      assert.equal(options['apiKey'], 'UALSCA319');
      assert.equal(options['releaseStage'], 'insomnia');
      assert.deepEqual(options['enabledReleaseStages'], ['test']);
    };

    configuration.setup();
  });

  test('sets default a default for enabledReleaseStages', function (assert) {
    assert.expect(1);

    let configuration = new BugsnagConfiguration(
      {
        apiKey: 'UALSCA319',
      },
      'insomnia'
    );

    Bugsnag.start = function (options) {
      assert.deepEqual(options['enabledReleaseStages'], ['production']);
    };

    configuration.setup();
  });

  test('does not set any values if there is a configuration problem', function (assert) {
    assert.expect(0);

    let configuration = new BugsnagConfiguration({});

    Bugsnag.start = function () {
      assert.ok(false, 'this should not be called');
    };

    configuration.setup();
  });
});
