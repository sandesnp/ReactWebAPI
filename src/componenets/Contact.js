import React, { Component } from 'react';
import NabBar from './includes/Navbar';
import { Redirect } from 'react-router-dom';
import MyFooter from './includes/MyFooter';
import {
	Jumbotron,
	Container,
	Col,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Card,
	CardBody,
	Alert
} from 'reactstrap';
import Background from '../images/contact.jpg';

export default class Contact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			iscontacted: null,
			email: '',
			feedback: ''
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleContact = () => {
		if (this.state.email && this.state.feedback) {
			this.setState({ iscontacted: 'gotodash' });
		} else {
			this.setState({ iscontacted: 'stayhere' });
		}
	};
	render() {
		if (this.state.iscontacted === 'gotodash') {
			return (
				<Redirect
					to={{
						pathname: '/',
						state: { id: 'Thank you for your feedback.' }
					}}
				/>
			);
		}

		return (
			<div>
				<NabBar />
				{this.state.iscontacted === 'stayhere' ? (
					<Alert color="danger">
						<h2>Please do not leave the box empty</h2>
					</Alert>
				) : (
					<div></div>
				)}

				<div
					style={{
						height: 'fit-content',
						backgroundImage: 'url(' + Background + ')',

						backgroundPosition: 'center',
						backgroundAttachment: 'fixed'
					}}
				>
					<div style={{ height: 200 }}></div>
				</div>

				<div className="container">
					<Jumbotron fluid>
						<Container fluid>
							<h1 className="text-white bg-dark">Contact us </h1>
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13284.690746245893!2d85.34958793400875!3d27.693473467706877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1581771770318!5m2!1sen!2snp"
								width="90%"
								height="600"
								frameBorder="0"
								style={{ border: 0 }}
								allowFullScreen=""
								title="myframe"
							/>
							<br />
							<Card style={{ marginTop: 50 }}>
								<CardBody>
									<Form>
										<FormGroup row>
											<Label for="exampleEmail" sm={2}>
												Email
											</Label>
											<Col sm={10}>
												<Input
													type="email"
													name="email"
													value={this.state.email}
													onChange={this.handleChange}
													id="exampleEmail"
													placeholder="Email here..."
													required
												/>
											</Col>
										</FormGroup>

										<FormGroup row>
											<Label for="exampleText" sm={2}>
												Feedback
											</Label>
											<Col sm={10}>
												<Input
													type="textarea"
													value={this.state.feedback}
													onChange={this.handleChange}
													name="feedback"
													id="exampleText"
													placeholder="Feedback Here"
													required
												/>
											</Col>
										</FormGroup>

										<FormGroup check row>
											<Col sm={{ size: 10, offset: 2 }}>
												<Button onClick={this.handleContact}>Submit</Button>
											</Col>
										</FormGroup>
									</Form>
								</CardBody>
							</Card>
						</Container>
					</Jumbotron>
				</div>
				<MyFooter />
			</div>
		);
	}
}
