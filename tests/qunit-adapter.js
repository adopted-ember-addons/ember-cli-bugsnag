import { QUnitAdapter } from 'ember-qunit';
import Ember from 'ember';

const useEmberOnError = true;

export default QUnitAdapter.extend({
  exception(error) {
    if (useEmberOnError) {
      Ember.onerror(error);
      return;
    }

    this._super(...arguments);
  }
});
