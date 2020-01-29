import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './componenets/Login';
import Register from './componenets/Register';
import Dashboard from './componenets/Dashboard';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/dashboard" component={Dashboard} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
