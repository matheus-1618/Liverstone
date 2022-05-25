import React from "react";
import "./index.css";
import Appbar from "./appbar/appbar";
import { useState,useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";


export default function Home(props) {
  const { user } = useContext(AuthContext);
  return (
    <main className="App">
      <Appbar/>
      {user ? 
      (<div class="index-container">
        {user && <div className="index-center">{user.username}'s stats</div>}
        <img className="index" src="https://static.inews24.com/v1/a271051a647932.gif"/>
        <div className="statics">
            <div className="index-center1">Vitórias</div>
            <div className="index-center2">Cartas</div>
            <div className="index-center3">Derrotas</div>
            <img className="index-inside" src="https://www.downloadclipart.net/large/hearthstone-transparent-background.png"/>
            <img className="index-inside2" src="https://static1.millenium.org/articles/7/36/97/87/@/1398196-bundle1-article_m-1.png"/>
            <img className="index-inside3" src="https://d2q63o9r0h0ohi.cloudfront.net/images/journey-to-ungoro/cards-9cf49c3bd21287f861d130134f8d00c48647b8c34c5c0df35f32f42427b8a0c2862c49cec3ab870e328beb25a08d8c470a938e765c2258a8fc7100adbfd33ad7.png"/>  
        </div>
      </div>) : (<Navigate to="/login"/>)}

    
    </main>
  );
}