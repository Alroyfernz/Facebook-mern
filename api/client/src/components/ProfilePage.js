import React from "react";
import Homeheader from "./Homeheader";
import Profile from "./Profile";

const ProfilePage = () => {
  return (
    <div>
      <Homeheader />
      <Profile profile="true" />
    </div>
  );
};

export default ProfilePage;
