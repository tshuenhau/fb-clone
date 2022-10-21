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

import Typography from "@mui/material/Typography";
import LoginButton from "../components/LoginButton.jsx";
import firebase from "firebase/app";
import "firebase/database";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useEffect, useState, onSnapshot } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import FriendButton from "../components/FriendButton.jsx";

function createData(name, uid) {
  return { name, uid };
}

// function createFriend(user1, user2, status) {
//   return { user1, user2, status };
// }

const Friends = () => {
  const [searchedVal, setSearchedVal] = useState("");

  const { user, auth } = useContext(AuthContext);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [friends, setFriends] = useState([]);

  const getPeople = async () => {
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
  };

  function getListOfPeople() {
    getPeople();
  }
  useEffect(() => {
    console.log("useffect");
    console.log(rows);
    getListOfPeople();
    // eslint-disable-next-line
  }, [loading]);

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
    <Box>
      {" "}
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        onChange={(e) => setSearchedVal(e.target.value)}
      />
      <Stack
        direction="column"
        spacing={3}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ color: "red" }}>
                <TableCell align="center">
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Friend Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
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
                    <TableCell align="center" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      <FriendButton
                        person={row.uid}
                        rows={rows}
                        setRows={setRows}
                        row={row}
                      ></FriendButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
      </Stack>
    </Box>
  );
};

export default Friends;
