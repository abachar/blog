import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class PostService {
    constructor(http) {
        http.configure(config => {
            config.withBaseUrl('/posts');
        });

        this.http = http;
    }

    findAll() {
        return this.http
            .fetch('/')
            .then(response => response.json())
    }

    findByCode() {
        return this.http
            .fetch('/' + code)
            .then(response => response.json())
    }
}