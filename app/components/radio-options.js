import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class RadioOptionsComponent extends Component {
  /** generate unique id for inputs group field */
  rGroupId = 'rg-' + guidFor(this);

  /**
   * splitted onClick and onKeyup instead of onchange because arrow keys up and down also calls onchange
   * @param {*} event 
   */
  @action
  onClick(event) {
    if (event.type === 'click' && event.clientX !== 0 && event.clientY !== 0) {
      this.args.onChange && this.args.onChange(event.target.value);
    }
  }

  @action
  onKeyUp(event) {
    // onchange when enter is pressed
    if (event.keyCode === 13) {
      this.args.onChange && this.args.onChange(event.target.value);
    }
  }
}
