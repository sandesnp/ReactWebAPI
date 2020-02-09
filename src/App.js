import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './componenets/Login';
import Register from './componenets/Register';
import Dashboard from './componenets/Dashboard';
import NabBar from './componenets/includes/Navbar';
import AllProduct from './componenets/Allproduct';

function App() {
	return (
		<div className="App">
			<div className="container">
				<NabBar />
			</div>

			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/allproduct" component={AllProduct} />

					<div className="container">
						{' '}
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />{' '}
					</div>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
