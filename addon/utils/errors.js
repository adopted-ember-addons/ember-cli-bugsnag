import { capitalize } from '@ember/string';

export function getContext(router) {
  var url = router.currentURL;
  var routeName = router.currentRouteName;

  var firstSegments = routeName.replace('.index', '').replace(/\./g, ' ');
  var prettyRouteName = capitalize(firstSegments);

  return prettyRouteName + ' (' + routeName + ', ' + url + ')';
}

export function generateError(cause, stack) {
  var error = new Error(cause);
  error.stack = stack;
  return error;
}
