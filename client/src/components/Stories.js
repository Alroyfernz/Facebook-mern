import React from "react";
import "./stories.css";
import StoryComp from "./StoryComp";
const Stories = () => {
  return (
    <div className="story">
      <StoryComp remove={false} />
      <StoryComp remove={false} />
      <StoryComp remove={false} />
      <StoryComp remove={true} />
    </div>
  );
};

export default Stories;
