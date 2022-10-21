import Post from "./Post";
import React, { useContext, useEffect, useState, onSnapshot } from "react";
import { db } from "../firebase";
import {
  query,
  orderBy,
  collection,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { AuthContext } from "../contexts/AuthProvider";

import "../styles/feed.css";
import MessageSender from "./MessageSender";

const UserFeed = ({ uid, state }) => {
  const [loading, setLoading] = useState(true);
  // const { user, auth } = useContext(AuthContext);

  async function deletePost(id) {
    const comments = [];

    const q = query(collection(db, "comments"), where("postId", "==", id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      comments.push(doc.id);
      // itemArray = [...itemArray, doc.data()];
    });

    const requestRef = doc(db, "posts", id);

    // Set the "capital" field of the city 'DC'
    await deleteDoc(requestRef).then(() => {
      initFeed();
    });

    for (let i = 0; i < comments.length; i++) {
      const commentRef = doc(db, "comments", comments[i]);

      // Set the "capital" field of the city 'DC'
      await deleteDoc(commentRef);
    }
  }

  async function getPosts() {
    const postsRef = collection(db, "posts");

    const q = query(
      postsRef,
      orderBy("timestamp", "desc"),
      where("uid", "==", uid)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    setPosts(
      querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    );
    console.log("posts");
    console.log(posts);
    setLoading(false);
  }

  const [posts, setPosts] = useState([]);

  function initFeed() {
    getPosts();
  }
  useEffect(() => {
    initFeed();
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
    <div className="feed">
      {/* <StoryReel />
      <MessageSender /> */}
      <MessageSender getPosts={getPosts} state={state} />
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          uid={post.data.uid}
          likes={post.data.likes}
          profilePic={post.data.profilePic}
          message={post.data.message}
          timestamp={post.data.timestamp}
          displayName={post.data.displayName}
          deletePost={deletePost}
          state={state}
          //   image={post.data.image}
        />
      ))}
    </div>
  );
};

export default UserFeed;
