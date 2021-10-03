import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import "./profile.css";
import { useParams, useHistory } from "react-router-dom";
import Posts from "./Posts.js";
import Imageup from "./Imageup.js";
import ProfileSidebar from "./ProfileSidebar.js";
import Post from "./Post";
const Profile = () => {
  const { username, uid } = useParams();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const [imageURL, setImageURL] = useState("");
  const history = useHistory("");
  const [progress, setProgress] = useState(0);
  const [posts, setPosts] = useState([]);
  const [profileUserData, setProfileUserData] = useState();
  const [bio, setBio] = useState("");
  const [bioPresent, setBioPresent] = useState(false);
  const handleUpload = () => {};
  const handleClose = () => {};

  return (
    <div className="profile">
      <Dialog
        // open={open}
        // onClose={handleClose}
        // scroll={scroll}
        className="dialog2"
      >
        <div class="makeStyles-paper-1">
          <div class="profileHead2">
            <p>
              Are you sure you want to change your profile picture ? Changes
              cannot be reverted{" "}
            </p>
            <progress
              // value={progress}
              max="100"
              style={{ display: "none" }}
              className="progress"
            />
            <div className="buttons">
              <button onClick={handleUpload}>Yes</button>
              <button onClick={handleClose}>No</button>
            </div>
          </div>
        </div>
      </Dialog>
      <div className="profile__topSection">
        <div className="profile__coverPhoto">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            className="profileAvatar"
          />
          <input type="file" accept="image/*" className="inputImage" />
        </div>

        <h1 id="documentUsername">Alroy</h1>
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
      </div>

      <div className="postsAndIntro">
        <ProfileSidebar />
        <div className="postAndWatch">
          <Imageup />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
};

export default Profile;
