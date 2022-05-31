import React from "react";
import "./index.css";
import Appbar from "./appbar/appbar";
import { useState,useEffect,useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import Load from "./loadspinner/loadspinner";
import { Navigate } from "react-router-dom";


export default function Home(props) {
  const { user } = useContext(AuthContext);
  const [load,SetLoad] = useState(true);
  const [usuario,setUsuario] = useState([]);

  useEffect(()=>{
      axios
      .get(`https://secure-reef-15187.herokuapp.com/usuarios/${user.username}`)
      .then((res) => {setUsuario(res.data);SetLoad(false)})
    },[user]);

    const index_template=<>
    <div class="index-container">
        {user && <div className="index-center">{user.username}'s stats</div>}
        <img className="index" src="http://www-scf.usc.edu/~shunkaiz/itp104/Hearthstone/background.jpg"/>
        <div className="statics">
            <div className="index-center1">{usuario.win} Vitórias</div>
            <div className="index-center2">{usuario.cards}/201 Cartas</div>
            <div className="index-center3">{usuario.defeat} Derrotas</div>
            <img alt="teste" className="index-inside" src="https://www.downloadclipart.net/large/hearthstone-transparent-background.png"/>
            <img alt="teste" className="index-inside2" src="https://static1.millenium.org/articles/7/36/97/87/@/1398196-bundle1-article_m-1.png"/>
            <img alt="teste" className="index-inside3" src="https://d2q63o9r0h0ohi.cloudfront.net/images/journey-to-ungoro/cards-9cf49c3bd21287f861d130134f8d00c48647b8c34c5c0df35f32f42427b8a0c2862c49cec3ab870e328beb25a08d8c470a938e765c2258a8fc7100adbfd33ad7.png"/>  
        </div>
      </div>
    </>

  return (
    <main className="App">
      <Appbar/>
      {user ? 
      (load ? <Load/> : index_template) : (<Navigate to="/login"/>)}
    </main>
  );
}