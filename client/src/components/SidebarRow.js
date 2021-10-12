import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./sidebarrow.css";
const SidebarRow = ({
  currentUser,

  ImageLink,
  title,
  dropdown,
  avatar,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const friendId = conversation.member.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        // const res = await axios.get("/user/" + friendId);
        // setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="sidebarRow">
      <Avatar
        src={ImageLink}
        alt=""
        className={`sidebarRow__icon ${avatar && "avatar"} ${
          dropdown && "vanish"
        }`}
      />
      <div className={`dropdownDiv ${dropdown && "display"}`}>
        <i className={`dropdown ${dropdown && "display"}`} />
      </div>
      <h2 className={`sidebarRow__title`}>{title}</h2>
    </div>
  );
};

export default SidebarRow;
