import { useContext } from "react";
import { Link } from "react-router-dom";
import {RiLockPasswordFill,RiUserFill,RiLoginCircleFill} from 'react-icons/ri';
import {MdFiberNew} from 'react-icons/md'
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
        <img alt="image" className="login-image" src="Liverstone.png"/>
        <div className="form-card">
          <h1><RiUserFill/></h1>
          <input  required className="form-card-title"  type="text" id="username" placeholder="Nome de usuário" />
        </div>
        <div className="form-card">
          <h1><RiLockPasswordFill/></h1>
          <input required className="form-card-title" type="password" id="password" placeholder="Senha" />
        </div>
        <div className="login-buttons">
          <button className="login-button" type="submit"><RiLoginCircleFill/> Login</button>
          <Link to='/register'>
            <button  className="login-button" ><MdFiberNew/> Registrar-se</button>
          </Link>
        </div>
        </div>
      </form>
      </main>
  );
};

export default LoginPage;