import { getMetaData, getUser } from 'dummy/utils/bugsnag';
import { module, test } from 'qunit';

module('Unit | Utility | bugsnag', () => {
	test('getMetaData()', (assert) => {
		const result = getMetaData();
		const expected = {
			account: {
				name: 'Bugsnag',
				plan: 'premium',
				beta_access: true
			},
		};

		assert.deepEqual(
			result,
			expected,
			'should return what\'s defined in the the app\'s util'
		);
	});

	test('getUser()', (assert) => {
		const result = getUser();
		const expected = {
			id: 123,
			name: 'Dummy User',
			email: 'dummy@example.com'
		};

		assert.deepEqual(
			result,
			expected,
			'should return what\'s defined in the the app\'s util'
		);
	});
});
