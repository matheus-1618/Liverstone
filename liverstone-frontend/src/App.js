import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Cards";
import Loja from "./components/Cards/loja/loja";
import Decks from "./components/Cards/decks/decks";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/loja" element={<Loja/>}/>
        <Route path="/decks" element={<Decks/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;