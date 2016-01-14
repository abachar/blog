import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class PostService {
    constructor(http) {
        http.configure(config => {
            config
                .withBaseUrl('/posts')
                .withDefaults({
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
        });

        this.http = http;
    }

    findAll() {
        return this.http.fetch('/')
            .then(response => response.json())
    }

    findByCode(code) {
        return this.http.fetch('/' + code)
            .then(response => response.json())
    }

    create(post) {
        return this.http
            .fetch('', {method: 'post', body: JSON.stringify(post)})
            .then(response => response.json().code)
    }

    addComment(code, comment) {
        return this.http
            .fetch('/' + code + '/comments', {method: 'post', body: JSON.stringify(comment)})
    }
}