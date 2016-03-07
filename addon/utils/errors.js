import Ember from 'ember';

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

export default function getError(error) {
	if (!error) {
		return error;
	}

    // Trace exception.
    return Ember.get(error, 'stack') || 
        // Trace ENPP error.
        Ember.get(error, 'responseJSON.result.errors.0.description') || 
        // Trace ENAX error.
        Ember.get(error, 'responseJSON.error-message') || 
        // Trace plain error.
        error; 
}