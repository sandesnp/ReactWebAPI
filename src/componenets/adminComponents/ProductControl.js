import React, { Component } from 'react';
import axios from 'axios';
import AdminNabBar from './AdminNab';
import { Jumbotron, Table, Button, Container } from 'reactstrap';
import ModalProductUpdate from './ModalProductUpdate';

export default class ProductControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			config: {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			}
		};
	}

	async componentDidMount(async) {
		await axios.get('http://localhost:3001/product/all').then(response => {
			this.setState({
				products: response.data
			});
		});
		// console.log(this.state.users);
	}

	handledelete = propA => () => {
		axios
			.delete(
				'http://localhost:3001/users/adminprofiledelete/' + propA,
				this.state.config
			)
			.then(response => {
				window.location.reload(false);
			})
			.catch(err => console.log(err.response));
		console.log(propA);
	};

	render() {
		return (
			<div style={{ background: '#b7bdb9' }}>
				<AdminNabBar />

				<Jumbotron fluid>
					<Container fluid>
						<h1 className="display-3">PRODUCT CONTROL</h1>
						<Table>
							<thead>
								<tr>
									<th>Title</th>
									<th> Price</th>
									<th>Brand</th>
									<th>Description</th>
									<th>Update</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{this.state.products.map(allproducts => (
									<tr>
										<td>{allproducts.title}</td>
										<td>{allproducts.price}</td>
										<td>{allproducts.brand}</td>
										<td>{allproducts.description}</td>
										<td>
											<ModalProductUpdate allproducts={allproducts} />
										</td>
										<td>
											{' '}
											<Button
												color="danger"
												//onClick={this.handledelete(allproducts._id)}
											>
												Delete
											</Button>{' '}
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
