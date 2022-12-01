import React from "react";
import "./Header.css";

import coches from "../../assets/images/BMW-M3-Transparent-Background.png";

const Header = ({ title, description }) => {
  return (
    <header className="head">
      <img alt="Coche BMW" id="icon" src={coches}></img>
      <div className="contTitle">
        <h1 className="title">{title}</h1>
        <h2 className="description">{description}</h2>
      </div>
    </header>
  );
};

export default Header;
