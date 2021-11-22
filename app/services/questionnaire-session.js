import Service from '@ember/service';

/**
 * service just to keep the current filled questionnaire and the provided answers before we move to completion page
 */
export default class QuestionnaireSessionService extends Service {
  currentFilledQuestionnaire = null;
  currentFilledQuestionnaireAnswers = null;
}
