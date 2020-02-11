import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default function pagination({ postsPerPage, totalPosts, paginate }) {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="container">
			<Pagination size="lg" aria-label="Page navigation example">
				{pageNumbers.map(number => (
					<PaginationItem key={number}>
						<PaginationLink onClick={() => paginate(number)} first>
							{number}
						</PaginationLink>
					</PaginationItem>
				))}
			</Pagination>
		</div>
	);
}
