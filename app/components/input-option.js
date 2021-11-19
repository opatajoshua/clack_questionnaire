import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class InputOptionComponent extends Component {
  /** getter to to check whether to use input or text area */
  get isInput() {
    return (
      this.args.question.multiline === false ||
      this.args.question.multiline === 'false'
    );
  }

  @action
  onChange(e) {
    this.args.onChange && this.args.onChange(event.target.value);
  }
}
