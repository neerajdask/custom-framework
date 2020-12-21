import axios, { AxiosPromise } from 'axios';
// import { UserProps } from './User';

interface HasID {
    id?: number;
}

export class APISync<T extends HasID> {
    constructor(public rootUrl: string) {}

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`);
    }

    save(data: T): AxiosPromise {
        const id = data.id;
        if (id) {
            return axios.put(`${this.rootUrl}/${id}`, data);
        } else {
            return axios.post(`${this.rootUrl}`, data);
        }
    }
}
