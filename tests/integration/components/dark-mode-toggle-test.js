import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | dark-mode-toggle', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    let darkModeService = this.owner.lookup('service:dark-mode');

    // test for dark mode label
    darkModeService.inDarkMode = true;
    await render(hbs`<DarkModeToggle />`);
    assert.dom(this.element).hasText('Light mode');

    darkModeService.inDarkMode = false;
    await render(hbs`<DarkModeToggle />`);
    assert.dom(this.element).hasText('Dark mode');
  });
});
