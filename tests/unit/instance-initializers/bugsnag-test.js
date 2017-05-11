import Ember from 'ember';
import { initialize } from 'dummy/instance-initializers/bugsnag';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';

const {
  set,
} = Ember;

module('Unit | Instance Initializer | bugsnag', {
  beforeEach: function() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach: function() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  },
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
