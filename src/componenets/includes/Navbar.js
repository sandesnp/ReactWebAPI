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
import axios from 'axios';

let profileretrieved, token;

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

	//retrieveing advertise images
	axios.get('http://localhost:3001/adver/all').then(response => {
		localStorage.setItem('advertisements', JSON.stringify(response.data));
	});

	//retrieveing product data
	axios.get('http://localhost:3001/product/all').then(response => {
		localStorage.setItem('products', JSON.stringify(response.data));
	});

	//retrieving users data if logged in
	if (localStorage.getItem('token')) {
		token = {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		};

		axios.get('http://localhost:3001/users/profile', token).then(response => {
			localStorage.setItem('profile', JSON.stringify(response.data));

			// profileretrieved = JSON.parse(localStorage.getItem('profile'));
		});
	}

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
