import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Cards";
import Loja from "./components/Cards/loja/loja";
import Decks from "./components/Cards/decks/decks";
import Battle from "./components/Cards/battles/battles";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/loja" element={<Loja/>}/>
        <Route path="/decks" element={<Decks/>}/>
        <Route path="/battle" element={<Battle/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;