import { Avatar, Dialog } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./profile.css";
import { useHistory, Link, useParams } from "react-router-dom";

import Imageup from "./Imageup.js";
import ProfileSidebar from "./ProfileSidebar.js";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import Homeheader from "./Homeheader";
import { USER_UPDATE } from "../Redux/Constaints/userCons";
import LoadingScreen from "./LoadingScreen";
const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState(null);
  const [story, isStory] = useState(false);
  const [file1, setFile1] = useState(null);
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const numberOfFriends = user.friends.length();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [postes, setPostes] = useState([]);
  const [openD, setOpenD] = useState(false);

  const history = useHistory();

  const handleUpdate = async () => {
    setOpenD(!openD);
    console.log(imageURL, coverImgUrl);
    if (story === false) {
      try {
        const res = await axios.put("/api/user/" + userInfo._id, {
          imageURL,
          coverURL: coverImgUrl,
        });

        dispatch({ type: USER_UPDATE, payload: res.data });
        sessionStorage.setItem("userInfo", JSON.stringify(res.data));
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post("/api/story/", {
          photo: imageURL,
          userId: userInfo._id,
          name: userInfo.name,
          profile: userInfo.profilePicture,
        });
      } catch (error) {
        console.log(error);
      }
    }
    setFile(null);
    isStory(false);
  };

  const setNewConvo = async () => {
    try {
      const res = await axios.get("/api/conversation/" + user._id, {
        logged: userInfo._id,
      });

      if (res.data.length === 0) {
        const response = await axios.post("/api/conversation", {
          senderId: userInfo._id,
          receiverId: user._id,
        });
        console.log("created convo");
        history.push("/messenger/" + response.data._id);
      } else {
        console.log("prev convo");
        history.push("/messenger/" + res.data[0]._id);
      }
      // setConversations(res.data._id);
    } catch (error) {}
  };

  const handleFriend = async () => {
    try {
      const res = await axios.put("/api/user/add/" + userInfo._id, {
        userId: user._id,
      });

      dispatch({ type: USER_UPDATE, payload: res.data });
      sessionStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (error) {
      console.log("error while adding friend");
    }
  };
  const handleNotFriend = async () => {
    try {
      const res = await axios.put("/api/user/remove/" + userInfo._id, {
        userId: user._id,
      });

      dispatch({ type: USER_UPDATE, payload: res.data });
      sessionStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (error) {
      console.log("error while deleting friend");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/posts/posts/" + user?._id);

        setPostes(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user?._id]);
  console.log(id);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/" + id);
        setUser(res.data);
        if (res.status !== 200) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("error while fetching the user");
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className="profile">
      <Homeheader />
      <Dialog
        open={openD}
        // onClose={handleClose}
        // scroll={scroll}
        className="dialog2"
      >
        <div class="makeStyles-paper-1">
          <div class="drop_top">
            <div className="Dtitle">
              {story === true ? <h1>Add story</h1> : <h1>Edit profile</h1>}
            </div>
            <div
              className="icon"
              onClick={() => {
                setOpenD(!openD);
                isStory(false);
                setFile(null);
              }}
            >
              <i className="closeIcon" />
            </div>
          </div>
          <div className="drop_bottom1">
            <div className="header1">
              {story === true ? <h4>Story</h4> : <h4>Profile Picture</h4>}

              <label htmlFor="profileC">
                {story === true ? (
                  <span className="editlink">select</span>
                ) : (
                  <span className="editlink">edit</span>
                )}
              </label>

              <input
                type="file"
                id="profileC"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setImageURL(reader.result);
                    };
                  }
                }}
              />
            </div>
            <div className="profile_photo">
              {story === true ? (
                file && <img src={imageURL} className="storyImg" alt="story" />
              ) : (
                <Avatar
                  src={file ? imageURL : user?.profilePicture}
                  className="profileUser"
                />
              )}
            </div>
          </div>
          {story === false && (
            <div className="drop_bottom2">
              <div className="header2">
                <h4>Cover Picture</h4>
                <label htmlFor="profileCover">
                  <span className="editlink">edit</span>
                </label>
                <input
                  type="file"
                  id="profileCover"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setFile1(e.target.files[0]);
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setCoverImgUrl(reader.result);
                      };
                    }
                  }}
                />
              </div>
              <div className="cover_photo">
                {file1 && <img src={coverImgUrl} className="cover" alt="alt" />}
              </div>
            </div>
          )}
          <div className="submit_btn" onClick={handleUpdate}>
            {story === true ? <h4>Upload story</h4> : <h4>Edit Profile</h4>}
          </div>
        </div>
      </Dialog>
      {loading === true ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="profile__topSection">
            <div
              className="profile__coverPhoto"
              style={{
                backgroundImage: `url(${user?.coverPicture})`,
                backgroundSize: "contain",
              }}
            >
              {/* <img src={user?.coverPicture} alt="cover" className="coverPic" /> */}
              <Avatar src={user?.profilePicture} className="profileAvatar" />
              <input type="file" accept="image/*" className="inputImage" />
            </div>

            <h1 id="documentUsername">{user?.name}</h1>
            <p className="bioText"></p>
            <p className="bio">Add Bio</p>
            <div className="bioFields">
              <textarea
                placeholder="Describe who you are"
                className="bioInput"
              />
              <p></p>
              <div className="cancelAndSaveButtons">
                <button>Cancel</button>
                <button className="saveButton">Save</button>
              </div>
            </div>
            <div className="profileOptions">
              <div className="options_wrapper">
                <div className="optionLeft">
                  <ul className="optionList">
                    <li className="listItem">Posts</li>
                    <li className="listItem">About</li>
                    <li className="listItem">Friends {numberOfFriends}</li>
                    <li className="listItem">Photos</li>
                  </ul>
                </div>
                <div className="optionRight">
                  {userInfo?._id === user?._id ? (
                    <span
                      className="addStory"
                      onClick={() => {
                        isStory(!story);
                        setOpenD(!openD);
                      }}
                    >
                      {" "}
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/33EToHSZ94f.png"
                        width="16px"
                        height="16px"
                        alt=""
                      />{" "}
                      <h4 className="text">Add Story</h4>
                    </span>
                  ) : userInfo?.friends.includes(user?._id) === false ? (
                    <span className="addFriend" onClick={handleFriend}>
                      {" "}
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/33EToHSZ94f.png"
                        width="16px"
                        height="16px"
                        alt=""
                      />{" "}
                      <h4 className="text">Add Friend</h4>
                    </span>
                  ) : (
                    <span className="RFriend" onClick={handleNotFriend}>
                      {" "}
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/c9BbXR9AzI1.png"
                        width="16px"
                        height="16px"
                        alt=""
                      />{" "}
                      <h4 className="text"> Friends</h4>
                    </span>
                  )}

                  {userInfo?._id === user?._id ? (
                    <span className="edit" onClick={() => setOpenD(!openD)}>
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/YIxFfN5ecJG.png"
                        width="16px"
                        height="16px"
                        alt=""
                      />
                      <h4 className="text">Edit profile</h4>
                    </span>
                  ) : (
                    <Link to="/messenger/123456">
                      <span className="messengerI" onClick={setNewConvo}>
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/YIxFfN5ecJG.png"
                          width="16px"
                          height="16px"
                          alt=""
                        />
                        <h4 className="text">Message</h4>
                      </span>
                    </Link>
                  )}

                  <span className="more">
                    <BsThreeDots />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="postsAndIntro">
            <ProfileSidebar />
            <div className="postAndWatch">
              {userInfo?._id === user?._id && <Imageup />}
              <div style={{ marginTop: "10px" }}>
                {postes.map((p, index) => {
                  return <Post key={index} id={p._id} post={p} />;
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
