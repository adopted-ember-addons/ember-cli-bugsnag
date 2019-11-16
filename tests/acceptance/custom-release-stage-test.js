import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import config from 'dummy/config/environment';

module('Acceptance | custom release stage config', {
  beforeEach() {
    config.bugsnag.releaseStage = 'production';
    this.application = startApp();
  },

  afterEach() {
    delete config.bugsnag.releaseStage;
    destroyApp(this.application);
  }
});

test('setting bugsnag releaseStage override environment', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(window.bugsnagClient.config.releaseStage, 'production');
  });
});
