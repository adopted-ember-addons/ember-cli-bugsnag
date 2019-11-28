import Application from '@ember/application';
import initializer from 'dummy/initializers/ember-cli-bugsnag';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import config from 'dummy/config/environment';

module('Unit | Initializer | ember-cli-bugsnag', (hooks) => {
	hooks.beforeEach(function() {
		this.TestApplication = Application.extend();
		this.TestApplication.initializer(initializer);

		this.application = this.TestApplication.create({ autoboot: false });
		this.instance = this.application.buildInstance();
	});

	hooks.beforeEach(() => {
		config.bugsnag = {
			apiKey: 'secrets',
			notifyReleaseStages: ['test']
		};
	});

	hooks.afterEach(function() {
		run(this.application, 'destroy');
	});

	test('it registers the bugsnag client', async function(assert) {
		await this.application.boot();

		const bugsnag = this.instance.lookup('bugsnag:main');

		assert.ok(bugsnag);
	});

	test('bugsnag client has releaseStage from current environment', async function(assert) {
		config.bugsnag.releaseStage = null;

		await this.application.boot();

		const bugsnag = this.instance.lookup('bugsnag:main');

		assert.equal(bugsnag.config.releaseStage, 'test');
	});

	test('bugsnag client has releaseStage from config', async function(assert) {
		config.bugsnag.releaseStage = 'production';

		await this.application.boot();

		const bugsnag = this.instance.lookup('bugsnag:main');

		assert.equal(bugsnag.config.releaseStage, 'production');
	});

	test('bugsnag client has api key', async function(assert) {
		config.bugsnag.apiKey = 'foo';

		await this.application.boot();

		const bugsnag = this.instance.lookup('bugsnag:main');

		assert.equal(bugsnag.config.apiKey, 'foo');
	});

	test('bugsnag client has app version from current version', async function(assert) {
		config.currentRevision = null;

		await this.application.boot();

		const bugsnag = this.instance.lookup('bugsnag:main');

		assert.equal(bugsnag.config.appVersion, config.APP.version);
	});

	test('bugsnag client has app version from config', async function(assert) {
		config.currentRevision = 'foo';

		await this.application.boot();

		const bugsnag = this.instance.lookup('bugsnag:main');

		assert.equal(bugsnag.config.appVersion, 'foo');
	});

	test('it does nothing when api key does not exists', async function(assert) {
		delete config.bugsnag.apiKey;

		await this.application.boot();

		const bugsnag = this.instance.lookup('bugsnag:main');

		assert.notOk(bugsnag);
	});

	test('it does nothing when app is in fastboot mode', async function(assert) {
		window.FastBoot = {};

		await this.application.boot();

		const bugsnag = this.instance.lookup('bugsnag:main');

		assert.notOk(bugsnag);

		delete window.FastBoot;
	});
});
