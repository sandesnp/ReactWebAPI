import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RBCarousel from 'react-bootstrap-carousel';
import { Row, Col, Button, ButtonGroup } from 'reactstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import Background01 from '../images/background.jpg';
import Background02 from '../images/login_background.jpg';
import Background03 from '../images/register_background.jpg';

const styles = { height: 400, width: '100%' };

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="container-fluid" style={{ paddingBottom: 20 }}>
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
		);
	}
}
