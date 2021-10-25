import React from "react";
import "./ProfileSidebar.css";
const ProfileSidebar = () => {
  return (
    <div className="profileSidebar">
      <div className="posts2">
        <h1>Intro</h1>
        <div className="intro">
          (
          <div className="introblock">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/IqqJ0EjDF9B.png"
              className="birthday"
            />
            <h1>20 November 2001</h1>
          </div>
          )
        </div>
      </div>
      <div className="posts2">
        <h1>Photos</h1>
        <div className="photos"></div>
      </div>
      <div class="hr profile" />
      <div class="policies profile">
        <p>Privacy</p>
        <p class="dot">·</p>
        <p>Terms</p>
        <p class="dot">·</p>
        <p>Advertising</p>
        <p class="dot">·</p>
        <p>Ad choices</p>
        <i class="ads" />
        <p class="dot">·</p>
        <p>Cookies</p>
        <p class="dot">·</p>
        <p>More</p>
        <p class="dot">·</p>
        <p>Facebook © 2020</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
