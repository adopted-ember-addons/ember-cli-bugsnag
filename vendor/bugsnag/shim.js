/* globals bugsnag */

define('bugsnag', [], function() {
  'use strict';

  if (typeof FastBoot === 'undefined') {
    return {
      default: window.bugsnag
    };
  }

  return { default: undefined };
});
