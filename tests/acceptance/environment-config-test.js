import { test, module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import Bugsnag from 'bugsnag';

module('Acceptance | environment config', {
  beforeEach() {
    delete Bugsnag._client; //  NOTE: remove existing client so we can test app start
    this.application = startApp();
  },

  afterEach() {
    destroyApp(this.application);
  }
});

test('visiting /environment-config', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(Bugsnag._client._config.releaseStage, 'test');
  });
});
