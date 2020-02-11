import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './componenets/Login';
import Register from './componenets/Register';
import Dashboard from './componenets/Dashboard';

import AllProduct from './componenets/Allproduct';
import UserUpdate from './componenets/UserUpdate';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/allproduct" component={AllProduct} />
					<Route exact path="/user" component={UserUpdate} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />{' '}
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
