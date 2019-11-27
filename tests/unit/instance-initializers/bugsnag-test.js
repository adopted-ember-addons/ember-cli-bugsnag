import Application from '@ember/application';
import instanceInitializer from 'dummy/instance-initializers/bugsnag';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import Ember from 'ember';

module('Unit | Instance Initializer | bugsnag', (hooks) => {
	hooks.beforeEach(function() {
		this.TestApplication = Application.extend();
		this.TestApplication.instanceInitializer(instanceInitializer);
		this.application = this.TestApplication.create({ autoboot: false });
		this.instance = this.application.buildInstance();
		this.client = {
			config: {
				notifyReleaseStages: ['production']
			}
		};

		this.instance.register('bugsnag:main', this.client, { instantiate: false });
	});

	hooks.afterEach(function() {
		run(this.instance, 'destroy');
		run(this.application, 'destroy');
	});

	test('it does nothing when release stage is not in the list', async function(assert) {
		this.client.config.releaseStage = 'foo';

		await this.instance.boot();

		assert.notOk(Ember.onerror);
	});

	test('it listens to onerror', async function(assert) {
		this.client.config.releaseStage = 'production';

		await this.instance.boot();

		assert.ok(Ember.onerror);
	});
});
