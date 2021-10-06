import { Avatar, Dialog } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./profile.css";
import { useParams, useHistory } from "react-router-dom";
import Posts from "./Posts.js";
import Imageup from "./Imageup.js";
import ProfileSidebar from "./ProfileSidebar.js";
import Post from "./Post";
import { useSelector } from "react-redux";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import Homeheader from "./Homeheader";
const Profile = () => {
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState(null);
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const [profileUserData, setProfileUserData] = useState();
  const [bio, setBio] = useState("");
  const [bioPresent, setBioPresent] = useState(false);
  const [user, setUser] = useState(null);
  const handleUpload = () => {};
  const handleClose = () => {};
  const { userInfo } = useSelector((state) => state.userLogin);
  const [postes, setPostes] = useState([]);
  const [openD, setOpenD] = useState(false);
  const profile = true;

  const history = useHistory();
  console.log(imageURL);
  console.log(file);
  const handleUpdate = async () => {
    setOpenD(!openD);
    try {
      await axios.put("/user/" + userInfo._id, { imageURL });
      console.log("image uploded");
    } catch (error) {
      console.log(error);
    }
  };
  const handleFriend = async () => {
    try {
      await axios.put("/user/add/" + userInfo._id, { userId: user._id });
      console.log("kelo re add!");
    } catch (error) {
      console.log("error while adding friend");
    }
  };
  const handleNotFriend = async () => {
    try {
      await axios.put("/user/remove/" + userInfo._id, { userId: user._id });
    } catch (error) {
      console.log("error while deleting friend");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =
          profile === true
            ? await axios.get("posts/" + userInfo.email)
            : await axios.get("posts/timeline/" + userInfo._id);
        setPostes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const id = history.location.pathname.split("/")[2];
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/" + id);
        setUser(res.data);
        // localStorage.setItem("userInfo", res.data);
        console.log(res);
      } catch (error) {
        console.log("error while fetching the user");
      }
    };
    fetchUser();
  }, []);

  console.log(userInfo?.friends.includes(user?._id), "from friends bro");
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
              <h1>Edit Profile</h1>
            </div>
            <div className="icon" onClick={() => setOpenD(!openD)}>
              <i className="closeIcon" />
            </div>
          </div>
          <div className="drop_bottom1">
            <div className="header1">
              <h4>Profile Picture</h4>
              <label htmlFor="profileC">
                <span className="editlink">edit</span>
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
              <Avatar
                src={file ? imageURL : user?.profilePicture}
                className="profileUser"
              />
            </div>
          </div>
          <div className="drop_bottom2">
            <div className="header2">
              <h4>Cover Picture</h4>
              <span className="editlink">edit</span>
            </div>
            <div className="cover_photo">
              <img src="" className="cover" />
            </div>
          </div>
          <div className="submit_btn" onClick={handleUpdate}>
            <h4>Edit Profile</h4>
          </div>
        </div>
      </Dialog>
      <div className="profile__topSection">
        <div className="profile__coverPhoto">
          <Avatar src={user?.profilePicture} className="profileAvatar" />
          <input type="file" accept="image/*" className="inputImage" />
        </div>

        <h1 id="documentUsername">{user?.name}</h1>
        <p className="bioText"></p>
        <p className="bio">Add Bio</p>
        <div className="bioFields">
          <textarea placeholder="Describe who you are" className="bioInput" />
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
                <li className="listItem">Friends 99</li>
                <li className="listItem">Photos</li>
              </ul>
            </div>
            <div className="optionRight">
              {userInfo?._id === user?._id ? (
                <span className="addStory">
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
                <span className="messenger">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/YIxFfN5ecJG.png"
                    width="16px"
                    height="16px"
                    alt=""
                  />
                  <h4 className="text">Message</h4>
                </span>
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
          <Imageup />
          {postes.map((p) => {
            return <Post id={p._id} post={p} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
