import { CollectionView } from './CollectionView';
import { User, UserProps } from '../models/User';
import { Usershow } from '../views/Usershow';

export class UserList extends CollectionView<User, UserProps> {
    renderItem(model: User, itemParent: Element): void {
        new Usershow(itemParent, model).render();
    }
}
