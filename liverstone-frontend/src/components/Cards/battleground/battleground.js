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
    let { ids } = useParams();
    let cardsId = ids.split("&")
    useEffect(() => {
        axios
          .get("http://localhost:8000/all")
          .then((res) => {setCards(res.data);SetLoad(false)});
      }, []);
    const card_template = <>
    <div className="card-container">
    {cards.map((card) => (
        cardsId.includes(card.id.toString()) ? 
        (<img className="cards" src={card.image}/>)
        : (<noscript></noscript>)
    ))}
    </div>
    </>
  return (
    <main className="App">
      <Appbar/>
      {load ? <Load/> : card_template}
    </main>
  );
}