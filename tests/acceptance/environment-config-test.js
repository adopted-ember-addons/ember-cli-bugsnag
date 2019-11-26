import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

module('Acceptance | environment config', function(hooks) {
  hooks.beforeEach(function() {
    this.application = startApp();
  });

  hooks.afterEach(function() {
    destroyApp(this.application);
  });

  test('visiting /environment-config', function(assert) {
    visit('/');

    return andThen(() => {
      const bugsnag = this.application.resolveRegistration('bugsnag:main');

      assert.ok(bugsnag);
      assert.equal(bugsnag.config.releaseStage, 'test');
    });
  });
});
