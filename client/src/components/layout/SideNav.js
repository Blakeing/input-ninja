import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import HomeIcon from "@material-ui/icons/Home";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarBorder from "@material-ui/icons/StarBorder";
import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
	const classes = useStyles();

	const authContext = useContext(AuthContext);
	const { isAuthenticated, user } = authContext;

	const [open, setOpen] = React.useState(true);

	function handleClick() {
		setOpen(!open);
	}

	return (
		<div className={classes.root}>
			<List component="nav" aria-label="Main mailbox folders">
				<ListItem button component="a" href="/">
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem button component="a" to="/about">
					<ListItemIcon>
						<DraftsIcon />
					</ListItemIcon>
					<ListItemText primary="About" />
				</ListItem>
				<ListItem button component="a" href="/test">
					<ListItemIcon>
						<DraftsIcon />
					</ListItemIcon>
					<ListItemText primary="Test" />
				</ListItem>
				<ListItem button component="a" href="/shows">
					<ListItemIcon>
						<DraftsIcon />
					</ListItemIcon>
					<ListItemText primary="Shows" />
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button onClick={handleClick}>
					<ListItemIcon>
						<InboxIcon />
					</ListItemIcon>
					<ListItemText primary="Inbox" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText primary="Starred" />
						</ListItem>
					</List>
				</Collapse>
			</List>
		</div>
	);
}
