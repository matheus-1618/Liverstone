import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { GiExitDoor,GiRank3,GiBattleAxe,GiCoins,GiCardPick,GiBattleGear } from 'react-icons/gi';
import {FaCoins} from 'react-icons/fa'
import {BiLogOut} from 'react-icons/bi';
import axios from "axios";
import "./appbar.css";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export default function Appbar(props) {
  const { user, logoutUser } = useContext(AuthContext);
  const [usuario,setUsuario] = useState([]);
  let coins = usuario.money;

  useEffect(()=>{
    // setTimeout(() => {
        axios
        .get(`http://localhost:8000/usuarios/${user.username}`)
        .then((res) => {setUsuario(res.data)})
    },[coins]);
    // }, 20000);
  
  return (
    <div className="appbar">
    <Link to="/" className="link">
        <img src="/Liverstpne.gif" />
    </Link>

    <a className="coins-bar">
        <h1 className="coins"><FaCoins/> {usuario.money}</h1>
    </a>

    {user && <div className="icon">
        <button className="button">
            <Link to="/" className="link">
                <span className="appbutton"><GiBattleGear/>{user.username.substring(0,10)} </span>
            </Link>
        </button>
    </div>}

    
    <div className="icon">
        <button className="button">
            <Link to="/battle" className="link">
                <span className="appbutton"><GiBattleAxe/>Batalhas </span>
            </Link>
        </button>
    </div>
    <div className="icon">
        <button className="button">
        <Link to="/decks" className="link">
            <span className="appbutton"><GiCardPick />Deck </span>
        </Link>
        </button>
    </div>
    <div className="icon">
        <button className="button">
        <Link to="/loja" className="link">
            <span className="appbutton"><GiCoins/>Loja</span>
        </Link>
        </button>
    </div>
    <div className="icon">
        <button className="button">
        <Link to="/ranking" className="link">
            <span className="appbutton"><GiRank3/>Ranking </span>
        </Link>
        </button>
    </div>
    
    <div className="icon">
        <button className="button" onClick={logoutUser}>
        <Link to="/login" className="link">
            <span className="appbutton"><GiExitDoor/>Logout </span>
        </Link>
        </button>
    </div>
    
  </div>
  );
}