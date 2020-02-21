import React, { Component } from 'react';
import ExampleComponent from 'react-rounded-image';
import axios from 'axios';
import MyFooter from './includes/MyFooter';
import NabBar from './includes/Navbar';

import {
	Col,
	Form,
	Alert,
	FormGroup,
	Label,
	FormText,
	Container,
	Jumbotron,
	Button,
	Input
} from 'reactstrap';

export default class UserUpdate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: JSON.parse(localStorage.getItem('profiles')),
			config: {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			}
			//selectedFile: null
		};
	}

	handleChange = e => {
		this.setState({
			users: { ...this.state.users, [e.target.name]: e.target.value }
		});
	};
	handleFileChange = e => {
		const data = new FormData();
		data.append('image', e.target.files[0]);
		axios
			.post('http://localhost:3001/upload', data)
			.then(response => {
				console.log(response.data);
				this.setState({
					users: {
						...this.state.users,
						profile_image: response.data.filename
					}
					// profile_image: response.data.filename
				});
			})
			.catch(err => console.log(err.response));
	};

	update = e => {
		e.preventDefault();
		// console.log(this.state);

		axios
			.put(
				'http://localhost:3001/users/profile',
				this.state.users,
				this.state.config
			)
			.catch(err => console.log(err.response));

		window.location = '/';
	};

	render() {
		return (
			<div>
				<NabBar />
				<Jumbotron fluid className="container">
					<Container fluid>
						<h1 className="display-3">Update Profile</h1>
						<Form
							action="?"
							method="post"
							style={{ width: '50%', margin: '0 auto' }}
						>
							<Col sm="12" md={{ size: 6, offset: 5 }} className="mb-3">
								<ExampleComponent
									image={`http://localhost:3001/uploads/${this.state.users.profile_image}`}
									roundedColor="#66A5CC"
									imageWidth="150"
									imageHeight="150"
									roundedSize="13"
								/>
							</Col>
							<FormGroup row>
								<Label for="examplePassword" sm={3}>
									First Name
								</Label>
								<Col sm={9}>
									<Input
										type="text"
										name="firstname"
										id="firstname"
										value={this.state.users.firstname}
										placeholder="first name"
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="examplePassword" sm={3}>
									Last Name
								</Label>
								<Col sm={9}>
									<Input
										type="text"
										name="lastname"
										id="lastname"
										placeholder="last name"
										value={this.state.users.lastname}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="examplePassword" sm={3}>
									Phone Number
								</Label>
								<Col sm={9}>
									<Input
										type="number"
										name="phonenumber"
										id="phonenumber"
										placeholder="phone number"
										value={this.state.users.phonenumber}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="exampleFile" sm={3}>
									Profile Picture
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
									<Button color="info" outline onClick={this.update}>
										Submit
									</Button>
								</Col>
							</FormGroup>
						</Form>
					</Container>
				</Jumbotron>
				<MyFooter />
			</div>
		);
	}
}
