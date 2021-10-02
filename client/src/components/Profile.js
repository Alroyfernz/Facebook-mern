import { Dialog } from "@material-ui/core";
import React from "react";
import "./profile.css";
import { useParams } from "react-router-dom";
import Posts from "./Posts";
const Profile = () => {
  const { username, uid } = useParams();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [imageURL, setImageURL] = useState("");
  const history = useHistory("");
  const [progress, setProgress] = useState(0);
  const [posts, setPosts] = useState([]);
  const [profileUserData, setProfileUserData] = useState();
  const [bio, setBio] = useState("");
  const [bioPresent, setBioPresent] = useState(false);
  return (
    <div className="profile">
      <Dialog
        open={open}
        // onClose={handleClose}
        scroll={scroll}
        className="dialog2"
      >
        <div class="makeStyles-paper-1">
          <div class="profileHead2">
            <p>
              Are you sure you want to change your profile picture ? Changes
              cannot be reverted{" "}
            </p>
            <progress
              value={progress}
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
                    <img src="" className="profileAvatar" />
                    <input  type="file" accept="image/*" className='inputImage' />
                </div>

                <h1 id="documentUsername">Alroy</h1>
                <p className="bioText"></p>
                <p  className="bio">Add Bio</p>
                <div className="bioFields">
                    <textarea placeholder="Describe who you are"  className="bioInput" />
                    <p></p>
                    <div className="cancelAndSaveButtons">
                        <button  >Cancel</button>
                        <button className="saveButton">Save</button>
                    </div>
                </div>
    </div>
  );
};

export default Profile;
