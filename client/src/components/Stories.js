import axios from "axios";
import React, { useEffect, useState } from "react";
import "./stories.css";
import { useHistory } from "react-router-dom";
import StoryComp from "./StoryComp";
const Stories = () => {
  const history = useHistory();
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get("/story/");
        setSlides(res.data);
        console.log(res.data);
      } catch (error) {}
    };
    fetchStory();
  }, []);

  const toDisplay = [];
  for (let i = 0; i <= 3 && i < slides.length; i++) {
    toDisplay.push(slides[i]);
  }
  return (
    <div className="story">
      {toDisplay.map((slide, index) => {
        return (
          <div
            onClick={() => {
              history.push("/story");
            }}
          >
            <StoryComp key={index} slide={slide} idx={index} />
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
