import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "../pages/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  return (
    <div>
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
              if (response.data.token) {
                Cookies.set("token", response.data.token);
                setUserToken(response.data.token);
                setErrorMessage("");
                navigate("/");
              } else {
                setErrorMessage("Email ou mot de passe incorrect");
              }
            } catch (error) {
              setErrorMessage("Email ou mot de passe incorrect");
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
          {errorMessage && <p className="error">{errorMessage}</p>}
          <Link to={"/signup"}>
            <p>Pas encore de compte? Inscris-toi !</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
