import React, { useEffect, useState } from "react";
import "./storycomp.css";
const StoryComp = ({ remove, slide, idx }) => {
  return (
    <div
      className={idx === 3 ? "comp remove" : "comp"}
      style={{ backgroundImage: `url(${slide.photo})` }}
    >
      <span className="userP" />
      {/* <img
        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG90cmFpdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt=""
        width="100px"
        height="200px"
        style={{ objectFit: "cover" }}
      /> */}
      <span className="userN">Alroy Fernandes</span>
    </div>
  );
};

export default StoryComp;
