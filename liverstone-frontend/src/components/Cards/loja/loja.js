import React from "react";
import "./loja.css";
import Appbar from "../appbar/appbar";
import {GiRank1,GiRank2,GiRank3} from 'react-icons/gi'
import { useState,useEffect } from "react";
import axios from "axios";


export default function Loja(props) {
  const [gif,setGif] = useState(false);
  const [cards, setCards] = useState([]);
  const [showCard,setShowcard] = useState(false)
  const wait = () => {
    setGif(true);
    setTimeout(() => {
      setGif(false);
      setShowcard(true);
    }, 6000);
  }

  async function get_card(raridade){
    await axios
    .get(`http://localhost:8000/${raridade}`)
    .then((res) => {setCards(res.data);wait()})
  }

  const carta_template =( <>
  {  gif ? 
      (<img className="pack-oppening" src="../../../pack.gif"/>):
      (<>
      <Appbar/>
      <div class="loja-container">
        <div className="centered">Bem vindo a loja</div>
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/L5HF4DAYACAZ1561588341680.gif"/>
      </div>
      <div className="pack-container">
        <div onClick={()=>get_card('comum')} className="market">
            <h1 className="label"><GiRank1/>Comum</h1>
            <img className="packs" src="../../comum.gif"/>
        </div>
        <div onClick={()=>get_card('especial')} className="market">
            <h1 className="label"><GiRank2/>Especial</h1>
            <img className="packs" src="../../especial.gif"/>
        </div>
        <div onClick={()=>get_card('raro')}  className="market">
            <h1 className="label"><GiRank3/>Raro</h1>
            <img className="packs" src="../../raro.gif"/>
        </div>
      </div></>)
      }
  </>)

  const sorteada_template = (<>
  <Appbar/>
  <img src={cards.image}/>
  </>)

  return (
    <main className="App">
      {showCard ? sorteada_template : carta_template}
    </main>
  );
}