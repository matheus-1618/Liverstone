import React from "react";
import "./battleground.css";
import { useParams } from "react-router-dom";
import Appbar from "../appbar/appbar";
import Load from "../loadspinner/loadspinner";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Battleground(props) {
    const [cards, setCards] = useState([]);
    const [userCard, setUserCard] = useState([]);
    const [enemyCard, setEnemyCard] = useState([]);
    const [texto,setTexto] = useState("Hora de Batalhar");
    const [load,SetLoad] = useState(true);
    const [gif,setGif] = useState(true);
    let { ids } = useParams();
    let cardsId = ids.split("&")

    function selectUser(card){
      if (userCard.length>0){
        setUserCard(userCard.slice(1))
      }
      if (userCard.includes(card)){
        setUserCard([])
    }
      else{
        setUserCard(userCard => [...userCard, card])
      }
  }

  function selectEnemy(card){
    if (enemyCard.length>0){
      setEnemyCard(enemyCard.slice(1))
    }
    if (enemyCard.includes(card)){
      setEnemyCard([]);
  }
    else{
      setEnemyCard(enemyCard => [...enemyCard, card])
    }
}

    const wait = () => {
      setTimeout(() => {
        setGif(false)
      }, 2500);
    };

    const sleep = () => {
      setTimeout(() => {
        setUserCard([]);
        setEnemyCard([]);
      }, 1000);
    };

    function mudaTexto(){
      if (texto=="Ataque realizado" || texto=="Hora de batalhar"){
        setTexto("Vez do adversário");
      }
      else{
        setTexto("Vez do adversário");
      }
    }

    useEffect(()=>  {if (userCard.length==1 && enemyCard.length==1){mudaTexto();sleep()}} )

    useEffect(() => {
        axios
          .get("http://localhost:8000/all")
          .then((res) => {setCards(res.data);SetLoad(false);wait()});
      }, []);
      
    const card_template = <>
          <h1 className="battlegroud-letra">{texto}</h1>
          <div className="battleground-card-container">
          {cards.map((card) => (
              card.id<4 ? 
              (enemyCard[0]!=card.id ? (<img onClick={()=>{selectEnemy(card.id)}} className="battleground-card" src={card.image}/>) : 
              (<img onClick={()=>{selectEnemy(card.id)}} className="battleground-card-enemy" src={card.image}/>))
              : (<noscript></noscript>)
          ))}
          </div>
          <h1 className="battlegroud-letra">Vs</h1>
          <div className="battleground-card-container">
          {cards.map((card) => (
              cardsId.includes(card.id.toString()) ? 
              (userCard[0]!=card.id ? (<img onClick={()=>{selectUser(card.id)}} className="battleground-card" src={card.image}/>) : 
              (<img onClick={()=>{selectUser(card.id)}} className="battleground-card-user" src={card.image}/>))
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