import React from "react";
import "./ranking.css";
import Appbar from "../appbar/appbar";
import {GiCardDraw, GiPodiumWinner,GiDeathSkull} from 'react-icons/gi'
import { useState,useEffect } from "react";
import axios from "axios";
import Load from "../loadspinner/loadspinner";


export default function Ranking(props) {
  const [usuarios,setUsuarios] = useState([]);
  const [load,SetLoad] = useState(true);

  useEffect(()=>{
      axios
      .get(`https://secure-reef-15187.herokuapp.com/usuarios`)
      .then((res) => {setUsuarios(res.data);SetLoad(false)})
    },[usuarios]);

  const ranking_template = <><div className="ranking-container">
      {usuarios.map((usuario,index) => (
        <div className="rank-container">
          <h1 className="ranking-center1">{index+1}º {usuario.username}</h1>
          <h1 className="ranking-center2">{usuario.win}</h1>
          <h1 className="ranking-center3">{usuario.cards}</h1>
          <h1 className="ranking-center4">{usuario.defeat}</h1>
          <h1 className="ranking-center5"><GiPodiumWinner />Vitórias</h1>
          <h1 className="ranking-center6"><GiCardDraw /> Cartas</h1>
          <h1 className="ranking-center7"><GiDeathSkull /> Derrotas</h1>
          <img alt="image" className="ranking" src="https://cdn.toucharcade.com/wp-content/uploads/2021/03/D0712715-ED56-4A91-8206-B020ED450D61.png"/>
        </div>
      ))}
    </div></>

return (
    <main className="App">
      <Appbar/>
      <div class="loja-container">
        <div className="centered">Ranking de jogadores</div>
        <img alt="image" className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/xw/XWCT05UCGYVJ1572385068715.png"/>
      </div>
      {load ? <Load/> : ranking_template}
    </main>)}