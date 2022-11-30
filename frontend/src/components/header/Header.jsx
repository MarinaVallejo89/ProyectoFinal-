import React from "react";
import "./Header.css";
import motos from "../../assets/images/motos.png";

const Header = ({ title, description }) => {
  return (
    <header className="head">
      <img alt="motos" id="motos" src={motos}></img>
      <div className="contTitle">
        <h1 className="title">{title}</h1>
        <h2 className="description">{description}</h2>
      </div>
    </header>
  );
};

export default Header;
