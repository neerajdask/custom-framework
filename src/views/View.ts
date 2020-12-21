import { Model } from '../models/Model';

export interface ModelForView {
    on(eventName: string, cb: () => void): void;
}

export abstract class View<T extends Model<K>, K> {
    regions: { [key: string]: Element } = {};
    constructor(public parent: Element, public model: T) {
        this.bindModel();
    }

    regionsMap(): { [key: string]: string } {
        return {};
    }

    abstract template(): string;

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
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

    mapRegions(fragment: DocumentFragment): void {
        const regionMap = this.regionsMap();
        for (let key in regionMap) {
            const selector = regionMap[key];
            const element = fragment.querySelector(selector);
            if (element) {
                this.regions[key] = element;
            }
        }
    }

    onRender(): void {}

    render(): void {
        this.parent.innerHTML = '';
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);

        this.mapRegions(templateElement.content);

        this.onRender();

        this.parent.append(templateElement.content);
    }

    eventsMap(): { [key: string]: () => void } {
        return {};
    }
}
