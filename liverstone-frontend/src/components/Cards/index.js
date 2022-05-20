import React from "react";
import "./index.css";
import Appbar from "./appbar/appbar";
import { useState,useEffect } from "react";
import axios from "axios";


export default function Home(props) {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8000/all")
          .then((res) => {setCards(res.data)});
      }, []);
  return (
    <main className="App">
      <Appbar/>
      <div className="card-container">
      {cards.map((card) => (
            <a className="cards">
            <img className="card" src={card.image}/>
            </a>
      ))}
      </div>
    </main>
  );
}