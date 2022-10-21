import React, { useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import Profile from "../components/Profile.jsx";
import { useLocation } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Stack,
  Container,
} from "@mui/material";
import { AuthContext } from "../contexts/AuthProvider";

const MyProfile = () => {
  const { user, auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  // updateEmail(auth.currentUser, "user@example.com")
  //   .then(() => {
  //     // Email updated!
  //     // ...
  //   })
  //   .catch((error) => {
  //     // An error occurred
  //     // ...
  //   });

  useEffect(() => {
    console.log(user);
    // eslint-disable-next-line
  }, [user]);

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        Loading the data
      </div>
    );
  }
  return <Profile authuser="user" uid={user.uid}></Profile>;
};

export default MyProfile;
