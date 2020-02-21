import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
//Import Background for Footer
import BackgroundFooter from '../../images/footerimg.jpg';
export default function MyFooter() {
	return (
		<div
			style={{
				backgroundImage: 'url(' + BackgroundFooter + ')',
				backgroundSize: 'cover',
				backgroundAttachment: 'fixed',
				color: '#afbabd'
			}}
		>
			<MDBFooter color="blue" className="font-small pt-4 mt-4">
				<MDBContainer fluid className="text-center text-md-left">
					<MDBRow>
						<MDBCol md="6">
							<h5 className="title">Our Content</h5>
							<p>
								We are proud to serve our customers and hope they visit us again
							</p>
						</MDBCol>
						<MDBCol md="6">
							<h5 className="title">Links</h5>
							<ul>
								<li className="list-unstyled">
									<a href="/">Home Page</a>
								</li>
								<li className="list-unstyled">
									<a href="/allproduct">Product Page</a>
								</li>
								<li className="list-unstyled">
									<a href="/contact">Contact Page</a>
								</li>
							</ul>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
				<div className="footer-copyright text-center py-3">
					<MDBContainer fluid>
						&copy; {new Date().getFullYear()} Copyright:{' '}
						<a href="/"> Game Pasal </a>
					</MDBContainer>
				</div>
			</MDBFooter>
		</div>
	);
}
