import Component from '@glimmer/component';
import Ember from 'ember';

export default class ProgressBarComponent extends Component {
  get progressStyle() {
    return Ember.String.htmlSafe(`width: ${Number((this.args.value || 100).toFixed(2))}%`);
  }
}
