import React, { useEffect, useState } from "react";
import Imageup from "./Imageup";
import "./posts.css";
import Post from "./Post";
import Stories from "./Stories";
import { useSelector } from "react-redux";
import axios from "axios";
const Posts = ({ profile }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [postes, setPostes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          profile === true
            ? await axios.get("posts/" + userInfo.email)
            : await axios.get("posts/timeline/" + userInfo._id);
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
      {postes.map((p, index) => {
        return (
          <div className="postWrapper">
            <Post key={index} id={p._id} post={p} />
          </div>
        );
      })}
      {/* <Post />
      <Post /> */}
    </div>
  );
};

export default Posts;
