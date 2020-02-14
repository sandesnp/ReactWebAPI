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
					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							User CRUD
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem>
								<a href="!#">All User Retrieve</a>
							</DropdownItem>
							<DropdownItem>
								<a href="!#">Update User</a>
							</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>
								<a href="!#">Delete User</a>
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>

					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							Product CRUD
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem>
								<a href="!#">All Product Retrieve</a>
							</DropdownItem>
							<DropdownItem>
								<a href="!#">Product Update</a>
							</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>
								<a href="!#">Product Delete</a>
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>

				<Button onClick={handleLogout}>Logout</Button>
			</Collapse>
		</Navbar>
	);
}
