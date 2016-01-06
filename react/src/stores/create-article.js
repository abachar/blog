import alt from '../alt';
import CreateArticleActions from 'actions/create-article';

class CreateArticleStore {
    constructor() {
        this.validationError = '';
        this.title = '';
        this.submittable = false;

        let { changeContent, clear } = CreateArticleActions;
        this.bindListeners({changeContent, clear});
    }

    changeContent(title) {
        let validationError = this.validate(title),
            submittable = validationError.length === 0;

        this.setState({
            validationError,
            title: title,
            submittable
        });
    }

    clear() {
        this.setState({
            validationError: '',
            content: '',
            submittable: false
        });
    }

    validate(title) {
        return (title.length > 3) ? '' : 'Task content have to be longer than 3 characters.';
    }
}

export default alt.createStore(CreateArticleStore);