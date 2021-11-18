import Route from '@ember/routing/route';
import questionnaireExample from 'clack-questionnaire/data-example/questionnaire';

export default class QuestionnairesQuestionnaireRoute extends Route {
    model({questionnaire_id} = {}) {
        return questionnaireExample.questionnaire;
    }
}
