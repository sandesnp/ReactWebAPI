import React, { Component, useState, useEffect } from 'react';
import { Jumbotron, Container, Card, CardImg, Row, Col } from 'reactstrap';

export default function AllGames({ games, loading }) {
	if (loading) {
		return <h2> Loading...</h2>;
	}

	return (
		<div>
			<div className="container">
				{games.map(game => (
					<Jumbotron fluid>
						<Card style={{ padding: 0 }} key={game._id}>
							<Row className="col-12">
								<CardImg
									className="col-3"
									style={{ width: 200, float: 'left' }}
									top
									width="100%"
									src={`http://localhost:3001/uploads/${game.image}`}
									alt="Card image cap"
								/>
								<div
									className="col-9"
									style={{ textAlignVertical: 'center', textAlign: 'center' }}
								>
									<a href="#">
										<h2>{game.title}</h2>
									</a>
									<Col sm={{ size: 12, order: 0, offset: 0 }}>
										{' '}
										<h4>{game.description}</h4>
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
