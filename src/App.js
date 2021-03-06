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
import Contact from './componenets/Contact';

// Admin Imports
import AdminPanel from './componenets/AdminPanal';

import AdminUserControl from './componenets/adminComponents/UserControl';
import AdminProductControl from './componenets/adminComponents/ProductControl';
import AdminProductCreate from './componenets/adminComponents/ProductCreate';

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
					<Route exact path="/contact" component={Contact} />{' '}
					{/* Admin Section */}
					<Route exact path="/adminpanal" component={AdminPanel} />
					<Route
						exact
						path="/adminpanal/usercontrol"
						component={AdminUserControl}
					/>
					<Route
						exact
						path="/adminpanal/productcontrol"
						component={AdminProductControl}
					/>
					<Route
						exact
						path="/adminpanal/productcreate"
						component={AdminProductCreate}
					/>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
