import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { multiChoice, textQuestion } from '../../test-data/questions';

module('Integration | Component | question-item', function (hooks) {
  setupRenderingTest(hooks);

  test('test quetion input options', async function (assert) {

    // inititial checkbox question
    this.set('quest', { ...multiChoice, multiple: true });
    await render(hbs`<QuestionItem @question={{this.quest}}/>`);
    let questEl = this.element.querySelector('[data-test-question-item]');

    //expecting title of the multiChoice question
    assert.equal(questEl.querySelector('[data-test-question-item-title]').textContent, multiChoice.headline, `Title should show question.headline value`);
    // assert.dom(this.element.querySelector('[data-test-question-item-title]')).hasText(multiChoice.headline);

    //testing description of a non null question.description
    this.set('quest', { ...multiChoice, description: 'Hello world' });
    assert.equal(questEl.querySelector('[data-test-question-item-desc]').textContent, 'Hello world', `Description should show the description of the question when question.description is not null`);

    //testing description of a muitiple select question with null question.description
    this.set('quest', { ...multiChoice, multiple: true, description: null });
    assert.equal(questEl.querySelector('[data-test-question-item-desc]').textContent, 'Wählen Sie alles Zutreffende aus', `Description should show 'Wählen Sie alles Zutreffende aus' when a muitiple select question has null question.description`);

    //testing description of a muitiple select question with null question.description
    this.set('quest', { ...multiChoice, multiple: false, description: null });
    assert.equal(questEl.querySelector('[data-test-question-item-desc]').textContent, 'Wählen Sie eine Antwort aus', `Description should show 'Wählen Sie eine Antwort aus' when a single select question has null question.description`);

    // expecting  number of checkboxes equaling multiChoice.choices.length
    this.set('quest', { ...multiChoice, multiple: true });
    assert.equal(questEl.querySelectorAll('input[type=checkbox]').length, multiChoice.choices.length, `expecting ${multiChoice.choices.length} checkboxes when question is multichoice and multiple select`);

    // expecting  number of radio buttons equaling multiChoice.choices.length
    this.set('quest', { ...multiChoice, multiple: false });
    assert.equal(questEl.querySelectorAll('input[type=radio]').length, multiChoice.choices.length, `expecting ${multiChoice.choices.length} radio buttons when question is multichoice and multiple is false`);

    // expecting  an input when question_type is text and multiline is false
    this.set('quest', { ...textQuestion, multiline: false });
    assert.equal(questEl.querySelectorAll('input').length, 1, `expecting 1 input box when question_type=text and multiline is false`);

    // expecting  a textarea when question_type is text and multiline is true
    this.set('quest', { ...textQuestion, multiline: true });
    assert.equal(questEl.querySelectorAll('textarea').length, 1, `expecting 1 textarea when question_type=text and multiline is true`);
  });
});
