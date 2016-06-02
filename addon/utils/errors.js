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
  }

  // Trace XHR Text error.
  if (!isNone(message = get(error, 'responseText'))) {
    return new XHRError(message);
  }

  // Trace XHR unknown error.
  if (!isNone(message = get(error, 'status'))) {
    const statusText = get(error, 'statusText');

    return new XHRError(`status='${message}' statusText='${statusText}'`);
  }

  return new Error(error);
}
