// src/pages/Home.js
import React from "react";
import LoginButton from "../components/LoginButton.jsx";
import Box from "@mui/material/Box";
import Feed from "../components/Feed.jsx";
import { useContext, useEffect, useState, onSnapshot } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import FaceIcon from "@mui/icons-material/Face";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, auth } = useContext(AuthContext);

  return (
    <Box>
      {" "}
      {!user ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "top",
            paddingBottom: "15%",
            alignItems: "center",
            overflow: "auto",
            height: "max-content",
            width: "100%",
          }}
        >
          {" "}
          <FaceIcon
            color="primary"
            fontSize="inherit"
            sx={{ fontSize: "200px" }}
          ></FaceIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "primary",
              textDecoration: "none",
            }}
          >
            MyFace
          </Typography>
        </Box>
      ) : (
        <div></div>
      )}
      <LoginButton />
      {/* <Button component={Link} to="/SignUp" variant="outlined">
        Sign Up
      </Button> */}
      {user ? <Feed /> : <div></div>}
    </Box>
  );
};

export default Home;
