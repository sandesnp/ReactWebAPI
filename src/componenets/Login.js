import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {
	Form,
	FormGroup,
	Label,
	Input,
	FormFeedback,
	FormText,
	Container,
	Jumbotron,
	Button
} from 'reactstrap';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isLoogedIn: false
		};
	}
	handleChange = e => {
		console.log(this.state);
		this.setState({ [e.target.name]: e.target.value });
	};
	submitForm = e => {
		e.preventDefault();
		axios
			.post('http://localhost:3001/users/login', this.state)
			.then(response => {
				console.log(response.data);
				localStorage.setItem('token', response.data.token);
				this.setState({ isLoggedIn: true });
			})
			.catch(err => console.log(err.response));
		this.setState({ email: '', password: '' });
	};

	render() {
		if (this.state.isLoggedIn == true) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<div id="mainLogin">
				<div className="container">
					<div
						className="jumbotron"
						style={{ opacity: 0.8, height: 'fit-content' }}
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
									type="text"
									name="password"
									id="password"
									placeholder="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>

								{/* <FormFeedback>You will not be able to see this</FormFeedback> */}
								<FormText>Please enter your Login Information</FormText>
								<Button
									outline
									color="primary"
									onClick={this.submitForm}
									style={{ marginTop: 10 }}
								>
									Log In
								</Button>
							</FormGroup>
						</Form>

						<hr style={{ border: '10', backgroundColor: '#000000' }} />

						<a href={'/register'}>Click here to Sign Up!</a>

						<FormText>Sign Up if you havent already!</FormText>
					</div>
				</div>
			</div>
		);
	}
}
