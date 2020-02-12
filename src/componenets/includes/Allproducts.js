import React from 'react';
import { Jumbotron, Card, CardImg, Row, Col } from 'reactstrap';
import styled from 'styled-components';

export default function AllGames({ games, loading }) {
	if (loading) {
		return <h2> Loading...</h2>;
	}

	let goproduct = (paramA, ParamB) => e => {
		window.location = '/product/' + paramA + '/' + ParamB;
	};

	const HoverText = styled.p`
		color: #000;
		:hover {
			color: #ed1212;
			cursor: pointer;
		}
	`;

	return (
		<div>
			<div className="container">
				{games.map(game => (
					<Jumbotron fluid>
						<Card style={{ padding: 0 }}>
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
									<HoverText onClick={goproduct(game._id, game.image)}>
										<h2>{game.title}</h2>

										<Col sm={{ size: 12, order: 0, offset: 0 }}>
											{' '}
											<h4>{game.description}</h4>
										</Col>
									</HoverText>
								</div>
							</Row>
						</Card>
					</Jumbotron>
				))}
			</div>
		</div>
	);
}
