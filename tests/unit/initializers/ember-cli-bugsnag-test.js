import Application from '@ember/application';
import Bugsnag from 'bugsnag';
import config from 'dummy/config/environment';
import { initialize } from 'dummy/initializers/ember-cli-bugsnag';
import { module, test } from 'qunit';
import Resolver from 'ember-resolver';
import { run } from '@ember/runloop';

module('Unit | Initializer | ember-cli-bugsnag', function (hooks) {
  hooks.afterEach(function () {
    delete config.bugsnag.releaseStage;
    delete Bugsnag._client;
    run(this.application, 'destroy');
  });

  test('it reads from environment config', async function (assert) {
    this.application = createApplication(this);

    await this.application.boot();

    assert.equal(Bugsnag._client._config.releaseStage, 'test');
  });

  test('setting bugsnag releaseStage override environment', async function (assert) {
    config.bugsnag.releaseStage = 'production';
    this.application = createApplication(this);

    await this.application.boot();

    assert.equal(Bugsnag._client._config.releaseStage, 'production');
  });
});

const createApplication = function (context) {
  context.TestApplication = class TestApplication extends Application {
    modulePrefix = config.modulePrefix;
    podModulePrefix = config.podModulePrefix;
    Resolver = Resolver;
  };
  context.TestApplication.initializer({
    name: 'ember-cli-bugsnag',
    initialize,
  });

  return context.TestApplication.create({ autoboot: false });
};
