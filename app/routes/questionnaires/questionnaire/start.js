import Route from '@ember/routing/route';
import Ember from 'ember';

export default class QuestionnairesQuestionnaireStartRoute extends Route {
    setupController(controller, model) {
        super.setupController(controller, model);
        // reset controller variables incase we load a different questionnaire record
        this.controller.currentQuestionNumber = 1;
        this.controller.answers = {};
        this.controller.error = "";
        this.controller.prevQuestionNumbers = [];
        this.controller.sliderClass = Ember.String.htmlSafe('transform: translate3d(0%, 0, 0)');
    }
}
