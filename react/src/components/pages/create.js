import React from 'react'
import { Input, Button } from 'react-bootstrap';
import CreateArticleStore  from 'stores/create-article'
import CreateArticleActions  from 'actions/create-article'

export default class CreatePage extends React.Component {
    constructor(props) {
        super(props);

        // let { shouldComponentUpdate } = React.addons.PureRenderMixin;

        this.state = CreateArticleStore.getState();

        // this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.formChanged = this.formChanged.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        CreateArticleStore.listen(this.formChanged);
    }

    componentWillUnmount() {
        CreateArticleStore.unlisten(this.formChanged);
    }

    formChanged(formState) {
        this.setState(formState);
    }

    changeContent(ev) {
        CreateArticleActions.changeContent(ev.target.value);
    }

    submit(ev) {
        ev.preventDefault();
        if (!this.state.submittable) {
            return;
        }

        //TodoListActions.addTask(this.state.content);
        CreateArticleActions.clear();
    }

    render() {
        return (
            <div>
                <h2>Create a new article</h2>

                <p>All fields are required</p>
                {/* <p class="alert alert-danger" ng-if="false">
                    An error occurred when saving the comment
                </p> */}
                <form onSubmit={this.submit}>
                    <Input key="articleTitle"
                           type="text"
                           value={this.state.title}
                           label="Title *"
                           help={this.state.validationError}
                           hasFeedback
                           onChange={this.changeContent} />

                    <Button key="createButton" type="submit" bsStyle="primary"
                            disabled={!this.state.submittable}>Create</Button>
                </form>
            </div>
        )
    }
}

/*


 <div class="form-group" ng-class="{'has-error' : createForm.title.$invalid && !createForm.title.$pristine}">
 <label class="control-label">Title *</label>
 <input type="text" class="form-control" name="title" ng-model="createCtrl.formPost.title" required />
 <p ng-show="createForm.title.$invalid && !createForm.title.$pristine"
 class="help-block">The title is required.</p>
 </div>

 <div class="form-group" ng-class="{'has-error' : createForm.author.$invalid && !createForm.author.$pristine}">
 <label class="control-label">Your name *</label>
 <input type="text" class="form-control" name="author" ng-model="createCtrl.formPost.author" required />
 <p ng-show="createForm.author.$invalid && !createForm.author.$pristine"
 class="help-block">Your name is required.</p>
 </div>

 <div class="form-group">
 <label class="control-label">Tags</label>
 <input type="text" class="form-control" ng-model="createCtrl.formPost.tags" />
 </div>

 <div class="form-group" ng-class="{'has-error' : createForm.content.$invalid && !createForm.content.$pristine}">
 <label class="control-label">Content *</label>
 <textarea class="form-control" name="content" rows="4" ng-model="createCtrl.formPost.content" required />
 <p ng-show="createForm.content.$invalid && !createForm.content.$pristine"
 class="help-block">The content is required.</p>
 </div>

 <div class="form-group">
 */