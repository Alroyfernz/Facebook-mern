import { Avatar } from "@material-ui/core";
import React from "react";
import "./sidebar2row.css";
const Sidebar2row = ({ ImageURL, title }) => {
  return (
    <div className="sidebar2row">
      <Avatar className="avatar" src={ImageURL} alt={title} />
      <h1>{title}</h1>
    </div>
  );
};

export default Sidebar2row;
