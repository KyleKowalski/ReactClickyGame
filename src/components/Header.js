import React from "react";
import "../style/style.css";

const Header = (props) => (
  <header className="header">
    <h1>React Clicky Game!</h1>
    <h5>
      <div>Rules</div>
      <div>Score: {props.score}</div>
      <div>High Score: {props.highScore}</div>
    </h5>
  </header>
);

export default Header;