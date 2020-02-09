import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RBCarousel from 'react-bootstrap-carousel';
import { Row, Col, Button, ButtonGroup } from 'reactstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import Background01 from '../images/background.jpg';
import Background02 from '../images/login_background.jpg';
import Background03 from '../images/register_background.jpg';
import axios from 'axios';

const styles = { height: 400, width: '100%' };
let token, profileretrieved;

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usersretrieved: profileretrieved
		};

		if (localStorage.getItem('token')) {
			token = {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			};

			axios.get('http://localhost:3001/users/profile', token).then(response => {
				localStorage.setItem('profile', JSON.stringify(response.data));
			});

			profileretrieved = JSON.parse(localStorage.getItem('profile'));
		}
	}

	render() {
		return (
			<div>
				<div
					className="container-fluid"
					style={{
						paddingBottom: 20,
						paddingRight: '50px',
						paddingLeft: '50px'
					}}
				>
					<Row>
						<Col span={12} style={{ marginTop: 20 }}>
							<RBCarousel
								pauseOnVisibility={true}
								slideshowSpeed={2000}
								version={4}
							>
								<div
									style={{
										...styles,
										backgroundImage: 'url(' + Background02 + ')',
										backgroundSize: 'cover'
									}}
								>
									<div className="carousel-center"></div>
									<div className="carousel-center"> </div>
									<div className="carousel-caption">Text</div>
								</div>
								<div
									style={{
										...styles,
										backgroundImage: 'url(' + Background03 + ')',
										backgroundSize: 'cover'
									}}
								>
									<div className="carousel-center"></div>
									<div className="carousel-caption">Text</div>
								</div>
								<div
									style={{
										...styles,
										backgroundImage: 'url(' + Background01 + ')',
										backgroundSize: 'cover'
									}}
								>
									<div className="carousel-center"></div>
									<div className="carousel-caption">Text</div>
								</div>
							</RBCarousel>
						</Col>
					</Row>
				</div>
				<div>
					{localStorage.getItem('token') ? (
						<h3 style={{ color: 'white' }}>{profileretrieved.firstname}</h3>
					) : (
						<h3>No data retrieved</h3>
					)}
				</div>
			</div>
		);
	}
}
