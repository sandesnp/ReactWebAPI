import React, { useState, useEffect } from 'react';
import { Jumbotron, Container } from 'reactstrap';
import Products from './includes/Allproducts';
import Pagination from './includes/Pagination';
import NabBar from './includes/Navbar';
import axios from 'axios';
import MyFooter from './includes/MyFooter';

export default function Allproduct() {
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);

	//retrieveing product data
	axios.get('http://localhost:3001/product/all').then(response => {
		localStorage.setItem('products', JSON.stringify(response.data));
	});

	useEffect(() => {
		const fetchGames = async () => {
			setLoading(true);
			//retrieveing product data
			setGames(JSON.parse(localStorage.getItem('products')));
			setLoading(false);
		};
		fetchGames();
	}, []);

	//Get Current Posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOffFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = games.slice(indexOffFirstPost, indexOfLastPost);

	//current Page
	const paginate = pageNumber => setCurrentPage(pageNumber);

	return (
		<div>
			<NabBar />
			<div className="container">
				<Jumbotron fluid>
					<Container fluid>
						<h1 className="display-3">Browse Products</h1>
						<p className="lead">
							Get the best tools to enchance your gaming performance
						</p>
					</Container>
				</Jumbotron>
			</div>
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={games.length}
				paginate={paginate}
			/>
			<Products games={currentPosts} loading={loading} />
			<MyFooter />
		</div>
	);
}
