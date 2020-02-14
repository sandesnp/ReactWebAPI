import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './componenets/Login';
import Register from './componenets/Register';
import Dashboard from './componenets/Dashboard';

import AllProduct from './componenets/Allproduct';
import UserUpdate from './componenets/UserUpdate';
import Product from './componenets/Product';
import Payment from './componenets/Payment';
import MyPurchase from './componenets/MyPurchase';
import AdminPanel from './componenets/AdminPanal';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					{/* User Section */}
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/allproduct" component={AllProduct} />
					<Route exact path="/product/:id/:img/:title" component={Product} />
					<Route
						exact
						path="/product/payment/:id/:img/:title"
						component={Payment}
					/>
					<Route exact path="/user" component={UserUpdate} />
					<Route exact path="/user/purchase" component={MyPurchase} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />{' '}
					{/* Admin Section */}
					<Route exact path="/adminpanal" component={AdminPanel} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
