# Ember-cli-bugsnag

[![Build Status](https://travis-ci.com/adopted-ember-addons/ember-cli-bugsnag.svg)](https://travis-ci.com/adopted-ember-addons/ember-cli-bugsnag) [![Ember Observer Score](https://emberobserver.com/badges/ember-cli-bugsnag.svg)](https://emberobserver.com/addons/ember-cli-bugsnag)
## Installation

Install the addon:

```sh
ember install ember-cli-bugsnag
```

## Configuration

There are two ways to configure `ember-cli-bugsnag`:

1. Add POJO to `config/environment`:

```javascript
{
  bugsnag: {
    apiKey: '',
    notifyReleaseStages: ['production']
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
    notifyReleaseStages: ['production', 'staging'],
    releaseStage: 'staging'
  }
}
```

2. Specify environment variables:

```sh
export BUGSNAG_API_KEY=''
export BUGSNAG_NOTIFY_RELEASE='production,staging'
```

Configuration options:

 * `config.bugsnag.apiKey` / `BUGSNAG_API_KEY` -- **required**
 * `config.bugsnag.notifyReleaseStages` / `BUGSNAG_NOTIFY_RELEASE` -- optional, defaults to `[]` (never notify).
 * `config.bugsnag.releaseStage` / `BUGSNAG_RELEASE_STAGE` -- optional, defaults to `config.environment`.
 * `config.bugsnag.endpoint` / `BUGSNAG_ENDPOINT` -- optional, defaults to what the libraryUrl uses.
 * `config.currentRevision` -- any string representing the current version of the app, e.g. `"1b8ef2c7"` or `"v1.2.4"`, optional.
   * Defaults to the version specified in package.json, e.g. `0.1.0`.
   * This can be set automatically at build time with [ember-git-version](https://github.com/rwjblue/ember-git-version).

## Customization

In order to send additional data along with errors reported to Bugsnag, generate
a utility named `bugsnag`:

```sh
ember g util bugsnag
```

### Custom Diagnostics ([docs](https://docs.bugsnag.com/platforms/browsers/#custom-diagnostics))

To send custom meta data, define a helper method `getMetaData` in the
`app/utils/bugsnag.js` you created. `getMetaData` takes the error and the
container as arguments, e.g.:

```js
export function getMetaData(error, container) {
  return {
    // …some meta data
  };
}
```

`ember-cli-bugsnag` calls this method for every error and reports any data
returned by it to Bugsnag as meta data for the respective error. The returned
metaData should be formatted to correspond with tabs in your interface. E.g.
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
exact line in your unminified source code. To send sourcemaps  Bugsnag, use the
Ember CLI Deploy addon [`ember-cli-deploy-bugsnag`](https://github.com/IcarusWorks/ember-cli-deploy-bugsnag).
