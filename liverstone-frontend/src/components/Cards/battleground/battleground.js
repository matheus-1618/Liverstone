import React from "react";
import "./battleground.css";
import { useParams } from "react-router-dom";
import Appbar from "../appbar/appbar";
import Load from "../loadspinner/loadspinner";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Battleground(props) {
    const [cards, setCards] = useState([]);
    const [load,SetLoad] = useState(true);
    const [gif,setGif] = useState(true);
    let { ids } = useParams();
    let cardsId = ids.split("&")

    const wait = () => {
      setTimeout(() => {
        setGif(false)
      }, 2500);
    };

    useEffect(() => {
        axios
          .get("http://localhost:8000/all")
          .then((res) => {setCards(res.data);SetLoad(false);wait()});
      }, []);
      
    const card_template = <>
          <h1 className="battlegroud-letra">Hora de batalhar</h1>
          <div className="battleground-card-container">
          {cards.map((card) => (
              card.id<4 ? 
              (<img className="battleground-card-enemy" src={card.image}/>)
              : (<noscript></noscript>)
          ))}
          </div>
          <h1 className="battlegroud-letra">Vs</h1>
          <div className="battleground-card-container">
          {cards.map((card) => (
              cardsId.includes(card.id.toString()) ? 
              (<img className="battleground-card-user" src={card.image}/>)
              : (<noscript></noscript>)
          ))}
          </div>
          </>

  return (
    <main className="App-battleground">
      {gif ? <img className="battleground" src="../../../battle.gif"/> :(load ? (<Load/>) : card_template)}
    </main>
  );
}