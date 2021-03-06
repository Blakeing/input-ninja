import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class FormUserDetails extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	};

	render() {
		const { values, handleChange } = this.props;
		return (
			<React.Fragment>
				<TextField
					hintText="Enter Your First Name"
					floatingLabelText="First Name"
					onChange={handleChange("firstName")}
					defaultValue={values.firstName}
				/>
				<br />
				<TextField
					hintText="Enter Your Last Name"
					floatingLabelText="Last Name"
					onChange={handleChange("lastName")}
					defaultValue={values.lastName}
				/>
				<br />
				<TextField
					hintText="Enter Your Email"
					floatingLabelText="Email"
					onChange={handleChange("email")}
					defaultValue={values.email}
				/>
				<br />
				<Button
					label="Continue"
					primary={true}
					style={styles.button}
					onClick={this.continue}
				/>
			</React.Fragment>
		);
	}
}

const styles = {
	button: {
		margin: 15
	}
};

export default FormUserDetails;
