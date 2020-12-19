import { User } from './models/User';

const user = new User({ name: 'Alex', age: 20 });

console.log(user.get('name'));

user.set({
    name: 'Fawks',
    age: 25,
});

console.log(user);
