import React from "react";
import Homeheader from "../components/Homeheader";
import Sidebar from "../components/Sidebar";
import Sidebar2 from "../components/Sidebar2";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Homeheader selected />
      <div className="app__page">
        <Sidebar />
        <Sidebar2 />
      </div>
    </div>
  );
};

export default Home;
