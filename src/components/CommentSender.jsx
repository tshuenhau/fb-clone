import React, { useState, useContext } from "react";
import "../styles/commentsender.css";
import { Avatar } from "@mui/material";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthProvider";

const CommentSender = ({ postId, getComments }) => {
  const { user, auth } = useContext(AuthContext);

  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "comments"), {
      timestamp: serverTimestamp(),
      profilePic: user.photoURL,
      displayName: user.displayName,
      content: input,
      postId: postId,
      uid: user.uid,
    });

    setInput("");
    setImageUrl("");
    getComments();
  };
  return (
    <div className="commentSender">
      <Avatar src={user?.photoURL} />
      <form>
        <input
          value={input}
          maxlength="100"
          onChange={(e) => setInput(e.target.value)}
          className="commentSender__input"
          placeholder={`What's on your mind?`}
        />
        <button
          className="commentSender__button"
          onClick={handleSubmit}
          type="submit"
        >
          Hidden Submit
        </button>
      </form>
    </div>
  );
};
export default CommentSender;
