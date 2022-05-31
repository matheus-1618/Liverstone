import React from "react";
import "./battleground.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Load from "../loadspinner/loadspinner";
import { useState,useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import useSound from 'use-sound';
import attacksound from "../../../sounds/attack.mp3"
import enemiesound from "../../../sounds/enemies.mp3"
import victory from "../../../sounds/win.mp3"
import lose from "../../../sounds/lost.mp3"

export default function Battleground(props) {
    const { user, logoutUser } = useContext(AuthContext);
    const [game,setGame] = useState(true);
    const [cards, setCards] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [userCard, setUserCard] = useState([]);
    const [userAttack, setUserAttack] = useState(0);
    const [enemyCard, setEnemyCard] = useState([]);
    const [texto,setTexto] = useState("Hora de Batalhar");
    const [load,SetLoad] = useState(true);
    const [enemyTurn,setenemyTurn] = useState(false);
    const [UserTurn,setuserTurn] = useState(false);
    const [attack,setAttack] = useState(false);
    const [gif,setGif] = useState(true);
    const [play, { stop }] = useSound(attacksound);
    const [playenemie, { stopenemie }] = useSound(enemiesound);
    const [win, { stopwon }] = useSound(victory);
    const [lost, { stoplost }] = useSound(lose);
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
        setAttack(true);
        setUserCard(userCard => [...userCard, card.id])
        setUserAttack(card.attack);
      }
  }

  function selectEnemy(card){
    if (!attack){
      setEnemyCard([]);
      setTexto("Selecione primeiro uma carta sua!")
    }
    else if (enemyCard.length>0){
      setEnemyCard(enemyCard.slice(1))
    }
    else if (enemyCard.includes(card.id)){
      setEnemyCard([]);
    }
      else{
        play();
        setAttack(false);
        setEnemyCard(enemyCard => [...enemyCard, card.id]);
        card.health =  card.health -  userAttack;
        if (card.health<1){
          setTimeout(() => {
            setEnemies(enemies.filter(e=>e!==card));
          }, 500);
        }
      }
  }

    const wait = () => {
      setTimeout(() => {
        setGif(false);
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
      let randomEnemy;
      if (enemies.length == 1){
        randomEnemy = enemies.filter(e=>e.id===enemyCard[0])[0];
      }
      else{
        let enemyOut = enemies.filter(e=>e.id!=enemyCard[0]);
        randomEnemy = enemyOut[Math.floor(Math.random()*enemyOut.length)];
      }
      let randomCard = cards[Math.floor(Math.random()*cards.length)];
      setTimeout(() => {
        setTexto("Turno de ataque do adversário")
      }, 1000);
      setTimeout(() => {
        setEnemyCard([randomEnemy.id])
      }, 2000);
      setTimeout(() => {
        playenemie();
        setUserCard([randomCard.id])
        let indexEnemy = enemies.indexOf(randomEnemy);
        let indexCard = cards.indexOf(randomCard);
        cards[indexCard].health =  cards[indexCard].health -  enemies[indexEnemy].attack;
        if (cards[indexCard].health<1){
          setTimeout(() => {
            setCards(cards.filter(e=>e!==cards[indexCard]));
          }, 300);
        }
      }, 3000);
      setenemyTurn(false);
      setuserTurn(false);
      sleep(4000);
      setTimeout(() => {
        setTexto("Seu turno de ataque");
      }, 5000);
    }
 
    useEffect(()=>  {if (enemyTurn && UserTurn){sleep(1000);bot()}});

    useEffect(() => {
        axios
          .get(`https://secure-reef-15187.herokuapp.com/usercards/${user.username}`)
          .then((res) => {setCards(res.data.filter(get_selected));SetLoad(false);wait()});
      }, []);

    useEffect(() => {
        axios
          .get("https://secure-reef-15187.herokuapp.com/random")
          .then((res) => {setEnemies(res.data);SetLoad(false)});
      }, []);

    async function atualiza_user(){
      if (enemies.length === 0){
        await axios.post(`https://secure-reef-15187.herokuapp.com/after_battle/${user.username}`, {"money": 5,"win":1,"defeat":0});
      }
      else {
        await axios.post(`https://secure-reef-15187.herokuapp.com/after_battle/${user.username}`, {"money": -1,"win":0,"defeat":1});
      }
    }

    function finalMusic(){
      if (!gif){
        if (enemies.length === 0){
          win();
        }
        else if (cards.length === 0){
          lost();
        }
        else{
          stopwon();
          stoplost();
        }
      }
    }

    useEffect(()=>  {if (!load && (enemies.length === 0 || cards.length === 0)){setGame(false);finalMusic()} else{setGame(true)}});
    
    const tela_final = <>
    <div className="alinhamentos">
    {enemies.length === 0 ?
    (<h1 className="final-letra-vitoria">Vitória</h1>):(<h1 className="final-letra-derrota">Derrota</h1>) }
    <div className="battle-icon">
        <button onClick={()=>{atualiza_user();window.location.reload()}} className="battle-button">
            <Link to="/battle/" className="battle-link">
                <span className="battle-appbutton">Continuar</span>
            </Link>
        </button>
    </div>
    </div>
    </>
    const card_template = <>
          <h1 className="battlegroud-letra">{texto}</h1>
          <div className="battleground-card-container">
          {enemies.map((card) => ( 
            enemyCard[0]!==card.id? 
            (<><div className="ground-container"><div class="bottomright">{card.health}</div><img onClick={()=>{selectEnemy(card);setenemyTurn(true)}} className="battleground-card" src={card.image}/></div></>)
            : 
            (<><div className="ground-container-selected-enemy"><div class="bottomright-selected">{card.health}</div><img onClick={()=>{selectEnemy(card)}} className="battleground-card-enemy" src={card.image}/></div></>) 
          ))}
          </div>
          
          <h1 className="battlegroud-letra">Vs</h1>

          <div className="battleground-card-container">
          {cards.map((card) => (
            userCard[0]!==card.id ? 
            (<><div className="ground-container"><div class="bottomright">{card.health}</div><img onClick={()=>{selectUser(card); setTimeout(() => {setuserTurn(true)}, 600);}} className="battleground-card" src={card.image}/></div></>) 
            : 
            (<><div className="ground-container-selected-user"><div class="bottomright-selected">{card.health}</div><img onClick={()=>{selectUser(card)}} className="battleground-card-user" src={card.image}/></div></>)
          ))}
          </div>
          </>

  return (
    <main className="App-battleground">
      {gif ? <img className="battleground" src="../../../battle.gif"/> :(load ? (<Load/>) : (game ? card_template : tela_final))}
    </main>
  );
}