import { Avatar } from "@material-ui/core";
import React from "react";
import "./message.css";
const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <Avatar src="" className={own ? "messageImg own" : "messageImg"} />
        <p className={own ? "messageText own" : "messageText"}>
          lorem jjjjnnded,Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Magnam, illo, deserunt voluptates debitis aspernatur aliquam
          corporis quas perferendis laudantium magni neque suscipit iusto! Quam
          aliquid doloribus sit praesentium impedit neque?
        </p>
      </div>
      <div className="messageBottom">
        <span className="time">1 hr ago</span>
      </div>
    </div>
  );
};

export default Message;
