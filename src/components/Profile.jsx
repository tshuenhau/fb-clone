import React, { useContext, useState, useEffect } from "react";
import UserFeed from "../components/UserFeed.jsx";
import FormDialog from "../components/FormDialog.jsx";
import "../styles/profile.css";

import {
  CardContent,
  Card,
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
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import {
  query,
  orderBy,
  collection,
  getDocs,
  where,
  deleteDoc,
  doc,
  getDocFromCache,
  getDoc,
} from "firebase/firestore";

const Profile = ({ uid }) => {
  const { user, auth } = useContext(AuthContext);

  const [state, setState] = useState(0);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [person, setPerson] = useState(null);

  async function getUser() {
    const userRef = doc(db, "users", uid);

    try {
      const doc = await getDoc(userRef);
      setPerson(doc.data());
      console.log("Cached document data:", doc.data());
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, [loading, user]);

  if (loading) {
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
  console.log("person");
  console.log(person);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "top",
        paddingTop: "5%",
        alignItems: "center",
        overflow: "auto",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="profile">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="top">
            <Avatar src={person?.photoURL} sx={{ width: 55, height: 55 }} />{" "}
            <div className="nameemail">
              {" "}
              <Typography
                sx={{
                  justifyContent: "start",
                  fontSize: "medium",
                  fontWeight: "bold",
                  maxWidth: 200,
                  mb: 0,
                }}
                color="text.primary"
              >
                {person?.displayName}
              </Typography>
              <Typography
                sx={{ fontSize: "medium", maxWidth: 200, mb: 0 }}
                color="text.primary"
              >
                {person?.email}
              </Typography>
            </div>
            <div className="edit">
              {user.uid === uid ? (
                <FormDialog
                  user={person}
                  getUser={getUser}
                  emailAddress={person.email}
                  setState={setState}
                  state={state}
                ></FormDialog>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="bio">
            <div className="bioTitle">
              <Typography
                paragraph="true"
                sx={{
                  fontSize: "medium",
                  fontWeight: "bold",
                  mb: 0,
                  textAlign: "start",
                  width: "100%",
                  paddingLeft: "6%",
                }}
                color="text.primary"
              >
                About Me
              </Typography>
            </div>

            <Typography
              paragraph="true"
              sx={{
                fontSize: "medium",
                mb: 0,
                padding: "25px",
                width: "90%",
                textAlign: "start",
              }}
              color="text.primary"
            >
              {person.bio}
            </Typography>
          </div>{" "}
        </Box>
      </div>
      <div>
        {" "}
        {/* <div className="bio">
          sbiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobiobio
        </div> */}
      </div>
      <UserFeed uid={uid} state={state}></UserFeed>
    </Box>
  );
};

export default Profile;
