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
	DropdownMenu,
	DropdownItem,
	Dropdown,
	NavbarText
} from 'reactstrap';

// let [isOpen, setIsOpen] = useState(0);
let isOpen, setIsOpen;
let toggle = e => setIsOpen(!isOpen);

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>aldjfsjkdjf</div>;
	}
}
