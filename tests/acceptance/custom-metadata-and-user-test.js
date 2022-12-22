import { test, module } from 'qunit';
import config from 'dummy/config/environment';
import Bugsnag from 'bugsnag';
import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | custom meta-data and user', function (hooks) {
  hooks.beforeEach(() => {
    config.bugsnag.releaseStage = 'production';
    this.cachedEnvValue = config.environment; // NOTE: cached so we can restore it
    config.environment = 'addon-test';
  });

  hooks.afterEach(() => {
    delete config.bugsnag.releaseStage;
    config.environment = this.cachedEnvValue; // NOTE: restore original value
    delete Bugsnag._client; // NOTE: reset client
  });

  setupApplicationTest(hooks);

  test('with custom metadata and user set', async function (assert) {
    assert.expect(5);

    const expectedMetadata = {
      account: {
        name: 'Bugsnag',
        plan: 'premium',
        beta_access: true,
      },
    };
    const expectedUser = {
      id: 123,
      name: 'Dummy User',
      email: 'dummy@example.com',
    };

    const Event = {
      addMetadata(section, sectionData) {
        assert.equal(
          section,
          'account',
          "section should equal what's returned from bugsnag util getMetadata()"
        );
        assert.deepEqual(
          sectionData,
          expectedMetadata.account,
          "sectionData should equal what's returned from bugsnag util getMetadata()"
        );
      },
      setUser(id, name, email) {
        assert.equal(
          id,
          expectedUser.id,
          "id should equal what's returned from bugsnag util getUser().id"
        );
        assert.equal(
          name,
          expectedUser.name,
          "id should equal what's returned from bugsnag util getUser().name"
        );
        assert.equal(
          email,
          expectedUser.email,
          "id should equal what's returned from bugsnag util getUser().email"
        );
      },
    };

    Bugsnag.notify = function (error, onError) {
      onError(Event);
    };

    await visit('/');
    await click('button');
  });
});
