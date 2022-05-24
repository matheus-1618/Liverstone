import React from "react";
import { Link } from 'react-router-dom';
import { GiExitDoor,GiRank3,GiBattleAxe,GiCoins,GiCardBurn,GiBattleGear } from 'react-icons/gi';
import {BiLogOut} from 'react-icons/bi';
import "./appbar.css";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export default function Appbar(props) {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="appbar">
    <Link to="/" className="link">
        <img src="/Liverstpne.gif" />
    </Link>

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
            <span className="appbutton"><GiCardBurn />Deck </span>
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
        <Link to="/clubs" className="link">
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