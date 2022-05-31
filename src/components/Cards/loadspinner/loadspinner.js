import React from "react";
import "./loadspinner.css";


export default function Load(props) {
  return (
      <div class="load-container">
        <div className="load-letter">Carregando</div>
        <img className="load" src="../../load.gif"/>
      </div>
  );
}