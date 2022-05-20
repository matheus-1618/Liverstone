import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Cards";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;