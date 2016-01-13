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
        return this.http.fetch('/')
            .then(response => response.json())
    }

    findByCode() {
        return this.http.fetch('/' + code)
            .then(response => response.json())
    }

    create(post) {
        return this.http.post('/', {
            title: post.title,
            author: post.author,
            content: post.content,
            tags: post.tags
        }).then(response => response.json().code)
    }

    addComment(code, comment) {
        return this.http
            .post('/posts/' + code + '/comments', {
                author: comment.author,
                content: comment.content
            })
    }
}




//"bootstrap": "github:twbs/bootstrap@^3.3.5",
//"font-awesome": "npm:font-awesome@^4.5.0",
//"text": "github:systemjs/plugin-text@^0.0.3"