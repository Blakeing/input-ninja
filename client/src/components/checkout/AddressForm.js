import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const CssTextField = withStyles({
	root: {
		"& label.Mui-focused": {
			color: "green"
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "green"
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "red"
			},
			"&:hover fieldset": {
				borderColor: "yellow"
			},
			"&.Mui-focused fieldset": {
				borderColor: "green"
			}
		}
	}
})(TextField);

export default function AddressForm() {
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				First, let us know a little about your company.
			</Typography>
			<Divider />
			<br />
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						id="firstName"
						name="firstName"
						label="What is the name of your company?"
						fullWidth
						autoComplete="fname"
						variant="outlined"
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						id="address1"
						name="address1"
						label="What will be the URL of the website?"
						fullWidth
						autoComplete="billing address-line1"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="address2"
						name="address2"
						label="What is the purpose of your site?"
						fullWidth
						autoComplete="billing address-line2"
						variant="outlined"
						multiline
						rowsMax="10"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="city"
						name="city"
						label="City"
						fullWidth
						autoComplete="billing address-level2"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id="state"
						name="state"
						label="State/Province/Region"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="zip"
						name="zip"
						label="Zip / Postal code"
						fullWidth
						autoComplete="billing postal-code"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="country"
						name="country"
						label="Country"
						fullWidth
						autoComplete="billing country"
					/>
				</Grid>
				<Grid item xs={12}>
					<CssTextField
						label="Custom CSS"
						variant="outlined"
						id="custom-css-outlined-input"
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox color="secondary" name="saveAddress" value="yes" />
						}
						label="Use this address for payment details"
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
