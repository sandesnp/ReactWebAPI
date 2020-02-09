import React, { Component } from 'react';
import {
	Jumbotron,
	Container,
	Media,
	Button,
	Badge,
	Card,
	CardImg,
	Row,
	Col,
	Pagination,
	PaginationItem,
	PaginationLink
} from 'reactstrap';

let productsAll;
let profileretrieved;
let products = [];
export default class Allproduct extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		productsAll = JSON.parse(localStorage.getItem('products'));
		profileretrieved = JSON.parse(localStorage.getItem('profile'));
	}

	render() {
		return (
			<div>
				<Jumbotron fluid>
					<Container fluid>
						<h1 className="display-3">Browse Products</h1>
						<p className="lead">
							Get the best tools to enchance your gaming performance
						</p>
					</Container>
				</Jumbotron>

				<div className="container">
					{productsAll.map((products, key) => (
						<Jumbotron fluid>
							<Card style={{ padding: 0 }}>
								<Row className="col-12">
									<CardImg
										className="col-3"
										style={{ width: 200, float: 'left' }}
										top
										width="100%"
										src={`http://localhost:3001/uploads/${products.image}`}
										alt="Card image cap"
									/>
									<div
										className="col-9"
										style={{ textAlignVertical: 'center', textAlign: 'center' }}
									>
										<h2>{products.title}</h2>
										<Col sm={{ size: 12, order: 0, offset: 0 }}>
											{' '}
											<h4>{products.description}</h4>
										</Col>
									</div>
								</Row>
							</Card>
						</Jumbotron>
					))}
				</div>
			</div>
		);
	}
}
