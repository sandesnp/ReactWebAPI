import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import NabBar from './includes/Navbar';
import MyFooter from './includes/MyFooter';
import {
	InputGroup,
	InputGroupAddon,
	Input,
	Jumbotron,
	Container,
	Alert,
	Button,
	Form,
	FormGroup,
	Label,
	Row,
	Col,
	Modal,
	ModalHeader,
	ModalFooter
} from 'reactstrap';
import axios from 'axios';

let ispurchased = false;
let state = {
	cardnumberA: { cardnumberB: '' },
	dobA: { dobB: '' },
	countryA: { countryB: '' },
	locationA: { locationB: '' },
	notEmpty: false
};

let CompleteToken = {
	config: {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
	}
};
export default function Payment(props) {
	const { className } = props;

	const [modal, setModal] = useState(false);

	let handleChange = e => {
		if (e.target.name === 'cardnumber') {
			state.cardnumberA = { cardnumberB: e.target.value };
			console.log(state);
		}
		if (e.target.name === 'dob') {
			state.dobA = { dobB: e.target.value };
			console.log(state);
		}
		if (e.target.name === 'country') {
			state.countryA = { countryB: e.target.value };
			console.log(state);
		}
		if (e.target.name === 'location') {
			state.locationA = { locationB: e.target.value };
			console.log(state);
		}
	};

	const toggle = () => setModal(!modal);

	const UserUpdate = async () => {
		let productMain = await { product: [] };
		await axios
			.get('http://localhost:3001/users/profile', CompleteToken.config)
			.then(response => {
				response.data.product.forEach(element => {
					let productABC = {
						productid: element.productid,
						productname: element.title,
						productimage: element.productimage
					};
					productMain.product.push(productABC);
				});
			});
		let productNext = {
			productid: props.match.params.id,
			productimage: props.match.params.img,
			productname: props.match.params.title
		};
		productMain.product.push(productNext);
		console.log(productMain);

		axios
			.put(
				'http://localhost:3001/users/profile',
				productMain,
				CompleteToken.config
			)
			.catch(err => console.log(err.response));
	};

	const delivery = () => {
		if (
			state.cardnumberA.cardnumberB &&
			state.dobA.dobB &&
			state.countryA.countryB &&
			state.locationA.locationB
		) {
			UserUpdate();
			toggle(); //changes here ><<<<
			ispurchased = true;
		} else {
			state.notEmpty = true;
			console.log(state);
			toggle();
		}
		// ispurchased = true;
	};

	if (ispurchased) {
		return (
			<Redirect
				to={{
					pathname: '/',
					state: { id: 'Successfully Purchased an Item.' }
				}}
			/>
		);
	}

	return (
		<div>
			<NabBar />
			{state.notEmpty ? (
				<Alert color="danger">
					Please provide credential before continuing
				</Alert>
			) : (
				<div></div>
			)}
			<div className="container">
				<Jumbotron fluid>
					<Container fluid>
						<h1 className="text-white bg-dark" style={{ paddingBottom: 5 }}>
							Payment Credential
						</h1>
						<Form>
							<FormGroup
								style={{ marginBottom: 25, backgroundColor: '#5a6270' }}
								tag="fieldset"
								className="font-weight-bold"
								check
							>
								<h2>Payment Method</h2>
								<div className="text-white bg-dark">
									<Col sm={{ size: 'auto', offset: 4 }}>
										<Row>
											<FormGroup>
												<Label check>
													<Input type="radio" name="radio1" required />
													PayPal
												</Label>
											</FormGroup>
											<FormGroup
												style={{ marginRight: 25, marginLeft: 25 }}
												check
											>
												<Label check>
													<Input type="radio" name="radio1" /> Visa
												</Label>
											</FormGroup>
											<FormGroup check>
												<Label check>
													<Input type="radio" name="radio1" /> MasterCard
												</Label>
											</FormGroup>
										</Row>
									</Col>
								</div>
							</FormGroup>

							<InputGroup>
								<InputGroupAddon className="col-2" addonType="prepend">
									Credit Card Number
								</InputGroupAddon>
								<Input required name="cardnumber" onChange={handleChange} />
							</InputGroup>
							<br />
							<InputGroup>
								<InputGroupAddon className="col-2" addonType="prepend">
									Date of Birth
								</InputGroupAddon>
								<Input required name="dob" onChange={handleChange} />
							</InputGroup>
							<br />
							<InputGroup>
								<InputGroupAddon className="col-2" addonType="prepend">
									Country
								</InputGroupAddon>
								<Input required name="country" onChange={handleChange} />
							</InputGroup>
							<br />
							<Button color="secondary" onClick={toggle} size="lg">
								Order
							</Button>

							<Modal isOpen={modal} toggle={toggle} className={className}>
								<ModalHeader toggle={toggle}> Location of Delivery</ModalHeader>

								<InputGroup>
									<InputGroupAddon addonType="prepend">
										Location
									</InputGroupAddon>
									<Input required name="location" onChange={handleChange} />
								</InputGroup>
								<ModalFooter>
									<Button color="primary" onClick={delivery}>
										Deliver Here
									</Button>{' '}
									<Button color="secondary" onClick={toggle}>
										Cancel
									</Button>
								</ModalFooter>
							</Modal>
						</Form>
					</Container>
				</Jumbotron>
			</div>
			<MyFooter />
		</div>
	);
}
