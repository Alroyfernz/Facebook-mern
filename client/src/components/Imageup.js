import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import { FcVideoCall } from "react-icons/fc";
import "./imageup.css";
import axios from "axios";
import { useSelector } from "react-redux";
const Imageup = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState({});

  const [caption, setCaption] = useState("");
  const [selectPhoto, setSelectPhoto] = useState("");
  const progress = 0;
  const handleClickOpen = () => {};
  const handleClose = () => {};
  const handleChange = () => {};
  const uploadFileWithClick = () => {};
  const handleUpload = () => {};

  console.log(file);
  console.log("size of cap is", caption.length);
  console.log(selectPhoto);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: userInfo._id,
      caption,
      photo: selectPhoto,
    };

    try {
      const res = await axios.put("/posts", newPost);
    } catch (error) {}
  };

  return (
    <div className="imageupload">
      <Dialog
        className="MuiDialog-paper"
        open={open}
        style={{ margin: "auto" }}
        onClose={handleClose}
        scroll="false"
      >
        <form class="makeStyles-paper-1" onSubmit={handleSubmit}>
          <div class="modalInit">
            <h1>Create Post</h1>
            <CloseIcon class="closeModalIcon" onClick={() => setOpen(!open)} />
          </div>
          <div class="hr2" />
          <div class="profileHead">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              className="Avatar"
            />
            <h1>Alroy</h1>
          </div>
          <div class="inputForUpload">
            <input type="file" className="four" />
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows="4"
              placeholder="Whats on your mind Alroy"
            />
          </div>
          <div class={`previewImage ${!file && "vanish"}`}>
            <img src={selectPhoto} className="previewImaage" />
          </div>
          <img
            alt=""
            class="colorAlpha"
            src="https://facebook.com/images/composer/SATP_Aa_square-2x.png"
          ></img>

          <progress value={progress} className="hidden" max="100" />

          <div className="publishOptions">
            <div class="left">
              <h1>Add to your post</h1>
            </div>
            <div class="right">
              <label htmlFor="fileInput">
                <i class="Icon roomIcon" />
              </label>

              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setSelectPhoto(reader.result);
                    };
                  }
                }}
              />
              <i class="Icon photoIcon" onClick={uploadFileWithClick} />
              <i class="Icon friendsIcon" />
              <i class="Icon feelingIcon" />
              <i class="Icon tagIcon" />
              <i class="Icon moreIcon" />
            </div>
          </div>
          <button
            type="submit"
            onClick={() => setOpen(!open)}
            class={`postButton ${caption.length < 1 && "disabled"} ${
              imageURL != null && "visible"
            }`}
          >
            Post
          </button>
        </form>
      </Dialog>

      <div class="imageupload__container">
        <div class="postArea">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            class="Avatar"
          />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onClick={() => setOpen(!open)}
            placeholder={`What's on your mind, Alroy`}
          />
        </div>
        <div class="hr" />
        <div class="options">
          <div class="liveVideo" onClick={handleClickOpen("body")}>
            <i
              style={{
                backgroundImage:
                  "url(https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/tCW1eVq9pbx.png)",
                backgroundPosition: "0 0",
                backgroundSize: "26px 596px",
                width: "24px",
                height: "24px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
              }}
            />
            <h2>Live video</h2>
          </div>
          <div class="photo" onClick={handleClickOpen("body")}>
            <i
              class="photoIcon"
              style={{
                backgroundImage:
                  "url(https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/tCW1eVq9pbx.png)",
                backgroundPosition: "0 -234px",
                backgroundSize: "26px 596px",
                width: "24px",
                height: "24px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
              }}
            />
            <h2>Photo/Video</h2>
          </div>
          <div class="feeling" onClick={handleClickOpen("body")}>
            <i
              class="photoIcon"
              style={{
                backgroundImage:
                  "url(https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/tCW1eVq9pbx.png)",
                backgroundPosition: "0 -26px",
                backgroundSize: "26px 596px",
                width: "24px",
                height: "24px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
              }}
            />
            <h2>Feeling/Activity</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imageup;
