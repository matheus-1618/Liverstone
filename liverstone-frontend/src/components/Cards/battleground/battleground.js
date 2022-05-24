import React from "react";
import "./battleground.css";
import { useParams } from "react-router-dom";
import Load from "../loadspinner/loadspinner";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Battleground(props) {
    const [cards, setCards] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [userCard, setUserCard] = useState([]);
    const [enemyCard, setEnemyCard] = useState([]);
    const [texto,setTexto] = useState("Hora de Batalhar");
    const [load,SetLoad] = useState(true);
    const [enemyTurn,setenemyTurn] = useState(false);
    const [UserTurn,setuserTurn] = useState(false);
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
        setEnemyCard(enemyCard => [...enemyCard, card]);
      }
  }

    const wait = () => {
      setTimeout(() => {
        setGif(false)
      }, 2500);
    };

    const sleep = (time) => {
      setTimeout(() => {
        setUserCard([]);
        setEnemyCard([]);
      }, time);
    };

    function get_selected(card){
      if (cardsId.includes(card.id.toString())){
        return card;
      }
    }

    function bot(){
      sleep(4000)
      setTimeout(() => {
        let random = enemies[Math.floor(Math.random()*enemies.length)];
        setTexto(random.name)
        setEnemyCard([random.id])
      }, 1000);
      setTimeout(() => {
        let random1 = cards[Math.floor(Math.random()*cards.length)];
        setUserCard([random1.id])
        setTexto(random1.name)
      }, 2000);
      setenemyTurn(false);
      setuserTurn(false);
      sleep(3000)
    }

    useEffect(()=>  {if (enemyTurn && UserTurn){sleep(500);bot()}})

    useEffect(() => {
        axios
          .get("http://localhost:8000/all")
          .then((res) => {setCards(res.data.filter(get_selected));SetLoad(false);wait()});
      }, []);

      useEffect(() => {
        axios
          .get("http://localhost:8000/random")
          .then((res) => {setEnemies(res.data);SetLoad(false)});
      }, []);
      
    const card_template = <>
          <h1 className="battlegroud-letra">{texto}</h1>
          <div className="battleground-card-container">
          {enemies.map((card) => ( 
            enemyCard[0]!==card.id ? (<img onClick={()=>{selectEnemy(card.id);setenemyTurn(true)}} className="battleground-card" src={card.image}/>) : 
            (<img onClick={()=>{selectEnemy(card.id)}} className="battleground-card-enemy" src={card.image}/>) 
          ))}
          </div>
          
          <h1 className="battlegroud-letra">Vs</h1>

          <div className="battleground-card-container">
          {cards.map((card) => (
            userCard[0]!==card.id ? (<img onClick={()=>{selectUser(card.id);setuserTurn(true)}} className="battleground-card" src={card.image}/>) : 
            (<img onClick={()=>{selectUser(card.id)}} className="battleground-card-user" src={card.image}/>)
          ))}
          </div>
          </>

  return (
    <main className="App-battleground">
      {gif ? <img className="battleground" src="../../../battle.gif"/> :(load ? (<Load/>) : card_template)}
    </main>
  );
}