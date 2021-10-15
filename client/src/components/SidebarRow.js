import { Avatar } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./sidebarrow.css";
const SidebarRow = ({
  currentUser,
  conversation,
  ImageLink,
  title,
  dropdown,
  avatar,
}) => {
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
