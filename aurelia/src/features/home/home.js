import {inject} from 'aurelia-framework';
import {PostService} from '../../services/post';

@inject(PostService)
export class Home {
    constructor(postService) {
        this.filter = '';
        this.posts = [];
        this.postService = postService;
    }

    activate() {
        this.postService
            .findAll()
            .then(posts => this.posts = posts);
    }
}