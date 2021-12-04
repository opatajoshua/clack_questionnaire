import Route from '@ember/routing/route';

export default class QuestionnairesQuestionnaireRoute extends Route {
  model({ questionnaire_id } = {}) {
    return this.store.findRecord('questionnaire', questionnaire_id);
  }
}
