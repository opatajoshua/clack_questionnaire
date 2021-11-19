import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class CheckboxOptionsComponent extends Component {
    /** generate unique id for inputs group field */
    cGroupId = 'cg-' + guidFor(this);

    @action
    onChange(event) {
        if (!this.args.onChange) return;

        // if no value
        if (!this.args.value || !this.args.value.length) {
            this.args.onChange([event.target.value]);
        } else {
            // when there is
            if (this.args.value.includes(event.target.value)) {
                this.args.onChange(
                    this.args.value.filter((i) => i != event.target.value)
                );
            } else {
                this.args.onChange([...this.args.value, event.target.value]);
            }
        }
    }
}
