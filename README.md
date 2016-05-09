# Ember-cli-bugsnag

[![Build Status](https://travis-ci.org/twokul/ember-cli-bugsnag.svg)](https://travis-ci.org/twokul/ember-cli-bugsnag)

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
    notifyReleaseStages: ['development', 'production']
  }
}
```

2. Specify environment variables:

```sh
export BUGSNAG_API_KEY=''
export BUGSNAG_NOTIFY_RELEASE='development,production'
```

Configuration options:

 * `config.bugsnag.apiKey` / `BUGSNAG_API_KEY` -- **required**
 * `config.bugsnag.notifyReleaseStages` / `BUGSNAG_NOTIFY_RELEASE` -- optional, defaults to `[]` (never notify)
 * `config.bugsnag.releaseStage` / `BUGSNAG_RELEASE_STAGE` -- optional, defaults to `config.environment`
 * `config.bugsnag.endpoint` / `BUGSNAG_ENDPOINT` -- optional, defaults to what the libraryUrl uses
 * `config.bugsnag.libraryUrl` / `BUGSNAG_LIBRARY_URL` -- optional, defaults to `'https://d2wy8f7a9ursnm.cloudfront.net/bugsnag-2.min.js'`. If you want to lock to a particular version of the Bugsnag reporter, you can set this to, e.g. `'//d2wy8f7a9ursnm.cloudfront.net/bugsnag-2.4.8.min.js'`. See [Bugsnag: Advanced Hosting](https://bugsnag.com/docs/notifiers/js#advanced-hosting)
 * `config.currentRevision` -- any string representing the current version of the app, e.g. `"1b8ef2c7"` or `"v1.2.4"`, optional. [ember-git-version](https://github.com/rwjblue/ember-git-version) provides this automatically.

## Customization

In order to add custom meta data to errors reported to Bugsnag, define a
helper method in `app/utils/bugsnag.js` that takes the error and the container
as arguments, e.g.:

```js
export function getMetaData(error, container) {
  return {
    // …some meta data
  };
}
```

ember-cli-bugsnag calls this method for every error and resports any data
returned by it to Bugsnag as meta data for the respective error. The returned
metaData should be formatted to correspond with tabs in your interface. E.g.
for an account tab

```js
return {
  account: {
    name: "Bugsnag",
    plan: "premium",
    beta_access: true
  }
};
```

See [the Bugsnag docs](https://bugsnag.com/docs/notifiers/js#metadata) for more information.
