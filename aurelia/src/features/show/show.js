import {inject} from 'aurelia-framework'
import {Validation} from 'aurelia-validation'
import {PostService} from '../../services/post'

@inject(PostService, Validation)
export class Show {
    constructor(postService, validation) {
        this.resetComment();

        this.postService = postService;
        this.validation = validation.on(this.comment)
            .ensure('author')
              .isNotEmpty()
              .hasLengthBetween(3, 50)
            .ensure('content')
              .isNotEmpty()
              .hasLengthBetween(3, 200);
    }

    activate(params) {
        this.code = params.code;
        this.postService
            .findByCode(params.code)
            .then(post => this.post = post);
    }

    resetComment() {
        this.hasErrors = false;
        this.comment = {
            author: '',
            content: ''
        };
    }

    addComment() {
        this.validation.validate()
            .then(() => this.postService.addComment(this.code, this.comment))
            .then(() => {
                this.post.comments.push({
                    createdAt: new Date(),
                    author: this.comment.author,
                    content: this.comment.content
                });
                this.resetComment();
            })
            .catch(() => this.hasErrors = true);
    }
}