import React, { Component } from 'react';
import { Jumbotron, Button, CardImg, Card, Row, Badge } from 'reactstrap';
import NabBar from './includes/Navbar';
import axios from 'axios';

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
				description: null
			}
		};
	}

	componentDidMount() {
		//retrieveing product data
		axios
			.get('http://localhost:3001/product/' + this.props.match.params.id)
			.then(response => {
				this.setState({ games: response.data });
				console.log(this.state.games);
			});
	}

	render() {
		return (
			<div>
				<NabBar />
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
									<p>
										<h2>
											<Badge>RS {this.state.games.price}</Badge>
										</h2>
									</p>

									<h1
										style={{
											backgroundColor: '#9c8d8c',
											paddingBottom: 5
										}}
									>
										Brand
									</h1>
									<p>
										<h2>
											<Badge>{this.state.games.brand}</Badge>
										</h2>
									</p>

									<Button color="primary" size="lg" block>
										<h3 class="font-weight-bold">Purchase</h3>
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
							<p>
								<h2 class="text-white bg-dark" style={{ paddingBottom: 5 }}>
									{this.state.games.description}
								</h2>
							</p>
						</div>
					</Jumbotron>
				</div>
			</div>
		);
	}
}
