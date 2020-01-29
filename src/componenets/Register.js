import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {
	Col,
	Form,
	FormGroup,
	Label,
	FormFeedback,
	FormText,
	Container,
	Jumbotron,
	Button,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input
} from 'reactstrap';
import Axios from 'axios';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			phonenumber: '',
			profile_image: '',
			isRegistered: false,
			selectedFile: null
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
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
					profile_image: response.data.filename
				});
			})
			.catch(err => console.log(err.response));
	};

	register = e => {
		e.preventDefault();
		console.log(this.state);
		axios
			.post('http://localhost:3001/users/signup', this.state)
			.then(response => {
				console.log(response.date);
				localStorage.setItem('token', response.data.token);
				this.setState({
					isRegistered: true
				});
			})
			.catch(err => console.log(err.response));
	};

	render() {
		if (this.state.isRegistered === true) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<div id="mainRegister">
				<div className="container">
					<div
						className="jumbotron"
						style={{ opacity: 0.8, height: 'fit-content' }}
					>
						<Form
							action="?"
							method="post"
							style={{ width: '50%', margin: '0 auto' }}
						>
							<h1> Register</h1>
							<FormGroup row>
								<Label for="exampleEmail" sm={3}>
									Email
								</Label>
								<Col sm={9}>
									<Input
										type="email"
										name="email"
										id="email"
										placeholder="email"
										value={this.state.email}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="examplePassword" sm={3}>
									Password
								</Label>
								<Col sm={9}>
									<Input
										type="password"
										name="password"
										id="password"
										placeholder="password"
										value={this.state.password}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="examplePassword" sm={3}>
									First Name
								</Label>
								<Col sm={9}>
									<Input
										type="text"
										name="firstname"
										id="firstname"
										placeholder="first name"
										value={this.state.firstname}
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
										value={this.state.lastname}
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
										value={this.state.phonenumber}
										onChange={this.handleChange}
									/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="exampleFile" sm={3}>
									Profile Picture
								</Label>
								<Col sm={9}>
									<Input
										type="file"
										name="profile_image"
										id="profile_image"
										onChange={this.handleFileChange}
									/>
									<FormText color="muted">
										Please select an image from your computer.
									</FormText>
								</Col>
							</FormGroup>

							<FormGroup check row>
								<Col sm={{ size: 10, offset: 1 }}>
									<Button outline color="info" onClick={this.register}>
										Submit
									</Button>
								</Col>
								<p style={{ marginTop: 10 }}>
									Go back to <a href={'/'}>Login</a>
								</p>
							</FormGroup>
						</Form>
					</div>
				</div>
			</div>
		);
	}
}
