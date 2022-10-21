import React from "react";
import "../styles/comment.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useContext, useEffect, useState, onSnapshot } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { db } from "../firebase";
import Delete from "@mui/icons-material/Delete";

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
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const Comment = ({
  uid,
  id,
  content,
  timestamp,
  displayName,
  profilePic,
  deleteComment,
}) => {
  const { user, auth } = useContext(AuthContext);

  const canDelete = () => {
    console.log("candeleee?");
    console.log(user.uid === uid);
    return user.uid === uid;
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "top",
        paddingTop: "0%",
        alignItems: "center",
        overflow: "auto",
        height: "100%",
        width: "100%",
      }}
    >
      <Avatar src={profilePic} className="post__avatar" />

      <Box
        sx={{
          flexGrow: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "top",
          paddingTop: "2.5%",
          paddingBottom: "2.5%",
          alignItems: "start",
          overflow: "auto",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: "0%",
            alignItems: "start",
            overflow: "auto",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            className="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingTop: "1%",
              paddingBottom: "1%",
              alignItems: "start",
              overflow: "hidden",
              height: "100%",
              width: "100%",
            }}
          >
            <div className="name">{displayName}</div>
            {/* <div className="date">
            {" "}
            {new Date(timestamp?.toDate()).toUTCString()}
          </div> */}
            <div className="content"> {content}</div>
          </Box>
          <div className="delete">
            {canDelete() ? (
              <Button
                onClick={() => {
                  deleteComment(id);
                }}
              >
                <Delete></Delete>
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </Box>
      </Box>
    </Box>
  );
};
export default Comment;
