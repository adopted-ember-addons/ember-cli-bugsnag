import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import config from 'dummy/config/environment';

module('Acceptance | custom user', {
  beforeEach() {
    config.bugsnag.releaseStage = 'production';
    this.cachedEnvValue = config.environment; // NOTE: cached so we can restore it
    config.environment = 'addon-test';
    this.application = startApp();
  },

  afterEach() {
    delete config.bugsnag.releaseStage;
    config.environment = this.cachedEnvValue; // NOTE: restore original value
    destroyApp(this.application);
  }
});

test('with custom user set', function(assert) {
  const expected = {
    id: 123,
    name: 'Dummy User',
    email: 'dummy@example.com'
  };

  window.bugsnagClient.notify = function(error, options) {
    assert.deepEqual(
      options.user,
      expected,
      'user should equal what\'s returned from bugsnag util getUser()'
    );
  }

  visit('/');
  click('button');
});
