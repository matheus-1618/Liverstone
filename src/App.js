import "./App.css";
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";
import Home from "./components/Cards";
import Loja from "./components/Cards/loja/loja";
import Decks from "./components/Cards/decks/decks";
import Battle from "./components/Cards/battles/battles";
import Battleground from "./components/Cards/battleground/battleground";
import Ranking from "./components/Cards/ranking/ranking";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedPage/>} path="/protected" exact /> 
        <Route element={<Login/>} path="/login" />
        <Route element={<Register/>} path="/register" />
        <Route path="/" element={<Home/>}/>
        <Route path="/loja" element={<Loja/>}/>
        <Route path="/decks" element={<Decks/>}/>
        <Route path="/battle" element={<Battle/>}/>
        <Route path="/battle/:ids" element={<Battleground/>}/>
        <Route path="/ranking" element={<Ranking/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;