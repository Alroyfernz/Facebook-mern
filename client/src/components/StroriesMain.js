import { Avatar, Divider } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import Homeheader from "./Homeheader";
import { useHistory } from "react-router-dom";
import "./story.css";
const StroriesMain = () => {
  const history = useHistory();
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const length = slides.length;
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
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div>
      <Homeheader />
      <section className="slider">
        <VscChromeClose
          className="close_icon"
          onClick={() => history.push("/")}
        />
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {slides.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              <div
                style={{
                  backgroundImage: `url(${slide?.photo})`,
                  backgroundSize: "cover",
                }}
                alt="travel image"
                className={index === current ? "image active" : "image"}
              >
                <div className="userCred">
                  <Avatar src={slide?.profile} className="userPhoto" />
                  <span className="userName">Alroy Fernandes</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default StroriesMain;
