import React from 'react'
import { IndexLink, Link } from 'react-router'

export class App extends React.Component {
    render() {
        return (
            <header className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Blog[React]</Link>
                    </div>
                    <nav className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><IndexLink to="/" className="create" activeClassName="active">All posts</IndexLink></li>
                            <li><Link to="/create" className="go-home" activeClassName="active">Create new</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

