import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Nav, Button } from "reactstrap";
//import "./Navbar.css";
import { Link } from 'react-router-dom';

export default class Sitebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <Navbar id="navbar" expand="md">
                    <NavbarBrand id="navbarheader" href="/">DIYAR Need</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {localStorage.getItem("token") !== null || undefined ? <Button id="logout" onClick={() => this.props.clickLogout()}>Logout</Button> : ""}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}