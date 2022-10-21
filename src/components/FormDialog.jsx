import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import InputAdornment from "@mui/material/InputAdornment";
import { getAuth, updateProfile } from "firebase/auth";

import { useContext, useEffect, useState, onSnapshot } from "react";

import {
  doc,
  updateDoc,
  collection,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { AuthContext } from "../contexts/AuthProvider";

const FormDialog = ({ user, getUser, setState, state }) => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState(user.email);
  const [displayName, setDisplayName] = React.useState(user.displayName);
  const [bio, setBio] = React.useState(user.bio);

  const { s, auth } = useContext(AuthContext);

  async function getPosts() {
    const postsRef = collection(db, "posts");

    const q = query(
      postsRef,
      orderBy("timestamp", "desc"),
      where("uid", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));

    // console.log("posts");
    // console.log(posts);
  }

  async function getComments() {
    const postsRef = collection(db, "comments");

    const q = query(postsRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    console.log("commensts");
    console.log(querySnapshot);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    // console.log("posts");
    // console.log(posts);
  }

  const [posts, setPosts] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDisplayName(user.displayName);
    setEmail(user.email);
    setBio(user.bio);
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    if (displayName.length < 1 || email.length < 1) {
      return;
    }
    e.preventDefault();

    if (displayName !== user.displayName) {
      //need to upodate the name on posts and comments as well
      const posts = await getPosts();
      const comments = await getComments();

      for (let i = 0; i < posts.length; i++) {
        const postRef = doc(db, "posts", posts[i].id);
        await updateDoc(postRef, {
          displayName: displayName,
        });
      }

      for (let i = 0; i < comments.length; i++) {
        const postRef = doc(db, "comments", comments[i].id);
        await updateDoc(postRef, {
          displayName: displayName,
        });
      }

      setState(state + 1);
    }

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      displayName: displayName,
      email: email,
      bio: bio,
    });
    updateProfile(auth.currentUser, {
      displayName: displayName,
      email: email,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    setOpen(false);
    getUser();
  };
  useEffect(() => {
    //   db.collection("posts")
    //     .orderBy("timestamp", "desc")
    //     .onSnapshot((snapshot) =>
    //       setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    //     );
    getPosts();
  }, []);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <EditIcon></EditIcon> Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {" "}
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            helperText={
              !(displayName.length > 0) ? "This cannot be left blank." : ""
            }
            error={!(displayName.length > 0)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Display Name"
            fullWidth
            variant="standard"
          />{" "}
          <TextField
            error={!(email.length > 0)}
            required
            helperText={
              !(displayName.length > 0) ? "This cannot be left blank." : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            inputProps={{ minLength: 1, maxLength: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="About Me"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FormDialog;
