import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import {RiLockPasswordFill,RiUserFill} from 'react-icons/ri';
import {GiArchiveRegister} from 'react-icons/gi';
import './loginPage.css'

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  return (
    <main className="App-login">
      <form onSubmit={handleSubmit}>
        <div className="login">
        <img alt="image" className="login-image" src="Liverstone.png"/>
        <div className="form-card">
        <h1><RiUserFill/></h1>
          <input
            className="form-card-title"
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Nome de usuário"
            required
          />
        </div>
        <div className="form-card">
        <h1><RiLockPasswordFill/></h1>
          <input
            className="form-card-title"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
        </div>
        <div className="form-card">
          <h1><RiLockPasswordFill/></h1>
          <input
            className="form-card-title"
            type="password"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirme a senha"
            required
          />
          <p>{password2 !== password ? "Senhas não coincidem" : ""}</p>
        </div>
        <button className="login-button"><GiArchiveRegister/> Registrar</button>
        </div>
      </form>
      </main>
  );
}

export default Register;