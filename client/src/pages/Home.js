import React, { useEffect } from "react";
import Homeheader from "../components/Homeheader";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import Sidebar2 from "../components/Sidebar2";
import "./home.css";

const Home = () => {
  // useEffect(() => {
  //   window.onunload = () => {
  //     localStorage.removeItem("userInfo");
  //   };
  // }, []);
  return (
    <div>
      <Homeheader selected />
      <div className="app__page">
        <Sidebar />
        <div className="app__posts">
          <Posts />
        </div>
        <Sidebar2 />
      </div>
    </div>
  );
};

export default Home;
