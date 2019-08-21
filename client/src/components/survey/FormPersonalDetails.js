import React, { Component } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export class FormPersonalDetails extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	};

	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		const { values, handleChange } = this.props;
		return (
			<React.Fragment>
				<TextField
					hintText="Enter Your Occupation"
					floatingLabelText="Occupation"
					onChange={handleChange("occupation")}
					defaultValue={values.occupation}
				/>
				<br />
				<TextField
					hintText="Enter Your City"
					floatingLabelText="City"
					onChange={handleChange("city")}
					defaultValue={values.city}
				/>
				<br />
				<TextField
					hintText="Enter Your Bio"
					floatingLabelText="Bio"
					onChange={handleChange("bio")}
					defaultValue={values.bio}
				/>
				<br />
				<Button
					label="Continue"
					primary={true}
					style={styles.button}
					onClick={this.continue}
				/>
				<Button
					label="Back"
					primary={false}
					style={styles.button}
					onClick={this.back}
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

export default FormPersonalDetails;
