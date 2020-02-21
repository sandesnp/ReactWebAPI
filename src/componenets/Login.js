import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Background from '../images/login_background.jpg';
import NabBar from './includes/Navbar';
import MyFooter from './includes/MyFooter';

import {
	Col,
	Form,
	FormGroup,
	Input,
	FormText,
	Button,
	Badge,
	Alert
} from 'reactstrap';

let getToken;

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}
	handleChange = e => {
		// console.log(this.state);
		this.setState({ [e.target.name]: e.target.value });
	};
	submitForm = async e => {
		e.preventDefault();
		await axios
			.post('http://localhost:3001/users/login', this.state)
			.then(response => {
				// console.log(response.data);
				localStorage.setItem('token', response.data.token);
				getToken = {
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
				};

				axios
					.get('http://localhost:3001/users/profile', getToken)
					.then(response => {
						if (response.data.admin) {
							//checks if admin attribute of USER object is true or false
							window.location = '/adminpanal';
						}
					});

				// window.location = '/';
			})
			.catch(err => console.log(err.response));

		this.setState({ email: '', password: '' });
	};

	render() {
		if (localStorage.getItem('token')) {
			return <Redirect to="/" />;
		}
		return (
			<div>
				<NabBar />
				<div className="container">
					<div
						className="jumbotron"
						style={{
							height: 'fit-content',
							backgroundImage: 'url(' + Background + ')',
							backgroundSize: 'cover'
						}}
					>
						<Form>
							<FormGroup style={{ width: '50%', margin: '20px auto' }}>
								<h1>LOGIN</h1>
								<h4>Email</h4>

								<Input
									type="email"
									name="email"
									id="email"
									placeholder="email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
								<h4>Password</h4>
								<Input
									type="password"
									name="password"
									id="password"
									placeholder="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>

								{/* <FormFeedback>You will not be able to see this</FormFeedback> */}
								<Badge color="primary">
									Please enter your Login Information
								</Badge>
								<br />
								<Button
									color="secondary"
									size="lg"
									onClick={this.submitForm}
									style={{ marginTop: 10 }}
								>
									Log In
								</Button>
							</FormGroup>
						</Form>

						<hr style={{ border: '10', backgroundColor: '#000000' }} />
						<Col sm={6} style={{ margin: 'auto' }}>
							<Alert color="primary">
								<a href={'/register'}>Click here to Sign Up!</a>

								<FormText>Sign Up if you havent already!</FormText>
							</Alert>
						</Col>
					</div>
				</div>
				<MyFooter />
			</div>
		);
	}
}
