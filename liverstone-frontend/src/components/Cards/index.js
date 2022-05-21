import React from "react";
import "./index.css";
import Appbar from "./appbar/appbar";
import { useState,useEffect } from "react";
import axios from "axios";


export default function Home(props) {
  return (
    <main className="App">
      <Appbar/>
      <div class="loja-container">
        <div className="centered">Bem vindo a loja</div>
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/L5HF4DAYACAZ1561588341680.gif"/>
      </div>
      <div class="loja-container">
        <div className="centered">Bem vindo a loja</div>
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/L5HF4DAYACAZ1561588341680.gif"/>
      </div>
    </main>
  );
}