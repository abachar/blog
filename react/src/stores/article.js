import alt from '../alt';
import fetch from 'isomorphic-fetch';

class ArticleStore {
    constructor() {
    }

    getArticles() {
        fetch('/posts')
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            });
    }
}

export default alt.createStore(ArticleStore);