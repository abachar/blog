import React from 'react'

import Header from './header'

export class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div class="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}