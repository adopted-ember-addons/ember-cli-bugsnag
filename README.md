# Ember-cli-bugsnag

[![Build Status](https://travis-ci.org/twokul/ember-cli-bugsnag.svg)](https://travis-ci.org/twokul/ember-cli-bugsnag)

## Installation

Install the addon:

```sh
npm install ember-cli-bugsnag --save-dev
```

Run `ember-cli-bugsnag` generator:

```sh
ember g ember-cli-bugsnag
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
