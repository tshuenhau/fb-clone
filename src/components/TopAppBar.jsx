import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext, useEffect, useState } from "react";
import LoginButton from "../components/LoginButton.jsx";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { Navigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import Drawer from "@mui/material/Drawer";
import FaceIcon from "@mui/icons-material/Face";

const drawerWidth = 240;

const ResponsiveAppBar = () => {
  const { user, auth } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleSignOut = async () => {
    await signOutUser();
    setAnchorEl(null);
  };
  async function signOutUser() {
    // Sign out of Firebase.
    await signOut(auth);
  }
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to={"/myprofile"} onClick={handleMenuClose}>
        My Profile
      </MenuItem>
      <MenuItem component={Link} to={"/"} onClick={handleSignOut}>
        Sign Out
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        position="fixed"
      >
        <Box sx={{ width: "90%", justifyContent: "center", marginLeft: "2%" }}>
          <Toolbar disableGutters flexGrow={1}>
            <FaceIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={"/"}
              href="/"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MyFace
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              {/* {!user ? (
                <Button
                  component={Link}
                  to={"/"}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  FaceClone
                </Button>
              ) : (
                <div></div>
              )}
              {user ? (
                <Button
                  component={Link}
                  to={"/"}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Home
                </Button>
              ) : (
                <div></div>
              )} */}

              {/* {user ? (
                <Button
                  component={Link}
                  to={"/people"}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  People
                </Button>
              ) : (
                <div></div>
              )} */}
            </Box>
            {user ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar src={user?.photoURL} sx={{}} />{" "}
              </IconButton>
            ) : (
              <div></div>
            )}
          </Toolbar>
        </Box>
        {renderMenu}
      </AppBar>{" "}
      {user ? (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          {/* {user ? (
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar src={user?.photoURL} sx={{}} />{" "}
          </IconButton>
        ) : (
          <div></div>
        )}
        {renderMenu} */}

          <Divider />
          <List sx={{ marginTop: "6%" }}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={"/"}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={"/people"}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="People" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      ) : (
        <div></div>
      )}
    </Box>
  );
};
export default ResponsiveAppBar;
