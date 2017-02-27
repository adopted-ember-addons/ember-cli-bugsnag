import Ember from 'ember';
import ExtendableError from './extendable-error';

const { get } = Ember;

class XHRError extends ExtendableError {
  constructor(resource, message = '') {
    super(message);

    if (resource) {
      const method = get(resource, 'method');
      const endpoint = get(resource, 'endpoint');

      Object.defineProperty(this, 'message', {
        configurable: true,
        enumerable : false,
        value : `Error calling: ${method} ${endpoint}`,
        writable : true,
      });
    }

    this.resource = resource;
  }
}

export default XHRError;
