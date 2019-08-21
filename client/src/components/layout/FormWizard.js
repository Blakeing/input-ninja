import React, { useState } from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import Button from "@material-ui/core/Button";

const FormWizard = props => {
	const { children, onSubmit, initialValues } = props;
	const [page, setPage] = useState(0);
	const activePage = React.Children.toArray(children)[page];
	const isLastPage = page === React.Children.count(children) - 1;

	const previous = () => {
		setPage(Math.max(page - 1, 0));
	};

	const next = () => {
		setPage(Math.min(page + 1, children.length - 1));
	};

	const validate = values => {
		if (activePage.props.validationSchema) {
			try {
				validateYupSchema(values, activePage.props.validationSchema, true);
			} catch (err) {
				return yupToFormErrors(err);
			}
		}

		return {};
	};

	const handleSubmits = (values, { setSubmitting }) => {
		if (activePage.props.onPageSubmit) {
			activePage.props.onPageSubmit();
		}
		if (isLastPage) {
			onSubmit(values);

			return;
		}

		setSubmitting(false);
		next();
	};

	return (
		<Formik
			initialValues={initialValues}
			validate={validate}
			onSubmit={handleSubmits}
			render={({ values, handleSubmit, isSubmitting }) => (
				<form onSubmit={handleSubmit}>
					{activePage}

					{page > 0 && (
						<Button type="button" onClick={previous}>
							Previous
						</Button>
					)}

					<Button type="submit" disabled={isSubmitting}>
						{isLastPage ? "Submit" : "Next"}
					</Button>

					<pre>{JSON.stringify(values, null, 2)}</pre>
				</form>
			)}
		/>
	);
};

export default FormWizard;
