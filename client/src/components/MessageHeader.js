import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IoMdCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import "./messageheader.css";
import { AiFillInfoCircle } from "react-icons/ai";
import axios from "axios";
import { CgChevronLeft } from "react-icons/cg";
import { useSelector } from "react-redux";
const MessageHeader = ({ convo, isOpen, open, setOpen }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [user, setUser] = useState(null);
  const friendId = convo.members.find((m) => m !== userInfo._id);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/user/" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [convo._id, friendId]);

  return (
    <div className="messageheader">
      <div className="headerLeft">
        <CgChevronLeft
          className="backIcon"
          onClick={() => {
            setOpen(!open);
          }}
        />
        <Avatar className="messageUser" src={user?.profilePicture} />
        <div className="naming">
          <h2 className="headerName">{user?.name}</h2>
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
