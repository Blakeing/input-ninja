import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Pricing from "./components/pages/Pricing";
import Test from "./components/pages/Test";
import Checkout from "./components/checkout/Checkout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<AlertState>
				<Router>
					<Fragment>
						<div>
							<Alerts />
							<Switch>
								<PrivateRoute exact path="/checkout" component={Checkout} />
								<Route exact path="/" component={Home} />
								<Route exact path="/pricing" component={Pricing} />
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/test" component={Test} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</AlertState>
		</AuthState>
	);
};

export default App;
