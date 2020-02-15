import React, { Component } from 'react';
import AdminNabBar from './adminComponents/AdminNab';
import { Jumbotron, Container, Table } from 'reactstrap';
import axios from 'axios';
export default class AdminPanal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			users: [],
			config: {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			},
			productcount: '',
			usercount: ''
		};
	}

	async componentDidMount(async) {
		await axios.get('http://localhost:3001/product/all').then(response => {
			let count = 0;
			response.data.forEach(element => {
				count = count + 1;
			});
			this.setState({
				products: response.data,
				productcount: count
			});
		});

		await axios
			.get('http://localhost:3001/users/adminprofileall', this.state.config)
			.then(response => {
				let count = 0;
				response.data.forEach(element => {
					count = count + 1;
				});
				this.setState({
					users: response.data,
					usercount: count
				});
			});
	}

	render() {
		return (
			<div style={{ background: '#b7bdb9' }}>
				<AdminNabBar />
				<Jumbotron fluid>
					<Container fluid>
						<h1 className="display-3">Admin Panal</h1>
						<Table dark>
							<thead>
								<tr>
									<th>#</th>
									<th>Tables</th>
									<th>Total Objects</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td>
										<a href="/adminpanal/usercontrol">User Table</a>
									</td>
									<td>{this.state.usercount}</td>
								</tr>
								<tr>
									<th scope="row">2</th>
									<td>
										<a href="/adminpanal/productcontrol">Product Table</a>
									</td>
									<td>{this.state.productcount}</td>
								</tr>
							</tbody>
						</Table>
					</Container>
				</Jumbotron>
			</div>
		);
	}
}
