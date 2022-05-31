import React from "react";
import "./battles.css";
import Appbar from "../appbar/appbar";
import { Link } from "react-router-dom";
import {GiRelicBlade} from "react-icons/gi"
import Load from "../loadspinner/loadspinner";
import { useState,useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import useSound from 'use-sound';
import battlesound from "../../../sounds/battle.mp3"
import cardsound from "../../../sounds/select.mp3"


export default function Battle(props) {
    const [cards, setCards] = useState([]);
    const { user } = useContext(AuthContext);
    const [load,SetLoad] = useState(true);
    const [selectedCards, setSelectedCards] = useState([]);
    const [play] = useSound(battlesound,{volume: 0.1 });
    const [selected] = useSound(cardsound);

    function selectCard(id){
        if (selectedCards.length === 3){
            setSelectedCards(selectedCards.slice(1))
        }
        if (selectedCards.includes(id)){
            setSelectedCards(selectedCards.filter(item => item !== id))
        }
        else{
            selected();
            setSelectedCards(selectedCards => [...selectedCards, id])
        }
    }
    
    const card_template = <>
    <div className="battle-container">
        <div className="battle-centered">Selecione três cartas para batalhar</div>
        <img alt="teste" className="battle" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/o1/O1AOL7NX48GZ1554165848774.png"/>
    </div>
    {selectedCards.length ? 
    (<h1 className="battle-letra">{selectedCards.length} cartas selecionadas</h1>):
    <h1 className="battle-letra">Nenhuma carta selecionada</h1>}
    {selectedCards.length  === 3 ? 
    (<div className="battle-icon">
        <button  onClick={()=>play()} className="battle-button">
            <Link to={`/battle/${selectedCards.join("&")}`} className="battle-link">
                <span className="battle-appbutton"><GiRelicBlade/>Batalhar</span>
            </Link>
        </button>
    </div>): (<div></div>)}
    <div className="card-container">
    {cards.map((card) => (
        selectedCards.includes(card.id) ? 
        (<img alt="teste" onClick={()=>selectCard(card.id)} className="battle-cards" src={card.image}/>)
        : (<img  alt="teste" onClick={()=>selectCard(card.id)} className="battle-cards-no" src={card.image}/>)
    ))}
    </div>
    </>
    useEffect(() => {
        axios
          .get(`https://secure-reef-15187.herokuapp.com/usercards/${user.username}`)
          .then((res) => {setCards(res.data);SetLoad(false)});
      }, [user]);

  return (
    <main className="App">
      <Appbar/>
      {load ? <Load/> : card_template}
    </main>
  );
}