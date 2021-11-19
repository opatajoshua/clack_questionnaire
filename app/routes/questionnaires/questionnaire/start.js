import Route from '@ember/routing/route';
import Ember from 'ember';

export default class QuestionnairesQuestionnaireStartRoute extends Route {
  setupController(controller, model) {
    super.setupController(controller, model);
    // reset controller variables incase we load a different questionnaire record
    controller.currentQuestionNumber = 1;
    controller.answers = {};
    controller.error = '';
    controller.prevQuestionNumbers = [];
    controller.sliderClass = Ember.String.htmlSafe(
      'transform: translate3d(0%, 0, 0)'
    );

    // load questions id vs numbers map. this will help to find what question number to easily jump to
    controller.questionIdAndNumberMap = model.questions.reduce(
      (acc, curr, index) => {
        acc[curr.identifier] = index + 1;
        return acc;
      },
      {}
    );
  }
}
