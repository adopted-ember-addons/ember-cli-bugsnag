import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

module('Acceptance | environment config', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    destroyApp(this.application);
  }
});

test('visiting /environment-config', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(window.bugsnagClient.config.releaseStage, 'test');
  });
});
