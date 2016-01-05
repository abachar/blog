import React from 'react'
// import { Input, Button } from 'react-bootstrap';

export class CreatePage extends React.Component {
    submit(ev) {
        ev.preventDefault();
        //if(!this.state.submittable) { return; }

        //TodoListActions.addTask(this.state.content);
        //AddNewTaskFormActions.clearForm();
    }

    render() {
        return (
            <div>
                <h2>Create a new article</h2>

                <p>All fields are required</p>
                <!-- p class="alert alert-danger" ng-if="false">
                    An error occurred when saving the comment
                </p -->
                <form onSubmit={this.submit}>
                    <Input type="text"
                           value={this.state.title}
                           label="Enter content:"
                           bsStyle={this.validationClass()}
                           help={this.state.validationError}
                           hasFeedback
                           onChange={this.changeContent} />

                    <Button type="submit" bsStyle="primary"
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