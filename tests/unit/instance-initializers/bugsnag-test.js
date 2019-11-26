import Application from '@ember/application';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { initialize } from 'dummy/instance-initializers/bugsnag';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

module('Unit | Instance Initializer | bugsnag', function(hooks) {
  hooks.beforeEach(function() {
    run(() => {
      this.application = Application.create();
      this.appInstance = this.application.buildInstance();
    });
  });

  hooks.afterEach(function() {
    run(this.appInstance, 'destroy');
    destroyApp(this.application);
  });

  // Replace this with your real tests.
  test('it works', function(assert) {
    set(this, 'Bugsnag', {
      apiKey: '123'
    });
    initialize(this.appInstance);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
