import {
	Button,
	Collapse,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Step,
	StepButton,
	Stepper,
	Typography
} from "@material-ui/core/";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import React, { useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AddressForm from "../checkout/AddressForm";
import PaymentForm from "../checkout/PaymentForm";
import Review from "../checkout/Review";
import Test from "../pages/Test";
import Form from "../survey/Form";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none"
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	completed: {
		display: "inline-block"
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	list: {
		width: 250
	},
	button: {
		marginRight: theme.spacing(1)
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},

	nested: {
		paddingLeft: theme.spacing(4)
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(6),
		[theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
			width: 900,
			marginLeft: "auto",
			marginRight: "auto"
		}
	}
}));

function getSteps() {
	return [
		"Address Form",
		"Payment Form",
		"Review your order",
		"Multistep / Form Wizard",
		"React Wizard Form"
	];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return <AddressForm />;
		case 1:
			return <PaymentForm />;
		case 2:
			return <Review />;
		case 3:
			return <Test />;
		case 4:
			return <Form />;
		default:
			return "Unknown step";
	}
}

function ResponsiveDrawer(props) {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState({});
	const steps = getSteps();
	const [open, setOpen] = React.useState(true);
	const authContext = useContext(AuthContext);

	useEffect(() => {
		authContext.loadUser();
		// eslint-disable-next-line
	}, []);

	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}
	function totalSteps() {
		return steps.length;
	}

	function completedSteps() {
		return Object.keys(completed).length;
	}

	function isLastStep() {
		return activeStep === totalSteps() - 1;
	}

	function allStepsCompleted() {
		return completedSteps() === totalSteps();
	}

	function handleNext() {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	}

	function handleBack() {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	}

	function handleComplete() {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	}

	function handleReset() {
		setActiveStep(0);
		setCompleted({});
	}

	function handleClick() {
		setOpen(!open);
	}

	const handleStep = step => () => {
		setActiveStep(step);
	};

	const drawer = (
		<div className={classes.list} role="presentation">
			<div className={classes.toolbar} />
			<Divider />
			<List component="nav" aria-label="Main mailbox folders">
				<ListItem button component={RouterLink} to="/">
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem button component="a" href="/test">
					<ListItemIcon>
						<DraftsIcon />
					</ListItemIcon>
					<ListItemText primary="Test" />
				</ListItem>
				<ListItem button component="a" href="/form">
					<ListItemIcon>
						<DraftsIcon />
					</ListItemIcon>
					<ListItemText primary="Form" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={handleClick}>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText primary="Input Data" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<Stepper nonLinear orientation="vertical" activeStep={activeStep}>
							{steps.map((label, index) => (
								<Step key={label}>
									<StepButton
										onClick={handleStep(index)}
										completed={completed[index]}
									>
										{label}
									</StepButton>
								</Step>
							))}
						</Stepper>
					</List>
				</Collapse>
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.layout}>
				<div className={classes.toolbar} />
				<div>
					{allStepsCompleted() ? (
						<div>
							<Typography className={classes.instructions}>
								All steps completed - you&apos;re finished
							</Typography>
							<Button variant="outlined" onClick={handleReset}>
								Reset
							</Button>
						</div>
					) : (
						<div>
							<div>{getStepContent(activeStep)}</div>
							<br />
							<div>
								<Button
									disabled={activeStep === 0}
									onClick={handleBack}
									className={classes.button}
								>
									Back
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={handleNext}
									className={classes.button}
								>
									Next
								</Button>
								{activeStep !== steps.length &&
									(completed[activeStep] ? (
										<Typography variant="caption" className={classes.completed}>
											Step {activeStep + 1} already completed
										</Typography>
									) : (
										<Button
											variant="contained"
											color="primary"
											onClick={handleComplete}
										>
											{completedSteps() === totalSteps() - 1
												? "Finish"
												: "Complete Step"}
										</Button>
									))}
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}

export default ResponsiveDrawer;
