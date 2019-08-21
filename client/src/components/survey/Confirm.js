import React, { Component } from "react";

import { List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export class Confirm extends Component {
	continue = e => {
		e.preventDefault();
		// PROCESS FORM //
		this.props.nextStep();
	};

	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		const {
			values: { firstName, lastName, email, occupation, city, bio }
		} = this.props;
		return (
			<React.Fragment>
				<List>
					<ListItem primaryText="First Name" secondaryText={firstName} />
					<ListItem primaryText="Last Name" secondaryText={lastName} />
					<ListItem primaryText="Email" secondaryText={email} />
					<ListItem primaryText="Occupation" secondaryText={occupation} />
					<ListItem primaryText="City" secondaryText={city} />
					<ListItem primaryText="Bio" secondaryText={bio} />
				</List>
				<br />
				<Button
					label="Confirm & Continue"
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

export default Confirm;
