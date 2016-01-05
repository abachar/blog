import React from 'react'

import Header from './header'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}