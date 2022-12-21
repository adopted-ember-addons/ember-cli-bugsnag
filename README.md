ember-cli-bugsnag
==============================================================================

[![Build Status](https://travis-ci.com/adopted-ember-addons/ember-cli-bugsnag.svg)](https://travis-ci.com/adopted-ember-addons/ember-cli-bugsnag) [![Ember Observer Score](https://emberobserver.com/badges/ember-cli-bugsnag.svg)](https://emberobserver.com/addons/ember-cli-bugsnag)


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-bugsnag
```


Usage
------------------------------------------------------------------------------

There are two ways to configure `ember-cli-bugsnag`:

1. Add POJO to `config/environment`:

```javascript
{
  bugsnag: {
    apiKey: '',
    enabledReleaseStages: ['development', 'production']
  }
}
```

The releaseStage defaults to the current application environment, if you
need to set a different releaseStage that diverges from the environment, you
can pass and additional attribute to the bugsnag configuration called
`releaseStage`. It would look like this:

```javascript
{
  bugsnag: {
    apiKey: '',
    enabledReleaseStages: ['development', 'production', 'staging'],
    releaseStage: 'staging'
  }
}
```

2. Specify environment variables:

```sh
export BUGSNAG_API_KEY=''
export BUGSNAG_ENABLED_RELEASE='development,production'
```

Configuration options:

 * `config.bugsnag.apiKey` / `BUGSNAG_API_KEY` -- **required**
 * `config.bugsnag.enabledReleaseStages` / `BUGSNAG_ENABLED_RELEASE` -- optional, defaults to `[]` (never notify).
 * `config.bugsnag.releaseStage` / `BUGSNAG_RELEASE_STAGE` -- optional, defaults to `config.environment`.
 * `config.bugsnag.endpoints` / `BUGSNAG_ENDPOINTS` -- optional, defaults to what the libraryUrl uses.
 * `config.currentRevision` -- any string representing the current version of the app, e.g. `"1b8ef2c7"` or `"v1.2.4"`, optional.
   * Defaults to the version specified in package.json, e.g. `0.1.0`.
   * This can be set automatically at build time with [ember-git-version](https://github.com/rwjblue/ember-git-version).

### Customization

In order to send additional data along with errors reported to Bugsnag, generate
a utility named `bugsnag`:

```sh
ember g util bugsnag
```

### Custom Diagnostics ([docs](https://docs.bugsnag.com/platforms/browsers/#custom-diagnostics))

To send custom metadata, define a helper method `getMetadata` in the
`app/utils/bugsnag.js` you created. `getMetadata` takes the error and the
container as arguments, e.g.:

```js
export function getMetadata(error, container) {
  return {
    // …some metadata
  };
}
```

`ember-cli-bugsnag` calls this method for every error and reports any data
returned by it to Bugsnag as metadata for the respective error. The returned
metadata should be formatted to correspond with tabs in your interface. E.g.
for an Account tab:

```js
return {
  account: {
    name: "Bugsnag",
    plan: "premium",
    beta_access: true
  }
};
```

### Identifying Users ([docs](https://docs.bugsnag.com/platforms/browsers/#identifying-users))

To correlate a specific user to an error and have the information appear in the
User tab in the Bugsnag UI, send user data with each error data. Define a
helper method `getUser` in the `app/utils/bugsnag.js` you created. `getUser`
takes the container as an argument. For example, if you have a `currentUser`
service that references a `user` model in your app:

```js
import Ember from 'ember';

const {
  getProperties
} = Ember;

export function getUser(owner) {
  const currentUser = owner.lookup('service:current-user').get('user');
  const {
    email,
    id,
    fullName: name
  } = getProperties(currentUser, 'email', 'id', 'fullName');

  return {
    email,
    id,
    name
  };
}
```

### Uploading Sourcemaps ([docs](https://docs.bugsnag.com/api/js-source-map-upload))

Uploading sourcemaps to Bugsnag makes it easier to track down errors in your
code because the stacktrace for each error in the Bugsnag UI highlights the
exact line in your unminified source code. To send sourcemaps to Bugsnag, you can use the
Ember CLI Deploy addon [`ember-cli-deploy-bugsnag`](https://github.com/IcarusWorks/ember-cli-deploy-bugsnag).

### Upgrading to 3.0

ember-cli-bugsnag 3.0 includes some changes to bring this addon in line with the latest from the bugsnag-js library and accompanying documentation.

1. Rename `config.bugsnag.notifyReleaseStages`/`BUGSNAG_NOTIFY_RELEASE` to `config.bugsnag.enabledReleaseStages`/`BUGSNAG_ENABLED_RELEASE`

2. `config.bugsnag.endpoint`/ `BUGSNAG_ENDPOINT` => `config.bugsnag.endpoints`/`BUGSNAG_ENDPOINTS`

3. Rename `getMetaData` =>  `getMetadata` in `app/utils/bugsnag.js`

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
