import React, { useState, useContext, useEffect, onSnapshot } from "react";
import "../styles/messagesender.css";
import { Avatar } from "@mui/material";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthProvider";
import Typography from "@mui/material/Typography";
import CreatePost from "../components/CreatePost.jsx";
import TextField from "@mui/material/TextField";

const MessageSender = ({ getPosts, state }) => {
  const { user, auth } = useContext(AuthContext);
  const CHARACTER_LIMIT = 250;

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts"), {
      message: input,
      timestamp: serverTimestamp(),
      profilePic: user.photoURL,
      displayName: user.displayName,
      image: imageUrl,
      likes: [],
      uid: user.uid,
    });

    // db.collection("posts").add({
    //   message: input,
    //   timestamp: db.FieldValue.serverTimestamp(),
    //   profilePic: user.photoURL,
    //   username: user.displayName,
    //   image: imageUrl,
    // });

    setInput("");
    setImageUrl("");

    getPosts();
  };

  useEffect(() => {}, [state]);
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar sx={{ marginRight: "2%" }} src={user?.photoURL} />

        <form>
          {/* <CreatePost></CreatePost> */}
          <input
            maxlength="250"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="messageSender__input"
            placeholder={`What's on your mind?`}
          />

          {/* <TextField
            multiline="true"
            sx={{ width: "90%", height: "auto" }}
            label="What's on your mind?"
            inputProps={{
              maxlength: CHARACTER_LIMIT,
            }}
            value={input}
            helperText={`${input.length}/${CHARACTER_LIMIT}`}
            onChange={(e) => setInput(e.target.value)}
            margin="normal"
            variant="outlined"
          /> */}
          <button onClick={handleSubmit} type="submit">
            Hidden Submit
          </button>
        </form>
        {/* <div className="remaining">
          <Typography
            paragraph="true"
            sx={{
              fontSize: "small",
              mb: 0,
              textAlign: "center",
              width: "100%",
              height: "100%",
              // paddingLeft: "6%",
            }}
            color="text.primary"
          >
            {" "}
            {input.length}
          </Typography>
        </div> */}
      </div>
      {/* <div className="messageSender__bottom">
        <div className="messageSender__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messageSender__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div> */}
    </div>
  );
};
export default MessageSender;
