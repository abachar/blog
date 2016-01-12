import React from 'react'
import { Input } from 'react-bootstrap';
// import { findDOMNode } from 'react-dom'

import ArticleSummary from 'components/article-summary.js'

export default class HomePage extends React.Component {
    //constructor(props) {
    //    super(props);
    // Replace this by ::this._onChangeFilter in onChange
    // this._onChangeFilter = this._onChangeFilter.bind(this);
    //}

    _onChangeFilter() {
        //const { dispatch } = this.props;
        //const email = findDOMNode(this.refs.email).value;
        //const password = findDOMNode(this.refs.password).value;
        //dispatch(manualLogin({
        //    email: email,
        //    password: password
        //}));
    }

    componentWillMount () {
        ArticleActions.getDealers();
    }

    render() {
        const articles = this.props.articles ?
            this.props.articles.map((article) => <ArticleSummary article={article}/>) : null;

        return (
            <div>
                <h2>Blog</h2>
                <Input type="text" ref="filter" placeholder="Filter by tags" onChange={this._onChangeFilter}/>

                <section className="articles">{articles}</section>
            </div>
        )
    }
}