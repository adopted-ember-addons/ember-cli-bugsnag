import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked
  showField = false;

  @action
  actionWithError() {
    this.showField = true;
  }

  get field() {
    return this.lol.lol;
  }
}
