var read = function(environment) {
  var config = {};

  if (environment['BUGSNAG_API_KEY']) {
    config['apiKey'] = environment['BUGSNAG_API_KEY'];
  }

  if (environment['BUGSNAG_ENABLED_RELEASE']) {
    config['enabledReleaseStages'] = environment['BUGSNAG_ENABLED_RELEASE'].split(',');
  }

  if (environment['BUGSNAG_RELEASE_STAGE']) {
    config['releaseStage'] = environment['BUGSNAG_RELEASE_STAGE'];
  }

  if (environment['BUGSNAG_ENDPOINTS']) {
    var endpoints = environment['BUGSNAG_ENDPOINTS'].split(',');

    config['endpoints'] = {
      notify: endpoints[0],
      sessions: endpoints[1]
    }
  }

  return config;
};

module.exports = {
  read: read
};
