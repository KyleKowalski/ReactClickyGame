import React from "react";
import "./ClickyCard.css";

const ClickyCard = (props) => (
  // <div className="card" onClick={() => props.shuffleCards()}>
  <div className="card">
    <div className="img-container" dataid={props.id} onClick={() => props.clickTarget(props.id)} >
      <img
        alt={props.name}
        src={props.image}
      />
    </div>
  </div>
);

export default ClickyCard;
