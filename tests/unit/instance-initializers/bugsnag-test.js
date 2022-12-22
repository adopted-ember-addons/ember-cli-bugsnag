import Application from '@ember/application';

import config from 'dummy/config/environment';
import { initialize } from 'dummy/instance-initializers/bugsnag';
import { module, test } from 'qunit';
import Resolver from 'ember-resolver';
import { run } from '@ember/runloop';
import { set } from '@ember/object';

module('Unit | Instance Initializer | bugsnag', function (hooks) {
  hooks.beforeEach(function () {
    this.TestApplication = class TestApplication extends Application {
      modulePrefix = config.modulePrefix;
      podModulePrefix = config.podModulePrefix;
      Resolver = Resolver;
    };

    this.TestApplication.instanceInitializer({
      name: 'bugsnag',
      initialize,
    });

    this.application = this.TestApplication.create({
      autoboot: false,
    });

    this.instance = this.application.buildInstance();
  });
  hooks.afterEach(function () {
    run(this.instance, 'destroy');
    run(this.application, 'destroy');
  });
});

// Replace this with your real tests.
test('it works', function (assert) {
  set(this, 'Bugsnag', {
    apiKey: '123',
  });
  initialize(this.appInstance);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
