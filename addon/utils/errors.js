import Ember from 'ember';
import XHRError from './xhr-error';

const { get, isNone } = Ember;

export function getContext(router) {
  var infos = router.currentState.routerJsState.handlerInfos;

  var url = router.get('location').getURL();
  var routeName = infos[infos.length - 1].name;

  var firstSegments = routeName.replace(".index", "").replace(/\./g, ' ');
  var prettyRouteName = Ember.String.capitalize(firstSegments);

  return prettyRouteName + " (" + routeName + ", " + url + ")";
}

export function generateError(cause, stack) {
  var error = new Error(cause);
  error.stack = stack;
  return error;
}

export function getError(error) {
  if (!error) {
    return new Error();
  }

  let message;

  // Trace XHR JSON error.
  if (!isNone(message = get(error, 'responseJSON'))) {
    return new XHRError(JSON.stringify(message));
  // Trace XHR Text error.
  } else if (!isNone(message = get(error, 'responseText'))) {
    return new XHRError(message);
  // Trace XHR unknown error.
  } else if (!isNone(message = get(error, 'status'))) {
    const statusText = get(error, 'statusText');

    return new XHRError(`status='${message}' statusText='${statusText}'`);
  // Trace JSON objects.
  } else if (typeof error === 'object') {
    try {
      message = JSON.stringify(error);

      return new Error(message);
    } catch(e) {
      // NOOP.
    }
  }

  return new Error(error);
}
