import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class ApplicationController extends Controller {
  @service darkMode;

  @action
  didInsert() {
    this.darkMode.initialize();
  }
}
