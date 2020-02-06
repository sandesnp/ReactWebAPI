import React, { Component, useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import href from '../Login';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Dropdown,
	NavbarText,
	Button
} from 'reactstrap';

// let [isOpen, setIsOpen] = useState(0);
let isOpen, setIsOpen;
let toggle = e => setIsOpen(!isOpen);

export default class Navbars extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			isLoggedIn: false,
			config: {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			}
		};

		// console.log(localStorage.getItem('token'));
		if (localStorage.getItem('token')) {
			this.state.isLoggedIn = true;
		} else {
			this.state.LogOrSin = false;
		}
	}

	handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem('token');
		// history.push('/');
		window.location.reload(false);
		// this.context.router.push('/login');
	};

	handleLogin = e => {
		window.location = '/login';
	};

	render() {
		return (
			<Navbar color="light" light expand="md" style={{ marginBottom: 10 }}>
				<NavbarBrand href="/">GameEssential</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="/components/">Home</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">Category</NavLink>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Options
							</DropdownToggle>
							<DropdownMenu right>
								<a href="/google.com/">
									<DropdownItem>Option 1</DropdownItem>
								</a>
								<a href="google.com">
									<DropdownItem>Option 1</DropdownItem>
								</a>
								<DropdownItem divider />
								<a href="google.com">
									<DropdownItem>Option 1</DropdownItem>
								</a>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
					{this.state.isLoggedIn ? (
						<Button onClick={this.handleLogout}>Logout</Button>
					) : (
						<Button onClick={this.handleLogin}>Login</Button>
					)}
				</Collapse>
			</Navbar>
		);
	}
}
