import React, { Component } from 'react';
import AdminNabBar from './includes/AdminNab';
import { Jumbotron, Container } from 'reactstrap';
export default class AdminPanal extends Component {
	render() {
		return (
			<div style={{ background: '#b7bdb9' }}>
				<AdminNabBar />
				<Jumbotron fluid>
					<Container fluid>
						<h1 className="display-3">Admin Panal</h1>
					</Container>
				</Jumbotron>
			</div>
		);
	}
}
