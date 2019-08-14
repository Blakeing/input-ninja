import React, { useState, useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navbar from "../layout/Navbar";

function MadeWithLove() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Built with love by the "}
			<Link color="inherit" href="https://material-ui.com/">
				Material-UI
			</Link>
			{" team."}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	"@global": {
		body: {
			backgroundColor: theme.palette.common.white
		}
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

const Login = props => {
	const classes = useStyles();

	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push("/");
		}

		if (error === "Invalid Credentials") {
			setAlert(error, "danger");
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		email: "",
		password: ""
	});

	const { email, password } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();

		if (email === "" || password === "") {
			setAlert("Please fill in all fields", "danger");
		} else {
			login({
				email,
				password
			});
		}
	};

	return (
		<Fragment>
			<Navbar />
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<form className={classes.form} onSubmit={onSubmit}>
						<TextField
							type="email"
							variant="outlined"
							margin="normal"
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							value={email}
							onChange={onChange}
							autoFocus
							required
						/>
						<TextField
							type="password"
							variant="outlined"
							margin="normal"
							fullWidth
							id="password"
							label="Password"
							name="password"
							value={password}
							onChange={onChange}
							required
						/>

						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							value="Login"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="/about" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link component={RouterLink} to="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={5}>
					<MadeWithLove />
				</Box>
			</Container>
		</Fragment>
	);
};

export default Login;
