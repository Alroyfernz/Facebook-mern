import { Avatar } from "@material-ui/core";
import React from "react";
import "./message.css";
const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <Avatar src="" className={own ? "messageImg own" : "messageImg"} />
        <p className={own ? "messageText own" : "messageText"}>
          {message.text}
        </p>
      </div>
      <div className="messageBottom">
        <span className="time">1 hr ago</span>
      </div>
    </div>
  );
};

export default Message;
