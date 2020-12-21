import { User } from '../models/User';

export class UserForm {
    constructor(public parent: Element, public model: User) {}

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeClick,
        };
    }

    onSetAgeClick() {
        console.log('Hi there: SET AGE');
    }

    onButtonClick(): void {
        console.log('Hi there');
    }

    template(): string {
        return `
         <div>
            <h1>UserForm</h1>
            <div>Name: ${this.model.get('name')}</div>
            <div>Age: ${this.model.get('age')}</div>
            <input/>
            <button>Click me</button>
            <button class="set-age">Set Random Age</button>
         </div>`;
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':'); // Destructuring
            fragment.querySelectorAll(selector).forEach((element) => {
                element.addEventListener(
                    eventName,
                    eventsMap[eventKey]
                );
            });
        }
    }

    render(): void {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}
