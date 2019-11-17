import { capitalize } from "@ember/string";

export function getContext(router) {
  const url = router.get("currentURL"); // e.g., /subscription/:id/billing
  const routeName = router.get("currentRouteName"); // e.g., subscription.billing.index

  const firstSegments = routeName.replace(".index", "").replace(/\./g, " ");
  const prettyRouteName = capitalize(firstSegments);

  return prettyRouteName + " (" + routeName + ", " + url + ")";
}

export function generateError(cause, stack) {
  const error = new Error(cause);
  error.stack = stack;
  return error;
}
