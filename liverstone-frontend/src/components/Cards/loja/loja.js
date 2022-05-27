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


export default function Loja(props) {
  const [gif,setGif] = useState(false);
  const [cards, setCards] = useState([]);
  const [showCard,setShowcard] = useState(false)
  const { user, logoutUser } = useContext(AuthContext);
  const [usuario,setUsuario] = useState([]);
  const [toast,setToast] = useState(false);
  const [cost,setCost] = useState(0);
  let coins = usuario.money;

  useEffect(()=>{
        axios
        .get(`http://localhost:8000/usuarios/${user.username}`)
        .then((res) => {setUsuario(res.data)})
    },[coins]);

  useEffect(()=>{
     if (toast){
       setTimeout(()=>{setToast(false)},4000);
     }
  },[toast]);

  async function atualiza_user(){
    await axios.post(`http://localhost:8000/after_pack/${user.username}`, {"id": cards.id,"money":cost});
  }


  const wait = () => {
    setGif(true);
    setTimeout(() => {
      setGif(false);
      setShowcard(true);
    }, 6000);
  }

  async function get_card(raridade){
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
      await axios
      .get(`http://localhost:8000/${raridade}`)
      .then((res) => {setCards(res.data);wait()});
      atualiza_user();
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
        <div onClick={()=>{get_card('comum');setCost(-15)}} className="market">
            <h1 className="label"><FaCoins stroke="black" stroke-width={5} size={30} /> 15  <br></br><GiRank1 size={30}/>Comum</h1>
            <img className="packs1" src="../../comum.gif"/>
        </div>
        <div onClick={()=>{get_card('especial');setCost(-40)}} className="market">
            <h1 className="label"><FaCoins stroke="black" stroke-width={5} size={30} /> 40 <br></br><GiRank2 size={30}/>Especial</h1>
            <img className="packs2" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/RHJJZHT0U2001559355124536.gif"/>
        </div>
        <div onClick={()=>{get_card('raro');setCost(-100)}}  className="market">
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
        <button onClick={()=>{setShowcard(false)}} className="loja-button">
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