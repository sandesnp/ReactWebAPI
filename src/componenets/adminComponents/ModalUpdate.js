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
export default function ModalUpdate(allusers) {
	const [modal, setModal] = useState(false);
	const [users, setusers] = useState(allusers.allusers);
	const toggle = () => {
		setModal(!modal);
		// console.log(users);
	};

	const handleChange = e => {
		if (e.target.name === 'firstname') {
			setusers({
				_id: users._id,
				firstname: e.target.value,
				lastname: users.lastname,
				phonenumber: users.phonenumber,
				profile_image: users.profile_image
			});
		}

		if (e.target.name === 'lastname') {
			setusers({
				_id: users._id,
				firstname: users.firstname,
				lastname: e.target.value,
				phonenumber: users.phonenumber,
				profile_image: users.profile_image
			});
		}

		if (e.target.name === 'phonenumber') {
			setusers({
				_id: users._id,
				firstname: users.firstname,
				lastname: users.lastname,
				phonenumber: e.target.value,
				profile_image: users.profile_image
			});
		}

		// console.log(users);
	};
	const handleFileChange = e => {
		const data = new FormData();
		data.append('image', e.target.files[0]);
		axios
			.post('http://localhost:3001/upload', data)
			.then(response => {
				// console.log(response.data);

				setusers({
					_id: users._id,
					firstname: users.firstname,
					lastname: users.lastname,
					phonenumber: users.phonenumber,
					profile_image: response.data.filename
				});
			})
			.catch(err => console.log(err.response));
	};

	const update = async e => {
		e.preventDefault();
		// console.log(this.state);
		// console.log(users);
		await axios
			.put('http://localhost:3001/users/adminprofileupdate', users)
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
				<ModalHeader toggle={toggle}>Edit User</ModalHeader>
				<ModalBody>
					<Form
						action="?"
						method="post"
						style={{ width: '50%', margin: '0 auto' }}
					>
						<Col sm="12" md={{ size: 6, offset: 5 }} className="mb-3">
							<ExampleComponent
								image={`http://localhost:3001/uploads/${allusers.allusers.profile_image}`}
								roundedColor="#66A5CC"
								imageWidth="150"
								imageHeight="150"
								roundedSize="13"
							/>
						</Col>
						<FormGroup row>
							<Label for="examplePassword" sm={3}>
								First Name
							</Label>
							<Col sm={9}>
								<Input
									type="text"
									name="firstname"
									id="firstname"
									value={users.firstname}
									placeholder="first name"
									onChange={handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="examplePassword" sm={3}>
								Last Name
							</Label>
							<Col sm={9}>
								<Input
									type="text"
									name="lastname"
									id="lastname"
									placeholder="last name"
									value={users.lastname}
									onChange={handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="examplePassword" sm={3}>
								Phone Number
							</Label>
							<Col sm={9}>
								<Input
									type="number"
									name="phonenumber"
									id="phonenumber"
									placeholder="phone number"
									value={users.phonenumber}
									onChange={handleChange}
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label for="exampleFile" sm={3}>
								Profile Picture
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
