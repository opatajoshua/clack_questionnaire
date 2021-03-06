import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Ember from 'ember';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class QuestionnairesQuestionnaireStartController extends Controller {
  @service router;
  @service questionnaireSession;

  /** a map of the loaded question's ids and their number we can jump to
   * this will help to find what question number to easily jump to
   * this will be loaded by route's setup controller
   */
  questionIdAndNumberMap = {};

  /** variable to hold the scroll element (the wrapper div with overflow-y:auto which wraps progress-bar, the questions, and info)
   * this will be called to scroll to top on every question slide since the user can scroll down one question before moving to next
   */
  scrollElement = null;

  /** keeping track of the current number */
  @tracked
  currentQuestionNumber = 1;

  /** variable to hold all answers */
  @tracked
  answers = {};

  /** variable to hold error message */
  @tracked
  error = '';

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
    return this.currentQuestion
      ? this.answers[this.currentQuestion.identifier]
      : null;
  }

  /** returns true if current question is the last question*/
  get isLastQuestion() {
    return this.currentQuestionNumber == this.totalQuestions;
  }

  /** submit button tabIndex is the length of the question choices + 1*/
  get submitTabIndex() {
    return this.currentQuestion.choices
      ? this.currentQuestion.choices.length + 1
      : 2;
  }

  /** back button tabIndex is submitTabIndex + 1*/
  get backTabIndex() {
    return this.submitTabIndex + 1;
  }

  /** puts focus back on current question*/
  focusCurrentQuestion() {
    const questDiv = document.getElementById(
      'quest_' + this.currentQuestion.identifier
    );
    const input =
      questDiv.querySelector('input') || questDiv.querySelector('textarea');
    // console.log('input', input);
    input.focus();
  }

  /** main function that controls the slider*/
  slideToQuestion(qNumber) {
    if (qNumber > this.totalQuestions) {
      console.error('question number is greater than total questions');
      return;
    }
    this.currentQuestionNumber = qNumber;
    this.sliderClass = Ember.String.htmlSafe(
      `transform: translate3d(-${100 * (qNumber - 1)}%, 0, 0)`
    );
    this.scrollElement.scrollTop = '0px';
  }

  /** validates answer for the current question*/
  validateCurrentAnswer() {
    if (!this.currentQuestion) return false;

    // check for required fields
    if (
      // if its required
      (this.currentQuestion.required === true ||
        this.currentQuestion.required === 'true') &&
      // but no answer provided
      (!this.currentAnswer || !this.currentAnswer.length)
    ) {
      // then we display an error
      this.error = 'Diese Frage ist erforderlich.';
      // refocus when we get error
      this.focusCurrentQuestion();
      return false;
    }
    this.error = '';
    return true;
  }

  /** setScrollElement set the slide dom element so we can scroll to top*/
  @action
  setScrollElement(element) {
    this.scrollElement = element;

    // initial question focus
    this.focusCurrentQuestion();

    // we need for refocus whenever we done with sliding
    const slideEl = document.querySelector('#slide-el');
    slideEl.ontransitionend = () => {
      this.focusCurrentQuestion();
    };
  }

  /** function to jump to any question number ahead to current question number */
  @action
  jumpForwardToQuestion(qNumber) {
    if (this.currentQuestionNumber < qNumber) {
      if (!this.validateCurrentAnswer()) return;
      this.prevQuestionNumbers.pushObject(this.currentQuestionNumber);
      this.slideToQuestion(this.currentQuestionNumber + 1);
    }
  }

  /** function to go to the question number */
  @action
  nextQuestion() {
    if (this.currentQuestionNumber < this.totalQuestions) {
      if (!this.validateCurrentAnswer()) return;

      let nextQuestNumb = this.currentQuestionNumber + 1;
      // check for jumps
      if (
        this.currentQuestion.jumps &&
        this.currentQuestion.jumps.length &&
        this.currentAnswer
      ) {
        const jump = this.currentQuestion.jumps.find(
          (e) => e.conditions.find((c) => c.value == this.currentAnswer) != null
        );
        if (jump)
          nextQuestNumb = this.questionIdAndNumberMap[jump.destination.id];
      }
      this.prevQuestionNumbers.pushObject(this.currentQuestionNumber);
      this.slideToQuestion(nextQuestNumb);
    }
    // else if moving from last question then we are done
    else if (this.isLastQuestion) {
      this.questionnaireSession.currentFilledQuestionnaire = this.model;
      this.questionnaireSession.currentFilledQuestionnaireAnswers =
        this.answers;
      this.router.transitionTo(
        'questionnaires.questionnaire.complete',
        this.model
      );
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
    set(this.answers, quest.identifier, value);

    // go to next page if current question is a single select
    if (
      quest.question_type === 'multiple-choice' &&
      (quest.multiple === false || quest.multiple === 'false')
    )
      this.nextQuestion();
  }
}
