import { View } from './View';
import { User, UserProps } from '../models/User';
import { UserForm } from '../views/UserForm';
import { Usershow } from '../views/Usershow';

export class UserEdit extends View<User, UserProps> {
    regionsMap(): { [key: string]: string } {
        return {
            userShow: '.user-show',
            userForm: '.user-form',
        };
    }
    template(): string {
        return `
        <div>
            <div class="user-detail"></div>
            <div class="user-form"></div>
        </div>`;
    }

    onRender(): void {
        const userShow = new Usershow(
            this.regions.userShow,
            this.model
        );
        userShow.render();

        const userForm = new UserForm(
            this.regions.userForm,
            this.model
        );
        userForm.render();
    }
}
