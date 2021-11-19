import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Ember from 'ember';

export default class QuestionnairesQuestionnaireStartController extends Controller {
  /** a map of the loaded question's ids and their number we can jump to
   * this will help to find what question number to easily jump to
   * this will be loaded by route's setup controller
  */
  questionIdAndNumberMap = {};

  /** keeping track of the current number */
  @tracked
  currentQuestionNumber = 1;

  /** variable to hold all answers */
  @tracked
  answers = {};

  /** variable to hold error message */
  @tracked
  error = "";

  /** since its possible to jump we need to keep track of the answered questions in their order
   * so that when back button is click we can go to only the questions user previously answered
   */
  @tracked
  prevQuestionNumbers = [];

  /** css class for the slider to slide left or right based on the current question number */
  @tracked
  sliderClass = Ember.String.htmlSafe('transform: translate3d(0%, 0, 0)');

  /** getter for the number of questions the current questionnaire has */
  get totalQuestions() {
    return this.model.questions.length;
  }

  /** calculating the progress of our user*/
  get progress() {
    return (this.currentQuestionNumber / this.totalQuestions) * 100;
  }

  /** getter for current question*/
  get currentQuestion() {
    return this.model.questions[this.currentQuestionNumber - 1];
  }

  /** gets answer for current question*/
  get currentAnswer() {
    return this.currentQuestion ? this.answers[this.currentQuestion.identifier] : null;
  }

  /** main function that controls the slider*/
  slideToQuestion(qNumber) {
    if (qNumber > this.totalQuestions) {
      console.error('question number is greater than total questions');
      return;
    }
    this.currentQuestionNumber = qNumber;
    this.sliderClass = Ember.String.htmlSafe(`transform: translate3d(-${100 * (qNumber - 1)}%, 0, 0)`);
  }

  /** validates answer for the current question*/
  validateCurrentAnswer() {
    if (!this.currentQuestion)
      return false;

    // check for required fields
    if ((this.currentQuestion.required === true || this.currentQuestion.required === 'true') && (!this.currentAnswer && this.currentAnswer != 0)) {
      this.error = "Diese Frage ist erforderlich."
      return false;
    }
    this.error = ""
    return true;
  }

  /** function to jump to any question number ahead to current question number */
  @action
  jumpForwardToQuestion(qNumber) {
    if (this.currentQuestionNumber < qNumber) {
      if (!this.validateCurrentAnswer())
        return;
      this.prevQuestionNumbers.pushObject(this.currentQuestionNumber);
      this.slideToQuestion(this.currentQuestionNumber + 1);
    }
  }

  /** function to go to the question number */
  @action
  nextQuestion() {
    if (this.currentQuestionNumber < this.totalQuestions) {
      if (!this.validateCurrentAnswer())
        return;

      let nextQuestNumb = this.currentQuestionNumber + 1
      // check for jumps
      if (this.currentQuestion.jumps && this.currentQuestion.jumps.length && this.currentAnswer) {
        const jump = this.currentQuestion.jumps.find(e => e.conditions.find(c => c.value == this.currentAnswer) != null)
        if (jump)
          nextQuestNumb = this.questionIdAndNumberMap[jump.destination.id]
      }
      this.prevQuestionNumbers.pushObject(this.currentQuestionNumber);
      this.slideToQuestion(nextQuestNumb);
    }
  }

  /** function to go back to previous questions the question number */
  @action
  prevQuestion() {
    if (this.prevQuestionNumbers.length)
      this.slideToQuestion(this.prevQuestionNumbers.popObject());
  }

  /** sets question answers when an input is changed */
  @action
  onAnswer(quest, value) {
    this.answers = { ...this.answers, [quest.identifier]: value };

    // go to next page if current question is a single select
    if (quest.question_type === 'multiple-choice' && (quest.multiple === false || quest.multiple === 'false'))
      this.nextQuestion();
  }
}
