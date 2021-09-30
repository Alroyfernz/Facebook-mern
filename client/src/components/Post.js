import React from "react";
import Imageup from "./Imageup";
import "./post.css";
import Stories from "./Stories";
const Post = () => {
  return (
    <div className="post">
      <Stories />
      <Imageup />
    </div>
  );
};

export default Post;
