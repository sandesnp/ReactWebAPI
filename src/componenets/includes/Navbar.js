import React, { Component, useState } from 'react';
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
	Button,
	DropdownMenu,
	DropdownItem,
	NavbarText
} from 'reactstrap';
let profileretrieved;

const NAB = props => {
	let state = {
		user: {},
		isLoggedIn: false,
		user: null,
		config: {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		}
	};

	// console.log(localStorage.getItem('token'));
	if (localStorage.getItem('token')) {
		state.isLoggedIn = true;
		profileretrieved = JSON.parse(localStorage.getItem('profile'));
	} else {
		state.LogOrSin = false;
	}
	let handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem('token');
		// history.push('/');
		window.location.reload(false);
		// this.context.router.push('/login');
	};

	let handleLogin = e => {
		window.location = '/login';
	};

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

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
				<Nav>
					{state.isLoggedIn ? (
						<div>
							<NavItem
								style={{ float: 'left', paddingTop: 5, paddingRight: 5 }}
							>
								<NavLink href="#">{profileretrieved.firstname}</NavLink>
							</NavItem>

							{/* href="/abc"
							 */}

							<Button onClick={handleLogout}>Logout</Button>
						</div>
					) : (
						<Button onClick={handleLogin}>Login</Button>
					)}
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default NAB;
