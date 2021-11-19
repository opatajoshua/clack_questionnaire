import Component from '@glimmer/component';

export default class ProgressBarComponent extends Component {
  get progressStyle() {
    return `width: ${Number((this.args.value || 100).toFixed(2))}%`;
  }
}
