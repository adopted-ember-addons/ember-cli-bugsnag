export default function readEnvironmentConfiguration(environment) {
  return {
    apiKey: environment['BUGSNAG_API_KEY'],
    notifyReleaseStages: environment['BUGSNAG_NOTIFY_RELEASE'].split(','),
    releaseStage: environment['BUGSNAG_RELEASE_STAGE'],
    endpoint: environment['BUGSNAG_ENDPOINT']
  };
}
