import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | progress-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('testing progress-bar percentage styles', async function (assert) {

    // test beginning progress
    this.set('progress', 0);
    await render(hbs`<ProgressBar @value={{this.progress}} />`);
    let progressEl = this.element.querySelector('[data-test-progress]');
    assert.equal(progressEl.getAttribute('style'), 'width: 0%', 'starts at 0%');

    // test at 50%
    this.set('progress', 50);
    assert.equal(progressEl.getAttribute('style'), 'width: 50%', 'at 50%');

    // test at 100% completion
    this.set('progress', 100);
    assert.equal(progressEl.getAttribute('style'), 'width: 100%', 'ends at 100%');
  });
});
