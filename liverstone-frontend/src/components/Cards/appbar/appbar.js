import React from "react";
import { Link } from 'react-router-dom';
import { GiSoccerKick,GiPoliceBadge,GiSoccerBall,GiPodium,GiGoalKeeper } from 'react-icons/gi';
import "./appbar.css";

export default function Appbar(props) {
  return (
    <div className="appbar">
    <Link to="/" className="link">
        <img src="/Liverstpne.gif" />
    </Link>
    <div className="icon">
        <button className="button">
            <Link to="/ballondor" className="link">
                <span className="appbutton"><GiSoccerBall size={'30px'}/>FIFA Ballon D'Or </span>
            </Link>
        </button>
    </div>
    <div className="icon">
        <button className="button">
        <Link to="/golden" className="link">
            <span className="appbutton"><GiGoalKeeper size={'30px'}/> Chuteira de ouro </span>
        </Link>
        </button>
    </div>
    <div className="icon">
        <button className="button">
        <Link to="/competitions" className="link">
            <span className="appbutton"><GiPodium size={'30px'}/>Competições</span>
        </Link>
        </button>
    </div>
    <div className="icon">
        <button className="button">
        <Link to="/clubs" className="link">
            <span className="appbutton"><GiPoliceBadge size={'30px'}/>Clubes </span>
        </Link>
        </button>
    </div>
    <div className="icon">
        <button className="button">
        <Link to="/players" className="link">
            <span className="appbutton"><GiSoccerKick size={'30px'}/>Jogadores</span>
        </Link>
        </button>    
    </div>
  </div>
  );
}