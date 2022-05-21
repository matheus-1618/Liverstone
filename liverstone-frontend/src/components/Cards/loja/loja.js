import React from "react";
import "./loja.css";
import Appbar from "../appbar/appbar";
import {GiRank1,GiRank2,GiRank3} from 'react-icons/gi'
import { useState,useEffect } from "react";
import axios from "axios";


export default function Loja(props) {
  return (
    <main className="App">
      <Appbar/>
      <div class="loja-container">
        <div className="centered">Bem vindo a loja</div>
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/L5HF4DAYACAZ1561588341680.gif"/>
      </div>
      <div className="pack-container">
        <div className="market">
            <h1 className="label"><GiRank1/>Comum</h1>
            <img className="packs" src="../../comum.gif"/>
        </div>
        <div className="market">
            <h1 className="label"><GiRank2/>Especial</h1>
            <img className="packs" src="../../especial.gif"/>
        </div>
        <div className="market">
            <h1 className="label"><GiRank3/>Raro</h1>
            <img className="packs" src="../../raro.gif"/>
        </div>
      </div>
    </main>
  );
}