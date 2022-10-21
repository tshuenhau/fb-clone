import React from "react";
import "../styles/post.css";
import { Avatar } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useContext, useEffect, useState, onSnapshot } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { db } from "../firebase";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";
import Transition from "../components/Transition.jsx";
import Link from "@mui/material/Link";

import {
  doc,
  updateDoc,
  collection,
  getDocs,
  arrayUnion,
  arrayRemove,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import Comments from "./Comments";

const Post = ({
  id,
  profilePic,
  likes,
  uid,
  displayName,
  timestamp,
  message,
  deletePost,
  state,
}) => {
  const { user, auth } = useContext(AuthContext);
  const [liked, setLiked] = useState(likes.includes(user.uid));
  const [comments, setComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [numLikes, setNumLikes] = useState(likes.length);
  async function unlikePost() {
    await updateDoc(doc(db, "posts", id), {
      likes: arrayRemove(user.uid),
    });
    setNumLikes(numLikes - 1);
    setLiked(false);
  }
  async function getComments() {
    const commentsRef = collection(db, "comments");

    const q = query(
      commentsRef,
      orderBy("timestamp", "desc"),
      where("postId", "==", id)
    );
    const querySnapshot = await getDocs(q);

    setComments(
      querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    );
    setLoading(false);
  }
  const canDelete = () => {
    return user.uid === uid;
  };
  function toggleComments() {
    setShowComments(!showComments);
  }

  async function likePost() {
    await updateDoc(doc(db, "posts", id), {
      likes: arrayUnion(user.uid),
    });
    setNumLikes(numLikes + 1);

    setLiked(true);
  }
  useEffect(() => {
    getComments();
  }, [loading, state]);

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
    <div className="post">
      <div className="post__top">
        <div className="person_info">
          <Avatar
            component={Link}
            to={"/myprofile"}
            src={profilePic}
            className="post__avatar"
          />
          <div className="post__topInfo">
            <h3>
              <Transition uid={uid} name={displayName}></Transition>
            </h3>
            {/* <h3>{displayName}</h3> */}
            {/* <Transition uid={uid} name={displayName}></Transition> */}

            <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
          </div>
        </div>
        <div className="delete">
          {canDelete() ? (
            <Button
              onClick={() => {
                deletePost(id);
              }}
            >
              <Delete></Delete>
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
      </div>

      <div className="post_info">
        <div>{numLikes} liked </div>

        <div>
          <Link
            href="#"
            underline="hover"
            sx={{ color: "black" }}
            onClick={toggleComments}
          >
            {comments.length} comments
          </Link>
        </div>
      </div>

      {/* <div className="post__image">
        <img src={image} alt="post" />
      </div> */}
      <div className="post__options">
        {liked ? (
          <div className="post__option" onClick={unlikePost}>
            <ThumbUpIcon color="primary" />
            <p>Liked</p>
          </div>
        ) : (
          <div className="post__option" onClick={likePost}>
            <ThumbUpIcon />
            <p>Like</p>
          </div>
        )}

        {/* <ThumbUpIcon /> */}
        <div className="post__option" onClick={toggleComments}>
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        {/* <div className="post__option">
          <NearMeIcon />
          <p>Share</p>
        </div> */}
        {/* <div className="post__option">
          <AccountCircleIcon />
          <ExpandMoreOutlined />
        </div> */}
      </div>
      <div className="comment_section">
        {" "}
        {showComments ? (
          <Comments
            postId={id}
            getComments={getComments}
            comments={comments}
          ></Comments>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
export default Post;
