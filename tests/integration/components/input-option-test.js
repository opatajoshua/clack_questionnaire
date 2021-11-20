import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { textQuestion } from '../../test-data/questions';

module('Integration | Component | input-option', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('quest', { ...textQuestion });
    await render(hbs`<InputOption @question={{this.quest}}/>`);
    let inputEl = this.element;

    // expecting  an input when question_type is text and multiline is false
    this.set('quest', { ...textQuestion, multiline: false });
    assert.equal(inputEl.querySelectorAll('input').length, 1, `expecting a input box when question_type=text and multiline is false`);

    // expecting  a textarea when question_type is text and multiline is true
    this.set('quest', { ...textQuestion, multiline: true });
    assert.equal(inputEl.querySelectorAll('textarea').length, 1, `expecting a textarea when question_type=text and multiline is true`);
  });
});
