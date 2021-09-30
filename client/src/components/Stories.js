import React from "react";
import "./stories.css";
import StoryComp from "./StoryComp";
const Stories = () => {
  return (
    <div className="story">
      <StoryComp />
      <StoryComp />
      <StoryComp />
      <StoryComp />
    </div>
  );
};

export default Stories;
