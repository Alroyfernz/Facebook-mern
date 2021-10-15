import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosAddCircle, IoMdPhotos } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { RiChatSmileFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Homeheader from "../components/Homeheader";
import Message from "../components/Message";
import MessageHeader from "../components/MessageHeader";
import SidebarRow from "../components/SidebarRow";
import "./messenger.css";
const Messenger = () => {
  const history = useHistory();
  const [conversations, setConversations] = useState([]);
  const [currentChats, setCurrentChats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newConversations, setNewConversation] = useState();
  const [click, setClick] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [messageText, setMessageText] = useState("");
  const friendId = null;
  const setNewConvo = async () => {
    try {
      const res = await axios.post("/conversation", {
        senderId: userInfo.id,
        receiverId: friendId,
      });
      setConversations(res.data);
    } catch (error) {
      console.log("error while creating an conversation");
    }
  };

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get("/conversation/" + userInfo._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversation();
  }, [userInfo._id]);

  const id = history.location.pathname.split("/")[2];

  if (id !== null && click === false) {
    const setChat = async () => {
      try {
        const response = await axios.get("/conversation/single/" + id);
        setCurrentChats(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    setChat();
  }
  // console.log(click);
  const handleSend = async (e) => {
    e.preventDefault();
    console.log("in send func");
    try {
      const msg = {
        members: currentChats.members,
        conversationId: currentChats._id,
        sender: userInfo._id,
        text: messageText,
      };
      const res = await axios.post("/message/", msg);
      console.log(res, "messgae send bro");
    } catch (error) {
      console.log(error, "error while sending message");
    }
  };
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/message/" + currentChats._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChats]);
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
            {conversations.map((c) => {
              return (
                <div
                  onClick={() => {
                    setCurrentChats(c);
                    setClick(!click);
                    history.push("/messenger/" + c._id);
                  }}
                >
                  <SidebarRow
                    currentUser={userInfo}
                    conversation={c}
                    avatar
                    ImageLink=""
                    title="Alroy"
                  />
                </div>
              );
            })}

            {/* <SidebarRow avatar ImageLink="" title="Raj" />
            <SidebarRow avatar ImageLink="" title="clarrisa" /> */}
          </div>
        </div>
        <div className="chatBox">
          {currentChats ? (
            <>
              <div className="chatBoxWrapper">
                <MessageHeader convo={currentChats} />
                <div className="chatBoxTop">
                  {messages.map((m) => {
                    return (
                      <Message message={m} own={m.sender === userInfo._id} />
                    );
                  })}

                  {/* <Message />
                  <Message own />
                  <Message own />
                  <Message own /> */}
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
                        <form onSubmit={handleSend}>
                          <input
                            type="text"
                            placeholder="Type.."
                            className="toSend"
                            onChange={(e) => {
                              setMessageText(e.target.value);
                            }}
                          ></input>
                        </form>
                      </div>
                    </div>
                    <button className="sendIcon" type="submit">
                      <IoSend className="iconSend" onClick={handleSend} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <span>open to start chatting</span>
          )}
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">online</div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
