import React, { useEffect, useState } from "react";
import Imageup from "./Imageup";
import "./posts.css";
import Post from "./Post";
import Stories from "./Stories";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
const Posts = ({ profile }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [postes, setPostes] = useState([]);
  const [code, setCode] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          profile === true
            ? await axios.get("/api/posts/" + userInfo.email)
            : await axios.get("/api/posts/timeline/" + userInfo._id);
        setPostes(res.data);
        setCode(res.status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userInfo, profile]);
  return (
    <div className="posts">
      <Stories />
      <Imageup />
      {code !== 200 ? (
        <LoadingScreen />
      ) : (
        <>
          {postes.length === 0 && (
            <h3
              style={{ color: "white", textAlign: "center", fontSize: "18px" }}
            >
              Add friends to see thier posts
            </h3>
          )}
          {postes.map((p, index) => {
            return (
              <div className="postWrapper">
                <Post key={index} id={p._id} post={p} />
              </div>
            );
          })}
        </>
      )}

      {/* <Post />
      <Post /> */}
    </div>
  );
};

export default Posts;
