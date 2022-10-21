import React from "react";
import GoogleButton from "react-google-button";
import { useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../contexts/AuthProvider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { set } from "firebase/database";
function createData(id, user1uid, user2uid, status) {
  return { id, user1uid, user2uid, status };
}

const FriendButton = (props) => {
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, auth } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  let friendsArray = [];

  async function addFriend() {
    setKey(key + 1);
    await addDoc(collection(db, "friends"), {
      user1uid: user.uid,
      user2uid: props.person,
      status: 0,
    });
  }

  async function acceptFriendRequest(id) {
    setKey(key + 1);
    const requestRef = doc(db, "friends", id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(requestRef, {
      status: 1,
    });

    if (props.all) {
      props.getPeople();
    } else {
      props.getFriendRequests();
    }
    // props.setRows(
    //   props.rows.filter((e) => {
    //     return e !== props.row;
    //   })
    // );
  }

  async function rejectFriendRequest(id) {
    setKey(key + 1);

    const requestRef = doc(db, "friends", id);

    // Set the "capital" field of the city 'DC'
    await deleteDoc(requestRef).then(() => {
      // if (props.rows.length > 0) {
      //   props.setRows(
      //     props.rows.filter((e) => {
      //       return e !== props.row;
      //     })
      //   );
      // } else {
      //   props.setRows([]);
      // }
    });
    if (props.all) {
      props.getPeople();
    } else {
      props.getFriendRequests();
    }
  }

  async function deleteFriend(id) {
    setKey(key + 1);

    const requestRef = doc(db, "friends", id);

    // Set the "capital" field of the city 'DC'
    await deleteDoc(requestRef).then(() => {
      // if (props.rows.length > 0) {
      //   props.setRows(
      //     props.rows.filter((e) => {
      //       return e !== props.row;
      //     })
      //   );
      // } else {
      //   props.setRows([]);
      // }
    });
    if (props.all) {
      props.getPeople();
    } else {
      props.getFriends();
    }
    // props.setLoading(true);
    // props.getListOfPeople();
  }

  //  Status:  0 = sent from 1 to 2, 1 = accepted, 2 = sent from 2 to 1
  const checkFriends = () => {
    for (let i = 0; i < friends.length; i++) {
      let doc = friends[i];
      if (doc.user1uid === user.uid && doc.user2uid === props.person) {
        if (doc.status === 1) {
          return (
            <Button variant="outlined" onClick={() => deleteFriend(doc.id)}>
              Remove Friend
            </Button>
          );
        }
        if (doc.status === 0) {
          return (
            <Button
              variant="outlined"
              disabled="true"
              onClick={() => console.log("already sent")}
            >
              Friend Request Sent
            </Button>
          );
        }

        // return doc.status;
      } else if (doc.user2uid === user.uid && doc.user1uid === props.person) {
        if (doc.status === 0) {
          //sent from them to us
          return (
            <div>
              <Button
                sx={{ marginRight: "5px" }}
                color="success"
                variant="outlined"
                onClick={() => acceptFriendRequest(doc.id)}
              >
                Accept
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => rejectFriendRequest(doc.id)}
              >
                Reject
              </Button>
            </div>
          );
        } else if (doc.status === 1) {
          return (
            <Button variant="outlined" onClick={() => deleteFriend(doc.id)}>
              Remove Friend
            </Button>
          );
        }
      } else {
      }
    }
    return (
      <Button variant="outlined" onClick={addFriend}>
        Add Friend
      </Button>
    );
  };

  const getFriends = async () => {
    // console.log(collection(db, "friends"));
    try {
      const q = query(
        collection(db, "friends")
        // where("user1uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().displayName);
        friendsArray.push(
          createData(
            doc.id,
            doc.data().user1uid,
            doc.data().user2uid,
            doc.data().status
          )
        );
        // itemArray = [...itemArray, doc.data()];
      });
      setFriends(friendsArray);

      // console.log(itemArray[0].displayName);
      // console.log("RPWS");
      // console.log(rows);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    // console.log("key is now: ", key);

    getFriends();
    // eslint-disable-next-line
  }, [key]);
  //   console.log("STATUS");
  //   console.log(checkFriends());
  return checkFriends();
};

export default FriendButton;
