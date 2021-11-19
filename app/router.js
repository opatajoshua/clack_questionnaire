import EmberRouter from '@ember/routing/router';
import config from 'clack-questionnaire/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('questionnaires', function () {
    this.route('questionnaire', { path: '/:questionnaire_id' }, function () {
      this.route('start');
    });
  });
});
