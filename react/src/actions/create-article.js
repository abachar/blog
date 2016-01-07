import alt from '../alt';
// import Immutable   from 'immutable';

// import 'es6-promise';
// import fetch from 'isomorphic-fetch';

// https://github.com/choonkending/react-webpack-node/blob/master/app/actions/users.js
// http://reactkungfu.com/2015/07/react-with-flux-by-example-simple-todo-list-dissected/
// https://github.com/arkency/react_flux_alt_immutable_todolist/blob/master/src/components/AddNewTaskForm.js

/*class CreateArticleActions {
    changeContent(content) {
        return content;
    }

    clear() {
        return null;
    }
}

export default alt.createActions(CreateArticleActions);*/
export default alt.generateActions('changeContent', 'clear');