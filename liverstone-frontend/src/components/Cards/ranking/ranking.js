import React from "react";
import "./ranking.css";
import Appbar from "../appbar/appbar";
import {GiRank1,GiRank2,GiRank3,GiShieldBash} from 'react-icons/gi'
import { useState,useEffect } from "react";
import {FaCoins} from 'react-icons/fa'
import axios from "axios";


export default function Ranking(props) {
//   async function get_card(raridade){
//     await axios
//     .get(`http://localhost:8000/${raridade}`)
//     .then((res) => {setCards(res.data);wait()})
//   }
return (
    <main className="App">
      <Appbar/>
      <div class="loja-container">
        <div className="centered">Ranking de jogadores</div>
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/xw/XWCT05UCGYVJ1572385068715.png"/>
      </div>

      <div class="loja-container">
        <div className="centered">Ranking de jogadores</div>
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/xw/XWCT05UCGYVJ1572385068715.png"/>
      </div>

      <div class="loja-container">
        <div className="centered">Ranking de jogadores</div>
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/xw/XWCT05UCGYVJ1572385068715.png"/>
      </div>

    </main>)}