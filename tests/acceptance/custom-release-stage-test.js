import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import config from 'dummy/config/environment';

module('Acceptance | custom release stage config', function(hooks) {
  hooks.beforeEach(function() {
    config.bugsnag.releaseStage = 'production';
    this.application = startApp();
  });

  hooks.afterEach(function() {
    delete config.bugsnag.releaseStage;
    destroyApp(this.application);
  });

  test('setting bugsnag releaseStage override environment', function(assert) {
    visit('/');

    return andThen(() => {
      const bugsnag = this.application.resolveRegistration('bugsnag:main');

      assert.ok(bugsnag);
      assert.equal(bugsnag.config.releaseStage, 'production');
    });
  });
});
