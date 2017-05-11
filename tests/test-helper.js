import Ember from 'ember';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import { start } from 'ember-cli-qunit';

setResolver(resolver);
start();

import QUnitAdapter from './qunit-adapter';
Ember.Test.adapter = QUnitAdapter.create();
