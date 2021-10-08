import React from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosAddCircle, IoMdPhotos } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { RiChatSmileFill } from "react-icons/ri";
import Homeheader from "../components/Homeheader";
import Message from "../components/Message";
import MessageHeader from "../components/MessageHeader";
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
                  <i className="moreM" />
                </div>
                <div className="round">
                  <i className="video" />
                </div>
                <div className="round">
                  <i className="editM" />
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
          <MessageHeader />
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message />
              <Message own />
              <Message own />
              <Message own />
            </div>
            <div className="chatBoxBottom">
              <div className="chatBoxBottomWrapper">
                <div className="inputIcons">
                  <div className="iconsWrapper">
                    <IoIosAddCircle className="iconInput" />
                    <IoMdPhotos className="iconInput" />
                    <RiChatSmileFill className="iconInput" />
                  </div>
                </div>
                <div className="inputSend">
                  <div className="inputSendWrapper">
                    <form
                    // onSubmit={() => {
                    //   window.alert("message send");
                    // }}
                    >
                      <input
                        type="text"
                        placeholder="Type.."
                        className="toSend"
                      ></input>
                    </form>
                  </div>
                </div>
                <button className="sendIcon" type="submit">
                  <IoSend className="iconSend" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">online</div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
