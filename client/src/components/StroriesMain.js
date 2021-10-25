import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Homeheader from "./Homeheader";
import "./story.css";
const StroriesMain = () => {
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
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {slides.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              <img
                src={slide.photo}
                alt="travel image"
                className={index === current ? "image active" : "image"}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default StroriesMain;
