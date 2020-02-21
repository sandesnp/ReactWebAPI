import React, { Component } from 'react';
import {
	Jumbotron,
	Button,
	CardImg,
	Card,
	Row,
	Badge,
	Alert
} from 'reactstrap';
import NabBar from './includes/Navbar';
import axios from 'axios';
import MyFooter from './includes/MyFooter';

export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			games: {
				_id: null,
				image: null,
				title: null,
				price: null,
				brand: null,
				description: null,
				product: { productid: null, productimage: null }
			},
			isloggedin: false
		};
	}

	componentDidMount() {
		console.log(this.props.match.params.id);
		//retrieveing product data
		axios
			.get('http://localhost:3001/product/' + this.props.match.params.id)
			.then(response => {
				this.setState({ games: response.data });
				// console.log(this.state.games);
			});
	}

	gopurchase = () => {
		// console.log('abc');

		if (localStorage.getItem('token')) {
			window.location =
				'/product/payment/' +
				this.props.match.params.id +
				'/' +
				this.props.match.params.img +
				'/' +
				this.props.match.params.title;
		} else {
			this.setState({ isloggedin: true });
		}
	};

	render() {
		return (
			<div>
				<NabBar />
				{this.state.isloggedin ? (
					<Alert color="danger">
						<a href="/login" className="alert-link">
							Your are not Logged in! Click here to log in.
						</a>
					</Alert>
				) : (
					<div></div>
				)}
				<div className="container">
					<Jumbotron style={{ paddingBottom: 5 }}>
						<hr className="my-4" />
						<h1 className="display-3">{this.state.games.title}</h1>
						<hr className="my-4" />
						<div className="col-12">
							<Row style={{ marginBottom: 10 }}>
								<Card className="col-4" style={{ padding: 0 }}>
									<CardImg
										width="100%"
										src={`http://localhost:3001/uploads/${this.state.games.image}`}
										alt="Card image cap"
									></CardImg>
								</Card>
								<div className="col-8">
									<h1
										style={{
											backgroundColor: '#9c8d8c',
											paddingBottom: 5
										}}
									>
										price
									</h1>
									<h2>
										<p>
											<Badge>RS {this.state.games.price}</Badge>
										</p>
									</h2>

									<h1
										style={{
											backgroundColor: '#9c8d8c',
											paddingBottom: 5
										}}
									>
										Brand
									</h1>
									<h2>
										<p>
											<Badge>{this.state.games.brand}</Badge>
										</p>
									</h2>
									<Button
										color="primary"
										outline
										onClick={this.gopurchase}
										size="lg"
										block
									>
										<h3>Purchase</h3>
									</Button>
								</div>
							</Row>
							<h1
								style={{
									backgroundColor: '#9c8d8c',
									paddingBottom: 5
								}}
							>
								Description
							</h1>
							<h2 className="text-white bg-dark" style={{ paddingBottom: 5 }}>
								<p>{this.state.games.description}</p>
							</h2>
						</div>
					</Jumbotron>
				</div>
				<MyFooter />
			</div>
		);
	}
}
