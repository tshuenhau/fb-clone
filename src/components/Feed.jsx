import Post from "./Post";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  query,
  orderBy,
  collection,
  getDocs,
  where,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { AuthContext } from "../contexts/AuthProvider";

import "../styles/feed.css";
import MessageSender from "./MessageSender";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  let itemArray = [];
  const { user, auth } = useContext(AuthContext);

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

  const getFriends = async () => {
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
        itemArray.push(doc.data().user2uid);
        // itemArray = [...itemArray, doc.data()];
      });
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach((doc) => {
        itemArray.push(doc.data().user1uid);
        // itemArray = [...itemArray, doc.data()];
      });
      setFriends(itemArray);
      // console.log(itemArray[0].displayName);
      // console.log("RPWS");
      // console.log(rows);
      console.log("friends");
      console.log(friends);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  async function getPosts() {
    let unique = [...new Set(friends)];
    unique.push(user.uid);
    console.log("here");
    console.log(unique);
    const postsRef = collection(db, "posts");

    const q = query(
      postsRef,
      orderBy("timestamp", "desc"),
      where("uid", "in", unique)
    );
    const querySnapshot = await getDocs(q);
    setPosts(
      querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    );
  }
  const [posts, setPosts] = useState([]);

  function initFeed() {
    getFriends();
    getPosts();
  }
  useEffect(() => {
    //   db.collection("posts")
    //     .orderBy("timestamp", "desc")
    //     .onSnapshot((snapshot) =>
    //       setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    //     );
    initFeed();
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
    <div className="feed">
      {/* <StoryReel />
      <MessageSender /> */}
      <MessageSender getPosts={getPosts} />

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
          //   image={post.data.image}
        />
      ))}
    </div>
  );
};

export default Feed;
