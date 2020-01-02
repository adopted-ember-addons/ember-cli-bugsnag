import { module, test } from 'qunit';
import { settled, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import sinon from 'sinon';
import Ember from 'ember';
import * as appMethods from 'dummy/utils/bugsnag';

module('Acceptance | bugsnag', (hooks) => {
	setupApplicationTest(hooks);

	hooks.beforeEach(function() {
		this.bugsnag = this.owner.lookup('bugsnag:main');

		sinon.stub(this.bugsnag, 'notify');
		sinon.stub(this.bugsnag, 'refresh');
	});

	test('it notifies an error', async function(assert) {
		const error = new Error('foo');

		await visit('/foo');

		try {
			Ember.onerror(error);
		} catch (e) {
			// noop
		}

		await settled();

		assert.ok(this.bugsnag.notify.calledOnceWith(error));
	});

	test('it sets user info on error', async function(assert) {
		const error = new Error('foo');
		const user = {};

		sinon.stub(appMethods, 'getUser').returns(user);

		await visit('/foo');

		try {
			Ember.onerror(error);
		} catch (e) {
			// noop
		}

		await settled();

		assert.equal(this.bugsnag.user, user);
	});

	test('it sets route context on error', async function(assert) {
		const error = new Error('foo');

		await visit('/foo');

		try {
			Ember.onerror(error);
		} catch (e) {
			// noop
		}

		await settled();

		assert.equal(this.bugsnag.context, 'foo (/foo)');
	});

	test('it sets metadata on error', async function(assert) {
		const error = new Error('foo');
		const metaData = { foo: 'bar' };

		sinon.stub(appMethods, 'getMetaData').resolves(metaData);

		await visit('/foo');

		try {
			Ember.onerror(error);
		} catch (e) {
			// noop
		}

		await settled();

		assert.ok(this.bugsnag.notify.calledOnceWith(error, { metaData }));
	});

	test('it refreshes client on transition', async function(assert) {
		await visit('/foo');

		assert.ok(this.bugsnag.refresh.calledOnce);

		await visit('/bar');

		assert.ok(this.bugsnag.refresh.calledTwice);
	});

	test('it does not notify nothing', async function(assert) {
		await visit('/foo');

		Ember.onerror();

		await settled();

		assert.ok(this.bugsnag.notify.notCalled);
	});

	// test('it notifies strings as errors', async function(assert) {
	// 	await visit('/foo');

	// 	try {
	// 		Ember.onerror('foo');
	// 	} catch (e) {
	// 		// noop
	// 	}

	// 	await settled();

	// 	assert.ok(this.bugsnag.notify.calledOnce);

	// 	const error = this.bugsnag.notify.args[0][0];

	// 	assert.ok(error instanceof Error);
	// 	assert.equal(error.name, 'UnknownError');
	// 	assert.equal(error.message, 'foo');
	// });

	test('it uses empty metadata', async function(assert) {
		const error = new Error('foo');

		await visit('/foo');

		const getMetaData = appMethods.getMetaData;

		delete appMethods.getMetaData;

		try {
			Ember.onerror(error);
		} catch (e) {
			// noop
		}

		await settled();

		assert.ok(this.bugsnag.notify.calledOnceWith(error));

		// eslint-disable-next-line require-atomic-updates
		appMethods.getMetaData = getMetaData;
	});
});
