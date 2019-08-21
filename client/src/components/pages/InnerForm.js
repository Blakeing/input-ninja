import React from "react";
import * as Yup from "yup";
import { Field } from "formik";
import FormWizard from "../layout/FormWizard";
import { TextField } from "formik-material-ui";

const page1ValidationSchema = Yup.object().shape({
	firstName: Yup.string()
		.email("1Email is not a valid email address")
		.required("1Email is required")
});

const page2ValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Email is not a valid email address")
		.required("Email is required")
});

const Page1 = () => (
	<div>
		<div>
			<Field
				name="firstName"
				type="text"
				placeholder="First Name"
				component={TextField}
			/>
		</div>
	</div>
);

const Page2 = () => (
	<div>
		<div>
			<Field
				name="email"
				type="text"
				placeholder="Email"
				component={TextField}
			/>
		</div>
	</div>
);

const onSubmit = (values, actions) => {
	console.log(values);
};

const onPage1Submit = () => {
	console.log("bob");
};

const InnerForm = () => (
	<FormWizard
		initialValues={{
			firstName: "",
			lastName: "",
			email: "",
			favoriteColor: ""
		}}
		onSubmit={onSubmit}
	>
		<Page1
			validationSchema={page1ValidationSchema}
			onPageSubmit={onPage1Submit}
		/>
		<Page2 validationSchema={page2ValidationSchema} />
	</FormWizard>
);

export default InnerForm;
