import React from "react";
import "./decks.css";
import Appbar from "../appbar/appbar";
import Load from "../loadspinner/loadspinner";
import { useState,useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export default function Decks(props) {
    const { user, logoutUser } = useContext(AuthContext);
    const [cards, setCards] = useState([]);
    const [userCards, setUsercards] = useState([]);
    const [load,SetLoad] = useState(true);
    const card_template = <>
    <div className="loja-container">
        <div className="centered">Seu deck de batalha</div>
        <img className="loja" src="http://image.uc.cn/s/wemedia/s/upload/2021/ba0632b1a5a9c6564ecb34175b59f9bf.png"/>
      </div>
    <div className="card-container">
    {cards.map((card) => (
        userCards.includes(card.id) ? 
        (<img className="cards" src={card.image}/>)
        : (<img className="cards-no" src={card.image}/>)
    ))}
    </div>
    </>

    useEffect(() => {
      axios
        .get(`http://localhost:8000/usercards/${user.username}`)
        .then((res) => {setUsercards(res.data.map((card)=> (card.card_id)));SetLoad(false)});
    }, []);

    useEffect(() => {
        axios
          .get("http://localhost:8000/all")
          .then((res) => {setCards(res.data);SetLoad(false)});
      }, []);
  return (
    <main className="App">
      <Appbar/>
      {load ? <Load/> : card_template}
    </main>
  );
}