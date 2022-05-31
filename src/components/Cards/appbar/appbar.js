import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { GiExitDoor,GiRank3,GiBattleAxe,GiCoins,GiCardPick,GiBattleGear } from 'react-icons/gi';
import {FaCoins} from 'react-icons/fa'
import axios from "axios";
import "./appbar.css";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export default function Appbar(props) {
  const { user } = useContext(AuthContext);
  const [usuario,setUsuario] = useState([]);

  useEffect(()=>{
        axios
        .get(`https://secure-reef-15187.herokuapp.com/usuarios/${user.username}`)
        .then((res) => {setUsuario(res.data)})
    },[user]);

  
  return (
    <div className="appbar">
    <Link to="/" className="link">
        <img alt="Liverstone" src="/Liverstpne.gif" />
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
        <button className="button">
        <Link to="/login" className="link">
            <span className="appbutton"><GiExitDoor/>Logout </span>
        </Link>
        </button>
    </div>
    
  </div>
  );
}