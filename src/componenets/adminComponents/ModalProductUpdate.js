import React, { useState } from 'react';
import ExampleComponent from 'react-rounded-image';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Col,
	Form,
	Alert,
	FormGroup,
	Label,
	FormText,
	Input
} from 'reactstrap';
import axios from 'axios';

export default function ModalProductUpdate(allproducts) {
	const [modal, setModal] = useState(false);
	const [products, setproducts] = useState(allproducts.allproducts);
	const [config] = useState({
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
	});
	const toggle = () => {
		setModal(!modal);
		// console.log(users);
	};

	const handleChange = e => {
		if (e.target.name === 'title') {
			setproducts({
				_id: products._id,
				title: e.target.value,
				price: products.price,
				brand: products.brand,
				description: products.description
			});
		}

		if (e.target.name === 'price') {
			setproducts({
				_id: products._id,
				title: products.title,
				price: e.target.value,
				brand: products.brand,
				description: products.description
			});
		}

		if (e.target.name === 'brand') {
			setproducts({
				_id: products._id,
				title: products.title,
				price: products.price,
				brand: e.target.value,
				description: products.description
			});
		}
		if (e.target.name === 'description') {
			setproducts({
				_id: products._id,
				title: products.title,
				price: products.price,
				brand: products.brand,
				description: e.target.value
			});
		}

		console.log(products);
	};
	const handleFileChange = e => {
		const data = new FormData();
		data.append('image', e.target.files[0]);
		axios
			.post('http://localhost:3001/upload', data)
			.then(response => {
				// console.log(response.data);

				setproducts({
					_id: products._id,
					title: products.title,
					price: products.price,
					brand: products.brand,
					description: products.description,
					image: response.data.filename
				});
			})
			.catch(err => console.log(err.response));
	};

	const update = async e => {
		console.log(config);
		e.preventDefault();
		// console.log(this.state);
		// console.log(users);
		await axios
			.put('http://localhost:3001/product/adminproductupdate', products, config)
			.then(response => {
				toggle();
				window.location.reload(false);
			})
			.catch(err => console.log(err.response));
	};

	return (
		<div>
			<Button color="primary" onClick={toggle}>
				Update
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Edit Product</ModalHeader>
				<ModalBody>
					<Form
						action="?"
						method="post"
						style={{ width: '100%', margin: '0 auto' }}
					>
						<Col sm="12" md={{ size: 6, offset: 2 }} className="mb-3">
							<ExampleComponent
								image={`http://localhost:3001/uploads/${allproducts.allproducts.image}`}
								roundedColor="#66A5CC"
								imageWidth="150"
								imageHeight="150"
								roundedSize="13"
							/>
						</Col>
						<FormGroup row>
							<Label for="examplePassword" sm={3}>
								Title
							</Label>
							<Col sm={9}>
								<Input
									type="text"
									name="title"
									id="title"
									value={products.title}
									placeholder="Title"
									onChange={handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="examplePassword" sm={3}>
								Price
							</Label>
							<Col sm={9}>
								<Input
									type="text"
									name="price"
									id="price"
									placeholder="Price"
									value={products.price}
									onChange={handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="examplePassword" sm={3}>
								Brand
							</Label>
							<Col sm={9}>
								<Input
									type="text"
									name="brand"
									id="brand"
									placeholder="Brand"
									value={products.brand}
									onChange={handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="examplePassword" sm={3}>
								Description
							</Label>
							<Col sm={12}>
								<Input
									type="textarea"
									name="description"
									id="desciption"
									placeholder="Description"
									value={products.description}
									onChange={handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="exampleFile" sm={3}>
								Product Image
							</Label>
							<Col sm={9}>
								<Alert color="primary">
									<Input
										type="file"
										name="profile_image"
										id="profile_image"
										onChange={handleFileChange}
									/>
									<FormText color="muted">
										Please select an image from your computer.
									</FormText>
								</Alert>
							</Col>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button color="info" onClick={update}>
						Save
					</Button>
					<Button color="danger" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
