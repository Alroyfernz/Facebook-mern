import React from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import "./sidebar2.css";
import Sidebar2row from "./Sidebar2row";
const Sidebar2 = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const friends = userInfo?.friends;
  return (
    <div className="sidebar2">
      <div className="hr" />
      <div className="details">
        <h1 className="contact">contacts</h1>
        <BsSearch className="searchIcon2" />
      </div>
      <div className="contacts">
        {friends?.map((friend) => {
          return <Sidebar2row id={friend} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar2;
