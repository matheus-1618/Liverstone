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
      (<div class="loja-container">
        {user && <div className="centered">Bem vindo de volta, {user.username}</div>}
        <img className="loja" src="https://static.inews24.com/v1/a271051a647932.gif"/>
      </div>) : (<Navigate to="/login"/>)}

      <div className="statics">
      <div class="loja-container">
        <div className="centered">180/201 cartas</div>
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/Z5ZPAV3IV89A1548356968146.gif"/>
      </div>

      <div class="loja-container">
        <div className="centered">34 vitórias</div>
        <img className="loja" src="https://media-hearth.cursecdn.com/attachments/19/183/cardback_33.gif"/>
      </div>

      <div class="loja-container">
        <div className="centered">6 derrotas</div>
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/44NC36C38EP21564589750080.gif"/>
      </div>

      </div>
    </main>
  );
}