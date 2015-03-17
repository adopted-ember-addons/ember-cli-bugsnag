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

Addon is going to generate couple of files:

+ `.bugsnag` (while that contains `apiKey` that Bugsnag uses to report errors)
+ `bugsnag` initializer to integrate Bugsnag reporting with Ember

## Contributing

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
