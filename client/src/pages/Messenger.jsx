import React from "react";
import { BsSearch } from "react-icons/bs";
import Homeheader from "../components/Homeheader";
import SidebarRow from "../components/SidebarRow";
import "./messenger.css";
const Messenger = () => {
  return (
    <>
      <Homeheader />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="headerMenu">
              <div className="headerLeft">
                <h2 className="chat">Chats</h2>
              </div>
              <div className="headerRight">
                <div className="round">
                  <i className="more" />
                </div>
                <div className="round">
                  <i className="video" />
                </div>
                <div className="round">
                  <i className="edit" />
                </div>
              </div>
            </div>
            <div className="input">
              <div className="inputWrapper">
                <div className="searchicond">
                  <BsSearch className="searchIcon" />
                </div>
                <input
                  type="text"
                  placeholder="Search for friends"
                  className="chatMenuInput"
                />
              </div>
            </div>
            <SidebarRow avatar ImageLink="" title="Alroy" />
            <SidebarRow avatar ImageLink="" title="Raj" />
            <SidebarRow avatar ImageLink="" title="clarrisa" />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">chats</div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">online</div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
