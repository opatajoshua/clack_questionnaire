import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

/**
 * service the manage and track dark mode
 */
export default class DarkModeService extends Service {
  @tracked
  inDarkMode = false;

  initialize() {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      this.inDarkMode = true;
    } else {
      document.documentElement.classList.remove('dark');
      this.inDarkMode = false;
    }
  }

  toggle() {
    console.log('toggle', localStorage.theme, localStorage.theme === 'dark');
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.remove('dark');
      this.inDarkMode = false;
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      this.inDarkMode = true;
      localStorage.theme = 'dark';
    }
  }
}
