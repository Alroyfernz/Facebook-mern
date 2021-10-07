import { Avatar } from "@material-ui/core";
import React from "react";
import { IoMdCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import "./messageheader.css";
import { AiFillInfoCircle } from "react-icons/ai";
const MessageHeader = () => {
  return (
    <div className="messageheader">
      <div className="headerLeft">
        <Avatar className="messageUser" />
        <div className="naming">
          <h2 className="headerName">Alroy Fernandes</h2>
          <span className="isActive">Active now</span>
        </div>
      </div>
      <div className="headerRight">
        <span className="rightIcon">
          <IoMdCall className="rightIcons" />
        </span>
        <span className="rightIcon">
          <FaVideo className="rightIcons" />
        </span>
        <span className="rightIcon">
          <AiFillInfoCircle className="rightIcons" />
        </span>
      </div>
    </div>
  );
};

export default MessageHeader;
