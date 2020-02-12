import React, { useState } from 'react';
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
	DropdownItem
} from 'reactstrap';
import axios from 'axios';
let profileretrieved, token;

export default function NAB() {
	let state = {
		user: { firstname: null },
		isLoggedIn: false,
		config: {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		}
	};

	let handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem('token');
		localStorage.removeItem('profiles');
		localStorage.removeItem('isLoggedIn');
		// history.push('/');
		// window.location.reload(false);
		// this.context.router.push('/login');
		window.location = '/';
	};

	//retrieving users data if logged in
	if (localStorage.getItem('token')) {
		state.isLoggedIn = true;

		if (!profileretrieved) {
			token = {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			};
			axios.get('http://localhost:3001/users/profile', token).then(response => {
				localStorage.setItem('profiles', JSON.stringify(response.data));
			});
			profileretrieved = JSON.parse(localStorage.getItem('profiles'));
		}
	} else {
		state.LogOrSin = false;
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
						<NavLink href="/">Home</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/allproduct">Products</NavLink>
					</NavItem>
					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							My Purchase
						</DropdownToggle>
						<DropdownMenu right>
							{profileretrieved ? (
								<div>
									<DropdownItem>
										<a href="/user/purchase">My Purchases</a>
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem>
										<a href="/user">My Profile</a>
									</DropdownItem>
								</div>
							) : (
								<div>
									<DropdownItem disabled>
										<a href="/user/purchase">My Purchases</a>
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem disabled>
										<a href="/user">My Profile</a>
									</DropdownItem>
								</div>
							)}
						</DropdownMenu>
					</UncontrolledDropdown>
					<NavItem>
						<NavLink href="#">Contact</NavLink>
					</NavItem>
				</Nav>
				<Nav>
					{profileretrieved ? (
						<div>
							<NavItem
								style={{ float: 'left', paddingTop: 5, paddingRight: 5 }}
							>
								<NavLink href="/user"> {profileretrieved.email}</NavLink>
							</NavItem>

							<Button onClick={handleLogout}>Logout</Button>
						</div>
					) : (
						<Button onClick={handleLogin}>Login</Button>
					)}
				</Nav>
			</Collapse>
		</Navbar>
	);
}
