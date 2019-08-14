import React, { Fragment, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../context/auth/authContext";
import Menu from "../layout/Menu";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
const useStyles = makeStyles(theme => ({
	"@global": {
		body: {
			backgroundColor: theme.palette.common.white
		},
		ul: {
			margin: 0,
			padding: 0
		},
		li: {
			listStyle: "none"
		}
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	toolbar: {
		flexWrap: "wrap"
	},
	sidebar: theme.mixins.toolbar,
	toolbarTitle: {
		flexGrow: 1
	},
	link: {
		margin: theme.spacing(1, 1.5)
	},
	userWelcome: {
		fontSize: `1rem`,
		fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: `0.00938em`
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	fullList: {
		width: "auto"
	},
	list: {
		width: 250
	}
}));

const Navbar = () => {
	const classes = useStyles();

	const authContext = useContext(AuthContext);
	const { isAuthenticated, user } = authContext;

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	});

	const toggleDrawer = (side, open) => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	const sideList = side => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}
		>
			<div className={classes.sidebar} />
			<Divider />
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const authLinks = (
		<Fragment>
			<span className={classes.userWelcome}>Hello, {user && user.name}</span>

			<Button
				component={RouterLink}
				to="/checkout"
				color="primary"
				variant="outlined"
				className={classes.link}
			>
				Survey
			</Button>
			<Menu />
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Link
				component={RouterLink}
				variant="button"
				color="textPrimary"
				to="/pricing"
				className={classes.link}
			>
				Pricing
			</Link>
			<Button
				component={RouterLink}
				to="/login"
				color="primary"
				variant="outlined"
				className={classes.link}
			>
				Login
			</Button>
		</Fragment>
	);

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={toggleDrawer("left", true)}
					>
						<MenuIcon />
					</IconButton>
					<Drawer open={state.left} onClose={toggleDrawer("left", false)}>
						{sideList("left")}
					</Drawer>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={RouterLink}
							to="/"
							style={{ textDecoration: "none" }}
						>
							Input Ninja
						</Link>
					</Typography>
					<nav>{isAuthenticated ? authLinks : guestLinks}</nav>
				</Toolbar>
			</AppBar>
			{/* Hero unit */}
		</React.Fragment>
	);
};
export default Navbar;
