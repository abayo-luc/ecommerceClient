import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native';
import SignUp from './SignUp';
import Login from './Login';
import Products from './Products';
import CheckToken from './CheckToken';
import NewProduct from './NewProduct'

export default () => (
	<NativeRouter>
		<Switch>
			<Route exact path="/" component={CheckToken}/>
			<Route exact path="/SignUp" component={SignUp}/>
			<Route exact path="/Login" component={Login}/>
			<Route exact path="/Products" component={Products}/>
			<Route exact path="/NewProduct" component={NewProduct}/>
		</Switch>
	</NativeRouter>
)