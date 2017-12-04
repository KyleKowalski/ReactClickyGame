import React from "react";
import "../style/style.css";

const Header = (props) => (
  <header className="header">
    <h1>React Clicky Game!</h1>
    <h3 id="rules">Rules</h3>
    <h5 id="score">Score: {props.score}</h5>
    <h5 id="highScore">High Score: {props.highScore}</h5>
  </header>
);

export default Header;
