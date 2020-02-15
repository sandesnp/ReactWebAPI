import React, { Component } from 'react';
import axios from 'axios';
import AdminNabBar from './AdminNab';

import ModalUpdate from './ModalUpdate';

import { Jumbotron, Table, Button, Container } from 'reactstrap';

export default class UserRetrieve extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showEdit: false,
			users: [],
			config: {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			}
		};
	}

	async componentDidMount(async) {
		await axios
			.get('http://localhost:3001/users/adminall', this.state.config)
			.then(response => {
				this.setState({
					users: response.data
				});
			});
		// console.log(this.state.users);
	}
	render() {
		return (
			<div style={{ background: '#b7bdb9' }}>
				<AdminNabBar />

				<Jumbotron fluid>
					<Container fluid>
						<h1 className="display-3">All Users</h1>
						<Table>
							<thead>
								<tr>
									<th>Email</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Phone Number</th>
									<th>Update</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{this.state.users.map(allusers => (
									<tr>
										<td>{allusers.email}</td>
										<td>{allusers.firstname}</td>
										<td>{allusers.lastname}</td>
										<td>{allusers.phonenumber}</td>
										<td>
											<ModalUpdate allusers={allusers} />
										</td>
										<td>
											{' '}
											<Button color="danger">Delete</Button>{' '}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Container>
				</Jumbotron>
			</div>
		);
	}
}
