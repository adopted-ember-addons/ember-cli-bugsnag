export function getMetadata() {
  return {
    account: {
      name: 'Bugsnag',
      plan: 'premium',
      beta_access: true
    },
  };
}

export function getUser() {
  return {
    id: 123,
    name: 'Dummy User',
    email: 'dummy@example.com'
  };
}
