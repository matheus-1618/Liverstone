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
    const [userAttack, setUserAttack] = useState(0);
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
      if (userCard.includes(card.id)){
        setUserCard([])
    }
      else{
        setUserCard(userCard => [...userCard, card.id])
        setUserAttack(card.attack);
      }
  }

  function selectEnemy(card){
    if (enemyCard.length>0){
      setEnemyCard(enemyCard.slice(1))
    }
    if (enemyCard.includes(card.id)){
      setEnemyCard([]);
    }
      else{
        setEnemyCard(enemyCard => [...enemyCard, card.id]);
        card.health =  card.health -  userAttack;
        if (card.health<1){
          setTimeout(() => {
          setEnemies(enemies.filter(e=>e!==card));
        }, 1000);
        }
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
      let randomEnemy = enemies[Math.floor(Math.random()*enemies.length)];
      let randomCard = cards[Math.floor(Math.random()*cards.length)];
      setTimeout(() => {
        setTexto("Turno de ataque do adversário")
      }, 1000);
      setTimeout(() => {
        setEnemyCard([randomEnemy.id])
      }, 2000);
      setTimeout(() => {
        setUserCard([randomCard.id])
        let indexEnemy = enemies.indexOf(randomEnemy);
        let indexCard = cards.indexOf(randomCard);
        cards[indexCard].health =  cards[indexCard].health -  enemies[indexEnemy].attack;
        if (cards[indexCard].health<1){
          setCards(cards.filter(e=>e!==cards[indexCard]));
        }
      }, 3000);
      setenemyTurn(false);
      setuserTurn(false);
      sleep(4000);
      setTimeout(() => {
        setTexto("Seu turno de ataque")
      }, 5000);
    }
    function getAttack(card){

    }
 
    useEffect(()=>  {if (enemyTurn && UserTurn){sleep(1000);bot()}});

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

    useEffect(()=>  {if (!load && enemies.length === 0){setTexto("Final de jogo")}});

    const card_template = <>
          <h1 className="battlegroud-letra">{texto}</h1>
          <div className="battleground-card-container">
          {enemies.map((card) => ( 
            enemyCard[0]!==card.id ? (<><div className="ground-container"><div class="bottomright">{card.health}</div><img onClick={()=>{selectEnemy(card);setenemyTurn(true)}} className="battleground-card" src={card.image}/></div></>) : 
            (<><div className="ground-container"><div class="bottomright">{card.health}</div><img onClick={()=>{selectEnemy(card.id)}} className="battleground-card-enemy" src={card.image}/></div></>) 
          ))}
          </div>
          
          <h1 className="battlegroud-letra">Vs</h1>

          <div className="battleground-card-container">
          {cards.map((card) => (
            userCard[0]!==card.id ? (<><div className="ground-container"><div class="bottomright">{card.health}</div><img onClick={()=>{selectUser(card);setuserTurn(true)}} className="battleground-card" src={card.image}/></div></>) : 
            (<><div className="ground-container"><div class="bottomright">{card.health}</div><img onClick={()=>{selectUser(card.id)}} className="battleground-card-user" src={card.image}/></div></>)
          ))}
          </div>
          </>

  return (
    <main className="App-battleground">
      {gif ? <img className="battleground" src="../../../battle.gif"/> :(load ? (<Load/>) : card_template)}
    </main>
  );
}