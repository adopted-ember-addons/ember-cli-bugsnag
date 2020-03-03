import Ember from 'ember';
import resolver from './helpers/resolver';
import {
  setResolver
} from '@ember/test-helpers';
import { start } from 'ember-cli-qunit';

setResolver(resolver);
start({ setupEmberOnerrorValidation: false });

import QUnitAdapter from './qunit-adapter';
Ember.Test.adapter = QUnitAdapter.create();
