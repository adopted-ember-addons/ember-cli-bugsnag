import { getUser } from 'dummy/utils/get-user';
import { module, test } from 'qunit';

module('Unit | Utility | bugsnag get user');

test('it works', function(assert) {
  let result = getUser();
  assert.deepEqual(result, {}, 'should return empty object by default');
});
