import ExtendableError from './extendable-error';

class XHRError extends ExtendableError {
  constructor(method, endpoint, message = '') {
    super(message);

    if (endpoint && method) {
      Object.defineProperty(this, 'message', {
        configurable: true,
        enumerable : false,
        value : `Error calling: ${method} ${endpoint}`,
        writable : true,
      });
    }
  }
}

export default XHRError;
