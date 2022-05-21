import React from "react";
import "./decks.css";
import Appbar from "../appbar/appbar";
import Load from "../loadspinner/loadspinner";
import { useState,useEffect } from "react";
import axios from "axios";


export default function Decks(props) {
    const [cards, setCards] = useState([]);
    const [load,SetLoad] = useState(true);
    const card_template = <>
    <div className="card-container">
    {cards.map((card) => (
        <img className="cards" src={card.image}/>
    ))}
    </div>
    </>
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