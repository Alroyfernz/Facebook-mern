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
const Profile = () => {
  const { username, uid } = useParams();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [imageURL, setImageURL] = useState("");

  const [progress, setProgress] = useState(0);
  const [posts, setPosts] = useState([]);
  const [profileUserData, setProfileUserData] = useState();
  const [bio, setBio] = useState("");
  const [bioPresent, setBioPresent] = useState(false);
  const [user, setUser] = useState(null);
  const handleUpload = () => {};
  const handleClose = () => {};
  const { userInfo } = useSelector((state) => state.userLogin);
  const [postes, setPostes] = useState([]);
  const profile = true;

  const history = useHistory();

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
        console.log(res);
      } catch (error) {
        console.log("error while fetching the user");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="profile">
      <Dialog
        open="false"
        // onClose={handleClose}
        // scroll={scroll}
        className="dialog2"
      >
        <div class="makeStyles-paper-1">
          <div class="drop_top">
            <div className="Dtitle">
              <h1>Edit Profile</h1>
            </div>
            <div className="icon">
              <i className="closeIcon" />
            </div>
          </div>
          <div className="drop_bottom1">
            <div className="header1">
              <h4>Profile Picture</h4>
              <span className="editlink">edit</span>
            </div>
            <div className="profile_photo">
              <Avatar className="profileUser" />
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
          <div className="submit_btn">
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
              {/* <span className="addFriend">
                {" "}
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/33EToHSZ94f.png"
                  width="16px"
                  height="16px"
                  alt=""
                />{" "}
                <h4 className="text">Add Friend</h4>
              </span> */}
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
              {/* <span className="messenger">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/YIxFfN5ecJG.png"
                  width="16px"
                  height="16px"
                  alt=""
                />
                <h4 className="text">Message</h4>
              </span> */}
              <span className="edit">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/YIxFfN5ecJG.png"
                  width="16px"
                  height="16px"
                  alt=""
                />
                <h4 className="text">Edit profile</h4>
              </span>
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
