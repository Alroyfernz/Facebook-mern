import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Avatar } from "@material-ui/core";
import { IoIosAddCircle, IoMdPhotos } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { RiChatSmileFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Homeheader from "../components/Homeheader";
import Message from "../components/Message";
import MessageHeader from "../components/MessageHeader";

import SidebarRoww from "../components/SidebarRoww";
import { io } from "socket.io-client";
import "./messenger.css";
const Messenger = () => {
  const history = useHistory();

  const [conversations, setConversations] = useState([]);
  const [currentChats, setCurrentChats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const [click, setClick] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [messageText, setMessageText] = useState("");

  const socket = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    console.log(arrivalMessage);
    arrivalMessage &&
      currentChats.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChats]);

  // const setNewConvo = async () => {
  //   try {
  //     const res = await axios.post("/conversation", {
  //       senderId: userInfo.id,
  //       receiverId: friendId,
  //     });
  //     setConversations(res.data);
  //   } catch (error) {
  //     console.log("error while creating an conversation");
  //   }
  // };

  useEffect(() => {
    // const ac = new AbortController();
    socket.current.emit("addUser", userInfo._id);
    console.log("adding users");
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
    // return () => socket.close();
  });
  // console.log(searchTerm);
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

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("/user/");
        setUsers(res.data);
      } catch (error) {
        console.log("Error while fetching all users");
      }
    };

    fetchAll();
  }, []);

  const id = history.location.pathname.split("/")[2];
  // console.log(conversations);
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
  // console.log(conversations);
  const handleSend = async (e) => {
    e.preventDefault();
    console.log("in send func");
    const msg = {
      members: currentChats.members,
      conversationId: currentChats._id,
      sender: userInfo._id,
      text: messageText,
    };

    const receiverId = currentChats.members.find(
      (member) => member !== userInfo._id
    );
    console.log("zata re send");
    console.log(receiverId);
    socket.current.emit("sendMessage", {
      senderId: userInfo._id,
      receiverId,
      text: messageText,
    });
    try {
      const res = await axios.post("/message/", msg);
      // console.log(res, "messgae send bro");
      setMessages([...messages, res.data]);
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

  const collapseInput = () => {
    // history.push();
    // document.getElementsByClassName("homeHeader__logo")[0].style.display =
    //   "block";
    // document.getElementsByClassName("homeHeader__searchBack")[0].style.display =
    //   "none";
    // document.getElementsByClassName("searchBox")[0].style.display = "none";
    // document.getElementsByClassName("homeHeader__search")[0].style.display =
    //   "block";
    // document.getElementsByClassName("dropdown-content3")[0].style.display =
    // "none";
    // document.getElementsByClassName("searchBox")[0].value = "";
  };
  // console.log(currentChats);
  // console.log(messages);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  // console.log(arrivalMessage);
  return (
    <>
      <Homeheader />
      <div className="messenger">
        <div className={open ? "chatMenu close" : "chatMenu open"}>
          <div className="chatMenuWrapper">
            <div className="headerMenu">
              <div className="headerLeft">
                <h2 className="chat">Chats</h2>
              </div>
              <div className="headerRight">
                <div className="round">
                  <i className="moreM" />
                </div>
                <div className="round" onClick={collapseInput}>
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
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    document.getElementsByClassName(
                      "dropdown-content3"
                    )[0].style.display = "block";
                  }}
                />
              </div>
            </div>
            <div className="dropdown-content3" onClick={collapseInput}>
              <ul id="list">
                {users !== undefined &&
                  users
                    .filter((value) => {
                      if (searchTerm === "") {
                        return value;
                      } else if (value.name === searchTerm) {
                        return value;
                      }
                      return 0;
                    })
                    .map((user1) => {
                      return (
                        <li
                          onClick={() => {
                            collapseInput();
                            history.push(`/profile/${user1._id}`);
                          }}
                        >
                          <a href="/" onClick={collapseInput}>
                            <Avatar
                              src={user1.profilePicture}
                              className="searchAvatar"
                            />
                            <h3 className="searchH3">{user1.name}</h3>
                          </a>
                        </li>
                      );
                    })}
              </ul>
            </div>
            {conversations.map((c) => {
              return (
                <div
                  onClick={() => {
                    setCurrentChats(c);
                    setClick(!click);
                    setOpen(!open);
                    history.push("/messenger/null");
                  }}
                >
                  <SidebarRoww
                    currentUser={userInfo}
                    conversation={c}
                    avatar
                    ImageLink=""
                    title="Alroy"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={open ? "chatBox open" : "chatBox close"}>
          {currentChats ? (
            <>
              {" "}
              <MessageHeader
                convo={currentChats}
                isOpen={open}
                open={open}
                setOpen={setOpen}
                className="message_header"
              />
              <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                  {messages.map((m) => {
                    return (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === userInfo._id} />
                      </div>
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
