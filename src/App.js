import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './componenets/Login';
import Register from './componenets/Register';
import Dashboard from './componenets/Dashboard';
import NabBar from './componenets/includes/Navbar';

function App() {
	return (
		<div className="App">
			<div className="container">
				<NabBar />
				<BrowserRouter>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/" component={Dashboard} />
					</Switch>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
