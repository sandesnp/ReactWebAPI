import React, { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	Button,
	NavLink,
	NavItem
} from 'reactstrap';

export default function NAB() {
	let handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem('token');
		localStorage.removeItem('profiles');
		localStorage.removeItem('isLoggedIn');

		window.location = '/';
	};

	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar color="light" light expand="md" style={{ marginBottom: 10 }}>
			<NavbarBrand href="/adminpanal">GameEssential Admin Panal</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="mr-auto" navbar>
					<NavItem>
						<NavLink href="/adminpanal/userget">All User Retrieve</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="/adminpanal/userget">All User Retrieve</NavLink>
					</NavItem>
				</Nav>

				<Button onClick={handleLogout}>Logout</Button>
			</Collapse>
		</Navbar>
	);
}
