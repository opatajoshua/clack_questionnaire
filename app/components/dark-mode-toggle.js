import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DarkModeToggleComponent extends Component {
    @service darkMode;

    @action
    toggle(){
        this.darkMode.toggle();
    }
}
