import React, { useEffect, useState } from "react";
import Imageup from "./Imageup";
import "./posts.css";
import Post from "./Post";
import Stories from "./Stories";
import axios from "axios";
const Posts = () => {
  const [postes, setPostes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("posts/timeline/6150be33a78c8837e9232dd2");
        setPostes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="posts">
      <Stories />
      <Imageup />
      {postes.map((p) => {
        return <Post id={p._id} post={p} />;
      })}
      {/* <Post />
      <Post /> */}
    </div>
  );
};

export default Posts;
