import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class RadioOptionsComponent extends Component {
  /** generate unique id for inputs group field */
  rGroupId = 'rg-' + guidFor(this);

  @action
  onChange(event) {
    this.args.onChange && this.args.onChange(event.target.value);
  }
}
