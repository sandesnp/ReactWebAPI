import React, { Component } from 'react';
import NabBar from './includes/Navbar';
import axios from 'axios';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Row,
	CardLink,
	Jumbotron,
	Container,
	Button
} from 'reactstrap';

let CompleteToken = {
	config: {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
	}
};

export default class MyPurchase extends Component {
	constructor(props) {
		super(props);
		this.state = { product: [] };
	}

	async componentDidMount(async) {
		await axios
			.get('http://localhost:3001/users/profile', CompleteToken.config)
			.then(response => {
				this.setState({ product: response.data.product });
			});
		console.log(this.state.product);
	}

	render() {
		if (!this.state.product) {
			return (
				<div>
					<NabBar />
					<div>
						<Jumbotron fluid>
							<Container fluid>
								<h1 className="display-3">Fluid jumbotron</h1>
								<p className="lead">
									This is a modified jumbotron that occupies the entire
									horizontal space of its parent.
								</p>
							</Container>
						</Jumbotron>
					</div>
				</div>
			);
		}
		return (
			<div>
				<NabBar />
				<div className="container">
					<Jumbotron fluid>
						<Container fluid>
							<h1 className="display-3">My Purchases</h1>
							<br />
							<Row className="col-12" style={{ marginLeft: 20 }}>
								{this.state.product.map(myproducts => (
									<Card
										className="col-3"
										style={{ margin: 10 }}
										key={myproducts.productid}
									>
										{' '}
										{/*No key for now*/}
										<CardImg
											top
											width="100%"
											src={`http://localhost:3001/uploads/${myproducts.productimage}`}
											alt="Card image cap"
										/>
										<CardBody>
											<CardSubtitle>
												<a
													href={
														'/product/' +
														myproducts.productid +
														'/' +
														myproducts.productid +
														'/' +
														myproducts.productname
													}
												>
													{myproducts.productname}
												</a>
											</CardSubtitle>
										</CardBody>
									</Card>
								))}
							</Row>
						</Container>
					</Jumbotron>
				</div>
			</div>
		);
	}
}
