import React from "react";
import { Link } from "react-router-dom";
import "./homeheader.css";
const Homeheader = ({ selected }) => {
  return (
    <div className="homeHeader">
      <div className="homeHeaderLogoAndSearch">
        <Link>
          <img
            src="https://i.ibb.co/72dN4JJ/Facebook-icon-2019-1.png"
            class="homeHeader__logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default Homeheader;
