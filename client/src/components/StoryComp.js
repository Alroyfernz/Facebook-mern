import React, { useEffect, useState } from "react";
import "./storycomp.css";
const StoryComp = ({ remove, slide, idx }) => {
  return (
    <div
      className={idx === 3 ? "comp remove" : "comp"}
      style={{ backgroundImage: `url(${slide.photo})` }}
    >
      <span
        className="userP"
        style={{ backgroundImage: `url(${slide?.profile})` }}
      />

      <span className="userN">{slide?.name}</span>
    </div>
  );
};

export default StoryComp;
