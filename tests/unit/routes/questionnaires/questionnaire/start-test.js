import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | questionnaires/questionnaire/start', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:questionnaires/questionnaire/start');
    assert.ok(route);
  });
});
