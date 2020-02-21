import React, { Component } from 'react';
import RBCarousel from 'react-bootstrap-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import NabBar from './includes/Navbar';
import axios from 'axios';
import styled from 'styled-components';
import MyFooter from './includes/MyFooter';

import {
	Row,
	Col,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Jumbotron,
	Alert
} from 'reactstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import Background01 from '../images/dashboardcar1.jpg';
import Background02 from '../images/dashboardcar2.png';
import Background03 from '../images/dashboardcar3.jpg';
import Background04 from '../images/dashboardcar4.jpg';

// import Backgrounddash01 from '../images/dashboard1.jpg';
import Backgrounddash02 from '../images/dashboard2.jpg';
import Backgrounddash03 from '../images/dashboard3.jpg';

const styles = { height: 400, width: '100%' };
let advertisementsRetrieved;
let ThreeCard = [];
let DashSlider = [];

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
		slidesToSlide: 1 // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 2 // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1 // optional, default to 1.
	}
};

const HoverText = styled.p`
	color: #000;
	:hover {
		color: #ed1212;
		cursor: pointer;
	}
`;

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null
		};

		//retrieveing advertise images
		axios.get('http://localhost:3001/adver/all').then(response => {
			localStorage.setItem('advertisements', JSON.stringify(response.data));
		});

		advertisementsRetrieved = JSON.parse(
			localStorage.getItem('advertisements')
		);

		//if advertisementsRetrieved has any objects, for each on its objects and see if it has title 'dashboardcard' and if it does then save on different array.
		if (advertisementsRetrieved) {
			advertisementsRetrieved.forEach(element => {
				if (element.position === 'dashboardcard') {
					ThreeCard.push(element);
				}
				if (element.position === 'dashboardslide') {
					DashSlider.push(element);
				}
			});
		}
		console.log(ThreeCard);
	}

	goAllProduct = () => {
		window.location = '/allproduct';
	};

	render() {
		const handleOnDragStart = e => e.preventDefault();

		return (
			<div>
				<NabBar />
				{this.props.location.state !== undefined ? (
					<Alert color="info">{this.props.location.state.id}</Alert>
				) : (
					<div></div>
				)}

				{/*----------------------Section 1 */}
				<div>
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
								</div>
								<div
									style={{
										...styles,
										backgroundImage: 'url(' + Background03 + ')',
										backgroundSize: 'cover'
									}}
								>
									<div className="carousel-center"></div>
								</div>
								<div
									style={{
										...styles,
										backgroundImage: 'url(' + Background04 + ')',
										backgroundSize: 'cover'
									}}
								>
									<div className="carousel-center"></div>
								</div>
								<div
									style={{
										...styles,
										backgroundImage: 'url(' + Background01 + ')',
										backgroundSize: 'cover'
									}}
								>
									<div className="carousel-center"></div>
								</div>
							</RBCarousel>
						</Col>
					</Row>
				</div>
				{/*----------------------Section 2 */}
				<Jumbotron className="text-white bg-dark">
					<h1 className="display-3">Check out our Wares!</h1>
					<p className="lead">
						We have a great selection of products and we hope to fully satisfy
						the requirements of our customers. Thank you.
					</p>

					<p>
						We offer weekly discount and great prices at festive sales. Don't
						miss your chance to get a great value.
					</p>
					<hr className="my-2" />
				</Jumbotron>

				<Jumbotron
					style={{
						fontFamily: '"Times New Roman", Times, serif',
						fontWeight: 'bold',

						backgroundImage: 'url(' + Backgrounddash03 + ')',
						backgroundSize: 'cover',
						marginBottom: 0
					}}
				>
					<h2 className="text-white bg-dark">
						Gaming requires high permoring gears and essentials for best
						experience. Find out why!
					</h2>
					<br />

					<hr className="my-2" />
					<Row className="col-12" style={{ marginLeft: 5 }}>
						{ThreeCard.map(card => (
							<Card className="col-3" key={card._id} style={{ margin: '2%' }}>
								{' '}
								{/*No key for now*/}
								<CardImg
									top
									width="100%"
									src={`http://localhost:3001/uploads/${card.image}`}
									alt="Card image cap"
								/>
								<CardBody>
									<HoverText onClick={this.goAllProduct}>
										<CardTitle>{card.title}</CardTitle>

										<CardText>{card.description}</CardText>
									</HoverText>
								</CardBody>
							</Card>
						))}
					</Row>
				</Jumbotron>

				{/*----------------------Section 3 */}
				<div>
					<Jumbotron
						style={{
							fontFamily: '"Times New Roman", Times, serif',
							fontWeight: 'bold',

							backgroundImage: 'url(' + Backgrounddash02 + ')',
							backgroundSize: 'cover'
						}}
					>
						<p className="lead">
							<h2 className="text-white bg-dark">Checkout our Selection</h2>
						</p>
						<hr className="my-2" />
						<Carousel
							additionalTransfrom={0}
							arrows
							autoPlaySpeed={3000}
							centerMode={false}
							containerClass="container-with-dots"
							draggable
							infinite
							keyBoardControl
							minimumTouchDrag={80}
							renderButtonGroupOutside={false}
							renderDotsOutside={false}
							responsive={responsive}
							showDots={false}
							slidesToSlide={1}
							swipeable
						>
							{DashSlider.map(slider => (
								<Card
									className="col-11"
									key={slider._id}
									style={{ padding: 0 }}
								>
									{' '}
									{/*No key for now*/}
									<CardImg
										onDragStart={handleOnDragStart}
										top
										width="100%"
										src={`http://localhost:3001/uploads/${slider.image}`}
										alt="Card image cap"
									/>
									<CardBody style={{ padding: 0 }}>
										<a href="/allproduct">
											<CardTitle>Check Products here</CardTitle>
										</a>
									</CardBody>
								</Card>
							))}
						</Carousel>
					</Jumbotron>
				</div>
				<MyFooter />
			</div>
		);
	}
}
