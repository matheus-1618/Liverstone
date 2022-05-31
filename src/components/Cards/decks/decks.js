import React from "react";
import "./decks.css";
import Appbar from "../appbar/appbar";
import Load from "../loadspinner/loadspinner";
import { useState,useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

export default function Decks(props) {
    const { user } = useContext(AuthContext);
    const [cards, setCards] = useState([]);
    const [userCards, setUsercards] = useState([]);
    const [load,SetLoad] = useState(true);
    const card_template = <>
    <div className="loja-container">
        <div className="centered">Seu deck de batalha</div>
        <img alt="teste" className="loja" src="http://image.uc.cn/s/wemedia/s/upload/2021/ba0632b1a5a9c6564ecb34175b59f9bf.png"/>
      </div>
    <div className="card-container">
    {cards.map((card) => (
        userCards.includes(card.id) ? 
        (<img alt="teste" className="cards" src={card.image}/>)
        : (<img alt="teste" className="cards-no" src={card.image}/>)
    ))}
    </div>
    </>

    useEffect(() => {
      axios
        .get(`https://secure-reef-15187.herokuapp.com/usercards/${user.username}`)
        .then((res) => {setUsercards(res.data.map((card)=> (card.card_id)));SetLoad(false)});
    }, [user]);

    useEffect(() => {
        axios
          .get("https://secure-reef-15187.herokuapp.com/all")
          .then((res) => {setCards(res.data);SetLoad(false)});
      }, [cards]);
      
  return (
    <main className="App">
      <Appbar/>
      {load ? <Load/> : card_template}
    </main>
  );
}