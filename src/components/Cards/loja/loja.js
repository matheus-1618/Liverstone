import React from "react";
import "./loja.css";
import Appbar from "../appbar/appbar";
import {GiRank1,GiRank2,GiRank3,GiShieldBash} from 'react-icons/gi'
import {FaInfoCircle} from "react-icons/fa"
import { useState,useEffect } from "react";
import {FaCoins} from 'react-icons/fa'
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import useSound from 'use-sound';
import packoppening from "../../../sounds/pack.mp3"

export default function Loja(props) {
  const [gif,setGif] = useState(false);
  const [cards, setCards] = useState([]);
  const [showCard,setShowcard] = useState(false)
  const { user, logoutUser } = useContext(AuthContext);
  const [usuario,setUsuario] = useState([]);
  const [toast,setToast] = useState(false);
  const [raridade,setRaridade] = useState('');
  const [play, { stop }] = useSound(packoppening,{volume: 0.5 });
  let coins = usuario.money;

  useEffect(()=>{
        axios
        .get(`https://secure-reef-15187.herokuapp.com/usuarios/${user.username}`)
        .then((res) => {setUsuario(res.data)})
    },[]);

  useEffect(()=>{
     if (toast){
       setTimeout(()=>{setToast(false)},4000);
     }
  },[toast]);


  function atualiza_user(){
    if (raridade==="comum"){
      axios.post(`https://secure-reef-15187.herokuapp.com/after_pack/${user.username}`, {"id": cards.id,"money":-15});
    }
    else if (raridade==="especial"){
      axios.post(`https://secure-reef-15187.herokuapp.com/after_pack/${user.username}`, {"id": cards.id,"money":-40});
    }
    else if (raridade==="raro"){
      axios.post(`https://secure-reef-15187.herokuapp.com/after_pack/${user.username}`, {"id": cards.id,"money":-100});
    }
  }


  const wait = () => {
    setGif(true);
    setTimeout(() => {
      setGif(false);
      setShowcard(true);
    }, 6000);
  }

  function get_card(raridade){
    if (raridade==="comum" && usuario.money<15 ){
      setTimeout(()=>{setToast(true)},200);
    }
    else if (raridade==="especial" && usuario.money<40 ){
      setTimeout(()=>{setToast(true)},200);
    }
    else if (raridade==="raro" && usuario.money<100 ){
      setTimeout(()=>{setToast(true)},200);
    }
    else{
      play();
      axios
      .get(`https://secure-reef-15187.herokuapp.com/${raridade}`)
      .then((res) => {setCards(res.data);wait()});
    }
  }

  const carta_template =( <>
  {  gif ? 
      (<img className="pack-oppening" src="../../../pack.gif"/>):
      (<>
      <Appbar/>
      { toast ?
      (<span className="toast"><FaInfoCircle size={20} /> Você não tem LiverCoins suficientes</span>) : (<noscript></noscript>)
      }
      <div class="loja-container">
        <div className="centered">Bem vindo a loja</div>
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/L5HF4DAYACAZ1561588341680.gif"/>
      </div>
      <div className="pack-container">
        <div onClick={()=>{get_card('comum');setRaridade('comum')}} className="market">
            <h1 className="label"><FaCoins stroke="black" stroke-width={5} size={30} /> 15  <br></br><GiRank1 size={30}/>Comum</h1>
            <img className="packs1" src="../../comum.gif"/>
        </div>
        <div onClick={()=>{get_card('especial');setRaridade('especial')}} className="market">
            <h1 className="label"><FaCoins stroke="black" stroke-width={5} size={30} /> 40 <br></br><GiRank2 size={30}/>Especial</h1>
            <img className="packs2" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/RHJJZHT0U2001559355124536.gif"/>
        </div>
        <div onClick={()=>{get_card('raro');setRaridade('raro')}}  className="market">
            <h1 className="label"><FaCoins stroke="black" stroke-width={5} size={30} /> 100 <br></br><GiRank3 size={30}/>Raro</h1>
            <img className="packs3" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/8W9RXIVQ7C471561590038866.gif"/>
        </div>
      </div></>)
      }
  </>)

  const sorteada_template = (<>
  <Appbar/>
  <h1 className="loja-letra">Nova carta adquirida</h1>
  <div className="loja-icon">
        <button onClick={()=>{setShowcard(false);atualiza_user();window.location.reload()}} className="loja-button">
                <span className="loja-appbutton"><GiShieldBash/>Continuar</span>
        </button>
    </div>
  <img className="cards" src={cards.image}/>
  </>)

  return (
    <main className="App">
      {showCard ? sorteada_template : carta_template}
    </main>
  );
}