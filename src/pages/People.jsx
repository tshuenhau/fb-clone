// src/pages/Home.js
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/people.css";
import { Link } from "react-router-dom";
import Transition from "../components/Transition.jsx";

import Typography from "@mui/material/Typography";
import LoginButton from "../components/LoginButton.jsx";
import firebase from "firebase/app";
import "firebase/database";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import FriendButton from "../components/FriendButton.jsx";

function createData(name, uid) {
  return { name, uid };
}

// function createFriend(user1, user2, status) {
//   return { user1, user2, status };
// }

const People = () => {
  const [searchedVal, setSearchedVal] = useState("");
  const { user, auth } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState(true);
  const getFriendRequests = async () => {
    setAll(false);

    let friendsArray = [];
    let itemArray = [];
    let friends = [];
    try {
      const q2 = query(
        collection(db, "friends"),
        where("user2uid", "==", user.uid),
        where("status", "==", 0)
      );
      // const querySnapshot1 = await getDocs(q1);

      // querySnapshot1.forEach((doc) => {
      //   friendsArray.push(doc.data().user2uid);
      //   // itemArray = [...itemArray, doc.data()];
      // });
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((doc) => {
        friendsArray.push(doc.data().user1uid);
        // itemArray = [...itemArray, doc.data()];
      });
      friends = friendsArray;
      // console.log(itemArray[0].displayName);
      // console.log("RPWS");
      // console.log(rows);
      console.log("friends");
      console.log(friends);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }

    if (friends.length > 0) {
      try {
        const q = query(collection(db, "users"), where("uid", "in", friends));
        const querySnapshot = await getDocs(q);
        console.log("snapshot");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log(doc.data().displayName);
          itemArray.push(createData(doc.data().displayName, doc.data().uid));
          // itemArray = [...itemArray, doc.data()];
        });
        setRows(itemArray);
        // console.log(itemArray[0].displayName);
        // console.log("RPWS");
        // console.log(rows);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setRows([]);
    }
  };

  const getFriends = async () => {
    setAll(false);
    let friends = [];
    let friendsArray = [];

    try {
      const q1 = query(
        collection(db, "friends"),
        where("user1uid", "==", user.uid),
        where("status", "==", 1)
      );
      const q2 = query(
        collection(db, "friends"),
        where("user2uid", "==", user.uid),
        where("status", "==", 1)
      );
      const querySnapshot1 = await getDocs(q1);

      querySnapshot1.forEach((doc) => {
        friendsArray.push(doc.data().user2uid);
        // itemArray = [...itemArray, doc.data()];
      });
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((doc) => {
        friendsArray.push(doc.data().user1uid);
      });
      friends = friendsArray;

      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }

    let itemArray = [];

    if (friends.length > 0) {
      try {
        const q = query(collection(db, "users"), where("uid", "in", friends));
        const querySnapshot = await getDocs(q);
        console.log("snapshot");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log(doc.data().displayName);
          itemArray.push(createData(doc.data().displayName, doc.data().uid));
          // itemArray = [...itemArray, doc.data()];
        });
        setRows(itemArray);
        // console.log(itemArray[0].displayName);
        // console.log("RPWS");
        // console.log(rows);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setRows([]);
    }
  };

  const getPeople = async () => {
    setAll(true);

    console.log("getprople");
    let itemArray = [];
    try {
      const q = query(collection(db, "users"), where("uid", "!=", user.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.data().displayName);
        itemArray.push(createData(doc.data().displayName, doc.data().uid));
        // itemArray = [...itemArray, doc.data()];
      });
      setRows(itemArray);
      // console.log(itemArray[0].displayName);
      // console.log("RPWS");
      // console.log(rows);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getPeople();
    // eslint-disable-next-line
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

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "0%",
        alignItems: "center",
        overflow: "auto",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flexGrow: 0,
          display: "flex",
          flexDirection: "row",
          paddingBottom: "50px",
          justifyContent: "center",
          paddingTop: "0%",
          alignItems: "center",
        }}
      >
        {" "}
        <Button variant="outlined" onClick={getPeople}>
          All
        </Button>
        <Button variant="outlined" onClick={getFriends}>
          Friends
        </Button>
        <Button variant="outlined" onClick={getFriendRequests}>
          Friend Requests
        </Button>
      </Box>
      <Box
        sx={{
          flexGrow: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "0%",
          alignItems: "center",
          overflow: "show",
          height: "100px",
          width: "100%",
        }}
      >
        <TextField
          id="outlined-search"
          label="Search People"
          type="search"
          sx={{
            backgroundColor: "white",
            marginBottom: "35px",
            minWidth: 650,
            zIndex: "3",
          }}
          onChange={(e) => setSearchedVal(e.target.value)}
        />
        <div className="search">
          <Typography
            sx={{
              justifyContent: "start",
              fontSize: "medium",
              maxWidth: 200,
              mb: 0,
            }}
            color="text.primary"
          >
            {" "}
            There's no one here!
          </Typography>
        </div>
      </Box>

      <div className="container">
        {/* <div className="message">hello</div> */}
        <div className="table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {rows
                  .filter(
                    (row) =>
                      // note that I've incorporated the searchedVal length check here
                      !searchedVal.length ||
                      row.name
                        .toString()
                        .toLowerCase()
                        .includes(searchedVal.toString().toLowerCase())
                  )
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="start" component="th" scope="row">
                        <Transition uid={row.uid} name={row.name}></Transition>
                      </TableCell>
                      <TableCell align="center">
                        <FriendButton
                          all={all}
                          getFriends={getFriends}
                          getPeople={getPeople}
                          getFriendRequests={getFriendRequests}
                          person={row.uid}
                          row={row}
                          rows={rows}
                          setRows={setRows}
                        ></FriendButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>{" "}
        </div>
      </div>
    </Box>
  );
};

export default People;
