import React, { Fragment } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { TextField } from "formik-material-ui";

const required = value => (value ? undefined : "Required");

const Page1 = () => {
	return (
		<Fragment>
			<div>
				<Field
					name="firstName"
					type="text"
					validate={required}
					component={TextField}
					variant="outlined"
					label="First Name"
				/>
			</div>
			<br />
			<div>
				<Field
					name="lastName"
					type="text"
					label="Last Name"
					validate={required}
					component={TextField}
					variant="outlined"
				/>
			</div>
		</Fragment>
	);
};
export default Page1;
