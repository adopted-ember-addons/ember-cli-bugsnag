/* globals Bugsnag */

define('bugsnag', [], function() {
  'use strict';

  if (typeof FastBoot === 'undefined') {
    return {
      default: Bugsnag
    };
  }

  return { default: undefined };
});
