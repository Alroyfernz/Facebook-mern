import React from "react";
import Homeheader from "../components/Homeheader";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import Sidebar2 from "../components/Sidebar2";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Homeheader selected />
      <div className="app__page">
        <Sidebar />
        <div className="app__posts">
          <Post />
        </div>
        <Sidebar2 />
      </div>
    </div>
  );
};

export default Home;
