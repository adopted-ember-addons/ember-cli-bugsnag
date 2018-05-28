/* globals bugsnag */

define('bugsnag', [], function() {
  'use strict';

  if (typeof FastBoot === 'undefined') {
    return {
      default: bugsnag
    };
  }

  return { default: undefined };
});
