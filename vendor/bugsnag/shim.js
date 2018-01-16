/* globals bugsnag */

define('bugsnag', [], function() {
  'use strict';
  var bugsnagClient = bugsnag;
  if (typeof FastBoot === 'undefined') {
    return {
      default: bugsnagClient
    };
  }

  return { default: undefined };
});
