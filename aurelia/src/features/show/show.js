import {inject} from 'aurelia-framework'
import {PostService} from '../../services/post'

@inject(PostService)
export class Show {
    constructor(postService) {
        this.postService = postService;
        this.resetComment();
    }

    activate(params) {
        this.postService
            .findByCode(params.code)
            .then(post => this.post = post);
    }

    resetComment() {
        this.comment = {
            author: '',
            content: ''
        };
    }

    sendComment() {
        this.postService
            .addComment(code, self.formComment)
            .then(() => {
                this.post.comments.push({
                    createdAt: new Date(),
                    author: this.comment.author,
                    content: this.comment.content
                });
                this.resetComment();
            });
    }
}