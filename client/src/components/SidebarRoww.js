import { Avatar } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./sidebarroww.css";
const SidebarRoww = ({
  currentUser,
  conversation,
  ImageLink,
  title,
  dropdown,
  avatar,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/user/" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser._id, conversation.members]);

  return (
    <div className="sidebarRow">
      <Avatar
        src={conversation ? user?.profilePicture : ImageLink}
        alt=""
        className={`sidebarRow__icon ${avatar && "avatar"} ${
          dropdown && "vanish"
        }`}
      />
      <div className={`dropdownDiv ${dropdown && "display"}`}>
        <i className={`dropdown ${dropdown && "display"}`} />
      </div>
      <h2 className={`sidebarRow__title`}>
        {conversation ? user?.name : title}
      </h2>
    </div>
  );
};

export default SidebarRoww;
