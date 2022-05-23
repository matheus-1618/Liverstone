import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import './loginPage.css'

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <main className="App-login">
      <form onSubmit={handleSubmit}>
     
        <div className="login">
        <div className="battle-container">
        <div className="battle-centered">Liverstone</div>
        <img className="battle" src="loadspinner.gif"/>
        </div>
        <label htmlFor="username">Nome de usuário</label>
        <input type="text" id="username" placeholder="Digite aqui" />
        <label htmlFor="password">Senha</label>
        <input type="password" id="password" placeholder="Digite a senha" />
        <button  type="submit">Login</button>
        </div>
      </form>
      </main>
  );
};

export default LoginPage;