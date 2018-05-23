import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import config from 'dummy/config/environment';
import Ember from 'ember';

module('Acceptance | custom user', {
  beforeEach() {
    config.bugsnag.releaseStage = 'production';
    this.cachedEnvValue = config.environment; // NOTE: cached so we can restore it
    config.environment = 'addon-test';
    this.application = startApp();
    Ember.testing = false;
  },

  afterEach() {
    Ember.testing = true;
    delete config.bugsnag.releaseStage;
    config.environment = this.cachedEnvValue; // NOTE: restore original value
    destroyApp(this.application);
  }
});

test('with custom user set', function(assert) {
  visit('/');
  click('button');

  return andThen(() => {
    const bugsnag = this.application.resolveRegistration('bugsnag:main');
    const expected = {
      id: 123,
      name: 'Dummy User',
      email: 'dummy@example.com'
    };

    assert.deepEqual(
      bugsnag.user,
      expected,
      'Bugsnag.user should equal what\'s returned from bugsnag util getUser()'
    );
  });
});
