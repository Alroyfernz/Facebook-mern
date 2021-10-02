import React from "react";
import Imageup from "./Imageup";
import "./posts.css";
import Post from "./Post";
import Stories from "./Stories";
const Posts = () => {
  return (
    <div className="posts">
      <Stories />
      <Imageup />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
