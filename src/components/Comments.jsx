import React from "react";
import "../styles/post.css";
import { Avatar } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useContext, useEffect, useState, onSnapshot } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { db } from "../firebase";
import {
  query,
  orderBy,
  doc,
  updateDoc,
  collection,
  getDocs,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  where,
} from "firebase/firestore";
import "../styles/feed.css";
import Comment from "./Comment";
import CommentSender from "./CommentSender";

const Comments = ({ postId, getComments, comments }) => {
  const { user, auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  // const [comments, setComments] = useState([]);
  // useEffect(() => {
  //   getComments();
  // }, [loading]);

  async function deleteComment(id) {
    const requestRef = doc(db, "comments", id);

    // Set the "capital" field of the city 'DC'
    await deleteDoc(requestRef).then(() => {
      getComments();
    });
  }

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "100vh",
  //       }}
  //     >
  //       Loading the data
  //     </div>
  //   );
  // }
  return (
    <div>
      <CommentSender getComments={getComments} postId={postId}></CommentSender>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          uid={comment.data.uid}
          //   likes={post.data.likes}
          profilePic={comment.data.profilePic}
          content={comment.data.content}
          timestamp={comment.data.timestamp}
          displayName={comment.data.displayName}
          deleteComment={deleteComment}
          //   image={post.data.image}
        />
      ))}
    </div>
  );
};
export default Comments;
