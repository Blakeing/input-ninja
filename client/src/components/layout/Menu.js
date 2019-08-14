import React, { Fragment, useContext } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AuthContext from "../../context/auth/authContext";

const Head = ({ anchorEl, onClick, onClose, title }) => {
	const authContext = useContext(AuthContext);
	const { logout } = authContext;

	const onLogout = () => {
		logout();
	};

	return (
		<Fragment>
			<Button
				variant="outlined"
				aria-owns={anchorEl ? "simple-menu" : undefined}
				aria-haspopup="true"
				onClick={onClick}
			>
				{title}
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={onClose}
			>
				<MenuItem onClick={onClose}>Profile</MenuItem>
				<MenuItem onClick={onClose}>My account</MenuItem>
				<MenuItem onClick={onLogout}>Logout</MenuItem>
			</Menu>
		</Fragment>
	);
};

function SimpleMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	return (
		<Head
			anchorEl={anchorEl}
			onClick={handleClick}
			onClose={handleClose}
			title="Menu"
		/>
	);
}

export default SimpleMenu;
