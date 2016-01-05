import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Header extends React.Component {
    render() {
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Blog[React]</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem href="#/">All article</NavItem>
                        <NavItem href="#/create">Create new</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}