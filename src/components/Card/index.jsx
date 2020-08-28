import React from "react";
import "./main.css";

export default ({ img, character, serie }) => {
  return (
    <div className="card">
      <img src={img}></img>
      <p className="name">{character}</p>
      <p className="game">{serie}</p>
    </div>
  );
};
