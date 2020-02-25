import Ember from 'ember';

export function getContext(router) {
  var url = router.get('location').getURL();
  var routeName;
  if(Ember.VERSION >= '2.15') {
    routeName = router.currentRouteName;
  } else {
    routeName = infos[infos.length - 1].name;
  }

  var firstSegments = routeName.replace(".index", "").replace(/\./g, ' ');
  var prettyRouteName = Ember.String.capitalize(firstSegments);

  return prettyRouteName + " (" + routeName + ", " + url + ")";
}

export function generateError(cause, stack) {
  var error = new Error(cause);
  error.stack = stack;
  return error;
}
