import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | questionnaire-session', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:questionnaire-session');
    assert.ok(service);
  });
});
