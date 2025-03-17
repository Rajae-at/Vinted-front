import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../pages/Signup.css";

const Signup = ({ userToken, setUserToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event, setState, type) => {
    if (type === "text") {
      setState(event.target.value);
    } else {
      setState((prev) => !prev);
    }
  };
  return (
    <div>
      <div className="form">
        <h2>S'inscrire</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                {
                  email: email,
                  username: username,
                  password: password,
                  newsletter: true,
                }
              );

              if (response.data.token) {
                Cookies.set("token", response.data.token);
                setUserToken(response.data.token);
                navigate("/");
              } else {
                setErrorMessage("Email ou mot de passe incorrect");
              }
            } catch (error) {
              if (error?.response?.status === 409) {
                setErrorMessage("Email ou username déjà pris");
              } else {
                setErrorMessage("Les informations saisies sont incorrectes");
              }
              console.log(error.message);
            }
          }}
        >
          <input
            type={"text"}
            name={"username"}
            id={username}
            value={username}
            placeholder={"Nom d'utilisateur"}
            onChange={(event) => {
              handleChange(event, setUsername, "text");
            }}
          />
          <br />
          <input
            type={"email"}
            name={"email"}
            id={"email"}
            value={email}
            placeholder={"Email"}
            onChange={(event) => {
              handleChange(event, setEmail, "text");
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
              handleChange(event, setPassword, "text");
            }}
          />
          <br />
          <input
            type={"checkbox"}
            checked={newsletter}
            onChange={(event) => {
              handleChange(event, setNewsletter, "checkbox");
            }}
          />
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button className="msg" type="submit">
            S'inscrire
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <Link to={"/login"}>
            <p>Tu as déjà un compte ? Connecte-toi !</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
