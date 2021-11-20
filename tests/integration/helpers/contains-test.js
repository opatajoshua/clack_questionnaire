import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { multiChoice } from '../../test-data/questions';

module('Integration | Helper | contains', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set('stack', multiChoice.choices.map(mc=>mc.value));
    this.set('needle', 'Mich ohne Kind');

    await render(hbs`{{contains this.stack this.needle}}`);

    assert.dom(this.element).hasText('true');
  });
});
