const read = function(environment) {
  const config = {};

  if (environment["BUGSNAG_API_KEY"]) {
    config["apiKey"] = environment["BUGSNAG_API_KEY"];
  }

  if (environment["BUGSNAG_NOTIFY_RELEASE"]) {
    config["notifyReleaseStages"] = environment["BUGSNAG_NOTIFY_RELEASE"].split(
      ","
    );
  }

  if (environment["BUGSNAG_RELEASE_STAGE"]) {
    config["releaseStage"] = environment["BUGSNAG_RELEASE_STAGE"];
  }

  if (environment["BUGSNAG_ENDPOINT"]) {
    config["endpoint"] = environment["BUGSNAG_ENDPOINT"];
  }

  return config;
};

module.exports = {
  read
};
