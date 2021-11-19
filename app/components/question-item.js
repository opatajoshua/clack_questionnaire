import Component from '@glimmer/component';

export default class QuestionItemComponent extends Component {
  get description() {
    if (this.args.question.description) return this.args.question.description;

    if (this.args.question.question_type == 'multiple-choice')
      return this.args.question.multiple === true ||
        this.args.question.multiple === 'true'
        ? 'Wählen Sie alles Zutreffende aus'
        : 'Wählen Sie eine Antwort aus';
    return 'Gib deine Antwort ein.';
  }

  get optionComponentName() {
    if (this.args.question.question_type == 'multiple-choice')
      return this.args.question.multiple === true ||
        this.args.question.multiple === 'true'
        ? 'checkbox-options'
        : 'radio-options';
    if (this.args.question.question_type == 'text') return 'input-option';
    return 'unknown-question-type';
  }
}
