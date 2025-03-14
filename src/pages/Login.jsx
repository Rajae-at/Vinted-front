import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../pages/Login.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Header />
      <div className="form">
        <h2>Se connecter</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const response = await axios.get(
                "https://lereacteur-vinted-api.herokuapp.com/user/login",
                {
                  email: email,
                  password: password,
                }
              );
              console.log(response.data);
            } catch (error) {
              console.log(error.response);
            }
          }}
        >
          <input
            type={"email"}
            name={"email"}
            id={"email"}
            value={email}
            placeholder={"Email"}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <input
            type={"password"}
            name={"password"}
            id={"password"}
            value={password}
            placeholder={"Mot de passe"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button className="msg" type="submit">
            Se connecter
          </button>
          <Link to={"/signup"}>
            <p>Pas encore de compte? Inscris-toi !</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
