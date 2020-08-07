import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import config from 'dummy/config/environment';
import Bugsnag from 'bugsnag';

module('Acceptance | custom release stage config', {
  beforeEach() {
    delete Bugsnag._client; //  NOTE: remove existing client so we can test app start
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
    assert.equal(Bugsnag._client._config.releaseStage, 'production');
  });
});
