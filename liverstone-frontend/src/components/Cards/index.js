import React from "react";
import "./index.css";
import Appbar from "./appbar/appbar";
import { useState,useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";


export default function Home(props) {
  const { user } = useContext(AuthContext);
  return (
    <main className="App">
      <Appbar/>
      {user ? 
      (<div class="loja-container">
        <div className="centered">Bem vindo a loja</div>
        {user && <h1>{user.username}</h1>}
        <img className="loja" src="https://bnetcmsus-a.akamaihd.net/cms/gallery/L5HF4DAYACAZ1561588341680.gif"/>
      </div>) : (<Navigate to="/login"/>)}
    </main>
  );
}