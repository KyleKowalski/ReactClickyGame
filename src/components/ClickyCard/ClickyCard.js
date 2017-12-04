import React from "react";
import "./ClickyCard.css";

const ClickyCard = (props) => (
  <div className="card">
    <div className="img-container">
      <img
        dataid={props.id}
        alt={props.name}
        src={props.image}
      />
    </div>
  </div>
);

export default ClickyCard;
