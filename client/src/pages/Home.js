import React from "react";
import Homeheader from "../components/Homeheader";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import Sidebar2 from "../components/Sidebar2";
import { useSelector } from "react-redux";
import "./home.css";
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {
  const { isFetching } = useSelector((state) => state.userLogin);
  return (
    <>
      {isFetching === true ? (
        <LoadingScreen />
      ) : (
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
      )}
    </>
  );
};

export default Home;
