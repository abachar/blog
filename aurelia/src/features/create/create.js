import {inject} from 'aurelia-framework'
import {Validation} from 'aurelia-validation'
import {Router} from 'aurelia-router';
import {PostService} from '../../services/post'

@inject(PostService, Validation, Router)
export class Show {
    constructor(postService, validation, router) {
        this.post = {
            title: '',
            author: '',
            content: '',
            tags: ''
        };

        this.router = router;
        this.postService = postService;
        this.validation = validation.on(this.post)
            .ensure('author').isNotEmpty()
            .ensure('title').isNotEmpty()
            .ensure('content').isNotEmpty();
    }

    create() {
        this.validation.validate()
            .then(() => this.postService.create(this.post))
            .then((code) => this.router.navigate('show/' + code))
            .catch(() => this.hasErrors = true);
    }
}