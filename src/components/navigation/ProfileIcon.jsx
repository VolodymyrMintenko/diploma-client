import React, { useState } from "react";
import { IconButton, MenuItem, Menu, Grow } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link as RouterLink } from "react-router-dom";

const ProfileIcon = ({ isLoggedIn, authLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navigation__desktop--profile">
      <IconButton
        aria-label="Профиль"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        elevation={0}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        TransitionComponent={Grow}
        open={open}
        onClose={handleCloseMenu}
      >
        {isLoggedIn ? (
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              authLogout();
            }}
          >
            Logout
          </MenuItem>
        ) : (
          <MenuItem component={RouterLink} to="/signin">
           Sign in
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default ProfileIcon;
