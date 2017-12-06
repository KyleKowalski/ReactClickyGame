import React from "react";
import "../style/style.css";

const Header = (props) => (
  <header className="header">
    <h1>React Clicky Game!</h1>
    <h4>Rules: Click the images one at a time without repeating - click all images to win!</h4>
    <h3>Score: {props.score} - High Score: {props.highScore}</h3>
  </header>
);

export default Header;