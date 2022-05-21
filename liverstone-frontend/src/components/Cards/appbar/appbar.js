import React from "react";
import { Link } from 'react-router-dom';
import { GiSoccerKick,GiRank3,GiBattleAxe,GiCoins,GiCardBurn } from 'react-icons/gi';
import "./appbar.css";

export default function Appbar(props) {
  return (
    <div className="appbar">
    <Link to="/" className="link">
        <img src="/Liverstpne.gif" />
    </Link>
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
  </div>
  );
}