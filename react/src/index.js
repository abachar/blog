import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRoute, browserHistory } from 'react-router'

import App from './components/app'
import HomePage from './components/pages/home'
import CreatePage from './components/pages/create'
import ShowPage from './components/pages/show'

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="create" component={CreatePage}/>
            <Route path="show/:code" component={ShowPage}/>
        </Route>
    </Router>,
    document.body
);