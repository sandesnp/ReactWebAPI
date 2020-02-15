import React, { Component } from 'react';
import axios from 'axios';
import AdminNabBar from './AdminNab';
import {
	Jumbotron,
	Table,
	Button,
	Container,
	Col,
	Form,
	Alert,
	FormGroup,
	Label,
	FormText,
	Input,
	Badge
} from 'reactstrap';

export default class ProductCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			price: '',
			brand: '',
			description: '',
			image: '',
			isRegistered: false
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
		console.log(this.state);
	};

	handleFileChange = e => {
		const data = new FormData();
		data.append('image', e.target.files[0]);
		axios
			.post('http://localhost:3001/upload', data)
			.then(response => {
				console.log(response.data);
				this.setState({
					image: response.data.filename
				});
			})
			.catch(err => console.log(err.response));
	};

	register = e => {
		e.preventDefault();
		//console.log(this.state);
		axios
			.post('http://localhost:3001/product/', this.state)
			.then(response => {
				this.setState({ isRegistered: true });
				console.log(this.state.isRegistered);
			})
			.catch(err => console.log(err.response));
	};

	handleClearField = e => {
		this.setState({
			title: '',
			price: '',
			brand: '',
			description: '',
			image: '',
			isRegistered: false
		});
	};

	render() {
		return (
			<div style={{ background: '#b7bdb9' }}>
				<AdminNabBar />
				{this.state.isRegistered ? (
					<Alert color="info">
						<h2>Successfully Created a product</h2>
					</Alert>
				) : (
					<div></div>
				)}
				<Jumbotron fluid>
					<Container fluid>
						<h1 className="display-3">Product Create</h1>

						<Form
							action="?"
							method="post"
							style={{ width: '50%', margin: '0 auto' }}
						>
							<FormGroup row>
								<Label for="exampleEmail" sm={3}>
									Title
								</Label>
								<Col sm={9}>
									<Input
										type="text"
										name="title"
										id="title"
										placeholder="Title"
										value={this.state.title}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="examplePassword" sm={3}>
									Price
								</Label>
								<Col sm={9}>
									<Input
										type="number"
										name="price"
										id="price"
										placeholder="Price"
										value={this.state.price}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="examplePassword" sm={3}>
									Brand
								</Label>
								<Col sm={9}>
									<Input
										type="text"
										name="brand"
										id="brand"
										placeholder="Brand"
										value={this.state.brand}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="examplePassword" sm={3}>
									Description
								</Label>
								<Col sm={9}>
									<Input
										type="textarea"
										name="description"
										id="description"
										placeholder="description"
										value={this.state.description}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>

							<FormGroup row>
								<Label for="exampleFile" sm={3}>
									Product Image
								</Label>
								<Col sm={9}>
									<Alert color="primary">
										<Input
											type="file"
											name="profile_image"
											id="profile_image"
											onChange={this.handleFileChange}
										/>
										<FormText color="muted">
											Please select an image from your computer.
										</FormText>
									</Alert>
								</Col>
							</FormGroup>

							<FormGroup check row>
								<Col sm={{ size: 10, offset: 1 }}>
									<Button color="info" onClick={this.register}>
										Submit
									</Button>
									<Button
										color="info"
										style={{ marginLeft: 30 }}
										onClick={this.handleClearField}
									>
										Clear Field
									</Button>
								</Col>
							</FormGroup>
						</Form>
					</Container>
				</Jumbotron>
			</div>
		);
	}
}
