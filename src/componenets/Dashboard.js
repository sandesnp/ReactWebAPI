import React, { Component, useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import RBCarousel from 'react-bootstrap-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
	Row,
	Col,
	Button,
	ButtonGroup,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle
} from 'reactstrap';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import Background01 from '../images/background.jpg';
import Background02 from '../images/login_background.jpg';
import Background03 from '../images/register_background.jpg';
import axios from 'axios';

const styles = { height: 400, width: '100%' };
let token, profileretrieved, advertisementsRetrieved;
let ThreeCard = [];
let DashSlider = [];
let AllProduct = [];

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

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {};

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
	}

	render() {
		const handleOnDragStart = e => e.preventDefault();
		return (
			<div>
				{/*----------------------Section 1 */}
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
				{/*----------------------Section 2 */}
				<Row className="col-12" style={{ marginLeft: 5 }}>
					{ThreeCard.map((card, key) => (
						<Card className="col-4" key={card.id}>
							{' '}
							{/*No key for now*/}
							<CardImg
								top
								width="100%"
								src={`http://localhost:3001/uploads/${card.image}`}
								alt="Card image cap"
							/>
							<CardBody>
								<CardTitle>{card.title}</CardTitle>
								<CardSubtitle>Card subtitle</CardSubtitle>
								<CardText>{card.description}</CardText>
								<Button>Button</Button>
							</CardBody>
						</Card>
					))}
				</Row>
				<br />
				{/*----------------------Section 3 */}
				<div>
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
						{DashSlider.map((slider, key) => (
							<Card className="col-11" key={slider.id} style={{ padding: 0 }}>
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
										<CardTitle>{slider.position}</CardTitle>
									</a>
								</CardBody>
							</Card>
						))}
					</Carousel>
				</div>
				<br />
			</div>
		);
	}
}
